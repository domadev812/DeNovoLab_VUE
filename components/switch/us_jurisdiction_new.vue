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
										<input type="text" name="country" v-model="country" class="form-control" v-validate="'required'" placeholder="Enter Country">
										<span v-show="errors.has('country')" class="help is-danger">{{ errors.first('country') }}</span>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label>State:</label>
										<input type="text" name="state" v-model="state" class="form-control" v-validate="'required'" placeholder="Enter State">
										<span v-show="errors.has('state')" class="help is-danger">{{ errors.first('state') }}</span>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label>Prefix:</label>
										<input type="text" name="prefix" v-model="prefix" class="form-control" v-validate="'required'" placeholder="Enter Prefix">
										<span v-show="errors.has('prefix')" class="help is-danger">{{ errors.first('prefix') }}</span>
									</div>
								</div>
								<div class="clearfix"></div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label>OCN:</label>
										<input type="text" name="ocn" v-model="ocn" class="form-control" v-validate="'required'" placeholder="Enter OCN">
										<span v-show="errors.has('ocn')" class="help is-danger">{{ errors.first('ocn') }}</span>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label>LATA:</label>
										<input type="text" name="lata" v-model="lata" class="form-control" v-validate="'required'" placeholder="Enter LATA">
										<span v-show="errors.has('lata')" class="help is-danger">{{ errors.first('lata') }}</span>
									</div>
								</div>
								<!-- <div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label>Block Id:</label>
										<input type="text" name="block_id" v-model="block_id" class="form-control" v-validate="'required'" placeholder="Enter Block id">
										<span v-show="errors.has('block_id')" class="help is-danger">{{ errors.first('block_id') }}</span>
									</div>
								</div>
								<div class="clearfix"></div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label>Effective Date:</label>
										<input type="text" name="effective_date" v-model="effective_date" class="form-control" v-validate="'required'" placeholder="Enter Effective Date">
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
			  time_type_list: [
				  { id: '1', value: 'All time', text: 'All time' },
				  { id: '2', value: 'Weekly', text: 'Weekly' },
                  { id: '3', value: 'Daily', text: 'Daily' },
			  ],
			  week_days: [
				  { id: '1', value: 'Monday', text: 'Monday' },
				  { id: '2', value: 'Tuesday', text: 'Tuesday' },
				  { id: '3', value: 'Wednesday', text: 'Wednesday' },
				  { id: '4', value: 'Tuesday', text: 'Tuesday' },
				  { id: '5', value: 'Friday', text: 'Friday' },
				  { id: '6', value: 'Saturday', text: 'Saturday' },
				  { id: '7', value: 'Sunday', text: 'Sunday' },
			  ],
			  start_time: '',
			  end_time: '',
              time_type: 1,
              time_type_string: "all time",
              start_day_of_week: 0,
              end_day_of_week: 0,

			  needWeek: false,
              needDay: false,

			  prefix: '',
			  state: '',
			  lata: '',
			  country: '',
			//   block_id: '',
			  ocn: '',
			}
		},
		watch: {
			'time_type': function() {
				console.log("time_type-->"+this.time_type);
				if(this.time_type == '2') {
                    this.time_type_string = "weekly";
					this.needWeek = true;
                    this.needDay = true;
				}
                else if(this.time_type == '3') {
                    this.time_type_string = "daily";
					this.needWeek = false;
					this.needDay = true;
                }
				else {
                    this.time_type_string = "all time";
					this.needWeek = false;
					this.needDay = false;
				}
			},
			
		},
		methods: {
			...mapActions({
				setMessage: 'app_message/setAppMessage'
			}),
			reset : function(e){
				e.preventDefault();
				this.country = '';
				this.state = '';
				this.prefix = '';
				this.lata = '';
				this.ocn = '';
			},
			validateBeforeSubmit(){
				this.$validator.validateAll().then(() => {
					// eslint-disable-next-line
					this.loading = true;
					this.$http.post(api.getEndpointUrl() + '/v1/config/us_jurisdictionprefix/create',
					{
                        "prefix": this.prefix,
						"state": this.state,
						"lata": this.lata,
						// "block_id": this.block_id,
						"ocn": this.ocn,
						"country": this.country
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
							this.setMessage('The US Jurisdiction has been created!');
						},
						function(response) {
							this.loading = false;
							console.log(response);

							this.setMessage({
								message:'Creating US Jurisdiction is failed!',
								type:'error'
							});
						}
					)
					
				}).catch(() => {
					// eslint-disable-next-line
					
				});
			}
		}
	}
</script>
