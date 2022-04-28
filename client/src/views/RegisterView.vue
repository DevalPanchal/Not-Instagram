<template>
    <div class="register" @submit.prevent="handleSubmit">
        <Card>
            <form class="register-form">
                <h1>Not-Instagram</h1>
                <p>Sign up to see photos and videos from your friends.</p>
                <input type="text" required v-model="username" placeholder="Username" />

                <input type="password" required v-model="password" placeholder="Password" />
                <div v-if="error" class="error">{{ error }}</div>

                <button>Register</button>
            </form>
        </Card>
        <Card class="card-2">
            <div>
                Have an account?
                <p class="login" @click="routeTo(`/login`)">Log in</p>
            </div>
        </Card>
    </div>
</template>

<script>
import Card from "../components/Card.vue";

export default {
    name: "Register",
    components: { Card },
    data() {
        return {
            username: "",
            password: "",
            error: ""
        }
    },
    methods: {
        routeTo(route) {
            this.$router.push(route);
        },
        async handleSubmit() {
            this.error = this.username.length > 3 ? "" : "Username must be greater than 3 characters";
            if (!this.error) {
                const body = { username: this.username, password: this.password };
                const response = await fetch("http://localhost:5000/auth/user/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                });
                const parseResponse = await response.json();

                console.log(parseResponse);

                if (parseResponse.token) {
                    localStorage.setItem("token", parseResponse.token);
                    this.username = "";
                    this.password = "";
                    this.$router.push("/");
                } else {
                    console.log("Error fetching");
                    this.error = parseResponse;
                    this.username = "";
                    this.password = "";
                }
            }
            this.uploadDesc();
        },
        async uploadDesc(){
            
            try {
                const response = await fetch(`http://localhost:5000/user/post-desc`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        token: localStorage.token
                    },
                    body: JSON.stringify({description: " "})
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
    },
    mounted() {
        if (localStorage.token) {
            this.$router.push("/");
            alert("You are already logged in");
        }
    }
}
</script>

<style lang="scss">
.register {
    background-color:  #fdfafa;
    /* border: 2px solid blue; */
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
}
.register-form {
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #fff;
    // border: 1px solid #d1d1d1;
    gap: 25px;
    p {
        margin: 0;
        font-weight: bold;
        width: 80%;
    }
    button {
        margin-bottom: 10px;
    }
}
.card-2 {
    margin: 25px;
    .login {
        display: inline-block; 
        color: #5dc1e2;
        transition: 0.2s;
        &:hover {
            cursor: pointer;
            color: #11b8f0;
        }
    }
}
</style>