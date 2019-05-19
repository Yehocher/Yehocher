<template>
    <div  class="alert">
        <div v-for="item in notices" :key="item.name" >
            <div class="alert-content">{{item.content}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name:'dpInput',
    data() {
        return {
            notices: []
        }
    },
    watch: {
   
    },
    methods: {
      
    },
}
</script>
<style lang="">
    .alert{
        position: fixed;
        width: 100%;
        top: 16px;
        left: 0;
        text-align: center;
        pointer-events: none;
    }
    .alert-content{
        display: inline-block;
        padding: 8px 16px;
        background: #fff;
        border-radius: 3px;
        box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
        margin-bottom: 8px;
    }
</style>