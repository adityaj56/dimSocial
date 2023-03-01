{
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
                },error: function(err){
                    console.log('Error in creating post: ', err);
                }
            })
        });
    }

    //method to create a post in DOM
        function createPostDom(post){
            return $(`<li id="post-${post._id}">
            <small><a class="delete-post" href="/posts/delete/?id=${post._id}">X</a></small>
            <p> ${post.content}</p>
            <p> ${post.user.email}</p>
        <div class="comment-section">
            <form action="/comment/create" method="POST">
                <input type="text" name="content" placeholder="comment here" required>
                <input type="hidden" name="postId" value="${post._id}">
                <input type="submit" value="comment">
        </form>
        
        <ul >
                
        </ul>
        </div>
    </li>`)
        }

    function deletePost(){
        $('.delete-post').click(function(event){
            event.preventDefault();
            $.ajax({
                type: 'GET',
                url: $(this).attr('href'),
                success: function(data){
                    $(`#post-${data.data.postId}`).remove();
                },error: function(err){
                    console.log('Error: ', err);
                }
            });
        })
    }

        createPost();
        deletePost();


    }

