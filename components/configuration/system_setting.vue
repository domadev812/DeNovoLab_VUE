<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="#">Configuration</a>
					</li>
					<li class="breadcrumb-item active">System Setting</li>
				</ol>
				<tabs>
					<tab label="System Setting" class="" icon="dnl_icon dnl_setting" selected>
						<h1 class="page-header">System Setting</h1>
						<tabs class="vertical mail_template">
							<tab label="System Logo" class="" icon="dnl_icon dnl_arrow-point-to-right" selected>
								<section class="role_section system_logo">
									<h2 class="role_section_name">System Logo</h2>
									<div class="col-md-12">
										<div class="row">
											<div class="col-md-4">
												<div class="invoice_logo">
													<label>Change Logo File:</label>
													<dropzone id="logo_dropzone" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
												</div>
											</div>
											<div class="col-md-4">
												<div class="invoice_logo">
													<label>Change Favicon File:</label>
													<dropzone id="favicon_dropzone" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
												</div>
											</div>
										</div>
									</div>
									<div class="clearfix little-space"></div>
								</section>
							</tab>
							<tab label="System Setting" class="" icon="dnl_icon dnl_arrow-point-to-right">
								<section class="role_section">
									<h2 class="role_section_name">System Setting</h2>
									<div class="col-sm-12">
										<div class="row">
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label for="username">Base Domain URL:</label>
													<!--<select2 :options="options" v-model="select"></select2>-->
													<input type="text" name="base_domain_url" v-model="base_domain_url" class="form-control" placeholder="Enter Base Domain URL">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label for="username">Command Debug Log Path:</label>
													<!--<select2 :options="options" v-model="select"></select2>-->
													<input type="text" name="command_debug_log_path" v-model="command_debug_log_path" class="form-control" placeholder="Enter Command Debug Log Path">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label for="username">Pre-load data on display:</label>
													<!--<select2 :options="options" v-model="select"></select2>-->
													<select class="selectable" v-model="preload">
														<option v-for="item in pre_load_data_options" v-bind:value="item.id">
															{{ item.text }}
														</option>
													</select>
												</div>
											</div>
											<div class="clearfix"></div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label for="username">Switch Alias:</label>
													<!--<select2 :options="options" v-model="select"></select2>-->
													<input type="text" name="switch_alias" v-model="switch_alias" class="form-control" placeholder="Enter Switch Alias">
												</div>
											</div>
											<div class="col-md-8 col-sm-12">
												<div class="form-group">
													<label>Welcome Message:</label>
													<input type="text" name="welcome_message" v-model="welcome_message" class="form-control" placeholder="Enter Welcome Message">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>System Currency:</label>
													<select class="selectable" v-model="currency">
														<option v-for="item in currency_list" v-bind:value="item.id">
															{{ item.text }}
														</option>
													</select>
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label for="max_lines">Time Zone:</label>
													<!--<select2 :options="time_zone_options" v-model="time_zone"></select2>-->
													<select class="selectable" v-model="time_zone">
														<option v-for="time_zone in time_zone_options" v-bind:value="time_zone.id">
															{{ time_zone.text }}
														</option>
													</select>
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label for="max_lines">Code Deck:</label>
													<!--<select2 :options="code_deck_list" v-model="code_deck"></select2>-->
													<select class="selectable" v-model="code_deck">
														<option v-for="item in code_deck_list" v-bind:value="item.id">
															{{ item.text }}
														</option>
													</select>
												</div>
											</div>
	
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label for="max_lines">Different Report Count:</label>
													<select class="selectable" v-model="diff_report_count">
														<option v-for="item in diff_report_count_options" v-bind:value="item.id">
															{{ item.text }}
														</option>
													</select>
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label for="max_lines">Landing Page:</label>
													<select class="selectable" v-model="landing_page">
														<option v-for="item in landing_page_options" v-bind:value="item.id">
															{{ item.text }}
														</option>
													</select>
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Inactivity Timeout:</label>
													<input type="text" name="inactivity_timeout" class="form-control" placeholder="Enter Inactivity Timeout" v-model="inactivity_timeout">
												</div>
											</div>
											<div class="clearfix"></div>
											<!-- <div class="col-md-6 col-sm-6">
												<div class="form-group m-top-33">
													<div class="checkbox checkbox-success">
														<input id="preload" name="preload" type="checkbox" v-model="preload">
														<label for="preload">Pre-load Data on Display</label>
													</div>
													<div class="checkbox checkbox-success">
														<input id="mutual_balance" name="mutual_balance" type="checkbox" v-model="mutual_balance">
														<label for="mutual_balance">Show Mutual Balance</label>
													</div>
													<div class="checkbox checkbox-success">
														<input id="require_comment" name="require_comment" type="checkbox" v-model="require_comment">
														<label for="require_comment">Require Comment Logging After Update</label>
													</div>
												</div>
											</div> -->
										</div>
									</div>
									<div class="clearfix"></div>
								</section>
							</tab>
							<tab label="System Default Timeout Setting" class="" icon="dnl_icon dnl_arrow-point-to-right">
								<section class="role_section">
									<h2 class="role_section_name">System Default Timeout Setting</h2>
									<div class="col-sm-12">
										<div class="row">
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label for="ingress_timeout">Ingress PDD Timeout:</label>
													<input type="text" name="ingress_timeout" class="form-control" v-model="ingress_timeout" placeholder="Enter Ingress PDD Timeout">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Egress PDD Timeout:</label>
													<input type="text" name="egress_timeout" class="form-control" v-model="egress_timeout" placeholder="Enter Egress PDD Timeout">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Ring Timeout:</label>
													<input type="text" name="ring_timeout" class="form-control" v-model="ring_timeout" placeholder="Enter Ring Timeout">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label for="call_timeout">Call Timeout:</label>
													<input type="text" name="call_timeout" class="form-control" v-model="call_timeout" placeholder="Enter Call Timeout">
												</div>
											</div>
										</div>
									</div>
									<div class="clearfix"></div>
								</section>
							</tab>
							<tab label="System E-mail Setting" class="" icon="dnl_icon dnl_arrow-point-to-right">
								<section class="role_section">
									<h2 class="role_section_name">System E-mail Setting</h2>
									<div class="col-sm-12">
										<div class="row">
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label for="mail_server">Mail Server / SMTP Host:</label>
													<input type="text" name="mail_server" class="form-control" v-model="mail_server" placeholder="Enter Mail Server / SMTP Host">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>SMTP Port:</label>
													<input type="text" name="smtp_port" class="form-control" v-model="smtp_port" placeholder="Enter SMTP Port">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>SMTP Username:</label>
													<input type="text" name="smtp_username" class="form-control" v-model="smtp_username" placeholder="Enter SMTP Username">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label for="max_lines">SMTP Password:</label>
													<input type="password" name="smtp_password" class="form-control" v-model="smtp_password" placeholder="Enter SMTP Password">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group m-top-33">
													<div class="checkbox checkbox-success">
														<input id="smtp_login_auth" name="smtp_login_auth" v-model="smtp_login_auth" type="checkbox">
														<label for="smtp_login_auth">SMTP Login Authentication</label>
													</div>
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>From E-mail:</label>
													<input type="email" name="from_email" class="form-control" v-model="from_email" placeholder="Enter E-mail">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>E-mail Sender Name:</label>
													<input type="text" name="email_sender_name" class="form-control" v-model="email_sender_name" placeholder="Enter E-mail Sender Name">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label for="max_lines">SMTP Secure:</label>
													<select2 :options="smtp_secure_options" v-model="smtp_secure"></select2>
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label for="send_test_to">Send Test to:</label>
													<input type="text" name="send_test_to" class="form-control" v-model="send_test_to" placeholder="Enter Send Test to">
												</div>
											</div>
										</div>
										<a class="btn btn-primary mini m-top-20">
											Test
										</a>
									</div>
									<div class="clearfix"></div>
								</section>
							</tab>
							<tab label="Notification Setting" class="" icon="dnl_icon dnl_arrow-point-to-right">
								<section class="role_section">
									<h2 class="role_section_name">Notification Setting</h2>
									<div class="col-sm-12">
										<div class="col-sm-12">
											<div class="row">
												<div class="col-md-4 col-sm-6">
													<div class="form-group">
														<label for="admin_email">System Admin Email:</label>
														<input type="email" name="admin_email" class="form-control" v-model="admin_email" placeholder="Enter System Admin Email">
													</div>
												</div>
												<div class="col-md-4 col-sm-6">
													<div class="form-group">
														<label>Finance Email:</label>
														<input type="email" name="finance_email" class="form-control" v-model="finance_email" placeholder="Enter Finance Email">
													</div>
												</div>
												<div class="col-md-4 col-sm-6">
													<div class="form-group">
														<label>NOC Email:</label>
														<input type="email" name="noc_email" class="form-control" v-model="noc_email" placeholder="Enter NOC Email">
													</div>
												</div>
												<div class="col-md-4 col-sm-6">
													<div class="form-group">
														<label for="ftp_fail_email">FTP Failure Notification Email:</label>
														<input type="email" name="ftp_fail_email" class="form-control" v-model="ftp_fail_email" placeholder="Enter FTP Failure Notification Email">
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="clearfix"></div>
								</section>
							</tab>
							<tab label="Default Billing Setting" class="" icon="dnl_icon dnl_arrow-point-to-right">
								<section class="role_section">
									<h2 class="role_section_name">Default Billing Setting</h2>
									<div class="col-sm-12">
										<div class="row">
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label for="default_billing_setting">Default Billing Setting:</label>
													<input type="email" name="default_billing_setting" class="form-control" v-model="default_billing_setting" placeholder="Enter Default Billing Setting">
												</div>
											</div>
										</div>
									</div>
									<div class="clearfix"></div>
								</section>
							</tab>
							<tab label="UI Configuration" class="" icon="dnl_icon dnl_arrow-point-to-right">
								<section class="role_section">
									<h2 class="role_section_name">UI Configuration</h2>
									<div class="col-sm-12">
										<div class="row">
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label for="us_ij_rule">Default US IJ Rule:</label>
													<select class="selectable" v-model="us_ij_rule">
														<option v-for="item in us_ij_rules" v-bind:value="item.id">
															{{ item.text }}
														</option>
													</select>
												</div>
											</div>
											<div class="col-md-8 col-sm-6">
												<div class="form-group m-top-33">
													<div class="checkbox checkbox-success">
														<input id="include_calls" name="include_calls" v-model="include_calls" type="checkbox">
														<label for="include_calls">Include Calls From Unauthorized IPs in CDR:</label>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="clearfix"></div>
								</section>
							</tab>
							<tab label="QoS Routing" class="" icon="dnl_icon dnl_arrow-point-to-right">
								<section class="role_section">
									<h2 class="role_section_name">QoS Routing</h2>
									<div class="col-sm-12">
										<div class="row">
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label for="qos_period">Qos Sample Period:</label>
													<select2 :options="qos_period_options" v-model="qos_period"></select2>
												</div>
											</div>
											<!-- <div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label for="min_call">Minimal Call Attempt Required:</label>
													<input type="text" name="min_call" class="form-control" v-model="min_call" placeholder="Enter Minimal Call Attempt">
												</div>
											</div> -->
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label for="low_call">Low Call Attempt Handling:</label>
													<select2 :options="low_call_options" v-model="low_call"></select2>
												</div>
											</div>
										</div>
									</div>
									<div class="clearfix"></div>
								</section>
							</tab>
							<tab label="Automatic Rate Processing" class="" icon="dnl_icon dnl_arrow-point-to-right">
								<section class="role_section">
									<h2 class="role_section_name">Automatic Rate Processing</h2>
									<div class="col-sm-12">
										<div class="row">
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label for="max_lines">SMTP Server:</label>
													<input type="text" name="full_name" class="form-control" placeholder="Enter SMTP Server">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label for="max_lines">SMTP Server Port:</label>
													<input type="number" name="full_name" class="form-control" placeholder="Enter SMTP Server Port">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label for="max_lines">Username:</label>
													<input type="text" name="full_name" class="form-control" placeholder="Enter User Name">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label for="max_lines">Password:</label>
													<input type="password" name="full_name" class="form-control" placeholder="Enter Password">
												</div>
											</div>
											<!-- <div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label for="max_lines">Minimal Call Attempt Required:</label>
													<input type="text" name="full_name" class="form-control" placeholder="Enter Minimal Call Attempt">
												</div>
											</div> -->
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label for="max_lines">SMTP Type:</label>
													<select2 :options="smtp_types" v-model="smtp_type"></select2>
												</div>
											</div>
										</div>
									</div>
									<div class="clearfix"></div>
								</section>
							</tab>
							<tab label="LRN Setting" class="" icon="dnl_icon dnl_arrow-point-to-right">
								<section class="role_section">
									<h2 class="role_section_name">LRN Setting</h2>
									<div class="col-sm-12">
										<div class="row">
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label for="master_lrn_ip">Master LRN IP:</label>
													<input type="text" name="master_lrn_ip" class="form-control" v-model="master_lrn_ip" placeholder="Enter Master LRN IP">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label for="master_lrn_port">Master LRN Port:</label>
													<input type="number" name="master_lrn_port" class="form-control" v-model="master_lrn_port" placeholder="Enter Master LRN Port">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label for="slave_lrn_ip">Slave LRN IP:</label>
													<input type="text" name="slave_lrn_ip" class="form-control" v-model="slave_lrn_ip" placeholder="Enter Slave LRN IP">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label for="slave_lrn_port">Slave LRN Port:</label>
													<input type="number" name="slave_lrn_port" class="form-control" v-model="slave_lrn_port" placeholder="Enter Slave LRN Port">
												</div>
											</div>
										</div>
									</div>
									<div class="clearfix"></div>
								</section>
							</tab>
							<tab label="Token Setting" class="" icon="dnl_icon dnl_arrow-point-to-right">
								<section class="role_section">
									<h2 class="role_section_name">Token Setting</h2>
									<div class="white_pad">
										<h3 class="role_section_name">PCAP Token Setting</h3>
										<div class="col-sm-12">
											<div class="row">
												<div class="table-responsive">
													<table class="table table-striped table-hover error_response">
														<thead>
															<tr>
																<th>Name</th>
																<th>IP</th>
																<th>Port</th>
																<th>Token</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td>Avetik Test</td>
																<td>7.7.7.7</td>
																<td>5060</td>
																<td class="text_area_wrapper">
																	<textarea class="form-control"></textarea>
																</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
										</div>
										<div class="clearfix"></div>
									</div>
									<div class="clearfix"></div>
									<div class="white_pad">
										<h3 class="role_section_name">CDR Token Setting</h3>
										<div class="col-sm-12">
											<div class="row">
												<div class="table-responsive">
													<table class="table table-striped table-hover error_response">
														<thead>
															<tr>
																<th>Alias</th>
																<th>Token</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td>
																	<input type="text" name="full_name" class="form-control" placeholder="Enter Alias">
																</td>
																<td class="text_area_wrapper">
																	<textarea class="form-control"></textarea>
																</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
										</div>
										<div class="clearfix"></div>
									</div>
								</section>
							</tab>
						</tabs>
						<div class="clearfix"></div>
						<div class="button_set m-top-20">
							<a class="btn btn-primary mini" @click="saveSystemSetting">
								Save
							</a>
							<a class="btn btn-default mini">
								Reset
							</a>
						</div>
						<div class="clearfix"></div>
					</tab>
	
					<tab label="Advanced" class="" icon="dnl_icon dnl_setting">
						<h1 class="page-header">Advanced</h1>
						<tabs class="vertical mail_template">
							<tab label="Database" class="" icon="dnl_icon dnl_arrow-point-to-right" selected>
								<h2 class="role_section_name">Database</h2>
								<section class="role_section">
									<h3 class="role_section_name">Default Database</h3>
									<div class="col-sm-12">
										<div class="row">
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Database Host:</label>
													<input type="text" name="db_host" class="form-control" v-model="db_host" placeholder="Enter Database Host">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Database Port:</label>
													<input type="text" name="db_port" class="form-control" v-model="db_port" placeholder="Enter Database Port">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Database Name:</label>
													<input type="text" name="db_name" class="form-control" v-model="db_name" placeholder="Enter Database Name">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Database User:</label>
													<input type="text" name="db_user" class="form-control" v-model="db_user" placeholder="Enter Database User">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Database Password:</label>
													<input type="password" name="db_password" class="form-control" v-model="db_password" placeholder="Enter Database Password">
												</div>
											</div>
										</div>
									</div>
									<div class="clearfix"></div>
								</section>
								<section class="role_section">
									<h3 class="role_section_name">The Second Database</h3>
									<div class="col-sm-12">
										<div class="row">
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Database Host:</label>
													<input type="text" name="second_db_host" class="form-control" v-model="second_db_host" placeholder="Enter Database Host">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Database Port:</label>
													<input type="text" name="second_db_port" class="form-control" v-model="second_db_port" placeholder="Enter Database Port">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Database Name:</label>
													<input type="text" name="second_db_name" class="form-control" v-model="second_db_name" placeholder="Enter Database Name">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Database User:</label>
													<input type="text" name="second_db_user" class="form-control" v-model="second_db_user" placeholder="Enter Database User">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Database Password:</label>
													<input type="password" name="second_db_password" class="form-control" v-model="second_db_password" placeholder="Enter Database Password">
												</div>
											</div>
										</div>
									</div>
									<div class="clearfix"></div>
								</section>
								<section class="role_section">
									<h3 class="role_section_name">Memsql Database</h3>
									<div class="col-sm-12">
										<div class="row">
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Database Host:</label>
													<input type="text" name="memsql_db_host" class="form-control" v-model="memsql_db_host" placeholder="Enter Database Host">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Database Port:</label>
													<input type="text" name="memsql_db_port" class="form-control" v-model="memsql_db_port" placeholder="Enter Database Port">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Database Name:</label>
													<input type="text" name="memsql_db_name" class="form-control" v-model="memsql_db_name" placeholder="Enter Database Name">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Database User:</label>
													<input type="text" name="memsql_db_user" class="form-control" v-model="memsql_db_user" placeholder="Enter Database User">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Database Password:</label>
													<input type="password" name="memsql_db_password" class="form-control" v-model="memsql_db_password" placeholder="Enter Database Password">
												</div>
											</div>
										</div>
									</div>
									<div class="clearfix"></div>
								</section>
							</tab>
							<tab label="Web Base" class="" icon="dnl_icon dnl_arrow-point-to-right">
								<section class="role_section">
									<h2 class="role_section_name">Web Base</h2>
									<div class="col-sm-12">
										<div class="row">
											<!-- <div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Database Host:</label>
													<select2 :options="options" v-model="wb_db_host">
													</select2>
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Database Port:</label>
													<input type="text" name="wb_db_port" class="form-control" v-model="wb_db_port" placeholder="Enter Database Port">
												</div>
											</div>
											<div class="clearfix"></div> -->
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<div class="checkbox checkbox-success">
														<input id="enable_debug" name="enable_debug" v-model="enable_debug" type="checkbox">
														<label for="enable_debug">Enable Debug</label>
													</div>
													<div class="form-group">
														<div class="checkbox checkbox-success">
															<input id="enable_cmd_debug" name="enable_cmd_debug" v-model="enable_cmd_debug" type="checkbox">
															<label for="enable_cmd_debug">Enable Cmd Debug</label>
														</div>
													</div>
													<div class="form-group">
														<div class="checkbox checkbox-success">
															<input id="check_switch_license" name="check_switch_license" v-model="check_switch_license" type="checkbox">
															<label for="check_switch_license">Check Switch License</label>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="clearfix"></div>
								</section>
							</tab>
							<!-- <tab label="Path Configuration" class="" icon="dnl_icon dnl_arrow-point-to-right">
								<section class="role_section">
									<h2 class="role_section_name">Path Configuration</h2>
									<div class="col-sm-12">
										<div class="row">
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>DB Export Path:</label>
													<input type="text" name="db_export_path" class="form-control" v-model="db_export_path" placeholder="Enter DB Export Path">
												</div>
											</div>
										</div>
									</div>
									<div class="clearfix"></div>
								</section>
							</tab>
							<tab label="US Jurisdiction Update" class="" icon="dnl_icon dnl_arrow-point-to-right">
								<section class="role_section">
									<h2 class="role_section_name">US Jurisdiction Update</h2>
									<div class="col-sm-12">
										<div class="row">
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>FTP IP:</label>
													<input type="text" name="ftp_ip" class="form-control" v-model="ftp_ip" placeholder="Enter FTP IP">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Database Port:</label>
													<input type="text" name="us_ju_db_port" class="form-control" v-model="us_ju_db_port" placeholder="Enter FTP Username">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>FTP Password:</label>
													<input type="text" name="ftp_password" class="form-control" v-model="ftp_password" placeholder="Enter FTP Password">
												</div>
											</div>
										</div>
									</div>
									<div class="clearfix"></div>
								</section>
							</tab> -->
							<tab label="Web Feature" class="" icon="dnl_icon dnl_arrow-point-to-right">
								<section class="role_section">
									<h2 class="role_section_name">Web Feature</h2>
									<div class="col-sm-12">
										<div class="row">
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<div class="checkbox checkbox-success">
														<input id="copyright_link" name="copyright_link" v-model="copyright_link" type="checkbox">
														<label for="copyright_link">Copyright Link</label>
													</div>
													<div class="form-group">
														<div class="checkbox checkbox-success">
															<input id="enable_org_module" name="enable_org_module" v-model="enable_org_module" type="checkbox">
															<label for="enable_org_module">Enable Origination Module</label>
														</div>
													</div>
													<div class="form-group">
														<div class="checkbox checkbox-success">
															<input id="statistics_group_all" name="statistics_group_all" v-model="statistics_group_all" type="checkbox">
															<label for="statistics_group_all">Statistics Group All</label>
														</div>
													</div>
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<div class="checkbox checkbox-success">
														<input id="paypal" name="paypal" v-model="paypal" type="checkbox">
														<label for="paypal">Paypal</label>
													</div>
													<div class="form-group">
														<div class="checkbox checkbox-success">
															<input id="pay_in_new_window" name="pay_in_new_window" v-model="pay_in_new_window" type="checkbox">
															<label for="pay_in_new_window">Pay in New Window</label>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="clearfix"></div>
								</section>
							</tab>
							<!-- <tab label="Redis" class="" icon="dnl_icon dnl_arrow-point-to-right">
								<section class="role_section">
									<h2 class="role_section_name">Redis</h2>
									<div class="col-sm-12">
										<div class="row">
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>IP:</label>
													<input type="text" name="redis_ip" class="form-control" v-model="redis_ip" placeholder="Enter IP">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Port:</label>
													<input type="text" name="redis_port" class="form-control" v-model="redis_port" placeholder="Enter Port">
												</div>
											</div>
										</div>
									</div>
									<div class="clearfix"></div>
								</section>
							</tab>
							<tab label="Script Invoice" class="" icon="dnl_icon dnl_arrow-point-to-right">
								<section class="role_section">
									<h2 class="role_section_name">Script Invoice</h2>
									<div class="col-sm-12">
										<div class="row">
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Generate Invoice From:</label>
													<select2 :options="options" v-model="generate_invoice_from">
													</select2>
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group m-top-33">
													<div class="checkbox checkbox-success">
														<input id="include_org_billing" name="include_org_billing" v-model="include_org_billing" type="checkbox">
														<label for="include_org_billing">Include Origination Billing</label>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="clearfix"></div>
								</section>
							</tab>
							<tab label="Check Route" class="" icon="dnl_icon dnl_arrow-point-to-right">
								<section class="role_section">
									<h2 class="role_section_name">Check Route</h2>
									<div class="col-sm-12">
										<div class="row">
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Auto Test IP:</label>
													<input type="text" name="auto_test_ip" class="form-control" v-model="auto_test_ip" placeholder="Enter IP">
												</div>
											</div>
										</div>
									</div>
									<div class="clearfix"></div>
								</section>
							</tab> -->
							<tab label="PCAP Archival" class="" icon="dnl_icon dnl_arrow-point-to-right">
								<section class="role_section">
									<h2 class="role_section_name">PCAP Archival</h2>
									<div class="col-sm-12">
										<div class="row">
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<!-- <label>PCAP File Path:</label>
													<input type="text" name="pcap_file_path" class="form-control" v-model="pcap_file_path" placeholder="Enter PCAP File Path"> -->
													<label for="storage_type">Storage Type:</label>
													<select class="selectable" v-model="storage_type">
														<option v-for="item in storage_type_options" v-bind:value="item.id">
															{{ item.text }}
														</option>
													</select>
												</div>
											</div>
										</div>
									</div>
									<div class="clearfix"></div>
								</section>
							</tab>
							<tab label="Client Portal" class="" icon="dnl_icon dnl_arrow-point-to-right">
								<section class="role_section">
									<h2 class="role_section_name">Client Portal</h2>
									<div class="col-sm-12">
										<div class="row">
											<div class="col-md-6 col-sm-6">
												<div class="form-group">
													<div class="checkbox checkbox-success">
														<input id="change_ip" name="change_ip" v-model="change_ip" type="checkbox">
														<label for="change_ip">Change IP</label>
													</div>
												</div>
												<div class="form-group">
													<div class="checkbox checkbox-success">
														<input id="show_switch_ip" name="show_switch_ip" v-model="show_switch_ip" type="checkbox">
														<label for="show_switch_ip">Show Switch IP</label>
													</div>
												</div>
												<div class="form-group">
													<div class="checkbox checkbox-success">
														<input id="build_trunk" name="build_trunk" v-model="build_trunk" type="checkbox">
														<label for="build_trunk">Build Trunk From Product</label>
													</div>
												</div>
											</div>
											<div class="col-md-6 col-sm-6">
												<div class="form-group">
													<div class="checkbox checkbox-success">
														<input id="allow_add_ingress" name="allow_add_ingress" v-model="allow_add_ingress" type="checkbox">
														<label for="allow_add_ingress">Allow Add ingress</label>
													</div>
												</div>
												<div class="form-group">
													<div class="checkbox checkbox-success">
														<input id="allow_add_egress" name="allow_add_egress" v-model="allow_add_egress" type="checkbox">
														<label for="allow_add_egress">Allow Add Egress</label>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="clearfix"></div>
								</section>
							</tab>
							<tab label="API Configuration" class="" icon="dnl_icon dnl_arrow-point-to-right">
								<h2 class="role_section_name">API Configuration</h2>
								<section class="role_section">
									<div class="col-sm-12">
										<div class="row">
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>PCAP URL:</label>
													<input type="text" name="pcap_url" class="form-control" v-model="pcap_url" placeholder="Enter PCAP URL">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Invoice URL:</label>
													<input type="text" name="invoice_url" class="form-control" v-model="invoice_url" placeholder="Enter Invoice URL">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Import URL:</label>
													<input type="text" name="import_url" class="form-control" v-model="import_url" placeholder="Enter Import URL">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>CDR Archival URL:</label>
													<input type="text" name="cdr_archival_url" class="form-control" v-model="cdr_archival_url" placeholder="Enter CDR Archival URL">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Real Time CDR and Reporting URL:</label>
													<input type="text" name="real_time_cdr_reporting_url" class="form-control" v-model="real_time_cdr_reporting_url" placeholder="Enter Real Time CDR and Reporting URL">
												</div>
											</div>
										</div>
									</div>
									<div class="clearfix"></div>
								</section>
							</tab>
							<tab label="Archive Setting" class="" icon="dnl_icon dnl_arrow-point-to-right">
								<h2 class="role_section_name">Archive Setting</h2>
								<section class="role_section">
									<div class="col-sm-12">
										<div class="row">
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Enable CDR Archive:</label>
													<select class="selectable" v-model="enable_cdr_archive">
														<option v-for="item in cdr_archive_options" v-bind:value="item.id">
															{{ item.text }}
														</option>
													</select>
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Archive:</label>
													<input type="text" name="archive" class="form-control" v-model="archive" placeholder="Enter Archive">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>Store:</label>
													<input type="text" name="store" class="form-control" v-model="store" placeholder="Enter Store">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>FTP Server:</label>
													<input type="text" name="ftp_server" class="form-control" v-model="ftp_server" placeholder="Enter FTP Server">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>FTP Port:</label>
													<input type="text" name="ftp_port" class="form-control" v-model="ftp_port" placeholder="Enter FTP Port">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>FTP User:</label>
													<input type="text" name="ftp_user" class="form-control" v-model="ftp_user" placeholder="Enter FTP User">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>FTP Password:</label>
													<input type="password" name="ftp_password" class="form-control" v-model="ftp_password" placeholder="Enter FTP Password">
												</div>
											</div>
											<div class="col-md-4 col-sm-6">
												<div class="form-group">
													<label>FTP Path:</label>
													<input type="text" name="ftp_path" class="form-control" v-model="ftp_path" placeholder="Enter FTP Path">
												</div>
											</div>
										</div>
									</div>
									<div class="clearfix"></div>
								</section>
							</tab>
						</tabs>
						<div class="button_set absolute more_space">
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
				<div class="clearfix"></div>
			</div>
		</div>
	</div>
</template>

<script>   
const vTabs = require('vue!../main_components/tabs.vue'),
	vTab = require('vue!../main_components/tab.vue'),
	vSelect = require('vue!../main_components/select.vue'),
	Dropzone = require('vue!../main_components/dropzone.vue');
const api = require("../../api");
import { mapActions } from 'vuex'
module.exports = {
	components: {
		Dropzone,
		'tabs': vTabs,
		'tab': vTab,
		'select2': vSelect,
	},
	data: function () {
		return {
			cdr_archive_options: [
				{id: '1', text: 'Store archive in FTP'},
				{id: '2', text: 'Store archive in Google Cloud Storage'},
			],
			storage_type: 'default',
			storage_type_options: [
				{id: 'default', text: ''},
				{id: '0', text: 'Local Storage'},
				{id: '1', text: 'Remote Storage via SCP'},
				{id: '2', text: 'FTP'},
				{id: '3', text: 'Google Drive'},
			],
			enable_debug: false,
			enable_cmd_debug: true,
			check_switch_license: false,
			pre_load_data_options: [
				{id: true, text: 'True'},
				{id: false, text: 'False'},
			],
			command_debug_log_path: '',	
			base_domain_url: '',	
			switch_alias: '',
			welcome_message: '',

			generate_invoice_from: '',
			include_org_billing: true,

			auto_test_ip: '',

			pcap_file_path: '',

			change_ip: true,
			show_switch_ip: true,
			build_trunk: true,
			allow_add_ingress: true,
			allow_add_egress: true,

			wb_db_host: '',
			wb_db_port: '',
			allow_termination_tab: '',
			wb_activate: '',

			db_export_path: '',

			ftp_ip: '',
			us_ju_db_port: '',
			ftp_password: '',

			db_host: '',
			db_port: '',
			db_name: '',
			db_user: '',
			db_password: '',

			second_db_host: '',
			second_db_port: '',
			second_db_name: '',
			second_db_user: '',
			second_db_password: '',

			memsql_db_host: '',
			memsql_db_port: '',
			memsql_db_name: '',
			memsql_db_user: '',
			memsql_db_password: '',



			master_lrn_ip: '',
			master_lrn_port: '',
			slave_lrn_ip: '',
			slave_lrn_port: '',

			qos_period_options: [
				{ id: 1, text: '15 min' },
				{ id: 2, text: '1 hr' },
				{ id: 3, text: '1 day' },
			],
			qos_period: 1,
			// min_call: '',
			low_call_options: [
				{ id: 1, text: 'Use Latest Value' },
				{ id: 2, text: 'Set to <none>' },
			],
			low_call: 1,

			admin_email: '',
			finance_email: '',
			noc_email: '',
			ftp_fail_email: '',

			default_billing_setting: '',

			us_ij_rule: 'A-Z',
			include_calls: true,

			ingress_timeout: '',
			egress_timeout: '',
			ring_timeout: '',
			call_timeout: '',

			mail_server: '',
			smtp_port: '',
			smtp_username: '',
			smtp_password: '',
			smtp_login_auth: true,
			from_email: '',
			email_sender_name: '',
			smtp_secure: 1,

			smtp_secure_options: [
				{ id: 1, text: 'TLS' },
				{ id: 2, text: 'SSL' },
				{ id: 3, text: 'NTLM' },
			],
			inactivity_timeout: 0,
			time_zone: 12,
			time_zone_options: [
				{ id: '-12:0', text: 'GMT -12:00' },
				{ id: '-11:0', text: 'GMT -11:00' },
				{ id: '-10:0', text: 'GMT -10:00' },
				{ id: '-9:0', text: 'GMT -9:00' },
				{ id: '-8:0', text: 'GMT -8:00' },
				{ id: '-7:0', text: 'GMT -7:00' },
				{ id: '-6:0', text: 'GMT -6:00' },
				{ id: '-5:0', text: 'GMT -5:00' },
				{ id: '-4:0', text: 'GMT -4:00' },
				{ id: '-3:0', text: 'GMT -3:00' },
				{ id: '-2:0', text: 'GMT -2:00' },
				{ id: '-1:0', text: 'GMT -1:00' },
				{ id: '0:0', text: 'GMT +0:00' },
				{ id: '1:0', text: 'GMT +1:00' },
				{ id: '2:0', text: 'GMT +2:00' },
				{ id: '3:0', text: 'GMT +3:00' },
				{ id: '4:0', text: 'GMT +4:00' },
				{ id: '5:0', text: 'GMT +5:00' },
				{ id: '6:0', text: 'GMT +6:00' },
				{ id: '7:0', text: 'GMT +7:00' },
				{ id: '8:0', text: 'GMT +8:00' },
				{ id: '9:0', text: 'GMT +9:00' },
				{ id: '10:0', text: 'GMT +10:00' },
				{ id: '11:0', text: 'GMT +11:00' },
				{ id: '12:0', text: 'GMT +12:00' },
			],
			landing_page: 'Qos Report',
			landing_page_options: [
				{ id: 'QoS Report', text: 'Qos Report' },
				{ id: 'Summary Report', text: 'Summary Report' },
				{ id: 'Orig-Term Report', text: 'Orig-Term Report' },
				{ id: 'Carrier Management', text: 'Carrier Management' },
			],
			diff_report_count: 1,
			diff_report_count_options: [
				{ id: 1, text: '1hr' },
				{ id: 2, text: '24hr' }
			],
			preload: true,
			mutual_balance: 0,
			require_comment: 0,
			role_name: '',
			us_ij_rules: [
				{ id: 'A-Z', text: 'A-Z' },
				{ id: 'US Non-JD', text: 'US Non-JD' },
				{ id: 'US JD', text: 'US JD' },
				{ id: 'OCN-LATA-JD', text: 'OCN-LATA-JD' },
				{ id: 'OCN-LATA-NON-JD', text: 'OCN-LATA-NON-JD' },
			],
			view_all_carriers: '',
			smtp_type: '1',
			smtp_types: [
				{ id: 'SSL', text: 'SSL' },
				{ id: 'TLS', text: 'TLS' },
			],
			currency_list: [],
			pageOne: {
				currentPage: 1,
				totalPages: 10
			},
			currency: 1,
			code_deck_list: [],
			code_deck: 1,

			loading: false,

			system: {},
		}
	},
	methods: {
		...mapActions({
			setMessage: 'app_message/setAppMessage'
		}),
		'success': function (file) {
			console.log('A file was successfully uploaded')
		},
		'process': function () {
			var newArr = this.$children.filter(function (item) {
				return item.id === "myVueDropzone";
			});
			var component = newArr[0];
			component.processQueue()
		},

		saveSystemSetting() {
			this.loading = true
			const url = api.getEndpointUrl() + '/v1/config/system'
			const body = {
				"default_us_ij_rule": this.us_ij_rule,
				"is_show_mutual_balance": this.mutual_balance,
				"require_comment": this.require_comment,
				"code_deck": this.code_deck,
				"landing_page": this.landing_page,
				"inactivity_timeout": this.inactivity_timeout,
				"report_count": this.diff_report_count,
				"switch_alias": this.switch_alias,
				"pre_load_data": this.preload,
				"welcome_message": this.welcome_message,
				"sys_currency": this.currency,
				"sys_timezone": this.time_zone
			}
			this.$http.patch(url, body)
				.then(response => {
					if (response.body.success) {
						this.loading = false;
						this.setMessage('System setting was changed successfully')
					}
				})
				.catch(error => {
					this.loading = false
				})
		}
	},
	created() {
		this.currency_list = []
		this.loading = true
		var url = api.getEndpointUrl() + '/v1/switch/currency/list'
		this.$http.get(url)
			.then(response => {
				const body = response.body
				if (body.success) {
					const payload = body.payload
					var self = this;
					this.loading = false;
					var items = payload.items;
					items.forEach(function (item, i) {
						var currency = {};
						currency.id = item.code;
						currency.text = item.code;
						self.currency_list.push(currency);
						if (i == 0)
							self.currency = currency.id;
					});
					console.log(this.currency_list);
				}
			})
			.catch(error => {
				console.log(error)
			})
		this.code_deck_list = []
		this.loading = true
		url = api.getEndpointUrl() + '/v1/switch/code_deck/list'
		this.$http.get(url)
			.then(response => {
				const body = response.body
				if (body.success) {
					const payload = body.payload
					var self = this;
					this.loading = false;
					var items = payload.items;
					items.forEach(function (item, i) {
						var code_deck = {};
						code_deck.id = item.name;
						code_deck.text = item.name;
						self.code_deck_list.push(code_deck);
						if (i == 0)
							self.code_deck = code_deck.id;
					});

				}
			})
			.catch(error => {
				console.log(error)
			})

		this.system = {}
		this.loading = true
		url = api.getEndpointUrl() + '/v1/config/system'
		this.$http.get(url)
			.then(response => {
				const body = response.body
				if (body.success) {
					const payload = body.payload
					var self = this;
					this.loading = false;
					var system = payload;

					console.log("system");
					console.log(system);

					this.switch_alias = system.switch_alias;
					this.us_ij_rule = system.default_us_ij_rule;
					this.mutual_balance = system.is_show_mutual_balance;
					this.require_comment = system.require_comment;
					this.code_deck = system.code_deck;
					this.landing_page = system.landing_page;
					this.inactivity_timeout = system.inactivity_timeout;
					this.diff_report_count = system.report_count;
					this.preload = system.pre_load_data;
					this.welcome_message = system.welcome_message;
					this.currency = system.sys_currency;
					this.time_zone = system.sys_timezone;
				}
			})
			.catch(error => {
				console.log(error)
			})
	}
}
</script>

<style>
.button_set.absolute.more_space {
	margin-top: 600px;
}

.label-default {
	background-color: #dce1e9;
	color: #4f5357;
	border-radius: 20px;
	padding: 7px 12px;
	box-shadow: 0px 2px 7px 0px rgba(184, 187, 196, 0.2);
}

.m-top-8 {
	margin-top: 8px;
}

.tabs.vertical.mail_template .select2-selection.select2-selection--single,
.tabs.vertical.mail_template span.select2.select2-container.select2-container--default {
	width: 100% !important;
}

.system_logo .dropzone {
	padding: 10px 10px;
}

.system_logo .dropzone .dz-preview {
	display: block;
	margin: 16px auto;
	min-height: 100px;
	width: 200px;
}

.text_area_wrapper textarea {
	height: 70px;
}

h3.role_section_name {
	margin-top: 0;
	margin-bottom: 20px;
	font-size: 20px;
}

@media (min-width: 768px) and (max-width: 1023px) {
	.vertical.mail_template a.tab,
	.vertical.mail_template a.tab.active:first-child {
		height: auto;
		line-height: 15px;
	}

	.button_set.absolute {
		margin-top: 385px;
	}
}

@media (max-width: 767px) {
	.button_set.absolute {
		width: 100%;
		position: relative;
		padding-right: 0;
		margin-top: 0;
	}

	.tabs .tab_wrapper .tabs .tab_wrapper {
		display: block !important;
	}

	.system_logo .dropzone.dz-clickable .dz-message,
	.dropzone.dz-clickable .dz-message * {
		margin-top: 25px;
	}

	.system_logo .invoice_logo {
		margin-bottom: 20px;
	}
}





/* Landscape phones and down */

@media (max-width: 480px) {}





/* Portrait phone to landscape phone */

@media (min-width: 319px) and (max-width: 479px) {}
</style>
