<template>
    <Navbar />
    <div class="post">
        
        
        <!-- <section class="left-panel">
        </section>
            <section class="right-panel">
            <h2>Post Title</h2>
            <h2>Post Description</h2>
            <h2>Post Image</h2>
            <div class="file-upload">
                <input id="imageSelect" type="file" @change="handleChange" />
            </div>
            <button @click="onUpload" id="postButton" class="post-btn">Create Post</button>
        </section> -->
        <div class="post-container">
            <div class="previewBlock" @click="chooseFile" :style="{ 'background-image': `url(${filePreview})` }">
            </div>
            <div class="section">
                <label for= "title">Upload an image: </label>
                <input class="form-control form-control-lg" ref="fileInput" type="file" id="formFileLg" @input="handleChange">
            </div>
            <div class="section">
                <label for= "title">Title: </label>
                <input v-model="title" type="text" name="titleInput" id="title" class="title" placeholder="Write a title!"/>
            </div> 
            <div class="section">
                <label for= "desc">Desc: </label> 
                <input v-model="post_description" type="text" name="descInput" class="description" id="desc" placeholder="Write a description(optional)!"/>
            </div>    
            <button @click="createPost" id="postButton" class="post-btn">Create Post</button>
        </div>
    
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
export default {
    name: "Post",
    components: { Navbar },
    data() {
        return {
            filePreview: null,
            title: "",
            post_description: "",
            post_image: "",
            extension: "",
            selectedFile: ""
        }
    },
    // mounted() {
        // this.createPost()
    // },
    methods: {
        // routeTo(route) {
        //     this.$router.push(route);
        // },
        chooseFile () {
            this.$refs.fileInput.click()
        },
        selectImgFile () {
            let fileInput = this.$refs.fileInput
            let imgFile = fileInput.files

            if (imgFile && imgFile[0]) {
              let reader = new FileReader
              reader.onload = e => {
                this.filePreview = e.target.result
              }
              reader.readAsDataURL(imgFile[0])
              this.$emit('fileInput', imgFile[0])
            }
        },
        handleChange(e) {
            const selectedFile = e.target.files[0];
            if (selectedFile[0] !== ".jpg" || selectedFile[0] !== ".png") {
                this.$toast.warning("Wrong image type, only jpg and png are allowed", { duration: 3000, position: "top-left" });
                setTimeout(() => {
                    this.$router.go();
                }, 1000);
            }
            console.log(e.target.files);
            this.selectedFile = selectedFile;
            let filename = this.selectedFile.name;
            let reader = new FileReader();
            reader.readAsDataURL(this.selectedFile);
            if (this.selectedFile.size < 65000) {
                reader.onload = (e) => {
                    this.imageUri = reader.result;   
                    this.filePreview = e.target.result
                    this.extension = filename.match(/\.[0-9a-z]+$/i);
                    console.log(this.extension);
                }
            } else {
                this.$toast.warning("Image size is too large", { duration: 3000, position: "top-left" });
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
                // this.friends = parseRes.friends.length;
                // this.username = parseRes.username;
            } catch (error) {
                console.error(error);
            }
        },
        async createPost() {           
            try {
                const body = { title: this.title, extension: this.extension[0], imageUri: this.imageUri, description: this.post_description };
                const response = await fetch("http://localhost:5000/post/add-post", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        token: localStorage.token
                    },
                    body: JSON.stringify(body)
                });
                const parseResponse = await response.json();
                // console.log("A")
                console.log(parseResponse);
                this.title = "";
                this.extension = "";
                this.imageUri = "";
                this.filePreview = "";
                this.description = "";

            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>

<style>
#formFileLg{
    display: inline-block;
}
#title{
    padding: 2px;
}

#he{
    display: inline-block;
}
.post {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 70%;
}
.post-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.title {
    margin: 5px;
    height: 30px;
    width: 100%;
}
.description {
    width: 100%;
    height: 30px;
}
.section {
    display: flex;
    justify-content: center;
    align-items: center;
}
.previewBlock {
    display: block;
    cursor: pointer;
    width: 300px;
    height: 280px;        
    margin: 0 auto 20px;
    background-position: center center;
    background-size: cover;
}
#imageSelect{
    width: 300px;
    height: 50px;
}
.post-btn {
    margin: 10px;
    width: 100px;
    height: 42px;
    background-color:  #2c3e50;
    color: white;
    padding: 0px;

}
</style>