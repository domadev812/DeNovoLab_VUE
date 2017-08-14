<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Configuration</a></li>
				  <li class="breadcrumb-item active">Payment Setting</li>
			</ol>
			<h1 class="page-header">Payment Setting</h1>
			<div class="white_pad configuration_pad">
				<div class="col-md-12 col-sm-12">
					<form class="form">
						<section class="config_section payment_setting">
							<div class="row">
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="stripe_secret_key">Stripe Secret Key:</label>
											<input type="text" name="stripe_secret_key" v-model="data.stripe_secret_key" class="form-control" placeholder="Enter Stripe Secret Key">
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="stripe_publishable_key">Stripe Publishable Key:</label>
											<input type="text" name="stripe_publishable_key" v-model="data.stripe_publishable_key" class="form-control" placeholder="Enter Stripe Publishable Key">
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="stripe_service_charge">Stripe Service Charge:</label>
											<span v-show="errors.has('stripe_service_charge')" class="help is-danger">{{ errors.first('stripe_service_charge')}}</span>
											<input type="text" name="stripe_service_charge"
												   class="form-control"
												   placeholder="Enter Stripe Service Charge"
												   v-model="data.stripe_service_charge"
												   v-validate
												   data-vv-rules="required|numeric"
												   data-vv-as = "Stripe Service Charge">
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="paypal_account">Paypal Account:</label>
											<input type="text" name="paypal_account" v-model="data.paypal_account" class="form-control" placeholder="Enter Paypal Account">
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="paypal_service_charge">Paypal Service Charge:</label>
											<span v-show="errors.has('paypal_service_charge')" class="help is-danger">{{ errors.first('paypal_service_charge')}}</span>
											<input type="text" name="paypal_service_charge"
												   class="form-control"
												   placeholder="Enter Paypal Service Charge"
												   v-model="data.paypal_service_charge"
												   v-validate
												   data-vv-rules="required|numeric"
												   data-vv-as = "Paypal Service Charge">
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="email_address">Email Addresses:</label>
											<!-- TODO: custom validate for multiple emails -->
											<span v-show="errors.has('email_address')" class="help is-danger">{{ errors.first('email_address')}}</span>
											<input type="text" name="email_address"
												   class="form-control"
												   placeholder="Enter Email Addresses"
												   v-bind:disabled="!data.notify_carrier"
												   v-model="data.email_address"
												   v-validate
												   data-vv-rules="email"
												   data-vv-as = "Email Addresses">
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="carbon_copy">Carbon Copy to:</label>
											<input type="text" name="carbon_copy" v-bind:disabled="!data.en_p_conf"
												   v-model="data.carbon_copy" class="form-control" placeholder="Enter Carbon Copy to">
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="carbon_copy">Charge Type:</label>
											<select class="selectable" v-model="data.charge_type">
												<option v-for="item in charge_type_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
										</div>
									</div>
									<div class="clearfix"></div>
								    <div class="col-sm-12">
										<div class="checkbox checkbox-success">
											<input id="notify_carrier" type="checkbox" v-model="data.notify_carrier">
											<label for="notify_carrier">
												Enable PayPal Test Mode
											</label>
										</div>
										<div class="checkbox checkbox-success">
											<input id="en_p_conf" type="checkbox" v-model="data.en_p_conf">
											<label for="en_p_conf">
												Enable Payment Confirmation
											</label>
										</div>
										<div class="checkbox checkbox-success">
											<input id="auto_carrier_notif" type="checkbox" v-model="data.auto_carrier_notif">
											<label for="auto_carrier_notif">
												Send Email Notification to Client
											</label>
										</div>
									</div>
							  </div>
						  </section>
						  <div class="button_set little-space">
							<a class="btn btn-primary" @click="submit">
								Submit
							</a>
							<a class="btn btn-default" @click="reset">
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
	const timeDisplay = require('vue!../main_components/time_display.vue');
    const api = require("../../api");
	const auth = require("../../auth");
	import {
		mapGetters,
		mapActions
	} from 'vuex'

	module.exports = {
		components: {
			'time-display': timeDisplay
		},
		data: function(){
            return {
				charge_type_options: [
					{id: 'credit total amount', text: 'Credit Total Amount'},
					{id: 'create actual received amount', text: 'Create Actual Received Amount'}
				],
			  	defaultData: {},
				originalData: {},
				data: {},

				// showmessage: false,
				// errorType: 'error',
				// statusMessage: '',
            }
        },
		methods: {
			// message: function(type, msg){
			// 	this.errorType = type;
			// 	this.statusMessage = msg;
			// 	this.showmessage = true;
			// },
			// hidemessage: function() {
			// 	this.showmessage = false;
			// },
			...mapActions({
				setMessage: 'app_message/setAppMessage'
			}),
			submit: function() {

				this.loading = true;
				console.log(this.data)
				this.$http.patch(api.getEndpointUrl() + '/v1/config/payment',
				{
					// this.data.paypal_service_charge = item.paypal_fee;
					// this.data.paypal_account = item.paypal_account;
					// this.data.stripe_secret_key = item.stripe_secret_key;
					// this.data.stripe_service_charge = item.stripe_fee;
					// this.data.email_address = item.emails;
					// this.data.stripe_publishable_key = item.stripe_publisher_key;
					// this.data.carbon_copy = item.cc_email;
					// this.data.notify_carrier = item.enable_email_notification;
					// this.data.en_p_conf = false;
					// this.data.auto_carrier_notif = false;
					"paypal_fee": this.data.paypal_service_charge,
					"paypal_account": this.data.paypal_account,
					"stripe_secret_key": this.data.stripe_secret_key,
					"stripe_fee": this.data.stripe_service_charge,
					"emails": this.data.email_address,
					"stripe_publisher_key": this.data.stripe_publishable_key,
					"cc_email": this.data.carbon_copy,
					"enable_email_notification": this.data.notify_carrier,
					"payment_received_confirmation": this.data.en_p_conf,
					"auto_carrier_notification": this.data.auto_carrier_notif,
					"charge_type": this.charge_type
				},
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}
				).then(
					function(response) {
						var thisvm = this;
						this.loading = false;
						console.log(response);

						this.setMessage('The Payment Settings Fields has been submitted!');
					},
					function(response) {
						var thisvm = this;
						this.loading = false;
						console.log(response);

						this.setMessage({
							message:'Submitting Payment Settings Fields is failed!',
							type:'error'
						});
					}
				)
			},
			reset: function() {
				console.log('reset:data');
				console.log(this.originalData);
				// this.data = this.originalData;
				// this.data = JSON.parse(JSON.stringify(this.originalData));
				this.data = Object.assign({}, this.originalData);

				// Vue.set(this.data, 'paypal_service_charge', this.originalData.paypal_service_charge);
				// Vue.set(this.data, 'paypal_account', this.originalData.paypal_account);
				// Vue.set(this.data, 'stripe_secret_key', this.originalData.stripe_secret_key);
				// Vue.set(this.data, 'stripe_service_charge', this.originalData.stripe_service_charge);
				// Vue.set(this.data, 'email_address', this.originalData.email_address);
				// Vue.set(this.data, 'stripe_publishable_key', this.originalData.stripe_publishable_key);
				// Vue.set(this.data, 'notify_carrier', this.originalData.notify_carrier);
				// Vue.set(this.data, 'carbon_copy', this.originalData.carbon_copy);
				// Vue.set(this.data, 'en_p_conf', this.originalData.en_p_conf);
				// Vue.set(this.data, 'auto_carrier_notif', this.originalData.auto_carrier_notif);
			},
			loadData: function() {
				this.defaultData = {
					notify_carrier: true,
					en_p_conf: false,
					auto_carrier_notif: false,
					stripe_secret_key: '',
					stripe_publishable_key: '',
					stripe_service_charge: 0,
					paypal_account: '',
					paypal_service_charge: 0,
					email_address: '',
					carbon_copy: ''
				};
				this.data = JSON.parse(JSON.stringify(this.defaultData));
			}
		},
		created: function () {
			//this.loadData();
			this.loading = true;
			this.$http.get(api.getEndpointUrl() + "/v1/config/payment", 
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function(response) {
				var self = this;
				this.loading = false;
				var item = response.body.payload;
				
				Vue.set(this.data, 'paypal_service_charge', item.paypal_fee);
				Vue.set(this.data, 'paypal_account', item.paypal_account);
				Vue.set(this.data, 'stripe_secret_key', item.stripe_secret_key);
				Vue.set(this.data, 'stripe_service_charge', item.stripe_fee);
				Vue.set(this.data, 'email_address', item.emails);
				Vue.set(this.data, 'stripe_publishable_key', item.stripe_publisher_key);
				Vue.set(this.data, 'notify_carrier', (item.enable_email_notification==null ? false : item.enable_email_notification));
				Vue.set(this.data, 'carbon_copy', item.cc_email);
				Vue.set(this.data, 'en_p_conf', (item.payment_received_confirmation==null ? false : item.payment_received_confirmation));
				Vue.set(this.data, 'auto_carrier_notif', (item.auto_carrier_notification==null ? false : item.auto_carrier_notification));
				Vue.set(this.data, 'charge_type', item.charge_type);
				// this.data.paypal_service_charge = item.paypal_fee;
				// this.data.paypal_account = item.paypal_account;
				// this.data.stripe_secret_key = item.stripe_secret_key;
				// this.data.stripe_service_charge = item.stripe_fee;
				// this.data.email_address = item.emails;
				// this.data.stripe_publishable_key = item.stripe_publisher_key;
				// this.data.notify_carrier = item.enable_email_notification;
				// this.data.carbon_copy = item.cc_email;
				// this.data.en_p_conf = item.payment_received_confirmation;
				// this.data.auto_carrier_notif = item.auto_carrier_notification;
				this.originalData = Object.assign({}, this.data);

				console.log(this.data);

			}, function(error) {
				this.loading = false;
				console.log(error);
			});
			
		}
	}
</script>

<style>
	.configuration_pad .button_set.little-space .btn-primary {
		margin-right: 5px;
	}
	.configuration_pad .checkbox-success input[type="checkbox"]:checked + label::before {
		background-color: #03c0fc;
		border-color: #03c0fc;
	}
	
	.payment_setting .checkbox.checkbox-success {
    	margin-top: 15px;
	}
</style>
