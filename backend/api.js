const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./bdd');
const expressHandlebars = require('express-handlebars');

app.set('views', 'views');

app.engine('hbs', expressHandlebars({
    defaultLayout: 'main.hbs',
}));

app.get('/', function(request, response) {
    db.try();
    response.status(200).render("home.hbs");
});

app.get('/flux', function(request, response) {
    db.getAllFlux(function(done) {
        if (done.error) {
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
        if (done.error) {
            response.status(500).end();
        } else {
            const model = {
                items: done.body
            }
            response.status(200).render("items.hbs", model);
        }
    });
});

app.listen(port=1040, hostname='0.0.0.0', () => {
    console.log(`Server running on port :${port}/`);
});

module.exports = app;
