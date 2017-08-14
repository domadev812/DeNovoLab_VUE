<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item"><a href="#">Routing</a></li>
					<li class="breadcrumb-item">
						<router-link to="/routing/block_list">Block List</router-link>
					</li>
					<li class="breadcrumb-item active">Edit</li>
				</ol>
				<h1 class="page-header">Edit Block</h1>
				<router-link to="/routing/block_list" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
				<div class="white_pad">
					<form class="form" @submit.prevent="validateBeforeSubmit">
						<div class="select_group row">
							<div class="role_section margin-fixed">
								<div class="col-md-3 col-sm-4">
									<div class="form-group">
										<label for="time_profile">Time Profile:</label>
										<select class="selectable" v-model="data.time_profile_id">
											<option disabled value="0">Select Time Profile</option>
											<option v-for="time_profile in time_profile_list" v-bind:value="time_profile.id">
												{{ time_profile.text }}
											</option>
										</select>
									</div>
								</div>
								<div class="col-md-3 col-sm-4">
									<div class="form-group">
										<label>Egress Carriers:</label>
										<select class="selectable" v-model="data.egress_trunk_id">
											<option disabled value="0">Select Egress Carriers</option>
											<option v-for="egress_carrier in egress_carrier_list" v-bind:value="egress_carrier.id">
												{{ egress_carrier.text }}
											</option>
										</select>
									</div>
								</div>		
                                <div class="col-md-3 col-sm-4">
									<div class="form-group">
										<label>Ingress Carriers:</label>
										<select class="selectable" v-model="data.ingress_trunk_id">
											<option disabled value="0">Select Ingress Carriers</option>
											<option v-for="ingress_carrier in ingress_carrier_list" v-bind:value="ingress_carrier.id">
												{{ ingress_carrier.text }}
											</option>
										</select>
									</div>
								</div>	
								<div class="clearfix"></div>
								<div class="col-md-3 col-sm-4" v-if="!isDisabled">
									<div class="form-group">
										<label>ANI Prefix:</label>
										<input :disabled="isDisabled" v-validate="'required'" type="text" name="ani_prefix" v-model="data.ANI_prefix" class="form-control" placeholder="Enter ANI Prefix">
										<span v-show="errors.has('ani_prefix')" class="help is-danger">{{ errors.first('ani_prefix') }}</span>
									</div>
								</div>
								<div class="col-md-3 col-sm-4" v-if="!isDisabled">
									<div class="form-group">
										<label>ANI Min:</label>
										<input :disabled="isDisabled" v-validate="'required'" type="text" name="ani_min" v-model="data.ANI_min" class="form-control" placeholder="Enter ANI Min">
										<span v-show="errors.has('ani_min')" class="help is-danger">{{ errors.first('ani_min') }}</span>
									</div>
								</div>
								<div class="col-md-3 col-sm-4" v-if="!isDisabled">
									<div class="form-group">
										<label>ANI Max:</label>
										<input :disabled="isDisabled" v-validate="'required'" type="text" name="ani_max" v-model="data.ANI_max" class="form-control" placeholder="Enter ANI Max">
										<span v-show="errors.has('ani_max')" class="help is-danger">{{ errors.first('ani_max') }}</span>
									</div>
								</div>

                                <div class="col-md-3 col-sm-4" v-if="isDisabled">
									<div class="form-group">
										<label>DNIS Prefix:</label>
										<input :disabled="!isDisabled" v-validate="'required'" type="text" name="dnis_prefix" v-model="data.DNIS_prefix" class="form-control" placeholder="Enter DNIS Prefix">
										<span v-show="errors.has('dnis_prefix')" class="help is-danger">{{ errors.first('dnis_prefix') }}</span>
									</div>
								</div>
								<div class="col-md-3 col-sm-4" v-if="isDisabled">
									<div class="form-group">
										<label>DNIS Min:</label>
										<input :disabled="!isDisabled" v-validate="'required'" type="text" name="dnis_min" v-model="data.DNIS_min" class="form-control" placeholder="Enter DNIS Min">
										<span v-show="errors.has('dnis_min')" class="help is-danger">{{ errors.first('dnis_min') }}</span>
									</div>
								</div>
								<div class="col-md-3 col-sm-4" v-if="isDisabled">
									<div class="form-group">
										<label>DNIS Max:</label>
										<input :disabled="!isDisabled" v-validate="'required'" type="text" name="dnis_max" v-model="data.DNIS_max" class="form-control" placeholder="Enter DNIS Max">
										<span v-show="errors.has('dnis_max')" class="help is-danger">{{ errors.first('dnis_max') }}</span>
									</div>
								</div>

                                <div class="col-md-3 col-sm-4">
                                    <div class="form-group m-top-33">
                                        <div class="checkbox checkbox-success">
                                            <input id="ani_empty" name="ani_empty" type="checkbox" v-model="data.ANI_empty"> 
                                            <label for="ani_empty">ANI Empty</label>
                                        </div>
                                    </div>
                                </div>


                                <div class="clearfix little-space"></div>
							</div>
						</div>
						<div class="button_set little-space">
							<button class="btn btn-primary" type="submit">
								Submit
							</button>
							<button class="btn btn-default" v-on:click="reset">
								Reset
							</button>
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
		computed: {
			isDisabled() {
				return this.data.ANI_empty;
			}
		},
		created: function(){
			this.loading = true;
			this.$http.get(api.getEndpointUrl() + "/v1/switch/code_deck/list", 
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function(response) {
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
			}, function(error) {
				this.loading = false;
				console.log(error);
			});

			this.loading = true;
			this.$http.get(api.getEndpointUrl() + "/v1/switch/currency/list", 
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function(response) {
				var self = this;
				this.loading = false;
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
				console.log("<--time profile list-->");
				console.log(this.time_profile_list);
			}, function(error) {
				this.loading = false;
				console.log(error);
			});

			this.loading = true;
			this.$http.get(api.getEndpointUrl() + "/v1/trunk/egress/list", 
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function(response) {
				var self = this;
				this.loading = false;
				var items = response.body.payload.items;
				items.forEach(function(item, i){
					var egress = {};
					egress.id = item.resource_id;
					egress.value = item.name;
					egress.text = item.name;
					self.egress_carrier_list.push(egress);
				});
				console.log(this.egress_carrier_list);
			}, function(error) {
				this.loading = false;
				console.log(error);
			});
			
			this.loading = true;
			this.$http.get(api.getEndpointUrl() + "/v1/trunk/ingress/list", 
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function(response) {
				var self = this;
				this.loading = false;
				var items = response.body.payload.items;
				items.forEach(function(item, i){
					var ingress = {};
					ingress.id = item.resource_id;
					ingress.value = item.name;
					ingress.text = item.name;
					self.ingress_carrier_list.push(ingress);
				});
				console.log(this.ingress_carrier_list);
			}, function(error) {
				this.loading = false;
				console.log(error);
			});			
			
			var the = this;
			var id = this.$route.params.id;
			this.id = id;
			this.loading = true;
			this.$http.get(api.getEndpointUrl() + "/v1/route/block/" + id, 
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function(response) {
				var self = this;
				this.loading = false;
				var block = response.body.payload;

				Vue.set(this.data, 'DNIS_min', block.DNIS_min);
				Vue.set(this.data, 'ANI_min', block.ANI_min);
				Vue.set(this.data, 'ANI_max', block.ANI_max);
				Vue.set(this.data, 'DNIS_max', block.DNIS_max);
				Vue.set(this.data, 'DNIS_prefix', block.DNIS_prefix);
				Vue.set(this.data, 'ANI_prefix', block.ANI_prefix);
				Vue.set(this.data, 'ingress_trunk_id', block.ingress_trunk_id);
				Vue.set(this.data, 'egress_trunk_id', block.egress_trunk_id);
				Vue.set(this.data, 'time_profile_id', block.time_profile_id);
				Vue.set(this.data, 'ANI_empty', block.ANI_empty);

				// this.origin_data = this.data;
				Vue.set(this.origin_data, 'DNIS_min', block.DNIS_min);
				Vue.set(this.origin_data, 'ANI_min', block.ANI_min);
				Vue.set(this.origin_data, 'ANI_max', block.ANI_max);
				Vue.set(this.origin_data, 'DNIS_max', block.DNIS_max);
				Vue.set(this.origin_data, 'DNIS_prefix', block.DNIS_prefix);
				Vue.set(this.origin_data, 'ANI_prefix', block.ANI_prefix);
				Vue.set(this.origin_data, 'ingress_trunk_id', block.ingress_trunk_id);
				Vue.set(this.origin_data, 'egress_trunk_id', block.egress_trunk_id);
				Vue.set(this.origin_data, 'time_profile_id', block.time_profile_id);
				Vue.set(this.origin_data, 'ANI_empty', block.ANI_empty);

			}, function(error) {
				this.loading = false;
				console.log(error);
			});
		},
		components: {
			'select2': vSelect
		},
		data: function(){
			return {
				data: {},
				origin_data: {},
                ingress_carrier_list: [],
                egress_carrier_list: [],
				time_profile_list: [],
				code_deck_list: [],
				currency_list: [],
                ani_prefix: '',
                ani_min: '',
                ani_max: '',
                ani_empty: false,
                dnis_prefix: '',
                dnis_min: '',
                dnis_max: '',
				time_profile: '0',
                egress_carrier: '0',
                ingress_carrier: '0',
				currency: 0,
			}
		},
		watch: {
			'data.ANI_empty': function () {
				if(this.data.ANI_empty){
					this.data.ANI_prefix = 0;
					this.data.ANI_min = 0;
					this.data.ANI_max = 0;
				}
				else {
					this.data.DNIS_prefix = 0;
					this.data.DNIS_min = 0;
					this.data.DNIS_max = 0;
				}
			}
		},
		methods: {
			...mapActions({
				setAsyncConfirm: 'async_confirm/setAsyncConfirm',
				setMessage: 'app_message/setAppMessage'
			}),
			reset : function(e){
				e.preventDefault();
				console.log("reset1");
				console.log(this.origin_data);
				console.log("reset2");
				console.log(this.data);
				var temp = [];
				temp = this.origin_data;
				Vue.set(this.data, 'DNIS_min', temp.DNIS_min);
				Vue.set(this.data, 'ANI_min', temp.ANI_min);
				Vue.set(this.data, 'ANI_max', temp.ANI_max);
				Vue.set(this.data, 'DNIS_max', temp.DNIS_max);
				Vue.set(this.data, 'DNIS_prefix', temp.DNIS_prefix);
				Vue.set(this.data, 'ANI_prefix', temp.ANI_prefix);
				Vue.set(this.data, 'ingress_trunk_id', temp.ingress_trunk_id);
				Vue.set(this.data, 'egress_trunk_id', temp.egress_trunk_id);
				Vue.set(this.data, 'time_profile_id', temp.time_profile_id);
				Vue.set(this.data, 'ANI_empty', temp.ANI_empty);
			},
			validateBeforeSubmit(e){
				e.preventDefault();
				this.$validator.validateAll().then(() => {
					this.loading = true;
                    console.log(this.data.ANI_empty);
					this.$http.patch(api.getEndpointUrl() + '/v1/route/block/'+this.id,
					{
						"ANI_empty": this.data.ANI_empty,
						"ANI_min": this.data.ANI_min,
						"DNIS_prefix": this.data.DNIS_prefix,
						"ANI_prefix": this.data.ANI_prefix,
						"ANI_max": this.data.ANI_max,
                        "DNIS_max": this.data.DNIS_max,
                        "DNIS_min": this.data.DNIS_min,
                        "time_profile_id": this.data.time_profile_id,
                        "ingress_trunk_id": this.data.ingress_trunk_id,
                        "egress_trunk_id": this.data.egress_trunk_id,
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
							this.$router.push('/routing/block_list');
							this.setMessage('The route block has been changed!');
						},
						function(response) {
							this.loading = false;
							console.log(response);
							this.setMessage({
								message: "Creating route block is failed!",
								type: 'error'
							});
						}
					)
					
				}).catch(() => {
					// eslint-disable-next-line
				
				});
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
	
	a.action.action_delete.center-block {
		display: block;
	}
</style>
