<template>
    <div class="container-fluid">
        <div class="row">
            <div class="wrapper single">
                <time-display></time-display>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="#">Switch</a>
                    </li>
                    <li class="breadcrumb-item active">Payment Term</li>
                </ol>
                <h1 class="page-header">Payment Term</h1>
                <confirm v-show="showModal" @close="showModal = false" @submit="submit"></confirm>
                <div class="white_pad table_wrap">
                    <div class="advanced_search_filter_panel bottom_0">
                        <div class="inline-block search_wrapper">
                            <label>Search:</label>
                            <br>
                            <input type="text" name="code" v-model="code" class="form-control inline-block search_field" placeholder="Enter Search">
                            <span class="dnl_icon dnl_musica-searcher"></span>
                        </div>
                    </div>
                    <div class="clearfix little-space">
                        <router-link to="/switch/payment_term/new" class="btn btn-primary mini pull-right">
                            <span class="dnl_icon dnl_add"></span> Create new
                        </router-link>
                    </div>
                    <div class="pull-right pagination top_pagination">
                        <pagination :current-page="pageOne.currentPage" :total-pages="pageOne.totalPages" @page-changed="pageOneChanged">
                        </pagination>
                    </div>
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
                            <el-select v-model="payment_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
                                <el-option v-for="item in payment_table_column_options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="table-responsive">
                        <spinner v-show="loading" class="spinner"></spinner>
                        <div v-show="loading" class="mask"></div>
                        <table class="table table-striped table-hover aliases">
                            <thead>
                                <tr>
                                    <th v-if="showcolumns[0]">Payment Term<a @click="sortName"><span class="dnl_icon dnl_sort pull-right"></span></a></th>
                                    <th v-if="showcolumns[1]" class="text-center">Invoicing Cycle</th>
                                    <th v-if="showcolumns[2]">Grace Period(Days)<a @click="sortPeriod"><span class="dnl_icon dnl_sort pull-right"></span></a></th>
                                    <th v-if="showcolumns[3]">Notify(Days)<a @click="sortNotify"><span class="dnl_icon dnl_sort pull-right"></span></a></th>
                                    <th v-if="showcolumns[4]">Usage Count<a @click="sortCount"><span class="dnl_icon dnl_sort pull-right"></span></a></th>
                                    <th v-if="showcolumns[5]" class="width-78">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="!payments.length">
                                    <td style="text-align: center" colspan="6">No Data Found</td>
                                </tr>										
                                
                                <tr v-for="payment in filterBy(payments, code)">
                                    <td v-if="showcolumns[0]" class="text-center">
                                        {{payment.name}}
                                    </td>
                                    <td v-if="showcolumns[1]" class="text-center">
                                        {{setInvoicingCycle(payment.type,payment.days)}}
                                    </td>
                                    <td v-if="showcolumns[2]">
                                        {{payment.grace_period}}
                                    </td>
                                    <td v-if="showcolumns[3]">
                                        {{payment.notify_days}}
                                    </td>
                                    <td v-if="showcolumns[4]">
                                        <router-link to="/management/carrier" class="blue_link">{{payment.usage_count}}</router-link>
                                    </td>
                                    <td v-if="showcolumns[5]">
                                        <a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" v-on:click="editPayment(payment.payment_term_id)">
                                            <span class="dnl_icon dnl_action_edit"></span>
                                        </a>
                                        <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="deletePayment(payment.payment_term_id)">
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const vSelect = require('vue!../main_components/select.vue'),
        Pagination = require('vue!../main_components/pagination.vue'),
        vTabs = require('vue!../main_components/tabs.vue'),
        vTab = require('vue!../main_components/tab.vue'),
        vSpinner = require('vue!../main_components/fadeloader.vue'),
        api = require("../../api"),
        auth = require("../../auth"),
        confirmmodal = require('vue!../main_components/confirm_delete.vue'),
        Dropzone = require('vue!../main_components/dropzone.vue');
        import _ from 'lodash'
        import {
            mapActions
        } from 'vuex'
    module.exports = {
        components: {
            'confirm': confirmmodal,
            'spinner': vSpinner,
            'select2': vSelect,
            'pagination': Pagination,
            'tabs': vTabs,
            'tab': vTab,
            Dropzone
        },
        data: function() {
            return {
                order: 'payment_term_id',
				sort: 'desc',

                name_sort: 'asc',
                period_sort: 'asc',
                notify_sort: 'asc',
                count_sort: 'asc',
                
                code: '',
                loading: false,
                pageOne: {
                    currentPage: 1,
                    totalPages: 10,
                    cntpage: 10
                },
                showModal: false,
                selected_id: 0,
                selected1: 1,
                options1: [{
                        id: 1,
                        text: '10'
                    },
                    {
                        id: 2,
                        text: '20'
                    },
                    {
                        id: 3,
                        text: '30'
                    },
                    {
                        id: 4,
                        text: '50'
                    },
                    {
                        id: 5,
                        text: '100'
                    }
                ],
                selected2: '',
                options2: [{
                        id: 1,
                        text: 'Alias'
                    },
                    {
                        id: 2,
                        text: 'Active'
                    },
                    {
                        id: 3,
                        text: 'Actions'
                    }
                ],
                payments: [],
                payment_table_column_options: [{
                    value: 'Payment Term',
                    label: 'Payment Term'
                }, {
                    value: 'Invoicing Cycle',
                    label: 'Invoicing Cycle'
                }, {
                    value: 'Grace Period(Days)',
                    label: 'Grace Period(Days)'
                }, {
                    value: 'Notify(Days)',
                    label: 'Notify(Days)'
                }, {
                    value: 'Usage Count',
                    label: 'Usage Count'
                }, {
                    value: 'Action',
                    label: 'Action'
                }],
                payment_table_columns: ['Payment Term', 'Invoicing Cycle', 'Grace Period(Days)',
                    'Notify(Days)', 'Usage Count', 'Action'
                ],
                showcolumns: [true, true, true, true, true, true],
            }
        },
        watch: {
            "selected1": function(value) {
                var value = this.options1[value];
                this.pageOne.cntpage = parseInt(value);
            }
        },
        created: function() {
            this.fetchTerms();
        },
        methods: {
            ...mapActions({
                setMessage: 'app_message/setAppMessage'
            }),
            sortName() {
                if(this.name_sort == 'asc') {
					this.name_sort = 'desc'
					this.sort = this.name_sort
					this.order = 'name'
					this.fetchTerms()
				}
					
				else if(this.name_sort == 'desc') {
					this.name_sort = 'asc'
					this.sort = this.name_sort
					this.order = 'name'
					this.fetchTerms()
				}
            },
            sortPeriod() {
                if(this.period_sort == 'asc') {
					this.period_sort = 'desc'
					this.sort = this.period_sort
					this.order = 'grace_period'
					this.fetchTerms()
				}
					
				else if(this.period_sort == 'desc') {
					this.period_sort = 'asc'
					this.sort = this.period_sort
					this.order = 'grace_period'
					this.fetchTerms()
				}
            },
            sortNotify() {
                if(this.notify_sort == 'asc') {
					this.notify_sort = 'desc'
					this.sort = this.notify_sort
					this.order = 'notify_days'
					this.fetchTerms()
				}
					
				else if(this.notify_sort == 'desc') {
					this.notify_sort = 'asc'
					this.sort = this.notify_sort
					this.order = 'notify_days'
					this.fetchTerms()
				}
            },
            sortCount() {
                if(this.count_sort == 'asc') {
					this.count_sort = 'desc'
					this.sort = this.count_sort
					this.order = 'usage_count'
					this.fetchTerms()
				}
					
				else if(this.count_sort == 'desc') {
					this.count_sort = 'asc'
					this.sort = this.count_sort
					this.order = 'usage_count'
					this.fetchTerms()
				}
            },
            handleChange() {
                if (_.indexOf(this.payment_table_columns, 'Payment Term') != -1) {
                    // this.showcolumns[0] = true;
                    Vue.set(this.showcolumns, 0, true);
                } else {
                    // this.showcolumns[0] = false;
                    Vue.set(this.showcolumns, 0, false);
                }
                if (_.indexOf(this.payment_table_columns, 'Invoicing Cycle') != -1) {
                    // this.showcolumns[1] = true;
                    Vue.set(this.showcolumns, 1, true);
                } else {
                    // this.showcolumns[1] = false;
                    Vue.set(this.showcolumns, 1, false);
                }
                if (_.indexOf(this.payment_table_columns, 'Grace Period(Days)') != -1) {
                    // this.showcolumns[2] = true;
                    Vue.set(this.showcolumns, 2, true);
                } else {
                    // this.showcolumns[2] = false;
                    Vue.set(this.showcolumns, 2, false);
                }
                if (_.indexOf(this.payment_table_columns, 'Notify(Days)') != -1) {
                    // this.showcolumns[3] = true;
                    Vue.set(this.showcolumns, 3, true);
                } else {
                    // this.showcolumns[3] = false;
                    Vue.set(this.showcolumns, 3, false);
                }
                if (_.indexOf(this.payment_table_columns, 'Usage Count') != -1) {
                    // this.showcolumns[4] = true;
                    Vue.set(this.showcolumns, 4, true);
                } else {
                    // this.showcolumns[4] = false;
                    Vue.set(this.showcolumns, 4, false);
                }
                if (_.indexOf(this.payment_table_columns, 'Action') != -1) {
                    // this.showcolumns[5] = true;
                    Vue.set(this.showcolumns, 5, true);
                } else {
                    // this.showcolumns[5] = false;
                    Vue.set(this.showcolumns, 5, false);
                }
                console.log(this.showcolumns);
                // this.$nextTick(() => {
                // 	document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
                // });
            },
            closeModal: function() {
                this.showModal = '';
            },
            fetchTerms() {
                this.loading = true;
                var page = this.pageOne.currentPage - 1;
                var per_page = this.pageOne.cntpage;
                var order = this.order;
                var sort = this.sort;
                this.$http.get(api.getEndpointUrl() + '/v1/config/payment_term/list' + "?page=" + page + "&per_page=" + per_page + "&order_by="+order+"&order_dir="+sort, {
                    headers: {
                        "X-Auth-Token": auth.getToken()
                    }
                }).then(function(response) {
                    this.loading = false;
                    //todo: check success flag? validation errors?
                    var payments = response.body.payload.items;
                    this.payments = payments;
                    var total_page = response.body.payload.total;
                    this.pageOne.currentPage = response.body.payload.page + 1;
                    this.pageOne.totalPages = Math.ceil(response.body.payload.total / this.pageOne.cntpage);
                    console.log("total pages => " + this.pageOne.totalPages);
                }, function(error) {
                    this.loading = false;
                    console.log(error);
                });
            },
			pageOneChanged(pageNum) {
				if (pageNum !== this.pageOne.currentPage) {
					this.pageOne.currentPage = pageNum
					this.$nextTick(this.fetchTerms)
				}
			},
			changePageCount (countPerPage) {
				if (countPerPage !== this.pageOne.cntpage) {
					this.pageOne.cntpage = countPerPage
					this.$nextTick(this.fetchTerms)
				}
			},
            deletePayment(id) {
                this.showModal = true;
                this.selected_id = id;
            },
            editPayment(id) {
                this.$router.push({
                    path: "/switch/payment_term/edit/" + id
                });
            },
            getWeekDay(day) {
                var week = "";
                switch (day) {
                    case 1:
                        week = "Monday";
                        break;
                    case 2:
                        week = "Tuesday";
                        break;
                    case 3:
                        week = "Wednesday";
                        break;
                    case 4:
                        week = "Thursday";
                        break;
                    case 5:
                        week = "Friday";
                        break;
                    case 6:
                        week = "Saturday";
                        break;
                    case 7:
                        week = "Sunday";
                        break;
                }
                return week;
            },
            setInvoicingCycle(type, days) {
                var str = "";
                switch (type) {
                    case "Every":
                        str += "Every " + days.toString() + "day(s)";
                        break;
                    case "Day of Month":
                        str += "Day of Month " + days.toString() + "th of the month";
                        break;
                    case "Day of Week":
                        str += "Day of Week " + this.getWeekDay(days) + "of the week";
                        break;
                    case "Some day of month":
                        str += "Some day of month " + days.toString() + "th of the month";
                        break;
                    case "Twice a month":
                        str += "Twice a month (15th and last day)";
                        break;
                }
                return str;
            },
            submit() {
                this.loading = true;
                this.showModal = false;
                var vm = this;
                this.$http.delete(api.getEndpointUrl() + '/v1/config/payment_term/' + this.selected_id, {
                    headers: {
                        "X-Auth-Token": auth.getToken()
                    }
                }).then(
                    function(response) {
                        this.loading = false;
                        let index = _.findIndex(this.payments, elem => elem.payment_term_id === this.selected_id)
                        this.payments.splice(index, 1)
                        this.setMessage('The paymnet term has been deleted!')
                    },
                    function(response) {
                        this.loading = false;
                    }
                )
            }
        },
        mounted: function() {
            $('[data-toggle="tooltip"]').tooltip();
        },
        updated: function() {
            document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
        },
    }
</script>

<style>
    .tab span.dnl_icon.dnl_import {
        font-size: 20px;
        float: left;
        margin-right: 6px;
    }
    .tab span.dnl_icon.dnl_export {
        font-size: 24px;
        float: left;
        margin-right: 6px;
    }
    .el-select__tags {
        display: none;
    }
    .text-center {
        text-align: center !important;
    }
</style>