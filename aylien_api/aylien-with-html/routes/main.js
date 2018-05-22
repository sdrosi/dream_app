// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");
var keys = require('../config/keys.js')

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the todos
  app.get("/api/todos", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Aylien.findAll({}).then(function(dbTodo) {
      // We have access to the todos as an argument inside of the callback function
      console.log(res.json(dbTodo));
    });
  });

  // POST route for saving a new todo
  app.post("/api/todos", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property
    var textPolarity = "";
    var AYLIENTextAPI = require('aylien_textapi');
    var textapi = new AYLIENTextAPI({
    application_id: keys.aylien.application_id,
    application_key: keys.aylien.application_key
    });

    textapi.sentiment({
        'text': req.body.text
    }, function(error, response) {
        if (error === null) {
        console.log("Sentiment Response: " + response);
        textPolarity = response.polarity;
        db.Aylien.create({
            text: req.body.text,
            private: req.body.private,
            polarity: textPolarity,
            complete: req.body.complete
          }).then(function(dbTodo) {
            // We have access to the new todo as an argument inside of the callback function
            console.log(dbTodo)
            res.json(dbTodo);
          });

        }
    });

    // db.Aylien.create({
    //   text: req.body.text,
    //   private: req.body.private,
    //   polarity: textPolarity,
    //   complete: req.body.complete
    // }).then(function(dbTodo) {
    //   // We have access to the new todo as an argument inside of the callback function
    //   console.log(dbTodo)
    //   res.json(dbTodo);
    // });
  });

  // DELETE route for deleting todos. We can get the id of the todo to be deleted from
  // req.params.id
  app.delete("/api/todos/:id", function(req, res) {
    // We just have to specify which todo we want to destroy with "where"
    db.Aylien.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTodo) {
      res.json(dbTodo);
    });

  });

  // PUT route for updating todos. We can get the updated todo data from req.body
  app.put("/api/todos", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    var textPolarity = "";
    var AYLIENTextAPI = require('aylien_textapi');
    var textapi = new AYLIENTextAPI({
    application_id: keys.aylien.application_id,
    application_key: keys.aylien.application_key
    });

    textapi.sentiment({
        'text': req.body.text
    }, function(error, response) {
        if (error === null) {
        console.log("Sentiment Response: " + response);
        textPolarity = response.polarity;
        db.Aylien.update({
            text: req.body.text,
            // private: req.body.private,
            polarity: textPolarity,
            complete: req.body.complete
          }, {
              where: {
                  id: req.body.id
              }
          }).then(function(dbTodo) {
            // We have access to the new todo as an argument inside of the callback function
            console.log(dbTodo)
            res.json(dbTodo);
          });

        }
    });
    // db.Aylien.update({
    //   text: req.body.text,
    //   complete: req.body.complete
    // }, {
    //   where: {
    //     id: req.body.id
    //   }
    // }).then(function(dbTodo) {
    //   res.json(dbTodo);
    // });

    // Ending bracket
  });

};
