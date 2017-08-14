<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Switch</a></li>
                <li class="breadcrumb-item">
                    <router-link to="/switch/random_ani_group">Random ANI Group</router-link>
                </li>
				<li class="breadcrumb-item active">Random ANI Group Detail</li>
			</ol>
			<h1 class="page-header">Random ANI Group Detail</h1>
            <router-link to="/switch/random_ani_group/" class="btn btn_white back">
                <span class="dnl_icon dnl_import"></span> Back 
            </router-link>
            <tabs>
				<tab label="ANI Number" class="" icon="dnl_icon dnl_list" selected>
                    <div class="btn-group" role="group">
                      <button type="button" class="btn btn-default inline_fixer">
                          <span class="dnl_icon dnl_add"></span> Create New
                      </button>
                      <button type="button" class="btn btn-default">
                          <span class="dnl_icon dnl_action_delete"></span> Delete All
                      </button>
                      <button type="button" class="btn btn-default">
                          <span class="dnl_icon dnl_action_delete"></span> Delete Selected
                      </button>
                    </div>
                    <div class="clearfix little-space"></div>
                    <div class="table_filters">
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
                              <th class="width-65">
                                  <div class="checkbox checkbox-success">
                                    <input type="checkbox" v-model="checker">
                                    <label></label>
                                  </div>
                              </th>
							  <th>ANI</th>
                              <th class="width_98">Action</th>
							</tr>
						  </thead>
						  <tbody>
                              <tr v-for="ani in anis">
                                  <td class="centred_checkbox">
                                      <div class="checkbox checkbox-success">
                                        <input id="checker" name="checker" type="checkbox" v-model="checker">
                                        <label for="checker"></label>
                                      </div>
                                  </td>
                                  <td>{{ani.ani}}</td>
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
				<tab label="Auto Populate" class="" icon="dnl_icon dnl_export">
                    <div class="row">
                        <div class="col-md-3 col-sm-3">
                            <div class="form-group">
                                <label>Prefix:</label>
                                <input type="text" v-model="prefix" class="form-control" placeholder="Enter Prefix"/>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-3">
                            <div class="form-group">
                                <label>Number of Digits:</label>
                                <input type="text" v-model="number_of_digits" class="form-control" placeholder="Enter Number of Digits"/>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <div class="col-md-12 col-sm-12">
                            <div class="button_set">
                                <a class="btn btn-primary mini">
                                    Submit
                                </a>
                                <a class="btn btn-default mini">
                                    Reset
                                </a>
                            </div>
                        </div>
                    </div>
				</tab>
                <tab label="Auto Populate Log" class="" icon="dnl_icon dnl_qos_report">
                    <h2 class="center-block text-center">No Data Found</h2>
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
          Dropzone = require('vue!../main_components/dropzone.vue');
	module.exports = {
		components: {
			'select2': vSelect,
			'pagination': Pagination,
            'tabs': vTabs,
			'tab': vTab,
            Dropzone
		},
		data: function(){
            return {
			  checker: '',
			  showModal: '',
			  start_date:'',
			  end_date:'',
			  ftp_config_name: '',
              prefix: '',
              number_of_digits: '',
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
			  anis: [
				{
				  ani: '9547652702'
				},
                {
				  ani: '9547652702'
				},
                {
				  ani: '9547652702'
				},
                {
				  ani: '9547652702'
				},
                {
				  ani: '9547652702'
				}
			  ]
            }
        },
		methods: {
			pageOneChanged (pageNum) {
				this.pageOne.currentPage = pageNum
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
            }
		},
		mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
		}
	}
</script>

<style>
	.tab span.dnl_icon.dnl_import {
        font-size: 20px;
        float: left;
        margin-right: 6px;
    }
    
    .tab span.dnl_icon.dnl_export {
        font-size: 24px;
        float: left;
        margin-right: 6px;
    }
</style>
