<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Origination</a></li>
				  <li class="breadcrumb-item active">DID Repository</li>
			</ol>
			<h1 class="page-header">DID Repository</h1>
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-default" @click="showModal='new'"><span class="dnl_icon dnl_action_edit"></span> Mass Edit</button>
              <button type="button" class="btn btn-default" @click="createRepository"><span class="dnl_icon dnl_add"></span> Create New</button>
              <button type="button" class="btn btn-default" v-on:click="exportCSV()">
                  <span class="dnl_icon dnl_export"></span> Export
              </button>
              <button type="button" class="btn btn-default">
                  <span class="dnl_icon dnl_download"></span> Upload
              </button>
              <button type="button" class="btn btn-default" @click="deleteAll">
                  <span class="dnl_icon dnl_action_delete"></span> Delete All
              </button>
              <button type="button" class="btn btn-default" @click="deleteSelected">
                  <span class="dnl_icon dnl_action_delete"></span> Delete Selected
              </button>
            </div>
            <div class="white_pad table_wrap">
                <div class="advanced_search_filter_panel">
                    <div class="inline-block search_wrapper">
                        <label>Vendor:</label>
                        <br>
                        <input type="text" name="client_list_search" v-model="client_list_search" class="form-control inline-block search_field" placeholder="Enter Vendor">
                        <span class="dnl_icon dnl_musica-searcher"></span>
                    </div>
                    <div class="inline-block">
                        <label>Client:</label>
                        <br>
                        <select2 :options="options2" v-model="selected2">
                            <option disabled value="0">Show/Hide Columns</option>
                        </select2>
                    </div>
                    <div class="inline-block">
                        <div class="form-group">
                            <label for="code">Code:</label>
                            <input type="text" name="code" v-model="code" class="form-control" placeholder="Enter Code">
                        </div>
                    </div>
                    <div class="inline-block">
                        <label>Show:</label>
                        <br>
                        <select2 :options="options2" v-model="selected2">
                            <option disabled value="0">Show/Hide Columns</option>
                        </select2>
                    </div>
                    <div class="inline-block">
                        <a class="btn btn-primary m-top-10">
                            Query
                        </a>
                    </div>
                </div>
                <div class="table_filters">
                    <div class="inline-block select_min_wrapper">
                        <span class="inline-block">Page row:</span>
                        <select2 :options="options1" v-model="selected1" class="inline-block" @pagecount="changePageRow">
                        </select2>
                    </div>
                    <div class="inline-block">
                        <!--<select2 :options="options2" v-model="selected2">
                            <option disabled value="0">Show/Hide Columns</option>
                        </select2>-->
						<el-select v-model="repository_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
							<el-option v-for="item in repository_table_column_options" :key="item.value" :label="item.label" :value="item.value">
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
                                <input type="checkbox" v-model="checker">
                                <label></label>
                              </div>
                          </th>
                          <th v-if="showcolumns[0]">DID</th>
						  <th v-if="showcolumns[1]">DID Vendor</th>
						  <th v-if="showcolumns[2]">Vendor Billing Rule</th>
                          <th v-if="showcolumns[3]">DID Client</th>
						  <th v-if="showcolumns[4]">Client Billing Rule</th>
                          <th v-if="showcolumns[5]">Created Time</th>
                          <th v-if="showcolumns[6]">Assigned Date</th>
						  <th v-if="showcolumns[7]">End Date</th>
                          <th v-if="showcolumns[8]" class="width_98">Action</th>
                        </tr>
                      </thead>
                      <tbody>
						<tr v-if="!filterBy(repositories, client_list_search).length">
							<td style="text-align: center" colspan="6">No Data Found</td>
						</tr>										
						  
                        <tr v-for="repository in filterBy(repositories, client_list_search)">
                          <td class="centred_checkbox">
                              <div class="checkbox checkbox-success">
                                <input :id="repository.id" :name="repository.id" type="checkbox" v-model="repository.selected">
                                <label :for="repository.id"></label>
                              </div>
                          </td>
                          <td v-if="showcolumns[0]">{{repository.did}}</td>
						  <td v-if="showcolumns[1]">{{repository.vendor_res_id}}</td>
						  <td v-if="showcolumns[2]">{{repository.vendor_billing_rule_id}}</td>
                          <td v-if="showcolumns[3]">{{repository.did_client}}</td>
						  <td v-if="showcolumns[4]">{{repository.client_billing_rule_id}}</td>
                          <td v-if="showcolumns[5]">{{repository.created_time}}</td>
                          <td v-if="showcolumns[6]">{{repository.assigned_time}}</td>
						  <td v-if="showcolumns[7]">{{repository.end_time}}</td>
                          <td v-if="showcolumns[8]">
                              <a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" @click="editRepository(repository.id)">
                                  <span class="dnl_icon dnl_action_edit"></span>
                              </a>
                              <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" @click="askDeleteConfirm(repository.id)">
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
            </div>
		</div>
	  </div>
      <modal v-if="showModal=='new'" @close="showModal = ''">
			<h3 slot="header">Client DID Assignment</h3>
			<div slot="body">
			  <div class="">
				  <form class="form">
                          <div class="form-group">
                            <label for="ftp_config_name">Assign to:</label>
                            <select2 :options="options2" v-model="selected2">
                                <option disabled value="0">Show/Hide Columns</option>
                            </select2>
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
    import { mapActions } from 'vuex'
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
				showcolumns: [true, true, true, true, true, true, true, true, true],
				repository_table_columns: ['DID', 'DID Vendor', 'Vendor Billing Rule', 'DID Client', 'Client Billing Rule', 'Created Time', 'Assigned Date', 'End Date', 'Action'],
				temp_repository_table_columns: ['DID', 'DID Vendor', 'Vendor Billing Rule', 'DID Client', 'Client Billing Rule', 'Created Time', 'Assigned Date', 'End Date', 'Action'],
				repository_table_column_options: [{
					value: 'DID',
					label: 'DID'
				}, {
					value: 'DID Vendor',
					label: 'DID Vendor'
				}, {
					value: 'Vendor Billing Rule',
					label: 'Vendor Billing Rule'
				}, {
					value: 'DID Client',
					label: 'DID Client'
				}, {
					value: 'Client Billing Rule',
					label: 'Client Billing Rule'
				}, {
					value: 'Created Time',
					label: 'Created Time'
				}, {
					value: 'Assigned Date',
					label: 'Assigned Date'
				}, {
					value: 'End Date',
					label: 'End Date'
				}, {
					value: 'Action',
					label: 'Action'
				}],
				route_types: [
				  { id: 1, text: 'Fail to Next Host' },
				  { id: 2, text: 'Fail to Next Trunk' },
				  { id: 3, text: 'Stop' },
			  	],
                code: '',
                showModal: '',
				pageOne: {
					currentPage: 1,
					totalPages: 10
				},
				checker: '',
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
			    repositories: [],
              per_page: 10,
			}
        },
		methods: {
            ...mapActions({
				setAsyncConfirm: 'async_confirm/setAsyncConfirm',
				setMessage: 'app_message/setAppMessage'
			}),
			handleChange() {
				for(let i = 0; i < this.temp_repository_table_columns.length; i++) {
					if (_.indexOf(this.repository_table_columns, this.temp_repository_table_columns[i]) != -1) {
						Vue.set(this.showcolumns, i, true);
					}
					else {
						Vue.set(this.showcolumns, i, false);
					}
				}
			},
			editRepository(id) {
				this.$router.push('/origination/did_repository/edit/' + id);
			},
			createRepository() {
				this.$router.push('/origination/did_repository/new/');
			},
			getRepositoryIndex (id) {
				return _.findIndex(this.repositories, elem => elem.id === id)
			},
			deleteSelected () {
				this.setAsyncConfirm('Are you sure you want to delete this selected repositories')
				.then(result => {
					if (result.accepted) {
						var vm = this;
						this.repositories.forEach(function (repository, i) {
							if (repository.selected == true) {
								let index = vm.getRepositoryIndex(repository.id)
								if (~index) {
									vm.repositories.splice(index, 1)
								}
								vm.deleteRepository(repository.id)
							}
						});
						if (this.checker)
							this.checker = false;
						this.setMessage('Selected repositories were removed successfully')
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			deleteAll () {
				this.setAsyncConfirm('Are you sure you want to delete all this repositories')
				.then(result => {
					if (result.accepted) {
						var vm = this;
						this.repositories.forEach(function (repository, i) {
							vm.deleteRepositories(repository.id)
						});
						if (this.checker)
							this.checker = false;
						this.repositories = [];
						this.setMessage('All repositories were removed successfully')
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			changePageRow (value) {
				console.log(value);
				if (value !== this.per_page) {
					this.per_page = value
					this.$nextTick(this.fetchRepositories)
				}
			},
			deleteRepository(id) {
				const url = api.getEndpointUrl() + '/v1/did/repository/' + id
				this.$http.delete(url)
				.then(response => {
					if (response.body.success) {
						let index = this.getRepositoryIndex(id)
						if (~index) {
							this.repositories.splice(index, 1)
						}
						this.setMessage('Repository was removed successfully')
					}
				})
			},
			askDeleteConfirm(id) {
				this.setAsyncConfirm('Are you sure you want to delete this repository')
				.then(result => {
					if (result.accepted) {
						this.deleteRepository(id)
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
            fetchRepositories () {
                const url = api.getEndpointUrl() + '/v1/did/repository/list' + this.getQueries()
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						this.repositories = body.payload.items
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
					this.$nextTick(this.fetchRepositories)
				}
			},
			closeModal: function() {
				this.showModal = '';
			},
			exportCSV: function()
			{
				var csvArray = new Array();
				var fields = ["did", "vendor_res_id", "vendor_billing_rule_id", "did_client", "client_billing_rule_id", "created_time", "assigned_time", "end_time"];
				csvArray.push(fields);
				this.repositories.forEach(function (repository, i) {
					var values = new Array();
					values.push(repository.did);
					values.push(repository.vendor_res_id);
					values.push(repository.vendor_billing_rule_id);
					values.push(repository.did_client);
					values.push(repository.client_billing_rule_id);
					values.push(repository.created_time);
					values.push(repository.assigned_time);
					values.push(repository.end_time);
					csvArray.push(values);                
				});
				exportToCsv('origination_did_repository_export.csv', csvArray);
			}
		},
		mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
		},
        created () {
            this.fetchRepositories()
        },
		updated: function () {
			document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
		},
	}
</script>

<style>
</style>
