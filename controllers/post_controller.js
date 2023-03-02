const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        if(req.xhr){
            return res.status(200).json({
                data: {
                    Post: post
                },
                message: 'Post created!'
            });
        }
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}

module.exports.delete = async function(req, res){
    //below is implemented using async await and ajax
    try{
        let reqPost = await Post.findById(req.query.id);
        if(reqPost.user == req.user.id){
            reqPost.remove();

            await Comment.deleteMany({post: req.query.id});
            req.flash('success', 'Post and associated comments are deleted');
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        postId : req.query.id
                    },
                    message: 'Post deleted!'
                });
            }
        }

    }catch(err){
        console.log('Error: ', err);
        return res.redirect('back')
    }
    //below is tradional method

    // Post.findById(req.query.id, function(err, reqPost){
    //     if(reqPost.user == req.user.id){
    //         reqPost.remove();

    //         Comment.deleteMany({post: req.query.id}, function(err){
    //             if(err){
    //                 console.log('Error deleting comments associated eithe post: ', err);
    //                 return;
    //             }
    //             return res.redirect('back');
    //         })
    //     }
    // })
}