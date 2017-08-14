<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Monitoring</a></li>
				  <li class="breadcrumb-item active">Dialer Detection</li>
			</ol>
			<h1 class="page-header">Dialer Detection</h1>
			<tabs>
				<tab label="Dialer Detection" class="" icon="dnl_icon dnl_qos_report" selected>
                    <router-link to="/monitoring/dialer_detection/new" class="btn btn-primary mini pull-right">
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
                              <th class="width-65">
                                  <div class="checkbox checkbox-success">
                                    <input type="checkbox" v-model="checker">
                                    <label></label>
                                  </div>
                              </th>
                              <th>Name<span class="dnl_icon dnl_sort pull-right"></span></th>
                              <th>Ingress</th>
                              <th>Frequency</th>
                              <th>ANI Counts</th>
                              <th>Status</th>
                              <th>Send Email</th>
                              <th>Block ANI</th>
                              <th class="width_138">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="dialer in dialers">
                              <td class="centred_checkbox">
                                  <div class="checkbox checkbox-success">
                                    <input id="checker" name="checker" type="checkbox"s>
                                    <label for="checker"></label>
                                  </div>
                              </td>
                              <td>
                                  <router-link to="/monitoring/dialer_detection/new" class="blue_link">
                                      {{dialer.name}}
                                  </router-link>
                              </td>
                              <td>{{dialer.ingress}}</td>
                              <td>{{dialer.frequency}}</td>
                              <td>{{dialer.ani_counts}}</td>
                              <td>{{dialer.status}}</td>
                              <td>{{dialer.send_email}}</td>
                              <td>{{dialer.block_ani}}</td>
                              <td>
                                  <router-link to="/monitoring/dialer_detection/new" class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit">
                                      <span class="dnl_icon dnl_action_edit"></span>
                                  </router-link>
                                  <a class="action action_activate" data-toggle="tooltip" data-placement="top" title="Deactivate">
                                      <span class="dnl_icon dnl_check"></span>
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
				<tab label="Execution Log" class="" icon="dnl_icon dnl_qos_report">
                    <div class="advanced_search_filter_panel">
						<div class="col-md-3 col-sm-4">
							<label>Rule Name:</label>
							<select2 :options="options2" v-model="rule_name">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="col-md-4 col-sm-8">
							<div class="inlined">
								<label for="start_date">Start Time:</label>
								<input type="text" name="start_date" v-model="start_date" class="form-control" placeholder="Enter Date">
							</div>
							<div class="inlined">
								<label for="end-date">End Time:</label>
								<input type="text" name="end_date" v-model="end_date" class="form-control" placeholder="Enter Date">
							</div>
						</div>
						<div class="col-md-3 col-sm-3">
                            <a class="btn btn-primary m-top-25">
                                Query
                            </a>
						</div>
						<div class="clearfix"></div>
					</div>
                    <div class="table_filters bottom_0">
                        <div class="inline-block select_min_wrapper">
                            <span class="inline-block">Page row:</span>
                            <select2 :options="options1" v-model="selected1" class="inline-block">
                            </select2>
                        </div>
                        <div class="inline-block fix_medium_select">
                            <select2 :options="options2" v-model="selected2">
                                <option disabled value="0">Show/Hide Columns</option>
                            </select2>
                        </div>
                    </div>
					<div class="table-responsive">
						<table class="table table-striped table-hover carrier_groups centrum">
						  <thead>
                            <tr>
								<th>Rule Name</th>
								<th>Time</th>
								<th>Type</th>
								<th>Status</th>
                                <th>Msg</th>
								<th># of ANI Found</th>
                                <th># of Calls</th>
							</tr>
						  </thead>
						  <tbody>
                              <tr v-for="log in ex_logs">
                                  <td>{{log.rule_name}}</td>
                                  <td>{{log.time}}</td>
                                  <td>{{log.type}}</td>
                                  <td>{{log.status}}</td>
                                  <td>{{log.msg}}</td>
                                  <td>{{log.founds_number}}</td>
                                  <td>{{log.calls_number}}</td>
                              </tr>
						  </tbody>
						</table>
					</div>
                    
				</tab>
				<tab label="ANI Blocking Log" class="" icon="dnl_icon dnl_qos_report">
                    <div class="advanced_search_filter_panel">
						<div class="col-md-3 col-sm-4">
							<label>Rule Name:</label>
							<select2 :options="options2" v-model="rule_name">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
                        <div class="col-md-3 col-sm-4">
							<label>Type:</label>
							<select2 :options="options2" v-model="rule_name">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="col-md-6 col-sm-8">
							<div class="inlined">
								<label for="start_date">Start Time:</label>
								<input type="text" name="start_date" v-model="start_date" class="form-control" placeholder="Enter Date">
							</div>
							<div class="inlined">
								<label for="end-date">End Time:</label>
								<input type="text" name="end_date" v-model="end_date" class="form-control" placeholder="Enter Date">
							</div>
						</div>
						<div class="col-md-3 col-sm-3">
                            <a class="btn btn-primary m-top-25">
                                Query
                            </a>
						</div>
						<div class="clearfix"></div>
					</div>
					<h2 class="center-block text-center">No Data Found</h2>
				</tab>
			</tabs>
		</div>
	  </div>
	</div>
</template>

<script>   
	const vTabs = require('vue!../main_components/tabs.vue'),
		  vTab = require('vue!../main_components/tab.vue'),
		  vSelect = require('vue!../main_components/select.vue'),
          Pagination = require('vue!../main_components/pagination.vue');
	module.exports = {
		components: {
			'tabs': vTabs,
			'tab': vTab,
			'select2': vSelect,
            'pagination': Pagination
		},
		data: function(){
            return {
                ex_logs: [
                  {
                      rule_name: 'Sourav Test',
                      time: '2016-11-20 17:31:14+00',
                      type: 'block',
                      status: 'succeed',
                      msg: 'OK',
                      founds_number: '9547652702',
                      calls_number: '5'
                  },
                  {
                      rule_name: 'Sourav Test',
                      time: '2016-11-20 17:31:14+00',
                      type: 'block',
                      status: 'succeed',
                      msg: 'OK',
                      founds_number: '9547652702',
                      calls_number: '5'
                  },
                  {
                      rule_name: 'Sourav Test',
                      time: '2016-11-20 17:31:14+00',
                      type: 'block',
                      status: 'succeed',
                      msg: 'OK',
                      founds_number: '9547652702',
                      calls_number: '5'
                  },
                  {
                      rule_name: 'Sourav Test',
                      time: '2016-11-20 17:31:14+00',
                      type: 'block',
                      status: 'succeed',
                      msg: 'OK',
                      founds_number: '9547652702',
                      calls_number: '5'
                  },
                  {
                      rule_name: 'Sourav Test',
                      time: '2016-11-20 17:31:14+00',
                      type: 'block',
                      status: 'succeed',
                      msg: 'OK',
                      founds_number: '9547652702',
                      calls_number: '5'
                  }
                ],
                pageOne: {
                    currentPage: 1,
                    totalPages: 10
                },
				route_types: [
				  { id: 1, text: 'Fail to Next Host' },
				  { id: 2, text: 'Fail to Next Trunk' },
				  { id: 3, text: 'Stop' },
			  	],
                rule_name: '',
                start_date: '',
                end_date: '',
                selected1: 1,
                options1: [
                      { id: 1, text: '10' },
                      { id: 2, text: '20' },
                      { id: 3, text: '30' },
                      { id: 4, text: '50' },
                      { id: 5, text: '100' }
                ],
                selected2: 1,
                options2: [
                      { id: 1, text: 'Alias' },
                      { id: 2, text: 'Active' },
                      { id: 3, text: 'Actions' }
                ],
                checker: '',
				dialers: [
					{
					  name: "Sourav Test",
					  ingress: "Sudha Telecom",
                      frequency: "5 min(s)",
					  ani_counts: "2",
                      status: "Active",
					  send_email: "True",
                      block_ani: "False"
					},
                    {
					  name: "Sourav Test",
					  ingress: "Sudha Telecom",
                      frequency: "5 min(s)",
					  ani_counts: "2",
                      status: "Active",
					  send_email: "True",
                      block_ani: "False"
					},
                    {
					  name: "Sourav Test",
					  ingress: "Sudha Telecom",
                      frequency: "5 min(s)",
					  ani_counts: "2",
                      status: "Active",
					  send_email: "True",
                      block_ani: "False"
					},
                    {
					  name: "Sourav Test",
					  ingress: "Sudha Telecom",
                      frequency: "5 min(s)",
					  ani_counts: "2",
                      status: "Active",
					  send_email: "True",
                      block_ani: "False"
					},
                    {
					  name: "Sourav Test",
					  ingress: "Sudha Telecom",
                      frequency: "5 min(s)",
					  ani_counts: "2",
                      status: "Active",
					  send_email: "True",
                      block_ani: "False"
					}
			  ]
			}
        },
        methods: {
			pageOneChanged (pageNum) {
				this.pageOne.currentPage = pageNum
			}
		}
	}
</script>

<style>
</style>
