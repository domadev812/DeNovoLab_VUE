<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Configuration</a></li>
				  <li class="breadcrumb-item">
					  <router-link to="/configuration/roles">Roles</router-link>
				  </li>
				  <li class="breadcrumb-item active">Role Editor</li>
			</ol>
			<h1 class="page-header">Role Editor</h1>
			<router-link to="/configuration/roles" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>

			<form class="form">
				<div class="white_pad">
					<tabs class="vertical">
						<tab label="Basic" class="" icon="dnl_icon dnl_arrow-point-to-right" selected>
							<section class="role_section basic_section">
								<h2 class="role_section_name">Basic</h2>
								<div class="col-sm-6">
									<div class="form-group">
										<label for="role_name">Role Name:</label>
										<input type="text" name="role_name" v-model="role_name" class="form-control" :class="{'input': true, 'is-danger': errors.has('role_name') }"  v-validate:alias.initial="'required'" placeholder="Enter Role Name">
										<span v-show="errors.has('role_name')" class="help is-danger">{{ errors.first('role_name') }}</span>
									</div>
								</div>
								<div class="col-sm-6">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="view_all_carriers" name="view_all_carriers" type="checkbox" v-model="view_all_carriers">
											<label for="view_all_carriers">View All Carriers</label>
										</div>
									</div>
								</div>
								<div class="clearfix"></div>
							</section>
						</tab>
						<tab label="Finance Permissions" class="" icon="dnl_icon dnl_arrow-point-to-right">
							<section class="role_section">
								<h2 class="role_section_name">Finance Permissions</h2>
								<div class="col-sm-12">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="all_finance" name="all_finance" type="checkbox" v-model="all_finance" @click="clickCkbAll">
											<label for="all_finance">All</label>
										</div>
									</div>
								</div>
								<div class="clearfix"></div>
								<div class="col-sm-6">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="allow_delete_invoice" name="allow_delete_invoice" type="checkbox" v-model="allow_delete_invoice">
											<label for="allow_delete_invoice">Allow to delete invoice</label>
										</div>
										<div class="checkbox checkbox-success">
											<input id="allow_delete_payment" name="allow_delete_payment" type="checkbox" v-model="allow_delete_payment">
											<label for="allow_delete_payment">Allow to delete payment</label>
										</div>
										<div class="checkbox checkbox-success">
											<input id="allow_delete_credit" name="allow_delete_credit" type="checkbox" v-model="allow_delete_credit">
											<label for="allow_delete_credit">Allow to delete credit note</label>
										</div>
										<div class="checkbox checkbox-success">
											<input id="allow_delete_debit" name="allow_delete_debit" type="checkbox" v-model="allow_delete_debit">
											<label for="allow_delete_debit">Allow to delete debit note</label>
										</div>
									</div>
								</div>
								<div class="col-sm-6">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="allow_reset_balance" name="allow_reset_balance" type="checkbox" v-model="allow_reset_balance">
											<label for="allow_reset_balance">Allow to reset balance</label>
										</div>
										<div class="checkbox checkbox-success">
											<input id="allow_modify_credit_limit" name="allow_modify_credit_limit" type="checkbox" v-model="allow_modify_credit_limit">
											<label for="allow_modify_credit_limit">Allow to modify credit limit</label>
										</div>
										<div class="checkbox checkbox-success">
											<input id="allow_modify_profitability" name="allow_modify_profitability" type="checkbox" v-model="allow_modify_profitability">
											<label for="allow_modify_profitability">Allow to modify Min.Profitability</label>
										</div>
										<div class="checkbox checkbox-success">
											<input id="allow_view_cost_rate" name="allow_view_cost_rate" type="checkbox" v-model="allow_view_cost_rate">
											<label for="allow_view_cost_rate">Allow to view cost and rate in reports</label>
										</div>
									</div>
								</div>
								<div class="clearfix"></div>
							</section>
						</tab>
						<tab label="Configuration" class="" icon="dnl_icon dnl_arrow-point-to-right">
							<section class="role_section">
								<h2 class="role_section_name">Configuration</h2>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="all_config" name="all_config" type="checkbox" v-model="all_config">
											<label for="all_config">All read</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="all_config_write" name="all_config_write" type="checkbox" v-model="all_config_write">
											<label for="all_config_write">All write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="users" name="users" type="checkbox" v-model="users">
											<label for="users">Users</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="users_write" name="users_write" type="checkbox" v-model="users_write">
											<label for="users_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="role" name="role" type="checkbox" v-model="role">
											<label for="role">Role</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="role_write" name="role_write" type="checkbox" v-model="role_write">
											<label for="role_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="system_setting" name="system_setting" type="checkbox" v-model="system_setting">
											<label for="system_setting">System Setting</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="system_setting_write" name="system_setting_write" type="checkbox" v-model="system_setting_write">
											<label for="system_setting_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="invoice_setting" name="invoice_setting" type="checkbox" v-model="invoice_setting">
											<label for="invoice_setting">Invoice Setting</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="invoice_setting_write" name="invoice_setting_write" type="checkbox" v-model="invoice_setting_write">
											<label for="invoice_setting_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="payment_setting" name="payment_setting" type="checkbox" v-model="payment_setting">
											<label for="payment_setting">Payment Setting</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="payment_setting_write" name="payment_setting_write" type="checkbox" v-model="payment_setting_write">
											<label for="payment_setting_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="global_route_error" name="global_route_error" type="checkbox" v-model="global_route_error">
											<label for="global_route_error">Global Route Error</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="global_route_error_write" name="global_route_error_write" type="checkbox" v-model="global_route_error_write">
											<label for="global_route_error_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="mail_sender" name="mail_sender" type="checkbox" v-model="mail_sender">
											<label for="mail_sender">Mail Sender</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="mail_sender_write" name="mail_sender_write" type="checkbox" v-model="mail_sender_write">
											<label for="mail_sender_write">Write</label>
										</div>
									</div>
								</div>
								<!-- <div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="verify_configuration" name="verify_configuration" type="checkbox" v-model="verify_configuration">
											<label for="verify_configuration">Verify Configuration</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="verify_configuration_write" name="verify_configuration_write" type="checkbox" v-model="verify_configuration_write">
											<label for="verify_configuration_write">Write</label>
										</div>
									</div>
								</div> -->
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="system_modules" name="system_modules" type="checkbox" v-model="system_modules">
											<label for="system_modules">System Modules</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="system_modules_write" name="system_modules_write" type="checkbox" v-model="system_modules_write">
											<label for="system_modules_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="mail_template" name="mail_template" type="checkbox" v-model="mail_template">
											<label for="mail_template">Mail Template</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="mail_template_write" name="mail_template_write" type="checkbox" v-model="mail_template_write">
											<label for="mail_template_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="login_page_content" name="login_page_content" type="checkbox" v-model="login_page_content">
											<label for="login_page_content">Login Page Content</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="login_page_content_write" name="login_page_content_write" type="checkbox" v-model="login_page_content_write">
											<label for="login_page_content_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="cdr_generation_format" name="cdr_generation_format" type="checkbox" v-model="cdr_generation_format">
											<label for="cdr_generation_format">CDR Generation Format</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="cdr_generation_format_write" name="cdr_generation_format_write" type="checkbox" v-model="cdr_generation_format_write">
											<label for="cdr_generation_format_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="carrier_group" name="carrier_group" type="checkbox" v-model="carrier_group">
											<label for="carrier_group">Carrier Group</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="carrier_group_write" name="carrier_group_write" type="checkbox" v-model="carrier_group_write">
											<label for="carrier_group_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="trunk_group" name="trunk_group" type="checkbox" v-model="trunk_group">
											<label for="trunk_group">Trunk Group</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="trunk_group_write" name="trunk_group_write" type="checkbox" v-model="trunk_group_write">
											<label for="trunk_group_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="syspris" name="syspris" type="checkbox" v-model="syspris">
											<label for="syspris">Syspris</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="syspris_write" name="syspris_write" type="checkbox" v-model="syspris_write">
											<label for="syspris_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="ftp_job" name="ftp_job" type="checkbox" v-model="ftp_job">
											<label for="ftp_job">FTP Job</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="ftp_job_write" name="ftp_job_write" type="checkbox" v-model="ftp_job_write">
											<label for="ftp_job_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="fail_over_rule" name="fail_over_rule" type="checkbox" v-model="fail_over_rule">
											<label for="fail_over_rule">Fail-over Rule</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="fail_over_rule_write" name="fail_over_rule_write" type="checkbox" v-model="fail_over_rule_write">
											<label for="fail_over_rule_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="carrier_portal_cdr_field" name="carrier_portal_cdr_field" type="checkbox" v-model="carrier_portal_cdr_field">
											<label for="carrier_portal_cdr_field">Carrier Portal CDR Fields</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="carrier_portal_cdr_field_write" name="carrier_portal_cdr_field_write" type="checkbox" v-model="carrier_portal_cdr_field_write">
											<label for="carrier_portal_cdr_field_write">Write</label>
										</div>
									</div>
								</div>
								<div class="clearfix"></div>
							</section>
						</tab>
						<tab label="Finance" class="" icon="dnl_icon dnl_arrow-point-to-right">
							<section class="role_section">
								<h2 class="role_section_name">Finance</h2>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="all_finance" name="all_finance" type="checkbox" v-model="all_finance">
											<label for="all_finance">All read</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="all_finance_write" name="all_finance_write" type="checkbox" v-model="all_finance_write">
											<label for="all_finance_write">All write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="mutual_transaction" name="mutual_transaction" type="checkbox" v-model="mutual_transaction">
											<label for="mutual_transaction">Mutual Transaction</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="mutual_transaction_write" name="mutual_transaction_write" type="checkbox" v-model="mutual_transaction_write">
											<label for="mutual_transaction_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="past_due_notification_log" name="past_due_notification_log" type="checkbox" v-model="past_due_notification_log">
											<label for="past_due_notification_log">Past Due Notification Log</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="past_due_notification_log_write" name="past_due_notification_log_write" type="checkbox" v-model="past_due_notification_log_write">
											<label for="past_due_notification_log_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="regenerate_balance" name="regenerate_balance" type="checkbox" v-model="regenerate_balance">
											<label for="regenerate_balance">Regenerate Balance</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="regenerate_balance_write" name="regenerate_balance_write" type="checkbox" v-model="regenerate_balance_write">
											<label for="regenerate_balance_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="past_due_summary" name="past_due_summary" type="checkbox" v-model="past_due_summary">
											<label for="past_due_summary">Past Due Summary</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="past_due_summary_write" name="past_due_summary_write" type="checkbox" v-model="past_due_summary_write">
											<label for="past_due_summary_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="carrier_invoice_history" name="carrier_invoice_history" type="checkbox" v-model="carrier_invoice_history">
											<label for="carrier_invoice_history">Carrier Invoice History</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="carrier_invoice_history_write" name="carrier_invoice_history_write" type="checkbox" v-model="carrier_invoice_history_write">
											<label for="carrier_invoice_history_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="auto_invoice_management" name="auto_invoice_management" type="checkbox" v-model="auto_invoice_management">
											<label for="auto_invoice_management">Auto Invoice Management</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="auto_invoice_management_write" name="auto_invoice_management_write" type="checkbox" v-model="auto_invoice_management_write">
											<label for="auto_invoice_management_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="actual_transaction" name="actual_transaction" type="checkbox" v-model="actual_transaction">
											<label for="actual_transaction">Actual Transaction</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="actual_transaction_write" name="actual_transaction_write" type="checkbox" v-model="actual_transaction_write">
											<label for="actual_transaction_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="invoice" name="invoice" type="checkbox" v-model="invoice">
											<label for="invoice">Invoice</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="invoice_write" name="invoice_write" type="checkbox" v-model="invoice_write">
											<label for="invoice_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="recalculate_balance" name="recalculate_balance" type="checkbox" v-model="recalculate_balance">
											<label for="recalculate_balance">Recalculate Balance</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="recalculate_balance_write" name="recalculate_balance_write" type="checkbox" v-model="recalculate_balance_write">
											<label for="recalculate_balance_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="invoice_notification_log" name="invoice_notification_log" type="checkbox" v-model="invoice_notification_log">
											<label for="invoice_notification_log">Invoice Notification Log</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="invoice_notification_log_write" name="invoice_notification_log_write" type="checkbox" v-model="invoice_notification_log_write">
											<label for="invoice_notification_log_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="payment" name="payment" type="checkbox" v-model="payment">
											<label for="payment">Payment</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="payment_write" name="payment_write" type="checkbox" v-model="payment_write">
											<label for="payment_write">Write</label>
										</div>
									</div>
								</div>
								<div class="clearfix"></div>
							</section>
						</tab>
						<tab label="Log" class="" icon="dnl_icon dnl_arrow-point-to-right">
							<section class="role_section">
								<h2 class="role_section_name">Log</h2>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="all_log" name="all_log" type="checkbox" v-model="all_log">
											<label for="all_log">All read</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="all_log_write" name="all_log_write" type="checkbox" v-model="all_log_write">
											<label for="all_log_write">All write</label>
										</div>
									</div>
								</div>
								<!--<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="sql_log" name="sql_log" type="checkbox" v-model="sql_log">
											<label for="sql_log">SQL Log</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="sql_log_write" name="sql_log_write" type="checkbox" v-model="sql_log_write">
											<label for="sql_log_write">Write</label>
										</div>
									</div>
								</div>-->
								<!--<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="ip_modify_log" name="ip_modify_log" type="checkbox" v-model="ip_modify_log">
											<label for="ip_modify_log">IP Modify Log</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="ip_modify_log_write" name="ip_modify_log_write" type="checkbox" v-model="ip_modify_log_write">
											<label for="ip_modify_log_write">Write</label>
										</div>
									</div>
								</div>-->
								<!--<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="license_modification_log" name="license_modification_log" type="checkbox" v-model="license_modification_log">
											<label for="license_modification_log">License Modification Log</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="license_modification_log_write" name="license_modification_log_write" type="checkbox" v-model="license_modification_log_write">
											<label for="license_modification_log_write">Write</label>
										</div>
									</div>
								</div>-->
								<!--<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="schedule_log" name="schedule_log" type="checkbox" v-model="schedule_log">
											<label for="schedule_log">Scheduler Log</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="schedule_log_write" name="schedule_log_write" type="checkbox" v-model="schedule_log_write">
											<label for="schedule_log_write">Write</label>
										</div>
									</div>
								</div>-->
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="ftp_log" name="ftp_log" type="checkbox" v-model="ftp_log">
											<label for="ftp_log">FTP Log</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="ftp_log_write" name="ftp_log_write" type="checkbox" v-model="ftp_log_write">
											<label for="ftp_log_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="sip_register" name="sip_register" type="checkbox" v-model="sip_register">
											<label for="sip_register">SIP Register</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="sip_register_write" name="sip_register_write" type="checkbox" v-model="sip_register_write">
											<label for="sip_register_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="rate_mass_edit_log" name="rate_mass_edit_log" type="checkbox" v-model="rate_mass_edit_log">
											<label for="rate_mass_edit_log">Rate Mass Edit Log</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="rate_mass_edit_log_write" name="rate_mass_edit_log_write" type="checkbox" v-model="rate_mass_edit_log_write">
											<label for="rate_mass_edit_log_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="import_log" name="import_log" type="checkbox" v-model="import_log">
											<label for="import_log">Import Log</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="import_log_write" name="import_log_write" type="checkbox" v-model="import_log_write">
											<label for="import_log_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="rate_import_log" name="rate_import_log" type="checkbox" v-model="rate_import_log">
											<label for="rate_import_log">Rate Import log</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="rate_import_log_write" name="rate_import_log_write" type="checkbox" v-model="rate_import_log_write">
											<label for="rate_import_log_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="modification_log" name="modification_log" type="checkbox" v-model="modification_log">
											<label for="modification_log">Modification Log</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="modification_log_write" name="modification_log_write" type="checkbox" v-model="modification_log_write">
											<label for="modification_log_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="retrieve_password_log" name="retrieve_password_log" type="checkbox" v-model="retrieve_password_log">
											<label for="retrieve_password_log">Retrieve Password Log</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="retrieve_password_log_write" name="retrieve_password_log_write" type="checkbox" v-model="retrieve_password_log_write">
											<label for="retrieve_password_log_write">Write</label>
										</div>
									</div>
								</div>
								<!--<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="invoice_cdr_log" name="invoice_cdr_log" type="checkbox" v-model="invoice_cdr_log">
											<label for="invoice_cdr_log">Invoice CDR Log</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="invoice_cdr_log_write" name="invoice_cdr_log_write" type="checkbox" v-model="invoice_cdr_log_write">
											<label for="invoice_cdr_log_write">Write</label>
										</div>
									</div>
								</div>-->
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="email_log" name="email_log" type="checkbox" v-model="email_log">
											<label for="email_log">Email Log</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="email_log_write" name="email_log_write" type="checkbox" v-model="email_log_write">
											<label for="email_log_write">Write</label>
										</div>
									</div>
								</div>
								<!--<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="schedule_report_log" name="schedule_report_log" type="checkbox" v-model="schedule_report_log">
											<label for="schedule_report_log">Scheduled Report Log</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="schedule_report_log_write" name="schedule_report_log_write" type="checkbox" v-model="schedule_report_log_write">
											<label for="schedule_report_log_write">Write</label>
										</div>
									</div>
								</div>-->
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="auto_payment_log" name="auto_payment_log" type="checkbox" v-model="auto_payment_log">
											<label for="auto_payment_log">Auto Payment Log</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="auto_payment_log_write" name="auto_payment_log_write" type="checkbox" v-model="auto_payment_log_write">
											<label for="auto_payment_log_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="invoice_log" name="invoice_log" type="checkbox" v-model="invoice_log">
											<label for="invoice_log">Invoice Log</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="invoice_log_write" name="invoice_log_write" type="checkbox" v-model="invoice_log_write">
											<label for="invoice_log_write">Write</label>
										</div>
									</div>
								</div>
								<!--<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="ftp_server_log" name="ftp_server_log" type="checkbox" v-model="ftp_server_log">
											<label for="ftp_server_log">FTP Server Log</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="ftp_server_log_write" name="ftp_server_log_write" type="checkbox" v-model="ftp_server_log_write">
											<label for="ftp_server_log_write">Write</label>
										</div>
									</div>
								</div>-->
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="user_sign_in_history" name="user_sign_in_history" type="checkbox" v-model="user_sign_in_history">
											<label for="user_sign_in_history">User Sign in History</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="user_sign_in_history_write" name="user_sign_in_history_write" type="checkbox" v-model="user_sign_in_history_write">
											<label for="user_sign_in_history_write">Write</label>
										</div>
									</div>
								</div>
								<!--<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="origination_log" name="origination_log" type="checkbox" v-model="origination_log">
											<label for="origination_log">Origination Log</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="origination_log_write" name="origination_log_write" type="checkbox" v-model="origination_log_write">
											<label for="origination_log_write">Write</label>
										</div>
									</div>
								</div>-->
								<!--<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="balance_log" name="balance_log" type="checkbox" v-model="balance_log">
											<label for="balance_log">Balance Log</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="balance_log_write" name="balance_log_write" type="checkbox" v-model="balance_log_write">
											<label for="balance_log_write">Write</label>
										</div>
									</div>
								</div>-->
								<!--<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="credit_log" name="credit_log" type="checkbox" v-model="credit_log">
											<label for="credit_log">Credit Log</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="credit_log_write" name="credit_log_write" type="checkbox" v-model="credit_log_write">
											<label for="credit_log_write">Write</label>
										</div>
									</div>
								</div>-->
								<!-- <div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="authorization_log" name="authorization_log" type="checkbox" v-model="authorization_log">
											<label for="authorization_log">Authorization Log</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="authorization_log_write" name="authorization_log_write" type="checkbox" v-model="authorization_log_write">
											<label for="authorization_log_write">Write</label>
										</div>
									</div>
								</div> -->
								<div class="clearfix"></div>
							</section>
						</tab>
						<tab label="Management" class="" icon="dnl_icon dnl_arrow-point-to-right">
							<section class="role_section">
								<h2 class="role_section_name">Management</h2>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="all_management" name="all_management" type="checkbox" v-model="all_management">
											<label for="all_management">All read</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="all_management_write" name="all_management_write" type="checkbox" v-model="all_management_write">
											<label for="all_management_write">All write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="unclaimed_trunks" name="unclaimed_trunks" type="checkbox" v-model="unclaimed_trunks">
											<label for="unclaimed_trunks">Unclaimed Trunks</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="unclaimed_trunks_write" name="unclaimed_trunks_write" type="checkbox" v-model="unclaimed_trunks_write">
											<label for="unclaimed_trunks_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="carrier" name="carrier" type="checkbox" v-model="carrier">
											<label for="carrier">Carrier</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="carrier_write" name="carrier_write" type="checkbox" v-model="carrier_write">
											<label for="carrier_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="credit_management" name="credit_management" type="checkbox" v-model="credit_management">
											<label for="credit_management">Credit Management</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="credit_management_write" name="all_management_write" type="checkbox" v-model="credit_management_write">
											<label for="credit_management_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="registration" name="registration" type="checkbox" v-model="registration">
											<label for="registration">Registration</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="registration_write" name="registration_write" type="checkbox" v-model="registration_write">
											<label for="registration_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="wizard" name="wizard" type="checkbox" v-model="wizard">
											<label for="wizard">Wizard</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="wizard_write" name="wizard_write" type="checkbox" v-model="wizard_write">
											<label for="wizard_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="product" name="product" type="checkbox" v-model="product">
											<label for="product">Product</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="product_write" name="product_write" type="checkbox" v-model="product_write">
											<label for="product_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="client_rate_summary" name="client_rate_summary" type="checkbox" v-model="client_rate_summary">
											<label for="client_rate_summary">Client Rate Summary</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="client_rate_summary_write" name="client_rate_summary_write" type="checkbox" v-model="client_rate_summary_write">
											<label for="client_rate_summary_write">Write</label>
										</div>
									</div>
								</div>
								<div class="clearfix"></div>
							</section>
						</tab>
						<tab label="Monitoring" class="" icon="dnl_icon dnl_arrow-point-to-right">
							<section class="role_section">
								<h2 class="role_section_name">Monitoring</h2>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="all_monitoring" name="all_monitoring" type="checkbox" v-model="all_monitoring">
											<label for="all_monitoring">All read</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="all_monitoring_write" name="all_monitoring_write" type="checkbox" v-model="all_monitoring_write">
											<label for="all_monitoring_write">All write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="condition" name="condition" type="checkbox" v-model="condition">
											<label for="condition">Condition</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="condition_write" name="condition_write" type="checkbox" v-model="condition_write">
											<label for="condition_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="rule" name="rule" type="checkbox" v-model="rule">
											<label for="rule">Rule</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="rule_write" name="rule_write" type="checkbox" v-model="rule_write">
											<label for="rule_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="action" name="action" type="checkbox" v-model="action">
											<label for="action">Action</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="action_write" name="action_write" type="checkbox" v-model="action_write">
											<label for="action_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="block" name="block" type="checkbox" v-model="block">
											<label for="block">Block</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="block_write" name="block_write" type="checkbox" v-model="block_write">
											<label for="block_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="loop_detection" name="loop_detection" type="checkbox" v-model="loop_detection">
											<label for="loop_detection">Loop Detection</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="loop_detection_write" name="loop_detection_write" type="checkbox" v-model="loop_detection_write">
											<label for="loop_detection_write">Write</label>
										</div>
									</div>
								</div>
								<!--<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="traffic_alert_rule" name="traffic_alert_rule" type="checkbox" v-model="traffic_alert_rule">
											<label for="traffic_alert_rule">Traffic Alert Rule</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="traffic_alert_rule_write" name="traffic_alert_rule_write" type="checkbox" v-model="traffic_alert_rule_write">
											<label for="traffic_alert_rule_write">Write</label>
										</div>
									</div>
								</div>-->
								<!--<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="dialer_detection" name="dialer_detection" type="checkbox" v-model="dialer_detection">
											<label for="dialer_detection">Dialer Detection</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="dialer_detection_write" name="dialer_detection_write" type="checkbox" v-model="dialer_detection_write">
											<label for="dialer_detection_write">Write</label>
										</div>
									</div>
								</div>-->
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="fraud_detection" name="fraud_detection" type="checkbox" v-model="fraud_detection">
											<label for="fraud_detection">Fraud Detection</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="fraud_detection_write" name="fraud_detection_write" type="checkbox" v-model="fraud_detection_write">
											<label for="fraud_detection_write">Write</label>
										</div>
									</div>
								</div>
								<!--<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="blackhole_ip" name="blackhole_ip" type="checkbox" v-model="blackhole_ip">
											<label for="blackhole_ip">Blackhole IP</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="blackhole_ip_write" name="blackhole_ip_write" type="checkbox" v-model="blackhole_ip_write">
											<label for="blackhole_ip_write">Write</label>
										</div>
									</div>
								</div>-->
								<div class="clearfix"></div>
							</section>
						</tab>
						<tab label="Origination" class="" icon="dnl_icon dnl_arrow-point-to-right">
							<section class="role_section">
								<h2 class="role_section_name">Origination</h2>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="all_origination" name="all_origination" type="checkbox" v-model="all_origination">
											<label for="all_origination">All read</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="all_origination_write" name="all_origination_write" type="checkbox" v-model="all_origination_write">
											<label for="all_origination_write">All write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="clients" name="clients" type="checkbox" v-model="clients">
											<label for="clients">Clients</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="clients_write" name="clients_write" type="checkbox" v-model="clients_write">
											<label for="clients_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="vendors" name="vendors" type="checkbox" v-model="vendors">
											<label for="vendors">Vendors</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="vendors_write" name="vendors_write" type="checkbox" v-model="vendors_write">
											<label for="vendors_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="billing_rule" name="billing_rule" type="checkbox" v-model="billing_rule">
											<label for="billing_rule">Billing Rule</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="billing_rule_write" name="billing_rule_write" type="checkbox" v-model="billing_rule_write">
											<label for="billing_rule_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="did_repository" name="did_repository" type="checkbox" v-model="did_repository">
											<label for="did_repository">DID Repository</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="did_repository_write" name="did_repository_write" type="checkbox" v-model="did_repository_write">
											<label for="did_repository_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="orig_wizard" name="orig_wizard" type="checkbox" v-model="orig_wizard">
											<label for="orig_wizard">Wizard</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="orig_wizard_write" name="orig_wizard_write" type="checkbox" v-model="orig_wizard_write">
											<label for="orig_wizard_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="origination_static_routing" name="origination_static_routing" type="checkbox" v-model="origination_static_routing">
											<label for="origination_static_routing">Origination Static Routing</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="origination_static_routing_write" name="origination_static_routing_write" type="checkbox" v-model="origination_static_routing_write">
											<label for="origination_static_routing_write">Write</label>
										</div>
									</div>
								</div>
								<div class="clearfix"></div>
							</section>
						</tab>
						<tab label="Routing" class="" icon="dnl_icon dnl_arrow-point-to-right">
							<section class="role_section">
								<h2 class="role_section_name">Routing</h2>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="all_routing" name="all_routing" type="checkbox" v-model="all_routing">
											<label for="all_routing">All read</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="all_routing_write" name="all_routing_write" type="checkbox" v-model="all_routing_write">
											<label for="all_routing_write">All write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="routing_wizard" name="routing_wizard" type="checkbox" v-model="routing_wizard">
											<label for="routing_wizard">Wizard</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="routing_wizard_write" name="routing_wizard_write" type="checkbox" v-model="routing_wizard_write">
											<label for="routing_wizard_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="trunk_registration" name="trunk_registration" type="checkbox" v-model="trunk_registration">
											<label for="trunk_registration">Trunks Registration</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="trunk_registration_write" name="trunk_registration_write" type="checkbox" v-model="trunk_registration_write">
											<label for="trunk_registration_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="digital_translation" name="digital_translation" type="checkbox" v-model="digital_translation">
											<label for="digital_translation">Digital Translation</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="digital_translation_write" name="digital_translation_write" type="checkbox" v-model="digital_translation_write">
											<label for="digital_translation_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="static_routing" name="static_routing" type="checkbox" v-model="static_routing">
											<label for="static_routing">Static Routing</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="static_routing_write" name="static_routing_write" type="checkbox" v-model="static_routing_write">
											<label for="static_routing_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="disconnect_code" name="disconnect_code" type="checkbox" v-model="disconnect_code">
											<label for="disconnect_code">Disconnect Code</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="disconnect_code_write" name="disconnect_code_write" type="checkbox" v-model="disconnect_code_write">
											<label for="disconnect_code_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="routing_plan" name="routing_plan" type="checkbox" v-model="routing_plan">
											<label for="routing_plan">Routing Plan</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="routing_plan_write" name="routing_plan_write" type="checkbox" v-model="routing_plan_write">
											<label for="routing_plan_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="dynamic_routing" name="dynamic_routing" type="checkbox" v-model="dynamic_routing">
											<label for="dynamic_routing">Dynamic Routing</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="dynamic_routing_write" name="dynamic_routing_write" type="checkbox" v-model="dynamic_routing_write">
											<label for="dynamic_routing_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="trunks" name="trunks" type="checkbox" v-model="trunks">
											<label for="trunks">Trunks</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="trunks_write" name="trunks_write" type="checkbox" v-model="trunks_write">
											<label for="trunks_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="block_lists" name="block_lists" type="checkbox" v-model="block_lists">
											<label for="block_lists">Block List</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="block_lists_write" name="block_lists_write" type="checkbox" v-model="block_lists_write">
											<label for="block_lists_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="add_trunk_prefix" name="add_trunk_prefix" type="checkbox" v-model="add_trunk_prefix">
											<label for="add_trunk_prefix">Add Trunk Prefix</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="add_trunk_prefix_write" name="add_trunk_prefix_write" type="checkbox" v-model="add_trunk_prefix_write">
											<label for="add_trunk_prefix_write">Write</label>
										</div>
									</div>
								</div>
								<div class="clearfix"></div>
							</section>
						</tab>
						<tab label="Statistics" class="" icon="dnl_icon dnl_arrow-point-to-right">
							<section class="role_section">
								<h2 class="role_section_name">Statistics</h2>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="all_statistics" name="all_statistics" type="checkbox" v-model="all_statistics">
											<label for="all_statistics">All read</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="all_statistics_write" name="all_statistics_write" type="checkbox" v-model="all_statistics_write">
											<label for="all_statistics_write">All write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="host_based_report" name="host_based_report" type="checkbox" v-model="host_based_report">
											<label for="host_based_report">Host Based Report</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="host_based_report_write" name="host_based_report_write" type="checkbox" v-model="host_based_report_write">
											<label for="host_based_report_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="cdrs_list" name="cdrs_list" type="checkbox" v-model="cdrs_list">
											<label for="cdrs_list">CDRs List</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="cdrs_list_write" name="cdrs_list_write" type="checkbox" v-model="cdrs_list_write">
											<label for="cdrs_list_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="spam_report" name="spam_report" type="checkbox" v-model="spam_report">
											<label for="spam_report">Spam Report</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="spam_report_write" name="spam_report_write" type="checkbox" v-model="spam_report_write">
											<label for="spam_report_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="daily_usage_detail_report" name="daily_usage_detail_report" type="checkbox" v-model="daily_usage_detail_report">
											<label for="daily_usage_detail_report">Daily Usage Detail Report</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="daily_usage_detail_report_write" name="daily_usage_detail_report_write" type="checkbox" v-model="daily_usage_detail_report_write">
											<label for="daily_usage_detail_report_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="disconnect_causes" name="disconnect_causes" type="checkbox" v-model="disconnect_causes">
											<label for="disconnect_causes">Disconnect Causes</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="disconnect_causes_write" name="disconnect_causes_write" type="checkbox" v-model="disconnect_causes_write">
											<label for="disconnect_causes_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="location_report" name="location_report" type="checkbox" v-model="location_report">
											<label for="location_report">Location Report</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="location_report_write" name="location_report_write" type="checkbox" v-model="location_report_write">
											<label for="location_report_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="usage_report" name="usage_report" type="checkbox" v-model="usage_report">
											<label for="usage_report">Usage Report</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="usage_report_write" name="usage_report_write" type="checkbox" v-model="usage_report_write">
											<label for="usage_report_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="summary_report" name="summary_report" type="checkbox" v-model="summary_report">
											<label for="summary_report">Summary Report</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="summary_report_write" name="all_statistisummary_report_writecs_write" type="checkbox" v-model="summary_report_write">
											<label for="summary_report_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="inbound_outbound_report" name="inbound_outbound_report" type="checkbox" v-model="inbound_outbound_report">
											<label for="inbound_outbound_report">Inbound/Outbound Report</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="inbound_outbound_report_write" name="inbound_outbound_report_write" type="checkbox" v-model="inbound_outbound_report_write">
											<label for="inbound_outbound_report_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="profitability_analysis" name="profitability_analysis" type="checkbox" v-model="profitability_analysis">
											<label for="profitability_analysis">Profitability Analysis</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="profitability_analysis_write" name="profitability_analysis_write" type="checkbox" v-model="profitability_analysis_write">
											<label for="profitability_analysis_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="qos_summary" name="qos_summary" type="checkbox" v-model="qos_summary">
											<label for="qos_summary">QoS Summary</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="qos_summary_write" name="qos_summary_write" type="checkbox" v-model="qos_summary_write">
											<label for="qos_summary_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="monitors" name="monitors" type="checkbox" v-model="monitors">
											<label for="monitors">Monitors</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="monitors_write" name="monitors_write" type="checkbox" v-model="monitors_write">
											<label for="monitors_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="lnp_dip_record" name="lnp_dip_record" type="checkbox" v-model="lnp_dip_record">
											<label for="lnp_dip_record">LNP Dip Record</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="lnp_dip_record_write" name="lnp_dip_record_write" type="checkbox" v-model="lnp_dip_record_write">
											<label for="lnp_dip_record_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="daily_channel_usage_report" name="daily_channel_usage_report" type="checkbox" v-model="daily_channel_usage_report">
											<label for="daily_channel_usage_report">Daily Channel Usage Report</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="daily_channel_usage_report_write" name="daily_channel_usage_report_write" type="checkbox" v-model="daily_channel_usage_report_write">
											<label for="daily_channel_usage_report_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="active_registration" name="active_registration" type="checkbox" v-model="active_registration">
											<label for="active_registration">Active Registration</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="active_registration_write" name="active_registration_write" type="checkbox" v-model="active_registration_write">
											<label for="active_registration_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="stocks" name="stocks" type="checkbox" v-model="stocks">
											<label for="stocks">Stocks</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="stocks_write" name="stocks_write" type="checkbox" v-model="stocks_write">
											<label for="stocks_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="active_call_report" name="active_call_report" type="checkbox" v-model="active_call_report">
											<label for="active_call_report">Active Call Report</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="active_call_report_write" name="active_call_report_write" type="checkbox" v-model="active_call_report_write">
											<label for="active_call_report_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="dashboard" name="dashboard" type="checkbox" v-model="dashboard">
											<label for="dashboard">Dashboard</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="dashboard_write" name="dashboard_write" type="checkbox" v-model="dashboard_write">
											<label for="dashboard_write">Write</label>
										</div>
									</div>
								</div>
								<div class="clearfix"></div>
							</section>
						</tab>
						<tab label="Switch" class="" icon="dnl_icon dnl_arrow-point-to-right">
							<section class="role_section">
								<h2 class="role_section_name">Switch</h2>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="all_switch" name="all_switch" type="checkbox" v-model="all_switch">
											<label for="all_switch">All read</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="all_switch_write" name="all_switch_write" type="checkbox" v-model="all_switch_write">
											<label for="all_switch_write">All write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="voip_gateway" name="voip_gateway" type="checkbox" v-model="voip_gateway">
											<label for="voip_gateway">VoIP Gateway</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="voip_gateway_write" name="voip_gateway_write" type="checkbox" v-model="voip_gateway_write">
											<label for="voip_gateway_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="clientrates" name="clientrates" type="checkbox" v-model="clientrates">
											<label for="clientrates">Clientrates</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="clientrates_write" name="clientrates_write" type="checkbox" v-model="clientrates_write">
											<label for="clientrates_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="download" name="download" type="checkbox" v-model="download">
											<label for="download">Downloads</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="download_write" name="download_write" type="checkbox" v-model="download_write">
											<label for="download_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="uploads" name="uploads" type="checkbox" v-model="uploads">
											<label for="uploads">Uploads</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="uploads_write" name="uploads_write" type="checkbox" v-model="uploads_write">
											<label for="uploads_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="capacity" name="capacity" type="checkbox" v-model="capacity">
											<label for="capacity">Capacity</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="capacity_write" name="capacity_write" type="checkbox" v-model="capacity_write">
											<label for="capacity_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="rate_table" name="rate_table" type="checkbox" v-model="rate_table">
											<label for="rate_table">Rate Table</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="rate_table_write" name="rate_table_write" type="checkbox" v-model="rate_table_write">
											<label for="rate_table_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="time_profile" name="time_profile" type="checkbox" v-model="time_profile">
											<label for="time_profile">Time Profile</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="time_profile_write" name="time_profile_write" type="checkbox" v-model="time_profile_write">
											<label for="time_profile_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<label for="code_deck">Code Deck</label>
											<input id="code_deck" name="code_deck" type="checkbox" v-model="code_deck">
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="code_deck_write" name="code_deck_write" type="checkbox" v-model="code_deck_write">
											<label for="code_deck_write">Write</label>
										</div>
									</div>
								</div>
								<!-- <div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="currency" name="currency" type="checkbox" v-model="currency">
											<label for="currency">Currency</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="currency_write" name="currency_write" type="checkbox" v-model="currency_write">
											<label for="currency_write">Write</label>
										</div>
									</div>
								</div> -->
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="us_jurisdiction" name="us_jurisdiction" type="checkbox" v-model="us_jurisdiction">
											<label for="us_jurisdiction">US Jurisdiction</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="us_jurisdiction_write" name="us_jurisdiction_write" type="checkbox" v-model="us_jurisdiction_write">
											<label for="us_jurisdiction_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="payment_term" name="payment_term" type="checkbox" v-model="payment_term">
											<label for="payment_term">Payment Term</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="payment_term_write" name="payment_term_write" type="checkbox" v-model="payment_term_write">
											<label for="payment_term_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="random_ani_group" name="random_ani_group" type="checkbox" v-model="random_ani_group">
											<label for="random_ani_group">Random ANI Group</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="random_ani_group_write" name="random_ani_group_write" type="checkbox" v-model="random_ani_group_write">
											<label for="random_ani_group_write">Write</label>
										</div>
									</div>
								</div>
								<div class="clearfix"></div>
							</section>
						</tab>
						<tab label="Template" class="" icon="dnl_icon dnl_arrow-point-to-right">
							<section class="role_section">
								<h2 class="role_section_name">Template</h2>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="all_template" name="all_template" type="checkbox" v-model="all_template">
											<label for="all_template">All read</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="all_template_write" name="all_template_write" type="checkbox" v-model="all_template_write">
											<label for="all_template_write">All write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="egress_trunk_template" name="egress_trunk_template" type="checkbox" v-model="egress_trunk_template">
											<label for="egress_trunk_template">Egress Trunk Template</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="egress_trunk_template_write" name="egress_trunk_template_write" type="checkbox" v-model="egress_trunk_template_write">
											<label for="egress_trunk_template_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="ingress_trunk_template" name="ingress_trunk_template" type="checkbox" v-model="ingress_trunk_template">
											<label for="ingress_trunk_template">Ingress Trunk Template</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="ingress_trunk_template_write" name="ingress_trunk_template_write" type="checkbox" v-model="ingress_trunk_template_write">
											<label for="ingress_trunk_template_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="rate_upload_template" name="rate_upload_template" type="checkbox" v-model="rate_upload_template">
											<label for="rate_upload_template">Rate Upload Template</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="rate_upload_template_write" name="rate_upload_template_write" type="checkbox" v-model="rate_upload_template_write">
											<label for="rate_upload_template_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="carrier_template" name="carrier_template" type="checkbox" v-model="carrier_template">
											<label for="carrier_template">Carrier Template</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="carrier_template_write" name="carrier_template_write" type="checkbox" v-model="carrier_template_write">
											<label for="carrier_template_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="rate_email_template" name="rate_email_template" type="checkbox" v-model="rate_email_template">
											<label for="rate_email_template">Rate Email Template</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="rate_email_template_write" name="rate_email_template_write" type="checkbox" v-model="rate_email_template_write">
											<label for="rate_email_template_write">Write</label>
										</div>
									</div>
								</div>
								<div class="clearfix"></div>
							</section>
						</tab>
						<tab label="Agent" class="" icon="dnl_icon dnl_arrow-point-to-right">
							<section class="role_section">
								<h2 class="role_section_name">Agent</h2>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="all_agent" name="all_agent" type="checkbox" v-model="all_agent">
											<label for="all_agent">All read</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="all_agent_write" name="all_agent_write" type="checkbox" v-model="all_agent_write">
											<label for="all_agent_write">All write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="commission_report" name="commission_report" type="checkbox" v-model="commission_report">
											<label for="commission_report">Commission Report</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="commission_report_write" name="commission_report_write" type="checkbox" v-model="commission_report_write">
											<label for="commission_report_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="agent_management" name="agent_management" type="checkbox" v-model="agent_management">
											<label for="agent_management">Agent Management</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="agent_management_write" name="agent_management_write" type="checkbox" v-model="agent_management_write">
											<label for="agent_management_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="commission_history" name="commission_history" type="checkbox" v-model="commission_history">
											<label for="commission_history">Commission History</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="commission_history_write" name="commission_history_write" type="checkbox" v-model="commission_history_write">
											<label for="commission_history_write">Write</label>
										</div>
									</div>
								</div>
								<div class="clearfix"></div>
							</section>
						</tab>
						<tab label="Tools" class="" icon="dnl_icon dnl_arrow-point-to-right">
							<section class="role_section">
								<h2 class="role_section_name">Tools</h2>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="all_tools" name="all_tools" type="checkbox" v-model="all_tools">
											<label for="all_tools">All read</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="all_tools_write" name="all_tools_write" type="checkbox" v-model="all_tools_write">
											<label for="all_tools_write">All write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="call_simulation" name="call_simulation" type="checkbox" v-model="call_simulation">
											<label for="call_simulation">Call Simulation</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="call_simulation_write" name="call_simulation_write" type="checkbox" v-model="call_simulation_write">
											<label for="call_simulation_write">Write</label>
										</div>
									</div>
								</div>
								<!-- <div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="auto_rate_upload" name="auto_rate_upload" type="checkbox" v-model="auto_rate_upload">
											<label for="auto_rate_upload">Auto Rate Upload</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="auto_rate_upload_write" name="auto_rate_upload_write" type="checkbox" v-model="auto_rate_upload_write">
											<label for="auto_rate_upload_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="cdr_reconciliation" name="cdr_reconciliation" type="checkbox" v-model="cdr_reconciliation">
											<label for="cdr_reconciliation">CDR Reconciliation</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="cdr_reconciliation_write" name="cdr_reconciliation_write" type="checkbox" v-model="cdr_reconciliation_write">
											<label for="cdr_reconciliation_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="lcr_generation" name="lcr_generation" type="checkbox" v-model="lcr_generation">
											<label for="lcr_generation">LCR Generation</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="lcr_generation_write" name="lcr_generation_write" type="checkbox" v-model="lcr_generation_write">
											<label for="lcr_generation_write">Write</label>
										</div>
									</div>
								</div> -->
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="rerate" name="rerate" type="checkbox" v-model="rerate">
											<label for="rerate">Rerate</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="rerate_write" name="rerate_write" type="checkbox" v-model="rerate_write">
											<label for="rerate_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="sip_packet_search" name="sip_packet_search" type="checkbox" v-model="sip_packet_search">
											<label for="sip_packet_search">SIP Packet Search</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="sip_packet_search_write" name="sip_packet_search_write" type="checkbox" v-model="sip_packet_search_write">
											<label for="sip_packet_search_write">Write</label>
										</div>
									</div>
								</div>
								<div class="col-sm-8">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="rate_generation" name="rate_generation" type="checkbox" v-model="rate_generation">
											<label for="rate_generation">Rate Generation</label>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="rate_generation_write" name="rate_generation_write" type="checkbox" v-model="rate_generation_write">
											<label for="rate_generation_write">Write</label>
										</div>
									</div>
								</div>
								<div class="clearfix"></div>
							</section>
						</tab>
					</tabs>
					<div class="clearfix"></div>
					<div class="button_set m-top-20">
						<a class="btn btn-primary mini" @click="validateBeforeSubmit">
							Submit
						</a>
						<a class="btn btn-default mini" @click="reset">
							Reset
						</a>
					</div>
					<div class="clearfix"></div>
				</div>
			</form>
		</div>
	  </div>
	</div>
</template>

<script>
	const vTabs = require('vue!../main_components/tabs.vue'),
		  vTab = require('vue!../main_components/tab.vue'),
			api = require('../../api.js')
	import { mapActions } from 'vuex'
	module.exports = {
		name: 'role_new',
		components: {
			'tabs': vTabs,
			'tab': vTab
		},
		data () {
      return {
				role_name: '',
				view_all_carriers: '',

				all_finance: false,
				allow_delete_invoice: false,
				allow_delete_payment: false,
				allow_delete_credit: false,
				allow_delete_debit: false,
				allow_reset_balance: false,
				allow_modify_credit_limit: false,
				allow_modify_profitability: false,
				allow_view_cost_rate: false,

				all_config: false,
				all_config_write: false,
				users: false,
				users_write: false,
				role: false,
				role_write: false,
				system_setting: false,
				system_setting_write: false,
				invoice_setting: false,
				invoice_setting_write: false,
				payment_setting: false,
				payment_setting_write: false,
				global_route_error: false,
				global_route_error_write: false,
				mail_sender: false,
				mail_sender_write: false,
				verify_configuration: false,
				verify_configuration_write: false,
				system_modules: false,
				system_modules_write: false,
				mail_template: false,
				mail_template_write: false,
				login_page_content: false,
				login_page_content_write: false,
				cdr_generation_format: false,
				cdr_generation_format_write: false,
				carrier_group: false,
				carrier_group_write: false,
				trunk_group: false,
				trunk_group_write: false,
				syspris: false,
				syspris_write: false,
				ftp_job: false,
				ftp_job_write: false,
				fail_over_rule: false,
				fail_over_rule_write: false,
				carrier_portal_cdr_field: false,
				carrier_portal_cdr_field_write: false,

				all_finance: false,
				all_finance_write: false,
				mutual_transaction: false,
				mutual_transaction_write: false,
				past_due_notification_log: false,
				past_due_notification_log_write: false,
				regenerate_balance: false,
				regenerate_balance_write: false,
				past_due_summary: false,
				past_due_summary_write: false,
				carrier_invoice_history: false,
				carrier_invoice_history_write: false,
				auto_invoice_management: false,
				auto_invoice_management_write: false,
				actual_transaction: false,
				actual_transaction_write: false,
				invoice: false,
				invoice_write: false,
				recalculate_balance: false,
				recalculate_balance_write: false,
				invoice_notification_log: false,
				invoice_notification_log_write: false,
				payment: false,
				payment_write: false,

				all_log: false,
				all_log_write: false,
				sql_log: false,
				sql_log_write: false,
				ip_modify_log: false,
				ip_modify_log_write: false,
				license_modification_log: false,
				license_modification_log_write: false,
				schedule_log: false,
				schedule_log_write: false,
				ftp_log: false,
				ftp_log_write: false,
				sip_register: false,
				sip_register_write: false,
				rate_mass_edit_log: false,
				rate_mass_edit_log_write: false,
				import_log: false,
				import_log_write: false,
				rate_import_log: false,
				rate_import_log_write: false,
				modification_log: false,
				modification_log_write: false,
				retrieve_password_log: false,
				retrieve_password_log_write: false,
				// invoice_cdr_log: false,
				// invoice_cdr_log_write: false,
				email_log: false,
				email_log_write: false,
				// schedule_report_log: false,
				// schedule_report_log_write: false,
				auto_payment_log: false,
				auto_payment_log_write: false,
				invoice_log: false,
				invoice_log_write: false,
				// ftp_server_log: false,
				// ftp_server_log_write: false,
				user_sign_in_history: false,
				user_sign_in_history_write: false,
				// origination_log: false,
				// origination_log_write: false,
				// balance_log: false,
				// balance_log_write: false,
				// credit_log: false,
				// credit_log_write: false,
				// authorization_log: false,
				// authorization_log_write: false,

				all_management: false,
				all_management_write: false,
				unclaimed_trunks: false,
				unclaimed_trunks_write: false,
				carrier: false,
				carrier_write: false,
				credit_management: false,
				credit_management_write: false,
				registration: false,
				registration_write: false,
				wizard: false,
				wizard_write: false,
				product: false,
				product_write: false,
				client_rate_summary: false,
				client_rate_summary_write: false,

				all_monitoring: false,
				all_monitoring_write: false,
				condition: false,
				condition_write: false,
				rule: false,
				rule_write: false,
				action: false,
				action_write: false,
				block: false,
				block_write: false,
				loop_detection: false,
				loop_detection_write: false,
				// traffic_alert_rule: false,
				// traffic_alert_rule_write: false,
				// dialer_detection: false,
				// dialer_detection_write: false,
				fraud_detection: false,
				fraud_detection_write: false,
				// blackhole_ip: false,
				// blackhole_ip_write: false,

				all_origination: false,
				all_origination_write: false,
				clients: false,
				clients_write: false,
				vendors: false,
				vendors_write: false,
				billing_rule: false,
				billing_rule_write: false,
				did_repository: false,
				did_repository_write: false,
				orig_wizard: false,
				orig_wizard_write: false,
				origination_static_routing: false,
				origination_static_routing_write: false,

				all_routing: false,
				all_routing_write: false,
				routing_wizard: false,
				routing_wizard_write: false,
				trunk_registration: false,
				trunk_registration_write: false,
				digital_translation: false,
				digital_translation_write: false,
				static_routing: false,
				static_routing_write: false,
				disconnect_code: false,
				disconnect_code_write: false,
				routing_plan: false,
				routing_plan_write: false,
				dynamic_routing: false,
				dynamic_routing_write: false,
				trunks: false,
				trunks_write: false,
				block_lists: false,
				block_lists_write: false,
				add_trunk_prefix: false,
				add_trunk_prefix_write: false,

				all_statistics: false,
				all_statistics_write: false,
				host_based_report: false,
				host_based_report_write: false,
				cdrs_list: false,
				cdrs_list_write: false,
				spam_report: false,
				spam_report_write: false,
				daily_usage_detail_report: false,
				daily_usage_detail_report_write: false,
				disconnect_causes: false,
				disconnect_causes_write: false,
				location_report: false,
				location_report_write: false,
				usage_report: false,
				usage_report_write: false,
				summary_report: false,
				summary_report_write: false,
				inbound_outbound_report: false,
				inbound_outbound_report_write: false,
				profitability_analysis: false,
				profitability_analysis_write: false,
				qos_summary: false,
				qos_summary_write: false,
				monitors: false,
				monitors_write: false,
				lnp_dip_record: false,
				lnp_dip_record_write: false,
				daily_channel_usage_report: false,
				daily_channel_usage_report_write: false,
				active_registration: false,
				active_registration_write: false,
				stocks: false,
				stocks_write: false,
				active_call_report: false,
				active_call_report_write: false,
				dashboard: false,
				dashboard_write: false,

				all_switch: false,
				all_switch_write: false,
				voip_gateway: false,
				voip_gateway_write: false,
				clientrates: false,
				clientrates_write: false,
				download: false,
				download_write: false,
				uploads: false,
				uploads_write: false,
				capacity: false,
				capacity_write: false,
				rate_table: false,
				rate_table_write: false,
				time_profile: false,
				time_profile_write: false,
				code_deck: false,
				code_deck_write: false,
				// currency: false,
				// currency_write: false,
				us_jurisdiction: false,
				us_jurisdiction_write: false,
				payment_term: false,
				payment_term_write: false,
				random_ani_group: false,
				random_ani_group_write: false,
				all_template: false,
				all_template_write: false,
				egress_trunk_template: false,
				egress_trunk_template_write: false,
				ingress_trunk_template: false,
				ingress_trunk_template_write: false,
				rate_upload_template: false,
				rate_upload_template_write: false,
				carrier_template: false,
				carrier_template_write: false,
				rate_email_template: false,
				rate_email_template_write: false,
				all_agent: false,
				all_agent_write: false,
				commission_report: false,
				commission_report_write: false,
				agent_management: false,
				agent_management_write: false,
				commission_history: false,
				commission_history_write: false,
				all_tools: false,
				all_tools_write: false,
				call_simulation: false,
				call_simulation_write: false,
				rerate: false,
				rerate_write: false,
				sip_packet_search: false,
				sip_packet_search_write: false,
				rate_generation: false,
				rate_generation_write: false,
			}
	},
	watch: {
		'allow_delete_invoice': function() {
			if(this.allow_delete_invoice) {
				if( this.allow_delete_payment &&
					this.allow_delete_credit &&
					this.allow_delete_debit &&
					this.allow_reset_balance &&
					this.allow_modify_credit_limit &&
					this.allow_modify_profitability &&
					this.allow_view_cost_rate)
					this.all_finance = true;
			}
			else 
				this.all_finance = false;
		},
		'allow_delete_payment': function() {
			if(this.allow_delete_payment) {
				if( this.allow_delete_invoice &&
					this.allow_delete_credit &&
					this.allow_delete_debit &&
					this.allow_reset_balance &&
					this.allow_modify_credit_limit &&
					this.allow_modify_profitability &&
					this.allow_view_cost_rate)
					this.all_finance = true;
			}
			else 
				this.all_finance = false;
		},
		'allow_delete_credit': function() {
			if(this.allow_delete_credit) {
				if( this.allow_delete_invoice &&
					this.allow_delete_payment &&
					this.allow_delete_debit &&
					this.allow_reset_balance &&
					this.allow_modify_credit_limit &&
					this.allow_modify_profitability &&
					this.allow_view_cost_rate)
					this.all_finance = true;
			}
			else 
				this.all_finance = false;
		},
		'allow_delete_debit': function() {
			if(this.allow_delete_debit) {
				if( this.allow_delete_invoice &&
					this.allow_delete_payment &&
					this.allow_delete_credit &&
					this.allow_reset_balance &&
					this.allow_modify_credit_limit &&
					this.allow_modify_profitability &&
					this.allow_view_cost_rate)
					this.all_finance = true;
			}
			else 
				this.all_finance = false;
		},
		'allow_reset_balance': function() {
			if(this.allow_reset_balance) {
				if( this.allow_delete_invoice &&
					this.allow_delete_payment &&
					this.allow_delete_credit &&
					this.allow_delete_debit &&
					this.allow_modify_credit_limit &&
					this.allow_modify_profitability &&
					this.allow_view_cost_rate)
					this.all_finance = true;
			}
			else 
				this.all_finance = false;
		},
		'allow_modify_credit_limit': function() {
			if(this.allow_modify_credit_limit) {
				if( this.allow_delete_invoice &&
					this.allow_delete_payment &&
					this.allow_delete_credit &&
					this.allow_delete_debit &&
					this.allow_reset_balance &&
					this.allow_modify_profitability &&
					this.allow_view_cost_rate)
					this.all_finance = true;
			}
			else 
				this.all_finance = false;
		},
		'allow_modify_profitability': function() {
			if(this.allow_modify_profitability) {
				if( this.allow_delete_invoice &&
					this.allow_delete_payment &&
					this.allow_delete_credit &&
					this.allow_delete_debit &&
					this.allow_reset_balance &&
					this.allow_modify_credit_limit &&
					this.allow_view_cost_rate)
					this.all_finance = true;
			}
			else 
				this.all_finance = false;
		},
		'allow_view_cost_rate': function() {
			if(this.allow_view_cost_rate) {
				if( this.allow_delete_invoice &&
					this.allow_delete_payment &&
					this.allow_delete_credit &&
					this.allow_delete_debit &&
					this.allow_reset_balance &&
					this.allow_modify_credit_limit &&
					this.allow_modify_profitability)
					this.all_finance = true;
			}
			else 
				this.all_finance = false;
		}
	},
		methods: {
			...mapActions({
				setMessage: 'app_message/setAppMessage'
			}),
			reset() {
				this.role_name = '';
				this.all_finance = false;
				this.view_all_carriers = false;
				this.allow_delete_invoice = false;
				this.allow_delete_payment = false;
				this.allow_delete_credit = false;
				this.allow_delete_debit = false;
				this.allow_reset_balance = false;
				this.allow_modify_credit_limit = false;
				this.allow_modify_profitability = false;
				this.allow_view_cost_rate = false;	
				this.all_config = false;
				this.all_config_write = false;
				this.users = false;
				this.users_write = false;
				this.role = false;
				this.role_write = false;
				this.system_setting = false;
				this.system_setting_write = false;
				this.invoice_setting = false;
				this.invoice_setting_write = false;
				this.payment_setting = false;
				this.payment_setting_write = false;
				this.global_route_error = false;
				this.global_route_error_write = false;
				this.mail_sender = false;
				this.mail_sender_write = false;
				// this.verify_configuration = false;
				// this.verify_configuration_write = false;
				this.system_modules = false;
				this.system_modules_write = false;
				this.mail_template = false;
				this.mail_template_write = false;
				this.login_page_content = false;
				this.login_page_content_write = false;
				this.cdr_generation_format = false;
				this.cdr_generation_format_write = false;
				this.carrier_group = false;
				this.carrier_group_write = false;
				this.trunk_group = false;
				this.trunk_group_write = false;
				this.syspris = false;
				this.syspris_write = false;
				this.ftp_job = false;
				this.ftp_job_write = false;
				this.fail_over_rule = false;
				this.fail_over_rule_write = false;
				this.carrier_portal_cdr_field = false;
				this.carrier_portal_cdr_field_write = false;
				this.all_finance = false;
				this.all_finance_write = false;
				this.mutual_transaction = false;
				this.mutual_transaction_write = false;
				this.past_due_notification_log = false;
				this.past_due_notification_log_write = false;
				this.regenerate_balance = false;
				this.regenerate_balance_write = false;
				this.past_due_summary = false;
				this.past_due_summary_write = false;
				this.carrier_invoice_history = false;
				this.carrier_invoice_history_write = false;
				this.auto_invoice_management = false;
				this.auto_invoice_management_write = false;
				this.actual_transaction = false;
				this.actual_transaction_write = false;
				this.invoice = false;
				this.invoice_write = false;
				this.recalculate_balance = false;
				this.recalculate_balance_write = false;
				this.invoice_notification_log = false;
				this.invoice_notification_log_write = false;
				this.payment = false;
				this.payment_write = false;
				this.all_log = false;
				this.all_log_write = false;
				this.ftp_log = false;
				this.ftp_log_write = false;
				this.sip_register = false;
				this.sip_register_write = false;
				this.rate_mass_edit_log = false;
				this.rate_mass_edit_log_write = false;
				this.import_log = false;
				this.import_log_write = false;
				this.rate_import_log = false;
				this.rate_import_log_write = false;
				this.modification_log = false;
				this.modification_log_write = false;
				this.retrieve_password_log = false;
				this.retrieve_password_log_write = false;
				this.email_log = false;
				this.email_log_write = false;
				this.auto_payment_log = false;
				this.auto_payment_log_write = false;
				this.invoice_log = false;
				this.invoice_log_write = false;
				this.user_sign_in_history = false;
				this.user_sign_in_history_write = false;
				// this.authorization_log = false;
				// this.authorization_log_write = false;
				this.all_management = false;
				this.all_management_write = false;
				this.unclaimed_trunks = false;
				this.unclaimed_trunks_write = false;
				this.carrier = false;
				this.carrier_write = false;
				this.credit_management = false;
				this.credit_management_write = false;
				this.registration = false;
				this.registration_write = false;
				this.wizard = false;
				this.wizard_write = false;
				this.product = false;
				this.product_write = false;
				this.client_rate_summary = false;
				this.client_rate_summary_write = false;
				this.all_monitoring = false;
				this.all_monitoring_write = false;
				this.condition = false;
				this.condition_write = false;
				this.rule = false;
				this.rule_write = false;
				this.action = false;
				this.action_write = false;
				this.block = false;
				this.block_write = false;
				this.loop_detection = false;
				this.loop_detection_write = false;
				this.fraud_detection = false;
				this.fraud_detection_write = false;
				this.all_origination = false;
				this.all_origination_write = false;
				this.clients = false;
				this.clients_write = false;
				this.vendors = false;
				this.vendors_write = false;
				this.billing_rule = false;
				this.billing_rule_write = false;
				this.did_repository = false;
				this.did_repository_write = false;
				this.orig_wizard = false;
				this.orig_wizard_write = false;
				this.origination_static_routing= false;
				this.origination_static_routing_write = false;
				this.all_routing = false;
				this.all_routing_write = false;
				this.routing_wizard = false;
				this.routing_wizard_write = false;
				this.trunk_registration = false;
				this.trunk_registration_write = false;
				this.digital_translation = false;
				this.digital_translation_write = false;
				this.static_routing = false;
				this.static_routing_write = false;
				this.disconnect_code = false;
				this.disconnect_code_write = false;
				this.routing_plan = false;
				this.routing_plan_write = false;
				this.dynamic_routing = false;
				this.dynamic_routing_write = false;
				this.trunks = false;
				this.trunks_write = false;
				this.block_lists = false;
				this.block_lists_write = false;
				this.add_trunk_prefix = false;
				this.add_trunk_prefix_write = false;
				this.all_statistics = false;
				this.all_statistics_write = false;
				this.host_based_report = false;
				this.host_based_report_write = false;
				this.cdrs_list = false;
				this.cdrs_list_write = false;
				this.spam_report = false;
				this.spam_report_write = false;
				this.daily_usage_detail_report = false;
				this.daily_usage_detail_report_write = false;
				this.disconnect_causes = false;
				this.disconnect_causes_write = false;
				this.location_report = false;
				this.location_report_write = false;
				this.usage_report = false;
				this.usage_report_write = false;
				this.summary_report = false;
				this.summary_report_write = false;
				this.inbound_outbound_report = false;
				this.inbound_outbound_report_write = false;
				this.profitability_analysis = false;
				this.profitability_analysis_write = false;
				this.qos_summary = false;
				this.qos_summary_write = false;
				this.monitors = false;
				this.monitors_write = false;
				this.lnp_dip_record = false;
				this.lnp_dip_record_write = false;
				this.daily_channel_usage_report = false;
				this.daily_channel_usage_report_write = false;
				this.active_registration = false;
				this.active_registration_write = false;
				this.stocks = false;
				this.stocks_write = false;
				this.active_call_report = false;
				this.active_call_report_write = false;
				this.dashboard = false;
				this.dashboard_write = false;
				this.all_switch = false;
				this.all_switch_write = false;
				this.voip_gateway = false;
				this.voip_gateway_write = false;
				this.clientrates = false;
				this.clientrates_write = false;
				this.download = false;
				this.download_write = false;
				this.uploads = false;
				this.uploads_write = false;
				this.capacity = false;
				this.capacity_write = false;
				this.rate_table = false;
				this.rate_table_write = false;
				this.time_profile = false;
				this.time_profile_write = false;
				this.code_deck = false;
				this.code_deck_write = false;
				// this.currency = false;
				// this.currency_write = false;
				this.us_jurisdiction = false;
				this.us_jurisdiction_write = false;
				this.payment_term = false;
				this.payment_term_write = false;
				this.random_ani_group = false;
				this.random_ani_group_write = false;
				this.all_template = false;
				this.all_template_write = false;
				this.egress_trunk_template = false;
				this.egress_trunk_template_write = false;
				this.ingress_trunk_template = false;
				this.ingress_trunk_template_write = false;
				this.rate_upload_template = false;
				this.rate_upload_template_write = false;
				this.carrier_template = false;
				this.carrier_template_write = false;
				this.rate_email_template = false;
				this.rate_email_template_write = false;
				this.all_agent = false;
				this.all_agent_write = false;
				this.commission_report = false;
				this.commission_report_write = false;
				this.agent_management = false;
				this.agent_management_write = false;
				this.commission_history = false;
				this.commission_history_write = false;
				this.all_tools = false;
				this.all_tools_write = false;
				this.call_simulation = false;
				this.call_simulation_write = false;
				this.rerate = false;
				this.rerate_write = false;
				this.sip_packet_search = false;
				this.sip_packet_search_write = false;
				this.rate_generation = false;
				this.rate_generation_write = false;
			},
			clickCkbAll() {
				if(this.all_finance) {
					this.allow_delete_invoice = true;
					this.allow_delete_payment = true;
					this.allow_delete_credit = true;
					this.allow_delete_debit = true;
					this.allow_reset_balance = true;
					this.allow_modify_credit_limit = true;
					this.allow_modify_profitability = true;
					this.allow_view_cost_rate = true;									
				}
				else {
					this.allow_delete_invoice = false;
					this.allow_delete_payment = false;
					this.allow_delete_credit = false;
					this.allow_delete_debit = false;
					this.allow_reset_balance = false;
					this.allow_modify_credit_limit = false;
					this.allow_modify_profitability = false;
					this.allow_view_cost_rate = false;	
				}
			},
			validateBeforeSubmit() {
				if (this.role_name.trim()) {
					this.createNewRole()
				}
			},
			createNewRole () {
				console.log('test')
				this.loading = true
				const url = api.getEndpointUrl() + '/v1/config/role/create'
				const body = {
					role_name: this.role_name
				}
				this.$http.post(url, body)
				.then(response => {
					if (response.body.success) {
						this.loading = false
						this.$router.push('/configuration/roles')
						this.setMessage('Role was created successfully')
					}
				})
				.catch(error => {
					this.loading = false
				})
			}
		}
	}
</script>

<style>
	.vertical a.tab {
		display: block;
	}

	.vertical.tabs {
		border: 0;
		box-shadow: none;
	}

	.vertical .tabs_container {
		float: left;
		vertical-align: top;
		width: 75%;
	}

	.vertical .tabs_header {
		width: 25%;
		background: transparent;
    	border-radius: 0;
    	border: 0;
		float: left;
	}

	.vertical a.tab,
	.vertical a.tab.active:first-child {
	  border: 1px solid rgb(222, 224, 227);
	  border-radius: 5px;
	  background-color: #f7f8f9;
	  box-shadow: 0px 2px 7px 0px rgba(184, 187, 196, 0.2);
	  height: 48px;
	  margin-bottom: 10px;
	  line-height: 14px;
	}

	.vertical.tabs a.tab.active {
		color: #fff;
		background-color: #52565b;
	}

	.vertical.tabs a.tab span.dnl_icon {
		float: right;
	}

	h2.role_section_name {
		font-size: 24px;
		margin-top: 0;
		padding-left: 15px;
		margin-bottom: 20px;
	}

	.role_section {
		background: #f7f8f9;
		padding: 18px;
		border-radius: 5px;
		margin-bottom: 18px;
		margin-left: 20px;
	}

	.vertical .tabs_container {
		padding: 0;
	}

	.vertical .checkbox-success input[type="checkbox"]:checked + label::before {
		background-color: #03c0fc;
    	border-color: #03c0fc;
	}

	.vertical .checkbox.checkbox-success {
		margin-bottom: 15px;
	}

	.basic_section .checkbox.checkbox-success {
		margin-top: 34px;
	}

	.m-top-20 {
		margin-top: 20px;
	}

	.button_set.m-top-20 {
		width: 25%;
	}

	.button_set.m-top-20 a.btn.mini {
		width: 49%;
		float: left;
		margin-right: 2%;
	}

	.button_set.m-top-20 a.btn.btn-default.mini {
		margin-right: 0;
	}


	@media (min-width: 768px) and (max-width: 979px) {
		.vertical.tabs a.tab,
		.vertical.tabs a.tab.active:first-child {
				height: 40px;
				line-height: 7px;
				font-size: 13px;
				padding: 15px 10px;
		}

		.vertical.tabs a.tab span.dnl_icon {
			display: none;
		}
	}

	@media (max-width: 767px) {
		.button_set.m-top-20 {
			width: 100%;
		}
		.white_pad .vertical.tabs .tab_wrapper {
			display: block !important;
		}

		.vertical .tabs_header {
			display: none;
		}

		.vertical .tabs_container {
			width: 100%;
		}

		.vertical .tabs_container .role_section {
			margin-left: 0;
		}

		.basic_section .checkbox.checkbox-success {
			margin-top: 18px;
		}
	}


	/* Landscape phones and down */
	@media (max-width: 480px) {
		.vertical .tabs_container .role_section {
			padding: 12px 5px;
		}

		.vertical .tabs_container .role_section h2.role_section_name {
			font-size: 20px;
			margin-top: 5px;
			margin-bottom: 15px;
		}
	}

	/* Portrait phone to landscape phone */
	@media (min-width: 319px) and (max-width: 479px) {

	}

</style>
