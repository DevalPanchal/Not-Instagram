<template>
	<div class="home">
		<Navbar />
		<!-- <button @click="logout">logout [remove later]</button> -->
		<AddComment />
		<div class="posts">
			<div class="post" v-for="post in posts" :key="post">
				<h2>{{ post.title }}</h2>
				<img :src="post.image" class="post-image" />
				<p v-if="post.description"><strong>Description:</strong> {{ post.description }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import AddComment from '../components/AddComment.vue';
export default {
	components: { Navbar, AddComment },
	data() {
		return {
			authenticated : false,
			requests: [],
			posts: []
		}
	},
	mounted () {
		this.isAuthorized();
		this.getRequests();
		this.getPosts();
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
					this.$toast.success("You have a new friend request!", { duration: 3000, position: "top-left" });
				}
			} catch (error) {
				console.error(error);
			}
		},
		async getPosts() {
			try {
				const response = await fetch("http://localhost:5000/post/all-posts", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						token: localStorage.token
					}
				});
				const data = await response.json();
				console.log(data);
				this.posts = [...data];
			} catch (error) {
				console.error(error);
			}
		}
	}
}
</script>

<style scoped lang="scss">
.home {
	background-color: #fafafa;
	padding-bottom: 50px;
}
.posts {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 15px;
	margin: 10px;
	
}
.post {
	width: 50%;
	background-color: #fff;
	box-shadow: 1px 1px 2px #dbdbdb;
}
.post-image {
	width: 350px;
	height: 350px;
	object-fit: cover;
}
</style>