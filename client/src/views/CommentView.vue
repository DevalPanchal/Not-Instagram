<template>
    <div class="comments">
        <Navbar />
        {{ post_title }}
        {{ post_description }}
        {{ post_image }}

        COMMENTS
        <!-- For every comment add to the table -->
        {{ comments }}
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
export default {
    components: { Navbar },
    data() {
        return {
            post_title: "",
            post_description: "",
            post_image: "",
            comments: []
        }
    },
    mounted() {
        loadPost()
    },
    methods: {
        loadPost() {
            // TODO: load the post (and its comments)
        },
        addComment() {
            // TODO: add a comment to the post
        },
        deleteComment() {
            // TODO: delete comment (can only delete your own)
        }

    }
}
</script>

<style>

</style>