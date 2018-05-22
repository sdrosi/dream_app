var keys = require('../config/keys.js')

// module.exports = function(text) {

var AYLIENTextAPI = require('aylien_textapi');
var textapi = new AYLIENTextAPI({
  application_id: keys.aylien.application_id,
  application_key: keys.aylien.application_key
});

textapi.sentiment({
    'text': "I love this project"
  }, function(error, response) {
    if (error === null) {
      console.log(response);
      return response
    }
});
  
// }


