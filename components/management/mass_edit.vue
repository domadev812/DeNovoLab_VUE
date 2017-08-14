<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Management</a></li>
				  <li class="breadcrumb-item">
					  <router-link to="/management/carrier">Clients</router-link>
				  </li>
				  <li class="breadcrumb-item active">Mass Editor</li>
			</ol>
			<h1 class="page-header">Mass Editor</h1>
			<router-link to="/management/carrier" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad">
				<tabs class="vertical">
					<tab label="Basic Info" class="" icon="dnl_icon dnl_arrow-point-to-right" selected>
						<section class="role_section basic_section">
							<h2 class="role_section_name">Basic Info</h2>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>Status:</label>
									<select2 :options="status_options" v-model="status">
									</select2>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>Mode:</label>
									<select2 :options="mode_options" v-model="mode">
									</select2>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>Currency:</label>
									<select2 :options="mode_options" v-model="currency">
									</select2>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="test_credit">Test Credit:</label>
									<input type="text" name="test_credit" v-model="test_credit" class="form-control" placeholder="Enter Test Credit">
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="allowed_credit">Allowed Credit:</label>
									<input type="text" name="allowed_credit" v-model="allowed_credit" class="form-control medium_block" placeholder="Enter Credit Limit">
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="unlimited" name="unlimited" type="checkbox"> 
										<label for="unlimited">Unlimited</label>
									</div>
								</div>
							</div>
							<div class="clearfix"></div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="offset_balance" name="offset_balance" type="checkbox"> 
										<label for="offset_balance">Offset Balance</label>
									</div>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="cps_limit">CPS Limit:</label>
									<input type="text" name="cps_limit" v-model="cps_limit" class="form-control" placeholder="Enter CPS Limit">
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="call_limit">Call limit:</label>
									<input type="text" name="call_limit" v-model="call_limit" class="form-control" placeholder="Enter Call Limit">
								</div>
							</div>
							<div class="clearfix"></div>
						</section>
					</tab>
					<tab label="Basic Setting" class="" icon="dnl_icon dnl_arrow-point-to-right">
						<section class="role_section">
							<h2 class="role_section_name">Basic Setting</h2>
							<div class="clearfix"></div>
							<div class="col-md-6 col-sm-6">
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="send_trunk_update" name="send_trunk_update" type="checkbox"> 
										<label for="send_trunk_update">Send Trunk Update</label>
									</div>
								</div>
							</div>
							<div class="clearfix"></div>
						</section>
					</tab>
					<tab label="Fraud Detection" class="" icon="dnl_icon dnl_arrow-point-to-right">
						<section class="role_section">
							<h2 class="role_section_name">Fraud Detection</h2>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="daily_limit">Daily Limit:</label>
									<input type="text" name="daily_limit" v-model="daily_limit" class="form-control" placeholder="Enter Daily Limit">
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="hourly_limit">Hourly Limit:</label>
									<input type="text" name="hourly_limit" v-model="hourly_limit" class="form-control" placeholder="Enter Hourly Limit">
								</div>
							</div>
							<div class="clearfix"></div>
						</section>
					</tab>
					<tab label="Auto Invoice" class="" icon="dnl_icon dnl_arrow-point-to-right">
						<section class="role_section fix-select">
							<h2 class="role_section_name">Auto Invoice</h2>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>Payment Terms:</label>
									<select2 :options="options" v-model="payment_terms">
									</select2>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="last_invoiced_from">Starting From:</label>
									<input type="text" name="starting_from" v-model="starting_from" class="form-control" placeholder="Enter Start Date">
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>Time Zone:</label>
									<select2 :options="options" v-model="time_zone">
									</select2>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>No Invoice for Zero Traffic:</label>
									<select2 :options="options" v-model="no_invoice_for_zero_traffic">
									</select2>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>CDR Compression Format:</label>
									<select2 :options="options" v-model="cdr_compression_formst">
									</select2>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>Rate Decimal Place:</label>
									<select2 :options="options" v-model="rate_decimal_place">
									</select2>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>Rate Value:</label>
									<select2 :options="options" v-model="rate_value">
									</select2>
								</div>
							</div>
							<div class="clearfix little-space"></div>
							<div class="col-md-6 col-sm-6">
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="daily_cdr_generation" name="daily_cdr_generation" type="checkbox"> 
										<label for="daily_cdr_generation">Include Tax In Invoice</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="daily_cdr_generation" name="daily_cdr_generation" type="checkbox"> 
										<label for="daily_cdr_generation">Include Available Credit</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="daily_cdr_generation" name="daily_cdr_generation" type="checkbox"> 
										<label for="daily_cdr_generation">Send Invoice As Link In Email</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="daily_cdr_generation" name="daily_cdr_generation" type="checkbox"> 
										<label for="daily_cdr_generation">Show Daily Usage</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="daily_cdr_generation" name="daily_cdr_generation" type="checkbox"> 
										<label for="daily_cdr_generation">Short Duration Call Surcharge Detail</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="daily_cdr_generation" name="daily_cdr_generation" type="checkbox"> 
										<label for="daily_cdr_generation">Include Summary of Payments</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="daily_cdr_generation" name="daily_cdr_generation" type="checkbox"> 
										<label for="daily_cdr_generation">Show Detail By Trunk</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="daily_cdr_generation" name="daily_cdr_generation" type="checkbox"> 
										<label for="daily_cdr_generation">Show Total By Trunk</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="include_account_detail" name="include_account_detail" type="checkbox"> 
										<label for="include_account_detail">Vendor Payment Terms</label>
									</div>
								</div>
								<div class="form-group">
									<select2 :options="options" >
									</select2>
								</div>
							</div>
							<div class="col-md-6 col-sm-6">
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="daily_cdr_generation" name="daily_cdr_generation" type="checkbox"> 
										<label for="daily_cdr_generation">Show Code Summary (Top 10)</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="daily_cdr_generation" name="daily_cdr_generation" type="checkbox"> 
										<label for="daily_cdr_generation">Show Traffic Analysis by Code Name</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="daily_cdr_generation" name="daily_cdr_generation" type="checkbox"> 
										<label for="daily_cdr_generation">Show Traffic Analysis By Country</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="daily_cdr_generation" name="daily_cdr_generation" type="checkbox"> 
										<label for="daily_cdr_generation">Show Calls By Date Summary</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="daily_cdr_generation" name="daily_cdr_generation" type="checkbox"> 
										<label for="daily_cdr_generation">Include CDR Link In Email</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="daily_cdr_generation" name="daily_cdr_generation" type="checkbox"> 
										<label for="daily_cdr_generation">Show Detail By Code Name</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="daily_cdr_generation" name="daily_cdr_generation" type="checkbox"> 
										<label for="daily_cdr_generation">Show Jurisdictional Detail</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="daily_cdr_generation" name="daily_cdr_generation" type="checkbox"> 
										<label for="daily_cdr_generation">Break Down By Rate Table</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="include_account_detail" name="include_account_detail" type="checkbox"> 
										<label for="include_account_detail">Include Account Detail</label>
									</div>
								</div>
								<div class="form-group">
									<select2 :options="options" >
									</select2>
								</div>
							</div>
							<div class="clearfix little-space"></div>
							<div class="col-md-8 col-sm-12">
								  <label for="groupname">Usage Detail Fields:</label>
								  <select multiple="multiple" id="user_detail_fields" name="carrier">
									<option v-for="option in multi_options" :value='option.value'>{{option.text}}</option>
								  </select>
							 </div>
							<div class="clearfix"></div>
						</section>
					</tab>
					<tab label="Short Call Charge" class="" icon="dnl_icon dnl_arrow-point-to-right">
						<section class="role_section">
							<h2 class="role_section_name">Short Call Charge</h2>
							<div class="col-md-12">
								<div class="form-group">
									<p class="inline">If <input type="text" name="" class="form-control small">% overall invoice minute is below or equal to <input type="text" name="" class="form-control small"> second, then an additional charge of <input type="text" name="" class="form-control small"> will be applied to each call</p>
									<div class="small_select">
										<select2 :options="mode_options"></select2>
									</div>
								</div>
							</div>
							<div class="clearfix"></div>
						</section>
					</tab>
					<tab label="Carrier Self-service Portal" class="" icon="dnl_icon dnl_arrow-point-to-right">
						<section class="role_section">
							<h2 class="role_section_name">Carrier Self-service Portal</h2>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="username">Username:</label>
									<input type="text" name="username" v-model="username" class="form-control" placeholder="Enter Username">
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="password">Password:</label>
									<input type="password" name="password" v-model="password" class="form-control" placeholder="Enter Password">
								</div>
							</div>
							<div class="clearfix"></div>
							<hr>
							<h2 class="role_section_name">Permissons</h2>
							<div class="col-md-6 col-sm-6">
								<h4 class="role_section_name">Management</h4>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="daily_cdr_generation" name="daily_cdr_generation" type="checkbox"> 
										<label for="daily_cdr_generation">Account Summary</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="daily_cdr_generation" name="daily_cdr_generation" type="checkbox"> 
										<label for="daily_cdr_generation">Rate Table</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="daily_cdr_generation" name="daily_cdr_generation" type="checkbox"> 
										<label for="daily_cdr_generation">Trunks</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="daily_cdr_generation" name="daily_cdr_generation" type="checkbox"> 
										<label for="daily_cdr_generation">Products</label>
									</div>
								</div>
							</div>
							<div class="col-md-6 col-sm-6">
								<h4 class="role_section_name">Billing</h4>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="daily_cdr_generation" name="daily_cdr_generation" type="checkbox"> 
										<label for="daily_cdr_generation">Balance</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="daily_cdr_generation" name="daily_cdr_generation" type="checkbox"> 
										<label for="daily_cdr_generation">Payment History</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="daily_cdr_generation" name="daily_cdr_generation" type="checkbox"> 
										<label for="daily_cdr_generation">Online Payment</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="daily_cdr_generation" name="daily_cdr_generation" type="checkbox"> 
										<label for="daily_cdr_generation">Invoices</label>
									</div>
								</div>
							</div>
							<div class="clearfix little-space"></div>
							<div class="col-md-6 col-sm-6">
								<h4 class="role_section_name">Reports</h4>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="daily_cdr_generation" name="daily_cdr_generation" type="checkbox"> 
										<label for="daily_cdr_generation">CDRs List</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="daily_cdr_generation" name="daily_cdr_generation" type="checkbox"> 
										<label for="daily_cdr_generation">Summary Report</label>
									</div>
								</div>
							</div>
							<div class="col-md-6 col-sm-6">
								<h4 class="role_section_name">SIP PACKET Search</h4>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="daily_cdr_generation" name="daily_cdr_generation" type="checkbox"> 
										<label for="daily_cdr_generation">SIP PACKET Search</label>
									</div>
								</div>
							</div>
							<div class="clearfix"></div>
						</section>
					</tab>
					<tab label="Low Balance Notification" class="" icon="dnl_icon dnl_arrow-point-to-right">
						<section class="role_section">
							<h2 class="role_section_name">Low Balance Notification</h2>
							<div class="col-md-12 col-sm-12">
								<div class="form-group">
									<div class="radio radio-success">
										<input id="radio-1" class="radio-custom" name="usd-percent" type="radio" checked>
										<label for="radio-1" class="radio-custom-label">Send low balance alert 	when the balance is less than or equal to:</label>
									</div>		
									<p class="inline"><input type="text" name="days_number" class="form-control small"> USD</p>
									<div class="radio radio-success">
										<input id="radio-2" class="radio-custom" name="usd-percent" type="radio" checked>
										<label for="radio-2" class="radio-custom-label">Send low balance alert when the credit remaining is less than or equal to:</label>
									</div>
									<p class="inline"><input type="text" name="days_number" class="form-control small"> % of credit limit</p>
									<div class="clearfix"></div>
									<p class="inline">Notification should be sent</p>
									<div class="small_select">
										<select2 :options="mode_options"></select2>
									</div>
									<p class="inline">at</p>
									<div class="small_select">
										<select2 :options="mode_options"></select2>
									</div>
									<p class="inline">GMT</p>
									<div class="clearfix"></div>
									<p class="inline m-top-10">Notification should be sent for <input type="text" name="days_number" class="form-control small"> Days to</p>
									<div class="small_select">
										<select2 :options="mode_options"></select2>
									</div>
									<div class="clearfix"></div>
									<p class="inline m-top-10">Disable ingress trunks after <input type="text" name="days_number" class="form-control small"> Days</p>
									<div class="clearfix"></div>
									<p class="inline m-top-10">Time <input type="text" name="days_number" class="form-control small"> GMT</p>
									<div class="small_select">
										<select2 :options="mode_options"></select2>
									</div>
								</div>
							</div>
							<div class="clearfix"></div>
						</section>
					</tab>
				</tabs>
				<div class="button_set absolute m-top-20">
					<a class="btn btn-primary mini">
						Submit
					</a>
					<a class="btn btn-default mini">
						Reset
					</a>
				</div>
				<div class="clearfix"></div>
			</div>
		</div>
	  </div>
	</div>
</template>

<script>   
	const vTabs = require('vue!../main_components/tabs.vue'),
		  vTab = require('vue!../main_components/tab.vue'),
		  vSelect = require('vue!../main_components/select.vue'),
		  multiselect = require('multiselect');
	module.exports = {
		components: {
			'tabs': vTabs,
			'tab': vTab,
			'select2': vSelect,
			'multiselect': multiselect
		},
		data: function(){
            return {
				groupname: '',
				options: [
					  { id: 1, value: 'carrier1', text: 'Carrier 1' },
					  { id: 2, value: 'carrier2', text: 'Carrier 2' },
					  { id: 3, value: 'carrier3', text: 'Carrier 3' },
					  { id: 4, value: 'carrier4', text: 'Carrier 4' },
					  { id: 5, value: 'carrier5', text: 'Carrier 5' }
				],
				daily_limit: '',
				hourly_limit: '',
				allowed_credit: '',
				username: '',
				password: '',
				status: '1',
				mode: '1',
				currency: '1',
				test_credit: '',
				cps_limit: '',
				call_limit: '',
				send_trunk_update: '',
				period: '',
				send_hour: '',
				time_zone: '',
				recipient: '',
				include_cdr: '',
				daily_usage_summary: '',
				non_zero: '',
				group_by: '',
				gmt: '',
				daily_balance_summary: '',
				daily_cdr_generation: '',
				days_number: '',
				cdr_type: '',
				payment_terms: '',
				no_invoice_for_zero_traffic: '',
				cdr_compression_formst: '',
				rate_decimal_place: '',
				rate_value: '',
				starting_from: '',
				invoice_format: '',
				last_invoiced_for: '',
				status_options: [
					{id:1, text:'Active'},
					{id:2, text:'Inactive'},
				],
				mode: '1',
				mode_options: [
					{id:1, text: 'Prepaid'},
					{id:2, text: 'Postpaid'},
				],
				multi_options: [
					  { id: 1, value: 'carrier1', text: 'Carrier 1' },
					  { id: 2, value: 'carrier2', text: 'Carrier 2' },
					  { id: 3, value: 'carrier3', text: 'Carrier 3' },
					  { id: 4, value: 'carrier4', text: 'Carrier 4' },
					  { id: 5, value: 'carrier5', text: 'Carrier 5' }
				]
			}
        },
		methods: {
		},
		mounted: function() {
			$('#user_detail_fields').multiSelect({
				 selectableHeader: "<div class='custom-header'>Unappropriated</div>",
  				 selectionHeader: "<div class='custom-header'>Unappropriated</div>"
			});
		}
	}
</script>

<style>
	.button_set.absolute.m-top-20 {
		margin-top: 420px;
	}
</style>
