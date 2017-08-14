<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Finance</a></li>
				  <li class="breadcrumb-item active">Payment</li>
			</ol><div>abc</div>
			<h1 class="page-header">Payment</h1>
			<div class="btn-group" role="group">
			  <router-link :to="'/finance/payment/'+ payment_type +'/new'" class="btn btn-default create_new_iconed"><span class="dnl_icon dnl_add"></span> Create New</router-link>
			  <button type="button" class="btn btn-default" v-on:click="exportCSV()">
				  <span class="dnl_icon dnl_export" ></span> Export
			  </button>
			</div>
			<tabs class="agent_tabs" @activateTab="activateTab">
				<tab label="Received" class="" icon="dnl_icon dnl_to_left" selected>
					<div class="chart_select_header grided rounded">
						<div class="col-md-3 col-sm-4">
							<label>Carrier:</label>
							<select2 :options="options" v-model="carrier">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="col-md-6 col-sm-6">
							<div class="inlined">
								<label for="time1">From:</label>
								<input type="text" name="time1" v-model="time1" class="form-control" placeholder="Enter Date/Time">
							</div>
							<div class="inlined">
								<label for="time2">To:</label>
								<input type="text" name="time2" v-model="time2" class="form-control" placeholder="Enter Date/Time">
							</div>
						</div>
						<div class="col-md-3 col-sm-2">
							<label>GMT:</label>
							<select2 :options="options" v-model="gmt">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="clearfix little-space"></div>
						<div class="col-md-3 col-sm-3">
							<label for="amount">Amount:</label>
							<input type="text" name="amount" v-model="amount" class="form-control" placeholder="Enter Amount">
						</div>
						<div class="col-md-3 col-sm-3">
							<label for="amount_to">To:</label>
							<input type="text" name="amount_to" v-model="amount_to" class="form-control" placeholder="Enter Amount To">
						</div>
						<div class="col-md-3 col-sm-4">
							<a class="btn btn-primary m-top-25">
								Query
							</a>
						</div>
						<div class="clearfix"></div>
					</div>
					<div class="pull-right pagination top_pagination">
						<pagination :current-page="pageOne.currentPage"
									:total-pages="pageOne.totalPages"
									@page-changed="pageOneChanged">
						</pagination>
					</div>
					<div class="table_filters searcheable m-top-20">
						<div class="inline-block select_min_wrapper">
							<span class="inline-block">Page row:</span>
							<select2 :options="options1" v-model="selected1" class="inline-block" @pagecount="changePageRow">
							</select2>
						</div>
						<div class="inline-block">
							<select2 :options="options2" v-model="selected2">
								<option disabled value="0">Show/Hide Columns</option>
							</select2>
						</div>
					</div>
					<div class="clearfix"></div>
					<div class="table-responsive">
						<table class="table table-striped table-hover agents">
						  <thead>
							<tr>
							  <th></th>
							  <th>Payment Id</th>
							  <th>Entered Time</th>
							  <th>Received On</th>
							  <th>Carrier</th>
							  <th>Amount</th>
							  <th>Type</th>
							  <th>Update by</th>
							  <th class="width_138">Action</th>
							</tr>
						  </thead>
						  <tbody v-for="payment in payments">
							<tr>
							  <td><a class="toogler" @click="toggleTable($event)">+</a></td>
							  <td>{{payment.id}}</td>
							  <td>{{payment.payment_time}}</td>
							  <td>{{payment.receiving_time}}</td>
							  <td>{{payment.client_name}}</td>
							  <td>{{payment.amount}}</td>
							  <td>{{payment.type}}</td>
							  <td>{{payment.updated_by}}</td>
							  <td>
								  <a class="action action_send" data-toggle="tooltip" data-placement="top" title="Send E-mail to Carrier">
									  <span class="dnl_icon dnl_support"></span>
								  </a>
								  <a class="action action_read" data-toggle="tooltip" data-placement="top" title="Show Note" @click="showModal='show_note'">
									  <span class="dnl_icon dnl_eye"></span>
								  </a>
								  <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" @click="askDeleteConfirm(payment.client_payment_id)">
									  <span class="dnl_icon dnl_action_delete"></span>
								  </a>
							 </td>
							</tr>
							<tr class="accordian-body collapse no_padding">
								<td colspan="8">
									<div class="table-responsive">
										<table class="table table-striped table-hover agents">
											<thead>
												<tr>
													<th>Invoice Number</th>
													<th>Amount</th>
													<th>Invoice Period</th>
													<th>Due Date</th>
													<th>Total Paid Amount</th>
													<th>Due Amount</th>
													<th>Current Payment Paid Amount</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="detail in payment.details">
													<td>{{detail.invoice_number}}</td>
													<td>{{detail.amount}}</td>
													<td>{{detail.invoice_period}}</td>
													<td>{{detail.due_date}}</td>
													<td>{{detail.total_paid_amount}}</td>
													<td>{{detail.due_amount}}</td>
													<td>{{detail.current_payment_paid_amount}}</td>
												</tr>
											</tbody>
										</table>
									</div>
								</td>
							</tr>
						  </tbody>
						</table>
					</div>
					<div class="pull-right pagination">
						<pagination :current-page="pageOne.currentPage"
									:total-pages="pageOne.totalPages"
									@page-changed="pageOneChanged">
						</pagination>
					</div>
					<div class="clearfix"></div>
				</tab>
				<tab label="Sent" class="" icon="dnl_icon dnl_to_right">
					<div class="chart_select_header grided rounded">
						<div class="col-md-3 col-sm-4">
							<label>Carrier:</label>
							<select2 :options="options" v-model="carrier">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="col-md-6 col-sm-6">
							<div class="inlined">
								<label for="time1">From:</label>
								<input type="text" name="time1" v-model="time1" class="form-control" placeholder="Enter Date/Time">
							</div>
							<div class="inlined">
								<label for="time2">To:</label>
								<input type="text" name="time2" v-model="time2" class="form-control" placeholder="Enter Date/Time">
							</div>
						</div>
						<div class="col-md-3 col-sm-2">
							<label>GMT:</label>
							<select2 :options="options" v-model="gmt">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="clearfix little-space"></div>
						<div class="col-md-3 col-sm-3">
							<label for="amount">Amount:</label>
							<input type="text" name="amount" v-model="amount" class="form-control" placeholder="Enter Amount">
						</div>
						<div class="col-md-3 col-sm-3">
							<label for="amount_to">To:</label>
							<input type="text" name="amount_to" v-model="amount_to" class="form-control" placeholder="Enter Amount To">
						</div>
						<div class="col-md-3 col-sm-4">
							<a class="btn btn-primary m-top-25">
								Query
							</a>
						</div>
						<div class="clearfix"></div>
					</div>
					<div class="pull-right pagination top_pagination">
						<pagination :current-page="pageOne.currentPage"
									:total-pages="pageOne.totalPages"
									@page-changed="pageOneChanged">
						</pagination>
					</div>
					<div class="table_filters searcheable m-top-20">
						<div class="inline-block select_min_wrapper">
							<span class="inline-block">Page row:</span>
							<select2 :options="options1" v-model="selected1" class="inline-block">
							</select2>
						</div>
						<div class="inline-block">
							<select2 :options="options2" v-model="selected2">
								<option disabled value="0">Show/Hide Columns</option>
							</select2>
						</div>
					</div>
					<div class="clearfix"></div>
					<div class="table-responsive">
						<table class="table table-striped table-hover agents">
						  <thead>
							<tr>
							  <th></th>
							  <th>Payment Id</th>
							  <th>Entered Time</th>
							  <th>Received On</th>
							  <th>Carrier</th>
							  <th>Amount</th>
							  <th>Update by</th>
							  <th class="width_138">Action</th>
							</tr>
						  </thead>
						  <tbody v-for="payment in payments">
							<tr>
							  <td><a class="toogler" @click="toggleTable($event)">+</a></td>
							  <td>{{payment.id}}</td>
							  <td>{{payment.entered_time}}</td>
							  <td>{{payment.received_on}}</td>
							  <td>{{payment.carrier}}</td>
							  <td>{{payment.amount}}</td>
							  <td>{{payment.updated_by}}</td>
							  <td>
								  <a class="action action_send" data-toggle="tooltip" data-placement="top" title="Send E-mail to Carrier">
									  <span class="dnl_icon dnl_support"></span>
								  </a>
								  <a class="action action_read" data-toggle="tooltip" data-placement="top" title="Show Note" @click="showModal='show_note'">
									  <span class="dnl_icon dnl_eye"></span>
								  </a>
								  <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete">
									  <span class="dnl_icon dnl_action_delete"></span>
								  </a>
							 </td>
							</tr>
							<tr class="accordian-body collapse no_padding">
								<td colspan="8">
									<div class="table-responsive">
										<table class="table table-striped table-hover agents">
											<thead>
												<tr>
													<th>Invoice Number</th>
													<th>Amount</th>
													<th>Invoice Period</th>
													<th>Due Date</th>
													<th>Total Paid Amount</th>
													<th>Due Amount</th>
													<th>Current Payment Paid Amount</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="detail in payment.details">
													<td>{{detail.invoice_number}}</td>
													<td>{{detail.amount}}</td>
													<td>{{detail.invoice_period}}</td>
													<td>{{detail.due_date}}</td>
													<td>{{detail.total_paid_amount}}</td>
													<td>{{detail.due_amount}}</td>
													<td>{{detail.current_payment_paid_amount}}</td>
												</tr>
											</tbody>
										</table>
									</div>
								</td>
							</tr>
						  </tbody>
						</table>
					</div>
					<div class="pull-right pagination">
						<pagination :current-page="pageOne.currentPage"
									:total-pages="pageOne.totalPages"
									@page-changed="pageOneChanged">
						</pagination>
					</div>
					<div class="clearfix"></div>
				</tab>
				<!-- <tab label="Upload" class="" icon="dnl_icon dnl_download">
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
                    </div>
                    <div class="col-md-3 col-sm-4">
                        <label>Data Type:</label>
                        <div class="form-group">
                            <div class="radio radio-success">
                                <input id="radio-3" class="radio-custom" name="payment" type="radio" checked>
                                <label for="radio-3" class="radio-custom-label">Payment Sent</label>
                            </div>
                        </div>
                        <div class="form-group m-top-minus-25">
                            <div class="radio radio-success">
                                <input id="radio-4" class="radio-custom" name="payment" type="radio">
                                <label for="radio-4" class="radio-custom-label">Payment Received</label>
                            </div>
                        </div>
                        <div class="form-group m-top-50">
                            <div class="checkbox checkbox-success"><input id="include_header" name="include_header" type="checkbox"> <label for="include_header">Include Header</label></div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="col-md-12">
                        <div class="button_set little-space">
                            <a class="btn btn-primary mini">
                                Upload
                            </a>
                            <a class="btn btn-default mini">
                                Show Example
                            </a>
                        </div>
                    </div>
                    <div class="clearfix"></div>
				</tab> -->
				<tab label="Auto Payment Log" class="" icon="dnl_icon dnl_qos_report">
                     <div class="tab_wrapper">
                            <div class="chart_select_header grided rounded">
                                <div class="col-md-3 col-sm-3">
                                    <label>Client:</label>
                                    <select2 :options="options" v-model="client">
                                        <option disabled value="0">Select one</option>
                                    </select2>
                                </div>
                                <div class="col-md-3 col-sm-3">
                                    <label>Staus:</label>
                                    <select2 :options="options" v-model="status">
                                        <option disabled value="0">Select one</option>
                                    </select2>
                                </div>
                                <div class="col-md-3 col-sm-3">
                                    <div class="form-group">
                                        <label for="submitted_date2">Submitted Time:</label>
                                        <!-- <input type="text" name="submitted_time1" v-model="submitted_time1" class="form-control" placeholder="Enter Time"> -->
										<el-date-picker style="width: 100%;" type="datetime" v-model="submitted_time1" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
                                    </div>
                                </div>
                                <div class="col-md-3 col-sm-3">
                                    <div class="form-group">
                                        <label for="submitted_time2" class="m-top-15"></label>
                                        <!-- <input type="text" name="submitted_time2" v-model="submitted_time2" class="form-control" placeholder="Enter Time"> -->
										<el-date-picker style="width: 100%;" type="datetime" v-model="submitted_time2" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                                <div class="col-md-3 col-sm-3">
                                    <a class="btn btn-primary m-top-10">
                                        Query
                                    </a>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                            <div class="pull-right pagination top-pagination">
                                <pagination :current-page="pageOne.currentPage"
                                            :total-pages="pageOne.totalPages"
                                            @page-changed="pageOneChanged">
                                </pagination>
                            </div>
                            <div class="table_filters searcheable m-top-20">
                                <div class="inline-block select_min_wrapper">
                                    <span class="inline-block">Page row:</span>
                                    <select2 :options="options1" v-model="selected1" class="inline-block">
                                    </select2>
                                </div>
                                <div class="inline-block">
                                    <select2 :options="options2" v-model="selected2">
                                        <option disabled value="0">Show/Hide Columns</option>
                                    </select2>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            <div class="table-responsive">
                                <table class="table table-striped table-hover carrier_groups originators">
                                  <thead>
                                    <tr>
                                      <th>Client <span class="dnl_icon dnl_sort pull-right"></span></th>
                                      <th>Submitted Time</th>
                                      <th>Response Time</th>
                                      <th>Method</th>
                                      <th>Charge Total</th>
                                      <th>Fee</th>
                                      <th>Status</th>
                                      <th>Paypal ID</th>
                                      <th>Transaction ID</th>
                                      <th>Card Number</th>
                                      <th>Card Expire Month</th>
                                      <th>Card Expire Year</th>
                                      <th>Return Code</th>
                                      <th>Error Information</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="client in clients">
                                      <td>{{client.name}}</td>
                                      <td>{{client.submitted_time}}</td>
                                      <td>{{client.response_time}}</td>
                                      <td>{{client.method}}</td>
                                      <td>{{client.charge_total}}</td>
                                      <td>{{client.fee}}</td>
                                      <td>{{client.status}}</td>
                                      <td>{{client.paypal_id}}</td>
                                      <td>{{client.transaction_id}}</td>
                                      <td>{{client.card_number}}</td>
                                      <td>{{client.card_expire_month}}</td>
                                      <td>{{client.card_expire_year}}</td>
                                      <td>{{client.return_code}}</td>
                                      <td>{{client.error_information}}</td>
                                    </tr>
                                  </tbody>
                                </table>
                            </div>
                            <div class="pull-right pagination">
                                <pagination :current-page="pageOne.currentPage"
                                            :total-pages="pageOne.totalPages"
                                            @page-changed="pageOneChanged">
                                </pagination>
                            </div>
                        <div class="clearfix"></div>
                  </div>
				</tab>
			</tabs>
		</div>
	  </div>
	  <modal v-if="showModal=='show_note'" @close="showModal = ''">
			<h3 slot="header">Details</h3>
			<div slot="body">
			  ...
			</div>
			<div slot="footer">
				<button @click="closeModal" class="btn btn-default cancel centered">Cancel</button>
			</div>
		</modal>
	</div>
</template>

<script>   
	const vTabs = require('vue!../main_components/tabs.vue'),
		  vTab = require('vue!../main_components/tab.vue'),
		  vSelect = require('vue!../main_components/select.vue'),
		  Pagination = require('vue!../main_components/pagination.vue'),
		  modal = require('vue!../main_components/modal.vue'),
          Dropzone = require('vue!../main_components/dropzone.vue');
	const api = require("../../api");
	import { mapActions } from 'vuex'
	module.exports = {
		components: {
			'tabs': vTabs,
			'tab': vTab,
			'select2': vSelect,
			'pagination': Pagination,
			'modal': modal,
            Dropzone
		},
		created: function() {
			this.fetchPayments();
		},
		data: function(){
            return {
				payment_type: 'received',
				carrier: '',
				time1: '',
				time2: '',
				amount: '',
				amount2: '',
				amount_to: '',
				gmt: '',
                client: '',
			    status: '',
			    submitted_time1: '',
			    submitted_time2: '',
                date_format: '',
				route_types: [
				  { id: 1, text: 'Fail to Next Host' },
				  { id: 2, text: 'Fail to Next Trunk' },
				  { id: 3, text: 'Stop' },
			  	],
				pageOne: {
					currentPage: 1,
					totalPages: 10,
					per_page: 10
				},
				showModal: '',
				client_search: '',
				select: [],
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
				selected1: 1,
				options1: [
					{ id: 1, text: '10' },
					{ id: 2, text: '20' },
					{ id: 3, text: '30' },
					{ id: 4, text: '50' },
					{ id: 5, text: '100' }
				],
				selected2: 0,
				options2: [
					{ id: 1, text: 'Group Name' },
					{ id: 2, text: 'Carrier Count' },
					{ id: 3, text: 'Actions' }
				],
				payments: [
					{
					  id: '#801',
					  entered_time: '2017-02-08 12:51:06+00',
					  received_on: '2017-02-08 12:50:55+00',
					  carrier: 'Sourav Mukherjee',
					  amount: '5.00',
					  updated_by: 'admin',
					  details: [
						  {
							  invoice_number: '12345',
							  amount: '5.00',
							  invoice_period: '2017-02-08 12:51:06+00 - 2017-02-08 12:51:06+00',
							  due_date: '2017-02-08 12:51:06+00',
							  total_paid_amount: '120.00',
							  due_amount: '200.00',
							  current_payment_paid_amount: '50.00'
						  }
					  ]
					},
					{
					  id: '#801',
					  entered_time: '2017-02-08 12:51:06+00',
					  received_on: '2017-02-08 12:50:55+00',
					  carrier: 'Sourav Mukherjee',
					  amount: '5.00',
					  updated_by: 'admin',
					  details: [
						  {
							  invoice_number: '12345',
							  amount: '5.00',
							  invoice_period: '2017-02-08 12:51:06+00 - 2017-02-08 12:51:06+00',
							  due_date: '2017-02-08 12:51:06+00',
							  total_paid_amount: '120.00',
							  due_amount: '200.00',
							  current_payment_paid_amount: '50.00'
						  }
					  ]
					},
					{
					  id: '#801',
					  entered_time: '2017-02-08 12:51:06+00',
					  received_on: '2017-02-08 12:50:55+00',
					  carrier: 'Sourav Mukherjee',
					  amount: '5.00',
					  updated_by: 'admin',
					  details: [
						  {
							  invoice_number: '12345',
							  amount: '5.00',
							  invoice_period: '2017-02-08 12:51:06+00 - 2017-02-08 12:51:06+00',
							  due_date: '2017-02-08 12:51:06+00',
							  total_paid_amount: '120.00',
							  due_amount: '200.00',
							  current_payment_paid_amount: '50.00'
						  }
					  ]
					}
			     ],
                 clients: [
				  {
					name: 'Client Name',
					submitted_time: '2016-08-21 00:00:00+00',
					response_time: '2016-08-21 23:59:59+00',
					method: 'Paypal',
					charge_total: '0.92',
					fee: '0',
					status: 'Initial',
					paypal_id: '',
					transaction_id: '',
					card_number: '3245 7422 8927 0091',
					card_expire_month: 'Secember',
					card_expire_year: '2017',
					return_code: '2354',
					error_information: '-'
				  },
				  {
					name: 'Client Name',
					submitted_time: '2016-08-21 00:00:00+00',
					response_time: '2016-08-21 23:59:59+00',
					method: 'Paypal',
					charge_total: '0.92',
					fee: '0',
					status: 'Initial',
					paypal_id: '',
					transaction_id: '',
					card_number: '3245 7422 8927 0091',
					card_expire_month: 'Secember',
					card_expire_year: '2017',
					return_code: '2354',
					error_information: '-'
				  },
				  {
					name: 'Client Name',
					submitted_time: '2016-08-21 00:00:00+00',
					response_time: '2016-08-21 23:59:59+00',
					method: 'Paypal',
					charge_total: '0.92',
					fee: '0',
					status: 'Initial',
					paypal_id: '',
					transaction_id: '',
					card_number: '3245 7422 8927 0091',
					card_expire_month: 'Secember',
					card_expire_year: '2017',
					return_code: '2354',
					error_information: '-'
				  },
				  {
					name: 'Client Name',
					submitted_time: '2016-08-21 00:00:00+00',
					response_time: '2016-08-21 23:59:59+00',
					method: 'Paypal',
					charge_total: '0.92',
					fee: '0',
					status: 'Initial',
					paypal_id: '',
					transaction_id: '',
					card_number: '3245 7422 8927 0091',
					card_expire_month: 'Secember',
					card_expire_year: '2017',
					return_code: '2354',
					error_information: '-'
				  },
				  {
					name: 'Client Name',
					submitted_time: '2016-08-21 00:00:00+00',
					response_time: '2016-08-21 23:59:59+00',
					method: 'Paypal',
					charge_total: '0.92',
					fee: '0',
					status: 'Initial',
					paypal_id: '',
					transaction_id: '',
					card_number: '3245 7422 8927 0091',
					card_expire_month: 'Secember',
					card_expire_year: '2017',
					return_code: '2354',
					error_information: '-'
				  }
			  ]
			}
        },
		methods: {
			...mapActions({
				setAsyncConfirm: 'async_confirm/setAsyncConfirm',
				setMessage: 'app_message/setAppMessage'
			}),
			activateTab(tab) {
				if (tab.name == "Received") {
					this.payment_type = "received";
				}
				else if (tab.name == "Sent") {
					this.payment_type = "sent";
				}
				else if (tab.name == "Auto Payment Log") {
					this.payment_type = "auto payment log";
				}
			},
			changePageRow (value) {
				console.log(value);
				if (value !== this.pageOne.per_page) {
					this.pageOne.per_page = value
					this.$nextTick(this.fetchPayments)
				}
			},
			getPaymentIndex (id) {
				return _.findIndex(this.payments, elem => elem.client_payment_id === id)
			},
			deletePayment(id) {
				const url = api.getEndpointUrl() + '/v1/finance/sent_payment/' + id
				this.$http.delete(url)
				.then(response => {
					if (response.body.success) {
						let index = this.getPaymentIndex(id)
						if (~index) {
							this.payments.splice(index, 1)
						}
						this.setMessage('Payment was removed successfully')
					}
				})
			},
			askDeleteConfirm (id) {
				this.setAsyncConfirm('Are you sure you want to delete this payment')
				.then(result => {
					if (result.accepted) {
						this.deletePayment(id)
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			getQueries() {
				const page = '?page=' + (this.pageOne.currentPage - 1)
				const per_page = '&per_page=' + this.pageOne.per_page
				return page + per_page
			},
			fetchPayments () {
				const url = api.getEndpointUrl() + '/v1/finance/sent_payment/list' + this.getQueries()
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						this.payments = body.payload.items
						this.pageOne.currentPage = body.payload.page + 1
						this.pageOne.totalPages = Math.ceil(body.payload.total / body.payload.per_page)
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			pageOneChanged (pageNum) {
				this.pageOne.currentPage = pageNum
			},
			closeModal: function() {
				this.showModal = '';
			},
			toggleTable(event) {
				var element = event.currentTarget;
				$(element).parents('tr').siblings('.collapse').toggleClass('in');
				$(element).html( $(element).html() == "-" ? "+" : "-");
			},
            'success': function (file) {
                console.log('A file was successfully uploaded')
            },
            'process': function () {
                var newArr = this.$children.filter(function(item){
                  return item.id === "myVueDropzone";
                });
                var component = newArr[0];
                component.processQueue()
            },
			exportCSV: function()
			{
				var vm = this;		
            	var csvArray = new Array();
            	
				if(this.payment_type == "received")
				{
					var fields = ["id", "payment_time", "receiving_time", "client_name", "amount", "type", "updated_by"];
					csvArray.push(fields); 
					this.payments.forEach(function (payment, i) {
						var values = new Array();
						if(payment.id == undefined)
							values.push(payment.id);
						else
							values.push(payment.id + "");
						values.push(payment.payment_time);
						values.push(payment.receiving_time);
						values.push(payment.client_name);
						values.push(payment.amount);
						values.push(payment.type);
						values.push(payment.updated_by);
						csvArray.push(values);                
					});	 
				}
				else if(this.payment_type == "sent")
				{
					var fields = ["id", "payment_time", "receiving_time", "client_name", "amount", "type", "updated_by"];
					csvArray.push(fields); 
					this.payments.forEach(function (payment, i) {
						var values = new Array();
						if(payment.id == undefined)
							values.push(payment.id);
						else
							values.push(payment.id + "");
						values.push(payment.payment_time);
						values.push(payment.receiving_time);
						values.push(payment.client_name);
						values.push(payment.amount);
						values.push(payment.type);
						values.push(payment.updated_by);
						csvArray.push(values);                
					});
				}
				else if(this.payment_type == "auto payment log")
				{					  
					var fields = ["name", "submitted_time", "response_time", "method", "charge_total", "fee", "status", "paypal_id", "transaction_id", "card_number", "card_expire_month", "card_expire_year", "return_code", "error_information"];
					csvArray.push(fields); 
					this.clients.forEach(function (client, i) {
						var values = new Array();
						values.push(client.name);
						values.push(client.submitted_time);
						values.push(client.response_time);
						values.push(client.method);
						values.push(client.charge_total);
						values.push(client.fee);
						values.push(client.status);
						values.push(client.paypal_id);
						values.push(client.transaction_id);
						values.push(client.card_number);
						values.push(client.card_expire_month);
						values.push(client.card_expire_year);
						values.push(client.return_code);
						values.push(client.error_information);						
						csvArray.push(values);                
					});
				}
				exportToCsv('finance_payment_' + this.payment_type +'_export.csv', csvArray);				
			}
		},
		mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
		}
	}
</script>

<style>
	.tab span.dnl_icon.dnl_download {
		font-size: 20px;
		float: left;
		margin: 3px 6px 0 0;
	}
    
	tr.accordian-body.collapse.no_padding.in td {
		padding: 10px;
	}
    
    .chart_select_header.grided.rounded {
        border-radius: 5px;
    }
    
    .form-group.m-top-minus-25 {
        margin-top: -25px;
    }
    
    .m-top-50 {
        margin-top: 50px;
    }
    
    .form-group.full-width-select .select2 {
        width: 100% !important;
    }
    
    .checkbox-success input[type="checkbox"]:checked + label::before {
		background-color: #03c0fc;
		border-color: #03c0fc;
	}
</style>
