<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single big_data">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Statistics</a></li>
				  <li class="breadcrumb-item active">Location Report</li>
			</ol>
			<h1 class="page-header">Location Report</h1>
				<div class="white_pad table_wrap">
					<div class="advanced_search_filter_panel">
						<div class="col-md-2 col-sm-4">
							<label>Period:</label>
							<select2 :options="options" v-model="period">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="col-md-4 col-sm-8">
							<div class="inlined">
								<label for="start_date">Start Time:</label>
								<input type="text" name="start_date" v-model="start_date" class="form-control" placeholder="Enter Date">
							</div>
							<div class="inlined">
								<label for="end-date">End Time:</label>
								<input type="text" name="end_date" v-model="end_date" class="form-control" placeholder="Enter Date">
							</div>
						</div>
						<div class="col-md-2 col-sm-4">
							<label>GMT:</label>
							<select2 :options="options" v-model="gmt">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="col-md-2 col-sm-4">
							<label class="m-top-15"></label>
							<select2 :options="options" v-model="all_time">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="col-md-2 col-sm-4">
							<label class="m-top-15"></label>
							<select2 :options="options" v-model="web">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="clearfix little-space"></div>
						<div class="col-md-6 col-sm-6">
							<div class="white_pad less_pad">
								<h1 class="page-header">Inbound</h1>
								<div class="row">
								<div class="col-md-6 first">
									<label>Carriers:</label>
									<select2 :options="options" v-model="carriers">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-6 second">
									<label>Ingress Trunk:</label>
									<select2 :options="options" v-model="ingress_trunk">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="clearfix little-space"></div>
								<div class="col-md-6 first">
									<label>Tech Prefix:</label>
									<select2 :options="options" v-model="carriers">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-6 second">
									<label for="country">Country:</label>
									<input type="text" name="country" v-model="country" class="form-control" placeholder="Enter Country">
								</div>
								<div class="clearfix little-space"></div>
								<div class="col-md-6 first">
									<label for="code_name">Code Name:</label>
									<input type="text" name="code_name" v-model="code_name" class="form-control" placeholder="Enter Code Name">
								</div>
								<div class="col-md-6 second">
									<label>Routing Plan:</label>
									<select2 :options="options" v-model="routing_plan">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="clearfix little-space"></div>
								<div class="col-md-6 first">
									<label>Rate Type:</label>
									<select2 :options="options" v-model="rate_type">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-6 second">
									<label>Rate Table:</label>
									<select2 :options="options" v-model="rate_table">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="clearfix"></div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-sm-6">
							<div class="white_pad less_pad">
								<h1 class="page-header">Outbound</h1>
								<div class="row">
								<div class="col-md-6 first">
									<label>Carriers:</label>
									<select2 :options="options" v-model="carriers">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-6 second">
									<label>Egress Trunk:</label>
									<select2 :options="options" v-model="egress_trunk">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="clearfix little-space"></div>
								<div class="col-md-6 first">
									<label>Rate Type:</label>
									<select2 :options="options" v-model="rate_type">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-6 second">
									<label for="country">Country:</label>
									<input type="text" name="country" v-model="country" class="form-control" placeholder="Enter Country">
								</div>
								<div class="clearfix little-space"></div>
								<div class="col-md-6 first">
									<label for="code_name">Code Name:</label>
									<input type="text" name="code_name" v-model="code_name" class="form-control" placeholder="Enter Code Name">
								</div>
								<div class="clearfix"></div>
								</div>
							</div>
						</div>
						<div class="clearfix"></div>
						<div class="col-md-12 col-sm-12">
							<div class="white_pad less_pad">
								<div class="col-md-2 col-sm-4">
									<label class="m-top-10">Group by #1:</label>
									<select2 :options="options" v-model="group_by1">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-2 col-sm-4">
									<label class="m-top-10">Group by #2:</label>
									<select2 :options="options" v-model="group_by1">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-2 col-sm-4">
									<label class="m-top-10">Group by #3:</label>
									<select2 :options="options" v-model="group_by1">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-2 col-sm-4">
									<label class="m-top-10">Group by #4:</label>
									<select2 :options="options" v-model="group_by1">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-2 col-sm-4">
									<label class="m-top-10">Group by #5:</label>
									<select2 :options="options" v-model="group_by1">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-2 col-sm-4">
									<label class="m-top-10">Group by #6:</label>
									<select2 :options="options" v-model="group_by1">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="clearfix"></div>
							</div>
							<div class="button_set">
								<a class="btn btn-primary">
									Query
								</a>
								<a class="btn btn-default">
									Less Options
								</a>
							 </div>
						</div>
						<div class="clearfix"></div>
					</div>
					<div class="table_filters pull-right">
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
					<span class="table_time chart_time margin_0">
						09/23/2016 17:34:52 +0000
					</span>
					<div class="clearfix"></div>
					<div class="table-responsive">
						<table class="table table-striped table-hover carrier_groups centrum">
						  <thead>
                            <tr>
								<th>Orig Country</th>
								<th>Duration</th>
								<th>Call Count</th>
								<th>Revenue</th>
								<th>Cost</th>
								<th>Profit</th>
								<th>Profit (%)</th>
							</tr>
						  </thead>
						  <tbody>
							<tr v-for="report in reports">
							  <td>{{report.orig_country}}</td>
							  <td>{{report.duration}}</td>
							  <td>{{report.call_count}}</td>
							  <td>{{report.revenue}}</td>
							  <td>{{report.cost}}</td>
							  <td>{{report.profit}}</td>
							  <td>{{report.profit_percentage}}</td>
							</tr>
						  </tbody>
						</table>
					</div>
					<div class="pull-right pagination">
						<pagination :current-page="pageOne.currentPage"
									:total-pages="pageOne.totalPages"
									@page-changed="pageOneChanged">
						</pagination>
					</div>
					<div class="clearfix"></div>
				</div>
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
		data: function(){
            return {
				pageOne: {
					currentPage: 1,
					totalPages: 10
				},
				route_types: [
				  { id: 1, text: 'Fail to Next Host' },
				  { id: 2, text: 'Fail to Next Trunk' },
				  { id: 3, text: 'Stop' },
			  	],
				rate_table: '',
				period: '',
				carriers: '',
				start_date: '',
				end_date: '',
				gmt: '',
				by_hours: '',
				all_time: '',
				web: '',
				code: '',
				carrirers: '',
				ingress_trunk: '',
				tech_prefix: '',
				country: '',
				code_name: '',
				routing_plan: '',
				egress_trunk: '',
				rate_type: '',
				group_by1: '',
				group_by2: '',
				group_by3: '',
				group_by4: '',
				group_by5: '',
				group_by6: '',
				selected1: '',
				selected2: '',
				rate_display: '',
				period_time_1: '',
				period_time_2: '',
				options: [
				  { id: 1, value: 'carrier1', text: 'Carrier 1' },
				  { id: 2, value: 'carrier2', text: 'Carrier 2' },
				  { id: 3, value: 'carrier3', text: 'Carrier 3' },
				  { id: 4, value: 'carrier4', text: 'Carrier 4' },
				  { id: 5, value: 'carrier5', text: 'Carrier 5' }
			    ],
				reports: [
					{
					  orig_country: 'Orig Country',
					  duration: '0',
					  call_count: '18',
					  revenue: '0',
					  cost: '0',
					  profit: '0.000',
					  profit_percentage: '0.000%',
					},
					{
					  orig_country: 'Orig Country',
					  duration: '0',
					  call_count: '18',
					  revenue: '0',
					  cost: '0',
					  profit: '0.000',
					  profit_percentage: '0.000%',
					},
					{
					  orig_country: 'Orig Country',
					  duration: '0',
					  call_count: '18',
					  revenue: '0',
					  cost: '0',
					  profit: '0.000',
					  profit_percentage: '0.000%',
					},
					{
					  orig_country: 'Orig Country',
					  duration: '0',
					  call_count: '18',
					  revenue: '0',
					  cost: '0',
					  profit: '0.000',
					  profit_percentage: '0.000%',
					},
					{
					  orig_country: 'Orig Country',
					  duration: '0',
					  call_count: '18',
					  revenue: '0',
					  cost: '0',
					  profit: '0.000',
					  profit_percentage: '0.000%',
					}
			    ]
			}
        },
		methods: {
			toggleTable(event) {
				var element = event.currentTarget;
				$(element).parents('tr').siblings('.collapse').toggleClass('in');
			},
			pageOneChanged (pageNum) {
				this.pageOne.currentPage = pageNum
			}
		}
	}
</script>

<style>
	
</style>
