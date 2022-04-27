<template>
    <div class="comments">
        <Navbar />
        {{ post_title }}
        {{ post_description }}
        {{ post_image }}

        COMMENTS
        <!-- For every comment add to the table -->
        <ul class="comment-section" v-for="comment in comments" :key="comment">
            <li class="comments">{{comment.userId}}: {{ comment.text }}</li>
        </ul>
        <AddComment v-on:add-comment="insertComment" />
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
.ul{
    margin-left: 33%;
    margin-right: 60%;
}
</style>