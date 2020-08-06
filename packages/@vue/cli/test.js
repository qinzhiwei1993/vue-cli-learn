var debug = require("debug")("http"),
  http = require("http"),
  name = "My App";
const path = require("path");
// fake app

debug.enabled = true;

debug("booting %o", name);

http
  .createServer(function(req, res) {
    debug(req.method + " " + req.url);
    res.end("hello\n");
  })
  .listen(3000, function() {
    debug("listening");
  });

// fake worker of some kind

require("./worker");
