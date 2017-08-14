<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Agent</a></li>
				  <li class="breadcrumb-item active">Agent Manager</li>
			</ol>
			<h1 class="page-header">Agent Manager</h1>
			<i v-show="loading" class="fa fa-spinner fa-spin" style="font-size:20px;"></i>
			<tabs class="agent_tabs">
				<tab label="Agent List" class="" icon="dnl_icon dnl_list" selected>
					<div class="table_filters searcheable">
						<div class="inline-block search_wrapper">
							<input type="text" name="role_search" v-model="search" class="form-control inline-block search_field" placeholder="Enter Agent Name">
							<span class="dnl_icon dnl_musica-searcher"></span>
						</div>
						<div class="inline-block select_min_wrapper">
							<span class="inline-block">Page row:</span>
							<select2 :options="options1" v-model="selected1" class="inline-block" @pagecount="changePageCount">
							</select2>
						</div>
						<div class="inline-block">
							<!-- <select2 :options="options2" v-model="selected2">
								<option disabled value="0">Show/Hide Columns</option>
							</select2> -->
							<el-select v-model="agent_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
								<el-option v-for="item in agent_table_column_options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
						<router-link to="/agent/agent_management/new" class="btn btn-primary mini pull-right">
							<span class="dnl_icon dnl_add"></span> Create new 
						</router-link>
					</div>
					<div class="table-responsive">
						<table class="table table-striped table-hover agents">
						  <thead>
							<tr>
							  <th v-if="showcolumns[0]">Agent Name<span class="dnl_icon dnl_sort pull-right"></span></th>
							  <th v-if="showcolumns[1]">Agent E-mail<span class="dnl_icon dnl_sort pull-right"></span></th>
							  <th v-if="showcolumns[2]">Comission<span class="dnl_icon dnl_sort pull-right"></span></th>
							  <th v-if="showcolumns[3]">Method<span class="dnl_icon dnl_sort pull-right"></span></th>
							  <th v-if="showcolumns[4]">Frequency<span class="dnl_icon dnl_sort pull-right"></span></th>
							  <th v-if="showcolumns[5]" class="width_138">Action</th>
							</tr>
						  </thead>
						  <tbody>
							<tr v-for="agent in filterBy(agents, search)">
							  <td v-if="showcolumns[0]">{{agent.agent_name}}</td>
							  <td v-if="showcolumns[1]">{{agent.email}}</td>
							  <td v-if="showcolumns[2]">{{agent.commission}}</td>
							  <td v-if="showcolumns[3]">{{agent.method_type}}</td>
							  <td v-if="showcolumns[4]">{{agent.frequency_type}}</td>
							  <td v-if="showcolumns[5]">
								  <a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" v-on:click="edit_agent(agent.agent_id)">
									  <span class="dnl_icon dnl_action_edit"></span>
								  </a>
								  <a class="action action_menu" data-toggle="tooltip" data-placement="top" title="Manage Clients">
									  <span class="dnl_icon dnl_action_menu"></span>
								  </a>
								  <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="askDeleteConfirm(agent.agent_id)">
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
				<tab label="Client Assignment" class="" icon="dnl_icon dnl_user">
					<div class="table_filters searcheable">
						<div class="inline-block search_wrapper">
								<input type="text" name="client_search" v-model="client_search" class="form-control inline-block search_field" placeholder="Enter Client Name">
								<span class="dnl_icon dnl_musica-searcher"></span>
						</div>
						<div class="inline-block select_min_wrapper">
							<span class="inline-block">Page row:</span>
							<select2 :options="options1" v-model="selected2" class="inline-block" @pagecount="changePageCount1">>
							</select2>
						</div>
						<div class="inline-block">
							<!-- <select2 :options="options2" v-model="selected2">
								<option disabled value="0">Show/Hide Columns</option>
							</select2> -->
							<el-select v-model="client_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange1">
								<el-option v-for="item in client_table_column_options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
						<a class="btn btn-primary mini pull-right" @click="showModal = 'add_new_client'">
							<span class="dnl_icon dnl_add"></span> Create new 
						</a>
				    </div>
					<div class="table-responsive">
						<table class="table table-striped table-hover clients">
						  <thead>
							<tr>
							  <th v-if="showcolumns1[0]">Client Name<span class="dnl_icon dnl_sort pull-right"></span></th>
							  <th v-if="showcolumns1[1]">Comission</th>
							  <th v-if="showcolumns1[2]">Based On</th>
							  <th v-if="showcolumns1[3]">Assigned On</th>
							  <th v-if="showcolumns1[4]">Registered On</th>
							  <th v-if="showcolumns1[5]">Status</th>
							  <th v-if="showcolumns1[6]">Assigned By</th>
							  <th v-if="showcolumns1[7]" class="width-65">Action</th>
							</tr>
						  </thead>
						  <tbody>
							<tr v-for="client in filterBy(clients, client_search)">
							  <td v-if="showcolumns1[0]">{{client.name}}</td>
							  <td v-if="showcolumns1[1]">{{client.comission}}</td>
							  <td v-if="showcolumns1[2]">{{client.based_on}}</td>
							  <td v-if="showcolumns1[3]">{{client.assigned_on}}</td>
							  <td v-if="showcolumns1[4]">{{client.registered_on}}</td>
							  <td v-if="showcolumns1[5]">{{client.status}}</td>
							  <td v-if="showcolumns1[6]">{{client.assigned_by}}</td>
							  <td v-if="showcolumns1[7]">
								  <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete">
									  <span class="dnl_icon dnl_action_delete"></span>
								  </a>
							  </td>
							</tr>
						  </tbody>
						</table>
					</div>
					<div class="pull-right pagination">
						<pagination :current-page="pageOne1.currentPage"
									:total-pages="pageOne1.totalPages"
									@page-changed="pageOneChanged1">
						</pagination>
					</div>
					<div class="clearfix"></div>
				</tab>
			</tabs>
		</div>
	  </div>
	  <modal v-if="showModal=='add_new_client'" @close="showModal = ''">
			<h3 slot="header">Assign Agent Client</h3>
			<div slot="body">
			  <div class="">
				  <form class="form">
					  <div class="form-group">
						<label for="old_password">Agent Name:</label>
						<select2 :options="agent_options" v-model="agent"></select2>
					  </div>
					  <div class="form-group">
						<label for="new_password">Client Name:</label>
						<select2 :options="carrier_options" v-model="carrier"></select2>
					  </div>
					  <div class="form-group">
						<label for="confirm_password">Method Type:</label>
						<select2 :options="method_type_options" v-model="method_type"></select2>
					  </div>
				  </form>
			  </div>
			</div>
			<div slot="footer">
				<button class="btn btn-primary submit">Submit</button>
				<button @click="closeModal" class="btn btn-default cancel">Cancel</button>
			</div>
		</modal>
	</div>
</template>

<script>   
	const vTabs = require('vue!../main_components/tabs.vue'),
		  vTab = require('vue!../main_components/tab.vue'),
		  vSelect = require('vue!../main_components/select.vue'),
		  Pagination = require('vue!../main_components/pagination.vue'),
		  modal = require('vue!../main_components/modal.vue');
		  const api = require("../../api");
		  const auth = require("../../auth");
	_ = require('lodash');
	import {mapGetters,	mapActions} from 'vuex'
		  
	module.exports = {
		components: {
			'tabs': vTabs,
			'tab': vTab,
			'select2': vSelect,
			'pagination': Pagination,
			'modal': modal
		},
		data: function(){
            return {
				method_type: '',
				method_type_options: [
					{id: 'by margin', text: 'By Margin'},
					{id: 'by revenue', text: 'By Revenue'},
				],
				carrier: '',
				carrier_options: [],
				client_options: [],
				agent: '',
				agent_options: [],
				resource : null,
				apiUrl : '/v1/agent/list',
				pageOne: {
						currentPage: 1,
						totalPages: 10,
						cntpage : 10
				},
				pageOne1: {
						currentPage: 1,
						totalPages: 10,
						cntpage : 10
				},
				showModal: '',
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
				selected2: 1,
				options1: [
					{ id: 1, text: '10' },
					{ id: 2, text: '20' },
					{ id: 3, text: '30' },
					{ id: 4, text: '50' },
					{ id: 5, text: '100' }
				],
				agents: [],
				clients: [],
				agent_table_column_options: [{
						value: 'Agent Name',
						label: 'Agent Name'
					},
					{
						value: 'Agent E-mail',
						label: 'Agent E-mail'
					},
					{
						value: 'Comission',
						label: 'Comission'
					},
					{
						value: 'Method',
						label: 'Method'
					},
					{
						value: 'Frequency',
						label: 'Frequency'
					},
					{
						value: 'Action',
						label: 'Action'
					}
				],
				agent_table_columns: ['Agent Name', 'Agent E-mail', 'Comission', 'Method', 'Frequency', 'Action'],
				showcolumns: [true, true, true, true, true, true],				
				client_table_column_options: [{
						value: 'Client Name',
						label: 'Client Name'
					},
					{
						value: 'Comission',
						label: 'Comission'
					},
					{
						value: 'Based On',
						label: 'Based On'
					},
					{
						value: 'Assigned On',
						label: 'Assigned On'
					},
					{
						value: 'Assigned By',
						label: 'Assigned By'
					},
					{
						value: 'Registered On',
						label: 'Registered On'
					},
					{
						value: 'Status',
						label: 'Status'
					},
					{
						value: 'Action',
						label: 'Action'
					}
				],
				temp_client_table_columns: ['Client Name', 'Comission', 'Based On', 'Assigned On', 'Assigned By', 'Registered On', 'Status', 'Action'],
				client_table_columns: ['Client Name', 'Comission', 'Based On', 'Assigned On', 'Assigned By', 'Registered On', 'Status', 'Action'],
				showcolumns1: [true, true, true, true, true, true, true, true],				
			}
        },
		methods: {
			...mapActions({
				setAsyncConfirm: 'async_confirm/setAsyncConfirm',
				setMessage: 'app_message/setAppMessage'
			}),
			handleChange() {
				if (_.indexOf(this.agent_table_columns, 'Agent Name') != -1) {
					Vue.set(this.showcolumns, 0, true);
				} else {
					Vue.set(this.showcolumns, 0, false);
				}
				if (_.indexOf(this.agent_table_columns, 'Agent E-mail') != -1) {
					Vue.set(this.showcolumns, 1, true);
				} else {
					Vue.set(this.showcolumns, 1, false);
				}
				if (_.indexOf(this.agent_table_columns, 'Comission') != -1) {
					Vue.set(this.showcolumns, 2, true);
				} else {
					Vue.set(this.showcolumns, 2, false);
				}
				if (_.indexOf(this.agent_table_columns, 'Method') != -1) {
					Vue.set(this.showcolumns, 3, true);
				} else {
					Vue.set(this.showcolumns, 3, false);
				}
				if (_.indexOf(this.agent_table_columns, 'Frequency') != -1) {
					Vue.set(this.showcolumns, 4, true);
				} else {
					Vue.set(this.showcolumns, 4, false);
				}
				if (_.indexOf(this.agent_table_columns, 'Action') != -1) {
					Vue.set(this.showcolumns, 5, true);
				} else {
					Vue.set(this.showcolumns, 5, false);
				}
				console.log(this.showcolumns);
			},
			handleChange1() {
				for(let i = 0; i < this.temp_client_table_columns.length; i++) {
					if (_.indexOf(this.client_table_columns, this.temp_client_table_columns[i]) != -1) {
						Vue.set(this.showcolumns1, i, true);
					}
					else {
						Vue.set(this.showcolumns1, i, false);
					}
				}
			},
			pageOneChanged(pageNum) {
				if (pageNum !== this.pageOne.currentPage) {
					this.pageOne.currentPage = pageNum
					this.$nextTick(this.fetchAgents)
				}
			},
			changePageCount (countPerPage) {
				if (countPerPage !== this.pageOne.cntpage) {
					this.pageOne.cntpage = countPerPage
					this.$nextTick(this.fetchAgents)
				}
			},
			pageOneChanged1(pageNum) {
				if (pageNum !== this.pageOne1.currentPage) {
					this.pageOne1.currentPage = pageNum
					this.$nextTick(this.fetchClients)
				}
			},
			changePageCount1 (countPerPage) {
				if (countPerPage !== this.pageOne1.cntpage) {
					this.pageOne1.cntpage = countPerPage
					this.$nextTick(this.fetchClients)
				}
			},
			closeModal: function() {
				this.showModal = '';
			},
			askDeleteConfirm (id) {
				this.setAsyncConfirm('Are you sure you want to delete?')
				.then(result => {
					if (result.accepted) {
						this.delete_module(id)
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			delete_module (id) {
				this.resource = this.$resource(api.getEndpointUrl() + '/v1/agent/'+id);
				this.resource.delete({agent_id:id})
				.then(response => {
					if (response.body.success) {
						let index = _.findIndex(this.agents, elem => elem.agent_id   === id)
						this.agents.splice(index, 1)
						this.setMessage('Agent was removed successfully')
					}
				})
			},
			edit_agent: function(id){
				this.$router.push({path:"/agent/agent_management/edit/"+id});
			},
			fetchTotalAgentList() {
				const url = api.getEndpointUrl() + '/v1/agent/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const agents = body.payload.items
						var self = this;
						agents.forEach(function (temp, i) {
							var agent = {};
							agent.id = temp.agent_id;
							agent.text = temp.agent_name;
							self.agent_options.push(agent);
							if (i == 0)
								self.agent = agent.id;
						});
						console.log(this.agent_options);
						
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			fetchAgents() {
				//get agent list
				this.loading = true;
				var page = this.pageOne.currentPage - 1;
				var per_page = this.pageOne.cntpage;
				this.$http.get(api.getEndpointUrl() + this.apiUrl+"?page="+page+"&per_page="+per_page+"&order_by=agent_id&order_dir=desc",
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(function(response) {
					//todo: check success flag? validation errors?
					this.loading = false;
					var agents = response.body.payload.items;
					this.agents = agents;
					console.log(agents);
					var total_page = response.body.payload.total;
					this.pageOne.currentPage = response.body.payload.page + 1;
					this.pageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
				}, function(error) {
					this.loading = false;
					console.log(error);
				});
			},
			fetchClients() {

			},
			fetchCarriers() {
				const url = api.getEndpointUrl() + '/v1/carrier/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const carriers = body.payload.items
						console.log(carriers);
						var self = this;
						carriers.forEach(function (temp, i) {
							var carrier = {};
							carrier.id = temp.client_id;
							carrier.text = temp.name;
							self.carrier_options.push(carrier);
							if(i == 0)
								self.carrier = carrier.id;
						});
						console.log(this.carrier_options);
						
					}
				})
				.catch(error => {
					console.log(error)
				})
			}
		},
		created: function(){
			this.fetchAgents();
			this.fetchClients();
			this.fetchTotalAgentList();
			this.fetchCarriers();
		},
		mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
		},
		updated: function () {
			var elementList = document.querySelectorAll('.el-input > input');
			for (var index = 0; index < elementList.length; index++) {
				console.log(elementList);
				elementList[index].placeholder = 'Show/Hide Columns';
			}
		},
	}
</script>

<style>
	.table.table-striped.table-hover.agents th,
	.table.table-striped.table-hover.agents td,
	.table.table-striped.table-hover.clients th,
	.table.table-striped.table-hover.clients td {
		padding-right: 8px;
		text-align: center;
		vertical-align: middle;
	}
	
	.width-65 {
		width: 65px;
	}
	
	.table-responsive table.table.table-striped.table-hover.agents td:first-child,
	.table-responsive table.table.table-striped.table-hover.clients td:first-child {
		text-align: left;
	}
	
	table.table.table-striped.table-hover.agents td .checkbox,
	table.table.table-striped.table-hover.clients td .checkbox {
		padding-left: 20px;
		margin-top: 6px;
		margin-bottom: 0;
	}
	
	.agents .checkbox-success input[type="checkbox"]:checked + label::before,
	.clients .checkbox-success input[type="checkbox"]:checked + label::before {
		background-color: #03c0fc;
		border-color: #03c0fc;
	}
	
	table.table.table-striped.table-hover.agents tr:hover,
	table.table.table-striped.table-hover.clients tr:hover {
		background: #73767b;
	}
	
	.agent_tabs .select2 {
		width: 180px !important;
	}
	
	@media (max-width: 767px) {
		.inline-block.search_wrapper, .inline-block.search_wrapper input {
			width: 100%;
		}
	}

	.el-select__tags {
		display: none;
	}

</style>
