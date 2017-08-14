<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a>Log</a>
					</li>
					<li class="breadcrumb-item active">Rate Mass Edit Log</li>
				</ol>
				<h1 class="page-header">Rate Mass Edit Log</h1>
				<div class="timeline">
					<div class="chart_select_header grided">
						<div class="col-md-3 col-sm-3">
							<label>Type:</label>
							<select2 :options="options" v-model="type">
								<option disabled value="0">Select Type</option>
							</select2>
						</div>
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
								<el-select v-model="rate_mass_edit_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
									<el-option v-for="item in rate_mass_edit_table_column_options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</div>
						</div>
						<div class="col-md-12">
							<div class="table-responsive marged-30">
								<table class="table table-striped table-hover carrier_groups originators">
									<thead>
										<tr>
											<th v-if="showcolumns[0]">Edited On</th>
											<th v-if="showcolumns[1]">Edited By</th>
											<th v-if="showcolumns[2]">Rate Table</th>
											<th v-if="showcolumns[3]">Mass Type</th>
											<th v-if="showcolumns[4]">Action Rate Rows</th>
											<th v-if="showcolumns[5]">Action</th>
										</tr>
									</thead>
									<tbody>
										 <tr v-if="!logs.length">
											<td style="text-align: center" colspan="6">No Data Found</td>
										</tr> 
										<tr v-for="log in logs">
											<td v-if="showcolumns[0]"></td>
											<td v-if="showcolumns[1]"></td>
											<td v-if="showcolumns[2]">{{log.rate_table_name}}</td>
											<td v-if="showcolumns[3]">{{log.action_type}}</td>
											<td v-if="showcolumns[4]">{{log.action_rate_rows}}</td>
											<td v-if="showcolumns[5]">
												<a data-toggle="tooltip" data-placement="top" title="Download" class="action action_download v-top">
													<span class="dnl_icon dnl_download"></span>
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
	Pagination = require('vue!../main_components/pagination.vue');
const api = require("../../api");
module.exports = {
	components: {
		'select2': vSelect,
		'pagination': Pagination
	},
	data: function () {
		return {
			logs: [],
			showcolumns: [true, true, true, true, true, true],
				rate_mass_edit_table_columns: ['Edited On', 'Edited By', 'Rate Table', 'Mass Type', 'Action Rate Rows', 'Actions'],
				temp_rate_mass_edit_table_columns: ['Edited On', 'Edited By', 'Rate Table', 'Mass Type', 'Action Rate Rows', 'Actions'],
				rate_mass_edit_table_column_options: [{
					value: 'Edited On',
					label: 'Edited On'
				}, {
					value: 'Edited By',
					label: 'Edited By'
				}, {
					value: 'Rate Table',
					label: 'Rate Table'
				}, {
					value: 'Mass Type',
					label: 'Mass Type'
				}, {
					value: 'Action Rate Rows',
					label: 'Action Rate Rows'
				}, {
					value: 'Actions',
					label: 'Actions'
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
			type: '',
			time1: '',
			time2: '',
			options: [
				{ id: 1, value: 'carrier1', text: 'Carrier 1' },
				{ id: 2, value: 'carrier2', text: 'Carrier 2' },
				{ id: 3, value: 'carrier3', text: 'Carrier 3' },
				{ id: 4, value: 'carrier4', text: 'Carrier 4' },
				{ id: 5, value: 'carrier5', text: 'Carrier 5' }
			],
			selected1: 1,
			selected2: 1
		}
	},
	methods: {
		handleChange() {
			for(let i = 0; i < this.temp_rate_mass_edit_table_columns.length; i++) {
				if (_.indexOf(this.rate_mass_edit_table_columns, this.temp_rate_mass_edit_table_columns[i]) != -1) {
					Vue.set(this.showcolumns, i, true);
				}
				else {
					Vue.set(this.showcolumns, i, false);
				}
			}
		},
		changePageRow (value) {
			console.log(value);
			if (value !== this.pageOne.per_page) {
				this.pageOne.per_page = value
				this.$nextTick(this.fetchRateMassEditLogs)
			}
		},
		getQueries() {
			const page = '?page=' + (this.pageOne.currentPage - 1)
			const per_page = '&per_page=' + this.pageOne.per_page
			return page + per_page
		},
		fetchRateMassEditLogs () {
			const url = api.getEndpointUrl() + '/v1/log/rate_mass_edit' + this.getQueries()
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
				this.$nextTick(this.fetchRateMassEditLogs)
			}
		}
	},
	mounted: function () {
		$('[data-toggle="tooltip"]').tooltip();
	},
	created () {
		this.fetchRateMassEditLogs();
	},
	updated: function () {
		document.querySelector('.el-select > .el-input > input').placeholder = 'Show/Hide Columns';
	},
}
</script>

<style>

</style>
