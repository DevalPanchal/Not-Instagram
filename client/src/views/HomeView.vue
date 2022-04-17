<template>
	<div class="home">
		<Navbar />
		<button @click="logout">logout [remove later]</button>
	</div>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
	components: { Navbar },
	mounted () {
		if (!localStorage.token) {
			this.$router.push("/login");
			alert("You are not logged in");
		}
	},
	methods: {
		logout() {
			localStorage.removeItem("token");
			this.$router.push("/login");
		}
	}
}
</script>

<style>

</style>