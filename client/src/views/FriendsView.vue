<template>
    <div class="friend-list-container">
        <Navbar />
        <h2>Friends</h2>
        <ul class="friend-list" >
            <li class="friends" v-for="friend in friends" :key="friend" @click="getUserProfile">
                <img v-if="friend.image" :src="friend.image" class="profile-img" alt="profile" />
                <img v-else :src="`../assets/logo.png`" class="profile-img" alt="profile" />
                <h2>{{ friend.username }}</h2>
            </li>
        </ul>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
    name: "Friends",
    components: { Navbar },
    data() {
        return {
            friends: [],
            usersName: ""
        }
    },
    mounted() {
        // this.fetchUserFriends();
        this.fetchFriendInfo();
    },
    methods: {
        async fetchUserFriends() {
            try {
                const response = await fetch(`http://localhost:5000/user/get-user`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        token: localStorage.token
                    }
                });
                const data = await response.json();
                this.friends = [...data.friends];
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        },
        async fetchFriendInfo() {
            try {
                const response = await fetch(`http://localhost:5000/friend/get/friend`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        token: localStorage.token
                    }
                });
                const data = await response.json();
                this.friends = [...data];
            } catch (error) {
                console.error(error);
            }
        },
        async getUserProfile(e) {
            try {
                // get user name
                let userName = e.target.children[1].innerText;
                if (userName) {
                    const response = await fetch(`http://localhost:5000/friend/user/info/${userName}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            token: localStorage.token
                        }
                    });
                    const data = await response.json();
                    console.log(data);
                    this.usersName = data.username;
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>

<style scoped lang="scss">
.friend-list-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    .friend-list {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 50%;
        list-style-type: none;
        gap: 5px;
        .friends {
            transition: 0.2s;
            display: flex;
            justify-content: space-between;    
            align-items: center;
            gap: 50px;
            padding: 10px;
            box-shadow: 0px 0px 3px #d1d1d1;
            width: 100%;
            h2 {
                width: 50%;
                text-align: left;
            }
            &:hover {
                cursor: pointer;
                background-color: #fff;
            }
        }
    }
}
.profile-img {
    width: 75px;
    height: 75px;
    object-fit: cover;
}
</style>