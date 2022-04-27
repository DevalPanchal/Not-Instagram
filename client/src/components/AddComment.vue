<template>
    <div class="addComment">
    <form @submit="addComment">
        
        <!-- need to replace placeholder with user profile picture -->
        
        <div id ="commenting" class ="input-group">
            <input type="text" v-model="comment" name="commentbox" id="commentBox" placeholder="Write a comment!"/>
            <button type = "btn"  id = "commentButton"> Send </button>
        </div>

    
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
                userId: this.userId,
                postId: this.postId
            };
            console.log(this.comment)
            console.log(this.userId)
            console.log(this.postId)
            // TODO: send this info to the database
            this.$emit('add-comment', newComment)
            this.comment = ''
        }
    }
}
</script>

<style scoped lang="scss">
#commenting{
    margin-left:auto;
    margin-right:auto;
    width:100%;
    height:10px;
}
#dp{
    width: 30px;
    height: 30px;
}
#commentButton{
    text-align: center;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    width: 60px;
    background-color:  #2c3e50;;
    height: 30px;
    padding: 0px;
}
#commentBox{
    padding: 0px;
    margin-left:auto;
    margin-right:auto;
    width: 81%;
    height: 30px;
}
.addComment{
        padding: 1rem;
    }

</style>