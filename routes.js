module.exports = function(app, talks) {
  
  var _ = require("underscore");

  app.get("/api/talks", function(req, res, next) {
    talks.find({}).sort({ "added": -1 }).exec(function (err, docs) {
      res.send(docs);
    });
  });

  app.get("/api/locations", function(req, res, next) {
    talks.find({}, function (err, docs) {
      var locations = [];
      for(var i = 0; i < docs.length; i++) {
        locations.push(docs[i].location);
      }
      res.send(uniqSort(locations));
    });
  });

  app.get("/api/speakers", function(req, res, next) {
    talks.find({}, function (err, docs) {
      var speakers = [];
      for(var i = 0; i < docs.length; i++) {
        for(var j = 0; j < docs[i].speakers.length; j++) {
          speakers.push(docs[i].speakers[j]);
        }
      }
      res.send(uniqSort(speakers));
    });
  });

  app.get("/api/tags", function(req, res, next) {
    talks.find({}, function (err, docs) {
      var tags = [];
      for(var i = 0; i < docs.length; i++) {
        for(var j = 0; j < docs[i].tags.length; j++) {
          tags.push(docs[i].tags[j]);
        }
      }
      res.send(uniqSort(tags));
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
      var conditions = [];
      var split = req.query.query.split(" ");
      for(var i = 0; i < split.length; i++) {
        if(split[i].length > 0) {
          conditions.push({ "title": new RegExp(split[i], "i") });
          conditions.push({ "description": new RegExp(split[i], "i") });
        }
      }
      talks.find({ $or: conditions }, function (err, docs) {
        res.send(docs);
      });
    } else {
      res.send([]);
    }
  });

  function uniqSort(arr) {
    return _.uniq(_.sortBy(arr, "title"), true, function(item, key, arr) {
      return item.key;
    });
  }
}