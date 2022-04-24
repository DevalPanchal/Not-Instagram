<template>
    <div class="addComment">
    <form @submit="addComment">
    
        <label for="title"> Comment: </label>
        <input type="text" v-model="comment" name="commentbox" placeholder="WRite a comment!"/>

       
        <button class="btn"> Send </button>

    </form>
    </div>
</template>

<script>

export default {
    name:'AddComment',
    data() {
        return {
            comment: '',

        }
    }, 
    methods: {
        addComment(event){
            // prevent from submiting the page
            event.preventDefault()
            console.log("add comment clicked")
            //collect the data
            const newComment = {
                comment: this.comment,
                userId: this.userId
            };
            console.log(this.comment)
            console.log(this.userId)
            this.$emit('add-comment', newComment)
            this.comment = ''
            this.completed = false

        }
    }
}
</script>

<style scoped lang="scss">
.addComment{
        padding: 1rem
    }
</style>