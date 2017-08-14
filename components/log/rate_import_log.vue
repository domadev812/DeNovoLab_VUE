<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a>Log</a>
					</li>
					<li class="breadcrumb-item active">Rate Import Log</li>
				</ol>
				<h1 class="page-header">Rate Import Log</h1>
				<div class="timeline">
					<div class="chart_select_header grided">
						<div class="col-md-3 col-sm-3">
							<label>Rate Table:</label>
							<select2 :options="rate_tables" v-model="rate_table">
								<option disabled value="0">Select Rate Table</option>
							</select2>
						</div>
						<div class="col-md-6 col-sm-6">
							<div class="inlined">
								<label for="time1">Start Time:</label>
								<!--<input type="text" name="time1" v-model="time1" class="form-control" placeholder="Enter Time">-->
								<el-date-picker style="width: 100%;" type="datetime" v-model="time1" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
							<div class="inlined">
								<label for="time2" class="m-top-15"></label>
								<!--<input type="text" name="time2" v-model="time2" class="form-control" placeholder="Enter Time">-->
								<el-date-picker style="width: 100%;" type="datetime" v-model="time1" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
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
								<table class="table table-striped table-hover carrier_groups originators">
									<thead>
										<tr>
											<th v-if="showcolumns[0]" rowspan="2" colspan="1">Rate Table</th>
											<th v-if="showcolumns[1]" rowspan="2" colspan="1">File Name</th>
											<th v-if="showcolumns[2]" rowspan="2" colspan="1">User</th>
											<th v-if="showcolumns[3]" rowspan="2" colspan="1">Status</th>
											<th v-if="showcolumns[4]" colspan="4" rowspan="1">Records</th>
											<th v-if="showcolumns[5]" rowspan="2" colspan="1">Method</th>
											<th v-if="showcolumns[6]" rowspan="2" colspan="1">Start Time</th>
											<th v-if="showcolumns[7]" rowspan="2" colspan="1">Finish Time</th>
											<th v-if="showcolumns[8]" rowspan="2" colspan="1">Upload Time</th>
											<th v-if="showcolumns[9]" rowspan="2" colspan="1" class="width-170">Action</th>
										</tr>
										<tr>
											<th v-if="showcolumns[4]" rowspan="1" colspan="1">Delete</th>
											<th v-if="showcolumns[4]" rowspan="1" colspan="1">Update</th>
											<th v-if="showcolumns[4]" rowspan="1" colspan="1">Insert</th>
											<th v-if="showcolumns[4]" rowspan="1" colspan="1">Error</th>
										</tr>
									</thead>
									<tbody>
										<tr v-if="!logs.length">
											<td style="text-align: center" colspan="13">No Data Found</td>
										</tr>
										<tr v-for="log in logs">
											<td v-if="showcolumns[0]">{{log.rate_table_name}}</td>
											<td v-if="showcolumns[1]">{{log.upload_orig_file}}</td>
											<td v-if="showcolumns[2]">{{log.operator_user}}</td>
											<td v-if="showcolumns[3]">{{log.status}}</td>
											<td v-if="showcolumns[4]">{{log.delete}}</td>
											<td v-if="showcolumns[4]">{{log.update}}</td>
											<td v-if="showcolumns[4]">{{log.insert}}</td>
											<td v-if="showcolumns[4]">{{log.error}}</td>
											<td v-if="showcolumns[5]">{{log.method}}</td>
											<td v-if="showcolumns[6]">{{log.start_date_time}}</td>
											<td v-if="showcolumns[7]">{{log.end_date_time}}</td>
											<td v-if="showcolumns[8]">{{log.upload_date_time}}</td>
											<td v-if="showcolumns[9]">
												<a class="action action_info" data-toggle="tooltip" data-placement="top" title="Default Value">
													<span class="dnl_icon dnl_info"></span>
												</a>
												<a data-toggle="tooltip" data-placement="top" title="Upload File" class="action action_menu">
													<span class="dnl_icon dnl_download"></span>
												</a>
												<a data-toggle="tooltip" data-placement="top" title="Error File" class="action action_menu">
													<span class="dnl_icon dnl_download"></span>
												</a>
												<a class="action action_reset" data-toggle="tooltip" data-placement="top" title="Re-Upload">
													<span class="dnl_icon dnl_refresh"></span>
												</a>
												<a data-toggle="tooltip" data-placement="top" title="Cancel" class="action action_reject">
													<span class="dnl_icon dnl_disabled"></span>
												</a>
											</td>
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
import {mapGetters,	mapActions} from 'vuex'

module.exports = {
	components: {
		'select2': vSelect,
		'confirm': confirmmodal,
		'modal': modal,
		'pagination': Pagination
	},
	data: function () {
		return {
			apiUrl: '/v1/log/rate_upload',
			showModal: '',
			selected_id: 0,
			
			pageOne: {
				currentPage: 1,
				totalPages: 10,
				cntpage: 10
			},
			rate_table: '',
			rate_tables: [],
			time1: '',
			time2: '',
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
				value: 'Rate Table',
				label: 'Rate Table'
			}, {
				value: 'File Name',
				label: 'File Name'
			}, {
				value: 'User',
				label: 'User'
			}, {
				value: 'Status',
				label: 'Status'
			}, {
				value: 'Records',
				label: 'Records'
			}, {
				value: 'Method',
				label: 'Method'
			}, {
				value: 'Start Time',
				label: 'Start Time'
			}, {
				value: 'Finish Time',
				label: 'Finish Time'
			}, {
				value: 'Upload Time',
				label: 'Upload Time'
			}, {
				value: 'Action',
				label: 'Action'
			}],
			log_table_columns: ['Rate Table', 'File Name', 'User',
				'Status', 'Records', 'Method', 'Start Time', 'Finish Time', 'Upload Time', 'Action'],
			showcolumns: [true, true, true, true, true, true, true, true, true, true],
		}
	},
	methods: {
		...mapActions({
			setAsyncConfirm: 'async_confirm/setAsyncConfirm',
			setMessage: 'app_message/setAppMessage'
		}),
		query() {
			console.log("query");
			this.pageOne.currentPage = 1;
			var countperpage = this.pageOne.cntpage;
			var page = this.pageOne.currentPage - 1;
			this.loading = true;
			this.$http.get(api.getEndpointUrl() + this.apiUrl + "?page=" + page + "&per_page=" + countperpage + 
			"&rate_table_id=" + this.rate_table + "&start_time_lt=" + this.time1 + "&start_time_gt=" + this.time2 + "&order_by=id&order_dir=desc",
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
			if (_.indexOf(this.log_table_columns, 'Rate Table') != -1) {
				Vue.set(this.showcolumns, 0, true);
			}
			else {
				Vue.set(this.showcolumns, 0, false);
			}

			if (_.indexOf(this.log_table_columns, 'File Name') != -1) {
				Vue.set(this.showcolumns, 1, true);
			}
			else {
				Vue.set(this.showcolumns, 1, false);
			}

			if (_.indexOf(this.log_table_columns, 'User') != -1) {
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

			if (_.indexOf(this.log_table_columns, 'Records') != -1) {
				Vue.set(this.showcolumns, 4, true);
			}
			else {
				Vue.set(this.showcolumns, 4, false);
			}

			if (_.indexOf(this.log_table_columns, 'Method') != -1) {
				Vue.set(this.showcolumns, 5, true);
			}
			else {
				Vue.set(this.showcolumns, 5, false);
			}

			if (_.indexOf(this.log_table_columns, 'Start Time') != -1) {
				Vue.set(this.showcolumns, 6, true);
			}
			else {
				Vue.set(this.showcolumns, 6, false);
			}

			if (_.indexOf(this.log_table_columns, 'Finish Time') != -1) {
				Vue.set(this.showcolumns, 7, true);
			}
			else {
				Vue.set(this.showcolumns, 7, false);
			}

			if (_.indexOf(this.log_table_columns, 'Upload Time') != -1) {
				Vue.set(this.showcolumns, 8, true);
			}
			else {
				Vue.set(this.showcolumns, 8, false);
			}

			if (_.indexOf(this.log_table_columns, 'Action') != -1) {
				Vue.set(this.showcolumns, 9, true);
			}
			else {
				Vue.set(this.showcolumns, 9, false);
			}

			console.log(this.showcolumns);
		},	
		fetchLogs() {
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
		},
		pageOneChanged(pageNum) {
			if (pageNum !== this.pageOne.currentPage) {
				this.pageOne.currentPage = pageNum
				this.$nextTick(this.fetchLogs)
			}
		},
		changePageCount (countPerPage) {
			if (countPerPage !== this.pageOne.cntpage) {
				this.pageOne.cntpage = countPerPage
				this.$nextTick(this.fetchLogs)
			}
		},
		closeModal: function() {
			this.showModal = '';
		},
		delete_log: function(id){
			this.showModal = true;
			this.selected_id = id;
		},
		submit: function()
		{
			var vm = this;
			this.showModal = false;

			if(this.selected_id == 0){
				vm.setMessage({
					message: 'The rate table upload log has been not selected!',
					type: 'error'
				});
			}
			else{
				vm.loading = true;
				vm.resource = vm.$resource(api.getEndpointUrl() + '/v1/log/rate_upload/'+vm.selected_id);
				vm.resource.delete({id:vm.selected_id}).then(function(response){
					vm.loading = false;
					let index = _.findIndex(vm.logs, elem => elem.id  === vm.selected_id)
					vm.logs.splice(index, 1)
					vm.setMessage('The rate table upload log have been deleted!')
				});
			}
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
		this.$http.get(api.getEndpointUrl() + "/v1/switch/rate_table/list", 
		{
			headers: {
				"X-Auth-Token": auth.getToken()
			}
		}).then(function(response) {
			var self = this;
			this.loading = false;
			var items = response.body.payload.items;
			items.forEach(function(item, i){
				var rate_table = {};
				rate_table.id = item.rate_table_id;
				rate_table.value = item.name;
				rate_table.text = item.name;
				self.rate_tables.push(rate_table);
			});
			console.log(this.rate_tables);
		}, function(error) {
			this.loading = false;
			console.log(error);
		});

		this.fetchLogs();
	}
}
</script>


<style>
@media (max-width: 979px) {
	a.btn.btn-primary.m-top-25 {
		width: 100%;
	}
}

a.action.action_info {
	font-size: 18px;
	vertical-align: top;
}

.width-170 {
	width: 170px;
}

.el-select__tags {
	display: none;
}

</style>
