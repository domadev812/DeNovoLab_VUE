<template>
    <div class="container-fluid">
        <div class="row">
            <div class="wrapper single">
                <time-display></time-display>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Switch</a></li>
                    <li class="breadcrumb-item active">US Jurisdiction</li>
                </ol>
                <h1 class="page-header">US Jurisdiction</h1>
                <confirm v-show="showModal" @close="showModal = false" @submit="submit"></confirm>
                <tabs>
                    <tab label="List" class="" icon="dnl_icon dnl_list" selected>
                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-default inline_fixer" @click="createNew">
                                <span class="dnl_icon dnl_add"></span> Create New
                            </button>
                            <button type="button" class="btn btn-default" @click="deleteAll">
                                  <span class="dnl_icon dnl_action_delete"></span> Delete All
                              </button>
                            <button type="button" class="btn btn-default" @click="deleteSelected">
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
                        <div class="pull-right pagination top_pagination">
                            <pagination :current-page="pageOne.currentPage" :total-pages="pageOne.totalPages" @page-changed="pageOneChanged">
                            </pagination>
                        </div>
                        <div class="table_filters bottom_0">
                            <div class="inline-block select_min_wrapper">
                                <span class="inline-block">Page row:</span>
                                <select2 :options="options1" v-model="selected1" class="inline-block">
                                </select2>
                            </div>
                            <div class="inline-block">
                                <el-select v-model="us_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
                                    <el-option v-for="item in us_table_column_options" :key="item.value" :label="item.label" :value="item.value">
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
                                                <input type="checkbox" v-model="checker">
                                                <label></label>
                                            </div>
                                        </th>
                                        <th v-if="showcolumns[0]">Country</th>
                                        <th v-if="showcolumns[1]">State</th>
                                        <th v-if="showcolumns[2]">Prefix</th>
                                        <th v-if="showcolumns[3]">OCN</th>
                                        <th v-if="showcolumns[4]">LATA</th>
                                        <!-- <th>Block Id</th>
                                        <th>Effective Date</th> -->
                                        <th v-if="showcolumns[5]" class="width_138">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="!filterBy(items, code).length">
                                        <td style="text-align: center" colspan="7">No Data Found</td>
                                    </tr>										
                                    
                                    <tr v-for="item in filterBy(items, code)">
                                        <td class="centred_checkbox">
                                            <div class="checkbox checkbox-success">
                                                <input :id="item.id" :name="item.id" type="checkbox" v-model="item.status">
                                                <label :for="item.id"></label>
                                            </div>
                                        </td>
                                        <td v-if="showcolumns[0]">
                                            <!-- <input type="text" v-model="item.country" class="form-control" placeholder="Enter Country"> -->
                                            {{item.country}}
                                        </td>
                                        <td v-if="showcolumns[1]">
                                            <!-- <input type="text" v-model="item.state" class="form-control" placeholder="Enter State"> -->
                                            {{item.state}}
                                        </td>
                                        <td v-if="showcolumns[2]">
                                            <!-- <input type="text" v-model="item.prefix" class="form-control" placeholder="Enter Prefix"> -->
                                            {{item.prefix}}
                                        </td>
                                        <td v-if="showcolumns[3]">
                                            <!-- <input type="text" v-model="item.ocn" class="form-control" placeholder="Enter OCN"> -->
                                            {{item.ocn}}
                                        </td>
                                        <td v-if="showcolumns[4]">
                                            <!-- <input type="text" v-model="item.lata" class="form-control" placeholder="Enter LATA"> -->
                                            {{item.lata}}
                                        </td>
                                        <!-- <td>
                                            <input type="text" v-model="item.block_id" class="form-control" placeholder="Enter Block Id">
                                        </td>
                                        <td>
                                            <input type="text" v-model="item.effective_date" class="form-control" placeholder="Enter Effective Date">
                                        </td> -->
                                        <td v-if="showcolumns[5]">
                                            <router-link to="" class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" @click.native="edit_item(item.id);">
                                                <span class="dnl_icon dnl_action_edit"></span>
                                            </router-link>
                                            <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="delete_item(item.id)">
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
                        <!--<div class="button_set"><a class="btn btn-primary mini">
        							Submit
        						</a> <a class="btn btn-default mini">
        							Reset
        						</a>
                            </div>-->
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
                            <div class="col-md-3 col-sm-3">
                                <div class="form-group full-width-select">
                                    <label for="username">Data Format:</label>
                                    <select2 :options="data_format_options" v-model="data_format"></select2>
                                </div>
                                <div class="form-group m-top-33">
                                    <div class="checkbox checkbox-success">
                                        <input id="with_headers_row" name="with_headers_row" type="checkbox">
                                        <label for="with_headers_row">With headers row</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-3">
                                <div class="form-group">
                                    <label>Header Text:</label>
                                    <textarea v-model="header_text" class="form-control" placeholder="Enter Header Text" />
                                </div>
                                <div class="form-group">
                                    <label>Footer Text:</label>
                                    <textarea v-model="footer_text" class="form-control" placeholder="Enter Footer Text" />
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-3">
                                <div class="form-group full-width-select">
                                    <label for="username">Column #1:</label>
                                    <select class="selectable" v-model="column_1">
                                        <option v-for="item in column_options" v-bind:value="item.id">
                                            {{ item.text }}
                                        </option>
                                    </select>
                                </div>
                                <div class="form-group full-width-select">
                                    <label for="username">Column #2:</label>
                                    <select class="selectable" v-model="column_2">
                                        <option v-for="item in column_options" v-bind:value="item.id">
                                            {{ item.text }}
                                        </option>
                                    </select>
                                </div>
                                <div class="form-group full-width-select">
                                    <label for="username">Column #3:</label>
                                    <select class="selectable" v-model="column_3">
                                        <option v-for="item in column_options" v-bind:value="item.id">
                                            {{ item.text }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-3">
                                <div class="form-group full-width-select">
                                    <label for="username">Column #4:</label>
                                    <select class="selectable" v-model="column_4">
                                        <option v-for="item in column_options" v-bind:value="item.id">
                                            {{ item.text }}
                                        </option>
                                    </select>
                                </div>
                                <div class="form-group full-width-select">
                                    <label for="username">Column #5:</label>
                                    <select class="selectable" v-model="column_5">
                                        <option v-for="item in column_options" v-bind:value="item.id">
                                            {{ item.text }}
                                        </option>
                                    </select>
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
    </div>
</template>

<script>
    const vSelect = require('vue!../main_components/select.vue'),
        Pagination = require('vue!../main_components/pagination.vue'),
        vTabs = require('vue!../main_components/tabs.vue'),
        vTab = require('vue!../main_components/tab.vue'),
        confirmmodal = require('vue!../main_components/confirm_delete.vue'),
        Dropzone = require('vue!../main_components/dropzone.vue');
    const api = require("../../api");
    const auth = require("../../auth");
    import {
        mapActions
    } from 'vuex'
    import _ from 'lodash'
    
    module.exports = {
        components: {
            'select2': vSelect,
            'pagination': Pagination,
            'tabs': vTabs,
            'tab': vTab,
            'confirm': confirmmodal,
            Dropzone
        },
        data: function() {
            return {
				us_table_column_options: [{
					value: 'Country',
					label: 'Country'
				}, {
					value: 'State',
					label: 'State'
				}, {
					value: 'Prefix',
					label: 'Prefix'
				}, {
					value: 'OCN',
					label: 'OCN'
				}, {
					value: 'LATA',
					label: 'LATA'
				}, {
					value: 'Action',
					label: 'Action'
				}],
				us_table_columns: ['Country', 'State', 'Prefix',
					'OCN', 'LATA', 'Action'
				],
				showcolumns: [true, true, true, true, true, true],
                
                column_options: [
                    {id: 'country', text: 'country'},
                    {id: 'state', text: 'state'},
                    {id: 'prefix', text: 'prefix'},
                    {id: 'ocn', text: 'ocn'},
                    {id: 'lata', text: 'lata'},
                ],
                data_format_options: [
                    {id: 'csv', text: 'CSV'},
                    {id: 'xls', text: 'XLS'},
                ],
                code: '',
                checker: '',
                showModal: '',
                start_date: '',
                end_date: '',
                ftp_config_name: '',
                data_format: 'csv',
                header_text: '',
                footer_text: '',
                column_1: 'country',
                column_2: 'state',
                column_3: 'prefix',
                column_4: 'ocn',
                column_5: 'lata',
                pageOne: {
                    currentPage: 1,
                    totalPages: 10,
                    cntpage: 10,
                },
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
                file_breakdown: 2,
                file_options: [{
                        id: 1,
                        text: 'As one big file'
                    },
                    {
                        id: 2,
                        text: 'As hourly file'
                    },
                    {
                        id: 3,
                        text: 'As daily file'
                    },
                ],
                time_zone: 12,
                time_zone_options: [{
                        id: 1,
                        text: 'GMT -12:00'
                    },
                    {
                        id: 2,
                        text: 'GMT -11:00'
                    },
                    {
                        id: 3,
                        text: 'GMT -10:00'
                    },
                    {
                        id: 4,
                        text: 'GMT -9:00'
                    },
                    {
                        id: 5,
                        text: 'GMT -8:00'
                    },
                    {
                        id: 6,
                        text: 'GMT -7:00'
                    },
                    {
                        id: 7,
                        text: 'GMT -6:00'
                    },
                    {
                        id: 8,
                        text: 'GMT -5:00'
                    },
                    {
                        id: 9,
                        text: 'GMT -4:00'
                    },
                    {
                        id: 10,
                        text: 'GMT -3:00'
                    },
                    {
                        id: 11,
                        text: 'GMT -2:00'
                    },
                    {
                        id: 12,
                        text: 'GMT -1:00'
                    },
                    {
                        id: 13,
                        text: 'GMT +0:00'
                    },
                    {
                        id: 14,
                        text: 'GMT +1:00'
                    },
                    {
                        id: 15,
                        text: 'GMT +2:00'
                    },
                    {
                        id: 16,
                        text: 'GMT +3:00'
                    },
                    {
                        id: 17,
                        text: 'GMT +4:00'
                    },
                    {
                        id: 18,
                        text: 'GMT +5:00'
                    },
                    {
                        id: 19,
                        text: 'GMT +6:00'
                    },
                    {
                        id: 20,
                        text: 'GMT +7:00'
                    },
                    {
                        id: 21,
                        text: 'GMT +8:00'
                    },
                    {
                        id: 22,
                        text: 'GMT +9:00'
                    },
                    {
                        id: 23,
                        text: 'GMT +10:00'
                    },
                    {
                        id: 24,
                        text: 'GMT +11:00'
                    },
                    {
                        id: 25,
                        text: 'GMT +12:00'
                    },
                ],
                items: [],
                selected_ids: [],
            }
        },
        methods: {
            ...mapActions({
                setMessage: 'app_message/setAppMessage'
            }),
            edit_item: function(id) {
                this.$router.push({
                    path: "/switch/us_jurisdiction/edit/" + id
                });
            },
            deleteSelected: function() {
                this.selected_ids = [];
                var vm = this;
                this.items.forEach(function(item, i) {
                    if (item.status == true) {
                        vm.selected_ids.push(item.id);
                    }
                });
                if (this.selected_ids.length == 0) {
                    this.setMessage({
                        message: 'The Jurisdiction list has been not selected!',
                        type: 'error'
                    });
                    this.checker = false;
                    return;
                }
                this.showModal = true;
                if (this.checker)
                    this.checker = false;
            },
            delete_item: function(id) {
                this.showModal = true;
                this.selected_ids = [];
                this.selected_ids.push(id);
            },
            submit: function() {
                var vm = this;
                this.showModal = false;
                this.selected_ids.forEach(function(item, i) {
                    var id = item;
                    if (id == 0) {
                        vm.setMessage({
                            message: 'The Jurisdiction list has been not selected!',
                            type: 'error'
                        });
                    } else {
                        vm.loading = true;
                        vm.resource = vm.$resource(api.getEndpointUrl() + '/v1/config/us_jurisdictionprefix/' + id);
                        vm.resource.delete({
                            id: id
                        }).then(function(response) {
                            vm.loading = false;
                            let index = _.findIndex(vm.items, elem => elem.id === id)
                            vm.items.splice(index, 1)
                            vm.setMessage('The Jurisdiction list has been deleted!');
                        });
                    }
                });
            },
            createNew: function() {
                this.$router.push({path:"/switch/us_jurisdiction/new"});
            },
            deleteAll: function() {
                console.log("delete all US Jurisdiction list");
                this.selected_ids = [];
                var vm = this;
                this.items.forEach(function(item, i) {
                    vm.selected_ids.push(item.id)
                });
                if (this.selected_ids.length == 0) {
                    this.setMessage({
                        message: 'The Jurisdiction list has been not selected!',
                        type: 'error'
                    });
                    this.checker = false;
                    return;
                }
                this.showModal = true;
                if (this.checker)
                    this.checker = false;
            },
			handleChange() {
				if (_.indexOf(this.us_table_columns, 'Country') != -1) {
					Vue.set(this.showcolumns, 0, true);
				} else {
					Vue.set(this.showcolumns, 0, false);
				}
				if (_.indexOf(this.us_table_columns, 'State') != -1) {
					Vue.set(this.showcolumns, 1, true);
				} else {
					Vue.set(this.showcolumns, 1, false);
				}
				if (_.indexOf(this.us_table_columns, 'Prefix') != -1) {
					Vue.set(this.showcolumns, 2, true);
				} else {
					Vue.set(this.showcolumns, 2, false);
				}
				if (_.indexOf(this.us_table_columns, 'OCN') != -1) {
					Vue.set(this.showcolumns, 3, true);
				} else {
					Vue.set(this.showcolumns, 3, false);
				}
				if (_.indexOf(this.us_table_columns, 'LATA') != -1) {
					Vue.set(this.showcolumns, 4, true);
				} else {
					Vue.set(this.showcolumns, 4, false);
				}
				if (_.indexOf(this.us_table_columns, 'Action') != -1) {
					Vue.set(this.showcolumns, 5, true);
				} else {
					Vue.set(this.showcolumns, 5, false);
				}
				console.log(this.showcolumns);
				// this.$nextTick(() => {
				// 	document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
				// });
			},
            
            pageOneChanged(pageNum) {
                if (pageNum !== this.pageOne.currentPage) {
                    this.pageOne.currentPage = pageNum
                    this.$nextTick(this.fetchPrefixes)
                }
            },
            'success': function(file) {
                console.log('A file was successfully uploaded')
            },
            'process': function() {
                var newArr = this.$children.filter(function(item) {
                    return item.id === "myVueDropzone";
                });
                var component = newArr[0];
                component.processQueue()
            },
            fetchPrefixes() {
                var page = this.pageOne.currentPage - 1;
                var per_page = this.pageOne.cntpage;
                console.log("page => " + page + " , per_page => " + per_page);
                this.$http.get(api.getEndpointUrl() + "/v1/config/us_jurisdictionprefix/list?page=" + page + "&per_page=" + per_page + "&order_by=&order_dir=desc", {
                    headers: {
                        "X-Auth-Token": auth.getToken()
                    }
                }).then(function(response) {
                    this.loading = false;
                    //todo: check success flag? validation errors?
                    var items = response.body.payload.items;
                    console.log("items");
                    console.log(items);
                    this.items = items;
                    var total_page = response.body.payload.total;
                    this.pageOne.currentPage = response.body.payload.page + 1;
                    this.pageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
                    console.log("total pages => " + this.pageOne.totalPages);
                }, function(error) {
                    this.loading = false;
                    console.log(error);
                });
            },
            exportCSV: function () {                
                var vm = this;		
                var csvContent = "data:text/csv;charset=utf-8,"; 
                var csvArray = new Array();
                // var fields = ["id", "country", "state", "prefix", "ocn", "lata", "block_id", "effective_date"];
                var fields = ["id", "country", "state", "prefix", "ocn", "lata"];
                csvArray.push(fields);                            
                this.items.forEach(function (item, i) {
                    var values = new Array();                     

                    values.push(item.id + "");
                    values.push(item.country + "");
                    values.push(item.state + "");
                    values.push(item.prefix + "");
                    values.push(item.ocn + "");
                    values.push(item.lata + "");    
                    // values.push(item.block_id + "");
                    // values.push(item.effective_date + "");   
                    csvArray.push(values);                                                         
                });	                                                 
                exportToCsv('switch_us_jurisdiction_export.csv', csvArray);                                                        
            }, 
        },
        mounted: function() {
            $('[data-toggle="tooltip"]').tooltip();
        },
        created: function() {
            this.fetchPrefixes();
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
	.el-select__tags {
		display: none;
	}
    .tab span.dnl_icon.dnl_export {
        font-size: 24px;
        float: left;
        margin-right: 6px;
    }
</style>
