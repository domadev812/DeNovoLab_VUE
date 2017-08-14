<template>
	<div class="container-fluid">
	   <modal v-if="showModal=='cdr_email'" @close="showModal = ''" class="big_modal">
		<h3 slot="header">CDR E-mail</h3>
		<div slot="body">
		  <div class="row">
			<div class="col-md-6 col-sm-6">
				<div class="form-group">
					<label for="groupname">From:</label>
					<select2 :options="options" v-model="from"></select2>
				</div>
		    </div>
			<div class="col-md-6 col-sm-6">
				<div class="form-group">
					<label for="to">To:</label> 
					<input type="text" name="to" v-model="to" placeholder="Enter Addressee" class="form-control">
				</div>
		    </div>
			<div class="col-md-6 col-sm-6">
				<div class="form-group">
					<div class="radio radio-success">
						<input id="radio-1" class="radio-custom" name="email_template" type="radio" checked>
						<label for="radio-1" class="radio-custom-label">User Default Template</label>
					</div>
				</div>
			</div>
			<div class="col-md-6 col-sm-6">
				<div class="form-group">
					<div class="radio radio-success">
						<input id="radio-2" class="radio-custom" name="email_template" type="radio">
						<label for="radio-2" class="radio-custom-label">Specify Your Email Content</label>
					</div>
				</div>
			</div>
			<div class="col-md-6 col-sm-6">
				<div class="form-group">
					<label for="copy">Copy:</label> 
					<input type="text" name="copy" v-model="copy" placeholder="Enter Copy" class="form-control">
				</div>
			</div>
			<div class="col-md-6 col-sm-6">
				<div class="form-group">
					<label for="subject">Subject:</label> 
					<input type="text" name="subject" v-model="subject" placeholder="Enter Subject" class="form-control">
				</div>
			</div>
			<div class="col-md-12 ">
			  <label>Content:</label>
			  <ckeditor v-model="contentA" :id="editorA" :height="'280px'" :toolbar="[['Format']]"></ckeditor>
		    </div>
		    <div class="col-md-12 m-top-20">
				<div class="form-group tags">
					<label for="groupname">Tags:</label> 
					<span class="label label-default">#Username</span>
					<span class="label label-default">#Url</span>
					<span class="label label-default">#Welcoms</span>
				</div>
			</div>
		  </div>
		</div>
		<div slot="footer">
			<button @click="" class="btn btn-primary mini submit">Submit</button>
			<button @click="closeModal" class="btn btn-default mini cancel">Cancel</button>
		</div>
	  </modal>
      <div class="row">
		<div class="wrapper single big_data">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Statistics</a></li>
				  <li class="breadcrumb-item active">CDRs Search</li>
			</ol>
			<h1 class="page-header">CDRs Search</h1>
			<spinner v-show="loading" class="spinner"></spinner>			
			<tabs>
				<tab label="CDR Search" class="" icon="dnl_icon dnl_list" selected>
					<div class="advanced_search_filter_panel" >
						<div class="col-md-2 col-sm-4">
							<label>Time:</label>
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
						<div class="col-md-5 col-sm-12 none-left-padding none-right-padding">
							<div class="inlined">
								<div class="col-md-6 col-sm-3">
									<label>GMT:</label>
									<select2 :options="gmt_options" v-model="gmt">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-6 col-sm-3">
									<label>Web:</label>
									<select2 :options="web_options" v-model="web">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
							</div>
							<div class="inlined">
								<div class="col-md-6 col-sm-3">
									<a class="btn btn-primary full-width m-top-20" v-on:click="searchReport()">
										Query
									</a>
								</div>
								<div class="col-md-6 col-sm-3">
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
									<label>Ingress:</label>
									<select class="selectable no-min-width" v-model="ingress">
										<option v-for="item in ingress_trunk_options" v-bind:value="item.id">
											{{ item.text }}
										</option>
									</select>
								</div>
								<div class="clearfix little-space"></div>
								<!-- <div class="col-md-6 first">
									<label>Tech Prefix:</label>
									<select2 :options="options" v-model="carriers">
										<option disabled value="0">Select one</option>
									</select2>
								</div> -->
								<div class="col-md-6 first">
									<label for="country">Country:</label>
									<input type="text" name="country" v-model="country" class="form-control" placeholder="Enter Country">
								</div>
								<div class="col-md-6 second">
									<label for="code_name">Code Name:</label>
									<input type="text" name="code_name" v-model="code_name" class="form-control" placeholder="Enter Code Name">
								</div>
								<div class="clearfix little-space"></div>
								<div class="col-md-6 first">
									<label for="code">Code:</label>
									<input type="text" name="code" v-model="code" class="form-control" placeholder="Enter Code">
								</div>
								<div class="col-md-6 second">
									<label>Duration:</label>
									<select2 :options="duration_options" v-model="duration">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="clearfix little-space"></div>
								<div class="col-md-6 first">
									<label for="ani">ANI:</label>
									<input type="text" name="ani" v-model="ani" class="form-control" placeholder="Enter ANI">
								</div>
								<div class="col-md-6 second">
									<label for="orig_call_id">Orig Call ID</label>
									<input type="text" name="orig_call_id" v-model="orig_call_id" class="form-control" placeholder="Enter Orig Call ID">
								</div>
								<div class="clearfix little-space"></div>
								<div class="col-md-6 first">
									<label>DNIS:</label>
									<select2 :options="dnis_options" v-model="dnis">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-6 second">
									<label for="dnis2" class="m-top-15"></label>
									<input type="text" name="dnis2" v-model="dnis2" class="form-control" placeholder="Enter DNIS">
								</div>
								<div class="clearfix little-space"></div>
								<div class="col-md-6 first">
									<label>Show:</label>
									<select2 :options="show_options" v-model="show">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<!-- <div class="col-md-6 second">
									<label for="response_code" class="m-top-15"></label>
									<input type="text" name="response_code" v-model="response_code" class="form-control" placeholder="Response Code">
								</div>
								<div class="clearfix little-space"></div>
								<div class="col-md-6 second">
									<label>Release Cause:</label>
									<select2 :options="options" v-model="release_cause">
										<option disabled value="0">Select one</option>
									</select2>
								</div> -->
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
									<select class="selectable" v-model="egress_carrier" @change="changeEgress">
										<option v-for="item in carrier_options" v-bind:value="item.id">
											{{ item.text }}
										</option>
									</select>
								</div>
								<div class="col-md-6 second">
									<label>Egress Trunk:</label>
									<select class="selectable" v-model="egress_trunk">
										<option v-for="item in egress_trunk_options" v-bind:value="item.id">
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
									<label for="code_name">Code Name:</label>
									<input type="text" name="code_name" v-model="code_name" class="form-control" placeholder="Enter Code Name">
								</div>
								<div class="clearfix little-space"></div>
								<div class="col-md-6 first">
									<label for="code">Code:</label>
									<input type="text" name="code" v-model="code" class="form-control" placeholder="Enter Code">
								</div>
								<div class="col-md-6 second">
									<label>Class4-server:</label>
									<select2 :options="options" v-model="class4_server">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<!-- <div class="clearfix little-space"></div>
								<div class="col-md-6 first">
									<label for="interval_second">Interval Second:</label>
									<input type="text" name="interval_second" v-model="interval_second" class="form-control" placeholder="Enter Interval">
								</div>
								<div class="col-md-6 second">
									<label for="interval_second2" class="m-top-15"></label>
									<input type="text" name="interval_second2" v-model="interval_second2" class="form-control" placeholder="Enter Interval">
								</div>
								<div class="clearfix little-space"></div>
								<div class="col-md-6 first">
									<label>Response from Egress:</label>
									<select2 :options="options" v-model="response_from_egress">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-6 second">
									<label for="response_code" class="m-top-15"></label>
									<input type="text" name="response_code" v-model="response_code" class="form-control" placeholder="Response Code">
								</div> -->
								<div class="clearfix little-space"></div>
								<div class="col-md-6 first">
									<label for="ani">ANI:</label>
									<input type="text" name="ani" v-model="ani" class="form-control" placeholder="Enter ANI">
								</div>
								<div class="col-md-6 second">
									<label for="term_call_id">Term Call ID</label>
									<input type="text" name="term_call_id" v-model="term_call_id" class="form-control" placeholder="Enter Term Call ID">
								</div>
								<div class="clearfix little-space"></div>
								<div class="col-md-6 first">
									<label>DNIS:</label>
									<select2 :options="dnis_options" v-model="dnis">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-6 second">
									<label for="dnis2" class="m-top-15"></label>
									<input type="text" name="dnis2" v-model="dnis2" class="form-control" placeholder="Enter DNIS">
								</div>
								<div class="clearfix"></div>
								</div>
							</div>
						</div>
						<div class="col-md-4 col-sm-12">
							<div class="white_pad less_pad">
								<h1 class="page-header">Fields</h1>
								<label for="groupname">Show Fields:</label>
								<select multiple class="multi cdrs-search-field">
									<option v-for="option in show_field_options" :value='option.value'>{{option.text}}</option>
								</select>								
								<div class="clearfix"></div>
							</div>
							<div class="clearfix"></div>
							<div class="inlined">															
								<a class="btn btn-primary full-width">
									Save fields as default 
								</a>
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
								<th>Tax</th>
								<th>Call Duration</th>
								<th>Egress Alias</th>
								<th>Ingress Alias</th>
								<th>ORIG DST Number</th>
								<th>PDD(ms)</th>
								<th>ORIG SRC Number</th>
								<th>Release Cause</th>
								<th>Response from Egress</th>
								<th>Orig Call Duration</th>
								<th>Response to Ingress</th>
								<th>Time</th>
								<th>Origination Profile IP</th>
							</tr>
						  </thead>
						  <tbody>
							<tr v-if="!filterBy(cdrs, cdr).length">
								<td style="text-align: center" colspan="13">No Data Found</td>
							</tr>
							<tr v-for="cdr in cdrs">
							  <td>{{cdr.tax}}</td>
							  <td>{{cdr.call_duration}}</td>
							  <td>{{cdr.egress_alias}}</td>
							  <td>{{cdr.ingress_alias}}</td>
							  <td>{{cdr.orig_dst_number}}</td>
							  <td>{{cdr.pdd}}</td>
							  <td>{{cdr.orig_src_number}}</td>
							  <td>{{cdr.release_cause}}</td>
							  <td>{{cdr.response_from_egress}}</td>
							  <td>{{cdr.orig_call_duration}}</td>
							  <td>{{cdr.response_to_ingress}}</td>
							  <td>{{cdr.time}}</td>
							  <td>{{cdr.origination_profile_ip}}</td>
							</tr>
						  </tbody>
						</table>
					</div>
				</tab>
				<tab label="CDR Export Log" class="" icon="dnl_icon dnl_qos_report">
					<div class="advanced_search_filter_panel">
						<div class="col-md-5 col-sm-5 none-left-padding none-right-padding">
							<div class="inlined col-md-6">
								<label for="time_1">Start Time:</label>
								<el-date-picker style="width: 100%;" type="datetime" v-model="start_date" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
							<div class="inlined col-md-6">
								<label for="time_2">End Time:</label>
								<el-date-picker style="width: 100%;" type="datetime" v-model="end_date" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
						</div>
						<a class="btn btn-primary mini m-top-20">
							<span class="dnl_icon dnl_reload"></span> Refresh 
						</a>
						<!--<div class="col-md-2 col-sm-3">
								<a class="btn btn-primary full-width m-top-25" v-on:click="">
										Submit
								</a>
						</div>-->
					<div class="clearfix little-space"></div>
					</div>
					<div class="table_filters">
						<div class="inline-block select_min_wrapper">
							<span class="inline-block">Page row:</span>
							<select2 :options="page_rows" v-model="page_row_count" class="inline-block" @pagecount="changePageCount">
							</select2>
						</div>											
					</div>
					<div class="table-responsive">
						<table class="table table-striped table-hover carrier_groups centrum">
						  <thead>
							<tr>
								<th>Job ID</th>
								<th>Tiggered Start Time</th>
								<th>Tiggered End Time</th>
								<th>Status</th>
								<th>Progress(h)</th>
								<th>Number of Rows</th>
								<th>File Size</th>
								<th class="width-170">Action</th>
							</tr>
						  </thead>
						  <tbody v-for="cdr_log in cdr_logs">
							<tr>
							  <td>{{cdr_log.job_id}}</td>
							  <td>{{cdr_log.tiggered_start_time}}</td>
							  <td>{{cdr_log.tiggered_end_time}}</td>
							  <td>{{cdr_log.status}}</td>
							  <td>{{cdr_log.progress}}</td>
							  <td>{{cdr_log.row_numbers}}</td>
							  <td>{{cdr_log.file_size}}</td>
							  <td>
								   <a class="action action_info" data-toggle="tooltip" data-placement="top" title="Progress Info">
									  <span class="dnl_icon dnl_info"></span>
								   </a>
								   <a class="action action_menu" data-toggle="tooltip" data-placement="top" title="Download">
									  <span class="dnl_icon dnl_download"></span>
								   </a>
								   <a class="action action_rollback" data-toggle="tooltip" data-placement="top" title="Reprocess">
									  <span class="dnl_icon dnl_reply"></span>
								   </a>
								   <a @click="showModal = 'cdr_email'" class="action action_send" data-toggle="tooltip" title="Send E-mail">
									  <span class="dnl_icon dnl_support"></span>
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
		  vSpinner = require('vue!../main_components/fadeloader.vue'),
		  multiselect = require('multiselect'),
		  Pagination = require('vue!../main_components/pagination.vue'),
		  modal = require('vue!../main_components/modal.vue'),
		  Ckeditor = require('vue!../main_components/ckeditor.vue');
		  const api = require("../../api");
	      const auth = require("../../auth");
	module.exports = {
		created: function(){			
			this.searchReport();
			this.fetchCarriers();
			this.fetchAllTrunks('egress');
			this.fetchAllTrunks('ingress');
		},
		components: {
			'tabs': vTabs,
			'tab': vTab,
			'select2': vSelect,
			'spinner': vSpinner,
			'multiselect': multiselect,
			'pagination': Pagination,
			'modal': modal,
			Ckeditor
		},
		data: function(){
            return {
				dnis_options: [
					{id: 'with_prefix', text: 'With Prefix'},
					{id: 'without_prefix', text: 'Without Prefix'},
				],
				show_options: [
					{id: 'show_all', text: 'Show All'},
					{id: 'authorized_ips_only', text: 'Authorized IPs only'},
				],
				duration_options: [
					{id: 'all', text: 'all'},
					{id: 'non-zero', text: 'non-zero'},
					{id: 'zero', text: 'zero'},
				],
				page_row_count: 1,
				page_rows: [
					{ id: 1, text: '10' },
					{ id: 2, text: '20' },
					{ id: 3, text: '30' },
					{ id: 4, text: '50' },
					{ id: 5, text: '100' }
				],
				ingress_trunk_options: [],
				egress_trunk_options: [],
				egress_carrier: '',
				ingress_carrier: '',
				carrier_options: [],				
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
				show_field_options: [
				  { id: 1, value: 'answer_time', text: 'Answer Time' },
				  { id: 2, value: 'call_duration', text: 'Call Duration'},
				  { id: 3, value: 'call_duration_in_ms', text: 'Call duration in ms' },
				  { id: 4, value: 'dynamic_route_name', text: 'Dynamic Route Name' },
				  { id: 5, value: 'egress_alias', text: 'Egress Alias' },
				  { id: 6, value: 'egress_bill_minute', text: 'Egress Bill Minutes' },
				  { id: 7, value: 'egress_bill_result', text: 'Egress Bill Result' },
				  { id: 8, value: 'egress_bill_time', text: 'Egress Bill Time' },
				  { id: 9, value: 'egress_code_acd', text: 'Egress CODE ACD' },
				  { id: 10, value: 'egress_code_asr', text: 'Egress CODE ASR' },
				  { id: 11, value: 'egress_client_currency', text: 'Egress Client Currency' },
				  { id: 12, value: 'egress_client_name', text: 'Egress Client Name' },
				  { id: 13, value: 'egress_cost', text: 'Egress Cost' },
				  { id: 14, value: 'egress_dnis_type', text: 'Egress Dnis Type' },
				  { id: 15, value: 'egress_media_port', text: 'Egress Media Port' },
				  { id: 16, value: 'egress_name', text: 'Egress Name' },
				  { id: 17, value: 'egress_rate', text: 'Egress Rate' },
				  { id: 18, value: 'egress_rate_id', text: 'Egress Rate ID' },
				  { id: 19, value: 'egress_rate_table_name', text: 'Egress Rate Table Name' },
				  { id: 20, value: 'egress_rate_type', text: 'Egress Rate Type' },
				  { id: 21, value: 'egress_register_user', text: 'Egress Register User' },
				  { id: 22, value: 'egress_six_seconds', text: 'Egress Six Seconds' },
				  { id: 23, value: 'egress_trunk_trace', text: 'Egress Trunk Trace' },
				  { id: 24, value: 'end_time', text: 'End Time' },
				  { id: 25, value: 'final_route', text: 'Final Route' },
				  { id: 26, value: 'ingress_alias', text: 'Ingress Alias' },
				  { id: 27, value: 'ingress_bill_minute', text: 'Ingress Bill Minute' },
				  { id: 28, value: 'ingress_client_bill_result', text: 'Ingress Client Bill Result' },
				  { id: 29, value: 'ingress_client_bill_time', text: 'Ingress Client Bill Time' },
				  { id: 30, value: 'ingress_client_cost', text: 'Ingress Client Cost' },			
				  { id: 31, value: 'ingress_client_currency', text: 'Ingress Client Currency' },
				  { id: 32, value: 'ingress_client_name', text: 'Ingress Client Name' },
				  { id: 33, value: 'ingress_client_rate', text: 'Ingress Client Rate' },
				  { id: 34, value: 'ingress_client_rate_table_name', text: 'Ingress Client Rate Table Name' },
				  { id: 35, value: 'ingress_dnis_type', text: 'Ingress DNIS Type' },
				  { id: 36, value: 'ingress_id', text: 'Ingress ID' },
				  { id: 37, value: 'ingress_rate_id', text: 'Ingress Rate ID' },
				  { id: 38, value: 'ingress_rate_type', text: 'Ingress Rate Type' },
				  { id: 39, value: 'ingress_register_user', text: 'Ingress Register User' },
				  { id: 40, value: 'lrn_number', text: 'LRN Number' },
				  { id: 41, value: 'lrn_source', text: 'LRN Source' },
				  { id: 42, value: 'lnp_dipping_cost', text: 'Lnp Dipping Cost' },
				  { id: 43, value: 'orig_codecs', text: 'ORIG Codecs' },
				  { id: 44, value: 'orig_dst_number', text: 'ORIG DST Number' },
				  { id: 45, value: 'orig_ip', text: 'ORIG IP' },
				  { id: 46, value: 'orig_src_number', text: 'ORIG SRC Number' },
				  { id: 47, value: 'orig_term_release', text: 'ORIG/TERM Release' },
				  { id: 48, value: 'orig_call_duration', text: 'Orig Call Duration' },
				  { id: 49, value: 'orig_code', text: 'Orig Code' },
				  { id: 50, value: 'orig_code_name', text: 'Orig Code Name' },
				  { id: 51, value: 'orig_country', text: 'Orig Country' },
				  { id: 52, value: 'orig_delay_second', text: 'Orig Delay Second' },
				  { id: 53, value: 'orig_media_ip', text: 'Orig Media IP' },
				  { id: 54, value: 'orig_media_port', text: 'Orig Media Port' },
				  { id: 55, value: 'orig_switch_ip', text: 'Orig Switch IP' },
				  { id: 56, value: 'origination_call_id', text: 'Origination Call ID' },
				  { id: 57, value: 'origination_local_payload_ip', text: 'Origination Local Payload IP' },
				  { id: 58, value: 'origination_local_payload_port', text: 'Origination Local Payload Port' },
				  { id: 59, value: 'origination_call_id', text: 'Origination Call ID' },
				  { id: 60, value: 'origination_profile_port', text: 'Origination Profile Port' },
				  { id: 61, value: 'pdd', text: 'Pdd' },
				  { id: 62, value: 'release_cause', text: 'Release Cause' },
				  { id: 63, value: 'response_from_egress', text: 'Response From Egress' },
				  { id: 64, value: 'response_to_igress', text: 'Response To Igress' },
				  { id: 65, value: 'ring_time', text: 'Ring Time' },
				  { id: 66, value: 'routing_plan_name', text: 'Routing Plan Name' },
				  { id: 67, value: 'static_route_name', text: 'Static Route Name' },
				  { id: 68, value: 'term_codecs', text: 'Term Codecs' },
				  { id: 69, value: 'term_dst_number', text: 'Term DST Number' },
				  { id: 70, value: 'term_ip', text: 'Term IP' },
				  { id: 71, value: 'term_src_number', text: 'Term src Number' },
				  { id: 72, value: 'tax', text: 'Tax' },
				  { id: 73, value: 'term_code', text: 'Term Code' },
				  { id: 74, value: 'term_code_name', text: 'Term Code Name' },
				  { id: 75, value: 'term_country', text: 'Term Country' },
				  { id: 76, value: 'term_delay_second', text: 'Term Delay Second' },
				  { id: 77, value: 'term_media_ip', text: 'Term Media IP' },
				  { id: 78, value: 'termination_call_id', text: 'Termination Call ID' },
				  { id: 79, value: 'termination_local_payload_ip', text: 'Termination Local Payload IP' },
				  { id: 80, value: 'termination_local_payload_port', text: 'Termination Local Payload Port' },
				  { id: 81, value: 'termination_profile_id', text: 'Termination Profile ID' },
				  { id: 82, value: 'termination_profile_port', text: 'Termination Profile Port' },
				  { id: 83, value: 'time', text: 'Time' },
				  { id: 84, value: 'translation_ani', text: 'Translation ANI' },
				  { id: 85, value: 'translation_dnis', text: 'Translation DNIS' },
				  { id: 86, value: 'trunk_type', text: 'Trunk Type' },
				  { id: 87, value: 'translation_ani', text: 'Translation ANI' },
			    ],				
				more_advanced_option: true,
				more_advanced_option_button: "Less Options",
				loading: false,	

				fetchType: 'websocket',
				token: 'Token Yuza2L2rlGkdemBeYzL0SVncFafTjYNFSMpShsJT614inGMLDf',
				host: 'http://192.99.10.113:8888',
				query_json: {
					start_time: 1501027200	,
					end_time: 1501113599,
					egress_rcause: 'NORMAL_CLEARING',
					format: 'json',
					human_readable: 1					
				},
				editorA: 'editor-a',
			    contentA: '',
				copy: '',
				subject: '',
				to: '',
				
				carriers: '',
				start_date: '',
				end_date: '',
				from: '',
				
				carrirers: '',
				ingress: '',
				tech_prefix: '',
				country: '',
				code_name: '',
				code: '',
				response_code: '',
				response_to_ingress: '',
				duration: 'all',
				release_cause: '',
				egress_trunk: '',
				orig_call_id: '',
				ani: '',
				dnis2: '',
				dnis: '',
				interval_second: '',
				interval_second2: '',
				response_from_egress: '',
				cost: '',
				class4_server: '',
				term_call_id: '',
				rate_type: '',
				currency: '',
				type: '',
				show: 'show_all',
				showModal: '',
				selected1: '',
				selected2: '',
				rate_display: '',
				tiggered_time_1: '',
				tiggered_time_2: '',
				options: [
				  { id: 1, value: 'carrier1', text: 'Carrier 1' },
				  { id: 2, value: 'carrier2', text: 'Carrier 2' },
				  { id: 3, value: 'carrier3', text: 'Carrier 3' },
				  { id: 4, value: 'carrier4', text: 'Carrier 4' },
				  { id: 5, value: 'carrier5', text: 'Carrier 5' }
			    ],
				cdrs: [],
			    cdr_logs: [
					{
					  job_id: "#85",
					  tiggered_start_time: "2017-01-31 07:52:26+00",
					  tiggered_end_time: "2017-01-31 23:59:59+00",
					  status: 'Done',
					  progress: '11/11',
					  row_numbers:'11',
					  file_size: '421 Bytes'
					},
					{
					  job_id: "#85",
					  tiggered_start_time: "2017-01-31 07:52:26+00",
					  tiggered_end_time: "2017-01-31 23:59:59+00",
					  status: 'Done',
					  progress: '11/11',
					  row_numbers:'11',
					  file_size: '421 Bytes'
					},
					{
					  job_id: "#85",
					  tiggered_start_time: "2017-01-31 07:52:26+00",
					  tiggered_end_time: "2017-01-31 23:59:59+00",
					  status: 'Done',
					  progress: '11/11',
					  row_numbers:'11',
					  file_size: '421 Bytes'
					},
					{
					  job_id: "#85",
					  tiggered_start_time: "2017-01-31 07:52:26+00",
					  tiggered_end_time: "2017-01-31 23:59:59+00",
					  status: 'Done',
					  progress: '11/11',
					  row_numbers:'11',
					  file_size: '421 Bytes'
					},
					{
					  job_id: "#85",
					  tiggered_start_time: "2017-01-31 07:52:26+00",
					  tiggered_end_time: "2017-01-31 23:59:59+00",
					  status: 'Done',
					  progress: '11/11',
					  row_numbers:'11',
					  file_size: '421 Bytes'
					}
			    ]
			}
        },
		methods: {
			changeEgress() {
				this.fetchRelatedTrunks('egress');
			},
			changeIngress() {
				this.fetchRelatedTrunks('ingress');
			},
			changePageCount() {
				
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
						//console.log(trunks);
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
					//console.log(error)
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
					url = api.getEndpointUrl() + "/v1/carrier/list"
				else
					url = api.getEndpointUrl() + "/v1/carrier/list?page=" + this.tmpPageOne.currentPage
				//console.log(url);
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
							//console.log(this.carrier_options);
						}
					})
					.catch(error => {
						//console.log(error)
						this.loading = false;
					})
			},
			pageOneChanged (pageNum) {
				this.pageOne.currentPage = pageNum
			},
			closeModal: function() {
				this.showModal = '';
			},
			fetchCDRs: function(start_time = 1501027200, end_time = 1501113599, egress_rcause = 'NORMAL_CLEARING'){
				this.loading = true;
				console.log("getting CDR lists");				
				var page = this.pageOne.currentPage - 1;
				var per_page = this.pageOne.cntpage;								
																				
				var authToken = "Token Yuza2L2rlGkdemBeYzL0SVncFafTjYNFSMpShsJT614inGMLDf";	
				var strURL = api.getCDR_URL() + "?start_time=" + start_time + "&end_time=" + end_time + "&egress_rcause=" + egress_rcause + "&format=json&human_readable=1";
							
				this.$http.get(api.getCDR_URL() + "?start_time=" + start_time + "&end_time=" + end_time + "&egress_rcause=" + egress_rcause + "&format=json&human_readable=1",
				{
					headers: {
						"Authorization": this.token						
					}
				}).then(function(response) {					
					console.log("Success");
					this.loading = false;																		
					var cdrs = response.body.data;										
					this.cdrs = cdrs;										
				}, function(error) {					
					this.loading = false;	
					this.cdrs = null;											
					console.log(error);
				});			
			},
			searchReport: function(){				
				var start_time, end_time;						
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
				this.fetchCDRs(start_time, end_time);	
			},
			makeRequest(type, url, query_json, token) {				
				let hRequest = prepareRequest(type, url, query_json, token); //requirement check spelling
				hRequest.onreadystatechange = e => {
					if (hRequest.readyState == 4) {
						this.response = JSON.parse(hRequest.responseText);
					}					
				}
			},
		},
		mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
		}
	}
	var websocket = null;
	var websocket_host = 'ws://192.99.10.113:';

	function prepareRequest(type, url, query_json, token) {		
		let hRequest = new XMLHttpRequest();
		let query_string = makeQueryString(query_json);
		if (type == 'GET')
			url += '?' + query_string;
		hRequest.open(type, url, true);
		hRequest.setRequestHeader('Authorization', token);
		hRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		console.log("query: " + query_string);
		if (type == 'POST') {
			hRequest.send(query_string);
		} else {
			hRequest.send();
		}
		return hRequest;
	}
	//This function transform object to urlencoded string
	function makeQueryString(query_json) {		
		let keys = Object.keys(query_json);
		let result = '';
		console.log("query: " + query_json);
		console.log(keys);
		keys.forEach((item, id, keys) => {
			let value = ''
			if (Array.isArray(item)) {
				item.forEach((e, i, item) => value += e + ',');
			} else {
				value = query_json[item];
			}
			result += item + '=' + value + '&';
		})

		result = result.substr(0, result.length - 1);
		return result;
	}
</script>

<style>
	.tab span.dnl_icon.dnl_qos_report {
		font-size: 20px;
		float: left;
		margin-right: 6px;
		margin-top: -2px;
	}
	
	.tab span.dnl_icon.dnl_list {
		margin-right: 5px;
	}
</style>
