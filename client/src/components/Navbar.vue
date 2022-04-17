<template>
    <nav class="header">
        <h1>Not-Instagram</h1>
        <section class="nav-section">
            <i class="fa-solid fa-house"></i>
            <i class="fa-solid fa-paper-plane"></i>
            <i class="fa-solid fa-heart"></i>
        </section>

    </nav>
</template>

<script>
export default {
    name: "Navbar"
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
</style>