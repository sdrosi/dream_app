require('dotenv').config();
var db = require("../models");
var keys = require("../config/keys.js");

module.exports = function (app) {

    //GET route for getting all public dreams among all users on the dreamsfeed.html page 
    app.get("/social-feed/all", function (req, res) {
        db.Dream.findAll({
            where: {
                privacy: 0
            }
        }).then(function (dbDreams) {
            res.json(dbDreams);
        });
    });

    //GET route for getting all of the user's dreams whether they are private or public. 
    app.get("/my-feed/", function (req, res) {
        db.Dream.findAll({
            where: {
                UserId: req.user.id
            }
        }).then(function (dbDreams) {
            res.json(dbDreams);
        });
    });

    // Get route for returning dreams that matches the privacy category that the user selects on the my-dreams.html page
    app.get("/my-feed/privacy/:privacy", function(req, res) {
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

    //GET route for retrieving a single dream when the user wants to update a specific dream. The returned data
    //autofills the new dream form with the user's previously inputted data as a result of this GET request.
    app.get("/update-dream/:user_id/:id", function (req, res) {
        if (req.user.id === req.params.user_id) {
            db.Dream.findOne({
                where: {
                    id: req.params.id,
                    UserId: req.params.user_id
                }
            }).then(function (dbDreams) {
                console.log(dbDreams);
                res.json(dbDreams);
            });
        }

        else {
            res.send("You can't edit that post")
        }

    });

    // POST route for saving a new Dream
    app.post("/add-dream", function(req, res) {
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

                UserId: req.user.id
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
            polarity_confidence: confPolarity,
            UserId: req.user.id
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
