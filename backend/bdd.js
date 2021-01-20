const { Pool, Client } = require('pg');
const named = require('yesql').pg;
const conf = require("./conf.json");

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
        client.query('SELECT NOW()', (err, res) => {
            console.log(err, res);
            client.end();
        });
    },

    getAllFlux: function(done) {
        client.query('SELECT * FROM flux', (err, res) => {
            console.log("flux", res.rows[0]);
            done(res.rows[0]);
        });
    },

    getLastItemFromAFlux: function(variables, done) {
        client.query('SELECT * from fluxitems WHERE link = $1 ORDER BY isodate DESC LIMIT 1', [variables], (err, res) => {
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
        client.query(named('INSERT INTO fluxitems (flux, title, link, description, publication, guid, isodate) VALUES (:flux, :title, :link, :description, :publication, :guid, :isodate)')(variables), (err, res) => {
            if (err) {
                console.log("error in insertFluxItem", err);
                done({error: "error in insertFluxItem"});
            } else {
                done({body: "ok"});
            }
        });
    },
}
