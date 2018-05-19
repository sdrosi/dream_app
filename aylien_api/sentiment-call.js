// module.exports = function() {

    var AYLIENTextAPI = require('aylien_textapi');
    var textapi = new AYLIENTextAPI({
      application_id: "b509c397",
      application_key: "fcacf9c92fcd328967b6475875fa32f3"
    });
    
    textapi.sentiment({
        'text': 'The restaurant was full but once we got seated and ate, the food was delicious.'
      }, function(error, response) {
        if (error === null) {
          console.log(response);
        }
      });
    // }
    
    
    