// module.exports = function (app) {
//     app.get("/", function(req, res) {
//         res.sendFile(test.html);
//       });
// }
var path = require("path");
const passport = require('passport');

module.exports = function(app) {
    
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/new-dream", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/newdream.html"));
        console.log("User ID (Line 17 HTML-api-routes): "+ req.user.id)
      });
    
    // app.get("/update-dream", function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/newdream.html"));
    // });


    app.get("/my-dreams", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/mydreams.html"));
        // console.log(req.user.id)
    });

    app.get("/social-feed", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/dreamsfeed.html"));
    });
};
