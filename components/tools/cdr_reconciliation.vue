<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Tools</a></li>
				  <li class="breadcrumb-item active">Create New CDR Reconciliation</li>
			</ol>
			<h1 class="page-header">Create New CDR Reconciliation</h1>
			<div class="white_pad configuration_pad">
                <div class="col-md-3 col-sm-4">
                    <div class="form-group">
                        <label for="compare_type">Compare Type:</label>
                        <select2 :options="options" v-model="compare_type"></select2>
                    </div>
                </div>
                <div class="clearfix"></div>
                <div class="col-md-3 col-sm-4">
                    <label>Your CDR:</label>
                    <dropzone id="myVueDropzone" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
                </div>
                <div class="col-md-3 col-sm-4">
                    <label>Partner’s CDR:</label>
                    <dropzone id="myVueDropzone2" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
                </div>
                <div class="clearfix"></div>
                <div class="col-md-12">
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
	const vSelect = require('vue!../main_components/select.vue'),
          Dropzone = require('vue!../main_components/dropzone.vue');
	module.exports = {
		components: {
			'select2': vSelect,
            Dropzone
		},
		data: function(){
            return {
			  compare_type: '',
			  options: [
				  { id: 1, text: 'Success' },
				  { id: 2, text: 'Multiple' },
				  { id: 3, text: 'Moved Permanently' },
				  { id: 4, text: 'Moved Temporarily' },
				  { id: 5, text: 'Use Proxy' },
				  { id: 6, text: 'Alternative Service' },
				  { id: 7, text: 'Bad Request' },
				  { id: 8, text: 'Unauthorized' },
				  { id: 9, text: 'Payment Required' },
			  ],
			  groupname: '',
			  groups: [
				  { id: 1, value: 'carrier1', text: 'Carrier 1' },
				  { id: 2, value: 'carrier2', text: 'Carrier 2' },
				  { id: 3, value: 'carrier3', text: 'Carrier 3' },
				  { id: 4, value: 'carrier4', text: 'Carrier 4' },
				  { id: 5, value: 'carrier5', text: 'Carrier 5' }
			  ]
            }
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
		},
		mounted: function() {
			
		}
	}
</script>

<style>

</style>
