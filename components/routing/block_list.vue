<template>
    <div class="container-fluid">
        <div class="row">
            <div class="wrapper single">
                <time-display></time-display>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="#">Routing</a>
                    </li>
                    <li class="breadcrumb-item active">Block List</li>
                </ol>
                <h1 class="page-header">Block List</h1>
                <confirm v-show="showModal" @close="showModal = false" @submit="submit"></confirm>
                <tabs>
                    <tab label="List" class="" icon="dnl_icon dnl_list" selected>
                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-default" @click="createNew">
                                <span class="dnl_icon dnl_add"></span> Create New
                            </button>
                            <button type="button" class="btn btn-default">
                                <span class="dnl_icon dnl_action_delete"></span> Delete All
                            </button>
                            <button type="button" class="btn btn-default">
                                <span class="dnl_icon dnl_action_delete"></span> Delete Selected
                            </button>
                        </div>
                        <div class="advanced_search_filter_panel bottom_0">
                            <div class="inline-block">
                                <label>Ingress:</label>
                                <br>
                                <select2 :options="options2" v-model="ingress">
                                    <option disabled value="0">Ingress</option>
                                </select2>
                            </div>
                            <div class="inline-block">
                                <label>Egress:</label>
                                <br>
                                <select2 :options="options2" v-model="egress">
                                    <option disabled value="0">Egress</option>
                                </select2>
                            </div>
                            <div class="inline-block">
                                <div class="form-group">
                                    <label for="ani_prefix">ANI Prefix:</label>
                                    <input type="text" name="ani_prefix" v-model="ani_prefix" class="form-control" placeholder="Enter ANI Prefix">
                                </div>
                            </div>
                            <div class="inline-block">
                                <div class="form-group">
                                    <label for="dnis_prefix">DNIS Prefix:</label>
                                    <input type="text" name="dnis_prefix" v-model="dnis_prefix" class="form-control" placeholder="Enter DNIS Prefix">
                                </div>
                            </div>
                            <div class="inline-block medium">
                                <label>Blocked by:</label>
                                <br>
                                <select2 :options="options2" v-model="blocked_by">
                                    <option disabled value="0">Blocked by</option>
                                </select2>
                            </div>
                            <div class="inline-block">
                                <a class="btn btn-primary">
                                    Query
                                </a>
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
                                <el-select v-model="block_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
                                    <el-option v-for="item in block_table_column_options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <div class="table-responsive">
                            <table class="table table-striped table-hover aliases">
                                <thead>
                                    <tr>
                                        <th class="width-65" rowspan="2">
                                            <div class="checkbox checkbox-success">
                                                <input type="checkbox" v-model="checker">
                                                <label></label>
                                            </div>
                                        </th>
                                        <th v-if="showcolumns[0]" rowspan="2">Time Profile</th>
                                        <th v-if="showcolumns[1]" rowspan="2">Type</th>
                                        <th v-if="showcolumns[2]" rowspan="2">Egress Carrier</th>
                                        <th v-if="showcolumns[3]" rowspan="2">Egress Trunk</th>
                                        <th v-if="showcolumns[4]" rowspan="2">Ingress Carrier</th>
                                        <th v-if="showcolumns[5]" rowspan="2">Ingress Trunk</th>
                                        <th v-if="showcolumns[6]" rowspan="2">Block no ANI</th>
                                        <!--<th rowspan="2">ANI Prefix</th>-->
                                        <!--<th rowspan="2">DNIS Prefix</th>-->
                                        <th v-if="showcolumns[7]" colspan="4">ANI</th>
                                        <th v-if="showcolumns[8]" colspan="3">DNIS</th>
                                        <th v-if="showcolumns[9]" rowspan="2">Blocked By</th>
                                        <th v-if="showcolumns[10]" rowspan="2">Update By</th>
                                        <th v-if="showcolumns[11]" rowspan="2">Create Time</th>
                                        <th v-if="showcolumns[12]" rowspan="2" class="width_98">Action</th>
                                    </tr>
                                    <tr>
                                        <th v-if="showcolumns[7]">Empty</th>
                                        <th v-if="showcolumns[7]">Prefix</th>
                                        <th v-if="showcolumns[7]">Min</th>
                                        <th v-if="showcolumns[7]">Max</th>
                                        <th v-if="showcolumns[8]">Prefix</th>
                                        <th v-if="showcolumns[8]">Min</th>
                                        <th v-if="showcolumns[8]">Max</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="!block_list.length">
                                        <td style="text-align: center" colspan="19">No Data Found</td>
                                    </tr>										
                                    
                                    <tr v-for="block in block_list">
                                        <td></td>
                                        <td v-if="showcolumns[0]">{{block.time_profile}}</td>
                                        <td v-if="showcolumns[1]"></td>
                                        <td v-if="showcolumns[2]">{{block.egress_carrier}}</td>
                                        <td v-if="showcolumns[3]">{{block.egress_trunk}}</td>
                                        <td v-if="showcolumns[4]">{{block.ingress_carrier}}</td>
                                        <td v-if="showcolumns[5]">{{block.ingress_trunk}}</td>
                                        <td v-if="showcolumns[6]"></td>
                                        <td v-if="showcolumns[7]">{{block.ani_empty}}</td>
                                        <td v-if="showcolumns[7]">{{block.ANI_prefix}}</td>
                                        <td v-if="showcolumns[7]">{{block.ANI_min}}</td>
                                        <td v-if="showcolumns[7]">{{block.ANI_max}}</td>
                                        <td v-if="showcolumns[8]">{{block.DNIS_prefix}}</td>
                                        <td v-if="showcolumns[8]">{{block.DNIS_min}}</td>
                                        <td v-if="showcolumns[8]">{{block.DNIS_max}}</td>
                                        <td v-if="showcolumns[9]"></td>
                                        <td v-if="showcolumns[10]">{{block.update_by}}</td>
                                        <td v-if="showcolumns[11]">{{block.create_time}}</td>
                                        <td v-if="showcolumns[12]">
                                            <router-link to="" class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit"  @click.native="edit_block(block.res_block_id)">
                                                <span class="dnl_icon dnl_action_edit"></span>
                                            </router-link>
                                            <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="delete_block(block.res_block_id)">
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
                        <tabs class="vertical import_template">
							<tab label="Complete Field Upload" class="" icon="dnl_icon dnl_arrow-point-to-right" selected>
								<section class="role_section system_logo">
									<h2 class="role_section_name">Complete Field Upload</h2>
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
                                            <div class="form-group">
                                                <div class="form-group">
                                                    <div class="checkbox checkbox-success">
                                                        <input id="empty_ani" name="empty_ani" type="checkbox">
                                                        <label for="empty_ani">Empty ANI</label>
                                                    </div>
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
								</section>
							</tab>
							<tab label="Upload just ANI/DNIS" class="" icon="dnl_icon dnl_arrow-point-to-right">
								<section class="role_section system_logo">
									<h2 class="role_section_name">Upload just ANI/DNIS</h2>
									<div class="row">
                                        <div class="col-md-3 col-sm-4">
                                            <label>Import File:</label>
                                            <dropzone id="myVueDropzone1" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
                                        </div>
                                        <div class="col-md-3 col-sm-4">
                                            <div class="form-group">
                                                <label for="number_type">Number Type:</label>
                                                <select class="selectable" v-model="number_type">
                                                    <option v-for="item in number_type_options" v-bind:value="item.id">
                                                        {{ item.text }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-4">
                                            <div class="form-group">
                                                <label for="client_type">Client Type:</label>
                                                <select class="selectable" v-model="client_type" @change="changeClientType">
                                                    <option v-for="item in client_type_options" v-bind:value="item.id">
                                                        {{ item.text }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-4">
                                            <div class="form-group">
                                                <label for="type">Type:</label>
                                                <select class="selectable" v-model="type" @change="changeType">
                                                    <option v-for="item in type_options" v-bind:value="item.id">
                                                        {{ item.text }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-4" v-if="type == 'block by trunk'" @change="fetchRelatedTrunks">
                                            <div class="form-group">
                                                <label for="carrier">Carrier:</label>
                                                <select class="selectable" v-model="carrier">
                                                    <option v-for="item in carrier_options" v-bind:value="item.id">
                                                        {{ item.text }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-4" v-if="client_type == 'termination' && type == 'block by trunk'">
                                            <div class="form-group">
                                                <label for="egress_trunk">Egress Trunk:</label>
                                                <select class="selectable" v-model="egress_trunk">
                                                    <option v-for="item in egress_trunk_options" v-bind:value="item.id">
                                                        {{ item.text }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-4" v-if="client_type == 'origination' && type == 'block by trunk'">
                                            <div class="form-group">
                                                <label for="ingress_trunk">Ingress Trunk:</label>
                                                <select class="selectable" v-model="ingress_trunk">
                                                    <option v-for="item in ingress_trunk_options" v-bind:value="item.id">
                                                        {{ item.text }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-4" v-if="client_type == 'termination' && type == 'block by trunk group'">
                                            <div class="form-group">
                                                <label for="egress_trunk_group">Egress Trunk Group:</label>
                                                <select class="selectable" v-model="egress_trunk_group">
                                                    <option v-for="item in egress_trunk_group_options" v-bind:value="item.id">
                                                        {{ item.text }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-4" v-if="client_type == 'origination' && type == 'block by trunk group'">
                                            <div class="form-group">
                                                <label for="ingress_trunk_group">Ingress Trunk Group:</label>
                                                <select class="selectable" v-model="ingress_trunk_group">
                                                    <option v-for="item in ingress_trunk_group_options" v-bind:value="item.id">
                                                        {{ item.text }}
                                                    </option>
                                                </select>
                                            </div>
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
								</section>
							</tab>
						</tabs>
                        
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
                            <div class="col-md-3 col-sm-3">
                                <div class="form-group full-width-select">
                                    <label for="username">Column #13:</label>
                                    <select2 :options="options1" v-model="column_13"></select2>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-3">
                                <div class="form-group full-width-select">
                                    <label for="username">Column #14:</label>
                                    <select2 :options="options1" v-model="column_14"></select2>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-3">
                                <div class="form-group full-width-select">
                                    <label for="username">Column #15:</label>
                                    <select2 :options="options1" v-model="column_15"></select2>
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
    confirmmodal = require('vue!../main_components/confirm_delete.vue');
const api = require("../../api");
const auth = require("../../auth");
_ = require('lodash');
import {mapGetters,	mapActions} from 'vuex'

module.exports = {
    components: {
        'select2': vSelect,
        'pagination': Pagination,
        'tabs': vTabs,
        'tab': vTab,
        Dropzone,
        'confirm': confirmmodal,
    },
    data: function () {
        return {
            ingress_trunk: 0,
            ingress_trunk_options: [],
            egress_trunk: 0,
            egress_trunk_options: [],
            carrier: 0,
            carrier_options: [],
            type: 'block by trunk',
            type_options: [
                {id: 'block by trunk', text: 'Block By Trunk'},
                {id: 'block by trunk group', text: 'Block By Trunk Group'},
            ],
            client_type: 'termination',
            client_type_options: [
                {id: 'termination', text: 'Termination'},
                {id: 'origination', text: 'Origination'},
            ],
            number_type: 'ani',
            number_type_options: [
                {id: 'ani', text: 'ANI'},
                {id: 'dnis', text: 'DNIS'},
            ],
            selected_ids: [],
            apiUrl: '/v1/route/block/list',
            ingress: '',
            egress: '',
            ani_prefix: '',
            dnis_prefix: '',
            blocked_by: '',
            checker: '',
            showModal: '',
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
            column_13: '',
            column_14: '',
            column_15: '',
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
            lists: [
                {

                }
            ],
            block_list: [],
            block_table_column_options: [{
                value: 'Time Profile',
                label: 'Time Profile'
            }, {
                value: 'Type',
                label: 'Type'
            }, {
                value: 'Egress Carrier',
                label: 'Egress Carrier'
            }, {
                value: 'Egress Trunk',
                label: 'Egress Trunk'
            }, {
                value: 'Ingress Carrier',
                label: 'Ingress Carrier'
            }, {
                value: 'Ingress Trunk',
                label: 'Ingress Trunk'
            }, {
                value: 'Block no ANI',
                label: 'Block no ANI'
            }, {
                value: 'ANI',
                label: 'ANI'
            }, {
                value: 'DNIS',
                label: 'DNIS'
            }, {
                value: 'Blocked By',
                label: 'Blocked By'
            }, {
                value: 'Update By',
                label: 'Update By'
            }, {
                value: 'Create Time',
                label: 'Create Time'
            }, {
                value: 'Action',
                label: 'Action'
            }],
            block_table_columns: ['Time Profile', 'Type', 'Egress Carrier',
                'Egress Trunk', 'Ingress Carrier', 'Ingress Trunk',
                'Block no ANI', 'ANI', 'DNIS',
                'Blocked By', 'Update By', 'Create Time', 'Action'],
            showcolumns: [true, true, true, true, true, true, true, true, true, true, true, true, true],

        }
    },
    methods: {
        ...mapActions({
            setAsyncConfirm: 'async_confirm/setAsyncConfirm',
            setMessage: 'app_message/setAppMessage'
        }),
        createNew() {
            this.$router.push({path:"/routing/block_list/new"});
        },
        changeClientType() {
            if(this.type == 'block by trunk')
                this.fetchRelatedTrunks();
            else if(this.type == 'block by trunk group')
                this.fetchTrunkGroup();
        },
        changeType () {
            if(this.type == 'block by trunk')
                this.fetchRelatedTrunks();
            else if(this.type == 'block by trunk group')
                this.fetchTrunkGroup();
        },
        fetchTrunkGroup () {
            var url;
            if(this.client_type == 'termination')
                url = api.getEndpointUrl() + '/v1/trunk/group/list?trunk_type=egress';
            else if(this.client_type == 'origination')
                url = api.getEndpointUrl() + '/v1/trunk/group/list?trunk_type=ingress';
            this.$http.get(url)
            .then(response => {
                const body = response.body
                if (body.success) {
                    const groups = body.payload.items
                    console.log(groups);
                    var self = this;
                    if(this.client_type == 'termination') {
                        this.egress_trunk_group_options = [];
                        groups.forEach(function (temp, i) {
                            var group = {};
                            group.id = temp.group_id;
                            group.text = temp.group_name;
                            self.egress_trunk_group_options.push(group);
                        });
                    }
                    else if(this.client_type == 'origination') {
                        this.ingress_trunk_group_options = [];
                        groups.forEach(function (temp, i) {
                            var group = {};
                            group.id = temp.group_id;
                            group.text = temp.group_name;
                            self.ingress_trunk_group_options.push(group);
                        });
                    }
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        fetchRelatedTrunks () {
            var url;
            if(this.client_type == 'termination')
                url = api.getEndpointUrl() + '/v1/carrier/' + this.carrier + '/egress_trunk/list';
            else if(this.client_type == 'origination')
                url = api.getEndpointUrl() + '/v1/carrier/' + this.carrier + '/ingress_trunk/list';
            this.$http.get(url)
            .then(response => {
                const body = response.body
                if (body.success) {
                    const trunks = body.payload.items
                    console.log(trunks);
                    var self = this;
                    if(this.client_type == 'termination') {
                        this.egress_trunk_options = [];
                        trunks.forEach(function (temp, i) {
                            var trunk = {};
                            trunk.id = temp.resource_id;
                            trunk.text = temp.name;
                            self.egress_trunk_options.push(trunk);
                        });
                    }
                    else if(this.client_type == 'origination') {
                        this.ingress_trunk_options = [];
                        trunks.forEach(function (temp, i) {
                            var trunk = {};
                            trunk.id = temp.resource_id;
                            trunk.text = temp.name;
                            self.ingress_trunk_options.push(trunk);
                        });
                    }
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        fetchCarriers () {
            const url = api.getEndpointUrl() + '/v1/carrier/list'
            this.$http.get(url)
            .then(response => {
                const body = response.body
                if (body.success) {
                    const carriers = body.payload.items
                    console.log(carriers);
                    var self = this;
                    carriers.forEach(function (temp, i) {
                        var carrier = {};
                        carrier.id = temp.client_id;
                        carrier.text = temp.name;
                        self.carrier_options.push(carrier);
                        if(i == 0) {
                            self.carrier = carrier.id;
                            self.fetchRelatedTrunks();
                        }
                    });
                    console.log(this.carrier_options);
                    
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        edit_block: function(id) {
            this.$router.push({ path: "/routing/block_list/edit/" + id });
        },
        submit: function () {
            var vm = this;
            this.showModal = false;

            this.selected_ids.forEach(function (item, i) {
                var blockid = item;
                if (blockid == 0) {
                    vm.setMessage({
                        message: 'The block item has been not selected!',
                        type: 'error'
                    });
                }
                else {
                    vm.loading = true;
                    vm.resource = vm.$resource(api.getEndpointUrl() + '/v1/route/block/' + blockid);
                    vm.resource.delete({ res_block_id: blockid }).then(function (response) {
                        vm.loading = false;
						let index = _.findIndex(vm.block_list, elem => elem.res_block_id  === blockid)
						vm.block_list.splice(index, 1)
						vm.setMessage('The block item have been deleted!')
                    });
                }
            });
        },
        delete_block: function (id) {
            this.showModal = true;
            this.selected_ids = [];
            this.selected_ids.push(id);
        },
        handleChange() {
            if (_.indexOf(this.block_table_columns, 'Time Profile') != -1) {
                // this.showcolumns[0] = true;
                Vue.set(this.showcolumns, 0, true);
            }
            else {
                // this.showcolumns[0] = false;
                Vue.set(this.showcolumns, 0, false);
            }

            if (_.indexOf(this.block_table_columns, 'Type') != -1) {
                // this.showcolumns[1] = true;
                Vue.set(this.showcolumns, 1, true);
            }
            else {
                // this.showcolumns[1] = false;
                Vue.set(this.showcolumns, 1, false);
            }

            if (_.indexOf(this.block_table_columns, 'Egress Carrier') != -1) {
                // this.showcolumns[2] = true;
                Vue.set(this.showcolumns, 2, true);
            }
            else {
                // this.showcolumns[2] = false;
                Vue.set(this.showcolumns, 2, false);
            }

            if (_.indexOf(this.block_table_columns, 'Egress Trunk') != -1) {
                // this.showcolumns[3] = true;
                Vue.set(this.showcolumns, 3, true);
            }
            else {
                // this.showcolumns[3] = false;
                Vue.set(this.showcolumns, 3, false);
            }

            if (_.indexOf(this.block_table_columns, 'Ingress Carrier') != -1) {
                // this.showcolumns[4] = true;
                Vue.set(this.showcolumns, 4, true);
            }
            else {
                // this.showcolumns[4] = false;
                Vue.set(this.showcolumns, 4, false);
            }

            if (_.indexOf(this.block_table_columns, 'Ingress Trunk') != -1) {
                // this.showcolumns[5] = true;
                Vue.set(this.showcolumns, 5, true);
            }
            else {
                // this.showcolumns[5] = false;
                Vue.set(this.showcolumns, 5, false);
            }

            if (_.indexOf(this.block_table_columns, 'Block no ANI') != -1) {
                // this.showcolumns[6] = true;
                Vue.set(this.showcolumns, 6, true);
            }
            else {
                // this.showcolumns[6] = false;
                Vue.set(this.showcolumns, 6, false);
            }

            if (_.indexOf(this.block_table_columns, 'ANI') != -1) {
                // this.showcolumns[7] = true;
                Vue.set(this.showcolumns, 7, true);
            }
            else {
                // this.showcolumns[7] = false;
                Vue.set(this.showcolumns, 7, false);
            }

            if (_.indexOf(this.block_table_columns, 'DNIS') != -1) {
                // this.showcolumns[8] = true;
                Vue.set(this.showcolumns, 8, true);
            }
            else {
                // this.showcolumns[8] = false;
                Vue.set(this.showcolumns, 8, false);
            }

            if (_.indexOf(this.block_table_columns, 'Blocked By') != -1) {
                // this.showcolumns[9] = true;
                Vue.set(this.showcolumns, 9, true);
            }
            else {
                // this.showcolumns[9] = false;
                Vue.set(this.showcolumns, 9, false);
            }

            if (_.indexOf(this.block_table_columns, 'Update By') != -1) {
                // this.showcolumns[10] = true;
                Vue.set(this.showcolumns, 10, true);
            }
            else {
                // this.showcolumns[10] = false;
                Vue.set(this.showcolumns, 10, false);
            }

            if (_.indexOf(this.block_table_columns, 'Create Time') != -1) {
                // this.showcolumns[11] = true;
                Vue.set(this.showcolumns, 11, true);
            }
            else {
                // this.showcolumns[11] = false;
                Vue.set(this.showcolumns, 11, false);
            }

            if (_.indexOf(this.block_table_columns, 'Action') != -1) {
                // this.showcolumns[12] = true;
                Vue.set(this.showcolumns, 12, true);
            }
            else {
                // this.showcolumns[12] = false;
                Vue.set(this.showcolumns, 12, false);
            }

            console.log(this.showcolumns);


            // this.$nextTick(() => {
            // 	document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
            // });
        },
        fetchBlocks() {
            this.loading = true;
            var page = this.pageOne.currentPage - 1;
            var per_page = this.pageOne.cntpage;
            console.log("page => " + page + " , per_page => " + per_page);
            this.loading = true;

            this.$http.get(api.getEndpointUrl() + this.apiUrl + "?page=" + page + "&per_page=" + per_page + "&order_by=res_block_id&order_dir=desc",
                {
                    headers: {
                        "X-Auth-Token": auth.getToken()
                    }
                }).then(function (response) {
                    this.loading = false;
                    //todo: check success flag? validation errors?
                    var block_list = response.body.payload.items;
                    console.log("block_list-->" + block_list);
                    this.block_list = block_list;
                    console.log(this.block_list);
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
                this.$nextTick(this.fetchBlocks)
            }
        },
        changePageCount (countPerPage) {
            if (countPerPage !== this.pageOne.cntpage) {
                this.pageOne.cntpage = countPerPage
                this.$nextTick(this.fetchBlocks)
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
        'process': function () {
            var newArr = this.$children.filter(function (item) {
                return item.id === "myVueDropzone1";
            });
            var component = newArr[0];
            component.processQueue()
        },
        exportCSV: function(){
            var vm = this;		
            var csvArray = new Array();
            var fields = ["time_profile", "type", "egress_carrier", "egress_trunk", "ingress_carrier", "ingress_trunk", "block_ani", "ani_empty", "ANI_prefix", "ANI_min", "ANI_max", "DNIS_prefix", "DNIS_min", "DNIS_max", "blocked_by", "update_by", "create_time"];
            csvArray.push(fields);
            var csvContent = "data:text/csv;charset=utf-8,";                        
            this.block_list.forEach(function (block, i) {
                var values = new Array();
                
                if(block.time_profile == null)
                    values.push("");
                else
                    values.push(block.time_profile + "");
                values.push("");

                if(block.egress_carrier == undefined)
                    values.push(block.egress_carrier);
                else
                    values.push(block.egress_carrier + "");

                if(block.egress_trunk == undefined)
                    values.push(block.egress_trunk);
                else
                    values.push(block.egress_trunk + "");

                if(block.ingress_carrier == undefined)
                    values.push(block.ingress_carrier);
                else
                    values.push(block.ingress_carrier + "");

                if(block.ingress_trunk == undefined)
                    values.push(block.ingress_trunk);
                else
                    values.push(block.ingress_trunk + "");

                values.push("");

                if(block.ani_empty == undefined)
                    values.push(block.ani_empty);
                else
                    values.push(block.ani_empty + "");
                
                values.push(block.ANI_prefix + "");

                if(block.ANI_min == null)
                    values.push("");
                else
                    values.push(block.ANI_min + "");
                
                if(block.ANI_max == null)
                    values.push("");
                else
                    values.push(block.ANI_max + "");
                
                values.push(block.DNIS_prefix + "");

                if(block.DNIS_min == null)
                    values.push("");
                else
                    values.push(block.DNIS_min + "");
                
                if(block.DNIS_max == null)
                    values.push("");
                else
                    values.push(block.DNIS_max + "");

                values.push("");

                if(block.update_by == undefined)
                    values.push(block.update_by);
                else
                    values.push(block.update_by + "");
                
                if(block.create_time == undefined)
                    values.push(block.create_time);
                else
                    values.push(block.create_time + "");
                
                csvArray.push(values);                
            });	                                
            //window.open(encodeURI(csvContent) );   
            exportToCsv('routing_block_list_export.csv', csvArray); 
        }        
    },
    mounted: function () {
        $('[data-toggle="tooltip"]').tooltip();
    },
    updated: function () {
        document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
    },
    created: function () {
        this.fetchBlocks();
        this.fetchCarriers();
        this.fetchTrunkGroup();
    }
}
</script>

<style>
a.action.action_priority {
    padding-top: 4px;
    line-height: 0;
    font-size: 19px;
    vertical-align: top;
}

a.action.action_priority .dnl_icon.dnl_ingress_host {
    float: none;
    margin: 0;
}

.el-select__tags {
    display: none;
}

.import_template {
    height: 500px;
}
</style>
