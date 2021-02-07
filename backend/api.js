const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./bdd');
const expressHandlebars = require('express-handlebars');
const saltRounds = 10;
var session = require('express-session');

app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: "chocapic", resave: false, saveUninitialized: true}));

app.engine('hbs', expressHandlebars({defaultLayout: 'main.hbs',}));

app.get('/', function(request, response) {
    db.try();
    response.status(200).render("home.hbs");
});

app.get('/flux', function(request, response) {
    db.getAllFlux(function(done) {
        if (done == "error") {
            response.status(500);
        } else {
            const model = {
                flux: done.body
            }
            response.status(200).render("flux.hbs", model);
        }
    });
});

app.get('/items', function(request, response) {
    db.getAllFluxItems(function(done) {
        if (done == "error") {
            response.status(500);
        } else {
            const model = {
                items: done.body
            }
            response.status(200).render("items.hbs", model);
        }
    });
});

app.get('/subscribe', function(request, response) {
    const model = {
       firstName: "",
       lastName: "",
       date: "",
       company: "",
       country: ""
    };

    response.status(200).render("subscribe.hbs", model);
});

app.post('/subscribe', function(request, response) {
    console.log("request", request.body);
    const firstName = request.body.firstName;
    const lastName = request.body.lastName;
    const password = request.body.password;
    const passwordConfirm = request.body.passwordConfirm;
    const birthday = request.body.birthday;
    const company = request.body.company;
    const country = request.body.country;

    if (password != passwordConfirm) {
        errors = ["Password and confirmation password are not the same"]
        const model = {
            errors: errors,
            firstName: firstName,
            lastName: lastName,
            birthday: birthday,
            company: company,
            country: country
        }

        response.render("subscribe.hbs", model)
    } else if (password == "") {
        errors = ["username or password invalid"]
        const model = {
            errors: errors,
            firstName: firstName,
            lastName: lastName,
            birthday: birthday,
            company: company,
            country: country
        }

        response.render("subscribe.hbs", model)
    } else {
        const user = {
            firstName: firstName,
            lastName: lastName
        };
        db.getAccount(user, function(done) {
            console.log("getAccountAPI   ", done, done.body.length)
            if (done.body.length != 0) {
                errors = ["username already exists"]
                const model = {
                    errors: errors,
                    firstName: firstName,
                    lastName: lastName,
                    birthday: birthday,
                    company: company,
                    country: country
                }
    
                response.render("subscribe.hbs", model)
            } else if (done.body.length == 0) {
                bcrypt.hash(password, saltRounds, function(err, hash) {
                    if (err) {
                        response.redirect("/accounts/subscribe")
                    } else {
        
                        const hashpw = hash;
                        const model = {
                            firstName: firstName,
                            lastName: lastName,
                            birthday: birthday,
                            company: company,
                            country: country
                        }
                        db.insertAccount(model, function(done) {
                            if (done == "error") {
                                response.status(500).end()
                            } else {
                                response.redirect("/login")
                            }
                        });
                    }
                });
            }
        });
    }
});

app.listen(port=1040, hostname='0.0.0.0', () => {
    console.log(`Server running on port :${port}/`);
});

module.exports = app;
