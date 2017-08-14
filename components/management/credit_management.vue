<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a>Management</a></li>
				  <li class="breadcrumb-item active">Credit Management</li>
			</ol>
			<h1 class="page-header">Credit Management</h1>
			<div class="btn-group" role="group">
			  <button type="button" class="btn btn-default">
				  <span class="dnl_icon dnl_support"></span> Send Low Balance Alert
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
			<div class="white_pad table_wrap">
				<div class="advanced_search_filter_panel bottom_0">
					<div class="inline-block">
						<label>Client Type:</label>
						<br>
						<select2 :options="client_type_options" v-model="client_type">
						</select2>
					</div>
					<div class="inline-block search_wrapper">
						<label>Search:</label>
						<br>
						<input type="text" name="credit_search" v-model="credit_search" class="form-control inline-block search_field" placeholder="Enter Credit Name">
						<span class="dnl_icon dnl_musica-searcher"></span>
					</div>
				</div>
				<div class="clearfix"></div>
				<div class="pull-right pagination top_pagination">
					<pagination :current-page="pageOne.currentPage"
								:total-pages="pageOne.totalPages"
								@page-changed="pageOneChanged">
					</pagination>
				</div>
				<div class="table_filters m-top-15">
					<div class="inline-block select_min_wrapper">
						<span class="inline-block">Page row:</span>
						<select2 :options="options1" v-model="selected1" class="inline-block">
						</select2>
					</div>
					<div class="inline-block">
						<!--<select2 :options="options2" v-model="selected2">
							<option disabled value="0">Show/Hide Columns</option>
						</select2>-->
						<el-select v-model="credit_mng_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
							<el-option v-for="item in credit_mng_table_column_options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="clearfix"></div>
				<div class="table-responsive">
					<table class="table table-striped table-hover aliases credits">
					  <thead>
						<tr>
						  <th class="width-65">
							  <div class="checkbox checkbox-success">
								<input type="checkbox" v-model="checker">
								<label></label>
							  </div>
						  </th>
						  <th v-if="showcolumns[0]">Name<span class="dnl_icon dnl_sort pull-right"></span></th>
						  <th v-if="showcolumns[1]">Credit Limit</th>
						  <th v-if="showcolumns[2]">CPS Limit</th>
						  <th v-if="showcolumns[3]">Call Limit</th>
						  <th v-if="showcolumns[4]">Terms</th>
						  <th v-if="showcolumns[5]">Payment Terms</th>
						  <th v-if="showcolumns[6]">Last Paid on</th>
						  <th v-if="showcolumns[7]">Last Payment</th>
						  <th v-if="showcolumns[8]">Warning Limit</th>
						  <th v-if="showcolumns[9]">Update at</th>
						  <th v-if="showcolumns[10]">Update by</th>
						  <th v-if="showcolumns[11]" class="width_138">Actions</th>
						</tr>
					  </thead>
					  <tbody>
						<tr v-if="!filterBy(credits,credit_search).length">
							<td style="text-align: center" colspan="13">No Data Found</td>
						</tr>
							
						<tr v-for="credit in filterBy(credits, credit_search)">
						  <td class="centred_checkbox">
							  <div class="checkbox checkbox-success">
								<input :id="credit.client_id" :name="credit.client_id" type="checkbox">
								<label :for="credit.client_id"></label>
							  </div>
						  </td>
						  <td v-if="showcolumns[0]">{{credit.name}}</td>
						  <td v-if="showcolumns[1]">{{credit.credit_limit}}</td>
						  <td v-if="showcolumns[2]">{{credit.cps_limit}}</td>
						  <td v-if="showcolumns[3]">{{credit.call_limit}}</td>
						  <td v-if="showcolumns[4]">{{credit.billing_mode}}</td>
						  <td v-if="showcolumns[5]">{{credit.payment_term_name}}</td>
						  <td v-if="showcolumns[6]">{{credit.last_payment !== null? credit.last_payment.paid_on: ''}}</td>
						  <td v-if="showcolumns[7]">{{credit.last_payment !== null? credit.last_payment.amount: ''}}</td>
						  <td v-if="showcolumns[8]">{{credit.warning_limit}}</td>
						  <td v-if="showcolumns[9]">{{credit.update_at}}</td>
						  <td v-if="showcolumns[10]">{{credit.update_by}}</td>
						  <td v-if="showcolumns[11]">
							  <a class="action action_test" data-toggle="tooltip" data-placement="top" title="Diactivate">
								  <span class="dnl_icon dnl_check"></span>
							  </a>
							  <router-link :to="'/management/credit_management/edit/'+credit.client_id+'/'+credit.credit_limit+'/'+credit.cps_limit+'/'+credit.call_limit" class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit">
								  <span class="dnl_icon dnl_action_edit"></span>
							  </router-link>
							  <a class="action action_copy" data-toggle="tooltip" data-placement="top" title="Send Low Balance Alert">
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
			</div>
		</div>
	  </div>
		
		
	  <modal v-if="showModal=='trigger'" @close="showModal = ''">
			<h3 slot="header">Trigger</h3>
			<div slot="body">
			  <div class="">
				  <form class="form">
					  <div class="form-group">
						<label for="start_date">Start Date:</label>
						<input type="text" name="start_date" v-model="start_date" class="form-control" placeholder="Enter start date">
					  </div>
					  <div class="form-group">
						<label for="end_date">End Date:</label>
						<input type="text" name="end_date" v-model="end_date" class="form-control" placeholder="Enter end date">
					  </div>
					  <div class="form-group">
						<label>Time Zone:</label>
						<select2 :options="time_zone_options" v-model="time_zone" class="inline-block">
						</select2>
					  </div>
					  <div class="form-group">
						<label>File Breakdown:</label>
						<select2 :options="file_options" v-model="file_breakdown" class="inline-block">
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
		
		
		<modal v-else-if="showModal=='copy'" @close="showModal = ''">
			<h3 slot="header">Copy FTP Config</h3>
			<div slot="body">
			  <div class="">
				  <form class="form">
					  <div class="form-group">
						<label for="ftp_config_name">FTP Config Name:</label>
						<input type="text" name="ftp_config_name" class="form-control" placeholder="Enter FTP Config Name" v-model="ftp_config_name">
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
	const vSelect = require('vue!../main_components/select.vue'),
		  Pagination = require('vue!../main_components/pagination.vue'),
		  modal = require('vue!../main_components/modal.vue');
	const api = require("../../api");
	module.exports = {
		components: {
			'select2': vSelect,
			'pagination': Pagination,
			'modal': modal
		},
		data: function(){
			return {
				client_type: 'all active clients',
				client_type_options: [
					{id: 'all', text: 'All'},
					{id: 'all active clients', text: 'All Active Clients'},
					{id: 'all inactive clients', text: 'All Inactive Clients'},
				],
				showcolumns: [true, true, true, true, true, true, true, true, true, true, true, true],
				credit_mng_table_columns: ['Name', 'Credit Limit', 'CPS Limit', 'Call Limit', 'Terms', 'Payment Terms', 'Last Paid on', 'Last Payment', 'Warning Limit', 'Update at', 'Update by', 'Actions'],
				temp_credit_mng_table_columns: ['Name', 'Credit Limit', 'CPS Limit', 'Call Limit', 'Terms', 'Payment Terms', 'Last Paid on', 'Last Payment', 'Warning Limit', 'Update at', 'Update by', 'Actions'],
				credit_mng_table_column_options: [{
					value: 'Name',
					label: 'Name'
				}, {
					value: 'Credit Limit',
					label: 'Credit Limit'
				}, {
					value: 'CPS Limit',
					label: 'CPS Limit'
				}, {
					value: 'Call Limit',
					label: 'Call Limit'
				}, {
					value: 'Terms',
					label: 'Terms'
				}, {
					value: 'Payment Terms',
					label: 'Payment Terms'
				}, {
					value: 'Last Paid on',
					label: 'Last Paid on'
				}, {
					value: 'Last Payment',
					label: 'Last Payment'
				}, {
					value: 'Warning Limit',
					label: 'Warning Limit'
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
			  credits: [],
				per_page: 10,
            }
        },
		methods: {
			handleChange() {
				for(let i = 0; i < this.temp_credit_mng_table_columns.length; i++) {
					if (_.indexOf(this.credit_mng_table_columns, this.temp_credit_mng_table_columns[i]) != -1) {
						Vue.set(this.showcolumns, i, true);
					}
					else {
						Vue.set(this.showcolumns, i, false);
					}
				}
			},
			getQueries() {
				const page = '?page=' + (this.pageOne.currentPage - 1)
				const per_page = '&per_page=' + this.per_page
				return page + per_page
			},
			fetchCredits () {
				const url = api.getEndpointUrl() + '/v1/client/credit/list' + this.getQueries()
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						this.credits = body.payload.items
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
					this.$nextTick(this.fetchCredits)
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
			this.fetchCredits()
		},
		updated: function () {
			document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
		},
	}
</script>

<style>
	.btn-group .btn.btn-default span.dnl_icon.dnl_support {
		font-size: 14px;
		float: left;
		margin-right: 6px;
	}
	
	.table_filters.m-top-15 {
		margin-top:15px;
	}
	
	table.table.table-striped.table-hover.aliases.credits td, 
	table.table.table-striped.table-hover.aliases.credits th {
		padding-left: 3px;
		padding-right: 3px;
	}
</style>
