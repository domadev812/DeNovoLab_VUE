<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="#">Finance</a>
					</li>
					<li class="breadcrumb-item active">Invoices</li>
				</ol>
				<h1 class="page-header">Invoices</h1>
				<tabs class="agent_tabs">
					<tab label="Auto Client Invoice" class="" icon="dnl_icon dnl_persona" selected>
						<confirm v-show="showModal" @close="showModal = false" @submit="deleteAutoClientInvoice"></confirm>
						<div class="btn-group" role="group">
							<router-link to="/finance/invoices/upload_vendor_invoice" class="btn btn-default create_new_iconed">
								<span class="dnl_icon dnl_add"></span>Upload Vendor Invoice</router-link>
							<!-- <router-link to="/log/invoice_log" class="btn btn-default report_iconed">
								<span class="dnl_icon dnl_qos_report"></span>Invoice Log</router-link>
							<button type="button" class="btn btn-default">
								<span class="dnl_icon dnl_export"></span> Export
							</button> -->
							<button type="button" class="btn btn-default">
								<span class="dnl_icon dnl_tick"></span> Verify Selected
							</button>
							<button type="button" class="btn btn-default">
								<span class="dnl_icon dnl_check"></span> Unverify Selected
							</button>
							<button type="button" class="btn btn-default">
								<span class="dnl_icon dnl_support"></span> Send Selected
							</button>
							<button type="button" class="btn btn-default">
								<span class="dnl_icon dnl_disabled"></span> Void Selected
							</button>
							<button type="button" class="btn btn-default">
								<span class="dnl_icon dnl_download"></span> Download Selected
							</button>
						</div>
						<div class="chart_select_header grided rounded">
							<div class="col-md-3 col-sm-3">
								<label for="search">Search:</label>
								<input type="text" name="search" v-model="search" class="form-control" placeholder="Enter Search">
							</div>
							<div class="clearfix little-space"></div>
							<div class="col-md-3 col-sm-3">
								<label for="invoice_no">Invoice No:</label>
								<input type="text" name="invoice_no" v-model="invoice_no" class="form-control" placeholder="Enter Invoice No">
							</div>
							<div class="col-md-3 col-sm-3">
								<label>Status:</label>
								<select2 :options="status_options" v-model="status">
									<option disabled value="0">Select one</option>
								</select2>
							</div>
							<div class="col-md-6 col-sm-6">
								<div class="inlined">
									<label for="time1">Invoice Date:</label>
									<el-date-picker v-model="time1" type="date" placeholder="Enter Date/Time"></el-date-picker>
								</div>
								<div class="inlined">
									<label for="time2" class="m-top-20"></label>
									<el-date-picker v-model="time2" type="date" placeholder="Enter Date/Time"></el-date-picker>
								</div>
							</div>
							<div class="clearfix little-space"></div>
							<div class="col-md-3 col-sm-3">
								<label>Number of Day Overdue:</label>
								<select2 :options="day_overdue_options" v-model="day_overdue">
									<option disabled value="0">Select one</option>
								</select2>
							</div>
							<div class="col-md-3 col-sm-3">
								<label>Mode:</label>
								<select2 :options="mode_options" v-model="mode">
									<option disabled value="0">Select one</option>
								</select2>
							</div>
							<div class="col-md-3 col-sm-3">
								<label>Carriers:</label>
								<select2 :options="carrier_options" v-model="carriers">
									<option disabled value="0">Select one</option>
								</select2>
							</div>
							<div class="col-md-3 col-sm-3">
								<label>Type:</label>
								<select2 :options="type_options" v-model="type">
									<option disabled value="0">Select one</option>
								</select2>
							</div>
							<div class="col-md-3 col-sm-3">
								<a class="btn btn-primary m-top-25">
									Query
								</a>
							</div>
							<div class="clearfix"></div>
						</div>
						<div class="pull-right pagination top_pagination">
							<pagination :current-page="autoPageOne.currentPage" :total-pages="autoPageOne.totalPages" @page-changed="autoPageOneChanged">
							</pagination>
						</div>
						<div class="table_filters searcheable m-top-20">
							<div class="inline-block select_min_wrapper">
								<span class="inline-block">Page row:</span>
								<select2 :options="options1" v-model="selected1" class="inline-block">
								</select2>
							</div>
							<div class="inline-block">
								<el-select v-model="invoice_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
									<el-option v-for="item in invoice_table_column_options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</div>
						</div>
						<div class="clearfix"></div>
						<div class="table-responsive">
							<table class="table table-striped table-hover agents">
								<thead>
									<tr>
										<th class="width-65">
											<div class="checkbox checkbox-success">
												<input type="checkbox" name="checker" id="checker" v-model="checker">
												<label for="checker"></label>
											</div>
										</th>
										<th v-if="showcolumns[0]">Invoice No</th>
										<th v-if="showcolumns[1]">Invoice Date</th>
										<th v-if="showcolumns[2]">Status</th>
										<th v-if="showcolumns[3]">Carriers</th>
										<th v-if="showcolumns[4]">Invoice Period</th>
										<th v-if="showcolumns[5]">Amount Gross</th>
										<th v-if="showcolumns[6]">Amount Paid</th>
										<th v-if="showcolumns[7]">Due Date</th>
										<th v-if="showcolumns[8]">State</th>
										<th v-if="showcolumns[9]">Action</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="invoice in invoices">
										<td class="centred_checkbox">
											<div class="checkbox checkbox-success">
												<input :id="invoice.invoice_id" :name="invoice.invoice_id" type="checkbox">
												<label :for="invoice.invoice_id"></label>
											</div>
										</td>
										<td v-if="showcolumns[0]">
											<a @click="showModal = 'show_note'" class="blue_link">{{invoice.invoice_id}}</a>
										</td>
										<td v-if="showcolumns[1]">{{invoice.invoice_date}}</td>
										<td v-if="showcolumns[2]">{{invoice.status}}</td>
										<td v-if="showcolumns[3]">{{invoice.client_name}}</td>
										<td v-if="showcolumns[4]">{{invoice.invoice_period_from}}</td>
										<td v-if="showcolumns[5]">{{invoice.amount}}</td>
										<td v-if="showcolumns[6]">{{invoice.paid}}</td>
										<td v-if="showcolumns[7]">{{invoice.due_date}}</td>
										<td v-if="showcolumns[8]">{{invoice.state}}</td>
										<td class="width-340" v-if="showcolumns[9]">
											<a data-toggle="tooltip" data-placement="top" title="Download" class="action action_download">
												<span class="dnl_icon dnl_download"></span>
											</a>
											<a data-toggle="tooltip" data-placement="top" title="Regenerate" class="action action_trigger">
												<span class="dnl_icon dnl_trigger"></span>
											</a>
											<a class="action action_activate" data-toggle="tooltip" data-placement="top" title="Verify">
												<span class="dnl_icon dnl_check"></span>
											</a>
											<a data-toggle="tooltip" data-placement="top" title="Void" class="action action_reject">
												<span class="dnl_icon dnl_disabled"></span>
											</a>
											<router-link to="/finance/invoices/credit_note" class="action action_money" data-toggle="tooltip" data-placement="top" title="Credit Note">
												<span class="dnl_icon dnl_money"></span>
											</router-link>
											<router-link to="/finance/invoices/debit_note" class="action action_money" data-toggle="tooltip" data-placement="top" title="Debit Note">
												<span class="dnl_icon dnl_money"></span>
											</router-link>
											<a data-toggle="tooltip" data-placement="top" title="Payment List" class="action action_menu" @click="showModal = 'payment_list'">
												<span class="dnl_icon dnl_action_menu"></span>
											</a>
											<a class="action action_tick" data-toggle="tooltip" data-placement="top" title="Apply Payment" @click="showModal = 'apply_payment'">
												<span class="dnl_icon dnl_tick"></span>
											</a>
											<a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" @click="delete_auto_invoice(invoice.invoice_id)">
												<span class="dnl_icon dnl_action_delete"></span>
											</a>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="pull-right pagination">
							<pagination :current-page="pageOne.currentPage" :total-pages="pageOne.totalPages" @page-changed="pageOneChanged">
							</pagination>
						</div>
						<div class="clearfix"></div>
					</tab>
					<tab label="Manual Client Invoice" class="" icon="dnl_icon dnl_persona">
						<div class="btn-group" role="group">
							<router-link to="/finance/invoice/new" class="btn btn-default create_new_iconed">
								<span class="dnl_icon dnl_add"></span>Create New</router-link>
							<!--<router-link to="/log/invoice_log" class="btn btn-default report_iconed">
								<span class="dnl_icon dnl_qos_report"></span>Invoice Log</router-link>
							<button type="button" class="btn btn-default">
								<span class="dnl_icon dnl_export"></span> Export
							</button>
							<button type="button" class="btn btn-default">
								<span class="dnl_icon dnl_tick"></span> Verify Selected
							</button>
							<button type="button" class="btn btn-default">
								<span class="dnl_icon dnl_check"></span> Unverify Selected
							</button>
							<button type="button" class="btn btn-default">
								<span class="dnl_icon dnl_support"></span> Send Selected
							</button>
							<button type="button" class="btn btn-default">
								<span class="dnl_icon dnl_disabled"></span> Void Selected
							</button>
							<button type="button" class="btn btn-default">
								<span class="dnl_icon dnl_download"></span> Download Selected
							</button>-->
						</div>
						<div class="chart_select_header grided rounded">
							<div class="col-md-3 col-sm-3">
								<label for="search">Search:</label>
								<input type="text" name="search" v-model="search" class="form-control" placeholder="Enter Search">
							</div>
							<div class="clearfix little-space"></div>
							<div class="col-md-3 col-sm-3">
								<label for="invoice_no">Invoice No:</label>
								<input type="text" name="invoice_no" v-model="invoice_no" class="form-control" placeholder="Enter Invoice No">
							</div>
							<div class="col-md-3 col-sm-3">
								<label>Status:</label>
								<select2 :options="status_options" v-model="status">
									<option disabled value="0">Select one</option>
								</select2>
							</div>
							<div class="col-md-6 col-sm-6">
								<div class="inlined">
									<label for="time1">Invoice Date:</label>
									<el-date-picker v-model="time1" type="date" placeholder="Enter Date/Time"></el-date-picker>
								</div>
								<div class="inlined">
									<label for="time2" class="m-top-20"></label>
									<el-date-picker v-model="time2" type="date" placeholder="Enter Date/Time"></el-date-picker>
								</div>
							</div>
							<div class="clearfix little-space"></div>
							<div class="col-md-3 col-sm-3">
								<label>Number of Day Overdue:</label>
								<select2 :options="day_overdue_options" v-model="day_overdue">
									<option disabled value="0">Select one</option>
								</select2>
							</div>
							<div class="col-md-3 col-sm-3">
								<label>Mode:</label>
								<select2 :options="mode_options" v-model="mode">
									<option disabled value="0">Select one</option>
								</select2>
							</div>
							<div class="col-md-3 col-sm-3">
								<label>Carriers:</label>
								<select2 :options="carrier_options" v-model="carriers">
									<option disabled value="0">Select one</option>
								</select2>
							</div>
							<div class="col-md-3 col-sm-3">
								<label>Type:</label>
								<select2 :options="type_options" v-model="type">
									<option disabled value="0">Select one</option>
								</select2>
							</div>
							<div class="col-md-3 col-sm-3">
								<a class="btn btn-primary m-top-25">
									Query
								</a>
							</div>
							<div class="clearfix"></div>
						</div>
						<div class="pull-right pagination top_pagination">
							<pagination :current-page="pageOne.currentPage" :total-pages="pageOne.totalPages" @page-changed="pageOneChanged">
							</pagination>
						</div>
						<div class="table_filters searcheable m-top-20">
							<div class="inline-block select_min_wrapper">
								<span class="inline-block">Page row:</span>
								<select2 :options="options1" v-model="selected1" class="inline-block">
								</select2>
							</div>
							<div class="inline-block">
								<el-select v-model="invoice_table_columns1" multiple placeholder="Show/Hide Columns" @change="handleChange1">
									<el-option v-for="item in invoice_table_column_options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</div>
						</div>
						<div class="clearfix"></div>
						<div class="table-responsive">
							<table class="table table-striped table-hover agents">
								<thead>
									<tr>
										<th class="width-65">
											<div class="checkbox checkbox-success">
												<input type="checkbox" name="checker" id="checker" v-model="checker">
												<label for="checker"></label>
											</div>
										</th>
										<th v-if="showcolumns1[0]">Invoice No</th>
										<th v-if="showcolumns1[1]">Invoice Date</th>
										<th v-if="showcolumns1[2]">Status</th>
										<th v-if="showcolumns1[3]">Carriers</th>
										<th v-if="showcolumns1[4]">Invoice Period</th>
										<th v-if="showcolumns1[5]">Amount Gross</th>
										<th v-if="showcolumns1[6]">Amount Paid</th>
										<th v-if="showcolumns1[7]">Due Date</th>
										<th v-if="showcolumns1[8]">State</th>
										<th v-if="showcolumns1[9]">Action</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="invoice in invoices">
										<td class="centred_checkbox">
											<div class="checkbox checkbox-success">
												<input :id="invoice.id" :name="invoice.id" type="checkbox">
												<label :for="invoice.id"></label>
											</div>
										</td>
										<td v-if="showcolumns1[0]">
											<a @click="showModal = 'show_note'" class="blue_link">{{invoice.no}}</a>
										</td>
										<td v-if="showcolumns1[1]">{{invoice.date}}</td>
										<td v-if="showcolumns1[2]">{{invoice.status}}</td>
										<td v-if="showcolumns1[3]">{{invoice.carriers}}</td>
										<td v-if="showcolumns1[4]">{{invoice.period}}</td>
										<td v-if="showcolumns1[5]">{{invoice.amount_gross}}</td>
										<td v-if="showcolumns1[6]">{{invoice.amount_paid}}</td>
										<td v-if="showcolumns1[7]">{{invoice.due_date}}</td>
										<td v-if="showcolumns1[8]">{{invoice.state}}</td>
										<td class="width-340" v-if="showcolumns1[9]">
											<a data-toggle="tooltip" data-placement="top" title="Download" class="action action_download">
												<span class="dnl_icon dnl_download"></span>
											</a>
											<a data-toggle="tooltip" data-placement="top" title="Regenerate" class="action action_trigger">
												<span class="dnl_icon dnl_trigger"></span>
											</a>
											<a class="action action_activate" data-toggle="tooltip" data-placement="top" title="Verify">
												<span class="dnl_icon dnl_check"></span>
											</a>
											<a data-toggle="tooltip" data-placement="top" title="Void" class="action action_reject">
												<span class="dnl_icon dnl_disabled"></span>
											</a>
											<router-link to="/finance/invoices/credit_note" class="action action_money" data-toggle="tooltip" data-placement="top" title="Credit Note">
												<span class="dnl_icon dnl_money"></span>
											</router-link>
											<router-link to="/finance/invoices/debit_note" class="action action_money" data-toggle="tooltip" data-placement="top" title="Debit Note">
												<span class="dnl_icon dnl_money"></span>
											</router-link>
											<a data-toggle="tooltip" data-placement="top" title="Payment List" class="action action_menu" @click="showModal = 'payment_list'">
												<span class="dnl_icon dnl_action_menu"></span>
											</a>
											<a class="action action_tick" data-toggle="tooltip" data-placement="top" title="Apply Payment" @click="showModal = 'apply_payment'">
												<span class="dnl_icon dnl_tick"></span>
											</a>
											<a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete">
												<span class="dnl_icon dnl_action_delete"></span>
											</a>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="pull-right pagination">
							<pagination :current-page="pageOne.currentPage" :total-pages="pageOne.totalPages" @page-changed="pageOneChanged">
							</pagination>
						</div>
						<div class="clearfix"></div>
					</tab>
					<!--<tab label="Vendor Invoice" class="" icon="dnl_icon dnl_person">
						<div class="chart_select_header grided rounded">
							<div class="col-md-3 col-sm-4">
								<label>Carrier:</label>
								<select2 :options="options" v-model="carrier">
									<option disabled value="0">Select one</option>
								</select2>
							</div>
							<div class="col-md-6 col-sm-6">
								<div class="inlined">
									<label for="time1">Calculated on:</label>
									<input type="text" name="time1" v-model="time1" class="form-control" placeholder="Enter Date/Time">
								</div>
								<div class="inlined">
									<label for="time2" class="m-top-15"></label>
									<input type="text" name="time2" v-model="time2" class="form-control" placeholder="Enter Date/Time">
								</div>
							</div>
							<div class="col-md-3 col-sm-4">
								<a class="btn btn-primary m-top-25">
									Query
								</a>
							</div>
							<div class="clearfix"></div>
						</div>
						<router-link to="/finance/invoices/vendor_invoice_dispute_note" class="btn btn-primary mini pull-right marged">
							<span class="dnl_icon dnl_list"></span> Dispute Note List
						</router-link>
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
										<th>Report By Day</th>
										<th>Carrier Name</th>
										<th>Calculated On</th>
										<th>Billing Duration</th>
										<th>System Minute</th>
										<th>System Total</th>
										<th>Billed Minute</th>
										<th>Billed Total</th>
										<th>Status</th>
										<th class="width_138">Action</th>
									</tr>
								</thead>
								<tbody v-for="vendor in vendors">
									<tr>
										<td>
											<a class="toogler" @click="toggleTable($event)">+</a>
										</td>
										<td>{{vendor.carrier_name}}</td>
										<td>{{vendor.calculated_on}}</td>
										<td>{{vendor.billing_duration}}</td>
										<td>{{vendor.system_minute}}</td>
										<td>{{vendor.system_total}}</td>
										<td>{{vendor.billed_minute}}</td>
										<td>{{vendor.billed_total}}</td>
										<td>{{vendor.status}}</td>
										<td>
											<a class="action action_read" data-toggle="tooltip" data-placement="top" title="View Report by Day">
												<span class="dnl_icon dnl_eye"></span>
											</a>
											<router-link to="/finance/invoices/vendor_invoice_info" class="action action_activate" data-toggle="tooltip" data-placement="top" title="Submit Billed Amount">
												<span class="dnl_icon dnl_check"></span>
											</router-link>
											<a class="action action_read" data-toggle="tooltip" data-placement="top" title="View Dispute Note">
												<span class="dnl_icon dnl_eye"></span>
											</a>
										</td>
									</tr>
									<tr class="accordian-body collapse no_padding">
										<td colspan="10">
											<h2 class="center-block text-center">No Data Found</h2>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="pull-right pagination">
							<pagination :current-page="pageOne.currentPage" :total-pages="pageOne.totalPages" @page-changed="pageOneChanged">
							</pagination>
						</div>
						<div class="clearfix"></div>
					</tab>
					<tab label="Old Vendor Invoice" class="" icon="dnl_icon dnl_person">
						<div class="btn-group" role="group">
							<router-link to="/finance/invoices/create_incoming_invoice" class="btn btn-default create_new_iconed">
								<span class="dnl_icon dnl_add"></span>Create New
							</router-link>
							<button type="button" class="btn btn-default">
								<span class="dnl_icon dnl_export"></span> Export
							</button>
							<button type="button" class="btn btn-default">
								<span class="dnl_icon dnl_action_delete"></span> Delete Selected
							</button>
						</div>
						<div class="tab_wrapper">
							<div class="chart_select_header grided rounded">
								<div class="col-md-3 col-sm-3">
									<label>Carrier:</label>
									<select2 :options="options" v-model="carrier">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-3 col-sm-3">
									<a class="btn btn-primary m-top-25">
										Query
									</a>
								</div>
								<div class="clearfix"></div>
							</div>
							<div class="pull-right pagination top-pagination">
								<pagination :current-page="pageOne.currentPage" :total-pages="pageOne.totalPages" @page-changed="pageOneChanged">
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
											<th class="width-65">
												<div class="checkbox checkbox-success">
													<input type="checkbox" name="checker" id="checker" v-model="checker">
													<label for="checker"></label>
												</div>
											</th>
											<th>Invoice No</th>
											<th>Invoice Date</th>
											<th>Link upload</th>
											<th>Carriers</th>
											<th>Invoice Period</th>
											<th>Amt Gross</th>
											<th>Amt Paid</th>
											<th>Due Date</th>
											<th>Payment</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="invoice in old_invoices">
											<td class="centred_checkbox">
												<div class="checkbox checkbox-success">
													<input :id="invoice.id" :name="invoice.id" type="checkbox">
													<label :for="invoice.id"></label>
												</div>
											</td>
											<td>
												<router-link to="/finance/invoices/invoice_edit" class="blue_link">{{invoice.no}}</router-link>
											</td>
											<td>{{invoice.date}}</td>
											<td>{{invoice.status}}</td>
											<td>{{invoice.carriers}}</td>
											<td>{{invoice.period}}</td>
											<td>{{invoice.amt_gross}}</td>
											<td v-if="invoice.amt_paid == true">
												<span class="dnl_icon dnl_check"></span>
											</td>
											<td>{{invoice.due_date}}</td>
											<td>
												<router-link to="/finance/invoices/old_vendor_invoice_payment" class="blue_link icon_link">
													<span class="dnl_icon dnl_money"></span>
												</router-link>
											</td>
											<td class="width-205">
												<router-link to="/finance/invoices/credit_note" class="action action_money" data-toggle="tooltip" data-placement="top" title="Credit Note">
													<span class="dnl_icon dnl_money"></span>
												</router-link>
												<router-link to="/finance/invoices/debit_note" class="action action_money" data-toggle="tooltip" data-placement="top" title="Debit Note">
													<span class="dnl_icon dnl_money"></span>
												</router-link>
												<router-link to="/finance/invoices/reconcile" data-toggle="tooltip" data-placement="top" title="Reconcile" class="action action_trigger">
													<span class="dnl_icon dnl_trigger"></span>
												</router-link>
												<a data-toggle="tooltip" data-placement="top" title="Payment List" class="action action_menu" @click="showModal = 'payment_list'">
													<span class="dnl_icon dnl_action_menu"></span>
												</a>
												<a class="action action_tick" data-toggle="tooltip" data-placement="top" title="Apply Payment" @click="showModal = 'apply_payment'">
													<span class="dnl_icon dnl_tick"></span>
												</a>
												<a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete">
													<span class="dnl_icon dnl_action_delete"></span>
												</a>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="pull-right pagination">
								<pagination :current-page="pageOne.currentPage" :total-pages="pageOne.totalPages" @page-changed="pageOneChanged">
								</pagination>
							</div>
							<div class="clearfix"></div>
						</div>
					</tab>-->
				</tabs>
			</div>
		</div>
		<modal v-if="showModal=='show_note'" @close="showModal = ''">
			<h3 slot="header">Details</h3>
			<div slot="body">
				<b>State:</b>
				normal
				<div class="clearfix little-space"></div>
				<b>Total:</b>
				84.16667 USD
				<div class="clearfix little-space"></div>
				<b>Paid:</b>
				0.000 USD
				<div class="clearfix little-space"></div>
				<b>Period:</b>
				2017-02-01 00:00:00+00+00:00 2017-02-09 23:59:59+00+00:00
			</div>
			<div slot="footer">
				<button @click="closeModal" class="btn btn-default cancel centered">Cancel</button>
			</div>
		</modal>
		<modal v-if="showModal=='payment_list'" @close="showModal = ''" class="big_modal">
			<h3 slot="header">Payment List</h3>
			<div slot="body">
				<div class="">
					<div class="table-responsive">
						<table class="table table-striped table-hover carrier_groups aligned-center">
							<thead>
								<tr>
									<th>Payment ID</th>
									<th>Payment Amount</th>
									<th>Paid Amount</th>
									<th>Unpaid Amount</th>
									<th>Payment On</th>
								</tr>
							</thead>
							<tbody>
								<tr>
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
			<div slot="footer">
				<button @click="closeModal" class="btn btn-default mini cancel centered">Cancel</button>
			</div>
		</modal>
		<modal v-if="showModal=='apply_payment'" @close="showModal = ''" class="big_modal">
			<h3 slot="header">Apply Payment</h3>
			<div slot="body">
				<div class="">
					<div class="table-responsive">
						<table class="table table-striped table-hover carrier_groups aligned-center">
							<thead>
								<tr>
									<th class="width-65">
										<div class="checkbox checkbox-success">
											<input type="checkbox" name="checker_modal" id="checker_modal" v-model="checker">
											<label for="checker_modal"></label>
										</div>
									</th>
									<th>Payment ID</th>
									<th>Received Time</th>
									<th>Amount</th>
									<th>Remain Amount</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="payment in payments">
									<td class="centred_checkbox">
										<div class="checkbox checkbox-success bottom_null">
											<input :id="payment.id" :name="payment.id" type="checkbox">
											<label :for="payment.id"></label>
										</div>
									</td>
									<td>{{payment.id}}</td>
									<td>{{payment.received_time}}</td>
									<td>{{payment.amount}}</td>
									<td>{{payment.remain_amount}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div slot="footer">
				<button @click="closeModal" class="btn btn-primary submit mini">Submit</button>
				<button @click="closeModal" class="btn btn-default mini cancel">Cancel</button>
			</div>
		</modal>
	</div>
</template>

<script>   
const vTabs = require('vue!../main_components/tabs.vue'),
	vTab = require('vue!../main_components/tab.vue'),
	vSelect = require('vue!../main_components/select.vue'),
	Pagination = require('vue!../main_components/pagination.vue'),
	confirmmodal = require('vue!../main_components/confirm_delete.vue'),
	modal = require('vue!../main_components/modal.vue');
const api = require("../../api");
const auth = require("../../auth");
module.exports = {
	components: {
		'tabs': vTabs,
		'tab': vTab,
		'select2': vSelect,
		'pagination': Pagination,
		'modal': modal,
		'confirm': confirmmodal,
	},
	data: function () {
		return {
			showcolumns1: [true, true, true, true, true, true, true, true, true, true],
			invoice_table_columns1: ['Invoice No', 'Invoice Date', 'Status', 'Carriers', 'Invoice Period', 'Amount Gross', 'Amount Paid', 'Due Date', 'State', 'Actions'],
			temp_invoice_table_columns1: ['Invoice No', 'Invoice Date', 'Status', 'Carriers', 'Invoice Period', 'Amount Gross', 'Amount Paid', 'Due Date', 'State', 'Actions'],
			showcolumns: [true, true, true, true, true, true, true, true, true, true],
			invoice_table_columns: ['Invoice No', 'Invoice Date', 'Status', 'Carriers', 'Invoice Period', 'Amount Gross', 'Amount Paid', 'Due Date', 'State', 'Actions'],
			temp_invoice_table_columns: ['Invoice No', 'Invoice Date', 'Status', 'Carriers', 'Invoice Period', 'Amount Gross', 'Amount Paid', 'Due Date', 'State', 'Actions'],
			invoice_table_column_options: [{
				value: 'Invoice No',
				label: 'Invoice No'
			}, {
				value: 'Invoice Date',
				label: 'Invoice Date'
			}, {
				value: 'Status',
				label: 'Status'
			}, {
				value: 'Carriers',
				label: 'Carriers'
			}, {
				value: 'Invoice Period',
				label: 'Invoice Period'
			}, {
				value: 'Amount Gross',
				label: 'Amount Gross'
			}, {
				value: 'Amount Paid',
				label: 'Amount Paid'
			}, {
				value: 'Due Date',
				label: 'Due Date'
			}, {
				value: 'State',
				label: 'State'
			}, {
				value: 'Actions',
				label: 'Actions'
			}],
			type_options: [
				{ id: 1, text: 'All' },
				{ id: 2, text: 'Client' },
				{ id: 3, text: 'Vendor' },
				{ id: 4, text: 'Vendor and Client' },
			],
			carrier_options: [],
			mode_options: [
				{ id: 1, text: 'Prepaid' },
				{ id: 2, text: 'Post-pay' },
			],
			day_overdue_options: [
				{ id: 1, text: 'All' },
				{ id: 2, text: '>=' },
				{ id: 3, text: '<=' },
			],
			status_options: [
				{ id: 1, text: 'All' },
				{ id: 2, text: 'Sent' },
				{ id: 3, text: 'Void' },
			],
			search: '',
			invoice_no: '',
			status: '',
			type: '',
			number_of_day_overdue: '',
			time1: '',
			time2: '',
			mode: '',
			dispute: '',
			carriers: '',
			amt_paid: '',
			amount: '',
			checker: '',
			checker_modal: '',
			carrier: '',
			route_types: [
				{ id: 1, text: 'Fail to Next Host' },
				{ id: 2, text: 'Fail to Next Trunk' },
				{ id: 3, text: 'Stop' },
			],
			pageOne: {
				currentPage: 1,
				totalPages: 10
			},
			autoPageOne: {
				currentPage: 1,
				totalPages: 10,
				cntpage: 10
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
			old_invoices: [],
			invoices: [],
			payments: [
				{
					id: '801',
					received_time: '2017-02-08 12:50:55+00',
					amount: '5.00000',
					remain_amount: '5'
				},
				{
					id: '802',
					received_time: '2017-02-08 12:50:55+00',
					amount: '5.00000',
					remain_amount: '5'
				},
				{
					id: '803',
					received_time: '2017-02-08 12:50:55+00',
					amount: '5.00000',
					remain_amount: '5'
				},
				{
					id: '804',
					received_time: '2017-02-08 12:50:55+00',
					amount: '5.00000',
					remain_amount: '5'
				},
				{
					id: '805',
					received_time: '2017-02-08 12:50:55+00',
					amount: '5.00000',
					remain_amount: '5'
				}
			],
			vendors: [],
			selected_auto_invoice_ids: [],
			
		}
	},
	methods: {
		handleChange1() {
			for(let i = 0; i < this.temp_invoice_table_columns1.length; i++) {
				if (_.indexOf(this.invoice_table_columns1, this.temp_invoice_table_columns1[i]) != -1) {
					Vue.set(this.showcolumns1, i, true);
				}
				else {
					Vue.set(this.showcolumns1, i, false);
				}
			}
		},
		handleChange() {
			for(let i = 0; i < this.temp_invoice_table_columns.length; i++) {
				if (_.indexOf(this.invoice_table_columns, this.temp_invoice_table_columns[i]) != -1) {
					Vue.set(this.showcolumns, i, true);
				}
				else {
					Vue.set(this.showcolumns, i, false);
				}
			}
		},
		fetchCarriers() {
			const url = api.getEndpointUrl() + '/v1/carrier/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const carriers = body.payload.items
						console.log(carriers);
						var self = this;
						this.carrier_options = [{
							id: 'all',
							text: 'All'
						}];
						this.carrier = 'all';
						carriers.forEach(function (temp, i) {
							var carrier = {};
							carrier.id = temp.client_id;
							carrier.text = temp.name;
							self.carrier_options.push(carrier);
						});
						console.log(this.carrier_options);
						
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
		deleteAutoClientInvoice: function() {
			var vm = this;
			this.showModal = false;

			this.selected_auto_invoice_ids.forEach(function (item, i) {
				var auto_invoice_id = item;
				if (auto_invoice_id == 0) {
					this.message('alert-warning', 'The Auto Client Invoice has been not selected!');
				}
				else {
					vm.loading = true;
					vm.resource = vm.$resource(api.getEndpointUrl() + '/v1/finance/invoice/' + auto_invoice_id);
					vm.resource.delete({ invoice_id: auto_invoice_id }).then(function (response) {
						vm.loading = false;
						vm.message('alert-success', 'The Auto Client Invoice have been deleted!');
						setTimeout(function () {
							vm.$router.go(vm.$router.currentRoute);
						}, 3000);
					});
				}
			});
		},
		delete_auto_invoice: function(id) {
			this.showModal = true;
			this.selected_auto_invoice_ids = [];
			this.selected_auto_invoice_ids.push(id);
		},
		pageOneChanged(pageNum) {
			this.pageOne.currentPage = pageNum
		},
		autoPageOneChanged(pageNum) {
			this.autoPageOne.currentPage = pageNum;
			var page = this.autoPageOne.currentPage - 1;
			
            console.log("page => " + page + " , per_page => " + per_page);
            this.loading = true;

            this.$http.get(api.getEndpointUrl() + "/v1/finance/invoice/list?page=" + page + "&per_page=" + per_page + "&order_by=&order_dir=desc",
            {
                headers: {
                    "X-Auth-Token": auth.getToken()
                }
            }).then(function (response) {
                this.loading = false;
                //todo: check success flag? validation errors?
                var invoices = response.body.payload.items;
                console.log(invoices);
                this.invoices = invoices;
                var total_page = response.body.payload.total;
                this.autoPageOne.currentPage = response.body.payload.page + 1;
                this.autoPageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
                console.log("total pages => " + this.autoPageOne.totalPages);
            }, function (error) {
                this.loading = false;
                console.log(error);
            });
		},
		closeModal: function () {
			this.showModal = '';
		},
		toggleTable(event) {
			var element = event.currentTarget;
			$(element).parents('tr').siblings('.collapse').toggleClass('in');
			$(element).html($(element).html() == "-" ? "+" : "-");
		}
	},
	mounted: function () {
		$('[data-toggle="tooltip"]').tooltip();
	},
	created: function() {
		this.fetchCarriers();
		console.log("invoice created");
        var page = this.autoPageOne.currentPage - 1;
        var per_page = this.autoPageOne.cntpage;
        console.log("page => " + page + " , per_page => " + per_page);
        

        this.$http.get(api.getEndpointUrl() + "/v1/finance/invoice/list?page=" + page + "&per_page=" + per_page + "&order_by=&order_dir=desc",
            {
                headers: {
                    "X-Auth-Token": auth.getToken()
                }
            }).then(function (response) {
                this.loading = false;
                //todo: check success flag? validation errors?
                var invoices = response.body.payload.items;
                console.log("invoices");
                console.log(invoices);
                this.invoices = invoices;
                var total_page = response.body.payload.total;
                this.autoPageOne.currentPage = response.body.payload.page + 1;
                this.autoPageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
                console.log("total pages => " + this.autoPageOne.totalPages);
            }, function (error) {
                this.loading = false;
                console.log(error);
            });
	},
	updated: function () {
		document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
	},
}
</script>

<style>
a.btn.btn-default.report_iconed .dnl_qos_report {
	margin: 3px 6px 0 0;
	display: inline-block;
	vertical-align: sub !important;
}

.tab_wrapper .btn-group {
	margin-top: -5px;
	margin-bottom: 20px;
}

.btn-group .btn.btn-default span.dnl_icon.dnl_disabled {
	font-size: 16px;
	vertical-align: sub;
}

a.action.action_money {
	font-size: 17px;
	vertical-align: top;
}

a.action.action_tick {
	vertical-align: top;
	font-size: 16px;
	padding: 4px 0 0 2px;
}

.width-340 {
	width: 340px;
}

a.blue_link {
	color: #03c0fc;
	cursor: pointer;
}

.bottom_null {
	margin-bottom: 0;
}

tr.accordian-body.collapse.no_padding.in h2.center-block.text-center {
	margin-top: 7px;
}

a.action.action_read {
	vertical-align: top;
}

.btn-primary span.dnl_icon.dnl_list {
	font-size: 12px;
	margin: 8px 6px 0 -12px;
}

a.btn.btn-primary.mini.pull-right.marged {
	margin-top: 20px;
}

td>span.dnl_icon.dnl_check,
td>span.dnl_icon.dnl_money {
	font-size: 20px;
	color: #03c0fc;
}

.width-205 {
	width: 205px;
}

a.blue_link.icon_link {
	font-size: 19px;
}

a.blue_link.icon_link:hover {
	text-decoration: none;
}
</style>
