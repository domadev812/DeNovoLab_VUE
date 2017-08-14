<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="#">Management</a>
					</li>
					<li class="breadcrumb-item">
						<router-link to="/management/carrier">Clients</router-link>
					</li>
					<li class="breadcrumb-item active">Client Editor</li>
				</ol>
				<h1 class="page-header">Client Editor</h1>
				<router-link to="/management/clients/new_template" class="btn btn-primary medium pull-right">
					<span class="dnl_icon dnl_add"></span> Create New by Template</router-link>
				<router-link to="/management/carrier" class="btn btn_white back">
					<span class="dnl_icon dnl_import"></span> Back </router-link>
				<tabs class="client_edit_tabs">
					<tab label="Basic Info" class="" icon="dnl_icon dnl_info" :selected="info_type==undefined || info_type=='base'">
						<tabs class="vertical mail_template">
							<tab label="Basic Info" class="" icon="dnl_icon dnl_arrow-point-to-right" selected>
								<section class="role_section system_logo">
									<h2 class="role_section_name">Basic Info</h2>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="carrier_name">Name:</label>
											<input type="text" name="carrier_name" v-model="client.carrier_name" class="form-control" :class="{ 'input': true, 'is-danger': errors.has('carrier_name') }" v-validate="'required'" data-vv-as="Name" placeholder="Enter Name">
											<span v-show="errors.has('carrier_name')" class="help is-danger">{{ errors.first('carrier_name') }}</span>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label>Status:</label>
											<!--<select2 :options="status_options" v-model="status">
																												</select2>-->
											<select class="selectable" v-model="status_selected">
												<option disabled value="0" selected>Select Status</option>
												<option v-for="status_option in status_options" v-bind:value="status_option.id">
													{{ status_option.text }}
												</option>
											</select>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label>Mode:</label>
											<!--<select2 :options="is_prepay_options" v-model="is_prepay_selected">
																												</select2>-->
											<select class="selectable" v-model="is_prepay_selected">
												<option disabled value="0" selected>Select Mode</option>
												<option v-for="is_prepay_option in is_prepay_options" v-bind:value="is_prepay_option.id">
													{{ is_prepay_option.text }}
												</option>
											</select>
										</div>
									</div>
									<div class="clearfix"></div>
									
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="test_credit">{{ is_prepay_selected === 1 ? 'Test Credit:' : 'Allowed Credit:' }}</label>
											<input v-if="is_prepay_selected === 1" type="text" name="test_credit" v-model="client.test_credit" class="form-control" :class="{ 'input': true, 'is-danger': errors.has('test_credit') }" v-validate="'required|numeric'" data-vv-as="Test Credit" placeholder="Enter Test Credit">
											<span v-if="is_prepay_selected === 1" v-show="errors.has('test_credit')" class="help is-danger">{{ errors.first('test_credit') }}</span>
                                            <div v-if="is_prepay_selected === 2" class="checkbox checkbox-success" style="display: flex;">
                                                <input id="is_unlimited" name="is_unlimited" style="margin: 10px 5px;" v-model="client.is_unlimited" type="checkbox">
                                                <label for="is_unlimited" style="margin: 10px 5px;">Unlimited</label>
                                                <input v-if="client.is_unlimited === false" type="text" style="width: 70%; float: right;" name="allowed_credit" v-model="client.allowed_credit" class="form-control" :class="{ 'input': true, 'is-danger': errors.has('allowed_credit') }" v-validate="'numeric'" data-vv-as="Allowed Credit" placeholder="Enter Allowed Credit">
                                                <span v-if="client.is_unlimited === false" v-show="errors.has('allowed_credit')" class="help is-danger">{{ errors.first('allowed_credit') }}</span>
                                            </div>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="profit_margin">Min. Profitability:</label>
											<div class="input-group">
												<span class="input-group-addon">$</span>
												<input type="text" name="profit_margin" v-model="client.profit_margin" class="form-control" placeholder="Enter Min. Profitability">
												<div class="input-group-btn">
													<button type="button" class="btn btn-rimary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
														{{ client.profit_type === 'percentage' ? '%' : 'value' }}
													</button>
													<div class="dropdown-menu dropdown-menu-right">
														<a class="dropdown-item" @click="client.profit_type = 'percentage'">Percentage</a>
														<a class="dropdown-item" @click="client.profit_type = 'value'">Value</a>
													</div>
	
												</div>
											</div>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="cps_limit">CPS Limit:</label>
											<input type="text" name="cps_limit" v-model="client.cps_limit" class="form-control" placeholder="Enter CPS Limit">
										</div>
									</div>
									<div class="clearfix"></div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="call_limit">Call limit:</label>
											<input type="text" name="call_limit" v-model="client.call_limit" class="form-control" placeholder="Enter Call Limit">
										</div>
									</div>
                                    <div class="col-md-4 col-sm-6">
                                        <div class="form-group">
                                            <label>Currency:</label>
                                            <select class="selectable" v-model="client.currency">
                                                <option disabled value="0" selected>Select Currency</option>
												<option v-for="item in currency_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
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
                                            <input type="text" name="company_name" v-model="client.company_name" class="form-control" :class="{ 'input': true, 'is-danger': errors.has('company_name') }" v-validate="'required'" data-vv-as="Company Name" placeholder="Enter Company Name">
                                            <span v-show="errors.has('company_name')" class="help is-danger">{{ errors.first('company_name') }}</span>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="main_email">Main E-mail:</label>
											<input type="email" name="main_email" v-model="client.email" class="form-control" :class="{ 'input': true, 'is-danger': errors.has('main_email') }" v-validate="'required|email'" data-vv-as="Main E-mail" placeholder="Enter Main E-mail">
											<span v-show="errors.has('main_email')" class="help is-danger">{{ errors.first('main_email') }}</span>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="noc_email">NOC E-mail:</label>
											<input type="email" name="noc_email" v-model="client.noc_email" class="form-control" placeholder="Enter NOC E-mail">
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="billing_email">Billing E-mail:</label>
											<input type="email" name="billing_email" v-model="client.billing_email" class="form-control" placeholder="Enter Billing E-mail">
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="rates_email">Rates E-mail:</label>
											<input type="email" name="rates_email" v-model="client.rate_email" class="form-control" placeholder="Enter Rates E-mail">
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="rate_delivery_email">Rate Delivery E-mail:</label>
											<input type="email" name="rate_delivery_email" v-model="client.rate_delivery_email" class="form-control" placeholder="Enter Rate Delivery E-mail">
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="tax_id">Tax ID:</label>
											<input type="text" name="tax_id" v-model="client.tax" class="form-control" placeholder="Enter Tax ID">
										</div>
									</div>
									<div class="clearfix"></div>
									<div class="col-md-6 col-sm-6">
										<div class="form-group">
											<label for="address">Address:</label>
											<textarea name="address" v-model="client.address" class="form-control" :class="{ 'input': true, 'is-danger': errors.has('address') }" v-validate="'required'" placeholder="Enter Company Address"></textarea>
                                            <span v-show="errors.has('address')" class="help is-danger">{{ errors.first('address') }}</span>
										</div>
									</div>
									<div class="col-md-6 col-sm-6">
										<div class="form-group">
											<label for="account_detail">Account Details:</label>
											<textarea name="account_detail" v-model="client.account_detail" class="form-control" placeholder="Enter Account Details" />
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
												<input id="is_send_trunk_update" name="is_send_trunk_update" v-model="client.is_send_trunk_update" type="checkbox">
												<label for="is_send_trunk_update">Send Trunk Update</label>
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
											<label>Send At:**</label>
											<select2 :options="sent_at_options" v-model="sent_at_selected">
											</select2>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label>Time Zone:</label>
											<select2 :options="time_zone_options" v-model="time_zone_selected">
											</select2>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label>Recipient:**</label>
											<select2 :options="recipient_options" v-model="recipient_selected">
											</select2>
										</div>
									</div>
									<div class="clearfix"></div>
									<hr>
									<div class="col-md-4 col-sm-6">
										<div class="form-group m-top-33">
											<div class="checkbox checkbox-success">
												<input id="is_show_daily_usage" name="is_show_daily_usage" v-model="client.is_show_daily_usage" type="checkbox">
												<label for="is_show_daily_usage">Daily Usage Summary</label>
											</div>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group m-top-33">
											<div class="checkbox checkbox-success">
												<input id="non_zero_invoice_only" name="non_zero_invoice_only" v-model="client.non_zero_invoice_only" type="checkbox">
												<label for="non_zero_invoice_only">Non-Zero Only</label>
											</div>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label>Group by:**</label>
											<select2 :options="mode_options" v-model="group_by">
											</select2>
										</div>
									</div>
									<div class="clearfix"></div>
									<hr>
									<div class="col-md-4 col-sm-6">
										<div class="form-group m-top-33">
											<div class="checkbox checkbox-success">
												<input id="is_daily_balance_notification" name="is_daily_balance_notification" v-model="client.is_daily_balance_notification" type="checkbox">
												<label for="is_daily_balance_notification">Daily Balance Summary</label>
											</div>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="days_number">Number of Days:**</label>
											<input type="text" name="days_number" v-model="days_number" class="form-control" placeholder="Enter Number of Days">
										</div>
									</div>
									<div class="clearfix"></div>
									<hr>
									<div class="col-md-4 col-sm-6">
										<div class="form-group m-top-33">
											<div class="checkbox checkbox-success">
												<input id="daily_cdr_generation" name="daily_cdr_generation" v-model="client.daily_cdr_generation" type="checkbox">
												<label for="daily_cdr_generation">Daily CDR Generation</label>
											</div>
										</div>
									</div>
									<!-- <div class="col-md-4 col-sm-6">
																	<div class="form-group">
																		<label>CDR Type:</label>
																		<select2 :options="cdr_format_options" v-model="cdr_format_selected">
																		</select2>
																	</div>
																</div> -->
									<div class="clearfix"></div>
								</section>
							</tab>
							<tab label="Short Call Charge" class="" icon="dnl_icon dnl_arrow-point-to-right">
								<section class="role_section">
									<h2 class="role_section_name">Short Call Charge</h2>
									<div class="col-md-12">
										<div class="form-group">
											<p class="inline">If
												<input type="text" name="scc_percent" v-model="client.scc_percent" class="form-control small" :class="{ 'input': true, 'is-danger': errors.has('scc_percent') }" v-validate="'numeric'" data-vv-as="SCC Percent"> % overall invoice minute is below or equal to
												<span v-show="errors.has('scc_percent')" class="help is-danger">{{ errors.first('scc_percent') }}</span>
												<input type="text" name="scc_below" v-model="client.scc_below" class="form-control small" :class="{ 'input': true, 'is-danger': errors.has('scc_below') }" v-validate="'numeric'" data-vv-as="SCC Below"> second, then an additional charge of
												<span v-show="errors.has('scc_below')" class="help is-danger">{{ errors.first('scc_below') }}</span>
												<input type="text" name="scc_charge" v-model="client.scc_charge" class="form-control small" :class="{ 'input': true, 'is-danger': errors.has('scc_charge') }" v-validate="'numeric'" data-vv-as="SCC Charge"> will be applied to each call </p>
											    <span v-show="errors.has('scc_charge')" class="help is-danger">{{ errors.first('scc_charge') }}</span>
											<div class="small_select">
												<select2 :options="scc_type_options" v-model="scc_type_selected"></select2>
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
											<select2 :options="payment_term_options" v-model="payment_term_selected">
											</select2>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label>Invoice Format:</label>
											<select2 :options="invoice_format_options" v-model="invoice_format_selected">
											</select2>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label>Time Zone:</label>
											<select2 :options="time_zone_options" v-model="client.time_zone">
											</select2>
										</div>
									</div>
									<!-- <div class="col-md-4 col-sm-6">
															<div class="form-group">
																<label>CDR Compression Format:</label>
																<select2 :options="cdr_format_options" v-model="cdr_format_selected">
																</select2>
															</div>
														</div> -->
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="rate_decimal_place">Rate Decimal Place:</label>
											<select2 :options="decimal_options" v-model="decimal_selected">
											</select2>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label>Rate Value:</label>
											<select2 :options="rate_value_options" v-model="rate_value_selected">
											</select2>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="last_invoiced_for">Last Invoiced for:**</label>
											<input type="text" name="last_invoiced_for" v-model="last_invoiced_for" class="form-control" placeholder="Enter Last Invoiced Date">
										</div>
									</div>
									<div class="clearfix little-space"></div>
									<div class="col-md-6 col-sm-6">
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input type="checkbox" v-model="client.include_tax" name="include_tax" id="include_tax">
												<label for="include_tax">Include Tax In Invoice</label>
											</div>
										</div>
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input type="checkbox" v-model="client.auto_send_invoice" name="auto_send_invoice" id="auto_send_invoice">
												<label for="auto_send_invoice">Auto Send Invoice</label>
											</div>
										</div>
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input type="checkbox" v-model="client.include_available_credit" name="include_available_credit" id="include_available_credit">
												<label for="include_available_credit">Include Available Credit**</label>
											</div>
										</div>
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input type="checkbox" v-model="client.send_invoice_as_link" name="send_invoice_as_link" id="send_invoice_as_link">
												<label for="send_invoice_as_link">Send Invoice As Link In Email</label>
											</div>
										</div>
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input type="checkbox" v-model="client.show_daily_usage" name="show_daily_usage" id="show_daily_usage">
												<label for="show_daily_usage">Show Daily Usage</label>
											</div>
										</div>
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input type="checkbox" v-model="client.include_short_call_charge" name="include_short_call_charge" id="include_short_call_charge">
												<label for="include_short_call_charge">Short Duration Call Surcharge Detail</label>
											</div>
										</div>
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input type="checkbox" v-model="client.show_payment_summary" name="show_payment_summary" id="show_payment_summary">
												<label for="show_payment_summary">Include Summary of Payments</label>
											</div>
										</div>
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input type="checkbox" v-model="client.show_detail_by_trunk" name="show_detail_by_trunk" id="show_detail_by_trunk">
												<label for="show_detail_by_trunk">Show Detail By Trunk</label>
											</div>
										</div>
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input type="checkbox" v-model="client.show_total_by_trunk" name="show_total_by_trunk" id="show_total_by_trunk">
												<label for="show_total_by_trunk">Show Total By Trunk**</label>
											</div>
										</div>
									</div>
									<div class="col-md-6 col-sm-6">
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input type="checkbox" v-model="client.show_code_summary" name="show_code_summary" id="show_code_summary">
												<label for="show_code_summary">Show Code Summary (Top 10)</label>
											</div>
										</div>
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input type="checkbox" v-model="client.show_code_name_summary" name="show_code_name_summary" id="show_code_name_summary">
												<label for="show_code_name_summary">Show Traffic Analysis by Code Name</label>
											</div>
										</div>
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input type="checkbox" v-model="client.show_country_summary" name="show_country_summary" id="show_country_summary">
												<label for="show_country_summary">Show Traffic Analysis By Country</label>
											</div>
										</div>
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input type="checkbox" v-model="client.show_calls_by_date_summary" name="show_calls_by_date_summary" id="show_calls_by_date_summary">
												<label for="show_calls_by_date_summary">Show Calls By Date Summary**</label>
											</div>
										</div>
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input type="checkbox" v-model="client.inlcude_cdr_in_email" name="inlcude_cdr_in_email" id="inlcude_cdr_in_email">
												<label for="inlcude_cdr_in_email">Include CDR Link In Email</label>
											</div>
										</div>
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input type="checkbox" v-model="client.show_detail_by_code_name" name="show_detail_by_code_name" id="show_detail_by_code_name">
												<label for="show_detail_by_code_name">Show Detail By Code Name**</label>
											</div>
										</div>
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input type="checkbox" v-model="client.show_jurisdiction_detail" name="show_jurisdiction_detail" id="show_jurisdiction_detail">
												<label for="show_jurisdiction_detail">Show Jurisdictional Detail</label>
											</div>
										</div>
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input type="checkbox" v-model="client.break_down_by_rate_table" name="break_down_by_rate_table" id="break_down_by_rate_table">
												<label for="break_down_by_rate_table">Break Down By Rate Table**</label>
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
							<tab label="Carrier Self-service Portal" class="" icon="dnl_icon dnl_arrow-point-to-right">
								<section class="role_section">
									<h2 class="role_section_name">Carrier Self-service Portal</h2>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="username">Username:</label>
                                            <input type="text" name="username" v-model="client.login" class="form-control" :class="{ 'input': true, 'is-danger': errors.has('username') }" v-validate="''" data-vv-as="Username" placeholder="Enter Username">
											<span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</span>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="password">Password:</label>
											<input type="password" name="password" v-model="client.password" class="form-control" placeholder="Enter Password">
										</div>
									</div>
									<div class="clearfix"></div>
									<hr>
									<h2 class="role_section_name">Permissons</h2>
									<div class="col-md-6 col-sm-6">
										<h4 class="role_section_name">Management</h4>
										<div class="form-group">
                                            <div class="checkbox checkbox-success">
                                                <input type="checkbox" v-model="client.is_panel_accountsummary" name="is_panel_accountsummary" id="is_panel_accountsummary">
                                                <label for="is_panel_accountsummary">Account Summary</label>
                                            </div>
										</div>
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input type="checkbox" v-model="client.is_panel_ratetable"  name="is_panel_ratetable" id="is_panel_ratetable" >
												<label for="is_panel_ratetable">Rate Table</label>
											</div>
										</div>
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input type="checkbox" v-model="client.is_panel_trunks" name="is_panel_trunks" id="is_panel_trunks" >
												<label for="is_panel_trunks">Trunks</label>
											</div>
										</div>
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input type="checkbox" v-model="client.is_panel_products" name="is_panel_products" id="is_panel_products">
												<label for="is_panel_products">Products</label>
											</div>
										</div>
									</div>
									<div class="col-md-6 col-sm-6">
										<h4 class="role_section_name">Billing</h4>
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input type="checkbox" v-model="client.is_panel_balance" name="is_panel_balance" id="is_panel_balance">
												<label for="is_panel_balance">Balance</label>
											</div>
										</div>
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input type="checkbox" v-model="client.is_panel_paymenthistory" name="is_panel_paymenthistory" id="is_panel_paymenthistory">
												<label for="is_panel_paymenthistory">Payment History</label>
											</div>
										</div>
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input type="checkbox" v-model="client.is_panel_onlinepayment" name="is_panel_onlinepayment" id="is_panel_onlinepayment">
												<label for="is_panel_onlinepayment">Online Payment</label>
											</div>
										</div>
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input type="checkbox" v-model="client.is_panel_invoices" name="is_panel_invoices" id="is_panel_invoices">
												<label for="is_panel_invoices">Invoices</label>
											</div>
										</div>
									</div>
									<div class="clearfix little-space"></div>
									<div class="col-md-6 col-sm-6">
										<h4 class="role_section_name">Reports</h4>
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input type="checkbox" v-model="client.is_panel_cdrslist" name="is_panel_cdrslist" id="is_panel_cdrslist">
												<label for="is_panel_cdrslist">CDRs List</label>
											</div>
										</div>
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input type="checkbox" v-model="client.is_panel_summaryreport" name="is_panel_summaryreport" id="is_panel_summaryreport">
												<label for="is_panel_summaryreport">Summary Report</label>
											</div>
										</div>
									</div>
									<div class="col-md-6 col-sm-6">
										<h4 class="role_section_name">SIP PACKET Search</h4>
										<div class="form-group">
											<div class="checkbox checkbox-success">
												<input type="checkbox" v-model="client.is_panel_sippacket" name="is_panel_sippacket" id="is_panel_sippacket">
												<label for="is_panel_sippacket">SIP PACKET Search</label>
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
												<input id="radio-1" class="radio-custom" name="usd-percent" type="radio" value="Actual Balance" v-model="low_balance_config.value_type">
												<label for="radio-1" class="radio-custom-label">Send low balance alert when the balance is less than or equal to:</label>
											</div>
											<p class="inline">
												<input type="text" name="days_number" class="form-control small" v-model="low_balance_config.actual_notify_balance"> USD</p>
											<div class="radio radio-success">
												<input id="radio-2" class="radio-custom" name="usd-percent" type="radio" value="Percentage" v-model="low_balance_config.value_type">
												<label for="radio-2" class="radio-custom-label">Send low balance alert when the credit remaining is less than or equal to:</label>
											</div>
											<p class="inline">
												<input type="text" name="days_number" class="form-control small" v-model="low_balance_config.percentage_notify_balance"> % of credit limit</p>
											<div class="clearfix"></div>
											<p class="inline">Notification should be sent</p>
											<div class="small_select">
                                                <select class="selectable" v-model="low_balance_config.send_time_type">
                                                    <option v-for="item in low_bal_send_type_options" v-bind:value="item.id">
                                                        {{ item.text }}
                                                    </option>
                                                </select>
											</div>
											<p class="inline">at</p>
											<div class="small_select">
                                                <select class="selectable" v-model="low_balance_config.daily_send_time">
                                                    <option v-for="item in daily_send_time_options" v-bind:value="item.id">
                                                        {{ item.text }}
                                                    </option>
                                                </select>
											</div>
											<p class="inline">GMT</p>
											<div class="clearfix"></div>
											<p class="inline m-top-10">Notification should be sent for
												<input type="text" name="days_number" class="form-control small" v-model="low_balance_config.duplicate_send_days"> Days to</p>
											<div class="small_select">
                                                <select class="selectable" v-model="low_balance_config.send_to">
                                                    <option v-for="item in low_bal_send_to_options" v-bind:value="item.id">
                                                        {{ item.text }}
                                                    </option>
                                                </select>
											</div>
											<div class="clearfix"></div>
											<p class="inline m-top-10">Disable ingress trunks after
												<input type="text" name="days_number" class="form-control small" v-model="low_balance_config.disable_trunks_days"> Days</p>
											<div class="clearfix"></div>
											<!--<p class="inline m-top-10">Time
												<input type="text" name="days_number" class="form-control small"> GMT</p>
											<div class="small_select">
												<select2 :options="mode_options"></select2>
											</div>-->
										</div>
									</div>
									<div class="clearfix"></div>
								</section>
							</tab>
						</tabs>
						<div class="clearfix"></div>
						<div class="button_set m-top-20">
							<a class="btn btn-primary mini" @click="validateNewClient()">
								Submit
							</a>
							<a class="btn btn-default mini" @click="resetClient()">
								Reset
							</a>
						</div>
						<div class="clearfix"></div>
					</tab>
					<tab label="Egress" class="" icon="dnl_icon dnl_egress" v-if="editingclient" :selected="info_type=='egress'">
						<h1 class="page-header">Egress Trunk</h1>
                        <confirm v-show="showEgressModal" @close="showEgressModal = false" @submit="submitDeleteEgress"></confirm>
                        <div class="btn-group m-top-10" role="group">
                            <router-link :to="'/routing/trunks/egress/new/'+id" class="btn btn-default create_new_iconed">
                                <span class="dnl_icon dnl_add"></span> Create New</router-link>
                            <button type="button" class="btn btn-default" @click="deleteAll('egress')">
                                <span class="dnl_icon dnl_action_delete"></span> Delete All
                            </button>
                            <button type="button" class="btn btn-default" @click="deleteSelected('egress')">
                                <span class="dnl_icon dnl_action_delete"></span> Delete Selected
                            </button>
                        </div>
                        <tabs class="vertical mail_template">
                            <tab label="Egress List" class="" icon="dnl_icon dnl_arrow-point-to-right" selected>
                                <section class="role_section system_logo">
                                    <h2 class="role_section_name">Egress List</h2>
                                    <div class="advanced_search_filter_panel">
                                        <div class="inline-block search_wrapper">
                                            <label>Search:</label>
                                            <br>
                                            <input type="text" name="search" v-model="search" class="form-control inline-block search_field" placeholder="Enter Search">
                                            <span class="dnl_icon dnl_musica-searcher"></span>
                                        </div>
                                        <div class="inline-block">
                                            <label>Status:</label>
                                            <br>
                                            <select2 :options="options2" v-model="status">
                                                <option disabled value="0">Show/Hide Columns</option>
                                            </select2>
                                        </div>
                                    </div>
                                    <div class="table-responsive big_data">
                                        <table class="table table-striped table-hover carrier_groups">
                                            <thead>
                                                <tr>
                                                    <th class="width-65">
                                                        <div class="checkbox checkbox-success">
                                                            <input type="checkbox" id="egress_checker" name="egress_checker" v-model="egress_checker" @click="toggleChecker('egress')">
                                                            <label for="egress_checker"></label>
                                                        </div>
                                                    </th>
                                                    <th>Host Port</th>
                                                    <th>Egress ID</th>
                                                    <th>Egress Name</th>
                                                    <th>Carriers</th>
                                                    <th>Call Limit</th>
                                                    <th>CPS Limit</th>
                                                    <th>Usage Count</th>
                                                    <th>Rate Table</th>
                                                    <th>Protocol</th>
                                                    <th>PDD Timeout</th>
                                                    <th>Update at</th>
                                                    <th>Update by</th>
                                                    <th class="width_190">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="egress in egress_lists">
                                                    <td class="centred_checkbox">
                                                        <div class="checkbox checkbox-success">
                                                            <input :id="'egress-' + egress.resource_id" :name="'egress-' + egress.resource_id" type="checkbox" v-model="egress.status">
                                                            <label :for="'egress-' + egress.resource_id"></label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <a class="action action_read" data-toggle="tooltip" data-placement="top" title="View" @click="showModal='host_port'">
                                                            <span class="dnl_icon dnl_eye"></span>
                                                        </a>
                                                    </td>
                                                    <td>{{egress.resource_id}}</td>
                                                    <td>{{egress.name}}</td>
                                                    <td>{{egress.carrier_id}}</td>
                                                    <td>{{egress.call_limit}}</td>
                                                    <td>{{egress.cps_limit}}</td>
                                                    <td>{{egress.route_strategy!=null?egress.route_strategy.usage_count:null}}</td>
                                                    <td>{{egress.rate_table}}</td>
                                                    <td>{{egress.protocol}}</td>
                                                    <td>{{egress.pdd_timeout}}</td>
                                                    <td>{{egress.route_strategy!=null?egress.route_strategy.update_at:null}}</td>
                                                    <td>{{egress.route_strategy!=null?egress.route_strategy.update_by:null}}</td>
                                                    <td>
                                                        <a class="action action_send" data-toggle="tooltip" data-placement="top" title="Send Interop">
                                                            <span class="dnl_icon dnl_support"></span>
                                                        </a>
                                                        <a class="action action_save_template" data-toggle="tooltip" data-placement="top" title="Save as Template">
                                                            <span class="dnl_icon dnl_label"></span>
                                                        </a>
                                                        <a class="action action_activate" data-toggle="tooltip" data-placement="top" title="Deactivate">
                                                            <span class="dnl_icon dnl_check"></span>
                                                        </a>
                                                        <router-link :to="'/routing/trunks/edit/'+egress.resource_id+'/egress'" class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit">
                                                            <span class="dnl_icon dnl_action_edit"></span>
                                                        </router-link>
                                                        <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="askDeleteConfirm(egress.resource_id, 'egress')">
                                                            <span class="dnl_icon dnl_action_delete"></span>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="pull-right pagination">
                                        <pagination :current-page="egressPageOne.currentPage" :total-pages="egressPageOne.totalPages" @page-changed="egressPageOneChanged">
                                        </pagination>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="clearfix little-space"></div>
                                </section>
                            </tab>
                            <tab label="Egress Import" class="" icon="dnl_icon dnl_arrow-point-to-right">
                                <section class="role_section">
                                    <h2 class="role_section_name">Egress Import</h2>
                                    <div class="col-md-5 col-sm-6">
                                        <label>Import File:</label>
                                        <dropzone id="myVueDropzone" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
                                    </div>
                                    <div class="col-md-7 col-sm-6">
                                        <label>Dublicate:</label>
                                        <div class="form-group">
                                            <div class="radio radio-success">
                                                <input id="radio-1" class="radio-custom" name="duplicates" type="radio" checked>
                                                <label for="radio-1" class="radio-custom-label">Ignore</label>
                                            </div>
                                        </div>
                                        <div class="form-group m-top-minus-25">
                                            <div class="radio radio-success">
                                                <input id="radio-2" class="radio-custom" name="duplicates" type="radio">
                                                <label for="radio-2" class="radio-custom-label">Delete</label>
                                            </div>
                                        </div>
                                        <div class="button_set little-space">
                                            <a class="btn btn-primary mini">
                                                Show Example
                                            </a>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="button_set col-md-12 col-sm-12">
                                        <a class="btn btn-primary mini">
                                            Upload
                                        </a>
                                    </div>
                                    <div class="clearfix"></div>
                                </section>
                            </tab>
                            <tab label="Egress Export" class="" icon="dnl_icon dnl_arrow-point-to-right">
                                <section class="role_section">
                                    <h2 class="role_section_name">Egress Export</h2>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Data Format:</label>
                                            <select2 :options="options1" v-model="data_format"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group m-top-33">
                                            <div class="checkbox checkbox-success">
                                                <input id="status" name="enable_rep_grouping" type="checkbox">
                                                <label for="enable_rep_grouping">With headers row</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group">
                                            <label>Header Text:</label>
                                            <textarea v-model="header_text" class="form-control" placeholder="Enter Header Text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group">
                                            <label>Footer Text:</label>
                                            <textarea v-model="footer_text" class="form-control" placeholder="Enter Footer Text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #1:</label>
                                            <select2 :options="options1" v-model="column_1"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #2:</label>
                                            <select2 :options="options1" v-model="column_2"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #3:</label>
                                            <select2 :options="options1" v-model="column_3"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #4:</label>
                                            <select2 :options="options1" v-model="column_4"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #5:</label>
                                            <select2 :options="options1" v-model="column_5"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #6:</label>
                                            <select2 :options="options1" v-model="column_6"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #7:</label>
                                            <select2 :options="options1" v-model="column_7"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #8:</label>
                                            <select2 :options="options1" v-model="column_8"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #9:</label>
                                            <select2 :options="options1" v-model="column_9"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #10:</label>
                                            <select2 :options="options1" v-model="column_10"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #11:</label>
                                            <select2 :options="options1" v-model="column_11"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #12:</label>
                                            <select2 :options="options1" v-model="column_12"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #13:</label>
                                            <select2 :options="options1" v-model="column_13"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #14:</label>
                                            <select2 :options="options1" v-model="column_14"></select2>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="button_set center-block text-center">
                                        <a class="btn btn-primary mini">
                                            Download
                                        </a>
                                    </div>
                                </section>
                            </tab>
                            <tab label="Import Host" class="" icon="dnl_icon dnl_arrow-point-to-right">
                                <section class="role_section">
                                    <h2 class="role_section_name">Egress Import</h2>
                                    <div class="col-md-5 col-sm-6">
                                        <label>Import Host:</label>
                                        <dropzone id="myVueDropzone2" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
                                    </div>
                                    <div class="col-md-7 col-sm-6">
                                        <label>Dublicate:</label>
                                        <div class="form-group">
                                            <div class="radio radio-success">
                                                <input id="radio-1" class="radio-custom" name="duplicates" type="radio" checked>
                                                <label for="radio-1" class="radio-custom-label">Ignore</label>
                                            </div>
                                        </div>
                                        <div class="form-group m-top-minus-25">
                                            <div class="radio radio-success">
                                                <input id="radio-2" class="radio-custom" name="duplicates" type="radio">
                                                <label for="radio-2" class="radio-custom-label">Delete</label>
                                            </div>
                                        </div>
                                        <div class="button_set little-space">
                                            <a class="btn btn-primary mini">
                                                Show Example
                                            </a>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="button_set col-md-12 col-sm-12">
                                        <a class="btn btn-primary mini">
                                            Upload
                                        </a>
                                    </div>
                                    <div class="clearfix"></div>
                                </section>
                            </tab>
                            <tab label="Export Host" class="" icon="dnl_icon dnl_arrow-point-to-right">
                                <section class="role_section">
                                    <h2 class="role_section_name">Export Host</h2>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Data Format:</label>
                                            <select2 :options="options1" v-model="data_format"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group m-top-33">
                                            <div class="checkbox checkbox-success">
                                                <input id="status" name="enable_rep_grouping" type="checkbox">
                                                <label for="enable_rep_grouping">With headers row</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group">
                                            <label>Header Text:</label>
                                            <textarea v-model="header_text" class="form-control" placeholder="Enter Header Text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group">
                                            <label>Footer Text:</label>
                                            <textarea v-model="footer_text" class="form-control" placeholder="Enter Footer Text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #1:</label>
                                            <select2 :options="options1" v-model="column_1"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #2:</label>
                                            <select2 :options="options1" v-model="column_2"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #3:</label>
                                            <select2 :options="options1" v-model="column_3"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #4:</label>
                                            <select2 :options="options1" v-model="column_4"></select2>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="button_set center-block text-center">
                                        <a class="btn btn-primary mini">
                                            Download
                                        </a>
                                    </div>
                                </section>
                            </tab>
                            <tab label="Import Action" class="" icon="dnl_icon dnl_arrow-point-to-right">
                                <section class="role_section">
                                    <h2 class="role_section_name">Import Action</h2>
                                    <div class="col-md-5 col-sm-6">
                                        <label>Import Host:</label>
                                        <dropzone id="myVueDropzone3" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
                                    </div>
                                    <div class="col-md-7 col-sm-6">
                                        <label>Dublicate:</label>
                                        <div class="form-group">
                                            <div class="radio radio-success">
                                                <input id="radio-1" class="radio-custom" name="duplicates" type="radio" checked>
                                                <label for="radio-1" class="radio-custom-label">Ignore</label>
                                            </div>
                                        </div>
                                        <div class="form-group m-top-minus-25">
                                            <div class="radio radio-success">
                                                <input id="radio-2" class="radio-custom" name="duplicates" type="radio">
                                                <label for="radio-2" class="radio-custom-label">Delete</label>
                                            </div>
                                        </div>
                                        <div class="button_set little-space">
                                            <a class="btn btn-primary mini">
                                                Show Example
                                            </a>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="button_set col-md-12 col-sm-12">
                                        <a class="btn btn-primary mini">
                                            Upload
                                        </a>
                                    </div>
                                    <div class="clearfix"></div>
                                </section>
                            </tab>
                            <tab label="Export Action" class="" icon="dnl_icon dnl_arrow-point-to-right">
                                <section class="role_section">
                                    <h2 class="role_section_name">Export Action</h2>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Data Format:</label>
                                            <select2 :options="options1" v-model="data_format"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group m-top-33">
                                            <div class="checkbox checkbox-success">
                                                <input id="status" name="enable_rep_grouping" type="checkbox">
                                                <label for="enable_rep_grouping">With headers row</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group">
                                            <label>Header Text:</label>
                                            <textarea v-model="header_text" class="form-control" placeholder="Enter Header Text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group">
                                            <label>Footer Text:</label>
                                            <textarea v-model="footer_text" class="form-control" placeholder="Enter Footer Text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #1:</label>
                                            <select2 :options="options1" v-model="column_1"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #2:</label>
                                            <select2 :options="options1" v-model="column_2"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #3:</label>
                                            <select2 :options="options1" v-model="column_3"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #4:</label>
                                            <select2 :options="options1" v-model="column_4"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #5:</label>
                                            <select2 :options="options1" v-model="column_5"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #6:</label>
                                            <select2 :options="options1" v-model="column_6"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #7:</label>
                                            <select2 :options="options1" v-model="column_7"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #8:</label>
                                            <select2 :options="options1" v-model="column_8"></select2>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="button_set center-block text-center">
                                        <a class="btn btn-primary mini">
                                            Download
                                        </a>
                                    </div>
                                </section>
                            </tab>
                        </tabs>
                        <div class="clearfix"></div>
                        <div class="button_set relative">
                            <a class="btn btn-primary mini">
                                Save
                            </a>
                            <a class="btn btn-default mini">
                                Reset
                            </a>
                        </div>
                        <div class="clearfix"></div>
					</tab>
					<tab label="Ingress" class="" icon="dnl_icon dnl_ingress" v-if="editingclient" :selected="info_type=='ingress'">
						<h1 class="page-header">Ingress Trunk</h1>
                        <confirm v-show="showIngressModal" @close="showIngressModal = false" @submit="submitDeleteIngress"></confirm>
                        <div class="btn-group m-top-10" role="group">
                            <router-link :to="'/routing/trunks/ingress/new/'+id" class="btn btn-default create_new_iconed">
                                <span class="dnl_icon dnl_add"></span> Create New</router-link>
                            <button type="button" class="btn btn-default"  @click="deleteAll('ingress')">
                                <span class="dnl_icon dnl_action_delete"></span> Delete All
                            </button>
                            <button type="button" class="btn btn-default" @click="deleteSelected('ingress')">
                                <span class="dnl_icon dnl_action_delete"></span> Delete Selected
                            </button>
                        </div>
                        <tabs class="vertical mail_template">
                            <tab label="Ingress List" class="" icon="dnl_icon dnl_arrow-point-to-right" selected>
                                <section class="role_section system_logo">
                                    <h2 class="role_section_name">Ingress Trunk</h2>
                                    <div class="advanced_search_filter_panel">
                                        <div class="inline-block search_wrapper">
                                            <label>Search:</label>
                                            <br>
                                            <input type="text" name="search" v-model="search" class="form-control inline-block search_field" placeholder="Enter Search">
                                            <span class="dnl_icon dnl_musica-searcher"></span>
                                        </div>
                                        <div class="inline-block">
                                            <label>Status:</label>
                                            <br>
                                            <select2 :options="options2" v-model="status">
                                                <option disabled value="0">Show/Hide Columns</option>
                                            </select2>
                                        </div>
                                    </div>
                                    <div class="table-responsive big_data">
                                        <table class="table table-striped table-hover carrier_groups">
                                            <thead>
                                                <tr>
                                                    <th class="width-65">
                                                        <div class="checkbox checkbox-success">
                                                            <input type="checkbox" id="ingress_checker" name="ingress_checker" v-model="ingress_checker" @click="toggleChecker('ingress')">
                                                            <label for="ingress_checker"></label>
                                                        </div>
                                                    </th>
                                                    <th>Host Port</th>
                                                    <th>Ingress ID</th>
                                                    <th>Ingress Name</th>
                                                    <th>Carriers</th>
                                                    <th>Call Limit</th>
                                                    <th>CPS Limit</th>
                                                    <th>Trunk Count</th>
                                                    <th>Margin</th>
                                                    <th>PDD Timeout</th>
                                                    <th>Update at</th>
                                                    <th>Update by</th>
                                                    <th class="width_190">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="ingress in orderBy(ingress_lists, 'carrier_name')">
                                                    <td class="centred_checkbox">
                                                        <div class="checkbox checkbox-success">
                                                            <input :id="'ingress-' + ingress.resource_id" :name="'ingress-' + ingress.resource_id" type="checkbox" v-model="ingress.status">
                                                            <label :for="'ingress-' + ingress.resource_id"></label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <a class="action action_read" data-toggle="tooltip" data-placement="top" title="View" @click="showModal='host_port'">
                                                            <span class="dnl_icon dnl_eye"></span>
                                                        </a>
                                                    </td>
                                                    <td>{{ingress.resource_id}}</td>
                                                    <td>{{ingress.name}}</td>
                                                    <td>{{ingress.carrier_id}}</td>
                                                    <td>{{ingress.call_limit}}</td>
                                                    <td>{{ingress.cps_limit}}</td>
                                                    <td>{{ingress.usage_count}}</td>
                                                    <td>{{ingress.rate_table}}</td>
                                                    <td>{{ingress.pdd_timeout}}</td>
                                                    <td>{{ingress.update_at}}</td>
                                                    <td>{{ingress.update_by}}</td>
                                                    <td>
                                                        <a class="action action_send" data-toggle="tooltip" data-placement="top" title="Send Interop">
                                                            <span class="dnl_icon dnl_support"></span>
                                                        </a>
                                                        <a class="action action_save_template" data-toggle="tooltip" data-placement="top" title="Save as Template">
                                                            <span class="dnl_icon dnl_label"></span>
                                                        </a>
                                                        <a class="action action_activate" data-toggle="tooltip" data-placement="top" title="Deactivate">
                                                            <span class="dnl_icon dnl_check"></span>
                                                        </a>
                                                        <router-link to="/routing/trunks/new" class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" @click.native="edit_trunk(ingress.resource_id, 'ingress');">
                                                            <span class="dnl_icon dnl_action_edit"></span>
                                                        </router-link>
                                                        <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="askDeleteConfirm(ingress.resource_id, 'ingress')">
                                                            <span class="dnl_icon dnl_action_delete"></span>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="pull-right pagination">
                                        <pagination :current-page="ingressPageOne.currentPage" :total-pages="ingressPageOne.totalPages" @page-changed="ingressPageOneChanged">
                                        </pagination>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="clearfix little-space"></div>
                                </section>
                            </tab>
                            <tab label="Ingress Import" class="" icon="dnl_icon dnl_arrow-point-to-right">
                                <section class="role_section">
                                    <h2 class="role_section_name">Ingress Import</h2>
                                    <div class="col-md-5 col-sm-6">
                                        <label>Import File:</label>
                                        <dropzone id="myVueDropzone4" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
                                    </div>
                                    <div class="col-md-7 col-sm-6">
                                        <label>Dublicate:</label>
                                        <div class="form-group">
                                            <div class="radio radio-success">
                                                <input id="radio-1" class="radio-custom" name="duplicates" type="radio" checked>
                                                <label for="radio-1" class="radio-custom-label">Ignore</label>
                                            </div>
                                        </div>
                                        <div class="form-group m-top-minus-25">
                                            <div class="radio radio-success">
                                                <input id="radio-2" class="radio-custom" name="duplicates" type="radio">
                                                <label for="radio-2" class="radio-custom-label">Delete</label>
                                            </div>
                                        </div>
                                        <div class="button_set little-space">
                                            <a class="btn btn-primary mini">
                                                Show Example
                                            </a>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="button_set col-md-12 col-sm-12">
                                        <a class="btn btn-primary mini">
                                            Upload
                                        </a>
                                    </div>
                                    <div class="clearfix"></div>
                                </section>
                            </tab>
                            <tab label="Ingress Export" class="" icon="dnl_icon dnl_arrow-point-to-right">
                                <section class="role_section">
                                    <h2 class="role_section_name">Ingress Export</h2>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Data Format:</label>
                                            <select2 :options="options1" v-model="data_format"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group m-top-33">
                                            <div class="checkbox checkbox-success">
                                                <input id="status" name="enable_rep_grouping" type="checkbox">
                                                <label for="enable_rep_grouping">With headers row</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group">
                                            <label>Header Text:</label>
                                            <textarea v-model="header_text" class="form-control" placeholder="Enter Header Text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group">
                                            <label>Footer Text:</label>
                                            <textarea v-model="footer_text" class="form-control" placeholder="Enter Footer Text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #1:</label>
                                            <select2 :options="options1" v-model="column_1"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #2:</label>
                                            <select2 :options="options1" v-model="column_2"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #3:</label>
                                            <select2 :options="options1" v-model="column_3"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #4:</label>
                                            <select2 :options="options1" v-model="column_4"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #5:</label>
                                            <select2 :options="options1" v-model="column_5"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #6:</label>
                                            <select2 :options="options1" v-model="column_6"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #7:</label>
                                            <select2 :options="options1" v-model="column_7"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #8:</label>
                                            <select2 :options="options1" v-model="column_8"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #9:</label>
                                            <select2 :options="options1" v-model="column_9"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #10:</label>
                                            <select2 :options="options1" v-model="column_10"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #11:</label>
                                            <select2 :options="options1" v-model="column_11"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #12:</label>
                                            <select2 :options="options1" v-model="column_12"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #13:</label>
                                            <select2 :options="options1" v-model="column_13"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #14:</label>
                                            <select2 :options="options1" v-model="column_14"></select2>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="button_set center-block text-center">
                                        <a class="btn btn-primary mini">
                                            Download
                                        </a>
                                    </div>
                                </section>
                            </tab>
                            <tab label="Import Host" class="" icon="dnl_icon dnl_arrow-point-to-right">
                                <section class="role_section">
                                    <h2 class="role_section_name">Import Host</h2>
                                    <div class="col-md-5 col-sm-6">
                                        <label>Import File:</label>
                                        <dropzone id="myVueDropzone7" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
                                    </div>
                                    <div class="col-md-7 col-sm-6">
                                        <label>Dublicate:</label>
                                        <div class="form-group">
                                            <div class="radio radio-success">
                                                <input id="radio-1" class="radio-custom" name="duplicates" type="radio" checked>
                                                <label for="radio-1" class="radio-custom-label">Ignore</label>
                                            </div>
                                        </div>
                                        <div class="form-group m-top-minus-25">
                                            <div class="radio radio-success">
                                                <input id="radio-2" class="radio-custom" name="duplicates" type="radio">
                                                <label for="radio-2" class="radio-custom-label">Delete</label>
                                            </div>
                                        </div>
                                        <div class="button_set little-space">
                                            <a class="btn btn-primary mini">
                                                Show Example
                                            </a>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="button_set col-md-12 col-sm-12">
                                        <a class="btn btn-primary mini">
                                            Upload
                                        </a>
                                    </div>
                                    <div class="clearfix"></div>
                                </section>
                            </tab>
                            <tab label="Export Host" class="" icon="dnl_icon dnl_arrow-point-to-right">
                                <section class="role_section">
                                    <h2 class="role_section_name">Export Host</h2>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Data Format:</label>
                                            <select2 :options="options1" v-model="data_format"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group m-top-33">
                                            <div class="checkbox checkbox-success">
                                                <input id="status" name="enable_rep_grouping" type="checkbox">
                                                <label for="enable_rep_grouping">With headers row</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group">
                                            <label>Header Text:</label>
                                            <textarea v-model="header_text" class="form-control" placeholder="Enter Header Text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group">
                                            <label>Footer Text:</label>
                                            <textarea v-model="footer_text" class="form-control" placeholder="Enter Footer Text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #1:</label>
                                            <select2 :options="options1" v-model="column_1"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #2:</label>
                                            <select2 :options="options1" v-model="column_2"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #3:</label>
                                            <select2 :options="options1" v-model="column_3"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #4:</label>
                                            <select2 :options="options1" v-model="column_4"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #5:</label>
                                            <select2 :options="options1" v-model="column_5"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #6:</label>
                                            <select2 :options="options1" v-model="column_6"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #7:</label>
                                            <select2 :options="options1" v-model="column_7"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #8:</label>
                                            <select2 :options="options1" v-model="column_8"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #9:</label>
                                            <select2 :options="options1" v-model="column_9"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #10:</label>
                                            <select2 :options="options1" v-model="column_10"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #11:</label>
                                            <select2 :options="options1" v-model="column_11"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #12:</label>
                                            <select2 :options="options1" v-model="column_12"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #13:</label>
                                            <select2 :options="options1" v-model="column_13"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #14:</label>
                                            <select2 :options="options1" v-model="column_14"></select2>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="button_set center-block text-center">
                                        <a class="btn btn-primary mini">
                                            Download
                                        </a>
                                    </div>
                                </section>
                            </tab>
                            <tab label="Import Action" class="" icon="dnl_icon dnl_arrow-point-to-right">
                                <section class="role_section">
                                    <h2 class="role_section_name">Import Action</h2>
                                    <div class="col-md-5 col-sm-6">
                                        <label>Import File:</label>
                                        <dropzone id="myVueDropzone5" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
                                    </div>
                                    <div class="col-md-7 col-sm-6">
                                        <label>Dublicate:</label>
                                        <div class="form-group">
                                            <div class="radio radio-success">
                                                <input id="radio-1" class="radio-custom" name="duplicates" type="radio" checked>
                                                <label for="radio-1" class="radio-custom-label">Ignore</label>
                                            </div>
                                        </div>
                                        <div class="form-group m-top-minus-25">
                                            <div class="radio radio-success">
                                                <input id="radio-2" class="radio-custom" name="duplicates" type="radio">
                                                <label for="radio-2" class="radio-custom-label">Delete</label>
                                            </div>
                                        </div>
                                        <div class="button_set little-space">
                                            <a class="btn btn-primary mini">
                                                Show Example
                                            </a>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="button_set col-md-12 col-sm-12">
                                        <a class="btn btn-primary mini">
                                            Upload
                                        </a>
                                    </div>
                                    <div class="clearfix"></div>
                                </section>
                            </tab>
                            <tab label="Export Action" class="" icon="dnl_icon dnl_arrow-point-to-right">
                                <section class="role_section">
                                    <h2 class="role_section_name">Export Action</h2>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Data Format:</label>
                                            <select2 :options="options1" v-model="data_format"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group m-top-33">
                                            <div class="checkbox checkbox-success">
                                                <input id="status" name="enable_rep_grouping" type="checkbox">
                                                <label for="enable_rep_grouping">With headers row</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group">
                                            <label>Header Text:</label>
                                            <textarea v-model="header_text" class="form-control" placeholder="Enter Header Text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group">
                                            <label>Footer Text:</label>
                                            <textarea v-model="footer_text" class="form-control" placeholder="Enter Footer Text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #1:</label>
                                            <select2 :options="options1" v-model="column_1"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #2:</label>
                                            <select2 :options="options1" v-model="column_2"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #3:</label>
                                            <select2 :options="options1" v-model="column_3"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #4:</label>
                                            <select2 :options="options1" v-model="column_4"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #5:</label>
                                            <select2 :options="options1" v-model="column_5"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #6:</label>
                                            <select2 :options="options1" v-model="column_6"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #7:</label>
                                            <select2 :options="options1" v-model="column_7"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #8:</label>
                                            <select2 :options="options1" v-model="column_8"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #9:</label>
                                            <select2 :options="options1" v-model="column_9"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #10:</label>
                                            <select2 :options="options1" v-model="column_10"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #11:</label>
                                            <select2 :options="options1" v-model="column_11"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #12:</label>
                                            <select2 :options="options1" v-model="column_12"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #13:</label>
                                            <select2 :options="options1" v-model="column_13"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #14:</label>
                                            <select2 :options="options1" v-model="column_14"></select2>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="button_set center-block text-center">
                                        <a class="btn btn-primary mini">
                                            Download
                                        </a>
                                    </div>
                                </section>
                            </tab>
                            <tab label="Import Digit Mapping" class="" icon="dnl_icon dnl_arrow-point-to-right">
                                <section class="role_section">
                                    <h2 class="role_section_name">Import Digit Mapping</h2>
                                    <div class="col-md-5 col-sm-6">
                                        <label>Import File:</label>
                                        <dropzone id="myVueDropzone6" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
                                    </div>
                                    <div class="col-md-7 col-sm-6">
                                        <label>Dublicate:</label>
                                        <div class="form-group">
                                            <div class="radio radio-success">
                                                <input id="radio-1" class="radio-custom" name="duplicates" type="radio" checked>
                                                <label for="radio-1" class="radio-custom-label">Ignore</label>
                                            </div>
                                        </div>
                                        <div class="form-group m-top-minus-25">
                                            <div class="radio radio-success">
                                                <input id="radio-2" class="radio-custom" name="duplicates" type="radio">
                                                <label for="radio-2" class="radio-custom-label">Delete</label>
                                            </div>
                                        </div>
                                        <div class="button_set little-space">
                                            <a class="btn btn-primary mini">
                                                Show Example
                                            </a>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="button_set col-md-12 col-sm-12">
                                        <a class="btn btn-primary mini">
                                            Upload
                                        </a>
                                    </div>
                                    <div class="clearfix"></div>
                                </section>
                            </tab>
                            <tab label="Export Digit Mapping" class="" icon="dnl_icon dnl_arrow-point-to-right">
                                <section class="role_section">
                                    <h2 class="role_section_name">Export Digit Mapping</h2>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Data Format:</label>
                                            <select2 :options="options1" v-model="data_format"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group m-top-33">
                                            <div class="checkbox checkbox-success">
                                                <input id="status" name="enable_rep_grouping" type="checkbox">
                                                <label for="enable_rep_grouping">With headers row</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group">
                                            <label>Header Text:</label>
                                            <textarea v-model="header_text" class="form-control" placeholder="Enter Header Text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group">
                                            <label>Footer Text:</label>
                                            <textarea v-model="footer_text" class="form-control" placeholder="Enter Footer Text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #1:</label>
                                            <select2 :options="options1" v-model="column_1"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #2:</label>
                                            <select2 :options="options1" v-model="column_2"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #3:</label>
                                            <select2 :options="options1" v-model="column_3"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #4:</label>
                                            <select2 :options="options1" v-model="column_4"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #5:</label>
                                            <select2 :options="options1" v-model="column_5"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #6:</label>
                                            <select2 :options="options1" v-model="column_6"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #7:</label>
                                            <select2 :options="options1" v-model="column_7"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #8:</label>
                                            <select2 :options="options1" v-model="column_8"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #9:</label>
                                            <select2 :options="options1" v-model="column_9"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #10:</label>
                                            <select2 :options="options1" v-model="column_10"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #11:</label>
                                            <select2 :options="options1" v-model="column_11"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #12:</label>
                                            <select2 :options="options1" v-model="column_12"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #13:</label>
                                            <select2 :options="options1" v-model="column_13"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #14:</label>
                                            <select2 :options="options1" v-model="column_14"></select2>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="button_set center-block text-center">
                                        <a class="btn btn-primary mini">
                                            Download
                                        </a>
                                    </div>
                                </section>
                            </tab>
                        </tabs>
                        <div class="button_set relative">
                            <a class="btn btn-primary mini">
                                Save
                            </a>
                            <a class="btn btn-default mini">
                                Reset
                            </a>
                        </div>
                        <div class="clearfix"></div>
					</tab>

				</tabs>
			</div>
		</div>
	</div>
</template>

<script>   
const vTabs = require('vue!../main_components/tabs.vue'),
	vTab = require('vue!../main_components/tab.vue'),
	vSelect = require('vue!../main_components/select.vue'),
	Pagination = require('vue!../main_components/pagination.vue'),
	Dropzone = require('vue!../main_components/dropzone.vue'),
	confirmmodal = require('vue!../main_components/confirm_delete.vue'),
	multiselect = require('multiselect');
import api from '../../api'
import auth from '../../auth'
import { mapActions } from 'vuex'

module.exports = {
	name: 'client_new',
	components: {
		Dropzone,
		'tabs': vTabs,
		'tab': vTab,
		'select2': vSelect,
		'pagination': Pagination,
		'confirm': confirmmodal,
		'multiselect': multiselect
	},
	props: ['editingclient', 'id', 'info_type'],
	data: function () {
		return {
            egress_checker: false,
            ingress_checker: false,
            client_temp: [],
            currency_options: [],
            low_bal_send_type: '0',
            low_bal_send_type_options: [
                { id: 'daily', text: 'Daily' },
                { id: 'hourly', text: 'Hourly' },
            ],
            daily_send_time: '0',
            daily_send_time_options: [
                { id: '0', text: '00:00' },
				{ id: '1', text: '01:00' },
				{ id: '2', text: '02:00' },
				{ id: '3', text: '03:00' },
				{ id: '4', text: '04:00' },
				{ id: '5', text: '05:00' },
				{ id: '6', text: '06:00' },
				{ id: '7', text: '07:00' },
				{ id: '8', text: '08:00' },
				{ id: '9', text: '09:00' },
				{ id: '10', text: '10:00' },
				{ id: '11', text: '11:00' },
				{ id: '12', text: '12:00' },
                { id: '13', text: '13:00' },
				{ id: '14', text: '14:00' },
				{ id: '15', text: '15:00' },
				{ id: '16', text: '16:00' },
				{ id: '17', text: '17:00' },
				{ id: '18', text: '18:00' },
				{ id: '19', text: '19:00' },
				{ id: '20', text: '20:00' },
				{ id: '21', text: '21:00' },
				{ id: '22', text: '22:00' },
				{ id: '23', text: '23:00' },
            ],
            low_bal_send_to: '0',
            low_bal_send_to_options: [
                { id: '0', text: 'Owner\'s Billing Contact' },
                { id: '1', text: 'Partner\'s Billing Contact' },
                { id: '2', text: 'Both' },
            ],
			egressPageOne: {
                currentPage: 1,
                totalPages: 10,
                cntpage: 10
            },
            ingressPageOne: {
                currentPage: 1,
                totalPages: 10,
                cntpage: 10
            },
			rate_value_selected: 0,
			rate_value_options: [
				{ id: 0, text: 'Actual Value' },
				{ id: 1, text: 'Average Value' }
			],
			decimal_selected: 0,
			decimal_options: [
				{ id: 0, text: '1' },
				{ id: 1, text: '2' },
				{ id: 2, text: '3' },
				{ id: 3, text: '4' },
				{ id: 4, text: '5' },
				{ id: 5, text: '6' }
			],
			invoice_format_selected: 0,
			invoice_format_options: [
				{ id: 0, text: 'PDF' },
				{ id: 1, text: 'Excel' },
				{ id: 2, text: 'HTML' }
			],
			payment_term_selected: 0,
			payment_term_options: [], // Options will be added using fetchPaymentTerms()
			scc_type_selected: 0,
			scc_type_options: [
				{ id: 0, text: 'meeting the short duration defined neighboring' },
				{ id: 1, text: 'that exceed the defined percentage' }
			],
			recipient_selected: 0, // add to request body once the real name on API is defined
			recipient_options: [
				{ id: 0, text: 'Partner Billing' },
				{ id: 1, text: 'My Billing' },
				{ id: 2, text: 'Both' }
			],
			time_zone_selected: 0,
			time_zone_options: [
				{ id: 0, text: '+12:00' },
				{ id: 1, text: '+11:00' },
				{ id: 2, text: '+10:00' },
				{ id: 3, text: '+09:00' },
				{ id: 4, text: '+08:00' },
				{ id: 5, text: '+07:00' },
				{ id: 6, text: '+06:00' },
				{ id: 7, text: '+05:00' },
				{ id: 8, text: '+04:00' },
				{ id: 9, text: '+03:00' },
				{ id: 10, text: '+02:00' },
				{ id: 11, text: '+01:00' },
				{ id: 12, text: '00:00' },
				{ id: 13, text: '-01:00' },
				{ id: 14, text: '-02:00' },
				{ id: 15, text: '-03:00' },
				{ id: 16, text: '-04:00' },
				{ id: 17, text: '-05:00' },
				{ id: 18, text: '-06:00' },
				{ id: 19, text: '-07:00' },
				{ id: 20, text: '-08:00' },
				{ id: 21, text: '-09:00' },
				{ id: 22, text: '-10:00' },
				{ id: 23, text: '-11:00' },
				{ id: 24, text: '-12:00' }
			],
			sent_at_selected: 0,
			sent_at_options: [
				{ id: 0, text: '00:00 AM' },
				{ id: 1, text: '01:00 AM' },
				{ id: 2, text: '02:00 AM' },
				{ id: 3, text: '03:00 AM' },
				{ id: 4, text: '04:00 AM' },
				{ id: 5, text: '05:00 AM' },
				{ id: 6, text: '06:00 AM' },
				{ id: 7, text: '07:00 AM' },
				{ id: 8, text: '08:00 AM' },
				{ id: 9, text: '09:00 AM' },
				{ id: 10, text: '10:00 AM' },
				{ id: 11, text: '11:00 AM' },
				{ id: 12, text: '12:00 PM' },
				{ id: 13, text: '13:00 PM' },
				{ id: 14, text: '14:00 PM' },
				{ id: 15, text: '15:00 PM' },
				{ id: 16, text: '16:00 PM' },
				{ id: 17, text: '17:00 PM' },
				{ id: 18, text: '18:00 PM' },
				{ id: 19, text: '19:00 PM' },
				{ id: 20, text: '20:00 PM' },
				{ id: 21, text: '21:00 PM' },
				{ id: 22, text: '22:00 PM' },
				{ id: 23, text: '23:00 PM' }
			],
			status_selected: 1,

            is_unlimited: false,

			is_prepay_selected: 1,
			is_prepay_options: [
				{ id: 1, text: 'Prepaid' },
				{ id: 2, text: 'Postpaid' },
			],
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
			client_name: '',
			mode: '1',
			currency: '1',
			test_credit: '',
			min_profitability: '',
			cps_limit: 0,
			call_limit: '',
			company_name: '',
			main_email: '',
			noc_email: '',
			billing_email: '',
			rates_email: '',
			address: '',
			tax_id: '',
			rate_delivery_email: '',
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
				{ id: 1, text: 'Active' },
				{ id: 2, text: 'Inactive' },
			],

			mode_options: [
				{ id: 1, text: 'Prepaid' },
				{ id: 2, text: 'Postpaid' },
			],
            low_balance_config: {
                daily_send_time: 0,
                actual_notify_balance: 0,
                percentage_notify_balance: 0,
                send_time_type: "daily",
                daily_send_time: 0,
                disable_trunks_days: 0,
                duplicate_send_days: 0,
                send_to: 0,
                is_notify: true,
                value_type: "Actual Balance",
                duplicate_days: 0,
            },
			emptyClient: {
                is_unlimited: false,
				password: '',
				login: '',
				carrier_name: '',
				test_credit: '',
				cps_limit: 0,
				call_limit: 0,
				company_name: '',
				email: '',
				noc_email: '',
				billing_email: '',
				rate_email: '',
				rate_delivery_email: '',
				address: '',
				tax: 0, // tax_id
				account_detail: '',
				is_send_trunk_update: false, // send_trunk_update
				is_show_daily_usage: false, // daily_usage_summary
				non_zero_invoice_only: false,
				is_daily_balance_notification: false,
				daily_cdr_generation: false,
				profit_margin: 0,
				profit_type: 'percentage',
				scc_percent: 0,
				scc_below: 0,
				scc_charge: 0,

				// Auto invoice
				include_tax: false,
				auto_send_invoice: false,
				send_invoice_as_link: false,
				show_daily_usage: false,
				include_short_call_charge: false,
				show_payment_summary: false,
				show_detail_by_trunk: false,
				show_code_summary: false,
				show_code_name_summary: false,
				show_country_summary: false,
				inlcude_cdr_in_email: false,
				show_jurisdiction_detail: false,

				// Carrier Self-service Portal
				is_panel_accountsummary: false,
				is_panel_ratetable: false,
				is_panel_trunks: false,
				is_panel_products: false,
				is_panel_balance: false,
				is_panel_paymenthistory: false,
				is_panel_onlinepayment: false,
				is_panel_invoices: false,
				is_panel_cdrslist: false,
				is_panel_summaryreport: false,
				is_panel_sippacket: false,

                // no in current UI
                auto_summary_period: '0',
                attach_cdrs_list: false,
                low_balance_notification_time_type: '0',
                auto_summary_group_by: 'By Country',
                show_account_summary: false,
                auto_summary_not_zero: false,
                auto_summary_hour: '0',
                currency: 0,
                zero_balance_notice: false,
                credit_limit: 0,
                low_balance_notice: false,
                notify_client_balance_type: '0',
                is_panelaccess: false,
                cdr_format: 'Excel',
                show_trunk_summary: false,
                is_auto_summary: false,
                daily_cdr_generation_zone: '',
                phone: 0,


				//All properties below are added before sending requests on getClientForRequest()
				// payment_term: null,
				// is_prepay: null,
				// status: null,
				// decimal: null,
				// time_zone: null, // This property has two fields refering to it. Verify which to delete.
				// cdr_format: null, //removed
				// rate_value: null,
				// format: null,
				// scc_type: null
			},
			client: {},
		}
	},
	created() {
		if (this.editingclient) {
			this.fetchClient()
			this.fetchTrunks()
		} else {
			this.resetClient()
		}
		this.fetchPaymentTerms()
        this.fetchCurrency()
	},
    watch: {
        'is_prepay_selected': function () {
            console.log("is_prepay_selected");
            console.log(this.is_prepay_selected);
        }
    },
	methods: {
		...mapActions({
            setAsyncConfirm: 'async_confirm/setAsyncConfirm',
			setMessage: 'app_message/setAppMessage'
        }),
        edit_trunk(id, type) {

        },
        toggleChecker (type) {
            console.log('Toggle activated')
            var state;
            var trunks = [];
            if(type == 'egress') {
                state = this.egress_checker;
                trunks = this.egress_lists
            }
            else if(type == 'ingress') {
                state = this.ingress_checker;
                trunks = this.ingress_lists
            }
            const trunksLength = trunks.length
            for (let i = 0; i < trunksLength; i++) {
                trunks[i].status = state
            }
        },
        getTrunkIndex (id, type) {
            if(type == 'egress')
                return _.findIndex(this.egress_lists, elem => elem.resource_id === id)
            if(type == 'ingress')
                return _.findIndex(this.ingress_lists, elem => elem.resource_id === id)
        },
        deleteTrunk(id, no_message, type) {
            var url;
            console.log(this.egress_lists);
            if(type == 'egress') {
                url = api.getEndpointUrl() + '/v1/egress_trunk/' + id
                console.log(this.egress_lists)
            }
            else if (type == 'ingress') {
                url = api.getEndpointUrl() + '/v1/ingress_trunk/' + id
                console.log(this.ingress_lists)
            }
            this.$http.delete(url)
            .then(response => {
                if (response.body.success) {
                    let index = this.getTrunkIndex(id, type)
                    if (~index) {
                        if(type == 'egress') {
                            console.log("111")
                            var temp = this.egress_lists;
                            console.log(temp)
                            this.egress_lists.splice(index, 1)
                            console.log(this.egress_lists)
                        }
                        else if(type == 'ingress') {
                            console.log("222")
                            console.log(this.ingress_lists)
                            this.ingress_lists.splice(index, 1)
                            console.log(this.ingress_lists)
                        }
                    }
                    if(no_message == false) {
                        this.setMessage('Trunk was removed successfully')
                        var vm = this;
                        setTimeout(function () {
							vm.$router.go(vm.$router.currentRoute);
						}, 3000);
                    }
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        askDeleteConfirm(id, type) {
            this.setAsyncConfirm('Are you sure you want to delete this trunk')
            .then(result => {
                if (result.accepted) {
                    this.deleteTrunk(id, false, type)
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        deleteSelected (type) {
            // check selected items count for deleting
            var selected_count = 0;
            var trunks = []
            var checker;
            if(type == 'egress') {
                checker = this.egress_checker
                trunks = this.egress_lists
            }
            else if(type == 'ingress') {
                checker = this.ingress_checker
                trunks = this.ingress_lists
            }
            trunks.forEach(function (trunk, i) {
                if (trunk.status == true) {
                    selected_count += 1;
                }
            });
            if(selected_count == 0) {
                this.setMessage({
                    message: 'The trunk has been not selected!',
                    type: 'error'
                })
                return;
            }
            // delete selected items
            this.setAsyncConfirm('Are you sure you want to delete this selected trunks')
            .then(result => {
                if (result.accepted) {
                    var vm = this;
                    trunks.forEach(function (trunk, i) {
                        if (trunk.status == true) {
                            var no_message = true;
                            vm.deleteTrunk(trunk.resource_id, no_message, type)
                        }
                    });
                    checker = false;
                    this.setMessage('Selected Trunks were removed successfully')
                    setTimeout(function () {
                        vm.$router.go(vm.$router.currentRoute);
                    }, 3000);
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        deleteAll(type) {
            this.setAsyncConfirm('Are you sure you want to delete all this trunk')
				.then(result => {
					if (result.accepted) {
						var vm = this;
                        var no_message = true;
                        var trunks = [];
                        if(type == 'egress') {
                            trunks = this.egress_lists
                        }
                        else if(type == 'ingress') {
                            trunks = this.ingress_lists
                        }
                        console.log(trunks);
                        if(type == 'egress') {
                            trunks.forEach(function (trunk, i) {
                                vm.deleteTrunk(trunk.resource_id, no_message, type)
                            });
                        }
                        else if(type == 'ingress') {
                            trunks.forEach(function (trunk, i) {
                                vm.deleteTrunk(trunk.resource_id, no_message, type)
                            });
                        }
                        this.setMessage('All Trunks were removed successfully')
                        setTimeout(function () {
                            vm.$router.go(vm.$router.currentRoute);
                        }, 3000);
                        
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
                        currency.id = temp.currency_id;
                        currency.text = temp.code;
                        self.currency_options.push(currency);
                        if (i == 0)
                            self.client.currency = currency.id;
                    });
                    console.log(this.currency_options);
                    
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
		fetchTrunks() {
			var page = this.egressPageOne.currentPage - 1;
			var per_page = this.egressPageOne.cntpage;
			console.log("page => " + page + " , per_page => " + per_page);
			

			this.$http.get(api.getEndpointUrl() + "/v1/carrier/"+this.id+"/egress_trunk/list?page=" + page + "&per_page=" + per_page + "&order_by=&order_dir=desc",
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(function (response) {
					this.loading = false;
					//todo: check success flag? validation errors?
					var egress_lists = response.body.payload.items;
					this.egress_lists = egress_lists;
					console.log("egress_lists");
					console.log(this.egress_lists);
					var total_page = response.body.payload.total;
					this.egressPageOne.currentPage = response.body.payload.page + 1;
					this.egressPageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
					console.log("total pages => " + this.egressPageOne.totalPages);
				}, function (error) {
					this.loading = false;
					console.log(error);
				});

			page = this.ingressPageOne.currentPage - 1;
			per_page = this.ingressPageOne.cntpage;
			console.log("page => " + page + " , per_page => " + per_page);
			this.loading = true;

			this.$http.get(api.getEndpointUrl() + "/v1/carrier/"+this.id+"/ingress_trunk/list?page=" + page + "&per_page=" + per_page + "&order_by=&order_dir=desc",
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function (response) {
				this.loading = false;
				//todo: check success flag? validation errors?
				var ingress_lists = response.body.payload.items;
				console.log("ingress_lists");
				console.log(ingress_lists);
				this.ingress_lists = ingress_lists;
				var total_page = response.body.payload.total;
				this.ingressPageOne.currentPage = response.body.payload.page + 1;
				this.ingressPageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
				console.log("total pages => " + this.ingressPageOne.totalPages);
			}, function (error) {
				this.loading = false;
				console.log(error);
			});
		},
		ingressPageOneChanged(pageNum) {
            this.ingressPageOne.currentPage = pageNum;
            var page = this.ingressPageOne.currentPage - 1;
            var per_page = this.ingressPageOne.cntpage;
            console.log("page => " + page + " , per_page => " + per_page);
            this.loading = true;

            this.$http.get(api.getEndpointUrl() + "/v1/trunk/ingress/list?page=" + page + "&per_page=" + per_page + "&order_by=&order_dir=desc",
                {
                    headers: {
                        "X-Auth-Token": auth.getToken()
                    }
                }).then(function (response) {
                    this.loading = false;
                    //todo: check success flag? validation errors?
                    var ingress_lists = response.body.payload.items;
                    console.log(ingress_lists);
                    this.ingress_lists = ingress_lists;
                    var total_page = response.body.payload.total;
                    this.ingressPageOne.currentPage = response.body.payload.page + 1;
                    this.ingressPageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
                    console.log("total pages => " + this.ingressPageOne.totalPages);
                }, function (error) {
                    this.loading = false;
                    console.log(error);
                });
        },
		submitDeleteIngress: function () {
			var vm = this;
			this.showIngressModal = false;

			this.selected_ingress_ids.forEach(function (item, i) {
				var trunkid = item;
				if (trunkid == 0) {
					vm.setMessage({
                        message:'The trunk has been not selected!',
                        type:'error'
                    });
				}
				else {
					vm.loading = true;
					vm.resource = vm.$resource(api.getEndpointUrl() + '/v1/ingress_trunk/' + trunkid);
					vm.resource.delete({ resource_id: trunkid }).then(function (response) {
						vm.loading = false;
						let index = _.findIndex(vm.egress_lists, elem => elem.resource_id  === trunkid)
						vm.egress_lists.splice(index, 1)
						vm.setMessage('The trunk have been deleted!')
					});
				}
			});
		},
		'success': function (file) {
            console.log('A file was successfully uploaded')
        },
		egressPageOneChanged(pageNum) {
            this.egressPageOne.currentPage = pageNum;
            var page = this.egressPageOne.currentPage - 1;
            var per_page = this.egressPageOne.cntpage;
            console.log("page => " + page + " , per_page => " + per_page);
            this.loading = true;

            this.$http.get(api.getEndpointUrl() + "/v1/trunk/egress/list?page=" + page + "&per_page=" + per_page + "&order_by=&order_dir=desc",
            {
                headers: {
                    "X-Auth-Token": auth.getToken()
                }
            }).then(function (response) {
                this.loading = false;
                //todo: check success flag? validation errors?
                var egress_lists = response.body.payload.items;
                console.log(egress_lists);
                this.egress_lists = egress_lists;
                var total_page = response.body.payload.total;
                this.egressPageOne.currentPage = response.body.payload.page + 1;
                this.egressPageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
                console.log("total pages => " + this.egressPageOne.totalPages);
            }, function (error) {
                this.loading = false;
                console.log(error);
            });
        },
		submitDeleteEgress: function () {
			var vm = this;
			this.showEgressModal = false;

			this.selected_egress_ids.forEach(function (item, i) {
				var trunkid = item;
				if (trunkid == 0) {
					vm.setMessage({
                        message:'The trunk has been not selected!',
                        type:'error'
                    });
				}
				else {
					vm.loading = true;
					vm.resource = vm.$resource(api.getEndpointUrl() + '/v1/egress_trunk/' + trunkid);
					vm.resource.delete({ resource_id: trunkid }).then(function (response) {
						vm.loading = false;
						let index = _.findIndex(vm.egress_lists, elem => elem.resource_id  === trunkid)
						vm.egress_lists.splice(index, 1)
						vm.setMessage('The trunk have been deleted!')
					});
				}
			});
        },
        getCurrencyIndex (id) {
            return _.findIndex(this.currency_options, elem => elem.id === id)
        },
        getClientForEditRequest() {
            const client_temp = Object.assign({}, this.client_temp)
            client_temp.company = this.client.company_name
            client_temp.name = this.client.carrier_name
            client_temp.call_limit = this.client.call_limit
            client_temp.auto_invoice_type = "buy"
            client_temp.report_frequency = 0
            client_temp.profit_type = this.client.profit_type
            client_temp.trunk_update_alert = this.client.is_send_trunk_update
            client_temp.one_time_report_time = 0
            client_temp.short_call_duration = 0
            console.log(this.client.currency)
            if(this.client.currency !== '0') {
                var index = this.getCurrencyIndex(this.client.currency)
                if (~index) {
                    client_temp.currency_name = this.currency_options[index].text
                }
            }
            console.log(client_temp.currency_name)
            client_temp.daily_cdr_delivery = this.client.daily_cdr_generation
            client_temp.daily_usage_summary = false
            client_temp.main_email = this.client.email
            client_temp.daily_balance_summary = this.client.is_daily_balance_notification
            client_temp.short_call_charge_exceed_only = false
            client_temp.test_credit = this.client.test_credit
            client_temp.short_call_percent = this.client.scc_percent
            client_temp.credit_limit = 0
            client_temp.daily_usage_on_non_zero = this.client.is_show_daily_usage
            client_temp.rate_email = this.client.rate_email
            if(this.client.cps_limit !== 0)
                client_temp.cps_limit = this.client.cps_limit
            if(this.client.tax !== 0)
                client_temp.tax = this.client.tax
            if(this.client.profit_margin !== 0)
                client_temp.profit_margin = this.client.profit_margin
            client_temp.short_call_charge = this.client.scc_charge
            client_temp.billing_email = this.client.billing_email
            client_temp.is_active = this.client.status
            client_temp.account_detail = this.client.account_detail
            client_temp.daily_usage_group_by = "By Country"
            client_temp.low_balance_alert = this.low_balance_config.value_type === 'Actual Balance'? true: false
            client_temp.address = this.client.address
            client_temp.phone = this.client.phone
            client_temp.noc_email = this.client.noc_email
            client_temp.is_prepay = this.is_prepay_selected === 1? true: false
            client_temp.is_unlimited = this.client.is_unlimited;
            return client_temp;
        },
		getClientForCreateRequest() {
			// This method "extracts" the text of the selected option.
			// "sent_at" and "recipient" need to be added here (at the moment they
			// don't exist on API)
			const client = Object.assign({}, this.client)
			client.is_prepay = this.is_prepay_selected === 1? true: false
			client.status = this.status_selected === 1? true: false
			client.decimal = this.decimal_options[this.decimal_selected].text
			client.time_zone = this.time_zone_options[this.time_zone_selected].text
			// client.cdr_format = this.cdr_format_options[this.cdr_format_selected].text
			client.rate_value = this.rate_value_options[this.rate_value_selected].text
			client.format = this.invoice_format_options[this.invoice_format_selected].text
			client.scc_type = Number(this.scc_type_selected)
			if (this.payment_term_options.length) {
				client.payment_term = this.payment_term_options[this.payment_term_selected].text
            }
            if(client.test_credit == '')
                delete client.test_credit;
            if(client.login == '')
                delete client.login;
            if(client.password == '')
                delete client.password;

            client.low_balance_config = this.low_balance_config;
            client.show_code_summary = false;
			return client
		},
		createNewClient() {
			console.log('Attempting to create new client')
			var url;
			var reqBody;
            if(this.editingclient) {
                url = api.getEndpointUrl() + '/v1/carrier/' + this.id;
                reqBody = this.getClientForEditRequest();
                console.log('Request Body:', reqBody);
                this.$http.patch(url, reqBody)
                    .then(response => {
                        if (response.body.success) {
                            this.setMessage('Carrier was changed successfully');
                            var thisvm = this;
                            setTimeout(function(){
                                thisvm.$router.push('/management/carrier');
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
                url = api.getEndpointUrl() + '/v1/carrier/full/create'
                reqBody = this.getClientForCreateRequest();
                console.log("reqBody:", reqBody);
			    this.$http.post(url, reqBody)
				.then(response => {
					if (response.body.success) {
                        this.setMessage('Client was created successfully')
                        var thisvm = this;
                        setTimeout(function(){
                            thisvm.setAsyncConfirm('Do you want to send email')
                            .then(result => {
                                if (result.accepted) {
                                    // send email to client
                                    console.log("send email to client");

                                    // back list page
                                    thisvm.$router.push('/management/carrier');
                                }
                            })
                            .catch(error => {
                                console.log(error)
                            })
                            
                        }, 3000);
					}
				})
				.catch(error => {
                    console.log(error);
                    var msg = '';
                    if(error.data.errors !== undefined)
                        msg = error.data.errors;
                    else if(error.data.error !== undefined)
                        msg = error.data.error.message;
                    this.setMessage({
						message: msg,
						type: 'error'
					})
                })
            }
		},
		validateNewClient() {
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
					vm.createNewClient();
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
		fetchPaymentTerms() {
			const url = api.getEndpointUrl() + '/v1/config/payment_term/list'
			this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						// this.payment_term_options = body.payload.items((elem, index) => {
						// 	return { id: index, text: elem.name }
						// })
						var self = this;
						body.payload.items.forEach(function (item, i) {
							var payment_term = {};
							payment_term.id = item.payment_term_id;
							payment_term.text = item.name;
							self.payment_term_options.push(payment_term);
						});
						console.log(this.payment_term_options);
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
		resetClient() {
			this.client = Object.assign({}, this.emptyClient)
		},
		organizeClientData(data) {
            console.log(data);
			// This function fixes naming differences between carrierLong and carrier
			this.client = {
				password: '', // doesn't exist in /carrier/{id}
				name: '', // doesn't exist in /carrier/{id}
				carrier_name: data.name,
				test_credit: data.test_credit,
				status: data.is_active,
				// test_credit: data.test_credit,
				cps_limit: data.cps_limit,
				call_limit: data.call_limit,
				company_name: data.company,
				email: data.main_email,
				noc_email: data.noc_email,
				billing_email: data.billing_email,
				rate_email: data.rate_email,
				rate_delivery_email: '', // doesn't exist in /carrier/{id}
				address: data.address,
				tax: '', // doesn't exist in /carrier/{id}
				account_detail: data.account_detail,
				is_send_trunk_update: data.trunk_update_alert,
				time_zone: '', // doesn't exist in /carrier/{id}
				is_show_daily_usage: data.daily_usage_on_non_zero,
				non_zero_invoice_only: false, // doesn't exist in /carrier/{id}
				is_daily_balance_notification: data.daily_balance_summary,
				daily_cdr_generation: data.daily_cdr_delivery,
				// cdr_format: '', // doesn't exist in /carrier/{id}
				payment_term: '', // doesn't exist in /carrier/{id}
				decimal: '', // doesn't exist in /carrier/{id}
				rate_value: '', // doesn't exist in /carrier/{id}
				profit_margin: '', // doesn't exist in /carrier/{id}
				profit_type: 'percentage', // doesn't exist in /carrier/{id}
				is_prepay: data.is_prepay,
                is_unlimited: data.is_unlimited,
			}
			this.is_prepay_selected = this.client.is_prepay ? 1 : 2;
			this.status_selected = this.client.status ? 1 : 2;
		},
		fetchClient() {
			const url = api.getEndpointUrl() + '/v1/carrier/' + this.id
			this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						this.organizeClientData(body.payload)
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
	},
	mounted: function () {
		$('#user_detail_fields').multiSelect({
			selectableHeader: "<div class='custom-header'>Unappropriated</div>",
			selectionHeader: "<div class='custom-header'>Unappropriated</div>"
		});
	}
}
</script>

<style>
span.input-group-addon {
	background: #f7f8f9;
	border-color: #dee0e3;
	padding: 10px 15px;
	box-shadow: 0px 2px 7px 0px rgba(184, 187, 196, 0.2);
}

.input-group-btn .btn {
	background: #f7f8f9;
	height: 38px;
	border: 1px solid #dee0e3;
}

.dropdown-menu.dropdown-menu-right a {
	display: block;
	padding: 5px 10px 6px 12px;
	border-bottom: 1px solid #dee0e3;
	color: #222;
	line-height: 25px;
	cursor: pointer;
}

.dropdown-menu.dropdown-menu-right a:last-child {
	border-bottom: 0;
}

.dropdown-menu.dropdown-menu-right a:hover {
	background: #dee0e3;
	text-decoration: none;
}

.dropdown-menu.dropdown-menu-right {
	border-color: #dee0e3;
	box-shadow: 0px 2px 7px 0px rgba(184, 187, 196, 0.2);
}

.fix-select .select2-container {
	width: 100% !important;
}

hr {
	margin-top: 10px;
	margin-bottom: 20px;
	border: 0;
	border-top: 1px solid #dee0e3;
}

input.form-control.small {
	width: 50px;
	display: inline-block;
	margin: 0 5px;
}

.small_select {
	display: inline-block;
	width: 200px;
	vertical-align: middle;
}

.small_select .select2-container {
	width: 100% !important;
}

p.inline {
	display: inline;
}

p.inline.m-top-10 input.form-control.small {
	margin-top: 10px;
}

a.btn.btn-primary.medium.pull-right {
	width: 240px;
	padding-right: 0;
}

.radio.radio-success {
	display: inline-block;
}
</style>
