// module.exports = function (app) {
//     app.get("/", function(req, res) {
//         res.sendFile(test.html);
//       });
// }
var path = require("path");

module.exports = function(app) {
    
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/new-dream", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/newdream.html"));
<<<<<<< HEAD
        console.log("User ID (Line 17 HTML-api-routes): "+ req.User.id)
=======
>>>>>>> parent of 6f63cbf... Figured out cookie manipulation so user id session persists throughout web app
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
