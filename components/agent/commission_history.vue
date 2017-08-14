<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a>Agent</a></li>
				  <li class="breadcrumb-item active">Commission History</li>
			</ol>
			<h1 class="page-header">Commission History</h1>
				<div class="timeline">
					<div class="chart_select_header grided">
						<div class="advanced_search_filter_panel">
							<div class="inline-block search_wrapper">
								<label>Agent Name:</label>
								<!-- <input type="text" name="search" v-model="search" class="form-control inline-block search_field" placeholder="Enter Search">
								<span class="dnl_icon dnl_musica-searcher"></span> -->
								<select class="selectable" v-model="agent">
									<option v-for="item in agent_options" v-bind:value="item.id">
										{{ item.text }}
									</option>
								</select>
							</div>
							<div class="inline-block search_wrapper">
								<label>Carrier Name:</label>
								<!-- <input type="text" name="search" v-model="search" class="form-control inline-block search_field" placeholder="Enter Search">
								<span class="dnl_icon dnl_musica-searcher"></span> -->
								<select class="selectable" v-model="carrier">
									<option v-for="item in carriers" v-bind:value="item.id">
										{{ item.text }}
									</option>
								</select>
							</div>
							<div class="inline-block search_wrapper">
								<label class="m-top-15"></label>
								<a class="btn btn-primary">
									Query
								</a>
							</div>
						</div>
						<div class="clearfix"></div>
					</div>
					<div class="chart_content">
						<div class="table_filters marged-40">
							<div class="inline-block select_min_wrapper">
								<span class="inline-block">Page row:</span>
								<select2 :options="page_row_options" v-model="selected1" class="inline-block" @pagecount="changePageRow">
								</select2>
							</div>
							<div class="inline-block">
								<el-select v-model="commission_log_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
									<el-option v-for="item in commission_log_table_column_options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</div>
						</div>
						<div class="col-md-12">
							<div class="table-responsive marged-30">
								<table class="table table-striped table-hover carrier_groups originators">
								  <thead>
									<tr>
									  <th v-if="showcolumns[0]">
										  Agent Name
										  <span class="dnl_icon dnl_sort pull-right"></span>
									  </th>
									  <th v-if="showcolumns[1]" class="width-65">Carrier</th>
									  <th v-if="showcolumns[2]">Period</th>
									  <th v-if="showcolumns[3]">Commission</th>
									</tr>
								  </thead>
								  <tbody>
									<tr v-if="!agents.length">
										<td colspan="4">No Data Found</td>
									</tr>
									<tr v-for="agent in agents">
									  <td v-if="showcolumns[0]">{{agent.agent_name}}</td>
									  <td v-if="showcolumns[1]">{{agent.carrier}}</td>
									  <td v-if="showcolumns[2]">{{agent.period}}</td>
									  <td v-if="showcolumns[3]">{{agent.commission}}</td>
									</tr>
								  </tbody>
								</table>
							</div>
							<div class="pull-right pagination m-r-30">
								<pagination :current-page="pageOne.currentPage"
											:total-pages="pageOne.totalPages"
											@page-changed="pageOneChanged">
								</pagination>
							</div>
						</div>
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
	_ = require('lodash');
	
	module.exports = {
		components: {
			'select2': vSelect,
			'pagination': Pagination
		},
		data: function(){
            return {
				agent: '',
				agent_options: [],
				carrier: '',
            	carriers: [],
				showcolumns: [true, true, true, true],
				commission_log_table_columns: ['Agent Name', 'Carrier', 'Period', 'Commission'],
				temp_commission_log_table_columns: ['Agent Name', 'Carrier', 'Period', 'Commission'],
				commission_log_table_column_options: [{
					value: 'Agent Name',
					label: 'Agent Name'
				}, {
					value: 'Carrier',
					label: 'Carrier'
				}, {
					value: 'Period',
					label: 'Period'
				}, {
					value: 'Commission',
					label: 'Commission'
				}],
				page_row_options: [
					{ id: 1, text: '10' },
					{ id: 2, text: '20' },
					{ id: 3, text: '30' },
					{ id: 4, text: '50' },
					{ id: 5, text: '100' }
				],
			  pageOne: {
                currentPage: 1,
                totalPages: 10,
				per_page: 10,
			  },
			  tmpPageOne: {
                currentPage: 0,
                totalPages: 10,
                cntPerPage: 30,
			},
			  agent_name: '',
			  amount: '',
			  status: '',
			  created_date1: '',
			  created_date2: '',
			  options: [
				  { id: 1, value: 'carrier1', text: 'Carrier 1' },
				  { id: 2, value: 'carrier2', text: 'Carrier 2' },
				  { id: 3, value: 'carrier3', text: 'Carrier 3' },
				  { id: 4, value: 'carrier4', text: 'Carrier 4' },
				  { id: 5, value: 'carrier5', text: 'Carrier 5' }
			  ],
			  selected1: 1,
			  selected2: 1,
			  agents: []
            }
        },
		methods: {
			fetchAllAgents() {
				const url = api.getEndpointUrl() + '/v1/agent/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const agents = body.payload.items
						var self = this;
						agents.forEach(function (temp, i) {
							var agent = {};
							agent.id = temp.agent_id;
							agent.text = temp.agent_name;
							self.agent_options.push(agent);
							if (i == 0)
								self.agent = agent.id;
						});
						console.log(this.agent_options);
						
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			fetchCarriers() {
				this.loading = true;
				var url;
				if(this.tmpPageOne.currentPage === 0)
					url = api.getEndpointUrl() + "/v1/carrier/list"
				else
					url = api.getEndpointUrl() + "/v1/carrier/list?page=" + this.tmpPageOne.currentPage
				console.log(url);
				this.$http.get(url)
					.then(response => {
						const body = response.body
						if (body.success) {
							var self = this;
							this.loading = false;
							const payload = body.payload
							var carriers = payload.items;
							carriers.forEach(function (temp, i) {
								var carrier = {};
								carrier.id = temp.client_id;
								carrier.text = temp.name;
								self.carriers.push(carrier);
								if(i==0 && self.tmpPageOne.currentPage === 0)
									self.carrier = carrier.id;    
							});
							this.tmpPageOne.currentPage = payload.page + 1
							this.tmpPageOne.totalPages = Math.ceil(payload.total / payload.per_page)
							this.tmpPageOne.cntPerPage = payload.per_page;

							console.log(this.tmpPageOne.totalPages, this.tmpPageOne.currentPage);

							if(this.tmpPageOne.totalPages > this.tmpPageOne.currentPage)
								this.fetchCarriers();
							
							console.log("carriers");
							console.log(this.carriers);
							console.log(this.carrier);
						}
					})
					.catch(error => {
						console.log(error)
						this.loading = false;
					})
			},
			handleChange () {
				for(let i = 0; i < this.temp_commission_log_table_columns.length; i++) {
					if (_.indexOf(this.commission_log_table_columns, this.temp_commission_log_table_columns[i]) != -1) {
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
					this.$nextTick(this.fetchAgents)
				}
			},
			getQueries() {
				const page = '?page=' + (this.pageOne.currentPage - 1)
				const per_page = '&per_page=' + this.pageOne.per_page
				return page + per_page
			},
			fetchAgents () {
				const url = api.getEndpointUrl() + '/v1/agent/commission' + this.getQueries()
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						this.agents = body.payload.items
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
					this.$nextTick(this.fetchAgents)
				}
			}
		},
		mounted: function () {
			
		},
		created () {
			this.fetchAgents();
			this.fetchCarriers();
			this.fetchAllAgents();
		},
		updated: function () {
			document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
		},
	}
</script>

<style>
	.pull-right.pagination.m-r-30 {
		margin: -20px 30px 10px 0;
	}
	
	@media (max-width: 480px) {
		.pull-right.pagination.m-r-30 {
			display: block;
			margin: 20px auto 0 auto;
			float: none !important;
			width: 178px;
		}
	}
</style>
