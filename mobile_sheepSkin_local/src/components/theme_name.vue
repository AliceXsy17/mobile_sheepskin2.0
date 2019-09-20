<template>
    <div class="container">
        <div></div>
        <div v-text="theme" ></div>
    </div>
</template>
<script>
export default {
    props: {
        theme: {
            default: ""
        }
    }
}
</script>
<style scoped>
.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90px;
    color: #85392b;
    font-size: 20px;
}
.container>div:first-child{
    width: 5px;
    height: 30px;
    background: #85392b;
}

</style>
