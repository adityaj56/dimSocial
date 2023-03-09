const Post = require('../../../models/post');
const Comment = require('../../../models/comment');


module.exports.index = async function(req, res){
    try{
            let post = await Post.find({})
            .populate('user')
            .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
        return res.status(200).json({
            message: 'List of posts',
            posts: post
        })
        
    }catch(err){
        console.log('Internal server error: ',err);
    }
}

module.exports.delete = async function(req, res){
    //below is implemented using async await and ajax
    try{
        console.log('ininininininin');
        let reqPost = await Post.findById(req.query.id);
        if(reqPost.user == req.user.id){
            reqPost.remove();

            await Comment.deleteMany({post: req.query.id});
            return res.status(200).json({
                message: 'Post and associated comments deleted!'
            });
        }
        else{
            return res.status(401).json({
                message: 'You cannot delete this post'
            })
        }

    }catch(err){
        console.log('ERROR: ', err);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}