<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Tools</a></li>
                  <li class="breadcrumb-item">
                      <router-link to="/tools/rate_generation">Rate Generation</router-link>
                  </li>
                  <li class="breadcrumb-item active">Rate Generation Result</li>
			</ol>
			<h1 class="page-header">Rate Generation Result</h1>
            <router-link to="/tools/rate_generation" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
            <tabs>
				<tab label="List" class="" icon="dnl_icon dnl_list" selected>
                    <div class="advanced_search_filter_panel bottom_0">
                        <div class="inline-block search_wrapper">
                            <label>Search:</label>
                            <br>
                            <input type="text" name="code" v-model="search" class="form-control inline-block search_field" placeholder="Enter Search">
                            <span class="dnl_icon dnl_musica-searcher"></span>
                        </div>
                    </div>
                    <div class="clearfix little-space"></div>
                    <a class="btn btn-primary mini pull-right">
						<span class="dnl_icon dnl_action_delete"></span> Delete Selected 
					</a>
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
							  <th>Code</th>
							  <th>Code Name</th>
							  <th>Country</th>
                              <th>Rate</th>
							  <th>Min Time</th>
                              <th>Interval</th>
							  <th>Setup Fee</th>
                              <th>Grace Time</th>
                              <th>Seconds</th>
							  <th>Profile</th>
                              <th class="width_98">Action</th>
							</tr>
						  </thead>
						  <tbody>
                              <tr v-for="code in filterBy(codes, search)">
                                  <td class="centred_checkbox">
                                      <div class="checkbox checkbox-success">
                                        <input id="checker" name="checker" type="checkbox" v-model="checker">
                                        <label for="checker"></label>
                                      </div>
                                  </td>
                                  <td>{{code.code}}</td>
                                  <td>{{code.name}}</td>
                                  <td>{{code.country}}</td>
                                  <td>{{code.rate}}</td>
                                  <td>{{code.min_time}}</td>
                                  <td>{{code.interval}}</td>
                                  <td>{{code.setup_fee}}</td>
                                  <td>{{code.grace_time}}</td>
                                  <td>{{code.seconds}}</td>
                                  <td>{{code.profile}}</td>
                                  <td>
                                      <a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit">
                                          <span class="dnl_icon dnl_action_edit"></span>
                                      </a>
                                      <a class="action action_menu" data-toggle="tooltip" data-placement="top" title="View LCR" @click="showModal='view_lcr'">
                                          <span class="dnl_icon dnl_action_menu"></span>
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
                        <div class="col-md-3 col-sm-3">
                            <div class="form-group">
                                <label>Header Text:</label>
                                <textarea v-model="header_text" class="form-control" placeholder="Enter Header Text"/>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-3">
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
                        <div class="col-md-3 col-sm-3">
                            <div class="form-group full-width-select">
                                <label for="username">Column #16:</label>
                                <select2 :options="options1" v-model="column_16"></select2>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-3">
                            <div class="form-group full-width-select">
                                <label for="username">Column #17:</label>
                                <select2 :options="options1" v-model="column_17"></select2>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-3">
                            <div class="form-group full-width-select">
                                <label for="username">Column #18:</label>
                                <select2 :options="options1" v-model="column_18"></select2>
                            </div>
                        </div>
                    </div>
					<div class="button_set center-block text-center">
						<a class="btn btn-primary mini">
							Download
						</a>
					</div>
				</tab>
			</tabs>
		</div>
	  </div>
      <modal v-if="showModal=='view_lcr'" @close="showModal = ''" class="biggest_modal">
                <h3 slot="header">Rate Type</h3>
                <div slot="body">
                  <div class="clearfix m-top-15"></div>
                  <div class="table-responsive">
					<table class="table table-striped table-hover carrier_groups">
					  <thead>
                        <tr>
                            <th>Rate Type</th>
                            <th>LCR1</th>
                            <th>LCR2</th>
                            <th>LCR3</th>
                            <th>LCR4</th>
                            <th>LCR5</th>
                        </tr>
                      </thead>
					  <tbody>
                          <tr>
                            <td>Rate</td>
                            <td>209<br>0.001000</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                          </tr>
                          <tr>
                            <td>Inter</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                          </tr>
                          <tr>
                            <td>Intra</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                          </tr>
                          <tr>
                            <td>Local</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                          </tr>
                    </tbody>
					</table>
				</div>
                </div>
                <div slot="footer">
                    <button @click="closeModal" class="btn btn-default cancel mini center-block text-center">Cancel</button>
                </div>
        </modal>
	</div>
</template>

<script>   
	const vSelect = require('vue!../main_components/select.vue'),
		  Pagination = require('vue!../main_components/pagination.vue'),
          vTabs = require('vue!../main_components/tabs.vue'),
		  vTab = require('vue!../main_components/tab.vue'),
          Dropzone = require('vue!../main_components/dropzone.vue'),
          modal = require('vue!../main_components/modal.vue');
	module.exports = {
		components: {
			'select2': vSelect,
			'pagination': Pagination,
            'tabs': vTabs,
			'tab': vTab,
            'modal': modal,
            Dropzone
		},
		data: function(){
            return {
              showModal: '',
              search: '',
			  checker: '',
			  showModal: '',
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
              column_7: '',
              column_8: '',
              column_9: '',
              column_10: '',
              column_11: '',
              column_12: '',
              column_13: '',
              column_14: '',
              column_15: '',
              column_16: '',
              column_17: '',
              column_18: '',
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
			  codes: [
				{
				  code: '1',
				  name: 'USA',
				  country: 'USA',
                  rate: '1',
                  min_time: '1',
                  interval: '1',
                  setup_fee: '0',
                  grace_time: '0',
                  seconds: '60',
                  profile: ''
				},
                {
				  code: '1',
				  name: 'USA',
				  country: 'USA',
                  rate: '1',
                  min_time: '1',
                  interval: '1',
                  setup_fee: '0',
                  grace_time: '0',
                  seconds: '60',
                  profile: ''
				},
                {
				  code: '1',
				  name: 'USA',
				  country: 'USA',
                  rate: '1',
                  min_time: '1',
                  interval: '1',
                  setup_fee: '0',
                  grace_time: '0',
                  seconds: '60',
                  profile: ''
				},
                {
				  code: '1',
				  name: 'USA',
				  country: 'USA',
                  rate: '1',
                  min_time: '1',
                  interval: '1',
                  setup_fee: '0',
                  grace_time: '0',
                  seconds: '60',
                  profile: ''
				},
                {
				  code: '1',
				  name: 'USA',
				  country: 'USA',
                  rate: '1',
                  min_time: '1',
                  interval: '1',
                  setup_fee: '0',
                  grace_time: '0',
                  seconds: '60',
                  profile: ''
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
