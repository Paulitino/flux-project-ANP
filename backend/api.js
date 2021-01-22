const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./bdd');
const expressHandlebars = require('express-handlebars');

app.set('views', 'views');

app.engine('hbs', expressHandlebars({
    defaultLayout: 'main.hbs',
}));

app.get('/', function(req, res) {
    db.try();
    res.render("home.hbs")
});

app.get('/flux', function(req, res) {
    db.getAllFlux(function(res) {
        console.log(res);
    });
});

app.get('/items', function(req, res) {
    db.getAllFluxItems(function(res) {
        console.log(res);
    });
});

app.listen(port=80, hostname='0.0.0.0', () => {
    console.log(`Server running on port :${port}/`);
});