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
                        <router-link to="/routing/static_routing">Static Routing</router-link>
                    </li>
                    <li class="breadcrumb-item active">Static Route</li>
                </ol>
                <h1 class="page-header">Static Route</h1>
                <confirm v-show="showModal" @close="showModal = false" @submit="submit"></confirm>
                <router-link to="/routing/static_routing/" class="btn btn_white back">
                    <span class="dnl_icon dnl_import"></span> Back
                </router-link>
                <tabs>
                    <tab label="Route List" class="" icon="dnl_icon dnl_list" selected>
                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-default inline_fixer" @click="addRoute()">
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
                                        <th class="width-65">
                                            <div class="checkbox checkbox-success">
                                                <input id="select_all" name="select_all" type="checkbox" v-model="checker" v-on:click="clickSelectedAll">
                                                <label for="select_all"></label>
                                            </div>
                                        </th>
                                        <th v-if="showcolumns[0]">Code</th>
                                        <th v-if="showcolumns[1]">Strategy</th>
                                        <th v-if="showcolumns[2]">Time Profile</th>
                                        <th v-if="showcolumns[3]">Trnk List</th>
                                        <th v-if="showcolumns[4]">Update At</th>
                                        <th v-if="showcolumns[5]">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="!filterBy(lists, code).length">
                                        <td style="text-align: center" colspan="7">No Data Found</td>
                                    </tr>										
                                    <tr v-for="list in filterBy(lists, code)">
                                        <td class="centred_checkbox">
                                            <div class="checkbox checkbox-success">
                                                <input v-bind:id="'selected-' + index" v-bind:name="'selected-' + index" type="checkbox" v-model="list.selected">
                                                <label v-bind:for="'selected-' + index"></label>
                                            </div>
                                        </td>
                                        <td v-if="showcolumns[0]">{{list.code_name}}</td>
                                        <td v-if="showcolumns[1]">{{list.strategy}}</td>
                                        <td v-if="showcolumns[2]">{{list.time_profile_name}}</td>
                                        <td v-if="showcolumns[3]">{{getTrunkNameList(lists.trunks)}}</td>
                                        <td v-if="showcolumns[4]">{{list.update_at}}</td>
                                        <td v-if="showcolumns[5]">
                                            <a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" @click="editRoute(list)">
                                                <span class="dnl_icon dnl_action_edit"></span>
                                            </a>
                                            <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="deleteRoute(list.static_route_id)">
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
                            <a class="btn btn-primary mini">
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
                                <label for="code_name">Code:</label>
                                <input type="text" name="code_name" v-model="code_name" class="form-control" placeholder="Enter Code">
                            </div>
                        </div>
                        <div class="clearfix little-space"></div>
                        <div class="col-md-6 col-sm-6">
                            <label for="strategy_length">Strategy:</label>
                            <select class="selectable" v-model="strategy">
                                <option v-for="option in strategy_lists" v-bind:value="option.id">
                                    {{ option.text }}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <label for="time_profile_length">Time Profile:</label>
                            <select class="selectable" v-model="time_profile">
                                <option v-for="option in time_profile_lists" v-bind:value="option.id">
                                    {{ option.text }}
                                </option>
                            </select>
                        </div>
                        <div class="clearfix little-space"></div>
                        <!-- <button @click="addTrunk" class="btn btn-default mini">Add Trunk</button> -->
                        <!-- <button type="button" class="btn btn-default" style="float: left;margin-left: 15px" v-on:click="addTrunk">
                            <span class="dnl_icon dnl_add"></span> Add Trunk
                        </button>  -->
                        <a class="action action_add" data-toggle="tooltip" data-placement="top" title="Create" @click="addTrunk()">
                            <span class="dnl_icon dnl_add"></span> Add Trunk
                        </a>

                        <div class="clearfix little-space"></div>
                        <template v-for="(template, index) in templateList">
                        <div class="col-md-6 col-sm-6">
                            <label for="carrier_length">Carriers:</label>
                            <select class="selectable" v-model="template.carrier" @change="handleChangeCarrier(index)">
                                <option v-for="option in carrier_lists" v-bind:value="option.id">
                                    {{ option.text }}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <label for="trunk_length">Trunk:</label>
                            <select class="selectable" v-model="template.trunk">
                                <option v-for="option in template.trunk_lists" v-bind:value="option.id">
                                    {{ option.text }}
                                </option>
                            </select>
                        </div>
                        <div v-if="showPercentage" class="col-md-6 col-sm-6">
                            <label for="percentage_length">Percentage:</label>
                            <input type="text" name="percentage" v-model="template.percentage" class="form-control" placeholder="Enter Percentage">
                        </div>
                        <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="deleteTrunk(index)">
                            <span class="dnl_icon dnl_action_delete"></span>
                        </a>                            
                        <div class="clearfix little-space"></div>
                        </template>
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
        this.$http.get(api.getEndpointUrl() + "/v1/carrier/list",
            {
                headers: {
                    "X-Auth-Token": auth.getToken()
                }
            }).then(function (response) {
                var self = this;
                this.loading = false;
                var items = response.body.payload.items;
                items.forEach(function (item, i) {
                    if (item.is_active) {
                        var carrier = {};
                        carrier.id = item.client_id;
                        carrier.text = item.name;
                        self.carrier_lists.push(carrier);
                    }
                });
                console.log("carrier_lists: ");
                console.log(this.carrier_lists);
            }, function (error) {
                this.loading = false;
                console.log(error);
            });
        this.loading = true;
        this.$http.get(api.getEndpointUrl() + "/v1/config/time_profile/list",
            {
                headers: {
                    "X-Auth-Token": auth.getToken()
                }
            }).then(function (response) {
                var self = this;
                this.loading = false;
                var items = response.body.payload.items;
                items.forEach(function (item, i) {
                    var time_profile = {};
                    time_profile.id = item.time_profile_id;
                    time_profile.text = item.name;
                    self.time_profile_lists.push(time_profile);
                });
                console.log("time_profile_lists: ");
                console.log(this.time_profile_lists);
            }, function (error) {
                this.loading = false;
                console.log(error);
            });

        this.fetchRoutes();
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
            templateList: [],

            // dynamic_routing: 0,
            // static_routing: 0,
            // route_type: "dynamic routing",
            code_name: '',
            time_profile: 0,
            strategy: 'Top-Down',
            showPercentage: false,
            // ani_max_length: 0,
            // dnis_min_length: 0,
            // dnis_max_length: 0,

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

            strategy_lists: [
                {id:'Top-Down', text: 'Top-Down'},
                {id:'By Percentage', text: 'By Percentage'},
                {id:'Round Robin', text: 'Round Robin'},
            ],
            lists: [],
            
            time_profile_lists: [],
            carrier_lists: [],
            selected_ids: [],
            route_table_column_options: [{
                value: 'Code',
                label: 'Code'
            }, {
                value: 'Strategy',
                label: 'Strategy'
            }, {
                value: 'Time Profile',
                label: 'Time Profile'
            }, {
                value: 'Trunk List',
                label: 'Trunk List'
            }, {
                value: 'Update At',
                label: 'Update At'
            }, {
                value: 'Action',
                label: 'Action'
            }],
            route_table_columns: ['Code', 'Strategy', 'Time Profile',
                'Trunk List', 'Update At', 'Action'],
            showcolumns: [true, true, true, true, true, true],
            static_rouitng_id: 0,
            routeid: 0,
        }
    },
    watch: {
        'strategy': function () {
            this.percentage = 0;
            if(this.strategy == 'By Percentage'){
                this.showPercentage = true;
            }
            else {
                this.showPercentage = false;
            }
        }
    },
    methods: {
        ...mapActions({
            // setAsyncConfirm: 'async_confirm/setAsyncConfirm',
            setMessage: 'app_message/setAppMessage'
        }),
        getTrunkNameList(trunks) {
            var result = '';
            trunks.forEach(function (trunk, i) {
                result = result + trunk.trunk_name + ', ';
            });
            result = result.substring(0, location.length - 2);
            return result;
        },
        getQueries(carrier_id) {
            const filter = '?carrier_id=' + carrier_id
            return filter
        },
        fetchTrunks(carrier_id) {
            this.loading = true;
            var trunks = [];
			this.$http.get(api.getEndpointUrl() + "/v1/trunk/list" + this.getQueries(carrier_id), 
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function(response) {
				this.loading = false;
				var items = response.body.payload.items;
				items.forEach(function(item, i){
					var trunk = {};
					trunk.id = item.trunk_id;
                    trunk.value = item.trunk_name;
					trunk.text = item.trunk_name;
					trunks.push(trunk);
				});

				console.log(trunks);
			}, function(error) {
				this.loading = false;
				console.log(error);
            });
            
            return trunks;
        },
        handleChangeCarrier(index) {
            console.log("handleChangeCarrier");
            console.log(this.templateList[index]);
            this.templateList[index].trunk_lists = this.fetchTrunks(this.templateList[index].carrier);            
        },
        fetchRoutes() {
            var page = this.pageOne.currentPage - 1;
            var per_page = this.pageOne.cntpage;
            console.log("page => " + page + " , per_page => " + per_page);
            this.loading = true;
            var id = this.$route.params.id;
            this.static_rouitng_id = id;

            this.$http.get(api.getEndpointUrl() + '/v1/route/static/' + id + '/item/list' + "?page=" + page + "&per_page=" + per_page + "&order_by=item_id&order_dir=desc",
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
                var trunks = [];
                var total_percentage = 0;

                this.templateList.forEach(function (template, index) {
                    var trunk = {};
                    trunk.trunk_id = template.trunk;
                    trunk.percentage = template.percentage;
                    if (this.showPercentage) {
                        total_percentage = total_percentage + template.percentage;
                    }
                    trunks.push(trunk);
                });

                if (total_percentage != 100) {
                    this.loading = false;

                    this.setMessage({
                        message: 'The sum of percentages must be 100',
                        type: 'error'
                    })
                }

                if (this.showModal == "add_route") {
                    this.$http.post(api.getEndpointUrl() + '/v1/route/static/' + this.static_rouitng_id +  '/item/create',
                        {
                            "static_route_id": this.static_rouitng_id,
                            "strategy": this.strategy,
                            "code_name": this.code_name,
                            "time_profile_id": this.time_profile,
                            "trunks": trunks,
                        },
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

                            this.loading = true;
                            var item_id = response.object_id;

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
                    this.$http.patch(api.getEndpointUrl() + '/v1/route/static/item/' + this.routeid,
                        {
                            "static_route_id": this.static_rouitng_id,
                            "strategy": this.strategy,
                            "code_name": this.code_name,
                            "time_profile_id": this.time_profile,
                            "trunks": trunks,
                        },    
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
            if (_.indexOf(this.route_table_columns, 'Code') != -1) {
                Vue.set(this.showcolumns, 0, true);
            }
            else {
                Vue.set(this.showcolumns, 0, false);
            }

            if (_.indexOf(this.route_table_columns, 'Strategy') != -1) {
                Vue.set(this.showcolumns, 1, true);
            }
            else {
                Vue.set(this.showcolumns, 1, false);
            }

            if (_.indexOf(this.route_table_columns, 'Time Profile') != -1) {
                Vue.set(this.showcolumns, 2, true);
            }
            else {
                Vue.set(this.showcolumns, 2, false);
            }

            if (_.indexOf(this.route_table_columns, 'Trunk List') != -1) {
                Vue.set(this.showcolumns, 3, true);
            }
            else {
                Vue.set(this.showcolumns, 3, false);
            }

            if (_.indexOf(this.route_table_columns, 'Update At') != -1) {
                Vue.set(this.showcolumns, 4, true);
            }
            else {
                Vue.set(this.showcolumns, 4, false);
            }

            if (_.indexOf(this.route_table_columns, 'Action') != -1) {
                Vue.set(this.showcolumns, 5, true);
            }
            else {
                Vue.set(this.showcolumns, 5, false);
            }

            console.log(this.showcolumns);
        },
        pageOneChanged(pageNum) {
            if (pageNum !== this.pageOne.currentPage) {
                this.pageOne.currentPage = pageNum
                this.$nextTick(this.fetchRoutes)
            }
        },
        changePageCount (countPerPage) {
            if (countPerPage !== this.pageOne.cntpage) {
                this.pageOne.cntpage = countPerPage
                this.$nextTick(this.fetchRoutes)
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
                this.lists.forEach(function (route, i) {
                    route.selected = true;
                });
            }
            else {
                this.lists.forEach(function (route, i) {
                    route.selected = false;
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
                var routeid = item;
                if (routeid == 0) {
                    vm.setMessage({
                        message: 'The route has been not selected!',
                        type: 'error'
                    });
                }
                else {
                    vm.loading = true;
                    vm.resource = vm.$resource(api.getEndpointUrl() + '/v1/route/static/item' + routeid);
                    vm.resource.delete({ item_id : routeid }).then(function (response) {
                        vm.loading = false;
						let index = _.findIndex(vm.lists, elem => elem.item_id  === routeid)
						vm.lists.splice(index, 1)
						vm.setMessage('The routes have been deleted!')
                    });
                }
            });
        },
        deleteTrunk: function(id){
            this.templateList.splice(id, 1);
        },
        editRoute: function(route) {
            this.routeid = route.route_id;

            this.code_name = route.code_name;     
            this.strategy = route.strategy;   
            this.time_profile = route.time_profile_id;   
            this.templateList = [];
            route.trunks.forEach(function(item, i){
                var temp = {};
                temp.carrier = item.carrier_id;
                temp.trunk_lists = this.fetchTrunks(item.carrier_id);
                temp.trunk = item.trunk_id;
                temp.percentage = item.percentage;
                this.templateList.push(temp);
            });

            this.showModal='edit_route';
        },
        addRoute: function() {
            console.log("add route");
            this.code_name = '',
            this.time_profile = 0,
            this.strategy = 'Top-Down',
            this.showPercentage = false,
            this.templateList = [];

            console.log("carrier_lists: ");
            console.log(this.carrier_lists);

            this.templateList.push({
                carrier: 0,
                trunk_lists: [],
                trunk: 0,
                percentage: 0,
            });
            this.showModal='add_route';
        },
        addTrunk: function() {
            this.templateList.push({
                carrier: 0,
                trunk_lists: [],
                trunk: 0,
                percentage: 0,
            });
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

            this.lists.forEach(function (route, i) {
                vm.selected_ids.push(route.item_id)
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
            this.lists.forEach(function (route, i) {
                if (route.selected == true) {
                    vm.selected_ids.push(route.item_id);
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

a.action.action_add {
    font-size: 16px;
    vertical-align: top;
    padding-top: 4px;
}

</style>
