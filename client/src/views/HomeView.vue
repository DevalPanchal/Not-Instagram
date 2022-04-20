<template>
	<div class="home">
		<Navbar />
		<!-- <button @click="logout">logout [remove later]</button> -->
	</div>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
	components: { Navbar },
	data() {
		return {
			authenticated : false
		}
	},
	mounted () {
		this.isAuthorized();
	},
	methods: {
		logout() {
			localStorage.removeItem("token");
			this.$router.push("/login");
		},
		async isAuthorized() {
			try {
				const response = await fetch("http://localhost:5000/auth/user/verify", {
					method: "GET",
					headers: {
						"Content-Type": "application.json",
						token: localStorage.token
					}
				});
				const parseResponse = await response.json();
				parseResponse.verify === true ? this.authenticated = true : this.authenticated = false;
			} catch (error) {
				console.error(error);
			}
		},
	}
}
</script>

<style>

</style>