const User = require('../models/user');
const Post = require('../models/post');

module.exports.login = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/feed');
    }
    return res.render('login',{
        title: "login"
    });
}

module.exports.signup = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/feed');
    }
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
                return res.redirect('/users/login');
            })
        }
    })
}

module.exports.createSession = function(req, res){
    return res.redirect('/users/feed');
}

module.exports.profile = function(req, res){
    return res.render('profile',{
        title: 'profile'
    });
}

module.exports.feed = function(req, res){
    // return res.render('feed',{
    //     title: "User's feed"
    // })
    // Post.find({}, function(err, postList){
    //     if(err){
    //         console.log('Error in finding Post for the user');
    //         return;
    //     }
    //     return res.render('feed', {
    //         title: "User's feed",
    //         post_list: postList
    //     });
    // });
    
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    }).exec(function(err, postList){
        if(err){
            console.log('Error in finding Post for the user');
            return;
        }
        return res.render('feed', {
            title: "User's feed",
            post_list: postList
        });
    });

    // Post.find({}).populate('user').exec(function(err, postList){
    //     if(err){
    //         console.log('Error in finding Post for the user');
    //         return;
    //     }
    //     return res.render('feed', {
    //         title: "User's feed",
    //         post_list: postList
    //     });
    // });
}

module.exports.logout = function(req, res){
    req.logout(function(err){
        if(err){
            console.log("Error logging out the session: ", err);
            return res.redirect('/users/feed');
        }
    });
    return res.redirect('/users/login');
}