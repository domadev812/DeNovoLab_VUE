<template>
	<div class="container-fluid">
		<modal v-if="showModal=='view_all'" @close="showModal = ''" class="big_modal">
			<h3 slot="header">Details</h3>
			<div slot="body">
				<div class="">
					<div class="table-responsive marged-30">
						<table class="table table-striped table-hover carrier_groups aligned-center">
							<thead>
								<tr>
									<!--<th></th>-->
									<th>Created At</th>
									<th>File Name</th>
									<th>FTP IP</th>
									<th>FTP Directory</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<!--<td></td>-->
									<td>{{this.item.cdr_start_time}}</td>
									<td>{{this.item.result.local_file_path}}</td>
									<td>{{this.item.ftp_ip}}</td>
									<td>{{this.item.ftp_dir}}</td>
									<td></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div slot="footer">
				<button @click="closeModal" class="btn btn-default mini cancel centered">Cancel</button>
			</div>
		</modal>
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a>Log</a>
					</li>
					<li class="breadcrumb-item active">FTP Log</li>
				</ol>
				<h1 class="page-header">FTP Log</h1>
				<div class="timeline">
					<!-- <div class="chart_select_header grided">
						<div class="col-md-3 col-sm-4">
							<label>Task:</label>
							<input type="text" name="task" v-model="task" class="form-control" placeholder="Enter Task Name">
						</div>
						<div class="col-md-6 col-sm-6">
							<div class="inlined">
								<label for="ftp_start_time">Start Date:</label>
								<el-date-picker style="width: 100%;" type="datetime" v-model="ftp_start_time" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
							<div class="inlined">
								<label for="ftp_end_time">End Date:</label>
								<el-date-picker style="width: 100%;" type="datetime" v-model="ftp_end_time" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
						</div>
						<div class="col-md-3 col-sm-4">
							<a class="btn btn-primary m-top-25" v-on:click="query()">
								Query
							</a>
						</div>
						<div class="clearfix"></div>
					</div> -->
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
											<!-- <th v-if="showcolumns[0]">Task Name</th> -->
											<th v-if="showcolumns[0]">FTP Start Time</th>
											<th v-if="showcolumns[1]">FTP End Time</th>
											<th v-if="showcolumns[2]">Contains Data Start</th>
											<th v-if="showcolumns[3]">Contains Data End</th>
											<th v-if="showcolumns[4]">Status</th>
											<th v-if="showcolumns[5]" class="width_138">Action</th>
										</tr>
									</thead>
									<tbody>
										<tr v-if="!logs.length">
											<td style="text-align: center" colspan="6">No Data Found</td>
										</tr>										
										<tr v-for="log in logs">
											<!-- <td v-if="showcolumns[0]">{{log.client_alias}}</td> -->
											<td v-if="showcolumns[0]">{{log.ftp_start_time}}</td>
											<td v-if="showcolumns[1]">{{log.ftp_end_time}}</td>
											<td v-if="showcolumns[2]">{{log.cdr_start_time}}</td>
											<td v-if="showcolumns[3]">{{log.cdr_end_time}}</td>
											<td v-if="showcolumns[4]">{{log.status}}</td>
											<td v-if="showcolumns[5]">
												<a class="action action_menu" data-toggle="tooltip" data-placement="top" title="Download All">
													<span class="dnl_icon dnl_download"></span>
												</a>
												<a class="action action_trigger" data-toggle="tooltip" data-placement="top" title="Redo">
													<span class="dnl_icon dnl_trigger"></span>
												</a>
												<a class="action view" data-toggle="tooltip" data-placement="top" title="View All" @click="viewall(log)">
													<span class="dnl_icon dnl_eye"></span>
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
		'pagination': Pagination,
		'confirm': confirmmodal,
		'modal': modal
	},
	data: function () {
		return {
			apiUrl: '/v1/log/ftp',

			pageOne: {
				currentPage: 1,
				totalPages: 10,
				cntpage: 10
			},
			task: '',
			ftp_start_time: '',
			ftp_end_time: '',
			options1: [
				{ id: 1, text: '10' },
				{ id: 2, text: '20' },
				{ id: 3, text: '30' },
				{ id: 4, text: '50' },
				{ id: 5, text: '100' }
			],
			selected1: 1,
			// selected2: 1,
			showModal: '',
			selected_id: 0,
			logs: [],
			item: {},
			log_table_column_options: [
			// {
			// 	value: 'Task Name',
			// 	label: 'Task Name'
			// }, 
			{
				value: 'FTP Start Time',
				label: 'FTP Start Time'
			}, {
				value: 'FTP End Time',
				label: 'FTP End Time'
			}, {
				value: 'Contains Data Start',
				label: 'Contains Data Start'
			}, {
				value: 'Contains Data End',
				label: 'Contains Data End'
			}, {
				value: 'Status',
				label: 'Status'
			}, {
				value: 'Action',
				label: 'Action'
			}],
			log_table_columns: ['FTP Start Time', 'FTP End Time',
				'Contains Data Start', 'Contains Data End', 'Status', 'Action'],
			showcolumns: [true, true, true, true, true, true],			
		}
	},
	methods: {
		...mapActions({
			setAsyncConfirm: 'async_confirm/setAsyncConfirm',
			setMessage: 'app_message/setAppMessage'
		}),
		handleChange() {
			if (_.indexOf(this.log_table_columns, 'FTP Start Time') != -1) {
				Vue.set(this.showcolumns, 0, true);
			}
			else {
				Vue.set(this.showcolumns, 0, false);
			}

			if (_.indexOf(this.log_table_columns, 'FTP End Time') != -1) {
				Vue.set(this.showcolumns, 1, true);
			}
			else {
				Vue.set(this.showcolumns, 1, false);
			}

			if (_.indexOf(this.log_table_columns, 'Contains Data Start') != -1) {
				Vue.set(this.showcolumns, 2, true);
			}
			else {
				Vue.set(this.showcolumns, 2, false);
			}

			if (_.indexOf(this.log_table_columns, 'Contains Data End') != -1) {
				Vue.set(this.showcolumns, 3, true);
			}
			else {
				Vue.set(this.showcolumns, 3, false);
			}

			if (_.indexOf(this.log_table_columns, 'Status') != -1) {
				Vue.set(this.showcolumns, 4, true);
			}
			else {
				Vue.set(this.showcolumns, 4, false);
			}

			if (_.indexOf(this.log_table_columns, 'Action') != -1) {
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
			"&task=" + this.task + "&ftp_start_time=" + this.ftp_start_time + "&ftp_end_time=" + this.ftp_end_time + "&order_by=id&order_dir=desc",
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
		viewall: function (item) {
			this.item = item;
			this.showModal = 'view_all';
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
					message:'The ftp log has been not selected!',
					type:'error'
				});
			}
			else {
				vm.loading = true;
				vm.resource = vm.$resource(api.getEndpointUrl() + '/v1/log/ftp/' + vm.selected_id);
				vm.resource.delete({ id: vm.selected_id }).then(function (response) {
					vm.loading = false;
					let index = _.findIndex(vm.logs, elem => elem.id  === vm.selected_id)
					vm.logs.splice(index, 1)
					vm.setMessage('FTP log was removed successfully')
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
a.action.view {
	font-size: 16px;
	padding-top: 4px;
}

.el-select__tags {
	display: none;
}

</style>
