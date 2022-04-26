<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "Card"
}
</script>

<style>
.card {
    width: 320px;
    height: auto;
    border: 1px solid #b9b9b9b4;
    
}
</style>