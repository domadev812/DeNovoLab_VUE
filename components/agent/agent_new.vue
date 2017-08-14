<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="#">Agent</a>
					</li>
					<li class="breadcrumb-item">
						<router-link to="/agent/agent_management">Agent Management</router-link>
					</li>
					<li class="breadcrumb-item active">Agent Management</li>
				</ol>
				<h1 class="page-header">New Agent</h1>
				<router-link to="/agent/agent_management" class="btn btn_white back">
					<span class="dnl_icon dnl_import"></span> Back </router-link>
				<div class="white_pad">
					<!--<div class="col-md-8 col-sm-10">-->
						<form class="form" @submit.prevent="validateBeforeSubmit">
							<section class="config_section">
								<h2 class="config_section_name">Basic Info</h2>
								<div class="row">
									<div class="col-md-3 col-sm-4">
										<div class="form-group">
											<label for="agentname">Agent Name:</label>
											<input type="text" name="agentname" v-model="agentname" class="form-control" :class="{'input': true, 'is-danger': errors.has('agentname') }" v-validate="'required'" placeholder="Enter Agentname">
											<span v-show="errors.has('agentname')" class="help is-danger">{{ errors.first('agentname') }}</span>
										</div>
									</div>
									<div class="col-md-3 col-sm-4">
										<div class="form-group">
											<label for="username">Status:</label>
											<!--<select2 :options="statusoptions" v-model="statusselect"></select2>-->
											<select class="selectable" v-model="statusselect">
												<option v-for="item in statusoptions" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
										</div>
									</div>
									<div class="col-md-3 col-sm-4">
										<div class="form-group">
											<label>E-mail:</label>
											<input type="email" name="email" v-model="email" class="form-control" :class="{'input': true, 'is-danger': errors.has('email') }" v-validate="'required|email'" placeholder="Enter E-mail">
											<span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
										</div>
									</div>
									<div class="clearfix"></div>
									<div class="col-md-3 col-sm-4">
										<div class="form-group">
											<label for="username">Method Type:</label>
											<!--<select2 :options="methodoptions" v-model="selectmethod"></select2>-->
											<select class="selectable" v-model="selectmethod">
												<option v-for="item in methodoptions" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
										</div>
									</div>
									<div class="col-md-3 col-sm-4">
										<div class="form-group">
											<label for="max_lines">Commission:</label>
											<input type="text" name="commission" v-model="commission" class="form-control" :class="{'input': true, 'is-danger': errors.has('commission') }" v-validate="'required|numeric'" placeholder="Commission (%)">
											<span v-show="errors.has('commission')" class="help is-danger">{{ errors.first('commission') }}</span>
										</div>
									</div>
									<div class="col-md-3 col-sm-4">
										<div class="form-group">
											<label for="username">Frequency Type:</label>
											<!--<select2 :options="frequencyoptions" v-model="selectfreq"></select2>-->
											<select class="selectable" v-model="selectfreq">
												<option v-for="item in frequencyoptions" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
										</div>
									</div>
									<div class="clearfix"></div>
									<div class="col-md-3 col-sm-4">
										<div class="form-group">
											<label for="max_lines">Login Username:</label>
											<input type="text" name="username" v-model="username" class="form-control" :class="{'input': true, 'is-danger': errors.has('username') }" v-validate="'required'" placeholder="Enter User Name">
											<span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</span>
										</div>
									</div>
									<div class="col-md-3 col-sm-4">
										<div class="form-group">
											<label>User Password:</label>
											<input type="password" name="password" v-model="password" class="form-control" :class="{'input': true, 'is-danger': errors.has('password') }" v-validate="'required'" placeholder="Enter password">
											<span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
										</div>
									</div>
									<div class="col-md-3 col-sm-4">
										<div class="form-group m-top-33">
											<div class="checkbox checkbox-success">
												<input id="enable_rep_grouping" v-model="enable_rep_grouping" name="enable_rep_grouping" type="checkbox">
												<label for="enable_rep_grouping">Portal Edit Permission</label>
											</div>
										</div>
									</div>
								</div>
							</section>
							<div class="button_set little-space">
								<button class="btn btn-primary" style="width: 100px" type="submit">
									Submit
								</button>
								<a class="btn btn-default" style="width: 100px" @click="reset">
									Reset
								</a>
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
	data: function () {
		return {
			enable_rep_grouping: false,
			enable_outbound_report: true,
			allow_termination_tab: false,
			activate: false,
			agentname: '',
			username: '',
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
			]
		}
	},
	methods: {
		...mapActions({
			setMessage: 'app_message/setAppMessage'
		}),
		reset() {
			console.log("reset");
			this.agentname = '';
			this.email = '';
			this.username = '';
			this.password = '';
			this.statusselect = 1;
			this.selectmethod = 'By Profit';
			this.commission = 0;
			this.selectfreq = 'daily';
			this.enable_rep_grouping = false;
		},
		saveAgent () {
			// eslint-disable-next-line
				this.loading = true;
				var status = false;
				if (this.statusselect == 1) {
					status = true;
				}
				var vm = {};
				vm.name = this.username;
				vm.fullname = this.username;
				vm.passwd = this.password;
				this.$http.post(api.getEndpointUrl() + '/v1/agent/create',
					{
						"method_type": this.selectmethod,
						"email": this.email,
						"commission": this.commission,
						"agent_name": this.agentname,
						"status": status,
						"user": vm,
						"frequency_type": this.selectfreq,
						"edit_permission": this.enable_rep_grouping
					},
					{
						headers: {
							"X-Auth-Token": auth.getToken()
						}
					}
				).then(response => {
					if (response.body.success) {
						this.$router.push('/agent/agent_management');
						this.setMessage('Agent was changed successfully');
					}
					this.loading = false;
				})
				.catch(error => {
					console.log(error)
					this.loading = false;
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

		},
		validateBeforeSubmit: function () {
			var vm = this;
			console.log("validateBeforeSubmit");
			this.$validator.validateAll().then(() => {
				console.log("validateAll");
				const err = this.$validator.getErrors();
				if (err.errors.length > 0) {
					const msg = err.errors[0].field + ' field can not leave as null';
					vm.setMessage({
						message: msg,
						type: 'error'
					})
				}
				else {
					vm.saveAgent();
				}
					
			}).catch((error) => {
				// eslint-disable-next-line
				console.log("error");
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
