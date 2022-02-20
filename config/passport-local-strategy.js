const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User= require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
function(req, email, password, done){
    User.findOne({email:email}, function(err, user){
        if(err){
            console.log(err);
            return done(err);
        }
        if(!user || user.password != password){
            console.log('Invalid Username/Password');
            return done(null, false);
        }
        console.log('done');
        return done(null, user);
    });
}
));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> passport');
            return done(err);
        }

        return done(null, user);
    });
});

//check if user is authenticated

passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user containes the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;