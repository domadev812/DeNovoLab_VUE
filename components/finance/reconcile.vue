<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Finance</a></li>
				  <li class="breadcrumb-item">
					  <router-link to="/finance/invoices">Invoices</router-link>
				  </li>
				  <li class="breadcrumb-item active">Reconcile</li>
			</ol>
			<h1 class="page-header">Reconcile</h1>
			<router-link to="/finance/invoices" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad">
                <div class="col-md-3 col-sm-4">
                        <label>Upload file to compare:</label>
                        <dropzone id="myVueDropzone" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
                </div>
                <div class="col-md-9 col-sm-8">
                    <div class="clearfix little-space"></div>
                    <p><b>Current Status:</b> Complete</p>
                    <a class="btn btn-primary mini inline_bt">
                        Start Compare
                    </a>
                    <a class="btn btn-default mini inline_bt">
                        Down Example file
                    </a>
                </div>
                <div class="clearfix little-space"></div>
                  <div class="col-md-6">
                      <div class="button_set little-space">
                        <a class="btn btn-primary mini">
                            Submit
                        </a>
                      </div>
                  </div>
                  <div class="clearfix little-space"></div>
                  <div class="table-responsive">
					<table class="table table-striped table-hover carrier_groups aligned-center">
					  <thead>
                        <tr>
                            <th colspan="3">Partner</th>
                            <th colspan="2">Switch</th>
                            <th colspan="2">Minute Diff</th>
                            <th colspan="2">Cost Diff</th>
                        </tr>
                        <tr>
                            <th>Code</th>
                            <th>Minute</th>
                            <th>Cost</th>
                            <th>Minute</th>
                            <th>Cost</th>
                            <th>Amt</th>
                            <th>%</th>
                            <th>Amt</th>
                            <th>%</th>
                        </tr>
                        </thead>
					  <tbody>
						<tr>
						  <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
						</tr>
					  </tbody>
					</table>
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
