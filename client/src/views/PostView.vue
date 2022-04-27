<template>
    <div class="post">
        
        <Navbar />
        
        <section class="left-panel">
        </section>
            <section class="right-panel">
            <h2>Post Title</h2>
            <h2>Post Description</h2>
            <h2>Post Image</h2>
            <div class="file-upload">
                <input type="file" @change="handleChange" />
                <button @click="onUpload" class="post-btn">Create Post</button>
            </div>
        </section>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
export default {
    name: "Post",
    components: { Navbar },
    data() {
        return {
            post_title: "",
            post_description: "",
            post_image: ""
        }
    },
    mounted() {
        // this.createPost()
    },
    methods: {
        // routeTo(route) {
        //     this.$router.push(route);
        // },
        handleChange(e) {
            const selectedFile = e.target.files[0];
            this.selectedFile = selectedFile;
            let filename = this.selectedFile.name;
            let reader = new FileReader();
            reader.readAsDataURL(this.selectedFile);
            reader.onload = () => {
                this.imageUri = reader.result;                
                this.extension = filename.match(/\.[0-9a-z]+$/i);
            }
        },
        async onUpload() { // TODO: fix this
            try {
                const response = await fetch(`http://localhost:5000/image/upload-post-image`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        token: localStorage.token
                    },
                    body: JSON.stringify({ imageUri: this.imageUri, extension: this.extension })
                });
                const parseRes = await response.json();
                if (parseRes) {
                    console.log(parseRes);
                    this.$router.go();
                }
            } catch (error) {
                console.error(error);
            }
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
        createPost() {
            // TODO: add post to user's post array with
            // post_title, post_description and post_picture
            // along with an empty comments array
        }
    }
}
</script>

<style>

</style>