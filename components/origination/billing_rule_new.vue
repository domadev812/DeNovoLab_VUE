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
						<router-link to="/origination/billing_rule">Billing Rule</router-link>
					</li>
					<li class="breadcrumb-item active">New</li>
				</ol>
				<h1 class="page-header">New Rule</h1>
				<router-link to="/origination/billing_rule" class="btn btn_white back">
					<span class="dnl_icon dnl_import"></span> Back </router-link>
				<div class="white_pad">
					<!--<div class="col-md-8 col-sm-10">-->
						<form class="form" @submit.prevent="validateForRule">
							<section class="config_section">
								<h2 class="config_section_name">Basic Info</h2>
								<div class="row">
									<div class="col-md-3 col-sm-4">
										<div class="form-group">
											<label for="name">Name:</label>
											<input type="text" name="name" v-model="rule.name" class="form-control" :class="{'input': true, 'is-danger': errors.has('name') }" v-validate="'required'" placeholder="Enter Name">
											<span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
										</div>
									</div>
									<div class="col-md-3 col-sm-4">
										<div class="form-group">
											<label for="username">Type Rate:</label>
											<!--<select2 :options="statusoptions" v-model="statusselect"></select2>-->
											<select class="selectable" v-model="rule.type_rate" @change="changeTypeRate">
												<option v-for="item in type_rate_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
										</div>
									</div>
									<div class="col-md-3 col-sm-4">
										<div class="form-group">
											<label>Price/DID/Month:</label>
											<input type="text" name="price_did_month" v-model="rule.price_did_month" class="form-control" :class="{'input': true, 'is-danger': errors.has('price_did_month') }" v-validate="'required|numeric'" placeholder="">
											<span v-show="errors.has('price_did_month')" class="help is-danger">{{ errors.first('price_did_month') }}</span>
										</div>
									</div>
									<div class="clearfix"></div>
									<div class="col-md-3 col-sm-4" v-if="is_fixed_type">
										<div class="form-group">
											<label for="username">Price/Minute:</label>
											<input type="text" name="price_minute" v-model="rule.price_minute" class="form-control" :class="{'input': true, 'is-danger': errors.has('price_minute') }" v-validate="'required|numeric'" placeholder="">
											<span v-show="errors.has('price_minute')" class="help is-danger">{{ errors.first('price_minute') }}</span>
										</div>
									</div>
									<div class="col-md-3 col-sm-4">
										<div class="form-group">
											<label for="max_lines">Payphone Subcharge:</label>
											<input type="text" name="payphone_subcharge" v-model="rule.payphone_subcharge" class="form-control" :class="{'input': true, 'is-danger': errors.has('payphone_subcharge') }" v-validate="'required|numeric'" placeholder="">
											<span v-show="errors.has('payphone_subcharge')" class="help is-danger">{{ errors.first('payphone_subcharge') }}</span>
										</div>
									</div>
									<div class="col-md-3 col-sm-4">
										<div class="form-group">
											<label for="max_lines">Setup Fee:</label>
											<input type="text" name="setup_fee" v-model="rule.setup_fee" class="form-control" :class="{'input': true, 'is-danger': errors.has('setup_fee') }" v-validate="'required|numeric'" placeholder="">
											<span v-show="errors.has('setup_fee')" class="help is-danger">{{ errors.first('setup_fee') }}</span>
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
	props: ['editingrule', 'id'],
	data: function () {
		return {
			is_fixed_type: true,
			type_rate_options: [
				{ id: 'fixed', text: 'Fixed Rate' },
				{ id: 'variable', text: 'Variable Rate' }
			],
			rule: {},

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
			rule_template: {},
			emptyRule: {
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
		changeTypeRate() {
			if(this.rule.type_rate == 'fixed')
				this.is_fixed_type = true;
			else if(this.rule.type_rate == 'variable')
				this.is_fixed_type = false;
		},
		resetRule() {
			this.rule = Object.assign({}, this.emptyRule)
		},
		organizeRuleData(data) {
			this.rule = {
				price_did_month: data.monthly_fee,
				setup_fee: data.setup_fee,
				payphone_subcharge: data.payphone_subcharge,
				name: data.name,
				price_minute: data.rate_per_min,
				rate_table_id: data.rate_table_id,
				type_rate: data.type
			}
		},
		fetchRule() {
			const url = api.getEndpointUrl() + '/v1/did/billing_rule/' + this.id
			this.$http.get(url)
			.then(response => {
				const body = response.body
				if (body.success) {
					console.log(body.payload);
					this.organizeRuleData(body.payload)
				}
			})
			.catch(error => {
				console.log(error)
			})
		},
		getRuleForRequest() {
			const rule_template = Object.assign({}, this.rule_template);

				rule_template.name = this.rule.name;
				rule_template.type = this.rule.type_rate;
				rule_template.monthly_fee = this.rule.price_did_month;
				rule_template.rate_per_min = this.rule.price_minute;
				rule_template.payphone_subcharge = this.rule.payphone_subcharge;
				rule_template.setup_fee = this.rule.setup_fee;
				rule_template.rate_table_id = 0;

				return rule_template;
		},
		saveRule() {
			const reqBody = this.getRuleForRequest();
				var url;
				if(this.editingrule) {
					url = api.getEndpointUrl() + '/v1/did/billing_rule/' + this.id;
					this.$http.patch(url, reqBody)
						.then(response => {
							if (response.body.success) {
								this.setMessage('Billing Rule was changed successfully');
								var thisvm = this;
								setTimeout(function(){
									thisvm.$router.push('/origination/billing_rule');
								}, 3000);
							}
						})
						.catch(error => {
							console.log(error)
							this.setMessage({
								message: 'Failed to change rule',
								type: 'error'
							})
						})
				}
				else {
					url = api.getEndpointUrl() + '/v1/did/billing_rule/create';
					this.$http.post(url, reqBody)
						.then(response => {
							if (response.body.success) {
								this.setMessage('Billing Rule was created successfully');
								var thisvm = this;
								setTimeout(function(){
									thisvm.$router.push('/origination/billing_rule');
								}, 3000);
							}
						})
						.catch(error => {
							console.log(error)
							this.setMessage({
								message: 'Failed to create rule',
								type: 'error'
							})
						})	
				}
		},
		validateForRule() {
			console.log("validateForRule");
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
					vm.saveRule();
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
		if (this.editingrule) {
			this.fetchRule();
		} else {
			this.resetRule()
		}
	}
}
</script>
