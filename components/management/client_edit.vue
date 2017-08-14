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
				  <li class="breadcrumb-item active">Client Edit</li>
			</ol>
			<h1 class="page-header">Client "AAA VOIP"</h1>
				<tabs class="client_edit_tabs">
					<tab label="Basic Info" class="" icon="dnl_icon dnl_info" selected>
						<tabs class="vertical mail_template">
							<tab label="Basic Info" class="" icon="dnl_icon dnl_arrow-point-to-right" selected>
								<section class="role_section system_logo">
									<h2 class="role_section_name">Basic Info</h2>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="client_name">Name:</label>
											<input type="text" name="client_name" v-model="client_name" class="form-control" placeholder="Enter Name">
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label>Mode:</label>
											<select2 :options="options" v-model="mode">
											</select2>
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
											<label>Status:</label>
											<select2 :options="options" v-model="status">
											</select2>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label>Currency:</label>
											<select2 :options="options" v-model="currency">
											</select2>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="call_limit">Call limit:</label>
											<input type="text" name="call_limit" v-model="call_limit" class="form-control" placeholder="Enter Call Limit">
										</div>
									</div>
									<div class="clearfix little-space"></div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input id="unlim_allowed_credit" name="unlim_allowed_credit" type="checkbox"> 
												<label for="unlim_allowed_credit">Unlimited Allowed Credit</label>
											</div>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input id="offset_balance" name="offset_balance" type="checkbox"> 
												<label for="offset_balance">Offset Balance</label>
											</div>
										</div>
									</div>
									<div class="clearfix little-space"></div>
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
											<label for="tax_id">Tax ID:</label>
											<input type="text" name="tax_id" v-model="tax_id" class="form-control" placeholder="Enter Tax ID">
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group m-top-33">
											<div class="checkbox checkbox-success">
												<input id="invoice_tax" name="invoice_tax" type="checkbox"> 
												<label for="invoice_tax">Include Tax in Invoice</label>
											</div>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="tax_percent">Tax Percent:</label>
											<input type="text" name="tax_percent" v-model="tax_percent" class="form-control" placeholder="Enter Tax Percent">
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
							<tab label="Client Alert" class="" icon="dnl_icon dnl_arrow-point-to-right">
								<section class="role_section">
									<h2 class="role_section_name">Client Alert</h2>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input id="enable_trunk_update_alert" name="enable_trunk_update_alert" type="checkbox"> 
												<label for="enable_trunk_update_alert">Enable Trunk Update Alert</label>
											</div>
										</div>
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input id="enable_daily_usage_summary" name="enable_daily_usage_summary" type="checkbox"> 
												<label for="enable_daily_usage_summary">Enable Daily Usage Summary</label>
											</div>
										</div>
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input id="include_cdr" name="include_cdr" type="checkbox"> 
												<label for="include_cdr">Include CDR</label>
											</div>
										</div>
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input id="enable_daily_cdr_delivery" name="enable_daily_cdr_delivery" type="checkbox"> 
												<label for="enable_daily_cdr_delivery">Enable Daily CDR Delivery</label>
											</div>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input id="none_zero_only" name="none_zero_only" type="checkbox"> 
												<label for="none_zero_only">Non-Zero Only</label>
											</div>
										</div>
										<div class="form-group">
											<label>Group by:</label>
											<select2 :options="options" v-model="group_by">
											</select2>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input id="daily_balance_summary" name="daily_balance_summary" type="checkbox"> 
												<label for="daily_balance_summary">Daily Balance Summary</label>
											</div>
										</div>
										<div class="form-group">
											<label for="tax_percent">Number of Days:</label>
											<input type="text" name="days_number" v-model="days_number" class="form-control" placeholder="Enter Number of Days">
										</div>
									</div>
									<div class="clearfix"></div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label>Period:</label>
											<select2 :options="options" v-model="period">
											</select2>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label>Time Zone:</label>
											<select2 :options="options" v-model="period">
											</select2>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label>Send Hour:</label>
											<select2 :options="options" v-model="send_hour">
											</select2>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label>Recipient:</label>
											<select2 :options="options" v-model="recipient">
											</select2>
										</div>
									</div>
									<div class="clearfix"></div>
									<hr>
									<div class="col-md-12">
										<div class="form-group">
											<p class="inline">
												<div class="checkbox checkbox-success inline-block">
													<input id="notify_at_zero" name="notify_at_zero" type="checkbox">
													<label for="notify_at_zero">Zero Balance Notification at</label>
												</div>
												<div class="minimal_select">
													<select2 :options="options" v-model="gmt"></select2>
												</div>
												GMT
											</p>
										</div>
										<div class="form-group">
											<div class="checkbox checkbox-success inline-block">
												<input id="notify_at_low" name="notify_at_low" type="checkbox">
												<label for="notify_at_low">Low Balance Notification at</label>
											</div>
										</div>
										<div class="form-group">
											<div class="radio radio-success">
											 	<input id="radio-1" class="radio-custom" name="usd-percent" type="radio" checked>
            								 	<label for="radio-1" class="radio-custom-label">Send low balance alert 	when the balance is less than or equal to</label>
											</div>
										</div>
										<p class="inline">
											<input type="text" name="days_number" class="form-control medium">
											USD
										</p>
										<div class="clearfix little-space"></div>
										<div class="form-group">
											<div class="radio radio-success">
											 	<input id="radio-2" class="radio-custom" name="usd-percent" type="radio" checked>
            								 	<label for="radio-2" class="radio-custom-label">Send low balance alert 	when the credit remaining is less than or equal to</label>
											</div>
										</div>
										<p class="inline">
											<input type="text" name="days_number" class="form-control medium">
											% of credit limit
										</p>
										<div class="clearfix little-space"></div>
										<p>Notification should be sent</p>
										<p class="inline">
											<div class="minimal_select">
												<select2 :options="options" v-model="gmt"></select2>
											</div>
											at
											<div class="minimal_select">
												<select2 :options="options" v-model="gmt"></select2>
											</div>
											GMT
										</p>
										<div class="clearfix little-space"></div>
										<p>Notification should be sent for</p>
										<p class="inline">
											<input type="text" name="days_number" class="form-control medium">
											days to
											<div class="m-left-4 small_select">
												<select2 :options="options" v-model="gmt"></select2>
											</div>
										</p>
										<div class="clearfix little-space"></div>
										<p>Disable ingress trunks after</p>
										<p class="inline">
											<input type="text" name="days_number" class="form-control medium">
											days 
										</p>
									</div>
									<div class="clearfix little-space"></div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="time">Time:</label>
											<input type="text" name="time" v-model="time" class="form-control" placeholder="Enter Time">
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label>GMT:</label>
											<select2 :options="options" v-model="gmt">
											</select2>
										</div>
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
											<select2 :options="options"></select2>
										</div>
									</div>
								</div>
									<div class="clearfix"></div>
								</section>
							</tab>
							<tab label="Auto Invoice" class="" icon="dnl_icon dnl_arrow-point-to-right">
								<section class="role_section">
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
							<tab label="Carrier Self-Service Portal" class="negative_85" icon="dnl_icon dnl_arrow-point-to-right">
								<section class="role_section">
									<h2 class="role_section_name">Carrier Self-Service Portal</h2>
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
						<div class="button_set absolute">
							<a class="btn btn-primary mini">
								Save
							</a>
							<a class="btn btn-default mini">
								Reset All
							</a>
						</div>
						<div class="clearfix"></div>
					</tab>
					
					<tab label="Egress" class="" icon="dnl_icon dnl_egress">
						<h1 class="page-header">Egress</h1>
						<div class="clearfix"></div>
					</tab>
					<tab label="Ingress" class="" icon="dnl_icon dnl_ingress">
						<h1 class="page-header">Ingress</h1>
						<div class="clearfix"></div>
					</tab>
				</tabs>
				<div class="clearfix"></div>
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
				call_limit: '',
				currency: '',
				status: '',
				cps_limit: '',
				mode: '',
				client_name: '',
				role_name: '',
				view_all_carriers: '',
				company_name: '',
				main_email: '',
				noc_email: '',
				billing_email: '',
				rates_email: '',
				address: '',
				tax_id: '',
				rate_delivery_email:'',
				account_details: '',
				tax_percent: '',
				days_number: '',
				group_by: '1',
				select: '1',
				period: '2',
				time_zone: '2',
				send_hour: '0',
				recipient: '2',
				gmt: '',
				payment_terms: '',
				no_invoice_for_zero_traffic: '',
				cdr_compression_formst: '',
				rate_decimal_place: '',
				rate_value: '',
				starting_from: '',
				time: '',
				username: '',
				password: '',
				options: [
				  { id: 1, text: 'option1' },
				  { id: 2, text: 'option2' },
				  { id: 3, text: 'option3' },
				  { id: 4, text: 'option4' },
				  { id: 5, text: 'option5' }
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
		mounted: function() {
			$('#user_detail_fields').multiSelect({
				 selectableHeader: "<div class='custom-header'>Unappropriated</div>",
  				 selectionHeader: "<div class='custom-header'>Unappropriated</div>"
			});
		}
	}
</script>

<style>
	.tab span.dnl_icon.dnl_info,
	.tab span.dnl_icon.dnl_egress,
	.tab span.dnl_icon.dnl_ingress {
		font-size: 18px;
		margin-right: 5px;
		line-height: 0;
		vertical-align: middle;
	}
	
	.checkbox.checkbox-success.inline-block {
		vertical-align: text-top;
	}
	
	.minimal_select {
		display: inline-block;
		width: 100px;
		vertical-align: middle;
		margin: 0 4px;
	}
	
	.minimal_select .select2-container {
		width: 100% !important;
	}
	
	input.form-control.medium {
		width: 100px;
		display: inline-block;
		margin: 0 4px;
	}
	
	.m-left-4 {
		margin-left: 4px;
	}
	
	.client_edit_tabs > .tabs_container {
    	padding: 25px;
    	padding-bottom: 85px;
	}
	
	.negative_85 {
		margin-bottom:-85px;
	}
	
	@media (max-width: 767px) {
		.client_edit_tabs > .tabs_container {
			padding: 25px;
			padding-bottom: 25px;
		}
		
		.negative_85 {
			margin-bottom: 0;
		}
	}
    
    .tabs .button_set.absolute {
        margin-top: 365px;
    }
</style>
