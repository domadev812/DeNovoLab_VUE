<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Routing</a></li>
				  <li class="breadcrumb-item active">Dynamic Routing</li>
			</ol>
			<h1 class="page-header">Dynamic Routing</h1>
			<confirm v-show="showModal" @close="showModal = false" @submit="submit"></confirm>	
            <div class="btn-group" role="group">
			  <button type="button" class="btn btn-default">
			  	  <span class="dnl_icon dnl_add"></span> Mass Edit
			  </button>
			  <button type="button" class="btn btn-default" @click="createNew">
			  	  <span class="dnl_icon dnl_add"></span> Create New
			  </button>
			  <!-- <button type="button" class="btn btn-default" @click.native="deleteAll">
				  <span class="dnl_icon dnl_action_delete"></span> Delete All
			  </button> -->
			  <button type="button" class="btn btn-default" @click="deleteSelected">
				  <span class="dnl_icon dnl_action_delete"></span> Delete Selected
			  </button>
            </div>
            <div class="white_pad table_wrap">
                <div class="advanced_search_filter_panel">
                    <div class="inline-block search_wrapper">
                        <label>Search:</label>
                        <br>
                        <input type="text" name="search" v-model="search" class="form-control inline-block search_field" placeholder="Enter Search">
                        <span class="dnl_icon dnl_musica-searcher"></span>
                    </div>
                    <div class="inline-block">
                        <label>Routing Rule:</label>
                        <br>
                        <select2 :options="routing_rule_list" v-model="search_rule">
                            <option disabled value="0">Select Routing Rule</option>
                        </select2>
                    </div>
                    <!--<div class="inline-block">
                        <a class="btn btn-primary">
                            Query
                        </a>
                    </div>-->
                </div>
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
						<el-select v-model="routing_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
							<el-option
							v-for="item in routing_table_column_options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>							
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-striped table-hover agents ">
                      <thead>
                        <tr>
							  <th class="width-65">
								  <div class="checkbox checkbox-success">
									<input id="select_all" name="select_all" type="checkbox" v-model="checker" v-on:click="clickSelectedAll">
									<label for="select_all"></label>
								  </div>
							  </th>
							<th v-if="showcolumns[0]">Name</th>
							<th v-if="showcolumns[1]">Routing Rule</th>
							<th v-if="showcolumns[2]">Time Profile</th>
							<th v-if="showcolumns[3]">Usage Count</th>
							<th v-if="showcolumns[4]">QoS Cycle</th>
							<th v-if="showcolumns[5]">Update at</th>
							<th v-if="showcolumns[6]">Update by</th>
							<th  v-if="showcolumns[7]" class="width-274">Action</th>
                        </tr>
                      </thead>
                      <tbody>
						<tr v-if="!filterBy(routings, search).length">
							<td style="text-align: center" colspan="9">No Data Found</td>
						</tr>										
						  
                        <tr v-for="(routing, index) in filterBy(routings, search)">
							  <td class="centred_checkbox">
								  <div class="checkbox checkbox-success">
									<input v-bind:id="'selected-' + index" v-bind:name="'selected-' + index" type="checkbox" v-model="routing.selected">
									<label v-bind:for="'selected-' + index"></label>
								  </div>
							  </td>
						  <!-- 
                          <td class="centred_checkbox">
                              <div class="checkbox checkbox-success">
                                <input :id="routing.dynamic_route_id" :name="routing.dynamic_route_id" type="checkbox" v-model="routing.status">
                                <label :for="routing.dynamic_route_id"></label>
                              </div>
                          </td>
						  -->
                          <td v-if="showcolumns[0]">{{routing.name}}</td>	
                          <td v-if="showcolumns[1]">{{routing.rule}}</td>
                          <td v-if="showcolumns[2]">{{routing.time_profile}}</td>
                          <td v-if="showcolumns[3]">{{routing.usage_count}}</td>
                          <td v-if="showcolumns[4]">{{routing.qos_cycle}}</td>
                          <td v-if="showcolumns[5]">{{routing.last_modified}}</td>
                          <td v-if="showcolumns[6]">{{routing.modified_by}}</td>
                          <td v-if="showcolumns[7]">
                              <!--<a class="action action_menu" data-toggle="tooltip" data-placement="top" title="List" @click="showModal='list'">-->
                              <a class="action action_menu" data-toggle="tooltip" data-placement="top" title="List" @click="showList(routing)">
                                  <span class="dnl_icon dnl_action_menu"></span>
                              </a>
                              <router-link :to="'/routing/dynamic_routing/'+routing.dynamic_route_id+'/trunk_priority'" class="action action_priority" data-toggle="tooltip" data-placement="top" title="Trunk Priority">
                                  <span class="dnl_icon dnl_ingress_host"></span>
                              </router-link>
                              <router-link to="/routing/dynamic_routing/override" class="action action_reply" data-toggle="tooltip" data-placement="top" title="Override">
                                  <span class="dnl_icon dnl_reply"></span>
                              </router-link>
                              <router-link to="/routing/dynamic_routing/qos_parameters" class="action action_settings" data-toggle="tooltip" data-placement="top" title="QoS Parameters">
                                  <span class="dnl_icon dnl_setting"></span>
                              </router-link>
                              <a class="action action_download" data-toggle="tooltip" data-placement="top" title="Download">
                                  <span class="dnl_icon dnl_download"></span>
                              </a>
                              <a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" v-on:click="edit_routing(routing.dynamic_route_id)">
                                  <span class="dnl_icon dnl_action_edit"></span>
                              </a>
                              <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="delete_routing(routing.dynamic_route_id)">
                                  <span class="dnl_icon dnl_action_delete"></span>
                              </a>
                         </td>
                        </tr>
                      </tbody>
                    </table>
                </div>
                <div class="pull-right pagination">
                    <pagination :current-page="pageOne.currentPage"
                                :total-pages="pageOne.totalPages"
                                @page-changed="pageOneChanged">
                    </pagination>
                </div>
                <div class="clearfix"></div>
            </div>
		</div>
	  </div>
      <modal v-if="showModal=='list'" @close="showModal = ''" class="biggest_modal">
			<h3 slot="header">Client DID Assignment</h3>
			<div slot="body">
			  <div class="table-responsive">
				  <table class="table table-striped table-hover agents ">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Carriers</th>
                          <th>Egress Trunk Name</th>
                          <th>CPS Limit</th>
                          <th>Call Limit</th>
                          <th>Active</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(egress_trunk, index) in current_routing.egress_trunks">
                            <td>{{egress_trunk.trunk.resource_id}}</td> 
                            <td>{{egress_trunk.trunk.carrier_id}}</td> 
                            <td>{{egress_trunk.trunk.name}}</td> 
                            <td>{{egress_trunk.trunk.cps_limit}}</td> 
                            <td>{{egress_trunk.trunk.call_limit}}</td> 
                            <td>{{egress_trunk.trunk.is_active}}</td> 
                        </tr>
                      </tbody>
                    </table>
                </div>
			  </div>
			<div slot="footer">
				<!--<button class="btn btn-primary submit mini">Submit</button>
				<button @click="closeModal" class="btn btn-default cancel mini">Cancel</button>-->
			</div>
      </modal>
	</div>
</template>

<script>   
	const vTabs = require('vue!../main_components/tabs.vue'),
		  vTab = require('vue!../main_components/tab.vue'),
		  vSelect = require('vue!../main_components/select.vue'),
		  Pagination = require('vue!../main_components/pagination.vue'),
		  modal = require('vue!../main_components/modal.vue'),
		  confirmmodal = require('vue!../main_components/confirm_delete.vue');
		  _= require('lodash');
          const api = require("../../api");
	      const auth = require("../../auth");
		  import {mapActions} from 'vuex'

	module.exports = {
		created: function(){
			this.fetchRoutings();
		},
        components: {
			'tabs': vTabs,
			'tab': vTab,
			'select2': vSelect,
			'pagination': Pagination,
			'confirm': confirmmodal,
			'modal': modal
		},
		watch: {
			'search_rule': function() {
				var page = this.pageOne.currentPage - 1;
				var per_page = this.pageOne.cntpage;
				console.log("page => " + page + " , per_page => " + per_page);
				this.loading = true;

				var url_temp;
				if(this.search_rule == '0')									
					url_temp = api.getEndpointUrl() + this.apiUrl+"?page="+page+"&per_page="+per_page+"&order_by=dynamic_route_id&order_dir=desc";
				else								
					url_temp = api.getEndpointUrl() + this.apiUrl+"?page="+page+"&per_page="+per_page+"&order_by=dynamic_route_id&order_dir=desc&rule=" + this.search_rule;				
				this.$http.get(url_temp,
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(function(response) {
					this.loading = false;
					//todo: check success flag? validation errors?
					var rates = response.body.payload.items;
					console.log(rates);
					this.rates = rates;
					var total_page = response.body.payload.total;
					this.pageOne.currentPage = response.body.payload.page + 1;
					this.pageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
					console.log("total pages => " + this.pageOne.totalPages);
				}, function(error) {
					this.loading = false;
					console.log(error);
				});
			},
		},
		data: function(){
            return {
                apiUrl : '/v1/route/dynamic/list',
				routing_rule_list: [
					{ id: 'by maximum ACD', text: 'Largest ACD'},
					{ id: 'by maximum ASR', text: 'Largest ASR'},
					{ id: 'LCR', text: 'LCR' },
					{ id: 'By ASR', text: 'By ASR' },
					{ id: 'By ACD', text: 'By ACD' },
					{ id: 'at the lowest cost', text: 'Lowest Cost' },
				],
				search_rule: '0',
				current_routing: null,

				selected_ids : [],

				showModal: '',
				pageOne: {
					currentPage: 1,
					totalPages: 10,
					cntpage : 10
				},
				checker: '',
				search:'',
				select: [],
				options: [
					{ id: 1, text: 'Success' },
					{ id: 2, text: 'Multiple' },
					{ id: 3, text: 'Moved Permanently' },
					{ id: 4, text: 'Moved Temporarily' },
					{ id: 5, text: 'Use Proxy' },
					{ id: 6, text: 'Alternative Service' },
					{ id: 7, text: 'Bad Request' },
					{ id: 8, text: 'Unauthorized' },
					{ id: 9, text: 'Payment Required' },
				],
				selected1: 1,
				options1: [
					{ id: 1, text: '10' },
					{ id: 2, text: '20' },
					{ id: 3, text: '30' },
					{ id: 4, text: '50' },
					{ id: 5, text: '100' }
				],
				selected2: 0,
				options2: [
					{ id: 1, text: 'Group Name' },
					{ id: 2, text: 'Carrier Count' },
					{ id: 3, text: 'Actions' }
				],
			    routings: [],
				time_profile_list: [],
				routing_table_column_options: [{
						value: 'Name',
						label: 'Name'
						}, {
						value: 'Routing Rule',
						label: 'Routing Rule'
						}, {
						value: 'Time Profile',
						label: 'Time Profile'
						}, {
						value: 'Usage Count',
						label: 'Usage Count'
						}, {
						value: 'QoS Cycle',
						label: 'QoS Cycle'
						}, {
						value: 'Update at',
						label: 'Update at'
						}, {
						value: 'Update by',
						label: 'Update by'
						}, {
						value: 'Action',
						label: 'Action'
						}],
				routing_table_columns: ['Name', 'Routing Rule', 'Time Profile', 
						'Usage Count', 'QoS Cycle', 'Update at', 'Update by', 'Action'],
				showcolumns: [true, true, true, true, true, true, true, true],
			}
        },
		methods: {
			...mapActions({
				setMessage: 'app_message/setAppMessage'
			}),
			handleChange() {
				if (_.indexOf(this.routing_table_columns, 'Name') != -1) {
					// this.showcolumns[0] = true;
					Vue.set(this.showcolumns, 0, true);
				}
				else {
					// this.showcolumns[0] = false;
					Vue.set(this.showcolumns, 0, false);
				}
					
				if (_.indexOf(this.routing_table_columns, 'Routing Rule') != -1) {
					// this.showcolumns[1] = true;
					Vue.set(this.showcolumns, 1, true);
				}
				else {
					// this.showcolumns[1] = false;
					Vue.set(this.showcolumns, 1, false);
				}

				if (_.indexOf(this.routing_table_columns, 'Time Profile') != -1) {
					// this.showcolumns[2] = true;
					Vue.set(this.showcolumns, 2, true);
				}
				else {
					// this.showcolumns[2] = false;
					Vue.set(this.showcolumns, 2, false);
				}

				if (_.indexOf(this.routing_table_columns, 'Usage Count') != -1) {
					// this.showcolumns[3] = true;
					Vue.set(this.showcolumns, 3, true);
				}
				else {
					// this.showcolumns[3] = false;
					Vue.set(this.showcolumns, 3, false);
				}

				if (_.indexOf(this.routing_table_columns, 'QoS Cycle') != -1) {
					// this.showcolumns[4] = true;
					Vue.set(this.showcolumns, 4, true);
				}
				else {
					// this.showcolumns[4] = false;
					Vue.set(this.showcolumns, 4, false);
				}

				if (_.indexOf(this.routing_table_columns, 'Update at') != -1) {
					// this.showcolumns[5] = true;
					Vue.set(this.showcolumns, 5, true);
				}
				else {
					// this.showcolumns[5] = false;
					Vue.set(this.showcolumns, 5, false);
				}

				if (_.indexOf(this.routing_table_columns, 'Update by') != -1) {
					// this.showcolumns[6] = true;
					Vue.set(this.showcolumns, 6, true);
				}
				else {
					// this.showcolumns[6] = false;
					Vue.set(this.showcolumns, 6, false);
				}

				if (_.indexOf(this.routing_table_columns, 'Action') != -1) {
					// this.showcolumns[7] = true;
					Vue.set(this.showcolumns, 7, true);
				}
				else {
					// this.showcolumns[7] = false;
					Vue.set(this.showcolumns, 7, false);
				}

				console.log(this.showcolumns);


				// this.$nextTick(() => {
				// 	document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
				// });
			},
			deleteAll: function() {
				console.log("delete all dynamic routings");

				this.selected_ids = [];
				var vm = this;
				
				this.routings.forEach(function(routing, i){
					vm.selected_ids.push(routing.dynamic_route_id)
				});

				if (this.selected_ids.length == 0) {
					this.setMessage({
						message:'The dynamic routings has been not selected!',
						type:'error'
					});
					this.checker = false;

					return;
				}

				this.showModal = true;
				if(this.checker)
					this.checker = false;
			},
			createNew: function() {
				this.$router.push({ path: "/routing/dynamic_routing/new"});
			},
			deleteSelected: function() {
				console.log("delete selected dyanmic routings");
				console.log(this.routings);
				this.selected_ids = [];
				var vm = this;
				this.routings.forEach(function(rouing, i){
					if(rouing.selected==true) {
						vm.selected_ids.push(rouing.dynamic_route_id);
					}
				});

				if (this.selected_ids.length == 0) {
					this.setMessage({
						message:'The dynamic routings has been not selected!',
						type:'error'
					});
					this.checker = false;
					
					return;
				}

				this.showModal = true;
				if(this.checker)
					this.checker = false;
			},
			clickSelectedAll: function() {
				console.log("select_all-->"+this.checker);
				if(this.checker) {
					this.routings.forEach(function(routing, i){
						routing.selected = true;
					});
				}
				else {
					this.routings.forEach(function(routing, i){
						routing.selected = false;
					});
				}
			},
			showList: function(routing) {
				this.current_routing = routing;
				this.showModal='list';
			},
			edit_routing: function(id){
				this.$router.push({path:"/routing/dynamic_routing/edit/"+id});
			},
			delete_routing: function(id){
				this.showModal = true;
				this.selected_ids = [];
				this.selected_ids.push(id);
			},
			closeModal: function() {
				this.showModal = '';
			},
			submit: function()
			{
				var vm = this;
				this.showModal = false;

				this.selected_ids.forEach(function(item, i){
					var routingid = item;
					if(routingid == 0){
						vm.setMessage({
							message:'The dynamic routings has been not selected!',
							type:'error'
						});
					}
					else{
						vm.loading = true;
						vm.resource = vm.$resource(api.getEndpointUrl() + '/v1/route/dynamic/'+routingid);
						vm.resource.delete({dynamic_route_id:routingid}).then(function(response){
							vm.loading = false;
							let index = _.findIndex(vm.routings, elem => elem.dynamic_route_id  === routingid)
							vm.routings.splice(index, 1)
							vm.setMessage('The dynamic routings have been deleted!')
						});
					}
				});
			},		
			fetchRoutings() {
				this.loading = true;
				console.log("getting dynamic routings list");
				
				var page = this.pageOne.currentPage - 1;
				var per_page = this.pageOne.cntpage;
				console.log("page => " + page + " , per_page => " + per_page);
				this.loading = true;

				this.$http.get(api.getEndpointUrl() + this.apiUrl+"?page="+page+"&per_page="+per_page+"&order_by=dynamic_route_id&order_dir=desc",
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(function(response) {
					this.loading = false;
					//todo: check success flag? validation errors?
					var routings = response.body.payload.items;
					console.log(routings);
					this.routings = routings;
					var total_page = response.body.payload.total;
					this.pageOne.currentPage = response.body.payload.page + 1;
					this.pageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
					console.log("total pages => " + this.pageOne.totalPages);
				}, function(error) {
					this.loading = false;
					console.log(error);
				});
			},		
			pageOneChanged(pageNum) {
				if (pageNum !== this.pageOne.currentPage) {
					this.pageOne.currentPage = pageNum
					this.$nextTick(this.fetchRoutings)
				}
			},
			changePageCount (countPerPage) {
				if (countPerPage !== this.pageOne.cntpage) {
					this.pageOne.cntpage = countPerPage
					this.$nextTick(this.fetchRoutings)
				}
			},
		},
		mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
		},
		updated: function () {
			document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
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

	/* .custom_new {
		padding-top: 8px!important;
	} */
	
</style>
