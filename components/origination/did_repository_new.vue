<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="#">Origination</a>
					</li>
					<li class="breadcrumb-item">
						<router-link to="/origination/did_repository">DID Repository</router-link>
					</li>
					<li class="breadcrumb-item active">New</li>
				</ol>
				<h1 class="page-header">New Repository</h1>
				<router-link to="/origination/did_repository" class="btn btn_white back">
					<span class="dnl_icon dnl_import"></span> Back </router-link>
				<div class="white_pad">
					<!--<div class="col-md-8 col-sm-10">-->
						<form class="form" @submit.prevent="validateForRepository">
							<section class="config_section">
								<h2 class="config_section_name">Basic Info</h2>
								<div class="row">
									<div class="col-md-3 col-sm-4">
										<div class="form-group">
											<label for="did">DID:</label>
											<!-- <input type="text" name="did" v-model="repository.did" class="form-control" :class="{'input': true, 'is-danger': errors.has('did') }" v-validate="'required|numeric'" placeholder="Enter DID">
											<span v-show="errors.has('did')" class="help is-danger">{{ errors.first('did') }}</span> -->
											<select class="selectable" v-model="repository.did">
												<option v-for="item in code_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
										</div>
									</div>
									<div class="col-md-3 col-sm-4">
										<div class="form-group">
											<label>DID Vendor:</label>
											<!--<select2 :options="statusoptions" v-model="statusselect"></select2>-->
											<select class="selectable" v-model="repository.vendor_res_id">
												<option v-for="item in vendor_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
										</div>
									</div>
									<div class="col-md-3 col-sm-4">
										<div class="form-group">
											<label>Vendor Billing Rule:</label>
											<!--<select2 :options="statusoptions" v-model="statusselect"></select2>-->
											<select class="selectable" v-model="repository.vendor_billing_rule_id">
												<option v-for="item in billing_rule_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
										</div>
									</div>
									<div class="clearfix"></div>
									<div class="col-md-3 col-sm-4">
										<div class="form-group">
											<label>DID Client:</label>
											<!--<select2 :options="statusoptions" v-model="statusselect"></select2>-->
											<select class="selectable" v-model="repository.client_res_id">
												<option v-for="item in client_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
										</div>
									</div>
									<div class="col-md-3 col-sm-4">
										<div class="form-group">
											<label>Client Billing Rule:</label>
											<!--<select2 :options="statusoptions" v-model="statusselect"></select2>-->
											<select class="selectable" v-model="repository.client_billing_rule_id">
												<option v-for="item in billing_rule_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
										</div>
									</div>
									<!--<div class="col-md-3 col-sm-4">
										<div class="form-group">
											<label for="username">Rate Table:</label>
											<select2 :options="frequencyoptions" v-model="selectfreq"></select2>
											<select class="selectable" v-model="rate_table">
												<option v-for="item in rate_table_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
										</div>
									</div>-->
								</div>
							</section>
							<div class="button_set little-space">
								<button class="btn btn-primary" type="submit">
									Submit
								</button>
								<button class="btn btn-default">
									Reset
								</button>
							</div>
						</form>
					<!--</div>-->
					<div class="clearfix little-space"></div>
				</div>
			</div>
		</div>
	</div>
</template>


<style>
.m-top-33 {
	margin-top: 33px;
}

@media (max-width: 767px) {
	.m-top-33 {
		margin-top: 10px;
	}
}
</style>

<script>   
const vSelect = require('vue!../main_components/select.vue');
const api = require("../../api");
const auth = require("../../auth");
import { mapActions } from 'vuex';
module.exports = {
	components: {
		'select2': vSelect
	},
	props: ['editingrepository', 'id'],
	data: function () {
		return {
			code_options: [],
			client_options: [],
			billing_rule_options: [],
			vendor_options: [],
			type_rate_options: [
				{ id: 'fixed', text: 'Fixed Rate' },
				{ id: 'varialble', text: 'Variable Rate' }
			],
			repository: {},

			enable_rep_grouping: false,
			enable_outbound_report: true,
			allow_termination_tab: false,
			activate: false,
			username: '',
			full_name: '',
			password: '',
			confirm_password: '',
			commission: 0,
			email: '',
			ip: '',
			enable_rep_grouping: '',
			selectmethod: 'By Profit',
			methodoptions: [
				{ id: 'By Profit', text: 'Profit' },
				{ id: 'By Revenue', text: 'Revenue' }
			],
			selectfreq: 'daily',
			frequencyoptions: [
				{ id: 'daily', text: 'Daily' },
				{ id: 'weekly', text: 'Weekly' },
				{ id: 'monthly', text: 'Monthly' }
			],
			statusselect: 1,
			statusoptions: [
				{ id: 1, text: 'true' },
				{ id: 2, text: 'false' }
			],
			groupname: '',
			groups: [
				{ id: 1, value: 'carrier1', text: 'Carrier 1' },
				{ id: 2, value: 'carrier2', text: 'Carrier 2' },
				{ id: 3, value: 'carrier3', text: 'Carrier 3' },
				{ id: 4, value: 'carrier4', text: 'Carrier 4' },
				{ id: 5, value: 'carrier5', text: 'Carrier 5' }
			],
			repository_template: {},
			emptyRepository: {
				name: '',
				type_rate: 'fixed',
				price_did_month: '',
				price_minute: '',
				payphone_subcharge: ''
			}
		}
	},
	methods: {
		...mapActions({
			setMessage: 'app_message/setAppMessage'
		}),
		fetchCodes() {
			const url = api.getEndpointUrl() + '/v1/switch/code/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					
					if (body.success) {
						const codes = body.payload.items
						console.log(111);
						console.log(codes);
						var self = this;
						codes.forEach(function (temp, i) {
							var code = {};
							code.id = temp.code;
							code.text = temp.name;
							self.code_options.push(code);
							if (i == 0)
								self.repository.did = code.id;
						});
						console.log(this.code_options);
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
		fetchClients() {
			const url = api.getEndpointUrl() + '/v1/did/client/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const clients = body.payload.items
						var self = this;
						clients.forEach(function (temp, i) {
							var client = {};
							client.id = temp.client_id;
							client.text = temp.name;
							self.client_options.push(client);
							if (i == 0)
								self.repository.client_res_id = client.id;
						});
						console.log(this.client_options);
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
		fetchBillingRules() {
			const url = api.getEndpointUrl() + '/v1/did/billing_rule/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const rules = body.payload.items
						var self = this;
						rules.forEach(function (temp, i) {
							var rule = {};
							rule.id = temp.id;
							rule.text = temp.name;
							self.billing_rule_options.push(rule);
							if (i == 0) {
								self.repository.vendor_billing_rule_id = rule.id;
								self.repository.client_billing_rule_id = rule.id;
							}
						});
						console.log(this.billing_rule_options);
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
		fetchVendors() {
			const url = api.getEndpointUrl() + '/v1/did/vendor/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const vendors = body.payload.items
						var self = this;
						vendors.forEach(function (temp, i) {
							var vendor = {};
							vendor.id = temp.client_id;
							vendor.text = temp.name;
							self.vendor_options.push(vendor);
							if (i == 0)
								self.repository.vendor_res_id = vendor.id;
						});
						console.log(this.vendor_options);
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
		resetRepository() {
			this.repository = Object.assign({}, this.emptyRepository)
		},
		organizeRepositoryData(data) {
			this.repository = {
				client_billing_rule_id: data.client_billing_rule_id,
				client_res_id: data.client_res_id,
				vendor_res_id: data.vendor_res_id,
				vendor_billing_rule_id: data.vendor_billing_rule_id,
				did: data.did,
			}
		},
		fetchRepository() {
			const url = api.getEndpointUrl() + '/v1/did/repository/' + this.id
			this.$http.get(url)
			.then(response => {
				const body = response.body
				if (body.success) {
					console.log(body.payload);
					this.organizeRepositoryData(body.payload)
				}
			})
			.catch(error => {
				console.log(error)
			})
		},
		getRepositoryForRequest() {
			const repository_template = Object.assign({}, this.repository_template);

				repository_template.client_billing_rule_id = this.repository.client_billing_rule_id;
				repository_template.client_res_id = this.repository.client_res_id;
				repository_template.vendor_res_id = this.repository.vendor_res_id;
				repository_template.vendor_billing_rule_id = this.repository.vendor_billing_rule_id;
				repository_template.did = this.repository.did;

				return repository_template;
		},
		saveRepository() {
			const reqBody = this.getRepositoryForRequest();
			console.log(reqBody);
				var url;
				if(this.editingrepository) {
					url = api.getEndpointUrl() + '/v1/did/repository/' + this.id;
					this.$http.patch(url, reqBody)
						.then(response => {
							if (response.body.success) {
								this.setMessage('Repository was changed successfully');
								var thisvm = this;
								setTimeout(function(){
									thisvm.$router.push('/origination/did_repository');
								}, 3000);
							}
						})
						.catch(error => {
							console.log(error)
							this.setMessage({
								message: 'Failed to change repository',
								type: 'error'
							})
						})	
				}
				else {
					url = api.getEndpointUrl() + '/v1/did/repository/create';
					this.$http.post(url, reqBody)
						.then(response => {
							if (response.body.success) {
								this.setMessage('Repository was created successfully');
								var thisvm = this;
								setTimeout(function(){
									thisvm.$router.push('/origination/did_repository');
								}, 3000);
							}
						})
						.catch(error => {
							console.log(error)
							this.setMessage({
								message: 'Failed to create repository',
								type: 'error'
							})
						})	
				}
		},
		validateForRepository() {
			console.log("validateForRepository");
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
					vm.saveRepository();
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
		if (this.editingrepository) {
			this.fetchRepository();
		} else {
			this.resetRepository()
		}
		this.fetchVendors();
		this.fetchBillingRules();
		this.fetchClients();
		this.fetchCodes();
	}
}
</script>
