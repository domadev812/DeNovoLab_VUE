<template>
	<div class="container-fluid">
	  <modal v-if="showModal=='view_all'" @close="showModal = ''" class="big_modal">
			<h3 slot="header">Details</h3>
			<div slot="body">
			  <div class="">
				  <div class="table-responsive">
					<table class="table table-striped table-hover carrier_groups aligned-center">
					  <thead>
						 <tr>
							<th>Invoice Date</th>
							<th></th> 
						 </tr>
					  </thead>
					  <tbody>
						<tr>
						  <td>2017-02-07</td>
						  <td></td>
						</tr>
						<tr>
						  <td>2017-02-07</td>
						  <td></td>
						</tr>
						<tr>
						  <td>2017-02-07</td>
						  <td></td>
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
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Finance</a></li>
				  <li class="breadcrumb-item active">Carrier Invoice History</li>
			</ol>
			<h1 class="page-header">Carrier Invoice History</h1>
			<div class="white_pad table_wrap">
				<div class="table_filters searcheable">
					<div class="inline-block search_wrapper">
							<input type="text" name="carrier_search" v-model="carrier_search" class="form-control inline-block search_field" placeholder="Enter Search">
							<span class="dnl_icon dnl_musica-searcher"></span>
					</div>
					<div class="inline-block select_min_wrapper">
						<span class="inline-block">Page row:</span>
						<select2 :options="options1" v-model="selected1" class="inline-block" @pagecount="changePageRow">
						</select2>
					</div>
					<div class="inline-block">
						<!--<select2 :options="options2" v-model="selected2">
							<option disabled value="0">Show/Hide Columns</option>
						</select2>-->
						<el-select v-model="carrier_invoice_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
							<el-option v-for="item in carrier_invoice_table_column_options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="table-responsive">
					<table class="table table-striped table-hover roles carriers">
					  <thead>
						<tr>
						  <th v-if="showcolumns[0]">Name<span class="dnl_icon dnl_sort pull-right"></span></th>
						  <th v-if="showcolumns[1]">Payment Terms</th>
							<th v-if="showcolumns[2]">Type</th>
							<th v-if="showcolumns[3]">Last Invoice Amount</th>
							<th v-if="showcolumns[4]">Last Billing Period</th>
							<th v-if="showcolumns[5]">Last Invoice On</th>
						  <th v-if="showcolumns[6]" class="width-65">Action</th>
						</tr>
					  </thead>
					  <tbody>
						<tr v-if="!filterBy(carriers, carrier_search).length">
							<td style="text-align: center" colspan="7">No Data Found</td>
						</tr>										
						<tr v-for="carrier in filterBy(carriers, carrier_search)">
						  <td v-if="showcolumns[0]">{{carrier.payment_term_id}}</td>
						  <td v-if="showcolumns[1]">{{carrier.last_invoice}}</td>
							<td v-if="showcolumns[2]">{{carrier.last_invoice}}</td>
							<td v-if="showcolumns[3]">{{carrier.last_invoice}}</td>
							<td v-if="showcolumns[4]">{{carrier.last_invoice}}</td>
							<td v-if="showcolumns[5]">{{carrier.last_invoice}}</td>
						  <td v-if="showcolumns[6]">
							  <div>
							  	<a class="action action_read" data-toggle="tooltip" data-placement="top" title="View" @click="showModal = 'view_all'"><span class="dnl_icon dnl_action_menu"></span></a>
							  </div>
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
	module.exports = {
		components: {
			'select2': vSelect,
			'pagination': Pagination,
			'modal': modal
		},
		data: function(){
			return {
				showcolumns: [true, true, true, true, true, true, true],
				carrier_invoice_table_columns: ['Name', 'Payment Terms', 'Type', 'Last Invoice Amount', 'Last Billing Period', 'Last Invoice On', 'Action'],
				temp_carrier_invoice_table_columns: ['Name', 'Payment Terms', 'Type', 'Last Invoice Amount', 'Last Billing Period', 'Last Invoice On', 'Action'],
				carrier_invoice_table_column_options: [{
					value: 'Name',
					label: 'Name'
				}, {
					value: 'Payment Terms',
					label: 'Payment Terms'
				}, {
					value: 'Type',
					label: 'Type'
				}, {
					value: 'Last Invoice Amount',
					label: 'Last Invoice Amount'
				}, {
					value: 'Last Billing Period',
					label: 'Last Billing Period'
				}, {
					value: 'Last Invoice On',
					label: 'Last Invoice On'
				}, {
					value: 'Action',
					label: 'Action'
				}],
			  pageOne: {
                currentPage: 1,
                totalPages: 10,
								per_page: 10,
              },
		      showModal: '',
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
			  carrier_search: '',
			  carriers: []
            }
        },
		methods: {
			changePageRow (value) {
				console.log(value);
				if (value !== this.pageOne.per_page) {
					this.pageOne.per_page = value
					this.$nextTick(this.fetchCarriers)
				}
			},
			handleChange() {
				for(let i = 0; i < this.temp_carrier_invoice_table_columns.length; i++) {
					if (_.indexOf(this.carrier_invoice_table_columns, this.temp_carrier_invoice_table_columns[i]) != -1) {
						Vue.set(this.showcolumns, i, true);
					}
					else {
						Vue.set(this.showcolumns, i, false);
					}
				}
			},
			getQueries() {
				const page = '?page=' + (this.pageOne.currentPage - 1)
				const per_page = '&per_page=' + this.pageOne.per_page
				return page + per_page
			},
			fetchCarriers () {
				const url = api.getEndpointUrl() + '/v1/finance/auto_invoice/list' + this.getQueries()
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						this.carriers = body.payload.items
						this.pageOne.currentPage = body.payload.page + 1
						this.pageOne.totalPages = Math.ceil(body.payload.total / body.payload.per_page)
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			pageOneChanged (pageNum) {
				this.pageOne.currentPage = pageNum
			},
			closeModal: function() {
				this.showModal = '';
			}
		},
		created() {
			this.fetchCarriers()
		},
		updated: function () {
			document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
		},
	}
</script>

<style>
</style>
