<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Origination</a></li>
				  <li class="breadcrumb-item active">DID Routing</li>
			</ol>
			<h1 class="page-header">DID Routing</h1>
			<div class="white_pad table_wrap">
				<div class="advanced_search_filter_panel bottom_0">
					<div class="inline-block search_wrapper">
						<label>Search:</label>
						<br>
						<input type="text" name="carrier_name" v-model="carrier_name" class="form-control inline-block search_field" placeholder="Enter Carrier Name">
						<span class="dnl_icon dnl_musica-searcher"></span>
					</div>
				</div>
				<div class="pull-right pagination top_pagination">
					<pagination :current-page="pageOne.currentPage"
								:total-pages="pageOne.totalPages"
								@page-changed="pageOneChanged">
					</pagination>
				</div>
				<div class="table_filters searcheable m-top-15">
					<div class="inline-block select_min_wrapper">
						<span class="inline-block">Page row:</span>
						<select2 :options="per_page_number_list" v-model="selected1" class="inline-block" @pagecount="changePageRow">
						</select2>
					</div>
					<div class="inline-block fix_medium_select">
						<!--<select2 :options="options2" v-model="selected2">
							<option disabled value="0">Show/Hide Columns</option>
						</select2>-->
						<el-select v-model="routing_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
							<el-option v-for="item in routing_table_column_options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="clearfix"></div>
				<div class="table-responsive">
					<table class="table table-striped table-hover aliases">
					  <thead>
							<tr>
								<th v-if="showcolumns[0]">DID</th>
								<th v-if="showcolumns[1]">Vendor Trunk</th>
								<th v-if="showcolumns[2]">Client Trunk</th>
								<th v-if="showcolumns[3]">Update At</th>
								<th v-if="showcolumns[4]">Update By</th>
								<th v-if="showcolumns[5]" class="width_98">Action</th>
							</tr>
						</thead>
					  <tbody>
						<tr v-if="!filterBy(routings, carrier_name).length">
							<td style="text-align: center" colspan="6">No Data Found</td>
						</tr>										
						<tr v-for="routing in filterBy(routings, carrier_name)">
						  <td v-if="showcolumns[0]">{{routing.did}}</td>
						  <td v-if="showcolumns[1]">{{routing.vendor_trunk}}</td>
						  <td v-if="showcolumns[2]">{{routing.client_trunk}}</td>
						  <td v-if="showcolumns[3]">{{routing.update_at}}</td>
						  <td v-if="showcolumns[4]">{{routing.update_by}}</td>
						  <td v-if="showcolumns[5]">
							  <a data-toggle="tooltip" data-placement="top" title="QoS Parameters" class="action action_menu" @click="showModal='qos_parameters'">
								  <span class="dnl_icon dnl_action_menu"></span>
							  </a>
							  <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete">
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
      <modal v-if="showModal=='qos_parameters'" @close="showModal = ''" class="biggest_modal">
			<h3 slot="header">Trunk Priority</h3>
			<div slot="body">
			  <div class="row">
                  <div class="col-sm-3">
                      <div class="form-group">
						<label>Min ASR:</label>
						<input type="text" name="min_asr" v-model="min_asr" class="form-control" placeholder="Enter Min ASR">
					  </div>
                  </div>
                  <div class="col-sm-3">
                      <div class="form-group">
						<label>Max ASR:</label>
						<input type="text" name="max_asr" v-model="max_asr" class="form-control" placeholder="Enter Max ASR">
					  </div>
                  </div>
				  <div class="col-sm-3">
                      <div class="form-group">
						<label>Min ABR:</label>
						<input type="text" name="min_abr" v-model="min_abr" class="form-control" placeholder="Enter Min ABR">
					  </div>
                  </div>
                  <div class="col-sm-3">
                      <div class="form-group">
						<label>Max ABR:</label>
						<input type="text" name="max_abr" v-model="max_abr" class="form-control" placeholder="Enter Max ABR">
					  </div>
                  </div>
                  <div class="col-sm-3">
                      <div class="form-group">
						<label>Min ACD:</label>
						<input type="text" name="min_acd" v-model="min_acd" class="form-control" placeholder="Enter Min ACD">
					  </div>
                  </div>
                  <div class="col-sm-3">
                      <div class="form-group">
						<label>Max ACD:</label>
						<input type="text" name="max_acd" v-model="max_acd" class="form-control" placeholder="Enter Max ACD">
					  </div>
                  </div>
                  <div class="col-sm-3">
                      <div class="form-group">
						<label>Min PDD:</label>
						<input type="text" name="min_pdd" v-model="min_pdd" class="form-control" placeholder="Enter Min PDD">
					  </div>
                  </div>
                  <div class="col-sm-3">
                      <div class="form-group">
						<label>Max PDD:</label>
						<input type="text" name="max_pdd" v-model="max_pdd" class="form-control" placeholder="Enter Max PDD">
					  </div>
                  </div>
                  <div class="col-sm-3">
                      <div class="form-group">
						<label>Min ALOC:</label>
						<input type="text" name="min_aloc" v-model="min_aloc" class="form-control" placeholder="Enter Min ALOC">
					  </div>
                  </div>
                  <div class="col-sm-3">
                      <div class="form-group">
						<label>Max ALOC:</label>
						<input type="text" name="max_aloc" v-model="max_aloc" class="form-control" placeholder="Enter Max ALOC">
					  </div>
                  </div>
                  <div class="col-sm-3">
                      <div class="form-group">
						<label>Max Price:</label>
						<input type="text" name="max_price" v-model="max_price" class="form-control" placeholder="Enter Max Price">
					  </div>
                  </div>
			  </div>
			</div>
			<div slot="footer">
				<button class="btn btn-primary submit mini">Submit</button>
				<button @click="closeModal" class="btn btn-default cancel mini">Cancel</button>
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
				showcolumns: [true, true, true, true, true, true],
				routing_table_columns: ['DID', 'Vendor Trunk', 'Client Trunk', 'Update At', 'Update By', 'Actions'],
				temp_routing_table_columns: ['DID', 'Vendor Trunk', 'Client Trunk', 'Update At', 'Update By', 'Actions'],
				routing_table_column_options: [{
					value: 'DID',
					label: 'DID'
				}, {
					value: 'Vendor Trunk',
					label: 'Vendor Trunk'
				}, {
					value: 'Client Trunk',
					label: 'Client Trunk'
				}, {
					value: 'Update At',
					label: 'Price/Minute'
				}, {
					value: 'Update By',
					label: 'Update By'
				}, {
					value: 'Actions',
					label: 'Actions'
				}],
				min_asr: '',
				max_asr: '',
				min_abr: '',
				max_abr: '',
				min_aloc: '',
				max_aloc: '',
				max_price: '',
				min_pdd: '',
				max_pdd: '',
				min_acd: '',
				max_acd: '',
			  ftp_list_search: '',
			  checker: '',
			  start_date:'',
			  end_date:'',
			  carrier_name: '',
			  pageOne: {
					currentPage: 1,
					totalPages: 10
				},
			  selected1: 1,
				showModal: '',
			  per_page_number_list: [
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
			  file_breakdown: 2,
			  file_options:[
				  {id: 1, text: 'As one big file'},
				  {id: 2, text: 'As hourly file'},
				  {id: 3, text: 'As daily file'},
			  ],
			  routings: [],
				per_page: 10,
			}
		},
		methods: {
			handleChange() {
				for(let i = 0; i < this.temp_routing_table_columns.length; i++) {
					if (_.indexOf(this.routing_table_columns, this.temp_routing_table_columns[i]) != -1) {
						Vue.set(this.showcolumns, i, true);
					}
					else {
						Vue.set(this.showcolumns, i, false);
					}
				}
			},
			changePageRow (value) {
				console.log(value);
				if (value !== this.per_page) {
					this.per_page = value
					this.$nextTick(this.fetchRouting)
				}
			},
			getQueries() {
				const page = '?page=' + (this.pageOne.currentPage - 1)
				const per_page = '&per_page=' + this.per_page
				return page + per_page
			},
			fetchRouting() {
				const url = api.getEndpointUrl() + '/v1/did/routing/list' + this.getQueries()
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						this.routings = body.payload.items
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
					this.$nextTick(this.fetchRouting)
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
			this.fetchRouting()
		},
		updated: function () {
			document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
		},
	}
</script>

<style>
</style>
