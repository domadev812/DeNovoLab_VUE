<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Origination</a></li>
				  <li class="breadcrumb-item">
					  <router-link to="/origination/clients">Clients</router-link>
				  </li>
				  <li class="breadcrumb-item active">Client Editor</li>
			</ol>
			<h1 class="page-header">Client Editor</h1>
			<router-link to="/origination/clients" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad configuration_pad">
				<div class="col-md-12 col-sm-12">
					<form class="form">
						<section class="config_section">
							<h2 class="config_section_name">Basic Info</h2>
							<div class="row">
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="client_name">Client Name:</label>
											<input type="text" name="client_name" v-model="client.client_name" class="form-control" :class="{'input': true, 'is-danger': errors.has('client_name') }" v-validate="'required'" placeholder="Enter Client Name">
											<span v-show="errors.has('client_name')" class="help is-danger">{{ errors.first('client_name') }}</span>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="company">Company:</label>
											<input type="text" name="company" v-model="client.company" class="form-control" placeholder="Enter Company">
										</div>
									</div>
                                    <div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="login_username">Login Username:</label>
											<input type="text" name="login_username" v-model="client.login_username" class="form-control" placeholder="Enter Login Username">
										</div>
									</div>
                                    <div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="login_pass">Login Password:</label>
											<input type="password" name="login_pass" v-model="client.login_pass" class="form-control" placeholder="Enter Login Password">
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="main_email">Main Email:</label>
											<input type="email" name="main_email" v-model="client.main_email" class="form-control" :class="{'input': true, 'is-danger': errors.has('main_email') }" v-validate="'required|email'" placeholder="Enter Main Email">
											<span v-show="errors.has('main_email')" class="help is-danger">{{ errors.first('main_email') }}</span>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="noc_email">NOC Email:</label>
											<input type="email" name="noc_email" v-model="client.noc_email" class="form-control" :class="{'input': true, 'is-danger': errors.has('noc_email') }" v-validate="'required|email'" placeholder="Enter NOC Email">
											<span v-show="errors.has('noc_email')" class="help is-danger">{{ errors.first('noc_email') }}</span>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="billing_email">Billing Email:</label>
											<input type="email" name="billing_email" v-model="client.billing_email" class="form-control" :class="{'input': true, 'is-danger': errors.has('noc_email') }" v-validate="'required|email'" placeholder="Enter Billing Email">
											<span v-show="errors.has('billing_email')" class="help is-danger">{{ errors.first('billing_email') }}</span>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="address">Address:</label>
											<input type="email" name="address" v-model="client.address" class="form-control" placeholder="Enter Address">
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="mode">Mode:</label>
											<!--<select2 :options="mode_options" v-model="client.mode"></select2>-->
											<select class="selectable" v-model="client.mode">
												<option v-for="item in mode_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<!-- <div class="form-group">
											<label>Test Credit:</label>
											<input type="text" name="test_credit" v-model="client.test_credit" class="form-control" placeholder="Enter Test Credit">
										</div> -->
										<div class="form-group">
											<label for="test_credit">{{ client.mode === 'prepay' ? 'Test Credit:' : 'Allowed Credit:' }}</label>
											<input v-if="client.mode === 'prepay'" type="text" name="test_credit" v-model="client.test_credit" class="form-control" :class="{ 'input': true, 'is-danger': errors.has('test_credit') }" v-validate="'numeric'" data-vv-as="Test Credit" placeholder="Enter Test Credit">
											<span v-if="client.mode === 'prepay'" v-show="errors.has('test_credit')" class="help is-danger">{{ errors.first('test_credit') }}</span>
                                            <div v-if="client.mode === 'postpay'" class="checkbox checkbox-success" style="display: flex;">
                                                <input id="is_unlimited" name="is_unlimited" style="margin: 10px 5px;" v-model="client.is_unlimited" type="checkbox">
                                                <label for="is_unlimited" style="margin: 10px 5px;">Unlimited</label>
                                                <input v-if="client.is_unlimited === false" type="text" style="width: 70%; float: right;" name="allowed_credit" v-model="client.allowed_credit" class="form-control" :class="{ 'input': true, 'is-danger': errors.has('allowed_credit') }" v-validate="'numeric'" data-vv-as="Allowed Credit" placeholder="Enter Allowed Credit">
                                                <span v-if="client.is_unlimited === false" v-show="errors.has('allowed_credit')" class="help is-danger">{{ errors.first('allowed_credit') }}</span>
                                            </div>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="bill_by_port">Enable Billing By Port:</label>
											<!--<select2 :options="bill_by_port_options" v-model="client.bill_by_port"></select2>-->
											<select class="selectable" v-model="resource.bill_by_port" @change="changeBillingByPort">
												<option v-for="item in bill_by_port_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label class="m-top-15"></label>
											<div class="checkbox checkbox-success">
												<input id="t38" name="t38" type="checkbox" v-model="resource.t38">
												<label for="t38">t38</label>
											</div>
										</div>
									</div>
									<div class="clearfix"></div>
									<template v-for="(item, index) in resource.ip">
										<div class="col-md-4 col-sm-6">
											<div class="form-group">
												<label>IP Addresses:</label>
												<input type="text" name="password" v-model="item.ip" class="form-control" placeholder="Enter IP">
											</div>
										</div>
										<div class="col-md-2 col-sm-2">
											<div class="form-group">
												<label class="m-top-15"></label>
												<input type="text" name="password" v-model="item.port" class="form-control" placeholder="Enter Port">
											</div>
										</div>
										<div class="col-md-1 col-sm-2" v-if="index==0">
											<div class="inline_actions">
												<a><span class="dnl_icon dnl_add" @click="addIP"></span></a>
											</div>
										</div>
										<div class="col-md-1 col-sm-2" v-if="index>0">
											<div class="inline_actions">
												<a><span class="dnl_icon dnl_action_delete" @click="deleteIP(index)"></span></a>
											</div>
										</div>
										<div class="clearfix"></div>
									</template>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="call_limit">Call Limit:</label>
											<input type="text" name="call_limit" v-model="client.call_limit" class="form-control" placeholder="Enter Call Limit">
										</div>
									</div>
								    <div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="media_type">Media Type:</label>
											<!--<select2 :options="media_type_options" v-model="client.media_type"></select2>-->
											<select class="selectable" v-model="resource.media_type">
												<option disabled value="0" selected></option>
												<option v-for="item in media_type_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
										</div>
									</div>
								    <div class="col-md-4 col-sm-6">
										<div class="form-group m-top-33">
											<div class="checkbox checkbox-success">
												<input id="auto_invoicing" name="auto_invoicing" type="checkbox" v-model="client.auto_invoicing">
												<label for="auto_invoicing">Auto Invoicing</label>
											</div>
										</div>
									</div>
							  </div>
						  </section>
                          <!--<section class="config_section">
							<h2 class="config_section_name">Management</h2>
                              <div class="row m-top-20">
                                  <div class="col-md-12 col-sm-12">
                                    <div class="form-group">
                                        <div class="checkbox checkbox-success">
                                            <input id="is_account_summary" name="is_account_summary" type="checkbox" v-model="client.is_account_summary">
                                            <label for="is_account_summary">Account Summary</label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="checkbox checkbox-success">
                                            <input id="is_rate_table" name="is_rate_table" type="checkbox" v-model="client.is_rate_table">
                                            <label for="is_rate_table">Rate Table</label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="checkbox checkbox-success">
                                            <input id="is_trunk" name="is_trunk" type="checkbox" v-model="client.is_trunk">
                                            <label for="is_trunk">Trunks</label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="checkbox checkbox-success">
                                            <input id="is_products" name="is_products" type="checkbox" v-model="client.is_products">
                                            <label for="is_products">Products</label>
                                        </div>
                                    </div>
                                  </div>
                              </div>
                          </section>
                          <section class="config_section">
							<h2 class="config_section_name">Billing</h2>
                              <div class="row m-top-20">
                                  <div class="col-md-12 col-sm-12">
                                    <div class="form-group">
                                        <div class="checkbox checkbox-success">
                                            <input id="is_balance" name="is_balance" type="checkbox" v-model="client.is_balance">
                                            <label for="is_balance">Balance</label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="checkbox checkbox-success">
                                            <input id="is_payment_history" name="is_payment_history" type="checkbox" v-model="client.is_payment_history">
                                            <label for="is_payment_history">Payment History</label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="checkbox checkbox-success">
                                            <input id="is_online_payment" name="is_online_payment" type="checkbox" v-model="client.is_online_payment">
                                            <label for="is_online_payment">Online Payment</label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="checkbox checkbox-success">
                                            <input id="is_invoices" name="is_invoices" type="checkbox" v-model="client.is_invoices">
                                            <label for="is_invoices">Invoices</label>
                                        </div>
                                    </div>
                                  </div>
                              </div>
                          </section>
                          <section class="config_section">
							<h2 class="config_section_name">Reports</h2>
                              <div class="row m-top-20">
                                  <div class="col-md-12 col-sm-12">
                                    <div class="form-group">
                                        <div class="checkbox checkbox-success">
                                            <input id="is_cdrs_list" name="is_cdrs_list" type="checkbox" v-model="client.is_cdrs_list">
                                            <label for="is_cdrs_list">CDRs List</label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="checkbox checkbox-success">
                                            <input id="is_summary_report" name="is_summary_report" type="checkbox" v-model="client.is_summary_report">
                                            <label for="is_summary_report">Summary Report</label>
                                        </div>
                                    </div>
                                  </div>
                              </div>
                          </section>
                          <section class="config_section">
							<h2 class="config_section_name">DID Management</h2>
                              <div class="row m-top-20">
                                  <div class="col-md-12 col-sm-12">
                                    <div class="form-group">
                                        <div class="checkbox checkbox-success">
                                            <input id="is_my_did" name="is_my_did" type="checkbox" v-model="client.is_my_did">
                                            <label for="is_my_did">My DID</label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="checkbox checkbox-success">
                                            <input id="is_did_request" name="is_did_request" type="checkbox" v-model="client.is_did_request">
                                            <label for="is_did_request">DID Request</label>
                                        </div>
                                    </div>
                                  </div>
                              </div>
                          </section>-->
						  <div class="button_set little-space">
							<a class="btn btn-primary" @click="validateForClients">
								Submit
							</a>
							<a class="btn btn-default">
								Reset
							</a>
						  </div>
					</form>
				</div>
				<div class="clearfix little-space"></div>
			</div>
		</div>
	  </div>
	</div>
</template>

<script>   
	const vSelect = require('vue!../main_components/select.vue')
	const api = require("../../api");
	import { mapActions } from 'vuex';
	module.exports = {
		components: {
			'select2': vSelect
		},
		props: ['editingclient', 'id'],
		data: function(){
            return {
				mode_options: [
					{id: 'prepay', text: 'Prepaid'},
					{id: 'postpay', text: 'Postpaid'},
				],
				media_type_options: [
					{ id: 'Proxy Media + Transcoding', text: 'Proxy Media + Transcoding' },
					{ id: 'Proxy Media', text: 'Proxy Media' },
					{ id: 'Bypass Media', text: 'Bypass Media' }
				],
				bill_by_port_options: [
					// { id: 'no', text: 'No' },
					// { id: 'by port limit', text: 'By Port Limit' },
					{ id: 'by minutes', text: 'by minutes' },
					{ id: 'by port', text: 'by port' },
				],
				client: {},

              client_name: '',    
              login_username: '',
              login_pass: '',
              mode: '',
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
              test_credit: '',
              bill_by_port: '',
              ip1: '',
              port1: '',
              call_limit: '',
              media_type: '',
                
                
			  enable_rep_grouping: false,
			  enable_outbound_report: true,
			  allow_termination_tab: false,
			  activate: false,
			  username: '',
			  password: '',
			  confirm_password: '',
			  full_name: '',
			  email: '',
			  ip: '',
			  select: [],
			  
			  groupname: '',
			  groups: [
				  { id: 1, value: 'carrier1', text: 'Carrier 1' },
				  { id: 2, value: 'carrier2', text: 'Carrier 2' },
				  { id: 3, value: 'carrier3', text: 'Carrier 3' },
				  { id: 4, value: 'carrier4', text: 'Carrier 4' },
				  { id: 5, value: 'carrier5', text: 'Carrier 5' }
			  ],
			  client_template: {},
			  resource: {},
            }
        },
		mounted: function() {
			
		},
		methods: {
			...mapActions({
				setMessage: 'app_message/setAppMessage'
			}),
			changeBillingByPort() {
				console.log(this.resource.bill_by_port);
			},
			deleteIP(id) {
                let index = id
                if (~id) {
                    this.resource.ip.splice(index, 1)
                }
            },
			addIP() {
				this.resource.ip.push({
                    ip: '',
                    port: 0,
                })
			},
			resetClient () {
				this.client = {
					company: "",
					allowed_credit: 0,
					billing_email: "",
					noc_email: "",
					rate_email: "",
					test_credit: 0,
					auto_invoicing: true,
					client_name: "",
					address: "",
					balance: 0,
					call_limit: 0,
					login_username: "",
					login_pass: '',
					main_email: "",
					mode: "prepay",
					is_unlimited: false,
				};
				this.resource = {
					bill_by_port: "by minutes",
					ip: [
						{
							resource_ip_id: 1,
							ip: '',
							port: 0
						}
					],
					resource_id: 1,
					media_type: 'Proxy Media + Transcoding',
					t38: false,
				}
			},
			organizeClient(data) {
				// This function fixes naming differences between carrierLong and carrier
				this.client = {
					company: data.company,
					allowed_credit: data.allowed_credit,
					test_credit: data.test_credit,
					call_limit: data.call_limit,
					mode: data.billing_mode,
					noc_email: data.noc_email,
					rate_email: data.rate_email,
					client_name: data.name,
					address: data.address,
					balance: data.balance,
					billing_method: data.billing_method,
					client_id: data.client_id,
					cps_limit: data.cps_limit,
					login_username: data.username,
					update_at: data.update_at,
					credit_limit: data.credit_limit,
					billing_email: data.billing_email,
					auto_invoicing: data.auto_invoicing,
					update_by: data.update_by,
					main_email: data.main_email,
					is_unlimited: false,
				};
				this.resource = {
					ip: data.resource.ip,
					bill_by_port: data.resource.billing_by_port,
					media_type: data.resource.media_type,
					t38: data.resource.t38,
				}
			},
			fetchClient () {
				const url = api.getEndpointUrl() + '/v1/did/client/' + this.id
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						console.log(body.payload);
						this.organizeClient(body.payload)
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			getClientForRequest() {
				const client_template = Object.assign({}, this.client_template);

				client_template.company = this.client.company;
				client_template.cps_limit = 0;
				client_template.credit_limit = 0;
				client_template.billing_email = this.client.billing_email;
				client_template.password = this.client.login_pass;
				client_template.noc_email = this.client.noc_email;
				client_template.rate_email = "user@example.com";
				client_template.test_credit = this.client.test_credit;
				client_template.auto_invoicing = this.client.auto_invoicing;
				client_template.name = this.client.client_name;
				client_template.address = this.client.address;
				client_template.call_limit = this.client.call_limit;
				client_template.resource = {
					billing_by_port: this.resource.bill_by_port,
					ip: this.resource.ip,
					media_type: this.resource.media_type,
					t38: this.resource.t38,
				};
				// client_template.billing_method = this.client.billing_mode;
				client_template.username = this.client.login_username;
				client_template.main_email = this.client.main_email;
				client_template.billing_mode = this.client.mode;
				return client_template;
			},
			saveClients() {
				const reqBody = this.getClientForRequest();
				console.log("reqBody:",reqBody);
				var url;
				if(this.editingclient) {
					url = api.getEndpointUrl() + '/v1/did/client/' + this.id;
					this.$http.patch(url, reqBody,
					{
						headers: {
							"X-Auth-Token": auth.getToken()
						}
					})
						.then(response => {
							if (response.body.success) {
								this.setMessage('Client was changed successfully');
								var thisvm = this;
								setTimeout(function(){
									thisvm.$router.push('/origination/clients');
								}, 3000);
							}
						})
						.catch(error => {
							console.log(error)
							this.setMessage({
								message: 'Failed to change client',
								type: 'error'
							})
						})	
				}
				else {
					url = api.getEndpointUrl() + '/v1/did/client/create';
					this.$http.post(url, reqBody)
						.then(response => {
							if (response.body.success) {
								this.setMessage('Client was created successfully');
								var thisvm = this;
								setTimeout(function(){
									thisvm.$router.push('/origination/clients');
								}, 3000);
							}
						})
						.catch(error => {
							console.log(error)
							this.setMessage({
								message: 'Failed to create client',
								type: 'error'
							})
						})	
				}
			},
			validateForClients() {
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
						vm.saveClients();
					}
						
				}).catch((error) => {
					// eslint-disable-next-line
					console.log(error)
					vm.setMessage({
						message: 'Validation failed',
						type: 'error'
					})
				});
			}
		},
		created () {
			if (this.editingclient) {
				this.fetchClient();
			} else {
				this.resetClient()
			}
		}
	}
</script>

<style>
</style>
