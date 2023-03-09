const User = require('../models/user');

const passport = require('passport');
const passportJWT = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;

let opts = {
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'aditya'
}

passport.use( new passportJWT(opts, function(jwtPayload, done){
    console.log('asdasdasd');
    User.findById(jwtPayload._id, function(err, user){
        if(err){
            console.log('Error in authentication: ', err);
            return done(err, false);
        }
        if(user){
            return done(null, user);
        }
        else{
            return done(null, false);
        }
    });
}));


module.exports = passport;