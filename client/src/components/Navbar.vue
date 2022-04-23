<template>
    <nav class="header">
        <h1>Not-Instagram</h1>
        <section class="nav-section">
            <i class="fa-solid fa-house" @click="routeTo(`/`)" ></i>
            <i class="fa-solid fa-paper-plane"></i>

            <div class="dropdown" @click="fetchUsers">
                <button class="btn btn-secondary users dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-heart"></i>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" @click="stopDropDown">
                    <li class="list-item" v-for="user in users" :key="user">
                        <a class="dropdown-item">{{ user }}</a>
                        <button v-if="this.requestSent.includes(user)" class="added-btn" disabled="true">sent</button>
                        <button v-else class="add-btn" @click="sendFriendRequest(user)">Add</button>
                    </li>
                    <hr />
                    <p>Requests</p>
                    <li class="list-item" v-for="request in requests" :key="request">
                        <a class="dropdown-item">{{ request }}</a>
                        <button class="add-btn" @click="acceptFriendRequest(request)">Accept</button>
                    </li>
                </ul>
                
            </div>

            <!-- <i class="fa-solid fa-heart"></i> -->
            <div class="dropdown">
                <button class="btn btn-secondary user dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <p>{{ this.currentUser }}</p> <i class="fas fa-user"></i>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="#" @click="routeTo(`/profile`)">Profile</a></li>
                    <li><a class="dropdown-item" href="#">Saved</a></li>
                    <li><a class="dropdown-item" href="#">Settings</a></li>
                    <hr />
                    <li><a class="dropdown-item" href="#" @click="logout">Log Out</a></li>
                </ul>
            </div>
        </section>
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
            requestSent: [],
            requests: [],
            friends: [],
            currentUser: localStorage.username
        }
    },
    mounted() {
        this.fetchUserInfo();
    },
    methods: {
        routeTo(route) {
            this.$router.push(route);
        },
        logout() {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
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
                // console.log(this.users);
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
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>

<style lang="scss">
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
        i {
            font-size: 25px;
        }
    }
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
</style>