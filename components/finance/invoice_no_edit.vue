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
				  <li class="breadcrumb-item active">Invoice Edit</li>
			</ol>
			<h1 class="page-header">Invoice Edit</h1>
			<router-link to="/finance/invoices" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad">
                <div class="col-md-3 col-sm-4">
                        <label>Attach CDR file:</label>
                        <dropzone id="myVueDropzone" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
                </div>
                <div class="col-md-3 col-sm-4">
                    <div class="clearfix little-space"></div>
                    <p><b>Invoice No</b> 204</p>
                    <p><b>Invoice Date</b> 2016-10-24 00:00:00+00</p>
                    <p><b>Type</b> incoming Invoices</p>
                    <p><b>Due Date</b> 2016-10-24</p>
                    <p><b>Client</b> a</p>
                </div>
                <div class="col-md-3 col-sm-4">
                    <div class="clearfix little-space"></div>
                    <p><b>Period</b> 2016-10-24 00:00:00+00 - 2016-10-24 23:59:59+00</p>
                    <p><b>Total</b> 10.00 / 10.00</p>
                    <p><b>State</b> normal</p>
                    <p><b>Credit</b> 0.00</p>
                </div>
                <div class="clearfix little-space"></div>
                  <div class="col-md-6">
                      <div class="button_set little-space">
                        <a class="btn btn-primary mini">
                            Submit
                        </a>
                        <a class="btn btn-default mini">
                            Cancel
                        </a>
                      </div>
                  </div>
                  <div class="clearfix"></div>
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
