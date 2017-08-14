<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Management</a></li>
				  <li class="breadcrumb-item active">Unclaimed Trunks</li>
			</ol>
			<h1 class="page-header">Unclaimed Trunks</h1>
			<div class="white_pad table_wrap">
				<div class="table_filters">
					<div class="inline-block select_min_wrapper">
						<span class="inline-block">Page row:</span>
						<select2 :options="options1" v-model="selected1" class="inline-block">
						</select2>
					</div>
					<div class="inline-block">
						<el-select v-model="unclaimed_trunk_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
							<el-option v-for="item in unclaimed_trunk_table_column_options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="table-responsive">
					<table class="table table-striped table-hover carrier_groups trunks">
					  <thead>
						<tr>
						  <th v-if="showcolumns[0]">Trunk<span class="dnl_icon dnl_sort pull-right"></span></th>
						  <th v-if="showcolumns[1]">Last Updated</th>
						  <th v-if="showcolumns[2]">Rate Table</th>
						  <th v-if="showcolumns[3]" class="width-65">Action</th>
						</tr>
					  </thead>
					  <tbody>
						<tr v-for="trunk in trunks">
						  <td v-if="showcolumns[0]">{{trunk.trunk}}</td>
						  <td v-if="showcolumns[1]">{{trunk.last_updated}}</td>
						  <td v-if="showcolumns[2]">{{trunk.rate_table}}</td>
						  <td v-if="showcolumns[3]">
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
	</div>
</template>

<script>   
	const vSelect = require('vue!../main_components/select.vue'),
		  Pagination = require('vue!../main_components/pagination.vue')
	module.exports = {
		components: {
			'select2': vSelect,
			'pagination': Pagination
		},
		data: function(){
			return {
				showcolumns: [true, true, true, true],
				unclaimed_trunk_table_columns: ['Trunk', 'Last Updated', 'Rate Table', 'Actions'],
				temp_unclaimed_trunk_table_columns: ['Trunk', 'Last Updated', 'Rate Table', 'Actions'],
				unclaimed_trunk_table_column_options: [{
					value: 'Trunk',
					label: 'Trunk'
				}, {
					value: 'Last Updated',
					label: 'Last Updated'
				}, {
					value: 'Rate Table',
					label: 'Rate Table'
				}, {
					value: 'Actions',
					label: 'Actions'
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
			  trunks: [
				{
				  trunk: "Shuva",
				  last_updated: "2017-01-12 07:52:24+00",
				  rate_table: "shuva"
				},
				{
				  trunk: "Nisha",
				  last_updated: "2017-01-12 07:52:24+00",
				  rate_table: "nisha"
				},
				{
				  trunk: "Souravsubh",
				  last_updated: "2017-01-12 07:52:24+00",
				  rate_table: "souravsubh"
				},
				{
				  trunk: "Asasa",
				  last_updated: "2017-01-12 07:52:24+00",
				  rate_table: "asasa"
				},
				{
				  trunk: "Shuva",
				  last_updated: "2017-01-12 07:52:24+00",
				  rate_table: "shuva"
				}
			  ]
            }
        },
		methods: {
			handleChange() {
				for(let i = 0; i < this.temp_unclaimed_trunk_table_columns.length; i++) {
					if (_.indexOf(this.unclaimed_trunk_table_columns, this.temp_unclaimed_trunk_table_columns[i]) != -1) {
						Vue.set(this.showcolumns, i, true);
					}
					else {
						Vue.set(this.showcolumns, i, false);
					}
				}
			},
			pageOneChanged (pageNum) {
				this.pageOne.currentPage = pageNum
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
	table.table.table-striped.table-hover.carrier_groups.trunks td {
		padding-right: 18px;
	}
</style>
