<template>
    <div class="container-fluid">
        <div class="row">
            <div class="wrapper single">
                <time-display></time-display>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="#">Routing</a>
                    </li>
                    <li class="breadcrumb-item">
                        <router-link to="/routing/routing_plan">Routing Plan</router-link>
                    </li>
                    <li class="breadcrumb-item active">Routing Plan Details</li>
                </ol>
                <h1 class="page-header">Routing Plan Details</h1>
                <confirm v-show="showModal" @close="showModal = false" @submit="submit"></confirm>
                <router-link to="/routing/routing_plan/" class="btn btn_white back">
                    <span class="dnl_icon dnl_import"></span> Back
                </router-link>
                <tabs>
                    <tab label="Route List" class="" icon="dnl_icon dnl_list" selected>
                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-default inline_fixer" @click="showModal='add_route'">
                                <span class="dnl_icon dnl_add"></span> Create New
                            </button>
                            <button type="button" class="btn btn-default" v-on:click="deleteAll">
                                <span class="dnl_icon dnl_action_delete"></span> Delete All
                            </button>
                            <button type="button" class="btn btn-default" v-on:click="deleteSelected">
                                <span class="dnl_icon dnl_action_delete"></span> Delete Selected
                            </button>
                        </div>
                        <div class="advanced_search_filter_panel bottom_0">
                            <div class="inline-block search_wrapper">
                                <label>Search:</label>
                                <br>
                                <input type="text" name="code" v-model="code" class="form-control inline-block search_field" placeholder="Enter Search">
                                <span class="dnl_icon dnl_musica-searcher"></span>
                            </div>
                        </div>
                        <div class="clearfix little-space"></div>
                        <div class="table_filters">
                            <div class="inline-block select_min_wrapper">
                                <span class="inline-block">Page row:</span>
                                <select2 :options="options1" v-model="selected1" class="inline-block" @pagecount="changePageCount">
                                </select2>
                            </div>
                            <div class="inline-block">
                                <!--<select2 :options="options2" v-model="selected2">
                                            <option disabled value="0">Show/Hide Columns</option>
                                        </select2>-->
                                <el-select v-model="route_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
                                    <el-option v-for="item in route_table_column_options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <div class="table-responsive">
                            <table class="table table-striped table-hover aliases">
                                <thead>
                                    <tr>
                                        <th rowspan="2" colspan="1" class="width-65">
                                            <div class="checkbox checkbox-success">
                                                <input id="select_all" name="select_all" type="checkbox" v-model="checker" v-on:click="clickSelectedAll">
                                                <label for="select_all"></label>
                                            </div>
                                        </th>
                                        <th v-if="showcolumns[0]" rowspan="2" colspan="1">ID</th>
                                        <th v-if="showcolumns[1]" rowspan="1" colspan="2">Match Prefix</th>
                                        <th v-if="showcolumns[2]" rowspan="2" colspan="1">Route Type</th>
                                        <th v-if="showcolumns[3]" rowspan="1" colspan="2">Routing</th>
                                        <th v-if="showcolumns[4]" rowspan="1" colspan="2">ANI Length</th>
                                        <th v-if="showcolumns[5]" rowspan="1" colspan="2">DNIS Length</th>
                                        <th v-if="showcolumns[6]" rowspan="2" colspan="1">Update At</th>
                                        <th v-if="showcolumns[7]" rowspan="2" colspan="1">Update By</th>
                                        <th v-if="showcolumns[8]" rowspan="2" colspan="1">Action</th>
                                    </tr>
                                    <tr>
                                        <th v-if="showcolumns[1]" rowspan="1" colspan="1">ANI</th>
                                        <th v-if="showcolumns[1]" rowspan="1" colspan="1">DNIS</th>
                                        <th v-if="showcolumns[3]" rowspan="1" colspan="1">Static</th>
                                        <th v-if="showcolumns[3]" rowspan="1" colspan="1">Dynamic</th>
                                        <!--<th v-if="showcolumns[3]" rowspan="1" colspan="1">Intra</th>
                                        <th v-if="showcolumns[3]" rowspan="1" colspan="1">Inter</th>-->
                                        <th v-if="showcolumns[4]" rowspan="1" colspan="1">Min</th>
                                        <th v-if="showcolumns[4]" rowspan="1" colspan="1">Max</th>
                                        <th v-if="showcolumns[5]" rowspan="1" colspan="1">Min</th>
                                        <th v-if="showcolumns[5]" rowspan="1" colspan="1">Max</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="!filterBy(lists, code).length">
                                        <td style="text-align: center" colspan="15">No Data Found</td>
                                    </tr>										
                                    
                                    <tr v-for="list in filterBy(lists, code)">
                                        <td class="centred_checkbox">
                                            <div class="checkbox checkbox-success">
                                                <input v-bind:id="'selected-' + index" v-bind:name="'selected-' + index" type="checkbox" v-model="list.selected">
                                                <label v-bind:for="'selected-' + index"></label>
                                            </div>
                                        </td>
                                        <td v-if="showcolumns[0]">{{list.route_id}}</td>
                                        <td v-if="showcolumns[1]">{{list.ANI_prefix}}</td>
                                        <td v-if="showcolumns[1]">{{list.DNIS_prefix}}</td>
                                        <td v-if="showcolumns[2]">{{list.route_type}}</td>
                                        <td v-if="showcolumns[3]">{{list.static_route_name}}</td>
                                        <td v-if="showcolumns[3]">{{list.dynamic_route_name}}</td>
                                        <!--<td v-if="showcolumns[3]"></td>
                                        <td v-if="showcolumns[3]"></td>-->
                                        <td v-if="showcolumns[4]">{{list.ANI_min}}</td>
                                        <td v-if="showcolumns[4]">{{list.ANI_max}}</td>
                                        <td v-if="showcolumns[5]">{{list.DNIS_min}}</td>
                                        <td v-if="showcolumns[5]">{{list.DNIS_max}}</td>
                                        <td v-if="showcolumns[6]">{{list.update_at}}</td>
                                        <td v-if="showcolumns[7]">{{list.update_by}}</td>
                                        <td v-if="showcolumns[8]">
                                            <a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" @click="editRoute(list)">
                                                <span class="dnl_icon dnl_action_edit"></span>
                                            </a>
                                            <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="deleteRoute(list.route_id)">
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
                    <tab label="Import" class="" icon="dnl_icon dnl_import">
                        <div class="row">
                            <div class="col-md-3 col-sm-4">
                                <label>Import File:</label>
                                <dropzone id="myVueDropzone" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
                            </div>
                            <div class="col-md-3 col-sm-4">
                                <label>Method:</label>
                                <div class="form-group">
                                    <div class="radio radio-success">
                                        <input id="radio-1" class="radio-custom" name="duplicates" type="radio" checked>
                                        <label for="radio-1" class="radio-custom-label">Ignore</label>
                                    </div>
                                </div>
                                <div class="form-group m-top-minus-25">
                                    <div class="radio radio-success">
                                        <input id="radio-2" class="radio-custom" name="duplicates" type="radio">
                                        <label for="radio-2" class="radio-custom-label">Delete</label>
                                    </div>
                                </div>
                                <div class="button_set little-space">
                                    <a class="btn btn-primary mini">
                                        Show Example
                                    </a>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                        <div class="button_set">
                            <a class="btn btn-primary mini">
                                Upload
                            </a>
                        </div>
                    </tab>
                    <tab label="Export" class="" icon="dnl_icon dnl_export">
                        <div class="row">
                            <div class="col-md-3 col-sm-4">
                                <div class="form-group full-width-select">
                                    <label for="username">Data Format:</label>
                                    <select2 :options="options1" v-model="data_format"></select2>
                                </div>
                                <div class="form-group m-top-33">
                                    <div class="checkbox checkbox-success">
                                        <input id="status" name="enable_rep_grouping" type="checkbox">
                                        <label for="enable_rep_grouping">With headers row</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-4">
                                <div class="form-group">
                                    <label>Header Text:</label>
                                    <textarea v-model="header_text" class="form-control" placeholder="Enter Header Text" />
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-4">
                                <div class="form-group">
                                    <label>Footer Text:</label>
                                    <textarea v-model="footer_text" class="form-control" placeholder="Enter Footer Text" />
                                </div>
                            </div>
                            <div class="clearfix little-space"></div>
                            <div class="col-md-3 col-sm-3">
                                <div class="form-group full-width-select">
                                    <label for="username">Column #1:</label>
                                    <select2 :options="options1" v-model="column_1"></select2>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-3">
                                <div class="form-group full-width-select">
                                    <label for="username">Column #2:</label>
                                    <select2 :options="options1" v-model="column_2"></select2>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-3">
                                <div class="form-group full-width-select">
                                    <label for="username">Column #3:</label>
                                    <select2 :options="options1" v-model="column_3"></select2>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-3">
                                <div class="form-group full-width-select">
                                    <label for="username">Column #4:</label>
                                    <select2 :options="options1" v-model="column_4"></select2>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-3">
                                <div class="form-group full-width-select">
                                    <label for="username">Column #5:</label>
                                    <select2 :options="options1" v-model="column_5"></select2>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-3">
                                <div class="form-group full-width-select">
                                    <label for="username">Column #6:</label>
                                    <select2 :options="options1" v-model="column_6"></select2>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-3">
                                <div class="form-group full-width-select">
                                    <label for="username">Column #7:</label>
                                    <select2 :options="options1" v-model="column_7"></select2>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-3">
                                <div class="form-group full-width-select">
                                    <label for="username">Column #8:</label>
                                    <select2 :options="options1" v-model="column_8"></select2>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-3">
                                <div class="form-group full-width-select">
                                    <label for="username">Column #9:</label>
                                    <select2 :options="options1" v-model="column_9"></select2>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-3">
                                <div class="form-group full-width-select">
                                    <label for="username">Column #10:</label>
                                    <select2 :options="options1" v-model="column_10"></select2>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-3">
                                <div class="form-group full-width-select">
                                    <label for="username">Column #11:</label>
                                    <select2 :options="options1" v-model="column_11"></select2>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-3">
                                <div class="form-group full-width-select">
                                    <label for="username">Column #12:</label>
                                    <select2 :options="options1" v-model="column_12"></select2>
                                </div>
                            </div>
                        </div>
                        <div class="button_set center-block text-center">
                            <a class="btn btn-primary mini" v-on:click="exportCSV()">
                                Download
                            </a>
                        </div>
                    </tab>
                </tabs>
            </div>
        </div>
        <modal v-if="showModal=='add_route' || showModal=='edit_route'" @close="showModal = ''" class="big_modal">
            <h3 slot="header" v-if="showModal=='add_route'">Add New Route</h3>
            <h3 slot="header" v-if="showModal=='edit_route'">Edit Route</h3>
            <div slot="body">
                <form class="form" @submit.prevent="validateBeforeSubmit">
                    <div class="row">
                        <div class="col-md-6 col-sm-6">
                            <div class="form-group">
                                <label for="ani_prefix">ANI Prefix:</label>
                                <input type="text" name="ani_prefix" v-model="ani_prefix" class="form-control" placeholder="Enter ANI Prefix">
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <div class="form-group">
                                <label for="dnis_prefix">DNIS Prefix:</label>
                                <input type="text" name="dnis_prefix" v-model="dnis_prefix" class="form-control" placeholder="Enter DNIS Prefix">
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <label for="ani_min_length">Route Type:</label>
                            <!--<select2 :options="route_types" v-model="route_type">
                                    <option disabled value="0">Show/Hide Columns</option>
                                </select2>-->
                            <select class="selectable" v-model="route_type">
                                <option v-for="option in route_types" v-bind:value="option.id">
                                    {{ option.text }}
                                </option>
                            </select>
                        </div>
                        <div class="clearfix little-space"></div>
                        <div v-if="getRouteType()==1 || getRouteType()==3" class="col-md-6 col-sm-6">
                            <label for="dynamic_routing_length">Dynamic Routing:</label>
                            <select class="selectable" v-model="dynamic_routing">
                                <option v-for="option in dynamic_lists" v-bind:value="option.id">
                                    {{ option.text }}
                                </option>
                            </select>
                        </div>
                        <div v-if="getRouteType()==2 || getRouteType()==3" class="col-md-6 col-sm-6">
                            <label for="static_routing_length">Static Routing:</label>
                            <select class="selectable" v-model="static_routing">
                                <option v-for="option in static_lists" v-bind:value="option.id">
                                    {{ option.text }}
                                </option>
                            </select>
                        </div>
                        <div class="clearfix little-space"></div>
                        <div class="col-md-6 col-sm-6">
                            <div class="form-group">
                                <label for="ani_min_length">ANI Min Length:</label>
                                <input type="text" name="ani_min_length" v-model="ani_min_length" class="form-control" placeholder="Enter ANI Min Length">
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <div class="form-group">
                                <label for="ani_max_length">ANI Max Length:</label>
                                <input type="text" name="ani_max_length" v-model="ani_max_length" class="form-control" placeholder="Enter ANI Max Length">
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <div class="form-group">
                                <label for="dnis_min_length">DNIS Min Length:</label>
                                <input type="text" name="dnis_min_length" v-model="dnis_min_length" class="form-control" placeholder="Enter DNIS Min Length">
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <div class="form-group">
                                <label for="dnis_max_length">DNIS Max Length:</label>
                                <input type="text" name="dnis_max_length" v-model="dnis_max_length" class="form-control" placeholder="Enter DNIS Max Length">
                            </div>
                        </div>
                    </div>
                    <div>
                        <button type="submit" class="btn btn-primary submit mini">Submit</button>
                        <button @click="closeModal" class="btn btn-default cancel mini">Cancel</button>
                    </div>
                </form>
            </div>
            <div slot="footer">
            </div>
        </modal>
    </div>
</template>

<script>   
const vSelect = require('vue!../main_components/select.vue'),
    Pagination = require('vue!../main_components/pagination.vue'),
    vTabs = require('vue!../main_components/tabs.vue'),
    vTab = require('vue!../main_components/tab.vue'),
    Dropzone = require('vue!../main_components/dropzone.vue'),
    modal = require('vue!../main_components/modal.vue'),
    confirmmodal = require('vue!../main_components/confirm_delete.vue'),
    api = require("../../api"),
    auth = require("../../auth");
    _ = require('lodash');
    import { mapActions } from 'vuex'
module.exports = {
    computed: {
    },
    created: function () {
        this.loading = true;
        this.$http.get(api.getEndpointUrl() + "/v1/route/dynamic/list",
            {
                headers: {
                    "X-Auth-Token": auth.getToken()
                }
            }).then(function (response) {
                var self = this;
                this.loading = false;
                var items = response.body.payload.items;
                items.forEach(function (item, i) {
                    var route = {};
                    route.id = item.dynamic_route_id;
                    route.text = item.name;
                    self.dynamic_lists.push(route);
                });
                console.log("dynamic_lists");
                console.log(this.dynamic_lists);
            }, function (error) {
                this.loading = false;
                console.log(error);
            });

        this.loading = true;
        this.$http.get(api.getEndpointUrl() + "/v1/route/static/list",
            {
                headers: {
                    "X-Auth-Token": auth.getToken()
                }
            }).then(function (response) {
                var self = this;
                this.loading = false;
                var items = response.body.payload.items;
                items.forEach(function (item, i) {
                    var route = {};
                    route.id = item.static_route_id;
                    route.text = item.name;
                    self.static_lists.push(route);
                });
                console.log("static_lists");
                console.log(this.static_lists);
            }, function (error) {
                this.loading = false;
                console.log(error);
            });

        this.fetchPlans();
    },
    components: {
        'select2': vSelect,
        'pagination': Pagination,
        'tabs': vTabs,
        'tab': vTab,
        'modal': modal,
        'confirm': confirmmodal,
        Dropzone
    },
    data: function () {
        return {
            code: '',
            checker: false,
            showModal: '',

            dynamic_routing: 0,
            static_routing: 0,
            route_type: "dynamic routing",
            ani_prefix: '',
            dnis_prefix: '',
            ani_min_length: 0,
            ani_max_length: 0,
            dnis_min_length: 0,
            dnis_max_length: 0,

            start_date: '',
            end_date: '',
            ftp_config_name: '',
            data_format: '',
            header_text: '',
            footer_text: '',
            column_1: '',
            column_2: '',
            column_3: '',
            column_4: '',
            column_5: '',
            column_6: '',
            column_7: '',
            column_8: '',
            column_9: '',
            column_10: '',
            column_11: '',
            column_12: '',

            pageOne: {
                currentPage: 1,
                totalPages: 10,
                cntpage: 10
            },
            selected1: 1,
            options1: [
                { id: 1, text: '10' },
                { id: 2, text: '20' },
                { id: 3, text: '30' },
                { id: 4, text: '50' },
                { id: 5, text: '100' }
            ],
            selected2: '',
            options2: [
                { id: 1, text: 'Alias' },
                { id: 2, text: 'Active' },
                { id: 3, text: 'Actions' }
            ],
            file_breakdown: 2,
            file_options: [
                { id: 1, text: 'As one big file' },
                { id: 2, text: 'As hourly file' },
                { id: 3, text: 'As daily file' },
            ],
            time_zone: 12,
            time_zone_options: [
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
            lists: [],
            codes: [
                {
                    code_prefix: '23',
                    updated_on: '2017-02-23 07:49:51+00',
                    created_by: 'Admin'
                },
                {
                    code_prefix: '23',
                    updated_on: '2017-02-23 07:49:51+00',
                    created_by: 'Admin'
                },
                {
                    code_prefix: '23',
                    updated_on: '2017-02-23 07:49:51+00',
                    created_by: 'Admin'
                },
                {
                    code_prefix: '23',
                    updated_on: '2017-02-23 07:49:51+00',
                    created_by: 'Admin'
                },
                {
                    code_prefix: '23',
                    updated_on: '2017-02-23 07:49:51+00',
                    created_by: 'Admin'
                }
            ],
            route_types: [
                { id: 'dynamic routing', value: 'dynamic routing', text: 'dynamic routing' },
                { id: 'static routing', value: 'static routing', text: 'static routing' },
                // { id: 'static routing jd', value: 'static routing jd', text: 'static routing jd' },
                // { id: 'dynamic routing - static routing', value: 'dynamic routing - static routing', text: 'dynamic routing - static routing' },
                // { id: 'dynamic routing - static routing jd', value: 'dynamic routing - static routing jd', text: 'dynamic routing - static routing jd' },
                // { id: 'static routing - dynamic routing', value: 'static routing - dynamic routing', text: 'static routing - dynamic routing' },
                // { id: 'static routing jd - dynamic routing', value: 'static routing jd - dynamic routing', text: 'static routing jd - dynamic routing' },
            ],
            dynamic_lists: [],
            static_lists: [],
            selected_ids: [],
            route_table_column_options: [{
                value: 'ID',
                label: 'ID'
            }, {
                value: 'Match Prefix',
                label: 'Match Prefix'
            }, {
                value: 'Route Type',
                label: 'Route Type'
            }, {
                value: 'Routing',
                label: 'Routing'
            }, {
                value: 'ANI Length',
                label: 'ANI Length'
            }, {
                value: 'DNIS Length',
                label: 'DNIS Length'
            }, {
                value: 'Update At',
                label: 'Update At'
            }, {
                value: 'Update By',
                label: 'Update By'
            }, {
                value: 'Action',
                label: 'Action'
            }],
            route_table_columns: ['ID', 'Match Prefix', 'Route Type',
                'Routing', 'ANI Length', 'DNIS Length', 'Update At', 'Update By', 'Action'],
            showcolumns: [true, true, true, true, true, true, true, true, true],
            routing_plan_id: 0,
            routeid: 0,
        }
    },
    methods: {
        ...mapActions({
            // setAsyncConfirm: 'async_confirm/setAsyncConfirm',
            setMessage: 'app_message/setAppMessage'
        }),
        getRouteType() {
            if (this.route_type == "dynamic routing") {
                return 1;
            } else if (this.route_type == "static routing") {
                return 2;
            } else if (this.route_type == "static routing jd") {
                return 0;
            } else if (this.route_type == "dynamic routing - static routing") {
                return 3;
            } else if (this.route_type == "dynamic routing - static routing jd") {
                return 1;
            } else if (this.route_type == "static routing - dynamic routing") {
                return 3;
            } else if (this.route_type == "static routing jd - dynamic routing") {
                return 1;
            }
        },
        fetchPlans() {
            var page = this.pageOne.currentPage - 1;
            var per_page = this.pageOne.cntpage;
            console.log("page => " + page + " , per_page => " + per_page);
            this.loading = true;
            var id = this.$route.params.id;
            this.routing_plan_id = id;

            this.$http.get(api.getEndpointUrl() + '/v1/route/plan/' + id + '/list_routes' + "?page=" + page + "&per_page=" + per_page + "&order_by=route_plan_id&order_dir=desc",
                {
                    headers: {
                        "X-Auth-Token": auth.getToken()
                    }
                }).then(function (response) {
                    this.loading = false;
                    //todo: check success flag? validation errors?
                    var routes = response.body.payload.items;
                    console.log(routes);
                    this.lists = routes;
                    var total_page = response.body.payload.total;
                    this.pageOne.currentPage = response.body.payload.page + 1;
                    this.pageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
                    console.log("total pages => " + this.pageOne.totalPages);
                }, function (error) {
                    this.loading = false;
                    console.log(error);
                });
        },
        validateBeforeSubmit() {
            console.log("validateBeforeSubmit");
            this.$validator.validateAll().then(() => {
                // eslint-disable-next-line
                console.log("valid");
                this.loading = true;
                var requestForm  = {
                    "DNIS_prefix": this.dnis_prefix,
                    "ANI_prefix": this.ani_prefix,
                    "ANI_max": this.ani_max_length,
                    "ANI_min": this.ani_min_length,
                    "DNIS_min": this.dnis_min_length,
                    "DNIS_max": this.dnis_max_length,                    
                    "route_type": this.route_type,
                };
                if (this.getRouteType() == 2 || this.getRouteType() == 3) {
                    requestForm.static_route_id = this.static_routing;
                } else if (this.getRouteType() == 1 || this.getRouteType() == 3) {
                    requestForm.dynamic_route_id = this.dynamic_routing;
                }
                
                if (this.showModal == "add_route") {
                    this.$http.post(api.getEndpointUrl() + '/v1/route/plan/' + this.routing_plan_id +  '/add_route',
                        requestForm,
                        {
                            headers: {
                                "X-Auth-Token": auth.getToken()
                            }
                        }
                    ).then(
                        function (response) {
                            this.loading = false;
                            this.closeModal();
                            console.log(response);

                            this.$router.go(this.$router.currentRoute);
                            this.setMessage('The route has been created!');
                        },
                        function (response) {
                            this.loading = false;
                            console.log(response);

                            this.setMessage({
                                message: 'Creating route is failed!',
                                type: 'error'
                            })
                        }
                    )
                } else if (this.showModal == "edit_route") {
                    this.$http.patch(api.getEndpointUrl() + '/v1/route/' + this.routeid,
                        requestForm,
                        {
                            headers: {
                                "X-Auth-Token": auth.getToken()
                            }
                        }
                    ).then(
                        function (response) {
                            this.loading = false;
                            this.closeModal();
                            console.log(response);

                            this.$router.go(this.$router.currentRoute);
                            this.setMessage('The route has been modified!');
                        },
                        function (response) {
                            this.loading = false;
                            console.log(response);

                            this.setMessage({
                                message:"Editing route is failed!",
                                type: 'error'
                            });
                        }
                    )
                }
            }).catch(() => {
                // eslint-disable-next-line

            });
        },

        handleChange() {
            if (_.indexOf(this.route_table_columns, 'ID') != -1) {
                Vue.set(this.showcolumns, 0, true);
            }
            else {
                Vue.set(this.showcolumns, 0, false);
            }

            if (_.indexOf(this.route_table_columns, 'Match Prefix') != -1) {
                Vue.set(this.showcolumns, 1, true);
            }
            else {
                Vue.set(this.showcolumns, 1, false);
            }

            if (_.indexOf(this.route_table_columns, 'Route Type') != -1) {
                Vue.set(this.showcolumns, 2, true);
            }
            else {
                Vue.set(this.showcolumns, 2, false);
            }

            if (_.indexOf(this.route_table_columns, 'Routing') != -1) {
                Vue.set(this.showcolumns, 3, true);
            }
            else {
                Vue.set(this.showcolumns, 3, false);
            }

            if (_.indexOf(this.route_table_columns, 'ANI Length') != -1) {
                Vue.set(this.showcolumns, 4, true);
            }
            else {
                Vue.set(this.showcolumns, 4, false);
            }

            if (_.indexOf(this.route_table_columns, 'DNIS Length') != -1) {
                Vue.set(this.showcolumns, 5, true);
            }
            else {
                Vue.set(this.showcolumns, 5, false);
            }

            if (_.indexOf(this.route_table_columns, 'Update At') != -1) {
                Vue.set(this.showcolumns, 6, true);
            }
            else {
                Vue.set(this.showcolumns, 6, false);
            }

            if (_.indexOf(this.route_table_columns, 'Update By') != -1) {
                Vue.set(this.showcolumns, 7, true);
            }
            else {
                Vue.set(this.showcolumns, 7, false);
            }

            if (_.indexOf(this.route_table_columns, 'Action') != -1) {
                Vue.set(this.showcolumns, 8, true);
            }
            else {
                Vue.set(this.showcolumns, 8, false);
            }

            console.log(this.showcolumns);
        },
        pageOneChanged(pageNum) {
            if (pageNum !== this.pageOne.currentPage) {
                this.pageOne.currentPage = pageNum
                this.$nextTick(this.fetchPlans)
            }
        },
        changePageCount (countPerPage) {
            if (countPerPage !== this.pageOne.cntpage) {
                this.pageOne.cntpage = countPerPage
                this.$nextTick(this.fetchPlans)
            }
        },
        'success': function (file) {
            console.log('A file was successfully uploaded')
        },
        'process': function () {
            var newArr = this.$children.filter(function (item) {
                return item.id === "myVueDropzone";
            });
            var component = newArr[0];
            component.processQueue()
        },
        clickSelectedAll: function () {
            console.log("select_all-->" + this.checker);
            if (this.checker) {
                this.lists.forEach(function (routing, i) {
                    routing.selected = true;
                });
            }
            else {
                this.lists.forEach(function (routing, i) {
                    routing.selected = false;
                });
            }
        },
        closeModal: function () {
            this.showModal = '';
        },
        submit: function () {
            var vm = this;
            this.showModal = false;

            this.selected_ids.forEach(function (item, i) {
                var routingid = item;
                if (routingid == 0) {
                    vm.setMessage({
                        message: 'The route has been not selected!',
                        type: 'error'
                    });
                }
                else {
                    vm.loading = true;
                    vm.resource = vm.$resource(api.getEndpointUrl() + '/v1/route/' + routingid);
                    vm.resource.delete({ route_plan_id: routingid }).then(function (response) {
                        vm.loading = false;
						let index = _.findIndex(vm.lists, elem => elem.route_plan_id  === routingid)
						vm.lists.splice(index, 1)
						vm.setMessage('The routes have been deleted!')
                    });
                }
            });
        },
        editRoute: function(route) {
            this.routeid = route.route_id;

            this.dnis_prefix = route.DNIS_prefix;
            this.ani_prefix = route.ANI_prefix;
            this.ani_max_length = route.ANI_max;
            this.ani_min_length = route.ANI_min;
            this.dnis_min_length = route.DNIS_min;
            this.dnis_max_length = route.DNIS_max;   
            this.static_routing = (route.static_route_id == null ? 0 : route.static_route_id);
            this.dynamic_routing = (route.dynamic_route_id == null ? 0 : route.dynamic_route_id);
            this.route_type = route.route_type;

            this.showModal='edit_route';
        },
        deleteRoute: function (id) {
            this.showModal = true;
            this.selected_ids = [];
            this.selected_ids.push(id);
        },
        deleteAll: function () {
            console.log("delete all routes");

            this.selected_ids = [];
            var vm = this;

            this.lists.forEach(function (routing, i) {
                vm.selected_ids.push(routing.route_id)
            });

            if (this.selected_ids.length == 0) {
                this.setMessage({
                    message: 'The route has been not selected!',
                    type: 'error'
                });
                this.checker = false;

                return;
            }

            this.showModal = true;
            if (this.checker)
                this.checker = false;
        },
        deleteSelected: function () {
            console.log("delete selected routes");
            console.log(this.lists);
            this.selected_ids = [];
            var vm = this;
            this.lists.forEach(function (routing, i) {
                if (routing.selected == true) {
                    vm.selected_ids.push(routing.route_id);
                }
            });

            if (this.selected_ids.length == 0) {
                this.setMessage({
                    message: 'The route has been not selected!',
                    type: 'error'
                });
                this.checker = false;

                return;
            }

            this.showModal = true;
            if (this.checker)
                this.checker = false;
        },
        exportCSV: function () {
            var vm = this;		
            var csvArray = new Array();
            var fields = ["id", "ani", "dnis", "route_type", "static_name", "dynamic_name", "ani_min", "ani_max", "dnis_min", "dnis_max", "update_at", "update_by"];
            csvArray.push(fields);
            var csvContent = "data:text/csv;charset=utf-8,";                        
            this.lists.forEach(function (list, i) {
                var values = new Array();
                /*if(i != 0)
                {
                    csvContent += ",\n";
                } 
                csvContent += "{\n";
                csvContent += "id:" + list.route_id + ",\n";
                csvContent += "ani:" + list.ANI_prefix + ",\n";
                csvContent += "dnis:" + list.DNIS_prefix + ",\n";
                csvContent += "route_type:" + list.route_type + ",\n";                
                csvContent += "static_name:" + list.static_route_name + ",\n";

                csvContent += "dynamic_name:" + list.dynamic_route_name + ",\n";
                csvContent += "ani_min:" + list.ANI_min + ",\n";
                csvContent += "ani_max:" + list.ANI_max + ",\n";
                csvContent += "dnis_min:" + list.DNIS_min + ",\n";
                csvContent += "dnis_max:" + list.DNIS_max + ",\n";    
                csvContent += "update_at:" + list.update_at + ",\n";
                csvContent += "update_by:" + list.update_by + ",\n";  
                csvContent += "}";*/                                    
                values.push(list.route_id + "");
                values.push(list.ANI_prefix);
                values.push(list.DNIS_prefix);
                values.push(list.route_type);
                values.push(list.static_route_name);
                values.push(list.dynamic_route_name);
                values.push(list.ANI_min + "");
                values.push(list.ANI_max + "");
                values.push(list.DNIS_min + "");
                values.push(list.DNIS_max + "");
                values.push(list.update_at);
                values.push(list.update_by);
                csvArray.push(values);                
            });	                                
            //window.open(encodeURI(csvContent) );   
            exportToCsv('routing_plan_detail_export.csv', csvArray);         
		},
    },
    mounted: function () {
        $('[data-toggle="tooltip"]').tooltip();
    },
    updated: function () {
        console.log("updated log");
        document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
    },
}
</script>

<style>
.el-select__tags {
    display: none;
}
</style>
