const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.postId);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.postId
            });
            post.comments.push(comment.id);
            post.save();
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        currComment : comment
                    },
                    message: 'comment created!'
                })
            }
        }
        else{
            console.log('No such post exists!!, stop fiddling you cock sucker');
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error: ', err);
    }
    // Post.findById(req.body.postId, function(err, post){
    //     if(err){
    //         console.log("Error: ", err)
    //         return;
    //     }
    //     if(post){
    //         Comment.create({
    //             content: req.body.content,
    //             user: req.user._id,
    //             post: req.body.postId
    //         }, function(err, comment){
    //             if(err){
    //                 console.log('Error: ', err);
    //                 return;
    //             }
    //             post.comments.push(comment.id);
    //             post.save();

    //             res.redirect('back');
    //         });
    //     }
    // })
}

module.exports.delete = async function(req, res){
    try{
        let reqComment = await Comment.findById(req.query.id);
        if(reqComment && reqComment.user == req.user.id){
            let postId = reqComment.post;
            reqComment.remove();
            await Post.findByIdAndUpdate(postId, {$pull: {comments: req.query.id}});

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        commentId: req.query.id
                    },
                    message: 'Comment deleted!'
                })
            }
        }
    }catch(err){
        console.log('Error while proccesing th request: ', err);
        return res.redirect('back');
    }
    // Comment.findById(req.query.id, function(err, reqComment){
    //     if(err){
    //         console.log('Error in finding comment in database: ', err);
    //         return res.redirect('back');
    //     }
    //     if(reqComment && reqComment.user == req.user.id){
    //         let postId = reqComment.post;
    //         reqComment.remove();
    //         Post.findByIdAndUpdate(postId, {$pull: {comments: req.query.id}}, function(err, post){
    //         })
    //     }
    //     return res.redirect('back');
    // });
}