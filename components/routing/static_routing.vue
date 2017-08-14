<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="#">Routing</a></li>
                <li class="breadcrumb-item active">Static Routing</li>
			</ol>
			<h1 class="page-header">Static Routing</h1>
            <confirm v-show="showModal" @close="showModal = false" @submit="submit"></confirm>
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
                    <div class="clearfix"></div>
					<div class="table-responsive">
						<table class="table table-striped table-hover aliases">
                          <thead>
                            <tr role="row">
   							  <th class="width-65">
								  <div class="checkbox checkbox-success">
									<input id="select_all" name="select_all" type="checkbox" v-model="checker" v-on:click="clickSelectedAll">
									<label for="select_all"></label>
								  </div>
							  </th>
                                <th v-if="showcolumns[0]">Name<a @click="sortName"><span class="dnl_icon dnl_sort pull-right"></span></a></th>
                                <th v-if="showcolumns[1]">Defined By</th>
                                <th v-if="showcolumns[2]">Code Deck</th>
                                <th v-if="showcolumns[3]">Route By</th>
								<th v-if="showcolumns[4]">Updated At<a @click="sortUpdateAt"><span class="dnl_icon dnl_sort pull-right"></span></a></th>
								<th v-if="showcolumns[5]">Prefix Count<a @click="sortPrefixCount"><span class="dnl_icon dnl_sort pull-right"></span></a></th>
								<th v-if="showcolumns[6]">Route Count<a @click="sortRouteCount"><span class="dnl_icon dnl_sort pull-right"></span></a></th>
								<th v-if="showcolumns[7]">Update By</th>
                                <th v-if="showcolumns[8]" class="width_98">Action</th>
                            </tr>
                          </thead>
						  <tbody>
								<tr v-if="!filterBy(routings, search).length">
									<td style="text-align: center" colspan="10">No Data Found</td>
								</tr>										
							  
                              <tr v-for="(routing,index) in filterBy(routings, search)">
                                    <td class="centred_checkbox">
                                        <div class="checkbox checkbox-success">
                                            <input v-bind:id="'selected-' + index" v-bind:name="'selected-' + index" type="checkbox" v-model="routing.selected">
                                            <label v-bind:for="'selected-' + index"></label>
                                        </div>
                                    </td>
									<td v-if="showcolumns[0]">
										<router-link to="" class="blue_link" @click.native="detailRouting(routing.static_route_id)">{{routing.name}}</router-link>
									</td>
                                  <td v-if="showcolumns[1]">{{routing.defined_by}}</td>
                                  <td v-if="showcolumns[2]">{{routing.code_deck_name}}</td>
                                  <td v-if="showcolumns[3]">{{routing.routed_by}}</td>
								  <td v-if="showcolumns[4]">{{routing.update_at}}</td>
								  <td v-if="showcolumns[5]">{{routing.prefix_count}}</td>
								  <td v-if="showcolumns[6]">{{routing.route_count}}</td>
								  <td v-if="showcolumns[7]">{{routing.update_by}}</td>
                                  <td v-if="showcolumns[8]">
                                      <a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" v-on:click="edit_static_routing(routing.static_route_id)">
                                          <span class="dnl_icon dnl_action_edit"></span>
                                      </a>
                                      <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="delete_static_routing(routing.static_route_id)">
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
                                <textarea v-model="header_text" class="form-control" placeholder="Enter Header Text"/>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4">
                            <div class="form-group">
                                <label>Footer Text:</label>
                                <textarea v-model="footer_text" class="form-control" placeholder="Enter Footer Text"/>
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
      <modal v-if="showModal=='qos_parameters'" @close="showModal = ''" class="biggest_modal">
			<h3 slot="header">Trunk Priority</h3>
			<div slot="body">
			  <div class="row">
                  <div class="col-sm-3">
                      <div class="form-group">
						<label>Min ASR:</label>
						<input type="text" name="min_asr" v-model="min_asr" class="form-control" placeholder="Enter Min ASR">
					  </div>
                  </div>
                  <div class="col-sm-3">
                      <div class="form-group">
						<label>Max ASR:</label>
						<input type="text" name="max_asr" v-model="max_asr" class="form-control" placeholder="Enter Max ASR">
					  </div>
                  </div>
				  <div class="col-sm-3">
                      <div class="form-group">
						<label>Min ABR:</label>
						<input type="text" name="min_abr" v-model="min_abr" class="form-control" placeholder="Enter Min ABR">
					  </div>
                  </div>
                  <div class="col-sm-3">
                      <div class="form-group">
						<label>Max ABR:</label>
						<input type="text" name="max_abr" v-model="max_abr" class="form-control" placeholder="Enter Max ABR">
					  </div>
                  </div>
                  <div class="col-sm-3">
                      <div class="form-group">
						<label>Min ACD:</label>
						<input type="text" name="min_acd" v-model="min_acd" class="form-control" placeholder="Enter Min ACD">
					  </div>
                  </div>
                  <div class="col-sm-3">
                      <div class="form-group">
						<label>Max ACD:</label>
						<input type="text" name="max_acd" v-model="max_acd" class="form-control" placeholder="Enter Max ACD">
					  </div>
                  </div>
                  <div class="col-sm-3">
                      <div class="form-group">
						<label>Min PDD:</label>
						<input type="text" name="min_pdd" v-model="min_pdd" class="form-control" placeholder="Enter Min PDD">
					  </div>
                  </div>
                  <div class="col-sm-3">
                      <div class="form-group">
						<label>Max PDD:</label>
						<input type="text" name="max_pdd" v-model="max_pdd" class="form-control" placeholder="Enter Max PDD">
					  </div>
                  </div>
                  <div class="col-sm-3">
                      <div class="form-group">
						<label>Min ALOC:</label>
						<input type="text" name="min_aloc" v-model="min_aloc" class="form-control" placeholder="Enter Min ALOC">
					  </div>
                  </div>
                  <div class="col-sm-3">
                      <div class="form-group">
						<label>Max ALOC:</label>
						<input type="text" name="max_aloc" v-model="max_aloc" class="form-control" placeholder="Enter Max ALOC">
					  </div>
                  </div>
                  <div class="col-sm-3">
                      <div class="form-group">
						<label>Max Price:</label>
						<input type="text" name="max_price" v-model="max_price" class="form-control" placeholder="Enter Max Price">
					  </div>
                  </div>
			  </div>
			</div>
			<div slot="footer">
				<button class="btn btn-primary submit mini">Submit</button>
				<button @click="closeModal" class="btn btn-default cancel mini">Cancel</button>
			</div>
		</modal>
	</div>
</template>

<script>   
	const vSelect = require('vue!../main_components/select.vue'),
		  Pagination = require('vue!../main_components/pagination.vue'),
          vTabs = require('vue!../main_components/tabs.vue'),
		  vTab = require('vue!../main_components/tab.vue'),
          modal = require('vue!../main_components/modal.vue'),
          confirmmodal = require('vue!../main_components/confirm_delete.vue'),
          Dropzone = require('vue!../main_components/dropzone.vue');
          const api = require("../../api");
	      const auth = require("../../auth");
		_= require('lodash');

	import {mapGetters,	mapActions} from 'vuex'
		
	module.exports = {
		created: function(){
			this.fetchRoutings();
		},
        components: {
			'select2': vSelect,
			'pagination': Pagination,
            'tabs': vTabs,
			'tab': vTab,
            'confirm': confirmmodal,
            'modal': modal,
            Dropzone
		},
		data: function(){
            return {
				order: 'static_route_id',
				sort: 'desc',

                name_sort: 'asc',
                update_at_sort: 'asc',
                prefix_count_sort: 'asc',
				route_count_sort: 'asc',
				
              apiUrl : '/v1/route/static/list',                
              min_asr: '',
              max_asr: '',
              min_abr: '',
              max_abr: '',
              min_aloc: '',
              max_aloc: '',
              max_price: '',
              min_pdd: '',
              max_pdd: '',
              min_acd: '',
              max_acd: '',
              search: '',
			  checker: '',
			  showModal: '',
			  selected_ids : [],

			  start_date:'',
			  end_date:'',
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
				pageOne: {
					currentPage: 1,
					totalPages: 10,
					cntpage : 10
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
			  file_options:[
				  {id: 1, text: 'As one big file'},
				  {id: 2, text: 'As hourly file'},
				  {id: 3, text: 'As daily file'},
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
              routings: [],
              time_profile_list: [],
				routing_table_column_options: [{
						value: 'Name',
						label: 'Name'
						}, {
						value: 'Defined By',
						label: 'Defined By'
						}, {
						value: 'Code Deck',
						label: 'Code Deck'
						}, {
						value: 'Route By',
						label: 'Route By'
						}, {
						value: 'Updated At',
						label: 'Updated At'
						}, {
						value: 'Prefix Count',
						label: 'Prefix Count'
						}, {
						value: 'Route Count',
						label: 'Route Count'
						}, {
						value: 'Update By',
						label: 'Update By'
						}, {
						value: 'Action',
						label: 'Action'
						}],
				routing_table_columns: ['Name', 'Defined By', 'Code Deck', 
						'Route By', 'Updated At', 'Prefix Count', 'Route Count', 'Update By', 'Action'],
				temp_routing_table_columns: ['Name', 'Defined By', 'Code Deck', 
						'Route By', 'Updated At', 'Prefix Count', 'Route Count', 'Update By', 'Action'],
				showcolumns: [true, true, true, true, true, true, true, true, true],
            }
        },
		methods: {
			...mapActions({
				setAsyncConfirm: 'async_confirm/setAsyncConfirm',
				setMessage: 'app_message/setAppMessage'
			}),
			sortName() {
				if(this.name_sort == 'asc') {
					this.name_sort = 'desc'
					this.sort = this.name_sort
					this.order = 'name'
					this.fetchRoutings()
				}
					
				else if(this.name_sort == 'desc') {
					this.name_sort = 'asc'
					this.sort = this.name_sort
					this.order = 'name'
					this.fetchRoutings()
				}
			},
			sortUpdateAt() {
				if(this.update_at_sort == 'asc') {
					this.update_at_sort = 'desc'
					this.sort = this.update_at_sort
					this.order = 'update_at'
					this.fetchRoutings()
				}
					
				else if(this.update_at_sort == 'desc') {
					this.update_at_sort = 'asc'
					this.sort = this.update_at_sort
					this.order = 'update_at'
					this.fetchRoutings()
				}
			},
			sortPrefixCount() {
				if(this.prefix_count_sort == 'asc') {
					this.prefix_count_sort = 'desc'
					this.sort = this.prefix_count_sort
					this.order = 'prefix_count'
					this.fetchRoutings()
				}
					
				else if(this.prefix_count_sort == 'desc') {
					this.prefix_count_sort = 'asc'
					this.sort = this.prefix_count_sort
					this.order = 'prefix_count'
					this.fetchRoutings()
				}
			},
			sortRouteCount() {
				if(this.route_count_sort == 'asc') {
					this.route_count_sort = 'desc'
					this.sort = this.route_count_sort
					this.order = 'route_count'
					this.fetchRoutings()
				}
					
				else if(this.route_count_sort == 'desc') {
					this.route_count_sort = 'asc'
					this.sort = this.route_count_sort
					this.order = 'route_count'
					this.fetchRoutings()
				}
			},
			handleChange() {
				for(let i = 0; i < this.temp_routing_table_columns.length; i++) {
					if (_.indexOf(this.routing_table_columns, this.temp_routing_table_columns[i]) != -1) {
						Vue.set(this.showcolumns, i, true);
					}
					else {
						Vue.set(this.showcolumns, i, false);
					}
				}
			},
			fetchRoutings() {
				var page = this.pageOne.currentPage - 1;
				var per_page = this.pageOne.cntpage;
				var order = this.order;
                var sort = this.sort;
				console.log("page => " + page + " , per_page => " + per_page);
				this.loading = true;

				this.$http.get(api.getEndpointUrl() + this.apiUrl+"?page="+page+"&per_page="+per_page+"&order_by="+order+"&order_dir="+sort,
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
			edit_static_routing: function(id){
				this.$router.push({path:"/routing/static_routing/edit/"+id});
			},
			detailRouting: function (id) {
				this.$router.push({ path:"/routing/static_routing/details/" + id });
			},
			createNew: function() {
				this.$router.push({path:"/routing/static_routing/new"});
			},
			deleteAll: function() {
				console.log("delete all static routins");

				this.selected_ids = [];
				var vm = this;
				
				this.routings.forEach(function(routing, i){
					vm.selected_ids.push(routing.static_route_id)
				});

				if (this.selected_ids.length == 0) {
					this.setMessage({
						message: 'The static routing has been not selected!',
						type: 'error'
					});
					this.checker = false;

					return;
				}

				this.showModal = true;
				if(this.checker)
					this.checker = false;
			},
			deleteSelected: function() {
				console.log("delete selected static routings");
				console.log(this.routings);
				this.selected_ids = [];
				var vm = this;
				this.routings.forEach(function(routing, i){
					if(routing.selected==true) {
						vm.selected_ids.push(routing.static_route_id);
					}
				});

				if (this.selected_ids.length == 0) {
					this.setMessage({
						message: 'The static routing has been not selected!',
						type: 'error'
					});
					this.checker = false;

					return;
				}

				this.showModal = true;
				if(this.checker)
					this.checker = false;
			},
			delete_static_routing: function(id){
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
						vm.message('alert-warning','The static routing has been not selected!');
					}
					else{
						vm.loading = true;
						vm.resource = vm.$resource(api.getEndpointUrl() + '/v1/route/static/'+routingid);
						vm.resource.delete({static_route_id:routingid}).then(function(response){
							vm.loading = false;
							let index = _.findIndex(vm.routings, elem => elem.static_route_id  === routingid)
							vm.routings.splice(index, 1)
							vm.setMessage('The static routings have been deleted!')
						});
					}
				});
			},			
            'success': function (file) {
                console.log('A file was successfully uploaded')
            },
            'process': function () {
                var newArr = this.$children.filter(function(item){
                  return item.id === "myVueDropzone";
                });
                var component = newArr[0];
                component.processQueue()
            },
            closeModal: function() {
				this.showModal = '';
			},
			exportCSV: function()
			{
				var csvArray = new Array();
				var fields = ["name", "defined_by", "code_deck_name", "routed_by", "update_at", "prefix_count", "route_count", "update_by"];
				csvArray.push(fields);
				var csvContent = "data:text/csv;charset=utf-8,";                        
				this.routings.forEach(function (routing, i) {
					var values = new Array();					
					values.push(routing.name);
					values.push(routing.defined_by);
					values.push(routing.code_deck_name);
					values.push(routing.routed_by);
					values.push(routing.update_at);
					values.push(routing.prefix_count);
					values.push(routing.route_count);
					values.push(routing.update_by);					                
					csvArray.push(values);                
				});	                                            
				exportToCsv('routing_static_routing_export.csv', csvArray);
			}
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
    a.action.action_reply {
        font-size: 15px;
        vertical-align: top;
        padding-top: 5px;
    }
	.el-select__tags {
		display: none;
	}	
</style>
