<template>
    <div class="container-fluid">
        <div class="row">
            <div class="wrapper single">
                <time-display></time-display>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="#">Monitoring</a>
                    </li>
                    <li class="breadcrumb-item active">Fraud Detection</li>
                </ol>
                <h1 class="page-header">Fraud Detection</h1>
                <confirm v-show="showModal" @close="showModal = false" @submit="submit"></confirm>
                <spinner v-show="loading" class="spinner"></spinner>
                <tabs>
                    <tab label="Fraud Detection" class="" icon="dnl_icon dnl_qos_report" :selected="is_first">
                        <div class="advanced_search_filter_panel bottom_0">
                            <div class="inline-block search_wrapper">
                                <label>Rule Name:</label>
                                <br>
                                <input type="text" name="search" v-model="search" class="form-control inline-block search_field" placeholder="Enter Rule Name">
                                <span class="dnl_icon dnl_musica-searcher"></span>
                            </div>
                        </div>
                        <div class="clearfix little-space"></div>
                        <router-link to="/monitoring/fraud_detection/new" class="btn btn-primary mini pull-right">
                            <span class="dnl_icon dnl_add"></span> Create new
                        </router-link>
                        <div class="table_filters bottom_0">
                            <div class="inline-block select_min_wrapper">
                                <span class="inline-block">Page row:</span>
                                <select2 :options="options1" v-model="selected1" class="inline-block" @pagecount="changePageCount">
                                </select2>
                            </div>
                            <div class="inline-block">
                                <!--<select2 :options="options2" v-model="selected2">
                                    <option disabled value="0">Show/Hide Columns</option>
                                </select2>-->
                                <el-select v-model="fraud_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
                                    <el-option v-for="item in fraud_table_column_options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <div class="table-responsive">
                            <table class="table table-striped table-hover aliases">
                                <thead>
                                    <tr>
                                        <th v-if="showcolumns[0]">Rule Name
                                            <span class="dnl_icon dnl_sort pull-right"></span>
                                        </th>
                                        <th v-if="showcolumns[1]">1 Hour Minute</th>
                                        <th v-if="showcolumns[2]">1 Hour Revenue</th>
                                        <th v-if="showcolumns[3]">24 Hours Minute</th>
                                        <th v-if="showcolumns[4]">24 Hours Revenue</th>
                                        <th v-if="showcolumns[5]">Block</th>
                                        <th v-if="showcolumns[6]">Send Email</th>
                                        <th v-if="showcolumns[7]">Active</th>
                                        <th v-if="showcolumns[8]">Last Update</th>
                                        <th v-if="showcolumns[9]">Update by</th>
                                        <th v-if="showcolumns[10]" class="width_138">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="!frauds.length">
                                        <td style="text-align: center" colspan="11">No Data Found</td>
                                    </tr>										
                                    
                                    <tr v-for="fraud in filterBy(frauds, search)">
                                        <td v-if="showcolumns[0]">
                                            <router-link to="/monitoring/fraud_detection/edit" class="blue_link">
                                                {{fraud.name}}
                                            </router-link>
                                        </td>
                                        <td v-if="showcolumns[1]">{{fraud.one_hour_duration}}</td>
                                        <td v-if="showcolumns[2]">{{fraud.one_hour_revenue}}</td>
                                        <td v-if="showcolumns[3]">{{fraud.hour_24_duration}}</td>
                                        <td v-if="showcolumns[4]">{{fraud.hour_24_revenue}}</td>
                                        <td v-if="showcolumns[5]">{{fraud.enable_block}}</td>
                                        <td v-if="showcolumns[6]">{{fraud.enable_email}}</td>
                                        <td v-if="showcolumns[7]">{{fraud.active}}</td>
                                        <td v-if="showcolumns[8]">{{fraud.update_on}}</td>
                                        <td v-if="showcolumns[9]">{{fraud.update_by}}</td>
                                        <td v-if="showcolumns[10]">
                                            <router-link to="" class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" @click.native="edit_fraud_detection(fraud.id)">
                                                <span class="dnl_icon dnl_action_edit"></span>
                                            </router-link>
                                            <a class="action action_activate" data-toggle="tooltip" data-placement="top" title="Deactivate">
                                                <span class="dnl_icon dnl_check"></span>
                                            </a>
                                            <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="delete_fraud_detection(fraud.id)">
                                                <span class="dnl_icon dnl_action_delete"></span>
                                            </a>
                                        </td>
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
                    <tab label="Execution Log" class="" icon="dnl_icon dnl_qos_report" :selected="!is_first">
                        <div class="advanced_search_filter_panel">
                            <div class="col-md-3 col-sm-4">
                                <label>Rule Name:</label>
                                <!-- <select2 :options="options2" v-model="rule_name">
                                    <option disabled value="0">Select one</option>
                                </select2> -->
                                <input type="text" name="search" v-model="search" class="form-control inline-block search_field" placeholder="Enter Rule Name">
                                <span class="dnl_icon dnl_musica-searcher"></span>
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
                            <div class="col-md-3 col-sm-3">
                                <a class="btn btn-primary m-top-25">
                                    Query
                                </a>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                        <div class="table_filters bottom_0">
                            <div class="inline-block select_min_wrapper">
                                <span class="inline-block">Page row:</span>
                                <select2 :options="options1" v-model="selected1" class="inline-block">
                                </select2>
                            </div>
                            <div class="inline-block fix_medium_select">
                                <el-select v-model="exec_log_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange1">
                                    <el-option v-for="item in exec_log_table_column_options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
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
                                        <th class="width-65">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="log in ex_logs">
                                        <td>{{log.rule_name}}</td>
                                        <td>{{log.start_time}}</td>
                                        <td>{{log.finish_time}}</td>
                                        <td>{{log.create_by}}</td>
                                        <td>{{log.status}}</td>
                                        <td>
                                            <router-link to="/monitoring/fraud_detection/execution_log" class="action action_read" data-toggle="tooltip" data-placement="top" title="View Details">
                                                <span class="dnl_icon dnl_eye"></span>
                                            </router-link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="pull-right pagination">
                                <pagination :current-page="pageOne.currentPage" :total-pages="pageOne.totalPages" @page-changed="pageOneChanged">
                                </pagination>
                            </div>
                        </div>
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
    Pagination = require('vue!../main_components/pagination.vue'),
    confirmmodal = require('vue!../main_components/confirm_delete.vue');
const api = require("../../api");
const auth = require("../../auth");
const vSpinner = require('vue!../main_components/fadeloader.vue');
_ = require('lodash');
import {mapGetters,	mapActions} from 'vuex'

module.exports = {
    components: {
        'tabs': vTabs,
        'tab': vTab,
        'select2': vSelect,
        'pagination': Pagination,
        'confirm': confirmmodal,
        'spinner': vSpinner
    },
    props: ['is_first'],
    data: function () {
        return {
            exec_log_table_columns: ['Rule Name', 'Start Time', 'Finish Time',
				'Create by', 'Status', 'Action'],
            temp_exec_log_table_columns: ['Rule Name', 'Start Time', 'Finish Time',
				'Create by', 'Status', 'Action'],
			showcolumns1: [true, true, true, true, true, true],
            exec_log_table_column_options: [{
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
			}, {
				value: 'Action',
				label: 'Action'
			}],
            loading: false,
            apiUrl: '/v1/monitoring/fraud_detection/list',
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
            route_types: [
                { id: 1, text: 'Fail to Next Host' },
                { id: 2, text: 'Fail to Next Trunk' },
                { id: 3, text: 'Stop' },
            ],
            rule_name: '',
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
            selected2: 1,
            options2: [
                { id: 1, text: 'Alias' },
                { id: 2, text: 'Active' },
                { id: 3, text: 'Actions' }
            ],
            checker: '',
            frauds: [],
            showModal: false,
            selected_ids: [],
			fraud_table_column_options: [{
				value: 'Rule Name',
				label: 'Rule Name'
			}, {
				value: '1 Hour Minute',
				label: '1 Hour Minute'
			}, {
				value: '1 Hour Revenue',
				label: '1 Hour Revenue'
			}, {
				value: '24 Hours Minute',
				label: '24 Hours Minute'
			}, {
				value: '24 Hours Revenue',
				label: '24 Hours Revenue'
			}, {
				value: 'Block',
				label: 'Block'
			}, {
				value: 'Send Email',
				label: 'Send Email'
			}, {
				value: 'Active',
				label: 'Active'
			}, {
				value: 'Last Update',
				label: 'Last Update'
			}, {
				value: 'Update by',
				label: 'Update by'
			}, {
				value: 'Action',
				label: 'Action'
			}],
			fraud_table_columns: ['Rule Name', '1 Hour Minute', '1 Hour Revenue',
				'24 Hours Minute', '24 Hours Revenue', 'Block', 'Send Email', 
                'Active', 'Last Update', 'Update by', 'Action'],
			showcolumns: [true, true, true, true, true, true, true, true, true, true, true],
        }
    },
    methods: {
        ...mapActions({
            setAsyncConfirm: 'async_confirm/setAsyncConfirm',
            setMessage: 'app_message/setAppMessage'
        }),
        handleChange1() {
            for(let i = 0; i < this.temp_exec_log_table_columns.length; i++) {
                if (_.indexOf(this.exec_log_table_columns, this.temp_exec_log_table_columns[i]) != -1) {
                    Vue.set(this.showcolumns1, i, true);
                }
                else {
                    Vue.set(this.showcolumns1, i, false);
                }
            }
        },
		handleChange() {
			if (_.indexOf(this.fraud_table_columns, 'Rule Name') != -1) {
				// this.showcolumns[0] = true;
				Vue.set(this.showcolumns, 0, true);
			}
			else {
				// this.showcolumns[0] = false;
				Vue.set(this.showcolumns, 0, false);
			}

			if (_.indexOf(this.fraud_table_columns, '1 Hour Minute') != -1) {
				// this.showcolumns[1] = true;
				Vue.set(this.showcolumns, 1, true);
			}
			else {
				// this.showcolumns[1] = false;
				Vue.set(this.showcolumns, 1, false);
			}

			if (_.indexOf(this.fraud_table_columns, '1 Hour Revenue') != -1) {
				// this.showcolumns[2] = true;
				Vue.set(this.showcolumns, 2, true);
			}
			else {
				// this.showcolumns[2] = false;
				Vue.set(this.showcolumns, 2, false);
			}

			if (_.indexOf(this.fraud_table_columns, '24 Hours Minute') != -1) {
				// this.showcolumns[3] = true;
				Vue.set(this.showcolumns, 3, true);
			}
			else {
				// this.showcolumns[3] = false;
				Vue.set(this.showcolumns, 3, false);
			}

			if (_.indexOf(this.fraud_table_columns, '24 Hours Revenue') != -1) {
				// this.showcolumns[4] = true;
				Vue.set(this.showcolumns, 4, true);
			}
			else {
				// this.showcolumns[4] = false;
				Vue.set(this.showcolumns, 4, false);
			}

			if (_.indexOf(this.fraud_table_columns, 'Block') != -1) {
				// this.showcolumns[5] = true;
				Vue.set(this.showcolumns, 5, true);
			}
			else {
				// this.showcolumns[5] = false;
				Vue.set(this.showcolumns, 5, false);
			}

			if (_.indexOf(this.fraud_table_columns, 'Send Email') != -1) {
				// this.showcolumns[6] = true;
				Vue.set(this.showcolumns, 6, true);
			}
			else {
				// this.showcolumns[6] = false;
				Vue.set(this.showcolumns, 6, false);
			}

			if (_.indexOf(this.fraud_table_columns, 'Active') != -1) {
				// this.showcolumns[7] = true;
				Vue.set(this.showcolumns, 7, true);
			}
			else {
				// this.showcolumns[7] = false;
				Vue.set(this.showcolumns, 7, false);
			}

			if (_.indexOf(this.fraud_table_columns, 'Last Update') != -1) {
				// this.showcolumns[8] = true;
				Vue.set(this.showcolumns, 8, true);
			}
			else {
				// this.showcolumns[8] = false;
				Vue.set(this.showcolumns, 8, false);
			}

			if (_.indexOf(this.fraud_table_columns, 'Update by') != -1) {
				// this.showcolumns[9] = true;
				Vue.set(this.showcolumns, 9, true);
			}
			else {
				// this.showcolumns[9] = false;
				Vue.set(this.showcolumns, 9, false);
			}

			if (_.indexOf(this.fraud_table_columns, 'Action') != -1) {
				// this.showcolumns[10] = true;
				Vue.set(this.showcolumns, 10, true);
			}
			else {
				// this.showcolumns[10] = false;
				Vue.set(this.showcolumns, 10, false);
			}

			console.log(this.showcolumns);

			// this.$nextTick(() => {
			// 	document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
			// });
		},
        submit: function () {
            var vm = this;
            this.showModal = false;

            this.selected_ids.forEach(function (item, i) {
                var fraudid = item;
                if (fraudid == 0) {
                    vm.setMessage({
                        message: 'The fraud detection has been not selected!',
                        type: 'error'
                    });
                }
                else {
                    vm.loading = true;
                    vm.resource = vm.$resource(api.getEndpointUrl() + '/v1/monitoring/fraud_detection/' + fraudid);
                    vm.resource.delete({ id: fraudid }).then(function (response) {
                        vm.loading = false;
						let index = _.findIndex(vm.frauds, elem => elem.id  === fraudid)
						vm.frauds.splice(index, 1)
						vm.setMessage('The fraud detection have been deleted!')
                    });
                }
            });
        },
        delete_fraud_detection: function (id) {
            this.showModal = true;
            this.selected_ids = [];
            this.selected_ids.push(id);
        },
        edit_fraud_detection: function (id) {
            this.$router.push({ path: "/monitoring/fraud_detection/edit/" + id });
        },
        fetchFrauds() {
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
                    var frauds = response.body.payload.items;
                    console.log(frauds);
                    this.frauds = frauds;
                    var total_page = response.body.payload.total;
                    this.pageOne.currentPage = response.body.payload.page + 1;
                    this.pageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
                    // if(this.pageOne.totalPages == 0)
                    //     this.pageOne.totalPages = 1;
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
                this.$nextTick(this.fetchFrauds)
            }
        },
        changePageCount (countPerPage) {
            if (countPerPage !== this.pageOne.cntpage) {
                this.pageOne.cntpage = countPerPage
                this.$nextTick(this.fetchFrauds)
            }
        },
    },
    mounted: function () {
        $('[data-toggle="tooltip"]').tooltip();
    },
	updated: function () {
		document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
	},
    created: function () {
        this.fetchFrauds();
    }
}
</script>

<style>
.el-select__tags {
	display: none;
}
</style>
