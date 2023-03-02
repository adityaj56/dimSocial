{
    $(document).ready(function(){
        createPost();
        commentFormInitialize();
        deletePostInitialize();
        deleteCommentInitialize()
    })

    //function for creating a post
    function createPost(){
        let postForm = $('#create-post-form');
        postForm.submit(function(event){
            event.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: postForm.serialize(),
                success: function(data){
                    let createdPost = createPostDom(data.data.Post);
                    $('#post-container-list').prepend(createdPost);
                    //below is the syntax of sending a dom object from the created DOM object
                    deletePost($(' .delete-post'), createdPost);
                    createComment($(' .create-comment-form'), createdPost);
                },error: function(err){
                    console.log('Error in creating post: ', err);
                }
            })
        });
    }


    //below function is used for deleting a post imediatly after added a post using ajax
    function deletePost(deleteLink){
        $(deleteLink).click(function(event){
            event.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.postId}`).remove();
                },error: function(err){
                    console.log('Error: ', err);
                }
            });
        });
    }

    //below function is used for initializing the delete function for every post that existed before the ajax call
    function deletePostInitialize(){
        let posts = $('.delete-post');
        for(let i of posts){
            deletePost(i);
        }
    }

    //method to create a post in DOM
        function createPostDom(post){
            return $(`<li id="post-${post._id}">
                <small><a class="delete-post" href="/posts/delete/?id=${post._id}">X</a></small>
            <p> ${post.content}</p>
            <p> ${post.user.name}</p>
           <div class="comment-section">
                <form class="create-comment-form" action="/comment/create" method="POST">
                    <input type="text" name="content" placeholder="comment here" required>
                    <input type="hidden" name="postId" value="${post._id}">
                    <input type="submit" value="comment">
                </form>
                <ul id="comment-list-${post._id}">
                    
                </ul>
            </div>
         </li>`)
        }

    
//below function is used for creating comments usinjax
    function createComment(commentFormLink){
        $(commentFormLink).submit(function(event){
            event.preventDefault();
            $.ajax({
                type: 'post',
                url: '/comment/create',
                data: $(this).serialize(),
                success: function(data){
                    let comment = createCommentDom(data.data.currComment);
                    //prepending the created DOM object of comment list item 
                    $(`#comment-list-${data.data.currComment.post}`).prepend(comment);
                    deleteComment($(' .delete-comment'), comment);
                },error: function(err){
                    console.log('Error: ', err);
                }
            })
        })
    }

    function commentFormInitialize(){
        let commentFormList =  $('.create-comment-form');
        for(let i of commentFormList){
            createComment(i);
        }
    }

    //used for creating a comment in DOM
    function createCommentDom(comment){
        return $(`<li id="comment-${comment._id}">
            <small><a class="delete-comment" href="/comment/delete/?id=${comment._id}">X</a></small>
        <p>${comment.content}</p>
     </li>`);
    }

    //below function is used for deleting comments using ajax
    function deleteComment(deleteCommentLink){
        $(deleteCommentLink).click(function(event){
            event.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteCommentLink).prop('href'),
                success: function(data){

                    $(`#comment-${data.data.commentId}`).remove();
                },error: function(err){
                    console.log('Error: ', err);
                }
            })
        })
    }

    function deleteCommentInitialize(){
        let deleteCommentList =  $('.delete-comment');
        for(let i of deleteCommentList){
            deleteComment(i);
        }
    }

        


    }

