<template>
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
            <h1 class="navbar-brand">Not-Instagram</h1>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    
                </ul>

                <div class="right-side">
                    <form id="search-form" role="search" @click.prevent="fetchUsers()">
                        <input v-model="searchString" type="search" id="query" placeholder="Search user..." name="q" aria-label="Search for user">
                        <div class="dropdown" @click="searchUsers()">
                            <button class="btn btn-secondary users dropdown-toggle" type="button" id="search" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" @click="stopDropDown">
                                <li v-for="user in this.filteredUsers" :key="user" class="list-item">
                                    <img class="profile-img" v-if="user.image" :src="user.image" />
                                    <img class="profile-img" v-else :src="`../assets/logo.png`" />
                                    <a v-if="this.filteredUsers.includes(user)" class="dropdown-item">{{ user.username }}</a>
                                    <button v-if="this.requestSent.includes(user.username)" class="added-btn" disabled="true">sent</button>
                                    <button v-else-if="!this.friends.includes(user.username)" class="add-btn" @click.prevent="sendFriendRequest(user.username)">Add</button>
                                </li>
                            </ul>
                        </div>  
                    </form>

                    <div class="dropdown" @click="fetchUsers">
                        <button class="btn btn-secondary users dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-heart"></i>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" @click="stopDropDown">
                            <p class="requests">Friends</p>
                            <li class="list-item" v-for="friend in friends" :key="friend">
                                <a  class="dropdown-item">{{ friend }}</a>
                            </li>
                            <hr />
                            <p class="requests">Requests</p>
                            <li class="list-item" v-for="request in requests" :key="request">
                                <a class="dropdown-item">{{ request }}</a>
                                <button class="add-btn" @click="acceptFriendRequest(request)">Accept</button>
                            </li>
                        </ul>
                    </div>

                    <i class="fa-solid fa-house" @click="routeTo(`/`)" ></i>
                    <i class = "fa-solid fa-plus" @click="routeTo(`/new-post`)"></i>
                    
                    <div class="dropdown">
                        <button class="btn btn-secondary user dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <p>{{ this.currentUser }}</p> 
                            <!-- <i class="fas fa-user"></i> -->
                            <img v-if="profileImage.length>0" :src="profileImage" class="profile-img" alt="profile" />
                            <img v-else :src="`../assets/logo.png`" class="profile-img" alt="profile" />
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item" href="#" @click="routeTo(`/profile`)">Profile</a></li>
                            <li><a class="dropdown-item" href="#">Saved</a></li>
                            <li><a class="dropdown-item" href="#" @click="routeTo(`/settings`)">Settings</a></li>
                            <hr />
                            <li><a class="dropdown-item" href="#" @click="logout">Log Out</a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import Dropdown from '../components/Dropdown.vue';

export default {
    name: "Navbar",
    components: { Dropdown },
    data() {
        return {
            users: [],
            userImages: [],
            requestSent: [],
            requests: [],
            friends: [],
            currentUser: localStorage.username,
            searchString: "",
            filteredUsers: [],
            profileImage: "",
        }
    },
    mounted() {
        this.fetchUserInfo();
        this.getProfileImage();
    },
    methods: {
        routeTo(route) {
            this.$router.push(route);
        },
        logout() {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("userProf");
            this.$router.push("/login");
        },
        stopDropDown(e) {
            e.stopPropagation();
        },
        async fetchUsers() {
            try {
                const response = await fetch(`http://localhost:5000/user/all-users`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        token: localStorage.token
                    }
                });
                const parseRes = await response.json();  
                this.users = [...parseRes];
                this.userImages = [...parseRes.map(item => item.image)];

                console.log(this.users);
            } catch (error) {
                console.error(error);
            }
        },
        async sendFriendRequest(friend) {
            try {
                console.log("Adding friend", friend);
                const response = await fetch(`http://localhost:5000/friend/request/${friend}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        token: localStorage.token
                    }
                });
                const parseRes = await response.json();
                console.log("friend request successfully sent");
                console.log(parseRes);
                this.$router.go();
            } catch (error) {
                console.error(error);
            }
        },
        async fetchUserInfo() {
            try {
                const res = await fetch("http://localhost:5000/user/get-user", {
                    method: "GET",
                    headers: {
                        token: localStorage.token
                    }
                });
                const parseRes = await res.json();
                this.friends = [...parseRes.friends];
                this.requests = [...parseRes.requests];
                this.requestSent = [...parseRes.requestSent];
            } catch (error) {
                console.error(error);
            }
        },
        async acceptFriendRequest(request) {
            try {
                const res = await fetch(`http://localhost:5000/friend/accept/${request}`, {
                    method: "POST",
                    headers: {
                        token: localStorage.token
                    }
                });
                const parseRes = await res.json();
                console.log(parseRes);
                // remove after accepting friend
                this.requests.slice(request, 1);

                this.$toast.success("friend request accepted", { duration: 2000, position: "top-left" });
                if (typeof parseRes === "string") {
                    this.$toast.warning(parseRes, { duration: 1000, position: "top-left" });
                }
                setTimeout(() => {
                    this.$router.go();
                }, 2000);
            } catch (error) {
                console.error(error);
            }
        },
        async searchUsers() {
            try {
                // console.log(this.searchString);
                // console.log(this.users);
                this.filteredUsers = this.users.filter((user) => user.username.toLowerCase().includes(this.searchString.toLowerCase()));
                console.log(this.filteredUsers);
            } catch (error) {
                console.error(error);
            }
        },
        async getProfileImage() {
			try {
				const response = await fetch(`http://localhost:5000/image/profile-image`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						token: localStorage.token
					}
				});
				const parseRes = await response.json();
				this.profileImage = parseRes.image;
			} catch (error) {
				console.error(error);
			}
		}
    }
}
</script>

<style lang="scss">
.navbar-brand {
    margin: 0;
    font-size: 42px;
}
.navbar {
    background-color: #fff;
}
nav {
    border-bottom: 1px solid #ddd;
}
.container-fluid {
    flex-wrap: none;
    gap: 10px;
}
.navbar-toggler {
    width: 60px;
}
.header {
    // border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    gap: 50px;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #d1d1d1;
    h1 {
        width: 50%;
        margin: 0;
    }
    .nav-section {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        
    }
}
i {
    font-size: 25px;
}
.fa-solid {
    transition: 0.1s;
    &:hover {
        cursor: pointer;
        opacity: 0.7;
    }
}
.dropdown {
    display: flex;
    justify-content: center;
    align-items: center;
}
.users, .user {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    text-align: center;
    background-color: #fff;
    color: #2c3e50;
    border: none;
    transition: 0.1s;
    p {
        margin-bottom: 0;
    }
    &:hover {
        background: none;
        color: #2c3e50;
    }
}
.dropdown-toggle::after {
    display: none
}
.list-item {
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        cursor: pointer;
    }
    .add-btn {
        width: 50px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5px;
        font-weight: 100;
    }
    .added-btn {
        width: auto;
        height: 30px;
        color: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #2c3e50;
        background-color: #fff;
        opacity: 0.3;
        margin: 5px;
        font-weight: 100;
    }
}

#dropdownMenuButton1{
    width: auto;
}

#search-form {
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: left;
    border: 1px solid #2c3e50;
    padding-top: 5px;
    padding-bottom: 5px;
}

#query{
    all: unset;
    font: 16px system-ui;
    height: 100%;
    width: 100%;
    padding: 5px 5px;
}

::placeholder {
    opacity: 0.7;   
}   

.requests {
    padding-left: 15px;
    font-weight: bolder;
}
.profile-img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid black;
    padding: 2px;
}

.user {
    img {
        transition: 0.3s;
        &:hover {
            cursor: pointer;
            background-color: #2c3e50;
        }
    }
}

.right-side {
    @media (max-width: 550px) {
        flex-direction: column;
    }
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}
</style>