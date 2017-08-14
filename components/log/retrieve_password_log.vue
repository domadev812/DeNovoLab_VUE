<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a>Log</a>
					</li>
					<li class="breadcrumb-item active">Retrieve Password Log</li>
				</ol>
				<h1 class="page-header">Retrieve Password Log</h1>
				<div class="timeline">
					<div class="chart_select_header grided">
						<div class="col-md-3 col-sm-3">
							<label>Status:</label>
							<select2 :options="options" v-model="status">
								<option disabled value="0">Select Status</option>
							</select2>
						</div>
						<div class="col-md-6 col-sm-6">
							<div class="inlined">
								<label for="start_date">Start Date:</label>
								<!--<input type="text" name="start_date" v-model="start_date" class="form-control" placeholder="Enter Date">-->
								<el-date-picker style="width: 100%;" type="datetime" v-model="start_date" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
							<div class="inlined">
								<label for="end-date">End Date:</label>
								<!--<input type="text" name="end_date" v-model="end_date" class="form-control" placeholder="Enter Date">-->
								<el-date-picker style="width: 100%;" type="datetime" v-model="end_date" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
						</div>
						<div class="col-md-3 col-sm-3">
							<a class="btn btn-primary m-top-25" v-on:click="query()">
								Query
							</a>
						</div>
						<div class="clearfix"></div>
					</div>
					<div class="chart_content">
						<div class="table_filters marged-40">
							<div class="inline-block select_min_wrapper">
								<span class="inline-block">Page row:</span>
								<select2 :options="options1" v-model="selected1" class="inline-block">
								</select2>
							</div>
							<div class="inline-block">
								<!--<select2 :options="options" v-model="selected2">
									<option disabled value="0">Show/Hide Columns</option>
								</select2>-->
								<el-select v-model="log_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
									<el-option v-for="item in log_table_column_options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</div>
						</div>
						<div class="col-md-12">
							<div class="table-responsive marged-30">
								<table class="table table-striped table-hover carrier_groups aligned-center">
									<thead>
										<tr>
											<th v-if="showcolumns[0]">Operation Time</th>
											<th v-if="showcolumns[1]">Username
												<span class="dnl_icon dnl_sort pull-right"></span>
											</th>
											<th v-if="showcolumns[2]">E-mail Address</th>
											<th v-if="showcolumns[3]">Status</th>
											<th v-if="showcolumns[4]">Modify Time</th>
										</tr>
									</thead>
									<tbody>
										<tr v-if="!logs.length">
											<td style="text-align: center" colspan="5">No Data Found</td>
										</tr>
										<tr v-for="log in logs">
											<td v-if="showcolumns[0]">{{log.operation_time}}</td>
											<td v-if="showcolumns[1]">{{log.username}}</td>
											<td v-if="showcolumns[2]">{{log.email_addresses}}</td>
											<td v-if="showcolumns[3]">{{log.status}}</td>
											<td v-if="showcolumns[4]">{{log.modify_time}}</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="pull-right pagination m-r-30">
								<pagination :current-page="pageOne.currentPage" :total-pages="pageOne.totalPages" @page-changed="pageOneChanged">
								</pagination>
							</div>
						</div>
					</div>
					<div class="clearfix"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>   
const vSelect = require('vue!../main_components/select.vue'),
	Pagination = require('vue!../main_components/pagination.vue'),
	modal = require('vue!../main_components/modal.vue'),
	confirmmodal = require('vue!../main_components/confirm_delete.vue');
const api = require("../../api");
const auth = require("../../auth");
_ = require('lodash');
module.exports = {
	components: {
		'select2': vSelect,
		'confirm': confirmmodal,
		'modal': modal,
		'pagination': Pagination
	},
	data: function () {
		return {
			apiUrl: '/v1/log/retrieve_password',

			pageOne: {
				currentPage: 1,
				totalPages: 10,
				cntpage: 10
			},

			status: '',
			start_date: '',
			end_date: '',
			options: [
				{ id: 'all', value: 'all', text: 'all' },
				{ id: 'modify failure', value: 'modify failure', text: 'modify failure' },
				{ id: 'e-mail has been sent', value: 'e-mail has been sent', text: 'e-mail has been sent' },
				{ id: 'modified successfully', value: 'modified successfully', text: 'modified successfully' },
			],
			options1: [
				{ id: 1, text: '10' },
				{ id: 2, text: '20' },
				{ id: 3, text: '30' },
				{ id: 4, text: '50' },
				{ id: 5, text: '100' }
			],
			selected1: 1,
			// selected2: 1,
			logs: [],
			log_table_column_options: [{
				value: 'Operation Time',
				label: 'Operation Time'
			}, {
				value: 'Username',
				label: 'Username'
			}, {
				value: 'E-mail Address',
				label: 'E-mail Address'
			}, {
				value: 'Status',
				label: 'Status'
			}, {
				value: 'Modify Time',
				label: 'Modify Time'
			}],
			log_table_columns: ['Operation Time', 'Username', 'E-mail Address',
				'Status', 'Modify Time'],
			showcolumns: [true, true, true, true, true],
		}
	},
	methods: {
		query() {
			console.log("query");
			this.pageOne.currentPage = 1;
			var countperpage = this.pageOne.cntpage;
			var page = this.pageOne.currentPage - 1;
			this.loading = true;
			this.$http.get(api.getEndpointUrl() + this.apiUrl + "?page=" + page + "&per_page=" + countperpage + 
			"&status=" + this.status + "&modify_time_lt=" + this.start_date + "&modify_time_gt=" + this.end_date + "&order_by=id&order_dir=desc",
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(function (response) {
					this.loading = false;
					//todo: check success flag? validation errors?
					var logs = response.body.payload.items;
					console.log(logs);
					this.logs = logs;
					var total_page = response.body.payload.total;
					this.pageOne.currentPage = response.body.payload.page + 1;
					this.pageOne.totalPages = Math.ceil(response.body.payload.total / countperpage);
					console.log("total pages => " + this.pageOne.totalPages);
				}, function (error) {
					this.loading = false;
					console.log(error);
				});
		},			
		handleChange() {
			if (_.indexOf(this.log_table_columns, 'Operation Time') != -1) {
				Vue.set(this.showcolumns, 0, true);
			}
			else {
				Vue.set(this.showcolumns, 0, false);
			}

			if (_.indexOf(this.log_table_columns, 'Username') != -1) {
				Vue.set(this.showcolumns, 1, true);
			}
			else {
				Vue.set(this.showcolumns, 1, false);
			}

			if (_.indexOf(this.log_table_columns, 'E-mail Address') != -1) {
				Vue.set(this.showcolumns, 2, true);
			}
			else {
				Vue.set(this.showcolumns, 2, false);
			}

			if (_.indexOf(this.log_table_columns, 'Status') != -1) {
				Vue.set(this.showcolumns, 3, true);
			}
			else {
				Vue.set(this.showcolumns, 3, false);
			}

			if (_.indexOf(this.log_table_columns, 'Modify Time') != -1) {
				Vue.set(this.showcolumns, 4, true);
			}
			else {
				Vue.set(this.showcolumns, 4, false);
			}

			console.log(this.showcolumns);
		},		
		pageOneChanged(pageNum) {
			this.pageOne.currentPage = pageNum;
			var countperpage = this.pageOne.cntpage;
			var page = this.pageOne.currentPage - 1;
			this.loading = true;
			this.$http.get(api.getEndpointUrl() + this.apiUrl + "?page=" + page + "&per_page=" + countperpage + "&order_by=id&order_dir=desc",
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(function (response) {
					this.loading = false;
					//todo: check success flag? validation errors?
					var logs = response.body.payload.items;
					console.log(logs);
					this.logs = logs;
					var total_page = response.body.payload.total;
					this.pageOne.currentPage = response.body.payload.page + 1;
					this.pageOne.totalPages = Math.ceil(response.body.payload.total / countperpage);
					console.log("total pages => " + this.pageOne.totalPages);
				}, function (error) {
					this.loading = false;
					console.log(error);
				});
		},
	},
	mounted: function () {
		$('[data-toggle="tooltip"]').tooltip();
	},
	updated: function () {
		document.querySelector('.el-select > .el-input > input').placeholder = 'Show/Hide Columns';
	},
	created: function () {
		this.loading = true;
		var page = this.pageOne.currentPage - 1;
		var per_page = this.pageOne.cntpage;
		console.log("page => " + page + " , per_page => " + per_page);
		this.loading = true;

		this.$http.get(api.getEndpointUrl() + this.apiUrl + "?page=" + page + "&per_page=" + per_page + "&order_by=id&order_dir=desc",
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function (response) {
				this.loading = false;
				//todo: check success flag? validation errors?
				var logs = response.body.payload.items;
				console.log(logs);
				this.logs = logs;
				var total_page = response.body.payload.total;
				this.pageOne.currentPage = response.body.payload.page + 1;
				this.pageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
				console.log("total pages => " + this.pageOne.totalPages);
			}, function (error) {
				this.loading = false;
				console.log(error);
			});
	}
}
</script>

<style>
.el-select__tags {
	display: none;
}
</style>
