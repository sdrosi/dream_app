var path = require("path");

module.exports = function(app) {
    
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/new-dream", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/newdream.html"));
      });
    
    // app.get("/update-dream", function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/newdream.html"));
    // });


    app.get("/my-dreams", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/mydreams.html"));
    });

    app.get("/social-feed", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/dreamsfeed.html"));
    });
};