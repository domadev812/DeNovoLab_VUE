<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item"><a href="#">Routing</a></li>
						<li class="breadcrumb-item">
							<router-link to="/routing/dynamic_routing">Dynamic Routing</router-link>
						</li>
					<li class="breadcrumb-item active">Create Dynamic Routing</li>
				</ol>
				<h1 class="page-header">Create Dynamic Routing</h1>
				<router-link to="/routing/dynamic_routing" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
				<div class="white_pad">
					<form class="form">
						<div class="select_group row">
							<div class="role_section margin-fixed">
								<div class="col-md-3 col-sm-4">
									<div class="form-group">
										<label for="dynamic_routing_name">Name:</label>
										<input v-validate="'required'" type="text" name="dynamic_routing_name" v-model="dynamic_routing_name" class="form-control" placeholder="Enter name">
										<span v-show="errors.has('dynamic_routing_name')" class="help is-danger">{{ errors.first('dynamic_routing_name') }}</span>
									</div>
								</div>
								<div class="col-md-3 col-sm-4">
									<div class="form-group">
										<label>Routing Rule:</label>
										<select class="selectable" v-model="route_rule_name">
											<option disabled value="0" selected>Select Routing Rule</option>
											<option v-for="routing_rule in routing_rule_list" v-bind:value="routing_rule.id">
												{{ routing_rule.text }}
											</option>
										</select>
									</div>
								</div>		
								<div class="clearfix"></div>
								<div class="col-md-3 col-sm-4">
									<div class="form-group">
										<label>Time Profile:</label>
										<select class="selectable" v-model="time_profile_id">
											<option disabled value="0" selected>Select Time Profile</option>
											<option v-for="time_profile in time_profile_list" v-bind:value="time_profile.id">
												{{ time_profile.text }}
											</option>
										</select>
									</div>
								</div>
								<div class="col-md-3 col-sm-4">
									<div class="form-group">
										<label>QoS Cycle:</label>
										<select class="selectable" v-model="qos_cycle">
											<option disabled value="0" selected>Select QoS Cycle</option>
											<option v-for="qos_cycle_item in qos_cycle_list" v-bind:value="qos_cycle_item.id">
												{{ qos_cycle_item.text }}
											</option>
										</select>
									</div>
								</div>
								<div class="clearfix little-space"></div>
							</div>
						</div>
						<div role="group" class="btn-group"> 
							<button type="button" class="btn btn-default" @click="addegress">
								<span class="dnl_icon dnl_add"></span> Add Egress
							</button> 
							<button type="button" class="btn btn-default">
								<span class="dnl_icon dnl_add"></span> Add All Egress
							</button> 
							<button type="button" class="btn btn-default" @click="removeSelected">
								<span class="dnl_icon dnl_action_delete"></span> Remove Selected
							</button> 
							<button  type="button" class="btn btn-default" @click="removeAll">
								<span class="dnl_icon dnl_action_delete"></span> Remove All
							</button>
						</div>
						<div class="table-responsive m-top-10">
							<table class="table table-striped table-hover carrier_groups">
								<thead>
									<tr>
										<th class="width-65">
											<div class="checkbox checkbox-success">
												<input id="select_all" name="select_all" type="checkbox" v-model="checker" v-on:click="clickSelectedAll"> 
												<label for="select_all"></label>
											</div>
										</th>
										<th style="text-align: center">Carriers</th>
										<th>Egress Trunk Name</th>
										<th class="width-65 text-center">Action</th>
									</tr>
								</thead>
								<tbody>
									<template v-for="(egress, index) in egresses">
										<tr>
											<td class="centred_checkbox">
												<div class="checkbox checkbox-success">
												<input v-bind:id="'selected-' + index" v-bind:name="'selected-' + index" type="checkbox" v-model="egress.selected"> 
												<label v-bind:for="'selected-' + index"></label>
												</div>
											</td>
											<td>
												<select class="selectable" v-model="egress.carrier" @change="onchange(index)">
													<option disabled value="0" selected>Select Carriers</option>
													<option v-for="carrier_item in carrier_list" v-bind:value="carrier_item.id">
														{{ carrier_item.text }}
													</option>
												</select>
											</td>
											<td>
												<select class="selectable" v-model="egress.trunk">
													<option disabled value="0" selected>Select egress Trunk Name</option>
													<option v-for="trunk_item in egress.trunk_list" v-bind:value="trunk_item.id">
														{{ trunk_item.text }}
													</option>
												</select>
											</td>
											<td class="text-center">
												<a class="action action_delete center-block" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="deleteegress(index)">
													<span class="dnl_icon dnl_action_delete"></span>
												</a>
											</td>
										</tr>
									</template>
								</tbody>
							</table>
						</div>
						<div class="col-md-6 col-sm-8">
						<div class="button_set little-space">
							<button class="btn btn-primary" v-on:click="validateBeforeSubmit">
								Submit
							</button>
							<button class="btn btn-default" v-on:click="reset">
								Reset
							</button>
						</div>
						</div>
					</form>
					<div class="clearfix little-space"></div>
				</div>
			</div>
	  </div>
	</div>
</template>

<script>  
	const vSelect = require('vue!../main_components/select.vue');
	const api = require("../../api");
	const auth = require("../../auth");
	_ = require('lodash');
	import {mapGetters,	mapActions} from 'vuex'

	module.exports = {
		created: function(){

			this.loading = true;
			this.$http.get(api.getEndpointUrl() + "/v1/config/time_profile/list", 
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function(response) {
				var self = this;
				this.loading = false;
				var items = response.body.payload.items;
				items.forEach(function(item, i){
					var time_profile = {};
					time_profile.id = item.time_profile_id;
					time_profile.text = item.name;
					self.time_profile_list.push(time_profile);
				});
			}, function(error) {
				this.loading = false;
				console.log(error);
			});

			this.fetchCarriers();
		},
		components: {
			'select2': vSelect
		},
		data: function(){
			return {
				dynamic_routing_template: [],
				tmpPageOne: {
					currentPage: 0,
					totalPages: 10,
					cntPerPage: 30,
				},
				time_profile_list: [],
				carrier_list: [],
				
				dynamic_routing_name: '',
				route_rule_name: 'by maximum ACD',
				time_profile_id: 0,
				qos_cycle: '15 minutes',
				
				checker: '',

				routing_rule_list: [
					{ id: 'by maximum ACD', value: 'Largest ACD', text: 'Largest ACD'},
					{ id: 'by maximum ASR', value: 'Largest ASR', text: 'Largest ASR'},
					{ id: 'LCR', text: 'LCR' },
					{ id: 'By ASR', text: 'By ASR' },
					{ id: 'By ACD', text: 'By ACD' },
					{ id: 'at the lowest cost', text: 'Lowest Cost' },
				],
				qos_cycle_list: [
						{ id: '15 minutes', value: '15 Minutes', text: '15 Minutes' },
						{ id: '30 minutes', value: '30 Minutes', text: '30 Minutes' },
						{ id: '1 hours', value: '1 Hour', text: '1 Hour' },
						{ id: '1 days', value: '1 Day', text: '1 Day' },
				],
				
				egresses: [],
			}
		},
		watch: {
			
		},
		methods: {
			...mapActions({
				setAsyncConfirm: 'async_confirm/setAsyncConfirm',
				setMessage: 'app_message/setAppMessage'
			}),
			getDynamicRoutingForRequest() {
				const dynamic_routing_template = Object.assign({}, this.dynamic_routing_template);

					var vm = [];
					if (this.egresses.length > 0) {
						this.egresses.forEach(function(egress, i){
							var temp = {};
							temp.resource_id = egress.trunk;
							vm.push(temp);
						});
					}

					dynamic_routing_template.egress_trunks = vm;
					dynamic_routing_template.name = this.dynamic_routing_name;
					dynamic_routing_template.qos_cycle = this.qos_cycle;
					if(this.time_profile_id != 0)
						dynamic_routing_template.time_profile_id = this.time_profile_id;
					dynamic_routing_template.route_rule_name = this.route_rule_name;

					return dynamic_routing_template;
			},
			saveDynamicRouting() {
				const reqBody = this.getDynamicRoutingForRequest();
				console.log("reqBody:", reqBody);

				this.$http.post(api.getEndpointUrl() + '/v1/route/dynamic', reqBody,
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}
				)
				.then(response => {
					if (response.body.success) {
						this.setMessage('The dynamic routing has been created!');
						var thisvm = this;
						setTimeout(function(){
							thisvm.$router.push('/routing/dynamic_routing');
						}, 3000);
					}
				})
				.catch(error => {
					console.log(error)
					this.setMessage({
						message: 'Creating dynamic routing is failed!',
						type: 'error'
					})
				})	
			},
			fetchCarriers() {
				this.loading = true;
				var url;
				if(this.tmpPageOne.currentPage === 0)
					url = api.getEndpointUrl() + "/v1/carrier/list"
				else
					url = api.getEndpointUrl() + "/v1/carrier/list?page=" + this.tmpPageOne.currentPage
				console.log(url);
				this.$http.get(url)
					.then(response => {
						const body = response.body
						if (body.success) {
							var self = this;
							this.loading = false;
							const payload = body.payload
							var carriers = payload.items;
							carriers.forEach(function (temp, i) {
								var carrier = {};
								carrier.id = temp.client_id;
								carrier.text = temp.name;
								self.carrier_list.push(carrier);
							});
							this.tmpPageOne.currentPage = payload.page + 1
							this.tmpPageOne.totalPages = Math.ceil(payload.total / payload.per_page)
							this.tmpPageOne.cntPerPage = payload.per_page;

							console.log(this.tmpPageOne.totalPages, this.tmpPageOne.currentPage);

							if(this.tmpPageOne.totalPages > this.tmpPageOne.currentPage)
								this.fetchCarriers();
							
						}
					})
					.catch(error => {
						console.log(error)
						this.loading = false;
					})
			},
			onchange: function(index) {
				this.loading = true;
				console.log("carrier: " + this.egresses[index].carrier);
				this.$http.get(api.getEndpointUrl() + '/v1/carrier/'+this.egresses[index].carrier+'/egress_trunk/list',
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(function(response) {
					var self = this;
					this.loading = false;
					var items = response.body.payload.items;

					self.egresses[index].trunk_list = [];
					self.egresses[index].trunk = 0;
					items.forEach(function(item, i){
						if (item.is_active) {
							var trunk = {};
							trunk.id = item.resource_id;
							trunk.value = item.name;
							trunk.text = item.name;
							self.egresses[index].trunk_list.push(trunk);
							self.egresses[index].trunk = 0;
						}
					});
				}, function(error) {
					this.loading = false;
					console.log(error);
				});
			},
			clickSelectedAll: function() {
				console.log("select_all-->"+this.checker);
				if(this.checker) {
					this.egresses.forEach(function(egress, i){
						egress.selected = true;
					});
				}
				else {
					this.egresses.forEach(function(egress, i){
						egress.selected = false;
					});
				}
			},
			reset : function(e){
				this.dynamic_routing_name = "";
				route_rule_name = 'by maximum ACD';
				time_profile_id = 0;
				qos_cycle = '15 minutes';
				this.egresses = [];
			},
			validateBeforeSubmit(e){
				e.preventDefault();
				if (this.egresses.length == 0) {
					this.setMessage({
						message: 'Please add egress!',
						type: 'error'
					});
					return;
				}
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
						vm.saveDynamicRouting();
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
			addegress: function() {
                console.log("add egress");
				var vm = this;
				this.egresses.push({
					selected: false,
					carrier: 0,
					trunk: 0,
					trunk_list: [],
				});
				if(this.checker)
					this.checker = false;
				console.log(this.egresses);
            },
			deleteegress: function(i) {
				this.egresses.splice(i, 1);
			},
			removeAll: function() {
				console.log("remove all egresses");
				this.egresses = [];
				if(this.checker)
					this.checker = false;
			},
			removeSelected: function() {
				console.log("remove selected egresses");
				console.log(this.egresses);
				var vm = [];
				this.egresses.forEach(function(egress, i){
					if(egress.selected!=true) {
						vm.push(egress);
					}
				});
				this.egresses = vm;
				console.log("end");
				if(this.checker)
					this.checker = false;
			},
		},
		mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
		}
	}
</script>

<style>
	.role_section.margin-fixed {
		margin: 15px;
		margin-top: 10px;
		margin-bottom: 15px;
	}
	
	.m-top-10 {
		margin-top: 10px;
	}
	
	table.table.table-striped.table-hover.carrier_groups tr td {
		padding-right: 8px;
	}
	
	a.action.action_delete.center-block {
		display: block;
	}
	
	table.table.table-striped.table-hover.carrier_groups .checkbox-success input[type="checkbox"]:checked + label::before {
		background-color: #03c0fc;
		border-color: #03c0fc;
	}
</style>
