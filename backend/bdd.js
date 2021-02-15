const { Pool, Client } = require('pg');
const named = require('yesql').pg;
const conf = require("./conf.json");
const query = require("./queries.json");

const client = new Pool({
    user: conf.database.postgres.user,
    database: conf.database.postgres.database,
    password: conf.database.postgres.password,
    host: conf.database.postgres.host,
    port: conf.database.postgres.port,
});

client.connect();
module.exports = {
    
    try: function() {
        client.query(query.try, (err, res) => {
        });
    },

    getAccount: function(variables, done) {
        console.log("variables ", variables)
        client.query(named(query.getAccount)(variables), (err, res) => {
            if (err) {
                console.log("error in getAccount");
                done("error");
            } else {
                done({status: 200, body: res.rows});
            }
        });
    },

    getAllFlux: function(done) {
        client.query(query.getAllFlux, (err, res) => {
            if (err) {
                console.log("error in getAllFlux");
                done("error");
            } else {
                done({status: 200, body: res.rows});
            }
        });
    },

    getAllFluxItems: function(done) {
        client.query(query.getAllFluxItems, (err, res) => {
            if (err) {
                console.log("error");
                done("error");
            } else {
                done({status: 200, body: res.rows});
            }
        });
    },

    getLastItemFromAFlux: function(variables, done) {
        client.query(query.getLastItemFromAFlux, [variables], (err, res) => {
            if (err) {
                console.log("error in getLastItemFromAFlux");
                done("error");
            } else {
                console.log("getLastItemFromAFlux req = ", res.rows.length);
                if (res.rows.length == 0) {
                    console.log("204")
                    done({status: 204});
                } else {
                    done({status: 200, body: res.rows[0]});
                }
            }
        });
    },

    getLogin: function(variables, done) {
        client.query(named(query.getLogin)(variables), (err, res) => {
            if (err) {
                console.log("error in getLogin");
                done("error");
            } else {
                console.log("getLogin req = ", res.rows.length);
                if (res.rows.length == 0) {
                    console.log("204")
                    done({status: 204});
                } else {
                    done({status: 200, body: res.rows[0]});
                }
            }
        });
    },

    insertFluxItem: function(variables, done) {
        console.log("in insertFluxItem = ", variables);
        client.query(named(query.insertFluxItem)(variables), (err, res) => {
            if (err) {
                console.log("error in insertFluxItem", err);
                done("error");
            } else {
                done({body: "ok"});
            }
        });
    },

    insertAccount: function(variables, done) {
        console.log("in insertAccount = ", variables);
        client.query(named(query.insertAccount)(variables), (err, res) => {
            if (err) {
                console.log("error in insertAccount", err);
                done("error");
            } else {
                done({body: "ok"});
            }
        });
    }
}
