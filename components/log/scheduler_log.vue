<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a>Log</a>
					</li>
					<li class="breadcrumb-item active">Scheduler Log</li>
				</ol>
				<h1 class="page-header">Scheduler Log</h1>
				<div class="timeline">
					<div class="chart_select_header grided">
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
						<div class="col-md-6 col-sm-6">
							<div class="inlined">
								<label for="e_time1">End Time:</label>
								<input type="text" name="e_time1" v-model="e_time1" class="form-control" placeholder="Enter Time">
							</div>
							<div class="inlined">
								<label for="e_time2" class="m-top-15"></label>
								<input type="text" name="e_time2" v-model="e_time2" class="form-control" placeholder="Enter Time">
							</div>
						</div>
						<div class="col-md-3 col-sm-3">
							<a class="btn btn-primary m-top-25">
								Query
							</a>
						</div>
						<div class="clearfix"></div>
					</div>
					<div class="chart_content">
						<div class="table_filters marged-40">
							<div class="inline-block select_min_wrapper">
								<span class="inline-block">Page row:</span>
								<select2 :options="options" v-model="selected1" class="inline-block">
								</select2>
							</div>
							<div class="inline-block">
								<select2 :options="options" v-model="selected2">
									<option disabled value="0">Show/Hide Columns</option>
								</select2>
							</div>
						</div>
						<div class="col-md-12">
							<div class="table-responsive marged-30">
								<table class="table table-striped table-hover carrier_groups aligned-center">
									<thead>
										<tr>
											<th>Name
												<span class="dnl_icon dnl_sort pull-right"></span>
											</th>
											<th>Start Time</th>
											<th>End Time</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="scheduler in schedulers">
											<td>{{scheduler.name}}</td>
											<td>{{scheduler.start_time}}</td>
											<td>{{scheduler.end_time}}</td>
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
module.exports = {
	components: {
		'select2': vSelect,
		'pagination': Pagination
	},
	data: function () {
		return {
			pageOne: {
				currentPage: 1,
				totalPages: 10
			},
			time1: '',
			time2: '',
			e_time1: '',
			e_time2: '',
			options: [
				{ id: 1, value: 'carrier1', text: 'Carrier 1' },
				{ id: 2, value: 'carrier2', text: 'Carrier 2' },
				{ id: 3, value: 'carrier3', text: 'Carrier 3' },
				{ id: 4, value: 'carrier4', text: 'Carrier 4' },
				{ id: 5, value: 'carrier5', text: 'Carrier 5' }
			],
			selected1: 1,
			selected2: 1,
			schedulers: [
				{
					name: 'dalily balance summary - sched daemon work cycle',
					start_time: '2017-01-27 23:59:24',
					end_time: '2017-01-27 23:59:24'
				},
				{
					name: 'dalily balance summary - sched daemon work cycle',
					start_time: '2017-01-27 23:59:24',
					end_time: '2017-01-27 23:59:24'
				},
				{
					name: 'dalily balance summary - sched daemon work cycle',
					start_time: '2017-01-27 23:59:24',
					end_time: '2017-01-27 23:59:24'
				},
				{
					name: 'dalily balance summary - sched daemon work cycle',
					start_time: '2017-01-27 23:59:24',
					end_time: '2017-01-27 23:59:24'
				},
				{
					name: 'dalily balance summary - sched daemon work cycle',
					start_time: '2017-01-27 23:59:24',
					end_time: '2017-01-27 23:59:24'
				}
			]
		}
	},
	methods: {
		pageOneChanged(pageNum) {
			this.pageOne.currentPage = pageNum
		}
	},
	mounted: function () {
		$('[data-toggle="tooltip"]').tooltip();
	}
}
</script>

<style>

</style>
