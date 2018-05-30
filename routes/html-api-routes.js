var path = require("path");
const passport = require('passport');
var session = require('express-session');

module.exports = function(app) {
    // At the start, index landing page is loaded for our app
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    // When the "log out" button is clicked, it is routed here and should display the landing page again
    app.get('/logout', function(req, res){
        req.logout();
        res.sendFile(path.join(__dirname, "../public/index.html"))
    app.get("/new-dream", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/newdream.html"));

        console.log("User ID (Line 17 HTML-api-routes): "+ req.user.id)
      });
    
    // At this route, it presents the new dream form
    // app.get("/new-dream", function(req, res) {
    //     if (req.user) {
    //         res.sendFile(path.join(__dirname, "../public/newdream.html"));
    //     }

    //     else {
    //         res.redirect('/')
    //     }

    //   });
    
    // After authentication and whenever the user routes to this URL, it will present the my-dreams html file
    app.get("/my-dreams", function(req, res) {
        if (req.user) {
            res.sendFile(path.join(__dirname, "../public/mydreams.html"));
        }

        else {
            res.redirect('/')
        }
 
    });

    // Whenever the user routes to this URL, it will present the dreamsfeed.html
    app.get("/social-feed", function(req, res) {
        if (req.user) {
            res.sendFile(path.join(__dirname, "../public/dreamsfeed.html"));
        }
        
        else {
            res.redirect('/')
        }
    });
};
