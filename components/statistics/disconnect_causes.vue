<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single big_data">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Statistics</a></li>
				  <li class="breadcrumb-item active">Disconnect Causes</li>
			</ol>
			<h1 class="page-header">Disconnect Causes</h1>
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
										<select class="selectable no-min-width" v-model="ingress">
											<option v-for="item in ingress_trunk_options" v-bind:value="item.id">
												{{ item.text }}
											</option>
										</select>
									</div>
									<div class="clearfix little-space"></div>
									<div class="col-md-6">
										<label>Tech Prefix:</label>
										<select2 :options="prefix_options" v-model="prefix">
											<option disabled value="0">Select one</option>
										</select2>
									</div>
									<div class="col-md-6">
										<label for="country">Country:</label>
										<input type="text" name="country" v-model="country" class="form-control" placeholder="Enter Country">
									</div>
									<div class="clearfix little-space"></div>
									<div class="col-md-6">
										<label for="code_name">Code Name:</label>
										<input type="text" name="code_name" v-model="code_name" class="form-control" placeholder="Enter Code Name">
									</div>
									<div class="col-md-6">
										<label>Routing Plan:</label>
										<select2 :options="route_plan_options" v-model="routing_plan">
											<option disabled value="0">Select one</option>
										</select2>
									</div>
									<div class="clearfix little-space"></div>								
									<div class="col-md-6">
										<label>Rate Table:</label>
										<select2 :options="rate_table_options" v-model="rate_table">
											<option disabled value="0">Select one</option>
										</select2>
									</div>
									<div class="clearfix"></div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-sm-6">
							<div class="white_pad less_pad">
								<!--<h1 class="page-header">Outbound</h1> -->
								<div class="row">
									<div class="col-md-6">
										<label>Class4 Server:</label>
										<select2 :options="options" v-model="class4_server">
											<option disabled value="0">Select one</option>
										</select2>
									</div>
									<div class="col-md-6">
										<label for="dnis">DNIS:</label>
										<input type="text" name="dnis" v-model="dnis" class="form-control" placeholder="Enter DNIS">
									</div>
									<div class="clearfix little-space"></div>
									<div class="col-md-6">
										<label for="ani">ANI:</label>
										<input type="text" name="ani" v-model="ani" class="form-control" placeholder="Enter ANI">
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
								<th>Release Cause</th>
								<th>Counts</th>
								<th>Counts %</th>
								<th>Description</th>
							</tr>
						  </thead>
						  <tbody>
							<tr v-if="!filterBy(originations, report).length">
								<td style="text-align: center" colspan="10">No Data Found</td>
							</tr>
							<tr v-for="origination in originations">
							  <td>{{origination.release_cause}}</td>
							  <td>{{origination.counts}}</td>
							  <td>{{origination.counts_percent}}</td>
							  <td>{{origination.description}}</td>
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
				<tab label="Orig. Disc. Cause by Ingress Trunk" class="" icon="dnl_icon dnl_to_left">
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
										<select class="selectable no-min-width" v-model="ingress">
											<option v-for="item in ingress_trunk_options" v-bind:value="item.id">
												{{ item.text }}
											</option>
										</select>
									</div>
									<div class="clearfix little-space"></div>
									<div class="col-md-6">
										<label>Tech Prefix:</label>
										<select2 :options="prefix_options" v-model="prefix">
											<option disabled value="0">Select one</option>
										</select2>
									</div>
									<div class="col-md-6">
										<label for="country">Country:</label>
										<input type="text" name="country" v-model="country" class="form-control" placeholder="Enter Country">
									</div>
									<div class="clearfix little-space"></div>
									<div class="col-md-6">
										<label for="code_name">Code Name:</label>
										<input type="text" name="code_name" v-model="code_name" class="form-control" placeholder="Enter Code Name">
									</div>
									<div class="col-md-6">
										<label>Routing Plan:</label>
										<select2 :options="route_plan_options" v-model="routing_plan">
											<option disabled value="0">Select one</option>
										</select2>
									</div>
									<div class="clearfix little-space"></div>								
									<div class="col-md-6">
										<label>Rate Table:</label>
										<select2 :options="rate_table_options" v-model="rate_table">
											<option disabled value="0">Select one</option>
										</select2>
									</div>
									<div class="clearfix"></div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-sm-6">
							<div class="white_pad less_pad">
								<!-- <h1 class="page-header">Outbound</h1> -->
								<div class="row">								
									<div class="col-md-6">
										<label>Class4 Server:</label>
										<select2 :options="options" v-model="class4_server">
											<option disabled value="0">Select one</option>
										</select2>
									</div>
									<div class="col-md-6">
										<label for="dnis">DNIS:</label>
										<input type="text" name="dnis" v-model="dnis" class="form-control" placeholder="Enter DNIS">
									</div>
									<div class="clearfix little-space"></div>
									<div class="col-md-6">
										<label for="ani">ANI:</label>
										<input type="text" name="ani" v-model="ani" class="form-control" placeholder="Enter ANI">
									</div>								
									<div class="clearfix"></div>
								</div>								
							</div>
						</div>						
						<div class="clearfix"></div>
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
								<th>Carrier</th>
								<th>200 %</th>
								<th>403 %</th>
								<th>404 %</th>
								<th>408 %</th>
								<th>480 %</th>
								<th>481 %</th>
								<th>486 %</th>
								<th>487 %</th>
								<th>500 %</th>
								<th>503 %</th>
								<th>510 %</th>
								<th>604 %</th>
							    <th>Others %</th>
							</tr>
						  </thead>
						  <tbody>
							<tr v-if="!filterBy(carriers, report).length">
								<td style="text-align: center" colspan="14">No Data Found</td>
							</tr>
							  <tr v-for="carrier in carriers">
								  <td>{{carrier.carrier}}</td>
								  <td>{{carrier.e_200}}</td>
								  <td>{{carrier.e_403}}</td>
								  <td>{{carrier.e_404}}</td>
								  <td>{{carrier.e_408}}</td>
								  <td>{{carrier.e_480}}</td>
								  <td>{{carrier.e_481}}</td>
								  <td>{{carrier.e_486}}</td>
								  <td>{{carrier.e_487}}</td>
								  <td>{{carrier.e_500}}</td>
								  <td>{{carrier.e_503}}</td>
								  <td>{{carrier.e_510}}</td>
								  <td>{{carrier.e_604}}</td>
								  <td>{{carrier.others}}</td>
							  </tr>
						  </tbody>
						  <tfoot>
						  	<tr>
						   		<td>Total</td>
								<td>0.000</td>
								<td>0.000</td>
								<td>0.000</td>
								<td>0.000</td>
								<td>0.000</td>
								<td>0.000</td>
								<td>0.000</td>
								<td>0.000</td>
								<td>0.000</td>
								<td>0.000</td>
								<td>0.000</td>
								<td>0.000</td>
								<td>0.000</td>
						  	</tr>
						  </tfoot>
						</table>
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
								<div class="col-md-6">
									<label>Carriers:</label>
									<select class="selectable no-min-width" v-model="egress_carrier" @change="changeEgress">
										<option v-for="item in carrier_options" v-bind:value="item.id">
											{{ item.text }}
										</option>
									</select>
								</div>
								<div class="col-md-6">
									<label>Egress Trunk:</label>
									<select class="selectable no-min-width" v-model="egress">
										<option v-for="item in egress_trunk_options" v-bind:value="item.id">
											{{ item.text }}
										</option>
									</select>
								</div>
								<div class="clearfix little-space"></div>
								<div class="col-md-6">
									<label for="country">Country:</label>
									<input type="text" name="country" v-model="country" class="form-control" placeholder="Enter Country">
								</div>
								<div class="col-md-6">
									<label for="code_name">Code Name:</label>
									<input type="text" name="code_name" v-model="code_name" class="form-control" placeholder="Enter Code Name">
								</div>
								<div class="clearfix"></div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-sm-6">
							<div class="white_pad less_pad">
								<!-- <h1 class="page-header">Outbound</h1>  -->
								<div class="row">
								<div class="col-md-6">
									<label>Class4 Server:</label>
									<select2 :options="options" v-model="class4_server">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-6">
									<label for="dnis">DNIS:</label>
									<input type="text" name="dnis" v-model="dnis" class="form-control" placeholder="Enter DNIS">
								</div>
								<div class="clearfix little-space"></div>
								<div class="col-md-6">
									<label for="ani">ANI:</label>
									<input type="text" name="ani" v-model="ani" class="form-control" placeholder="Enter ANI">
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
						</div>
						<div class="clearfix"></div>
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
								<th>Release Cause</th>
								<th>Counts</th>
								<th>Counts %</th>
							</tr>
						  </thead>
						  <tbody>
							<tr v-if="!filterBy(originations, report).length">
								<td style="text-align: center" colspan="3">No Data Found</td>
							</tr>
							<tr v-for="origination in originations">
							  <td>{{origination.release_cause}}</td>
							  <td>{{origination.counts}}</td>
							  <td>{{origination.counts_percent}}</td>
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
				<tab label="Term. Disc. Cause by Egress Trunk" class="" icon="dnl_icon dnl_to_right">
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
								<div class="col-md-6">
									<label>Carriers:</label>
									<select class="selectable no-min-width" v-model="egress_carrier" @change="changeEgress">
										<option v-for="item in carrier_options" v-bind:value="item.id">
											{{ item.text }}
										</option>
									</select>
								</div>
								<div class="col-md-6">
									<label>Egress Trunk:</label>
									<select class="selectable no-min-width" v-model="egress">
										<option v-for="item in egress_trunk_options" v-bind:value="item.id">
											{{ item.text }}
										</option>
									</select>
								</div>
								<div class="clearfix little-space"></div>
								<div class="col-md-6">
									<label for="country">Country:</label>
									<input type="text" name="country" v-model="country" class="form-control" placeholder="Enter Country">
								</div>
								<div class="col-md-6">
									<label for="code_name">Code Name:</label>
									<input type="text" name="code_name" v-model="code_name" class="form-control" placeholder="Enter Code Name">
								</div>
								<div class="clearfix"></div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-sm-6">
							<div class="white_pad less_pad">
								<!-- <h1 class="page-header">Outbound</h1>  -->
								<div class="row">
								<div class="col-md-6">
									<label>Class4 Server:</label>
									<select2 :options="options" v-model="class4_server">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-6">
									<label for="dnis">DNIS:</label>
									<input type="text" name="dnis" v-model="dnis" class="form-control" placeholder="Enter DNIS">
								</div>
								<div class="clearfix little-space"></div>
								<div class="col-md-6">
									<label for="ani">ANI:</label>
									<input type="text" name="ani" v-model="ani" class="form-control" placeholder="Enter ANI">
								</div>
								<div class="clearfix"></div>
								</div>
							</div>
						</div>																		
						</div>
						<div class="clearfix"></div>
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
								<th>Carrier</th>
								<th>200 %</th>
								<th>403 %</th>
								<th>404 %</th>
								<th>408 %</th>
								<th>480 %</th>
								<th>481 %</th>
								<th>486 %</th>
								<th>487 %</th>
								<th>500 %</th>
								<th>503 %</th>
								<th>510 %</th>
								<th>604 %</th>
							    <th>Others %</th>
							</tr>
						  </thead>
						  <tbody>
							  <tr v-if="!filterBy(carriers, report).length">
								<td style="text-align: center" colspan="14">No Data Found</td>
							</tr>
							  <tr v-for="carrier in carriers">
								  <td>{{carrier.carrier}}</td>
								  <td>{{carrier.e_200}}</td>
								  <td>{{carrier.e_403}}</td>
								  <td>{{carrier.e_404}}</td>
								  <td>{{carrier.e_408}}</td>
								  <td>{{carrier.e_480}}</td>
								  <td>{{carrier.e_481}}</td>
								  <td>{{carrier.e_486}}</td>
								  <td>{{carrier.e_487}}</td>
								  <td>{{carrier.e_500}}</td>
								  <td>{{carrier.e_503}}</td>
								  <td>{{carrier.e_510}}</td>
								  <td>{{carrier.e_604}}</td>
								  <td>{{carrier.others}}</td>
							  </tr>
						  </tbody>
						  <tfoot>
						  	<tr>
						   		<td>Total</td>
								<td>0.000</td>
								<td>0.000</td>
								<td>0.000</td>
								<td>0.000</td>
								<td>0.000</td>
								<td>0.000</td>
								<td>0.000</td>
								<td>0.000</td>
								<td>0.000</td>
								<td>0.000</td>
								<td>0.000</td>
								<td>0.000</td>
								<td>0.000</td>
						  	</tr>
						  </tfoot>
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
		  vSelect = require('vue!../main_components/select.vue'),
		  vSpinner = require('vue!../main_components/fadeloader.vue'),
		  Pagination = require('vue!../main_components/pagination.vue');
		  const api = require("../../api");
		  const	auth = require("../../auth");
	module.exports = {
		created: function(){			
			//this.searchReport();
			this.fetchCarriers();
			// this.fetchAllTrunks('egress');
			// this.fetchAllTrunks('ingress');	
			this.fetchRateTable();
			this.fetchRoutePlans();	
		},
		components: {
			'tabs': vTabs,
			'tab': vTab,
			'select2': vSelect,
			'pagination': Pagination,
			'spinner': vSpinner,
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
				period: '',
				period_options: [
					{id: 'Custom', text: 'Custom'},
					{id: 'Today', text: 'Today'},
					{id: 'Yesterday', text: 'Yesterday'},
					{id: 'Current week', text: 'Current week'},
					{id: 'Previous week', text: 'Previous week'},
					{id: 'Current month', text: 'Current month'},
					{id: 'Previous month', text: 'Previous month'},
				],
				by_hours: 1,
				by_hour_options: [
					{ id: 1, text: 'All Time', value: 0 },
					{ id: 2, text: 'By hours', value: 60 },
					{ id: 3, text: 'By day', value: 1440 },
					{ id: 4, text: 'By month', value: 43200 },
					{ id: 5, text: 'By year', value: 525600 },
				],
				group_by1: 1,
				group_by2: 2,
				group_by3: 3,
				group_by4: 4,
				group_by5: 5,
				group_by6: 6,
				group_options: [
				  { id: 1, value: 'orig_carrier', text: 'Orig Carrier' },
				  { id: 2, value: 'ingress_trunk', text: 'Ingress Trunk' },
				  { id: 3, value: 'term_carrier', text: 'Term Carrier' },
				  { id: 4, value: 'egress_trunk', text: 'Egress Trunk' },				 
				  { id: 5, value: 'orig_code_name', text: 'Orig Code Name' },
				  { id: 6, value: 'orig_country', text: 'Orig Country' },
				  { id: 7, value: 'term_code_name', text: 'Term Code Name' },
				  { id: 8, value: 'term_country', text: 'Term Country' },
				  { id: 9, value: 'switch_ip', text: 'Switch IP' },
				],
				prefix_options: [
				  { id: 1, value: 'all', text: 'All' },				  
			    ],
				prefix: '',
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
				  { id: 1, value: 'release_cause', text: 'Release Cause' },
				  { id: 2, value: 'counts', text: 'Counts' },
				  { id: 3, value: 'counts_percent', text: 'Counts Percent' },				 		
				  { id: 4, value: 'description', text: 'Description' },				  				  
				],
				more_advanced_option: true,
				more_advanced_option_button: "Less Options",
				loading: false,	
				start_date: '',
				end_date: '',
				route_plan_options: [],
				rate_table_options: [],
				routing_plan: '',				
				rate_table: '',
				ingress_trunk: '',
				egress_trunk: '',
				carrier_options: [],
				ingress_trunk_options: [],
				egress_trunk_options: [],
				egress_carrier: '',
				ingress_carrier: '',
				tech_prefix: '',

				origination: [],
				carriers: [],
				class4_server: '',
				dnis: '',
				ani: '',
				
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
				originations: [],			    
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
			handleChange() {

			},
			changePageCount (countPerPage) {
				if (countPerPage !== this.pageOne.cntpage) {
					this.pageOne.cntpage = countPerPage
					this.$nextTick(this.fetchPlans)
				}
			},
			changeTab (tab, index) {				
				if (this.active_tab_index === index) { return }
				this.active_tab_index = index
				this.active_tab_name = tab.name;					
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
	.button_set.m-top-0 {
		margin-top: 0;
	}
	
	tfoot tr td {
		font-weight: bold;
	}
</style>
