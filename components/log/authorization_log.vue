<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a>Log</a></li>
				  <li class="breadcrumb-item active">Authorization Log</li>
			</ol>
			<h1 class="page-header">Authorization Log</h1>
			<div class="timeline">
				<div class="chart_select_header grided">
					<div class="col-md-3 col-sm-4">
						<label>Period:</label>
						<select2 :options="options" v-model="period">
							<option disabled value="0">Select one</option>
						</select2>
					</div>
					<div class="col-md-6 col-sm-6">
						<div class="inlined">
							<label for="submitted_time2" class="m-top-15"></label>
							<input type="text" name="submitted_time2" v-model="submitted_time2" class="form-control" placeholder="Enter Date/Time">
						</div>
						<div class="inlined">
							<label for="submitted_time2" class="m-top-15"></label>
							<input type="text" name="submitted_time2" v-model="submitted_time2" class="form-control" placeholder="Enter Date/Time">
						</div>
					</div>
					<div class="col-md-3 col-sm-2">
						<label>GMT:</label>
						<select2 :options="options" v-model="gmt">
							<option disabled value="0">Select one</option>
						</select2>
					</div>
					<div class="clearfix little-space"></div>
					<div class="col-md-3 col-sm-3">
						<label>Direction:</label>
						<select2 :options="options" v-model="direction">
							<option disabled value="0">Select one</option>
						</select2>
					</div>
					<div class="col-md-3 col-sm-3">
						<label>Auth Type:</label>
						<select2 :options="options" v-model="auth_type">
							<option disabled value="0">Select one</option>
						</select2>
					</div>
					<div class="col-md-3 col-sm-3">
						<label>Error Type:</label>
						<select2 :options="options" v-model="error_type">
							<option disabled value="0">Select one</option>
						</select2>
					</div>
					<div class="col-md-3 col-sm-3">
						<label for="search">Search:</label>
						<input type="text" name="search" v-model="search" class="form-control" placeholder="Enter Search">
					</div>
					<div class="clearfix little-space"></div>
					<div class="col-md-3 col-sm-4">
						<a class="btn btn-primary m-top-10">
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
							<el-select v-model="auth_logs_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
								<el-option v-for="item in auth_logs_table_column_options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="col-md-12">
						<div class="table-responsive marged-30">
							<table class="table table-striped table-hover carrier_groups originators">
								<thead>
								<tr>
									<th v-if="showcolumns[0]">Failed Reason</th>
									<th v-if="showcolumns[1]">User Name</th>
									<th v-if="showcolumns[2]">Login IP</th>
									<th v-if="showcolumns[3]">Entered Password</th>
									<th v-if="showcolumns[4]">Login Time</th>
									<th v-if="showcolumns[5]">Status</th>
								</tr>
								</thead>
								<tbody>
									<tr v-if="!auth_logs.length">
										<td style="text-align: center" colspan="6">No Data Found</td>
									</tr>
								<tr v-for="auth_log in auth_logs">
									<td v-if="showcolumns[0]">{{auth_log.failed_reason}}</td>
									<td v-if="showcolumns[1]">{{auth_log.username}}</td>
									<td v-if="showcolumns[2]">{{auth_log.login_ip}}</td>
									<td v-if="showcolumns[3]">{{auth_log.entered_password}}</td>
									<td v-if="showcolumns[4]">{{auth_log.login_time}}</td>
									<td v-if="showcolumns[5]">{{auth_log.status}}</td>
								</tr>
								</tbody>
							</table>
						</div>
						<div class="pull-right pagination m-r-30">
							<pagination :current-page="pageOne.currentPage"
										:total-pages="pageOne.totalPages"
										@page-changed="pageOneChanged">
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
		data: function(){
            return {
				showcolumns: [true, true, true, true, true, true],
				auth_logs_table_columns: ['Failed Reason', 'User Name', 'Login IP', 'Entered Password', 'Login Time', 'Status'],
				temp_auth_logs_table_columns: ['Failed Reason', 'User Name', 'Login IP', 'Entered Password', 'Login Time', 'Status'],
				auth_logs_table_column_options: [{
					value: 'Failed Reason',
					label: 'Failed Reason'
				}, {
					value: 'User Name',
					label: 'User Name'
				}, {
					value: 'Login IP',
					label: 'Login IP'
				}, {
					value: 'Entered Password',
					label: 'Entered Password'
				}, {
					value: 'Login Time',
					label: 'Login Time'
				}, {
					value: 'Status',
					label: 'Status'
				}],
				auth_logs: [],
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
			  period: '',
			  created_date1: '',
			  created_date2: '',
			  gmt: '',
			  direction: '',
			  auth_type: '',
			  error_type: '',
			  search: '',
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
				for(let i = 0; i < this.temp_auth_logs_table_columns.length; i++) {
					if (_.indexOf(this.auth_logs_table_columns, this.temp_auth_logs_table_columns[i]) != -1) {
						Vue.set(this.showcolumns, i, true);
					}
					else {
						Vue.set(this.showcolumns, i, false);
					}
				}
			},
			getQueries() {
				const page = '?page=' + (this.pageOne.currentPage - 1)
				const per_page = '&per_page=' + this.pageOne.per_page
				return page + per_page
			},
			fetchAuthLog() {
				const url = api.getEndpointUrl() + '/v1/log/auth' + this.getQueries()
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						this.auth_logs = body.payload.items
						console.log(this.auth_logs);
						this.pageOne.currentPage = body.payload.page + 1
						this.pageOne.totalPages = Math.ceil(body.payload.total / body.payload.per_page)
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			changePageRow (value) {
				console.log(value);
				if (value !== this.pageOne.per_page) {
					this.pageOne.per_page = value
					this.$nextTick(this.fetchAuthLog)
				}
			},
			pageOneChanged (pageNum) {
				if (pageNum !== this.pageOne.currentPage) {
					this.pageOne.currentPage = pageNum
					this.$nextTick(this.fetchAuthLog)
				}
			}
		},
		mounted: function () {
			
		},
		created () {
			this.fetchAuthLog()
		},
		updated: function () {
			document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
		},
	}
</script>

<style>
	.inlined {
		width: 47%;
		float: left;
		position: relative
	}
	
	.inlined:first-child {
		margin-right: 6%;
	}
	
	.inlined:first-child::after {
		content: '\23AF';
		position: absolute;
		top: 33px;
		right: -7.5%;
	}
</style>
