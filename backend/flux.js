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
    let len = feed.items.length;
  
    feed.items.forEach(item => {
      console.log("title : ", item.title , '\n' + 'link = ' + item.link , '\n' + 'content = ' + item.content, '\n', "pubDate = ", item.pubDate, '\n', "guid : ", item.guid, '\n', "isoDate = ", item.isoDate, '\n');
    });
    let latestItem = feed.items[len - 1];

    db.getLastItemFromAFlux('http://www.jeuxvideo.com/rss/rss.xml', (res) => {
        if (res.error) {
            console.log("there has been an error");
        } else {
            var resPubDate = new Date(res.body.publication);
            var lastItemPubDate = new Date(latestItem.pubDate);

            if (resPubDate < lastItemPubDate && res.body.title != latestItem.title) {
                console.log("New fluxitem to insert");
                let variables = {
                    flux: 1,
                    title: latestItem.title,
                    link: 'http://www.jeuxvideo.com/rss/rss.xml',
                    description: latestItem.content.substring(0, 150),
                    publication: latestItem.pubDate,
                    guid: latestItem.guid,
                    isodate: latestItem.isoDate,
                };
                console.log("variables = ", variables)
                db.insertFluxItem(variables, (res) => {
                    console.log("res from insertFluxItem = ", res);
                });
            } else {
                console.log("Nothing to insert");
            }
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