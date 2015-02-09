module.exports = function(app, talks, rss) {

  app.get("/feed.xml", function(req, res, next) {
    var feed = new rss({
      title: "Aula.io feed",
      description: "The best of tech talks in one place",
      feed_url: "http://www.aula.io/feed.xml",
      site_url: "http://www.aula.io"
    });
    talks.find({}).sort({ "added": -1 }).exec(function (err, docs) {
      for(var i = 0; i < docs.length && i < 20; i++) {
        feed.item({
          title: docs[i].title,
          url: docs[i].url,
          description: docs[i].description,
          date: docs[i].added
        });
      }
      res.set("Content-Type", "text/xml");
      res.send(feed.xml({indent: true}));
    });
  });
}