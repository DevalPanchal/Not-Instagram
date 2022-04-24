<template>
    <div class="settings-container">
        <Navbar />
        
        <div class="settings">
            <section class="left-panel">
            </section>
            <section class="right-panel">
                <h2>Settings</h2>
                <button class="delete-btn" @click="deleteAccount">Delete account</button>
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

    .left-panel {
        width: 30%;
        border-right: 1px solid #d1d1d1;
    }
    .right-panel {
        width: 70%;
        padding: 10px;
    }
}
.delete-btn {
    border: none;
    width: 150px;
    padding: 3px 5px;
    text-align: center;
    background-color: #df3838;
    color: #fff;
    transition: 0.2s;
    &:hover {
        background-color: #f13838;
    }
}
</style>