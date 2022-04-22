<template>
    <nav class="header">
        <h1>Not-Instagram</h1>
        <section class="nav-section">
            <i class="fa-solid fa-house" @click="routeTo(`/`)" ></i>
            <i class="fa-solid fa-paper-plane"></i>
            <i class="fa-solid fa-heart"></i>
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fas fa-user"></i>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="#" @click="routeTo(`/profile`)">Profile</a></li>
                    <li><a class="dropdown-item" href="#">Saved</a></li>
                    <li><a class="dropdown-item" href="#">Settings</a></li>
                    <hr />
                    <li><a class="dropdown-item" href="#" @click="logout">Log Out</a></li>
                </ul>
            </div>
        </section>
    </nav>
</template>

<script>
export default {
    name: "Navbar",
    methods: {
        routeTo(route) {
            this.$router.push(route);
        },
        logout() {
            localStorage.removeItem("token");
            this.$router.push("/login");
        }
    }
}
</script>

<style lang="scss">
.header {
    // border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    gap: 50px;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #d1d1d1;
    h1 {
        width: 50%;
        margin: 0;
    }
    .nav-section {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        i {
            font-size: 25px;
        }
    }
}
.fa-solid {
    transition: 0.1s;
    &:hover {
        cursor: pointer;
        opacity: 0.7;
    }
}
</style>