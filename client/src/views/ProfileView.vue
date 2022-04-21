<template>
    <header class="profileHeader">
        <h1>{{username}}</h1>

        <table>
            <tr>
                <td>{{posts}} posts</td>
                <td>{{friends}} friends</td>
            </tr>
        </table>

        <p id="description">
            {{description}}
        </p>

        <h2>POSTS</h2>

    </header>
    
</template>

<script>

export default {
    data(){
        return{
            username: "",
            posts: 0,
            friends: 0,
            description: "Default Description"
        }
    },
    mounted() {
        this.getUserInfo();
    },
    methods: {
        async getUserInfo(){
            try {
                const res = await fetch("http://localhost:5000/user/get-user", {
                    method: "GET",
                    headers: {
                        token: localStorage.token
                    }
                });
                const parseRes = await res.json();
                this.username = parseRes.username;
                // console.log(parseRes);
            } catch (error) {
                console.error(error);
            }
        }
    }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500&display=swap');

header{
    font-family: "Quicksand", sans-serif;
    text-align: center;
}

h1 {
    font-family: "Quicksand", sans-serif;
    /* text-align: center; */
    font-weight: 300;
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

table {
    font-weight: 400;
    font-size: 1.5rem;
    margin-left: auto;
    margin-right: auto;
}

td {
    padding-left: 2rem;
}

</style>
