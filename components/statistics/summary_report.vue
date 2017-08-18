<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single big_data">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Statistics</a></li>
				  <li class="breadcrumb-item active">Summary Report</li>
			</ol>
			<h1 class="page-header">Summary Report</h1>
			<spinner v-show="loading" class="spinner"></spinner>
			<tabs @activateTab="changeTab">
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
						<div class="col-md-6 col-sm-12 none-left-padding none-right-padding">
							<div class="inlined">
								<div class="col-md-4 col-sm-4">
									<label>GMT:</label>		
									<select2 :options="gmt_options" v-model="gmt">
										<option disabled value="0">Select one</option>
									</select2>
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
								<div class="col-md-4 col-sm-4">
									<a class="btn btn-primary full-width m-top-20"  v-on:click="showAdvanced()">
										{{more_advanced_option_button}}
									</a>
								</div>
								<div class="clearfix"></div>
							</div>
						</div>
						<div class="clearfix little-space"></div>
						<div class = "inlined" v-show="more_advanced_option" >
						<div class="col-md-4 col-sm-6">
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
									<select class="selectable no-min-width" v-model="ingress">
										<option v-for="item in ingress_trunk_options" v-bind:value="item.id">
											{{ item.text }}
										</option>
									</select>
								</div>
								<div class="clearfix little-space"></div>
								<div class="col-md-6 first">
									<label>Tech Prefix:</label>									
									<select2 :options="tech_prefix_options" v-model="tech_prefix">
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
									<select2 :options="route_plan_options" v-model="routing_plan">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="clearfix little-space"></div>
								<div class="col-md-6 first">
									<label>Rate Table:</label>									
									<select2 :options="rate_table_options" v-model="rate_table">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-6 second">
									<label>Rate display as:</label>									
									<select2 :options="rate_display_options" v-model="rate_display">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="clearfix"></div>
								</div>
							</div>
						</div>
						<div class="col-md-4 col-sm-6">
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
								<div class="clearfix little-space"></div>
								<div class="col-md-6 first">
									<label>Rate Type:</label>
									<select2 :options="rate_table_options" v-model="rate_table">
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
						<div class="col-md-4 col-sm-12">
							<div class="white_pad less_pad">
								<h1 class="page-header">Fields</h1>
								<label for="groupname">Show Fields:</label>
								<select multiple class="multi">
									<option v-for="option in orig_show_field_options" :value='option.value'>{{option.text}}</option>
								</select>
							</div>
						</div>
						<div class="clearfix"></div>
						<div class="col-md-12 col-sm-12">
							<div class="white_pad less_pad">
								<div class="col-md-4 col-sm-6">
									<div class="col-md-4 col-sm-5 m-top-10 group-label"><label class="m-top-10">Group by #1:</label></div>
									<div class="col-md-8 col-sm-7 m-top-10 none-left-padding">
										<select2 :options="group_options" v-model="group_by1">
											<option disabled value="0">Select one</option>
										</select2>										
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="col-md-4 col-sm-5 m-top-10 group-label"><label class="m-top-10">Group by #2:</label></div>
									<div class="col-md-8 col-sm-7 m-top-10 none-left-padding">
										<select2 :options="group_options" v-model="group_by2">
											<option disabled value="0">Select one</option>
										</select2>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="col-md-4 col-sm-5 m-top-10 group-label"><label class="m-top-10">Group by #3:</label></div>
									<div class="col-md-8 col-sm-7 m-top-10 none-left-padding">
										<select2 :options="group_options" v-model="group_by3">
											<option disabled value="0">Select one</option>
										</select2>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="col-md-4 col-sm-5 m-top-10 group-label"><label class="m-top-10">Group by #4:</label></div>
									<div class="col-md-8 col-sm-7 m-top-10 none-left-padding">
										<select2 :options="group_options" v-model="group_by4">
											<option disabled value="0">Select one</option>
										</select2>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="col-md-4 col-sm-5 m-top-10 group-label"><label class="m-top-10">Group by #5:</label></div>
									<div class="col-md-8 col-sm-7 m-top-10 none-left-padding">
										<select2 :options="group_options" v-model="group_by5">
											<option disabled value="0">Select one</option>
										</select2>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="col-md-4 col-sm-5 m-top-10 group-label"><label class="m-top-10">Group by #6:</label></div>
									<div class="col-md-8 col-sm-7 m-top-10 none-left-padding">
										<select2 :options="group_options" v-model="group_by6">
											<option disabled value="0">Select one</option>
										</select2>
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
								<el-option v-for="item in orig_show_field_options" :key="item.value" :label="item.text" :value="item.value">
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
								<th rowspan="2" colspan="1">Group Time</th>								
								<th rowspan="2" colspan="1">ASR</th>
								<th rowspan="2" colspan="1">ACD</th>							
								<th rowspan="2" colspan="1">PDD</th>
								<th rowspan="1" colspan="2">Time</th>
								<th rowspan="2" colspan="1">Total Cost</th>
								<th rowspan="2" colspan="1">Inter Cost</th>
								<th rowspan="2" colspan="1">Local Cost</th>
								<th rowspan="1" colspan="4">Calls</th>
							</tr>
							<tr>
								<th rowspan="1" colspan="1">Actual</th>
								<th rowspan="1" colspan="1">Billable</th>
								<th rowspan="1" colspan="1">Total</th>
								<th rowspan="1" colspan="1">Not Zero</th>
								<th rowspan="1" colspan="1">Success</th>
								<th rowspan="1" colspan="1">Busy</th>
							</tr>
						  </thead>
						  <tbody>		
							<tr v-if="!filterBy(originations, report).length">
								<td style="text-align: center" colspan="15">No Data Found</td>
							</tr>					   
							<tr v-for="report in originations">
							  <td>{{report.group_time}}</td>							  
							  <td>{{report.asr}}</td>
							  <td>{{report.acd}}</td>							  
							  <td>{{report.pdd}}</td>
							  <td>{{report.ingress_time}}</td>
							  <td>{{report.ingress_billed_time}}</td>
							  <td>{{report.ingress_cost}}</td>
							  <td>{{report.ingress_call_cost_inter}}</td>
							  <td>{{report.ingress_call_cost_local}}</td>
							  <td>{{report.ingress_calls}}</td>
							  <td>{{report.non_zero_calls}}</td>
							  <td></td>
							  <td>{{report.ingress_busy_calls}}</td>
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
				<tab label="Origination Cascade Report" class="" icon="dnl_icon dnl_to_left">
					<div class="advanced_search_filter_panel">
						<div class="col-md-3 col-sm-4">
							<label>Period:</label>
							<select2 :options="period_options" v-model="period">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="col-md-6 col-sm-6">
							<div class="inlined">
								<label for="start_date">Start Time:</label>
								<el-date-picker style="width: 100%;" type="datetime" v-model="start_date" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
							<div class="inlined">
								<label for="end-date">End Time:</label>
								<el-date-picker style="width: 100%;" type="datetime" v-model="end_date" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
						</div>
						<div class="col-md-3 col-sm-2">
							<label>Rate Display as:</label>							
							<select2 :options="rate_display_options" v-model="rate_display">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
					<div class="clearfix little-space"></div>
					</div>
					<div class="table-responsive">
						<table class="table table-striped table-hover carrier_groups centrum">
						  <thead>
							<tr>
								<th rowspan="2" colspan="1" class="width-65"></th>
								<th rowspan="2" colspan="1">Carrier</th>
								<th rowspan="2" colspan="1">Date</th>
								<th rowspan="2" colspan="1">ABR</th>
								<th rowspan="2" colspan="1">ASR</th>
								<th rowspan="2" colspan="1">ACD</th>
								<th rowspan="2" colspan="1">ALOC</th>
								<th rowspan="2" colspan="1">PDD</th>
								<th rowspan="1" colspan="2">Time</th>
								<th rowspan="2" colspan="1">Total Cost</th>
								<th rowspan="2" colspan="1">Inter Cost</th>
								<th rowspan="2" colspan="1">Local Cost</th>
								<th rowspan="1" colspan="4">Calls</th>
							</tr>
							<tr>
								<th rowspan="1" colspan="1">Actual</th>
								<th rowspan="1" colspan="1">Billable</th>
								<th rowspan="1" colspan="1">Total</th>
								<th rowspan="1" colspan="1">Not Zero</th>
								<th rowspan="1" colspan="1">Success</th>
								<th rowspan="1" colspan="1">Busy</th>
							</tr>
						  </thead>
						  <tbody>
							<tr v-if="!filterBy(terminations, report).length">
								<td style="text-align: center" colspan="15">No Data Found</td>
							</tr>	
							<tr  v-for="report in terminations">
							  <td><a class="toogler" @click="toggleTable($event)">+</a></td>
							  <td>{{report.carrier}}</td>
							  <td>{{report.count_number}}</td>
							  <td>{{report.abr}}</td>
							  <td>{{report.asr}}</td>
							  <td>{{report.acd}}</td>
							  <td>{{report.aloc}}</td>
							  <td>{{report.pdd}}</td>
							  <td>{{report.actual_time}}</td>
							  <td>{{report.billable_time}}</td>
							  <td>{{report.total_cost}}</td>
							  <td>{{report.inter_cost}}</td>
							  <td>{{report.local_cost}}</td>
							  <td>{{report.total_calls}}</td>
							  <td>{{report.not_zero_calls}}</td>
							  <td>{{report.success_calls}}</td>
							  <td>{{report.busy_calls}}</td>
							</tr>
							<!--<tr class="accordian-body collapse no_padding" v-for="count in report.counts">
								<td></td>
								<td>{{count.carrier}}</td>
								<td>{{count.date}}</td>
								<td>{{count.abr}}</td>
								<td>{{count.asr}}</td>
								<td>{{count.acd}}</td>
								<td>{{count.aloc}}</td>
								<td>{{count.pdd}}</td>
								<td>{{count.actual_time}}</td>
								<td>{{count.billable_time}}</td>
								<td>{{count.total_cost}}</td>
								<td>{{count.inter_cost}}</td>
								<td>{{count.local_cost}}</td>
								<td>{{count.total_calls}}</td>
								<td>{{count.not_zero_calls}}</td>
								<td>{{count.success_calls}}</td>
								<td>{{count.busy_calls}}</td>
							</tr>-->
						  </tbody>
						</table>
					</div>
					<div class="button_set">
						<a class="btn btn-primary mini">
							Submit
						</a>
						<a class="btn btn-default mini">
							Reset
						</a>
					</div>
				</tab>
				<tab label="Termination" class="" icon="dnl_icon dnl_to_right">
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
						<div class="col-md-6 col-sm-12 none-left-padding none-right-padding">
							<div class="inlined">
								<div class="col-md-4 col-sm-4">
									<label>GMT:</label>		
									<select2 :options="gmt_options" v-model="gmt">
										<option disabled value="0">Select one</option>
									</select2>
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
								<div class="col-md-4 col-sm-4">
									<a class="btn btn-primary full-width m-top-20"  v-on:click="showAdvanced()">
										{{more_advanced_option_button}}
									</a>
								</div>
								<div class="clearfix"></div>
							</div>
						</div>
						<div class="clearfix little-space"></div>
						<div class = "inlined" v-show="more_advanced_option" >
						<div class="col-md-4 col-sm-6">
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
									<select class="selectable no-min-width" v-model="ingress">
										<option v-for="item in ingress_trunk_options" v-bind:value="item.id">
											{{ item.text }}
										</option>
									</select>
								</div>
								<div class="clearfix little-space"></div>
								<div class="col-md-6 first">
									<label>Tech Prefix:</label>
									<select2 :options="tech_prefix_options" v-model="tech_prefix">
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
									<select2 :options="route_plan_options" v-model="routing_plan">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="clearfix little-space"></div>
								<div class="col-md-6 first">
									<label>Rate Table:</label>									
									<select2 :options="rate_table_options" v-model="rate_table">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-6 second">
									<label>Rate display as:</label>									
									<select2 :options="rate_display_options" v-model="rate_display">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="clearfix"></div>
								</div>
							</div>
						</div>
						<div class="col-md-4 col-sm-6">
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
								<div class="clearfix little-space"></div>
								<div class="col-md-6 first">
									<label>Rate Type:</label>
									<select2 :options="rate_table_options" v-model="rate_table">
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
						<div class="col-md-4 col-sm-12">
							<div class="white_pad less_pad">
								<h1 class="page-header">Fields</h1>
								<label for="groupname">Show Fields:</label>
								<select multiple class="multi">
									<option v-for="option in temp_show_field_options" :value='option.value'>{{option.text}}</option>
								</select>
							</div>
						</div>
						<div class="clearfix"></div>
						<div class="col-md-12 col-sm-12">
							<div class="white_pad less_pad">
								<div class="col-md-4 col-sm-6">
									<div class="col-md-4 col-sm-5 m-top-10 group-label"><label class="m-top-10">Group by #1:</label></div>
									<div class="col-md-8 col-sm-7 m-top-10 none-left-padding">
										<select2 :options="group_options" v-model="group_by1">
											<option disabled value="0">Select one</option>
										</select2>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="col-md-4 col-sm-5 m-top-10 group-label"><label class="m-top-10">Group by #2:</label></div>
									<div class="col-md-8 col-sm-7 m-top-10 none-left-padding">
										<select2 :options="group_options" v-model="group_by2">
											<option disabled value="0">Select one</option>
										</select2>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="col-md-4 col-sm-5 m-top-10 group-label"><label class="m-top-10">Group by #3:</label></div>
									<div class="col-md-8 col-sm-7 m-top-10 none-left-padding">
										<select2 :options="group_options" v-model="group_by3">
											<option disabled value="0">Select one</option>
										</select2>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="col-md-4 col-sm-5 m-top-10 group-label"><label class="m-top-10">Group by #4:</label></div>
									<div class="col-md-8 col-sm-7 m-top-10 none-left-padding">
										<select2 :options="group_options" v-model="group_by4">
											<option disabled value="0">Select one</option>
										</select2>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="col-md-4 col-sm-5 m-top-10 group-label"><label class="m-top-10">Group by #5:</label></div>
									<div class="col-md-8 col-sm-7 m-top-10 none-left-padding">
										<select2 :options="group_options" v-model="group_by5">
											<option disabled value="0">Select one</option>
										</select2>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="col-md-4 col-sm-5 m-top-10 group-label"><label class="m-top-10">Group by #6:</label></div>
									<div class="col-md-8 col-sm-7 m-top-10 none-left-padding">
										<select2 :options="group_options" v-model="group_by6">
											<option disabled value="0">Select one</option>
										</select2>
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
								<th rowspan="2" colspan="1">Group Time</th>								
								<th rowspan="2" colspan="1">ASR</th>
								<th rowspan="2" colspan="1">ACD</th>								
								<th rowspan="2" colspan="1">PDD</th>
								<th rowspan="1" colspan="2">Time</th>
								<th rowspan="2" colspan="1">Total Cost</th>
								<th rowspan="2" colspan="1">Inter Cost</th>
								<th rowspan="2" colspan="1">Local Cost</th>
								<th rowspan="1" colspan="4">Calls</th>
							</tr>
							<tr>
								<th rowspan="1" colspan="1">Actual</th>
								<th rowspan="1" colspan="1">Billable</th>
								<th rowspan="1" colspan="1">Total</th>
								<th rowspan="1" colspan="1">Not Zero</th>
								<th rowspan="1" colspan="1">Success</th>
								<th rowspan="1" colspan="1">Busy</th>
							</tr>
						  </thead>
						  <tbody>
							<tr v-for="report in terminations">
							  <td>{{report.group_time}}</td>
							  <td>{{report.asr}}</td>
							  <td>{{report.acd}}</td>							  
							  <td>{{report.pdd}}</td>
							  <td>{{report.pdd}}</td>
							  <td>{{report.egress_time}}</td>
							  <td>{{report.egress_billed_time}}</td>
							  <td>{{report.egress_cost}}</td>
							  <td>{{report.egress_call_cost_inter}}</td>
							  <td>{{report.egress_call_cost_local}}</td>
							  <td>{{report.egress_calls}}</td>
							  <td>{{report.non_zero_calls}}</td>
							  <td></td>
							  <td>{{report.engress_busy_calls}}</td>
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
				<tab label="Termination Cascade Report" class="" icon="dnl_icon dnl_to_right">
					<div class="advanced_search_filter_panel">
						<div class="col-md-3 col-sm-4">
							<label>Period:</label>
							<select2 :options="period_options" v-model="period">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="col-md-6 col-sm-6">
							<div class="inlined">
								<label for="start_date">Start Time:</label>
								<el-date-picker style="width: 100%;" type="datetime" v-model="start_date" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
							<div class="inlined">
								<label for="end-date">End Time:</label>
								<el-date-picker style="width: 100%;" type="datetime" v-model="end_date" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
						</div>
						<div class="col-md-3 col-sm-2">
							<label>Rate Display as:</label>							
							<select2 :options="rate_display_options" v-model="rate_display">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
					<div class="clearfix little-space"></div>
					</div>
					<div class="table-responsive">
						<table class="table table-striped table-hover carrier_groups centrum">
						  <thead>
							<tr>
								<th rowspan="2" colspan="1" class="width-65"></th>
								<th rowspan="2" colspan="1">Carrier</th>
								<th rowspan="2" colspan="1">Date</th>
								<th rowspan="2" colspan="1">ABR</th>
								<th rowspan="2" colspan="1">ASR</th>
								<th rowspan="2" colspan="1">ACD</th>
								<th rowspan="2" colspan="1">ALOC</th>
								<th rowspan="2" colspan="1">PDD</th>
								<th rowspan="1" colspan="2">Time</th>
								<th rowspan="2" colspan="1">Total Cost</th>
								<th rowspan="2" colspan="1">Inter Cost</th>
								<th rowspan="2" colspan="1">Local Cost</th>
								<th rowspan="1" colspan="4">Calls</th>
							</tr>
							<tr>
								<th rowspan="1" colspan="1">Actual</th>
								<th rowspan="1" colspan="1">Billable</th>
								<th rowspan="1" colspan="1">Total</th>
								<th rowspan="1" colspan="1">Not Zero</th>
								<th rowspan="1" colspan="1">Success</th>
								<th rowspan="1" colspan="1">Busy</th>
							</tr>
						  </thead>
						  <tbody v-for="report in reports">
							<tr>
							  <td><a class="toogler" @click="toggleTable($event)">+</a></td>
							  <td>{{report.carrier}}</td>
							  <td>{{report.count_number}}</td>
							  <td>{{report.abr}}</td>
							  <td>{{report.asr}}</td>
							  <td>{{report.acd}}</td>
							  <td>{{report.aloc}}</td>
							  <td>{{report.pdd}}</td>
							  <td>{{report.actual_time}}</td>
							  <td>{{report.billable_time}}</td>
							  <td>{{report.total_cost}}</td>
							  <td>{{report.inter_cost}}</td>
							  <td>{{report.local_cost}}</td>
							  <td>{{report.total_calls}}</td>
							  <td>{{report.not_zero_calls}}</td>
							  <td>{{report.success_calls}}</td>
							  <td>{{report.busy_calls}}</td>
							</tr>
							<!--<tr class="accordian-body collapse no_padding" v-for="count in report.counts">
								<td></td>
								<td>{{count.carrier}}</td>
								<td>{{count.date}}</td>
								<td>{{count.abr}}</td>
								<td>{{count.asr}}</td>
								<td>{{count.acd}}</td>
								<td>{{count.aloc}}</td>
								<td>{{count.pdd}}</td>
								<td>{{count.actual_time}}</td>
								<td>{{count.billable_time}}</td>
								<td>{{count.total_cost}}</td>
								<td>{{count.inter_cost}}</td>
								<td>{{count.local_cost}}</td>
								<td>{{count.total_calls}}</td>
								<td>{{count.not_zero_calls}}</td>
								<td>{{count.success_calls}}</td>
								<td>{{count.busy_calls}}</td>
							</tr>-->
						  </tbody>
						</table>
					</div>
					<div class="button_set">
						<a class="btn btn-primary mini">
							Submit
						</a>
						<a class="btn btn-default mini">
							Reset
						</a>
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
		  vSpinner = require('vue!../main_components/fadeloader.vue'),
		  vSelect = require('vue!../main_components/select.vue'),		  
		  Pagination = require('vue!../main_components/pagination.vue');
		  const api = require("../../api");
		  const	auth = require("../../auth");
	module.exports = {
		created: function(){	
			this.fetchCarriers();
			// this.fetchAllTrunks('egress');
			// this.fetchAllTrunks('ingress');	
			this.fetchRateTable();
			this.fetchRoutePlans();	
			this.searchReport();
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
				more_advanced_option: true,
				more_advanced_option_button: "Less Options",
				loading: false,			
				orgination_search_field: ['pdd', 'ingress_time', 'ingress_billed_time', 'ingress_cost', 'ingress_call_cost_inter', 'ingress_call_cost_local', 'ingress_calls', 'non_zero_calls', 'ingress_busy_calls'],
				termination_search_field: ['pdd', 'egress_time', 'egress_billed_time', 'egress_cost', 'egress_call_cost_inter', 'egress_call_cost_local', 'egress_calls', 'non_zero_calls', 'egress_busy_calls'],
				period: '',
				carriers: '',
				start_date: '',
				end_date: '',
				ingress_trunk: '',
				egress_trunk: '',
				carrier_options: [],
				ingress_trunk_options: [],
				egress_trunk_options: [],
				egress_carrier: '',
				ingress_carrier: '',
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
				by_hours: 1,
				by_hour_options: [
					{ id: 1, text: 'All Time', value: 0 },
					{ id: 2, text: 'By hours', value: 60 },
					{ id: 3, text: 'By day', value: 1440 },
					{ id: 4, text: 'By month', value: 43200 },
					{ id: 5, text: 'By year', value: 525600 },
				],
				 plan_table_columns: ['ASR', 'ACD', 'PDD', 'NPR Count', 'NPR', 'NRF Count', 'NRF', 'SD Count', 'SDP', 'Revenue', 'Profit',
				 'Margin', 'PP Min', 'PP K Calls', 'PPKA', 'Limited', 'Total Duration', 'Total Billable Time', 'Total Cost', 
				 'Inter Cost', 'Intra Cost', 'Local Cost', 'IJ Cost', 'Average Rate', 'Total Calls', 'Not Zero Calls', 'Busy Calls'],
				orig_show_field_options: [
				  { id: 1, value: 'asr', text: 'ASR' },
				  { id: 2, value: 'acd', text: 'ACD' },
				  { id: 3, value: 'pdd', text: 'PDD' },
				  { id: 4, value: 'npr_count', text: 'NPR Count' },
				  { id: 5, value: 'npr', text: 'NPR' },
				  { id: 6, value: 'nrf_count', text: 'NRF Count' },
				  { id: 7, value: 'nrf', text: 'NRF' },
				  { id: 8, value: 'sd_count', text: 'SD Count' },
				  { id: 9, value: 'sdp', text: 'SDP' },
				  { id: 10, value: 'revenue', text: 'Revenue' },
				  { id: 11, value: 'profit', text: 'Profit' },
				  { id: 12, value: 'margin', text: 'Margin' },
				  { id: 13, value: 'pp_min', text: 'PP Min' },
				  { id: 14, value: 'pp_k_calls', text: 'PP K Calls' },
				  { id: 15, value: 'ppka', text: 'PPKA' },
				  { id: 16, value: 'limited', text: 'Limited' },
				  { id: 17, value: 'total_duration', text: 'Total Duration' },
				  { id: 18, value: 'total_billable_time', text: 'Total Billable Time' },
				  { id: 19, value: 'total_cost', text: 'Total Cost' },
				  { id: 20, value: 'inter_cost', text: 'Inter Cost' },
				  { id: 21, value: 'intra_cost', text: 'Intra Cost' },
				  { id: 22, value: 'local_cost', text: 'Local Cost' },
				  { id: 23, value: 'ij_cost', text: 'IJ Cost' },
				  { id: 24, value: 'average_rate', text: 'Average Rate' },
				  { id: 25, value: 'total_calls', text: 'Total Calls' },
				  { id: 26, value: 'not_zero_calls', text: 'Not Zero Calls' },
				  { id: 27, value: 'busy_calls', text: 'Busy Calls' },				  
				],
				temp_show_field_options: [
				  { id: 1, value: 'asr', text: 'ASR' },
				  { id: 2, value: 'acd', text: 'ACD' },
				  { id: 3, value: 'pdd', text: 'PDD' },				 
				  { id: 4, value: 'sd_count', text: 'SD Count' },
				  { id: 5, value: 'sdp', text: 'SDP' },
				  { id: 6, value: 'revenue', text: 'Revenue' },
				  { id: 7, value: 'profit', text: 'Profit' },
				  { id: 8, value: 'margin', text: 'Margin' },
				  { id: 9, value: 'pp_min', text: 'PP Min' },
				  { id: 10, value: 'pp_k_calls', text: 'PP K Calls' },
				  { id: 11, value: 'ppka', text: 'PPKA' },
				  { id: 12, value: 'limited', text: 'Limited' },
				  { id: 13, value: 'total_duration', text: 'Total Duration' },
				  { id: 14, value: 'total_billable_time', text: 'Total Billable Time' },
				  { id: 15, value: 'total_cost', text: 'Total Cost' },
				  { id: 16, value: 'inter_cost', text: 'Inter Cost' },
				  { id: 17, value: 'intra_cost', text: 'Intra Cost' },
				  { id: 18, value: 'local_cost', text: 'Local Cost' },
				  { id: 19, value: 'ij_cost', text: 'IJ Cost' },
				  { id: 20, value: 'average_rate', text: 'Average Rate' },
				  { id: 21, value: 'total_calls', text: 'Total Calls' },
				  { id: 22, value: 'not_zero_calls', text: 'Not Zero Calls' },
				  { id: 23, value: 'busy_calls', text: 'Busy Calls' },				  
				],
				group_by1: 1,
				group_by2: 2,
				group_by3: 3,
				group_by4: 4,
				group_by5: 5,
				group_by6: 6,
				group_options: [
				  { id: 1, value: 'ingress_carrier', text: 'Ingress Carrier' },
				  { id: 2, value: 'ingress_trunk', text: 'Ingress Trunk' },
				  { id: 3, value: 'ingress_country', text: 'Ingress Country' },				 
				  { id: 4, value: 'ingress_code_name', text: 'Ingress Code Name' },
				  { id: 5, value: 'egress_carrier', text: 'Egress Carrier' },
				  { id: 6, value: 'egress_trunk', text: 'Egress Trunk' },
				  { id: 7, value: 'egress_country', text: 'Egress Country' },				 
				  { id: 8, value: 'egress_code_name', text: 'Egress Code Name' },				  				  
				],
				page_row_count: 1,
				page_rows: [
					{ id: 1, text: '10' },
					{ id: 2, text: '20' },
					{ id: 3, text: '30' },
					{ id: 4, text: '50' },
					{ id: 5, text: '100' }
				],
				route_plan_options: [],
				rate_table_options: [],
				rate_display_options: [
					{ id: 1, text: 'Average' },
					{ id: 2, text: 'Actual' },
				],
				tech_prefix: 'All',
				tech_prefix_options: [
					{ id: 'All', text: 'All' },
				],
				routing_plan: '',				
				rate_table: '',
				rate_display: '',
				tech_prefix: '',
				country: '',
				code_name: '',
				
				switch_server: '',				
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
				reports: [],
			    origination_codes: [],
			  	termination_codes: [],
			  	backupDatas: [],
				originations: [],
				terminations: [],
				active_tab_index: 0,
				active_tab_name: "Origination",
			}
        },
		methods: {
			toggleTable(event) {
				var element = event.currentTarget;
				$(element).parents('tr').siblings('.collapse').toggleClass('in');
				$(element).html( $(element).html() == "-" ? "+" : "-");
			},
			handleChange() {

			},
			changePageCount (countPerPage) {
				if (countPerPage !== this.pageOne.cntpage) {
					this.pageOne.cntpage = countPerPage
					this.$nextTick(this.fetchPlans)
				}
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
				if(this.activie_tab_index == 0 || this.active_tab_index == 2){
					this.searchReport();
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
						//['pdd', 'ingress_time', 'ingress_billed_time', 'ingress_cost', 'ingress_call_cost_inter', 'ingress_call_cost_local', 'ingress_calls', 'non_zero_calls', 'ingress_busy_calls'],
						if(value["ingress_calls"] == 0 || value["ingress_calls"] == "") value["asr"] = 0;
						else value["asr"] = value["non_zero_calls"] * 100 / value["ingress_calls"];
						if(isNaN(value["asr"])) value["asr"] = "";
						else{
							value["asr"] = parseFloat(Math.round(value["asr"] * 100) / 100).toFixed(2);
						}

						if(value["non_zero_calls"] == 0 || value["non_zero_calls"] == "") value["acd"] = 0;
						else value["acd"] = value["ingress_time"] * 100 / value["non_zero_calls"];
						if(isNaN(value["acd"])) value["acd"] = "";
						else{
							value["acd"] = parseFloat(Math.round(value["acd"] * 100) / 100).toFixed(2);
						}
					}
					else
					{
						if(value["egress_calls"] == 0 || value["egress_calls"] == "") value["asr"] = 0;
						else value["asr"] = value["non_zero_calls"] * 100 / value["egress_calls"];
						if(isNaN(value["asr"])) value["asr"] = "";
						else{
							value["asr"] = parseFloat(Math.round(value["asr"] * 100) / 100).toFixed(2);
						}

						if(value["non_zero_calls"] == 0 || value["non_zero_calls"] == "") value["acd"] = 0;
						else value["acd"] = value["egress_time"] * 100 / value["non_zero_calls"];
						if(isNaN(value["acd"])) value["acd"] = "";
						else{
							value["acd"] = parseFloat(Math.round(value["acd"] * 100) / 100).toFixed(2);
						}
					}
					displayArray[i] = value;
				}
				if(this.active_tab_index == 0)						
					this.originations = displayArray;
				else
					this.terminations = displayArray;
				this.loading = false;			
			},
			fetchReport: function(start_time = 1501538400, end_time = 1501624900, step = 1440, field_ind = 0, method = 'total')
			{								
				this.loading = true;
										
				var page = this.pageOne.currentPage - 1;
				var per_page = this.pageOne.cntpage;																				
				var strURL;				
				if(this.active_tab_index == 0)
				 	strURL = api.getReport_URL() + "?start_time=" + start_time + "&end_time=" + end_time + "&step=" + step + "&method=" + method + "&field=" + this.orgination_search_field[field_ind];
				else 														
					strURL = api.getReport_URL() + "?start_time=" + start_time + "&end_time=" + end_time + "&step=" + step + "&method=" + method + "&field=" + this.termination_search_field[field_ind];				
				//console.log();
				var authToken = "Token Yuza2L2rlGkdemBeYzL0SVncFafTjYNFSMpShsJT614inGMLDf";		
				console.log(strURL);		
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
						this.fetchReport(start_time, end_time, step, field_ind);					 	
					}
				}, function(error) {	
					this.loading = false;									
				});			
			},
			searchReport: function(){				
				var start_time, end_time, step;									
				if(this.start_date == ""){
					start_time = new Date().getTime() / 1000;					
				}	
				else{
					start_time = new Date(this.start_date).getTime() / 1000;			
				}

				if(this.end_date == ""){
					end_time = new Date().getTime() / 1000;				
				}	
				else{
					end_time = new Date(this.end_date).getTime() / 1000;					
				}	
					
				if(this.by_hours == 1)
				{					
					var diffMs = (end_time - start_time) * 1000;									
					var diffDays = Math.floor(diffMs / 86400000); // days
					var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
					var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes		
					step = diffDays * 1440 + diffHrs * 60 + diffMins;			
				}
				else
					step = this.by_hour_options[this.by_hours - 1].value; 				
				this.fetchReport(start_time, end_time, step);
				
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
						console.log(this.route_plan_options);						
					}
				})
				.catch(error => {
					console.log("Routing Failure");
					console.log(error)
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
						console.log("Rate table success");			
						console.log(this.rate_table_options);						
					}
				})
				.catch(error => {
					console.log("Rate table failure");
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
			fetchRelatedTrunks (type) {				
				var url;
				if(type == 'egress')
					url = api.getEndpointUrl() + '/v1/carrier/' + this.egress_carrier + '/egress_trunk/list';
				else if(type == 'ingress')
					url = api.getEndpointUrl() + '/v1/carrier/' + this.ingress_carrier + '/ingress_trunk/list';
				this.loading = true;
				this.$http.get(url)
				.then(response => {
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
							console.log("Egress: " + this.egress_trunk_options.length);
						}
						else if(type == 'ingress') {
							this.ingress_trunk_options = [];
							trunks.forEach(function (temp, i) {
								var trunk = {};
								trunk.id = temp.resource_id;
								trunk.text = temp.name;
								self.ingress_trunk_options.push(trunk);
							});
							console.log("Inress: " + this.ingress_trunk_options.length);
						}
						this.loading = false;
						console.log("Success");
					}
				})
				.catch(error => {					
					console.log("Failure");
					console.log(error);
					this.loading = false;
				})
			},
			fetchCarriers() {				
				this.loading = true;
				var url;
				 if(this.tmpPageOne.currentPage === 0)
					url = api.getEndpointUrl() + "/v1/carrier/list";
				 else
				 	url = api.getEndpointUrl() + "/v1/carrier/list?page=" + this.tmpPageOne.currentPage
				console.log(url);
				this.$http.get(url, {
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
							
							console.log(this.carrier_options);
						}
					})
					.catch(error => {
						console.log(error)
						this.loading = false;
					})
			},
		}
	}
</script>

<style>
	.white_pad.less_pad {
		padding: 5px 15px 22px 15px;
		margin-top: 10px;
	}
	
	.wrapper.single .white_pad.less_pad .select2,
	.advanced_search_filter_panel .select2 {
		width: 100% !important;
	}
	
	.white_pad.less_pad .page-header {
		margin: 10px 0 5px 0;
	}
	
	.white_pad.less_pad .col-md-6.first {
		padding-right: 7px;
    	padding-left: 15px;
	}
	
	.white_pad.less_pad .col-md-6.second {
		padding-right: 15px;
    	padding-left: 7px;
	}
	
	select.multi {
		border: 1px solid rgb(222, 224, 227);
		border-radius: 5px;
		background-color: rgb(255, 255, 255);
		box-shadow: 0px 2px 7px 0px rgba(184, 187, 196, 0.2);
		padding: 0px;
		height: 193px;
	}
	
	select.multi option {
		padding: 10px;
		border-bottom: 1px solid #dee0e3;
		cursor: pointer;
	}
	
	select.multi option:hover {
		background: #edeff5;
	}
	
	select.multi:focus,
	select.multi option:focus {
		outline: none;
	}
	
	select[multiple]:focus option:checked {
	  background: red linear-gradient(0deg, #03c0fc 0%, #03c0fc 100%);
	}
	
	span.table_time.chart_time.margin_0 {
		margin-left: 2px;
		margin-top: 25px;
	}
	
	table.table.table-striped.table-hover.centrum td,
	table.table.table-striped.table-hover.centrum th {
		vertical-align: middle;
		text-align: center;
	}
	
	@media (min-width: 768px) and (max-width: 979px) {
		.white_pad.less_pad .col-md-6.first,
		.white_pad.less_pad .col-md-6.second {
			padding-right: 10px;
			padding-left: 10px;
		}
		
		.white_pad.less_pad .little-space {
			margin: 5px 0;
		}
	}
	
	@media (max-width: 767px) {
		.advanced_search_filter_panel {
			padding: 10px 0 !important;
		}
		
		.white_pad.less_pad .col-md-6.first,
		.white_pad.less_pad .col-md-6.second {
			padding-right: 10px;
			padding-left: 10px;
		}
		
		.tabs_container {
			padding: 10px !important;
		}
		
		.big_data .advanced_search_filter_panel label {
			margin-top: 10px;
		}
		
	}
	
	tr.accordian-body.collapse.no_padding td, 
	tr.accordian-body.collapse.no_padding td table {
		padding: 0px;
		margin: -1px;
	}
	
	tr.accordian-body.collapse.no_padding td table tr td {
		padding: 10px;
	}
</style>
