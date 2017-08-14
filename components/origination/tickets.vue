<template>
    <div class="container-fluid full-height">
        <div class="row full-height">
            <div class="wrapper single">
                <time-display></time-display>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Origination</a></li>
                    <li class="breadcrumb-item active">Tickets</li>
                </ol>
                <h1 class="page-header">Tickets</h1>
                <router-link to="/switch/voip_gateway/new" class="btn btn-primary mini">
                    <span class="dnl_icon dnl_add"></span> Create Ticket
                </router-link>
                <div class="white_pad table_wrap">
                    <div class="table-responsive">
                        <table class="table table-striped table-hover carrier_groups">
                            <thead>
                                <tr>
                                    <th v-if="showcolumns[0]">User Name</th>
                                    <th v-if="showcolumns[1]">Company</th>
                                    <th v-if="showcolumns[2]">Email</th>
                                    <th v-if="showcolumns[3]">Status</th>
                                    <th v-if="showcolumns[4]">Action</th>
                                    <th v-if="showcolumns[5]">Status</th>
                                    <th v-if="showcolumns[6]" class="width_98">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="ip in ips">
                                    <td v-if="showcolumns[0]">{{ip.ticket_id}}</td>
                                    <td v-if="showcolumns[1]">{{ip.date_created}}</td>
                                    <td v-if="showcolumns[2]">{{ip.ticket_subject}}</td>
                                    <td v-if="showcolumns[3]">{{ip.department}}</td>
                                    <td v-if="showcolumns[4]">{{ip.date_modified}}</td>
                                    <td v-if="showcolumns[5]">
                                        <div class="inline-block select_min_wrapper">
                                            <select2 :options="ip.options" v-model="ip.select" class="inline-block" @pagecount="changePageCount"></select2>
                                        </div>
                                    </td>
                                    <td v-if="showcolumns[6]">
                                        <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete">
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
       const    vSelect = require('vue!../main_components/select.vue'),
                Pagination = require('vue!../main_components/pagination.vue'),
                modal = require('vue!../main_components/modal.vue'),
                confirmmodal = require('vue!../main_components/confirm_delete.vue');
                const api = require("../../api");
                const auth = require("../../auth");
       module.exports = {
        components: {
            'select2': vSelect,
            'pagination': Pagination,
            'confirm': confirmmodal,
            'modal': modal
        },
        data: function() {
            return {
                pageOne: {
                    currentPage: 1,
                    totalPages: 10,
                    cntpage: 10
                },
                selected1: 1,
                selected2: 1,
                selected3: 1,
                ips: [{
                    ticket_id: '263434',
                    date_created: '2016-05-02 04:35:13',
                    ticket_subject: 'API for Toll free numbers',
                    department: 'Technical Status',
                    date_modified: '2016-08-07 04:35:13',
                    select: 'selected1',
                    options: [{
                            id: 1,
                            text: 'Open'
                        },
                        {
                            id: 2,
                            text: 'Close'
                        }
                    ]
                },
                {
                    ticket_id: '953328',
                    date_created: '2016-05-02 04:35:13',
                    ticket_subject: 'API for Toll free numbers',
                    department: 'Technical Status',
                    date_modified: '2016-08-07 04:35:13',
                    select: 'selected2',
                    options: [{
                         id: 1,
                         text: 'Resolved'
                     },
                     {
                         id: 2,
                         text: 'Unresolved'
                     }
                 ],
                },
                {
                    ticket_id: '582096',
                    date_created: '2016-05-02 04:35:13',
                    ticket_subject: 'API for Toll free numbers',
                    department: 'Technical Status',
                    date_modified: '2016-08-07 04:35:13',
                    select: 'selected3',
                    options: [{
                         id: 1,
                         text: 'Resolved'
                     },
                     {
                         id: 2,
                         text: 'Unresolved'
                     }
                 ],
                }],
                ip_table_columns: ['User Name', 'Company', 'Email',
                    'Status', 'Action', 'Status', 'Action'
                ],
                showcolumns: [true, true, true, true, true, true, true],
            }
        },
        methods: {
            edit_ip: function(id) {
                this.$router.push({
                    path: "/switch/voip_gateway/edit/" + id
                });
            },
            handleChange() {
                if (_.indexOf(this.ip_table_columns, 'User Name') != -1) {
                    Vue.set(this.showcolumns, 0, true);
                } else {
                    Vue.set(this.showcolumns, 0, false);
                }
                if (_.indexOf(this.ip_table_columns, 'Company') != -1) {
                    Vue.set(this.showcolumns, 1, true);
                } else {
                    Vue.set(this.showcolumns, 1, false);
                }
                if (_.indexOf(this.ip_table_columns, 'Email') != -1) {
                    Vue.set(this.showcolumns, 2, true);
                } else {
                    Vue.set(this.showcolumns, 2, false);
                }
                if (_.indexOf(this.ip_table_columns, 'Status') != -1) {
                    Vue.set(this.showcolumns, 3, true);
                } else {
                    Vue.set(this.showcolumns, 3, false);
                }
                if (_.indexOf(this.ip_table_columns, 'Action') != -1) {
                    Vue.set(this.showcolumns, 4, true);
                } else {
                    Vue.set(this.showcolumns, 4, false);
                }
                if (_.indexOf(this.ip_table_columns, 'Status') != -1) {
                    Vue.set(this.showcolumns, 5, true);
                } else {
                    Vue.set(this.showcolumns, 5, false);
                }
                if (_.indexOf(this.ip_table_columns, 'Action') != -1) {
                    Vue.set(this.showcolumns, 6, true);
                } else {
                    Vue.set(this.showcolumns, 6, false);
                }
                console.log(this.showcolumns);
            },
            pageOneChanged(pageNum) {
                if (pageNum !== this.pageOne.currentPage) {
                    this.pageOne.currentPage = pageNum
                    this.$nextTick(this.fetchGateways)
                }
            },
            changePageCount (countPerPage) {
                if (countPerPage !== this.pageOne.cntpage) {
                    this.pageOne.cntpage = countPerPage
                    this.$nextTick(this.fetchGateways)
                }
            }
        },
        mounted: function() {
            $('[data-toggle="tooltip"]').tooltip();
        },
        updated: function() {
            document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
        },
        created: function() {
        }
       }
</script>
<style>
    #app {
        height: 100%;
    }
    .full-height {
       height: 100%;
    }
</style>
