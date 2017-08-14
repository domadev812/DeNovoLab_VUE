<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a>Log</a>
					</li>
					<li class="breadcrumb-item active">Import Log</li>
				</ol>
				<h1 class="page-header">Import Log</h1>
				<div class="timeline">
					<div class="chart_select_header grided">
						<div class="col-md-3 col-sm-4">
							<label for="search">Search:</label>
							<input type="text" name="search" v-model="search" class="form-control" placeholder="Enter Search Query">
						</div>
						<div class="col-md-3 col-sm-4">
							<label for="time">Time:</label>
							<!--<input type="text" name="time" v-model="time" class="form-control" placeholder="Enter Time">-->
							<el-date-picker style="width: 100%;" type="datetime" v-model="time" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
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
								<table class="table table-striped table-hover carrier_groups aligned-center">
									<thead>
										<tr>
											<th v-if="showcolumns[0]" rowspan="2" colspan="1">User</th>
											<th v-if="showcolumns[1]" rowspan="2" colspan="1">Object</th>
											<th v-if="showcolumns[2]" rowspan="2" colspan="1">Status</th>
											<th v-if="showcolumns[3]" rowspan="1" colspan="3">Records</th>
											<th v-if="showcolumns[4]" rowspan="2" colspan="1">Method</th>
											<th v-if="showcolumns[5]" rowspan="2" colspan="1">Upload Time</th>
											<th v-if="showcolumns[6]" rowspan="2" colspan="1">Finished Time</th>
											<th v-if="showcolumns[7]" rowspan="2" colspan="1" class="width-100">File Name</th>
											<th v-if="showcolumns[8]" rowspan="2" colspan="1" class="width-65">Upload File</th>
											<th v-if="showcolumns[9]" rowspan="2" colspan="1" class="width-65">Error File</th>
											<th v-if="showcolumns[10]" rowspan="2" colspan="1" class="width-65">DB Error File</th>
											<th v-if="showcolumns[11]" rowspan="2" colspan="1" class="width-65">Execute Again</th>
											<th v-if="showcolumns[12]" rowspan="2" colspan="1" class="width-65">Action</th>
										</tr>
										<tr>
											<th v-if="showcolumns[3]" rowspan="1" colspan="1">Succ</th>
											<th v-if="showcolumns[3]" rowspan="1" colspan="1">Fail</th>
											<th v-if="showcolumns[3]" rowspan="1" colspan="1">Dup</th>
										</tr>
									</thead>
									<tbody>
										<tr v-if="!filterBy(logs, search).length">
											<td style="text-align: center" colspan="15">No Data Found</td>
										</tr>
										<tr v-for="log in filterBy(logs, search)">
											<td v-if="showcolumns[0]">{{log.name}}</td>
											<td v-if="showcolumns[1]">{{log.object}}</td>
											<td v-if="showcolumns[2]">{{log.status}}</td>
											<td v-if="showcolumns[3]">{{log.succ}}</td>
											<td v-if="showcolumns[3]">{{log.fail}}</td>
											<td v-if="showcolumns[3]">{{log.dup}}</td>
											<td v-if="showcolumns[4]">{{log.method}}</td>
											<td v-if="showcolumns[5]">{{log.upload_time}}</td>
											<td v-if="showcolumns[6]">{{log.finished_time}}</td>
											<td v-if="showcolumns[7]" class="width-100 ellipsis">{{log.file_name}}</td>
											<td v-if="showcolumns[8]">
												<div v-if="log.upload_file">
													<a class="action action_menu" data-toggle="tooltip" data-placement="top" title="Download">
														<span class="dnl_icon dnl_download"></span>
													</a>
												</div>
											</td>
											<td v-if="showcolumns[9]">
												<div v-if="log.error_file">
													<a class="action action_menu" data-toggle="tooltip" data-placement="top" title="Download">
														<span class="dnl_icon dnl_download"></span>
													</a>
												</div>
											</td>
											<td v-if="showcolumns[10]">
												<div v-if="log.db_error_file">
													<a class="action action_menu" data-toggle="tooltip" data-placement="top" title="Download">
														<span class="dnl_icon dnl_download"></span>
													</a>
												</div>
											</td>
											<td v-if="showcolumns[11]">
												<div v-if="log.execute_again">
													<a class="action action_trigger" data-toggle="tooltip" data-placement="top" title="Execute">
														<span class="dnl_icon dnl_trigger"></span>
													</a>
												</div>
											</td>
											<td v-if="showcolumns[12]">
												<div v-if="log.action">
													<a class="action action_reject" data-toggle="tooltip" data-placement="top" title="" title="Kill the Job">
														<span class="dnl_icon dnl_disabled"></span>
													</a>
												</div>
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
			apiUrl: '/v1/log/import',

			showModal: '',
			selected_id: 0,
			
			pageOne: {
				currentPage: 1,
				totalPages: 10,
				cntpage: 10
			},

			search: '',
			time: '',
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
				value: 'User',
				label: 'User'
			}, {
				value: 'Object',
				label: 'Object'
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
				value: 'Upload Time',
				label: 'Upload Time'
			}, {
				value: 'Finished Time',
				label: 'Finished Time'
			}, {
				value: 'File Name',
				label: 'File Name'
			}, {
				value: 'Upload File',
				label: 'Upload File'
			}, {
				value: 'Error File',
				label: 'Error File'
			}, {
				value: 'DB Error File',
				label: 'DB Error File'
			}, {
				value: 'Execute Again',
				label: 'Execute Again'
			}, {
				value: 'Action',
				label: 'Action'
			}],
			log_table_columns: ['User', 'Object', 'Status',
				'Records', 'Method', 'Upload Time', 'Finished Time', 
				'File Name','Upload File', 'Error File', 'DB Error File', 
				'Execute Again', 'Action'],
			showcolumns: [true, true, true, 
				true, true, true, true, true, 
				true, true, true, true, true],
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
			"&upload_time_gt=" + this.time + "&upload_time_lt=" + this.time + "&order_by=id&order_dir=desc",
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
			if (_.indexOf(this.log_table_columns, 'User') != -1) {
				Vue.set(this.showcolumns, 0, true);
			}
			else {
				Vue.set(this.showcolumns, 0, false);
			}

			if (_.indexOf(this.log_table_columns, 'Object') != -1) {
				Vue.set(this.showcolumns, 1, true);
			}
			else {
				Vue.set(this.showcolumns, 1, false);
			}

			if (_.indexOf(this.log_table_columns, 'Status') != -1) {
				Vue.set(this.showcolumns, 2, true);
			}
			else {
				Vue.set(this.showcolumns, 2, false);
			}

			if (_.indexOf(this.log_table_columns, 'Records') != -1) {
				Vue.set(this.showcolumns, 3, true);
			}
			else {
				Vue.set(this.showcolumns, 3, false);
			}

			if (_.indexOf(this.log_table_columns, 'Method') != -1) {
				Vue.set(this.showcolumns, 4, true);
			}
			else {
				Vue.set(this.showcolumns, 4, false);
			}

			if (_.indexOf(this.log_table_columns, 'Upload Time') != -1) {
				Vue.set(this.showcolumns, 5, true);
			}
			else {
				Vue.set(this.showcolumns, 5, false);
			}

			if (_.indexOf(this.log_table_columns, 'Finished Time') != -1) {
				Vue.set(this.showcolumns, 6, true);
			}
			else {
				Vue.set(this.showcolumns, 6, false);
			}

			if (_.indexOf(this.log_table_columns, 'File Name') != -1) {
				Vue.set(this.showcolumns, 7, true);
			}
			else {
				Vue.set(this.showcolumns, 7, false);
			}

			if (_.indexOf(this.log_table_columns, 'Upload File') != -1) {
				Vue.set(this.showcolumns, 8, true);
			}
			else {
				Vue.set(this.showcolumns, 8, false);
			}

			if (_.indexOf(this.log_table_columns, 'Error File') != -1) {
				Vue.set(this.showcolumns, 9, true);
			}
			else {
				Vue.set(this.showcolumns, 9, false);
			}

			if (_.indexOf(this.log_table_columns, 'DB Error File') != -1) {
				Vue.set(this.showcolumns, 10, true);
			}
			else {
				Vue.set(this.showcolumns, 10, false);
			}

			if (_.indexOf(this.log_table_columns, 'Execute Again') != -1) {
				Vue.set(this.showcolumns, 11, true);
			}
			else {
				Vue.set(this.showcolumns, 11, false);
			}

			if (_.indexOf(this.log_table_columns, 'Action') != -1) {
				Vue.set(this.showcolumns, 12, true);
			}
			else {
				Vue.set(this.showcolumns, 12, false);
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

			if(vm.selected_id == 0){
				vm.setMessage({
					message:'The import log has been not selected!',
					type:'error'
				});
			}
			else{
				vm.loading = true;
				vm.resource = vm.$resource(api.getEndpointUrl() + '/v1/log/import/'+vm.selected_id);
				vm.resource.delete({id:vm.selected_id}).then(function(response){
					vm.loading = false;
					let index = _.findIndex(vm.logs, elem => elem.id  === vm.selected_id)
					vm.logs.splice(index, 1)
					vm.setMessage('The import log have been deleted!')
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
.width-100 {
	width: 100px;
	max-width: 100px;
}

td.ellipsis {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.el-select__tags {
	display: none;
}

</style>
