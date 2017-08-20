<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single big_data">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Statistics</a></li>
				  <li class="breadcrumb-item active">Active Call Report</li>
			</ol>
			<h1 class="page-header">Active Call Report</h1>
			<spinner v-show="loading" class="spinner"></spinner>
			<div class="white_pad table_wrap">
				<div class="advanced_search_filter_panel">
				<div class="col-md-4 col-sm-4">
					<label>Active Call Server:</label>
					<select2 :options="options" v-model="active_call_server">
						<option disabled value="0">Select one</option>
					</select2>
				</div>
				<div class="col-md-2 col-sm-4">
					<div class="button_set">
						<a class="btn btn-primary full-width m-top-25" v-on:click="query()">
							Search
						</a>
					</div>
				</div>
				<div class="clearfix little-space"></div>
				<div class="col-md-4 col-sm-6">
					<div class="white_pad less_pad">
						<h1 class="page-header">Inbound</h1>
						<div class="row">
							<div class="col-md-6 first">
								<label>Carriers:</label>
								<select class="selectable" v-model="ingress_carrier" @change="changeIngress">
									<option v-for="item in carrier_options" v-bind:value="item.id">
										{{ item.text }}
									</option>
								</select>
							</div>
							<div class="col-md-6 second">
								<label>Ingress:</label>
								<select class="selectable" v-model="ingress_trunk"  @change="changeIngressTrunk">
									<option v-for="item in ingress_trunk_options" v-bind:value="item.id">
										{{ item.text }}
									</option>
								</select>
							</div>
							<div class="clearfix little-space"></div>
							<div class="col-md-6 first">
								<label>IP:</label>
								<select class="selectable" v-model="ingress_trunk_ip">
									<option v-for="item in ingress_trunk_ip_options" v-bind:value="item.value">
										{{ item.value }}
									</option>
								</select>
							</div>
							<div class="col-md-6 second">
								<label for="ani">ANI:</label>
								<input type="text" name="ani" v-model="ani" class="form-control" placeholder="Enter ANI">
							</div>
							<div class="clearfix"></div>
						</div>
					</div>
				</div>
				<div class="col-md-4 col-sm-6">
					<div class="white_pad less_pad">
						<h1 class="page-header">Outbound</h1>
						<div class="row">
							<div class="col-md-6 first">
								<label>Carriers:</label>
								<select class="selectable" v-model="egress_carrier" @change="changeEgress">
									<option v-for="item in carrier_options" v-bind:value="item.id">
										{{ item.text }}
									</option>
								</select>
							</div>
							<div class="col-md-6 second">
								<label>Egress:</label>
								<select class="selectable" v-model="egress_trunk"  @change="changeEgressTrunk">
									<option v-for="item in egress_trunk_options" v-bind:value="item.id">
										{{ item.text }}
									</option>
								</select>
							</div>
							<div class="clearfix little-space"></div>
							<div class="col-md-6 first">
								<label>IP:</label>
								<select class="selectable" v-model="egress_trunk_ip">
									<option v-for="item in egress_trunk_ip_options" v-bind:value="item.id">
										{{ item.text }}
									</option>
								</select>
							</div>
							<div class="col-md-6 second">
								<label for="dnis">DNIS:</label>
								<input type="text" name="dnis" v-model="dnis" class="form-control" placeholder="Enter DNIS">
							</div>
							<div class="clearfix"></div>
						</div>
					</div>
				</div>
				<div class="col-md-4 col-sm-12">
					<div class="white_pad less_pad">
						<h1 class="page-header">Fields</h1>
						<label for="groupname">Show Fields:</label>
						<select multiple class="multi" v-model = "backup_selected_show_fields">
							<option v-for="option in show_field_options" :value='option.value'>{{option.text}}</option>
						</select>
					</div>
				</div>				
				<div class="clearfix"></div>
			</div>
			<div class="table_filters pull-right">
				<div class="inline-block select_min_wrapper">
					<span class="inline-block">Page row:</span>
					<select2 :options="page_rows" v-model="page_row_count" class="inline-block" @pagecount="changePageCount">
					</select2>
				</div>
				<div class="inline-block">
					<el-select v-model="plan_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
						<el-option v-for="item in show_field_options" :key="item.value" :label="item.text" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			<!-- <span class="table_time chart_time margin_0">
				09/23/2016 17:34:52 +0000
			</span> -->
			<div class="clearfix"></div>
			<div class="table-responsive">
				<table class="table table-striped table-hover carrier_groups centrum">
				  <thead>
					<tr>						
						<th colspan="1" rowspan="2">Start Time</th>
						<th colspan="1" rowspan="2">Ingress Carrier</th>
						<th colspan="3" rowspan="1">Orig</th>
						<th colspan="1" rowspan="2">Egress Carrier</th>
						<th colspan="3" rowspan="1">Temp</th>
						<th colspan="1" rowspan="1">Routing Plan</th>													
					</tr>
					<tr>						
						<th colspan="1" rowspan="1">ANI</th>
						<th colspan="1" rowspan="1">DNIS</th>
						<th colspan="1" rowspan="1">IP</th>																			
						<th colspan="1" rowspan="1">ANI</th>
						<th colspan="1" rowspan="1">DNIS</th>
						<th colspan="1" rowspan="1">IP</th>
					</tr>
				  </thead>
				  <tbody>
					<tr v-if="!filterBy(searchResults, report).length">
						<td style="text-align: center" colspan="10">No Data Found</td>
					</tr>
					<tr v-for="report in searchResults">
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
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
		  vSpinner = require('vue!../main_components/fadeloader.vue'),
		  Pagination = require('vue!../main_components/pagination.vue');
		  const api = require("../../api");
		  const	auth = require("../../auth");
	module.exports = {
		created: function(){
			this.fetchCarriers();	
			this.fetchCallReport();
		},
		components: {
			'select2': vSelect,
			'spinner': vSpinner,
			'pagination': Pagination
		},
		data: function(){
            return {
				loading: false,
				egress_carrier: '',
				ingress_carrier: '',
				egress_trunk : '',
				ingress_trunk: '',
				egress_trunk_options: [],
				ingress_trunk_options: [],
				egress_trunk_ip_options: [],
				ingress_trunk_ip_options: [],
				carrier_options: [],
				pageOne: {
					currentPage: 1,
					totalPages: 10
				},
				tmpPageOne: {
					currentPage: 0,
					totalPages: 10,
					cntPerPage: 30,
				},
				page_row_count: 1,
				page_rows: [
					{ id: 1, text: '10' },
					{ id: 2, text: '20' },
					{ id: 3, text: '30' },
					{ id: 4, text: '50' },
					{ id: 5, text: '100' }
				],
				route_types: [
				  { id: 1, text: 'Fail to Next Host' },
				  { id: 2, text: 'Fail to Next Trunk' },
				  { id: 3, text: 'Stop' },
			  	],
				plan_table_columns: [],
				showcolumns: [],

				selected_show_fields: [],
				backup_selected_show_fields: [],
				show_table_columns: [],
				show_field_options: [
				  { id: 1, value: 'start_time_of_date', text: 'Start Time' },
				  { id: 2, value: 'start_time_of_date', text: 'Answer Time' },
				  { id: 3, value: 'orig_ani', text: 'Orig ANI' },		//miss		 
				  { id: 4, value: 'orig_dnis', text: 'Orig DNIS' },    //miss
				  { id: 5, value: 'origination_source_host_name', text: 'Orig IP' },
				  { id: 6, value: 'orig_profile_ip', text: 'Orig Profile IP' },   //miss
				  { id: 7, value: 'orig_code', text: 'Orig Code' },
				  { id: 8, value: 'orig_rtp_ip', text: 'Orig Rtp IP' },  //miss
				  { id: 9, value: 'orig_rtp_port', text: 'Orig Rtp Port' },  //miss
				  { id: 10, value: 'orig_sw_rtp_ip', text: 'Orig Sw Rtp IP' },  //miss 
				  { id: 11, value: 'orig_sw_rtp_port', text: 'Orig Sw Rtp Port' },  //miss
				  { id: 12, value: 'ingress_carrier', text: 'Ingress Carrier' },
				  { id: 13, value: 'ingress_trunk', text: 'Ingress Trunk' },
				  { id: 14, value: 'lrn_number', text: 'LRN Number' },
				  { id: 15, value: 'orig_rate_type', text: 'Orig Rate Type' },
				  { id: 16, value: 'orig_rate', text: 'Orig Rate' },
				  { id: 17, value: 'term_ani', text: 'Term ANI' },
				  { id: 18, value: 'term_dnis', text: 'Term DNIS' },
				  { id: 19, value: 'term_ip', text: 'Term IP' },
				  { id: 20, value: 'term_profile_ip', text: 'Term Profile IP' },
				  { id: 21, value: 'term_code', text: 'Term Code' },
				  { id: 22, value: 'term_rtp_ip', text: 'Term Rtp IP' },
				  { id: 23, value: 'term_rtp_port', text: 'Term Rtp Port' },
				  { id: 24, value: 'term_sw_rtp_ip', text: 'Term Sw Rtp IP' },
				  { id: 25, value: 'term_sw_rtp_port', text: 'Term Sw Rtp Port' },
				  { id: 26, value: 'egress_carrier', text: 'Engress Carrier' },
				  { id: 27, value: 'egress_trunk', text: 'Engress Trunk' },
				  { id: 28, value: 'term_rate_type', text: 'Term Rate Type' },  
				  { id: 29, value: 'term_rate', text: 'Term Rate' },
				  { id: 30, value: 'egress_rate_table', text: 'Egress Rate Table' },
				  { id: 31, value: 'routing_plan', text: 'Routing Plan' },
				  { id: 32, value: 'dynamic_route', text: 'Dynamic Route' },
				  { id: 33, value: 'statist_route', text: 'Statist Route' },
				],
				searchResults: [],
				carriers: '',
				active_call_server: '',
				ingress: '',
				ip: '',
				ani: '',
				dnis: '',
				code_name: '',
				routing_plan: '',
				egress: '',
				selected1: '',
				selected2: '',
				rate_display: '',
				period_time_1: '',
				period_time_2: '',
				options: [
				  { id: 1, value: 'class4', text: 'class4' },
			    ]
			}
        },
		methods: {
			query() {
			},
			changeEgress() {
				this.fetchRelatedTrunks('egress');
			},
			changeIngress() {
				this.fetchRelatedTrunks('ingress');
			},
			changeEgressTrunk() {
				//this.fetchIpLists('egress');
			},
			changeIngressTrunk() {				
				//this.fetchIpLists('ingress');
			},
			fetchAllTrunks (type) {
				var url;
				if(type == 'egress')
					url = api.getEndpointUrl() + '/v1/trunk/egress/list';
				else if(type == 'ingress')
					url = api.getEndpointUrl() + '/v1/trunk/ingress/list';
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const trunks = body.payload.items
						console.log(trunks);
						var self = this;
						if(type == 'egress') {
							this.egress_trunk_options = [];
							this.egress_trunk_options.push('');
							trunks.forEach(function (temp, i) {
								var trunk = {};
								trunk.id = temp.resource_id;
								trunk.text = temp.name;
								self.egress_trunk_options.push(trunk);
							});
						}
						else if(type == 'ingress') {
							this.ingress_trunk_options = [];
							this.ingress_trunk_options.push('');
							trunks.forEach(function (temp, i) {
								var trunk = {};
								trunk.id = temp.resource_id;
								trunk.text = temp.name;
								self.ingress_trunk_options.push(trunk);
							});
						}
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			fetchRelatedTrunks (type) {				
				var url;
				if(type == 'egress')
				{
					if(this.egress_carrier == undefined) return;
					this.egress_trunk = '';					
					url = api.getEndpointUrl() + '/v1/carrier/' + this.egress_carrier + '/egress_trunk/list';
				}
				else if(type == 'ingress')
				{
					if(this.ingress_carrier == undefined) return;
					this.ingress_trunk = '';
					console.log(this.ingress_trunk);
					url = api.getEndpointUrl() + '/v1/carrier/' + this.ingress_carrier + '/ingress_trunk/list';
				}	
				this.loading = true;
				this.$http.get(url,
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(response => {
					const body = response.body
					if (body.success) {
						const trunks = body.payload.items
						
						var self = this;
						if(type == 'egress') {
							this.egress_trunk_options = [];
							trunks.forEach(function (temp, i) {
								var trunk = {};
								trunk.id = temp.resource_id;
								trunk.text = temp.name;
								self.egress_trunk_options.push(trunk);
							});
							//console.log("Egress: " + this.egress_trunk_options.length);
						}
						else if(type == 'ingress') {
							this.ingress_trunk_options = [];
							trunks.forEach(function (temp, i) {
								var trunk = {};
								trunk.id = temp.resource_id;
								trunk.text = temp.name;
								self.ingress_trunk_options.push(trunk);
							});
							//console.log("Inress: " + this.ingress_trunk_options.length);
						}
						this.loading = false;
						console.log("Fetch releated trunks success");
					}
				})
				.catch(error => {					
					console.log("Fetch releated trunks failure");
					//console.log(error);
					this.loading = false;
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
				this.$http.get(url,
				{
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
							console.log("Fetch carriers success");					
							//console.log(this.carrier_options);
						}
					})
					.catch(error => {
						//console.log(error)
						console.log("Fetch carriers failure");					
						this.loading = false;
					})
			},
			fetchIpLists (type){
				var url;
				if(type == 'egress')
					url = api.getEndpointUrl() + '/v1/trunk/ip/' + this.egress_trunk;
				else if(type == 'ingress')
					url = api.getEndpointUrl() + '/v1/trunk/ip/' + this.ingress_trunk;
				this.loading = true;
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const trunks = body.payload.items
						console.log(body);
						var self = this;
						if(type == 'egress') {
							this.egress_trunk_ip_options = [];
							this.egress_trunk_ip_options["id"] = 1;
							this.egress_trunk_ip_options["value"] = body.payload.ip;						
						}
						else if(type == 'ingress') {
							this.ingress_trunk_ip_options = [];
							var value = new Array();
							value["id"] = 1;
							value["value"] = body.payload.ip;
							self.ingress_trunk_ip_options.push(value);														
							console.log("IP Address: " + this.ingress_trunk_ip_options.length);
						}
						this.loading = false;
						console.log("Success");
					}
				})
				.catch(error => {					
					console.log("Failure");
					console.log(error);
					this.loading = false;
				})
			},			
			changePageCount (countPerPage) {
				
			},
			handleChange() {

			},
			pageOneChanged (pageNum) {
				this.pageOne.currentPage = pageNum
			},
			fetchCallReport : function(){
				
			}
		}
	}
</script>

<style>
	.multi.height_115 {
		height: 115px;
	}
</style>
