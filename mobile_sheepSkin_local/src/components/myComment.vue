<template>
    <div>
      <h3>我的评论列表</h3>
      <comment-list :comments_list = "mycomments"></comment-list>  
    </div>
</template>
<script>
import commentList from "./common/comment_content.vue"
export default {
   data() {
     return {
       mycomments: []
     }
   },
    created() {
     this.axios.get("/comments/mycomment").then( result => {
         if(result.data.code === 1) {
        this.mycomments = this.mycomments.concat(result.data.data);
         } else {
           this.$toast(result.data.msg);
           this.$router.push("/login");
         }
     });
    },
    components: {
      commentList
    }
}
</script>
<style scoped>

</style>
