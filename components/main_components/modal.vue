<template>
	<transition name="modal">
		<div class="modal-mask">
		  <div class="modal-wrapper">
			<div class="modal-container">
			  <button type="button" @click="$emit('close')" data-dismiss="alert" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>
			  <div class="modal-header">
				<slot name="header">
				  default header
				</slot>
			  </div>

			  <div class="modal-body">
				<slot name="body">
				  default body
				</slot>
			  </div>

			  <div class="modal-footer">
				<slot name="footer">
				  default footer
				  <button class="modal-default-button" @click="$emit('close')">
					OK
				  </button>
				</slot>
			  </div>
			</div>
		  </div>
		</div>
	  </transition>
</template>

<script>
</script>

<style>
	.modal-mask {
	  position: fixed;
	  z-index: 9998;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  background-color: rgba(0, 0, 0, .5);
	  display: table;
	  transition: opacity .3s ease;
	}
	
	.modal-header {
		padding: 0;
		border: 0;
	}

	.modal-wrapper {
	  display: table-cell;
	  vertical-align: middle;
	}

	.modal-container {
	  width: 460px;
	  margin: 0px auto;
	  padding: 45px 60px;
	  background-color: #fff;
	  border-radius: 4px;
	  box-shadow: 0px 20px 30px 0px rgba(21, 24, 31, 0.2);
	  transition: all .3s ease;
	  max-height: 100%;
	  overflow-y: auto;
	}

	.modal-header h3 {
	  margin-top: 0;
	  color: #222;
	  font-size: 24px;
	}

	.modal-body {
	  margin: 20px 0;
	  padding: 0;
	}

	.modal-default-button {
	  float: right;
	}
	
	.modal-footer {
		border: 0;
		padding: 0;
		text-align: left;
	}
	
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
	
	.modal-container .close {
		color: #cbcbcb;
		font-size: 26px;
		font-weight: 100;
	}
	
	.modal-container .close:hover {
		opacity: 0.8;
		color: #cbcbcb;
	}
	
	.modal-container .close:focus {
		outline: none;
	}

</style>
