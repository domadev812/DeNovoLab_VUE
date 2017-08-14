<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-header">
                        <h4>Are you sure you want to add?</h4>
                    </div>

                    <div class="modal-footer">
                        <button class="btn btn-danger" v-on:click="$emit('submit')">Add</button>
                        <button class="btn btn-primary" v-on:click="$emit('close')">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    Vue.component('confirmation-box', {
        template: '#modal-template'
        // methods: {
        //     confirmation: function()
        //     {
        //         this.$parent.confirmationDelete();
        //     }
        // }
    })
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
