<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="#">Switch</a></li>
				<li class="breadcrumb-item">
					<router-link to="/switch/time_profile">Time Profile</router-link>
				</li>
				<li class="breadcrumb-item active">Edit</li>
				</ol>
			<h1 class="page-header">Edit Time Profile</h1>
			<router-link to="/switch/time_profile" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad">
				<div class="col-md-6 col-sm-8">
					<form class="form" @submit.prevent="validateBeforeSubmit">
						<input type="hidden" name="timeprofileid" v-model="timeprofileid"/>
						<spinner v-show="loading" class="spinner"></spinner>
						<div v-show="loading" class="mask"></div>
						<div class="row">
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="name">Name:</label>
									<input type="text" name="name" v-model="name" class="form-control" v-validate="'required'" placeholder="Enter Name">
									<span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label>Type:</label>
									<select class="selectable" v-model="time_type">
										<option v-for="time_type in time_type_list" v-bind:value="time_type.id">
											{{ time_type.text }}
										</option>
									</select>
								</div>
							</div>
							<div class="clearfix"></div>
							<div class="col-md-4 col-sm-6" v-if="needWeek">
								<div class="form-group">
									<label>Start Week Day:</label>
									<select class="selectable" v-model="start_day_of_week">
										<option disabled value="0" selected>Start Day</option>
										<option v-for="weekday in week_days" v-bind:value="weekday.id">
											{{ weekday.text }}
										</option>
									</select>
								</div>
							</div>
							<div class="col-md-4 col-sm-6" v-if="needWeek">
								<div class="form-group">
									<label>End Week Day:</label>
									<select class="selectable" v-model="end_day_of_week">
										<option disabled value="0" selected>End Day</option>
										<option v-for="weekday in week_days" v-bind:value="weekday.id">
											{{ weekday.text }}
										</option>
									</select>
								</div>
							</div>
							<div class="clearfix"></div>
							<div class="col-md-4 col-sm-6" v-if="needDay">
								<div class="form-group">
									<label>Start Time:</label>
									<el-time-picker v-model="start_time" :picker-options="{}" placeholder="Start TIme"></el-time-picker>
								</div>
							</div>
							<div class="col-md-4 col-sm-6" v-if="needDay">
								<div class="form-group">
									<label>End Tme:</label>
									<el-time-picker v-model="end_time" :picker-options="{}" placeholder="End TIme"></el-time-picker>
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
	import {mapGetters,	mapActions} from 'vuex'

	module.exports = {
		components: {
			'select2': vSelect,
			'spinner': vSpinner,
		},
		data: function(){
			return {
			apiUrl:'/v1/config/time_profile/',
			timeprofileid: 0,
			  name: '',
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
			  
			  initData: {},
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
				this.name = this.initData.name;
				this.time_type = this.initData.time_type;
				this.start_day_of_week = this.initData.start_day_of_week;
				this.end_day_of_week = this.initData.end_day_of_week;
				this.start_time = this.initData.start_time;
				this.end_time = this.initData.end_time;
			},
			validateBeforeSubmit(){
				this.$validator.validateAll().then(() => {
					// eslint-disable-next-line
					this.loading = true;
					var id = this.timeprofileid;
					this.$http.patch(api.getEndpointUrl() + this.apiUrl + id,
					{
                        "start_time": this.start_time != '' ? formatDate(this.start_time) : '',
                        "end_time": this.end_time != '' ? formatDate(this.end_time) : '',
                        "start_day_of_week": this.start_day_of_week,
                        "end_day_of_week": this.end_day_of_week,
                        "type_name": this.time_type_string,
                        "name": this.name,
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

							this.$router.push('/switch/time_profile');
							this.setMessage('The time profile has been modified!');
						},
						function(response) {
							this.loading = false;
							console.log(response);

							this.setMessage({
								message:"Editing time profile is failed!",
								type:"error"
							});
						}
					)
					
				}).catch(() => {
					// eslint-disable-next-line
					
				});
			}
		},
		created: function(){
			var the = this;
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
				var time_profile = response.body.payload;
				this.timeprofileid = time_profile.time_profile_id;

				this.name = time_profile.name;
				this.start_time = (time_profile.start_time != '' ? setTimeFormat(time_profile.start_time) : '');
				this.end_time = (time_profile.end_time != '' ? setTimeFormat(time_profile.end_time) : '');
				this.start_day_of_week = time_profile.start_day_of_week;
				this.end_day_of_week = time_profile.end_day_of_week;
				this.time_type_string = time_profile.type_name;

				if(this.time_type_string == 'weekly') {
                    this.time_type = 2;
					this.needWeek = true;
                    this.needDay = true;
				}
                else if(this.time_type_string == 'daily') {
                    this.time_type = 3;
					this.needWeek = false;
					this.needDay = true;
                }
				else {
                    this.time_type = 1;
					this.needWeek = false;
					this.needDay = false;
				}

				this.initData.name = this.name;
				this.initData.time_type = this.time_type;
				this.initData.start_day_of_week = this.start_day_of_week;
				this.initData.end_day_of_week = this.end_day_of_week;
				this.initData.start_time = this.start_time;
				this.initData.end_time = this.end_time;

			}, function(error) {
				this.loading = false;
				console.log(error);
			});
		}
	}
</script>
