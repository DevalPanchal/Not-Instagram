<template>
    <div class="profileHeader">
        <Navbar />
        <div class="header-content">
            <!-- Header contains username, links to posting and settings -->
            <h1>{{ username }}</h1>
            <h4 @click="routeTo(`/new-post`)">New Post</h4>
            <h3 @click="routeTo(`/settings`)">Settings</h3>
            <i class="fa fa-cog" ></i>
        </div>
        <table>
            <!-- Table to hold friends and posts counts -->
            <tr>
                <td>{{ posts.length }} posts</td>
                <td class="friends" @click="routeTo(`/friends`)">{{ friends }} friends</td>
            </tr>
        </table>

        <p id="description">
            {{ description }}
        </p>

        <h2>POSTS</h2>

        <!-- User's Posts -->
        <div class="image-container">
            <div class="image-grid-container">
                <div v-for="post in posts" :key="post" class="card">
                    <img :src="post.image" @click="routeTo(`/post`)" />
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
            description: " ",
            posts: [],
            post_id: [],
            post_image_path: []
        }
    },
    mounted() {
        this.getUserInfo();
        this.getUserPost();
    },
    methods: {
        routeTo(route) {
            this.$router.push(route);
        },
        async getUserInfo(){
            try {
                // Fetch user information from the server
                const res = await fetch("http://localhost:5000/user/get-user", {
                    method: "GET",
                    headers: {
                        token: localStorage.token
                    }
                });

                // apply data 
                const parseRes = await res.json();
                this.friends = parseRes.friends.length;
                this.username = parseRes.username;
                this.description = parseRes.description;
            } catch (error) {
                console.error(error);
            }
        },
        async getUserPosts(){
            try {
                const res = await fetch("http://localhost:5000/post/all-posts", {
                    method: "GET",
                    headers: {
                        token: localStorage.token
                    }
                });
                const parseRes = await res.json();
                console.log(parseRes);
                
            } catch (error) {
                console.error(error);
            }
        },
        async getUserPost() {
            try {
                const response = await fetch("http://localhost:5000/post/get-user-post", {
                    method: "GET",
                    headers: {
                        token: localStorage.token
                    }
                });
                const data = await response.json();
                console.log(data);
                if (data === "No images") {
                    this.posts = [];
                } else {
                    this.posts = [...data];
                }
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

    h4 {
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
        // grid-template-columns: 1fr 1fr 1fr 1fr;
        @media (max-width: 650px) {
            grid-template-columns: 1fr;
        }

        @media (min-width: 651px) and (max-width: 1000px) {
            grid-template-columns: 1fr 1fr;
        }
        @media (min-width: 1001px) {
            grid-template-columns: 1fr 1fr 1fr;
        }
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
