<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="#">Template</a></li>
				<li class="breadcrumb-item active">Rate Upload Template</li>
			</ol>
			<h1 class="page-header">Rate Upload Template</h1>
            <div class="white_pad table_wrap">
                <div class="advanced_search_filter_panel bottom_0">
                    <div class="inline-block search_wrapper">
                        <label>Template Name:</label>
                        <br>
                        <input type="text" name="template_name" v-model="template_name" class="form-control inline-block search_field" placeholder="Enter Template Name">
                        <span class="dnl_icon dnl_musica-searcher"></span>
                    </div>
                </div>
                <div class="clearfix little-space"></div>
                <router-link to="/template/rate_upload_template/new" class="btn btn-primary mini pull-right">
                    <span class="dnl_icon dnl_add"></span> Create new 
                </router-link>
                <div class="table_filters bottom_0">
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
                    <table class="table table-striped table-hover aliases">
                      <thead>
                        <tr>
                          <th>Template Name</th>
                          <th>Created on</th>
                          <th>Created by</th>
                          <th>Last Updated</th>
                          <th class="width-78">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                          <tr v-for="template in filterBy(templates, template_name)">
                              <td>
                                  {{template.template_name}}
                              </td>
                              <td>
                                  {{template.created_on}}
                              </td>
                              <td>
                                  {{template.created_by}}
                              </td>
                              <td>
                                  {{template.last_updated}}
                              </td>
                              <td>
                                   <router-link to="/template/rate_upload_template/new" class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit">
                                      <span class="dnl_icon dnl_action_edit"></span>
                                  </router-link>
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
          vTabs = require('vue!../main_components/tabs.vue'),
		  vTab = require('vue!../main_components/tab.vue');
	module.exports = {
		components: {
			'select2': vSelect,
			'pagination': Pagination,
            'tabs': vTabs,
			'tab': vTab,
		},
		data: function(){
            return {
              template_name: '',
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
              items: [
                  {
                    carrier_name: 'Nisha007',
                    created_on: '2016-10-07 11:19:20+00',
                    created_by: 'Admin',
                    last_update_on: '2016-10-07 11:19:20+00'
                  },
                  {
                    carrier_name: 'Nisha007',
                    created_on: '2016-10-07 11:19:20+00',
                    created_by: 'Admin',
                    last_update_on: '2016-10-07 11:19:20+00'
                  },
                  {
                    carrier_name: 'Nisha007',
                    created_on: '2016-10-07 11:19:20+00',
                    created_by: 'Admin',
                    last_update_on: '2016-10-07 11:19:20+00'
                  }
              ],
			  templates: [
				{
				  template_name: 'Testing',
				  created_on: '2016-08-20 13:38:05+00',
				  created_by: 'Admin',
                  last_updated: '2016-09-15 11:48:48+00',
                  used_by: '2'
				},
                {
				  template_name: 'Testing',
				  created_on: '2016-08-20 13:38:05+00',
				  created_by: 'Admin',
                  last_updated: '2016-09-15 11:48:48+00',
                  used_by: '2'
				},
                {
				  template_name: 'Testing',
				  created_on: '2016-08-20 13:38:05+00',
				  created_by: 'Admin',
                  last_updated: '2016-09-15 11:48:48+00',
                  used_by: '2'
				},
                {
				  template_name: 'Testing',
				  created_on: '2016-08-20 13:38:05+00',
				  created_by: 'Admin',
                  last_updated: '2016-09-15 11:48:48+00',
                  used_by: '2'
				},
                {
				  template_name: 'Testing',
				  created_on: '2016-08-20 13:38:05+00',
				  created_by: 'Admin',
                  last_updated: '2016-09-15 11:48:48+00',
                  used_by: '2'
				}
			  ]
            }
        },
		methods: {
			pageOneChanged (pageNum) {
				this.pageOne.currentPage = pageNum
			}
		},
		mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
		}
	}
</script>

<style>
</style>
