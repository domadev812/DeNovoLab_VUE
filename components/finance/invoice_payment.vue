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
				  <li class="breadcrumb-item active">Old Vendor Invoice Payment</li>
			</ol>
			<h1 class="page-header">Old Vendor Invoice Payment</h1>
			<router-link to="/finance/invoices" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad">
				<div class="chart_select_header grided rounded">
					  <div class="col-md-3 col-sm-4">
							<label for="payment_date">Payment Date:</label>
							<input type="text" name="payment_date" v-model="payment_date" class="form-control" placeholder="Enter Payment Date">
					  </div>
					  <div class="col-md-3 col-sm-4">
							<label for="payment">Payment:</label>
							<input type="text" name="amount" v-model="payment" class="form-control" placeholder="Enter Payment">
					  </div>
					  <div class="col-md-3 col-sm-4">
							<label for="note">Note:</label>
							<input type="text" name="note" v-model="note" class="form-control" placeholder="Enter Note">
					  </div>
                      <div class="col-md-3 col-sm-4">
							<a class="btn btn-primary mini m-top-25">
                                Submit
                            </a>
					  </div>
                      <div class="clearfix"></div>
				  </div>
                  <div class="clearfix little-space"></div>
                  <div class="table-responsive">
					<table class="table table-striped table-hover carrier_groups aligned-center">
					  <thead>
						 <tr>
                            <th>Invoice Number</th>
							<th>Invoice Amount</th>
							<th>Due Amount</th>
							<th>Period</th>
							<th>Due Date</th>
                            <th>Pay Amount</th>
						 </tr>
					  </thead>
					  <tbody>
						<tr v-for="payment in invoice_payments">
						  <td>{{payment.invoice_number}}</td>
						  <td>{{payment.invoice_amount}}</td>
                          <td>{{payment.due_amount}}</td>
						  <td>{{payment.period}}</td>
						  <td>{{payment.due_date}}</td>
                          <td>{{payment.pay_amount}}</td>
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
	const vSelect = require('vue!../main_components/select.vue');
	module.exports = {
		components: {
			'select2': vSelect
		},
		data: function(){
            return {
			  payment_date: '',
			  payment: '',
			  note: '',
			  options: [
				  { id: 1, value: 'carrier1', text: 'Carrier 1' },
				  { id: 2, value: 'carrier2', text: 'Carrier 2' },
				  { id: 3, value: 'carrier3', text: 'Carrier 3' },
				  { id: 4, value: 'carrier4', text: 'Carrier 4' },
				  { id: 5, value: 'carrier5', text: 'Carrier 5' }
			  ],
              invoice_payments: [
                  {
                      invoice_number: '204',
                      invoice_amount: '10',
                      due_amount: '0',
                      period: '2016-10-24 00:00:00+00~2016-10-24 23:59:59+00',
                      due_date: '2016-10-24',
                      pay_amount: '18'
                  }
              ]
            }
        }
	}
</script>

<style>
</style>
