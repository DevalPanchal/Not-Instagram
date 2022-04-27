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
			authenticated : false,
			requests: []
		}
	},
	mounted () {
		this.isAuthorized();
		this.getRequests();
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
				localStorage.setItem("username", parseResponse.name);
			} catch (error) {
				console.error(error);
			}
		},
		async getRequests() {
			try {
				const response = await fetch("http://localhost:5000/user/get-user", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						token: localStorage.token
					}
				});
				const parseRes = await response.json();
				this.requests = [...parseRes.requests];
				console.log(this.requests);
				if (this.requests.length > 0) {
					this.$toast.success("You have a new friend request!", { duration: 1000, position: "top-left" });
				}
			} catch (error) {
				console.error(error);
			}
		}
	}
}
</script>

<style>

</style>