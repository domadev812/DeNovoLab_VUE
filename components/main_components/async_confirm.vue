<template>
    <transition name="modal">
        <div class="modal-mask" v-show="show">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-header">
                        <h4>{{ message }}</h4>
                    </div>

                    <div class="modal-footer">
                        <button class="btn btn-danger async-confirm-btn">Confirm</button>
                        <button class="btn btn-primary async-decline-btn">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapState } from 'vuex'
// The code behind this component can be found at /store/modules/async_confirm
module.exports = {
  name: 'async-confirm',
  computed: {
    ...mapState({
      show: state => state.async_confirm.show,
      message: state => state.async_confirm.message
    })
  }
}
</script>

<style>
    .modal-container {
        width: 360px;
        padding: 2rem 3rem;
        background-color: #fff;
        text-align:center;
    }

    .modal-header h3 {
        margin-top: 0;
    }

    .modal-footer {
        text-align: center;
    }


    /*
    * The following styles are auto-applied to elements with
    * transition="modal" when their visibility is toggled
    * by Vue.js.
    *
    * You can easily play with the modal transition by editing
    * these styles.
    */

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
    .btn.btn-primary{
        width: auto;
    }
</style>
