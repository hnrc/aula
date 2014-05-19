module.exports = function(app, talks, locations, speakers, tags) {
  var db = require("orchestrate")(process.env.ORCHESTRATE_TOKEN);
  var SortedObjectArray = require("sorted-object-array");
  app.get("/api/talks", function(req, res, next) {
    list(res, "talks");
  });
  app.get("/api/locations", function(req, res, next) {
    list(res, "locations");
  });
  app.get("/api/speakers", function(req, res, next) {
    list(res, "speakers");
  });
  app.get("/api/tags", function(req, res, next) {
    list(res, "tags");
  });
  app.get("/api/locations/:location", function(req, res, next) {
    search(res, "talks", "value.location.slug:\"" + req.params.location + "\"");
  });
  app.get("/api/speakers/:speaker", function(req, res, next) {
    search(res, "talks", "value.speakers.slug:\"" + req.params.speaker + "\"");
  });
  app.get("/api/tags/:tag", function(req, res, next) {
    search(res, "talks", "value.tags.slug:\"" + req.params.tag + "\"");
  });
  app.get("/api/search", function(req, res, next) {
    if(req.query.query) {
      search(res, "talks", req.query.query);
    } else {
      res.send([]);
    }
  });

  var list = function(res, collection) {
    db.list(collection, {limit:100}).then(function(result) {
      var sorted = new SortedObjectArray("added");
      if(result.body && result.body.count) {
        for(var i = 0; i < result.body.count; i++) {
          if(result.body.results[i].value) {
            sorted.insert(result.body.results[i].value);
          }
        }  
      }
      res.send(sorted.array.reverse());
    }).fail(function(err) {
      console.error("WAT: " + JSON.stringify(err.body));
      res.send(500);
    })
  }

  var search = function(res, collection, query) {
    db.newSearchBuilder()
      .collection(collection)
      .limit(100)
      .offset(0)
      .query(query)
      .then(function(result) {
        var items = [];
        if(result.body && result.body.count) {
          for(var i = 0; i < result.body.count; i++) {
            if(result.body.results[i].value) {
              items.push(result.body.results[i].value);
            }
          }  
      }
      res.send(items);
    }).fail(function(err) {
      console.error("Orchestrate error: " + JSON.stringify(err.body));
      res.send(500);
    })
  }

}