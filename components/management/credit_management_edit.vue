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
						<router-link to="/management/credit_management">Credit Managements</router-link>
					</li>
					<li class="breadcrumb-item active">Edit</li>
				</ol>
				<h1 class="page-header">Credit Management Editor</h1>
				<router-link to="/management/credit_management" class="btn btn_white back">
					<span class="dnl_icon dnl_import"></span> Back </router-link>
				<div class="white_pad">
					<!--<div class="col-md-8 col-sm-10">-->
						<section class="config_section">
							<h2 class="config_section_name">Basic Info</h2>
							<div class="row">
								<div class="col-md-3 col-sm-4">
									<div class="form-group">
										<label for="credit_limit">Credit Limit:</label>
										<input type="text" name="credit_limit" v-model="credit.credit_limit" class="form-control" :class="{'input': true, 'is-danger': errors.has('credit_limit') }" v-validate="'required|numeric'" placeholder="Enter Credit Limit">
										<span v-show="errors.has('credit_limit')" class="help is-danger">{{ errors.first('credit_limit') }}</span>
									</div>
								</div>
								<div class="col-md-3 col-sm-4">
									<div class="form-group">
										<label for="cps_limit">CPS Limit:</label>
										<input type="text" name="cps_limit" v-model="credit.cps_limit" class="form-control" :class="{'input': true, 'is-danger': errors.has('cps_limit') }" v-validate="'required|numeric'" placeholder="Enter CPS Limit">
										<span v-show="errors.has('cps_limit')" class="help is-danger">{{ errors.first('cps_limit') }}</span>
									</div>
								</div>
								<div class="col-md-3 col-sm-4">
									<div class="form-group">
										<label for="call_limit">Call Limit:</label>
										<input type="text" name="call_limit" v-model="credit.call_limit" class="form-control" :class="{'input': true, 'is-danger': errors.has('call_limit') }" v-validate="'required|numeric'" placeholder="Enter Call Limit">
										<span v-show="errors.has('call_limit')" class="help is-danger">{{ errors.first('call_limit') }}</span>
									</div>
								</div>
								<div class="clearfix"></div>
							</div>
						</section>
						<div class="button_set little-space">
							<a class="btn btn-primary" @click="validateForCredit">
								Submit
							</a>
							<a class="btn btn-default" @click="resetCredit">
								Reset
							</a>
						</div>
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
	props: ['id', 'credit_limit', 'cps_limit', 'call_limit'],
	data: function () {
		return {
			credit: {},
			credit_template: {},

			emptyCredit: {
				payment_term_id: 1,
				credit_limit: 0,
				active: true,
				call_limit: 0,
				cps_limit: 0
			}
		}
	},
	methods: {
		...mapActions({
			setMessage: 'app_message/setAppMessage'
		}),
		resetCredit() {
			this.credit = Object.assign({}, this.emptyCredit)
		},
		getCreditForRequest() {
			const credit_template = Object.assign({}, this.credit_template);

				// credit_template.payment_term_id = 0;
				credit_template.credit_limit = this.credit.credit_limit;
				credit_template.active = true;
				credit_template.call_limit = this.credit.call_limit;
				credit_template.cps_limit = this.credit.cps_limit;

				return credit_template;
		},
		saveCredit() {
			const reqBody = this.getCreditForRequest();
				const url = api.getEndpointUrl() + '/v1/client/credit/' + this.id;
				this.$http.patch(url, reqBody)
					.then(response => {
						if (response.body.success) {
							this.setMessage('Credit was changed successfully');
							var thisvm = this;
							setTimeout(function(){
								thisvm.$router.push('/management/credit_management');
							}, 3000);
						}
					})
					.catch(error => {
						console.log(error)
						this.setMessage({
							message: 'Failed to change credit',
							type: 'error'
						})
					})	
				
		},
		validateForCredit() {
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
					vm.saveCredit();
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
		this.emptyCredit.payment_term_id = 0;
		this.emptyCredit.credit_limit = this.$route.params.credit_limit;
		this.emptyCredit.active = true;
		this.emptyCredit.call_limit = this.$route.params.call_limit;
		this.emptyCredit.cps_limit = this.$route.params.cps_limit;
		this.resetCredit();
	}
}
</script>
