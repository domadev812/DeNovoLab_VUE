<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single big_data">
<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Statistics</a></li>
				  <li class="breadcrumb-item active">Spam Report</li>
			</ol>
			<h1 class="page-header">Spam Report</h1>
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
							<select2 :options="options" v-model="web">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="clearfix little-space"></div>
							<div class="col-md-4 col-sm-4">
								<label for="ani">ANI:</label>
								<input type="text" name="ani" v-model="ani" class="form-control" placeholder="Enter ANI">
							</div>
							<div class="col-md-4 col-sm-4">
								<label for="dnis">DNIS:</label>
								<input type="text" name="dnis" v-model="dnis" class="form-control" placeholder="Enter DNIS">
							</div>
							<div class="col-md-4 col-sm-4">
								<label for="ip">IP:</label>
								<input type="text" name="ip" v-model="ip" class="form-control" placeholder="Enter IP">
							</div>
							<div class="clearfix little-space"></div>
						    <div class="col-md-12">
								<div class="button_set m-top-10">
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
					<div class="material-switch pull-right right_margin">
						<span>Auto Update</span>
						<input id="auto_update" v-model="auto_update" name="auto_update" type="checkbox"/>
						<label for="auto_update" class="label-primary"></label>
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
					<!-- <span class="table_time chart_time margin_0">
						09/23/2016 17:34:52 +0000
					</span> -->
					<div class="clearfix"></div>
					<div class="table-responsive">
						<table class="table table-striped table-hover carrier_groups centrum">
						  <thead>
                            <tr>
								<th>Orig DST Number</th>
								<th>Orig IP</th>
								<th>Orig SRC Number</th>
								<th>Time</th>
							</tr>
						  </thead>
						  <tbody>
							<tr v-for="report in reports">
							  <td>{{report.orig_dst_number}}</td>
							  <td>{{report.orig_ip}}</td>
							  <td>{{report.orig_src_number}}</td>
							  <td>{{report.time}}</td>
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
				ani: '',
				dnis: '',
				ip: '',
				rate_type: '',
				selected1: '',
				selected2: '',
				rate_display: '',
				period_time_1: '',
				period_time_2: '',
				auto_update: '',
				options: [
				  { id: 1, value: 'carrier1', text: 'Carrier 1' },
				  { id: 2, value: 'carrier2', text: 'Carrier 2' },
				  { id: 3, value: 'carrier3', text: 'Carrier 3' },
				  { id: 4, value: 'carrier4', text: 'Carrier 4' },
				  { id: 5, value: 'carrier5', text: 'Carrier 5' }
			    ],
				reports: [
					{
					  orig_dst_number: '987011972592026088',
					  orig_ip: '213.251.48.154',
					  orig_src_number: '100',
					  time: '2016-10-31 22:59:28 +0000',
					},
					{
					  orig_dst_number: '987011972592026088',
					  orig_ip: '213.251.48.154',
					  orig_src_number: '100',
					  time: '2016-10-31 22:59:28 +0000',
					},
					{
					  orig_dst_number: '987011972592026088',
					  orig_ip: '213.251.48.154',
					  orig_src_number: '100',
					  time: '2016-10-31 22:59:28 +0000',
					},
					{
					  orig_dst_number: '987011972592026088',
					  orig_ip: '213.251.48.154',
					  orig_src_number: '100',
					  time: '2016-10-31 22:59:28 +0000',
					},
					{
					  orig_dst_number: '987011972592026088',
					  orig_ip: '213.251.48.154',
					  orig_src_number: '100',
					  time: '2016-10-31 22:59:28 +0000',
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
	.material-switch.pull-right.right_margin {
		margin-top: 10px;
		margin-right: 0px;
		margin-left: 25px;
	}
</style>
