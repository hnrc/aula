module.exports = function(db, path) {
  var fs = require("fs");
  fs.readdir(path, function(err, files) {
    if (err) throw err;
    files.forEach(function(file) {
      fs.readFile(path + "/" + file, "utf-8", function(err, doc) {
        if (err) throw err;
        db.insert(JSON.parse(doc));
      });
    });
  });
}