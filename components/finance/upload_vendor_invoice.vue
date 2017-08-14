<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Finance</a></li>
				  <li class="breadcrumb-item">
					  <router-link to="/finance/invoices">Finance</router-link>
				  </li>
				  <li class="breadcrumb-item active">Upload Vendor Invoice</li>
			</ol>
			<h1 class="page-header">Upload Vendor Invoice</h1>
			<router-link to="/finance/invoices" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad">
				<div class="row">
					  <div class="col-md-3 col-sm-4">
                        <label>Import File:</label>
                        <dropzone id="myVueDropzone" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
                    </div>
                    <div class="col-md-3 col-sm-4">
                        <label>Records with duplicated ID:</label>
                        <div class="form-group">
                            <div class="radio radio-success">
                                <input id="radio-1" class="radio-custom" name="duplicates" type="radio" checked>
                                <label for="radio-1" class="radio-custom-label">Ignore</label>
                            </div>
                        </div>
                        <div class="form-group m-top-minus-25">
                            <div class="radio radio-success">
                                <input id="radio-2" class="radio-custom" name="duplicates" type="radio">
                                <label for="radio-2" class="radio-custom-label">Overwrite</label>
                            </div>
                        </div>
                         <div class="form-group full-width-select">
                            <label>Date Format:</label>
                            <br>
                            <select2 :options="options" v-model="date_format">
                                <option disabled value="0">Select one</option>
                            </select2>
                        </div>
                        <div class="form-group m-top-20">
                            <div class="checkbox checkbox-success"><input id="include_header" name="include_header" type="checkbox"> <label for="include_header">Include Header</label></div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="col-md-12">
                        <div class="button_set little-space">
                            <a class="btn btn-primary mini">
                                Upload
                            </a>
                        </div>
                    </div>
				  </div>
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
			  groupname: '',
			  received_on: '',
			  carrier: '',
			  amount: '',
			  note: '',
              type: '',
              date_format: '',
			  options: [
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
	}
</script>

<style>
</style>
