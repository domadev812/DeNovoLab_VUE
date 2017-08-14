<template>
    <div class="container-fluid full-height">
        <div class="row full-height">
            <div class="wrapper single">
                <time-display></time-display>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Origination</a></li>
                    <li class="breadcrumb-item active">Users</li>
                </ol>
                <h1 class="page-header">Account Users</h1>
                <router-link to="/switch/voip_gateway/new" class="btn btn-primary mini">
                    <span class="dnl_icon dnl_add"></span> Add New User
                </router-link>
                <div class="white_pad table_wrap">
                    <div class="inline-block search_wrapper">
                        <label>Search:</label>
                        <br>
                        <input type="text" name="search" v-model="search" class="form-control inline-block search_field">
                    </div>
                    <router-link to="/switch/voip_gateway/new" class="btn btn-primary mini">
                        <span class="dnl_icon dnl_save"></span> Save CSV
                    </router-link>
                    <div id="page_row" class="table_filters text-right">
                        <div class="inline-block select_min_wrapper">
                            <span class="inline-block">Page row:</span>
                            <select2 :options="options1" v-model="selected_row" class="inline-block" @pagecount="changePageCount">
                            </select2>
                        </div>
                        <div class="inline-block">
                            <el-select v-model="ip_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
                                <el-option v-for="item in ip_table_column_options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div id="account_users_table" class="table-responsive">
                        <table class="table table-striped table-hover carrier_groups">
                            <thead>
                                <tr>
                                    <th v-if="showcolumns[0]">User Name <span class="dnl_icon dnl_sort pull-right"></span></th>
                                    <th v-if="showcolumns[1]">Company <span class="dnl_icon dnl_sort pull-right"></span></th>
                                    <th v-if="showcolumns[2]">Email <span class="dnl_icon dnl_sort pull-right"></span></th>
                                    <th v-if="showcolumns[3]">Status <span class="dnl_icon dnl_sort pull-right"></span></th>
                                    <th v-if="showcolumns[4]" class="width_98">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="ip in ips">
                                    <td v-if="showcolumns[0]">{{ip.user_name}}</td>
                                    <td v-if="showcolumns[1]">{{ip.company}}</td>
                                    <td v-if="showcolumns[2]">{{ip.email}}</td>
                                    <td v-if="showcolumns[3]">{{ip.status}}</td>
                                    <td v-if="showcolumns[4]">
                                        <a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit">
                                            <span class="dnl_icon dnl_action_edit"></span>
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
                selected_row: 1,
                search: '',
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
                ips: [{
                    user_name: 'Anne Kwong',
                    company: 'ICX',
                    email: 'anne@denovolab.com',
                    status: 'Active'
                }],
                ip_table_columns: ['User Name', 'Company', 'Email', 'Status', 'Action'
                ],
                ip_table_column_options: [{
                    value: 'User Name',
                    label: 'User Name'
                }, {
                    value: 'Company',
                    label: 'Company'
                }, {
                    value: 'Email',
                    label: 'Email'
                }, {
                    value: 'Status',
                    label: 'Status'
                }, {
                    value: 'Action',
                    label: 'Action'
                }],
                showcolumns: [true, true, true, true, true],
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
    #page_row{
        width: 500px;
        float: right;
        margin-top: 28px;
    }
    #account_users_table{
        margin-top:22px
    }
</style>
