<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a>Log</a>
					</li>
					<li class="breadcrumb-item active">IP Modify Log</li>
				</ol>
				<h1 class="page-header">IP Modify Log</h1>
				<div class="timeline">
					<div class="chart_select_header grided">
						<div class="col-md-6 col-sm-6">
							<div class="inlined">
								<label for="time1">Time:</label>
								<!--<input type="text" name="time1" v-model="time1" class="form-control" placeholder="Enter Time">-->
								<el-date-picker style="width: 100%;" type="datetime" v-model="time1" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
							<div class="inlined">
								<label for="time2" class="m-top-15"></label>
								<!--<input type="text" name="time2" v-model="time2" class="form-control" placeholder="Enter Time">-->
								<el-date-picker style="width: 100%;" type="datetime" v-model="time2" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
						</div>
						<div class="col-md-3 col-sm-4">
							<label>Type:</label>
							<select2 :options="options" v-model="type">
								<option disabled value="0">Select Type</option>
							</select2>
						</div>
						<div class="clearfix little-space"></div>
						<div class="col-md-3 col-sm-4">
							<label>Trunk:</label>
							<select2 :options="trunk_list" v-model="trunk">
								<option disabled value="0">Select Trunk</option>
							</select2>
						</div>
						<div class="col-md-3 col-sm-4">
							<div class="form-group">
								<label for="value">New Value:</label>
								<input type="text" name="value" v-model="value" class="form-control" placeholder="Enter Value">
							</div>
						</div>
						<div class="col-md-3 col-sm-4">
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
								<table class="table table-striped table-hover carrier_groups originators">
									<thead>
										<tr>
											<th v-if="showcolumns[0]">
												Carrier Name
												<span class="dnl_icon dnl_sort pull-right"></span>
											</th>
											<th v-if="showcolumns[1]">Trunk Name</th>
											<th v-if="showcolumns[2]">Trunk Type</th>
											<th v-if="showcolumns[3]">Type</th>
											<th v-if="showcolumns[4]">Old Value</th>
											<th v-if="showcolumns[5]">New Value</th>
											<th v-if="showcolumns[6]">Modified Time</th>
											<th v-if="showcolumns[7]">Modified by</th>
											<th v-if="showcolumns[8]">Send E-mail to</th>
										</tr>
									</thead>
									<tbody>
										<tr v-if="!logs.length">
											<td style="text-align: center" colspan="10">No Data Found</td>
										</tr>
										<tr v-for="log in logs">
											<td v-if="showcolumns[0]">{{log.carrier_name}}</td>
											<td v-if="showcolumns[1]">{{log.trunk_name}}</td>
											<td v-if="showcolumns[2]">{{log.trunk_type}}</td>
											<td v-if="showcolumns[3]">{{log.type}}</td>
											<td v-if="showcolumns[4]">{{log.old}}</td>
											<td v-if="showcolumns[5]">{{log.new}}</td>
											<td v-if="showcolumns[6]">{{log.update_at}}</td>
											<td v-if="showcolumns[7]">{{log.update_by}}</td>
											<td v-if="showcolumns[8]">{{log.send_email_to}}</td>
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
			apiUrl: '/v1/log/ip_modify',

			pageOne: {
				currentPage: 1,
				totalPages: 10,
				cntpage: 10
			},

			time: '',
			time2: '',
			type: '',
			trunk: '',
			trunk_list: [],
			value: '',

			options: [
				{ id: 'all', value: 'all', text: 'all' },
				{ id: 'modification', value: 'modification', text: 'modification' },
				{ id: 'add', value: 'add', text: 'add' },
				{ id: 'dell', value: 'dell', text: 'dell' },
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
				value: 'Carrier Name',
				label: 'Carrier Name'
			}, {
				value: 'Trunk Name',
				label: 'Trunk Name'
			}, {
				value: 'Trunk Type',
				label: 'Trunk Type'
			}, {
				value: 'Type',
				label: 'Type'
			}, {
				value: 'Old Value',
				label: 'Old Value'
			}, {
				value: 'New Value',
				label: 'New Value'
			}, {
				value: 'Modified Time',
				label: 'Modified Time'
			}, {
				value: 'Modified by',
				label: 'Modified by'
			}, {
				value: 'Send E-mail to',
				label: 'Send E-mail to'
			}],
			log_table_columns: ['Carrier Name', 'Trunk Name', 'Trunk Type',
				'Type', 'Old Value', 'New Value', 'Modified Time', 'Modified by', 'Send E-mail to'],
			showcolumns: [true, true, true, true, true, true, true, true, true],
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
			"&new=" + this.value + "&trunk_id=" + this.trunk + "&update_at_lt=" + this.start_date + "&update_at_gt=" + this.end_date + "&order_by=id&order_dir=desc",
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
			if (_.indexOf(this.log_table_columns, 'Carrier Name') != -1) {
				Vue.set(this.showcolumns, 0, true);
			}
			else {
				Vue.set(this.showcolumns, 0, false);
			}

			if (_.indexOf(this.log_table_columns, 'Trunk Name') != -1) {
				Vue.set(this.showcolumns, 1, true);
			}
			else {
				Vue.set(this.showcolumns, 1, false);
			}

			if (_.indexOf(this.log_table_columns, 'Trunk Type') != -1) {
				Vue.set(this.showcolumns, 2, true);
			}
			else {
				Vue.set(this.showcolumns, 2, false);
			}

			if (_.indexOf(this.log_table_columns, 'Type') != -1) {
				Vue.set(this.showcolumns, 3, true);
			}
			else {
				Vue.set(this.showcolumns, 3, false);
			}

			if (_.indexOf(this.log_table_columns, 'Old Value') != -1) {
				Vue.set(this.showcolumns, 4, true);
			}
			else {
				Vue.set(this.showcolumns, 4, false);
			}

			if (_.indexOf(this.log_table_columns, 'New Value') != -1) {
				Vue.set(this.showcolumns, 5, true);
			}
			else {
				Vue.set(this.showcolumns, 5, false);
			}

			if (_.indexOf(this.log_table_columns, 'Modified Time') != -1) {
				Vue.set(this.showcolumns, 6, true);
			}
			else {
				Vue.set(this.showcolumns, 6, false);
			}

			if (_.indexOf(this.log_table_columns, 'Modified by') != -1) {
				Vue.set(this.showcolumns, 7, true);
			}
			else {
				Vue.set(this.showcolumns, 7, false);
			}

			if (_.indexOf(this.log_table_columns, 'Send E-mail to') != -1) {
				Vue.set(this.showcolumns, 8, true);
			}
			else {
				Vue.set(this.showcolumns, 8, false);
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
		this.$http.get(api.getEndpointUrl() + "/v1/trunk/list", 
		{
			headers: {
				"X-Auth-Token": auth.getToken()
			}
		}).then(function(response) {
			var self = this;
			this.loading = false;
			var items = response.body.payload.items;
			items.forEach(function(item, i){
				var trunk = {};
				trunk.id = item.trunk_id;
				trunk.value = item.trunk_name;
				trunk.text = item.trunk_name;
				self.trunk_list.push(trunk);
			});
			console.log("trunk_list");
			console.log(this.trunk_list);
		}, function(error) {
			this.loading = false;
			console.log(error);
		});

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
.pull-right.pagination.m-r-30 {
	margin: -20px 30px 10px 0;
}

@media (max-width: 480px) {
	.pull-right.pagination.m-r-30 {
		display: block;
		margin: 20px auto 0 auto;
		float: none !important;
		width: 178px;
	}
}

.el-select__tags {
	display: none;
}
</style>
