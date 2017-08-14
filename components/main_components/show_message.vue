<template id="message-template">
    <transition name="fade">
        <div class="message alert" >{{ myMessage }}</div>
    </transition>
</template>

<script>
module.exports = {
    props: ['myMessage'],
    template: '#message-template',
    data: {
        show: true
    }
}
</script>

<style>
    .message{
        width : 100%;
        height : 35px;
        line-height: 35px;
        position : fixed;
        text-align: center;
        z-index: 1;
        z-index: 99999;
        color: white;
        font-weight: bold;
        padding:0px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
        opacity: 0
    }
</style>
