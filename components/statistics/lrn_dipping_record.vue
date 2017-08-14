<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single big_data">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Statistics</a></li>
				  <li class="breadcrumb-item active">LRN Dipping Record</li>
			</ol>
			<h1 class="page-header">LRN Dipping Record</h1>
			<tabs>
				<tab label="LRN Dipping Record" class="" icon="dnl_icon dnl_list" selected>
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
							<label>Web:</label>
							<select2 :options="options" v-model="web">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="clearfix little-space"></div>
						<div class="col-md-12">
							<div class="white_pad m-bottom-10">
								<div class="row">
									<div class="col-md-4 col-sm-4">
										<label>Carriers:</label>
										<select2 :options="options" v-model="carriers">
											<option disabled value="0">Select one</option>
										</select2>
									</div>
									<div class="col-md-4 col-sm-4">
										<label for="dnis">DNIS:</label>
										<input type="text" name="dnis" v-model="dnis" class="form-control" placeholder="Enter DNIS">
									</div>
									<div class="col-md-4 col-sm-4">
										<label>LRN Number Vendor:</label>
										<select2 :options="options" v-model="lrn_number_vendor">
											<option disabled value="0">Select one</option>
										</select2>
									</div>
									<div class="clearfix little-space"></div>
									<div class="col-md-4 col-sm-4">
										<label>Ingress:</label>
										<select2 :options="options" v-model="ingress">
											<option disabled value="0">Select one</option>
										</select2>
									</div>
									<div class="col-md-4 col-sm-4">
										<label for="ani">ANI:</label>
										<input type="text" name="ani" v-model="ani" class="form-control" placeholder="Enter ANI">
									</div>
									<div class="col-md-4 col-sm-4">
										<label for="lrn_number">LRN Number:</label>
										<input type="text" name="lrn_number" v-model="lrn_number" class="form-control" placeholder="Enter LRN Number">
									</div>
								</div>
							</div>
						</div>
						<div class="clearfix"></div>
						<div class="col-md-12 col-sm-12">
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
								<th>Trunk Id Origination</th>
								<th>Orig Ip</th>
								<th>Start Time</th>
								<th>LRN Number</th>
								<th>ANI</th>
								<th>DNIS</th>
								<th>Switch Ip</th>
							</tr>
						  </thead>
						  <tbody>
							<tr v-for="record in records">
							  <td>{{record.trunk_id_origination}}</td>
							  <td>{{record.orig_ip}}</td>
							  <td>{{record.start_time}}</td>
							  <td>{{record.lrn_number}}</td>
							  <td>{{record.ani}}</td>
							  <td>{{record.dnis}}</td>
							  <td>{{record.switch_ip}}</td>
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
				</tab>
				<tab label="LRN Dipping Record Export Log" class="" icon="dnl_icon dnl_qos_report">
					<div class="table_filters pull-right">
						<div class="inline-block select_min_wrapper">
							<span class="inline-block">Page row:</span>
							<select2 :options="options" v-model="selected1" class="inline-block">
							</select2>
						</div>
						<div class="inline-block fix_medium_select">
							<select2 :options="options" v-model="selected2">
								<option disabled value="0">Show/Hide Columns</option>
							</select2>
						</div>
					</div>
					<div class="clearfix"></div>
					<div class="table-responsive">
						<table class="table table-striped table-hover carrier_groups centrum">
						  <thead>
                            <tr>
								<th>Job ID</th>
								<th>Tiggered Time</th>
								<th>Status</th>
								<th>Number of Rows</th>
								<th>File Size</th>
								<th class="width-65">Action</th>
							</tr>
						  </thead>
						  <tbody>
							<tr v-for="job in jobs">
							  <td>{{job.job_id}}</td>
							  <td>{{job.tiggered_time}}</td>
							  <td>{{job.status}}</td>
							  <td>{{job.number_of_rows}}</td>
							  <td>{{job.file_size}}</td>
							  <td v-if="job.status == 'Done'">
								  <a data-toggle="tooltip" data-placement="top" title="Download" class="action action_menu">
									  <span class="dnl_icon dnl_download"></span>
								  </a>
							  </td>
							  <td v-else>
								  <a data-toggle="tooltip" data-placement="top" title="Kill the Job" class="action action_reject">
									  <span class="dnl_icon dnl_disabled"></span>
								  </a>
							  </td>
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
				</tab>
			</tabs>
		</div>
	  </div>
	</div>
</template>

<script>   
	const vTabs = require('vue!../main_components/tabs.vue'),
		  vTab = require('vue!../main_components/tab.vue'),
		  vSelect = require('vue!../main_components/select.vue'),
		  Pagination = require('vue!../main_components/pagination.vue');
	module.exports = {
		components: {
			'tabs': vTabs,
			'tab': vTab,
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
				lrn_number_vendor: '',
				ingress: '',
				ani: '',
				lrn_number: '',
				dnis: '',
				rate_table: '',
				period: '',
				carriers: '',
				start_date: '',
				end_date: '',
				gmt: '',
				by_hours: '',
				web: '',
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
				records: [
					{
					  trunk_id_origination: 'vcom_DID_test',
					  orig_ip: '43.251.88.26',
					  start_time: '2016-11-16 11:22:34+00',
					  lrn_number: '50601',
					  ani: '9547652702',
					  dnis: '50601',
					  switch_ip: '158.69.203.19'
					},
					{
					  trunk_id_origination: 'vcom_DID_test',
					  orig_ip: '43.251.88.26',
					  start_time: '2016-11-16 11:22:34+00',
					  lrn_number: '50601',
					  ani: '9547652702',
					  dnis: '50601',
					  switch_ip: '158.69.203.19'
					},
					{
					  trunk_id_origination: 'vcom_DID_test',
					  orig_ip: '43.251.88.26',
					  start_time: '2016-11-16 11:22:34+00',
					  lrn_number: '50601',
					  ani: '9547652702',
					  dnis: '50601',
					  switch_ip: '158.69.203.19'
					},
					{
					  trunk_id_origination: 'vcom_DID_test',
					  orig_ip: '43.251.88.26',
					  start_time: '2016-11-16 11:22:34+00',
					  lrn_number: '50601',
					  ani: '9547652702',
					  dnis: '50601',
					  switch_ip: '158.69.203.19'
					},
					{
					  trunk_id_origination: 'vcom_DID_test',
					  orig_ip: '43.251.88.26',
					  start_time: '2016-11-16 11:22:34+00',
					  lrn_number: '50601',
					  ani: '9547652702',
					  dnis: '50601',
					  switch_ip: '158.69.203.19'
					}
			    ],
			    jobs: [
					{
					  job_id: '#75',
					  tiggered_time: '2017-01-04 08:20:31+00',
					  status: 'Done',
					  number_of_rows: '0',
					  file_size: 'Empty'
					},
					{
					  job_id: '#75',
					  tiggered_time: '2017-01-04 08:20:31+00',
					  status: 'Done',
					  number_of_rows: '0',
					  file_size: 'Empty'
					},
					{
					  job_id: '#75',
					  tiggered_time: '2017-01-04 08:20:31+00',
					  status: 'Query',
					  number_of_rows: '0',
					  file_size: '-'
					},
					{
					  job_id: '#75',
					  tiggered_time: '2017-01-04 08:20:31+00',
					  status: 'Done',
					  number_of_rows: '0',
					  file_size: 'Empty'
					},
					{
					  job_id: '#75',
					  tiggered_time: '2017-01-04 08:20:31+00',
					  status: 'Query',
					  number_of_rows: '0',
					  file_size: '-'
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
		},
		mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
		}
	}
</script>

<style>
</style>
