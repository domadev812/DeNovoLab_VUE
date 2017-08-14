<template>
    <div class="container-fluid">
        <div class="row">
            <div class="wrapper single">
                <time-display></time-display>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="#">Routing</a>
                    </li>
                    <li class="breadcrumb-item active">Digital Maps</li>
                </ol>
                <h1 class="page-header">Digital Maps</h1>
                <confirm v-show="showModal" @close="showModal = false" @submit="submit"></confirm>
                <div class="white_pad table_wrap">
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-default" @click="showInput='new'">
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
                            <el-select v-model="map_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
                                <el-option v-for="item in map_table_column_options" :key="item.value" :label="item.label" :value="item.value">
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
                                    <th v-if="showcolumns[0]">Name</th>
                                    <th v-if="showcolumns[1]">Digital Map Count</th>
                                    <th v-if="showcolumns[2]">Update at</th>
                                    <th v-if="showcolumns[3]" class="width-78">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="!filterBy(maps, search).length">
                                    <td style="text-align: center" colspan="5">No Data Found</td>
                                </tr>										
                                
                                <tr v-for="map in filterBy(maps, search)">
                                    <td class="centred_checkbox">
                                        <div class="checkbox checkbox-success">
                                            <input type="checkbox" :id="'selected-' + map.translation_id" :name="map.translation_id" v-model="map.selected">
                                            <label :for="'selected-' + map.translation_id"></label>
                                        </div>
                                    </td>
                                    <td v-if="showcolumns[0]">
                                        <router-link to="" class="blue_link" @click.native="detail_digit_mapping(map.translation_id)">{{map.digit_map_name}}</router-link>
                                    </td>
                                    <td v-if="showcolumns[1]">
                                        <router-link to="" class="blue_link" @click.native="detail_digit_mapping(map.translation_id)">{{map.digit_map_count}}</router-link>
                                    </td>
                                    <td v-if="showcolumns[2]">
                                        {{map.updated_at}}
                                    </td>
                                    <td v-if="showcolumns[3]">
                                        <a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" v-on:click="edit_map(map.translation_id, map.digit_map_name)">
                                            <span class="dnl_icon dnl_action_edit"></span>
                                        </a>
                                        <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="delete_map(map.translation_id)">
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
        <modal v-if="showInput=='new' || showInput=='edit'" @close="showInput=''">
            <h3 slot="header" v-if="showInput=='new'">Create New Map</h3>
            <h3 slot="header" v-if="showInput=='edit'">Edit Map</h3>
            <div slot="body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group" style="text-align: left">
                            <label>Name:</label>
                            <input type="text" name="digital_map_name" v-model="digital_map_name" class="form-control" placeholder="Enter Name">
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <button class="btn btn-primary submit mini" @click="SaveMap">Submit</button>
                <button @click="closeInput" class="btn btn-default cancel mini">Cancel</button>
            </div>
        </modal>
    </div>
</template>

<script>   
const vSelect = require('vue!../main_components/select.vue'),
    Pagination = require('vue!../main_components/pagination.vue'),
    vTabs = require('vue!../main_components/tabs.vue'),
    vTab = require('vue!../main_components/tab.vue'),
    confirmmodal = require('vue!../main_components/confirm_delete.vue'),
    modal = require('vue!../main_components/modal.vue');
const api = require("../../api");
const auth = require("../../auth");
_= require('lodash');
import {mapGetters,	mapActions} from 'vuex'

module.exports = {
    components: {
        'select2': vSelect,
        'pagination': Pagination,
        'tabs': vTabs,
        'tab': vTab,
        'modal': modal,
        'confirm': confirmmodal,
    },
    data: function () {
        return {
            digital_map_name: '',
            translation_id: 0,
            search: '',
            checker: '',
            pageOne: {
                currentPage: 1,
                totalPages: 10,
                cntpage: 10,
            },
            showModal: '',
            showInput: '',
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
            maps: [],
            map_table_column_options: [{
                value: 'Name',
                label: 'Name'
            }, {
                value: 'Digital Map Count',
                label: 'Digital Map Count'
            }, {
                value: 'Update at',
                label: 'Update at'
            }, {
                value: 'Action',
                label: 'Action'
            }],
            map_table_columns: ['Name', 'Digital Map Count', 'Update at', 'Action'],
            showcolumns: [true, true, true, true],
        }
    },
    methods: {
			...mapActions({
				setAsyncConfirm: 'async_confirm/setAsyncConfirm',
				setMessage: 'app_message/setAppMessage'
			}),
			handleChange() {
				if (_.indexOf(this.map_table_columns, 'Name') != -1) {
					// this.showcolumns[0] = true;
					Vue.set(this.showcolumns, 0, true);
				}
				else {
					// this.showcolumns[0] = false;
					Vue.set(this.showcolumns, 0, false);
				}
					
				if (_.indexOf(this.map_table_columns, 'Digital Map Count') != -1) {
					// this.showcolumns[1] = true;
					Vue.set(this.showcolumns, 1, true);
				}
				else {
					// this.showcolumns[1] = false;
					Vue.set(this.showcolumns, 1, false);
				}

				if (_.indexOf(this.map_table_columns, 'Update at') != -1) {
					// this.showcolumns[2] = true;
					Vue.set(this.showcolumns, 2, true);
				}
				else {
					// this.showcolumns[2] = false;
					Vue.set(this.showcolumns, 2, false);
				}

				if (_.indexOf(this.map_table_columns, 'Action') != -1) {
					// this.showcolumns[3] = true;
					Vue.set(this.showcolumns, 3, true);
				}
				else {
					// this.showcolumns[3] = false;
					Vue.set(this.showcolumns, 3, false);
				}

				console.log(this.showcolumns);


				// this.$nextTick(() => {
				// 	document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
				// });
			},
        clickSelectedAll: function () {
            console.log("select_all-->" + this.checker);
            if (this.checker) {
                this.maps.forEach(function (map, i) {
                    map.selected = true;
                });
            }
            else {
                this.maps.forEach(function (map, i) {
                    map.selected = false;
                });
            }
        },
        SaveMap() {
            this.loading = true;
            if (this.showInput == "new") {
                this.$http.post(api.getEndpointUrl() + '/v1/route/digit_map',
                    {
                        "digit_map_name": this.digital_map_name,
                    },
                    {
                        headers: {
                            "X-Auth-Token": auth.getToken()
                        }
                    }
                ).then(
                    function (response) {
                        this.loading = false;
                        console.log(response);
                        this.$nextTick(this.fetchMaps)
                        this.setMessage('The digital map has been created!');
                        // var thisvm = this;
                        // setTimeout(function(){
                        //     thisvm.$router.go(thisvm.$router.currentRoute);
						// }, 3000);
                    },
                    function (response) {
                        this.loading = false;
                        console.log(response);
                        this.setMessage({
                            message:"Creating digital map is failed!",
                            type:'error'
                        });
                    }
                )
            } else if (this.showInput == "edit") {
                this.$http.patch(api.getEndpointUrl() + '/v1/route/digit_map/' + this.translation_id,
                    {
                        "digit_map_name": this.digital_map_name,
                    },
                    {
                        headers: {
                            "X-Auth-Token": auth.getToken()
                        }
                    }
                ).then(
                    function (response) {
                        this.loading = false;
                        console.log(response);
                        this.$nextTick(this.fetchMaps)
                        this.setMessage('The digital map has been changed!');
                        // var thisvm = this;
                        // setTimeout(function(){
                        //     thisvm.$router.go(thisvm.$router.currentRoute);
						// }, 3000);
                    },
                    function (response) {
                        this.loading = false;
                        console.log(response);
                        this.setMessage({
                            message:"Editing digital map is failed!",
                            type:'error'
                        });
                    }
                )
            }
            this.showInput = '';
        },
        fetchMaps() {
            var page = this.pageOne.currentPage - 1;
            var per_page = this.pageOne.cntpage;
            console.log("page => " + page + " , per_page => " + per_page);
            this.loading = true;
            this.$http.get(api.getEndpointUrl() + "/v1/route/digit_map/list" + "?page=" + page + "&per_page=" + per_page + "&order_by=translation_id&order_dir=desc",
                {
                    headers: {
                        "X-Auth-Token": auth.getToken()
                    }
                }).then(function (response) {
                    this.loading = false;
                    this.maps = response.body.payload.items;
                    console.log("digital_maps-->");
                    console.log(this.maps);
                    var total_page = response.body.payload.total;
                    this.pageOne.currentPage = response.body.payload.page + 1;
                    this.pageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
                    console.log("total pages => " + this.pageOne.totalPages);
                }, function (error) {
                    this.loading = false;
                    console.log(error);
                });
        },
        pageOneChanged(pageNum) {
            if (pageNum !== this.pageOne.currentPage) {
                this.pageOne.currentPage = pageNum
                this.$nextTick(this.fetchMaps)
            }
        },
        changePageCount (countPerPage) {
            if (countPerPage !== this.pageOne.cntpage) {
                this.pageOne.cntpage = countPerPage
                this.$nextTick(this.fetchMaps)
            }
        },
        closeModal: function () {
            this.showModal = '';
        },
        closeInput: function () {
            this.showInput = '';
        },
        detail_digit_mapping(tras_id) {
            this.$router.push({ path: "/routing/digital_maps/digit_mapping_detail/" + tras_id });
        },
        edit_map: function (id, name) {
            this.showInput = 'edit';
            this.digital_map_name = name;
            this.translation_id = id;
        },
        deleteSelected: function () {
            console.log("delete selected digital maps");
            console.log(this.maps);
            this.selected_ids = [];
            var vm = this;
            this.maps.forEach(function (map, i) {
                if (map.selected == true) {
                    vm.selected_ids.push(map.translation_id);
                }
            });

            if (this.selected_ids.length == 0) {
                this.setMessage({
                    message:'The digital map has been not selected!',
                    type:'error'
                });
                this.checker = false;

                return;
            }

            this.showModal = true;
            if (this.checker)
                this.checker = false;
        },
        deleteAll: function () {
            console.log("delete all digital maps");

            this.selected_ids = [];
            var vm = this;

            this.maps.forEach(function (map, i) {
                vm.selected_ids.push(map.translation_id)
            });

            if (this.selected_ids.length == 0) {
                this.setMessage({
                    message:'The digital map has been not selected!',
                    type:'error'
                });
                this.checker = false;

                return;
            }

            this.showModal = true;
            if (this.checker)
                this.checker = false;
        },
        delete_map: function (id) {
            this.showModal = true;
            this.selected_ids = [];
            this.selected_ids.push(id);
        },
        submit: function () {
            var vm = this;
            this.showModal = false;

            this.selected_ids.forEach(function (item, i) {
                var transid = item;
                if (transid == 0) {
                    vm.setMessage({
                        message:'The digital map has been not selected!',
                        type:'error'
                    });
                }
                else {
                    vm.loading = true;
                    vm.resource = vm.$resource(api.getEndpointUrl() + '/v1/route/digit_map/' + transid);
                    vm.resource.delete({ translation_id: transid }).then(function (response) {
                        vm.loading = false;
						let index = _.findIndex(vm.maps, elem => elem.translation_id  === transid)
						vm.maps.splice(index, 1)
						vm.setMessage('The digital map have been deleted!')
                    });
                }
            });
        },
    },
    mounted: function () {
        $('[data-toggle="tooltip"]').tooltip();
    },
    updated: function () {
        document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
    },
    created: function () {
        this.fetchMaps();
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
</style>
