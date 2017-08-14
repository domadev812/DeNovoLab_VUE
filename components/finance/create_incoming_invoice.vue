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
				  <li class="breadcrumb-item active">Create Incoming Invoice</li>
			</ol>
			<h1 class="page-header">Create Incoming Invoice</h1>
            <div class="table_filters">
                 <router-link to="/finance/invoices" class="btn btn_white back bottom_null">
                    <span class="dnl_icon dnl_import"></span> Back 
                </router-link>
            </div>
            <div class="row">
                <div class="col-md-4 col-sm-4">
                    <div class="white_pad">
                        <div class="form-group">
                            <label>Carrier:</label>
                            <select2 :options="options" v-model="carrier">
                            </select2>
                        </div>
                        <div class="form-group">
                            <label for="amount">Amount:</label>
                            <input type="text" name="amount" v-model="amount" class="form-control" placeholder="Enter Amount">
                        </div>
                        <div class="form-group">
                            <label for="invoice_date">Invoice Date:</label>
                            <input type="text" name="alias" v-model="invoice_date" class="form-control" placeholder="Enter Invoice Date">
                        </div>
                        <div class="form-group">
                            <label for="invoice_no">Invoice No.:</label>
                            <input type="text" name="invoice_no" v-model="invoice_no" class="form-control" placeholder="Enter Invoice No">
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-4">
                    <div class="white_pad">
                        <div class="form-group">
                            <label for="invoice_period">Invoice Period:</label>
                            <input type="text" name="alias" v-model="invoice_period" class="form-control" placeholder="Enter Invoice Period">
                        </div>
                        <div class="form-group">
                            <label for="to">To:</label>
                            <input type="text" name="to" v-model="to" class="form-control" placeholder="Enter date">
                        </div>
                        <div class="form-group">
                            <label>GMT:</label>
                            <select2 :options="options" v-model="gmt">
                            </select2>
                        </div>
                        <div class="form-group">
                            <label for="due_date">Due Date:</label>
                            <input type="text" name="due_date" v-model="due_date" class="form-control" placeholder="Enter Date">
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-4">
                    <div class="white_pad">
                        <label>Import File:</label>
                        <dropzone id="myVueDropzone" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
                    </div>
                </div>
                <div class="clearfix"></div>
                <div class="col-md-12">
                    <div class="button_set">
                        <a class="btn btn-primary mini">
                            Submit
                        </a>
                    </div>
                </div>
            </div>
            <div class="clearfix little-space"></div>
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
                carrier: '',
                invoice_date: '',
                invoice_period: '',
                invoice_no: '',
                to: '',
                due_date: '',
                amount: '',
                gmt: ''
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
		}
    }
</script>

<style>
    a.btn.btn_white.back.bottom_null {
        margin-bottom: 0;
    }
</style>
