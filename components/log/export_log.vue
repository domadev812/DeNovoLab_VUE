<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a>Log</a>
					</li>
					<li class="breadcrumb-item active">Export Log</li>
				</ol>
				<h1 class="page-header">Export Log</h1>
				<div class="timeline">
					<div class="chart_select_header grided">
						<div class="col-md-3 col-sm-3">
							<label for="search">Search:</label>
							<input type="text" name="search" v-model="search" class="form-control" placeholder="Enter Search">
						</div>
						<div class="col-md-6 col-sm-6">
							<div class="inlined">
								<label for="download_time_1">Download Time:</label>
								<!--<input type="text" name="download_time_1" v-model="download_time_1" class="form-control" placeholder="Enter Download Time">-->
								<el-date-picker style="width: 100%;" type="datetime" v-model="download_time_1" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
							<div class="inlined">
								<label for="download_time_2" class="m-top-15"></label>
								<!--<input type="text" name="download_time_2" v-model="download_time_2" class="form-control" placeholder="Enter Download Time">-->
								<el-date-picker style="width: 100%;" type="datetime" v-model="download_time_2" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
						</div>
						<div class="col-md-3 col-sm-4">
							<label for="refresh">Refresh Every:</label>
							<select2 :options="options2" v-model="refresh" class="inline-block">
							</select2>
						</div>
						<div class="clearfix little-space"></div>
						<div class="col-md-3 col-sm-4">
							<a class="btn btn-primary m-top-10" v-on:click="query()">
								Query
							</a>
						</div>
						<div class="clearfix"></div>
					</div>
					<div class="chart_content">
						<div class="table_filters marged-40">
							<div class="inline-block select_min_wrapper">
								<span class="inline-block">Page row:</span>
									<select2 :options="options1" v-model="selected1" class="inline-block" @pagecount="changePageCount">
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
											<th v-if="showcolumns[0]">ID</th>
											<th v-if="showcolumns[1]">User</th>
											<th v-if="showcolumns[2]">Object</th>
											<th v-if="showcolumns[3]">Status</th>
											<th v-if="showcolumns[4]">Download Time</th>
											<th v-if="showcolumns[5]" class="width-65">File</th>
										</tr>
									</thead>
									<tbody>
										<tr v-if="!filterBy(logs, search).length">
											<td style="text-align: center" colspan="6">No Data Found</td>
										</tr>										
										<tr v-for="(log, index) in filterBy(logs, search)">
											<td v-if="showcolumns[0]">{{log.id}}</td>
											<td v-if="showcolumns[1]">{{log.user_name}}</td>
											<td v-if="showcolumns[2]">{{log.obj}}</td>
											<td v-if="showcolumns[3]">{{log.status}}</td>
											<td v-if="showcolumns[4]">{{log.download_time}}</td>
											<td v-if="showcolumns[5]">
												<a class="action action_menu" data-toggle="tooltip" data-placement="top" title="Download">
													<span class="dnl_icon dnl_download"></span>{{log.file_name}}
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
			apiUrl: '/v1/log/export',

			showModal: '',
			selected_id: 0,

			pageOne: {
				currentPage: 1,
				totalPages: 10,
				cntpage: 10
			},
			search: '',
			download_time_1: '',
			download_time_2: '',
			refresh: '',
			options2: [
				{ id: 1, text: '3 Minutes' },
				{ id: 2, text: '5 Minutes' },
				{ id: 3, text: '15 Minutes' },
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
				value: 'ID',
				label: 'ID'
			}, {
				value: 'User',
				label: 'User'
			}, {
				value: 'Object',
				label: 'Object'
			}, {
				value: 'Status',
				label: 'Status'
			}, {
				value: 'Download Time',
				label: 'Download Time'
			}, {
				value: 'File',
				label: 'File'
			}],
			log_table_columns: ['ID', 'User', 'Object',
				'Status', 'Download Time', 'File'],
			showcolumns: [true, true, true, true, true, true],			
		}
	},
	methods: {
		...mapActions({
			setAsyncConfirm: 'async_confirm/setAsyncConfirm',
			setMessage: 'app_message/setAppMessage'
		}),		
		handleChange() {
			if (_.indexOf(this.log_table_columns, 'ID') != -1) {
				Vue.set(this.showcolumns, 0, true);
			}
			else {
				Vue.set(this.showcolumns, 0, false);
			}

			if (_.indexOf(this.log_table_columns, 'User') != -1) {
				Vue.set(this.showcolumns, 1, true);
			}
			else {
				Vue.set(this.showcolumns, 1, false);
			}

			if (_.indexOf(this.log_table_columns, 'Object') != -1) {
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

			if (_.indexOf(this.log_table_columns, 'Download Time') != -1) {
				Vue.set(this.showcolumns, 4, true);
			}
			else {
				Vue.set(this.showcolumns, 4, false);
			}

			if (_.indexOf(this.log_table_columns, 'File') != -1) {
				Vue.set(this.showcolumns, 5, true);
			}
			else {
				Vue.set(this.showcolumns, 5, false);
			}

			console.log(this.showcolumns);
		},	
		query() {
			console.log("query");
			this.pageOne.currentPage = 1;
			var countperpage = this.pageOne.cntpage;
			var page = this.pageOne.currentPage - 1;
			this.loading = true;
			this.$http.get(api.getEndpointUrl() + this.apiUrl + "?page=" + page + "&per_page=" + countperpage + 
			"&download_time_lt=" + this.download_time_1 + "&download_time_gt=" + this.download_time_2 + "&order_by=id&order_dir=desc",
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
		closeModal: function () {
			this.showModal = '';
		},
		delete_log: function (id) {
			this.showModal = true;
			this.selected_id = id;
		},
		submit: function () {
			var vm = this;
			this.showModal = false;

			if (this.selected_id == 0) {
				vm.setMessage({
					message:'The export log has been not selected!',
					type: 'error'
				});
			}
			else {
				vm.loading = true;
				vm.resource = vm.$resource(api.getEndpointUrl() + '/v1/log/export/' + vm.selected_id);
				vm.resource.delete({ id: vm.selected_id }).then(function (response) {
					vm.loading = false;
					let index = _.findIndex(vm.logs, elem => elem.id  === vm.selected_id)
					vm.logs.splice(index, 1)
					vm.setMessage('The export log have been deleted!')
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
		this.fetchLogs();
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
