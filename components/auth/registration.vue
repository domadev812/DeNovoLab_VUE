<template>
	<div class="registration_screen">
		<img src="assets/images/logo.png" class="reg_logo center-block text-center">
		<h3 class="center-block text-center">Sign up</h3>
		<!-- <p class="center-block text-center">Please enter valid data or we can not approve your account.</p>
		<p class="center-block text-center">Please contact sales for any information.</p> -->
		<div class="container">
			<div class="reg_form_wrapper">
				<form class="form">
					<section class="reg_form_section">
						<h2 class="reg_section_name">Company Information</h2>
						<div class="row">
							<div class="col-md-4 col-sm-6 col-xs-12">
								<div class="form-group">
									<label for="company_name">Company Name:</label>
									<span v-show="errors.has('company_name')" class="help is-danger">{{ errors.first('company_name') }}</span>
									<input type="text" name="company_name"
										   class="form-control"
										   :class="{has_error: errors.first('company_name')}"
										   v-model="company.company_name"
										   v-validate
										   data-vv-rules="required"
										   data-vv-as = "Company Name">
								</div>
							</div>
							<div class="col-md-4 col-sm-6 col-xs-12">
								<div class="form-group">
									<label for="rates_email">Rates e-mail:</label>
									<span v-show="errors.has('rates_email')" class="help is-danger">{{ errors.first('rates_email') }}</span>
									<input type="email" name="rates_email"
										   class="form-control"
										   :class="{has_error: errors.first('rates_email')}"
										   v-model="company.rates_email"
										   v-validate
										   data-vv-rules="required|email"
										   data-vv-as = "Rates e-mail">
								</div>
							</div>
							<div class="col-md-4 col-sm-6 col-xs-12">
								<div class="form-group">
									<label for="business_contact">Name of Business Contact:</label>
									<span v-show="errors.has('business_contact')" class="help is-danger">{{ errors.first('business_contact') }}</span>
									<input type="text" name="business_contact"
										   class="form-control"
										   :class="{has_error: errors.first('business_contact')}"
										   v-model="company.business_contact"
										   v-validate
										   data-vv-rules="required"
										   data-vv-as = "Business Contact Name">
								</div>
							</div>
							<div class="col-md-4 col-sm-6 col-xs-12">
								<div class="form-group">
									<label for="noc_email">NOC e-mail:</label>
									<span v-show="errors.has('noc_email')" class="help is-danger">{{ errors.first('noc_email') }}</span>
									<input type="email" name="noc_email"
										   class="form-control"
										   :class="{has_error: errors.first('noc_email')}"
										   v-model="company.noc_email"
										   v-validate
										   data-vv-rules="required|email"
										   data-vv-as = "NOC e-mail">
								</div>
							</div>
							<div class="col-md-4 col-sm-6 col-xs-12">
								<div class="form-group">
									<label for="main_email">Main e-mail:</label>
									<span v-show="errors.has('main_email')" class="help is-danger">{{ errors.first('main_email') }}</span>
									<input type="email" name="main_email"
										   class="form-control"
										   :class="{has_error: errors.first('main_email')}"
										   v-model="company.main_email"
										   v-validate
										   data-vv-rules="required|email"
										   data-vv-as = "Main e-mail">
								</div>
							</div>
						</div>
					</section>
					<section class="reg_form_section">
						<h2 class="reg_section_name">Account Information</h2>
						<div class="row">
							<div class="col-md-4 col-sm-6 col-xs-12">
								<div class="form-group">
									<label for="username">Username:</label>
									<span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</span>
									<input type="text" name="username"
										   class="form-control"
										   :class="{has_error: errors.first('username')}"
										   v-model="user.username"
										   v-validate
										   data-vv-rules="required|alpha_dash"
										   data-vv-as = "Username">
								</div>
							</div>
							<div class="col-md-4 col-sm-6 col-xs-12">
								<div class="form-group">
									<label for="rates_email">Password:</label>
									<span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
									<input type="password" name="password"
										   class="form-control"
										   :class="{has_error: errors.first('password')}"
										   v-model="user.password"
										   v-validate
										   data-vv-rules="required|alpha_num|min:6"
										   data-vv-as = "Password">
								</div>
							</div>
							<div class="col-md-4 col-sm-6 col-xs-12">
								<div class="form-group">
									<label for="confirm_password">Confirm Password:</label>
									<!-- todo: custom validation check for confirm password-->
									<span v-show="errors.has('confirm_password')" class="help is-danger">{{ errors.first('confirm_password') }}</span>
									<input type="password" name="confirm_password"
										   class="form-control"
										   :class="{has_error: errors.first('confirm_password')}"
										   v-model="user.confirm_password"
										   v-validate
										   data-vv-rules="required|alpha_num|min:6"
										   data-vv-as = "Confirm Password">
								</div>
							</div>
						</div>
					</section>
					<section class="reg_form_section">
						<h2 class="reg_section_name">Contact Information</h2>
						<div class="row">
							<div class="col-md-4 col-sm-6 col-xs-12">
								<div class="form-group">
									<label for="address">Address:</label>
									<input type="text" name="address"
										   v-model="user.address"
										   class="form-control"
										   :class="{has_error: errors.first('address')}"
										   v-validate
										   data-vv-rules="required"
										   data-vv-as = "Address">
									<span v-show="errors.has('address')" class="help is-danger">{{ errors.first('address') }}</span>
								</div>
							</div>
							<div class="col-md-4 col-sm-6 col-xs-12">
								<div class="form-group">
									<label for="city">City:</label>
									<input type="text" name="city"
										   class="form-control"
										   :class="{has_error: errors.first('city')}"
										   v-model="user.city"
										   v-validate
										   data-vv-rules="required"
										   data-vv-as = "City">
									<span v-show="errors.has('city')" class="help is-danger">{{ errors.first('city') }}</span>
								</div>
							</div>
							<div class="col-md-4 col-sm-6 col-xs-12">
								<div class="form-group">
									<label for="state">State:</label>
									<input type="text" name="state"
										   class="form-control"
										   :class="{has_error: errors.first('state')}"
										   v-model="user.state"
										   v-validate
										   data-vv-rules="required"
										   data-vv-as = "State">
									<span v-show="errors.has('state')" class="help is-danger">{{ errors.first('state') }}</span>
								</div>
							</div>
							<div class="col-md-4 col-sm-6 col-xs-12">
								<div class="form-group">
									<label for="zip">Zip:</label>
									<input type="text" name="zip"
										   class="form-control"
										   :class="{has_error: errors.first('zip')}"
										   v-model="user.zip"
										   v-validate
										   data-vv-rules="required"
										   data-vv-as = "Zip">
									<span v-show="errors.has('zip')" class="help is-danger">{{ errors.first('zip') }}</span>
								</div>
							</div>
							<div class="col-md-4 col-sm-6 col-xs-12">
								<div class="form-group">
									<label for="country">Country:</label>
									<input type="text" name="country"
										   class="form-control"
										   :class="{has_error: errors.first('country')}"
										   v-model="user.country"
										   v-validate
										   data-vv-rules="required"
										   data-vv-as = "Country">
									<span v-show="errors.has('country')" class="help is-danger">{{ errors.first('country') }}</span>
								</div>
							</div>
							<div class="col-md-4 col-sm-6 col-xs-12">
								<div class="form-group">
									<label for="phone">Phone:</label>
									<input type="tel" name="phone" v-model="user.phone" class="form-control">
								</div>
							</div>
							<div class="col-md-4 col-sm-6 col-xs-12">
								<div class="form-group">
									<label for="tax_id">Tax ID:</label>
									<input type="text" name="tax_id" v-model="user.tax_id" class="form-control">
								</div>
							</div>
							<div class="col-md-4 col-sm-6 col-xs-12">
								<div class="form-group">
									<label for="rates_email">Rates e-mail:</label>
									<input type="email" name="rates_email" v-model="user.rates_email"  class="form-control">
								</div>
							</div>
						</div>
					</section>
					<section class="reg_form_section">
						<h2 class="reg_section_name">Billing Information</h2>
						<div class="checkbox checkbox-success pull-right reg_check">
							<input id="checkbox" type="checkbox" v-model="billing.same_as_base" >
							<label for="checkbox">
								Use the same as Basic Info
							</label>
						</div>
						<div class="row">
							<div class="col-md-4 col-sm-6 col-xs-12">
								<div class="form-group">
									<label for="b_address">Address:</label>
									<input type="text" name="b_address"
										   class="form-control"
										   :class="{has_error: errors.first('b_address')}"
										   v-model="billing.address"
										   v-validate
										   data-vv-rules="required"
										   data-vv-as = "Address">
									<span v-show="errors.has('b_address')" class="help is-danger">{{ errors.first('b_address') }}</span>
								</div>
							</div>
							<div class="col-md-4 col-sm-6 col-xs-12">
								<div class="form-group">
									<label for="b_city">City:</label>
									<input type="text" name="b_city"
										   class="form-control"
										   :class="{has_error: errors.first('b_city')}"
										   v-model="billing.city"
										   v-validate
										   data-vv-rules="required"
										   data-vv-as = "City">
									<span v-show="errors.has('b_city')" class="help is-danger">{{ errors.first('b_city') }}</span>
								</div>
							</div>
							<div class="col-md-4 col-sm-6 col-xs-12">
								<div class="form-group">
									<label for="b_state">State:</label>
									<input type="text" name="b_state"
										   v-model="billing.state"
										   :class="{has_error: errors.first('b_state')}"
										   class="form-control"
										   v-validate
										   data-vv-rules="required"
										   data-vv-as = "State">
									<span v-show="errors.has('b_state')" class="help is-danger">{{ errors.first('b_state') }}</span>
								</div>
							</div>
							<div class="col-md-4 col-sm-6 col-xs-12">
								<div class="form-group">
									<label for="b_zip">Zip:</label>
									<input type="text" name="b_zip"
										   class="form-control"
										   :class="{has_error: errors.first('b_zip')}"
										   v-model="billing.zip"
										   v-validate
										   data-vv-rules="required"
										   data-vv-as = "Zip">
									<span v-show="errors.has('b_zip')" class="help is-danger">{{ errors.first('b_zip') }}</span>
								</div>
							</div>
							<div class="col-md-4 col-sm-6 col-xs-12">
								<div class="form-group">
									<label for="b_country">Country:</label>
									<input type="text" name="b_country"
										   class="form-control"
										   :class="{has_error: errors.first('b_country')}"
										   v-model="billing.country"
										   v-validate
										   data-vv-rules="required"
										   data-vv-as = "Country">
									<span v-show="errors.has('b_country')" class="help is-danger">{{ errors.first('b_country') }}</span>
								</div>
							</div>
							<div class="col-md-4 col-sm-6 col-xs-12">
								<div class="form-group">
									<label for="billing_contact">Billing Contact Name:</label>
									<input type="text" name="billing_contact"
										   class="form-control"
										   :class="{has_error: errors.first('billing_contact')}"
										   v-model="billing.contact"
										   v-validate
										   data-vv-rules="required"
										   data-vv-as = "Billing Contact Name">
									<span v-show="errors.has('billing_contact')" class="help is-danger">{{ errors.first('billing_contact') }}</span>
								</div>
							</div>
							<div class="col-md-4 col-sm-6 col-xs-12">
								<div class="form-group">
									<label for="b_phone">Billing Phone:</label>
									<input type="tel" name="b_phone" v-model="billing.phone" class="form-control">
								</div>
							</div>
							<div class="col-md-4 col-sm-6 col-xs-12">
								<div class="form-group">
									<label for="billing_email">Billing e-mail:</label>
									<input type="email" name="billing_email"
										   v-model="billing.email"
										   class="form-control"
										   :class="{has_error: errors.first('billing_email')}"
										   v-validate
										   data-vv-rules="required"
										   data-vv-as = "Billing e-mail">
									<span v-show="errors.has('billing_email')" class="help is-danger">{{ errors.first('billing_email') }}</span>
								</div>
							</div>
						</div>
					</section>
					<div class="row">
						<div class="col-md-6 col-sm-12">
							<section class="reg_form_section">
							<h2 class="reg_section_name">Trunk IPs</h2>
							<template v-for="(item, index) in ip_list">
								<div class="col-md-5 col-sm-4">
									<div class="form-group">
										<label>IP Addresses:</label>
										<input type="text" name="password" v-model="item.ip" class="form-control" placeholder="Enter IP">
									</div>
								</div>
								<div class="col-md-3 col-sm-2">
									<div class="form-group">
										<label class="m-top-15"></label>
										<input type="text" name="password" v-model="item.port" class="form-control" placeholder="Enter Port">
									</div>
								</div>
								<div class="col-md-3 col-sm-2">
									<div class="form-group">
										<label class="m-top-15"></label>
										<input type="text" name="password" v-model="item.mask" class="form-control" placeholder="Enter Mask">
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
							</section>
							<!-- <section class="reg_form_section">
								<h2 class="reg_section_name">Trunk IPs</h2>
								<div class="form-group">
									<label for="ip">IP Address:</label>
									<div class="row">
										<div class="col-md-8 col-sm-8 col-xs-12">
											<input type="text" name="ip" class="form-control col-md-9 col-sm-12">
										</div>
										<div class="col-md-4 col-sm-4 col-xs-12 no-pad">
											<button class="btn btn-primary add add_ip">Add IP</button>
										</div>
									</div>
								</div>
							</section> -->
						</div>
						<div class="col-md-6 col-sm-12">
							<section class="reg_form_section">
								<h2 class="reg_section_name">Product</h2>
								<template v-for="(item, index) in product_list">
								<div class="form-group">
									<label for="product_name">Product Name:</label>
									<div class="row">
										<div class="col-md-8 col-sm-8 col-xs-12">
											<input type="text" name="product_name" v-model="item.name" class="form-control">
										</div>
										<!-- <div class="col-md-4 col-sm-4 col-xs-12 no-pad">
											<a><span class="dnl_icon dnl_add" @click="addProduct"></span></a>
										</div> -->
										<div class="col-md-1 col-sm-2" v-if="index==0">
											<div class="inline_actions"  style="margin-top: 7px;">
												<a><span class="dnl_icon dnl_add" @click="addProduct"></span></a>
											</div>
										</div>
										<div class="col-md-1 col-sm-2" v-if="index>0">
											<div class="inline_actions" style="margin-top: 7px;">
												<a><span class="dnl_icon dnl_action_delete" @click="deleteProduct(index)"></span></a>
											</div>
										</div>
									</div>
								</div>
								</template>
							</section>
						</div>
					</div>
					<div class="recaptcha">
						<vue-recaptcha ref="recaptcha" sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" @verify="onVerify" @expired="onExpired"></vue-recaptcha>
					</div>
					<button class="btn btn-primary sign_up pull-right" type="button" v-on:click="register">Sign Up</button>
				</form>
			</div>
		</div>
	</div>
</template>

<style>
	.registration_screen {
    	background-color: #f5f7f9;
		height: 100%;
		width: 100%;
		padding-top: 45px;
	}

	.reg_logo {
		width: 140px;
		margin: 0 auto 45px auto;
	}

	.registration_screen h3 {
		font-size: 24px;
		font-family: "RobotoBold";
	}

	h2.reg_section_name {
    	font-size: 24px;
		margin-top: 0;
	}

	.reg_form_wrapper {
	  border: 1px solid rgb(222, 224, 227);
	  border-radius: 5px;
	  background-color: rgb(255, 255, 255);
	  box-shadow: 0px 2px 7px 0px rgba(184, 187, 196, 0.2);
	  padding: 18px;
	  margin-top: 30px;
	}

	.registration_screen p.center-block.text-center {
		margin-bottom: 0;
	}

	.reg_form_section {
		background: #f7f8f9;
		padding: 18px;
		border-radius: 5px;
		margin-bottom: 18px;
	}

	.btn.btn-primary {
	  border: 1px solid rgb(222, 224, 227);
	  border-radius: 5px;
	  background-color: rgb(3, 192, 252);
	  box-shadow: 0px 2px 7px 0px rgba(184, 187, 196, 0.2);
	  height: 38px;
	  width: 198px;
	  line-height: 23px;
	}

	.btn.btn-primary.add {
		width: 100%;
	}

	.col-md-4.col-sm.col-xs-12.no-pad {
		padding-left: 0;
	}

	button.btn.btn-primary.sign_up.pull-right {
		margin-top: -65px;
	}

	.btn.btn-primary:active,
	.btn.btn-primary:focus,
	.btn.btn-primary:hover {
		background-color: #4bd4ff;
		border: 1px solid rgb(222, 224, 227);
		outline: none;
	}


	@media (max-width: 767px) {
		.checkbox.checkbox-success.pull-right.reg_check {
			float: none !important;
			margin-top: 0;
		}
		.btn.btn-primary.add {
			margin-top: 15px;
		}
		button.btn.btn-primary.sign_up.pull-right {
			width: 100%;
    		display: block;
    		margin: 15px auto;
    		float: none !important;
		}
		.reg_logo {
			margin: 0 auto 30px auto;
		}
	}

	@media (max-width: 480px) {
		body {
			font-size: 12px;
		}

		.registration_screen {
			padding-top: 30px;
		}

		.registration_screen h3 {
			font-size: 18px;
		}

		h2.reg_section_name {
			font-size: 20px;
		}

		.reg_form_wrapper {
			padding: 8px;
		}

	}


</style>

<script>
	const VueRecaptcha = require('vue-recaptcha/dist/vue-recaptcha.min.js'),
		api = require('../../api');
	const auth = require("../../auth");
	import { mapActions } from 'vuex';
	module.exports = {
		components: {
			'vue-recaptcha': VueRecaptcha
		},
		data () {
			return {
				product_list: [{
					name: '',
				}],
				ip_list: [{
					ip: '',
					port: '',
					mask: '',
				}],
				user_template: {},
				company: {
					company_name:'',
					rates_email:'',
					business_contact:'',
					noc_email:'',
					main_email:''
				},
				user: {
					username: '',
					password: '',
					confirm_password: '',
					address: '',
					city: '',
					state: '',
					zip: '',
					country: '',
					phone: ''
				},
				billing: {
					same_as_base: false,
					address:'',
					city:'',
					state:'',
					zip:'',
					country:'',
					contact:'',
					phone:'',
					email:''
				}
			}
		},
		methods: {
			...mapActions({
				setMessage: 'app_message/setAppMessage'
			}),
			deleteProduct(id) {
				let index = id
                if (~id) {
                    this.product_list.splice(index, 1)
                }
			},
			addProduct() {
				this.product_list.push({
					name: '',
				});
			},
			deleteIP(id) {
                let index = id
                if (~id) {
                    this.ip_list.splice(index, 1)
                }
            },
			addIP() {
				this.ip_list.push({
                    ip: '',
					port: '',
					mask: '',
                })
			},
			getUserForRequest () {
				const user_template = Object.assign({}, this.user_template);

				// user_template.name = this.rule.name;
				// user_template.type = this.rule.type_rate;
				// user_template.monthly_fee = this.rule.price_did_month;
				// user_template.rate_per_min = this.rule.price_minute;
				// user_template.payphone_subcharge = this.rule.payphone_subcharge;
				// user_template.setup_fee = 0;
				// user_template.rate_table_id = 0;

				user_template.password = this.user.password;
				user_template.send_signup_notification = 0;
				user_template.phone = this.user.phone;
				user_template.city = this.user.city;
				user_template.billing_zip = this.billing.zip;
				user_template.rate_send_from_email = this.company.rates_email;
				user_template.rate_send_to_email = this.user.rates_email;
				user_template.zip = this.user.zip;
				user_template.company_detail = '';
				user_template.referral = '';
				user_template.main_email = this.company.main_email;
				user_template.billing_city = this.billing.city;
				user_template.billing_contact_name = this.billing.contact;
				user_template.tax_id = this.user.tax_id;
				user_template.ip_address = this.ip_list;
				user_template.billing_email = this.billing.email;
				user_template.state = this.user.state;
				user_template.billing_phone = this.billing.phone;
				user_template.billing_address = this.billing.address;
				user_template.address = this.user.address;
				user_template.username = this.user.username;
				user_template.billing_country = this.billing.country;
				user_template.noc_email = this.company.noc_email;
				user_template.country = this.user.country;
				user_template.company = this.company.company_name;
				user_template.billing_state = this.billing.state;
				user_template.client_name = this.company.business_contact;

				// user_template.agent = "string";
				// user_template.client_id = 0;
				// user_template.default_mod2 = 0;
				// user_template.reseller_id = 0;
				// user_template.report_group = true;
				// user_template.card_id = 0;
				// user_template.all_termination = true;
				// user_template.is_online = 0;
				// user_template.show_carrier_trunk_drop_only = true;
				// user_template.report_fields = "string";
				// user_template.email = "user@example.com";
				// user_template.fullname = "string";
				// user_template.default_mod = 0;
				// user_template.active = true;
				// user_template.user_type = "admin";
				// user_template.name = this.user.username;
				// user_template.outbound_report = true

				return user_template;
			},
			createUser() {
				console.log(this.company);
				const reqBody = this.getUserForRequest();
				const url = api.getEndpointUrl() + '/v1/registration/create';
				console.log("reqBody:", reqBody);
				this.$http.post(url, reqBody,
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				})
					.then(response => {
						if (response.body.success) {
							this.setMessage('User account was created successfully');
							var thisvm = this;
							setTimeout(function(){
								thisvm.$router.push('/auth/login');
							}, 3000);
						}
					})
					.catch(error => {
						console.log(error)
						this.setMessage({
							message: 'Failed to create user',
							type: 'error'
						})
					})	
			},
			onVerify (response) {
				console.log('Verify: ' + response);
			},
			onExpired () {
				console.log('Expired');
			},
			resetRecaptcha () {
				this.$refs.recaptcha.reset(); // Direct call reset method
			},
			register () {
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
						vm.createUser();
					}
						
				}).catch((error) => {
					// eslint-disable-next-line
					console.log(error)
					vm.setMessage({
						message: 'Validation failed',
						type: 'error'
					})
				});
				// this.$validator.validateAll()
				// .then(() => {
					// if (this.user.password !== this.user.confirm_password) { return }
					// const url = api.getEndpointUrl() + '/user/create'
					// this.$http.post(url, this.user)
					// .then(response => {
					// 	console.log(response)
					// })
					// .catch(error => {
					// 	console.log(error)
					// })
				// })
			}
		}
	};
</script>
