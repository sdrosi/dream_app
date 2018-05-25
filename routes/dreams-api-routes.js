var db = require("../models");
var keys = require("../config/aylien_keys.js");

module.exports = function (app) {

    //GET route for getting all of the dreams
    app.get("/social-feed", function (req, res) {
        var query = {};
        if (req.query.user_id) {
            query.userId = req.query.user_id;
        }
        db.Dreams.findAll({
            where: query
        }).then(function (dbDreams) {
            res.json(dbDreams);
        });
    });

    //GET route for retrieving a single dream
    app.get("/update/dream", function (req, res) {
        db.Dreams.findOne({
            where: {
                id: re.params.id
            }
        }).then(function (dbDreams) {
            console.log(dbDreams);
            res.json(dbDreams);
        });
    });

    // POST route for saving a new Dream
    app.post("/add-dream", function(req, res) {
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
                polarity_confidence: confPolarity
            })
          .then(function(dbDream) {
            res.json(dbDream);
          });
        };
      });
    });

    // DELETE route for deleting Dream
    app.delete("/api/delete", function (req, res) {
        db.Dream.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbDreams) {
            res.json(dbDreams);
        });
    });

    //PUT route for updating Dream
    app.put("/update/dream", function (req, res) {
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