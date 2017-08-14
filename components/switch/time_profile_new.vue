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
					<li class="breadcrumb-item active">New</li>
				</ol>
				<h1 class="page-header">New Time Profile</h1>
				<router-link to="/switch/time_profile" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
				<div class="white_pad">
					<div class="col-md-8 col-sm-10">
						<form class="form" @submit.prevent="validateBeforeSubmit">
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
										<!--<select2 :options="time_type_list" v-model="time_type">
											<option disabled value="0">Select Type</option>
										</select2>-->
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
										<!--<select2 :options="week_days" v-model="start_day_of_week">
											<option disabled value="0">Start Day</option>
										</select2>-->
										<select class="selectable" v-model="start_day_of_week">
											<option disabled value="0" selected>Start Day</option>
											<option v-for="item in week_days" v-bind:value="item.id">
												{{ item.text }}
											</option>
										</select>
									</div>
								</div>
								<div class="col-md-4 col-sm-6" v-if="needWeek">
									<div class="form-group">
										<label>End Week Day:</label>
										<!--<select2 :options="week_days" v-model="end_day_of_week">
											<option disabled value="0">End Day</option>
										</select2>-->
										<select class="selectable" v-model="end_day_of_week">
											<option disabled value="0" selected>End Day</option>
											<option v-for="item in week_days" v-bind:value="item.id">
												{{ item.text }}
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
	const api = require("../../api");
	const auth = require("../../auth");
	import {mapGetters,	mapActions} from 'vuex'

	module.exports = {
		components: {
			'select2': vSelect
		},
		data: function(){
			return {
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
			saveTimeProfile() {
				// eslint-disable-next-line
					this.loading = true;
					var thisvm = this;

					this.$http.post(api.getEndpointUrl() + '/v1/config/time_profile/create',
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
					).then(response => {
						if (response.body.success) {
							thisvm.$router.push('/switch/time_profile');
							thisvm.setMessage('The time profile has been created!');
						}
					})
					.catch(error => {
						console.log(error)
						thisvm.setMessage({
							message: 'Creating time profile is failed!',
							type: 'error'
						})
					})
			},
			reset : function(e){
				e.preventDefault();
				this.name = '';
				this.time_type = 1;
				this.start_day_of_week = 0;
				this.end_day_of_week = 0;
				this.start_time = '';
				this.end_time = '';
			},
			validateBeforeSubmit(){
				var vm = this;
				this.$validator.validateAll().then(() => {
					const err = this.$validator.getErrors();
					if (err.errors.length > 0 || this.start_time == '' || this.end_time == '') {
						if(err.errors.length > 0) {
							const msg = err.errors[0].field + ' field can not leave as null';
							vm.setMessage({
								message: msg,
								type: 'error'
							})
						}
						else if(this.start_time == '') {
							vm.setMessage({
								message: 'start time field can not leave as null',
								type: 'error'
							})
						}
						else if(this.end_time == '') {
							vm.setMessage({
								message: 'end time field can not leave as null',
								type: 'error'
							})
						}
						
					}
					else {
						vm.saveTimeProfile();
					}
						
				}).catch((error) => {
					// eslint-disable-next-line
					console.log(error)
					vm.setMessage({
						message: 'Validation failed',
						type: 'error'
					})
				});
			}
		}
	}
</script>
