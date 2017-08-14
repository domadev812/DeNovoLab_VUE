<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a>Billing</a>
					</li>
					<li class="breadcrumb-item active">Invoices</li>
				</ol>
				<h1 class="page-header">Invoices</h1>
				<div class="timeline">
					<div class="chart_select_header grided">
						<div class="col-md-3 col-sm-3">
							<div class="form-group">
								<label for="search">Search:</label>
								<input type="text" name="search" v-model="search" class="form-control" placeholder="Enter Search Query">
							</div>
						</div>
						<!--<div class="col-md-3 col-sm-3">
							<a class="btn btn-primary m-top-25">
								Query
							</a>
						</div>-->
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
											<th v-if="showcolumns[0]">Invoice No/Invoice Date</th>
											<th v-if="showcolumns[1]">Carriers</th>
											<th v-if="showcolumns[2]">Invoice Period</th>
											<th v-if="showcolumns[3]">Amount Gross</th>
											<th v-if="showcolumns[4]">Amount Paid</th>
											<th v-if="showcolumns[5]">Due Date</th>
										</tr>
									</thead>
									<tbody>
										<tr v-if="!filterBy(logs, search).length">
											<td style="text-align: center" colspan="6">No Data Found</td>
										</tr>
										
										<tr v-for="log in filterBy(logs, search)">
											<td v-if="showcolumns[0]">{{log.no}}/{{log.date}}</td>
											<td v-if="showcolumns[1]">{{log.carriers}}</td>
											<td v-if="showcolumns[2]">{{log.period}}</td>
											<td v-if="showcolumns[3]">{{log.gross}}</td>
											<td v-if="showcolumns[4]">{{log.paid}}</td>
											<td v-if="showcolumns[5]">{{log.due}}</td>
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
const vSelect = require('vue!../../main_components/select.vue'),
	Pagination = require('vue!../../main_components/pagination.vue');
const api = require("../../../api");
const auth = require("../../../auth");
_ = require('lodash');
module.exports = {
	components: {
		'select2': vSelect,
		'pagination': Pagination
	},
	data: function () {
		return {
			apiUrl: '',

			pageOne: {
				currentPage: 1,
				totalPages: 10,
				cntpage: 10
			},

			search: '',
			options1: [
				{ id: 1, text: '10' },
				{ id: 2, text: '20' },
				{ id: 3, text: '30' },
				{ id: 4, text: '50' },
				{ id: 5, text: '100' }
			],
			selected1: 1,
			logs: [],
			log_table_column_options: [{
				value: 'Invoice No/Invoice Date',
				label: 'Invoice No/Invoice Date'
			}, {
				value: 'Carriers',
				label: 'Carriers'
			}, {
				value: 'Invoice Period',
				label: 'Invoice Period'
			}, {
				value: 'Amount Gross',
				label: 'Amount Gross'
			}, {
				value: 'Amount Paid',
				label: 'Amount Paid'
			}, {
				value: 'Due Date',
				label: 'Due Date'
			}],
			log_table_columns: ['Invoice No/Invoice Date', 'Carriers', 'Invoice Period',
				'Amount Gross', 'Amount Paid', 'Due Date'],
			showcolumns: [true, true, true, true, true, true],
		}
	},
	methods: {
		handleChange() {
			if (_.indexOf(this.log_table_columns, 'Invoice No/Invoice Date') != -1) {
				Vue.set(this.showcolumns, 0, true);
			}
			else {
				Vue.set(this.showcolumns, 0, false);
			}

			if (_.indexOf(this.log_table_columns, 'Carriers') != -1) {
				Vue.set(this.showcolumns, 1, true);
			}
			else {
				Vue.set(this.showcolumns, 1, false);
			}

			if (_.indexOf(this.log_table_columns, 'Invoice Period') != -1) {
				Vue.set(this.showcolumns, 2, true);
			}
			else {
				Vue.set(this.showcolumns, 2, false);
			}

			if (_.indexOf(this.log_table_columns, 'Amount Gross') != -1) {
				Vue.set(this.showcolumns, 3, true);
			}
			else {
				Vue.set(this.showcolumns, 3, false);
			}

			if (_.indexOf(this.log_table_columns, 'Amount Paid') != -1) {
				Vue.set(this.showcolumns, 4, true);
			}
			else {
				Vue.set(this.showcolumns, 4, false);
			}

			if (_.indexOf(this.log_table_column, 'Due Date') != -1) {
				Vue.set(this.showcolumns, 5, true);
			}
			else {
				Vue.set(this.showcolumns, 5, false);
			}

			console.log(this.showcolumns);
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
		}
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
.el-select__tags {
	display: none;
}
</style>
