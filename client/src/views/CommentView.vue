<template>
    <div class="comments">
        <Navbar />
        <div class = "row">
            <div class = "column" id= "left">
                {{ post_title }}
                {{ post_description }}
                {{ post_image }}
                <h2>PLACEHOLDER IMAGE:</h2>
                <img src = "..\..\..\server\storage\images\user_Amogus\profile.png">
            </div>
            <div class = "column" id = "right">
                <h3>COMMENTS</h3>
                <!-- For every comment add to the table -->
                <ul class="comment-section" id="commentsection" v-for="comment in comments" :key="comment">
                    <li class="comments">{{comment.userId}}: {{ comment.text }}</li>
                </ul>
                <div class = "row" id="sendComment">
                    <div class="addComment">
                        <form @submit="addComment">
                            
                            <!-- need to replace placeholder with user profile picture -->
                            
                            <div id ="commenting" class ="input-group">
                                <input type="text" v-model="commentText" name="commentbox" id="commentBox" placeholder="Write a comment!"/>
                                <button type = "btn"  id = "commentButton"> Send </button>
                            </div>

                        
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import AddComment from "../components/AddComment.vue";
export default {
    name: "Comment",
    components: { Navbar, AddComment },
    data() {
        return {
            post_title: "",
            post_description: "",
            post_image: "",
            comments: [{ id: "0",
                    userId: "0",
                    postId: "0",
                    text: "0",
                    likes: 0
                },
                { id: "1",
                    userId: "1",
                    postId: "0",
                    text: "123",
                    likes: 69
                }]
            
        }
    },
    mounted() {
        loadPost()
    },
    methods: {
        async insertComment(){
            try {
                console.log("Adding comment")
                console.log(newComment)
                this.commentText = te
                const body = { postId: this.postID, text: this.commentText };
                const response = await fetch("http://localhost:5000/comment/add-comment", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        token: localStorage.token
                    },
                    body: JSON.stringify(body)
                });
                const parseResponse = await response.json();
                console.log(parseResponse);

            } catch (error) {
                console.error(error);
            }

        },
        loadPost() {
            // TODO: load the post (and its comments)
        },
        async loadComment() {
            try {
                const response = await fetch(`http://localhost:5000/comment/all-comments`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        token: localStorage.token
                    }
                });
                const data = await response.json();
                this.comments = data;
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        },
        deleteComment() {
            // TODO: delete comment (can only delete your own)
        },
        likePost() {
            // TODO: like the post
        },
        likeComment() {
            // TODO: like a comment
        }

    }
}
</script>

<style>
#commenting{
    margin-left:auto;
    margin-right:auto;
    width:100%;
    height:10px;
}
#dp{
    width: 30px;
    height: 30px;
}
#commentButton{
    text-align: center;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    width: 60px;
    background-color:  #2c3e50;;
    height: 30px;
    padding: 0px;
}
#commentBox{
    padding: 0px;
    margin-left:auto;
    margin-right:auto;
    width: 81%;
    height: 30px;
}
.addComment{
        padding: 1rem;
    }
#sendComment{
    margin-top: 90%;
    margin-left: 0%;
    margin-right: 90%;
    margin-bottom: auto;
    width: 100%;
    padding: 0px;
}
.img{
    width: 500px;
    height: 500px;
}
#left {
    border: 1px solid grey;
    width: 500px;
    height: 500px;
    padding: 0px;
    margin-left: auto;
    background-color: black;
    border-collapse: collapse;
    }
#right {
    border: 1px solid grey;
    width: 350px;
    height: 500px;
    padding: 0px;

    margin-right: auto;
    border-collapse: collapse;
    }
#commentsection{
    list-style-type: none;
    margin-right: 33%;
    text-align: left;
}
</style>