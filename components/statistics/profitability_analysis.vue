<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single big_data">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Statistics</a></li>
				  <li class="breadcrumb-item active">Profitability Analysis</li>
			</ol>
			<h1 class="page-header">Profitability Analysis</h1>
			<spinner v-show="loading" class="spinner"></spinner>
			<tabs @activateTab="changeTab">
				<tab label="Origination" class="" icon="dnl_icon dnl_to_left" selected>
					<div class="advanced_search_filter_panel">
						<div class="col-md-2 col-sm-4">
							<label>Period:</label>
							<select2 :options="period_options" v-model="time">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="col-md-4 col-sm-8">
							<div class="inlined" >
								<label for="start_date">Start Time:</label>
								<el-date-picker style="width: 100%;" type="datetime" v-model="start_date" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
							<div class="inlined">
								<label for="end-date">End Time:</label>
								<el-date-picker style="width: 100%;" type="datetime" v-model="end_date" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
						</div>
						<div class="col-md-6 col-sm-12 none-left-padding none-right-padding">
							<div class="inlined">
								<div class="col-md-4 col-sm-4 no-min-width">
									<label>GMT:</label>
									<select class="selectable" v-model="gmt">
										<option v-for="item in gmt_options" v-bind:value="item.id">
											{{ item.text }}
										</option>
									</select>
								</div>
								<div class="col-md-4 col-sm-4">
									<label>By Hours:</label>
									<select2 :options="by_hour_options" v-model="by_hours">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-4 col-sm-4">
									<label>Web:</label>
									<select2 :options="web_options" v-model="web">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
							</div>
							<div class="inlined">
								<div class="col-md-4 col-sm-4">
									<a class="btn btn-primary full-width m-top-20" v-on:click="searchReport()">
										Query
									</a>
								</div>
								<!--
								<div class="col-md-4 col-sm-4">
									<a class="btn btn-primary full-width m-top-20"  v-on:click="showAdvanced()">
										{{more_advanced_option_button}}
									</a>
								</div> -->
								<div class="clearfix"></div>
							</div>
						</div>
						<div class="clearfix little-space"></div>
						<div class = "inlined" v-show="more_advanced_option" >
						<div class="col-md-6 col-sm-6">
							<div class="white_pad less_pad">
								<h1 class="page-header">Inbound</h1>
								<div class="row">
								<div class="col-md-6 first">
									<label>Carriers:</label>				
									<select class="selectable no-min-width" v-model="ingress_carrier" @change="changeIngress">
										<option v-for="item in carrier_options" v-bind:value="item.id">
											{{ item.text }}
										</option>
									</select>									
								</div>
								<div class="col-md-6 second">
									<label>Ingress Trunk:</label>
									<select class="selectable no-min-width" v-model="ingress_trunk">
										<option v-for="item in ingress_trunk_options" v-bind:value="item.id">
											{{ item.text }}
										</option>
									</select>
								</div>
								<div class="clearfix little-space"></div>								
								<div class="col-md-6 first">
									<label for="country">Country:</label>
									<input type="text" name="country" v-model="country" class="form-control" placeholder="Enter Country">
								</div>
								<div class="col-md-6 second">
									<label for="code_name">Origination ANI:</label>
									<input type="text" name="origination_ani" v-model="ani" class="form-control" placeholder="Enter Origination ANI">
								</div>	
								<div class="clearfix little-space"></div>																
								<div class="col-md-6 first">
									<label for="code_name">Origination DNIS:</label>
									<input type="text" name="origination_dnis" v-model="dnis" class="form-control" placeholder="Enter Origination DNIS">
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
										<select class="selectable no-min-width" v-model="egress_carrier" @change="changeEgress">
											<option v-for="item in carrier_options" v-bind:value="item.id">
												{{ item.text }}
											</option>
										</select>
									</div>
									<div class="col-md-6 second">
										<label>Egress Trunk:</label>
										<select class="selectable no-min-width" v-model="egress_trunk">
											<option v-for="item in egress_trunk_options" v-bind:value="item.id">
												{{ item.text }}
											</option>
										</select>
									</div>								
									<div class="clearfix"></div>								
								</div>
							</div>
						</div>
						<div class="clearfix"></div>
						<div class="col-md-12 col-sm-12">
							<div class="white_pad less_pad">
								<div class="col-md-4 col-sm-6">
									<div class="col-md-4 col-sm-5 m-top-10 group-label"><label class="m-top-10">Group by #1:</label></div>
									<div class="col-md-8 col-sm-7 m-top-10 none-left-padding">
										<select class="selectable no-min-width" v-model="group_by1">
											<option v-for="item in group_options" v-bind:value="item.value">
												{{ item.text }}
											</option>
										</select>										
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="col-md-4 col-sm-5 m-top-10 group-label"><label class="m-top-10">Group by #2:</label></div>
									<div class="col-md-8 col-sm-7 m-top-10 none-left-padding">
										<select class="selectable no-min-width" v-model="group_by2">
											<option v-for="item in group_options" v-bind:value="item.value">
												{{ item.text }}
											</option>
										</select>										
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="col-md-4 col-sm-5 m-top-10 group-label"><label class="m-top-10">Group by #3:</label></div>
									<div class="col-md-8 col-sm-7 m-top-10 none-left-padding">
										<select class="selectable no-min-width" v-model="group_by3">
											<option v-for="item in group_options" v-bind:value="item.value">
												{{ item.text }}
											</option>
										</select>										
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="col-md-4 col-sm-5 m-top-10 group-label"><label class="m-top-10">Group by #4:</label></div>
									<div class="col-md-8 col-sm-7 m-top-10 none-left-padding">
										<select class="selectable no-min-width" v-model="group_by4">
											<option v-for="item in group_options" v-bind:value="item.value">
												{{ item.text }}
											</option>
										</select>										
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="col-md-4 col-sm-5 m-top-10 group-label"><label class="m-top-10">Group by #5:</label></div>
									<div class="col-md-8 col-sm-7 m-top-10 none-left-padding">
										<select class="selectable no-min-width" v-model="group_by5">
											<option v-for="item in group_options" v-bind:value="item.value">
												{{ item.text }}
											</option>
										</select>										
									</div>
								</div>								
								<div class="clearfix"></div>
							</div>
						</div>
						<div class="clearfix"></div>
						</div>
					</div>
					<div class="table_filters pull-right">
						<div class="inline-block select_min_wrapper">
							<span class="inline-block">Page row:</span>
							<select2 :options="page_rows" v-model="page_row_count" class="inline-block" @pagecount="changePageCount">
							</select2>
						</div>
						<div class="inline-block">							
							<el-select v-model="plan_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
								<el-option v-for="item in show_field_options" :key="item.value" :label="item.text" :value="item.value">
								</el-option>
							</el-select>
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
								<th rowspan="2" colspan="1">Ingress Trunk</th>
								<th rowspan="1" colspan="2">Call Duration</th>
								<th rowspan="1" colspan="2">Profit</th>
								<th rowspan="1" colspan="2">Calls</th>
								<th rowspan="2" colspan="1">Ingress Cost</th>
								<th rowspan="2" colspan="1">Egress Cost</th>
								<th rowspan="2" colspan="1">NPR Count</th>
								<th rowspan="2" colspan="1">NPR</th>
							</tr>
							<tr>
								<th rowspan="1" colspan="1">min</th>
								<th rowspan="1" colspan="1">%</th>
								<th rowspan="1" colspan="1">USD</th>
								<th rowspan="1" colspan="1">%</th>
								<th rowspan="1" colspan="1">Total</th>
								<th rowspan="1" colspan="1">Not Zero</th>								
							</tr>
						  </thead>
						  <tbody>		
							<tr v-if="!filterBy(originations, report).length">
								<td style="text-align: center" colspan="15">No Data Found</td>
							</tr>						  
							<tr v-for="report in originations">
							  <td></td>
							  <td>{{report.ingress_billed_time}}</td>
							  <td>{{report.bill_percent}}</td>
							  <td>{{report.profit}}</td>
							  <td>{{report.profit_percent}}</td>
							  <td>{{report.ingress_calls}}</td>
							  <td>{{report.non_zero_calls}}</td>							  
							  <td>{{report.ingress_cost}}</td>
							  <td>{{report.egress_cost}}</td>
							  <td>{{report.npr_calls}}</td>
							  <td>{{report.npr}}</td>
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
							<select2 :options="period_options" v-model="time">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="col-md-4 col-sm-8">
							<div class="inlined" >
								<label for="start_date">Start Time:</label>
								<el-date-picker style="width: 100%;" type="datetime" v-model="start_date" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
							<div class="inlined">
								<label for="end-date">End Time:</label>
								<el-date-picker style="width: 100%;" type="datetime" v-model="end_date" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
						</div>
						<div class="col-md-6 col-sm-12 none-left-padding none-right-padding">
							<div class="inlined">
								<div class="col-md-4 col-sm-4 no-min-width">
									<label>GMT:</label>
									<select class="selectable" v-model="gmt">
										<option v-for="item in gmt_options" v-bind:value="item.id">
											{{ item.text }}
										</option>
									</select>
								</div>
								<div class="col-md-4 col-sm-4">
									<label>By Hours:</label>
									<select2 :options="by_hour_options" v-model="by_hours">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-4 col-sm-4">
									<label>Web:</label>
									<select2 :options="web_options" v-model="web">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
							</div>
							<div class="inlined">
								<div class="col-md-4 col-sm-4">
									<a class="btn btn-primary full-width m-top-20" v-on:click="searchReport()">
										Query
									</a>
								</div>
								<!--
								<div class="col-md-4 col-sm-4">
									<a class="btn btn-primary full-width m-top-20"  v-on:click="showAdvanced()">
										{{more_advanced_option_button}}
									</a>
								</div> -->
								<div class="clearfix"></div>
							</div>
						</div>
						<div class="clearfix little-space"></div>
						<div class = "inlined" v-show="more_advanced_option" >
						<div class="col-md-6 col-sm-6">
							<div class="white_pad less_pad">
								<h1 class="page-header">Inbound</h1>
								<div class="row">
								<div class="col-md-6 first">
									<label>Carriers:</label>				
									<select class="selectable no-min-width" v-model="ingress_carrier" @change="changeIngress">
										<option v-for="item in carrier_options" v-bind:value="item.id">
											{{ item.text }}
										</option>
									</select>									
								</div>
								<div class="col-md-6 second">
									<label>Ingress Trunk:</label>
									<select class="selectable no-min-width" v-model="ingress_trunk">
										<option v-for="item in ingress_trunk_options" v-bind:value="item.id">
											{{ item.text }}
										</option>
									</select>
								</div>
								<div class="clearfix little-space"></div>								
								<div class="col-md-6 first">
									<label for="country">Country:</label>
									<input type="text" name="country" v-model="country" class="form-control" placeholder="Enter Country">
								</div>
								<div class="col-md-6 second">
									<label for="code_name">Origination ANI:</label>
									<input type="text" name="origination_ani" v-model="ani" class="form-control" placeholder="Enter Origination ANI">
								</div>	
								<div class="clearfix little-space"></div>																
								<div class="col-md-6 first">
									<label for="code_name">Origination DNIS:</label>
									<input type="text" name="origination_dnis" v-model="dnis" class="form-control" placeholder="Enter Origination DNIS">
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
										<select class="selectable no-min-width" v-model="egress_carrier" @change="changeEgress">
											<option v-for="item in carrier_options" v-bind:value="item.id">
												{{ item.text }}
											</option>
										</select>
									</div>
									<div class="col-md-6 second">
										<label>Egress Trunk:</label>
										<select class="selectable no-min-width" v-model="egress_trunk">
											<option v-for="item in egress_trunk_options" v-bind:value="item.id">
												{{ item.text }}
											</option>
										</select>
									</div>								
									<div class="clearfix"></div>								
								</div>
							</div>
						</div>
						<div class="clearfix"></div>
						<div class="col-md-12 col-sm-12">
							<div class="white_pad less_pad">
								<div class="col-md-4 col-sm-6">
									<div class="col-md-4 col-sm-5 m-top-10 group-label"><label class="m-top-10">Group by #1:</label></div>
									<div class="col-md-8 col-sm-7 m-top-10 none-left-padding">
										<select class="selectable no-min-width" v-model="group_by1">
											<option v-for="item in group_options" v-bind:value="item.value">
												{{ item.text }}
											</option>
										</select>										
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="col-md-4 col-sm-5 m-top-10 group-label"><label class="m-top-10">Group by #2:</label></div>
									<div class="col-md-8 col-sm-7 m-top-10 none-left-padding">
										<select class="selectable no-min-width" v-model="group_by2">
											<option v-for="item in group_options" v-bind:value="item.value">
												{{ item.text }}
											</option>
										</select>										
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="col-md-4 col-sm-5 m-top-10 group-label"><label class="m-top-10">Group by #3:</label></div>
									<div class="col-md-8 col-sm-7 m-top-10 none-left-padding">
										<select class="selectable no-min-width" v-model="group_by3">
											<option v-for="item in group_options" v-bind:value="item.value">
												{{ item.text }}
											</option>
										</select>										
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="col-md-4 col-sm-5 m-top-10 group-label"><label class="m-top-10">Group by #4:</label></div>
									<div class="col-md-8 col-sm-7 m-top-10 none-left-padding">
										<select class="selectable no-min-width" v-model="group_by4">
											<option v-for="item in group_options" v-bind:value="item.value">
												{{ item.text }}
											</option>
										</select>										
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="col-md-4 col-sm-5 m-top-10 group-label"><label class="m-top-10">Group by #5:</label></div>
									<div class="col-md-8 col-sm-7 m-top-10 none-left-padding">
										<select class="selectable no-min-width" v-model="group_by5">
											<option v-for="item in group_options" v-bind:value="item.value">
												{{ item.text }}
											</option>
										</select>										
									</div>
								</div>								
								<div class="clearfix"></div>
							</div>
						</div>
						<div class="clearfix"></div>
						</div>
					</div>
					<div class="table_filters pull-right">
						<div class="inline-block select_min_wrapper">
							<span class="inline-block">Page row:</span>
							<select2 :options="page_rows" v-model="page_row_count" class="inline-block" @pagecount="changePageCount">
							</select2>
						</div>
						<div class="inline-block">							
							<el-select v-model="plan_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
								<el-option v-for="item in show_field_options" :key="item.value" :label="item.text" :value="item.value">
								</el-option>
							</el-select>
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
								<th rowspan="2" colspan="1">Egress Trunk</th>
								<th rowspan="1" colspan="2">Call Duration</th>
								<th rowspan="1" colspan="2">Profit</th>
								<th rowspan="1" colspan="2">Calls</th>
								<th rowspan="2" colspan="1">Ingress Cost</th>
								<th rowspan="2" colspan="1">Egress Cost</th>
								<th rowspan="2" colspan="1">NPR Count</th>
								<th rowspan="2" colspan="1">NPR</th>
							</tr>
							<tr>
								<th rowspan="1" colspan="1">min</th>
								<th rowspan="1" colspan="1">%</th>
								<th rowspan="1" colspan="1">USD</th>
								<th rowspan="1" colspan="1">%</th>
								<th rowspan="1" colspan="1">Total</th>
								<th rowspan="1" colspan="1">Not Zero</th>								
							</tr>
						  </thead>
						  <tbody>
							<tr v-if="!filterBy(terminations, report).length">
								<td style="text-align: center" colspan="15">No Data Found</td>
							</tr>
							<tr v-for="report in terminations">
							  <td></td>
							  <td>{{report.egress_billed_time}}</td>
							  <td>{{report.bill_percent}}</td>
							  <td>{{report.profit}}</td>
							  <td>{{report.profit_percent}}</td>
							  <td>{{report.egress_calls}}</td>
							  <td>{{report.non_zero_calls}}</td>							  
							  <td>{{report.ingress_cost}}</td>
							  <td>{{report.egress_cost}}</td>
							  <td>{{report.npr_calls}}</td>
							  <td>{{report.npr}}</td>
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
		  vSpinner = require('vue!../main_components/fadeloader.vue'),
		  vSelect = require('vue!../main_components/select.vue'),
		  Pagination = require('vue!../main_components/pagination.vue');
		  const api = require("../../api");
		   const	auth = require("../../auth");
	module.exports = {
		created: function(){			
			this.searchReport();
			this.fetchCarriers();
			// this.fetchAllTrunks('egress');
			// this.fetchAllTrunks('ingress');	
			// this.fetchRateTable();
			// this.fetchRoutePlans();	
		},
		components: {
			'tabs': vTabs,
			'tab': vTab,
			'select2': vSelect,
			'spinner': vSpinner,
			'pagination': Pagination
		},
		data: function(){
            return {
				pageOne: {
					currentPage: 1,
					totalPages: 10
				},
				tmpPageOne: {
					currentPage: 0,
					totalPages: 10,
					cntPerPage: 30,
				},
				route_types: [
				  { id: 1, text: 'Fail to Next Host' },
				  { id: 2, text: 'Fail to Next Trunk' },
				  { id: 3, text: 'Stop' },
			  	],
				web: 'web',
				web_options: [
					{ id: 'web', text: 'Web' },
					{ id: 'excel_csv', text: 'Excel CSV' },
					{ id: 'email_when_done', text: 'Email when done' },
					{ id: 'export_from_storage', text: 'Export from Storage' },
				],	
				time: 'Custom',
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
				by_hours: 1,
				by_hour_options: [
					{ id: 1, text: 'All Time', value: 0 },
					{ id: 2, text: 'By hours', value: 60 },
					{ id: 3, text: 'By day', value: 1440 },
					{ id: 4, text: 'By month', value: 43200 },
					{ id: 5, text: 'By year', value: 525600 },
				],
				page_row_count: 1,
				page_rows: [
					{ id: 1, text: '10' },
					{ id: 2, text: '20' },
					{ id: 3, text: '30' },
					{ id: 4, text: '50' },
					{ id: 5, text: '100' }
				],
				group_by1: '',
				group_by2: '',
				group_by3: '',
				group_by4: '',
				group_by5: '',				
				group_options: [
				  { id: 1, value: 'orig_code', text: 'Orig Code' },
				  { id: 2, value: 'ingress_id', text: 'Ingress ID' },
				  { id: 3, value: 'egress_id', text: 'Egress ID' },				 
				  { id: 4, value: 'source_number', text: 'ANI' },
				  { id: 5, value: 'dest_number', text: 'DNIS' },				  
				],
				page_row_count: 1,
				page_rows: [
					{ id: 1, text: '10' },
					{ id: 2, text: '20' },
					{ id: 3, text: '30' },
					{ id: 4, text: '50' },
					{ id: 5, text: '100' }
				],
				plan_table_columns: [],
				show_field_options: [
				  { id: 1, value: 'ingress_trunk', text: 'Ingress Trunk' },
				  { id: 2, value: 'call_duration', text: 'Call Duration' },
				  { id: 3, value: 'profit', text: 'Profit' },				 						  
				  { id: 4, value: 'total_calls', text: 'Total Calls' },
				  { id: 5, value: 'not_zero_calls', text: 'Not Zero Calls' },
				  { id: 6, value: 'success_calls', text: 'Success Calls' },
				  { id: 7, value: 'ingress_cost', text: 'Ingress Cost' },				  
				  { id: 8, value: 'egress_cost', text: 'Egress Cost' },
				],
				prefix_options: [
				  { id: 1, value: 'all', text: 'All' },				  
			    ],
				prefix: '',
				more_advanced_option: true,
				more_advanced_option_button: "Less Options",  
				loading: false,			
				orgination_search_field: ['ingress_billed_time', 'ingress_calls', 'non_zero_calls', 'ingress_cost', 'egress_cost', 'ingress_success_calls', 'ingress_time', 'npr_calls'],
				termination_search_field: ['egress_billed_time', 'egress_calls', 'non_zero_calls', 'ingress_cost', 'egress_cost', 'ingress_success_calls', 'egress_time', 'npr_calls'],
				backupDatas: [],
				originations: [],
			    terminations: [],
				active_tab_index: 0,
			  	active_tab_name: "Origination",
				ingress_trunk: '',
				egress_trunk: '',
				carrier_options: [],
				ingress_trunk_options: [],
				egress_trunk_options: [],
				egress_carrier: '',
				ingress_carrier: '',
				start_date: '',
				end_date: '',
				ani: '',
				dnis: '',
				country: '',
				
				route_plan_options: [],
				rate_table_options: [],
				routing_plan: '',				
				rate_table: '',
				
				
				tech_prefix: '',
				
				code_name: '',
			
				switch_server: '',
				selected1: '',
				selected2: '',
				rate_display: '',
				period_time_1: '',
				period_time_2: '',
				
			}
        },
		methods: {
			toggleTable(event) {
				var element = event.currentTarget;
				$(element).parents('tr').siblings('.collapse').toggleClass('in');
			},
			pageOneChanged (pageNum) {
				this.pageOne.currentPage = pageNum
			},
			changeTab (tab, index) {				
				if (this.active_tab_index === index) { return }
				this.active_tab_index = index
				this.active_tab_name = tab.name;	
				this.more_advanced_option = true,
				this.more_advanced_option_button = "Less Options";
				this.gmt = 13;
				this.time = "Custom";
				this.by_hours = 1;
				this.ani = "";
				this.dnis = "";
				this.country = "";	
				this.ingress_carrier = '';
				this.egress_carrier = '';
				this.ingress_trunk = '';
				this.egress_trunk = '';
				this.group_by1 = '';
				this.group_by2 = '';
				this.group_by3 = '';
				this.group_by4 = '';
				this.group_by5 = '';
				this.searchReport();
			},
			handleChange() {

			},
			changePageCount (countPerPage) {
				if (countPerPage !== this.pageOne.cntpage) {
					this.pageOne.cntpage = countPerPage
					this.$nextTick(this.fetchPlans)
				}
			},
			showAdvanced(){
				if(this.more_advanced_option)
				{
					this.more_advanced_option = false;
					this.more_advanced_option_button = "More Options";
				}
				else
				{
					this.more_advanced_option = true;
					this.more_advanced_option_button = "Less Options";
				}
			},
			calcValue: function(first, second, percent = 100)
			{
				var value = 0;
				if(second == 0 || second == "") value = 0;
				else value = first * percent / second;
				if(isNaN(value)) value = 0;
				else value = parseFloat(Math.round(value * 100) / 100).toFixed(2);
				return value;
			},	
			
			makeDatas: function()
			{				
				console.log("make datas");				
				if(this.backupDatas.length == 0) return;					
				var displayArray = new Array();
				for(var i = 0; i < this.backupDatas[0].length - 1; i++)
				{						
					var value = new Array();	
					value["group_time"] = formatDateFromStamp(this.backupDatas[0][i].time);													
					for(var j = 0; j < this.orgination_search_field.length; j++)	
					{										
						if(this.active_tab_index == 0)							
							value[this.orgination_search_field[j]] = this.backupDatas[j][i].value;
						else
							value[this.termination_search_field[j]] = this.backupDatas[j][i].value;
					}
					if(this.active_tab_index == 0)							
					{
						value["bill_percent"] = this.calcValue(value["ingress_billed_time"], value["ingress_time"]);						
						value["profit"] = value["ingress_cost"] - value["egress_cost"];
						value["profit_percent"] = this.calcValue(value["profit"], value["egress_cost"]);
						value["npr"] = this.calcValue(value["npr_calls"], value["ingress_calls"]);
					}		
					else
					{
						value["bill_percent"] = this.calcValue(value["egress_billed_time"], value["ingress_time"]);						
						value["profit"] = value["ingress_cost"] - value["egress_cost"];
						value["profit_percent"] = this.calcValue(value["profit"], value["egress_cost"]);
						value["npr"] = this.calcValue(value["npr_calls"], value["egress_calls"]);
					}
					
					displayArray[i] = value;
				}
				
				if(this.active_tab_index == 0)						
					this.originations = displayArray;
				else
					this.terminations = displayArray;							
				this.loading = false;			
			},
			fetchReport: function(start_time, end_time, step, filterURL, field_ind = 0, method = 'total')
			{								
				this.loading = true;												
				var page = this.pageOne.currentPage - 1;
				var per_page = this.pageOne.cntpage;																				
				var strURL;
				if(this.active_tab_index == 0)
				 	strURL = api.getReport_URL() + "?start_time=" + start_time + "&end_time=" + end_time + "&step=" + step + "&method=" + method + "&field=" + this.orgination_search_field[field_ind];
				else																	
					strURL = api.getReport_URL() + "?start_time=" + start_time + "&end_time=" + end_time + "&step=" + step + "&method=" + method + "&field=" + this.termination_search_field[field_ind];																						
				strURL += filterURL;
				console.log(strURL);
				var authToken = "Token Yuza2L2rlGkdemBeYzL0SVncFafTjYNFSMpShsJT614inGMLDf";				
				this.$http.get(strURL,
				{
					headers: {
						"Authorization": authToken						
					}
				}).then(function(response) {
					this.backupDatas[field_ind] = response.body.data;
					if(field_ind == this.orgination_search_field.length - 1)
						this.makeDatas();
					else
					{
						field_ind += 1;
						this.fetchReport(start_time, end_time, step, filterURL, field_ind);					 	
					}
				}, function(error) {					
					this.loading = false;
				});			
			},
			searchReport: function(){
				var start_time, end_time, step;													
				if(this.time == 'Custom')
				{					
					if(this.start_date == ""){
						start_time = new Date();
					}	
					else{
						start_time = new Date(this.start_date);
					}

					if(this.end_date == ""){
						end_time = new Date();
					}	
					else{
						end_time = new Date(this.end_date);
					}	
				} else if(this.time == 'Today')
				{
					start_time = getStartTimeOfToday();
					end_time = getEndTimeOfToday();
				} else if(this.time == 'Yesterday')
				{
					start_time = getStartTimeOfYesterday();
					end_time = getEndTimeOfYesterday();
				} else if(this.time == 'Current week')
				{
					start_time = getStartTimeOfCurrentWeek();
					end_time = getEndTimeOfCurrentWeek();
				} else if(this.time == 'Previous week')
				{
					start_time = getStartTimeOfPreviousWeek();
					end_time = getEndTimeOfPreviousWeek();
				} else if(this.time == 'Current month')
				{
					start_time = getStartTimeOfCurrentMonth();
					end_time = getEndTimeOfCurrentMonth();
				} else if(this.time == 'Previous month')
				{
					start_time = getStartTimeOfPreviousMonth();
					end_time = getEndTimeOfPreviousMonth();
				} 		
				
				start_time = new Date(start_time + " GMT").getTime() / 1000;
				end_time = new Date(end_time + " GMT").getTime() / 1000;

				if(this.by_hours == 1)
				{					
					var diffMs = (end_time - start_time) * 1000;									
					var diffDays = Math.floor(diffMs / 86400000); // days
					var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
					var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes		
					step = diffDays * 1440 + diffHrs * 60;		
					if(diffMins % 60 == 0)
						step += diffMins;
					else{
						diffMins = diffMins - (diffMins % 60);
					}		
				}
				else
					step = this.by_hour_options[this.by_hours - 1].value; 		
											
				var filterURL = this.makeURL();
				console.log(filterURL);
				this.originations = [];
				this.terminations = [];
				if(step != 0)		
					this.fetchReport(start_time, end_time, step, filterURL);				
			},
			makeURL: function(){
				var filterURL = '';
				if(this.ingress_carrier != undefined && this.ingress_carrier != '')
				{
					if(this.ingress_trunk != undefined && this.ingress_trunk != '')
					{
						filterURL += "&ingress_id=" + this.ingress_trunk;						
					}
					else if(this.ingress_trunk_options.length != 0)
					{
						var ingress_ids = '';
						this.ingress_trunk_options.forEach(function (ingress, i) {
							if(i == 0)
								ingress_ids += ingress.id;
							else	
								ingress_ids += "," + ingress.id;
						});		
						filterURL += "&ingress_id=" + ingress_ids;				
					}					
				}
				if(this.country != '')
				{

				}

				if(this.ani != '')
					filterURL += "&source_number=" + this.ani;
				if(this.dnis != '')				
					filterURL += "&dest_number=" + this.dnis;				
				if(this.egress_carrier != undefined && this.egress_carrier != '')
				{
					if(this.egress_trunk != undefined && this.egress_trunk != '')
					{
						filterURL += "&egress_id=" + this.egress_trunk;						
					}
					else if(this.egress_trunk_options.length != 0)
					{
						var egress_ids = '';
						this.egress_trunk_options.forEach(function (egress, i) {
							if(i == 0)
								egress_ids += egress.id;
							else	
								egress_ids += "," + egress.id;
						});		
						filterURL += "&egress_id=" + egress_ids;				
					}					
				}
				if (this.group_by1 != '')
					filterURL += "&group=" + this.group_by1;				
				if (this.group_by2 != '')
					filterURL += "&group=" + this.group_by2;
				if (this.group_by3 != '')
					filterURL += "&group=" + this.group_by3;
				if (this.group_by4 != '')
					filterURL += "&group=" + this.group_by4;
				if (this.group_by5 != '')
					filterURL += "&group=" + this.group_by5;
				return filterURL;
			},
			changeEgress() {
				this.fetchRelatedTrunks('egress');
			},
			changeIngress() {
				this.fetchRelatedTrunks('ingress');
			},
			fetchRoutePlans() {
				const url = api.getEndpointUrl() + '/v1/route/plan/list';
				this.$http.get(url, {
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				})
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
						console.log("Routing Success");											
					}
				})
				.catch(error => {
					console.log("Routing Failure");
					console.log(error);
					this.loading = false;
				})
			},
			fetchRateTable () {
				const url = api.getEndpointUrl() + '/v1/switch/rate_table/list';
				this.$http.get(url, {
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				})
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
					console.log(error);
					this.loading = false;
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
					console.log(error);
					this.loading = false;
				})
			},
			fetchRelatedTrunks (type) {				
				var url;
				if(type == 'egress')
				{
					if(this.egress_carrier == undefined) return;
					this.egress_trunk = '';
					
					url = api.getEndpointUrl() + '/v1/carrier/' + this.egress_carrier + '/egress_trunk/list';
				}
				else if(type == 'ingress')
				{
					if(this.ingress_carrier == undefined) return;
					this.ingress_trunk = '';
					console.log(this.ingress_trunk);
					url = api.getEndpointUrl() + '/v1/carrier/' + this.ingress_carrier + '/ingress_trunk/list';
				}	
				this.loading = true;
				this.$http.get(url,
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(response => {
					const body = response.body
					if (body.success) {
						const trunks = body.payload.items
						
						var self = this;
						if(type == 'egress') {
							this.egress_trunk_options = [];
							trunks.forEach(function (temp, i) {
								var trunk = {};
								trunk.id = temp.resource_id;
								trunk.text = temp.name;
								self.egress_trunk_options.push(trunk);
							});
							//console.log("Egress: " + this.egress_trunk_options.length);
						}
						else if(type == 'ingress') {
							this.ingress_trunk_options = [];
							trunks.forEach(function (temp, i) {
								var trunk = {};
								trunk.id = temp.resource_id;
								trunk.text = temp.name;
								self.ingress_trunk_options.push(trunk);
							});
							//console.log("Inress: " + this.ingress_trunk_options.length);
						}
						this.loading = false;
						console.log("Fetch releated trunks success");
					}
				})
				.catch(error => {					
					console.log("Fetch releated trunks failure");
					//console.log(error);
					this.loading = false;
				})
			},
			fetchCarriers() {
				this.loading = true;
				var url;
				if(this.tmpPageOne.currentPage === 0)
					url = api.getEndpointUrl() + "/v1/carrier/list"
				else
					url = api.getEndpointUrl() + "/v1/carrier/list?page=" + this.tmpPageOne.currentPage
				//console.log(url);
				this.$http.get(url,
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(response => {
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
							console.log("Fetch carriers success");					
							//console.log(this.carrier_options);
						}
					})
					.catch(error => {
						//console.log(error)
						console.log("Fetch carriers failure");					
						this.loading = false;
					})
			},			
		}
	}
</script>

<style>
</style>
