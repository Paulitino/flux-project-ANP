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
            response.status(200).send(model);
        }
    });
});

app.get('/login', function(request, response) {
    const model = {
        firstName: "",
        password: ""
     };

    response.status(200).render('login.hbs', model);
});

app.post('/login', function(request, response) {
    console.log(request.body.Email)
    const model = {
        Email: request.body.Email,
        password: request.body.password,
        errors: []
    };

    const regMail = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
    let checkMail = regMail.test(model.Email);

    if (request.session.connected == true) {
        response.redirect('/account')
    } else if (!checkMail) {
        errors = ["username or password format is invalid"];
        const model = {
            errors: errors,
        }

        response.render("login.hbs", model);
    } else {
        db.getLogin(model, function(done) {
            if (done.status === 204) {
                errors = ["username or password invalid"];
                const model = {
                    errors: errors,
                }

                response.render("login.hbs", model);
            } else if (done == "error") {
                errors = ["Something bad happened, please try again"]
                const model = {
                    errors: errors,
                }

                response.status(500).render('login.hbs', model);
            } else {
                bcrypt.compare(model.password, done.body.password, function (err, res){
                    if (err) {
                        errors = ["Something bad happened, please try again"]
                        const model = {
                            errors: errors,
                        }

                        response.status(500).render('login.hbs', model);
                    } else if (res == true) {
                        console.log(done);
                        session = request.session;
                        session.Email = model.Email;
                        session.connected = true;
                        response.redirect('/account');
                    } else {
                        errors = ["username or password invalid"];
                        const model = {
                            errors: errors,
                        }
                    
                        response.render("login.hbs", model);
                    }
                });
            }
        });
    }
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
    const Email = request.body.Email;
    const password = request.body.password;
    const passwordConfirm = request.body.passwordConfirm;
    const birthday = request.body.birthday;
    const company = request.body.company;
    const country = request.body.country;
    const regMail = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
    let checkMail = regMail.test(Email);

    if (password != passwordConfirm) {
        errors = ["Password and confirmation password are not the same"]
        const model = {
            errors: errors,
            firstName: firstName,
            lastName: lastName,
            Email: Email,
            birthday: birthday,
            company: company,
            country: country
        }

        response.render("subscribe.hbs", model)
    } else if (password == "" || checkMail == false) {
        errors = ["username or password format is invalid"]
        const model = {
            errors: errors,
            firstName: firstName,
            lastName: lastName,
            Email: Email,
            birthday: birthday,
            company: company,
            country: country
        }

        response.render("subscribe.hbs", model)
    } else {
        const user = {
            Email: Email,
        };
        db.getAccount(user, function(done) {
            console.log("getAccountAPI   ", done, done.body.length)
            if (done.body.length != 0) {
                errors = ["Email already exists"]
                const model = {
                    errors: errors,
                    firstName: firstName,
                    lastName: lastName,
                    Email: Email,
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
        
                        const model = {
                            firstName: firstName,
                            lastName: lastName,
                            Email: Email,
                            password: hash,
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
