<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="#">Finance</a>
					</li>
					<li class="breadcrumb-item">
						<router-link to="/finance/invoices">Invoice</router-link>
					</li>
					<li class="breadcrumb-item active">New</li>
				</ol>
				<h1 class="page-header">Add Invoice</h1>
				<router-link to="/finance/invoices" class="btn btn_white back">
					<span class="dnl_icon dnl_import"></span> Back </router-link>
				<div class="white_pad">
					<div class="row">
						<div class="col-md-2 col-sm-2">
							<label>Period:</label>
							<select class="selectable" v-model="period">
								<option v-for="item in period_options" v-bind:value="item.id">
									{{ item.text }}
								</option>
							</select>
						</div>
						<div class="col-md-3 col-sm-3">
							<!--<label for="submitted_time1" class="m-top-15"></label>-->
							<!--<input type="text" name="submitted_time1" v-model="submitted_time1" class="form-control" placeholder="Enter Date/Time">-->
							<label>Start Date:</label>
							<el-date-picker style="width: 100%;" type="datetime" v-model="start_date_time" :picker-options="{}" placeholder="Enter Start Date Time"></el-date-picker>
						</div>
						<div class="col-md-3 col-sm-3">
							<label>End Date:</label>
							<!--<input type="text" name="submitted_time2" v-model="submitted_time2" class="form-control" placeholder="Enter Date/Time">-->
							<el-date-picker style="width: 100%;" type="datetime" v-model="end_date_time" :picker-options="{}" placeholder="Enter End Date Time"></el-date-picker>
						</div>
						<div class="col-md-2 col-sm-2">
							<label>GMT:</label>
							<select class="selectable" v-model="gmt">
								<option v-for="item in time_zone_options" v-bind:value="item.id">
									{{ item.text }}
								</option>
							</select>
						</div>
						<div class="clearfix little-space"></div>
						<div class="col-md-3 col-sm-4">
							<label for="note">Carriers:</label>
							<select class="selectable" v-model="carrier">
								<option v-for="item in carrier_options" v-bind:value="item.id">
									{{ item.text }}
								</option>
							</select>
						</div>
						<div class="col-md-3 col-sm-4">
							<label>Invoice Date:</label>
							<el-date-picker v-model="invoice_date" type="date" placeholder="Invoice Date"></el-date-picker>
						</div>
						<div class="col-md-3 col-sm-4">
							<label>Payment Due Date:</label>
							<el-date-picker v-model="pay_due_date" type="date" placeholder="Payment Due Date"></el-date-picker>
						</div>
						<div class="clearfix little-space"></div>
						<div class="col-md-3 col-sm-4">
							<label for="note">Rate Decimal Place:</label>
							<select class="selectable" v-model="decimal">
								<option v-for="item in decimal_options" v-bind:value="item.id">
									{{ item.text }}
								</option>
							</select>
						</div>
						<div class="clearfix little-space"></div>
						<div class="col-md-12 col-sm-12">
							<h4 class="role_section_name">Other Options</h4>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input type="checkbox" v-model="daily_usage" name="daily_usage" id="daily_usage">
										<label for="daily_usage">Daily Usage with US Jurisdiction</label>
									</div>
								</div>
							</div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input type="checkbox" v-model="invoice_usage" name="invoice_usage" id="invoice_usage">
										<label for="invoice_usage">Invoice Usage Detail</label>
									</div>
								</div>
							</div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input type="checkbox" v-model="ingress_prefix" name="ingress_prefix" id="ingress_prefix">
										<label for="ingress_prefix">Ingress Prefix</label>
									</div>
								</div>
							</div>
							<div class="clearfix little-space"></div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input type="checkbox" v-model="short_duration" name="short_duration" id="short_duration">
										<label for="short_duration">Short Duration Call Surcharge</label>
									</div>
								</div>
							</div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input type="checkbox" v-model="include_summary" name="include_summary" id="include_summary">
										<label for="include_summary"> Include Summary of Payments</label>
									</div>
								</div>
							</div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input type="checkbox" v-model="detail_by_trunk" name="detail_by_trunk" id="detail_by_trunk">
										<label for="detail_by_trunk">Show Detail by Trunk</label>
									</div>
								</div>
							</div>
							<div class="clearfix little-space"></div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input type="checkbox" v-model="code_summary" name="code_summary" id="code_summary">
										<label for="code_summary">Show Code Summary</label>
									</div>
								</div>
							</div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input type="checkbox" v-model="total_by_codename" name="total_by_codename" id="total_by_codename">
										<label for="total_by_codename">Show Total By Code Name</label>
									</div>
								</div>
							</div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input type="checkbox" v-model="total_by_country" name="total_by_country" id="total_by_country">
										<label for="total_by_country">Show Total by Country</label>
									</div>
								</div>
							</div>
							<div class="clearfix little-space"></div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input type="checkbox" v-model="calls_date" name="calls_date" id="calls_date">
										<label for="calls_date">Show Calls Date</label>
									</div>
								</div>
							</div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input type="checkbox" v-model="include_org_billing" name="include_org_billing" id="include_org_billing">
										<label for="include_org_billing">Include Origination Billing</label>
									</div>
								</div>
							</div>
						</div>
						<div class="clearfix little-space"></div>
	
						<div class="col-md-6">
							<div class="button_set little-space">
								<a class="btn btn-primary mini" @click="validateForInvoice">
									Submit
								</a>
								<a class="btn btn-default mini">
									Reset
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>   
const vSelect = require('vue!../main_components/select.vue');
const api = require("../../api");
module.exports = {
	components: {
		'select2': vSelect
	},
	data: function () {
		return {
			time_zone_options: [
				{ id: 0, text: '+12:00' },
				{ id: 1, text: '+11:00' },
				{ id: 2, text: '+10:00' },
				{ id: 3, text: '+09:00' },
				{ id: 4, text: '+08:00' },
				{ id: 5, text: '+07:00' },
				{ id: 6, text: '+06:00' },
				{ id: 7, text: '+05:00' },
				{ id: 8, text: '+04:00' },
				{ id: 9, text: '+03:00' },
				{ id: 10, text: '+02:00' },
				{ id: 11, text: '+01:00' },
				{ id: 12, text: '00:00' },
				{ id: 13, text: '-01:00' },
				{ id: 14, text: '-02:00' },
				{ id: 15, text: '-03:00' },
				{ id: 16, text: '-04:00' },
				{ id: 17, text: '-05:00' },
				{ id: 18, text: '-06:00' },
				{ id: 19, text: '-07:00' },
				{ id: 20, text: '-08:00' },
				{ id: 21, text: '-09:00' },
				{ id: 22, text: '-10:00' },
				{ id: 23, text: '-11:00' },
				{ id: 24, text: '-12:00' }
			],
			decimal: '5',
			decimal_options: [
				{ id: '0', value: '0', text: '0' },
				{ id: '1', value: '1', text: '1' },
				{ id: '2', value: '2', text: '2' },
				{ id: '3', value: '3', text: '3' },
				{ id: '4', value: '4', text: '4' },
				{ id: '5', value: '5', text: '5' },
				{ id: '6', value: '6', text: '6' },
				{ id: '7', value: '7', text: '7' },
				{ id: '8', value: '8', text: '8' },
				{ id: '9', value: '9', text: '9' },	
				{ id: '10', value: '10', text: '10' },	
			],
			pay_due_date: '',
			invoice_date: '',
			carrier: '',
			carrier_options: [],
			start_date_time: '',
			end_date_time: '',
			period: 'custom',
			period_options: [
				{ id: 'custom', value: 'custom', text: 'Custom' },
				{ id: 'curDay', value: 'curDay', text: 'Today' },
				{ id: 'prevDay', value: 'prevDay', text: 'Yesterday' },
				{ id: 'curWeek', value: 'curWeek', text: 'Current week' },
				{ id: 'prevWeek', value: 'prevWeek', text: 'Previous week' },
				{ id: 'curMonth', value: 'curMonth', text: 'Current month' },
				{ id: 'prevMonth', value: 'prevMonth', text: 'Previous month' },
				{ id: 'curYear', value: 'curYear', text: 'Current year' },
				{ id: 'prevYear', value: 'prevYear', text: 'Previous year' },
			],

			groupname: '',
			received_on: '',
			carrier: '',
			amount: '',
			note: '',
			type: '',
			options: [
				{ id: 1, value: 'carrier1', text: 'Carrier 1' },
				{ id: 2, value: 'carrier2', text: 'Carrier 2' },
				{ id: 3, value: 'carrier3', text: 'Carrier 3' },
				{ id: 4, value: 'carrier4', text: 'Carrier 4' },
				{ id: 5, value: 'carrier5', text: 'Carrier 5' }
			]
		}
	},
	created () {
		this.fetchCarriers();
	},
	methods: {
		getInvoiceForRequest() {

		},
		saveInvoice() {
			const reqBody = this.getInvoiceForRequest();
				var url;
				// if(this.editingrule) {
				// 	url = api.getEndpointUrl() + '/v1/did/billing_rule/' + this.id;
				// 	this.$http.patch(url, reqBody)
				// 		.then(response => {
				// 			if (response.body.success) {
				// 				this.setMessage('Billing Rule was changed successfully');
				// 				var thisvm = this;
				// 				setTimeout(function(){
				// 					thisvm.$router.push('/origination/billing_rule');
				// 				}, 3000);
				// 			}
				// 		})
				// 		.catch(error => {
				// 			console.log(error)
				// 			this.setMessage({
				// 				message: 'Failed to change rule',
				// 				type: 'error'
				// 			})
				// 		})	
				// }
				// else {
					url = api.getEndpointUrl() + '/v1/did/billing_rule/create';
					this.$http.post(url, reqBody)
						.then(response => {
							if (response.body.success) {
								this.setMessage('Billing Rule was created successfully');
								var thisvm = this;
								setTimeout(function(){
									thisvm.$router.push('/origination/billing_rule');
								}, 3000);
							}
						})
						.catch(error => {
							console.log(error)
							this.setMessage({
								message: 'Failed to create rule',
								type: 'error'
							})
						})	
				// }
		},
		validateForInvoice() {
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
					vm.saveInvoice();
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
		fetchCarriers () {
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
							self.carrier_options.push(carrier);
							if(i == 0)
								self.carrier = carrier.id;
						});
						console.log(this.carrier_options);
						
					}
				})
				.catch(error => {
					console.log(error)
				})
		}
	}
}
</script>

<style>

</style>
