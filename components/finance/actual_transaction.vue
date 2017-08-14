<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single big_data">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="#">Finance</a>
					</li>
					<li class="breadcrumb-item active">Actual Transaction</li>
				</ol>
				<h1 class="page-header">Actual Transaction</h1>
				<div class="white_pad table_wrap">
					<div class="advanced_search_filter_panel">
						<div class="col-md-3 col-sm-4">
							<label>Carrier:</label>
							<select2 :options="carrier_list" v-model="carrier">
								<option disabled value="0">Select Carrier</option>
							</select2>
						</div>
						<div class="col-md-4 col-sm-8">
							<div class="inlined">
								<label for="start_date">Start Time:</label>
								<!--<input type="text" name="start_date" v-model="start_date" class="form-control" placeholder="Enter Date">-->
								<el-date-picker style="width: 100%;" type="datetime" v-model="start_date" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
							<div class="inlined">
								<label for="end-date">End Time:</label>
								<!--<input type="text" name="end_date" v-model="end_date" class="form-control" placeholder="Enter Date">-->
								<el-date-picker style="width: 100%;" type="datetime" v-model="end_date" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
						</div>
						<!--<div class="col-md-2 col-sm-4">
								<label>GMT:</label>
								<select2 :options="options" v-model="gmt">
									<option disabled value="0">Select one</option>
								</select2>
							</div>-->
						<div class="col-md-3 col-sm-4">
							<label>Type:</label>
							<select2 :options="options" v-model="transaction_type">
								<option disabled value="0">Select Type</option>
							</select2>
						</div>
						<div class="clearfix little-space"></div>
						<div class="col-md-3 col-sm-4">
							<label>Time Zone:</label>
							<select class="selectable" v-model="time_zone">
								<option v-for="item in time_zone_options" v-bind:value="item.id">
									{{ item.text }}
								</option>
							</select>
						</div>
						<div class="clearfix little-space"></div>
						<div class="col-md-12">
							<div class="button_set m-top-10">
								<a class="btn btn-primary" style="width: 200px" v-on:click="submit()">
									Submit
								</a>
								<a class="btn btn-default" style="width: 200px">
									Download
								</a>
							</div>
						</div>
						<div class="clearfix"></div>
					</div>
					<div v-if="show" class="table-responsive">
						<table class="table table-striped table-hover carrier_groups centrum">
							<thead>
								<tr>
									<th>Begin Date</th>
									<th>{{this.start_date}}</th>
									<th>Begin Balance</th>
									<th>{{this.balance}}</th>
								</tr>
							</thead>
							<tbody>
	
							</tbody>
						</table>
					</div>
					<div v-if="show" class="clearfix little-space"></div>
					<div v-if="show" class="table-responsive">
						<table class="table table-striped table-hover carrier_groups centrum">
							<thead>
								<tr>
									<th>Date</th>
									<th>Type</th>
									<th>note</th>
									<th>Amount</th>
									<th>Balance</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="transaction in transactions">
									<td>{{transaction.date}}</td>
									<td>{{transaction.transaction_type}}</td>
									<td>{{transaction.note}}</td>
									<td>{{transaction.amount}}</td>
									<td>{{transaction.current_balance}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>   
const vSelect = require('vue!../main_components/select.vue');
const api = require("../../api");
const auth = require("../../auth");

module.exports = {
	components: {
		'select2': vSelect,
	},
	data: function () {
		return {
			time_zone: 13,
			time_zone_options: [
				  { id: 1, text: 'GMT -12:00' },
				  { id: 2, text: 'GMT -11:00' },
				  { id: 3, text: 'GMT -10:00' },
				  { id: 4, text: 'GMT -9:00' },
				  { id: 5, text: 'GMT -8:00' },
				  { id: 6, text: 'GMT -7:00' },
				  { id: 7, text: 'GMT -6:00' },
				  { id: 8, text: 'GMT -5:00' },
				  { id: 9, text: 'GMT -4:00' },
				  { id: 10, text: 'GMT -3:00' },
				  { id: 11, text: 'GMT -2:00' },
				  { id: 12, text: 'GMT -1:00' },
				  { id: 13, text: 'GMT +0:00' },
				  { id: 14, text: 'GMT +1:00' },
				  { id: 15, text: 'GMT +2:00' },
				  { id: 16, text: 'GMT +3:00' },
				  { id: 17, text: 'GMT +4:00' },
				  { id: 18, text: 'GMT +5:00' },
				  { id: 19, text: 'GMT +6:00' },
				  { id: 20, text: 'GMT +7:00' },
				  { id: 21, text: 'GMT +8:00' },
				  { id: 22, text: 'GMT +9:00' },
				  { id: 23, text: 'GMT +10:00' },
				  { id: 24, text: 'GMT +11:00' },
				  { id: 25, text: 'GMT +12:00' },
			  ],
			show: false,
			balance: 0,
			carrier: 0,
			carrier_list: [],
			start_date: '',
			end_date: '',
			// gmt: '',
			transaction_type: 'all',
			options: [
				{ id: 'all', value: 'all', text: 'all' },
				{ id: 'payment received', value: 'payment received', text: 'payment received' },
				{ id: 'payment sent', value: 'payment sent', text: 'payment sent' },
				{ id: 'credit not received', value: 'credit not received', text: 'credit not received' },
				{ id: 'credit not sent', value: 'credit not sent', text: 'credit not sent' },
				{ id: 'debit not received', value: 'debit not received', text: 'debit not received' },
				{ id: 'debit not sent', value: 'debit not sent', text: 'debit not sent' },
				{ id: 'reset', value: 'reset', text: 'reset' },
				{ id: 'egress actual usage', value: 'egress actual usage', text: 'egress actual usage' },
				{ id: 'ingress actual usage', value: 'ingress actual usage', text: 'ingress actual usage' },
			],
			transactions: []
		}
	},
	methods: {
		submit() {
			this.loading = true;
			this.show = true;

			this.$http.get(api.getEndpointUrl() + "/v1/carrier/" + this.carrier + "/transactions/list?transaction_type=" + this.transaction_type + "&date_lt=" + this.start_date + "&date_gt=" + this.end_date + "&order_by=date&order_dir=desc",
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(function (response) {
					this.loading = false;
					//todo: check success flag? validation errors?
					var transactions = response.body.payload.items;
					console.log(transactions);
					this.transactions = transactions;
				}, function (error) {
					this.loading = false;
					console.log(error);
				});

			this.loading = true;
			this.$http.get(api.getEndpointUrl() + "/v1/carrier/" + this.carrier + "/balance",
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(function (response) {
					this.loading = false;
					//todo: check success flag? validation errors?
					var item = response.body.payload;
					this.balance = item.actual_balance;
				}, function (error) {
					this.loading = false;
					console.log(error);
				});

		},
	},
	created: function () {
		this.loading = true;
		this.$http.get(api.getEndpointUrl() + "/v1/carrier/list",
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function (response) {
				var self = this;
				this.loading = false;
				var items = response.body.payload.items;
				items.forEach(function (item, i) {
					var carrier = {};
					carrier.id = item.client_id;
					carrier.value = item.name;
					carrier.text = item.name;
					self.carrier_list.push(carrier);
				});
				console.log("carrier_list");
				console.log(this.carrier_list);
			}, function (error) {
				this.loading = false;
				console.log(error);
			});
	}
}
</script>

<style>

</style>
