<template>
    <div class="login">
        <Card>
            <form class="login-form" @submit.prevent="handleSubmit">
                <h1>Not-Instagram</h1>
                <input type="text" required v-model="username" placeholder="Username" />

                <input type="password" required v-model="password" placeholder="Password" />
                <div v-if="error" class="error">{{ error }}</div>

                <button>Login</button>
                <hr />
                <p>Forgot password?</p>
            </form>
        </Card>
        <Card class="card-2">
            <div>Don't have an account? 
                <p class="sign-up" @click="routeTo(`/register`)">Sign-up</p>
            </div>
        </Card>
    </div>
</template>

<script>
import Card from "../components/Card.vue";

export default {
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
                try {
                    const body = { username: this.username, password: this.password };
                    const response = await fetch("http://localhost:5000/auth/user/login", {
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
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
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
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,500&family=Poppins:wght@300&family=Roboto&family=Spline+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Grand+Hotel&family=Playfair+Display:ital,wght@1,500&family=Poppins:wght@300&family=Roboto&family=Spline+Sans&display=swap');
h1 {
    margin: 20px;
    font-family: 'Grand Hotel', 'Playfair Display', serif;
}
.login {
    background-color:  #fdfafa;
    /* border: 2px solid blue; */
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
}
.login-form {
    /* border: 2px solid red; */
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #fff;
    gap: 25px;
    hr {
        width: 80%;
        margin: 0;
        
    }   
    p {
        margin: 0;

    }
}
input {
    width: 70%;
    padding: 10px;
    background-color: #fdfbfb;
    border: 1px solid #b9b9b9b4;
}
button {
    width: 77%;
    padding: 0;
    border: none;
    border-radius: 3px;
    color: #fff;
    font-weight: bold;
    padding: 10px 6px;
    background-color: #5dc1e2;
    transition: 0.2s;
    &:hover {
        cursor: pointer;
        background-color: #11b8f0;
    }
}
.card-2 {
    background-color: #fff;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    .sign-up {
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