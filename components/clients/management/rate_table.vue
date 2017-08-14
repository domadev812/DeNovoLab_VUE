<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Switch</a></li>
				  <li class="breadcrumb-item active">Rate Table</li>
			</ol>
			<h1 class="page-header">Rate Table</h1>
			<confirm v-show="showModal" @close="showModal = false" @submit="submit"></confirm>
			<div class="btn-group" role="group">
			  <button type="button" class="btn btn-default">
				  <span class="dnl_icon dnl_action_edit"></span> Mass Edit
			  </button>
			  <button type="button" class="btn btn-default" @click="createNew">
			  	  <span class="dnl_icon dnl_add"></span> Create New
			  </button>
			  <!--
			  <button type="button" class="btn btn-default" @click="showModal='auto_create'">
				  <span class="dnl_icon dnl_add"></span> Auto Create
			  </button>
			  -->
			  <button type="button" class="btn btn-default" @click="deleteAll">
				  <span class="dnl_icon dnl_action_delete"></span> Delete All
			  </button>
			  <button type="button" class="btn btn-default" @click="deleteSelected">
				  <span class="dnl_icon dnl_action_delete"></span> Delete Selected
			  </button>
			</div>
			<tabs class="rate_tabs">
				<tab label="Rate Table" class="" icon="dnl_icon dnl_list" selected>
					<div class="advanced_search_filter_panel">
						<div class="inline-block search_wrapper">
							<label>Search:</label>
							<br>
							<input type="text" name="search" v-model="search" class="form-control inline-block search_field" placeholder="Enter Search">
							<span class="dnl_icon dnl_musica-searcher"></span>
						</div>
						<div class="inline-block">
							<label>Code Deck:</label>
							<select2 :options="code_deck_list" v-model="code_deck">
								<option value="0">Select Code Deck</option>
							</select2>
						</div>
						<div class="inline-block">
							<label>Currency:</label>
							<br>
							<select2 :options="currency_list" v-model="currency">
								<option value="0">Select</option>
							</select2>
						</div>
					</div>
					<div class="table_filters">
						<div class="inline-block select_min_wrapper">
							<span class="inline-block">Page row:</span>
							<select2 :options="options1" v-model="selected1" class="inline-block" @pagecount="changePageCount">
							</select2>
						</div>
						<div class="inline-block">
							<!--
							<select2ck :options="options2" v-model="selected2">
								<option disabled value="0">Show/Hide Columns</option>
							</select2ck>
							-->
							<el-select v-model="rate_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
								<el-option
								v-for="item in rate_table_column_options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
								</el-option>
							</el-select>							
						</div>
					</div>
					<div class="table-responsive">
						<spinner v-show="loading" class="spinner"></spinner>
						<div v-show="loading" class="mask"></div>
						<table class="table table-striped table-hover agents ">
						  <thead>
							<tr>
							  <th class="width-65">
								  <div class="checkbox checkbox-success">
									<input id="select_all" name="select_all" type="checkbox" v-model="checker" v-on:click="clickSelectedAll">
									<label for="select_all"></label>
								  </div>
							  </th>
							  <th v-if="showcolumns[0]">Name</th>
							  <th v-if="showcolumns[1]">Code Deck</th>
							  <th v-if="showcolumns[2]">Currency</th>
							  <th v-if="showcolumns[3]">Usage Count</th>
                              <th v-if="showcolumns[4]">Billing Method</th>
							  <th v-if="showcolumns[5]">Rate Type</th>
                              <th v-if="showcolumns[6]">Update at</th>
							  <th v-if="showcolumns[7]">Update by</th>
							  <th v-if="showcolumns[8]">Action</th>
							</tr>
						  </thead>
						  <tbody>
							<tr v-if="!filterBy(rates, search).length">
								<td style="text-align: center" colspan="10">No Data Found</td>
							</tr>										
							  
							<tr v-for="(rate, index) in filterBy(rates, search)">
							  <td class="centred_checkbox">
								  <div class="checkbox checkbox-success">
									<input v-bind:id="'selected-' + index" v-bind:name="'selected-' + index" type="checkbox" v-model="rate.selected">
									<label v-bind:for="'selected-' + index"></label>
								  </div>
							  </td>
							  <td v-if="showcolumns[0]">
                                   <router-link to="" class="blue_link" @click.native="edit_rates(rate.rate_table_id)">{{rate.name}}</router-link>
                              </td>
							  <td v-if="showcolumns[1]">
                                  <router-link to="/switch/code_deck" class="blue_link">{{rate.code_deck_name}}</router-link>
                              </td>
							  <td v-if="showcolumns[2]">{{rate.currency_name}}</td>
							  <td v-if="showcolumns[3]">
                                  <router-link to="/routing/ingress_trunk" class="blue_link">{{rate.usage_count}}</router-link>
                              </td>
                              <td v-if="showcolumns[4]">{{rate.billing_method}}</td>
							  <td v-if="showcolumns[5]">{{rate.rate_type_name}}</td>
							  <td v-if="showcolumns[6]">{{rate.update_at}}</td>
							  <td v-if="showcolumns[7]">{{rate.update_by}}</td>
							  <td v-if="showcolumns[8]" class="width-274">
								  <a class="action action_read" data-toggle="tooltip" data-placement="top" title="View Rates" v-on:click="edit_rates(rate.rate_table_id)">
									  <span class="dnl_icon dnl_eye"></span>
								  </a>
                                  <a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" v-on:click="edit_ratetable(rate.rate_table_id)">
									  <span class="dnl_icon dnl_action_edit"></span>
								  </a>
                                  <a class="action action_settings" data-toggle="tooltip" data-placement="top" title="Ideterminate" @click="showModal='ideterminate'">
									  <span class="dnl_icon dnl_setting"></span>
								  </a>
                                  <a class="action action_copy" data-toggle="tooltip" data-placement="top" title="Copy" @click="showModal='copy'; copy_rate_table.currency_id=rate.currency_id; copy_rate_table.rate_type_name = rate.rate_type_name; copy_rate_table.billing_method = rate.billing_method; copy_rate_table.code_deck_id = rate.code_deck_id; copy_rate_table.rate_table_id = rate.rate_table_id">
									  <span class="dnl_icon dnl_copy"></span>
								  </a>
                                  <router-link to="/switch/rate_table/assign_rate_deck" class="action action_reply" data-toggle="tooltip" data-placement="top" title="Assign Rate Deck">
									  <span class="dnl_icon dnl_reply"></span>
								  </router-link>
								  <router-link to="/switch/rate_table/send_rate" class="action action_send" data-toggle="tooltip" data-placement="top" title="Send">
									  <span class="dnl_icon dnl_support"></span>
								  </router-link>
								  <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="delete_rate(rate.rate_table_id)">
									  <span class="dnl_icon dnl_action_delete"></span>
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
				<tab label="Send Rate Log" class="" icon="dnl_icon dnl_qos_report">
					<div class="table_filters searcheable">
						<div class="inline-block select_min_wrapper">
							<span class="inline-block">Page row:</span>
							<select2 :options="options1" v-model="selected1" class="inline-block">
							</select2>
						</div>
						<div class="inline-block fix_medium_select">
							<select2 :options="options2" v-model="selected2">
								<option disabled value="0">Show/Hide Columns</option>
							</select2>
						</div>
				    </div>
					<div class="table-responsive">
						<table class="table table-striped table-hover clients client_limit">
						  <thead>
							<tr>
							  <th>Rate Table</th>
							  <th>Create Time</th>
							  <th>Status</th>
							  <th class="width-65">File</th>
							  <th class="width-78">Error File</th>
                              <th class="width-65">Action</th>
							</tr>
						  </thead>
						  <tbody v-for="log in logs">
							<tr>
							  <td>{{log.rate_table}}</td>
                              <td>{{log.create_time}}</td>
                              <td>{{log.status}}</td>
                              <td>
                                 <a class="action action_download" data-toggle="tooltip" data-placement="top" title="Download File">
									  <span class="dnl_icon dnl_download"></span>
								  </a> 
                              </td>
                              <td>
                                <a class="action action_download error" data-toggle="tooltip" data-placement="top" title="Download Error File">
									  <span class="dnl_icon dnl_download"></span>
								</a>  
                              </td>
							  <td>
								  <router-link to="/switch/rate_table/send_rate_log" class="action action_read" data-toggle="tooltip" data-placement="top" title="View Detail">
									  <span class="dnl_icon dnl_eye"></span>
								  </router-link>
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
				<tab label="Rate Download Log" class="" icon="dnl_icon dnl_download">
                    <h2 class="center-block text-center">No Data Found</h2>
				</tab>
			</tabs>
		</div>
	  </div>
	  <modal v-if="showModal=='copy'" @close="showModal=''">
		<h3 slot="header">Copy Rate Table</h3>
			<div slot="body">
				<div class="row">
					<div class="col-sm-12">
						<div class="form-group" style="text-align: left">
							<label>Name:</label>
							<input type="text" name="copy_rate_table_name" v-model="copy_rate_table_name" class="form-control" placeholder="Enter Name">
						</div>
					</div>
				</div>
		  	</div>
			<div slot="footer">
				<button class="btn btn-primary submit mini" @click="copyRateTable">Submit</button>
				<button @click="closeModal" class="btn btn-default cancel mini">Cancel</button>
			</div>
	  </modal>
          <modal v-if="showModal=='ideterminate'" @close="showModal = ''">
                <h3 slot="header">Ideterminate</h3>
                <div slot="body">
                  <div class="row">
                      <div class="col-sm-12">
                          <div class="form-group">
                              <label>Country Code:</label>
                              <input type="text" name="country_code" v-model="country_code" class="form-control" placeholder="Enter Country Code">
                          </div>
                          <div class="form-group">
                              <label>Max Code Length W/O Country Code:</label>
                              <input type="text" name="max_code_1" v-model="max_code_1" class="form-control" placeholder="Enter Max Code Length W/O Country Code">
                          </div>
                          <div class="form-group">
                              <label>Min Code Length W/O Country Code:</label>
                              <input type="text" name="min_code_1" v-model="min_code_1" class="form-control" placeholder="Enter Min Code Length W/O Country Code">
                          </div>
                          <div class="form-group">
                              <label>Max Code Length With Country Code:</label>
                              <input type="text" name="max_code_2" v-model="max_code_2" class="form-control" placeholder="Enter Max Code Length With Country Code">
                          </div>
                          <div class="form-group">
                              <label>Min Code Length With Country Code:</label>
                              <input type="text" name="min_code_2" v-model="min_code_2" class="form-control" placeholder="Enter Min Code Length With Country Code">
                          </div>
                      </div>
                  </div>
                </div>
                <div slot="footer">
                    <button class="btn btn-primary submit mini">Update</button>
                    <button @click="closeModal" class="btn btn-default cancel mini">Cancel</button>
                </div>
        </modal>
		<!--
        <modal v-if="showModal=='auto_create'" @close="showModal = ''">
                <h3 slot="header">Auto Create</h3>
                <div slot="body">
                  <div class="row">
                      <div class="col-sm-12">
                          <div class="form-group">
                              <label>Input Name:</label>
                              <input type="text" name="input_name" v-model="input_name" class="form-control" placeholder="Enter Input Name">
                          </div>
                          <div class="form-group">
                            <label>Currency:</label>
							<select2 :options="options2" v-model="currency_select">
								<option disabled value="0">Show/Hide Columns</option>
							</select2>
                          </div>
                          <div class="form-group">
                            <label>Type:</label>
							<select2 :options="options2" v-model="type_select">
								<option disabled value="0">Show/Hide Columns</option>
							</select2>
                          </div>
                          <div class="form-group">
                            <label>Same Code of:</label>
							<select2 :options="options2" v-model="same_code_of">
								<option disabled value="0">Show/Hide Columns</option>
							</select2>
                          </div>
                      </div>
                  </div>
                </div>
                <div slot="footer">
                    <button class="btn btn-primary submit mini">Submit</button>
                    <button @click="closeModal" class="btn btn-default cancel mini">Cancel</button>
                </div>
        </modal>
		-->
	</div>
</template>

<script>   
	const vTabs = require('vue!../../main_components/tabs.vue'),
	vTab = require('vue!../../main_components/tab.vue'),
	vSelect = require('vue!../../main_components/select.vue'),
	vSelectCK = require('vue!../../main_components/select_withckbox.vue'),
	Pagination = require('vue!../../main_components/pagination.vue'),
	confirmmodal = require('vue!../../main_components/confirm_delete.vue'),
	vSpinner = require('vue!../../main_components/fadeloader.vue'),
	modal = require('vue!../../main_components/modal.vue');
	const api = require("../../../api");
	const auth = require("../../../auth");
	_ = require('lodash');
	import {mapGetters,	mapActions} from 'vuex'

	module.exports = {
		created: function(){
			this.loading = true;
			this.$http.get(api.getEndpointUrl() + "/v1/switch/code_deck/list", 
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function(response) {
				var self = this;
				this.loading = false;
				var items = response.body.payload.items;
				items.forEach(function(item, i){
					var code_deck = {};
					code_deck.id = item.name;
					code_deck.text = item.name;
					self.code_deck_list.push(code_deck);
				});
				console.log("code_deck_list");
				console.log(this.code_deck_list);
			}, function(error) {
				this.loading = false;
				console.log(error);
			});

			this.loading = true;
			this.$http.get(api.getEndpointUrl() + "/v1/switch/currency/list", 
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function(response) {
				var self = this;
				this.loading = false;
				var items = response.body.payload.items;
				items.forEach(function(item, i){
					var currency = {};
					currency.id = item.code;
					currency.text = item.code;
					self.currency_list.push(currency);
				});
				console.log("currency_list");
				console.log(this.currency_list);
			}, function(error) {
				this.loading = false;
				console.log(error);
			});

			this.fetchRates();
		},
		components: {
			'tabs': vTabs,
			'tab': vTab,
			'select2': vSelect,
			'select2ck': vSelectCK,
			'pagination': Pagination,
			'modal': modal,
			'confirm': confirmmodal,
			'spinner': vSpinner,
		},
		data: function(){
            return {
				apiUrl : '/v1/switch/rate_table/list',
				copy_rate_table_name: '',
				copy_rate_table: {},
                same_code_of: '',
                type_select: '',
                currency_select: '',
                input_name: '',
                country_code: '1',
                max_code_1: '10',
                max_code_2: '10',
                min_code_1: '11',
                min_code_2: '11',
				route_types: [
				  { id: 1, text: 'Fail to Next Host' },
				  { id: 2, text: 'Fail to Next Trunk' },
				  { id: 3, text: 'Stop' },
			  	],
				resource : null,
				// resource_rates: null,
			  	selected_ids : [],
				pageOne: {
					currentPage: 1,
					totalPages: 10,
					cntpage : 10
				},
				loading: false,
                showModal: false,
				checker: '',
				carrier_name_search: '',
				resource_search: '',
				search: '',
				client_search: '',
				select: [],
				options: [
					{ id: 1, text: 'Success' },
					{ id: 2, text: 'Multiple' },
					{ id: 3, text: 'Moved Permanently' },
					{ id: 4, text: 'Moved Temporarily' },
					{ id: 5, text: 'Use Proxy' },
					{ id: 6, text: 'Alternative Service' },
					{ id: 7, text: 'Bad Request' },
					{ id: 8, text: 'Unauthorized' },
					{ id: 9, text: 'Payment Required' },
				],
				selected1: 1,
				options1: [
					{ id: 1, text: '10' },
					{ id: 2, text: '20' },
					{ id: 3, text: '30' },
					{ id: 4, text: '50' },
					{ id: 5, text: '100' }
				],
				rate_table_column_options: [{
						value: 'Name',
						label: 'Name'
						}, {
						value: 'Code Deck',
						label: 'Code Deck'
						}, {
						value: 'Currency',
						label: 'Currency'
						}, {
						value: 'Usage Count',
						label: 'Usage Count'
						}, {
						value: 'Billing Method',
						label: 'Billing Method'
						}, {
						value: 'Rate Type',
						label: 'Rate Type'
						}, {
						value: 'Update at',
						label: 'Update at'
						}, {
						value: 'Update by',
						label: 'Update by'
						}, {
						value: 'Action',
						label: 'Action'
						}],
				rate_table_columns: ['Name', 'Code Deck', 'Currency', 'Usage Count', 
						'Billing Method', 'Rate Type', 'Update at', 'Update by', 'Action'],
				showcolumns: [true, true, true, true, true, true, true, true, true],
				selected2: 0,
				options2: [
					{ id: 1, text: 'Group Name' },
					{ id: 2, text: 'Carrier Count' },
					{ id: 3, text: 'Actions' }
				],
				rates: [],
				code_deck_list: [],
				currency_list: [],
				code_deck: '0',
				currency: '0',
			  logs: [
					{
					  rate_table: "Invoicetest",
					  create_time: "2017-02-11 06:23:06+00",
					  status: "Completed"
					},
                    {
					  rate_table: "Invoicetest",
					  create_time: "2017-02-11 06:23:06+00",
					  status: "Completed"
					},
                    {
					  rate_table: "Invoicetest",
					  create_time: "2017-02-11 06:23:06+00",
					  status: "Completed"
					},
                    {
					  rate_table: "Invoicetest",
					  create_time: "2017-02-11 06:23:06+00",
					  status: "Completed"
					},
                    {
					  rate_table: "Invoicetest",
					  create_time: "2017-02-11 06:23:06+00",
					  status: "Completed"
					}
			  ],
			  ingress_host: [
					{
					  resource_ip: "Agent1",
					  carrier_name: "Client1",
					  status: "20%",
					  carrier_limit_call: "2016-10-02 04:45:52+00",
					  carrier_limit_cps: "Admin",
					  resource_limit_call: "2016-10-02 04:45:52+00",
					  resource_limit_cps: "Admin",
					  host_limit_call: "2016-10-02 04:45:52+00",
					  host_limit_cps: "Admin"
					},
				    {
					  resource_ip: "Agent2",
					  carrier_name: "Client1",
					  status: "20%",
					  carrier_limit_call: "2016-10-02 04:45:52+00",
					  carrier_limit_cps: "Admin",
					  resource_limit_call: "2016-10-02 04:45:52+00",
					  resource_limit_cps: "Admin",
					  host_limit_call: "2016-10-02 04:45:52+00",
					  host_limit_cps: "Admin"
					},
				    {
					  resource_ip: "Agent3",
					  carrier_name: "Client1",
					  status: "20%",
					  carrier_limit_call: "2016-10-02 04:45:52+00",
					  carrier_limit_cps: "Admin",
					  resource_limit_call: "2016-10-02 04:45:52+00",
					  resource_limit_cps: "Admin",
					  host_limit_call: "2016-10-02 04:45:52+00",
					  host_limit_cps: "Admin"
					},
				    {
					  resource_ip: "Agent4",
					  carrier_name: "Client1",
					  status: "20%",
					  carrier_limit_call: "2016-10-02 04:45:52+00",
					  carrier_limit_cps: "Admin",
					  resource_limit_call: "2016-10-02 04:45:52+00",
					  resource_limit_cps: "Admin",
					  host_limit_call: "2016-10-02 04:45:52+00",
					  host_limit_cps: "Admin"
					},
				    {
					  resource_ip: "Agent5",
					  carrier_name: "Client1",
					  status: "20%",
					  carrier_limit_call: "2016-10-02 04:45:52+00",
					  carrier_limit_cps: "Admin",
					  resource_limit_call: "2016-10-02 04:45:52+00",
					  resource_limit_cps: "Admin",
					  host_limit_call: "2016-10-02 04:45:52+00",
					  host_limit_cps: "Admin"
					}
			  ]
			}
        },
		watch: {
			'code_deck': function() {
				console.log("code_deck-->"+this.code_deck);
				var page = this.pageOne.currentPage - 1;
				var per_page = this.pageOne.cntpage;
				console.log("page => " + page + " , per_page => " + per_page);
				this.loading = true;

				var url_temp;
				if(this.code_deck == '0')
					url_temp = api.getEndpointUrl() + this.apiUrl+"?page="+page+"&per_page="+per_page+"&order_by=update_at&order_dir=desc";
				else
					url_temp = api.getEndpointUrl() + this.apiUrl+"?page="+page+"&per_page="+per_page+"&order_by=update_at&order_dir=desc&code_deck_name=" + this.code_deck;
				if(this.currency != '0')
					url_temp = url_temp + "&currency_name=" + this.currency;

				this.$http.get(url_temp,
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(function(response) {
					this.loading = false;
					//todo: check success flag? validation errors?
					var rates = response.body.payload.items;
					console.log(rates);
					this.rates = rates;
					var total_page = response.body.payload.total;
					this.pageOne.currentPage = response.body.payload.page + 1;
					this.pageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
					console.log("total pages => " + this.pageOne.totalPages);
				}, function(error) {
					this.loading = false;
					console.log(error);
				});
			},

			'currency': function() {
				console.log("currency-->"+this.currency);
				var page = this.pageOne.currentPage - 1;
				var per_page = this.pageOne.cntpage;
				console.log("page => " + page + " , per_page => " + per_page);
				this.loading = true;

				var url_temp;
				if(this.currency == '0')
					url_temp = api.getEndpointUrl() + this.apiUrl+"?page="+page+"&per_page="+per_page+"&order_by=update_at&order_dir=desc";
				else
					url_temp = api.getEndpointUrl() + this.apiUrl+"?page="+page+"&per_page="+per_page+"&order_by=update_at&order_dir=desc&currency_name=" + this.currency;

				if(this.code_deck != '0')
					url_temp = url_temp + "&code_deck_name=" + this.code_deck;

				this.$http.get(url_temp,
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(function(response) {
					this.loading = false;
					//todo: check success flag? validation errors?
					var rates = response.body.payload.items;
					console.log(rates);
					this.rates = rates;
					var total_page = response.body.payload.total;
					this.pageOne.currentPage = response.body.payload.page + 1;
					this.pageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
					console.log("total pages => " + this.pageOne.totalPages);
				}, function(error) {
					this.loading = false;
					console.log(error);
				});
			},
		},
		methods: {
			...mapActions({
				setAsyncConfirm: 'async_confirm/setAsyncConfirm',
				setMessage: 'app_message/setAppMessage'
			}),
			fetchRates() {
				var page = this.pageOne.currentPage - 1;
				var per_page = this.pageOne.cntpage;
				console.log("page => " + page + " , per_page => " + per_page);
				this.loading = true;

				this.$http.get(api.getEndpointUrl() + this.apiUrl+"?page="+page+"&per_page="+per_page+"&order_by=rate_table_id&order_dir=desc",
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(function(response) {
					this.loading = false;
					//todo: check success flag? validation errors?
					var rates = response.body.payload.items;
					console.log(rates);
					this.rates = rates;
					var total_page = response.body.payload.total;
					this.pageOne.currentPage = response.body.payload.page + 1;
					this.pageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
					console.log("total pages => " + this.pageOne.totalPages);
				}, function(error) {
					this.loading = false;
					console.log(error);
				});
			},
			handleChange() {
				// rate_table_columns: ['Name', 'Code Deck', 'Currency', 'Usage Count', 
				// 		'Billing Method', 'Rate Type', 'Update at', 'Update by', 'Action'],
				// showcolumns: [true, true, true, true, true, true, true, true, true],

				if (_.indexOf(this.rate_table_columns, 'Name') != -1) {
					// this.showcolumns[0] = true;
					Vue.set(this.showcolumns, 0, true);
				}
				else {
					// this.showcolumns[0] = false;
					Vue.set(this.showcolumns, 0, false);
				}
					
				if (_.indexOf(this.rate_table_columns, 'Code Deck') != -1) {
					// this.showcolumns[1] = true;
					Vue.set(this.showcolumns, 1, true);
				}
				else {
					// this.showcolumns[1] = false;
					Vue.set(this.showcolumns, 1, false);
				}

				if (_.indexOf(this.rate_table_columns, 'Currency') != -1) {
					// this.showcolumns[2] = true;
					Vue.set(this.showcolumns, 2, true);
				}
				else {
					// this.showcolumns[2] = false;
					Vue.set(this.showcolumns, 2, false);
				}

				if (_.indexOf(this.rate_table_columns, 'Usage Count') != -1) {
					// this.showcolumns[3] = true;
					Vue.set(this.showcolumns, 3, true);
				}
				else {
					// this.showcolumns[3] = false;
					Vue.set(this.showcolumns, 3, false);
				}

				if (_.indexOf(this.rate_table_columns, 'Billing Method') != -1) {
					// this.showcolumns[4] = true;
					Vue.set(this.showcolumns, 4, true);
				}
				else {
					// this.showcolumns[4] = false;
					Vue.set(this.showcolumns, 4, false);
				}

				if (_.indexOf(this.rate_table_columns, 'Rate Type') != -1) {
					// this.showcolumns[5] = true;
					Vue.set(this.showcolumns, 5, true);
				}
				else {
					// this.showcolumns[5] = false;
					Vue.set(this.showcolumns, 5, false);
				}

				if (_.indexOf(this.rate_table_columns, 'Update at') != -1) {
					// this.showcolumns[6] = true;
					Vue.set(this.showcolumns, 6, true);
				}
				else {
					// this.showcolumns[6] = false;
					Vue.set(this.showcolumns, 6, false);
				}

				if (_.indexOf(this.rate_table_columns, 'Update by') != -1) {
					// this.showcolumns[7] = true;
					Vue.set(this.showcolumns, 7, true);
				}
				else {
					// this.showcolumns[7] = false;
					Vue.set(this.showcolumns, 7, false);
				}

				if (_.indexOf(this.rate_table_columns, 'Action') != -1) {
					// this.showcolumns[8] = true;
					Vue.set(this.showcolumns, 8, true);
				}
				else {
					// this.showcolumns[8] = false;
					Vue.set(this.showcolumns, 8, false);
				}

				console.log(this.showcolumns);


				// this.$nextTick(() => {
				// 	document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
				// });
			},
			clickSelectedAll: function() {
				console.log("select_all-->"+this.checker);
				if(this.checker) {
					this.rates.forEach(function(rate, i){
						rate.selected = true;
					});
				}
				else {
					this.rates.forEach(function(rate, i){
						rate.selected = false;
					});
				}
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
			delete_rate: function(id){
				this.showModal = true;
				this.selected_ids = [];
				this.selected_ids.push(id);
			},
			closeModal: function() {
				this.showModal = '';
			},
			submit: function()
			{
				var vm = this;
				this.showModal = false;

				this.selected_ids.forEach(function(item, i){
					var rateid = item;
					if(rateid == 0){
						vm.setMessage({
							message:'The rate table has been not selected!',
							type:'error'
						});
					}
					else{
						vm.loading = true;
						vm.resource = vm.$resource(api.getEndpointUrl() + '/v1/switch/rate_table/'+rateid);
						vm.resource.delete({rate_table_id:rateid}).then(function(response){
							vm.loading = false;
							let index = _.findIndex(vm.rates, elem => elem.rate_table_id  === rateid)
							vm.rates.splice(index, 1)
							vm.setMessage('The rate tables have been deleted!')
						});
					}
				});
			},
			createNew: function() {
				this.$router.push({ path: "/switch/rate_table/new"});
			},
			deleteAll: function() {
				console.log("delete all rate tables");

				this.selected_ids = [];
				var vm = this;
				
				this.rates.forEach(function(rate, i){
					vm.selected_ids.push(rate.rate_table_id)
				});

				if (this.selected_ids.length == 0) {
					this.setMessage({
						message:'The rate table has been not selected!',
						type:'error'
					});
					this.checker = false;

					return;
				}

				this.showModal = true;
				if(this.checker)
					this.checker = false;
			},
			deleteSelected: function() {
				console.log("delete selected rate tables");
				console.log(this.rates);
				this.selected_ids = [];
				var vm = this;
				this.rates.forEach(function(rate, i){
					if(rate.selected==true) {
						vm.selected_ids.push(rate.rate_table_id);
					}
				});

				if (this.selected_ids.length == 0) {
					this.setMessage({
						message:'The rate table has been not selected!',
						type:'error'
					});
					this.checker = false;

					return;
				}

				this.showModal = true;
				if(this.checker)
					this.checker = false;
			},
			edit_rates: function(id){
				this.$router.push({path:"/switch/rate_table/editing_rates/"+id});
			},
			edit_ratetable: function(id) {
				this.$router.push({path: "/switch/rate_table/editing_ratetable/"+id});
			},
			copyRateTable: function() {
				this.closeModal();
				console.log("copyRateTable");
				this.copy_rate_table.name = this.copy_rate_table_name;
				console.log(this.copy_rate_table);

				this.$http.post(api.getEndpointUrl() + '/v1/switch/rate_table/create',
					{
						"currency_id": this.copy_rate_table.currency_id,
						"rate_type_name": this.copy_rate_table.rate_type_name,
						"billing_method": this.copy_rate_table.billing_method,
						"name": this.copy_rate_table.name,
						"code_deck_id": this.copy_rate_table.code_deck_id,
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
							this.$router.go(this.$router.currentRoute);
							this.setMessage('The rate table has been created!');
							// var vm = this;
							// setTimeout(function(){
							// 	vm.$router.go(vm.$router.currentRoute);
							// 	vm.hidemessage();
							// }, 3000);

							var rate_table_id = response.body.object_id;
							var apiUrl = "/v1/switch/rate_table/"+this.copy_rate_table.rate_table_id+"/rate/list";
							this.loading = true;
							this.$http.get(api.getEndpointUrl() + apiUrl,
								{
									headers: {
										"X-Auth-Token": auth.getToken()
									}
								}
								).then(
									function(response) {
										this.loading = false;
										var rates = response.body.payload.items;

										this.$http.post(api.getEndpointUrl() + '/v1/switch/rate_table/'+rate_table_id+'/rates',
										{
											"rates": rates
										},
										{
											headers: {
												"X-Auth-Token": auth.getToken()
											}
										}).then(
											function(response) {
												this.loading = false;
												console.log(response);

												this.$router.go(this.$router.currentRoute);
												this.setMessage('The rates has been created!');
											},
											function(response) {
												console.log(response);
												this.loading = false;
												this.setMessage({
													message:"Creating rates is failed!",
													type:'error'
												});
											}
										)
									},
									function(response) {
										console.log(response);
										this.loading = false;
										this.setMessage({
											message:"To get rates is failed!",
											type:'error'
										});
									}
								)

						},
						function(response) {
							this.loading = false;
							console.log(response);
							this.setMessage({
								message:"Creating rate table is failed!",
								type:'error'
							});
						}
					);
			}
		},
		mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
		},
		updated: function () {
			document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
		}
	}
</script>

<style>
    a.action.action_reply {
        font-size: 15px;
        vertical-align: top;
        padding-top: 5px;
    }
	.el-select__tags {
		display: none;
	}
</style>
