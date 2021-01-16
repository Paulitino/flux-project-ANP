const { Pool, Client } = require('pg');
// const pool = new Pool();
const conf = require("./conf.json");

/* const client = new Client({
    user: conf.database.postgres.user,
    name: conf.database.postgres.name,
    password: conf.database.postgres.password,
    port: conf.database.postgres.port
}); */
const client = new Pool({
    user:     "postgres",
    database: "flux",
    password: "root",
    // database: "flux",
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

    getAllFlux: function() {
        client.query('SELECT * FROM flux', (err, res) => {
            console.log("flux", res.rows[0]);
            return(res.rows[0]);
        });
    },

    getLastItemFromAFlux: function(fluxUrl) {
        client.query('SELECT DISTINCT ON ("title") * from fluxitems WHERE link=%(fluxUrl)s ORDER BY isodate DESC LIMIT 1', fluxUrl, (err, res) => {
            if (err) {
                console.log("sending back a 500 error")
                res.status(500).send({error: "error in getLastItemFromAFlux"});
            } else {
                console.log("getLastItemFromAFlux req = ", res.rows[0]);
                res.status(200).send({body: res.rows[0]});
            }
        });
    }

}

/* module.exports = {

    getAllFluxRequest: function () {
        const query = "SELECT * FROM flux";

        db.all(query, function (err, flux) {
            if (err) {
                console.log("error getAllFlux");
                return ("error");
            } else {
                return ({ flux: flux });
            }
        });
    },

    createFluxRequest: function (flux, done) {
        const query = "INSERT INTO flux (name, link) VALUES (?, ?)";
        const values = [flux.name, flux.url];

        db.all(query, values, function (err) {
            if (err) {
                console.log("error in createFluxRequest");
                return done(err);
            } else {
                return done();
            }
        });
    }, */

    /**
     * Get the url from every flux in BDD
     * @param {*} done 
     */

/*     getAllFluxUrlRequest: function (done) {
        console.log("inside db.getAllFluxUrlRequest");
        const query = "SELECT link FROM flux";

        db.all(query, function (err, links) {
            if (err) {
                console.log("error when getting all flux url");
            } else {
                console.log("links", links);

                return done(links);
            }
        });
    }, */

    /**
     *  Store a new flux in the BDD
     * @param {*} newFlux 
     * @param {*} done 
     */

/*     addAFluxRequest: function (newFlux, done) {
        const query = "INSERT INTO flux (name, link) VALUES (?, ?)";
        const values = [newFlux.name, newFlux.url];

        db.run(query, values, function () {
            if (err) {
                console.log("error when inserting item");
                return done("error when inserting item");
            } else {
                console.log("addAFluxRequest DONE");
                return done();
            }
        });
    }, */

    /**
     * Store a new item in BDD
     * @param {*} item 
     * @param {*} fluxURL 
     * @param {*} done 
     */

/*     storeItemRequest: function (item, fluxURL, done) {
        const query = "INSERT INTO fluxItem (title, link, description, pubDate, guid, isoDate, fluxUrl) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const values = [item.title, item.link, item.content, item.pubDate, item.guid, item.isoDate, fluxURL];

        db.run(query, values, function (err) {
            if (err) {
                console.log("error when storing item = ", err);
                return done("error when storing item");
            } else {
                console.log("storeItemRequest DONE");
                return done();
            }
        });
    }, */

    /**
     * Delete an item thanks to its ID
     * @param {*} itemId 
     * @param {*} done 
     */

/*     deleteItemRequest: function (itemId, done) {
        const query = "DELETE FROM fluxItem WHERE id = ?";
        const values = [itemId];

        db.run(query, values, function (err) {
            if (err) {
                return done("error in deleteItemRequest");
            } else {
                return done();
            }
        });
    }, */

    /**
     * This function gets all items from a flux thanks to their url
     * @param {*} url
     * @param {*} done 
     */

/*     getAllItemFromFluxRequest: function (url, done) {
        var query = "SELECT * FROM fluxItem WHERE fluxUrl = ?";
        var value = [url];

        db.all(query, value, function (err, items) {
            if (err) {
                console.log("error while trying to get all items.");
                return done(err);
            } else {
                return done(items);
            }
        });
    }
} */
