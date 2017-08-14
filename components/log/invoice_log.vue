<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a>Log</a>
					</li>
					<li class="breadcrumb-item active">Invoice Log</li>
				</ol>
				<h1 class="page-header">Invoice Log</h1>
				<div class="timeline">
					<div class="chart_select_header grided">
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
							<a class="btn btn-primary mini pull-right" v-on:click="refresh()">
								<span class="dnl_icon dnl_refresh"></span> Refresh
							</a>
						</div>
						<div class="col-md-12">
							<div class="table-responsive marged-30">
								<table class="table table-striped table-hover carrier_groups aligned-center">
									<thead>
										<tr>
											<th></th>
											<th v-if="showcolumns[0]">Invoice Request ID</th>
											<th v-if="showcolumns[1]">Start Time</th>
											<th v-if="showcolumns[2]">End Time</th>
											<th v-if="showcolumns[3]">Status</th>
											<!--<th v-if="showcolumns[4]">Progress</th>-->
											<th v-if="showcolumns[4]" class="width-65">Action</th>
										</tr>
									</thead>
									<tbody v-if="!logs.length">
										<tr>
											<td style="text-align: center" colspan="5">No Data Found</td>
										</tr>										
									</tbody>
									<tbody v-for="log in logs">
										<tr>
											<td>
												<a class="toogler" @click="toggleTable($event)">+</a>
											</td>
											<td v-if="showcolumns[0]">{{log.id}}</td>
											<td v-if="showcolumns[1]">{{log.start_time}}</td>
											<td v-if="showcolumns[2]">{{log.end_time}}</td>
											<td v-if="showcolumns[3]">{{log.status}}</td>
											<!--<td v-if="showcolumns[4]">{{log.progress}}</td>-->
											<td v-if="showcolumns[4]">
												<a class="action action_send" data-toggle="tooltip" title="Send">
													<span class="dnl_icon dnl_support"></span>
												</a>
											</td>
										</tr>
										<tr class="accordian-body collapse">
											<td colspan="7">
												<table class="table table-striped leveled aligned-center">
													<tr>
														<th>Carrier</th>
														<th>Amount</th>
														<!--<th>Invoice Period</th>-->
														<th>Invoice Due Date</th>
														<!--<th>Status</th>-->
														<!-- <th class="width-65">Action</th> -->
													</tr>
													<!--<tr v-for="carrier in log.carriers">-->
													<tr>
														<td>{{log.client_name}}</td>
														<td>{{log.amount}}</td>
														<!--<td>{{carrier.invoice_period}}</td>-->
														<td>{{log.invoice_due_date}}</td>
														<!--<td>{{carrier.status}}</td>-->
														<!-- <td>
															<a class="action action_send" data-toggle="tooltip" data-placement="top" title="Send">
																<span class="dnl_icon dnl_support"></span>
															</a>
														</td> -->
													</tr>
												</table>
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
			apiUrl: '/v1/log/invoice',

			showModal: '',
			selected_id: 0,
			
			time: '',
			pageOne: {
				currentPage: 1,
				totalPages: 10,
				cntpage: 10
			},

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
				value: 'Invoice Request ID',
				label: 'Invoice Request ID'
			}, {
				value: 'Start Time',
				label: 'Start Time'
			}, {
				value: 'End Time',
				label: 'End Time'
			}, {
				value: 'Status',
				label: 'Status'
			}, {
				value: 'Action',
				label: 'Action'
			}],
			log_table_columns: ['Invoice Request ID', 'Start Time', 'End Time',
				'Status', 'Action'],
			showcolumns: [true, true, true, true, true],
		}
	},
	methods: {
		...mapActions({
			setAsyncConfirm: 'async_confirm/setAsyncConfirm',
			setMessage: 'app_message/setAppMessage'
		}),		
		refresh() {
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
		query() {
			console.log("query");
			this.pageOne.currentPage = 1;
			var countperpage = this.pageOne.cntpage;
			var page = this.pageOne.currentPage - 1;
			this.loading = true;
			this.$http.get(api.getEndpointUrl() + this.apiUrl + "?page=" + page + "&per_page=" + countperpage + 
			"&start_time_lt=" + this.time + "&order_by=id&order_dir=desc",
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
		toggleTable(event) {
			var element = event.currentTarget;
			$(element).parents('tr').siblings('.collapse').toggleClass('in');
		},
		handleChange() {
			if (_.indexOf(this.log_table_columns, 'Invoice Request ID') != -1) {
				Vue.set(this.showcolumns, 0, true);
			}
			else {
				Vue.set(this.showcolumns, 0, false);
			}

			if (_.indexOf(this.log_table_columns, 'Start Time') != -1) {
				Vue.set(this.showcolumns, 1, true);
			}
			else {
				Vue.set(this.showcolumns, 1, false);
			}

			if (_.indexOf(this.log_table_columns, 'End Time') != -1) {
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

			if (_.indexOf(this.log_table_columns, 'Action') != -1) {
				Vue.set(this.showcolumns, 4, true);
			}
			else {
				Vue.set(this.showcolumns, 4, false);
			}

			console.log(this.showcolumns);
		},		
		pageOneChanged(pageNum) {
			if (pageNum !== this.pageOne.currentPage) {
				this.pageOne.currentPage = pageNum
				this.$nextTick(this.refresh)
			}
		},
		changePageCount (countPerPage) {
			if (countPerPage !== this.pageOne.cntpage) {
				this.pageOne.cntpage = countPerPage
				this.$nextTick(this.refresh)
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
					message: 'The invoice log has been not selected!',
					type: 'error'
				});
			}
			else{
				vm.loading = true;
				vm.resource = vm.$resource(api.getEndpointUrl() + '/v1/log/invoice/'+vm.selected_id);
				vm.resource.delete({id:vm.selected_id}).then(function(response){
					vm.loading = false;
					let index = _.findIndex(vm.logs, elem => elem.id  === vm.selected_id)
					vm.logs.splice(index, 1)
					vm.setMessage('The invoice log have been deleted!')
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
		this.refresh();
	}
}
</script>

<style>
.el-select__tags {
	display: none;
}

.btn-primary span.dnl_icon.dnl_refresh {
	font-size: 19px;
	margin: 5px 0 0 -10px;
}

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

a.toogler {
	color: #fff;
	background: #c0c6d1;
	width: 20px;
	height: 20px;
	display: block;
	text-align: center;
	border-radius: 10px;
	font-size: 15px;
	line-height: 18px;
	cursor: pointer;
}

a.toogler:hover {
	text-decoration: none;
}
</style>
