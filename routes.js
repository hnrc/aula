module.exports = function(app, talks, locations, speakers, tags) {
  app.get("/api/talks", function(req, res, next) {
    talks.find({}).sort({ "added": -1 }).exec(function (err, docs) {
      res.send(docs);
    });
  });
  app.get("/api/locations", function(req, res, next) {
    locations.find({}).sort({ "title": -1 }).exec(function (err, docs) {
      res.send(docs);
    });
  });
  app.get("/api/speakers", function(req, res, next) {
    speakers.find({}).sort({ "title": -1 }).exec(function (err, docs) {
      res.send(docs);
    });
  });
  app.get("/api/tags", function(req, res, next) {
    tags.find({}).sort({ "title": -1 }).exec(function (err, docs) {
      res.send(docs);
    });
  });
  app.get("/api/locations/:location", function(req, res, next) {
    talks.find({ "location.key": req.params.location }).sort({ added: -1 }).exec(function (err, docs) {
      res.send(docs);
    });
  });
  app.get("/api/speakers/:speaker", function(req, res, next) {
    talks.find({ "speakers.key": req.params.speaker }).sort({ added: -1 }).exec(function (err, docs) {
      res.send(docs);
    });
  });
  app.get("/api/tags/:tag", function(req, res, next) {
    talks.find({ "tags.key": req.params.tag }).sort({ added: -1 }).exec(function (err, docs) {
      res.send(docs);
    });
  });
  app.get("/api/search", function(req, res, next) {
    if(req.query.query) {
      var pattern = new RegExp(req.query.query, "i");
      talks.find({ $or: [ { "title": pattern }, { "description": pattern } ] }, function (err, docs) {
        res.send(docs);
      });
    } else {
      res.send([]);
    }
  });
}