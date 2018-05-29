var db = require("../models");
var keys = require("../config/aylien_keys.js");

module.exports = function (app) {

    //GET route for getting all of the dreams
    app.get("/social-feed", function (req, res) {
        db.Dream.findAll({
        }).then(function (dbDreams) {
            res.json(dbDreams);
        });
    });

    // Get route for returning posts of a specific category
    app.get("/social-feed/privacy/:privacy", function(req, res) {
        db.Dream.findAll({
        where: {
            UserId: req.user.id,
            privacy: req.params.privacy
        }
        })
        .then(function(dbPost) {
            res.json(dbPost);
        });
    });

    //GET route for retrieving a single dream
    app.get("/update-dream/:id", function (req, res) {
        db.Dream.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (dbDreams) {
            console.log(dbDreams);
            res.json(dbDreams);
        });
    });

    // POST route for saving a new Dream
    app.post("/add-dream", function(req, res) {
        console.log("User ID (Line 41 dreams-api-routes.js): " + req.User.id)
        console.log(req.body);
        var textPolarity = "";
        var confPolarity = "";
        var AYLIENTextAPI = require('aylien_textapi');
        var textapi = new AYLIENTextAPI({
        application_id: keys.aylien.application_id,
        application_key: keys.aylien.application_key
        });
    
        textapi.sentiment({
            'text': req.body.dream
        }, function(error, response) {
            if (error === null) {
            console.log("Sentiment Response: " + response);
            textPolarity = response.polarity;
            confPolarity = response.polarity_confidence;
            db.Dream.create({
                title: req.body.title,
                mood: req.body.mood,
                dream: req.body.dream,
                privacy: req.body.privacy,
                polarity: textPolarity,
                polarity_confidence: confPolarity,
                UserId: req.User.id
            })
          .then(function(dbDream) {
            res.json(dbDream);
          });
        };
      });
    });

    // DELETE route for deleting Dream
    app.delete("/delete-dream/:id", function (req, res) {
        db.Dream.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbDreams) {
            res.json(dbDreams);
        });
    });

    //PUT route for updating Dream
    app.put("/add-dream", function (req, res) {
        console.log(req.body);
        var textPolarity = "";
        var confPolarity = "";
        var AYLIENTextAPI = require('aylien_textapi');
        var textapi = new AYLIENTextAPI({
        application_id: keys.aylien.application_id,
        application_key: keys.aylien.application_key
        });
    
        textapi.sentiment({
            'text': req.body.dream
        }, function(error, response) {
            if (error === null) {
            console.log("Sentiment Response: " + response);
            textPolarity = response.polarity;
            confPolarity = response.polarity_confidence;
        db.Dream.update(
          {
            title: req.body.title,
            mood: req.body.mood,
            dream: req.body.dream,
            privacy: req.body.privacy,
            polarity: textPolarity,
            polarity_confidence: confPolarity
          },
          {
            where: {
              id: req.body.id
            }
          })
          .then(function(dbPost) {
            res.json(dbPost);
          });
        };
      });
    });
};