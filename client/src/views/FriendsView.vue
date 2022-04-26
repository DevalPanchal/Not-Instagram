<template>
    <div class="friend-list-container">
        <Navbar />
        <h2>Friends</h2>
        <ul class="friend-list" v-for="friend in friends" :key="friend">
            <li class="friends">{{ friend }}</li>
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
        this.fetchUserFriends();
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
        }
    }
}
</script>

<style scoped lang="scss">

</style>