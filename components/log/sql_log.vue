<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="#">Log</a>
					</li>
					<li class="breadcrumb-item active">SQL Log</li>
				</ol>
				<h1 class="page-header">SQL Log</h1>
				<tabs class="client_tabs">
					<tab label="List" class="" icon="dnl_icon dnl_list" selected>
						<div class="advanced_search_filter_panel bottom_0">
							<div class="col-md-6 col-sm-6">
								<div class="inlined">
									<label for="time1">Time:</label>
									<input type="text" name="time1" v-model="time1" class="form-control" placeholder="Enter Time">
								</div>
								<div class="inlined">
									<label for="time2" class="m-top-15"></label>
									<input type="text" name="time2" v-model="time2" class="form-control" placeholder="Enter Time">
								</div>
							</div>
							<div class="col-md-3 col-sm-3">
								<a class="btn btn-primary m-top-25">
									Query
								</a>
							</div>
							<div class="clearfix"></div>
						</div>
						<div class="table-responsive m-top-20">
							<table class="table table-striped table-hover aligned-center">
								<thead>
									<tr>
										<th>PID</th>
										<th>SQL</th>
										<th>Start Time</th>
										<th class="width-65">Action</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="list in lists">
										<td>{{list.pid}}</td>
										<td>{{list.sql}}</td>
										<td>{{list.start_time}}</td>
										<td>
											<a data-toggle="tooltip" data-placement="top" class="action action_reject" title="Kill Job">
												<span class="dnl_icon dnl_disabled"></span>
											</a>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</tab>
					<tab label="Killed Log" class="" icon="dnl_icon dnl_qos_report">
						<div class="advanced_search_filter_panel bottom_0">
							<div class="col-md-6 col-sm-6">
								<div class="inlined">
									<label for="time1">Killed Time:</label>
									<input type="text" name="time1" v-model="time1" class="form-control" placeholder="Enter Time">
								</div>
								<div class="inlined">
									<label for="time2" class="m-top-15"></label>
									<input type="text" name="time2" v-model="time2" class="form-control" placeholder="Enter Time">
								</div>
							</div>
							<div class="col-md-6 col-sm-6">
								<div class="inlined">
									<label for="time1">Start Time:</label>
									<input type="text" name="time1" v-model="time1" class="form-control" placeholder="Enter Time">
								</div>
								<div class="inlined">
									<label for="time2" class="m-top-15"></label>
									<input type="text" name="time2" v-model="time2" class="form-control" placeholder="Enter Time">
								</div>
							</div>
							<div class="clearfix little-space"></div>
							<div class="col-md-3 col-sm-3">
								<a class="btn btn-primary m-top-10">
									Query
								</a>
							</div>
							<div class="clearfix"></div>
						</div>
						<div class="table-responsive m-top-20">
							<table class="table table-striped table-hover aligned-center">
								<thead>
									<tr>
										<th>SQL</th>
										<th>Start Time</th>
										<th>Killed Time</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="log in logs">
										<td>{{log.sql}}</td>
										<td>{{log.start_time}}</td>
										<td>{{log.killed_time}}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</tab>
				</tabs>
			</div>
		</div>
	</div>
</template>

<script>   
const vTabs = require('vue!../main_components/tabs.vue'),
	vTab = require('vue!../main_components/tab.vue'),
	vSelect = require('vue!../main_components/select.vue');
module.exports = {
	components: {
		'tabs': vTabs,
		'tab': vTab,
		'select2': vSelect
	},
	data: function () {
		return {
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
			selected2: 1,
			lists: [
				{
					pid: '23079',
					sql: 'select * from pg_stat_activity where datname = \'\class4_pr\'\ and query is not null  ORDER BY query_start DESC',
					start_time: '2017-01-28 21:54:04.89593+00'
				},
				{
					pid: '23079',
					sql: 'select * from pg_stat_activity where datname = \'\class4_pr\'\ and query is not null  ORDER BY query_start DESC',
					start_time: '2017-01-28 21:54:04.89593+00'
				},
				{
					pid: '23079',
					sql: 'select * from pg_stat_activity where datname = \'\class4_pr\'\ and query is not null  ORDER BY query_start DESC',
					start_time: '2017-01-28 21:54:04.89593+00'
				},
				{
					pid: '23079',
					sql: 'select * from pg_stat_activity where datname = \'\class4_pr\'\ and query is not null  ORDER BY query_start DESC',
					start_time: '2017-01-28 21:54:04.89593+00'
				},
				{
					pid: '23079',
					sql: 'select * from pg_stat_activity where datname = \'\class4_pr\'\ and query is not null  ORDER BY query_start DESC',
					start_time: '2017-01-28 21:54:04.89593+00'
				}
			],
			logs: [
				{
					sql: 'select * from pg_stat_activity where datname = \'\class4_pr\'\ and query is not null  ORDER BY query_start DESC',
					start_time: '2017-01-28 21:54:04.89593+00',
					killed_time: '2017-01-28 21:54:04.89593+00'
				},
				{
					sql: 'select * from pg_stat_activity where datname = \'\class4_pr\'\ and query is not null  ORDER BY query_start DESC',
					start_time: '2017-01-28 21:54:04.89593+00',
					killed_time: '2017-01-28 21:54:04.89593+00'
				},
				{
					sql: 'select * from pg_stat_activity where datname = \'\class4_pr\'\ and query is not null  ORDER BY query_start DESC',
					start_time: '2017-01-28 21:54:04.89593+00',
					killed_time: '2017-01-28 21:54:04.89593+00'
				},
				{
					sql: 'select * from pg_stat_activity where datname = \'\class4_pr\'\ and query is not null  ORDER BY query_start DESC',
					start_time: '2017-01-28 21:54:04.89593+00',
					killed_time: '2017-01-28 21:54:04.89593+00'
				},
				{
					sql: 'select * from pg_stat_activity where datname = \'\class4_pr\'\ and query is not null  ORDER BY query_start DESC',
					start_time: '2017-01-28 21:54:04.89593+00',
					killed_time: '2017-01-28 21:54:04.89593+00'
				}
			]
		}
	}
}
</script>

<style>
.fix_big_select .select2 {
	width: 100% !important;
}
</style>
