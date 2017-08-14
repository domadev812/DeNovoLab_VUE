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
					<li class="breadcrumb-item active">Edit Rate Table</li>
				</ol>
				<h1 class="page-header">Edit Rate Table</h1>
				<router-link to="/switch/rate_table" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
				<div class="white_pad">
					<spinner v-show="loading" class="spinner"></spinner>
					<form class="form">
						<div class="select_group row">
							<div class="role_section margin-fixed">
								<div class="col-md-3 col-sm-4">
									<div class="form-group">
										<label for="name">Rate Table Name:</label>
										<input v-validate="'required'" type="text" name="name" v-model="ratetable.name" class="form-control" placeholder="Enter Rate Table Name">
										<span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
									</div>
								</div>
								<div class="col-md-3 col-sm-4">
									<div class="form-group">
										<label>Code Deck:</label>
										<select class="selectable" v-model="ratetable.code_deck_id">
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
										<select class="selectable" v-model="ratetable.currency_id">
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
										<select class="selectable" v-model="ratetable.rate_type_name" v-on:change="changeRateType">
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
										<select class="selectable" v-model="ratetable.billing_method">
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
						<div class="button_set little-space">
							<button class="btn btn-primary" style="width: 198px" v-on:click="validateBeforeSubmit">
								Submit
							</button>
							<button class="btn btn-default" style="width: 198px" v-on:click="reset">
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
	const vSpinner = require('vue!../main_components/fadeloader.vue');
	import {
		mapActions
	} from 'vuex'
	function Item() {
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
		created: function() {
			var id = this.$route.params.id;
			this.rate_table_id = id;

			this.fetchCurrency();
			this.fetchCodeDeck();
			this.fetchRateTable(id);
		},
		components: {
			'select2': vSelect,
			'spinner': vSpinner
		},
		data: function() {
			return {
				loading: false,
				init_ratetable: {},
				rate_table_id: 0,
				ratetable: {},
				code_deck_list: [],
				currency_list: [],
				rate_table_name: '',
				code_deck: -1,
				currency: 0,
				type: 'DNIS',
				rate_type: 'A-Z',
				checker: '',
				options: [{
						id: 1,
						value: 'carrier1',
						text: 'Carrier 1'
					},
					{
						id: 2,
						value: 'carrier2',
						text: 'Carrier 2'
					},
					{
						id: 3,
						value: 'carrier3',
						text: 'Carrier 3'
					},
					{
						id: 4,
						value: 'carrier4',
						text: 'Carrier 4'
					},
					{
						id: 5,
						value: 'carrier5',
						text: 'Carrier 5'
					}
				],
				rate: {
					id: '',
					// status: false,
					selected: false,
					code: '',
					code_name: '',
					country: '',
					rate: '',
					intra_rate: '',
					inter_rate: '',
					effective_date: '',
					end_date: '',
					setup_fee: '',
					time_profile_id: '',
					local_rate: '',
					min_time: '',
					interval: '',
					show_extra_field: false,
					more_less: 'more',
				},
				rate_type_list: [
				  { id: 'A-Z', value: 'A-Z', text: 'A-Z' },
				  { id: 'US Jurisdictional', value: 'US JD', text: 'US JD' },
				  { id: 'US Non Jurisdictional', value: 'US non JD', text: 'US non JD' },
			  	],
				types: [{
						id: 'DNIS',
						value: 'DNIS',
						text: 'DNIS'
					},
					{
						id: 'LRN',
						value: 'LRN',
						text: 'LRN'
					},
				],
				needType: false,
				isShowExtraFields: false,
				rate_table_id: '',
				rates: [{
					id: '',
					// status: false,
					selected: false,
					code: '',
					code_name: '',
					country: '',
					rate: '',
					intra_rate: '',
					inter_rate: '',
					effective_date: '',
					end_date: '',
					setup_fee: '',
					time_profile_id: '0',
					local_rate: '',
					min_time: '',
					interval: '',
					show_extra_field: false,
					more_less: 'more',
				}],
			}
		},
		watch: {
			'ratetable.rate_type_name': function() {
				console.log("rate_type-->"+this.ratetable.rate_type_name);
				if(this.ratetable.rate_type_name == 'US Jurisdictional' || this.ratetable.rate_type_name == 'US Non Jurisdictional') {
					this.needType = true;
					this.ratetable.billing_method = 'DNIS';
				}
				else {
					this.needType = false;
					this.ratetable.billing_method = 'DNIS';
				}
				console.log(this.needType)
			},
		},
		methods: {
			...mapActions({
				setMessage: 'app_message/setAppMessage'
			}),
			fetchRateTable(id) {
				//  /switch/rate_table/{rate_table_id}
				const url = api.getEndpointUrl() + '/v1/switch/rate_table/' + id
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const ratetable = body.payload
						this.ratetable = Object.assign([], ratetable);
						console.log("ratetable");
						console.log(this.ratetable);
						this.rate_table_name = this.ratetable.name;
						if (typeof this.ratetable.code_deck_id !== 'undefined')
							this.code_deck = this.ratetable.code_deck_id;
						else
							this.code_deck = -1;
						this.currency = this.ratetable.currency_id;
						this.rate_type = this.ratetable.rate_type_name;
						this.type = this.ratetable.billing_method;
										
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			fetchCodeDeck() {
				this.loading = true;
				console.log("fetchCodeDeck start");
				const url = api.getEndpointUrl() + '/v1/switch/code_deck/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const code_decks = body.payload.items
						var self = this;
						code_decks.forEach(function (item, i) {
							var code_deck = {};
							code_deck.id = item.code_deck_id;
							code_deck.text = item.name;
							self.code_deck_list.push(code_deck);
						});
						console.log(this.code_deck_list);
						if (typeof this.ratetable.code_deck_id !== 'undefined')
							this.code_deck = this.ratetable.code_deck_id;
						else
							this.code_deck = -1;
						console.log("fetchCodeDeck end");
										
					}
					this.loading = false;
				})
				.catch(error => {
					console.log(error);
					this.loading = false;
				})
			},
			fetchCurrency() {
				console.log("fetchCurrency start");
				const url = api.getEndpointUrl() + '/v1/switch/currency/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const currencies = body.payload.items
						var self = this;
						currencies.forEach(function (temp, i) {
							var currency = {};
							currency.id = temp.currency_id;
							currency.text = temp.code;
							self.currency_list.push(currency);
						});
						console.log(this.currency_list);
						this.currency = this.ratetable.currency_id;
						console.log("fetchCurrency end");
					}
				})
				.catch(error => {
					console.log(error);
				})
			},
			changeRateType: function() {
				console.log("rate_type-->" + this.ratetable.rate_type_name);
				if(this.ratetable.rate_type_name == 'US Jurisdictional' || this.ratetable.rate_type_name == 'US Non Jurisdictional') {
					this.needType = true;
				}
				else {
					this.needType = false;
				}
				console.log(this.needType)
				this.ratetable.billing_method = 'DNIS';
			},
			clickSelectedAll: function() {
				console.log("select_all-->" + this.checker);
				if (this.checker) {
					this.rates.forEach(function(rate, i) {
						rate.selected = true;
					});
				} else {
					this.rates.forEach(function(rate, i) {
						rate.selected = false;
					});
				}
			},
			reset: function(e) {
				e.preventDefault();
				console.log(this.rate_table_name);
				this.ratetable.name = this.rate_table_name;
				this.ratetable.code_deck_id = this.code_deck;
				this.ratetable.currency_id = this.currency;
				this.ratetable.rate_type_name = this.rate_type;
				this.ratetable.billing_method = this.type;
			},
			validateBeforeSubmit(e) {
				e.preventDefault();
				this.$validator.validateAll().then(() => {
					this.loading = true;
					console.log(this.ratetable);

					var requestForm = {};
					requestForm.currency_id = this.ratetable.currency_id;
					requestForm.rate_type_name = this.ratetable.rate_type_name;
					requestForm.billing_method = this.ratetable.billing_method;
					requestForm.name = this.ratetable.name;
					if (this.ratetable.code_deck_id != -1) {
						requestForm.code_deck_id = this.ratetable.code_deck_id;
					}
					
					this.$http.patch(api.getEndpointUrl() + '/v1/switch/rate_table/' + this.rate_table_id, 
					requestForm, 
					{
						headers: {
							"X-Auth-Token": auth.getToken()
						}
					}).then(
						function(response) {
							this.loading = false;
							console.log(response);
							this.setMessage('The rate table has been changed!');
							this.$router.push('/switch/rate_table');
						},
						function(response) {
							this.loading = false;
							console.log(response);
							this.setMessage({
								message: "Updating rate table is failed!",
								type: "error"
							});
							this.$router.push('/switch/rate_table');
						}
					)
				}).catch(() => {
					// eslint-disable-next-line
				});
			},
			addRate: function() {
				console.log("add rate");
				this.rates.push({
					id: '',
					// status: false,
					code: '',
					code_name: '',
					country: '',
					rate: '',
					intra_rate: '',
					inter_rate: '',
					effective_date: '',
					end_date: '',
					// extra_fields: '1/1/0 undefined',
					setup_fee: '',
					time_profile_id: '',
					local_rate: '',
					min_time: '',
					interval: '',
					show_extra_field: false,
					more_less: 'more',
				});
				if (this.checker)
					this.checker = false;
			},
			deleteRate: function(i) {
				this.rates.splice(i, 1);
			},
			removeAll: function() {
				console.log("remove all rates");
				this.rates = [];
				if (this.checker)
					this.checker = false;
			},
			removeSelected: function() {
				console.log("remove selected rates");
				console.log(this.rates);
				var vm = [];
				this.rates.forEach(function(rate, i) {
					if (rate.selected != true) {
						vm.push(rate);
					}
				});
				this.rates = vm;
				console.log("end");
				if (this.checker)
					this.checker = false;
			},
			showHideExtraField: function(rate) {
				console.log("show/hide extra field");
				console.log(rate);
				rate.show_extra_field = !rate.show_extra_field;
				if (rate.show_extra_field) {
					rate.more_less = 'less';
				} else {
					rate.more_less = 'more';
				}
			}
		},
		mounted: function() {
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
	table.table.table-striped.table-hover.carrier_groups .checkbox-success input[type="checkbox"]:checked+label::before {
		background-color: #03c0fc;
		border-color: #03c0fc;
	}
</style>
