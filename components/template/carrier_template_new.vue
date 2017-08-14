<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Template</a></li>
				  <li class="breadcrumb-item">
					  <router-link to="/template/carrier_template">Carrier Template</router-link>
				  </li>
				  <li class="breadcrumb-item active">Carrier Template Editor</li>
			</ol>
			<h1 class="page-header">Carrier Template Editor</h1>
			<router-link to="/template/carrier_template" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad">
				<tabs class="vertical">
                    <tab label="Template Name" class="" icon="dnl_icon dnl_arrow-point-to-right" selected>
						<section class="role_section">
							<h2 class="role_section_name">Template Name</h2>
							<div class="clearfix"></div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="client_name">Template Name:</label>
									<input type="text" name="template_name" v-model="template.template_name" class="form-control" :class="{'input': true, 'is-danger': errors.has('template_name') }" v-validate="'required'" placeholder="Enter Template Name">
									<span v-show="errors.has('template_name')" class="help is-danger">{{ errors.first('template_name') }}</span>
								</div>
							</div>
							<div class="clearfix"></div>
						</section>
					</tab>
					<tab label="Basic Info" class="" icon="dnl_icon dnl_arrow-point-to-right">
						<section class="role_section basic_section">
							<h2 class="role_section_name">Basic Info</h2>
							<div class="col-md-4 col-sm-6">
								<div class="form-group fix-select">
									<label>Mode:</label>
									<select2 :options="mode_options" v-model="template.mode">
									</select2>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group fix-select">
									<label>Currency:</label>
									<!--<select2 :options="currency_options" v-model="template.currency">
										<option value='0'></option>
									</select2>-->
									<select class="selectable" v-model="template.currency">
										<option disabled value="0" selected>Select Currency</option>
										<option v-for="item in currency_options" v-bind:value="item.id">
											{{ item.text }}
										</option>
									</select>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="test_credit">{{ template.mode === 'prepay' ? 'Test Credit:' : 'Allowed Credit:' }}</label>
									<!-- <input type="text" name="test_credit" v-model="template.test_credit" class="form-control" placeholder="Enter Test Credit"> -->
									<input v-if="template.mode === 'prepay'" type="text" name="test_credit" v-model="template.test_credit" class="form-control" :class="{ 'input': true, 'is-danger': errors.has('test_credit') }" v-validate="'required|numeric'" data-vv-as="Test Credit" placeholder="Enter Test Credit">
									<span v-if="template.mode === 'prepay'" v-show="errors.has('test_credit')" class="help is-danger">{{ errors.first('test_credit') }}</span>
									<div v-if="template.mode === 'postpay'" class="checkbox checkbox-success" style="display: flex;margin-top: 0px;">
										<input id="is_unlimited" name="is_unlimited" style="margin: 10px 5px;" v-model="template.is_unlimited" type="checkbox">
										<label for="is_unlimited" style="margin: 10px 5px;">Unlimited</label>
										<input v-if="template.is_unlimited === false" type="text" style="width: 70%; float: right;" name="allowed_credit" v-model="template.allowed_credit" class="form-control" :class="{ 'input': true, 'is-danger': errors.has('allowed_credit') }" v-validate="'numeric'" data-vv-as="Allowed Credit" placeholder="Enter Allowed Credit">
										<span v-if="template.is_unlimited === false" v-show="errors.has('allowed_credit')" class="help is-danger">{{ errors.first('allowed_credit') }}</span>
									</div>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="min_profitability">Min. Profitability:</label>
									<div class="input-group">
								   <span class="input-group-addon">$</span>
								  <input type="text" class="form-control" aria-label="" placeholder="Enter Min. Profitability" name="min_profitability" v-model="template.min_profitability">
								  <div class="input-group-btn">
									<button type="button" class="btn btn-rimary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									  {{ template.profit_type === 'percentage' ? '%' : 'value' }}
									</button>
									<div class="dropdown-menu dropdown-menu-right">
									  <a class="dropdown-item">Percentage</a>
									  <a class="dropdown-item">Value</a>
									</div>
								  </div>
								</div>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="cps_limit">CPS Limit:</label>
									<input type="text" name="cps_limit" v-model="template.cps_limit" class="form-control" :class="{'input': true, 'is-danger': errors.has('cps_limit') }" v-validate="'required|numeric'" placeholder="Enter CPS Limit">
									<span v-show="errors.has('cps_limit')" class="help is-danger">{{ errors.first('cps_limit') }}</span>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="call_limit">Call limit:</label>
									<input type="text" name="call_limit" v-model="template.call_limit" class="form-control" :class="{'input': true, 'is-danger': errors.has('call_limit') }" v-validate="'required|numeric'" placeholder="Enter Call Limit">
									<span v-show="errors.has('call_limit')" class="help is-danger">{{ errors.first('call_limit') }}</span>
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
					<tab label="Automatic Report" class="" icon="dnl_icon dnl_arrow-point-to-right">
						<section class="role_section fix-select">
							<h2 class="role_section_name">Automatic Report</h2>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>Send Daily Usage Summary:</label>
									<select2 :options="daily_usage_summary_options" v-model="template.daily_usage_summary">
									</select2>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group m-top-33">
									<div class="checkbox checkbox-success">
										<input id="is_send_trunk_update" name="is_send_trunk_update" type="checkbox" v-model="template.is_send_trunk_update"> 
										<label for="is_send_trunk_update">Enable Trunk Update Alert</label>
									</div>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group m-top-33">
									<div class="checkbox checkbox-success">
										<input id="show_payment_summary" name="show_payment_summary" type="checkbox" v-model="template.show_payment_summary"> 
										<label for="show_payment_summary">Payment Received Alert</label>
									</div>
								</div>
							</div>
                            <div class="clearfix"></div>
                            <div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>Deliver to:</label>
									<select2 :options="deliver_to_options" v-model="template.deliver_to">
									</select2>
								</div>
							</div>
                            <div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>Deliver at:</label>
									<select2 :options="day_hours" v-model="template.deliver_at">
									</select2>
								</div>
							</div>
                            <div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>GMT:</label>
									<select2 :options="time_zone_options" v-model="template.gmt">
									</select2>
								</div>
							</div>
                            <div class="clearfix"></div>
                            <div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>Send Daily Balance:</label>
									<select2 :options="send_daily_balance_options" v-model="template.send_daily_balance">
									</select2>
								</div>
							</div>
                            <div class="col-md-4 col-sm-6">
								<div class="form-group m-top-33">
									<div class="checkbox checkbox-success">
										<input id="is_send_with_traffic" name="is_send_with_traffic" type="checkbox" v-model="template.is_send_with_traffic"> 
										<label for="is_send_with_traffic">Send only if there is traffic</label>
									</div>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>Send Daily CDR:</label>
									<select2 :options="send_daily_cdr_options" v-model="template.send_daily_cdr">
									</select2>
								</div>
							</div>
                            <div class="clearfix"></div>
                            <div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>Send As:</label>
									<select2 :options="send_as_options" v-model="template.send_as">
										<option value="0"></option>
									</select2>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group m-top-33">
									<div class="checkbox checkbox-success">
										<input id="is_daily_balance_notification" name="is_daily_balance_notification" type="checkbox" v-model="template.is_daily_balance_notification"> 
										<label for="is_daily_balance_notification">Zero Balance Notification</label>
									</div>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group m-top-33">
									<div class="checkbox checkbox-success">
										<input id="is_low_balance_note" name="is_low_balance_note" type="checkbox" v-model="template.low_balance_config.is_notify"> 
										<label for="is_low_balance_note">Low Balance Notification</label>
									</div>
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
									<p class="inline">If <input type="text" name="scc_percent" v-model="template.scc_percent" class="form-control small" :class="{'input': true, 'is-danger': errors.has('scc_percent') }" v-validate="'required|numeric'" placeholder="">
									<span v-show="errors.has('scc_percent')" class="help is-danger">{{ errors.first('scc_percent') }}</span>% overall invoice minute is below or equal to <select2 :options="scc_below_options" v-model="template.scc_below"></select2> second, then an additional charge of <input type="text" name="scc_charge" v-model="template.scc_charge" class="form-control small" :class="{'input': true, 'is-danger': errors.has('scc_charge') }" v-validate="'required|numeric'" placeholder="">
									<span v-show="errors.has('scc_charge')" class="help is-danger">{{ errors.first('scc_charge') }}</span> will be applied to each call</p>
									<div class="small_select">
										<select2 :options="scc_type_options" v-model="template.scc_type"></select2>
									</div>
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
									<select2 :options="payment_terms_options" v-model="template.payment_terms">
										<option value='0'></option>
									</select2>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>Invoice Format:</label>
									<select2 :options="invoice_format_options" v-model="template.invoice_format">
									</select2>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>Time Zone:</label>
									<select2 :options="time_zone_options" v-model="template.time_zone">
									</select2>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>CDR Compression Format:</label>
									<select2 :options="cdr_compression_format_options" v-model="template.cdr_compression_format">
									</select2>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>Rate Decimal Place:</label>
									<select2 :options="rate_decimal_place_options" v-model="template.rate_decimal_place">
									</select2>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>Rate Value:</label>
									<select2 :options="rate_value_options" v-model="template.rate_value">
									</select2>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="last_invoiced_for">Last Invoiced for:</label>
									<el-date-picker v-model="template.last_invoiced_for" type="date" placeholder="Enter Last Invoiced Date"></el-date-picker>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>No Invoice For Zero Traffic:</label>
									<select2 :options="no_invoice_for_zero_traffic_options" v-model="template.no_invoice_for_zero_traffic">
									</select2>
								</div>
							</div>
							<div class="clearfix little-space"></div>
							<div class="col-md-6 col-sm-6">
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="include_tax" name="include_tax" type="checkbox" v-model="template.include_tax"> 
										<label for="include_tax">Include Tax In Invoice</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="auto_send_invoice" name="auto_send_invoice" type="checkbox" v-model="template.auto_send_invoice"> 
										<label for="auto_send_invoice">Auto Send Invoice</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="include_available_credit" name="include_available_credit" type="checkbox" v-model="template.include_available_credit"> 
										<label for="include_available_credit">Include Available Credit</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="send_invoice_as_link" name="send_invoice_as_link" type="checkbox" v-model="template.send_invoice_as_link"> 
										<label for="send_invoice_as_link">Send Invoice As Link In Email</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="show_daily_usage" name="show_daily_usage" type="checkbox" v-model="template.show_daily_usage">
										<label for="show_daily_usage">Show Daily Usage</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="include_short_call_charge" name="include_short_call_charge" type="checkbox" v-model="template.include_short_call_charge"> 
										<label for="include_short_call_charge">Short Duration Call Surcharge Detail</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="include_summary_of_payments" name="include_summary_of_payments" type="checkbox" v-model="template.include_summary_of_payments"> 
										<label for="include_summary_of_payments">Include Summary of Payments</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="show_detail_by_trunk" name="show_detail_by_trunk" type="checkbox" v-model="template.show_detail_by_trunk"> 
										<label for="show_detail_by_trunk">Show Detail By Trunk</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="show_total_by_trunk" name="show_total_by_trunk" type="checkbox" v-model="template.show_total_by_trunk"> 
										<label for="show_total_by_trunk">Show Total By Trunk</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="show_account_summary" name="show_account_summary" type="checkbox" v-model="template.show_account_summary"> 
										<label for="show_account_summary">Show Account Summary</label>
									</div>
								</div>
							</div>
							<div class="col-md-6 col-sm-6">
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="show_code_summary" name="show_code_summary" type="checkbox" v-model="template.show_code_summary"> 
										<label for="show_code_summary">Show Code Summary (Top 10)</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="show_code_name_summary" name="show_code_name_summary" type="checkbox" v-model="template.show_code_name_summary"> 
										<label for="show_code_name_summary">Show Traffic Analysis by Code Name</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="show_country_summary" name="show_country_summary" type="checkbox" v-model="template.show_country_summary"> 
										<label for="show_country_summary">Show Traffic Analysis By Country</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="show_calls_by_date_summary" name="show_calls_by_date_summary" type="checkbox" v-model="template.show_calls_by_date_summary"> 
										<label for="show_calls_by_date_summary">Show Calls By Date Summary</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="inlcude_cdr_in_email" name="inlcude_cdr_in_email" type="checkbox" v-model="template.inlcude_cdr_in_email"> 
										<label for="inlcude_cdr_in_email">Include CDR Link In Email</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="show_detail_by_code_name" name="show_detail_by_code_name" type="checkbox" v-model="template.show_detail_by_code_name"> 
										<label for="show_detail_by_code_name">Show Detail By Code Name</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="show_jurisdiction_detail" name="show_jurisdiction_detail" type="checkbox" v-model="template.show_jurisdiction_detail"> 
										<label for="show_jurisdiction_detail">Show Jurisdictional Detail</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="break_down_by_rate_table" name="break_down_by_rate_table" type="checkbox" v-model="template.break_down_by_rate_table"> 
										<label for="break_down_by_rate_table">Break Down By Rate Table</label>
									</div>
								</div>
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="daily_usage_with_us_jurisdictional_breakdown" name="daily_usage_with_us_jurisdictional_breakdown" type="checkbox" v-model="template.daily_usage_with_us_jurisdictional_breakdown"> 
										<label for="daily_usage_with_us_jurisdictional_breakdown">Daily Usage with US Jurisdictional Breakdown</label>
									</div>
								</div>
							</div>
							<div class="clearfix little-space"></div>
							<div class="col-md-8 col-sm-12">
								  <label for="groupname">User Detail Fields:</label>
								  <select multiple="multiple" id="user_detail_fields" name="carrier">
									<option v-for="option in options" :value='option.value'>{{option.text}}</option>
								  </select>
							 </div>
							
							<div class="clearfix"></div>
						</section>
					</tab>
					<tab label="Low Balance Notification" class="" icon="dnl_icon dnl_arrow-point-to-right">
						<section class="role_section">
							<h2 class="role_section_name">Low Balance Notification</h2>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="low_balance_threshold">Low Balance Threshold:</label>
									<input type="text" name="low_balance_threshold" v-model="template.low_balance_threshold" class="form-control" placeholder="">
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>USD:</label>
									<select class="selectable" v-model="template.usd">
										<option v-for="item in usd_options" v-bind:value="item.id">
											{{ item.text }}
										</option>
									</select>
								</div>
							</div>
							<div class="clearfix"></div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>Time:</label>
									<el-time-picker v-model="template.time" :picker-options="{}" placeholder="TIme"></el-time-picker>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>GMT:</label>
									<select class="selectable" v-model="template.low_bal_gmt">
										<option v-for="item in time_zone_options" v-bind:value="item.id">
											{{ item.text }}
										</option>
									</select>
								</div>
							</div>
							<div class="clearfix"></div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="number_of_days">Number of days:</label>
									<input type="text" name="number_of_days" v-model="template.low_balance_config.number_of_days" class="form-control" placeholder="">
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>Recipient:</label>
									<select class="selectable" v-model="template.low_balance_config">
										<option v-for="item in deliver_to_options" v-bind:value="item.id">
											{{ item.text }}
										</option>
									</select>
								</div>
							</div>
							<!--<div class="col-md-12 col-sm-12">
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
										<select2 :options="options"></select2>
									</div>
									<p class="inline">at</p>
									<div class="small_select">
										<select2 :options="options"></select2>
									</div>
									<p class="inline">GMT</p>
									<div class="clearfix"></div>
									<p class="inline m-top-10">Notification should be sent for <input type="text" name="days_number" class="form-control small"> Days to</p>
									<div class="small_select">
										<select2 :options="time_zone_options" v-model=""></select2>
									</div>
									<div class="clearfix"></div>
									<p class="inline m-top-10">Disable ingress trunks after <input type="text" name="days_number" class="form-control small"> Days</p>
									<div class="clearfix"></div>
									<p class="inline m-top-10">Time <input type="text" name="days_number" class="form-control small"> GMT</p>
									<div class="small_select">
										<select2 :options="options"></select2>
									</div>
								</div>
							</div>-->
							<div class="clearfix"></div>
						</section>
					</tab>
				</tabs>
				<div class="clearfix"></div>
				<div class="button_set m-top-20">
					<a class="btn btn-primary mini" @click="validateForCarrierTemplate">
						Save
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
	const api = require("../../api");
	import { mapActions } from 'vuex';
	module.exports = {
		components: {
			'tabs': vTabs,
			'tab': vTab,
			'select2': vSelect,
			'multiselect': multiselect
		},
		props: ['editingtemplate', 'id'],
		data: function(){
            return {
				no_invoice_for_zero_traffic_options: [
					{id: '0', text: 'Yes'},
					{id: '1', text: 'No'},
				],
				emptyTemplate: {
					// daily_usage_with_us_jurisdictional_breakdown: false,		// api have not the field
					// no_invoice_for_zero_traffic: 0,							// api have not the field
					// show_calls_by_date_summary: false,							// api have not the field

					template_name: '',
					// profit_margin: 0,
					// show_detail_by_trunk: true,
					cps_limit: '',
					profit_type: "percentage",
					call_limit: '',
					// non_zero_invoice_only: false,
					is_daily_balance_notification: false,
					time_zone: '+0:00',
					show_daily_usage: false,
					// credit_limit: 0,
					// show_country_summary: false,
					show_account_summary: false,
					mode: 'prepay',
					// show_trunk_summary: false,
					// auto_summary_not_zero: 0,
					show_jurisdiction_detail: false,
					inlcude_cdr_in_email: false,
					// daily_cdr_generation: false,
					// auto_summary_hour: 0,
					// is_show_daily_usage: false,
					scc_charge: '',
					rate_value: 'Average Value',
					currency: '0',
					rate_decimal_place: '5',
					cdr_compression_format: 'Excel',
					// notify_client_balance_type: 0,
					// is_auto_summary: false;
					send_invoice_as_link: false,
					// daily_cdr_generation_zone: "string",
					scc_percent: '',
					payment_terms: '0',
					scc_type: 'meeting the short duration defined neighboring',
					include_short_call_charge: false,
					auto_send_invoice: false,
					invoice_format: 'PDF',
					show_code_name_summary: false,
					// attach_cdrs_list: false,
					show_payment_summary: false,
					include_tax: false,
					// auto_summary_group_by: "By Country",
					is_send_trunk_update: false,
					// auto_summary_period: 0,
					show_code_summary: false,
					scc_below: 6,

					low_balance_config: {
						send_to: 0,
						duplicate_days: 0,
						is_notify: false,
						duplicate_send_days: 0,
						actual_notify_balance: 0,
						send_time_type: "daily",
						value_type: "Actual Balance",
						percentage_notify_balance: 0,
						disable_trunks_days: 0,
						daily_send_time: 0

					},
					is_unlimited: false,
					allowed_credit: 0,
				},
				carrier_template:{},
				low_bal_gmt: 13,
				time: '',
				usd: '0',
				usd_options: [
					{id: '0', text: 'Actual Balance'},
					{id: '1', text: 'Percentage'},
				],
				rate_value: '0',
				rate_value_options: [
					{id: 'Average Value', text: 'Average Value'},
					{id: 'Actual Value', text: 'Actual Value'},
				],
				rate_decimal_place: '5',
				rate_decimal_place_options:[
					{ id: '1', text: '1' },
					{ id: '2', text: '2' },
					{ id: '3', text: '3' },
					{ id: '4', text: '4' },
					{ id: '5', text: '5' },
					{ id: '6', text: '6' },
					{ id: '7', text: '7' },
					{ id: '8', text: '8' },
					{ id: '9', text: '9' },
					{ id: '10', text: '10' },
				],
				cdr_compression_format: 'Excel',
				cdr_compression_format_options: [
					{id: 'Excel', text: 'Excel'},
					{id: 'CSV', text: 'CSV'},
					{id: 'zip', text: 'zip'},
					{id: 'tar.gz', text: 'tar.gz'},
				],
				time_zone: 13,
				invoice_format: 'PDF',
				invoice_format_options: [
					{id: 'PDF', text: 'PDF'},
					{id: 'Word', text: 'Word'},
				],
				payment_terms_options: [],
				scc_below: 6,
				scc_below_options: [
					{ id: 6, text: '6' },
					{ id: 12, text: '12' },
					{ id: 18, text: '18' },
					{ id: 24, text: '24' },
					{ id: 30, text: '30' },
				],
				scc_type: 'meeting the short duration defined neighboring',
				scc_type_options: [
					{ id: 'meeting the short duration defined neighboring', text: 'meeting the short duration defined above' },
					{ id: 'that exceed the defined percentage', text: 'that exceed the defined percentage' },
				],
				send_as: '',
				send_as_options: [
					{ id: 'attachment', text: 'Attachment' },
					{ id: 'link', text: 'Link' },
				],
				send_daily_cdr: 0,
				send_daily_cdr_options: [
					{id: 0, text: 'False'},
					{id: 1, text: 'True'},
				],
				send_daily_balance: 0,
				send_daily_balance_options: [
					{id: 0, text: 'False'},
					{id: 1, text: 'True'},
				],
				gmt: '+0:00',
				time_zone_options: [
					{ id: '-12:00', text: 'GMT -12:00' },
					{ id: '-11:00', text: 'GMT -11:00' },
					{ id: '-10:00', text: 'GMT -10:00' },
					{ id: '-9:00', text: 'GMT -9:00' },
					{ id: '-8:00', text: 'GMT -8:00' },
					{ id: '-7:00', text: 'GMT -7:00' },
					{ id: '-6:00', text: 'GMT -6:00' },
					{ id: '-5:00', text: 'GMT -5:00' },
					{ id: '-4:00', text: 'GMT -4:00' },
					{ id: '-3:00', text: 'GMT -3:00' },
					{ id: '-2:00', text: 'GMT -2:00' },
					{ id: '-1:00', text: 'GMT -1:00' },
					{ id: '+0:00', text: 'GMT +0:00' },
					{ id: '+1:00', text: 'GMT +1:00' },
					{ id: '+2:00', text: 'GMT +2:00' },
					{ id: '+3:00', text: 'GMT +3:00' },
					{ id: '+4:00', text: 'GMT +4:00' },
					{ id: '+5:00', text: 'GMT +5:00' },
					{ id: '+6:00', text: 'GMT +6:00' },
					{ id: '+7:00', text: 'GMT +7:00' },
					{ id: '+8:00', text: 'GMT +8:00' },
					{ id: '+9:00', text: 'GMT +9:00' },
					{ id: '+10:00', text: 'GMT +10:00' },
					{ id: '+11:00', text: 'GMT +11:00' },
					{ id: '+12:00', text: 'GMT +12:00' },
				],
				deliver_at: '00:00',
				day_hours: [
				  {id: '0:00', text: '0:00'},
				  {id: '1:00', text: '1:00'},
				  {id: '2:00', text: '2:00'},
				  {id: '3:00', text: '3:00'},
				  {id: '4:00', text: '4:00'},
				  {id: '5:00', text: '5:00'},
				  {id: '6:00', text: '6:00'},
				  {id: '7:00', text: '7:00'},
				  {id: '8:00', text: '8:00'},
				  {id: '9:00', text: '9:00'},
				  {id: '10:00', text: '10:00'},
				  {id: '11:00', text: '11:00'},
				  {id: '12:00', text: '12:00'},
				  {id: '13:00', text: '13:00'},
				  {id: '14:00', text: '14:00'},
				  {id: '15:00', text: '15:00'},
				  {id: '16:00', text: '16:00'},
				  {id: '17:00', text: '17:00'},
				  {id: '18:00', text: '18:00'},
				  {id: '19:00', text: '19:00'},
				  {id: '20:00', text: '20:00'},
				  {id: '21:00', text: '21:00'},
				  {id: '22:00', text: '22:00'},
				  {id: '23:00', text: '23:00'},

			  ],
				deliver_to: 0,
				deliver_to_options: [
					{id: 0, text: 'Partner\'s Billing Contact'},
					{id: 1, text: 'Owner\'s Billing Contact'},
					{id: 2, text: 'Both'},
				],
				daily_usage_summary: 0,
				daily_usage_summary_options: [
					{id: 0, text: 'False'},
					{id: 1, text: 'True'},
				],
				currency_options: [],
				mode_options: [
					{id: 'prepay', text: 'Prepaid'},
					{id: 'postpay', text: 'Postpaid'},
				],
				template: {},

                template_name: '',
                egress_name: '',
				groupname: '',
                mode: '',
                min_profitability: '',
                last_invoiced_for: '',
                
                call_limit: '',
                cps_limit: '',
                test_credit: '',
				options: [
					  { id: 1, value: 'carrier1', text: 'Carrier 1' },
					  { id: 2, value: 'carrier2', text: 'Carrier 2' },
					  { id: 3, value: 'carrier3', text: 'Carrier 3' },
					  { id: 4, value: 'carrier4', text: 'Carrier 4' },
					  { id: 5, value: 'carrier5', text: 'Carrier 5' }
				],
				username: '',
				password: '',
				current_date: ''
			}
        },
		methods: {
			...mapActions({
				setMessage: 'app_message/setAppMessage'
			}),
			organizeTemplateData(data) {
				// This function fixes naming differences between carrierLong and carrier
				this.template = {
					
					currency: data.currency,
					format: data.format,
					auto_summary_group_by: data.auto_summary_group_by,
					show_trunk_summary: data.show_trunk_summary,
					time_zone: data.time_zone,
					is_daily_balance_notification: data.is_daily_balance_notification,
					scc_percent: data.scc_percent,
					profit_type: data.profit_type,
					rate_value: data.rate_value,
					include_short_call_charge: data.include_short_call_charge,
					show_account_summary: data.show_account_summary,
					show_country_summary: data.show_country_summary,
					include_tax: data.include_tax,
					call_limit: data.call_limit,
					scc_type: data.scc_type,
					show_jurisdiction_detail: data.show_jurisdiction_detail,
					update_on: data.update_on,
					daily_cdr_generation_zone: data.daily_cdr_generation_zone,
					auto_summary_not_zero: data.auto_summary_not_zero,
					low_balance_config: data.low_balance_config,
					send_invoice_as_link: data.send_invoice_as_link,
					template_name: data.template_name,
					show_daily_usage: data.show_daily_usage,
					mode: data.mode,
					non_zero_invoice_only: data.non_zero_invoice_only,
					cps_limit: data.cps_limit,
					create_by: data.create_by,
					id: data.id,
					cdr_format: data.cdr_format,
					inlcude_cdr_in_email: data.inlcude_cdr_in_email,
					is_send_trunk_update: data.is_send_trunk_update,
					scc_charge: data.scc_charge,
					decimal: data.decimal,
					attach_cdrs_list: data.attach_cdrs_list,
					is_show_daily_usage: data.is_show_daily_usage,
					profit_margin: data.profit_margin,
					show_payment_summary: data.show_payment_summary,
					show_code_name_summary: data.show_code_name_summary,
					is_unlimited: data.is_unlimited,
					credit_limit: data.credit_limit,
					payment_term: data.payment_term,
					auto_send_invoice: data.auto_send_invoice,
					is_auto_summary: data.is_auto_summary,
					create_on: data.create_on,
					notify_client_balance_type: data.notify_client_balance_type,
					daily_cdr_generation: data.daily_cdr_generation,
					scc_below: data.scc_below,
					auto_summary_hour: data.auto_summary_hour,
					auto_summary_period: data.auto_summary_period,
					show_detail_by_trunk: data.show_detail_by_trunk,
					show_code_summary: data.show_code_summary
				}
			},
			fetchTemplate() {
				const url = api.getEndpointUrl() + '/v1/config/carrier_template/' + this.id
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						console.log(body.payload);
						this.organizeTemplateData(body.payload)
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			resetTemplate() {
				this.template = Object.assign({}, this.emptyTemplate)
			},
			getCarrierTemplateForRequest() {
				const carrier_template = Object.assign({}, this.carrier_template);

				carrier_template.template_name = this.template.template_name;
				carrier_template.profit_margin = 0;
				carrier_template.show_detail_by_trunk = true;
				carrier_template.cps_limit = this.template.cps_limit;
				carrier_template.profit_type = this.template.profit_type;
				carrier_template.call_limit = this.template.call_limit;
				carrier_template.non_zero_invoice_only = true;
				carrier_template.is_daily_balance_notification = true;
				carrier_template.time_zone = this.template.time_zone;
				carrier_template.show_daily_usage = this.template.show_daily_usage;
				carrier_template.credit_limit = 0;
				carrier_template.show_country_summary = true;
				carrier_template.show_account_summary = this.template.show_account_summary;
				carrier_template.mode = this.template.mode;
				carrier_template.show_trunk_summary = true;
				carrier_template.auto_summary_not_zero = 0;
				carrier_template.show_jurisdiction_detail = this.template.show_jurisdiction_detail;
				carrier_template.inlcude_cdr_in_email = this.template.inlcude_cdr_in_email;
				carrier_template.daily_cdr_generation = this.template.daily_cdr_generation;
				carrier_template.auto_summary_hour = 0;
				carrier_template.is_show_daily_usage = true;
				carrier_template.scc_charge = this.template.scc_charge;
				carrier_template.rate_value = this.template.rate_value;
				carrier_template.currency = this.template.currency;
				carrier_template.decimal = this.template.rate_decimal_place;
				carrier_template.cdr_format = this.template.cdr_compression_format;
				carrier_template.notify_client_balance_type = 0;
				carrier_template.is_auto_summary = true;
				carrier_template.send_invoice_as_link = this.template.carrier_template;
				carrier_template.daily_cdr_generation_zone = "string";
				carrier_template.scc_percent = this.template.scc_percent;
				carrier_template.payment_term = this.template.payment_terms;
				carrier_template.scc_type = this.template.scc_type;
				carrier_template.include_short_call_charge = this.template.include_short_call_charge;
				carrier_template.auto_send_invoice = this.template.auto_send_invoice;
				carrier_template.format = this.template.invoice_format;
				carrier_template.show_code_name_summary = this.template.show_code_name_summary;
				carrier_template.attach_cdrs_list = true;
				carrier_template.show_payment_summary = this.template.show_payment_summary;
				carrier_template.include_tax = this.template.include_tax;
				carrier_template.auto_summary_group_by = "By Country";
				carrier_template.is_send_trunk_update = this.template.is_send_trunk_update;
				carrier_template.auto_summary_period = 0;
				carrier_template.show_code_summary = this.template.show_code_summary;
				carrier_template.scc_below = this.template.scc_below;
				// carrier_template.daily_usage_with_us_jurisdictional_breakdown = this.template.daily_usage_with_us_jurisdictional_breakdown;		// api have not the field
				// carrier_template.no_invoice_for_zero_traffic = this.template.no_invoice_for_zero_traffic;										// api have not the field
				// carrier_template.show_calls_by_date_summary = this.template.show_calls_by_date_summary;										// api have not the field

				carrier_template.low_balance_config = {
					send_to: 0,
					duplicate_days: 0,
					is_notify: true,
					duplicate_send_days: 0,
					actual_notify_balance: 0,
					send_time_type: "daily",
					value_type: "Actual Balance",
					percentage_notify_balance: 0,
					disable_trunks_days: 0,
					daily_send_time: 0

				}

				return carrier_template;
			},
			saveCarrierTemplate() {
				console.log("saveCarrierTemplate");
				const reqBody = this.getCarrierTemplateForRequest();
				var url;
				if(this.editingtemplate) {
					url = api.getEndpointUrl() + '/v1/config/carrier_template/' + this.id;
					this.$http.patch(url, reqBody)
						.then(response => {
							if (response.body.success) {
								this.setMessage('Carrier template was changed successfully');
								var thisvm = this;
								setTimeout(function(){
									thisvm.$router.push('/template/carrier_template');
								}, 3000);
							}
						})
						.catch(error => {
							console.log(error)
							this.setMessage({
								message: 'Failed to change carrier',
								type: 'error'
							})
						})	
				}
				else {
					console.log("reqBody:", reqBody);
					url = api.getEndpointUrl() + '/v1/config/carrier_template/create';
					this.$http.post(url, reqBody)
						.then(response => {
							if (response.body.success) {
								this.setMessage('Carrier template was created successfully');
								var thisvm = this;
								setTimeout(function(){
									thisvm.$router.push('/template/carrier_template');
								}, 3000);
							}
						})
						.catch(error => {
							console.log(error)
							this.setMessage({
								message: 'Failed to create carrier',
								type: 'error'
							})
						})	
				}
			},
			validateForCarrierTemplate() {
				var vm = this;
				this.$validator.validateAll().then(() => {
					const err = this.$validator.getErrors();
					if (err.errors.length > 0) {
						vm.setMessage({
							message: 'Validation failed',
							type: 'error'
						})
					}
					else {
						vm.saveCarrierTemplate();
					}
						
				}).catch((error) => {
					// eslint-disable-next-line
					console.log(error)
					vm.setMessage({
						message: 'Validation failed',
						type: 'error'
					})
				});
			},
			fetchPaymentTerm() {
				const url = api.getEndpointUrl() + '/v1/config/payment_term/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const payment_terms = body.payload.items
						var self = this;
						payment_terms.forEach(function (temp, i) {
							var payment_term = {};
							payment_term.id = temp.name;
							payment_term.text = temp.name;
							self.payment_terms_options.push(payment_term);
							if (i == 0)
								self.template.payment_terms = payment_term.id;
						});
						console.log(this.payment_terms_options);
						
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
            fetchCurrency() {
				const url = api.getEndpointUrl() + '/v1/switch/currency/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const currencies = body.payload.items
						var self = this;
						currencies.forEach(function (temp, i) {
							var currency = {};
							currency.id = temp.code;
							currency.text = temp.code;
							self.currency_options.push(currency);
							if (i == 0)
								self.template.currency = currency.id;
						});
						console.log(this.currency_options);
						
					}
				})
				.catch(error => {
					console.log(error)
				})
			}
		},
		mounted: function() {
			$('#user_detail_fields').multiSelect({
				 selectableHeader: "<div class='custom-header'>Unappropriated</div>",
  				 selectionHeader: "<div class='custom-header'>Unappropriated</div>"
			});
		},
		created () {
			if (this.editingtemplate) {
				this.fetchTemplate();
			} else {
				this.resetTemplate()
			}
			this.fetchCurrency();
			this.fetchPaymentTerm();
		}
	}
</script>

<style>
</style>
