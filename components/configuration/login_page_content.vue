<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Configuration</a></li>
				  <li class="breadcrumb-item active">Login Page Content</li>
			</ol>
			<h1 class="page-header">Login Page Content</h1>
			<div class="white_pad configuration_pad">
				<h3 class="description">You may specify how your Invoice should be generated</h3>
					<div class="col-md-6 col-sm-12">
						<div class="imac_container">
							<div class="editor_preview" v-html="contentA"></div>
						</div>
						<label>Change Background Image:</label>
						<div class="invoice_bg">
    						<button v-on:click="process" class="btn btn-default">Change Image</button>
							<div class="checkbox checkbox-success"><input id="system_setting" name="system_setting" type="checkbox"> <label for="system_setting">Fit image to the screen</label></div>
						</div>
						<div class="fields">
							<div class="form-group">
								
							</div>
						</div>
					</div>
					<div class="col-md-6 col-sm-12">
						<section class="config_section">
							<label>Login Page Content:</label>
							<ckeditor v-model="contentA" :id="editorA" :height="'280px'" :toolbar="[['Format']]"></ckeditor>
						</section>
						<div class="button_set little-space">
							<a class="btn btn-primary">
								Submit
							</a>
							<a class="btn btn-default">
								Reset
							</a>
					  </div>
					</div>
				<div class="clearfix little-space"></div>
			</div>
		</div>
	  </div>
	</div>
</template>

<script>   
	const Ckeditor = require('vue!../main_components/ckeditor.vue'),
		  Dropzone = require('vue!../main_components/dropzone.vue'),
		  multiselect = require('multiselect');
	module.exports = {
		components: {
			Ckeditor,
			Dropzone,
			'multiselect': multiselect
		},
		data: function(){
            return {
				 editorA: 'editor-a',
				 contentA: ''
			}
        },
		mounted: function() {
			
		},
		methods: {
		  'success': function (file) {
			console.log('A file was successfully uploaded')
		  },
		  'process': function () {
			var newArr = this.$children.filter(function(item){
			  return item.id === "myVueDropzone";
			});
			var component = newArr[0];
			component.processQueue()
		  }
		}
	}
</script>

<style>
	.invoice_bg .checkbox-success {
		display: inline-block;
		margin: 4px 0 0 16px;
		vertical-align: middle;
	}
	
	.invoice_bg .btn.btn-default {
		padding-top: 4px;
		line-height: 0px;
	}
	
	.imac_container {
		width: 100%;
		height: 478px;
		background-size: 100% 100%;
		padding: 25px 25px 146px 25px;
		margin-bottom: 20px;
	}
	
	
	
	
	@media (max-width: 1200px) { 
		.imac_container {
			height: 400px;
		}
	}
	
	
	@media (min-width: 768px) and (max-width: 979px) {
		.imac_container {
			height: 600px;
			padding: 32px 39px 186px 39px;
		}
	}
	
	@media (max-width: 767px) {
		.imac_container {
			height: 280px;
		}
	}
	
	/* Landscape phones and down */
	@media (max-width: 480px) {
		.imac_container {
			height: 250px;
			padding: 15px 15px 76px 15px;
		}
		
		.invoice_bg .checkbox-success {
			display: block;
			margin: 20px 0 0 0px;
		}
	}

	/* Portrait phone to landscape phone */
	@media (min-width: 319px) and (max-width: 479px) {
		
	}
</style>
