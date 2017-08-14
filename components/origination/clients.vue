<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a>Origination</a></li>
				  <li class="breadcrumb-item active">Clients</li>
			</ol>
			<h1 class="page-header">Clients</h1>
			<div class="white_pad table_wrap">				
				<div class="advanced_search_filter_panel bottom_0">
					<div class="inline-block search_wrapper">
						<label>Name:</label>
						<br>
						<input type="text" name="credit_search" v-model="credit_search" class="form-control inline-block search_field" placeholder="Enter Client Name">
						<span class="dnl_icon dnl_musica-searcher"></span>
					</div>
				</div>
				<div class="clearfix"></div>
                <router-link to="/origination/clients/new" class="btn btn-primary mini pull-right m-top-20">
                    <span class="dnl_icon dnl_add"></span> Create new 
                </router-link>
				<div class="table_filters m-top-15">
					<div class="inline-block select_min_wrapper">
						<span class="inline-block">Page row:</span>
						<select2 :options="per_page_number_list" v-model="selected1" class="inline-block" @pagecount="changePageRow">
						</select2>
					</div>
					<div class="inline-block">
						<el-select v-model="client_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
							<el-option v-for="item in client_table_column_options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="clearfix"></div>
				<div class="table-responsive">
					<table class="table table-striped table-hover aliases credits">
					  <thead>
						<tr>
                          <th v-if="showcolumns[0]">IP</th>
						  <th v-if="showcolumns[1]">Name<a @click="sortName"><span class="dnl_icon dnl_sort pull-right"></span></a></th>
						  <th v-if="showcolumns[2]">Balance</th>
						  <th v-if="showcolumns[3]">Allowed credit</th>
						  <th v-if="showcolumns[4]">Price Per Max Channel</th>
						  <th v-if="showcolumns[5]">Update at</th>
						  <th v-if="showcolumns[6]">Update by</th>
						  <th v-if="showcolumns[7]" class="width_138">Actions</th>
						</tr>
					  </thead>
					  <tbody>
						<tr v-for="client in filterBy(clients, credit_search)">
							<td v-if="showcolumns[0]">
								<a class="action action_read" data-toggle="tooltip" data-placement="top" title="View" @click="viewIPList(client.client_id)">
									<span class="dnl_icon dnl_eye"></span>
								</a>
							</td>
						  <td v-if="showcolumns[1]">{{client.name}}</td>
						  <td v-if="showcolumns[2]">{{client.balance}}</td>
						  <td v-if="showcolumns[3]">{{client.allowed_credit}}</td>
						  <td v-if="showcolumns[4]"></td>
						  <td v-if="showcolumns[5]">{{client.update_at}}</td>
						  <td v-if="showcolumns[6]">{{client.update_by}}</td>
						  <td v-if="showcolumns[7]">
							  <a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" @click="editClients(client.client_id)">
								  <span class="dnl_icon dnl_action_edit"></span>
							  </a>
                              <a class="action action_test" data-toggle="tooltip" data-placement="top" title="Diactivate">
								  <span class="dnl_icon dnl_check"></span>
							  </a>
							  <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" @click="askDeleteConfirm(client.client_id)">
								  <span class="dnl_icon dnl_action_delete"></span>
							  </a>
                              <a class="action action_read" data-toggle="tooltip" data-placement="top" title="View DID">
								  <span class="dnl_icon dnl_eye"></span>
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
			</div>
		</div>
	  </div>
	  <modal v-if="showModal=='ip_list'" @close="showModal = ''" class="big_modal">
		  
            <h3 slot="header">IP List</h3>
            <div slot="body">
                <div class="">
                    <div class="table-responsive">
						<spinner v-show="loading_ip" class="spinner"></spinner>
                        <table class="table table-striped table-hover carrier_groups aligned-center">
                            <thead>
                                <tr>
                                    <th>IP</th>
                                    <th>Port</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="host in data.hosts">
                                    <td>{{host.ip}}</td>
                                    <td>{{host.port}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <button @click="closeModal" class="btn btn-default mini cancel centered">Cancel</button>
            </div>
        </modal>
	</div>
</template>

<script>   
	const vSelect = require('vue!../main_components/select.vue'),
		  Pagination = require('vue!../main_components/pagination.vue'),
		  modal = require('vue!../main_components/modal.vue');
	const api = require("../../api");
	const vSpinner = require('vue!../main_components/fadeloader.vue');
	import { mapActions } from 'vuex'
	const auth = require("../../auth");
	module.exports = {
		components: {
			'select2': vSelect,
			'pagination': Pagination,
			'modal': modal,
			'spinner': vSpinner
		},
		data: function(){
			return {
				order: 'update_at',
				sort: 'desc',

				name_sort: 'asc',
				showcolumns: [true, true, true, true, true, true, true, true],
				client_table_columns: ['IP', 'Name', 'Balance', 'Allowed credit', 'Price Per Max Channel', 'Update at', 'Update by', 'Actions'],
				temp_client_table_columns: ['IP', 'Name', 'Balance', 'Allowed credit', 'Price Per Max Channel', 'Update at', 'Update by', 'Actions'],
				client_table_column_options: [{
					value: 'IP',
					label: 'IP'
				}, {
					value: 'Name',
					label: 'Name'
				}, {
					value: 'Balance',
					label: 'Balance'
				}, {
					value: 'Allowed credit',
					label: 'Allowed credit'
				}, {
					value: 'Price Per Max Channel',
					label: 'Price Per Max Channel'
				}, {
					value: 'Update at',
					label: 'Update at'
				}, {
					value: 'Update by',
					label: 'Update by'
				}, {
					value: 'Actions',
					label: 'Actions'
				}],
				selected1: 1,
				per_page_number_list: [
					{ id: 1, text: '10' },
					{ id: 2, text: '20' },
					{ id: 3, text: '30' },
					{ id: 4, text: '50' },
					{ id: 5, text: '100' }
				],
				loading_ip: false,
				data: {},
			  credit_search:'',
			  checker: '',
			  showModal: '',
			  start_date:'',
			  end_date:'',
			  ftp_config_name: '',
			  pageOne: {
                currentPage: 1,
				totalPages: 10,
				per_page: 10,
              },
			  selected2: 0,
			  options2: [
				  { id: 1, text: 'Alias' },
				  { id: 2, text: 'Active' },
				  { id: 3, text: 'Actions' }
			  ],
			  clients: []
            }
        },
		methods: {
			...mapActions({
				setAsyncConfirm: 'async_confirm/setAsyncConfirm',
				setMessage: 'app_message/setAppMessage'
			}),
			handleChange() {
				for(let i = 0; i < this.temp_client_table_columns.length; i++) {
					if (_.indexOf(this.client_table_columns, this.temp_client_table_columns[i]) != -1) {
						Vue.set(this.showcolumns, i, true);
					}
					else {
						Vue.set(this.showcolumns, i, false);
					}
				}
			},
			changePageRow (value) {
				console.log(value);
				if (value !== this.pageOne.per_page) {
					this.pageOne.per_page = value
					this.$nextTick(this.fetchClients)
				}
			},
			viewIPList (id) {
				this.loading_ip = true;
				console.log("viewIPList", id);
				this.data = {};
				this.showModal='ip_list';
				const url = api.getEndpointUrl() + '/v1/did/client/' + id
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						console.log(body.payload);
						// this.organizeClient(body.payload)
						// this.hosts = body.payload.ip
						Vue.set(this.data, 'hosts', body.payload.resource.ip);
					}
					this.loading_ip = false;
				})
				.catch(error => {
					console.log(error)
					this.loading_ip = false;
				})
			},
			getClientIndex (id) {
				return _.findIndex(this.templates, elem => elem.client_id === id)
			},
			deleteClient(id) {
				const url = api.getEndpointUrl() + '/v1/did/client/' + id
				this.$http.delete(url)
				.then(response => {
					if (response.body.success) {
						let index = this.getClientIndex(id)
						if (~index) {
							this.clients.splice(index, 1)
						}
						this.setMessage('Client was removed successfully')
					}
				})
            },
			askDeleteConfirm(id) {
				this.setAsyncConfirm('Are you sure you want to delete this client')
				.then(result => {
					if (result.accepted) {
						this.deleteClient(id)
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			editClients(id) {
				this.$router.push('/origination/clients/edit/' + id)
			},
			sortName() {
				if(this.name_sort == 'asc') {
					this.name_sort = 'desc'
					this.sort = this.name_sort
					this.order = 'name'
					this.fetchClients()
				}
					
				else if(this.name_sort == 'desc') {
					this.name_sort = 'asc'
					this.sort = this.name_sort
					this.order = 'name'
					this.fetchClients()
				}
			},
			getQueries() {
				const page = '?page=' + (this.pageOne.currentPage - 1)
				const per_page = '&per_page=' + this.pageOne.per_page
				const order = '&order_by=' + this.order + '&order_dir=' + this.sort
				return page + per_page + order
			},
			fetchClients() {
				const url = api.getEndpointUrl() + '/v1/did/client/list' + this.getQueries()
				this.$http.get(url,
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				})
				.then(response => {
					const body = response.body
					if (body.success) {
						this.clients = body.payload.items
						this.pageOne.currentPage = body.payload.page + 1
						this.pageOne.totalPages = Math.ceil(body.payload.total / body.payload.per_page)
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			pageOneChanged (pageNum) {
				if (pageNum !== this.pageOne.currentPage) {
					this.pageOne.currentPage = pageNum
					this.$nextTick(this.fetchClients)
				}
			},
			closeModal: function() {
				this.showModal = '';
			}
		},
		mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
		},
		created () {
			this.fetchClients();
		},
		updated: function () {
			document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
		},
	}
</script>

<style>
</style>
