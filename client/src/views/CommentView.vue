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
                    <AddComment v-on:add-comment="insertComment" />
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
        insertComment(newComment){
            console.log("comment added")
            comments.push({id: "3", userId: "0", postId: "0", text: newComment, likes: 0});
            console.log("comment added")

        },
        loadPost() {
            // TODO: load the post (and its comments)
        },
        addComment() {
            // TODO: add a comment to the post
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