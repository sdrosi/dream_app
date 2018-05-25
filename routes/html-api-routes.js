var path = require("path");

module.exports = function(app) {
    
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
    app.get("/my-dreams", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/mydreams.html"));
    });

    app.get("/newdream", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/newdream.html"));
      });

    app.get("/dreams-feed", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/dreamsfeed.html"));
    });

};