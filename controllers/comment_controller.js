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

module.exports.delete = function(req, res){
    Comment.findById(req.query.id, function(err, reqComment){
        if(err){
            console.log('Error in finding comment in database: ', err);
            return res.redirect('back');
        }
        if(reqComment && reqComment.user == req.user.id){
            let postId = reqComment.post;
            reqComment.remove();
            Post.findByIdAndUpdate(postId, {$pull: {comments: req.query.id}}, function(err, post){
            })
        }
        return res.redirect('back');
    });
}