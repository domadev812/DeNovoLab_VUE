<template>
    <div class="container-fluid">
        <div class="row">
            <div class="wrapper single">
                <time-display></time-display>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="#">Statistics</a>
                    </li>
                    <li class="breadcrumb-item active">PCAP Search</li>
                </ol>
                <h1 class="page-header">PCAP Search</h1>
                <spinner v-show="loading" class="spinner"></spinner>
                <tabs>
                    <tab label="Ingress CDR" class="" icon="dnl_icon dnl_qos_report" selected>
                        <div class="advanced_search_filter_panel bottom_0">
							<div class="col-md-2 col-sm-4">
								<label>Period:</label>
								<select2 :options="options" v-model="period">
									<option disabled value="0">Select one</option>
								</select2>
							</div>
							<div class="col-md-4 col-sm-8">
								<div class="inlined">
									<label for="start_date">Start Time:</label>
									<el-date-picker style="width: 100%;" type="datetime" v-model="start_date1" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
								</div>
								<div class="inlined">
									<label for="end-date">End Time:</label>
                                    <el-date-picker style="width: 100%;" type="datetime" v-model="end_date1" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
								</div>
							</div>
							<div class="col-md-2 col-sm-4">
								<label>GMT:</label>
								<select2 :options="options" v-model="gmt">
									<option disabled value="0">Select one</option>
								</select2>
							</div>
							<div class="col-md-2 col-sm-4">
								<label>Web:</label>
								<select2 :options="options" v-model="web">
									<option disabled value="0">Select one</option>
								</select2>
							</div>
							<div class="clearfix little-space"></div>
							<div class="col-md-12">
								<div class="white_pad m-bottom-10">
									<div class="row">
										<div class="col-md-4 col-sm-4">
											<label>Trunk Name:</label>
											<select2 :options="trunks" v-model="trunk">
												<option disabled value="0">Select one</option>
											</select2>
										</div>
										<div class="col-md-4 col-sm-4">
											<label>ANI:</label>
											<input type="text" name="ani" v-model="ani" class="form-control" placeholder="Enter ANI">
										</div>
										<div class="col-md-4 col-sm-4">
											<label>DNIS:</label>
											<input type="text" name="dnis" v-model="dnis" class="form-control" placeholder="Enter DNIS">
										</div>
										<div class="col-md-4 col-sm-4">
											<label>Duration:</label>
											<select2 :options="duarations" v-model="duaration">
												<option disabled value="0">Select one</option>
											</select2>
										</div>
									</div>
								</div>
							</div>
							<div class="clearfix"></div>
							<div class="col-md-12 col-sm-12">
								<div class="button_set">
									<a class="btn btn-primary">
										Query
									</a>
								</div>
							</div>
							<div class="clearfix"></div>							
                        </div>
                        <div class="clearfix little-space"></div>
                        <div class="table_filters bottom_0">
                            <div class="inline-block select_min_wrapper">
                                <span class="inline-block">Page row:</span>
                                <select2 :options="options1" v-model="selected1" class="inline-block" @pagecount="changePageCount">
                                </select2>
                            </div>
                            <div class="inline-block">
                                <el-select v-model="cdr_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
                                    <el-option v-for="item in cdr_table_column_options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="clearfix"></div>
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
                                        <td v-if="showcolumns[0]">{{cdr.answer}}</td>
                                        <td v-if="showcolumns[1]">{{cdr.duaration}}</td>
                                        <td v-if="showcolumns[2]">{{cdr.endtime}}</td>
                                        <td v-if="showcolumns[3]">{{cdr.origination}}</td>
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
                            <div class="col-md-3 col-sm-3">
                                <a class="btn btn-primary m-top-25">
                                    Query
                                </a>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-striped table-hover carrier_groups centrum">
                                <thead>
                                    <tr>
                                        <th>Rule Name</th>
                                        <th>Start Time</th>
                                        <th>Finish Time</th>
                                        <th>Create by</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="log in ex_logs">
                                        <td>{{log.rule_name}}</td>
                                        <td>{{log.start_time}}</td>
                                        <td>{{log.finish_time}}</td>
                                        <td>{{log.create_by}}</td>
                                        <td>{{log.status}}</td>
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
            cdrs: [],
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
        }
    },
    methods: {
        ...mapActions({
            setAsyncConfirm: 'async_confirm/setAsyncConfirm',
            setMessage: 'app_message/setAppMessage'
        }),
		handleChange() {
			if (_.indexOf(this.cdr_table_columns, 'Answer Time') != -1) {
				Vue.set(this.showcolumns, 0, true);
			}
			else {
				Vue.set(this.showcolumns, 0, false);
			}

			if (_.indexOf(this.cdr_table_columns, 'Call Duaration') != -1) {
				Vue.set(this.showcolumns, 1, true);
			}
			else {
				Vue.set(this.showcolumns, 1, false);
			}

			if (_.indexOf(this.cdr_table_columns, 'End Time') != -1) {
				Vue.set(this.showcolumns, 2, true);
			}
			else {
				Vue.set(this.showcolumns, 2, false);
			}

			if (_.indexOf(this.cdr_table_columns, 'Trunk ID Origination') != -1) {
				Vue.set(this.showcolumns, 3, true);
			}
			else {
				Vue.set(this.showcolumns, 3, false);
			}

			console.log(this.showcolumns);
		},
        fetchcdrs() {
            var page = this.pageOne.currentPage - 1;
            var per_page = this.pageOne.cntpage;
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
                    var cdrs = response.body.payload.items;
                    console.log(cdrs);
                    this.cdrs = cdrs;
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
                this.$nextTick(this.fetchcdrs)
            }
        },
        changePageCount (countPerPage) {
            if (countPerPage !== this.pageOne.cntpage) {
                this.pageOne.cntpage = countPerPage
                this.$nextTick(this.fetchcdrs)
            }
        },
    },
    mounted: function () {
        $('[data-toggle="tooltip"]').tooltip();
    },
	updated: function () {
		document.querySelector('.el-select > .el-input > input').placeholder = 'Show/Hide Columns';
	},
    created: function () {
        this.fetchcdrs();
    }
}
</script>

<style>
.el-select__tags {
	display: none;
}
</style>
