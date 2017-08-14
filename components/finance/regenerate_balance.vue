<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Finance</a></li>
				  <li class="breadcrumb-item active">Regenerate Balance</li>
			</ol>
			<h1 class="page-header">Regenerate Balance</h1>
			<div class="white_pad configuration_pad">
				<div class="col-md-12 col-sm-12">
					<form class="form">
						<section class="config_section payment_setting">
							<div class="row">
								   <div class="col-md-3 col-sm-4">
										<label>Carrier Name:</label>
										<select2 :options="carrier_options" v-model="balance.carrier_id">
											<option disabled value="0">Show/Hide Columns</option>
										</select2>
									</div>
								    <div class="col-md-3 col-sm-4">
										<label>Balance On:</label>
										<el-date-picker :picker-options="onlyUntilToday" v-model="balance.balance_on" type="date" placeholder="Balance Date"></el-date-picker>
									</div>
								    <div class="col-md-3 col-sm-4">
										<label>New Balance:</label>
										<input type="text" name="new_balance" v-model="balance.new_balance" class="form-control" :class="{'input': true, 'is-danger': errors.has('new_balance') }" v-validate="{ rules: {required: true, regex: /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/} }" placeholder="Enter New Balance">
                    					<span v-show="errors.has('new_balance')" class="help is-danger">{{ errors.first('new_balance') }}</span>
									</div>
									<div class="clearfix little-space"></div>
									<div class="col-md-3 col-sm-4" v-if="balance.balance_on!=''">
										<label>Actual Balance({{balance.balance_on.toISOString().substring(0, 10)}}):</label>
										<input type="text" value="0" disabled name="new_balance" v-model="balance.new_balance" class="form-control" :class="{'input': true, 'is-danger': errors.has('new_balance') }" v-validate="{ rules: {required: true, regex: /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/} }" placeholder="Enter New Balance">
                    					<span v-show="errors.has('new_balance')" class="help is-danger">{{ errors.first('new_balance') }}</span>
									</div>
									<div class="clearfix little-space"></div>
								    <div class="col-md-12 col-sm-12">
										<div class="checkbox checkbox-success">
											<input id="reg_act_balance" type="checkbox" v-model="balance.reg_act_balance">
											<label for="reg_act_balance">
												Regenerate Actual Balance
											</label>
										</div>
									</div>
								    <div class="col-md-12 col-sm-12">
										<div class="checkbox checkbox-success">
											<input id="reg_mut_balance" type="checkbox" v-model="balance.reg_mut_balance">
											<label for="reg_mut_balance">
												Regenerate Mutual Balance
											</label>
										</div>
									</div>
							  </div>
						  </section>
						  <div class="button_set little-space">
							<a class="btn btn-primary" @click="validateForBalance">
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
	const vSelect = require('vue!../main_components/select.vue');
	const api = require("../../api");
	import { mapActions } from 'vuex';
	module.exports = {
		components: {
			'select2': vSelect
		},
		data: function(){
            return {
				reg_act_balance: false,
				reg_mut_balance: false,
				carrier_options: [],
			  carrier_id: '',
			  balance_on: '',
			  new_balance: '',
			  options: [
				  { id: 1, text: 'Group Name' },
				  { id: 2, text: 'Carrier Count' },
				  { id: 3, text: 'Actions' }
			  ],
			  onlyUntilToday: {
				disabledDate:(time) => {
					return time.getTime() > Date.now();
				}
			  },
			  balance_template: {},
			  emptyBalance: {
				  carrier_id: '',
				  balance_on: '',
				  new_balance: '',
				  reg_act_balance: false,
					reg_mut_balance: false,
			  },
			  balance: {}
            }
        },
		created () {
			this.fetchCarriers();
			this.resetBalance();
		},
		methods: {
			...mapActions({
				setMessage: 'app_message/setAppMessage'
			}),
			resetBalance() {
				this.balance = Object.assign({}, this.emptyBalance);
				console.log("resetBalance");
				console.log(this.balance.balance_on);
			},
			getBalanceForRequest() {
				const balance_template = Object.assign({}, this.balance_template);
				balance_template.start_time = (this.balance.balance_on == "" ? this.balance.balance_on : this.balance.balance_on.toISOString());
				balance_template.new_balance = this.balance.new_balance;
				balance_template.reset_mutual_balance = this.balance.reg_act_balance;
				balance_template.reset_actual_balance = this.balance.reg_mut_balance;
				
				return balance_template;
			},
			saveBalance() {
				const reqBody = this.getBalanceForRequest();
				const url = api.getEndpointUrl() + '/v1/carrier/'+ this.balance.carrier_id +'/regenerate_balance';
				this.$http.post(url, reqBody)
					.then(response => {
						if (response.body.success) {
							this.setMessage('Balance was created successfully');
							var thisvm = this;
							setTimeout(function(){
								thisvm.$router.push('/management/carrier');
							}, 3000);
						}
					})
					.catch(error => {
						console.log(error)
						this.setMessage({
							message: 'Failed to create balance',
							type: 'error'
						})
					})	
			},
			validateForBalance() {
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
						vm.saveBalance();
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
			fetchCarriers() {
				const url = api.getEndpointUrl() + '/v1/carrier/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const carriers = body.payload.items
						console.log(carriers);
						var self = this;
						this.carrier_options = [{
							id: 'all',
							text: 'All'
						}];
						this.balance.carrier_id = 'all';
						carriers.forEach(function (temp, i) {
							var carrier = {};
							carrier.id = temp.client_id;
							carrier.text = temp.name;
							self.carrier_options.push(carrier);
						});
						console.log(this.carrier_options);
						
					}
				})
				.catch(error => {
					console.log(error)
				})
			}
		}
	}
</script>

<style>
</style>
