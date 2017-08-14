<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a>Billing</a></li>
				  <li class="breadcrumb-item active">Online Payment</li>
			</ol>
			<h1 class="page-header">Online Payment</h1>
			<tabs class="agent_tabs">
				<tab label="$ Paypal" class="" icon="dnl_icon dnl_user" selected>
					<div class="chart_select_header grided rounded">
						<div class="col-md-3 col-sm-3">
							<label for="amount">Payment Amount: ($ USD):</label>
							<input type="text" name="amount" v-model="pay_amount" class="form-control" placeholder="Enter Payment Amount">
						</div>
						<div class="col-md-3 col-sm-3">
							<label for="charge">Service Charge: ($ USD):</label>
							<input readonly type="text" name="charge" v-model="pay_charge" class="form-control"> 
						</div>
						<div class="col-md-3 col-sm-4">
							<a class="btn btn-primary m-top-25">
								Submit
							</a>
						</div>
						<div class="clearfix"></div>
					</div>
				</tab>
				<tab label="$ Stripe" class="" icon="dnl_icon dnl_user">
					<div class="chart_select_header grided rounded">
						<div class="col-md-3 col-sm-3">
							<label for="amount">Payment Amount: ($ USD):</label>
							<input type="text" name="amount" v-model="stripe_amount" class="form-control" placeholder="Enter Payment Amount">
						</div>
						<div class="col-md-3 col-sm-3">
							<label for="charge">Service Charge: ($ USD):</label>
							<input readonly type="text" name="charge" v-model="stripe_charge" class="form-control"> 
						</div>
						<div class="col-md-3 col-sm-3">
							<label for="card">Card Number:</label>
							<input type="text" name="charge" v-model="card_number" class="form-control" placeholder="1234-5678-9000-0000"> 
						</div>
						<div class="clearfix little-space"></div>
						<div class="col-md-3 col-sm-3">
							<label for="expire">Expiration MM:</label>
							<input type="text" name="time1" v-model="time1" class="form-control" placeholder="Enter Month">
						</div>
						<div class="col-md-3 col-sm-3">
							<label for="expire">YYYY:</label>
							<input type="text" name="time2" v-model="time2" class="form-control" placeholder="Enter Year">
						</div>
						<div class="col-md-3 col-sm-3">
							<label for="card">CVC:</label>
							<input type="text" name="cvc" v-model="cvc" class="form-control" placeholder="Enter CVC"> 
						</div>
						<div class="col-md-3 col-sm-4">
							<a class="btn btn-primary m-top-25">
								Submit
							</a>
						</div>
						<div class="clearfix"></div>
					</div>
				</tab>
				<tab label="Auto Payment Log" class="" icon="dnl_icon dnl_qos_report">
                     <div class="tab_wrapper">
                            <div class="chart_select_header grided rounded">
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
                            <div class="table_filters searcheable m-top-20">
                                <div class="inline-block select_min_wrapper">
                                    <span class="inline-block">Page row:</span>
                                    <select2 :options="options1" v-model="selected1" class="inline-block">
                                    </select2>
                                </div>
                                <div class="inline-block">
									<el-select v-model="payment_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
										<el-option v-for="item in payment_table_column_options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            <div class="table-responsive">
                                <table class="table table-striped table-hover carrier_groups originators">
                                  <thead>
                                    <tr>
                                      <th v-if="showcolumns[0]">Requested Time</th>
                                      <th v-if="showcolumns[1]">Method</th>
                                      <th v-if="showcolumns[2]">Charge Total</th>
                                      <th v-if="showcolumns[3]">Fee</th>
                                      <th v-if="showcolumns[4]">Status</th>
                                      <th v-if="showcolumns[5]">Transaction ID</th>
                                      <th v-if="showcolumns[6]">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="payment in payments">
                                      <td v-if="showcolumns[0]">{{payment.submitted_time}}</td>
                                      <td v-if="showcolumns[1]">{{payment.method}}</td>
                                      <td v-if="showcolumns[2]">{{payment.charge_total}}</td>
                                      <td v-if="showcolumns[3]">{{payment.fee}}</td>
                                      <td v-if="showcolumns[4]">{{payment.status}}</td>
                                      <td v-if="showcolumns[5]">{{payment.transaction_id}}</td>
                                      <td v-if="showcolumns[6]"></td>
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
	const vTabs = require('vue!../../main_components/tabs.vue'),
		  vTab = require('vue!../../main_components/tab.vue'),
		  vSelect = require('vue!../../main_components/select.vue'),
		  Pagination = require('vue!../../main_components/pagination.vue'),
		  modal = require('vue!../../main_components/modal.vue'),
          Dropzone = require('vue!../../main_components/dropzone.vue');
const api = require("../../../api");
const auth = require("../../../auth");
_ = require('lodash');

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
				time1: '',
				time2: '',
			    status: '',
			    submitted_time1: '',
			    submitted_time2: '',
				pay_amount: '',
				pay_charge: '0',
				stripe_amount: '',
				stripe_charge: '0',	
				card_number: '',
				cvc: '',
				pageOne: {
					currentPage: 1,
					totalPages: 10,
					per_page: 10
				},
				showModal: '',
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
				payments: [
					{
					  id: '801',
					  submitted_time: '2017-02-08 12:51:06+00',
					  method: 'xxx',
					  charge_total: '100',
					  fee: '5.00',
					  status: 'xxx',
					  transaction_id: '345',
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
			    ],
				payment_table_column_options: [{
					value: 'Requested Time',
					label: 'Requested Time'
				}, {
					value: 'Method',
					label: 'Method'
				}, {
					value: 'Charge Total',
					label: 'Charge Total'
				}, {
					value: 'Fee',
					label: 'Fee'
				}, {
					value: 'Status',
					label: 'Status'
				}, {
					value: 'Transaction ID',
					label: 'Transaction ID'
				}, {
					value: 'Action',
					label: 'Action'
				}],
				temp_payment_table_columns: ['Requested Time', 'Method', 'Charge Total',
					'Fee', 'Status', 'Transaction ID', 'Action'],
				payment_table_columns: ['Requested Time', 'Method', 'Charge Total',
					'Fee', 'Status', 'Transaction ID', 'Action'],
				showcolumns: [true, true, true, true, true, true, true],
			}
        },
		methods: {
			handleChange() {
				for(let i = 0; i < this.temp_payment_table_columns.length; i++) {
					if (_.indexOf(this.payment_table_columns, this.temp_payment_table_columns[i]) != -1) {
						Vue.set(this.showcolumns, i, true);
					}
					else {
						Vue.set(this.showcolumns, i, false);
					}
				}
			},
			fetchPayments () {
				const url = api.getEndpointUrl() + '/v1/finance/sent_payment/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						this.payments = body.payload.items
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
		},
		mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
		},
		updated: function () {
			document.querySelector('.el-select > .el-input > input').placeholder = 'Show/Hide Columns';
		},
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

	.el-select__tags {
		display: none;
	}
	
</style>
