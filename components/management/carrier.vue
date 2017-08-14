<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Management</a></li>
				  <li class="breadcrumb-item active">Carrier</li>
			</ol>
			<h1 class="page-header">Carrier</h1>
			<div class="btn-group" role="group">
			  <router-link to="/management/clients/mass_edit" class="btn btn-default create_new_iconed"><span class="dnl_icon dnl_action_edit"></span> Mass Edit</router-link>
			  <router-link to="/management/clients/new" class="btn btn-default create_new_iconed"><span class="dnl_icon dnl_add"></span> Create New</router-link>
			  <button type="button" class="btn btn-default" v-on:click="exportCSV()">
				  <span class="dnl_icon dnl_export"></span> Export
			  </button>
			  <button type="button" class="btn btn-default">
				  <span class="dnl_icon dnl_download"></span> Download Balance
			  </button>
			  <button type="button" class="btn btn-default">
				  <span class="dnl_icon dnl_tick"></span> Activate All
			  </button>
			  <button type="button" class="btn btn-default">
				  <span class="dnl_icon dnl_check"></span> Deactivate All
			  </button>
			  <button type="button" class="btn btn-default">
				  <span class="dnl_icon dnl_tick"></span> Deactivate Selected
			  </button>
			</div>
			<spinner v-show="loading" class="spinner"></spinner>
			<tabs class="client_tabs" @activateTab="changeTab">
				<tab label="Client List" class="" icon="dnl_icon dnl_list" selected>
					<div class="advanced_search_filter_panel">
						<div class="inline-block search_wrapper">
							<label>Name:</label>
							<br>
							<input type="text" name="client_list_search" v-model="client_list_search" class="form-control inline-block search_field" placeholder="Enter Client Name">
							<span class="dnl_icon dnl_musica-searcher"></span>
						</div>
						<div class="inline-block">
							<label>Type:</label>
							<br>
							<select2 :options="type_options" v-model="type">
								<option disabled value="0">Show/Hide Columns</option>
							</select2>
						</div>
						<div class="inline-block">
							<label>Terms:</label>
							<br>
							<select2 :options="term_options" v-model="term">
							</select2>
						</div>
						<div class="clearfix little-space"></div>
						<div class="inline-block search_wrapper">
							<label>Registered On:</label>
							<el-date-picker v-model="registered_on" type="date" placeholder="Registered On"></el-date-picker>
						</div>
						<div class="inline-block">
							<label>Payment Terms:</label>
							<br>
							<select2 :options="payment_terms_options" v-model="payment_term">
							</select2>
						</div>
						<div class="inline-block">
							<label>Last Login On:</label>
							<el-date-picker v-model="last_login_on" type="date" placeholder="Last Login On"></el-date-picker>
						</div>
					</div>
					<div class="table_filters">
						<div class="inline-block select_min_wrapper">
							<span class="inline-block">Page row:</span>
							<select2 :options="per_page_number_list" v-model="per_page_selected_0" class="inline-block" @pagecount="changePageRow">
							</select2>
						</div>
						<div class="inline-block">
							<!-- <select2 :options="options2" v-model="selected2">
								<option disabled value="0">Show/Hide Columns</option>
							</select2> -->
							<el-select v-model="carrier_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
								<el-option v-for="item in carrier_table_column_options" :key="item.value" :label="item.label" :value="item.value">
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
									<input type="checkbox" id="checker" v-model="checker" @click="toggleChecker()">
									<label for="checker"></label>
								  </div>
							  </th>
							  <th v-if="showcolumns[0]">Name</th>
							  <th v-if="showcolumns[1]">Mutual Balance</th>
							  <th v-if="showcolumns[2]">Available Balance</th>
							  <th v-if="showcolumns[3]">Credit Limit</th>
							  <th v-if="showcolumns[4]">Egress</th>
							  <th v-if="showcolumns[5]">Ingress</th>
							  <th v-if="showcolumns[6]">Action</th>
							</tr>
						  </thead>
						  <tbody>
							<tr v-for="client in filterBy(client_list, client_list_search)">
							  <td class="centred_checkbox">
								  <div class="checkbox checkbox-success">
									<input :id="client.client_id" :name="client.client_id" type="checkbox" v-model="client.status">
									<label :for="client.client_id"></label>
								  </div>
							  </td>
							  <td v-if="showcolumns[0]">{{client.name}}</td>
							  <td v-if="showcolumns[1]">{{client.mutual_balance}}</td>
							  <td v-if="showcolumns[2]">{{client.is_prepay == true? client.test_credit:0}}</td>
							  <td v-if="showcolumns[3]">{{client.is_prepay == true? client.test_credit: (client.is_unlimited ==true? 'unlimited': '')}}</td>
							  <td v-if="showcolumns[4]"><router-link :to="'/management/clients/edit/'+client.client_id+'/egress'">{{client.egress}}</router-link></td>
							  <td v-if="showcolumns[5]"><router-link :to="'/management/clients/edit/'+client.client_id+'/ingress'">{{client.ingress}}</router-link></td>
							  <td v-if="showcolumns[6]" class="width-274">
								  <a class="action action_send" data-toggle="tooltip" data-placement="top" title="Send Low Balance Alert">
									  <span class="dnl_icon dnl_support"></span>
								  </a>
								  <a class="action action_reset" data-toggle="tooltip" data-placement="top" title="Reset The Balance">
									  <span class="dnl_icon dnl_refresh"></span>
								  </a>
								  <a class="action action_login_as" data-toggle="tooltip" data-placement="top" title="Login By Via This Client">
									  <span class="dnl_icon dnl_exit"></span>
								  </a>
								  <a class="action action_key" data-toggle="tooltip" data-placement="top" title="Change The Password Of The Client">
									  <span class="dnl_icon dnl_key"></span>
								  </a>
								  <a class="action action_activate" data-toggle="tooltip" data-placement="top" title="Diactivate This Client">
									  <span class="dnl_icon dnl_check"></span>
								  </a>
								  <a class="action action_save_template" data-toggle="tooltip" data-placement="top" title="Save As Template">
									  <span class="dnl_icon dnl_label"></span>
								  </a>
								  <router-link :to="'/management/clients/edit/'+client.client_id" class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit">
									  <span class="dnl_icon dnl_action_edit"></span>
								  </router-link>
								  <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" @click="askDeleteConfirm(client.client_id)">
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
									@page-changed="changeCurrentPage">
						</pagination>
					</div>
					<div class="clearfix"></div>
				</tab>
				<tab label="Client Limit" class="" icon="dnl_icon dnl_qos_report">
					<div class="advanced_search_filter_panel">
						<div class="inline-block search_wrapper">
							<label>Name:</label>
							<br>
							<input type="text" name="client_list_search" v-model="client_search" class="form-control inline-block search_field" placeholder="Enter Client Name">
							<span class="dnl_icon dnl_musica-searcher"></span>
						</div>
						<div class="inline-block">
							<label>Type:</label>
							<br>
							<select2 :options="type_options" v-model="type">
							</select2>
						</div>
					</div>
					<div class="table_filters searcheable">
						<div class="inline-block select_min_wrapper">
							<span class="inline-block">Page row:</span>
							<select2 :options="per_page_number_list" v-model="per_page_selected_1" class="inline-block">
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
							  <th>Name</th>
							  <th>Credit Limit</th>
							  <th>Port Limit</th>
							  <th>CPS Limit</th>
							  <th>Trunks</th>
							</tr>
						  </thead>
						  <tbody v-for="client in filterBy(clients, client_search)">
							<tr>
							  <td>{{client.name}}</td>
							  <td>
								  <input type="text" :name="client.credit_limit" v-model="client.credit_limit" class="form-control" placeholder="Client Credit Limit">
							  </td>
							  <td>
								  <input type="text" :name="client.port_limit" v-model="client.port_limit" class="form-control" placeholder="Client Port Limit">
							  </td>
							  <td>
								  <input type="text" :name="client.cps_limit" v-model="client.cps_limit" class="form-control" placeholder="Client CPS Limit">
							  </td>
							  <td class="width-65">
								  <a class="action action_send" data-toggle="tooltip" data-placement="top" title="View Trunks" @click="client.trunk_visibility = !client.trunk_visibility">
									  <span class="dnl_icon dnl_list"></span>
								  </a>
							  </td>
							</tr>
							<tr :class="{'hide' : client.trunk_visibility }">
								<td colspan="5">
									<table class="table table-striped table-hover clients trunks">
									  <thead>
										<tr>
										  <th>Trunk Type</th>
										  <th>Trunk Name</th>
										  <th>Port Limit</th>
										  <th>CPS Limit</th>
										</tr>
									  </thead>
									  <tbody>
										  <tr v-for="trunk in client.trunks">
											 <td>{{trunk.trunk_type}}</td>
											 <td>{{trunk.trunk_name}}</td>
											 <td>{{trunk.port_limit}}</td>
											 <td>{{trunk.cps_limit}}</td>
										  </tr>
									  </tbody>
								  </table>
							  </td>
							</tr>
						  </tbody>
						</table>
					</div>
					<div class="pull-right pagination">
						<pagination :current-page="pageOne.currentPage"
									:total-pages="pageOne.totalPages"
									@page-changed="changeCurrentPage">
						</pagination>
					</div>
					<div class="clearfix"></div>
				</tab>
				<tab label="Ingress Host" class="" icon="dnl_icon dnl_ingress_host">
					<div class="advanced_search_filter_panel">
						<div class="inline-block search_wrapper">
							<label>Carrier Name:</label>
							<br>
							<input type="text" name="carrier_name_search" v-model="carrier_name_search" class="form-control inline-block search_field" placeholder="Enter Carrier Name">
							<span class="dnl_icon dnl_musica-searcher"></span>
						</div>
						<div class="inline-block">
							<label>Resource Name:</label>
							<br>
							<input type="text" name="resource_search" v-model="resource_search" class="form-control inline-block search_field" placeholder="Enter Resource Name">
						</div>
						<div class="inline-block">
							<label>Terms:</label>
							<br>
							<select2 :options="options2" v-model="selected2">
								<option disabled value="0">Show/Hide Columns</option>
							</select2>
						</div>
					</div>
					<div class="table_filters">
						<div class="inline-block select_min_wrapper">
							<span class="inline-block">Page row:</span>
							<select2 :options="per_page_number_list" v-model="per_page_selected_2" class="inline-block">
							</select2>
						</div>
						<div class="inline-block fix_medium_select">
							<select2 :options="options2" v-model="selected2">
								<option disabled value="0">Show/Hide Columns</option>
							</select2>
						</div>
					</div>
					<div class="table-responsive">
						<table class="table table-striped table-hover clients">
						  <thead>
							<tr>
							  <th rowspan="2">Resource IP</th>
							  <th rowspan="2">Carrier Name</th>
							  <th rowspan="2">Resource Name</th>
							  <th rowspan="2">Status</th>
							  <th colspan="2">Carrier Limit</th>
							  <th colspan="2">Resource Limit</th>
							  <th colspan="2">Host Limit</th>
							</tr>
							<tr>
								<th>Call Limit</th>
								<th>CPS Limit</th>
								<th>Call Limit</th>
								<th>CPS Limit</th>
								<th>Call Limit</th>
								<th>CPS Limit</th>
							</tr>
						  </thead>
						  <tbody>
							<tr v-for="item in filterBy(ingress_host, carrier_name_search)">
							  <td>{{item.resource_ip}}</td>
							  <td>{{item.carrier_name}}</td>
							  <td>{{item.resource_name}}</td>
							  <td>{{item.status}}</td>
							  <td>{{item.carrier_limit_call}}</td>
							  <td>{{item.carrier_limit_cps}}</td>
							  <td>{{item.resource_limit_call}}</td>
							  <td>{{item.resource_limit_cps}}</td>
							  <td>{{item.host_limit_call}}</td>
							  <td>{{item.host_limit_cps}}</td>
							</tr>
						  </tbody>
						</table>
					</div>
					<div class="pull-right pagination">
						<pagination :current-page="pageOne.currentPage"
									:total-pages="pageOne.totalPages"
									@page-changed="changeCurrentPage">
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
		  Pagination = require('vue!../main_components/pagination.vue'),
		  vSpinner = require('vue!../main_components/fadeloader.vue'),
		  modal = require('vue!../main_components/modal.vue');
		  const api = require("../../api");
		  const auth = require("../../auth");
		  import _ from 'lodash'
		  import { mapActions } from 'vuex'
	module.exports = {
		
		created () {
			this.fetchClients();
			this.fetchPaymentTerms();
		},
		components: {
			'tabs': vTabs,
			'tab': vTab,
			'select2': vSelect,
			'pagination': Pagination,
			'modal': modal,
			'spinner': vSpinner
		},
		data: function(){
            return {
				payment_term: '',
				payment_terms_options: [],
				showcolumns: [true, true, true, true, true, true, true],
				carrier_table_columns: ['Name', 'Mutual Balance', 'Available Balance', 'Credit Limit', 'Egress', 'Ingress', 'Actions'],
				temp_carrier_table_columns: ['Name', 'Mutual Balance', 'Available Balance', 'Credit Limit', 'Egress', 'Ingress', 'Actions'],
				carrier_table_column_options: [{
					value: 'Name',
					label: 'Name'
				}, {
					value: 'Mutual Balance',
					label: 'Mutual Balance'
				}, {
					value: 'Available Balance',
					label: 'Available Balance'
				}, {
					value: 'Credit Limit',
					label: 'Credit Limit'
				}, {
					value: 'Egress',
					label: 'Egress'
				}, {
					value: 'Ingress',
					label: 'Ingress'
				}, {
					value: 'Actions',
					label: 'Actions'
				}],
				term: 'all',
				term_options: [
					{ id: 'all', text: 'All' },
					{ id: 'prepaid', text: 'Prepaid' },
					{ id: 'postpaid', text: 'Postpaid' },
				],
				type: 'all active clients',
				type_options: [
					{ id: 'all', text: 'All' },
					{ id: 'all active clients', text: 'All Active Clients' },
					{ id: 'all inactive clients', text: 'All Inactive Clients' },
				],
				loading: false,
				apiUrl: "/v1/client/list",
				route_types: [
				  { id: 1, text: 'Fail to Next Host' },
				  { id: 2, text: 'Fail to Next Trunk' },
				  { id: 3, text: 'Stop' },
			  	],
				pageOne: {
					currentPage: 1,
					totalPages: 10
				},
				checker: false,
				carrier_name_search: '',
				resource_search: '',
				client_list_search: '',
				client_search: '',
				search:'',
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
				per_page_number_list: [
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
				client_list: [],
				ingress_trunk_list: [],

			  clients: [
					{
					  name: "Agent1",
					  credit_limit: "Client1",
					  port_limit: "20%",
					  cps_limit: "2016-10-02 04:45:52+00",
					  trunk_visibility: true,
					  trunks: [
						  {
							  trunk_type: 'Egress',
							  trunk_name: 'Ultra_Egress',
							  port_limit: '',
							  cps_limit: ''
						  } 
					  ]
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
					}
			  ],
			  active_tab_index: 0,
			  active_tab_name: "Client List",
			  per_page_selected_0: 0,
			  per_page_0: 10,

			  per_page_selected_1: 0,
			  per_page_1: 10,

			  per_page_selected_2: 0,
			  per_page_2: 10,

			}
        },
		methods: {
			...mapActions({
				setAsyncConfirm: 'async_confirm/setAsyncConfirm',
				setMessage: 'app_message/setAppMessage'
			}),
			fetchPaymentTerms() {
				const url = api.getEndpointUrl() + '/v1/config/payment_term/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const payment_terms = body.payload.items
						var self = this;
						this.payment_terms_options = [{
							id: 'all', text: 'All'
						}];
						this.payment_terms_id = 'all';
						payment_terms.forEach(function (temp, i) {
							var payment_term = {};
							payment_term.id = temp.name;
							payment_term.text = temp.name;
							self.payment_terms_options.push(payment_term);
						});
						console.log(this.payment_terms_options);
						
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			handleChange() {
				for(let i = 0; i < this.temp_carrier_table_columns.length; i++) {
					if (_.indexOf(this.carrier_table_columns, this.temp_carrier_table_columns[i]) != -1) {
						Vue.set(this.showcolumns, i, true);
					}
					else {
						Vue.set(this.showcolumns, i, false);
					}
				}
			},
			getEgressCount(id, index) {
				this.loading = true;
				const url = api.getEndpointUrl() + '/v1/carrier/'+id+'/egress_trunk/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						Vue.set(this.client_list[index], 'egress', body.payload.total);
						this.loading = false;
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			getIngressCount(id, index) {
				this.loading = true;
				const url = api.getEndpointUrl() + '/v1/carrier/'+id+'/ingress_trunk/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						Vue.set(this.client_list[index], 'ingress', body.payload.total);
						this.loading = false;
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			deleteClient (id) {
				const url = api.getEndpointUrl() + '/v1/carrier/' + id
				this.$http.delete(url)
				.then(response => {
					if (response.body.success) {
						let index = this.getClientIndex(id)
						if (~index) {
							this.client_list.splice(index, 1)
						}
						this.setMessage('Carrier was removed successfully')
					}
				})
			},
			askDeleteConfirm (id) {
				this.setAsyncConfirm('Are you sure you want to delete this carrier')
				.then(result => {
					if (result.accepted) {
						this.deleteClient(id)
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			editClient (id) {
				this.$router.push('/management/clients/edit/' + id)
			},
			toggleChecker () {
				console.log('Toggle activated')
				const state = this.checker
				const clients = this.client_list
				const clientsLength = clients.length
				for (let i = 0; i < clientsLength; i++) {
					clients[i].status = state
				}
			},
			changePageRow (value) {
				if (value !== this['per_page_' + this.active_tab_index]) {
					this['per_page_' + this.active_tab_index] = value
					this.$nextTick(this.fetchClients)
				}
			},
			fetchIngressTrunks () {
				console.log('Function not ready yet')
			},
			changeTab (tab, index) {				
				if (this.active_tab_index === index) { return }
				this.active_tab_index = index
				this.active_tab_name = tab.name;
				this.$nextTick(() => {
					if (index === 2 && !this.ingress_trunk_list.length) {
						this.fetchIngressTrunks()
					}
				})
			},
			getClientIndex (id) {
				return _.findIndex(this.client_list, elem => elem.client_id === id)
			},
			fetchClientBalance (id) {
				const url = api.getEndpointUrl() + '/v1/carrier/' + id + '/balance'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const payload = body.payload
						const index = this.getClientIndex(id)
						if (~index) {
							let client = this.client_list[index]
							client.mutual_balance = payload.mutual_balance
							client.actual_balance = payload.actual_balance
						}
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			getQueries () {
				// currentPage needs to be in each tab
				// remember to add &order_by
				const page = '?page=' + (this.pageOne.currentPage - 1)
				const per_page = '&per_page=' + this['per_page_' + this.active_tab_index]
				const orderby = '&order_by=update_at&order_dir=desc'
				return page + per_page + orderby
			},
			fetchClients () {
				this.loading = true;
				this.client_list = []
				const url = api.getEndpointUrl() + '/v1/carrier/list' + this.getQueries()
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const payload = body.payload
						this.client_list = payload.items;
						// this.client_list = payload.items.map(elem => {
						// 	elem.mutual_balance = null
						// 	elem.actual_balance = null
						// 	this.fetchClientBalance(elem.client_id)
						// 	return elem
						// })
						var vm = this;
						this.loading = false;
						this.client_list.forEach(function (temp, i) {
							vm.getEgressCount(temp.client_id, i);
							vm.getIngressCount(temp.client_id, i);
						});
						console.log(this.client_list);
						this.pageOne.currentPage = payload.page + 1
						this.pageOne.totalPages = Math.ceil(payload.total / payload.per_page)
					}
				})
				.catch(error => {
					console.log(error)
					this.loading = false;
				})
			},
			changeCurrentPage (pageNum) {
				if (pageNum !== this.pageOne.currentPage) {
					this.pageOne.currentPage = pageNum
					this.$nextTick(this.fetchClients)
				}
			},
			closeModal: function() {
				this.showModal = '';
			},
			exportCSV: function()
			{
				var vm = this;		
            	var csvArray = new Array();
				if(this.active_tab_name == "Client List")
				{
					var fields = ["name", "mutual_balance", "actual_balance", "is_prepay", "egress", "ingress"];
					csvArray.push(fields); 
					this.client_list.forEach(function (client, i) {
						var values = new Array();			
						values.push(client.name);
						values.push(client.mutual_balance);
						values.push(client.actual_balance);
						values.push(client.is_prepay == true? client.test_credit: (client.is_unlimited ==true? 'unlimited': ''));
						values.push(client.egress);
						values.push(client.ingress);
						csvArray.push(values);                
					});	
				}
				else if(this.active_tab_name == "Client Limit")
				{
					var fields = ["name", "credit_limit", "port_limit", "cps_limit"];
					csvArray.push(fields); 
					this.clients.forEach(function (client, i) {
						var values = new Array();			
						values.push(client.name);
						values.push(client.credit_limit);
						values.push(client.port_limit);
						values.push(client.cps_limit);
						csvArray.push(values);                
					});
				} 
				else if(this.active_tab_name == "Ingress Host")
				{									
					var fields = ["resource_ip", "carrier_name", "resource_name", "status", "carrier_limit_call", "carrier_limit_cps", "resource_limit_call", "resource_limit_cps", "host_limit_call", "host_limit_cps"];
					csvArray.push(fields); 
					this.ingress_host.forEach(function (item, i) {
						var values = new Array();			
						values.push(item.resource_ip);
						values.push(item.carrier_name);
						values.push(item.resource_name);
						values.push(item.status);
						values.push(item.carrier_limit_call);
						values.push(item.carrier_limit_cps);
						values.push(item.resource_limit_call);
						values.push(item.resource_limit_cps);
						values.push(item.host_limit_call);
						values.push(item.host_limit_cps);
						csvArray.push(values);                
					});
				}
				exportToCsv('management_carrier_' + this.active_tab_name +'_export.csv', csvArray);
			}
		},
		mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
		},
		updated: function () {
			document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
		},
	}
</script>

<style>
	
	.client_tabs a.tab span.dnl_icon.dnl_qos_report,
	.client_tabs a.tab span.dnl_icon.dnl_ingress_host {
		font-size: 18px;
	}
	
	.client_tabs a.tab span.dnl_icon {
		margin-right: 5px;
		vertical-align: top;
		line-height: 0;
	}
	
	span.dnl_icon.dnl_ingress_host {
		float: left;
		margin-top: 9px;
		margin-right: 6px;
	}
	
	.btn-group .btn.btn-default {
		width: auto;
		padding: 5px 15px;
		font-size: 13px;
		line-height: 15px;
	}
	
	.btn-group .btn.btn-default.create_new_iconed {
		line-height: 13px;
	}
	
	.btn-group .btn.btn-default span.dnl_icon {
		margin-right: 5px;
		font-size: 18px;
		vertical-align: middle;
	}
	
	.btn-group .btn.btn-default span.dnl_icon.dnl_action_edit {
		margin-right: 1px;
    	font-size: 19px;
	}
	
	.btn-group .btn.btn-default span.dnl_icon.dnl_add {
    	font-size: 15px;
    	float: left;
    	margin-top: -1px;
    	margin-right: 5px;
	}
	
	.btn-group .btn.btn-default span.dnl_icon.dnl_export {
		font-size: 19px;
    	float: left;
    	margin-right: 4px;
	}
	
	.btn-group .btn.btn-default span.dnl_icon.dnl_download {
		margin-right: 1px;
	}
	
	.btn-group .btn.btn-default span.dnl_icon.dnl_check {
		margin-right: 4px;
    	float: left;
    	margin-bottom: -2px;
	}
	
	.btn-group .btn.btn-default span.dnl_icon.dnl_tick {
    	margin-right: 6px;
    	font-size: 16px;
    	float: left;
    	margin-top: -2px;
	}
	
	.btn-group {
		margin: 5px 0 10px 0;
	}
	
	.advanced_search_filter_panel {
		background: #f7f8f9;
		padding: 20px;
		border-radius: 5px;
		margin-bottom: 15px;
	}
	
	.advanced_search_filter_panel .search_wrapper .dnl_icon {
		margin-top: 25px;
	}
	
	.advanced_search_filter_panel .inline-block{
		width: 255px;
		margin-right: 0px;
	}
	
	.advanced_search_filter_panel .search_wrapper {
		margin-right: 0;
	}
	
	.advanced_search_filter_panel .inline-block .select2,
	.advanced_search_filter_panel .inline-block input {
		width: 250px !important;
	}
	
	a.action.action_send {
		font-size: 14px;
		padding-top: 5px;
		vertical-align: bottom;
	}
	
	a.action.action_reset {
		padding-left: 4px;
	}
	
	a.action.action_login_as {
		font-size: 19px;
		padding-top: 3px;
		padding-left: 2px;
	}
	
	a.action.action_activate {
		padding-left: 5px;
		font-size: 18px;
		vertical-align: text-bottom;
		padding-top: 5px;
	}
	
	a.action.action_save_template {
		font-size: 19px;
		vertical-align: bottom;
		padding-top: 4px;
	}
	
	.width-274 {
		width: 274px;
	}
	
	.fix_medium_select .select2 {
		width: 180px !important;
	}
	
	.table>tbody+tbody {
		border-top: 1px solid #ddd;
	}
	
	a.btn.btn-default.create_new_iconed {
		padding-top: 11px;
	}
	
	td.centred_checkbox .checkbox.checkbox-success {
    	text-align: center;
	}
	
	td.centred_checkbox .checkbox.checkbox-success label::after {
		margin-left: -21px;
	}
	
	th.width-65 .checkbox-success {
		margin: 5px 0 -2px 13px;
	}
	
	.tabs_header .tab span.dnl_icon.dnl_qos_report {
		float: left;
		line-height: 23px !important;
		margin-right: 7px !important;
	}
	
	@media (max-width: 767px) {
		.advanced_search_filter_panel .inline-block {
			width: 100%;
			margin-bottom: 10px !important;
		}
		
		.advanced_search_filter_panel .inline-block .select2, 
		.advanced_search_filter_panel .inline-block input {
			width: 100%!important;
		}
		
		.advanced_search_filter_panel .inline-block input {
			margin-bottom: 0 !important;
		}
	}
	
	@media (max-width: 979px) {
		.btn-group .btn {
			display: block;
			border-radius: 5px !important;
			margin-bottom: 6px;
			text-align: left;
			margin-right: 10px;
		}
	}
</style>
