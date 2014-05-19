var express = require("express");
var app = express();
var Datastore = require("nedb");
var talks = new Datastore();
var locations = new Datastore();
var speakers = new Datastore();
var tags = new Datastore();
var bootstrap = require("./bootstrap");
bootstrap(talks, "data/talks");
bootstrap(locations, "data/locations");
bootstrap(speakers, "data/speakers");
bootstrap(tags, "data/tags");
app.use(require("body-parser").json());
app.use(require("logfmt").requestLogger());
app.use(express.static("public"));
app.use(function(err, req, res, next) {
  res.send(err.status || 500, { error: err.message });
});
require("./routes")(app, talks, locations, speakers, tags);
app.use(function(req, res) {
  res.send(404);
});
app.listen(process.env.PORT || 5000);