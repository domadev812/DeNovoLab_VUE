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
				  <li class="breadcrumb-item active">Create New By Template</li>
			</ol>
			<h1 class="page-header">Client Editor</h1>
			<router-link to="/management/clients/new" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad">
				<tabs class="vertical">
					<tab label="Basic Info" class="" icon="dnl_icon dnl_arrow-point-to-right" selected>
						<section class="role_section basic_section">
							<h2 class="role_section_name">Basic Info</h2>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>Carrier Template:</label>
									<select2 :options="mode_options" v-model="mode">
									</select2>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>Carrier Name:</label>
									<select2 :options="status_options" v-model="status">
									</select2>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>Status:</label>
									<select2 :options="mode_options" v-model="currency">
									</select2>
								</div>
							</div>
							<div class="clearfix"></div>
						</section>
					</tab>
					<tab label="Company Info" class="" icon="dnl_icon dnl_arrow-point-to-right">
						<section class="role_section">
							<h2 class="role_section_name">Company Info</h2>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="company_name">Company Name:</label>
									<input type="text" name="company_name" v-model="company_name" class="form-control" placeholder="Enter Company Name">
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="main_email">Main E-mail:</label>
									<input type="email" name="main_email" v-model="main_email" class="form-control" placeholder="Enter Main E-mail">
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="noc_email">NOC E-mail:</label>
									<input type="email" name="noc_email" v-model="noc_email" class="form-control" placeholder="Enter NOC E-mail">
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="billing_email">Billing E-mail:</label>
									<input type="email" name="billing_email" v-model="billing_email" class="form-control" placeholder="Enter Billing E-mail">
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="rates_email">Rates E-mail:</label>
									<input type="email" name="rates_email" v-model="rates_email" class="form-control" placeholder="Enter Rates E-mail">
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="rate_delivery_email">Rate Delivery E-mail:</label>
									<input type="email" name="rate_delivery_email" v-model="rate_delivery_email" class="form-control" placeholder="Enter Rate Delivery E-mail">
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="tax_id">Tax ID</label>
									<input type="text" name="tax_id" v-model="tax_id" class="form-control" placeholder="Enter Tax ID">
								</div>
							</div>
							<div class="clearfix"></div>
							<div class="col-md-6 col-sm-6">
								<div class="form-group">
									<label for="address">Address:</label>
									<textarea name="address" v-model="address" class="form-control" placeholder="Enter Company Address"/>
								</div>
							</div>
							<div class="col-md-6 col-sm-6">
								<div class="form-group">
									<label for="account_details">Account Details:</label>
									<textarea name="account_details" v-model="account_details" class="form-control" placeholder="Enter Account Details"/>
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
				</tabs>
				<div class="clearfix"></div>
				<div class="button_set m-top-20">
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
				username: '',
				password: '',
				current_date: '', 
				client_name: '',
				status: '1',
				mode: '1',
				currency: '1',
				test_credit: '',
				min_profitability: '',
				cps_limit: '',
				call_limit: '',
				company_name: '',
				main_email: '',
				noc_email: '',
				billing_email: '',
				rates_email: '',
				address: '',
				tax_id: '',
				rate_delivery_email:'',
				account_details: '',
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
				invoice_format: '',
				cdr_compression_formst: '',
				rate_decimal_place: '',
				rate_value: '',
				last_invoiced_for: '',
				status_options: [
					{id:1, text:'Active'},
					{id:2, text:'Inactive'},
				],
				mode: '1',
				mode_options: [
					{id:1, text: 'Prepaid'},
					{id:2, text: 'Postpaid'},
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
	
</style>
