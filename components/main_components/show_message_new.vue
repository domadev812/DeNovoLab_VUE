<template id="message-template">
    <transition name="fade">
        <div class="message alert" v-if="showMessage" :style="{ backgroundColor }">
          <span>{{ message }}</span>
        </div>
    </transition>
</template>

<script>
const { mapState } = require('vuex')
// This component is not meant to be used as <show_message></show_message>,
// but as a call to this.$store.dispatch('app_message/setAppMessage').
// See /stores/modules/app_message.js.
module.exports = {
  name: 'show_message',
  template: '#message-template',
  computed: {
    ...mapState({
      showMessage: state => state.app_message.showMessage,
      message: state => state.app_message.message,
      backgroundColor: state => state.app_message.backgroundColor
    })
  }
}
</script>

<style>
    .message{
        width : 100%;
        height : 35px;
        line-height: 35px;
        position : fixed;
        top: 0;
        text-align: center;
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
