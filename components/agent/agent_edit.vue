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
				<h1 class="page-header">Edit Agent</h1>
				<router-link to="/agent/agent_management" class="btn btn_white back">
					<span class="dnl_icon dnl_import"></span> Back </router-link>
				<div class="white_pad configuration_pad">
					<!--<div class="col-md-12 col-sm-12">-->
					<form class="form" @submit.prevent="validateBeforeSubmit">
						<input type="hidden" name="agentid" v-model="agentid" />
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
										<!--<select2 :options="statusoptions" v-model="statusselect" id="status"></select2>-->
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
										<!--<select2 :options="methodoptions" v-model="selectmethod" id="method_type"></select2>-->
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
										<input type="text" name="commission" v-model="commission" class="form-control" :class="{'input': true, 'is-danger': errors.has('commission') }" v-validate="'required'" placeholder="Commission (%)">
										<span v-show="errors.has('commission')" class="help is-danger">{{ errors.first('commission') }}</span>
									</div>
								</div>
								<div class="col-md-3 col-sm-4">
									<div class="form-group">
										<label for="username">Frequency Type:</label>
										<!--<select2 :options="frequencyoptions" v-model="selectfreq" id="frequency"></select2>-->
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
							<a class="btn btn-default" @click="reset">
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
			agentname: '',
			apiUrl: '/v1/agent/',
			agentid: null,
			enable_rep_grouping: false,
			activate: false,
			username: '',
			password: '',
			// confirm_password: '',
			commission: '',
			email: '',
			statusselect: 1,
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
			statusoptions: [
				{ id: 1, text: 'true' },
				{ id: 2, text: 'false' }
			],
			originData:{},
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
		saveAgent: function () {
			// eslint-disable-next-line
			var id = this.agentid;
			this.loading = true;
			var status = false;
			if (this.statusselect == 1) {
				status = true;
			}
			var vm = {};
			vm.name = this.username;
			vm.fullname = this.username;
			vm.passwd = this.password;
			var vmthis = this;
			this.$http.patch(api.getEndpointUrl() + '/v1/agent/' + id,
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
					console.log("success:");
					console.log(response);
					this.loading = false;
					if (response.body.success) {
						vmthis.$router.push('/agent/agent_management');
						vmthis.setMessage('The agent has been modified!');
					}
				})
				.catch(error => {
					console.log("error:");
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
			this.$validator.validateAll().then(() => {
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
				console.log(error)
				vm.setMessage({
					message: 'Validation failed',
					type: 'error'
				})
			});
		}
	},
	created: function () {
		var the = this;
		var id = this.$route.params.id;
		this.loading = true;
		this.$http.get(api.getEndpointUrl() + this.apiUrl + id,
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function (response) {
				//todo: check success flag? validation errors?
				this.loading = false;
				console.log(response);
				var agent = response.body.payload;
				this.agentid = agent.agent_id;
				this.agentname = agent.agent_name;
				this.email = agent.email;
				this.selectmethod = agent.method_type;
				this.commission = agent.commission;
				if (agent.user != null) {
					this.username = agent.user.name;
					this.password = agent.user.passwd;
				}
				// this.commission = agent.commission;
				this.selectfreq = agent.frequency_type;
				var status = 1;
				if (agent.status == false) {
					status = 2;
				}
				// $("#status").val(status).trigger('change');
				// $("#method_type").val(agent.method_type).trigger('change');
				// $("#frequency").val(agent.frequency_type).trigger('change');
				this.originData = {
					agentname: this.agentname,
					email: this.email,
					username: this.username,
					password: this.password,
					statusselect: status,
					selectmethod: status,
					commission: this.commission,
					selectfreq: this.selectfreq,
					enable_rep_grouping: false
				}

			}, function (error) {
				this.loading = false;
				console.log(error);
			});
	}
}
</script>
