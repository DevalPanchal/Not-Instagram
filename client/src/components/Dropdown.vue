<template>
    <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <slot name="icon"></slot>
        </button>
        <!-- <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        </ul> -->
        <slot name="list"></slot>
    </div>
</template>

<script>
export default {
    name: "Dropdown",
}
</script>

<style>

</style>