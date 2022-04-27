<template>
    <div class="user-profile-container">
        <Navbar />
        <div class="user-profile">
            <h1>{{ name }}</h1>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
    name: "UserProfile",
    component: { Navbar },
    props: ['name']
}
</script>

<style>

</style>