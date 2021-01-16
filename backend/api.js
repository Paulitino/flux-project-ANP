const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./bdd');
const expressHandlebars = require('express-handlebars');


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

/* app.post('/v1/getAFlux', function (req, res) {
    console.log("req.fluxUrl", req.body.fluxUrl);
    var fluxUrl = req.body.fluxUrl;

    db.getAllItemFromFluxRequest(fluxUrl, function (data) {
        if (data == "error") {
            res.status(400);
        } else {
            res.status(200).json(data);
        }
    });
});

app.post('/v1/deleteItemById', function (req, res) {
    console.log("deleteItemById");
    console.log("req.body.id", req.body.fluxItem);

    db.deleteItemRequest(req.body.fluxItem, function (response) {
        if (response == "error") {
            res.status(400);
        } else {
            console.log("deleted");
            res.status(200).json({ ok: "ok" });
        }
    });
}); */

app.listen(port=80, hostname='0.0.0.0', () => {
    console.log(`Server running on port :${port}/`);
});