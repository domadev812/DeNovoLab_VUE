<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Management</a></li>
				  <li class="breadcrumb-item active">Client Rate Summary</li>
			</ol>
			<h1 class="page-header">Client Rate Summary</h1>
			<div class="white_pad table_wrap">
				<div class="table_filters searcheable">
					<div class="inline-block search_wrapper">
							<input type="text" name="carrier_search" v-model="carrier_search" class="form-control inline-block search_field" placeholder="Enter Carrier Name">
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
						<el-select v-model="summary_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
							<el-option v-for="item in summary_table_column_options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
					<a class="btn btn-primary mini pull-right" v-on:click="exportCSV()">
						<span class="dnl_icon dnl_export"></span> Export 
					</a>
				</div>
				<div class="table-responsive">
					<table class="table table-striped table-hover roles carriers">
					  <thead>
						<tr>
						  <th v-if="showcolumns[0]">Carrier Name<span class="dnl_icon dnl_sort pull-right"></span></th>
						  <th v-if="showcolumns[1]">Ingress Trunk Name</th>
						  <th v-if="showcolumns[2]">Prefix</th>
						  <th v-if="showcolumns[3]">Rate Table Name</th>
						  <th v-if="showcolumns[4]">Rate E-mail</th>
						  <th v-if="showcolumns[5]" class="width-65">Action</th>
						</tr>
					  </thead>
					  <tbody>
						<tr v-if="!filterBy(carriers, carrier_search).length">
							<td style="text-align: center" colspan="6">No Data Found</td>
						</tr>
						  
						<tr v-for="carrier in filterBy(carriers, carrier_search)">
						  <td v-if="showcolumns[0]">{{carrier.carrier}}</td>
						  <td v-if="showcolumns[1]">{{carrier.ingress_trunk_name}}</td>
						  <td v-if="showcolumns[2]">{{carrier.prefix}}</td>
						  <td v-if="showcolumns[3]">{{carrier.rate_table_name}}</td>
						  <td v-if="showcolumns[4]">{{carrier.rate_email}}</td>
						  <td v-if="showcolumns[5]">
							  <router-link to="/switch/rate_table/send_rate" class="action action_send" data-toggle="tooltip" data-placement="top" title="Send Rate"><span class="dnl_icon dnl_support"></span></router-link>
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
		  Pagination = require('vue!../main_components/pagination.vue')
	const api = require("../../api");
	module.exports = {
		components: {
			'select2': vSelect,
			'pagination': Pagination
		},
		data: function(){
			return {
				showcolumns: [true, true, true, true, true, true],
				summary_table_columns: ['Carrier Name', 'Ingress Trunk Name', 'Prefix', 'Rate Table Name', 'Rate E-mail', 'Action'],
				temp_summary_table_columns: ['Carrier Name', 'Ingress Trunk Name', 'Prefix', 'Rate Table Name', 'Rate E-mail', 'Action'],
				summary_table_column_options: [{
					value: 'Carrier Name',
					label: 'Carrier Name'
				}, {
					value: 'Ingress Trunk Name',
					label: 'Ingress Trunk Name'
				}, {
					value: 'Prefix',
					label: 'Prefix'
				}, {
					value: 'Rate Table Name',
					label: 'Rate Table Name'
				}, {
					value: 'Rate E-mail',
					label: 'Rate E-mail'
				}, {
					value: 'Action',
					label: 'Action'
				}],
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
				  { id: 1, text: 'Group Name' },
				  { id: 2, text: 'Carrier Count' },
				  { id: 3, text: 'Actions' }
			  ],
			  carrier_search: '',
			  carriers: [],
				per_page: 10,
			}
		},
		methods: {
			handleChange() {
				for(let i = 0; i < this.temp_summary_table_columns.length; i++) {
					if (_.indexOf(this.summary_table_columns, this.temp_summary_table_columns[i]) != -1) {
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
					this.$nextTick(this.fetchClients)
				}
			},
			getQueries() {
				const page = '?page=' + (this.pageOne.currentPage - 1)
				const per_page = '&per_page=' + this.per_page
				return page + per_page
			},
			fetchClients () {
				const url = api.getEndpointUrl() + '/v1/trunk/rate_summary/list' + this.getQueries()
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
				if (pageNum !== this.pageOne.currentPage) {
					this.pageOne.currentPage = pageNum
					this.$nextTick(this.fetchClients)
				}
			},
			exportCSV: function(){
				var csvArray = new Array();
				var fields = ["carrier", "ingress_trunk_name", "prefix", "rate_table_name", "rate_email"];
				csvArray.push(fields);
				this.carriers.forEach(function (carrier, i) {
					var values = new Array();
					values.push(carrier.carrier);
					values.push(carrier.ingress_trunk_name);
					values.push(carrier.prefix);
					values.push(carrier.rate_table_name);
					values.push(carrier.rate_email);
					csvArray.push(values);                
				});
				exportToCsv('management_client_rate_summary_export.csv', csvArray);
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
	a.btn.btn-primary.mini.pull-right .dnl_export {
    	font-size: 18px;
	}
	
	table.table.table-striped.table-hover.roles.carriers tr td {
		text-align: center;
	}
	
	table.table.table-striped.table-hover.roles.carriers tr td:first-child {
		text-align: left;
	}
</style>
