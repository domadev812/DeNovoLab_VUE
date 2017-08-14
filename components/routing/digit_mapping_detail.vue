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
                        <router-link to="/routing/digital_maps">Digital Maps</router-link>
                    </li>
                    <li class="breadcrumb-item active">Digit Mapping Detail</li>
                </ol>
                <h1 class="page-header">Digit Mapping Detail</h1>
                <confirm v-show="showModal" @close="showModal = false" @submit="submit"></confirm>
                <router-link to="/routing/digital_maps" class="btn btn_white back">
                    <span class="dnl_icon dnl_import"></span> Back </router-link>
                <tabs>
                    <tab label="List" class="" icon="dnl_icon dnl_list" selected>
                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-default" @click="createNew">
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
                                <input type="text" name="search" v-model="search" class="form-control inline-block search_field" placeholder="Enter Search">
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
                                <el-select v-model="detail_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
                                    <el-option
                                    v-for="item in detail_table_column_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>							
                                
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <div class="table-responsive">
                            <table class="table table-striped table-hover aliases">
                                <thead>
                                    <tr role="row">
                                        <th class="width-65" rowspan="2">
                                            <div class="checkbox checkbox-success">
                                                <input id="select_all" name="select_all" type="checkbox" v-model="checker" v-on:click="clickSelectedAll">
                                                <label for="select_all"></label>     
                                            </div>
                                        </th>
                                        <th v-if="showcolumns[0]" colspan="3" rowspan="1" style="text-align: center;">ANI</th>
                                        <th v-if="showcolumns[1]" colspan="3" rowspan="1">DNIS</th>
                                        <th v-if="showcolumns[2]" rowspan="2" colspan="1">Action</th>
                                    </tr>
                                    <tr>
                                        <th v-if="showcolumns[0]" rowspan="1" colspan="1">Action</th>
                                        <th v-if="showcolumns[0]" rowspan="1" colspan="1" style="text-align: center;">Match Prefix</th>
                                        <th v-if="showcolumns[0]" rowspan="1" colspan="1">Replace With</th>
                                        <th v-if="showcolumns[1]" rowspan="1" colspan="1">Action</th>
                                        <th v-if="showcolumns[1]" rowspan="1" colspan="1">Match Prefix</th>
                                        <th v-if="showcolumns[1]" rowspan="1" colspan="1">Replace With</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="!lists.length">
                                        <td style="text-align: center" colspan="8">No Data Found</td>
                                    </tr>										
                                    
                                    <tr v-for="(list, index) in lists">
                                        <td class="centred_checkbox">
                                            <div class="checkbox checkbox-success">
                                                <input v-bind:id="'selected-' + index" v-bind:name="'selected-' + index" type="checkbox" v-model="list.selected">
                                                <label v-bind:for="'selected-' + index"></label>
                                            </div>
                                        </td>
                                        <td v-if="showcolumns[0]" style="text-align: center;">{{list.ANI_action}}</td>
                                        <td v-if="showcolumns[0]">{{list.ANI_prefix}}</td>
                                        <td v-if="showcolumns[0]">{{list.ANI_replace_to}}</td>
                                        <td v-if="showcolumns[1]">{{list.DNIS_action}}</td>
                                        <td v-if="showcolumns[1]">{{list.DNIS_prefix}}</td>
                                        <td v-if="showcolumns[1]">{{list.DNIS_replace_to}}</td>
                                        <td v-if="showcolumns[2]">
                                            <a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" v-on:click="edit_item(list.ref_id)">
                                                <span class="dnl_icon dnl_action_edit"></span>
                                            </a>
                                            <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="delete_item(list.ref_id)">
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
                            <div class="col-md-3 col-sm-3">
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
                            <div class="clearfix"></div>
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
    Dropzone = require('vue!../main_components/dropzone.vue'),
	confirmmodal = require('vue!../main_components/confirm_delete.vue'),
	modal = require('vue!../main_components/modal.vue');
	_ = require('lodash');
	import {mapGetters,	mapActions} from 'vuex'

const api = require("../../api");
const auth = require("../../auth");

module.exports = {
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
            search: '',
            checker: '',
            showModal: '',
            selected_ids: [],

            data_format: '',
            header_text: '',
            footer_text: '',
            column_1: '',
            column_2: '',
            column_3: '',
            column_4: '',
            column_5: '',
            column_6: '',
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
            lists: [],
            tras_id: 0,
            detail_table_column_options: [{
                    value: 'ANI',
                    label: 'ANI'
                    }, {
                    value: 'DNIS',
                    label: 'DNIS'
                    }, {
                    value: 'Action',
                    label: 'Action'
                    }],
            detail_table_columns: ['ANI', 'DNIS', 'Action'],
            showcolumns: [true, true, true],
        }
    },
    methods: {
			...mapActions({
				setAsyncConfirm: 'async_confirm/setAsyncConfirm',
				setMessage: 'app_message/setAppMessage'
			}),
			clickSelectedAll: function() {
				if(this.checker) {
					this.lists.forEach(function(list, i){
						list.selected = true;
					});
				}
				else {
					this.lists.forEach(function(list, i){
						list.selected = false;
					});
				}
			},
			handleChange() {
				if (_.indexOf(this.detail_table_columns, 'ANI') != -1) {
					Vue.set(this.showcolumns, 0, true);
				}
				else {
					Vue.set(this.showcolumns, 0, false);
				}
					
				if (_.indexOf(this.detail_table_columns, 'DNIS') != -1) {
					Vue.set(this.showcolumns, 1, true);
				}
				else {
					Vue.set(this.showcolumns, 1, false);
				}

				if (_.indexOf(this.detail_table_columns, 'Action') != -1) {
					Vue.set(this.showcolumns, 2, true);
				}
				else {
					Vue.set(this.showcolumns, 2, false);
				}

				console.log(this.showcolumns);
			}, 
        fetchMapdetails() {
            var tras_id = this.$route.params.id;
            this.tras_id  = tras_id;
            var page = this.pageOne.currentPage - 1;
            var per_page = this.pageOne.cntpage;
            this.loading = true;
            this.$http.get(api.getEndpointUrl() + "/v1/route/digit_map/" + tras_id + "/item/list"+"?page="+page+"&per_page="+per_page+"&order_by=ref_id&order_dir=desc",
                {
                    headers: {
                        "X-Auth-Token": auth.getToken()
                    }
                }).then(function (response) {
                    this.loading = false;
                    this.lists = response.body.payload.items;
                    console.log("digit_mapping_detail-->");
                    console.log(this.lists);
                    var total_page = response.body.payload.total;
                    this.pageOne.currentPage = response.body.payload.page + 1;
                    this.pageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
                }, function (error) {
                    this.loading = false;
                    console.log(error);
                });
        },    
        pageOneChanged(pageNum) {
            if (pageNum !== this.pageOne.currentPage) {
                this.pageOne.currentPage = pageNum
                this.$nextTick(this.fetchMapdetails)
            }
        },
        changePageCount (countPerPage) {
            if (countPerPage !== this.pageOne.cntpage) {
                this.pageOne.cntpage = countPerPage
                this.$nextTick(this.fetchMapdetails)
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
        delete_item: function (id) {
            this.showModal = true;
            this.selected_ids = [];
            this.selected_ids.push(id);
        },
        edit_item: function(id){
            // this.$router.push({path:"/routing/digital_maps/item/edit/"+id});
            this.$router.push({path:"/routing/digital_maps/digit_mapping_detail/" + this.tras_id + "/edit/"+id});
        },
        createNew: function(id){
            this.$router.push({path:"/routing/digital_maps/digit_mapping_detail/" + this.tras_id + "/new"});
            // this.$router.push({path:"/routing/digital_maps/item/new"});
        },
        closeModal: function () {
            this.showModal = '';
        },
        deleteAll: function () {
            console.log("delete all items");

            this.selected_ids = [];
            var vm = this;

            this.lists.forEach(function (list, i) {
                vm.selected_ids.push(list.ref_id)
            });

            if (this.selected_ids.length == 0) {
                this.setMessage({
                    message: 'The item has been not selected!',
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
            console.log("delete selected items");
            this.selected_ids = [];
            var vm = this;
            this.lists.forEach(function (list, i) {
                if (list.selected == true) {
                    vm.selected_ids.push(list.ref_id);
                }
            });

            if (this.selected_ids.length == 0) {
                this.setMessage({
                    message: 'The item has been not selected!',
                    type: 'error'
                });
                this.checker = false;

                return;
            }

            this.showModal = true;
            if (this.checker)
                this.checker = false;
        },
        submit: function () {
            var vm = this;
            this.showModal = false;

            this.selected_ids.forEach(function (item, i) {
                var ref_id = item;
                if (ref_id == 0) {
                    vm.setMessage({
                        message: 'The item has been not selected!',
                        type: 'error'
                    });
                }
                else {
                    vm.loading = true;
                    vm.resource = vm.$resource(api.getEndpointUrl() + '/v1/route/digit_map/item/' + ref_id);
                    vm.resource.delete({ translation_id: ref_id }).then(function (response) {
                        vm.loading = false;
						let index = _.findIndex(vm.lists, elem => elem.translation_id  === ref_id)
						vm.lists.splice(index, 1)
						vm.setMessage('The items have been deleted!')
                    });
                }
            });
        },
        exportCSV: function () {
            var vm = this;		
            var csvArray = new Array();
            var fields = ["id", "ANI_action", "ANI_prefix", "ANI_replace_to", "DNIS_action", "DNIS_prefix", "DNIS_replace_to"];
            csvArray.push(fields);
            var csvContent = "data:text/csv;charset=utf-8,";                        
            this.lists.forEach(function (list, i) {
                var values = new Array();
                /*if(i != 0)
                {
                    csvContent += ",\n";
                } 
                csvContent += "{\n";
                csvContent += "id:" + list.ref_id + ",\n                                ";
                csvContent += "ANI_action:" + list.ANI_action + ",\n";
                csvContent += "ANI_prefix:" + list.ANI_prefix + ",\n";
                csvContent += "ANI_replace_to:" + list.ANI_replace_to + ",\n";                
                csvContent += "DNIS_action:" + list.DNIS_action + ",\n";
                csvContent += "DNIS_prefix:" + list.DNIS_prefix + ",\n";
                csvContent += "DNIS_replace_to:" + list.DNIS_replace_to + "\n";                
                csvContent += "}"; */                                   
                
                values.push(list.ref_id + "");
                values.push(list.ANI_action);
                values.push(list.ANI_prefix);
                values.push(list.ANI_replace_to);
                values.push(list.DNIS_action);
                values.push(list.DNIS_prefix);
                values.push(list.DNIS_replace_to);                
                csvArray.push(values);                
            });	                                
            //window.open(encodeURI(csvContent) );   
            exportToCsv('routing_digit_mapping_detail_export.csv', csvArray);         
		},
    },
    mounted: function () {
        $('[data-toggle="tooltip"]').tooltip();
    },
    updated: function () {
        document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
    },
    created: function () {
        this.fetchMapdetails();
    }
}
</script>

<style>
	.el-select__tags {
		display: none;
	}
</style>
