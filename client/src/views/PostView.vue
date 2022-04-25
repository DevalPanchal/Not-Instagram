<template>
	<div class="post">
		<Navbar />
		
        <div>POST TITLE: </div>
        <div>POST DESCRIPTION (optional): </div>
        <div>POST PICTURE: attach file</div>
        <div>CREATE POST BUTTON</div>
	</div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
export default {
    components: { Navbar },
    data() {
        return {

        }
    },
    methods: {
        createPost() {

        }
    }
}
</script>

<style>

</style>