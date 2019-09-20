<template>
    <div class="page-head">
        <span class="find-listen"></span>
        <div>
            
        </div>
        <span></span>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .page-head {
        display: flex;
        position: fixed;
        z-index: 999;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        background-color: aliceblue;
        padding-right: 10px;
        height: 50px;
        color: #666;
        font-size: 18px;
    }
    .page-head span {
        width: 50px;
        height: 50px;
    }
    .find-listen {
        background: url('../../assets/icon/normal_32px/listen.png') center center no-repeat;
    }
</style>

