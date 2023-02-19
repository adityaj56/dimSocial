const User = require('../models/user')

module.exports.login = function(req, res){
    return res.render('login',{
        title: "login"
    });
}

module.exports.signup = function(req, res){
    return res.render('signup',{
        title: 'sign-up'
    });
}

module.exports.createUser = function(req, res){
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('Error while varifying if the user exist or not!!');
            return;
        }
        if(user){
            console.log("User already exists!");
            return res.redirect('/users/signup')
        }
        else{
            User.create(req.body, function(err, newUser){
                if(err){
                    console.log('Error while creating the user: ', err);
                    return;
                }
                return res.redirect('/users/login')
            })
        }
    })
}

module.exports.createSession = function(req, res){
    return res.redirect('/');
}