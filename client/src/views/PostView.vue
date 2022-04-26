<template>
	<div class="post">
		<Navbar />
		
        <div>
            POST TITLE: [Textbox class="post-title"]
        </div>
        <div>
            POST DESCRIPTION (optional): [Textbox class="post-description"]    
        </div>
        <div>
            POST PICTURE: attach file [Image select class="post-picture"]
        </div>
        <div>
            CREATE POST BUTTON [Button class="create-post-button", calls createPost()]
        </div>
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
            post_picture: ""
        }
    },
    mounted() {
        this.createPost()
    },
    methods: {
        routeTo(route) {
            this.$router.push(route);
        },
        createPost() {
            // TODO: add post to user's post array with
            // post_title, post_description and post_picture
            // along with an empty comments array
        }
    }
}
</script>

<style>

</style>