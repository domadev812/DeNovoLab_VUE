<template>
	<div class="container-fluid">
		<div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Routing</a></li>
				  <li class="breadcrumb-item">
					  <router-link to="/routing/static_routing">Static Routing</router-link>
				  </li>
				  <li class="breadcrumb-item active">Edit</li>
			</ol>
			<h1 class="page-header">Edit Static Routing</h1>
			<router-link to="/routing/static_routing" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad">
				<div class="col-md-6 col-sm-8">
					<form class="form" @submit.prevent="validateBeforeSubmit">
						<input type="hidden" name="routingid" v-model="routingid"/>
						<spinner v-show="loading" class="spinner"></spinner>
						<div v-show="loading" class="mask"></div>
						<div class="row">
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="name">Name:</label>
									<input type="text" name="name" v-model="data.name" class="form-control" v-validate="'required'" placeholder="Enter Name">
									<span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
										<label>Defined By:</label>
										<select class="selectable" v-model="data.defined_by">
											<option disabled value="0" selected>Select Defined By</option>
											<option v-for="defined_by_item in defined_by_list" v-bind:value="defined_by_item.id">
												{{ defined_by_item.text }}
											</option>
										</select>
								</div>
							</div>
							<div class="clearfix"></div>
							<div v-if="show_codedeck" class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>Code Deck:</label>
									<select class="selectable" v-model="data.code_deck">
										<option disabled value="0" selected>Select Code Deck</option>
										<option v-for="code_deck_item in code_deck_list" v-bind:value="code_deck_item.id">
											{{ code_deck_item.text }}
										</option>
									</select>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>Routed By:</label>
									<select class="selectable" v-model="data.routed_by">
										<option disabled value="0" selected>Select Routed By</option>
										<option v-for="routed_by_item in routed_by_list" v-bind:value="routed_by_item.id">
											{{ routed_by_item.text }}
										</option>
									</select>
								</div>
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
	const vvalidate = require('vee-validate');
	const vSelect = require('vue!../main_components/select.vue');
	const vSpinner = require('vue!../main_components/fadeloader.vue');
	const api = require("../../api");
	const auth = require("../../auth");
	import {mapActions} from 'vuex'

	module.exports = {
		created: function(){
			var id = this.$route.params.id;
			
			this.loading = true;
			this.$http.get(api.getEndpointUrl() + this.apiUrl + id,
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function(response) {
				//todo: check success flag? validation errors?
				this.loading = false;
				console.log(response);
				var routing = response.body.payload;
				this.routingid = routing.static_route_id;

				// this.name = routing.name;
				// this.routed_by = routing.routed_by;
				// this.defined_by = routing.defined_by;
				// this.code_deck = routing.code_deck_id;

                Vue.set(this.data, 'name', routing.name);
				Vue.set(this.data, 'routed_by', routing.routed_by);
				Vue.set(this.data, 'defined_by', routing.defined_by);
				Vue.set(this.data, 'code_deck', routing.code_deck_id);

				this.originData = JSON.parse( JSON.stringify( this.data ) );
				
			}, function(error) {
				this.loading = false;
				console.log(error);
			});

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
					console.log(i);
					self.code_deck_list.push(code_deck);
				});
				console.log("code_deck_list");
				console.log(this.code_deck_list);
			}, function(error) {
				this.loading = false;
				console.log(error);
			});
			
		},
		components: {
			'select2': vSelect,
			'spinner': vSpinner,
		},
		watch: {
			'defined_by': function () {
				if(this.defined_by == 'Code'){
					this.show_codedeck = false;
					this.code_deck = 0;
				}
				else {
					this.show_codedeck = true;
					this.code_deck = 0;
				}
			}
		},
		data: function(){
			return {
			  apiUrl:'/v1/route/static/',
			//   name: '',
			  defined_by_list: [
				  { id: 'Code', value: 'Code', text: 'Code' },
				  { id: 'Code Name', value: 'Code Name', text: 'Conde Name' },
                  { id: 'Country', value: 'Country', text: 'Country' },
			  ],
			  routed_by_list: [
				  { id: 'DNIS', value: 'DNIS', text: 'DNIS' },
				  { id: 'LRN', value: 'LRN', text: 'LRN' },
			  ],
			//   defined_by: 'Code',
			//   routed_by: 'DNIS',
			  code_deck_list: [],
 			//   code_deck: 0,
			  show_codedeck: false,
			  routingid: 0,

			  data:{},
			  originData:{},
			}
		},
		methods: {
			...mapActions({
				setMessage: 'app_message/setAppMessage'
			}),
			reset : function(e){
				// this.$router.go(this.$router.currentRoute);
				e.preventDefault();
				this.data = JSON.parse( JSON.stringify( this.originData ) );
			},
			validateBeforeSubmit(){
				this.$validator.validateAll().then(() => {
					// eslint-disable-next-line
					this.loading = true;
					var id = this.routingid;
					console.log(id);
					this.$http.patch(api.getEndpointUrl() + this.apiUrl + id,
					{
                        "name": this.data.name,
                        "code_deck_id": this.data.code_deck,
                        "routed_by": this.data.routed_by,
                        "defined_by": this.data.defined_by,
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

							this.$router.push('/routing/static_routing');
							this.setMessage('The static routing has been modified!');
						},
						function(response) {
							this.loading = false;
							console.log(response);

							this.setMessage({
								message:"Editing static routing is failed!",
								type:"error"
							});
						}
					)
				}).catch(() => {
					// eslint-disable-next-line
				});
			}
		},
	}
</script>
