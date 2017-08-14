<template>
	<div class="container-fluid">
		<div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Configuration</a></li>
				  <li class="breadcrumb-item active">Default Origination Failover Rule</li>
			</ol>
			<h1 class="page-header">Default Origination Failover Rule</h1>
			<spinner v-show="loading" class="spinner"></spinner>
			<tabs>
				<tab label="System Default" class="" icon="dnl_icon dnl_setting" selected>
					<div class="table-responsive">
						<table class="table table-striped table-hover codes">
						  <thead>
							<tr>
							  <th>Code</th>
							  <th>Route Type</th>
							  <th>Response</th>
							</tr>
						  </thead>
						  <tbody>
							<tr v-for="code in orderBy(default_codes, 'name')">
							  <td>{{code.match_code}}</td>
							  <td>{{code.failover_method}}</td>
							  <td>
								  <!--<span v-for="response in code.responses">-->
									{{code.return_code}},
									{{code.return_clause}}
								  <!--</span>-->
							  </td>
							</tr>
						  </tbody>
						</table>
					</div>
				</tab>
				<tab label="User-Defined Origination" class="" icon="dnl_icon dnl_to_left">
					<div class="table-responsive">
						<table class="table table-striped table-hover codes">
						  <thead>
							<tr>
							  <th>Code</th>
							  <th>Route Type</th>
							  <th>Response</th>
							</tr>
						  </thead>
						  <tbody>
							<tr v-for="code in orderBy(origination_codes, 'name')">
							  <td>
								  <input type="text" name="groupname" placeholder="Enter code name" class="form-control" v-model="code.match_code">
							  </td>
							  <td>
								  <select2 :options="route_types" v-model="code.failover_method"></select2>
							  </td>
							  <td>
								  <!--<div v-for="response in code.responses">-->
								  	<input  v-if="code.return_code" type="text"  name="groupname" class="form-control inline-block mini" v-model="code.return_code" placeholder="Enter code name">
								  	<input v-if="code.return_clause" type="text"  name="groupname" class="form-control inline-block larger" v-model="code.return_clause" placeholder="Enter response message">
								  <!--</div>-->
							  </td>
							</tr>
						  </tbody>
						</table>
					</div>
					<div class="button_set">
						<a class="btn btn-primary mini" @click="submitOrigination">
							Submit
						</a>
						<a class="btn btn-default mini">
							Reset
						</a>
					</div>
				</tab>
				<tab label="User-Defined Termination" class="" icon="dnl_icon dnl_to_right">
					<div class="table-responsive">
						<table class="table table-striped table-hover codes">
						  <thead>
							<tr>
							  <th>Code</th>
							  <th>Route Type</th>
							  <th>Response</th>
							</tr>
						  </thead>
						  <tbody>
							<tr v-for="code in orderBy(termination_codes, 'name')">
							  <td>
								  <input type="text" name="groupname" placeholder="Enter the group name" class="form-control" v-model="code.match_code">
							  </td>
							  <td>
									<select class="selectable" v-model="code.failover_method">
										<option v-for="route_type in route_types" v-bind:value="route_type.id">
											{{ route_type.text }}
										</option>
									</select>
							  </td>
							  <td>
									<!--<div v-for="response in code.responses">-->
								  	<input  v-if="code.return_code" type="text"  name="groupname" class="form-control inline-block mini" v-model="code.return_code" placeholder="Enter code name">
								  	<input v-if="code.return_clause" type="text"  name="groupname" class="form-control inline-block larger" v-model="code.return_clause" placeholder="Enter response message">
								  <!--</div>-->
							  </td>
							</tr>
						  </tbody>
						</table>
					</div>
					<div class="button_set">
						<a class="btn btn-primary mini" @click="submitTermination">
							Submit
						</a>
						<a class="btn btn-default mini" @click="resetTermination">
							Reset
						</a>
					</div>
				</tab>
			</tabs>
		</div>
	  </div>
	</div>
</template>

<script>   
	const vTabs = require('vue!../main_components/tabs.vue'),
	vTab = require('vue!../main_components/tab.vue'),
	vSelect = require('vue!../main_components/select.vue');
	const api = require("../../api");
	const auth = require("../../auth");
	const vSpinner = require('vue!../main_components/fadeloader.vue');
	_ = require('lodash');
	import {mapGetters,	mapActions} from 'vuex'
	
	module.exports = {
		components: {
			'tabs': vTabs,
			'tab': vTab,
			'select2': vSelect,
			'spinner': vSpinner
		},
		data: function(){
			return {
				loading: false,
				route_types: [
				  { id: 'Fail to Next Host', text: 'Fail to Next Host' },
				  { id: 'Fail to Next Trunk', text: 'Fail to Next Trunk' },
				  { id: 'Stop', text: 'Stop' },
			  	],
				default_codes: [],
			  origination_codes: [],
				origination_codes_back: [],
			  termination_codes: [],
				termination_codes_back: [],
			}
		},
		created: function() {
			console.log("default failover rule created");
			this.loading = true;
			this.$http.get(api.getEndpointUrl() + "/v1/config/failover/global/list",
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function(response) {
				this.loading = false;
				this.default_codes = response.body.payload.items;
				console.log("default_codes-->");
				console.log(this.default_codes);
			}, function(error) {
				this.loading = false;
				console.log(error);
			});
			
			this.loading = true;
			this.$http.get(api.getEndpointUrl() + "/v1/config/failover/origination/list",
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function(response) {
				this.loading = false;
				this.origination_codes_back = response.body.payload.items;
				this.origination_codes_back.forEach(function(code, i){
					var temp = {};
					temp.id = code.id;
					temp.match_code = code.match_code;
					temp.failover_method = code.failover_method;
					temp.return_code = code.return_code;
					temp.return_clause = code.return_clause;
					vm.origination_codes.push(temp);
				});
				console.log("origination_codes-->");
				console.log(this.origination_codes);
			}, function(error) {
				this.loading = false;
				console.log(error);
			});

			this.loading = true;
			this.$http.get(api.getEndpointUrl() + "/v1/config/failover/termination/list",
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function(response) {
				this.loading = false;
				var vm = this;
				// this.termination_codes = response.body.payload.items;
				this.termination_codes_back = response.body.payload.items;
				this.termination_codes_back.forEach(function(code, i){
					var temp = {};
					temp.id = code.id;
					temp.return_code = code.return_code;
					temp.failover_method = code.failover_method;
					temp.return_clause = code.return_clause;
					temp.match_code = code.match_code;
					vm.termination_codes.push(temp);
				});
				console.log("termination_codes-->");
				console.log(this.termination_codes);
			}, function(error) {
				this.loading = false;
				console.log(error);
			});

		},
		methods: {
			...mapActions({
				setAsyncConfirm: 'async_confirm/setAsyncConfirm',
				setMessage: 'app_message/setAppMessage'
			}),
			submitTermination: function() {
				console.log("submitTermination");
				var tmp_codes = [];
				tmp_codes = this.termination_codes;
				console.log(tmp_codes);
				if(tmp_codes.length > 0) {
					this.loading = true;
					this.$http.patch(api.getEndpointUrl() + '/v1/config/failover/termination',
					{
						items: tmp_codes
					},
					{
						headers: {
							"X-Auth-Token": auth.getToken()
						}
					}
					)
					.then(response => {
						const body = response.body
						if (body.success)
							this.setMessage('The terminations has been modified!');
						else {
							this.setMessage({
								message: "Editing terminations is failed!",
								type: 'error'
							});
						}
						this.loading = false;
					})
					.catch(error => {
						console.log(error);
						this.loading = false;
						this.setMessage({
							message: "Editing terminations is failed!",
							type: 'error'
						});
					})
				}
			},
			resetTermination: function() {
				console.log("resetTermination");
				console.log(this.termination_codes_back);
				var vm = this;
				this.termination_codes = [];
				// this.termination_codes = this.termination_codes_back;
				this.termination_codes_back.forEach(function(code, i){
					var temp = {};
					temp.id = code.id;
					temp.match_code = code.match_code;
					temp.failover_method = code.failover_method;
					temp.return_code = code.return_code;
					temp.return_clause = code.return_clause;
					vm.termination_codes.push(temp);
				})
			},
			submitOrigination: function() {
				console.log("submitOrigination");
				var tmp_codes = [];
				tmp_codes = this.origination_codes;
				if(tmp_codes.length > 0) {
					this.$http.patch(api.getEndpointUrl() + '/v1/config/failover/origination',
					{
							tmp_codes
					},
					{
							headers: {
									"X-Auth-Token": auth.getToken()
							}
					}
					).then(
							function(response) {
									this.loading = false;
									console.log(response);

									this.$router.go(thisvm.$router.currentRoute);
									this.setMessage('The originations has been modified!');
							},
							function(response) {
									this.loading = false;
									console.log(response);

									this.setMessage({
										message:"Editing originations is failed!",
										type:'error'
									});
							}
					)
				}
			},
			resetOrigination: function() {
				console.log("resetOrigination");
				console.log(this.termination_codes_back);
				var vm = this;
				this.origination_codes = [];
				this.origination_codes_back.forEach(function(code, i){
					var temp = {};
					temp.id = code.id;
					temp.match_code = code.match_code;
					temp.failover_method = code.failover_method;
					temp.return_code = code.return_code;
					temp.return_clause = code.return_clause;
					vm.origination_codes.push(temp);
				})
			},
		}
	
	}
</script>

<style>
	a.tab .dnl_setting {
		font-size: 18px;
		vertical-align: sub;
		margin-right: 3px;
	}
	
	a.tab .dnl_to_left, 
	a.tab .dnl_to_right {
		font-size: 9px;
		vertical-align: middle;
		margin-right: 3px;
		line-height: 0;
	}
	
	table.table.table-striped.table-hover.codes th, 
	table.table.table-striped.table-hover.codes td {
		text-align: left;
		width: 33.3333%;
	}
	
	table.table.table-striped.table-hover.codes tr:hover {
		background: #73767b;
	}
	
	.tabs .button_set {
		margin: 20px 0 0 0;
	}
	
	.codes input.form_control.inline-block {
		display: inline-block !important;
	}
	
	input.form-control.inline-block {
		width: 48.5%;
		display: inline-block;
	}
	
	input.form-control.inline-block:first-of-type {
		margin-right: 1.5%;
	}
	
	table.table-striped.table-hover.codes td {
		padding-right: 8px;
	}

	@media (max-width: 767px) {
		.tabs a.tab {
			padding: 10px;
			height: 40px;
			width: 100%;
			border: 0;
		}
		
		.tabs a.tab.active:first-child {
			border-radius: 5px 5px 0 0;
		}
		
		.tabs a.tab.active {
			border: 0; 
		}
	}
	
	@media (max-width: 480px) {
		.tabs .table-responsive {
			min-width: auto;
		}
	}
	
</style>
