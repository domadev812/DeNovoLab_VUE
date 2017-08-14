<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item"><a href="#">Switch</a></li>
						<li class="breadcrumb-item">
							<router-link to="/switch/rate_table">Rate Table</router-link>
						</li>
					<li class="breadcrumb-item active">Create Rate Table</li>
				</ol>
				<h1 class="page-header">Create Rate Table</h1>
				<router-link to="/switch/rate_table" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
				<div class="white_pad">
					<spinner v-show="loading" class="spinner"></spinner>
					<form class="form">
						<div class="select_group row">
							<div class="role_section margin-fixed">
								<div class="col-md-3 col-sm-4">
									<div class="form-group">
										<label for="rate_table_name">Rate Table Name:</label>
										<input v-validate="'required'" type="text" name="rate_table_name" v-model="rate_table_name" class="form-control" placeholder="Enter Rate Table Name">
										<span v-show="errors.has('rate_table_name')" class="help is-danger">{{ errors.first('rate_table_name') }}</span>
									</div>
								</div>
								<div class="col-md-3 col-sm-4">
									<div class="form-group">
										<label>Code Deck:</label>
										<select class="selectable" v-model="code_deck">
											<option disabled value=-1>Select Code Deck</option>
											<option v-for="code_deck in code_deck_list" v-bind:value="code_deck.id">
												{{ code_deck.text }}
											</option>
										</select>
									</div>
								</div>		
								<div class="clearfix"></div>
								<div class="col-md-3 col-sm-4">
									<div class="form-group">
										<label>Currency:</label>
										<select class="selectable" v-model="currency">
											<option disabled value="0">Select Currency</option>
											<option v-for="currency in currency_list" v-bind:value="currency.id">
												{{ currency.text }}
											</option>
										</select>
									</div>
								</div>
								<div class="col-md-3 col-sm-4">
									<div class="form-group">
										<label>Rate Type:</label>
										<select class="selectable" v-model="rate_type" @change="changeRateType">
											<option disabled value="0">Select Rate Type</option>
											<option v-for="rate_type in rate_type_list" v-bind:value="rate_type.id">
												{{ rate_type.text }}
											</option>
										</select>
									</div>
								</div>
								<div class="col-md-3 col-sm-4" v-if="needType">
									<div class="form-group">
										<label>Type:</label>
										<select class="selectable" v-model="type">
											<option disabled value="0">Select Type</option>
											<option v-for="type in types" v-bind:value="type.id">
												{{ type.text }}
											</option>
										</select>
									</div>
								</div>
								<div class="clearfix little-space"></div>
							</div>
						</div>
						<div role="group" class="btn-group"> 
							<button type="button" class="btn btn-default" @click="addRate">
								<span class="dnl_icon dnl_add"></span> Create New
							</button> 
							<button type="button" class="btn btn-default" @click="removeSelected">
								<span class="dnl_icon dnl_action_delete"></span> Remove Selected
							</button> 
							<button type="button" class="btn btn-default" @click="removeAll">
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
										<th style="text-align: center">Code</th>
										<th>Code Name</th>
										<th>Country</th>
										<th>Rate</th>
										<th v-if="is_usjd">Intra Rate</th>
										<th v-if="is_usjd">Inter Rate</th>
										<th>Effective Date</th>
										<th>End Date</th>
										<th>Extra Fields</th>
										<th class="width-65 text-center">Action</th>
									</tr>
								</thead>
								<tbody>
									<template v-for="(rate, index) in rates">
										<tr>
											<td class="centred_checkbox">
												<div class="checkbox checkbox-success">
												<input v-bind:id="'selected-' + index" v-bind:name="'selected-' + index" type="checkbox" v-model="rate.selected"> 
												<label v-bind:for="'selected-' + index"></label>
												<!--<input :id="rate.id" :name="rate.id" type="checkbox" v-model="rate.status">
												<label :for="rate.id"></label>-->
												</div>
											</td>
											<td><input type="text" v-model="rate.code" class="form-control"></td>
											<td><input type="text" v-model="rate.code_name" class="form-control"></td>
											<td><input type="text" v-model="rate.country" class="form-control"></td>
											<td><input type="text" v-model="rate.rate" class="form-control"></td>
											<td v-if="is_usjd"><input type="text" v-model="rate.intra_rate" class="form-control"></td>
											<td v-if="is_usjd"><input type="text" v-model="rate.inter_rate" class="form-control"></td>
											<td>
												<el-date-picker v-model="rate.effective_date" type="date" placeholder="Effective Date"></el-date-picker>
												<!-- <select2 :options="time_zone_options" v-model="rate.eff_time_zone" class="inline-block">
												</select2> -->
											</td>
											<td>
												<el-date-picker v-model="rate.end_date" type="date" placeholder="End Date"></el-date-picker>
												<!-- <select2 :options="time_zone_options" v-model="rate.end_time_zone" class="inline-block">
												</select2> -->
											</td>
											<td><router-link to="" @click.native="showHideExtraField(rate)">{{rate.more_less}}</router-link></td>
											<td class="text-center">
												<a class="action action_delete center-block" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="deleteRate(index)">
													<span class="dnl_icon dnl_action_delete"></span>
												</a>
											</td>
										</tr>
										<tr v-if="rate.show_extra_field">
											<td colspan="11">
												<div class="col-md-2">
													<label for="setup_fee">Setup Fee:</label>
													<input type="text" name="setup_fee" v-model="rate.setup_fee" class="form-control" placeholder="Enter Setup Fee">
												</div>
												<div class="col-md-2">
													<label for="min_time">Min Time:</label>
													<input type="text" name="min_time" v-model="rate.min_time" class="form-control" placeholder="Enter Min Time">
												</div>
												<div class="col-md-2">
													<label for="interval">Sec Interval:</label>
													<input type="text" name="interval" v-model="rate.interval" class="form-control" placeholder="Enter Interval">
												</div>
												<div class="col-md-2">
													<label for="time_profile_id">Sec Profile:</label>
													<select2 :options="time_profile_list" v-model="rate.time_profile_id" style="width: 100%">
														<option disabled value="0">Select Profile</option>
													</select2>
												</div>
												<div class="col-md-2">
													<label for="local_rate">Local Rate:</label>
													<input type="text" name="local_rate" v-model="rate.local_rate" class="form-control" placeholder="Enter Local Rate">
												</div>
											</td>
										</tr>
									</template>
								</tbody>
							</table>
						</div>
						<div class="button_set little-space">
							<a class="btn btn-primary mini" @click="validateBeforeSubmit">
								Submit
							</a>
							<a class="btn btn-default mini" v-on:click="reset">
								Reset
							</a>
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
	import { mapActions } from 'vuex';
	const vSpinner = require('vue!../main_components/fadeloader.vue');

	function Item (){           
		// this.id = rate.id;
		// this.code = rate.code;
		// this.code_name = rate.code_name;
		// this.country = rate.country;
		// this.rate = rate.rate;
		// this.intra_rate = rate.intra_rate;
		// this.inter_rate = rate.inter_rate;
		// this.effective_date = rate.effective_date;
		// this.end_date = rate.end_date;
		// this.extra_fields = rate.extra_fields;

		// this.setup_fee =  rate.setup_fee;
		// this.time_profile_id =  rate.time_profile_id;
		// this.local_rate = rate.local_rate;
		// this.min_time = rate.min_time;
		// this.interval = rate.interval;
		// rate: {
		// 		//   id: 'i1',
		// 			id: '',
		// 			status: false,
		// 			code: '',
		// 			code_name: '',
		// 			country: '',
		// 			rate: '',
		// 			intra_rate: '',
		// 			inter_rate: '',
		// 			effective_date: '',
		// 			end_date: '',
		// 			extra_fields: '1/1/0 undefined',

		// 			setup_fee: '',
		// 			time_profile_id: '',
		// 			local_rate: '',
		// 			min_time: '',
		// 			interval: '',
		// 	  },
	};

	module.exports = {
		created: function(){
			var today = new Date();
			var eff_date = today.toISOString().substring(0, 10);
			this.rates[0].effective_date = eff_date;

			this.loading = true;
			this.$http.get(api.getEndpointUrl() + "/v1/switch/currency/list", 
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function(response) {
				var self = this;
				// this.loading = false;
				var items = response.body.payload.items;
				items.forEach(function(item, i){
					var currency = {};
					currency.id = item.currency_id;
					currency.text = item.code;
					self.currency_list.push(currency);
				});
				if (items.length > 0) {
					this.currency = this.currency_list[0].id;
					console.log("this currency is " + this.currency);
				}
				console.log("currency_list");
				console.log(this.currency_list);
			}, function(error) {
				this.loading = false;
				console.log(error);
			});

			this.$http.get(api.getEndpointUrl() + "/v1/config/time_profile/list", 
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function(response) {
				var self = this;
				// this.loading = false;
				var items = response.body.payload.items;
				items.forEach(function(item, i){
					var time_profile = {};
					time_profile.id = item.time_profile_id;
					time_profile.text = item.name;
					self.time_profile_list.push(time_profile);
				});
				console.log("<--time profile list-->");
				console.log(this.time_profile_list);
			}, function(error) {
				this.loading = false;
				console.log(error);
			});

			this.$http.get(api.getEndpointUrl() + "/v1/switch/code_deck/list", 
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function(response) {
				console.log("items");
				var self = this;
				this.loading = false;
				var items = response.body.payload.items;
				items.forEach(function(item, i){
					var code_deck = {};
					code_deck.id = item.code_deck_id;
					code_deck.text = item.name;
					self.code_deck_list.push(code_deck);
				});
				console.log("code_deck_list");
				console.log(this.code_deck_list);
			})
			.catch(error => {
				this.loading = false;
				console.log(error)
			});

			// 

			// this.addRate();
		},
		components: {
			'select2': vSelect,
			'spinner': vSpinner,
		},
		data: function(){
			return {
				time_zone_options: [
					{ id: 1, text: 'GMT -12:00' },
					{ id: 2, text: 'GMT -11:00' },
					{ id: 3, text: 'GMT -10:00' },
					{ id: 4, text: 'GMT -9:00' },
					{ id: 5, text: 'GMT -8:00' },
					{ id: 6, text: 'GMT -7:00' },
					{ id: 7, text: 'GMT -6:00' },
					{ id: 8, text: 'GMT -5:00' },
					{ id: 9, text: 'GMT -4:00' },
					{ id: 10, text: 'GMT -3:00' },
					{ id: 11, text: 'GMT -2:00' },
					{ id: 12, text: 'GMT -1:00' },
					{ id: 13, text: 'GMT +0:00' },
					{ id: 14, text: 'GMT +1:00' },
					{ id: 15, text: 'GMT +2:00' },
					{ id: 16, text: 'GMT +3:00' },
					{ id: 17, text: 'GMT +4:00' },
					{ id: 18, text: 'GMT +5:00' },
					{ id: 19, text: 'GMT +6:00' },
					{ id: 20, text: 'GMT +7:00' },
					{ id: 21, text: 'GMT +8:00' },
					{ id: 22, text: 'GMT +9:00' },
					{ id: 23, text: 'GMT +10:00' },
					{ id: 24, text: 'GMT +11:00' },
					{ id: 25, text: 'GMT +12:00' },
				],
				is_usjd: false,
				time_profile_list: [],
				code_deck_list: [],
				currency_list: [],
				rate_table_name: '',
				code_deck: -1,
				currency: 0,
				type: 'DNIS',
				rate_type: 'A-Z',
				checker: '',
				options: [
					  { id: 1, value: 'carrier1', text: 'Carrier 1' },
					  { id: 2, value: 'carrier2', text: 'Carrier 2' },
					  { id: 3, value: 'carrier3', text: 'Carrier 3' },
					  { id: 4, value: 'carrier4', text: 'Carrier 4' },
					  { id: 5, value: 'carrier5', text: 'Carrier 5' }
			  ],
			  rate: {
					id: '',
					// status: false,
					selected: false,
					code: '',
					code_name: '',
					country: '',
					rate: 0,
					intra_rate: 0,
					inter_rate: 0,
					effective_date: '',
					end_date: '',

					setup_fee: 0,
					time_profile_id: 0,
					local_rate: 0,
					min_time: 0,
					interval: 0,

					show_extra_field: false,
					more_less: 'more',
			  },
			  rate_type_list: [
				  { id: 'A-Z', value: 'A-Z', text: 'A-Z' },
				  { id: 'US Jurisdictional', value: 'US JD', text: 'US JD' },
				  { id: 'US Non Jurisdictional', value: 'US non JD', text: 'US non JD' },
			  ],
			  types: [
				  { id: 'DNIS', value: 'DNIS', text: 'DNIS' },
				  { id: 'LRN', value: 'LRN', text: 'LRN' },
			  ],
			  needType: false,
			  isShowExtraFields: false,
			  
			  rate_table_id: '',
			  rates: [
				{
					id: '',
					// status: false,
					selected: false,
					code: '',
					code_name: '',
					country: '',
					rate: 0,
					intra_rate: 0,
					inter_rate: 0,
					effective_date: '',
					end_date: '',

					setup_fee: 0,
					time_profile_id: '0',
					local_rate: 0,
					min_time: 0,
					interval: 0,

					show_extra_field: false,
					more_less: 'more',
				}
			  ],
			}
		},
		watch: {
			'rate_type': function() {
				console.log("rate_type-->"+this.rate_type);
				if(this.rate_type == 'US Jurisdictional' || this.rate_type == 'Non Jurisdictional') {
					this.needType = true;
					this.type = 'DNIS';
				}
				else {
					this.needType = false;
					this.type = 'DNIS';
				}
			},
			
		},
		methods: {
			...mapActions({
				setMessage: 'app_message/setAppMessage'
			}),
			changeRateType () {
				if(this.rate_type == 'US Jurisdictional')
					this.is_usjd = true;
				else
					this.is_usjd = false;
			},
			clickSelectedAll: function() {
				console.log("select_all-->"+this.checker);
				if(this.checker) {
					this.rates.forEach(function(rate, i){
						rate.selected = true;
					});
				}
				else {
					this.rates.forEach(function(rate, i){
						rate.selected = false;
					});
				}
			},
			reset : function(e){
				e.preventDefault();
				console.log("reset");
				this.rate_table_name = '';
				this.code_deck = -1;
				this.currency = 1;
				this.rate_type = 'A-Z';
				this.type = 'DNIS';
				this.rates = [
				{
					id: '',
					// status: false,
					selected: false,
					code: '',
					code_name: '',
					country: '',
					rate: 0,
					intra_rate: 0,
					inter_rate: 0,
					effective_date: '',
					end_date: '',

					setup_fee: 0,
					time_profile_id: '0',
					local_rate: 0,
					min_time: 0,
					interval: 0,

					show_extra_field: false,
					more_less: 'more',
				}
			  ];

			},
			saveRateTable() {
				// eslint-disable-next-line
				this.loading = true;
				// var status = false;
				// if(this.statusselect == 1){
				// 	status = true;
				// }
				console.log("currency_id-->"+this.currency);
				var requestForm = {};
				requestForm.currency_id = this.currency;
				requestForm.rate_type_name = this.rate_type;
				requestForm.billing_method = this.type;
				requestForm.name = this.rate_table_name;
				if (this.code_deck != -1) {
					requestForm.code_deck_id = this.code_deck;
				}
				
				this.$http.post(api.getEndpointUrl() + '/v1/switch/rate_table/create',
				requestForm,
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}
				).then(response => {
					if (response.body.success) {
						this.loading = false;
						console.log(response);
						this.setMessage('The rate table has been created!');

						//to do modify
						if (this.rates.length > 0) {
							this.rate_table_id = response.body.object_id;
							var vm = [];
							this.rates.forEach(function(rate, i){
								var temp = {};
								temp.intra_rate = rate.intra_rate;
								temp.code_name = rate.code_name;
								temp.code = rate.code;
								temp.rate = rate.rate;
								temp.inter_rate = rate.inter_rate;
								temp.country = rate.country;
								temp.gmt = '+00:00';
								if(rate.effective_date !== "")
									temp.effective_date = rate.effective_date;
								if(rate.end_date !== "")
									temp.end_date = rate.end_date;
								if(rate.show_extra_field) {
									temp.setup_fee = rate.setup_fee;
									temp.min_time = rate.min_time;
									temp.interval = rate.interval;
									if(rate.time_profile_id !== "0")
										temp.time_profile_id = rate.time_profile_id;
								}
								temp.local_rate = rate.local_rate;

								

								vm.push(temp);
							});
							this.$http.post(api.getEndpointUrl() + '/v1/switch/rate_table/'+this.rate_table_id+'/rates',
							{
								"rates": vm
							},
							{
								headers: {
									"X-Auth-Token": auth.getToken()
								}
							}
							).then(response => {
								if (response.body.success) {
									console.log(response);
								
									this.$router.push('/switch/rate_table');
									this.setMessage('The rates has been created!');
									// var thisvm = this;
									// setTimeout(function(){
									// 	thisvm.$router.push('/switch/rate_table');
									// }, 3000);
								}
							})
							.catch(error => {
								console.log(error)
								this.setMessage({
									message: 'Creating rates is failed!',
									type: 'error'
								})
							})							

						} else {
							this.loading = false;
							console.log(response);

							this.$router.push('/switch/rate_table');						
						}					
					}
				})
				.catch(error => {
					this.setMessage({
						// message: 'Creating rate table is failed!',
						message: error.body.error.message,
						type: 'error'
					})
				})
			},
			validateBeforeSubmit(e){
				e.preventDefault();
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
						vm.saveRateTable();
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
			addRate: function() {
				console.log("add rate");
				var today = new Date();
				var eff_date = today.toISOString().substring(0, 10);
				this.rates.push({
					id: '',
					// status: false,
					code: '',
					code_name: '',
					country: '',
					rate: 0,
					intra_rate: 0,
					inter_rate: 0,
					effective_date: eff_date,
					end_date: '',
					// extra_fields: '1/1/0 undefined',

					setup_fee: 0,
					time_profile_id: 0,
					local_rate: 0,
					min_time: 0,
					interval: 0,

					show_extra_field: false,
					more_less: 'more',
				});
				if(this.checker)
					this.checker = false;
            },
			deleteRate: function(i) {
				this.rates.splice(i, 1);
			},
			removeAll: function() {
				console.log("remove all rates");
				this.rates = [];
				if(this.checker)
					this.checker = false;
			},
			removeSelected: function() {
				console.log("remove selected rates");
				console.log(this.rates);
				var vm = [];
				this.rates.forEach(function(rate, i){
					if(rate.selected!=true) {
						vm.push(rate);
					}
				});
				this.rates = vm;
				console.log("end");
				if(this.checker)
					this.checker = false;
			},
			showHideExtraField: function(rate) {
				console.log("show/hide extra field");
				console.log(rate);
				rate.show_extra_field = !rate.show_extra_field;
				if(rate.show_extra_field) {
					rate.more_less = 'less';
				}
				else {
					rate.more_less = 'more';
				}
			}
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
