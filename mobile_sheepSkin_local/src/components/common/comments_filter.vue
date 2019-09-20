<template>
  <ul class="comments_filter">
      <li v-cloak v-for="(item, i) of content" :key="i" @click="choose(i)" :class="{'active': index == i}">{{`${item.content}(${item.length})`}}</li>
  </ul>
</template>
<script>
export default {
    props: {
        content: {
            default() {
                return []
            }
        }
    },
    data() {
     return {
         index: 0
     }
    },
    methods: {
        choose(i) {
        this.index = i;
        this.bus.$emit("comments_filter",i);
        }
    },
}
</script>
<style scoped>
.comments_filter{
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: space-between;
}
.comments_filter li{
    padding: 5px;
    background: #ccc;
    border-radius: 5px;
    color: #fff;
    font-size: 14px;
}
.active {
    background: #85392b !important;
}
</style>
