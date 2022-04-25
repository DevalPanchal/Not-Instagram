<template>
    <div class="profileHeader">
        <Navbar />
        <h1>{{ username }}</h1>
        <table class="subheader">
            <tr>
                <td>{{ posts_amount }} posts</td>
                <td>{{ friends }} friends</td>
            </tr>
        </table>

        <p id="description">
            {{ description }}
        </p>

        <h2>POSTS</h2>

        <table class="posts" id="postTable">
            <!-- <tr>
                <td>
                    <div class="card">
                        <img src="../assets/placeHolder1.png" class="card-img-top">
                    </div>
                </td>
                <td>
                    <div class="card">
                        <img src="../assets/placeHolder2.png" class="card-img-top">
                    </div>
                </td>
                <td>
                    <div class="card">
                        <img src="../assets/placeHolder3.png" class="card-img-top">
                    </div>
                </td>
            </tr>            -->

        </table>     

    </div>
    
</template>

<script>
import Navbar from '../components/Navbar.vue';
export default {
    components: { Navbar },
    data(){
        return{
            username: "",
            posts_amount: 6,
            friends: 0,
            description: "Default Description",
            posts: ["placeHolder1.png","placeHolder2.png","placeHolder3.png","placeHolder4.png","placeHolder5.png","placeHolder6.png"]
        }
    },
    mounted() {
        this.getUserInfo();
        this.getPosts();
        this.setPosts();
        this.createNewPost();
        this.loadMorePosts();
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
        },
        async getPosts() {
            // TODO: get all the user's posts
            try {
                const res = await fetch("http://localhost:5000/user/get-posts", { // TODO
                    method: "GET",
                    headers: {
                        token: localStorage.token
                    }
                });
                const parseRes = await res.json();
                
                /*
                    Post will have:
                    - Image
                    - Likes
                    - Comments
                    - Link
                */

            } catch (error) {
                console.error(error);
            }
        },
        setPosts(){
            let table = document.getElementById("postTable");
            let imgPath = "../assets/";
            let rows = Math.floor(this.posts_amount/3);
            let j = 0;
            for (let i = 0; i < rows; i++){
                let row = document.createElement("tr");
                for (; j < this.posts_amount; j++){
                    // Create table elements
                    let cell = document.createElement("td");
                    let card = document.createElement("div");
                    let img = document.createElement("img");

                    // Set class names
                    card.className = "card";
                    img.className = "card-img-top";

                    // Set Image to post
                    img.src = imgPath + this.posts[j];
                    console.log("path = " + imgPath + this.posts[j])
                    // Combine
                    card.appendChild(img);
                    cell.appendChild(card);
                    row.appendChild(cell);
                    if ((j + 1) % 3 == 0){
                        j++;
                        break;
                    }
                }
                table.appendChild(row);
            }
        },
        createNewPost() {
            // TODO
        },
        loadMorePosts() {
            // TODO, may or may not finish this
        }
    }
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500&display=swap');
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
.card { 
    width: 20rem;
    height: 20rem;
    border: none;
}
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
</style>