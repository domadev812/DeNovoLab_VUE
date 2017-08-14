<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Tools</a></li>
				  <li class="breadcrumb-item active">Rate Generation</li>
			</ol>
			<h1 class="page-header">Rate Generation</h1>
			<div class="white_pad table_wrap">
				<div class="table_filters">
					<div class="inline-block select_min_wrapper">
						<span class="inline-block">Page row:</span>
						<select2 :options="options1" v-model="selected1" class="inline-block" @pagecount="changePageRow">
						</select2>
					</div>
					<div class="inline-block">
						<el-select v-model="rate_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
							<el-option v-for="item in rate_table_column_options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
					<router-link to="/tools/rate_generation/new" class="btn btn-primary mini pull-right">
						<span class="dnl_icon dnl_add"></span> Create new 
					</router-link>
				</div>
				<div class="table-responsive">
					<table class="table table-striped table-hover carrier_groups">
					  <thead>
						<tr>
						  <th v-if="showcolumns[0]">Rate Template<span class="dnl_icon dnl_sort pull-right"></span></th>
						  <th v-if="showcolumns[1]">Created on<span class="dnl_icon dnl_sort pull-right"></span></th>
                          <th v-if="showcolumns[2]">Created by<span class="dnl_icon dnl_sort pull-right"></span></th>
                          <th v-if="showcolumns[3]">Last Generated<span class="dnl_icon dnl_sort pull-right"></span></th>
						  <th v-if="showcolumns[4]" class="width_138">Action</th>
						</tr>
					  </thead>
					  <tbody>
						<tr v-if="!rates.length">
							<td style="text-align: center" colspan="5">No Data Found</td>
						</tr>								
						  
						<tr v-for="rate in rates">
						  <td v-if="showcolumns[0]">
                              <router-link to="/tools/rate_generation/new" class="blue_link">{{rate.name}}</router-link>
                          </td>
						  <td v-if="showcolumns[1]">{{rate.create_on}}</td>
                          <td v-if="showcolumns[2]">{{rate.create_by}}</td>
                          <td v-if="showcolumns[3]">{{rate.last_generated}}</td>
						  <td v-if="showcolumns[4]">
                              <a class="action action_money" data-toggle="tooltip" data-placement="top" title="Generation">
								  <span class="dnl_icon dnl_money"></span>
							  </a>
							  <router-link :to="'/tools/rate_generation/edit/'+rate.id" class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit">
								  <span class="dnl_icon dnl_action_edit"></span>
							  </router-link>
							  <router-link to="/tools/rate_generation/rate_generation_history" class="action action_menu" data-toggle="tooltip" data-placement="top" title="View History">
								  <span class="dnl_icon dnl_action_menu"></span>
							  </router-link>
							  <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" @click="askDeleteConfirm(rate.id)">
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
	</div>
</template>

<script>   
	const vSelect = require('vue!../main_components/select.vue'),
		  Pagination = require('vue!../main_components/pagination.vue');
	const api = require("../../api");
	import { mapActions } from 'vuex'
	module.exports = {
		components: {
			'select2': vSelect,
			'pagination': Pagination
		},
		data: function(){
            return {
				showcolumns: [true, true, true, true, true],
				rate_table_columns: ['Rate Template', 'Created on', 'Created by', 'Last Generated', 'Action'],
				temp_rate_table_columns: ['Rate Template', 'Created on', 'Created by', 'Last Generated', 'Action'],
				rate_table_column_options: [{
					value: 'Rate Template',
					label: 'Rate Template'
				}, {
					value: 'Created on',
					label: 'Created on'
				}, {
					value: 'Created by',
					label: 'Created by'
				}, {
					value: 'Last Generated',
					label: 'Last Generated'
				}, {
					value: 'Action',
					label: 'Action'
				}],

			  pageOne: {
                currentPage: 1,
                totalPages: 10,
				per_page: 10,
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
				  { id: 1, text: 'Group Name' },
				  { id: 2, text: 'Carrier Count' },
				  { id: 3, text: 'Actions' }
			  ],
			  rates: []
            }
        },
		methods: {
			...mapActions({
				setAsyncConfirm: 'async_confirm/setAsyncConfirm',
				setMessage: 'app_message/setAppMessage'
			}),
			getRateIndex (id) {
				return _.findIndex(this.rates, elem => elem.id === id)
			},
			deleteRate(id, no_message) {
				const url = api.getEndpointUrl() + '/v1/tool/rate_generation/' + id
				this.$http.delete(url)
				.then(response => {
					if (response.body.success) {
						let index = this.getRateIndex(id)
						if (~index) {
							this.rates.splice(index, 1)
						}
						if(no_message == false)
							this.setMessage('Rate was removed successfully')
					}
				})
			},
			askDeleteConfirm(id) {
				this.setAsyncConfirm('Are you sure you want to delete this rate')
				.then(result => {
					if (result.accepted) {
						this.deleteRate(id, false)
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			handleChange () {
				for(let i = 0; i < this.temp_rate_table_columns.length; i++) {
					if (_.indexOf(this.rate_table_columns, this.temp_rate_table_columns[i]) != -1) {
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
					this.$nextTick(this.fetchRateGenerations)
				}
			},
			getQueries() {
				const page = '?page=' + (this.pageOne.currentPage - 1)
				const per_page = '&per_page=' + this.pageOne.per_page
				return page + per_page
			},
			fetchRateGenerations() {
				const url = api.getEndpointUrl() + '/v1/tool/rate_generation/list' + this.getQueries()
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						this.rates = body.payload.items
						console.log(this.rates)
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
					this.$nextTick(this.fetchRateGenerations)
				}
			}
		},
		mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
		},
		created () {
			this.fetchRateGenerations();
		},
		updated: function () {
			document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
		},
	}
</script>

<style>
	.white_pad.table_wrap {
		margin-top: 10px;
	}
	
	a.action {
		display: inline-block;
		background: #c0c6d1;
		color: #fff;
		width: 28px;
		height: 28px;
		font-size: 20px;
		border-radius: 50%;
		padding: 3px;
		cursor: pointer;
		text-align: center;
		text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
	}
	
	a.action.action_menu {
		font-size: 15px;
		vertical-align: top;
		line-height: 28px;
	}
	
	a.action.action_delete {
		font-size: 15px;
		vertical-align: top;
		line-height: 28px;
	}
	
	a.action.action_delete {
		font-size: 18px;
		vertical-align: top;
		line-height: 28px;
	}
	
	span.dnl_icon.dnl_action_edit {
		padding-left: 2px;
	}
	
	a.action:hover {
		text-decoration: none;
		background: #03c0fc;
	}
	
	a.btn.btn-primary.mini {
		width: 175px;
	}
	
	.width_138 {
		width: 138px;
	}
	
	span.dnl_icon.dnl_sort.pull-right {
		color: #afb2b8;
		font-size: 9px;
		margin-top: 5px;
		margin-right: 10px;
	}
	
	.inline-block.select_min_wrapper {
		width: 190px;
	}
	
	.inline-block.select_min_wrapper .select2 {
		width: 105px !important;
		margin-left: 10px;
	}
	
	.table_filters {
		margin-bottom: 20px;
	}
	
	table.table.table-striped.table-hover.carrier_groups tr:hover {
    	background: #73767b;
	}
	
	table.table.table-striped.table-hover.carrier_groups tr:hover td {
		color: #fff;
	}
	
	table.table.table-striped.table-hover.carrier_groups tr td {
		vertical-align: middle;
	}

	.select2-container--default .select2-results__option--highlighted[aria-selected] {
		background-color: #03c0fc;
	}
	
	@media (max-width: 767px) {
		.table_wrap a.btn.btn-primary.mini.pull-right {
			float: none !important;
			display: block;
			margin: 20px 0;
		}	
	}
	
	@media (max-width: 480px) {
		h1.page-header {
			font-size: 18px;
		}
		
		.inline-block.select_min_wrapper .select2 {
			width: 180px !important;
			margin-left: 0;
			margin-top: 4px;
		}
		
		.table_wrap a.btn.btn-primary.mini.pull-right {
			width: 100%;
		}
		
		.table_wrap .select2-hidden-accessible {
			min-width: auto;
		}
		
		.select2-container {
			width:100%;
		}
		
		.table_wrap .table_filters .inline-block {
			display: block;
			width: 100%;
		}
		
		.inline-block.select_min_wrapper {
			margin-bottom: 20px;
		}
		
		.white_pad.table_wrap .table-responsive {
			min-width: auto;
		}
		
		.pull-right.pagination {
			display: block;
			margin: 20px auto 0 auto;
			float: none !important;
			width: 178px;
		}
	}
	
</style>
