<template>
    <div class="container-fluid">
        <div class="row">
            <div class="wrapper single">
                <time-display></time-display>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="#">Statistics</a>
                    </li>
                    <li class="breadcrumb-item active">CDRs Search</li>
                </ol>
                <h1 class="page-header">CDRs Search</h1>
                <spinner v-show="loading" class="spinner"></spinner>
                <tabs>
                    <tab label="Ingress CDR" class="" icon="dnl_icon dnl_qos_report" selected>
                        <div class="advanced_search_filter_panel bottom_0">
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
							<div class="col-md-2 col-sm-6">
								<label>GMT:</label>
								<select2 :options="gmt_options" v-model="gmt">
									<option disabled value="0">Select one</option>
								</select2>
							</div>
							<div class="col-md-2 col-sm-6">
								<label>Web:</label>
								<select2 :options="web_options" v-model="web">
									<option disabled value="0">Select one</option>
								</select2>
							</div>
                            <div class="col-md-2 col-sm-6">
									<a class="btn btn-primary full-width m-top-20" v-on:click="searchReport()">
										Query
									</a>
								</div>
							<div class="clearfix little-space"></div>
							<div class="col-md-12">
								<div class="white_pad m-bottom-10">
									<div class="row">
										<div class="col-md-4 col-sm-6">
											<label>Trunk Name:</label>
											<select2 :options="trunk_list" v-model="trunk">
												<option disabled value="0">Select one</option>
											</select2>
										</div>
										<div class="col-md-4 col-sm-6">
											<label>ANI:</label>
											<input type="text" name="ani" v-model="ani" class="form-control" placeholder="Enter ANI">
										</div>
										<div class="col-md-4 col-sm-6">
											<label>DNIS:</label>
											<input type="text" name="dnis" v-model="dnis" class="form-control" placeholder="Enter DNIS">
										</div>
										<div class="col-md-4 col-sm-6">
											<label>Duration:</label>
											<select2 :options="duration_list" v-model="duration">
												<option disabled value="0">Select one</option>
											</select2>
										</div>
									</div>
								</div>
							</div>
							<div class="clearfix"></div>														
                        </div>
                        <div class="clearfix little-space"></div>
                        
                        <div class="table-responsive">
                            <table class="table table-striped table-hover aliases">
                                <thead>
                                    <tr>
                                        <th v-if="showcolumns[0]">Answer Time</th>
                                        <th v-if="showcolumns[1]">Call Duaration</th>
                                        <th v-if="showcolumns[2]">End Time</th>
                                        <th v-if="showcolumns[3]">Trunk ID Origination</th>
                                    </tr>
                                </thead>
                                <tbody>
                               
                                    <tr v-if="!cdrs.length">
                                        <td style="text-align: center" colspan="4">No Data Found</td>
                                    </tr>										
                                    
                                    <tr v-for="cdr in cdrs">
                                        <td v-if="showcolumns[0]">{{cdr.answer_time_of_date}}</td>
                                        <td v-if="showcolumns[1]">{{cdr.call_duration}}</td>
                                        <td v-if="showcolumns[2]">{{cdr.release_tod}}</td>
                                        <td v-if="showcolumns[3]">{{cdr.trunk_type}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="pull-right pagination">
                            <pagination :current-page="pageOne.currentPage" :total-pages="pageOne.totalPages" @page-changed="pageOneChanged">
                            </pagination>
                        </div>
                        <div class="clearfix"></div>
                    </tab>
                    <tab label="CDR Export Log" class="" icon="dnl_icon dnl_export">
                        <div class="advanced_search_filter_panel">
                            <div class="col-md-4 col-sm-4">
                                <label for="start_date">Start Time:</label>
                                <el-date-picker style="width: 100%;" type="datetime" v-model="start_date" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
                            </div>
                            <div class="col-md-4 col-sm-4">
                                <label for="end-date">End Time:</label>
                                <el-date-picker style="width: 100%;" type="datetime" v-model="end_date" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>                               
                            </div>
                            <div class="col-md-2 col-sm-4" v-on:click="searchReport()">
                                <a class="btn btn-primary m-top-25 full-width">
                                    Query
                                </a>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                        <div class="table_filters bottom_0">
                            <div class="inline-block select_min_wrapper">
                                <span class="inline-block">Page row:</span>
                                <select2 :options="options1" v-model="selected1" class="inline-block" @pagecount="changePageCount">
                                </select2>
                            </div>
                            <div class="inline-block">
                                <el-select v-model="cdr_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
                                    <el-option v-for="item in cdr_log_table_column_options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <div class="table-responsive">
                            <table class="table table-striped table-hover carrier_groups centrum">
                                <thead>
                                    <tr>
                                        <th v-if="log_showcolumns[0]">Rule Name</th>
                                        <th v-if="log_showcolumns[1]">Start Time</th>
                                        <th v-if="log_showcolumns[2]">Finish Time</th>
                                        <th v-if="log_showcolumns[3]">Create by</th>
                                        <th v-if="log_showcolumns[4]">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="log in ex_logs">
                                        <td v-if="log_showcolumns[0]">{{log.rule_name}}</td>
                                        <td v-if="log_showcolumns[1]">{{log.start_time}}</td>
                                        <td v-if="log_showcolumns[2]">{{log.finish_time}}</td>
                                        <td v-if="log_showcolumns[3]">{{log.create_by}}</td>
                                        <td v-if="log_showcolumns[4]">{{log.status}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
    
                    </tab>
                </tabs>
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
				{ id: 'excel_csv', text: 'Excel CSV' },
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
            trunk: '',
			trunk_list: [
				{ id: 1, text: 'Atul_Ingress'},
			],
            duration: '',
			duration_list: [
				{ id: "all", text: 'All'},
                { id: "non_zero", text: 'Non Zero'},
                { id: "zero", text: 'Zero'},
			],
            search: '',
            ex_logs: [
                {
                    rule_name: 'Sourav Test',
                    start_time: '2016-11-20 17:31:14+00',
                    finish_time: '2016-11-20 17:31:14+00',
                    create_by: 'Admin',
                    status: 'succeed',
                },
                {
                    rule_name: 'Sourav Test',
                    start_time: '2016-11-20 17:31:14+00',
                    finish_time: '2016-11-20 17:31:14+00',
                    create_by: 'Admin',
                    status: 'succeed',
                },
                {
                    rule_name: 'Sourav Test',
                    start_time: '2016-11-20 17:31:14+00',
                    finish_time: '2016-11-20 17:31:14+00',
                    create_by: 'Admin',
                    status: 'succeed',
                },
                {
                    rule_name: 'Sourav Test',
                    start_time: '2016-11-20 17:31:14+00',
                    finish_time: '2016-11-20 17:31:14+00',
                    create_by: 'Admin',
                    status: 'succeed',
                },
                {
                    rule_name: 'Sourav Test',
                    start_time: '2016-11-20 17:31:14+00',
                    finish_time: '2016-11-20 17:31:14+00',
                    create_by: 'Admin',
                    status: 'succeed',
                }
            ],
            pageOne: {
                currentPage: 1,
                totalPages: 10,
                cntpage: 10,
            },
            start_date1: '',
            end_date1: '',
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
            cdrs: [
                { id: 1, answer_time_of_date: '2017-08-01 09:22:24', call_duration : 60, release_tod: '2017-08-01 09:23:10', trunk_type: 13 },
                { id: 2, answer_time_of_date: '2017-08-01 09:22:24', call_duration : 120, release_tod: '2017-08-01 09:23:10', trunk_type: 14 },
                { id: 3, answer_time_of_date: '2017-08-01 09:22:24', call_duration : 30, release_tod: '2017-08-01 09:23:10', trunk_type: 15 },
                { id: 4, answer_time_of_date: '2017-08-01 09:22:24', call_duration : 50, release_tod: '2017-08-01 09:23:10', trunk_type: 16 },
                { id: 5, answer_time_of_date: '2017-08-01 09:22:24', call_duration : 80, release_tod: '2017-08-01 09:23:10', trunk_type: 17 },
            ],
			cdr_table_column_options: [{
				value: 'Answer Time',
				label: 'Answer Time'
			}, {
				value: 'Call Duaration',
				label: 'Call Duaration'
			}, {
				value: 'End Time',
				label: 'End Time'
			}, {
				value: 'Trunk ID Origination',
				label: 'Trunk ID Origination'
			}],
			cdr_table_columns: ['Answer Time', 'Call Duaration', 'End Time', 'Trunk ID Origination'],
			showcolumns: [true, true, true, true],


            cdr_log_table_column_options: [{
				value: 'Rule Name',
				label: 'Rule Name'
			}, {
				value: 'Start Time',
				label: 'Start Time'
			}, {
				value: 'Finish Time',
				label: 'Finish Time'
			}, {
				value: 'Create by',
				label: 'Create by'
			}, {
				value: 'Status',
				label: 'Status'
			}],
			cdr_log_table_columns: ['Rule Name', 'Start Time', 'Finish Time', 'Created by', 'Status'],
			log_showcolumns: [true, true, true, true, true],
        }
    },
    methods: {
        ...mapActions({
            setAsyncConfirm: 'async_confirm/setAsyncConfirm',
            setMessage: 'app_message/setAppMessage'
        }),
		handleChange() {
			if (_.indexOf(this.cdr_log_table_columns, 'Rule Name') != -1) {
				Vue.set(this.showcolumns, 0, true);
			}
			else {
				Vue.set(this.showcolumns, 0, false);
			}

			if (_.indexOf(this.cdr_log_table_columns, 'Start Time') != -1) {
				Vue.set(this.showcolumns, 1, true);
			}
			else {
				Vue.set(this.showcolumns, 1, false);
			}

			if (_.indexOf(this.cdr_log_table_columns, 'Finish Time') != -1) {
				Vue.set(this.showcolumns, 2, true);
			}
			else {
				Vue.set(this.showcolumns, 2, false);
			}

			if (_.indexOf(this.cdr_log_table_columns, 'Created by') != -1) {
				Vue.set(this.showcolumns, 3, true);
			}
			else {
				Vue.set(this.showcolumns, 3, false);
			}
            
            if (_.indexOf(this.cdr_log_table_columns, 'Status') != -1) {
				Vue.set(this.showcolumns, 4, true);
			}
			else {
				Vue.set(this.showcolumns, 4, false);
			}
			console.log(this.showcolumns);
		},
        // handleChange() {
		// 	if (_.indexOf(this.cdr_table_columns, 'Answer Time') != -1) {
		// 		Vue.set(this.showcolumns, 0, true);
		// 	}
		// 	else {
		// 		Vue.set(this.showcolumns, 0, false);
		// 	}

		// 	if (_.indexOf(this.cdr_table_columns, 'Call Duaration') != -1) {
		// 		Vue.set(this.showcolumns, 1, true);
		// 	}
		// 	else {
		// 		Vue.set(this.showcolumns, 1, false);
		// 	}

		// 	if (_.indexOf(this.cdr_table_columns, 'End Time') != -1) {
		// 		Vue.set(this.showcolumns, 2, true);
		// 	}
		// 	else {
		// 		Vue.set(this.showcolumns, 2, false);
		// 	}

		// 	if (_.indexOf(this.cdr_table_columns, 'Trunk ID Origination') != -1) {
		// 		Vue.set(this.showcolumns, 3, true);
		// 	}
		// 	else {
		// 		Vue.set(this.showcolumns, 3, false);
		// 	}

		// 	console.log(this.showcolumns);
		// },
        fetchcdrs(start_time = 1501027200, end_time = 1501113599, egress_rcause = 'NORMAL_CLEARING') {
           this.loading = true;
            console.log("getting CDR lists");				
            var page = this.pageOne.currentPage - 1;
            var per_page = this.pageOne.cntpage;								                                                                            
            var authToken = "Token Yuza2L2rlGkdemBeYzL0SVncFafTjYNFSMpShsJT614inGMLDf";				
            this.$http.get(api.getCDR_URL() + "?start_time=" + start_time + "&end_time=" + end_time + "&egress_rcause=" + egress_rcause + "&format=json&human_readable=1",
            {
                headers: {
                    "X-Auth-Token": authToken,						
                }
            }).then(function(response) {
                this.loading = false;																		
                var cdrs = response.body.data;					
                console.log(cdrs);
                this.cdrs = cdrs;										
            }, function(error) {					
                this.loading = false;	
                this.cdrs = [];							
                console.log(error);
            });	
        },       
        pageOneChanged(pageNum) {
            // if (pageNum !== this.pageOne.currentPage) {
            //     this.pageOne.currentPage = pageNum
            //     this.$nextTick(this.fetchcdrs)
            // }
        },
        changePageCount (countPerPage) {
            // if (countPerPage !== this.pageOne.cntpage) {
            //     this.pageOne.cntpage = countPerPage
            //     this.$nextTick(this.fetchcdrs)
            // }
        },
        searchReport: function(){
            var start_time, end_time;						
            if(this.start_date == ""){
                start_time = new Date().getTime() / 1000;
            }	
            else{
                start_time = new Date(this.start_date).getTime() / 1000;
            }

            if(this.end_date == ""){
                end_time = new Date().getTime() / 1000;
            }	
            else{
                end_time = new Date(this.end_date).getTime() / 1000;
            }		
            console.log(start_time + "   " + end_time);	
            this.fetchcdrs(start_time, end_time);	
        },
    },
    mounted: function () {
        $('[data-toggle="tooltip"]').tooltip();
    },
	updated: function () {
		document.querySelector('.el-select > .el-input > input').placeholder = 'Show/Hide Columns';
	},    
    created: function () {
        this.searchReport();
    }
}
</script>

<style>
.el-select__tags {
	display: none;
}
</style>
