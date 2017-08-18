<template>
	<div v-if="$route.path !== '/auth/login' && $route.path !== '/auth/registration' && $route.path !== '/auth/reset_password' && $route.path !== '/auth/successful_registration'">
		<nav class="admin-menu navbar navbar-static-top navbar-inverse navbar-fixed-top" v-if="user_type=='admin'">
			<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="#">
				<img src="assets/images/header_logo.png" class="header_logo">
			</a>
			<user class="visible-xs"></user>
			</div>
			<div id="navbar" class="navbar-collapse collapse">
			<ul class="nav navbar-nav navbar-center">
				<li class="dropdown">
					<a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Configuration 
						<span class="caret"></span>
					</a>
					<ul class="dropdown-menu">
						<li>
							<router-link to="/configuration/carrier_group">Carrier Group </router-link>
						</li>
						<li>
							<router-link to="/configuration/carrier_portal_allowed_cdr_fields">Carrier Portal CDR Fields </router-link>
						</li>
						<li>
							<router-link to="/configuration/auto_cdr_generation_format">CDR Generation Format</router-link>
						</li>
						<li>
							<router-link to="/configuration/default_failover_rule">Default Fail-over Rule</router-link>
						</li>
						<li>
							<router-link to="/configuration/ftp_configuration">FTP Configuration</router-link>
						</li>
						<li>
							<router-link to="/configuration/default_error_response">Global Route Error</router-link>
						</li>
						<li>
							<router-link to="/configuration/invoice_setting">Invoice Setting</router-link>
						</li>
						<li>
							<router-link to="/configuration/login_content">Login Page Content</router-link>
						</li>
						<li>
							<router-link to="/configuration/email_sender">Mail Sender</router-link>
						</li>
						<li>
							<router-link to="/configuration/mail_template">Mail Template</router-link>
						</li>
						<li>
							<router-link to="/configuration/payment_setting">Payment Setting</router-link>
						</li>
						<li>
							<router-link to="/configuration/roles">Roles</router-link>
						</li>
						<li>
							<router-link to="/configuration/modules">System Modules</router-link>
						</li>
						<li>
							<router-link to="/configuration/system_setting">System Setting</router-link>
						</li>
						<li>
							<router-link to="/configuration/trunk_group">Trunk Group</router-link>
						</li>
						<li>
							<router-link to="/configuration/user_management">User Management</router-link>
						</li>
						<!-- <li>
							<router-link to="/configuration/verify_configuration">Verify Configuration</router-link>
						</li> -->
					</ul>
				</li>
				<li class="dropdown">
					<a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Finance 
						<span class="caret"></span>
					</a>
					<ul class="dropdown-menu">
						<li>
							<router-link to="/finance/actual_transaction">Actual Transaction</router-link>
						</li>
						<li>
							<router-link to="/finance/auto_invoice_management">Auto Invoice Management</router-link>
						</li>
						<li>
							<router-link to="/finance/carrier_invoice_history">Carrier Invoice History</router-link>
						</li>
						<li>
							<router-link to="/finance/invoices">Invoices</router-link>
						</li>
						<!-- <li>
							<router-link to="/finance/invoice_notification_log">Invoice Notification Log</router-link>
						</li> -->
						<li>
							<router-link to="/finance/mutual_transaction">Mutual Transaction</router-link>
						</li>
						<!-- <li>
							<router-link to="/finance/past_due_notification_log">Past Due Notification Log</router-link>
						</li> -->
						<li>
							<router-link to="/finance/past_due_summary">Past Due Summary</router-link>
						</li>
						<li>
							<router-link to="/finance/payment">Payment</router-link>
						</li>
						<li>
							<router-link to="/finance/regenerate_balance">Regenerate Balance</router-link>
						</li>
					</ul>
				</li>
				<li class="dropdown">
					<a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Log
						<span class="caret"></span>
					</a>
					<ul class="dropdown-menu">
						<!-- <li>
							<router-link to="/log/authorization_log">Authorization Log</router-link>
						</li> -->
						<li>
							<router-link to="/log/auto_payment_log">Auto Payment Log</router-link>
						</li>
						<!--<li>
							<router-link to="/log/balance_log">Balance Log</router-link>
						</li>-->
						<!--<li>
							<router-link to="/log/credit_log">Credit Log</router-link>
						</li>-->
						<li>
							<router-link to="/log/email_log">Email Log</router-link>
						</li>
						<li>
							<router-link to="/log/export_log">Export Log</router-link>
						</li>
						<li>
							<router-link to="/log/ftp_log">FTP Log</router-link>
						</li>
						<!--<li>
							<router-link to="/log/ftp_server_log">FTP Server Log</router-link>
						</li>-->
						<li>
							<router-link to="/log/import_log">Import Log</router-link>
						</li>
						<!--<li>
							<router-link to="/log/invoice_cdr_log">Invoice CDR Log</router-link>
						</li>-->
						<li>
							<router-link to="/log/invoice_log">Invoice Log</router-link>
						</li>
						<!--<li>
							<router-link to="/log/ip_modify_log">IP Modify Log</router-link>
						</li>-->
						<!--<li>
							<router-link to="/log/license_modification_log">License Modification Log</router-link>
						</li>-->
						<li>
							<router-link to="/log/modification_log">Modification Log</router-link>
						</li>
						<!--<li>
							<router-link to="/log/origination_log">Origination Log</router-link>
						</li>-->
						<li>
							<router-link to="/log/rate_import_log">Rate Import log</router-link>
						</li>
						<li>
							<router-link to="/log/rate_mass_edit_log">Rate Mass Edit Log</router-link>
						</li>
						<li>
							<router-link to="/log/retrieve_password_log">Retrieve Password Log</router-link>
						</li>
						<!--<li>
							<router-link to="/log/scheduled_report_log">Scheduled Report Log</router-link>
						</li>-->
						<!--<li>
							<router-link to="/log/scheduler_log">Scheduler Log</router-link>
						</li>-->
						<li>
							<router-link to="/log/sip_register">SIP Register</router-link>
						</li>
						<!--<li>
							<router-link to="/log/sql_log">SQL Log</router-link>
						</li>-->
						<li>
							<router-link to="/log/user_signin_history">User Sign in History</router-link>
						</li>
					</ul>
				</li>
				<li class="dropdown">
				<a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Management 
					<span class="caret"></span>
				</a>
				<ul class="dropdown-menu">
					<li>
						<router-link to="/management/carrier">Carrier</router-link>
					</li>
					<li>
						<router-link to="/management/client_rate_summary">Client Rate Summary</router-link>
					</li>
					<li>
						<router-link to="/management/credit_management">Credit Management</router-link>
					</li>
					<li>
						<router-link to="/management/products">Products</router-link>
					</li>
					<li>
						<router-link to="/management/registration">Registration</router-link>
					</li>
					<li>
						<router-link to="/management/unclaimed_trunks">Unclaimed Trunks</router-link>
					</li>
					<li>
						<router-link to="/management/wizard">Wizard</router-link>
					</li>
					</ul>
				</li>
				<li class="dropdown">
				<a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Monitoring 
					<span class="caret"></span>
				</a>
				<ul class="dropdown-menu">
					<!--<li>
						<router-link to="/monitoring/blackhole_ip">Blackhole IP</router-link>
					</li>-->
					<!--<li>
						<router-link to="/monitoring/dialer_detection">Dialer Detection</router-link>
					</li>-->
					<li>
						<router-link to="/monitoring/fraud_detection/default">Fraud Detection</router-link>
					</li>
					<li>
						<router-link to="/monitoring/loop_detection">Loop Detection</router-link>
					</li>
					<li>
						<router-link to="/monitoring/rule">Rule</router-link>
					</li>
					<!--<li>
						<router-link to="/monitoring/traffic_alert_rule">Traffic Alert Rule</router-link>
					</li>-->
				</ul>
				</li>
				<li class="dropdown">
				<a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Origination 
					<span class="caret"></span>
				</a>
				<ul class="dropdown-menu">
					<li>
						<router-link to="/origination/billing_rule">Billing Rule</router-link>
					</li>
					<li>
						<router-link to="/origination/clients">Clients</router-link>
					</li>
					<li>
						<router-link to="/origination/did_repository">DID Repository</router-link>
					</li>
					<li>
						<router-link to="/origination/did_routing">Origination Static Routing</router-link>
					</li>
					<li>
						<router-link to="/origination/vendors">Vendors</router-link>
					</li>
					<!-- <li>
						<router-link to="/origination/tickets">Tickets</router-link>
					</li>
					<li>
						<router-link to="/origination/users">Users</router-link>
					</li> -->
					<li>
						<router-link to="/origination/wizard">Wizard</router-link>
					</li>
					</ul>
				</li>
				<li class="dropdown">
					<a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Routing 
						<span class="caret"></span>
					</a>
					<ul class="dropdown-menu">
						<li>
							<router-link to="/routing/block_list">Block List</router-link>
						</li>
						<li>
							<router-link to="/routing/digital_maps">Digital Translation</router-link>
						</li>
						<li>
							<router-link to="/routing/dynamic_routing">Dynamic Routing</router-link>
						</li>
						<li>
							<router-link to="/routing/routing_plan">Routing Plan</router-link>
						</li>
						<li>
							<router-link to="/routing/static_routing">Static Routing</router-link>
						</li>
						<li>
							<router-link to="/routing/trunks">Trunks</router-link>
						</li>
						<li>
							<router-link to="/routing/wizard">Wizard</router-link>
						</li>
					</ul>
				</li>
				<li class="dropdown">
					<a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Statistics
						<span class="caret"></span>
					</a>
					<ul class="dropdown-menu">
						<li>
							<router-link to="/statistics/active_call_report">Active Call Report</router-link>
						</li>
						<!-- <li>
							<router-link to="/statistics/active_registration">Active Registration</router-link>
						</li> -->
						<li>
							<router-link to="/statistics/cdrs_list">CDRs List</router-link>
						</li>
						<li>
							<router-link to="/statistics/daily_channel_usage_report">Daily Channel Usage Report</router-link>
						</li>
						<li>
							<router-link to="/statistics/daily_usage_detail_report">Daily Usage Detail Report</router-link>
						</li>
						<li>
							<router-link to="/statistics/dashboard">Dashboard</router-link>
						</li>
						<li>
							<router-link to="/statistics/disconnect_causes">Disconnect Causes</router-link>
						</li>
						<li>
							<router-link to="/statistics/host_based_report">Host Based Report</router-link>
						</li>
						<li>
							<router-link to="/statistics/inbound_outbound_report">Inbound/Outbound Report</router-link>
						</li>
						<!--<li>
							<router-link to="/statistics/lrn_dipping_record">LNP Dip Record</router-link>
						</li>
						<li>
							<router-link to="/statistics/location_report">Location Report</router-link>
						</li>-->
						<li>
							<router-link to="/statistics/profitability_analysis">Profitability Analysis</router-link>
						</li>
						<li>
							<router-link to="/statistics/qos_summary">QoS Summary</router-link>
						</li>
						<li>
							<router-link to="/statistics/spam_report">Spam Report</router-link>
						</li>
						<li>
							<router-link to="/statistics/summary_report">Summary Report</router-link>
						</li>
						<li>
							<router-link to="/statistics/usage_report">Usage Report</router-link>
						</li>
					</ul>
				</li>
				<li class="dropdown">
					<a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Switch
						<span class="caret"></span>
					</a>
					<ul class="dropdown-menu">
						<li>
							<router-link to="/switch/capacity">Capacity</router-link>
						</li>
						<li>
							<router-link to="/switch/code_deck">Code Deck</router-link>
						</li>
						<!-- <li>
							<router-link to="/switch/currency">Currency</router-link>
						</li> -->
						<li>
							<router-link to="/switch/us_jurisdiction">US Jurisdiction</router-link>
						</li>
						<li>
							<router-link to="/switch/payment_term">Payment Term</router-link>
						</li>
						<!-- <li>
							<router-link to="/switch/random_ani_group">Random ANI Group</router-link>
						</li> -->
						<li>
							<router-link to="/switch/rate_table">Rate Table</router-link>
						</li>
						<li>
							<router-link to="/switch/time_profile">Time Profile</router-link>
						</li>
						<li>
							<router-link to="/switch/voip_gateway">VoIP Gateway</router-link>
						</li>
					</ul>
				</li>
				<li class="dropdown">
					<a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Template
						<span class="caret"></span>
					</a>
					<ul class="dropdown-menu">
						<li>
							<router-link to="/template/carrier_template">Carrier Template</router-link>
						</li>
						<li>
							<router-link to="/template/egress_trunk_template">Egress Trunk Template</router-link>
						</li>
						<li>
							<router-link to="/template/ingress_trunk_template">Ingress Trunk Template</router-link>
						</li>
						<!-- <li>
							<router-link to="/template/rate_email_template">Rate Email Template</router-link>
						</li> -->
						<li>
							<router-link to="/template/rate_upload_template">Rate Upload Template</router-link>
						</li>
					</ul>
				</li>
				<li class="dropdown">
					<a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Agent
						<span class="caret"></span>
					</a>
					<ul class="dropdown-menu">
						<li>
							<router-link to="/agent/agent_management">Agent Management</router-link>
						</li>
						<li>
							<router-link to="/agent/commission_history">Commission History</router-link>
						</li>
						<li>
							<router-link to="/agent/commission_report">Commission Report</router-link>
						</li>
					</ul>
				</li>
				<li class="dropdown">
					<a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Tools
						<span class="caret"></span>
					</a>
					<ul class="dropdown-menu">
						<!-- <li>
							<router-link to="/tools/auto_rate_upload">Auto Rate Upload</router-link>
						</li> -->
						<li>
							<router-link to="/tools/call_simulation">Call Simulation</router-link>
						</li>
						<!-- <li>
							<router-link to="/tools/cdr_reconciliation">Cdr Reconciliation</router-link>
						</li>
						<li>
							<a href="#">LCR Generation</a>
						</li> -->
						<li>
							<router-link to="/tools/rate_generation">Rate Generation</router-link>
						</li>
						<li>
							<router-link to="/tools/rerate">Rerate</router-link>
						</li>
						<li>
							<router-link to="/tools/sip_packet_search">SIP Packet Search</router-link>
						</li>
					</ul>
				</li>
			</ul>
			<user class="hidden-xs"></user>
			</div><!--/.nav-collapse -->
		</nav>

		<nav class="client-menu navbar navbar-static-top navbar-inverse navbar-fixed-top" v-if="user_type=='agent'">
			<div class="topBar">
			<div class="top">
				<div class="col-md-3 col-sm-1">
				<img src="assets/images/header_logo.png" alt="header_logo">
				</div>
				<div class="col-md-5 col-sm-6">
				<ul class="middlelinks">
					<li><a href="/#/agents/management/agent_dashboard"><img src="assets/images/client/dashboard.png" alt="">DASHBOARD</a></li>
					<li class="have-sub-menue" @click="subHideShow()"><a><img src="assets/images/client/menuIcon.png" alt="">MENU</a></li>
					<div class="submenu transition">

					<div class="subnavlink">
						<a><img src="assets/images/client/changepassIcon.png" alt=""> CLIENT</a>
						<router-link to="/agents/client/client_list"><p>Client List</p></router-link>
						<!-- <router-link to="/agents/client/client_payment"><p>Client Payment</p></router-link>
						<router-link to="/agents/client/client_transaction"><p>Client Transaction</p></router-link> -->
					</div>

					<div class="subnavlink">
						<a><img src="assets/images/client/reportsicon.png" alt=""> STATISTICS</a>
						<router-link to="/agents/statistics/traffic_report"><p>Detail Traffic Report</p></router-link>
						<router-link to="/agents/statistics/cdrs_search"><p>CDR Search</p></router-link>
						<router-link to="/agents/statistics/pcap_search"><p>PCAP Search</p></router-link>
						<router-link to="/agents/statistics/commission_history"><p>Commission History</p></router-link>
					</div>

					</div>
				</ul>
				</div>
				<div class="clear"></div>
				<div class="col-md-4 col-sm-5 notifications">
					<div class="avatar">
					<div class="arrowHideshow" @click="arrowHideShow()">
						<img src="assets/images/client/avtarImg.png" alt=""> <span class="username">Rosalind Carroll
						<img class="arrowbottom" src="assets/images/client/bottomarrow.png" alt=""></span>
					</div>

					<div class="HideShow transition">
						<h3><span>Balance due:<br></span>1900.50 USD</h3>
						<a href="#"><img src="assets/images/client/AddNewIPicon.png" alt=""> Pay Now</a>
						<a href="#"><img src="assets/images/client/changepassIcon.png" alt=""> Change Password</a>
						<a href="#"><img src="assets/images/client/getsupportIcon.png" alt=""> Get Support</a>
						<a href="#"><img src="assets/images/client/HElpIcon.png" alt=""> Help</a>

						<router-link to="/logout"><button class="btn btn-danger" type="button" name="logout">Logout</button></router-link>
					</div>
					</div>

				</div>
			</div>	
			</div>		
		</nav>

		<nav class="client-menu navbar navbar-static-top navbar-inverse navbar-fixed-top" v-if="user_type=='client'">
			<!--  <div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="#">
				<img src="assets/images/header_logo.png" class="header_logo">
			</a>
			<user class="visible-xs"></user>
			</div>
			<div id="navbar" class="navbar-collapse collapse">
			<ul class="nav navbar-nav navbar-center">
				<li>
					<router-link to="/clients/management/carrier_dashboard">
						<span class="dnl_icon dnl_dashboard"></span>
						Dashboard
					</router-link>
				</li>
				<li class="dropdown">
					<a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
						<span class="dnl_icon dnl_menu"></span>
						Menu 
						<span class="caret"></span>
					</a>
					<ul class="dropdown-menu">
						<li>
							<router-link to="/clients/management/account_summary">Account Summary </router-link>
						</li>
						<li>
							<router-link to="/clients/management/rate_table">Rate Table </router-link>
						</li>
						<li>
							<router-link to="/clients/management/trunks">Trunks </router-link>
						</li>
						<li>
							<router-link to="/clients/management/products">Products </router-link>
						</li>
					</ul>
				</li>
			</ul>
			<user class="hidden-xs"></user>
			</div>  -->

			<div class="topBar">
			<div class="top">
				<div class="col-md-3 col-sm-1">
				<img src="assets/images/header_logo.png" alt="header_logo">
				</div>
				<div class="col-md-5 col-sm-6">
				<ul class="middlelinks">
					<li><a href="/#/clients/management/carrier_dashboard"><img src="assets/images/client/dashboard.png" alt="">DASHBOARD</a></li>
					<li class="have-sub-menue" @click="subHideShow()"><a><img src="assets/images/client/menuIcon.png" alt="">MENU</a></li>
					<div class="submenu transition">
					<div class="subnavlink">
						<a><img src="assets/images/client/changepassIcon.png" alt=""> MANAGEMENT</a>
						<router-link to="/clients/management/account_summary"><p>Account Summary</p></router-link>
						<router-link to="/clients/management/rate_table"><p>Rate Table</p></router-link>
						<router-link to="/clients/management/trunks"><p>Trunks</p></router-link>
						<router-link to="/clients/management/products"><p>Products</p></router-link>
					</div>

					<div class="subnavlink">
						<a><img src="assets/images/client/billingicon.png" alt=""> BILLING</a>
						<router-link to="/clients/billing/balance"><p>Balance</p></router-link>
						<router-link to="/clients/billing/payment"><p>Paymeny History</p></router-link>
						<router-link to="/clients/billing/online_payment"><p>Online Payment</p></router-link>
						<router-link to="/clients/billing/invoices"><p>Invoices</p></router-link>
					</div>

					<div class="subnavlink">
						<a><img src="assets/images/client/reportsicon.png" alt=""> REPORTS</a>
						<router-link to="/clients/reports/cdrs_search"><p>CDRs List</p></router-link>
						<router-link to="/clients/reports/summary_report"><p>Summary Report</p></router-link>
					</div>

					<div class="subnavlink">
						<a><img src="assets/images/client/sipicon.png" alt=""> SIP PACKET SEARCH</a>
						<router-link to="/clients/sip/sip_packet_search"><p>SIPCPacket Search</p></router-link>
					</div>

					</div>
				</ul>
				</div>
				<div class="clear"></div>
				<div class="col-md-4 col-sm-5 notifications">
					<div class="notify">
					<div class="iconAndCounter">
						<img src="assets/images/client/ring.png" alt="">
						<span>28</span>
					</div>
					<div class="iconAndCounter">
						<img src="assets/images/client/ring.png" alt="">
						<span>0</span>
					</div>
					<div class="iconAndCounter">
						<img src="assets/images/client/message.png" alt="">
						<span>2</span>
					</div>
					</div>

					<div class="avatar">
					<div class="arrowHideshow" @click="arrowHideShow()">
						<img src="assets/images/client/avtarImg.png" alt=""> <span class="username">Rosalind Carroll
						<img class="arrowbottom" src="assets/images/client/bottomarrow.png" alt=""></span>
					</div>

					<div class="HideShow transition">
						<h3><span>Balance due:<br></span>553.62 USD</h3>
						<a href="#"><img src="assets/images/client/changepassIcon.png" alt=""> Change Password</a>
						<a href="#"><img src="assets/images/client/switchIpICON.png" alt=""> Switch IP</a>
						<a href="#"><img src="assets/images/client/AddNewIPicon.png" alt=""> Add New IP</a>
						<a href="#"><img src="assets/images/client/getsupportIcon.png" alt=""> Get Support</a>
						<a href="#"><img src="assets/images/client/HElpIcon.png" alt=""> Help</a>

						<router-link to="/logout"><button class="btn btn-danger" type="button" name="logout">Logout</button></router-link>
					</div>
					</div>

				</div>
			</div>

			<!-- <div class="bottom">
				<div class="col-sm-6">
				<a class="active" href="#">Management</a><i class="fa fa-caret-right rightarrow" aria-hidden="true"></i>
				<a href="#">Accounts</a>
				</div>

				<div class="col-sm-6">
				<div class="pull-right">
					<img src="assets/images/client/topbarBottom.png" alt="">
					<p>09/23/2016 17:34:52 +0000</p>
				</div>
				</div>
			</div> -->

			</div>			

		</nav>


    </div>
<!-- <app-message></app-message> -->
</template>

<script>
	const user = require('vue!./../main_components/user.vue');
	const appMessage = require('vue!./../main_components/show_message.vue');
	const auth = require("../../auth");
	module.exports = {
		data: function() {
			return {
				user_type: '',
			}
		},
		components: {
			'user': user
			// 'app-message': appMessage
		},
		created () {
			this.user_type = auth.getType();
			console.log("created:", this.user_type);
		},
		updated () {
			this.user_type = auth.getType();
			console.log("updated:", this.user_type);
		},
		methods: {
			arrowHideShow() {
				if ($('.HideShow').css('display') == 'none') {
					$('.HideShow').css('display','block');
					$('.HideShow').css('opacity','1');
				}
				else {
					$('.HideShow').css('display','none');
					$('.HideShow').css('opacity','0');
				}
			},
			subHideShow() {
				if ($('.submenu').css('opacity') == 1) {
					$('.submenu').css('opacity','0');
					$('.submenu').css('display','none');
				}
				else {
					$('.submenu').css('opacity','1');
					$('.submenu').css('display','block');
				}
			}
		},
	}
</script>

<style>
	div#navbar .nav>li>a {
		padding: 13px 10px;
		font-size: 12px;
	}
	
	nav.admin-menu.navbar.navbar-static-top.navbar-inverse {
		background: #2b2f35;
		border: 0;
		min-height: 70px;
	}

	nav.client-menu.navbar.navbar-static-top.navbar-inverse {
		background: #243043;
		border: 0;
		min-height: 70px;
	}
	
	#navbar {
		padding-top: 10px;
	}

	.client-menu .nav.navbar-nav.navbar-center li {
		text-transform: uppercase;
	}
	
	.navbar-inverse .navbar-nav>li>a {
		font-size: 13px;
		color: #bdbfc6;
		padding: 10px;
	}
	
	ul.nav.navbar-nav.navbar-right {
		margin-right: 10px;
	}
	
	.navbar-inverse .navbar-nav>.active>a, .navbar-inverse .navbar-nav>.active>a:focus, .navbar-inverse .navbar-nav>.active>a:hover {
		color: #fff;
		background-color: transparent;
	}
	
	.navbar-nav>li>.dropdown-menu {
		margin-top: 14px;
		background: #22262b;
		box-shadow: inset 0px 7px 2px -4px #1f2227, 0px 2px 7px 0px rgba(0, 0, 0, 0.2);
		border: 0;
	}
	
	.dropdown-menu>li>a {
		color: #bdbfc6;
		font-size: 13px;
    	padding: 8px 15px;
	}
	
	.dropdown-menu>li>a:hover,
	.dropdown-menu>li>a:focus,
	.dropdown-menu>li>a.active{
		color: #03c0fc;
		background: transparent;
	}
	
	.navbar-inverse .navbar-nav>.open>a, 
	.navbar-inverse .navbar-nav>.open>a:focus, 
	.navbar-inverse .navbar-nav>.open>a:hover {
		background: transparent;
	}
	
	ul.dropdown-menu li .router-link-active {
		color: #fff;
	}
	
	/* Large desktop */
	@media (min-width: 1200px) { 
		
	}
	
	@media (max-width: 1400px) { 
		div#navbar .nav>li>a {
			padding: 13px 6px;
		}
	}

	/* Portrait tablet to landscape and desktop */
	@media (min-width: 768px) and (max-width: 979px) {

	}

	/* Landscape phone to portrait tablet */
	@media (max-width: 767px) {
		nav.admin-menu.navbar.navbar-static-top.navbar-inverse {
			min-height: 50px;
		}

		nav.client-menu.navbar.navbar-static-top.navbar-inverse {
			min-height: 50px;
		}
		
		.navbar-brand>img {
			display: block;
			height: 25px;
			margin-top: -2px;
		}
		
		span.table_time.pull-right.main_time {
			float: none !important;
		}
		
		.navbar-inverse .navbar-toggle {
			background: transparent;
			float: none;
			border: none;
			margin-top: 10px;
		}
		
		.navbar-inverse .navbar-toggle:focus, 
		.navbar-inverse .navbar-toggle:hover {
			background-color: #1d1f22;
		}
		
		#navbar {
			padding-top: 0px;
			position: absolute;
			width: 100%;
			background: #2b2f35;
		}
		
		#navbar .nav.navbar-nav {
			margin-top: 0;
		}
		
		div#navbar .nav>li>a {
			font-size: 14px;
			padding: 13px 6px 13px 15px;
		}
		
		div#navbar .nav>li>a span.caret {
			float: right;
			margin: 8px 20px;
			border-top: 5px dashed;
			border-top: 5px solid\9;
			border-right: 5px solid transparent;
			border-left: 5px solid transparent;
		}
		
		.navbar-nav .open .dropdown-menu {
			background: #1d2025;
			padding: 0;
		}
		
		.navbar-inverse .navbar-nav .open .dropdown-menu>li>a {
			color: #9d9d9d;
			padding: 12px 25px;
			border-bottom: 1px solid rgba(53, 57, 63, 0.5);
		}
		
		
	}

	/* Landscape phones and down */
	@media (max-width: 480px) {
		
	}

	/* Portrait phone to landscape phone */
	@media (min-width: 319px) and (max-width: 479px) {
		
	}
	
</style>
