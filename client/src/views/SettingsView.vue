<template>
    <div class="settings-container">
        <Navbar />

        <h2 id="settingsH2">Settings</h2>
        <div class="settings">
            <section class="left-panel">
                <div class="file-upload">
                    <label>Profile Picture</label>
                    <span>
                        <i class="fa fa-upload" aria-hidden="true"></i>
                        <input type="file" @change="handleChange" class="file-input" />
                    </span>
                </div>
                <div class="description-box">
                    <label>Description</label>
                    <textarea cols="45" rows="5" maxlength="255" id="textarea" @keyup="countChars"></textarea>

                    <div class="char-count">
                        <span id="chars">{{charCount}} / 255</span>
                    </div>

                </div>
            </section>

            <section class="right-panel">
                <div class="file-upload">
                    <button @click="onUpload" class="post-btn" :class="fileError" >Upload image</button>
                </div>

                <button class="delete-btn" @click="deleteAccount">Delete account</button>

                <button @click="uploadDesc">upload description</button>
            </section>
        </div>
    </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
    name: "Settings",
    components: { Navbar },
    data() {
        return {
            selectedFile: "",
            imageUri: "",
            extension: "",
            charCount: 0,
            description: "",
            fileError: "file-size-error"
        }
    },
    methods: {
        async deleteAccount() {
            try {
                if (localStorage.username) {
                    const response = await fetch(`http://localhost:5000/auth/user/delete/${localStorage.username}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            token: localStorage.token
                        }
                    });
                    const body = await response.json();

                    localStorage.removeItem("token");
                    localStorage.removeItem("username");
                    console.log(body);
                    this.$router.push("/login");
                }
            } catch (error) {
                console.error(error);
            }
        },
        handleChange(e) {
            const selectedFile = e.target.files[0];
            this.selectedFile = selectedFile;
            let filename = this.selectedFile.name;
            let reader = new FileReader();
            reader.readAsDataURL(this.selectedFile);
            if (this.selectedFile.size < 65000) {
                this.fileError = "";
                reader.onload = () => {
                    this.imageUri = reader.result;                
                    this.extension = filename.match(/\.[0-9a-z]+$/i);
                }
            } else {
                this.$toast.warning("Image size is too large", { duration: 3000, position: "top-left" });
                this.fileError = "file-size-error";
            }
        },
        async onUpload() {
            try {
                const response = await fetch(`http://localhost:5000/image/upload-profile-image`, {
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
        async uploadDesc(){
            console.log(this.description);
            try {
                const response = await fetch(`http://localhost:5000/user/post-desc`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        token: localStorage.token
                    },
                    body: JSON.stringify({description: this.description})
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
        countChars(){
            this.charCount = document.getElementById("textarea").value.length;
            this.description = document.getElementById("textarea").value;
        }
    }
}
</script>

<style scoped lang="scss">
.settings-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.settings {
    width: 60%;
    margin: 20px;
    border: 1px solid #d1d1d1;
    display: flex;

    @media(max-width: 550px) {
        flex-direction: column;
        .left-panel {
            width: 100%;
            border-right: none;
            border-bottom: 1px solid #d1d1d1;
        }
        .right-panel {
            width: 100%;
        }
    }

    .left-panel {
        padding-top: 10px;
        width: 50%;
        border-right: 1px solid #d1d1d1;
        input {
            border-radius: 5px;
        }
        label {
            margin-right: 5%;
        }
        .description-box{
            margin: 10px;
            textarea {
                height: 6rem;
                width: 25rem;
                margin-left: 2.3rem;
                border-radius: 5px;
            }
            // label {
            //     margin-right: 5%;
            //     padding-bottom: 5%;
            // }
            .char-count {
                float: right;
            }
        }
    }
    .right-panel {
        width: 50%;
        padding: 10px;
    }
}
.post-btn{
    margin-bottom: 10px;
    width: 50%;
    height: 3rem;
    border-radius: 5px;
}
.delete-btn {
    border: none;
    width: 150px;
    padding: 3px 5px;
    text-align: center;
    color: #fff;
    background-color: #df3838;
    transition: 0.2s;
    &:hover {
        background-color: #f13838;
    }
}
#settingsH2{
    text-align: center;
    margin-top: 2rem;
}
input[type="file"] {
	color: #000;
	cursor: pointer;
    padding: 0;
    background-color: #fff;
    border: 1px solid #dbdbdb;
    &::-webkit-file-upload-button {
        border: none;
        background-color: #1a242f;
        color: #dbdbdb;
        transition: 0.2s;
        height: 100%;
        padding: 7px 5px;
        &:hover {
            cursor: pointer;
            background-color: #283a52;
        }
    }
}
.file-input {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    
}
.file-size-error {
    display: none;
}
</style>
