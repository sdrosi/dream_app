const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const db = require('../models');


passport.use(new GoogleStrategy({
    // options for the google strategy
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret

}, (accessToken, refreshToken, email, done) => {
    // passport callback function
    //console.log(email);
    //console.log(profile);


    db.User.findOne({
        where: {
            email: email.emails[0].value
        }
    }).then(function (user) {
        if (user) {
            return done(null, false, {
                message: 'user already exists'
            });
            console.log("user is: " + user);
        } else {
            var data =
                {
                    firstName: email.name.givenName,
                    lastName: email.name.familyName,
                    email: email.emails[0].value
                };

            db.User.create(data).then(function (newUser, created) {
                if (!newUser) {
                    return done(null, false);
                }
                if (newUser) {
                    return done(null, newUser);
                };
                
            }).then((newUser) => {
                console.log('new user created: ' + db.User.email);
            });
            
        }
    });
})); 
    

// serialize user
passport.serializeUser(function(user, done) {
    done(null, user.id);
    console.log(user.id);
});

// deserialize user
passport.deserializeUser(function(id, done) {
    user.findById(id).then(function(user) {
        if (user) {
            done(null, user.get());
        } else {
            done(user.errors, null);
        }
    });
});

