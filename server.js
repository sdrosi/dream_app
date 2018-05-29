// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

// Sets up the Express App
// =============================================================
var app = express();
<<<<<<< HEAD
var PORT = process.env.PORT || 8000;

// Passport set up
const passportSetup = require('./config/passport-setup');
const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

/*passport.serializeUser(function(user, done) {
    done(null, email)
});

passport.deserializeUser(function(id, done) {
    models.User.findById(id, done);
});
*/

  

=======
var PORT = process.env.PORT || 8080;
>>>>>>> 6c139a51799124e1378ce3010fdfc4cbe47aa7e7

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

<<<<<<< HEAD
// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
/*
require("./routes/html-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/dreams-api-routes.js")(app);
*/

// Auth routes
const authRoutes = require('./routes/auth-routes');
app.use('/auth', authRoutes)
=======

// Static directory
app.use(express.static("public"));

// // ROUTING
require("./routes/dreams-api-routes.js")(app);
require("./routes/html-api-routes.js")(app);

// Routes
// =============================================================
require("./routes/dreams-api-routes.js")(app);
require("./routes/html-api-routes.js")(app);
>>>>>>> 6c139a51799124e1378ce3010fdfc4cbe47aa7e7

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
