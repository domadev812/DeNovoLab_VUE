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
					<li class="breadcrumb-item active">New</li>
				</ol>
				<h1 class="page-header">New Block</h1>
				<router-link to="/routing/block_list" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
				<div class="white_pad">
					<form class="form">
						<div class="select_group row">
							<div class="role_section margin-fixed">
								<div class="col-md-3 col-sm-4">
									<div class="form-group">
										<label for="time_profile">Time Profile:</label>
										<select class="selectable" v-model="time_profile">
											<option disabled value="0">Select Time Profile</option>
											<option v-for="time_profile in time_profile_list" v-bind:value="time_profile.id">
												{{ time_profile.text }}
											</option>
										</select>
									</div>
								</div>
								<div class="col-md-3 col-sm-4">
									<div class="form-group">
										<label for="type">Type:</label>
										<select class="selectable" v-model="type">
											<option v-for="item in type_list" v-bind:value="item.id">
												{{ item.text }}
											</option>
										</select>
									</div>
								</div>
								<div class="clearfix"></div>
								<div class="col-md-3 col-sm-4">
									<div class="form-group">
										<label>Egress Carriers:</label>
										<select class="selectable" v-model="egress_carrier" @change="onChangeEgress(index)">
											<option disabled value="0">Select Egress Carriers</option>
											<option v-for="item in carrier_list" v-bind:value="item.id">
												{{ item.text }}
											</option>
										</select>
									</div>
								</div>		
								<div class="col-md-3 col-sm-4">
									<div class="form-group">
										<label>Egress Trunk:</label>
										<select class="selectable" v-model="egress_trunk">
											<option disabled value="0">Select Egress Trunk</option>
											<option v-for="item in egress_trunk_list" v-bind:value="item.id">
												{{ item.text }}
											</option>
										</select>
									</div>
								</div>
								<div class="clearfix"></div>
                                <div class="col-md-3 col-sm-4">
									<div class="form-group">
										<label>Ingress Carriers:</label>
										<select class="selectable" v-model="ingress_carrier">
											<option disabled value="0">Select Ingress Carriers</option>
											<option v-for="item in carrier_list" v-bind:value="item.id">
												{{ item.text }}
											</option>
										</select>
									</div>
								</div>	
								<div class="col-md-3 col-sm-4">
									<div class="form-group">
										<label>Ingress Trunk:</label>
										<select class="selectable" v-model="ingress_trunk">
											<option disabled value="0">Select Ingress Trunk</option>
											<option v-for="item in ingress_trunk_list" v-bind:value="item.id">
												{{ item.text }}
											</option>
										</select>
									</div>
								</div>	
								<div class="clearfix"></div>
								<div class="col-md-3 col-sm-4">
									<div class="form-group">
										<label>ANI Prefix:</label>
										<input :disabled="ani_empty" v-validate="'required'" type="text" name="ani_prefix" v-model="ani_prefix" class="form-control" placeholder="Enter ANI Prefix">
										<span v-show="errors.has('ani_prefix')" class="help is-danger">{{ errors.first('ani_prefix') }}</span>
									</div>
								</div>
								<div class="col-md-3 col-sm-4">
									<div class="form-group">
										<label>ANI Min:</label>
										<input v-validate="'required'" type="text" name="ani_min" v-model="ani_min" class="form-control" placeholder="Enter ANI Min">
										<span v-show="errors.has('ani_min')" class="help is-danger">{{ errors.first('ani_min') }}</span>
									</div>
								</div>
								<div class="col-md-3 col-sm-4">
									<div class="form-group">
										<label>ANI Max:</label>
										<input v-validate="'required'" type="text" name="ani_max" v-model="ani_max" class="form-control" placeholder="Enter ANI Max">
										<span v-show="errors.has('ani_max')" class="help is-danger">{{ errors.first('ani_max') }}</span>
									</div>
								</div>
								<div class="col-md-3 col-sm-4">
                                    <div class="form-group m-top-33">
                                        <div class="checkbox checkbox-success">
                                            <input id="ani_empty" name="ani_empty" type="checkbox" v-model="ani_empty"> 
                                            <label for="ani_empty">ANI Empty</label>
                                        </div>
                                    </div>
                                </div>
								<div class="clearfix"></div>

								<div class="col-md-3 col-sm-4">
									<div class="form-group">
										<label>DNIS Prefix:</label>
										<input v-validate="'required'" type="text" name="dnis_prefix" v-model="dnis_prefix" class="form-control" placeholder="Enter DNIS Prefix">
										<span v-show="errors.has('dnis_prefix')" class="help is-danger">{{ errors.first('dnis_prefix') }}</span>
									</div>
								</div>
								<div class="col-md-3 col-sm-4">
									<div class="form-group">
										<label>DNIS Min:</label>
										<input v-validate="'required'" type="text" name="dnis_min" v-model="dnis_min" class="form-control" placeholder="Enter DNIS Min">
										<span v-show="errors.has('dnis_min')" class="help is-danger">{{ errors.first('dnis_min') }}</span>
									</div>
								</div>
								<div class="col-md-3 col-sm-4">
									<div class="form-group">
										<label>DNIS Max:</label>
										<input v-validate="'required'" type="text" name="dnis_max" v-model="dnis_max" class="form-control" placeholder="Enter DNIS Max">
										<span v-show="errors.has('dnis_max')" class="help is-danger">{{ errors.first('dnis_max') }}</span>
									</div>
								</div>

                                

								<!--<div class="clearfix"></div>-->
                                
                                <div class="clearfix little-space"></div>
							</div>
						</div>
						<div class="button_set little-space">
							<button class="btn btn-primary" v-on:click="validateBeforeSubmit">
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
			// isDisabled() {
			// 	return this.ani_empty;
			// }
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

			this.fetchCarriers()		
		},
		components: {
			'select2': vSelect
		},
		data: function(){
			return {
				ingress_trunk_list: [],
				egress_trunk_list: [],
				ingress_trunk: '',
				egress_trunk: '',
				type: '1',
				type_list: [
					{id: '1', text: 'Block By Trunk'},
					{id: '2', text: 'Block By Trunk Group'},
				],
                carrier_list: [],
				time_profile_list: [],
				code_deck_list: [],
				currency_list: [],
                ani_prefix: '0',
                ani_min: '0',
                ani_max: '0',
                ani_empty: false,
                dnis_prefix: '0',
                dnis_min: '0',
                dnis_max: '0',
				time_profile: '0',
                egress_carrier: '0',
                ingress_carrier: '0',
				currency: 0,
			}
		},
		watch: {
			// 'ani_empty': function () {
			// 	if(this.ani_empty){
			// 		ani_prefix = '0';
			// 		ani_min = '0';
			// 		ani_max = '0';
			// 	}
			// 	else {
			// 		dnis_prefix = '0';
			// 		dnis_min = '0';
			// 		dnis_max = '0';
			// 	}
			// }
		},
		methods: {
			...mapActions({
				setMessage: 'app_message/setAppMessage'
			}),
			fetchCarriers () {
				this.loading = true;
				const url = api.getEndpointUrl() + '/v1/carrier/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const carriers = body.payload.items
						console.log(carriers);
						var self = this;
						carriers.forEach(function (temp, i) {
							var carrier = {};
							carrier.id = temp.client_id;
							carrier.text = temp.name;
							self.carrier_list.push(carrier);
						});
						console.log(this.carrier_list);
						
					}
					this.loading = false;
				})
				.catch(error => {
					console.log(error)
					this.loading = false;
				})
			},
			onChangeEgress: function(index) {
				this.loading = true;
				console.log("carrier: " + this.egress_carrier);
				this.$http.get(api.getEndpointUrl() + '/v1/carrier/'+this.egress_carrier+'/egress_trunk/list',
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(function(response) {
					var self = this;
					this.loading = false;
					var items = response.body.payload.items;

					self.egress_trunk_list = [];
					self.egress_trunk = 0;
					items.forEach(function(item, i){
						if (item.is_active) {
							var trunk = {};
							trunk.id = item.resource_id;
							trunk.value = item.name;
							trunk.text = item.name;
							self.egress_trunk_list.push(trunk);
							if(self.egress_trunk_list.length === 1)
								self.egress_trunk = trunk.id;
						}
					});
				}, function(error) {
					this.loading = false;
					console.log(error);
				});
			},
			onChangeIngress: function(index) {
				this.loading = true;
				console.log("carrier: " + this.ingress_carrier);
				this.$http.get(api.getEndpointUrl() + '/v1/carrier/'+this.ingress_carrier+'/ingress_trunk/list',
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(function(response) {
					var self = this;
					this.loading = false;
					var items = response.body.payload.items;

					self.ingress_trunk_list = [];
					self.ingress_trunk = 0;
					items.forEach(function(item, i){
						if (item.is_active) {
							var trunk = {};
							trunk.id = item.resource_id;
							trunk.value = item.name;
							trunk.text = item.name;
							self.ingress_trunk_list.push(trunk);
							if(self.ingress_trunk_list.length === 1)
								self.ingress_trunk = trunk.id;
						}
					});
				}, function(error) {
					this.loading = false;
					console.log(error);
				});
			},
			reset : function(e){
				this.ani_empty = false;
				this.ani_min = "";
				this.dnis_prefix = "";
				this.ani_prefix = "";
				this.ani_max = "";
				this.dnis_max = "";
				this.dnis_min = "";
				this.time_profile = 0;
				this.ingress_carrier = 0;
				this.egress_carrier = 0;
			},
			validateBeforeSubmit(e){
				e.preventDefault();
				this.$validator.validateAll().then(() => {
					this.loading = true;
                    console.log(this.ani_empty);
					this.$http.post(api.getEndpointUrl() + '/v1/route/block',
					{
						"ANI_empty": this.ani_empty,
						"ANI_min": this.ani_min,
						"DNIS_prefix": this.dnis_prefix,
						"ANI_prefix": this.ani_prefix,
						"ANI_max": this.ani_max,
                        "DNIS_max": this.dnis_max,
                        "DNIS_min": this.dnis_min,
                        "time_profile_id": this.time_profile,
                        "ingress_trunk_id": this.ingress_carrier,
                        "egress_trunk_id": this.egress_carrier,
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
							this.setMessage('The route block has been created!');
						},
						function(response) {
							this.loading = false;
							console.log(response);
							this.setMessage({
								message:"Creating route block is failed!",
								type:"error"
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
