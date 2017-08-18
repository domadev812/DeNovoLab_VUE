<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Statistics</a></li>
				  <li class="breadcrumb-item active">Host Based Report</li>
			</ol>
			<h1 class="page-header">Host Based Report</h1>
			<spinner v-show="loading" class="spinner"></spinner>
			<tabs>
				<tab label="Origination" class="" icon="dnl_icon dnl_to_left" selected>
					<div class="advanced_search_filter_panel">
						<div class="col-md-3 col-sm-4">
							<label>Carrier:</label>
							<select class="selectable no-min-width" v-model="ingress_carrier">
									<option v-for="item in carrier_options" v-bind:value="item.id">
										{{ item.text }}
									</option>
								</select>
						</div>
						<div class="col-md-5 col-sm-5 none-left-padding none-right-padding">
							<div class="inlined col-md-6">
								<label for="time_1">Start Time:</label>
								<el-date-picker style="width: 100%;" type="datetime" v-model="start_date" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
							<div class="inlined col-md-6">
								<label for="time_2">End Time:</label>
								<el-date-picker style="width: 100%;" type="datetime" v-model="end_date" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
						</div>
						<div class="col-md-2 col-sm-3">
								<a class="btn btn-primary full-width m-top-25" v-on:click="">
										Submit
								</a>
						</div>
						<div class="clearfix"></div>
					</div>
					<div class="table_filters searcheable">
						<div class="inline-block select_min_wrapper">
							<span class="inline-block">Page row:</span>
							<select2 :options="options1" v-model="selected1" class="inline-block" @pagecount="changePageCount">
							</select2>
						</div>
						<div class="inline-block">
							<!--<select2 :options="options2" v-model="selected2">
									<option disabled value="0">Show/Hide Columns</option>
								</select2>-->
							<el-select v-model="plan_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
								<el-option v-for="item in plan_table_column_options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="table-responsive">
						<table class="table table-striped table-hover roles centrum">
						  <thead>
							<tr>
							  <th>Carrier<span class="dnl_icon dnl_sort pull-right"></span></th>
							  <th>Host</th>
							  <th>Call Attempt</th>
							  <th>Non Zero</th>
							  <th>ASR</th>
							  <th>ACD</th>
							  <th>PDD</th>
							  <th>Avg Rate</th>
							  <th>Cost</th>
							</tr>
						  </thead>
						  <tbody>
							<tr v-if="!filterBy(carriers, report).length">
								<td style="text-align: center" colspan="9">No Data Found</td>
							</tr>
							<tr v-for="carrier in carriers">
							  <td>{{carrier.carrier}}</td>
							  <td>{{carrier.host}}</td>
							  <td>{{carrier.call_attempt}}</td>
							  <td>{{carrier.non_zero}}</td>
							  <td>{{carrier.asr}}</td>
							  <td>{{carrier.acd}}</td>
							  <td>{{carrier.pdd}}</td>
							  <td>{{carrier.avg_rate}}</td>
							  <td>{{carrier.cost}}</td>
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
				</tab>
				<tab label="Termination" class="" icon="dnl_icon dnl_to_right">
					<div class="advanced_search_filter_panel">
						<div class="col-md-3 col-sm-4">
							<label>Carrier:</label>
							<select class="selectable no-min-width" v-model="ingress_carrier">
									<option v-for="item in carrier_options" v-bind:value="item.id">
										{{ item.text }}
									</option>
								</select>
						</div>
						<div class="col-md-5 col-sm-5 none-left-padding none-right-padding">
							<div class="inlined col-md-6">
								<label for="time_1">Start Time:</label>
								<el-date-picker style="width: 100%;" type="datetime" v-model="start_date" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
							<div class="inlined col-md-6">
								<label for="time_2">End Time:</label>
								<el-date-picker style="width: 100%;" type="datetime" v-model="end_date" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
						</div>
						<div class="col-md-2 col-sm-3">
								<a class="btn btn-primary full-width m-top-25" v-on:click="">
										Submit
								</a>
						</div>
						<div class="clearfix"></div>
					</div>
					<div class="table_filters searcheable">
						<div class="inline-block select_min_wrapper">
							<span class="inline-block">Page row:</span>
							<select2 :options="options1" v-model="selected1" class="inline-block" @pagecount="changePageCount">
							</select2>
						</div>
						<div class="inline-block">
							<!--<select2 :options="options2" v-model="selected2">
									<option disabled value="0">Show/Hide Columns</option>
								</select2>-->
							<el-select v-model="plan_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
								<el-option v-for="item in plan_table_column_options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="table-responsive">
						<table class="table table-striped table-hover roles centrum">
						  <thead>
							<tr>
							  <th>Carrier<span class="dnl_icon dnl_sort pull-right"></span></th>
							  <th>Host</th>
							  <th>Call Attempt</th>
							  <th>Non Zero</th>
							  <th>ASR</th>
							  <th>ACD</th>
							  <th>PDD</th>
							  <th>Avg Rate</th>
							  <th>Cost</th>
							</tr>
						  </thead>
						  <tbody>
							<tr v-if="!filterBy(carriers, report).length">
								<td style="text-align: center" colspan="9">No Data Found</td>
							</tr>
							<tr v-for="carrier in carriers">
							  <td>{{carrier.carrier}}</td>
							  <td>{{carrier.host}}</td>
							  <td>{{carrier.call_attempt}}</td>
							  <td>{{carrier.non_zero}}</td>
							  <td>{{carrier.asr}}</td>
							  <td>{{carrier.acd}}</td>
							  <td>{{carrier.pdd}}</td>
							  <td>{{carrier.avg_rate}}</td>
							  <td>{{carrier.cost}}</td>
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
				</tab>
			</tabs>
		</div>
	  </div>
	</div>
</template>

<script>   
	const vTabs = require('vue!../main_components/tabs.vue'),
		  vTab = require('vue!../main_components/tab.vue'),
		  vSelect = require('vue!../main_components/select.vue'),
			vSpinner = require('vue!../main_components/fadeloader.vue'),
		  Pagination = require('vue!../main_components/pagination.vue');
			const api = require("../../api");
			const	auth = require("../../auth");
	module.exports = {
		created: function(){	
			this.fetchCarriers();			
		},
		components: {
			'tabs': vTabs,
			'tab': vTab,
			'select2': vSelect,
			'spinner': vSpinner,
			'pagination': Pagination
		},
		data: function(){
            return {
				pageOne: {
					currentPage: 1,
					totalPages: 10
				},
				tmpPageOne: {
					currentPage: 0,
					totalPages: 10,
					cntPerPage: 30,
				},
				carrier_options: [],
				ingress_carrier: '',
				loading: false,
				carrier: '',
				time_1: '',
				time_2: '',
				selected1: '',
				selected2: '',
				start_date: '',
				end_date: '',
				options: [
				  { id: 1, value: 'carrier1', text: 'Carrier 1' },
				  { id: 2, value: 'carrier2', text: 'Carrier 2' },
				  { id: 3, value: 'carrier3', text: 'Carrier 3' },
				  { id: 4, value: 'carrier4', text: 'Carrier 4' },
				  { id: 5, value: 'carrier5', text: 'Carrier 5' }
			    ],
				carriers: [
					{
					  carrier: "Carrier1",
					  host: "37.8.6.210	",
					  call_attempt: '1',
					  non_zero: '0',
					  asr: '738.23',
					  acd: '937.22',
					  pdd: '360.01',
					  avg_rate: '344',
					  cost: '5892.22'
					},
					{
					  carrier: "Carrier1",
					  host: "37.8.6.210	",
					  call_attempt: '1',
					  non_zero: '0',
					  asr: '738.23',
					  acd: '937.22',
					  pdd: '360.01',
					  avg_rate: '344',
					  cost: '5892.22'
					},
					{
					  carrier: "Carrier1",
					  host: "37.8.6.210	",
					  call_attempt: '1',
					  non_zero: '0',
					  asr: '738.23',
					  acd: '937.22',
					  pdd: '360.01',
					  avg_rate: '344',
					  cost: '5892.22'
					},
					{
					  carrier: "Carrier1",
					  host: "37.8.6.210	",
					  call_attempt: '1',
					  non_zero: '0',
					  asr: '738.23',
					  acd: '937.22',
					  pdd: '360.01',
					  avg_rate: '344',
					  cost: '5892.22'
					},
					{
					  carrier: "Carrier1",
					  host: "37.8.6.210	",
					  call_attempt: '1',
					  non_zero: '0',
					  asr: '738.23',
					  acd: '937.22',
					  pdd: '360.01',
					  avg_rate: '344',
					  cost: '5892.22'
					}
				],
				selected1: 1,
				options1: [
					{ id: 1, text: '10' },
					{ id: 2, text: '20' },
					{ id: 3, text: '30' },
					{ id: 4, text: '50' },
					{ id: 5, text: '100' }
				],
				plan_table_column_options: [{
						value: 'Carrier',
						label: 'Carrier'
					}, {
						value: 'Host',
						label: 'Host'
					}, {
						value: 'Call Attempt',
						label: 'Call Attempt'
					}, {
						value: 'Non Zero',
						label: 'Non Zero'
					}, {
						value: 'ASR',
						label: 'ASR'
					}, {
						value: 'ACD',
						label: 'ACD'
					}, {
						value: 'PDD',
						label: 'PDD'
					}, {
						value: 'Avg Rate',
						label: 'Avg Rate'
					}, {
						value: 'Cost',
						label: 'Cost'
					}],
					plan_table_columns: [],
					showcolumns: [],
					}
        },
		methods: {
			pageOneChanged (pageNum) {
				this.pageOne.currentPage = pageNum
			},
			handleChange() {

			},
			changePageCount (countPerPage) {
				if (countPerPage !== this.pageOne.cntpage) {
					this.pageOne.cntpage = countPerPage
					this.$nextTick(this.fetchPlans)
				}
			},
			fetchCarriers() {				
				this.loading = true;
				var url;				
				if(this.tmpPageOne.currentPage === 0)
					url = api.getEndpointUrl() + "/v1/carrier/list"
				else
					url = api.getEndpointUrl() + "/v1/carrier/list?page=" + this.tmpPageOne.currentPage
				console.log(url);
				this.$http.get(url, {
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(response => {
						const body = response.body
						if (body.success) {
							var self = this;
							this.loading = false;
							const payload = body.payload
							var carriers = payload.items;
							if(this.tmpPageOne.currentPage === 0)
								this.carrier_options.push('');
							carriers.forEach(function (temp, i) {
								var carrier = {};
								carrier.id = temp.client_id;
								carrier.text = temp.name;
								self.carrier_options.push(carrier);
							});
							this.tmpPageOne.currentPage = payload.page + 1
							this.tmpPageOne.totalPages = Math.ceil(payload.total / payload.per_page)
							this.tmpPageOne.cntPerPage = payload.per_page;

							if(this.tmpPageOne.totalPages > this.tmpPageOne.currentPage)
								this.fetchCarriers();	

							console.log("Inbound success");													
						}
					})
					.catch(error => {
						console.log(error)
						console.log("Inbound error");
						this.loading = false;
					})
			},
		},
	}
</script>

<style>
</style>
