<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="#">Switch</a>
					</li>
					<li class="breadcrumb-item">
						<router-link to="/switch/payment_term">Payment Term </router-link>
					</li>
					<li class="breadcrumb-item active">New</li>
				</ol>
				<h1 class="page-header">Create Payment Term</h1>
				<router-link to="/switch/payment_term" class="btn btn_white back">
					<span class="dnl_icon dnl_import"></span> Back </router-link>
				<div class="white_pad">
					<div class="select_group row">
						<div class="col-md-8 col-sm-8">
							<form class="form" @submit.prevent="validateBeforeSubmit">
								<div class="row">
									<div class="form-group">
										<div class="col-sm-4">
											<label for="groupname">Payment Term:</label>
											<input type="text" name="name" v-model="name" class="form-control" v-validate="'required'" placeholder="Enter Name">
											<span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
										</div>
										<div class="col-sm-8">
											<div class="col-sm-12">
												<label for="groupname">Invoicing Cycle:</label>
											</div>
											<div>
												<div class="col-sm-6">
													<select class="daysselect" v-model="selected_term">
		                                                        <option v-for="pt in payment_options" v-bind:value="pt.id">{{pt.text}}</option>
		                                                    </select>
												</div>
												<div class="col-sm-6">
													<input type="text" v-if="selected_term==4" class="form-control" :class="{'input': true, 'is-danger': errors.has('name') }">
													<select v-if="selected_term!=4 && selected_term!=5" class="daysselect" v-model="day">
		                                                        <option v-for="opt in icdays" v-bind:value="opt.id">{{opt.text}}</option>
		                                                    </select>
												</div>
											</div>
										</div>
									</div>
									<div class="clearfix little-space"></div>
								</div>
								<div class="row">
									<div class="form-group">
										<div class="col-sm-4">
											<label for="groupname">Grace Period(Days):</label>
											<select class="daysselect" v-model="grace_days">
														<option v-for="pt in days" v-bind:value="pt.id">{{pt.text}}</option>
													</select>
										</div>
										<div class="col-sm-8">
											<div class="col-sm-12">
												<label for="groupname">Notify(Days):</label>
											</div>
											<div>
												<div class="col-sm-6">
													<select class="daysselect" v-model="notify_days">
																<option v-for="pt in days" v-bind:value="pt.id">{{pt.text}}</option>
															</select>
												</div>
											</div>
										</div>
									</div>
									<div class="clearfix little-space"></div>
								</div>
								<div class="button_set little-space">
									<button class="btn btn-primary" type="submit">
												Submit
											</button>
									<i v-show="loading" class="fa fa-spinner fa-spin" style="font-size:20px;line-height:40px;"></i>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	const multiselect = require('multiselect');
	const vSelect = require('vue!../main_components/select.vue');
	const vvalidate = require('vee-validate');
	const vcarrier = require('vue!../management/carrier.vue');
	const api = require("../../api");
	const auth = require("../../auth");
	import {
		mapActions
	} from 'vuex'

	module.exports = {
		created: function() {
			for (var i = 1; i <= 31; i++) {
				var s = {};
				s.id = i;
				s.text = i.toString();
				this.days.push(s);
			}
			for (var i = 1; i <= 31; i++) {
				var s = {};
				s.id = i;
				s.text = i.toString() + " ";
				if (i % 10 == 1) {
					s.text += "st";
				} else if (i % 10 == 2) {
					s.text += "nd";
				} else if (i % 10 == 3) {
					s.text += "rd";
				} else {
					s.text += "th";
				}
				this.monthdays.push(s);
			}
			for (var i = 1; i <= 60; i++) {
				var s = {};
				s.id = i;
				s.text = i.toString();
				this.everydays.push(s);
			}
			this.icdays = this.monthdays;
		},
		components: {
			'multiselect': multiselect,
			'select2': vSelect
		},
		data: function() {
			return {
				options: [],
				days: [],
				day: 1,
				grace_days: 1,
				notify_days: 1,
				monthdays: [],
				everydays: [],
				icdays: [],
				sflag: true,
				selected_term: 1,
				loading: false,
				payment_options: [{
						id: 1,
						text: 'Day of Month'
					},
					{
						id: 2,
						text: 'Every'
					},
					{
						id: 3,
						text: 'Day of Week'
					},
					{
						id: 4,
						text: 'Some day of month'
					},
					{
						id: 5,
						text: 'Twice a month'
					}
				],
				weekdays: [{
						id: 1,
						text: 'Monday'
					},
					{
						id: 2,
						text: 'Tuesday'
					},
					{
						id: 3,
						text: 'Wednesday'
					},
					{
						id: 4,
						text: 'Thursday'
					},
					{
						id: 5,
						text: 'Friday'
					},
					{
						id: 6,
						text: 'Saturday'
					},
					{
						id: 7,
						text: 'Sunday'
					}
				]
			}
		},
		watch: {
			'selected_term': function() {
				this.sflag = false;
				switch (this.selected_term) {
					case 1:
						this.icdays = [];
						console.log(this.monthdays);
						this.icdays = this.monthdays;
						console.log(this.icdays);
						this.sflag = true;
						break;
					case 2:
						this.icdays = [];
						this.icdays = this.everydays;
						this.sflag = true;
						break;
					case 3:
						this.icdays = [];
						this.icdays = this.weekdays;
						this.sflag = true;
						break;
				}
			}
		},
		mounted: function() {},
		methods: {
			...mapActions({
				setMessage: 'app_message/setAppMessage'
			}),
			reset: function() {},
			validateBeforeSubmit() {
				this.$validator.validateAll().then(() => {
					// eslint-disable-next-line
					this.loading = true;
					var requestForm = {};
					requestForm.days = [];
					requestForm.name = this.name;
					requestForm.type = this.payment_options[this.selected_term - 1].text;
					console.log(requestForm.type);
					requestForm.days.push(this.day);
					requestForm.grace_period = this.grace_days;
					requestForm.notify_days = this.notify_days;
					console.log(requestForm);
					this.$http.post(api.getEndpointUrl() + '/v1/config/payment_term/create',
						requestForm, {
							headers: {
								"X-Auth-Token": auth.getToken()
							}
						}
					).then(
						function(response) {
							this.loading = false;
							console.log(response);
							this.$router.push('/switch/payment_term');
							this.setMessage('The payment term has been created!');
						},
						function(response) {
							this.loading = false;
							console.log(response);
							this.setMessage({
								message: "Creating payment term is failed!",
								type: "error"
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

<style>
	.wrapper.single .white_pad {
		margin-bottom: 20px;
	}
	.little-space {
		margin: 15px 0;
	}
	.ms-container .ms-selectable,
	.ms-container .ms-selection {
		width: 47%;
	}
	.button_set.little-space {
		margin-top: 25px;
	}
	.button_set.little-space .btn {
		width: 23%;
	}
	.button_set.little-space .btn-primary {
		margin-right: 2px;
	}
	.btn_white.back {
		color: #222;
		background: #f7f8f9;
		border: 1px solid #e2e6ed;
		box-shadow: 0px 1px 1px 0px rgba(227, 230, 237, 0.74);
		padding: 9px 30px;
		margin-bottom: 20px;
	}
	.btn_white.back:hover {
		background: #fff;
	}
	.btn_white.back .dnl_icon {
		color: #03c0fc;
		font-size: 16px;
		vertical-align: middle;
		margin: -2px 5px 0 -10px;
		display: inline-block;
		transform: rotate(-90deg);
		font-weight: 900;
	}
	.daysselect {
		border: 1px solid #dee0e3;
		padding: 8px;
		border-radius: 4px;
	}
	@media (max-width: 480px) {
		.white_pad.select_group {
			width: 100%;
		}
		.clearfix.little-space,
		.button_set.little-space {
			margin: 0;
		}
	}
	@media (min-width: 319px) and (max-width: 479px) {
		.ms-container .ms-selectable,
		.ms-container .ms-selection {
			width: 100%;
			margin-bottom: 20px;
		}
		.ms-container {
			background-position: 50% 48%;
		}
		.ms-selection {
			margin-top: 20px;
		}
	}
</style>