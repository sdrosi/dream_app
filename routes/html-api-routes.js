var path = require("path");

module.exports = function(app) {

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, ""));
    });

    app.get("/newdream", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/newdream.html"));
      });

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, ""));
    });

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, ""));
    });
};