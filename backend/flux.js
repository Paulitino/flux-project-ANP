/* const express = require('express');
const app = express();*/
const db = require('./bdd');
const Parser = require('rss-parser');
/* const cors = require('cors');

app.use(express.json())
app.use(cors()); */

/* app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.post('/getAFlux', function (req, res) {
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

app.get('/addAFlux', function (req, res) {
    console.log("addAFlux");
    db.addAFluxRequest(req.body.newFlux, function (response) {
        if (response == "error") {
            res.status(400);
        } else {
            res.status(200);
        }
    });
});

app.post('/deleteItemById', function (req, res) {
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

//var interval = setInterval(call, (1000 * 60) * 10);

let parser = new Parser();

(async () => {

    let feed = await parser.parseURL('http://www.jeuxvideo.com/rss/rss.xml');
    console.log(feed.title);
  
    feed.items.forEach(item => {
      console.log(item.title + ':' + item.link + '_____' + item.content, item.pubDate, item.guid, item.isoDate, '\n');
    });

    db.getLastItemFromAFlux('http://www.jeuxvideo.com/rss/rss.xml', (res) => {
        if (res.status == 500) {
            console.log("there has been an error");
        } else {
            console.log("res = ", res);

        }
    });
  
  })();

/* function call() {

    const fluxURL = 'http://www.jeuxvideo.com/rss/rss.xml';

    getAFlux(fluxURL, function (flux) {
        if (flux) {
            const latestItem = flux.items[0];
            const latestItemTitle = flux.items[0].title;

            db.getAllItemFromFluxRequest(fluxURL, function (onBddItems) {
                if (onBddItems) {
                    db.storeItemRequest(latestItem, fluxURL, function (done) {
                        if (done) {
                            return true;
                        }
                    });
                }
            });
        }
    });
} */

/* async function getAFlux(urlFlux, done) {
    let parser = new Parser();
    let feed = await parser.parseURL(urlFlux);

    feed.items.forEach(item => {
        console.log("--------********--------");
        console.log("item.title + ':' + item.link", item.title + ':' + item.link);
        console.log("--------********--------");
    });

    return done(feed);
} */