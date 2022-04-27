<template>
    <div class="profileHeader">
        <Navbar />
        <div class="header-content">
            <h1>{{ username }}</h1>
            <h3 @click="routeTo(`/settings`)">Settings</h3>
            <i class="fa fa-cog" ></i>
        </div>
        <table>
            <tr>
                <td>{{ posts.length }} posts</td>
                <td class="friends" @click="routeTo(`/friends`)">{{ friends }} friends</td>
            </tr>
        </table>

        <p id="description">
            {{ description }}
        </p>

        <h2>POSTS</h2>

        <div class="image-container">
            <div class="image-grid-container">
                <div v-for="post in posts" :key="post" class="card">
                    <img :src="`../assets/${post}`" />
                </div>
            </div>
        </div>

    </div>
    
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
    components: { Navbar },
    data(){
        return{
            username: "",
            posts_amount: 0,
            friends: 0,
            description: "Default Description",
            posts: ["logo.png", "logo.png", "logo.png", "logo.png", "logo.png", "logo.png", "logo.png", "logo.png", "logo.png", "logo.png", "logo.png", "logo.png", "logo.png", "logo.png", "logo.png"]
        }
    },
    mounted() {
        this.getUserInfo();
    },
    methods: {
        routeTo(route) {
            this.$router.push(route);
        },
        async getUserInfo(){
            try {
                const res = await fetch("http://localhost:5000/user/get-user", {
                    method: "GET",
                    headers: {
                        token: localStorage.token
                    }
                });
                const parseRes = await res.json();
                this.friends = parseRes.friends.length;
                this.username = parseRes.username;
            } catch (error) {
                console.error(error);
            }
        }
    }
}

</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500&display=swap');

.header-content {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    h3 {
        font-size: 20px;
        border-radius: 5px;
        border: 1px solid #d1d1d1;
        padding: 5px 2px;
        margin: 0;
        transition: 0.2s;
        &:hover {
            cursor: pointer;
            background: #d1d1d1;
            color: #fff;
        }
    }
}

.profileHeader{
    font-family: "Quicksand", sans-serif;
    text-align: center;
}

h1 {
    font-family: "Quicksand", sans-serif;
    font-weight: 300;
}

table {
    font-weight: 400;
    font-size: 1.5rem;
    margin-left: auto;
    margin-right: auto;
}

td {
    padding-left: 2rem;
}

/* Pablo Villoslada 2013 Answer to "CSS technique for a horizontal line with words in the middle" CSS. http://jsfiddle.net/Puigcerber/vLwDf/1/ */
h2 {
    font-weight: 400;
    color: #cccccc;
    overflow: hidden;
    text-align: center;
}

h2:before, h2:after{
    background-color: #cccccc;
    content: "";
    display: inline-block;
    height: 1px;
    position: relative;
    vertical-align: middle;
    width: 50%;
}
h2:before {
    right: 0.5em;
    margin-left: -50%;
}
h2:after {
    left: 0.5em;
    margin-right: -50%;
}
/* End of CSS from Pablo Villoslada */

/* Posts */
.posts {
    margin-left: auto;
    margin-right: auto;
}

// .card { 
//     width: 20rem;
//     height: 20rem;
//     border: none;
//     float: left;
//     display: flex;
// }

.card-img-top {
    width: 20rem;
    height: 20rem;
}

.friends {
    transition: 0.2s;
    &:hover {
        cursor: pointer;
        color: #d1d1d1;
    }
}

.image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fafafa;
    .image-grid-container {
        display: grid;
        justify-content: center;
        align-content: center;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 15px;
        .card {
            display: flex;
            justify-content: center;
            align-items: center;
            border: none;
            img {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 20em;
                height: 20em;
                border: none;
            }
        }
    }
}
</style>
