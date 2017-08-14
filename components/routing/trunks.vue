<template>
    <div class="container-fluid">
        <div class="row">
            <div class="wrapper single">
                <time-display></time-display>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="#">Routing</a>
                    </li>
                    <li class="breadcrumb-item active">Trunks</li>
                </ol>
                <tabs @activateTab="activateTab">
                    <tab label="Egress Trunk" class="" icon="dnl_icon dnl_to_left" selected>
                        <h1 class="page-header">Egress Trunk</h1>
                        <confirm v-show="showEgressModal" @close="showEgressModal = false" @submit="submitDeleteEgress"></confirm>
                        <div class="btn-group m-top-10" role="group">
                            <router-link :to="'/routing/trunks/'+trunk_type+'/new'" class="btn btn-default create_new_iconed">
                                <span class="dnl_icon dnl_add"></span> Create New</router-link>
                            <button type="button" class="btn btn-default" @click="deleteAll('egress')">
                                <span class="dnl_icon dnl_action_delete"></span> Delete All
                            </button>
                            <button type="button" class="btn btn-default" @click="deleteSelected('egress')">
                                <span class="dnl_icon dnl_action_delete"></span> Delete Selected
                            </button>
                        </div>
                        <tabs class="vertical mail_template">
                            <tab label="Egress List" class="" icon="dnl_icon dnl_arrow-point-to-right" selected>
                                <section class="role_section system_logo">
                                    <h2 class="role_section_name">Egress List</h2>
                                    <div class="advanced_search_filter_panel">
                                        <div class="inline-block search_wrapper">
                                            <label>Search:</label>
                                            <br>
                                            <input type="text" name="search" v-model="search" class="form-control inline-block search_field" placeholder="Enter Search">
                                            <span class="dnl_icon dnl_musica-searcher"></span>
                                        </div>
                                        <div class="inline-block" style="width: 100px; margin-right: 20px;">
                                            <label>Status:</label>
                                            <br>
                                            <select2 :options="status_options" v-model="status">
                                            </select2>
                                        </div>
                                        <div class="inline-block" style="width: 100px; margin-right: 20px;">
                                            <label>Page row:</label>
                                            <br>
                                            <select2 :options="page_count_options" v-model="egress_page_count" class="inline-block" @pagecount="egressChangePageCount">
                                            </select2>
                                        </div>
                                        <div class="inline-block">
                                            <el-select v-model="egress_trunk_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChangeEgress">
                                                <el-option v-for="item in egress_trunk_table_column_options" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div> 
                                    </div>
                                    <div class="table-responsive big_data">
                                        <table class="table table-striped table-hover carrier_groups">
                                            <thead>
                                                <tr>
                                                    <th class="width-65">
                                                        <div class="checkbox checkbox-success">
                                                            <input type="checkbox" v-model="checker">
                                                            <label></label>
                                                        </div>
                                                    </th>
                                                    <th v-if="egress_trunk_showcolumns[0]">Host Port</th>
                                                    <th v-if="egress_trunk_showcolumns[1]">Egress ID</th>
                                                    <th v-if="egress_trunk_showcolumns[2]">Egress Name</th>
                                                    <th v-if="egress_trunk_showcolumns[3]">Carriers</th>
                                                    <th v-if="egress_trunk_showcolumns[4]">Call Limit</th>
                                                    <th v-if="egress_trunk_showcolumns[5]">CPS Limit</th>
                                                    <th v-if="egress_trunk_showcolumns[6]">Usage Count</th>
                                                    <th v-if="egress_trunk_showcolumns[7]">Rate Table</th>
                                                    <th v-if="egress_trunk_showcolumns[8]">Protocol</th>
                                                    <th v-if="egress_trunk_showcolumns[9]">PDD Timeout</th>
                                                    <th v-if="egress_trunk_showcolumns[10]">Update at</th>
                                                    <th v-if="egress_trunk_showcolumns[11]">Update by</th>
                                                    <th v-if="egress_trunk_showcolumns[12]" class="width_190">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="egress in filterBy(egress_lists, search)">
                                                    <td class="centred_checkbox">
                                                        <div class="checkbox checkbox-success">
                                                            <input :id="'egress-' + egress.resource_id" :name="'egress-' + egress.resource_id" type="checkbox" v-model="egress.status">
                                                            <label :for="'egress-' + egress.resource_id"></label>
                                                        </div>
                                                    </td>
                                                    <td v-if="egress_trunk_showcolumns[0]">
                                                        <a class="action action_read" data-toggle="tooltip" data-placement="top" title="View" @click="viewHost(egress.resource_id)">
                                                            <span class="dnl_icon dnl_eye"></span>
                                                        </a>
                                                    </td>
                                                    <td v-if="egress_trunk_showcolumns[1]">{{egress.resource_id}}</td>
                                                    <td v-if="egress_trunk_showcolumns[2]">{{egress.name}}</td>
                                                    <td v-if="egress_trunk_showcolumns[3]">{{egress.carrier_id}}</td>
                                                    <td v-if="egress_trunk_showcolumns[4]">{{egress.call_limit}}</td>
                                                    <td v-if="egress_trunk_showcolumns[5]">{{egress.cps_limit}}</td>
                                                    <td v-if="egress_trunk_showcolumns[6]">{{egress.route_strategy!=null?egress.route_strategy.usage_count:null}}</td>
                                                    <td v-if="egress_trunk_showcolumns[7]">{{egress.rate_table}}</td>
                                                    <td v-if="egress_trunk_showcolumns[8]">{{egress.protocol}}</td>
                                                    <td v-if="egress_trunk_showcolumns[9]">{{egress.pdd_timeout}}</td>
                                                    <td v-if="egress_trunk_showcolumns[10]">{{egress.route_strategy!=null?egress.route_strategy.update_at:null}}</td>
                                                    <td v-if="egress_trunk_showcolumns[11]">{{egress.route_strategy!=null?egress.route_strategy.update_by:null}}</td>
                                                    <td v-if="egress_trunk_showcolumns[12]">
                                                        <a class="action action_send" data-toggle="tooltip" data-placement="top" title="Send Interop">
                                                            <span class="dnl_icon dnl_support"></span>
                                                        </a>
                                                        <a class="action action_save_template" data-toggle="tooltip" data-placement="top" title="Save as Template">
                                                            <span class="dnl_icon dnl_label"></span>
                                                        </a>
                                                        <a class="action action_activate" data-toggle="tooltip" data-placement="top" title="Deactivate">
                                                            <span class="dnl_icon dnl_check"></span>
                                                        </a>
                                                        <router-link to="" class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" @click.native="edit_trunk(egress.resource_id, 'egress');">
                                                            <span class="dnl_icon dnl_action_edit"></span>
                                                        </router-link>
                                                        <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="delete_egress_trunk(egress.resource_id)">
                                                            <span class="dnl_icon dnl_action_delete"></span>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="pull-right pagination">
                                        <pagination :current-page="egressPageOne.currentPage" :total-pages="egressPageOne.totalPages" @page-changed="egressPageOneChanged">
                                        </pagination>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="clearfix little-space"></div>
                                </section>
                            </tab>
                            <tab label="Egress Import" class="" icon="dnl_icon dnl_arrow-point-to-right">
                                <section class="role_section">
                                    <h2 class="role_section_name">Egress Import</h2>
                                    <div class="col-md-5 col-sm-6">
                                        <label>Import File:</label>
                                        <dropzone id="myVueDropzone" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
                                    </div>
                                    <div class="col-md-7 col-sm-6">
                                        <label>Dublicate:</label>
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
                                    <div class="button_set col-md-12 col-sm-12">
                                        <a class="btn btn-primary mini">
                                            Upload
                                        </a>
                                    </div>
                                    <div class="clearfix"></div>
                                </section>
                            </tab>
                            <tab label="Egress Export" class="" icon="dnl_icon dnl_arrow-point-to-right">
                                <section class="role_section">
                                    <h2 class="role_section_name">Egress Export</h2>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Data Format:</label>
                                            <select2 :options="data_format_options" v-model="egress_data_format"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group m-top-33">
                                            <div class="checkbox checkbox-success">
                                                <input id="egress_with_headers_row" name="egress_with_headers_row" type="checkbox" v-model="egress_with_headers_row">
                                                <label for="egress_with_headers_row">With headers row</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group">
                                            <label>Header Text:</label>
                                            <textarea v-model="header_text" class="form-control" placeholder="Enter Header Text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group">
                                            <label>Footer Text:</label>
                                            <textarea v-model="footer_text" class="form-control" placeholder="Enter Footer Text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #1:</label>
                                            <select class="selectable" v-model="egress_column_1">
												<option v-for="item in egress_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #2:</label>
                                            <select class="selectable" v-model="egress_column_2">
												<option v-for="item in egress_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #3:</label>
                                            <select class="selectable" v-model="egress_column_3">
												<option v-for="item in egress_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #4:</label>
                                            <select class="selectable" v-model="egress_column_4">
												<option v-for="item in egress_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #5:</label>
                                            <select class="selectable" v-model="egress_column_5">
												<option v-for="item in egress_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #6:</label>
                                            <select class="selectable" v-model="egress_column_6">
												<option v-for="item in egress_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #7:</label>
                                            <select class="selectable" v-model="egress_column_7">
												<option v-for="item in egress_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #8:</label>
                                            <select class="selectable" v-model="egress_column_8">
												<option v-for="item in egress_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #9:</label>
                                            <select class="selectable" v-model="egress_column_9">
												<option v-for="item in egress_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #10:</label>
                                            <select class="selectable" v-model="egress_column_10">
												<option v-for="item in egress_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #11:</label>
                                            <select class="selectable" v-model="egress_column_11">
												<option v-for="item in egress_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #12:</label>
                                            <select class="selectable" v-model="egress_column_12">
												<option v-for="item in egress_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #13:</label>
                                            <select class="selectable" v-model="egress_column_13">
												<option v-for="item in egress_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #14:</label>
                                            <select class="selectable" v-model="egress_column_14">
												<option v-for="item in egress_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="button_set center-block text-center">
                                        <a class="btn btn-primary mini">
                                            Download
                                        </a>
                                    </div>
                                </section>
                            </tab>
                            <tab label="Import Host" class="" icon="dnl_icon dnl_arrow-point-to-right">
                                <section class="role_section">
                                    <h2 class="role_section_name">Egress Import</h2>
                                    <div class="col-md-5 col-sm-6">
                                        <label>Import Host:</label>
                                        <dropzone id="myVueDropzone2" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
                                    </div>
                                    <div class="col-md-7 col-sm-6">
                                        <label>Dublicate:</label>
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
                                    <div class="button_set col-md-12 col-sm-12">
                                        <a class="btn btn-primary mini">
                                            Upload
                                        </a>
                                    </div>
                                    <div class="clearfix"></div>
                                </section>
                            </tab>
                            <tab label="Export Host" class="" icon="dnl_icon dnl_arrow-point-to-right">
                                <section class="role_section">
                                    <h2 class="role_section_name">Export Host</h2>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Data Format:</label>
                                            <select2 :options="data_format_options" v-model="host_data_format"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group m-top-33">
                                            <div class="checkbox checkbox-success">
                                                <input id="egress_host_with_headers_row" name="egress_host_with_headers_row" type="checkbox" v-model="egress_host_with_headers_row">
                                                <label for="egress_host_with_headers_row">With headers row</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group">
                                            <label>Header Text:</label>
                                            <textarea v-model="header_text" class="form-control" placeholder="Enter Header Text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group">
                                            <label>Footer Text:</label>
                                            <textarea v-model="footer_text" class="form-control" placeholder="Enter Footer Text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #1:</label>
                                            <select class="selectable" v-model="host_column_1">
												<option v-for="item in host_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #2:</label>
                                            <select class="selectable" v-model="host_column_2">
												<option v-for="item in host_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #3:</label>
                                            <select class="selectable" v-model="host_column_3">
												<option v-for="item in host_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="button_set center-block text-center">
                                        <a class="btn btn-primary mini">
                                            Download
                                        </a>
                                    </div>
                                </section>
                            </tab>
                            <tab label="Import Action" class="" icon="dnl_icon dnl_arrow-point-to-right">
                                <section class="role_section">
                                    <h2 class="role_section_name">Import Action</h2>
                                    <div class="col-md-5 col-sm-6">
                                        <label>Import Host:</label>
                                        <dropzone id="myVueDropzone3" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
                                    </div>
                                    <div class="col-md-7 col-sm-6">
                                        <label>Dublicate:</label>
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
                                    <div class="button_set col-md-12 col-sm-12">
                                        <a class="btn btn-primary mini">
                                            Upload
                                        </a>
                                    </div>
                                    <div class="clearfix"></div>
                                </section>
                            </tab>
                            <tab label="Export Action" class="" icon="dnl_icon dnl_arrow-point-to-right">
                                <section class="role_section">
                                    <h2 class="role_section_name">Export Action</h2>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Data Format:</label>
                                            <select2 :options="data_format_options" v-model="egress_action_data_format"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group m-top-33">
                                            <div class="checkbox checkbox-success">
                                                <input id="egress_action_with_headers_row" name="egress_action_with_headers_row" type="checkbox" v-model="egress_action_with_headers_row">
                                                <label for="egress_action_with_headers_row">With headers row</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group">
                                            <label>Header Text:</label>
                                            <textarea v-model="header_text" class="form-control" placeholder="Enter Header Text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group">
                                            <label>Footer Text:</label>
                                            <textarea v-model="footer_text" class="form-control" placeholder="Enter Footer Text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #1:</label>
                                            <select class="selectable" v-model="egress_action_column_1">
												<option v-for="item in action_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #2:</label>
                                            <select class="selectable" v-model="egress_action_column_2">
												<option v-for="item in action_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #3:</label>
                                            <select class="selectable" v-model="egress_action_column_3">
												<option v-for="item in action_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #4:</label>
                                            <select class="selectable" v-model="egress_action_column_4">
												<option v-for="item in action_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #5:</label>
                                            <select class="selectable" v-model="egress_action_column_5">
												<option v-for="item in action_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #6:</label>
                                            <select class="selectable" v-model="egress_action_column_6">
												<option v-for="item in action_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #7:</label>
                                            <select class="selectable" v-model="egress_action_column_7">
												<option v-for="item in action_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #8:</label>
                                            <select class="selectable" v-model="egress_action_column_8">
												<option v-for="item in action_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="button_set center-block text-center">
                                        <a class="btn btn-primary mini">
                                            Download
                                        </a>
                                    </div>
                                </section>
                            </tab>
                        </tabs>
                        <div class="clearfix"></div>
                    </tab>
                    <tab label="Ingress Trunk" class="" icon="dnl_icon dnl_to_right">
                        <h1 class="page-header">Ingress Trunk</h1>
                        <confirm v-show="showIngressModal" @close="showIngressModal = false" @submit="submitDeleteIngress"></confirm>
                        <div class="btn-group m-top-10" role="group">
                            <button type="button" class="btn btn-default create_new_iconed" @click="createNew">
                                <span class="dnl_icon dnl_add"></span> Create New
                            </button>
                            <button type="button" class="btn btn-default"  @click="deleteAll('ingress')">
                                <span class="dnl_icon dnl_action_delete"></span> Delete All
                            </button>
                            <button type="button" class="btn btn-default" @click="deleteSelected('ingress')">
                                <span class="dnl_icon dnl_action_delete"></span> Delete Selected
                            </button>
                        </div>
                        <tabs class="vertical mail_template">
                            <tab label="Ingress List" class="" icon="dnl_icon dnl_arrow-point-to-right" selected>
                                <section class="role_section system_logo">
                                    <h2 class="role_section_name">Ingress Trunk</h2>
                                    <div class="advanced_search_filter_panel">
                                        <div class="inline-block search_wrapper">
                                            <label>Search:</label>
                                            <br>
                                            <input type="text" name="search" v-model="search" class="form-control inline-block search_field" placeholder="Enter Search">
                                            <span class="dnl_icon dnl_musica-searcher"></span>
                                        </div>
                                        <div class="inline-block" style="width: 100px; margin-right: 20px;">
                                            <label>Status:</label>
                                            <br>
                                            <select2 :options="status_options" v-model="status">
                                            </select2>
                                        </div>
                                        <div class="inline-block" style="width: 100px; margin-right: 20px;">
                                            <label>Page row:</label>
                                            <br>
                                            <select2 :options="page_count_options" v-model="ingress_page_count" class="inline-block" @pagecount="ingressChangePageCount">
                                            </select2>
                                        </div>
                                        <div class="inline-block">
                                            <el-select v-model="ingress_trunk_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChangeIngress">
                                                <el-option v-for="item in ingress_trunk_table_column_options" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div> 
                                    </div>
                                    <div class="table-responsive big_data">
                                        <table class="table table-striped table-hover carrier_groups">
                                            <thead>
                                                <tr>
                                                    <th class="width-65">
                                                        <div class="checkbox checkbox-success">
                                                            <input type="checkbox" v-model="checker">
                                                            <label></label>
                                                        </div>
                                                    </th>
                                                    <th v-if="ingress_trunk_showcolumns[0]">Host Port</th>
                                                    <th v-if="ingress_trunk_showcolumns[1]">Ingress ID</th>
                                                    <th v-if="ingress_trunk_showcolumns[2]">Ingress Name</th>
                                                    <th v-if="ingress_trunk_showcolumns[3]">Carriers</th>
                                                    <th v-if="ingress_trunk_showcolumns[4]">Call Limit</th>
                                                    <th v-if="ingress_trunk_showcolumns[5]">CPS Limit</th>
                                                    <th v-if="ingress_trunk_showcolumns[6]">Trunk Count</th>
                                                    <th v-if="ingress_trunk_showcolumns[7]">Margin</th>
                                                    <th v-if="ingress_trunk_showcolumns[8]">PDD Timeout</th>
                                                    <th v-if="ingress_trunk_showcolumns[9]">Update at</th>
                                                    <th v-if="ingress_trunk_showcolumns[10]">Update by</th>
                                                    <th v-if="ingress_trunk_showcolumns[11]" class="width_190">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="ingress in orderBy(ingress_lists, 'carrier_name')">
                                                    <td class="centred_checkbox">
                                                        <div class="checkbox checkbox-success">
                                                            <input :id="'ingress-' + ingress.resource_id" :name="'ingress-' + ingress.resource_id" type="checkbox" v-model="ingress.status">
                                                            <label :for="'ingress-' + ingress.resource_id"></label>
                                                        </div>
                                                    </td>
                                                    <td v-if="ingress_trunk_showcolumns[0]">
                                                        <a class="action action_read" data-toggle="tooltip" data-placement="top" title="View" @click="showModal='host_port'">
                                                            <span class="dnl_icon dnl_eye"></span>
                                                        </a>
                                                    </td>
                                                    <td v-if="ingress_trunk_showcolumns[1]">{{ingress.resource_id}}</td>
                                                    <td v-if="ingress_trunk_showcolumns[2]">{{ingress.name}}</td>
                                                    <td v-if="ingress_trunk_showcolumns[3]">{{ingress.carrier_id}}</td>
                                                    <td v-if="ingress_trunk_showcolumns[4]">{{ingress.call_limit}}</td>
                                                    <td v-if="ingress_trunk_showcolumns[5]">{{ingress.cps_limit}}</td>
                                                    <td v-if="ingress_trunk_showcolumns[6]">{{ingress.usage_count}}</td>
                                                    <td v-if="ingress_trunk_showcolumns[7]">{{ingress.rate_table}}</td>
                                                    <td v-if="ingress_trunk_showcolumns[8]">{{ingress.pdd_timeout}}</td>
                                                    <td v-if="ingress_trunk_showcolumns[9]">{{ingress.update_at}}</td>
                                                    <td v-if="ingress_trunk_showcolumns[10]">{{ingress.update_by}}</td>
                                                    <td v-if="ingress_trunk_showcolumns[11]">
                                                        <a class="action action_send" data-toggle="tooltip" data-placement="top" title="Send Interop">
                                                            <span class="dnl_icon dnl_support"></span>
                                                        </a>
                                                        <a class="action action_save_template" data-toggle="tooltip" data-placement="top" title="Save as Template">
                                                            <span class="dnl_icon dnl_label"></span>
                                                        </a>
                                                        <a class="action action_activate" data-toggle="tooltip" data-placement="top" title="Deactivate">
                                                            <span class="dnl_icon dnl_check"></span>
                                                        </a>
                                                        <router-link to="/routing/trunks/new" class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" @click.native="edit_trunk(ingress.resource_id, 'ingress');">
                                                            <span class="dnl_icon dnl_action_edit"></span>
                                                        </router-link>
                                                        <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="delete_ingress_trunk(ingress.resource_id)">
                                                            <span class="dnl_icon dnl_action_delete"></span>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="pull-right pagination">
                                        <pagination :current-page="ingressPageOne.currentPage" :total-pages="ingressPageOne.totalPages" @page-changed="ingressPageOneChanged">
                                        </pagination>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="clearfix little-space"></div>
                                </section>
                            </tab>
                            <tab label="Ingress Import" class="" icon="dnl_icon dnl_arrow-point-to-right">
                                <section class="role_section">
                                    <h2 class="role_section_name">Ingress Import</h2>
                                    <div class="col-md-5 col-sm-6">
                                        <label>Import File:</label>
                                        <dropzone id="myVueDropzone4" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
                                    </div>
                                    <div class="col-md-7 col-sm-6">
                                        <label>Dublicate:</label>
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
                                    <div class="button_set col-md-12 col-sm-12">
                                        <a class="btn btn-primary mini">
                                            Upload
                                        </a>
                                    </div>
                                    <div class="clearfix"></div>
                                </section>
                            </tab>
                            <tab label="Ingress Export" class="" icon="dnl_icon dnl_arrow-point-to-right">
                                <section class="role_section">
                                    <h2 class="role_section_name">Ingress Export</h2>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Data Format:</label>
                                            <select2 :options="data_format_options" v-model="ingress_export_data_format"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group m-top-33">
                                            <div class="checkbox checkbox-success">
                                                <input id="ingress_with_headers_row" name="ingress_with_headers_row" type="checkbox" v-model="ingress_with_headers_row">
                                                <label for="ingress_with_headers_row">With headers row</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group">
                                            <label>Header Text:</label>
                                            <textarea v-model="header_text" class="form-control" placeholder="Enter Header Text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group">
                                            <label>Footer Text:</label>
                                            <textarea v-model="footer_text" class="form-control" placeholder="Enter Footer Text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #1:</label>
                                            <select class="selectable" v-model="ingress_export_column_1">
												<option v-for="item in ingress_export_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #2:</label>
                                            <select class="selectable" v-model="ingress_export_column_2">
												<option v-for="item in ingress_export_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #3:</label>
                                            <select class="selectable" v-model="ingress_export_column_3">
												<option v-for="item in ingress_export_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #4:</label>
                                            <select class="selectable" v-model="ingress_export_column_4">
												<option v-for="item in ingress_export_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #5:</label>
                                            <select class="selectable" v-model="ingress_export_column_5">
												<option v-for="item in ingress_export_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #6:</label>
                                            <select class="selectable" v-model="ingress_export_column_6">
												<option v-for="item in ingress_export_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #7:</label>
                                            <select class="selectable" v-model="ingress_export_column_7">
												<option v-for="item in ingress_export_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #8:</label>
                                            <select class="selectable" v-model="ingress_export_column_8">
												<option v-for="item in ingress_export_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #9:</label>
                                            <select class="selectable" v-model="ingress_export_column_9">
												<option v-for="item in ingress_export_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #10:</label>
                                            <select class="selectable" v-model="ingress_export_column_10">
												<option v-for="item in ingress_export_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #11:</label>
                                            <select class="selectable" v-model="ingress_export_column_11">
												<option v-for="item in ingress_export_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #12:</label>
                                            <select class="selectable" v-model="ingress_export_column_12">
												<option v-for="item in ingress_export_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #13:</label>
                                            <select class="selectable" v-model="ingress_export_column_13">
												<option v-for="item in ingress_export_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #14:</label>
                                            <select class="selectable" v-model="ingress_export_column_14">
												<option v-for="item in ingress_export_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #15:</label>
                                            <select class="selectable" v-model="ingress_export_column_15">
												<option v-for="item in ingress_export_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #16:</label>
                                            <select class="selectable" v-model="ingress_export_column_16">
												<option v-for="item in ingress_export_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #17:</label>
                                            <select class="selectable" v-model="ingress_export_column_17">
												<option v-for="item in ingress_export_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="button_set center-block text-center">
                                        <a class="btn btn-primary mini">
                                            Download
                                        </a>
                                    </div>
                                </section>
                            </tab>
                            <tab label="Import Host" class="" icon="dnl_icon dnl_arrow-point-to-right">
                                <section class="role_section">
                                    <h2 class="role_section_name">Import Host</h2>
                                    <div class="col-md-5 col-sm-6">
                                        <label>Import File:</label>
                                        <dropzone id="myVueDropzone7" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
                                    </div>
                                    <div class="col-md-7 col-sm-6">
                                        <label>Dublicate:</label>
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
                                    <div class="button_set col-md-12 col-sm-12">
                                        <a class="btn btn-primary mini">
                                            Upload
                                        </a>
                                    </div>
                                    <div class="clearfix"></div>
                                </section>
                            </tab>
                            <tab label="Export Host" class="" icon="dnl_icon dnl_arrow-point-to-right">
                                <section class="role_section">
                                    <h2 class="role_section_name">Export Host</h2>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Data Format:</label>
                                            <select2 :options="data_format_options" v-model="ingress_host_data_format"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group m-top-33">
                                            <div class="checkbox checkbox-success">
                                                <input id="ingress_host_with_headers_row" name="ingress_host_with_headers_row" type="checkbox" v-model="ingress_host_with_headers_row">
                                                <label for="ingress_host_with_headers_row">With headers row</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group">
                                            <label>Header Text:</label>
                                            <textarea v-model="header_text" class="form-control" placeholder="Enter Header Text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group">
                                            <label>Footer Text:</label>
                                            <textarea v-model="footer_text" class="form-control" placeholder="Enter Footer Text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #1:</label>
                                            <select class="selectable" v-model="ingress_host_column_1">
												<option v-for="item in host_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #2:</label>
                                            <select class="selectable" v-model="ingress_host_column_2">
												<option v-for="item in host_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #3:</label>
                                            <select class="selectable" v-model="ingress_host_column_3">
												<option v-for="item in host_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="button_set center-block text-center">
                                        <a class="btn btn-primary mini">
                                            Download
                                        </a>
                                    </div>
                                </section>
                            </tab>
                            <tab label="Import Action" class="" icon="dnl_icon dnl_arrow-point-to-right">
                                <section class="role_section">
                                    <h2 class="role_section_name">Import Action</h2>
                                    <div class="col-md-5 col-sm-6">
                                        <label>Import File:</label>
                                        <dropzone id="myVueDropzone5" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
                                    </div>
                                    <div class="col-md-7 col-sm-6">
                                        <label>Dublicate:</label>
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
                                    <div class="button_set col-md-12 col-sm-12">
                                        <a class="btn btn-primary mini">
                                            Upload
                                        </a>
                                    </div>
                                    <div class="clearfix"></div>
                                </section>
                            </tab>
                            <tab label="Export Action" class="" icon="dnl_icon dnl_arrow-point-to-right">
                                <section class="role_section">
                                    <h2 class="role_section_name">Export Action</h2>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Data Format:</label>
                                            <select2 :options="data_format_options" v-model="ingress_action_data_format"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group m-top-33">
                                            <div class="checkbox checkbox-success">
                                                <input id="ingress_export_with_headers_row" name="ingress_export_with_headers_row" type="checkbox" v-model="ingress_export_with_headers_row">
                                                <label for="ingress_export_with_headers_row">With headers row</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group">
                                            <label>Header Text:</label>
                                            <textarea v-model="header_text" class="form-control" placeholder="Enter Header Text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group">
                                            <label>Footer Text:</label>
                                            <textarea v-model="footer_text" class="form-control" placeholder="Enter Footer Text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #1:</label>
                                            <select class="selectable" v-model="ingress_action_column_1">
												<option v-for="item in action_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #2:</label>
                                            <select class="selectable" v-model="ingress_action_column_2">
												<option v-for="item in action_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #3:</label>
                                            <select class="selectable" v-model="ingress_action_column_3">
												<option v-for="item in action_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #4:</label>
                                            <select class="selectable" v-model="ingress_action_column_4">
												<option v-for="item in action_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #5:</label>
                                            <select class="selectable" v-model="ingress_action_column_5">
												<option v-for="item in action_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #6:</label>
                                            <select class="selectable" v-model="ingress_action_column_6">
												<option v-for="item in action_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #7:</label>
                                            <select class="selectable" v-model="ingress_action_column_7">
												<option v-for="item in action_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #8:</label>
                                            <select class="selectable" v-model="ingress_action_column_8">
												<option v-for="item in action_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="button_set center-block text-center">
                                        <a class="btn btn-primary mini">
                                            Download
                                        </a>
                                    </div>
                                </section>
                            </tab>
                            <tab label="Import Digit Mapping" class="" icon="dnl_icon dnl_arrow-point-to-right">
                                <section class="role_section">
                                    <h2 class="role_section_name">Import Digit Mapping</h2>
                                    <div class="col-md-5 col-sm-6">
                                        <label>Import File:</label>
                                        <dropzone id="myVueDropzone6" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
                                    </div>
                                    <div class="col-md-7 col-sm-6">
                                        <label>Dublicate:</label>
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
                                    <div class="button_set col-md-12 col-sm-12">
                                        <a class="btn btn-primary mini">
                                            Upload
                                        </a>
                                    </div>
                                    <div class="clearfix"></div>
                                </section>
                            </tab>
                            <tab label="Export Digit Mapping" class="" icon="dnl_icon dnl_arrow-point-to-right">
                                <section class="role_section">
                                    <h2 class="role_section_name">Export Digit Mapping</h2>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Data Format:</label>
                                            <select2 :options="data_format_options" v-model="digit_mapping_data_format"></select2>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group m-top-33">
                                            <div class="checkbox checkbox-success">
                                                <input id="ingress_digit_with_headers_row" name="ingress_digit_with_headers_row" type="checkbox" v-model="ingress_digit_with_headers_row">
                                                <label for="ingress_digit_with_headers_row">With headers row</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group">
                                            <label>Header Text:</label>
                                            <textarea v-model="header_text" class="form-control" placeholder="Enter Header Text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group">
                                            <label>Footer Text:</label>
                                            <textarea v-model="footer_text" class="form-control" placeholder="Enter Footer Text" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #1:</label>
                                            <select class="selectable" v-model="digit_mapping_column_1">
												<option v-for="item in digit_mapping_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #2:</label>
                                            <select class="selectable" v-model="digit_mapping_column_2">
												<option v-for="item in digit_mapping_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="form-group full-width-select">
                                            <label for="username">Column #3:</label>
                                            <select class="selectable" v-model="digit_mapping_column_3">
												<option v-for="item in digit_mapping_column_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="button_set center-block text-center">
                                        <a class="btn btn-primary mini">
                                            Download
                                        </a>
                                    </div>
                                </section>
                            </tab>
                        </tabs>
                        <div class="clearfix"></div>
                    </tab>
                </tabs>
                <div class="clearfix"></div>
            </div>
        </div>
        <modal v-if="showModal=='host_port'" @close="showModal = ''" class="big_modal">
           
            <h3 slot="header">Host Port</h3>
            <div slot="body">
                <div class="">
                    <div class="table-responsive">
                        <spinner v-show="loading_host" class="spinner"></spinner>
                        <div v-show="loading_host" class="mask"></div>
                        <table class="table table-striped table-hover carrier_groups aligned-center">
                            <thead>
                                <tr>
                                    <th>Host</th>
                                    <th>IP</th>
                                    <th>Port</th>
                                    <th>CPS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="host in hosts">
                                    <td>{{host.host}}</td>
                                    <td>{{host.ip}}</td>
                                    <td>{{host.port}}</td>
                                    <td>{{host.cps}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <button @click="closeModal" class="btn btn-default mini cancel centered">Cancel</button>
            </div>
        </modal>
    </div>
</template>

<script>   
const vTabs = require('vue!../main_components/tabs.vue'),
    vTab = require('vue!../main_components/tab.vue'),
    vSelect = require('vue!../main_components/select.vue'),
    Dropzone = require('vue!../main_components/dropzone.vue'),
    Pagination = require('vue!../main_components/pagination.vue'),
    confirmmodal = require('vue!../main_components/confirm_delete.vue'),
    vSpinner = require('vue!../main_components/fadeloader.vue'),
    modal = require('vue!../main_components/modal.vue');
const api = require("../../api");
const auth = require("../../auth");
import {mapActions} from 'vuex'
import _ from 'lodash'


module.exports = {
    components: {
        'spinner': vSpinner,
        Dropzone,
        'tabs': vTabs,
        'tab': vTab,
        'select2': vSelect,
        'pagination': Pagination,
        'modal': modal,
        'confirm': confirmmodal,
    },
    data: function () {
        return {
            loading_host: false,
            temp_ingress_trunk_table_columns: ['Host Post', 'Ingress ID', 'Ingress Name', 'Carriers', 'Call Limit', 'CPS Limit', 'Trunk Count', 'Margin', 'PDD Timeout', 'Update at', 'Update by', 'Action'],
            ingress_trunk_table_columns: ['Host Post', 'Ingress ID', 'Ingress Name', 'Carriers', 'Call Limit', 'CPS Limit', 'Trunk Count', 'Margin', 'PDD Timeout', 'Update at', 'Update by', 'Action'],
            ingress_trunk_showcolumns: [true, true, true, true, true, true, true, true, true, true, true, true],
            ingress_trunk_table_column_options: [{
                    value: 'Host Post',
                    label: 'Host Post'
                },
                {
                    value: 'Ingress ID',
                    label: 'Ingress ID'
                },
                {
                    value: 'Ingress Name',
                    label: 'Ingress Name'
                },
                {
                    value: 'Carriers',
                    label: 'Carriers'
                },
                {
                    value: 'Call Limit',
                    label: 'Call Limit'
                },
                {
                    value: 'CPS Limit',
                    label: 'CPS Limit'
                },
                {
                    value: 'Trunk Count',
                    label: 'Trunk Count'
                },
                {
                    value: 'Margin',
                    label: 'Margin'
                },
                {
                    value: 'PDD Timeout',
                    label: 'PDD Timeout'
                },
                {
                    value: 'Update at',
                    label: 'Update at'
                },
                {
                    value: 'Update by',
                    label: 'Update by'
                },
                {
                    value: 'Action',
                    label: 'Action'
                }
            ],
            egress_trunk_table_column_options: [{
                    value: 'Host Post',
                    label: 'Host Post'
                },
                {
                    value: 'Egress ID',
                    label: 'Egress ID'
                },
                {
                    value: 'Egress Name',
                    label: 'Egress Name'
                },
                {
                    value: 'Carriers',
                    label: 'Carriers'
                },
                {
                    value: 'Call Limit',
                    label: 'Call Limit'
                },
                {
                    value: 'CPS Limit',
                    label: 'CPS Limit'
                },
                {
                    value: 'Usage Count',
                    label: 'Usage Count'
                },
                {
                    value: 'Rate Table',
                    label: 'Rate Table'
                },
                {
                    value: 'Protocol',
                    label: 'Protocol'
                },
                {
                    value: 'PDD Timeout',
                    label: 'PDD Timeout'
                },
                {
                    value: 'Update at',
                    label: 'Update at'
                },
                {
                    value: 'Update by',
                    label: 'Update by'
                },
                {
                    value: 'Action',
                    label: 'Action'
                }
            ],
            temp_egress_trunk_table_columns: ['Host Post', 'Egress ID', 'Egress Name', 'Carriers', 'Call Limit', 'CPS Limit', 'Usage Count', 'Rate Table', 'Protocol', 'PDD Timeout', 'Update at', 'Update by', 'Action'],
            egress_trunk_table_columns: ['Host Post', 'Egress ID', 'Egress Name', 'Carriers', 'Call Limit', 'CPS Limit', 'Usage Count', 'Rate Table', 'Protocol', 'PDD Timeout', 'Update at', 'Update by', 'Action'],
            egress_trunk_showcolumns: [true, true, true, true, true, true, true, true, true, true, true, true, true],
            ingress_page_count: 1,
            egress_page_count: 1,
            page_count_options: [
                { id: 1, text: '10' },
                { id: 2, text: '20' },
                { id: 3, text: '30' },
                { id: 4, text: '50' },
                { id: 5, text: '100' }
            ],
            status_options: [
                {id: 'all', text: 'All'},
                {id: 'active', text: 'Active'},
                {id: 'deactive', text: 'Deactive'},
            ],
            egress_with_headers_row: false,
            ingress_with_headers_row: false,
            egress_host_with_headers_row: false,
            ingress_host_with_headers_row: false,
            egress_action_with_headers_row: false,
            ingress_action_with_headers_row: false,
            ingress_digit_with_headers_row: false,
            digit_mapping_data_format: 'csv',
            digit_mapping_column_1: 'trunk_name',
            digit_mapping_column_2: 'translation_name',
            digit_mapping_column_3: 'time_profile_name',
            digit_mapping_column_options: [
                {id: 'trunk_name', text: 'trunk_name'},
                {id: 'translation_name', text: 'translation_name'},
                {id: 'time_profile_name', text: 'time_profile_name'},
            ],

            ingress_action_data_format: 'csv',
            ingress_action_column_1: 'trunk_name',
            ingress_action_column_2: 'time_profile_name',
            ingress_action_column_3: 'target',
            ingress_action_column_4: 'code',
            ingress_action_column_5: 'action',
            ingress_action_column_6: 'chars',
            ingress_action_column_7: 'number_type',
            ingress_action_column_8: 'number_length',

            ingress_host_data_format: 'csv',
            ingress_host_column_1: 'trunk_name',
            ingress_host_column_2: 'ip',
            ingress_host_column_3: 'port',

            ingress_export_data_format: 'csv',
            ingress_export_column_1: 'trunk_id',
            ingress_export_column_2: 'trunk_name',
            ingress_export_column_3: 'carrier_name',
            ingress_export_column_4: 'media_type',
            ingress_export_column_5: 'call_limit',
            ingress_export_column_6: 'cps_limit',
            ingress_export_column_7: 'pdd_timeout',
            ingress_export_column_8: 'ignore_early_media',
            ingress_export_column_9: 'active',
            ingress_export_column_10: 'rfc2833',
            ingress_export_column_11: 'dip_from',
            ingress_export_column_12: 'min_duration',
            ingress_export_column_13: 'max_duration',
            ingress_export_column_14: 'rate_table_name',
            ingress_export_column_15: 'route_strategy_name',
            ingress_export_column_16: 'tech_prefix',
            ingress_export_column_17: 'profit_margin',
            ingress_export_column_options: [
                {id: 'trunk_id', text: 'trunk_id'},
                {id: 'trunk_name', text: 'trunk_name'},
                {id: 'carrier_name', text: 'carrier_name'},
                {id: 'media_type', text: 'media_type'},
                {id: 'call_limit', text: 'call_limit'},
                {id: 'cps_limit', text: 'cps_limit'},
                {id: 'pdd_timeout', text: 'pdd_timeout'},
                {id: 'ignore_early_media', text: 'ignore_early_media'},
                {id: 'active', text: 'active'},
                {id: 'rfc2833', text: 'rfc2833'},
                {id: 'dip_from', text: 'dip_from'},
                {id: 'min_duration', text: 'min_duration'},
                {id: 'max_duration', text: 'max_duration'},
                {id: 'rate_table_name', text: 'rate_table_name'},
                {id: 'route_strategy_name', text: 'route_strategy_name'},
                {id: 'tech_prefix', text: 'tech_prefix'},
                {id: 'profit_margin', text: 'profit_margin'},
            ],
            egress_action_data_format: 'csv',
            egress_action_column_1: 'trunk_name',
            egress_action_column_2: 'time_profile_name',
            egress_action_column_3: 'target',
            egress_action_column_4: 'code',
            egress_action_column_5: 'action',
            egress_action_column_6: 'chars',
            egress_action_column_7: 'number_type',
            egress_action_column_8: 'number_length',
            action_column_options: [
                {id: 'trunk_name', text: 'trunk_name'},
                {id: 'time_profile_name', text: 'time_profile_name'},
                {id: 'target', text: 'target'},
                {id: 'code', text: 'code'},
                {id: 'action', text: 'action'},
                {id: 'chars', text: 'chars'},
                {id: 'number_type', text: 'number_type'},
                {id: 'number_length', text: 'number_length'},
            ],
            host_data_format: 'csv',
            host_column_1: 'trunk_name',
            host_column_2: 'ip',
            host_column_3: 'port',
            host_column_options: [
                {id: 'trunk_name', text: 'trunk_name'},
                {id: 'ip', text: 'ip'},
                {id: 'port', text: 'port'},
            ],
            egress_data_format: 'csv',
            egress_column_1: 'trunk_id',
            egress_column_2: 'trunk_name',
            egress_column_3: 'carrier_name',
            egress_column_4: 'media_type',
            egress_column_5: 'call_limit',
            egress_column_6: 'cps_limit',
            egress_column_7: 'pdd_timeout',
            egress_column_8: 'active',
            egress_column_9: 'rate_table_name',
            egress_column_10: 'host_route_strategy',
            egress_column_11: 'rfc2833',
            egress_column_12: 'pass_dip_head',
            egress_column_13: 'min_duration',
            egress_column_14: 'profit_margin',
            egress_column_options: [
                {id: 'trunk_id', text: 'trunk_id'},
                {id: 'trunk_name', text: 'trunk_name'},
                {id: 'carrier_name', text: 'carrier_name'},
                {id: 'media_type', text: 'media_type'},
                {id: 'call_limit', text: 'call_limit'},
                {id: 'cps_limit', text: 'cps_limit'},
                {id: 'pdd_timeout', text: 'pdd_timeout'},
                {id: 'active', text: 'active'},
                {id: 'rate_table_name', text: 'rate_table_name'},
                {id: 'host_route_strategy', text: 'host_route_strategy'},
                {id: 'rfc2833', text: 'rfc2833'},
                {id: 'pass_dip_head', text: 'pass_dip_head'},
                {id: 'min_duration', text: 'min_duration'},
                {id: 'max_duration', text: 'max_duration'},
                {id: 'profit_margin', text: 'profit_margin'},
            ],
            data_format_options: [
                {id: 'csv', text: 'CSV'},
                {id: 'xls', text: 'XLS'},
            ],
            trunk_type: 'egress',
            apiUrl: '/v1/trunk/',
            egressPageOne: {
                currentPage: 1,
                totalPages: 10,
                cntpage: 10
            },
            ingressPageOne: {
                currentPage: 1,
                totalPages: 10,
                cntpage: 10
            },
            header_text: '',
            footer_text: '',
            data_format: '',
            showModal: '',
            
            status: 'all',
            checker: false,
            
            search: '',
            selected2: 0,
            options2: [
                { id: 1, text: 'Group Name' },
                { id: 2, text: 'Carrier Count' },
                { id: 3, text: 'Actions' }
            ],
            select: '1',
            options: [
                { id: 1, text: 'option1' },
                { id: 2, text: 'option2' },
                { id: 3, text: 'option3' },
                { id: 4, text: 'option4' },
                { id: 5, text: 'option5' }
            ],
            hosts: [
                {
                    host: '1',
                    ip: 'null',
                    port: '5060',
                    cps: '-',
                },
                {
                    host: '1',
                    ip: 'null',
                    port: '5060',
                    cps: '-',
                }
            ],
            egress_lists: [],
            ingress_lists: [],
            selected_egress_ids: [],
            selected_ingress_ids: [],
            showEgressModal: '',
            showIngressModal: '',
        }
    },
    methods: {
        ...mapActions({
            setMessage: 'app_message/setAppMessage'
        }),
        fetchHost(id) {
            this.loading_host = true
            const url = api.getEndpointUrl() + '/v1/trunk/ip/list?resource_id='+id
            this.$http.get(url)
            .then(response => {
                const body = response.body
                
                if (body.success) {
                    this.hosts = body.payload.items
                }
                this.loading_host = false
            })
            .catch(error => {
                console.log(error)
            })
        },
        viewHost(id) {
            this.hosts = [];
            this.showModal='host_port';
            this.fetchHost(id);
        },
        handleChangeIngress() {
            for(let i = 0; i < this.temp_ingress_trunk_table_columns.length; i++) {
                if (_.indexOf(this.ingress_trunk_table_columns, this.temp_ingress_trunk_table_columns[i]) != -1) {
                    Vue.set(this.ingress_trunk_showcolumns, i, true);
                }
                else {
                    Vue.set(this.ingress_trunk_showcolumns, i, false);
                }
            }
        },
        handleChangeEgress() {
            for(let i = 0; i < this.temp_egress_trunk_table_columns.length; i++) {
                if (_.indexOf(this.egress_trunk_table_columns, this.temp_egress_trunk_table_columns[i]) != -1) {
                    Vue.set(this.egress_trunk_showcolumns, i, true);
                }
                else {
                    Vue.set(this.egress_trunk_showcolumns, i, false);
                }
            }
        },
        activateTab(tab) {
            if (tab.name == "Egress Trunk") {
                this.trunk_type = "egress";
            }
            else if (tab.name == "Ingress Trunk") {
                this.trunk_type = "ingress";
            }
        },
        submitDeleteEgress: function () {
			var vm = this;
			this.showEgressModal = false;

			this.selected_egress_ids.forEach(function (item, i) {
				var trunkid = item;
				if (trunkid == 0) {
					vm.setMessage({
                        message:'The trunk has been not selected!',
                        type:'error'
                    });
				}
				else {
					vm.loading = true;
					vm.resource = vm.$resource(api.getEndpointUrl() + '/v1/egress_trunk/' + trunkid);
					vm.resource.delete({ resource_id: trunkid }).then(function (response) {
						vm.loading = false;
						let index = _.findIndex(vm.egress_lists, elem => elem.resource_id  === trunkid)
						vm.egress_lists.splice(index, 1)
						vm.setMessage('The trunk have been deleted!')
					});
				}
			});
		},
        submitDeleteIngress: function () {
			var vm = this;
			this.showIngressModal = false;

			this.selected_ingress_ids.forEach(function (item, i) {
				var trunkid = item;
				if (trunkid == 0) {
					vm.setMessage({
                        message:'The trunk has been not selected!',
                        type:'error'
                    });
				}
				else {
					vm.loading = true;
					vm.resource = vm.$resource(api.getEndpointUrl() + '/v1/ingress_trunk/' + trunkid);
					vm.resource.delete({ resource_id: trunkid }).then(function (response) {
						vm.loading = false;
						let index = _.findIndex(vm.ingress_lists, elem => elem.resource_id  === trunkid)
						vm.ingress_lists.splice(index, 1)
						vm.setMessage('The trunk have been deleted!')
					});
				}
			});
		},
        delete_egress_trunk: function(id) {
            this.showEgressModal = true;
			this.selected_egress_ids = [];
			this.selected_egress_ids.push(id);
        },
        delete_ingress_trunk: function(id) {
            this.showIngressModal = true;
			this.selected_ingress_ids = [];
			this.selected_ingress_ids.push(id);
        },
        edit_trunk: function(id, type) {
            // this.$router.push({ path:'/routing/trunks/edit/', query: {id: id, type: type}});
            this.$router.push({ path: "/routing/trunks/edit/" + id + "/" + type});
        },
        createNew: function() {
            this.$router.push({path:'/routing/trunks/'+this.trunk_type+'/new'});
        },
        deleteAll: function(type) {
            if(type == 'egress') {
				console.log("delete all egress list");

				this.selected_egress_ids = [];
				var vm = this;
				
				this.egress_lists.forEach(function(egress, i){
					vm.selected_egress_ids.push(egress.resource_id)
				});

				if (this.selected_egress_ids.length == 0) {
					this.setMessage({
                        message:'The egress list has been not selected!',
                        type:'error'
                    });
					this.checker = false;

					return;
				}

				this.showEgressModal = true;
				if(this.checker)
					this.checker = false;
            }
            else if(type == 'ingress') {
				console.log("delete all ingress list");

				this.selected_egress_ids = [];
				var vm = this;
				
				this.ingress_lists.forEach(function(ingress, i){
					vm.selected_ingress_ids.push(ingress.resource_id)
				});

				if (this.selected_ingress_ids.length == 0) {
					this.setMessage({
                        message:'The ingress list has been not selected!',
                        type:'error'
                    });
					this.checker = false;

					return;
				}

				this.showIngressModal = true;
				if(this.checker)
					this.checker = false;
            }
        },
        deleteSelected: function(type) {
            if(type == 'egress') {
				console.log(this.egress_lists);
				this.selected_egress_ids = [];
				var vm = this;
				this.egress_lists.forEach(function(egress, i){
					if(egress.status==true) {
						vm.selected_egress_ids.push(egress.resource_id);
					}
				});

				if (this.selected_egress_ids.length == 0) {
                    this.setMessage({
                        message:'The egress trunk list has been not selected!',
                        type:'error'
                    });

					this.checker = false;
					return;
				}

				this.showEgressModal = true;
				if(this.checker)
					this.checker = false;
            }
            else if(type == 'ingress') {
				console.log(this.ingress_lists);
				this.selected_ingress_ids = [];
				var vm = this;
				this.ingress_lists.forEach(function(ingress, i){
					if(ingress.status==true) {
						vm.selected_ingress_ids.push(ingress.resource_id);
					}
				});

				if (this.selected_ingress_ids.length == 0) {
                    this.setMessage({
                        message:'The ingress trunk list has been not selected!',
                        type:'error'
                    });
					this.checker = false;
					return;
				}

				this.showIngressModal = true;
				if(this.checker)
					this.checker = false;
            }
        },
        'success': function (file) {
            console.log('A file was successfully uploaded')
        },
        closeModal: function () {
            this.showModal = '';
        },
        fetchEgress() {
            var page = this.egressPageOne.currentPage - 1;
            var per_page = this.egressPageOne.cntpage;
            console.log("page => " + page + " , per_page => " + per_page);
            

            this.$http.get(api.getEndpointUrl() + "/v1/trunk/egress/list?page=" + page + "&per_page=" + per_page + "&order_by=resource_id&order_dir=desc",
                {
                    headers: {
                        "X-Auth-Token": auth.getToken()
                    }
                }).then(function (response) {
                    this.loading = false;
                    //todo: check success flag? validation errors?
                    var egress_lists = response.body.payload.items;
                    console.log("egress_lists");
                    console.log(egress_lists);
                    this.egress_lists = egress_lists;
                    var total_page = response.body.payload.total;
                    this.egressPageOne.currentPage = response.body.payload.page + 1;
                    this.egressPageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
                    console.log("total pages => " + this.egressPageOne.totalPages);
                }, function (error) {
                    this.loading = false;
                    console.log(error);
                });
        },
        fetchIngress() {
            var page = this.ingressPageOne.currentPage - 1;
            var per_page = this.ingressPageOne.cntpage;
            console.log("page => " + page + " , per_page => " + per_page);
            this.loading = true;

            this.$http.get(api.getEndpointUrl() + "/v1/trunk/ingress/list?page=" + page + "&per_page=" + per_page + "&order_by=resource_id&order_dir=desc",
            {
                headers: {
                    "X-Auth-Token": auth.getToken()
                }
            }).then(function (response) {
                this.loading = false;
                //todo: check success flag? validation errors?
                var ingress_lists = response.body.payload.items;
                console.log("ingress_lists");
                console.log(ingress_lists);
                this.ingress_lists = ingress_lists;
                var total_page = response.body.payload.total;
                this.ingressPageOne.currentPage = response.body.payload.page + 1;
                this.ingressPageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
                console.log("total pages => " + this.ingressPageOne.totalPages);
            }, function (error) {
                this.loading = false;
                console.log(error);
            });
        },
        egressPageOneChanged(pageNum) {
            if (pageNum !== this.egressPageOne.currentPage) {
                this.egressPageOne.currentPage = pageNum
                this.$nextTick(this.fetchEgress)
            }
        },
        egressChangePageCount (countPerPage) {
            if (countPerPage !== this.egressPageOne.cntpage) {
                this.egressPageOne.cntpage = countPerPage
                this.$nextTick(this.fetchEgress)
            }
        },
        ingressPageOneChanged(pageNum) {
            if (pageNum !== this.ingressPageOne.currentPage) {
                this.ingressPageOne.currentPage = pageNum
                this.$nextTick(this.fetchIngress)
            }
        },
        ingressChangePageCount (countPerPage) {
            if (countPerPage !== this.ingressPageOne.cntpage) {
                this.ingressPageOne.cntpage = countPerPage
                this.$nextTick(this.fetchIngress)
            }
        },
        'process': function () {
            var newArr = this.$children.filter(function (item) {
                return item.id === "myVueDropzone";
            });
            var newArr = this.$children.filter(function (item) {
                return item.id === "myVueDropzone2";
            });
            var newArr = this.$children.filter(function (item) {
                return item.id === "myVueDropzone3";
            });
            var newArr = this.$children.filter(function (item) {
                return item.id === "myVueDropzone4";
            });
            var newArr = this.$children.filter(function (item) {
                return item.id === "myVueDropzone5";
            });
            var newArr = this.$children.filter(function (item) {
                return item.id === "myVueDropzone6";
            });
            var newArr = this.$children.filter(function (item) {
                return item.id === "myVueDropzone7";
            });
            var component = newArr[0, 1, 2, 3, 4, 5, 6];
            component.processQueue()
        }
    },
    mounted: function () {
        $('[data-toggle="tooltip"]').tooltip();
    },
    created: function () {
        this.fetchEgress();
        this.fetchIngress();
    },
    updated: function () {
        var elementList = document.querySelectorAll('.el-input > input');
        for (var index = 0; index < elementList.length; index++) {
            console.log(elementList);
            elementList[index].placeholder = 'Show/Hide Columns';
        }
    },
}
</script>

<style>
.table-responsive.big_data table {
    min-width: 1200px;
}

.btn-group.m-top-10 {
    margin-top: 10px;
}

.button_set.relative {
    display: block;
    text-align: center;
}
</style>
