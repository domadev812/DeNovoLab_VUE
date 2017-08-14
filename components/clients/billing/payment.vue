<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a>Billing</a>
					</li>
					<li class="breadcrumb-item active">Payment History</li>
				</ol>
				<h1 class="page-header">Payment History</h1>
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
								<select2 :options="per_page_number_list" v-model="selected1" class="inline-block" @pagecount="changePageRow">
								</select2>
							</div>
							<div class="inline-block">
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
											<th v-if="showcolumns[0]">Paid On</th>
											<th v-if="showcolumns[1]">Paid Amount</th>
											<th v-if="showcolumns[2]">Method</th>
											<th v-if="showcolumns[3]">Transaction ID</th>
										</tr>
									</thead>
									<tbody>
										 <tr v-if="!logs.length">
											<td style="text-align: center" colspan="4">No Data Found</td>
										</tr> 
										<tr v-for="log in logs">
											<td v-if="showcolumns[0]">{{log.on}}</td>
											<td v-if="showcolumns[1]">{{log.amount}}</td>
											<td v-if="showcolumns[2]">{{log.method}}</td>
											<td v-if="showcolumns[3]">{{log.transaction}}</td>
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
			logs: [
				{id: 1, on: "2017-07-18 11:21:17+00", amount: "2,150.00", method: "sent", transaction: ""},
				{id: 1, on: "2017-07-18 11:21:17+00", amount: "2,150.00", method: "sent", transaction: ""},
				{id: 1, on: "2017-07-18 11:21:17+00", amount: "2,150.00", method: "sent", transaction: ""},
			],
			showcolumns: [true, true, true, true],
				log_table_columns: ['Paid On', 'Paid Amount', 'Method', 'Transaction ID'],
				log_table_column_options: [{
					value: 'Paid On',
					label: 'Paid On'
				}, {
					value: 'Paid Amount',
					label: 'Paid Amount'
				}, {
					value: 'Method',
					label: 'Method'
				}, {
					value: 'Transaction ID',
					label: 'Transaction ID'
				}],
			per_page_number_list: [
				  { id: 1, text: '10' },
				  { id: 2, text: '20' },
				  { id: 3, text: '30' },
				  { id: 4, text: '50' },
				  { id: 5, text: '100' }
			  ],
			pageOne: {
				currentPage: 1,
				totalPages: 10,
				per_page: 10,
			},
			time1: '',
			time2: '',
			selected1: 1,
		}
	},
	methods: {
		handleChange() {
			if (_.indexOf(this.log_table_columns, 'Paid On') != -1) {
				Vue.set(this.showcolumns, 0, true);
			} else {
				Vue.set(this.showcolumns, 0, false);
			}
			if (_.indexOf(this.log_table_columns, 'Paid Amount') != -1) {
				Vue.set(this.showcolumns, 1, true);
			} else {
				Vue.set(this.showcolumns, 1, false);
			}
			if (_.indexOf(this.log_table_columns, 'Method') != -1) {
				Vue.set(this.showcolumns, 2, true);
			} else {
				Vue.set(this.showcolumns, 2, false);
			}
			if (_.indexOf(this.log_table_columns, 'Transaction ID') != -1) {
				Vue.set(this.showcolumns, 3, true);
			} else {
				Vue.set(this.showcolumns, 3, false);
			}
			
			console.log(this.showcolumns);
        },
		changePageRow (value) {
			console.log(value);
			if (value !== this.pageOne.per_page) {
				this.pageOne.per_page = value
				this.$nextTick(this.fetchLog)
			}
		},
		getQueries() {
			const page = '?page=' + (this.pageOne.currentPage - 1)
			const per_page = '&per_page=' + this.pageOne.per_page
			return page + per_page
		},
		fetchLog () {
			const url = api.getEndpointUrl() + '/v1/log/' + this.getQueries()
			this.$http.get(url)
			.then(response => {
				const body = response.body
				if (body.success) {
					this.logs = body.payload.items
					console.log(this.logs)
					this.pageOne.currentPage = body.payload.page + 1
					this.pageOne.totalPages = Math.ceil(body.payload.total / body.payload.per_page)
				}
			})
			.catch(error => {
				console.log(error)
			})
		},
		query() {

		},
		pageOneChanged(pageNum) {
			if (pageNum !== this.pageOne.currentPage) {
				this.pageOne.currentPage = pageNum
				this.$nextTick(this.fetchLog)
			}
		}
	},
	mounted: function () {
		$('[data-toggle="tooltip"]').tooltip();
	},
	created () {
		this.fetchLog();
	},
	updated: function () {
		document.querySelector('.el-select > .el-input > input').placeholder = 'Show/Hide Columns';
	},
}
</script>

<style>
.el-select__tags {
	display: none;
}
</style>
