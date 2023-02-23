const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.findById(req.body.postId, function(err, post){
        if(err){
            console.log("Error: ", err)
            return;
        }
        if(post){
            Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.postId
            }, function(err, comment){
                if(err){
                    console.log('Error: ', err);
                    return;
                }
                post.comments.push(comment.id);
                post.save();

                res.redirect('back');
            });
        }
    })
}