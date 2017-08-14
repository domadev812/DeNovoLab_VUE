<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a>Origination</a></li>
				  <li class="breadcrumb-item active">Vendors</li>
			</ol>
			<h1 class="page-header">Vendors</h1>
			<div class="white_pad table_wrap">
				<div class="advanced_search_filter_panel bottom_0">
					<div class="inline-block search_wrapper">
						<label>Name:</label>
						<br>
						<input type="text" name="credit_search" v-model="credit_search" class="form-control inline-block search_field" placeholder="Enter Vendor Name">
						<span class="dnl_icon dnl_musica-searcher"></span>
					</div>
				</div>
				<div class="clearfix"></div>
				<router-link to="/origination/vendors/new" class="btn btn-primary mini pull-right m-top-20">
                    <span class="dnl_icon dnl_add"></span> Create new 
                </router-link>
				<div class="table_filters m-top-15">
					<div class="inline-block select_min_wrapper">
						<span class="inline-block">Page row:</span>
						<select2 :options="options1" v-model="selected1" class="inline-block" @pagecount="changePageRow">
						</select2>
					</div>
					<div class="inline-block">
						<!--<select2 :options="options2" v-model="selected2">
							<option disabled value="0">Show/Hide Columns</option>
						</select2>-->
						<el-select v-model="vendor_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
							<el-option v-for="item in vendor_table_column_options" :key="item.value" :label="item.label" :value="item.value">
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
						  <th v-if="showcolumns[1]">Name<span class="dnl_icon dnl_sort pull-right"></span></th>
						  <th v-if="showcolumns[2]">Balance</th>
						  <!--<th v-if="showcolumns[3]">Billing Rule</th>-->
						  <th v-if="showcolumns[3]">Update at</th>
						  <th v-if="showcolumns[4]">Update by</th>
						  <th v-if="showcolumns[5]" class="width_138">Actions</th>
						</tr>
					  </thead>
					  <tbody>
						<tr v-if="!filterBy(clients, credit_search).length">
							<td style="text-align: center" colspan="6">No Data Found</td>
						</tr>										
						  
						<tr v-for="client in filterBy(clients, credit_search)">
							<td v-if="showcolumns[0]">{{client.ip}}</td>
						  <td v-if="showcolumns[1]">{{client.name}}</td>
						  <td v-if="showcolumns[2]">{{client.balance}}</td>
						  <!--<td v-if="showcolumns[3]">{{client.billing_rule}}</td>-->
						  <td v-if="showcolumns[3]">{{client.update_at}}</td>
						  <td v-if="showcolumns[4]">{{client.update_by}}</td>
						  <td v-if="showcolumns[5]">
							  <a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" @click="editVendor(client.client_id)">
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
	</div>
</template>

<script>   
	const vSelect = require('vue!../main_components/select.vue'),
		  Pagination = require('vue!../main_components/pagination.vue'),
		  modal = require('vue!../main_components/modal.vue');
	const api = require("../../api");
	import { mapActions } from 'vuex'
	module.exports = {
		components: {
			'select2': vSelect,
			'pagination': Pagination,
			'modal': modal
		},
		data: function(){
			return {
				showcolumns: [true, true, true, true, true, true],
				vendor_table_columns: ['IP', 'Name', 'Balance', 'Update at', 'Update by', 'Actions'],
				temp_vendor_table_columns: ['IP', 'Name', 'Balance', 'Update at', 'Update by', 'Actions'],
				vendor_table_column_options: [{
					value: 'IP',
					label: 'IP'
				}, {
					value: 'Name',
					label: 'Name'
				}, {
					value: 'Balance',
					label: 'Balance'
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
			  credit_search:'',
			  checker: '',
			  showModal: '',
			  start_date:'',
			  end_date:'',
			  ftp_config_name: '',
			  pageOne: {
                currentPage: 1,
                totalPages: 10
              },
			  selected1: 1,
			  options1: [
				  { id: 1, text: '10' },
				  { id: 2, text: '20' },
				  { id: 3, text: '30' },
				  { id: 4, text: '50' },
				  { id: 5, text: '100' }
			  ],
			  selected2: 0,
			  options2: [
				  { id: 1, text: 'Alias' },
				  { id: 2, text: 'Active' },
				  { id: 3, text: 'Actions' }
			  ],
			  clients: [],
				per_page: 10,
			}
		},
		methods: {
			...mapActions({
				setAsyncConfirm: 'async_confirm/setAsyncConfirm',
				setMessage: 'app_message/setAppMessage'
			}),
			handleChange() {
				console.log(this.vendor_table_columns);
				for(let i = 0; i < this.temp_vendor_table_columns.length; i++) {
					if (_.indexOf(this.vendor_table_columns, this.temp_vendor_table_columns[i]) != -1) {
						Vue.set(this.showcolumns, i, true);
					}
					else {
						Vue.set(this.showcolumns, i, false);
					}
				}
			},
			editVendor (id) {
				this.$router.push('/origination/vendors/edit/' + id);
			},
			getVendorIndex (id) {
				return _.findIndex(this.clients, elem => elem.client_id === id)
			},
			changePageRow (value) {
				if (value !== this.per_page) {
					this.per_page = value
					this.$nextTick(this.fetchVendors)
				}
			},
			deleteVendor(id) {
				const url = api.getEndpointUrl() + '/v1/did/vendor/' + id
				this.$http.delete(url)
				.then(response => {
					if (response.body.success) {
						let index = this.getVendorIndex(id)
						if (~index) {
							this.clients.splice(index, 1)
						}
						this.setMessage('Vendor was removed successfully')
					}
				})
			},
			askDeleteConfirm (id) {
				this.setAsyncConfirm('Are you sure you want to delete this vendor')
				.then(result => {
					if (result.accepted) {
						this.deleteVendor(id)
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			getQueries() {
				const page = '?page=' + (this.pageOne.currentPage - 1)
				const per_page = '&per_page=' + this.per_page
				return page + per_page
			},
			fetchVendors () {
				const url = api.getEndpointUrl() + '/v1/did/vendor/list' + this.getQueries()
				this.$http.get(url)
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
					this.$nextTick(this.fetchVendors)
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
			this.fetchVendors()
		},
		updated: function () {
			document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
		},
	}
</script>

<style>
</style>
