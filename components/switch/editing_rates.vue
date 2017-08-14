<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Switch</a></li>
                  <li class="breadcrumb-item">
                      <router-link to="/switch/rate_table">Rate Table</router-link>
                  </li>
				  <li class="breadcrumb-item active">Editing Rates</li>
			</ol>
			<h1 class="page-header">Editing Rates</h1>
            <confirm v-show="showModal" @close="showModal = false" @submit="submit"></confirm>
            <router-link to="/switch/rate_table/" class="btn btn_white back">
                <span class="dnl_icon dnl_import"></span> Back 
            </router-link>
			<tabs>
				<tab label="Rates" class="" icon="dnl_icon dnl_list" selected>
                    <div class="btn-group" role="group">
                      <!-- <button type="button" class="btn btn-default" @click="showAll">
                          <span class="dnl_icon dnl_eye"></span> Show All
                      </button> -->
                      <!-- <button type="button" class="btn btn-default">
                          <span class="dnl_icon dnl_action_edit"></span> Mass Edit
                      </button> -->
                      <button type="button" class="btn btn-default" @click="addRate">
                          <span class="dnl_icon dnl_add"></span> Create New
                      </button> 
                      <button type="button" class="btn btn-default" @click="deleteSelected">
                          <span class="dnl_icon dnl_action_delete"></span> Delete Selected
                      </button> 
                      <button type="button" class="btn btn-default" @click="deleteAll">
                          <span class="dnl_icon dnl_action_delete"></span> Delete All
                      </button>
                    </div>
                    <div class="advanced_search_filter_panel">
						<div class="inline-block search_wrapper">
							<label>Search:</label>
							<br>
							<input type="text" name="search" v-model="search" class="form-control inline-block search_field" placeholder="Enter Search">
							<span class="dnl_icon dnl_musica-searcher"></span>
						</div>
                        <!--
						<div class="inline-block">
							<label>Effective Date:</label>
							<br>
                            <input type="text" name="effective_date" v-model="effective_date" class="form-control" placeholder="Enter Effective Date">
						</div>
						<div class="inline-block">
							<label>Group:</label>
							<br>
							<select2 :options="options" v-model="group">
								<option disabled value="0">Show/Hide Columns</option>
							</select2>
						</div>
                        -->
					</div>
					<div class="table_filters">
						<div class="inline-block select_min_wrapper">
							<span class="inline-block">Page row:</span>
							<select2 :options="options1" v-model="selected1" class="inline-block" @pagecount="changePageCount">
							</select2>
						</div>
						<div class="inline-block">
							<!--<select2 :options="options2" v-model="selected2">
								<option disabled value="0">Show/Hide Columns</option>
							</select2>-->
							<el-select v-model="rates_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
								<el-option v-for="item in rates_table_column_options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="table-responsive">
						<table class="table table-striped table-hover agents ">
						  <thead>
							<tr>
							  <th class="width-65">
								  <div class="checkbox checkbox-success">
                                    <input id="select_all" name="select_all" type="checkbox" v-model="checker" v-on:click="clickSelectedAll"> 
                                    <label for="select_all"></label>
                                    <!--                                      
									<input type="checkbox" v-model="checker">
									<label></label>
                                    -->
								  </div>
							  </th>
							  <th v-if="showcolumns[0]">Code</th>
							  <th v-if="showcolumns[1]">Code Name</th>
							  <th v-if="showcolumns[2]">Country</th>
							  <th v-if="showcolumns[3]">Rate</th>
                              <th v-if="showcolumns[4]">Effective Date</th>
							  <th v-if="showcolumns[5]">End Date</th>
                              <th v-if="showcolumns[6]">Extra Fields</th>
							  <th v-if="showcolumns[7]">Action</th>
							</tr>
						  </thead>
						  <tbody>
                            <tr v-if="!filterBy(templateList, search).length">
                                <td style="text-align: center" colspan="9">No Data Found</td>
                            </tr>										
                              
                            <template v-for="(rate, index) in filterBy(templateList, search)">
							<tr>
							  <td class="centred_checkbox">
								  <div class="checkbox checkbox-success">
									<input v-bind:id="'selected-' + index" v-bind:name="'selected-' + index" type="checkbox" v-model="rate.selected">
									<label v-bind:for="'selected-' + index"></label>
								  </div>
							  </td>
							  <td v-if="showcolumns[0]">
                                  <input type="text" v-model="rate.code" class="form-control">
                              </td>
							  <td v-if="showcolumns[1]">
                                  <input type="text" v-model="rate.code_name" class="form-control">
                              </td>
							  <td v-if="showcolumns[2]">
                                  <input type="text" v-model="rate.country" class="form-control">
                              </td>
							  <td v-if="showcolumns[3]">
                                  <input type="text" v-model="rate.rate" class="form-control">
                              </td>
                              
                              <td v-if="showcolumns[4]"><el-date-picker v-model="rate.effective_date" type="date" placeholder="Effective Date"></el-date-picker></td>
                              <td v-if="showcolumns[5]"><el-date-picker v-model="rate.end_date" type="date" placeholder="End Date"></el-date-picker></td>

                              <!--
                              <td>
                                  <input type="text" v-model="rate.effective_date" class="form-control">
                              </td>
							  <td>
                                  <input type="text" v-model="rate.end_date" class="form-control">
                              </td>
                              -->

							  <td v-if="showcolumns[6]"><router-link to="" @click.native="showHideExtraField(rate)">{{rate.more_less}}</router-link></td>
							  <td v-if="showcolumns[7]" class="width-65">
								  <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="delete_rate(index)">
									  <span class="dnl_icon dnl_action_delete"></span>
								  </a>
							 </td>
							</tr>
                            <tr v-if="rate.show_extra_field && showcolumns[6]">
                                <td colspan="11">
                                    <div class="col-md-2">
                                        <label for="setup_fee">Setup Fee:</label>
                                        <input type="text" name="setup_fee" v-model="rate.setup_fee" class="form-control" placeholder="Enter Setup Fee">
                                    </div>
                                    <div class="col-md-2">
                                        <label for="min_time">Min Time:</label>
                                        <input type="text" name="min_time" v-model="rate.min_time" class="form-control" placeholder="Enter Min Time">
                                    </div>
                                    <div class="col-md-2">
                                        <label for="interval">Sec Interval:</label>
                                        <input type="text" name="interval" v-model="rate.interval" class="form-control" placeholder="Enter Interval">
                                    </div>
                                    <div class="col-md-2">
                                        <label for="time_profile_id">Sec Profile:</label>
                                        <select2 :value="rate.time_profile_id" :options="time_profile_list" v-model="rate.time_profile_id" style="width: 100%">
                                            <option disabled value="0">Select Profile</option>
                                        </select2>
                                    </div>
                                    <div class="col-md-2">
                                        <label for="local_rate">Local Rate:</label>
                                        <input type="text" name="local_rate" v-model="rate.local_rate" class="form-control" placeholder="Enter Local Rate">
                                    </div>
                                </td>
                            </tr>
                            </template>
						  </tbody>
						</table>
					</div>
						<div class="button_set little-space">
							<button class="btn btn-primary" v-on:click="validateBeforeSubmit">
								Submit
							</button>
							<button class="btn btn-default" v-on:click="reset">
								Reset
							</button>
						</div>
                    
					<div class="pull-right pagination">
						<pagination :current-page="pageOne.currentPage"
									:total-pages="pageOne.totalPages"
									@page-changed="pageOneChanged">
						</pagination>
					</div>
					<div class="clearfix"></div>
				</tab>
				<tab label="Import" class="" icon="dnl_icon dnl_import">
					<div class="row">
					  <div class="col-md-3 col-sm-4">
                        <label>Import File:</label>
                        <dropzone id="myVueDropzone" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
                    </div>
                    <div class="col-md-3 col-sm-4">
                        <div class="form-group full-width-select">
                            <label>Rate Upload Template:</label>
                            <select2 :options="options2" v-model="rate_upload_template">
                                <option disabled value="0">Show/Hide Columns</option>
                            </select2>
                        </div>
                        <div class="form-group full-width-select">
                            <label>Effective Date Format:</label>
                            <select2 :options="options2" v-model="effective_date_format">
                                <option disabled value="0">Show/Hide Columns</option>
                            </select2>
                        </div>
                        <div class="form-group">
                            <div class="checkbox checkbox-success inline-block v-top">
                                <input type="checkbox" id="che1" name="che1" v-model="checkbox_1">
                                <label for="che1">File With Header:</label>
                            </div>
                            <div class="checkbox checkbox-success inline-block v-top">
                                <input type="checkbox" id="che2" name="che2" v-model="checkbox_2">
                                <label for="che2">Append Prefix:</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-4">
                        <label>For rate record with the same code and effective date is found:</label>
                        <div class="form-group">
                            <div class="radio radio-success m-top-5">
                                <input id="radio-1" class="radio-custom" name="duplicates" type="radio" checked>
                                <label for="radio-1" class="radio-custom-label">Delete Existing Records</label>
                            </div>
                            <div class="radio radio-success m-left-10 m-top-5">
                                <input id="radio-2" class="radio-custom" name="duplicates" type="radio">
                                <label for="radio-2" class="radio-custom-label">End-Date Existing Records</label>
                            </div>
                            <div class="radio radio-success m-left-10 m-top-5">
                                <input id="radio-3" class="radio-custom" name="duplicates" type="radio">
                                <label for="radio-3" class="radio-custom-label">End-Date All Records</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group full-width-select">
                                    <label>Code Name Matching:</label>
                                    <select2 :options="options2" v-model="code_name_matching">
                                        <option disabled value="0">Show/Hide Columns</option>
                                    </select2>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="button_set little-space">
                                    <a class="btn btn-primary mini">
                                        Show Example
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="clearfix"></div>
				  </div>
					<div class="button_set">
						<a class="btn btn-primary mini">
							Upload
						</a>
					</div>
				</tab>
				<tab label="Export" class="" icon="dnl_icon dnl_export">
					<div class="row">
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group full-width-select">
                                <label for="username">Data Format:</label>
                                <select2 :options="options1" v-model="data_format"></select2>
                            </div>
                            <div class="form-group m-top-33">
                                <div class="checkbox checkbox-success">
                                    <input id="status" name="enable_rep_grouping" type="checkbox">
                                    <label for="enable_rep_grouping">With headers row</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group">
                                <label>Header Text:</label>
                                <textarea v-model="header_text" class="form-control" placeholder="Enter Header Text"/>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group">
                                <label>Footer Text:</label>
                                <textarea v-model="footer_text" class="form-control" placeholder="Enter Footer Text"/>
                            </div>
                        </div>
                        <div class="clearfix little-space"></div>
                        <div class="col-md-3 col-sm-3">
                            <div class="form-group full-width-select">
                                <label for="username">Column #1:</label>
                                <select2 :options="options1" v-model="column_1"></select2>
                            </div>
                            <div class="form-group full-width-select">
                                <label for="username">Column #2:</label>
                                <select2 :options="options1" v-model="column_2"></select2>
                            </div>
                            <div class="form-group full-width-select">
                                <label for="username">Column #3:</label>
                                <select2 :options="options1" v-model="column_3"></select2>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-3">
                            <div class="form-group full-width-select">
                                <label for="username">Column #4:</label>
                                <select2 :options="options1" v-model="column_4"></select2>
                            </div>
                            <div class="form-group full-width-select">
                                <label for="username">Column #5:</label>
                                <select2 :options="options1" v-model="column_5"></select2>
                            </div>
                            <div class="form-group full-width-select">
                                <label for="username">Column #6:</label>
                                <select2 :options="options1" v-model="column_6"></select2>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-3">
                            <div class="form-group full-width-select">
                                <label for="username">Column #7:</label>
                                <select2 :options="options1" v-model="column_7"></select2>
                            </div>
                            <div class="form-group full-width-select">
                                <label for="username">Column #8:</label>
                                <select2 :options="options1" v-model="column_8"></select2>
                            </div>
                            <div class="form-group full-width-select">
                                <label for="username">Column #9:</label>
                                <select2 :options="options1" v-model="column_9"></select2>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-3">
                            <div class="form-group full-width-select">
                                <label for="username">Column #10:</label>
                                <select2 :options="options1" v-model="column_10"></select2>
                            </div>
                            <div class="form-group full-width-select">
                                <label for="username">Column #11:</label>
                                <select2 :options="options1" v-model="column_11"></select2>
                            </div>
                            <div class="form-group full-width-select">
                                <label for="username">Column #12:</label>
                                <select2 :options="options1" v-model="column_12"></select2>
                            </div>
                        </div>
                    </div>
					<div class="button_set">
                        <a class="btn btn-primary mini" v-on:click="exportCSV()">
                                Download
                        </a>		
                        <a class="btn btn-default mini">
							Reset
						</a>
					</div>
				</tab>
                <tab label="Automate Rate Update" class="" icon="dnl_icon dnl_setting">
                    <section class="role_section basic_section m-left-0">
                        <h2 class="role_section_name">Match Criteria for incoming rate update</h2>
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group">
                                <label for="email_from">Email Received From:</label>
                                <input type="email" name="email_from" v-model="email_from" class="form-control" placeholder="Enter E-mail">
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group">
                                <label for="subject_keyword">Subject Line Keyword:</label>
                                <input type="text" name="subject_keyword" v-model="subject_keyword" class="form-control" placeholder="Enter Subject Line Keyword">
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </section>
                    <section class="role_section basic_section m-left-0">
                        <h2 class="role_section_name">Processing Method</h2>
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group">
                                <label for="filename">Filename Keyword:</label>
                                <input type="text" name="filename" v-model="filename" class="form-control" placeholder="Enter Filename Keyword">
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group">
                                <label for="start_line">Starting From Line:</label>
                                <input type="text" name="start_line" v-model="start_line" class="form-control" placeholder="Enter Starting from Line">
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </section>
                    <section class="role_section basic_section m-left-0">
                        <h2 class="role_section_name">Fields</h2>
                        <div class="col-md-6 col-sm-8">
                            <div class="form-group">
                                  <div class="col-sm-12">
                                      <label for="groupname">Carrier:</label>
                                      <select multiple="multiple" id="carrier" name="carrier">
                                        <option v-for="option in options" :value='option.value'>{{option.text}}</option>
                                      </select>
                                  </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </section>
                    <section class="role_section basic_section m-left-0">
                        <h2 class="role_section_name">Default Fields</h2>
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group full-width-select">
                                <label for="effective_date">Effective Date Format:</label>
                                <select2 :options="options" v-model="effective_date_format"></select2>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group">
                                <label for="effective_date">Effective Date:</label>
                                <input type="text" name="effective_date" v-model="effective_date" class="form-control" placeholder="Enter Effective Date">
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group">
                                <label for="end_date">End Date:</label>
                                <input type="text" name="end_date" v-model="end_date" class="form-control" placeholder="Enter End Date">
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group">
                                <label for="min_time">Min Time:</label>
                                <input type="text" name="min_time" v-model="min_time" class="form-control" placeholder="Enter Min Time">
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group">
                                <label for="interval">Interval:</label>
                                <input type="text" name="interval" v-model="interval" class="form-control" placeholder="Enter Interval">
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </section>
                    <section class="role_section basic_section m-left-0">
                        <h2 class="role_section_name">E-mail Notification</h2>
                        <div class="col-sm-6">
                            <label>Send Success Notification to:</label>
                            <div class="form-group">
                                <div class="radio radio-success m-top-5">
                                    <input id="rad1" class="radio-custom" name="duplicates" type="radio" checked>
                                    <label for="rad1" class="radio-custom-label">Vendor</label>
                                </div>
                                <div class="radio radio-success m-left-10 m-top-5">
                                    <input id="rad2" class="radio-custom" name="duplicates" type="radio">
                                    <label for="rad2" class="radio-custom-label">Owner Email</label>
                                </div>
                                <div class="radio radio-success m-left-10 m-top-5">
                                    <input id="rad3" class="radio-custom" name="duplicates" type="radio">
                                    <label for="rad3" class="radio-custom-label">Both</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <label>Send Failure Notification to:</label>
                            <div class="form-group">
                                <div class="radio radio-success m-top-5">
                                    <input id="rad4" class="radio-custom" name="duplicates1" type="radio" checked>
                                    <label for="rad4" class="radio-custom-label">Vendor</label>
                                </div>
                                <div class="radio radio-success m-left-10 m-top-5">
                                    <input id="rad5" class="radio-custom" name="duplicates1" type="radio">
                                    <label for="rad5" class="radio-custom-label">Owner Email</label>
                                </div>
                                <div class="radio radio-success m-left-10 m-top-5">
                                    <input id="rad6" class="radio-custom" name="duplicates1" type="radio">
                                    <label for="rad6" class="radio-custom-label">Both</label>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </section>
                    <section class="role_section basic_section m-left-0">
                        <h2 class="role_section_name">Other Parameters</h2>
                        <div class="col-sm-12">
                            <label>For rate record with the same code and effective date is found:</label>
                            <div class="form-group">
                                <div class="radio radio-success m-top-5">
                                    <input id="radio11" class="radio-custom" name="duplicates3" type="radio" checked>
                                    <label for="radio11" class="radio-custom-label">Delete Existing Records</label>
                                </div>
                                <div class="radio radio-success m-left-10 m-top-5">
                                    <input id="radio22" class="radio-custom" name="duplicates3" type="radio">
                                    <label for="radio22" class="radio-custom-label">End-Date Existing Records</label>
                                </div>
                                <div class="radio radio-success m-left-10 m-top-5">
                                    <input id="radio33" class="radio-custom" name="duplicates3" type="radio">
                                    <label for="radio33" class="radio-custom-label">End-Date All Records</label>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group">
                                <label for="end_date_time">End Date Time:</label>
                                <input type="text" name="end_date_time" v-model="end_date_time" class="form-control" placeholder="Enter End Date Time">
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group full-width-select">
                                <label for="code_name_matching">Code Name Matching:</label>
                                <select2 :options="options" v-model="code_name_matching"></select2>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group m-top-33">
                                <div class="checkbox checkbox-success">
                                    <input id="status" name="enable_rep_grouping" type="checkbox">
                                    <label for="enable_rep_grouping">File with Header</label>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </section>
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
    vSelect = require('vue!../main_components/select.vue'),
    Pagination = require('vue!../main_components/pagination.vue'),
    Dropzone = require('vue!../main_components/dropzone.vue'),
    confirmmodal = require('vue!../main_components/confirm_delete.vue'),
    multiselect = require('multiselect');
    const api = require("../../api");
	const auth = require("../../auth");
	_ = require('lodash');
	import {mapGetters,	mapActions} from 'vuex'

	module.exports = {
		components: {
			'tabs': vTabs,
			'tab': vTab,
            'pagination': Pagination,
			'select2': vSelect,
            Dropzone,
            'multiselect': multiselect,
            'confirm': confirmmodal
		},
		data: function(){
            return {
                pageOne: {
					currentPage: 1,
					totalPages: 10,
                    cntpage : 10
				},
                rate_upload_template: '',
                effective_date_format: '',
                effective_date: '',
                interval: 0,
                min_time: '',
                end_date: '',
                search: '',
                checker: false,
                group: '',
                selected1: 1,
                checkbox_1: false,
                checkbox_2: false,
                code_name_matching: '',
                header_text: '',
                footer_text: '',
                data_format: '',
                column_1: '',
                column_2: '',
                column_3: '',
                column_4: '',
                column_5: '',
                column_6: '',
                column_7: '',
                column_8: '',
                column_9: '',
                column_10: '',
                column_11: '',
                column_12: '',
                email_from: '',
                subject_keyword: '',
                start_line: '',
                filename: '',
                end_date_time: '',
				options1: [
					{ id: 1, text: '10' },
					{ id: 2, text: '20' },
					{ id: 3, text: '30' },
					{ id: 4, text: '50' },
					{ id: 5, text: '100' }
				],
				selected2: 0,
				options2: [
					{ id: 1, text: 'Group Name' },
					{ id: 2, text: 'Carrier Count' },
					{ id: 3, text: 'Actions' }
				],
                options: [
					  { id: 1, value: 'carrier1', text: 'Carrier 1' },
					  { id: 2, value: 'carrier2', text: 'Carrier 2' },
					  { id: 3, value: 'carrier3', text: 'Carrier 3' },
					  { id: 4, value: 'carrier4', text: 'Carrier 4' },
					  { id: 5, value: 'carrier5', text: 'Carrier 5' }
			    ],
				codes: [
					{
					  code: "1201259",
					  code_name: "",
					  country: "",
					  rate: "0.002000",
					  effective_date: "2017-02-12 09:03:36+00",
					  end_date: "2017-02-12 09:03:36+00",
                      extra_fields: "6 / 6 / 0 / undefined »",
                      id: "i_1",
                      status: false
					},
                    {
					  code: "1201259",
					  code_name: "",
					  country: "",
					  rate: "0.002000",
					  effective_date: "2017-02-12 09:03:36+00",
					  end_date: "2017-02-12 09:03:36+00",
                      extra_fields: "6 / 6 / 0 / undefined »",
                      id: "i_2",
                      status: false
					},
                    {
					  code: "1201259",
					  code_name: "",
					  country: "",
					  rate: "0.002000",
					  effective_date: "2017-02-12 09:03:36+00",
					  end_date: "2017-02-12 09:03:36+00",
                      extra_fields: "6 / 6 / 0 / undefined »",
                      id: "i_3",
                      status: false
					}
			   ],
				resource : null,
			  	selected_ids : [],
                rates: [],
                apiUrl: '',
                rate_table_id: '',
                showModal: '',
                templateList: [],
                time_profile_list: [],
			rates_table_column_options: [{
				value: 'Code',
				label: 'Code'
			}, {
				value: 'Code Name',
				label: 'Code Name'
			}, {
				value: 'Country',
				label: 'Country'
			}, {
				value: 'Rate',
				label: 'Rate'
			}, {
				value: 'Effective Date',
				label: 'Effective Date'
			}, {
				value: 'End Date',
				label: 'End Date'
			}, {
				value: 'Extra Fields',
				label: 'Extra Fields'
			}, {
				value: 'Action',
				label: 'Action'
			}],
			rates_table_columns: ['Code', 'Code Name', 'Country', 'Rate', 'Effective Date', 
				'End Date', 'Extra Fields', 'Action'],
			showcolumns: [true, true, true, true, true, true, true, true],
                
			}
        },
        methods: {
        ...mapActions({
            setAsyncConfirm: 'async_confirm/setAsyncConfirm',
            setMessage: 'app_message/setAppMessage'
        }),
            handleChange() {
                if (_.indexOf(this.rates_table_columns, 'Code') != -1) {
                    // this.showcolumns[0] = true;
                    Vue.set(this.showcolumns, 0, true);
                }
                else {
                    // this.showcolumns[0] = false;
                    Vue.set(this.showcolumns, 0, false);
                }

                if (_.indexOf(this.rates_table_columns, 'Code Name') != -1) {
                    // this.showcolumns[1] = true;
                    Vue.set(this.showcolumns, 1, true);
                }
                else {
                    // this.showcolumns[1] = false;
                    Vue.set(this.showcolumns, 1, false);
                }

                if (_.indexOf(this.rates_table_columns, 'Country') != -1) {
                    // this.showcolumns[2] = true;
                    Vue.set(this.showcolumns, 2, true);
                }
                else {
                    // this.showcolumns[2] = false;
                    Vue.set(this.showcolumns, 2, false);
                }

                if (_.indexOf(this.rates_table_columns, 'Rate') != -1) {
                    // this.showcolumns[3] = true;
                    Vue.set(this.showcolumns, 3, true);
                }
                else {
                    // this.showcolumns[3] = false;
                    Vue.set(this.showcolumns, 3, false);
                }

                if (_.indexOf(this.rates_table_columns, 'Effective Date') != -1) {
                    // this.showcolumns[4] = true;
                    Vue.set(this.showcolumns, 4, true);
                }
                else {
                    // this.showcolumns[4] = false;
                    Vue.set(this.showcolumns, 4, false);
                }

                if (_.indexOf(this.rates_table_columns, 'End Date') != -1) {
                    // this.showcolumns[5] = true;
                    Vue.set(this.showcolumns, 5, true);
                }
                else {
                    // this.showcolumns[5] = false;
                    Vue.set(this.showcolumns, 5, false);
                }

                if (_.indexOf(this.rates_table_columns, 'Extra Fields') != -1) {
                    // this.showcolumns[6] = true;
                    Vue.set(this.showcolumns, 6, true);
                }
                else {
                    // this.showcolumns[6] = false;
                    Vue.set(this.showcolumns, 6, false);
                }

                if (_.indexOf(this.rates_table_columns, 'Action') != -1) {
                    // this.showcolumns[7] = true;
                    Vue.set(this.showcolumns, 7, true);
                }
                else {
                    // this.showcolumns[7] = false;
                    Vue.set(this.showcolumns, 7, false);
                }

                console.log(this.showcolumns);

                // this.$nextTick(() => {
                // 	document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
                // });
            },
                
            clickSelectedAll: function() {
                console.log("select_all-->"+this.checker);
                if(this.checker) {
                    this.templateList.forEach(function(rate, i){
                        rate.selected = true;
                    });
                }
                else {
                    this.templateList.forEach(function(rate, i){
                        rate.selected = false;
                    });
                }
            },
            showHideExtraField: function(rate) {
				console.log("show/hide extra field");
				console.log(rate);
				rate.show_extra_field = !rate.show_extra_field;
				if(rate.show_extra_field) {
					rate.more_less = 'less';
				}
				else {
					rate.more_less = 'more';
				}
			},
            fetchRates() {
                var page = this.pageOne.currentPage - 1;
                var per_page = this.pageOne.cntpage;
                console.log("page => " + page + " , per_page => " + per_page);

                var id = this.$route.params.id;
                this.rate_table_id = id;
                this.apiUrl = "/v1/switch/rate_table/"+id+"/rate/list";
                console.log("id =>" + id);
                this.loading = true;
                this.$http.get(api.getEndpointUrl() + this.apiUrl + "?page="+page+"&per_page="+per_page+"&order_by=rate_id&order_dir=asc",
                {
                    headers: {
                        "X-Auth-Token": auth.getToken()
                    }
                }).then(function(response) {
                    //todo: check success flag? validation errors?
                    this.loading = false;
                    this.rates = response.body.payload.items;
                    
                    var vm = this;
                    this.rates.forEach(function(rate, i){
                        var temp = {};
                        temp.rate_table_id = rate.rate_table_id;
                        temp.rate_id = rate.rate_id;
                        temp.code = rate.code;
                        temp.code_name = rate.code_name;
                        temp.country = rate.country;
                        temp.rate = rate.rate;
                        temp.intra_rate = rate.intra_rate;
                        temp.inter_rate = rate.inter_rate;
                        temp.effective_date = rate.effective_date;
                        temp.end_date = rate.end_date;
                        temp.setup_fee = rate.setup_fee;
                        temp.time_profile_id = rate.time_profile_id;
                        temp.local_rate = rate.local_rate;
                        temp.min_time = rate.min_time;
                        temp.interval = rate.interval;
                        temp.gmt = rate.gmt;

                        temp.selected = false;
                        temp.show_extra_field = false;
                        temp.more_less = 'more';
                        
                        vm.templateList.push(temp);
                    });

                    var total_page = response.body.payload.total;
                    this.pageOne.currentPage = response.body.payload.page + 1;
                    this.pageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
                    console.log("total pages => " + this.pageOne.totalPages);
                }, function(error) {
                    this.loading = false;
                    console.log(error);
                });
            },
			pageOneChanged(pageNum) {
				if (pageNum !== this.pageOne.currentPage) {
					this.pageOne.currentPage = pageNum
					this.$nextTick(this.fetchRates)
				}
			},
			changePageCount (countPerPage) {
				if (countPerPage !== this.pageOne.cntpage) {
					this.pageOne.cntpage = countPerPage
					this.$nextTick(this.fetchRates)
				}
			},
			closeModal: function() {
				this.showModal = '';
			},
            'success': function (file) {
                console.log('A file was successfully uploaded')
            },
            'process': function () {
                var newArr = this.$children.filter(function(item){
                  return item.id === "myVueDropzone";
                });
                var component = newArr[0];
                component.processQueue()
            },
			addRate: function() {
                console.log("add rate");
				this.templateList.push({
                    rate_table_id: this.rate_table_id,
					rate_id: '',
					code: '',
					code_name: '',
					country: '',
					rate: 0,
					intra_rate: 0,
					inter_rate: 0,
					effective_date: '',
					end_date: '',

					setup_fee: 0,
					time_profile_id: 0,
					local_rate: 0,
					min_time: 0,
					interval: 0,
                    gmt: '+00:00',

					selected: false,
					show_extra_field: false,
					more_less: 'more',
				});
				if(this.checker)
					this.checker = false;
            },
            showAll: function(){
                this.search = '';
            },
			delete_rate: function(id){
                this.templateList.splice(id, 1);
				// this.showModal = true;
				// this.selected_ids = [];
				// this.selected_ids.push(id);
			},
			deleteAll: function() {
				console.log("delete all rates");

				this.templateList = [];
				if(this.checker)
					this.checker = false;
				// this.selected_ids = [];
				// var vm = this;
				
				// this.rates.forEach(function(rate, i){
				// 	vm.selected_ids.push(rate.rate_id)
				// });

				// if (this.selected_ids.length == 0) {
				// 	this.message('alert-warning','The rate table has been not selected!');
				// 	this.checker = false;

				// 	setTimeout(function(){
				// 		vm.hidemessage();
				// 	}, 3000);										
					
				// 	return;
				// }

				// this.showModal = true;
				// if(this.checker)
				// 	this.checker = false;
			},
			deleteSelected: function() {
				console.log("delete selected rates");
				console.log(this.templateList);

				var vm = [];
				this.templateList.forEach(function(rate, i){
					if(rate.selected!=true) {
						vm.push(rate);
					}
				});
				this.templateList = vm;
				console.log("end");
				if(this.checker)
					this.checker = false;
                
				// this.selected_ids = [];
				// var vm = this;
				// this.rates.forEach(function(rate, i){
				// 	if(rate.selected==true) {
				// 		vm.selected_ids.push(rate.rate_table_id);
				// 	}
				// });

				// if (this.selected_ids.length == 0) {
				// 	this.message('alert-warning','The rate table has been not selected!');
				// 	this.checker = false;

				// 	setTimeout(function(){
				// 		vm.hidemessage();
				// 	}, 3000);										
					
				// 	return;
				// }

				// this.showModal = true;
				// if(this.checker)
				// 	this.checker = false;
			},
            submit: function()
			{
				var vm = this;
				this.showModal = false;

				this.selected_ids.forEach(function(item, i){
					var rateid = item;
					if(rateid == 0){
						vm.setMessage({
                            message: 'The rate table has been not selected!',
                            type: 'error'
                        });
					}
					else{
						vm.loading = true;
						vm.resource = vm.$resource(api.getEndpointUrl() + '/v1/switch/rate/'+rateid);
						vm.resource.delete({rate_id:rateid}).then(function(response){
							vm.loading = false;
                            let index = _.findIndex(vm.rates, elem => elem.rate_id  === rateid)
                            vm.rates.splice(index, 1)
                            vm.setMessage('The rate tables have been deleted!')
						});
					}
				});
            },
			validateBeforeSubmit(e){
				e.preventDefault();
                // eslint-disable-next-line
                this.loading = true;

                var vm = [];
                this.templateList.forEach(function(rate, i){
                    var temp = {};
                    // temp.rate_id = rate.rate_id;
                    temp.intra_rate = rate.intra_rate;
                    temp.code_name = rate.code_name;
                    temp.code = rate.code;
                    temp.rate = rate.rate;
                    temp.inter_rate = rate.inter_rate;
                    temp.country = rate.country;
                    temp.gmt = rate.gmt;
                    temp.local_rate = rate.local_rate;
                    // temp.effective_date = rate.effective_date.toISOString().substring(0, 10);
                    if(rate.effective_date !== "")
                        temp.effective_date = rate.effective_date;
                    // temp.end_date = rate.end_date.toISOString().substring(0, 10);
                    if(rate.end_date !== "")
                        temp.end_date = rate.end_date;

                    if(rate.show_extra_field) {
                        temp.setup_fee = rate.setup_fee;
                        temp.min_time = rate.min_time;
                        temp.interval = rate.interval;
                        if(rate.time_profile_id !== "0")
                            temp.time_profile_id = rate.time_profile_id;
                    }
                    vm.push(temp);
                });
                console.log("reqBody:", vm);
                this.$http.patch(api.getEndpointUrl() + '/v1/switch/rate_table/'+this.rate_table_id+'/edit_rates',
                {
                    "rates": vm
                },
                {
                    headers: {
                        "X-Auth-Token": auth.getToken()
                    }
                }
                ).then(
                    function(response) {
                        this.loading = false;
                        console.log(response);

                        this.$router.push('/switch/rate_table');
                        this.setMessage('The rates has been modified!');
                    },
                    function(response) {
                        this.loading = false;
                        console.log(response);

                        this.setMessage({
                            message: "Editing rates is failed!",
                            type: 'error'
                        });
                    }
                )
				
            },
            reset: function(){
                var vm = this;
                this.templateList = [];
                this.rates.forEach(function(rate, i){
                    var temp = {};
                    temp.rate_table_id = rate.rate_table_id;
                    // temp.rate_id = rate.rate_id;
                    temp.code = rate.code;
                    temp.code_name = rate.code_name;
                    temp.country = rate.country;
                    temp.rate = rate.rate;
                    temp.intra_rate = rate.intra_rate;
                    temp.inter_rate = rate.inter_rate;
                    temp.effective_date = rate.effective_date;
                    temp.end_date = rate.end_date;
                    temp.setup_fee = rate.setup_fee;
                    temp.time_profile_id = rate.time_profile_id;
                    temp.local_rate = rate.local_rate;
                    temp.min_time = rate.min_time;
                    temp.interval = rate.interval;
                    temp.gmt = rate.gmt;

                    temp.selected = false;
                    temp.show_extra_field = false;
                    temp.more_less = 'more';
                    
                    vm.templateList.push(temp);
                });
            },
            exportCSV: function () {                 
                var vm = this;		                
                var csvArray = new Array();
                var fields = ["rate_table_id", "rate_id", "code", "code_name", "country", "rate", "intra_rate", "inter_rate", "effective_date", "end_date", "setup_fee", "time_profile_id", "local_rate", "min_time", "interval", "gmt"];
                csvArray.push(fields);                            
                this.templateList.forEach(function (temp, i) {
                    var values = new Array();                    

                    values.push(temp.rate_table_id + "");
                    values.push(temp.rate_id + "");
                    values.push(temp.code + "");
                    values.push(temp.code_name + "");
                    values.push(temp.country + "");
                    values.push(temp.rate + "");
                    values.push(temp.intra_rate + "");
                    values.push(temp.inter_rate + "");
                    values.push(temp.effective_date + "");
                    values.push(temp.end_date + "");
                    values.push(temp.setup_fee + "");
                    values.push(temp.time_profile_id + "");
                    values.push(temp.local_rate + "");
                    values.push(temp.min_time + "");
                    values.push(temp.interval + "");
                    values.push(temp.gmt + "");
                    csvArray.push(values);                                                           
                });	                                                    
                exportToCsv('switch_rate_table_export.csv', csvArray);
                //exportC();                                                                     
            },            
		},
		mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
            $('#carrier').multiSelect({
				 selectableHeader: "<div class='custom-header'>Fields</div>",
  				 selectionHeader: "<div class='custom-header'>Selected</div>"
			});
		},
        updated: function () {
            document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
        },
        created: function(){
            this.loading = true;
			this.$http.get(api.getEndpointUrl() + "/v1/config/time_profile/list", 
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function(response) {
				var self = this;
				this.loading = false;
				var items = response.body.payload.items;
				items.forEach(function(item, i){
					var time_profile = {};
					time_profile.id = item.time_profile_id;
                    time_profile.value = item.time_profile_id;
					time_profile.text = item.name;
					self.time_profile_list.push(time_profile);
				});

				console.log(this.time_profile_list);
			}, function(error) {
				this.loading = false;
				console.log(error);
			});

            this.fetchRates();
        }
	}
</script>

<style>
    .radio.radio-success.m-left-10 {
        margin-left: 10px;
    }
    
    .radio.radio-success.m-top-5 {
        margin-top: 5px;
    }
    
    .checkbox.checkbox-success.inline-block.v-top {
        vertical-align: top;
        margin-top: 5px;
        margin-right: 10px;
    }
    
    section.role_section.basic_section.m-left-0 {
        margin-left: 0;
    }
    
    @media (max-width: 1199px) {
        .radio.radio-success.m-left-10 {
            margin-left: 0px;
        }
    }

.el-select__tags {
	display: none;
}
  
</style>
