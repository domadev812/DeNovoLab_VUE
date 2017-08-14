<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item"><a href="#">Switch</a></li>
					<li class="breadcrumb-item">
						<router-link to="/switch/us_jurisdiction">US Jurisdiction</router-link>
					</li>
					<li class="breadcrumb-item active">New</li>
				</ol>
				<h1 class="page-header">New US Jurisdiction</h1>
				<router-link to="/switch/us_jurisdiction" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
				<div class="white_pad">
					<div class="col-md-6 col-sm-8">
						<form class="form" @submit.prevent="validateBeforeSubmit">
							<div class="row">
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label for="country">Country:</label>
										<input type="text" name="country" v-model="data.country" class="form-control" v-validate="'required'" placeholder="Enter Country">
										<span v-show="errors.has('country')" class="help is-danger">{{ errors.first('country') }}</span>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label>State:</label>
										<input type="text" name="state" v-model="data.state" class="form-control" v-validate="'required'" placeholder="Enter State">
										<span v-show="errors.has('state')" class="help is-danger">{{ errors.first('state') }}</span>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label>Prefix:</label>
										<input type="text" name="prefix" v-model="data.prefix" class="form-control" v-validate="'required'" placeholder="Enter Prefix">
										<span v-show="errors.has('prefix')" class="help is-danger">{{ errors.first('prefix') }}</span>
									</div>
								</div>
								<div class="clearfix"></div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label>OCN:</label>
										<input type="text" name="ocn" v-model="data.ocn" class="form-control" v-validate="'required'" placeholder="Enter OCN">
										<span v-show="errors.has('ocn')" class="help is-danger">{{ errors.first('ocn') }}</span>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label>LATA:</label>
										<input type="text" name="lata" v-model="data.lata" class="form-control" v-validate="'required'" placeholder="Enter LATA">
										<span v-show="errors.has('lata')" class="help is-danger">{{ errors.first('lata') }}</span>
									</div>
								</div>
								<!-- <div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label>Block Id:</label>
										<input type="text" name="block_id" v-model="data.block_id" class="form-control" v-validate="'required'" placeholder="Enter Block id">
										<span v-show="errors.has('block_id')" class="help is-danger">{{ errors.first('block_id') }}</span>
									</div>
								</div>
								<div class="clearfix"></div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label>Effective Date:</label>
										<input type="text" name="effective_date" v-model="data.effective_date" class="form-control" v-validate="'required'" placeholder="Enter Effective Date">
										<span v-show="errors.has('effective_date')" class="help is-danger">{{ errors.first('effective_date') }}</span>
									</div>
								</div> -->
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
	const api = require("../../api");
	const auth = require("../../auth");
	import {
		mapActions
	} from 'vuex'
	
	module.exports = {
		components: {
			'select2': vSelect
		},
		data: function(){
			return {
			  prefix: '',
			  state: '',
			  lata: '',
			  country: '',
			//   block_id: '',
			  ocn: '',
			  data: {},
			  originalData: {},
			  id: '',
			}
		},
		watch: {
			
		},
		methods: {
			...mapActions({
				setMessage: 'app_message/setAppMessage'
			}),
			reset : function(e){
				e.preventDefault();
				console.log(this.originalData);
				this.data = JSON.parse( JSON.stringify( this.originalData ) );
				// this.data.country = '';
				// this.data.state = '';
				// this.data.prefix = '';
				// this.data.lata = '';
				// this.data.ocn = '';
			},
			validateBeforeSubmit(){
				this.$validator.validateAll().then(() => {
					// eslint-disable-next-line
					this.loading = true;
					this.$http.patch(api.getEndpointUrl() + '/v1/config/us_jurisdictionprefix/create' + this.id,
					{
                        "prefix": this.data.prefix,
						"state": this.data.state,
						"lata": this.data.lata,
						// "block_id": this.data.block_id,
						"ocn": this.data.ocn,
						"country": this.data.country
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

							this.$router.push('/switch/us_jurisdiction');
							this.setMessage('The US Jurisdiction has been changed!');
						},
						function(response) {
							this.loading = false;
							console.log(response);

							this.setMessage({
								message:"Changing US Jurisdiction is failed!",
								type:'error'
							});
						}
					)
					
				}).catch(() => {
					// eslint-disable-next-line
					
				});
			}
		},
		created: function() {
			var id = this.$route.params.id;
			this.id = id;
			this.loading = true;
			this.$http.get(api.getEndpointUrl() + "/v1/config/us_jurisdictionprefix/" + id,
            {
                headers: {
                    "X-Auth-Token": auth.getToken()
                }
            }).then(function (response) {
                var self = this;
                this.loading = false;
                var data = response.body.payload;
                Vue.set(this.data, 'prefix', data.prefix);
                Vue.set(this.data, 'country', data.country);
                Vue.set(this.data, 'state', data.state);
                Vue.set(this.data, 'lata', data.lata);
				Vue.set(this.data, 'ocn', data.ocn);

				this.originalData = JSON.parse( JSON.stringify( this.data ) );
				
                console.log("data");
				console.log(this.data);
				console.log(this.originalData);
            }, function (error) {
                this.loading = false;
                console.log(error);
            });
		}
	}
</script>
