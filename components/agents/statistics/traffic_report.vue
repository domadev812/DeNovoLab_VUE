<template>
    <div class="container-fluid">
        <div class="row">
            <div class="wrapper single">
                <time-display></time-display>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="#">Statistics</a>
                    </li>
                    <li class="breadcrumb-item active">Detail Traffic Report</li>
                </ol>
                <h1 class="page-header">Detail Traffic Report</h1>
                <spinner v-show="loading" class="spinner"></spinner>
				<div class="timeline">
					<div class="chart_select_header grided">
					<!-- <div class="advanced_search_filter_panel bottom_0"> -->
						<div class="col-md-2 col-sm-4">
							<label>Period:</label>
							<select2 :options="period_options" v-model="period">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="col-md-4 col-sm-8">
							<div class="inlined">
								<label for="start_date">Start Time:</label>
								<el-date-picker style="width: 100%;" type="datetime" v-model="start_date" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
							<div class="inlined">
								<label for="end-date">End Time:</label>
								<el-date-picker style="width: 100%;" type="datetime" v-model="end_date" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
						</div>
						<div class="col-md-6 col-sm-12 none-left-padding none-right-padding">
							<div class="inlined">
								<div class="col-md-4 col-sm-4 no-min-width">
									<label>GMT:</label>
									<select class="selectable" v-model="gmt">
										<option v-for="item in gmt_options" v-bind:value="item.id">
											{{ item.text }}
										</option>
									</select>
								</div>
								<div class="col-md-4 col-sm-4">
									<label>By Hours:</label>
									<select2 :options="by_hour_options" v-model="by_hours">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-4 col-sm-4">
									<label>Web:</label>
									<select2 :options="web_options" v-model="web">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
							</div>
							<div class="inlined">
								<div class="col-md-4 col-sm-4">
									<a class="btn btn-primary full-width m-top-20" v-on:click="searchReport()">
										Query
									</a>
								</div>
								<!--
								<div class="col-md-4 col-sm-4">
									<a class="btn btn-primary full-width m-top-20"  v-on:click="showAdvanced()">
										{{more_advanced_option_button}}
									</a>
								</div> -->
								<div class="clearfix"></div>
							</div>
						</div>
						<div class="clearfix little-space"></div>
						<div class="col-md-12">
							<div class="white_pad m-bottom-10">
								<div class="row">
									<div class="col-md-4 col-sm-4">
										<label>Carriers:</label>
										<select2 :options="carrier_list" v-model="carrier">
											<option disabled value="0">Select one</option>
										</select2>									
									</div>
									<div class="col-md-4 col-sm-4">
										<label>Ingress Trunk:</label>
										<select2 :options="trunk_list" v-model="trunk">
											<option disabled value="0">Select one</option>
										</select2>
									</div>									
								</div>																
							</div>
						</div>						
						<div class="clearfix little-space"></div>
						<div class="col-md-12">
							<div class="white_pad m-bottom-10">
								<div class="row">
									<div class="col-md-4 col-sm-4">
										<label>Group By #1:</label>
										<select2 :options="group_options" v-model="groupby1">
											<option disabled value="0">Select one</option>
										</select2>
									</div>
									<div class="col-md-4 col-sm-4">
										<label>Group By #2:</label>
										<select2 :options="group_options" v-model="groupby2">
											<option disabled value="0">Select one</option>
										</select2>
									</div>									
								</div>								
							</div>
						</div>						
						<div class="clearfix"></div>							
					<!-- </div> -->
					</div>
					<div class="clearfix"></div>
					<div class="chart_content">
					<div class="table-responsive marged-30">
						<table class="table table-striped table-hover aliases">
							<thead>
								<tr>
									<th rowspan="2">ABR</th>
									<th rowspan="2">ASR</th>
									<th rowspan="2">ACD</th>
									<th rowspan="2">ALOC</th>
									<th rowspan="2">PDD</th>
									<th rowspan="2">NER</th>
									<th rowspan="2">NPR</th>
									<th colspan="2">Time</th>
									<th rowspan="2">Total Cost</th>
									<th rowspan="2">Avg Rate</th>
									<th colspan="4">Call</th>
								</tr>
								<tr>
									<th>Total Duration</th>
									<th>Total Billable Time</th>
									<th>Total</th>
									<th>Not Zero</th>
									<th>Success</th>
									<th>Busy</th>
								</tr>							
							</thead>
							<tbody>
								<tr v-if="!reports.length">
									<td style="text-align: center" colspan="15">No Data Found</td>
								</tr>										
								
								<tr v-for="report in reports">
									<td>{{report.abr}}</td>
									<td>{{report.asr}}</td>
									<td>{{report.acd}}</td>
									<td>{{report.aloc}}</td>
									<td>{{report.pdd}}</td>
									<td>{{report.ner}}</td>
									<td>{{report.npr}}</td>
									<td>{{report.total_duration}}</td>
									<td>{{report.total_billable}}</td>
									<td>{{report.total_cost}}</td>
									<td>{{report.avg_rate}}</td>
									<td>{{report.total_calls}}</td>
									<td>{{report.not_zero}}</td>
									<td>{{report.success}}</td>
									<td>{{report.busy_calls}}</td>
								</tr>
							</tbody>
						</table>
					</div>
					</div>
					<div class="pull-right pagination">
						<pagination :current-page="pageOne.currentPage" :total-pages="pageOne.totalPages" @page-changed="pageOneChanged">
						</pagination>
					</div> 
					<div class="clearfix"></div>
				</div>				
            </div>
        </div>
    </div>
</template>

<script>   
const vTabs = require('vue!../../main_components/tabs.vue'),
    vTab = require('vue!../../main_components/tab.vue'),
    vSelect = require('vue!../../main_components/select.vue'),
    Pagination = require('vue!../../main_components/pagination.vue'),
	api = require("../../../api"),
	auth = require("../../../auth"),
	vSpinner = require('vue!../../main_components/fadeloader.vue');
_ = require('lodash');
import {mapGetters,	mapActions} from 'vuex'

module.exports = {
    components: {
        'tabs': vTabs,
        'tab': vTab,
        'select2': vSelect,
        'pagination': Pagination,
        'spinner': vSpinner
    },
    data: function () {
        return {
            loading: false,
            apiUrl: '',

			web: 'web',
			web_options: [
				{ id: 'web', text: 'Web' },
				{ id: 'excel_csv', text: 'CSV' },
				{ id: 'excel_xls', text: 'XLS' },
				//{ id: 'email_when_done', text: 'Email when done' },
				//{ id: 'export_from_storage', text: 'Export from Storage' },
			],				
			gmt: 13,
			gmt_options: [
				{ id: 1, text: 'GMT -12:00' },
				{ id: 2, text: 'GMT -11:00' },
				{ id: 3, text: 'GMT -10:00' },
				{ id: 4, text: 'GMT -9:00' },
				{ id: 5, text: 'GMT -8:00' },
				{ id: 6, text: 'GMT -7:00' },
				{ id: 7, text: 'GMT -6:00' },
				{ id: 8, text: 'GMT -5:00' },
				{ id: 9, text: 'GMT -4:00' },
				{ id: 10, text: 'GMT -3:00' },
				{ id: 11, text: 'GMT -2:00' },
				{ id: 12, text: 'GMT -1:00' },
				{ id: 13, text: 'GMT +0:00' },
				{ id: 14, text: 'GMT +1:00' },
				{ id: 15, text: 'GMT +2:00' },
				{ id: 16, text: 'GMT +3:00' },
				{ id: 17, text: 'GMT +4:00' },
				{ id: 18, text: 'GMT +5:00' },
				{ id: 19, text: 'GMT +6:00' },
				{ id: 20, text: 'GMT +7:00' },
				{ id: 21, text: 'GMT +8:00' },
				{ id: 22, text: 'GMT +9:00' },
				{ id: 23, text: 'GMT +10:00' },
				{ id: 24, text: 'GMT +11:00' },
				{ id: 25, text: 'GMT +12:00' },
			],
			period: 'Custom',
			period_options: [
				{id: 'Custom', text: 'Custom'},
				{id: 'Today', text: 'Today'},
				{id: 'Yesterday', text: 'Yesterday'},
				{id: 'Current week', text: 'Current week'},
				{id: 'Previous week', text: 'Previous week'},
				{id: 'Current month', text: 'Current month'},
				{id: 'Previous month', text: 'Previous month'},
			],
			by_hours: 1,
			by_hour_options: [
				{ id: 1, text: 'All Time', value: 0 },
				{ id: 2, text: 'By hours', value: 60 },
				{ id: 3, text: 'By day', value: 1440 },
				{ id: 4, text: 'By month', value: 43200 },
				{ id: 5, text: 'By year', value: 525600 },
			],
			group_options: [
				  { id: 1, value: 'ingress_carrier', text: 'Ingress Carrier' },
				  { id: 2, value: 'ingress_trunk', text: 'Ingress Trunk' },				  			  				  
				],
            search: '',			
			carrier: '',
			carrier_list: [
				{ id: 1, text: 'Atul_Ingress'},
			],
			trunk: '',
			trunk_list: [
				{ id: 1, text: 'Atul_Ingress'},
			],

			prefix: '',
			prefix_list: [],
			country: '',
			code_name: '',
			code: '',
			rate_type: '',
			rate_type_list: [],
			rate_display_as: '',
			rate_display_list: [],			
			groupby1: '',
			groupby2: '',
			
            start_date: '',
            end_date: '',
            selected1: 1,
            options1: [
                { id: 1, text: '10' },
                { id: 2, text: '20' },
                { id: 3, text: '30' },
                { id: 4, text: '50' },
                { id: 5, text: '100' }
            ],
			pageOne: {
				currentPage: 1,
				totalPages: 10
			},
			tmpPageOne: {
				currentPage: 0,
				totalPages: 10,
				cntPerPage: 30,
			},
            reports: [
				{abr: '0%', asr:'0%', adc:'0', aloc:'0', pdd:'0', ner: '0', npr: '0', total_duration:'0.00', total_billable:'0.00', total_cost:'0.00000', avg_rate:'0.00000', total_calls:'0', not_zero:'0', success:'0', busy_calls:'0'},
				{abr: '0%', asr:'0%', adc:'0', aloc:'0', pdd:'0', ner: '0', npr: '0', total_duration:'0.00', total_billable:'0.00', total_cost:'0.00000', avg_rate:'0.00000', total_calls:'0', not_zero:'0', success:'0', busy_calls:'0'},
				{abr: '0%', asr:'0%', adc:'0', aloc:'0', pdd:'0', ner: '0', npr: '0', total_duration:'0.00', total_billable:'0.00', total_cost:'0.00000', avg_rate:'0.00000', total_calls:'0', not_zero:'0', success:'0', busy_calls:'0'},
			],
        }
    },
    methods: {
        ...mapActions({
            setAsyncConfirm: 'async_confirm/setAsyncConfirm',
            setMessage: 'app_message/setAppMessage'
        }),
        fetchreports() {
            var page = this.pageOne.currentPage - 1;			
            var per_page = this.tmpPageOne.cntPerPage;
            console.log("page => " + page + " , per_page => " + per_page);
            this.loading = true;

            this.$http.get(api.getEndpointUrl() + this.apiUrl + "?page=" + page + "&per_page=" + per_page + "&order_by=id&order_dir=desc",
                {
                    headers: {
                        "X-Auth-Token": auth.getToken()
                    }
                }).then(function (response) {
                    this.loading = false;
                    //todo: check success flag? validation errors?
                    var reports = response.body.payload.items;
                    console.log(reports);
                    this.reports = reports;
                    var total_page = response.body.payload.total;
                    this.pageOne.currentPage = response.body.payload.page + 1;
                    this.pageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
                    console.log("total pages => " + this.pageOne.totalPages);
                }, function (error) {
                    this.loading = false;
                    console.log(error);
                }
            );
        },
        pageOneChanged(pageNum) {
            if (pageNum !== this.pageOne.currentPage) {
                this.pageOne.currentPage = pageNum
                this.$nextTick(this.fetchreports)
            }
        },
        changePageCount (countPerPage) {
            if (countPerPage !== this.pageOne.cntpage) {
                this.pageOne.cntpage = countPerPage
                this.$nextTick(this.fetchreports)
            }
        }, //curl -h "Token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDU0MDU4MjMuOTEzMDMsInVzZXJfaWQiOjEwNH0.jvBF85r20zw1tExttbS81DcJwyMSQnjJjSjoEkJ70S8" "http://88.99.175.131:8000/v1/carrier/list"
		fetchCarriers() {				
				this.loading = true;
				var url;		
				var authToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMTEsImV4cCI6MTUwNDUzNTI3NS4xODI3NDd9.yUFoGLlb56DGHC3nhFAlFBTBiR7Emr5AYke5c5sHxzM";		
				if(this.tmpPageOne.currentPage === 0)
					url = api.getEndpointUrl() + "/v1/carrier/list"
				else
					url = api.getEndpointUrl() + "/v1/carrier/list?page=" + this.tmpPageOne.currentPage
				console.log(url);
				console.log("Token: " + auth.getToken());
				this.$http.get(url, {
					headers: {
						"X-Auth-Token": auth.getToken(),
						"accept": "application/json",
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
    mounted: function () {
        $('[data-toggle="tooltip"]').tooltip();
    },
    created: function () {
        this.fetchreports();
		//this.fetchCarriers();
    }
}
</script>

<style>
.el-select__tags {
	display: none;
}
</style>
