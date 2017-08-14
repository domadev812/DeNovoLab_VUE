<template>
    <div class="container-fluid">
        <div class="row">
            <div class="wrapper single">
                <time-display></time-display>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="#">Monitoring</a>
                    </li>
                    <li class="breadcrumb-item active">Loop Detection</li>
                </ol>
                <h1 class="page-header">Loop Detection</h1>
                <confirm v-show="showModal" @close="showModal = false" @submit="submit"></confirm>
                <tabs>
                    <tab label="Define Looping Rule" class="" icon="dnl_icon dnl_setting" selected>
                        <div class="clearfix little-space"></div>
                        <router-link to="/monitoring/loop_detection/new" class="btn btn-primary mini pull-right">
                            <span class="dnl_icon dnl_add"></span> Create new
                        </router-link>
                        <div class="table_filters bottom_0">
                            <div class="inline-block select_min_wrapper">
                                <span class="inline-block">Page row:</span>
                                <select2 :options="options1" v-model="selected1" class="inline-block">
                                </select2>
                            </div>
                            <div class="inline-block">
                                <!--<select2 :options="options2" v-model="selected2">
                                    <option disabled value="0">Show/Hide Columns</option>
                                </select2>-->
                                <el-select v-model="loop_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
                                    <el-option v-for="item in loop_table_column_options" :key="item.value" :label="item.label" :value="item.value">
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
                                        <th v-if="showcolumns[1]">Counter Time (s)</th>
                                        <th v-if="showcolumns[2]">Number</th>
                                        <th v-if="showcolumns[3]">Block Time (s)</th>
                                        <th v-if="showcolumns[4]">Trunk Count</th>
                                        <th v-if="showcolumns[5]" class="width_98">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="!loops.length">
                                        <td style="text-align: center" colspan="6">No Data Found</td>
                                    </tr>										
                                    
                                    <tr v-for="loop in loops">
                                        <td v-if="showcolumns[0]">{{loop.name}}</td>
                                        <td v-if="showcolumns[1]">{{loop.period}}</td>
                                        <td v-if="showcolumns[2]">{{loop.occurance}}</td>
                                        <td v-if="showcolumns[3]">{{loop.block_second}}</td>
                                        <td v-if="showcolumns[4]">{{loop.ingress_trunks.length}}</td>
                                        <td v-if="showcolumns[5]">
                                            <router-link to="" class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" @click.native="edit_loop_detection(loop.id)">
                                                <span class="dnl_icon dnl_action_edit"></span>
                                            </router-link>
                                            <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="delete_loop_detection(loop.id)">
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
                    <tab label="Loop Found" class="" icon="dnl_icon dnl_qos_report">
                        <div class="advanced_search_filter_panel">
                            <div class="col-md-2 col-sm-4">
                                <label>Time:</label>
                                <select2 :options="options1" v-model="time">
                                    <option disabled value="0">Select one</option>
                                </select2>
                            </div>
                            <div class="col-md-4 col-sm-8">
                                <div class="inlined">
                                    <label for="start_date">Start Time:</label>
                                    <input type="text" name="start_date" v-model="start_date" class="form-control" placeholder="Enter Date">
                                </div>
                                <div class="inlined">
                                    <label for="end-date">End Time:</label>
                                    <input type="text" name="end_date" v-model="end_date" class="form-control" placeholder="Enter Date">
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
                                <select2 :options="options1" v-model="web">
                                    <option disabled value="0">Select one</option>
                                </select2>
                            </div>
                            <div class="clearfix little-space"></div>
                            <div class="col-md-12 col-sm-12">
                                <div class="white_pad">
                                    <div class="row">
                                        <div class="col-md-4 col-sm-5">
                                            <label>Ingress:</label>
                                            <select2 :options="options1" v-model="ingress">
                                                <option disabled value="0">Select one</option>
                                            </select2>
                                        </div>
                                        <div class="col-md-4 col-sm-5">
                                            <label for="groupname">Show Fields:</label>
                                            <select multiple class="multi">
                                                <option v-for="option in options" :value='option.value'>{{option.text}}</option>
                                            </select>
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
                                    <a class="btn btn-default">
                                        Less Options
                                    </a>
                                </div>
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
                                <select2 :options="options2" v-model="selected2">
                                    <option disabled value="0">Show/Hide Columns</option>
                                </select2>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-striped table-hover carrier_groups centrum">
                                <thead>
                                    <tr>
                                        <th>Call Duration</th>
                                        <th>Orig DST Number</th>
                                        <th>Orig Src Number</th>
                                        <th>Orig Call Duration</th>
                                        <th>Orig Switch IP</th>
                                        <th>PDD(ms)</th>
                                        <th>Release Cause</th>
                                        <th>Response from Egress</th>
                                        <th>Response TO Ingress</th>
                                        <th>Tax</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="log in logs">
                                        <td>{{log.call_duration}}</td>
                                        <td>{{log.orig_dst_number}}</td>
                                        <td>{{log.orig_src_number}}</td>
                                        <td>{{log.orig_call_duration}}</td>
                                        <td>{{log.orig_switch_ip}}</td>
                                        <td>{{log.pdd}}</td>
                                        <td>{{log.release_cause}}</td>
                                        <td>{{log.response_from_egress}}</td>
                                        <td>{{log.response_to_ingress}}</td>
                                        <td>{{log.tax}}</td>
                                        <td>{{log.time}}</td>
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
const vTabs = require('vue!../main_components/tabs.vue'),
    vTab = require('vue!../main_components/tab.vue'),
    vSelect = require('vue!../main_components/select.vue'),
    Pagination = require('vue!../main_components/pagination.vue'),
    confirmmodal = require('vue!../main_components/confirm_delete.vue');
const api = require("../../api");
const auth = require("../../auth");
_ = require('lodash');
import {mapGetters,	mapActions} from 'vuex'

module.exports = {
    components: {
        'tabs': vTabs,
        'tab': vTab,
        'select2': vSelect,
        'pagination': Pagination,
        'confirm': confirmmodal,
    },
    data: function () {
        return {
            apiUrl: '/v1/monitoring/loop_detection/list',
            start_date: '',
            end_date: '',
            time: '',
            gmt: '',
            web: '',
            ingress: '',
            logs: [
                {
                    call_duration: '0',
                    orig_dst_number: '9547652702',
                    orig_src_number: 'sipp',
                    orig_call_duration: '0',
                    orig_switch_ip: '158.69.203.19',
                    pdd: '0',
                    release_cause: 'Resource Loop Detected',
                    response_from_egress: '-',
                    response_to_ingress: '482:Loop Detected',
                    tax: '0',
                    time: '2016-11-20 17:31:14+00'
                },
                {
                    call_duration: '0',
                    orig_dst_number: '9547652702',
                    orig_src_number: 'sipp',
                    orig_call_duration: '0',
                    orig_switch_ip: '158.69.203.19',
                    pdd: '0',
                    release_cause: 'Resource Loop Detected',
                    response_from_egress: '-',
                    response_to_ingress: '482:Loop Detected',
                    tax: '0',
                    time: '2016-11-20 17:31:14+00'
                },
                {
                    call_duration: '0',
                    orig_dst_number: '9547652702',
                    orig_src_number: 'sipp',
                    orig_call_duration: '0',
                    orig_switch_ip: '158.69.203.19',
                    pdd: '0',
                    release_cause: 'Resource Loop Detected',
                    response_from_egress: '-',
                    response_to_ingress: '482:Loop Detected',
                    tax: '0',
                    time: '2016-11-20 17:31:14+00'
                },
                {
                    call_duration: '0',
                    orig_dst_number: '9547652702',
                    orig_src_number: 'sipp',
                    orig_call_duration: '0',
                    orig_switch_ip: '158.69.203.19',
                    pdd: '0',
                    release_cause: 'Resource Loop Detected',
                    response_from_egress: '-',
                    response_to_ingress: '482:Loop Detected',
                    tax: '0',
                    time: '2016-11-20 17:31:14+00'
                },
                {
                    call_duration: '0',
                    orig_dst_number: '9547652702',
                    orig_src_number: 'sipp',
                    orig_call_duration: '0',
                    orig_switch_ip: '158.69.203.19',
                    pdd: '0',
                    release_cause: 'Resource Loop Detected',
                    response_from_egress: '-',
                    response_to_ingress: '482:Loop Detected',
                    tax: '0',
                    time: '2016-11-20 17:31:14+00'
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
            options: [
                { id: 1, value: 'carrier1', text: 'Carrier 1' },
                { id: 2, value: 'carrier2', text: 'Carrier 2' },
                { id: 3, value: 'carrier3', text: 'Carrier 3' },
                { id: 4, value: 'carrier4', text: 'Carrier 4' },
                { id: 5, value: 'carrier5', text: 'Carrier 5' }
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
            loops: [],
            showModal: false,
            selected_ids: [],
			loop_table_column_options: [{
				value: 'Rule Name',
				label: 'Rule Name'
			}, {
				value: 'Counter Time (s)',
				label: 'Counter Time (s)'
			}, {
				value: 'Number',
				label: 'Number'
			}, {
				value: 'Block Time (s)',
				label: 'Block Time (s)'
			}, {
				value: 'Trunk Count',
				label: 'Trunk Count'
			}, {
				value: 'Action',
				label: 'Action'
			}],
			loop_table_columns: ['Rule Name', 'Counter Time (s)', 'Number',
				'Block Time (s)', 'Trunk Count', 'Action'],
			showcolumns: [true, true, true, true, true, true],
        }
    },
    methods: {
        ...mapActions({
            setAsyncConfirm: 'async_confirm/setAsyncConfirm',
            setMessage: 'app_message/setAppMessage'
        }),
		handleChange() {
			if (_.indexOf(this.loop_table_columns, 'Rule Name') != -1) {
				// this.showcolumns[0] = true;
				Vue.set(this.showcolumns, 0, true);
			}
			else {
				// this.showcolumns[0] = false;
				Vue.set(this.showcolumns, 0, false);
			}

			if (_.indexOf(this.loop_table_columns, 'Counter Time (s)') != -1) {
				// this.showcolumns[1] = true;
				Vue.set(this.showcolumns, 1, true);
			}
			else {
				// this.showcolumns[1] = false;
				Vue.set(this.showcolumns, 1, false);
			}

			if (_.indexOf(this.loop_table_columns, 'Number') != -1) {
				// this.showcolumns[2] = true;
				Vue.set(this.showcolumns, 2, true);
			}
			else {
				// this.showcolumns[2] = false;
				Vue.set(this.showcolumns, 2, false);
			}

			if (_.indexOf(this.loop_table_columns, 'Block Time (s)') != -1) {
				// this.showcolumns[3] = true;
				Vue.set(this.showcolumns, 3, true);
			}
			else {
				// this.showcolumns[3] = false;
				Vue.set(this.showcolumns, 3, false);
			}

			if (_.indexOf(this.loop_table_columns, 'Trunk Count') != -1) {
				// this.showcolumns[4] = true;
				Vue.set(this.showcolumns, 4, true);
			}
			else {
				// this.showcolumns[4] = false;
				Vue.set(this.showcolumns, 4, false);
			}

			if (_.indexOf(this.loop_table_columns, 'Action') != -1) {
				// this.showcolumns[5] = true;
				Vue.set(this.showcolumns, 5, true);
			}
			else {
				// this.showcolumns[5] = false;
				Vue.set(this.showcolumns, 5, false);
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
                var loopid = item;
                if (loopid == 0) {
                    vm.setMessage({
                        message:'The loop detection has been not selected!',
                        type:'error'
                    });
                }
                else {
                    vm.loading = true;
                    vm.resource = vm.$resource(api.getEndpointUrl() + '/v1/monitoring/loop_detection/' + loopid);
                    vm.resource.delete({ id: loopid }).then(function (response) {
                        vm.loading = false;
						let index = _.findIndex(vm.loops, elem => elem.id  === loopid)
						vm.loops.splice(index, 1)
						vm.setMessage('The loop detection have been deleted!')
                    });
                }
            });
        },
        delete_loop_detection: function (id) {
            this.showModal = true;
            this.selected_ids = [];
            this.selected_ids.push(id);
        },
        edit_loop_detection: function (id) {
            this.$router.push({ path: "/monitoring/loop_detection/edit/" + id });
        },
        fetchLoops() {
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
                    var loops = response.body.payload.items;
                    console.log(loops);
                    this.loops = loops;
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
                this.$nextTick(this.fetchLoops)
            }
        },
        changePageCount (countPerPage) {
            if (countPerPage !== this.pageOne.cntpage) {
                this.pageOne.cntpage = countPerPage
                this.$nextTick(this.fetchLoops)
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
        this.fetchLoops();
    }
}
</script>

<style>
.el-select__tags {
	display: none;
}
</style>
