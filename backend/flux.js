const db = require('./bdd');
const Parser = require('rss-parser');

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
        } else if (res.status == 200 || res.status == 204) {
            let variables = {
                flux: 1,
                title: latestItem.title,
                link: 'http://www.jeuxvideo.com/rss/rss.xml',
                description: latestItem.content.substring(0, 150),
                publication: latestItem.pubDate,
                guid: latestItem.guid,
                isodate: latestItem.isoDate,
            };
            if (res.status == 200) {
                var resPubDate = new Date(res.body.publication);
                var lastItemPubDate = new Date(latestItem.pubDate);
                if (resPubDate < lastItemPubDate && res.body.title != latestItem.title) {
                    console.log("New fluxitem to insert");
                    console.log("variables = ", variables)
                    db.insertFluxItem(variables, (res) => {
                        console.log("res from insertFluxItem = ", res);
                    });
                } else {
                    console.log("Nothing to insert");
                }
            } else if (res.status == 204) {
                console.log("New fluxitem to insert");
                console.log("variables = ", variables)
                db.insertFluxItem(variables, (res) => {
                    console.log("res from insertFluxItem = ", res);
                    return process.exit(1);
                });
            }
        }
    });
})();
