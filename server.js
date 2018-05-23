// This is server code just copied and pasted from the Bank Admin activity in the sequelize activities folder.

// DEPENDENCIES
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var db = require('./models');

// Passport set up
const passportSetup = require('./config/passport-setup');

// CREATE SERVER
var app = express();
var PORT = process.env.PORT || 8000;

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// ROUTING
app.use(require('./routes/main'))
app.use(require('./routes/api'))

// RUN SERVER
db.sequelize.sync({}).then(function() {
  app.listen(PORT, function() {
    console.log('Server running at http://localhost:' + PORT)
  })
})
