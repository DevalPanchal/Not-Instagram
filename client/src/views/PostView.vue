<template>
    <div class="post">
        
        <!-- <Navbar /> -->
        
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
        <div class="container">
        <div
          class="previewBlock"
          @click="chooseFile"
          :style="{ 'background-image': `url(${filePreview})` }">
        </div>

        <div>
          <input class="form-control form-control-lg" ref="fileInput" type="file" id="formFileLg" @input="selectImgFile">
        </div>
        
    </div>
        <button @click="createPost" id="postButton" class="post-btn">Create Post</button>
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
            post_title: "",
            post_description: "",
            post_image: ""
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
                // this.friends = parseRes.friends.length;
                // this.username = parseRes.username;
            } catch (error) {
                console.error(error);
            }
        },
        async createPost() {
            console.log("TESTING");

            try {
                const res = await fetch("http://localhost:5000/user/get-user", {
                    method: "GET",
                    headers: {
                        token: localStorage.token
                    }
                });
                const parseRes = await res.json();
                console.log(parseRes);
                // this.friends = parseRes.friends.length;
                // this.username = parseRes.username;
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>

<style>
.container {
        max-width: 600px;
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
#postButton{
    width: 100px;
    height: 60px;
    background-color:  #2c3e50;
    color: white;
    padding: 0px;

}
</style>