var express = require("express");
var app = express();
var Datastore = require("nedb");
var rss = require("rss");
var talks = new Datastore();
var bootstrap = require("./bootstrap");
bootstrap(talks, "talks");
app.use(require("body-parser").json());
app.use(require("logfmt").requestLogger());
app.use(express.static("public"));
app.use(function(err, req, res, next) {
  res.send(err.status || 500, { error: err.message });
});
require("./routes")(app, talks);
require("./feed")(app, talks, rss);
app.use(function(req, res) {
  res.send(404);
});
app.listen(process.env.PORT || 5000);