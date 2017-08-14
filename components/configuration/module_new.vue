<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Configuration</a></li>
				  <li class="breadcrumb-item">
					  <router-link to="/configuration/modules">Modules</router-link>
				  </li>
				  <li class="breadcrumb-item active">New</li>
			</ol>
			<h1 class="page-header">Module Editor</h1>
			<router-link to="/configuration/modules" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad">
				<div class="select_group row">
					<div class="col-md-6 col-sm-8">
						<form class="form">
							<div class="row">
								  <div class="form-group">
									<div class="col-sm-6">
										<label for="module_name">Module Name:</label>
										<input type="text" name="module_name" v-model="module_name" class="form-control" placeholder="Enter module name">
									</div>
								  </div>
								  <div class="clearfix little-space"></div>
								  <div class="form-group">
									  <div class="col-sm-6">
										<label for="order_number">Order Number:</label>
										<input type="text" name="order_number" v-model="order_number" class="form-control" placeholder="Enter order number">
									  </div>
								  </div>
							  </div>
							  <div class="button_set little-space">
								<a class="btn btn-primary" @click="validateForModule">
									Submit
								</a>
								<a class="btn btn-default">
									Reset
								</a>
							  </div>
						</form>
					</div>
				</div>
			</div>
		</div>
	  </div>
	</div>
</template>

<script>   
const api = require("../../api");
import { mapActions } from 'vuex'
	module.exports = {
		data: function(){
			return {
				module_name: '',
				order_number: '',
			}
		},
		methods: {
			...mapActions({
				setMessage: 'app_message/setAppMessage'
			}),
			createModule() {
				const reqBody = this.getModuleForRequest();
				const url = api.getEndpointUrl() + '/v1/config/system_function/';
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
			},
			validateForModule() {
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
						vm.createModule();
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
		}
	}
</script>

<style>

</style>
