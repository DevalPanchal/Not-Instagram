<template>
    <div class="friend-list-container">
        <Navbar />
        <h2>Friends</h2>
        <ul class="friend-list" v-for="friend in friends" :key="friend">
            <li class="friends">
                <img :src="friend.image" class="profile-img" alt="profile" />
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
            friends: []
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
        width: 50%;
        list-style-type: none;
        .friends {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 15px;
        }
    }
}
.profile-img {
    width: 75px;
    height: 75px;
    object-fit: contain;
}
</style>