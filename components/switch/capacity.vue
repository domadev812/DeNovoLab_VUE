<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Switch</a></li>
				  <li class="breadcrumb-item active">Capacity</li>
			</ol>
			<h1 class="page-header">Capacity</h1>
			<div class="white_pad table_wrap">
				<div class="table_filters">
					<div class="inline-block select_min_wrapper">
						<span class="inline-block">Page row:</span>
						<select2 :options="options1" v-model="selected1" class="inline-block" @pagecount="changePageRow">
						</select2>
					</div>
					<div class="inline-block">
						<el-select v-model="capacity_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
							<el-option v-for="item in capacity_table_column_options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="table-responsive">
					<table class="table table-striped table-hover carrier_groups">
					  <thead>
						<tr>
						  <th v-if="showcolumns[0]">Switch Name</th>
						  <th v-if="showcolumns[1]">Event IP</th>
						  <th v-if="showcolumns[2]">Event Port</th>
                          <th v-if="showcolumns[3]">License Cap Limit</th>
                          <th v-if="showcolumns[4]">Self-Defined Cap Limit</th>
                          <th v-if="showcolumns[5]">License CPS Limit</th>
						  <th v-if="showcolumns[6]">Self-Defined CPS Limit</th>
						  <th v-if="showcolumns[7]">Expiration Date</th>
                          <th v-if="showcolumns[8]">Status</th>
                          <th v-if="showcolumns[9]" class="width-65">Action</th>
						</tr>
					  </thead>
					  <tbody>
						<tr v-if="!capacities.length">
							<td style="text-align: center" class="no-data-found" colspan="10">No Data Found</td>
						</tr>										
						  
						<tr v-for="capacity in capacities">
						  <td v-if="showcolumns[0]">{{capacity.switch_name}}</td>
						  <td v-if="showcolumns[1]">{{capacity.cli_ip}}</td>
                          <td v-if="showcolumns[2]">{{capacity.cli_port}}</td>
                          <td v-if="showcolumns[3]">{{capacity.cap}}</td>
						  <td v-if="showcolumns[4]"><input type="text" class="form-control" placeholder="Enter Self-Defined Cap Limit" :value="capacity.cap"/></td>
						  <td v-if="showcolumns[5]">{{capacity.cps}}</td>
                          <td v-if="showcolumns[6]"><input type="text" class="form-control" placeholder="Enter Self-Defined CPS Limit" :value="capacity.cps"/></td>
						  <td v-if="showcolumns[7]">{{capacity.expiration_date}}</td>
                          <td v-if="showcolumns[8]">{{capacity.status}}</td>
						  <td v-if="showcolumns[9]">
							  <a class="action action_save" data-toggle="tooltip" data-placement="top" title="Save" @click="saveCapacity(capacity.id, capacity.cap, capacity.cps)">
								  <span class="dnl_icon dnl_save"></span>
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
	module.exports = {
		components: {
			'select2': vSelect,
			'pagination': Pagination
		},
		data: function(){
            return {
				showcolumns: [true, true, true, true, true, true, true, true, true, true],
				capacity_table_columns: ['Switch Name', 'Event IP', 'Event Port', 'License Cap Limit', 'Self-Defined Cap Limit', 'License CPS Limit', 'Self-Defined CPS Limit', 'Expiration Date', 'Status', 'Actions'],
				temp_capacity_table_columns: ['Switch Name', 'Event IP', 'Event Port', 'License Cap Limit', 'Self-Defined Cap Limit', 'License CPS Limit', 'Self-Defined CPS Limit', 'Expiration Date', 'Status', 'Actions'],
				capacity_table_column_options: [{
					value: 'Switch Name',
					label: 'Switch Name'
				}, {
					value: 'Event IP',
					label: 'Event IP'
				}, {
					value: 'Event Port',
					label: 'Event Port'
				}, {
					value: 'License Cap Limit',
					label: 'License Cap Limit'
				}, {
					value: 'Self-Defined Cap Limit',
					label: 'Self-Defined Cap Limit'
				}, {
					value: 'License CPS Limit',
					label: 'License CPS Limit'
				}, {
					value: 'Self-Defined CPS Limit',
					label: 'Self-Defined CPS Limit'
					}, {
					value: 'Expiration Date',
					label: 'Expiration Date'
					}, {
					value: 'Status',
					label: 'Status'
				}, {
					value: 'Actions',
					label: 'Actions'
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
			  capacities: []
            }
        },
		methods: {
			saveCapacity(id, cap, cps) {
				const reqBody = {
					cap: cap,
					cps: cps
				};
				const url = api.getEndpointUrl() + '/v1/switch/capacity/' + this.id;
					this.$http.patch(url, reqBody)
						.then(response => {
							if (response.body.success) {
								this.setMessage('Capacity was changed successfully');
							}
						})
						.catch(error => {
							console.log(error)
							this.setMessage({
								message: 'Failed to change capacity',
								type: 'error'
							})
						})	
			},
			handleChange () {
				for(let i = 0; i < this.temp_capacity_table_columns.length; i++) {
					if (_.indexOf(this.capacity_table_columns, this.temp_capacity_table_columns[i]) != -1) {
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
					this.$nextTick(this.fetchCapacities)
				}
			},
			getQueries() {
				const page = '?page=' + (this.pageOne.currentPage - 1)
				const per_page = '&per_page=' + this.pageOne.per_page
				return page + per_page
			},
			fetchCapacities () {
				const url = api.getEndpointUrl() + '/v1/switch/capacity/list' + this.getQueries()
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						this.capacities = body.payload.items
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
					this.$nextTick(this.fetchCapacities)
				}
			}
		},
		mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
		},
		created () {
			this.fetchCapacities()
		},
		updated: function () {
			document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
		},
	}
</script>

<style>
	a.action.action_save .dnl_save {
        font-size: 15px;
    }
    
    a.action.action_save {
        padding-top: 0;
        line-height: 26px;
    }
	
</style>
