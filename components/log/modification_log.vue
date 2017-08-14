<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a>Log</a>
					</li>
					<li class="breadcrumb-item active">Modification Log</li>
				</ol>
				<h1 class="page-header">Modification Log</h1>
				<div class="timeline">
					<div class="chart_select_header grided">
						<!--<div class="col-md-3 col-sm-4">
							<label>Period:</label>
							<select2 :options="options" v-model="period">
								<option disabled value="0">Select one</option>
							</select2>
						</div>-->
						<div class="col-md-12">
							<div class="col-md-3 col-sm-3">
								<label>Period:</label>
								<select2 :options="period_options" v-model="period">
									<option disabled value="0">Select Period</option>
								</select2>
							</div>
							<div class="col-md-3 col-sm-3">
								<label for="submitted_time1" class="m-top-15"></label>
								<!--<input type="text" name="submitted_time1" v-model="submitted_time1" class="form-control" placeholder="Enter Date/Time">-->
								<el-date-picker style="width: 100%;" type="datetime" v-model="submitted_time1" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
							<div class="col-md-3 col-sm-3">
								<label for="submitted_time2" class="m-top-15"></label>
								<!--<input type="text" name="submitted_time2" v-model="submitted_time2" class="form-control" placeholder="Enter Date/Time">-->
								<el-date-picker style="width: 100%;" type="datetime" v-model="submitted_time2" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
							<div class="col-md-2 col-sm-2">
								<label>GMT:</label>
								<select2 :options="time_zone_options" v-model="gmt">
									<option disabled value="0">Select one</option>
								</select2>
							</div>
						</div>
						<div class="clearfix little-space"></div>
						<div class="col-md-3 col-sm-3">
							<label>Operator:</label>
							<select2 :options="options" v-model="operator">
								<option disabled value="0">Select Operator</option>
							</select2>
						</div>
						<div class="col-md-3 col-sm-3">
							<label for="target">Target:</label>
							<input type="text" name="target" v-model="target" class="form-control" placeholder="Enter Target">
						</div>
						<div class="col-md-3 col-sm-3">
							<label>Action:</label>
							<select2 :options="options2" v-model="action">
								<option disabled value="0">Select Action</option>
							</select2>
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
								<select2 :options="options" v-model="selected1" class="inline-block" @pagecount="changePageCount">
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
								<table class="table table-striped table-hover carrier_groups align-center">
									<thead>
										<tr>
											<th v-if="showcolumns[0]">Time</th>
											<th v-if="showcolumns[1]">Module</th>
											<th v-if="showcolumns[2]">Operator</th>
											<th v-if="showcolumns[3]">Target</th>
											<th v-if="showcolumns[4]">Action</th>
											<th v-if="showcolumns[5]" class="width-65">Rollback</th>
										</tr>
									</thead>
									<tbody>
										<tr v-if="!logs.length">
											<td style="text-align: center" colspan="6">No Data Found</td>
										</tr>
										<tr v-for="log in logs">
											<td v-if="showcolumns[0]">{{log.time}}</td>
											<td v-if="showcolumns[1]">{{log.module}}</td>
											<td v-if="showcolumns[2]">{{log.operator}}</td>
											<td v-if="showcolumns[3]">{{log.detail}}</td>
											<td v-if="showcolumns[4]">{{log.type}}</td>
											<td v-if="showcolumns[5]">
												<a class="action action_rollback" data-toggle="tooltip" data-placement="top" title="Rollback" @click="rollback(log.id)">
													<span class="dnl_icon dnl_reply"></span>
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
			gmt: 13,
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
			period: 1,
			period_options: [
				{ id: 1, text: 'Custom' },
				{ id: 2, text: 'Today' },
				{ id: 3, text: 'Current week' },
				{ id: 4, text: 'Current month' },
			],
			apiUrl: '/v1/log/modify',

			showModal: '',
			selected_id: 0,
			
			pageOne: {
				currentPage: 1,
				totalPages: 10,
				cntpage: 10
			},

			submitted_time1: '',
			submitted_time2: '',
			operator: '',
			action: '',
			target: '',

			options: [
				{ id: 'admin', text: 'admin' },
				{ id: 'dnl_support', text: 'dnl_support' },
			],
			options2: [
				{ id: 'All', text: 'All' },
				{ id: 'Creation', text: 'Creation' },
				{ id: 'Deletion', text: 'Deletion' },
				{ id: 'Modification', text: 'Modification' },
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
				value: 'Time',
				label: 'Time'
			}, {
				value: 'Module',
				label: 'Module'
			}, {
				value: 'Operator',
				label: 'Operator'
			}, {
				value: 'Target',
				label: 'Target'
			}, {
				value: 'Action',
				label: 'Action'
			}, {
				value: 'Rollback',
				label: 'Rollback'
			}],
			log_table_columns: ['Time', 'Module', 'Operator',
				'Target', 'Action', 'Rollback'],
			showcolumns: [true, true, true, true, true, true],
		}
	},
	methods: {
		...mapActions({
			setAsyncConfirm: 'async_confirm/setAsyncConfirm',
			setMessage: 'app_message/setAppMessage'
		}),
		rollback(id) {
			console.log("rollback");
		},
		query() {
			console.log("query");
			this.pageOne.currentPage = 1;
			var countperpage = this.pageOne.cntpage;
			var page = this.pageOne.currentPage - 1;
			this.loading = true;
			this.$http.get(api.getEndpointUrl() + this.apiUrl + "?page=" + page + "&per_page=" + countperpage + 
			"&name=" + this.operator + "&type=" + this.action + "&detail=" + this.target + 
			"&time_lt=" + this.submitted_time1 + "&time_gt=" + this.submitted_time2 + 
			"&order_by=id&order_dir=desc",
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
			if (_.indexOf(this.log_table_columns, 'Time') != -1) {
				Vue.set(this.showcolumns, 0, true);
			}
			else {
				Vue.set(this.showcolumns, 0, false);
			}

			if (_.indexOf(this.log_table_columns, 'Module') != -1) {
				Vue.set(this.showcolumns, 1, true);
			}
			else {
				Vue.set(this.showcolumns, 1, false);
			}

			if (_.indexOf(this.log_table_columns, 'Operator') != -1) {
				Vue.set(this.showcolumns, 2, true);
			}
			else {
				Vue.set(this.showcolumns, 2, false);
			}

			if (_.indexOf(this.log_table_columns, 'Target') != -1) {
				Vue.set(this.showcolumns, 3, true);
			}
			else {
				Vue.set(this.showcolumns, 3, false);
			}

			if (_.indexOf(this.log_table_columns, 'Action') != -1) {
				Vue.set(this.showcolumns, 4, true);
			}
			else {
				Vue.set(this.showcolumns, 4, false);
			}

			if (_.indexOf(this.log_table_columns, 'Rollback') != -1) {
				Vue.set(this.showcolumns, 5, true);
			}
			else {
				Vue.set(this.showcolumns, 5, false);
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
					message:'The credit log has been not selected!',
					type:'error'
				});
			}
			else{
				vm.loading = true;
				vm.resource = vm.$resource(api.getEndpointUrl() + '/v1/log/modify/'+vm.selected_id);
				vm.resource.delete({id:vm.selected_id}).then(function(response){
					vm.loading = false;
					let index = _.findIndex(this.logs, elem => elem.id  === vm.selected_id)
					this.logs.splice(index, 1)
					this.setMessage('The modification log have been deleted!')
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
table.table.table-striped.leveled th {
	background: #edeff5;
	padding: 5px;
	border: 1px solid #dee0e3;
}

table.table.table-striped.leveled th:first-child {
	border-left: 1px solid #dee0e3;
}

table.table.table-striped.leveled {
	margin: 5px 0;
}

table.table.table-striped.leveled tr td {
	border: 1px solid #dee0e3;
	padding: 5px;
}

table.table.table-striped.table-hover.carrier_groups tr:hover td table.leveled th,
table.table.table-striped.table-hover.carrier_groups tr:hover td table.leveled td {
	color: #222;
}

table.table.table-striped.table-hover.carrier_groups tr:hover td table.leveled tr:hover {
	background: #fff;
}

a.action.action_rollback {
	font-size: 14px;
	padding-top: 6px;
}

.el-select__tags {
	display: none;
}
</style>
