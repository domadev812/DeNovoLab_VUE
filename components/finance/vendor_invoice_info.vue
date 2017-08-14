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
				  <li class="breadcrumb-item active">Vendor Invoice Info</li>
			</ol>
			<h1 class="page-header">Vendor Invoice Info</h1>
            <div class="table_filters">
                 <router-link to="/finance/invoices" class="btn btn_white back bottom_null">
                    <span class="dnl_icon dnl_import"></span> Back 
                </router-link>
            </div>
            <div class="row">
                <div class="col-md-6 col-sm-6">
                    <div class="white_pad">
                        <p>
                            <b>Carrier Name:</b> 168_vcom_test
                        </p>
                        <p>
                            <b>Calculated On:</b> 2016-12-26 00:00:00+00
                        </p>
                        <p>
                            <b>System Minute:</b> 0.00 min(s)
                        </p>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6">
                    <div class="white_pad">
                        <p>
                            <b>Status:</b> Not Billed
                        </p>
                        <p>
                            <b>Billing Duration:</b> 2016-12-26 00:00:00+00 - 2016-12-26 23:59:59+00
                        </p>
                        <p>
                            <b>System Total:</b> 0.00
                        </p>
                    </div>
                </div>
                <div class="col-md-12 col-sm-12">
                    <div class="white_pad">
                        <div class="row">
                            <div class="col-md-3 col-sm-4">
                                <label>Import File:</label>
                                <dropzone id="myVueDropzone" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
                            </div>
                            <div class="col-md-3 col-sm-4">
                                <div class="form-group full-width-select">
                                    <label>Status:</label>
                                    <br>
                                    <select2 :options="options" v-model="status">
                                        <option disabled value="0">Select one</option>
                                    </select2>
                                </div>
                                <div class="form-group full-width-select">
                                   <label for="billed_minute">Billed Minute:</label>
								   <input type="text" name="billed_minute" v-model="billed_minute" class="form-control" placeholder="Enter Billed Minute">
                                </div>
                                <div class="form-group full-width-select">
                                   <label for="billed_total">Billed Total:</label>
								   <input type="text" name="time1" v-model="billed_total" class="form-control" placeholder="Enter Billed Total">
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            <div class="col-md-3 col-sm-4">
                                <a class="btn btn-primary m-top-25">
                                    Submit
                                </a>
                            </div>
                            <div class="clearfix"></div>
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
        data: function () {
            return {
                status: '',
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
                billed_minute: '',
                billed_total: ''
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
    a.btn.btn_white.back.bottom_null {
        margin-bottom: 0;
    }
</style>
