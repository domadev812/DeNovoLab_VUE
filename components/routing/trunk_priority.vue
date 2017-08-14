<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a>Routing</a></li>
                  <li class="breadcrumb-item"> 
                      <router-link to="/routing/dynamic_routing">Dynamic Routing</router-link>
                  </li>
				  <li class="breadcrumb-item active">Trunk Priority</li>
			</ol>
			<h1 class="page-header">Trunk Priority</h1>
            <div class="btn-group pull-right" role="group">
              <router-link :to="'/routing/dynamic_routing/'+this.id+'/trunk_priority/new'" type="button" class="btn btn-default">
				  <span class="dnl_icon dnl_add"></span> Create New
			  </router-link>
              <button type="button" class="btn btn-default">
                  <span class="dnl_icon dnl_action_delete"></span> Delete All
              </button>
              <button type="button" class="btn btn-default">
                  <span class="dnl_icon dnl_action_delete"></span> Delete Selected
              </button>
            </div>
            <router-link to="/routing/dynamic_routing" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad table_wrap">
				<div class="advanced_search_filter_panel bottom_0">
					<div class="inline-block search_wrapper pull-left">
						<label>Search:</label>
						<br>
						<input type="text" name="credit_search" v-model="credit_search" class="form-control inline-block search_field" placeholder="Enter Search">
						<span class="dnl_icon dnl_musica-searcher"></span>
					</div>
                    <div class="inline-block pull-left">
                        <label>Egress Trunk:</label>
                        <br>
                        <select2 :options="options2" v-model="egress_trunk">
                            <option disabled value="0">Show/Hide Columns</option>
                        </select2>
                    </div>
                    <div class="col-md-4 col-sm-8">
                        <div class="inlined">
                            <label for="priority_range_1">Priority Range:</label>
                            <input type="text" name="priority_range_1" v-model="priority_range_1" class="form-control" placeholder="Enter Priority Range">
                        </div>
                        <div class="inlined">
                            <label for="priority_range_2" class="m-top-15"></label>
                            <input type="text" name="priority_range_2" v-model="priority_range_2" class="form-control" placeholder="Enter Priority Range">
                        </div>
                    </div>
                    <div class="inline-block">
                        <a class="btn btn-primary m-top-25">
                            Query
                        </a>
                    </div>
                    <div class="clearfix"></div>
				</div>
				<div class="table_filters m-top-15">
					<div class="inline-block select_min_wrapper">
						<span class="inline-block">Page row:</span>
						<select2 :options="options1" v-model="selected1" class="inline-block">
						</select2>
					</div>
					<div class="inline-block">
						<select2 :options="options2" v-model="selected2">
							<option disabled value="0">Show/Hide Columns</option>
						</select2>
					</div>
				</div>
				<div class="clearfix"></div>
				<div class="table-responsive">
					<table class="table table-striped table-hover aliases credits">
					  <thead>
						<tr>
                          <th class="width-65">
                              <div class="checkbox checkbox-success">
                                <input type="checkbox" id="checker" name="checker" v-model="checker">
                                <label for="checker"></label>
                              </div>
                          </th>
                          <th>Prefix</th>
						  <th>Egress Trunk<span class="dnl_icon dnl_sort pull-right"></span></th>
						  <th>Priority</th>
						  <th class="width_98">Actions</th>
						</tr>
					  </thead>
					  <tbody>
						<tr v-for="trunk in filterBy(trunks, credit_search)">
                          <td class="centred_checkbox">
                              <div class="checkbox checkbox-success">
                                <input :id="trunk.id" :name="trunk.id" type="checkbox" v-model="trunk.status">
                                <label :for="trunk.id"></label>
                              </div>
                          </td>
                          <td>{{trunk.prefix}}</td>
						  <td>{{trunk.egress_trunk}}</td>
						  <td>{{trunk.priority}}</td>
						  <td>
							  <a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit">
								  <span class="dnl_icon dnl_action_edit"></span>
							  </a>
							  <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete">
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
	</div>
</template>

<script>   
	const vSelect = require('vue!../main_components/select.vue'),
		  Pagination = require('vue!../main_components/pagination.vue'),
		  modal = require('vue!../main_components/modal.vue');
	module.exports = {
		components: {
			'select2': vSelect,
			'pagination': Pagination,
			'modal': modal
		},
		props: ['id'],
		data: function(){
            return {
              priority_range_1: '',
              priority_range_2: '',
			  credit_search:'',
			  checker: false,
			  showModal: '',
			  start_date:'',
			  end_date:'',
			  ftp_config_name: '',
			  pageOne: {
                currentPage: 1,
                totalPages: 10
              },
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
				  { id: 1, text: 'Alias' },
				  { id: 2, text: 'Active' },
				  { id: 3, text: 'Actions' }
			  ],
              egress_trunk: '',
			  trunks: [
				{
				  id: 't_1',
				  status: false,
                  prefix: 'tru',
                  egress_trunk: 'Egress Trunk Name',
                  priority: '2'
				},
                {
				  id: 't_2',
				  status: false,
                  prefix: 'tru',
                  egress_trunk: 'Egress Trunk Name',
                  priority: '2'
				},
                {
				  id: 't_3',
				  status: false,
                  prefix: 'tru',
                  egress_trunk: 'Egress Trunk Name',
                  priority: '2'
				},
                {
				  id: 't_4',
				  status: false,
                  prefix: 'tru',
                  egress_trunk: 'Egress Trunk Name',
                  priority: '2'
				},
                {
				  id: 't_5',
				  status: false,
                  prefix: 'tru',
                  egress_trunk: 'Egress Trunk Name',
                  priority: '2'
				}
			  ]
            }
        },
		methods: {
			pageOneChanged (pageNum) {
				this.pageOne.currentPage = pageNum
			},
			closeModal: function() {
				this.showModal = '';
			}
		},
		mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
		}
	}
</script>

<style>
</style>
