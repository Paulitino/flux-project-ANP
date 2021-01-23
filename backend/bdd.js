const { Pool, Client } = require('pg');
const named = require('yesql').pg;
const conf = require("./conf.json");
const query = require("./queries.json");

const client = new Pool({
    user:     "postgres",
    database: "flux",
    password: "root",
    host:     "fluxBack",
    port:     "5432"
});

client.connect();
module.exports = {
    
    try: function() {
        client.query(query.try, (err, res) => {
        });
    },

    getAllFlux: function(done) {
        client.query(query.getAllFlux, (err, res) => {
            console.log("flux", res.rows[0]);
            done(res.rows[0]);
        });
    },

    getAllFluxItems: function(done) {
        client.query(query.getAllFluxItems, (err, res) => {
            if (err) {
                console.log("error in getAllFluxItems");
                done({error: "error in getAllFluxItems"});
            } else {
                done(res.rows);
            }
        });
    },

    getLastItemFromAFlux: function(variables, done) {
        client.query(query.getLastItemFromAFlux, [variables], (err, res) => {
            if (err) {
                console.log("error in getLastItemFromAFlux");
                done({error: "error in getLastItemFromAFlux"});
            } else {
                console.log("getLastItemFromAFlux req = ", res.rows[0]);
                done({body: res.rows[0]});
            }
        });
    },

    insertFluxItem: function(variables, done) {
        console.log("in insertFluxItem = ", variables);
        client.query(named(query.insertFluxItem)(variables), (err, res) => {
            if (err) {
                console.log("error in insertFluxItem", err);
                done({error: "error in insertFluxItem"});
            } else {
                done({body: "ok"});
            }
        });
    },
}
