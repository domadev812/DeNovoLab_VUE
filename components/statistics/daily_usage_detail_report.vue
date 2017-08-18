<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single big_data">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Statistics</a></li>
				  <li class="breadcrumb-item active">Daily Usage Detail Report</li>
			</ol>
			<h1 class="page-header">Daily Usage Detail Report</h1>
			<tabs>
				<tab label="Origination" class="" icon="dnl_icon dnl_to_left" selected>
					<div class="advanced_search_filter_panel">
						<div class="col-md-2 col-sm-4">
							<label>Period:</label>
							<select2 :options="period_options" v-model="period">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="col-md-4 col-sm-8">
							<div class="inlined">
								<label for="start_date">Start Time:</label>
								<el-date-picker style="width: 100%;" type="datetime" v-model="start_date" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
							<div class="inlined">
								<label for="end-date">End Time:</label>
								<el-date-picker style="width: 100%;" type="datetime" v-model="end_date" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
						</div>
						<div class="col-md-2 col-sm-4">
							<label>GMT1:</label>
							<select class="selectable" v-model="gmt">
								<option v-for="item in gmt_options" v-bind:value="item.id">
									{{ item.text }}
								</option>
							</select>
						</div>
						<div class="col-md-2 col-sm-4">
							<label>Web:</label>
							<select2 :options="web_options" v-model="web">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="clearfix little-space"></div>
						<div class="col-md-12">
							<div class="white_pad m-bottom-10">
								<div class="row">
								<div class="col-md-4 col-sm-4">
									<label>Carriers:</label>
									<select class="selectable" v-model="ingress_carrier" @change="changeIngress">
										<option v-for="item in carrier_options" v-bind:value="item.id">
											{{ item.text }}
										</option>
									</select>
								</div>
								<div class="col-md-4 col-sm-4">
									<label>Ingress Trunk:</label>
									<select class="selectable" v-model="ingress_trunk">
										<option v-for="item in ingress_trunk_options" v-bind:value="item.id">
											{{ item.text }}
										</option>
									</select>
								</div>
								<div class="col-md-4 col-sm-4">
									<label>Tech Prefix:</label>
									<select2 :options="tech_prefix_options" v-model="tech_prefix">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="clearfix little-space"></div>
								<div class="col-md-4 col-sm-4">
									<label for="country">Country:</label>
									<input type="text" name="country" v-model="country" class="form-control" placeholder="Enter Country">
								</div>
								<div class="col-md-4 col-sm-4">
									<label for="code_name">Code Name:</label>
									<input type="text" name="code_name" v-model="code_name" class="form-control" placeholder="Enter Code Name">
								</div>
								<div class="col-md-4 col-sm-4">
									<label>Jurisdiction Type:</label>
									<select2 :options="jurisdiction_type_options" v-model="jurisdiction_type">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="clearfix little-space"></div>
								<div class="col-md-4 col-sm-4">
									<label>Routing Plan:</label>
									<select2 :options="route_plan_options" v-model="routing_plan">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-4">
									<label>Rate Table:</label>
									<select2 :options="rate_table_options" v-model="rate_table">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<!--
								<div class="col-md-4 col-sm-4">
									<label>Switch Server:</label>
									<select2 :options="options" v-model="switch_server">
										<option disabled value="0">Select one</option>
									</select2>
								</div>  -->
								<div class="clearfix"></div>
								</div>
							</div>
						</div>
						<div class="clearfix"></div>
						<div class="col-md-12 col-sm-12">
							<div class="white_pad less_pad">
								<div class="col-md-2 col-sm-4">
									<label class="m-top-10">Group by #1:</label>
									<select2 :options="group_by_1_options" v-model="group_by1">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-2 col-sm-4">
									<label class="m-top-10">Group by #2:</label>
									<select2 :options="group_by_2_options" v-model="group_by2">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-2 col-sm-4">
									<label class="m-top-10">Group by #3:</label>
									<select2 :options="group_by_options" v-model="group_by3">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-2 col-sm-4">
									<label class="m-top-10">Group by #4:</label>
									<select2 :options="group_by_options" v-model="group_by4">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-2 col-sm-4">
									<label class="m-top-10">Group by #5:</label>
									<select2 :options="group_by_options" v-model="group_by5">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-2 col-sm-4">
									<label class="m-top-10">Group by #6:</label>
									<select2 :options="group_by_options" v-model="group_by6">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="clearfix"></div>
							</div>
							<div class="button_set">
								<a class="btn btn-primary"  v-on:click="searchDailyReport()">
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
								<th rowspan="2" colspan="1">Ingress Carrier</th>
								<th rowspan="2" colspan="1">Ingress Trunk</th>
								<th rowspan="2" colspan="1">Not Zero Calls</th>
								<th rowspan="2" colspan="1">Total(Min)</th>
								<th colspan="2" rowspan="1">Calls &lt; 30s</th>
								<th colspan="2" rowspan="1">Calls &lt;= 6s</th>
								<th colspan="3" rowspan="1">2016-01-01</th>
							</tr>
                            <tr>
								<th rowspan="1" colspan="1">Count</th>
								<th rowspan="1" colspan="1">%</th>
								<th rowspan="1" colspan="1">Count</th>
								<th rowspan="1" colspan="1">%</th>
								<th rowspan="1" colspan="1">Billed Time (min)</th>
								<th rowspan="1" colspan="1">ASR (%)</th>
								<th rowspan="1" colspan="1">ACD (min)</th>
							</tr>
						  </thead>
						  <tbody>
							<tr v-for="ingress in ingresses">
							  <td>{{ingress.ingress_carrier}}</td>
							  <td>{{ingress.ingress_trunk}}</td>
							  <td>{{ingress.not_zero_calls}}</td>
							  <td>{{ingress.total}}</td>
							  <td>{{ingress.calls_30_count}}</td>
							  <td>{{ingress.calls_30_percent}}</td>
							  <td>{{ingress.calls_6_count}}</td>
							  <td>{{ingress.calls_6_percent}}</td>
							  <td>{{ingress.billed_time}}</td>
							  <td>{{ingress.asr}}</td>
							  <td>{{ingress.acd}}</td>
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
				<tab label="Termination" class="" icon="dnl_icon dnl_to_right">
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
									<label>Jurisdiction Type:</label>
									<select2 :options="options" v-model="ingress_trunk">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-4 col-sm-4">
									<label for="country">Code:</label>
									<input type="text" name="code" v-model="code" class="form-control" placeholder="Enter Code">
								</div>
								<div class="clearfix little-space"></div>
								<div class="col-md-4 col-sm-4">
									<label for="country">Country:</label>
									<input type="text" name="country" v-model="country" class="form-control" placeholder="Enter Country">
								</div>
								<div class="col-md-4 col-sm-4">
									<label for="code_name">Code Name:</label>
									<input type="text" name="code_name" v-model="code_name" class="form-control" placeholder="Enter Code Name">
								</div>
								<div class="col-md-4 col-sm-4">
									<label>Egress Trunk:</label>
									<select2 :options="options" v-model="egress_trunk">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="clearfix little-space"></div>
								<!-- 
								<div class="col-md-4 col-sm-4">
									<label>Switch Server:</label>
									<select2 :options="options" v-model="switch_server">
										<option disabled value="0">Select one</option>
									</select2>
								</div>  -->
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
						<div class="inline-block fix_medium_select">
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
								<th rowspan="2" colspan="1">Egress Carrier</th>
								<th rowspan="2" colspan="1">Egress Trunk</th>
								<th rowspan="2" colspan="1">Not Zero Calls</th>
								<th rowspan="2" colspan="1">Total(Min)</th>
								<th colspan="2" rowspan="1">Calls &lt; 30s</th>
								<th colspan="2" rowspan="1">Calls &lt;= 6s</th>
								<th colspan="3" rowspan="1">2016-01-01</th>
							</tr>
                            <tr>
								<th rowspan="1" colspan="1">Count</th>
								<th rowspan="1" colspan="1">%</th>
								<th rowspan="1" colspan="1">Count</th>
								<th rowspan="1" colspan="1">%</th>
								<th rowspan="1" colspan="1">Billed Time (min)</th>
								<th rowspan="1" colspan="1">ASR (%)</th>
								<th rowspan="1" colspan="1">ACD (min)</th>
							</tr>
						  </thead>
						  <tbody>
							<tr v-for="egress in egresses">
							  <td>{{egress.egress_carrier}}</td>
							  <td>{{egress.egress_trunk}}</td>
							  <td>{{egress.not_zero_calls}}</td>
							  <td>{{egress.total}}</td>
							  <td>{{egress.calls_30_count}}</td>
							  <td>{{egress.calls_30_percent}}</td>
							  <td>{{egress.calls_6_count}}</td>
							  <td>{{egress.calls_6_percent}}</td>
							  <td>{{egress.billed_time}}</td>
							  <td>{{egress.asr}}</td>
							  <td>{{egress.acd}}</td>
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
				<tab label="Daily Origination" class="" icon="dnl_icon dnl_to_left">
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
						<div class="col-md-2 col-sm-4">
							<a class="btn btn-primary m-top-25 full-width">
								Query
							</a>
						</div>
						<div class="clearfix"></div>
					</div>
					<div class="clearfix"></div>
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
					<span class="table_time chart_time margin_0">
						09/23/2016 17:34:52 +0000
					</span>
					<div class="clearfix"></div>
					<div class="table-responsive">
						<table class="table table-striped table-hover carrier_groups centrum">
						  <thead>
                              <tr>
								  <th rowspan="2" colspan="1">Client Name</th>
								  <th rowspan="1" colspan="2">2017-02-02</th>
							  </tr>
							  <tr>
								  <th rowspan="1" colspan="1">Duration</th>
								  <th rowspan="1" colspan="1">Billable Time</th>
							  </tr>
						  </thead>
						  <tbody>
							<tr v-for="origination in daily_originations">
							  <td>{{origination.client_name}}</td>
							  <td>{{origination.duration}}</td>
							  <td>{{origination.billable_time}}</td>
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
				<tab label="Daily Termination" class="" icon="dnl_icon dnl_to_right">
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
						<div class="col-md-2 col-sm-4">
							<a class="btn btn-primary m-top-25 full-width">
								Query
							</a>
						</div>
						<div class="clearfix"></div>
					</div>
					<div class="clearfix"></div>
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
					<span class="table_time chart_time margin_0">
						09/23/2016 17:34:52 +0000
					</span>
					<div class="clearfix"></div>
					<div class="table-responsive">
						<table class="table table-striped table-hover carrier_groups centrum">
						  <thead>
                              <tr>
								  <th rowspan="2" colspan="1">Client Name</th>
								  <th rowspan="1" colspan="2">2017-02-02</th>
							  </tr>
							  <tr>
								  <th rowspan="1" colspan="1">Duration</th>
								  <th rowspan="1" colspan="1">Billable Time</th>
							  </tr>
						  </thead>
						  <tbody>
							<tr v-for="termination in daily_terminations">
							  <td>{{termination.client_name}}</td>
							  <td>{{termination.duration}}</td>
							  <td>{{termination.billable_time}}</td>
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
		  const api = require("../../api");
	module.exports = {
		components: {
			'tabs': vTabs,
			'tab': vTab,
			'select2': vSelect,
			'pagination': Pagination
		},
		data: function(){
            return {
				group_by_options: [
					{ id: '', text: '' },
					{ id: 'ingress Country', text: 'ingress Country' },
					{ id: 'ingress Code Name', text: 'ingress Code Name' },
					{ id: 'egress Carrier', text: 'egress Carrier' },
					{ id: 'Egress Trunk', text: 'Egress Trunk' },
					{ id: 'egress Country', text: 'egress Country' },
					{ id: 'egress Code Name', text: 'egress Code Name' },
				],
				group_by_2_options: [
					{ id: 'Ingress Trunk', text: 'Ingress Trunk' },
				],
				group_by_1_options: [
					{ id: 'ingress Carrier', text: 'ingress Carrier' },
				],
				tech_prefix: 'All',
				tech_prefix_options: [
					{ id: 'All', text: 'All' },
				],
				route_plan_options: [],
				rate_table_options: [],
				jurisdiction_type: 'All',
				jurisdiction_type_options: [
					{ id: 'All', text: 'All' },
					{ id: 'A-Z', text: 'A-Z' },
					{ id: 'US NON-JD', text: 'US NON-JD' },
					{ id: 'US JD', text: 'US JD' },
					{ id: 'OCN-LATA-JD', text: 'OCN-LATA-JD' },
					{ id: 'OCN-LATA-NON-JD', text: 'OCN-LATA-NON-JD' },
				],
				ingress_trunk_options: [],
				egress_trunk_options: [],
				carrier_options: [],
				web_options: [
					{ id: 'web', text: 'Web' },
					{ id: 'excel_csv', text: 'Excel CSV' },
					{ id: 'email_when_done', text: 'Email when done' },
					{ id: 'export_from_storage', text: 'Export from Storage' },
				],
				period_options: [
					{id: 'Custom', text: 'Custom'},
					{id: 'Today', text: 'Today'},
					{id: 'Yesterday', text: 'Yesterday'},
					{id: 'Current week', text: 'Current week'},
					{id: 'Previous week', text: 'Previous week'},
					{id: 'Current month', text: 'Current month'},
					{id: 'Previous month', text: 'Previous month'},
				],
				gmt: 13,
				gmt_options: [
					{ id: 1, text: 'GMT -12:00' },
					{ id: 2, text: 'GMT -11:00' },
					{ id: 3, text: 'GMT -10:00' },
					{ id: 4, text: 'GMT -9:00' },
					{ id: 5, text: 'GMT -8:00' },
					{ id: 6, text: 'GMT -7:00' },
					{ id: 7, text: 'GMT -6:00' },
					{ id: 8, text: 'GMT -5:00' },
					{ id: 9, text: 'GMT -4:00' },
					{ id: 10, text: 'GMT -3:00' },
					{ id: 11, text: 'GMT -2:00' },
					{ id: 12, text: 'GMT -1:00' },
					{ id: 13, text: 'GMT +0:00' },
					{ id: 14, text: 'GMT +1:00' },
					{ id: 15, text: 'GMT +2:00' },
					{ id: 16, text: 'GMT +3:00' },
					{ id: 17, text: 'GMT +4:00' },
					{ id: 18, text: 'GMT +5:00' },
					{ id: 19, text: 'GMT +6:00' },
					{ id: 20, text: 'GMT +7:00' },
					{ id: 21, text: 'GMT +8:00' },
					{ id: 22, text: 'GMT +9:00' },
					{ id: 23, text: 'GMT +10:00' },
					{ id: 24, text: 'GMT +11:00' },
					{ id: 25, text: 'GMT +12:00' },
				],
				tmpPageOne: {
					currentPage: 0,
					totalPages: 10,
					cntPerPage: 30,
				},
				pageOne: {
					currentPage: 1,
					totalPages: 10
				},
				route_types: [
				  { id: 1, text: 'Fail to Next Host' },
				  { id: 2, text: 'Fail to Next Trunk' },
				  { id: 3, text: 'Stop' },
			  	],
				orgination_search_field: ['non_zero_calls', 'ingress_billed_time', 'non_zero_calls_30', 'non_zero_calls_6', 'ingress_billed_time'],
				rate_table: 'All',
				period: 'Custom',
				carriers: '',
				start_date: '',
				end_date: '',
				by_hours: '',
				web: 'web',
				code: '',
				carrirers: '',
				ingress_trunk: '',
				tech_prefix: '',
				country: '',
				code_name: '',
				routing_plan: 'All',
				egress_trunk: '',
				rate_type: '',
				switch_server: '',
				group_by1: 'ingress Carrier',
				group_by2: 'Ingress Trunk',
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
				ingresses: [
					{
					  ingress_carrier: 'Ingress Carrier',
					  ingress_trunk: 'Ingress Trunk',
					  not_zero_calls: '12',
					  total: '35',
					  calls_30_count: '19',
					  calls_30_percent: '2%',
					  calls_6_count: '9',
					  calls_6_percent: '34%',
					  billed_time: '200',
					  asr: '75',
					  acd: '46'
					},
					{
					  ingress_carrier: 'Ingress Carrier',
					  ingress_trunk: 'Ingress Trunk',
					  not_zero_calls: '12',
					  total: '35',
					  calls_30_count: '19',
					  calls_30_percent: '2%',
					  calls_6_count: '9',
					  calls_6_percent: '34%',
					  billed_time: '200',
					  asr: '75',
					  acd: '46'
					},
					{
					  ingress_carrier: 'Ingress Carrier',
					  ingress_trunk: 'Ingress Trunk',
					  not_zero_calls: '12',
					  total: '35',
					  calls_30_count: '19',
					  calls_30_percent: '2%',
					  calls_6_count: '9',
					  calls_6_percent: '34%',
					  billed_time: '200',
					  asr: '75',
					  acd: '46'
					},
					{
					  ingress_carrier: 'Ingress Carrier',
					  ingress_trunk: 'Ingress Trunk',
					  not_zero_calls: '12',
					  total: '35',
					  calls_30_count: '19',
					  calls_30_percent: '2%',
					  calls_6_count: '9',
					  calls_6_percent: '34%',
					  billed_time: '200',
					  asr: '75',
					  acd: '46'
					},
					{
					  ingress_carrier: 'Ingress Carrier',
					  ingress_trunk: 'Ingress Trunk',
					  not_zero_calls: '12',
					  total: '35',
					  calls_30_count: '19',
					  calls_30_percent: '2%',
					  calls_6_count: '9',
					  calls_6_percent: '34%',
					  billed_time: '200',
					  asr: '75',
					  acd: '46'
					},
					{
					  ingress_carrier: 'Ingress Carrier',
					  ingress_trunk: 'Ingress Trunk',
					  not_zero_calls: '12',
					  total: '35',
					  calls_30_count: '19',
					  calls_30_percent: '2%',
					  calls_6_count: '9',
					  calls_6_percent: '34%',
					  billed_time: '200',
					  asr: '75',
					  acd: '46'
					}
			    ],
			    egresses: [
					{
					  egress_carrier: 'Ingress Carrier',
					  egress_trunk: 'Ingress Trunk',
					  not_zero_calls: '12',
					  total: '35',
					  calls_30_count: '19',
					  calls_30_percent: '2%',
					  calls_6_count: '9',
					  calls_6_percent: '34%',
					  billed_time: '200',
					  asr: '75',
					  acd: '46'
					},
					{
					  egress_carrier: 'Ingress Carrier',
					  egress_trunk: 'Ingress Trunk',
					  not_zero_calls: '12',
					  total: '35',
					  calls_30_count: '19',
					  calls_30_percent: '2%',
					  calls_6_count: '9',
					  calls_6_percent: '34%',
					  billed_time: '200',
					  asr: '75',
					  acd: '46'
					},
					{
					  egress_carrier: 'Ingress Carrier',
					  egress_trunk: 'Ingress Trunk',
					  not_zero_calls: '12',
					  total: '35',
					  calls_30_count: '19',
					  calls_30_percent: '2%',
					  calls_6_count: '9',
					  calls_6_percent: '34%',
					  billed_time: '200',
					  asr: '75',
					  acd: '46'
					},
					{
					  egress_carrier: 'Ingress Carrier',
					  egress_trunk: 'Ingress Trunk',
					  not_zero_calls: '12',
					  total: '35',
					  calls_30_count: '19',
					  calls_30_percent: '2%',
					  calls_6_count: '9',
					  calls_6_percent: '34%',
					  billed_time: '200',
					  asr: '75',
					  acd: '46'
					},
					{
					  egress_carrier: 'Ingress Carrier',
					  egress_trunk: 'Ingress Trunk',
					  not_zero_calls: '12',
					  total: '35',
					  calls_30_count: '19',
					  calls_30_percent: '2%',
					  calls_6_count: '9',
					  calls_6_percent: '34%',
					  billed_time: '200',
					  asr: '75',
					  acd: '46'
					},
					{
					  egress_carrier: 'Ingress Carrier',
					  egress_trunk: 'Ingress Trunk',
					  not_zero_calls: '12',
					  total: '35',
					  calls_30_count: '19',
					  calls_30_percent: '2%',
					  calls_6_count: '9',
					  calls_6_percent: '34%',
					  billed_time: '200',
					  asr: '75',
					  acd: '46'
					}
			    ],
				daily_originations: [
					{
					  client_name: 'Client Name',
					  duration: '0',
					  billable_time: '0'
					},
					{
					  client_name: 'Client Name',
					  duration: '0',
					  billable_time: '0'
					},
					{
					  client_name: 'Client Name',
					  duration: '0',
					  billable_time: '0'
					},
					{
					  client_name: 'Client Name',
					  duration: '0',
					  billable_time: '0'
					},
					{
					  client_name: 'Client Name',
					  duration: '0',
					  billable_time: '0'
					}
			    ],
				daily_terminations: [
					{
					  client_name: 'Client Name',
					  duration: '0',
					  billable_time: '0'
					},
					{
					  client_name: 'Client Name',
					  duration: '0',
					  billable_time: '0'
					},
					{
					  client_name: 'Client Name',
					  duration: '0',
					  billable_time: '0'
					},
					{
					  client_name: 'Client Name',
					  duration: '0',
					  billable_time: '0'
					},
					{
					  client_name: 'Client Name',
					  duration: '0',
					  billable_time: '0'
					}
			    ]
			}
        },
		methods: {
			fetchRoutePlans() {
				const url = api.getEndpointUrl() + '/v1/route/plan/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const route_plans = body.payload.items
						var self = this;
						this.route_plan_options = [];
						this.route_plan_options.push('All');
						route_plans.forEach(function (temp, i) {
							var route_plan = {};
							route_plan.id = temp.route_plan_id;
							route_plan.text = temp.name;
							self.route_plan_options.push(route_plan);
						});
						console.log(this.route_plan_options);
						
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			fetchRateTable () {
				const url = api.getEndpointUrl() + '/v1/switch/rate_table/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const rate_tables = body.payload.items
						var self = this;
						this.rate_table_options = [];
						this.rate_table_options.push('All');
						rate_tables.forEach(function (temp, i) {
							var rate_table = {};
							rate_table.id = temp.rate_table_id;
							rate_table.text = temp.name;
							self.rate_table_options.push(rate_table);
						});
						console.log(this.rate_table_options);
						
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			fetchAllTrunks (type) {
				var url;
				if(type == 'egress')
					url = api.getEndpointUrl() + '/v1/trunk/egress/list';
				else if(type == 'ingress')
					url = api.getEndpointUrl() + '/v1/trunk/ingress/list';
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const trunks = body.payload.items
						console.log(trunks);
						var self = this;
						if(type == 'egress') {
							this.egress_trunk_options = [];
							this.egress_trunk_options.push('');
							trunks.forEach(function (temp, i) {
								var trunk = {};
								trunk.id = temp.resource_id;
								trunk.text = temp.name;
								self.egress_trunk_options.push(trunk);
							});
						}
						else if(type == 'ingress') {
							this.ingress_trunk_options = [];
							this.ingress_trunk_options.push('');
							trunks.forEach(function (temp, i) {
								var trunk = {};
								trunk.id = temp.resource_id;
								trunk.text = temp.name;
								self.ingress_trunk_options.push(trunk);
							});
						}
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			fetchCarriers() {
				this.loading = true;
				var url;
				if(this.tmpPageOne.currentPage === 0)
					url = api.getEndpointUrl() + "/v1/carrier/list"
				else
					url = api.getEndpointUrl() + "/v1/carrier/list?page=" + this.tmpPageOne.currentPage
				console.log(url);
				this.$http.get(url)
					.then(response => {
						const body = response.body
						if (body.success) {
							var self = this;
							this.loading = false;
							const payload = body.payload
							var carriers = payload.items;
							if(this.tmpPageOne.currentPage === 0)
								this.carrier_options.push('');
							carriers.forEach(function (temp, i) {
								var carrier = {};
								carrier.id = temp.client_id;
								carrier.text = temp.name;
								self.carrier_options.push(carrier);
							});
							this.tmpPageOne.currentPage = payload.page + 1
							this.tmpPageOne.totalPages = Math.ceil(payload.total / payload.per_page)
							this.tmpPageOne.cntPerPage = payload.per_page;

							if(this.tmpPageOne.totalPages > this.tmpPageOne.currentPage)
								this.fetchCarriers();
							
							console.log(this.carrier_options);
						}
					})
					.catch(error => {
						console.log(error)
						this.loading = false;
					})
			},
			toggleTable(event) {
				var element = event.currentTarget;
				$(element).parents('tr').siblings('.collapse').toggleClass('in');
			},
			pageOneChanged (pageNum) {
				this.pageOne.currentPage = pageNum
			},
						
			fetchDailyReport: function(start_time = 1478736000, end_time = 1478739600, step = 1440, method = 'total', field = 'non_zero_calls', group = 'ingress_id')
			{				
				this.loading = true;
				console.log("Getting Daily Usage Lists");				
				var page = this.pageOne.currentPage - 1;
				var per_page = this.pageOne.cntpage;								
								
				var strURL = api.getReport_URL() + "?start_time=" + startTime + "&end_time=" + endTime + "&step=" + step + "&method=" + method + "&field=" + field + "&group=" + group;															
				var authToken = "Token Yuza2L2rlGkdemBeYzL0SVncFafTjYNFSMpShsJT614inGMLDf";				
				this.$http.get(strURL,
				{
					headers: {
						"Authorization": authToken						
					}
				}).then(function(response) {
												
				}, function(error) {					
					
				});			
			},
			searchDailyReport: function()
			{
				var startTime = new Date(this.start_date).getTime() / 1000;				
				var endTime = new Date(this.end_date).getTime() / 1000;				
			}
		},
		created() {
			this.fetchCarriers();
			this.fetchAllTrunks('egress');
			this.fetchAllTrunks('ingress');
			this.fetchRateTable();
			this.fetchRoutePlans();
			this.fetchDailyReport();
		}
	}
</script>

<style>
	.wrapper.single .white_pad.m-bottom-10 {
		margin-bottom: 10px;
	}
</style>
