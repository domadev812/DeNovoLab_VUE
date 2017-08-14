<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Tools</a></li>
				  <li class="breadcrumb-item active">Rerate</li>
			</ol>
			<h1 class="page-header">Rerate</h1>
			<tabs>
				<tab label="Create Re-Rate Task" class="" icon="dnl_icon dnl_setting" selected>
                    <section class="role_section basic_section m-left-0">
                      <h2 class="role_section_name">Re-rate Scope</h2>
                      <div class="col-sm-6">
							<div class="inlined">
								<label for="from">From:</label>
								<input type="text" name="from" v-model="from" class="form-control" placeholder="Enter Date">
							</div>
							<div class="inlined">
								<label for="to">To:</label>
								<input type="text" name="to" v-model="to" class="form-control" placeholder="Enter Date">
							</div>
				      </div>
				      <div class="col-sm-3">
							<label>GMT:</label>
							<select2 :options="options" v-model="gmt">
								<option disabled value="0">Select one</option>
							</select2>
				      </div>
                      <div class="clearfix little-space"></div>
                      <div class="col-md-3 col-sm-4">
							<label>Update US Jurisdiction:</label>
							<select2 :options="options" v-model="up_us_jur">
								<option disabled value="0">Select one</option>
							</select2>
				      </div>
                      <div class="col-md-3 col-sm-4">
							<label>Re-rate Trunk Type:</label>
							<select2 :options="options" v-model="type">
								<option disabled value="0">Select one</option>
							</select2>
				      </div>
                      <div class="clearfix little-space"></div>
                      <div class="col-sm-6">
                            <div class="form-group">
                                <label>Ingress:</label>
                                <el-transfer v-model="ingress_trunks" :titles="['Selectable Fields', 'Selected Fields']" :data="ingress_trunk_options">
                                </el-transfer>
                            </div>
                        </div>
                      <div class="clearfix little-space"></div>
                    </section>
                    <section class="role_section basic_section m-left-0">
                      <h2 class="role_section_name">Re-rate Method</h2> 
                      <div class="col-md-12">
                          <div class="table-responsive">
                            <table class="table table-striped table-hover carrier_groups centrum">
                              <thead>
                                <tr>
                                    <th>Trunk</th>
                                    <th>Rate Table</th>
                                    <th>Set Effective Date to</th>
                                    <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                  <tr>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                      </div>
                      <div class="clearfix little-space"></div>
                    </section>
                    <div class="button_set m-top-10">
                        <a class="btn btn-primary">
                            Submit
                        </a>
                        <a class="btn btn-default">
                            Reset
                        </a>
                    </div>
				</tab>
				<tab label="Re-Rate History" class="" icon="dnl_icon dnl_qos_report">
                    <div class="table_filters">
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
                        <table class="table table-striped table-hover carrier_groups">
                          <thead>
                            <tr>
                                <th rowspan="2" colspan="1">Job ID</th>
                                <th rowspan="2" colspan="1">Created Time</th>
                                <th rowspan="2" colspan="1">Selected Time</th>
                                <th rowspan="2" colspan="1">Process Time</th>
                                <th rowspan="2" colspan="1">Status</th>
                                <th rowspan="2" colspan="1">Process</th>
                                <th colspan="2" rowspan="1">Trunk</th>
                                <th rowspan="2" colspan="1">Replace US JD</th>
                                <th colspan="2" rowspan="1">Replace Rate</th>
                                <th colspan="2" rowspan="1">Effective Date</th>
                                <th rowspan="2" colspan="1" class="width_98">Action</th>
                            </tr>
                            <tr>
                                <th rowspan="1" colspan="1">Ingress</th>
                                <th rowspan="1" colspan="1">Egress</th>
                                <th rowspan="1" colspan="1">Ingress</th>
                                <th rowspan="1" colspan="1">Egress</th>
                                <th rowspan="1" colspan="1">Ingress</th>
                                <th rowspan="1" colspan="1">Egress</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="history in histories">
                              <td>{{history.job_id}}</td>
                              <td>{{history.created_time}}</td>
                              <td>{{history.selected_time}}</td>
                              <td>{{history.process_time}}</td>
                              <td>{{history.status}}</td>
                              <td>{{history.process}}</td>
                              <td>{{history.trunk_ingress}}</td>
                              <td>{{history.trunk_egress}}</td>
                              <td>{{history.replace_us_jd}}</td>
                              <td>{{history.replace_rate_ingress}}</td>
                              <td>{{history.replace_rate_egress}}</td>
                              <td>{{history.effective_date_ingress}}</td>
                              <td>{{history.effective_date_egress}}</td>
                              <td>
                                  <a class="action action_reply" data-toggle="tooltip" data-placement="top" title="Regenerate Report">
                                      <span class="dnl_icon dnl_reply"></span>
                                  </a>
                                  <a class="action action_download" data-toggle="tooltip" data-placement="top" title="Download">
                                      <span class="dnl_icon dnl_download"></span>
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
				<tab label="Re-Rate CDR Download Log" class="" icon="dnl_icon dnl_qos_report">
					<div class="table_filters">
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
                        <table class="table table-striped table-hover carrier_groups">
                          <thead>
                            <tr>
                                <th>Job ID</th>
                                <th>Created on</th>
                                <th>Created by</th>
                                <th>Finish Time</th>
                                <th>Status</th>
                                <th class="width-65">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="job in jobs">
                              <td>{{job.job_id}}</td>
                              <td>{{job.created_on}}</td>
                              <td>{{job.created_by}}</td>
                              <td>{{job.finish_time}}</td>
                              <td>{{job.status}}</td>
                              <td>
                                  
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
                <tab label="Re-Rate Execute Log" class="" icon="dnl_icon dnl_qos_report">
					<div class="table_filters">
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
                        <table class="table table-striped table-hover carrier_groups">
                          <thead>
                            <tr>
                                <th>Job ID</th>
                                <th>Execute Type</th>
                                <th>Created on</th>
                                <th>Created by</th>
                                <th>Period</th>
                                <th>Process</th>
                                <th>Status</th>
                                <th class="width-65">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="log in logs">
                              <td>{{log.job_id}}</td>
                              <td>{{log.execute_type}}</td>
                              <td>{{log.created_on}}</td>
                              <td>{{log.created_by}}</td>
                              <td>{{log.period}}</td>
                              <td>{{log.process}}</td>
                              <td>{{log.status}}</td>
                              <td>
                                  
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
    const api = require("../../api");
	module.exports = {
		components: {
			'tabs': vTabs,
			'tab': vTab,
			'select2': vSelect,
            'pagination': Pagination
		},
		data: function(){
            return {
                ingress_trunk_options: [],
                ingress_trunks: [],
                pageOne: {
                    currentPage: 1,
                    totalPages: 10
                },
                from: '',
                to: '',
                gmt: '',
                up_us_jur: '',
                type: '',
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
				route_types: [
				  { id: 1, text: 'Fail to Next Host' },
				  { id: 2, text: 'Fail to Next Trunk' },
				  { id: 3, text: 'Stop' },
			  	],
                options: [
				  { id: 1, value: 'carrier1', text: 'Carrier 1' },
				  { id: 2, value: 'carrier2', text: 'Carrier 2' },
				  { id: 3, value: 'carrier3', text: 'Carrier 3' },
				  { id: 4, value: 'carrier4', text: 'Carrier 4' },
				  { id: 5, value: 'carrier5', text: 'Carrier 5' }
			    ],
                logs: [
                    {
                        job_id: '#5',
                        execute_type: 'Re-Report',
                        created_on: '2017-01-16 07:32:10+00',
                        created_by: 'Admin',
                        period: '',
                        process: '0 / 0',
                        status: 'Waiting'
                    },
                    {
                        job_id: '#5',
                        execute_type: 'Re-Report',
                        created_on: '2017-01-16 07:32:10+00',
                        created_by: 'Admin',
                        period: '',
                        process: '0 / 0',
                        status: 'Waiting'
                    },
                    {
                        job_id: '#5',
                        execute_type: 'Re-Report',
                        created_on: '2017-01-16 07:32:10+00',
                        created_by: 'Admin',
                        period: '',
                        process: '0 / 0',
                        status: 'Waiting'
                    },
                    {
                        job_id: '#5',
                        execute_type: 'Re-Report',
                        created_on: '2017-01-16 07:32:10+00',
                        created_by: 'Admin',
                        period: '',
                        process: '0 / 0',
                        status: 'Waiting'
                    },
                    {
                        job_id: '#5',
                        execute_type: 'Re-Report',
                        created_on: '2017-01-16 07:32:10+00',
                        created_by: 'Admin',
                        period: '',
                        process: '0 / 0',
                        status: 'Waiting'
                    }
                ],
                jobs: [
                    {
                      job_id: '#5',
                      created_on: '2017-01-16 07:32:10+00',
                      created_by: 'Admin',
                      finish_time: '2016-09-23 11:24:13+00',
                      status: 'Waiting'
                    },
                    {
                      job_id: '#5',
                      created_on: '2017-01-16 07:32:10+00',
                      created_by: 'Admin',
                      finish_time: '2016-09-23 11:24:13+00',
                      status: 'Waiting'
                    },
                    {
                      job_id: '#5',
                      created_on: '2017-01-16 07:32:10+00',
                      created_by: 'Admin',
                      finish_time: '2016-09-23 11:24:13+00',
                      status: 'Waiting'
                    },
                    {
                      job_id: '#5',
                      created_on: '2017-01-16 07:32:10+00',
                      created_by: 'Admin',
                      finish_time: '2016-09-23 11:24:13+00',
                      status: 'Waiting'
                    },
                    {
                      job_id: '#5',
                      created_on: '2017-01-16 07:32:10+00',
                      created_by: 'Admin',
                      finish_time: '2016-09-23 11:24:13+00',
                      status: 'Waiting'
                    }
                ],
                histories: [
                    {
                        job_id: '#14',
                        created_time: '2017-01-18 12:47:01+0000',
                        selected_time: '2017-01-01 14:00:00+0000 / 2017-01-01 14:59:59+0000',
                        process_time: '2017-01-18 12:47:04+0000 / 2017-01-18 12:47:04+0000',
                        status: 'Re-rate Finished',
                        process: 'Show Ingress',
                        trunk_ingress: 'Show Egress',
                        trunk_egress: 'No',
                        replace_us_jd: 'Yes',
                        replace_rate_ingress: 'No',
                        replace_rate_egress: '2017-01-01',
                        effective_date_ingress: 'Day by Day'
                    },
                    {
                        job_id: '#14',
                        created_time: '2017-01-18 12:47:01+0000',
                        selected_time: '2017-01-01 14:00:00+0000 / 2017-01-01 14:59:59+0000',
                        process_time: '2017-01-18 12:47:04+0000 / 2017-01-18 12:47:04+0000',
                        status: 'Re-rate Finished',
                        process: 'Show Ingress',
                        trunk_ingress: 'Show Egress',
                        trunk_egress: 'No',
                        replace_us_jd: 'Yes',
                        replace_rate_ingress: 'No',
                        replace_rate_egress: '2017-01-01',
                        effective_date_ingress: 'Day by Day'
                    },
                    {
                        job_id: '#14',
                        created_time: '2017-01-18 12:47:01+0000',
                        selected_time: '2017-01-01 14:00:00+0000 / 2017-01-01 14:59:59+0000',
                        process_time: '2017-01-18 12:47:04+0000 / 2017-01-18 12:47:04+0000',
                        status: 'Re-rate Finished',
                        process: 'Show Ingress',
                        trunk_ingress: 'Show Egress',
                        trunk_egress: 'No',
                        replace_us_jd: 'Yes',
                        replace_rate_ingress: 'No',
                        replace_rate_egress: '2017-01-01',
                        effective_date_ingress: 'Day by Day'
                    },
                    {
                        job_id: '#14',
                        created_time: '2017-01-18 12:47:01+0000',
                        selected_time: '2017-01-01 14:00:00+0000 / 2017-01-01 14:59:59+0000',
                        process_time: '2017-01-18 12:47:04+0000 / 2017-01-18 12:47:04+0000',
                        status: 'Re-rate Finished',
                        process: 'Show Ingress',
                        trunk_ingress: 'Show Egress',
                        trunk_egress: 'No',
                        replace_us_jd: 'Yes',
                        replace_rate_ingress: 'No',
                        replace_rate_egress: '2017-01-01',
                        effective_date_ingress: 'Day by Day'
                    }
                ]
			}
        },
        methods: {
            fetchIngressTrunks() {
                const url = api.getEndpointUrl() + '/v1/trunk/ingress/list'
                    this.$http.get(url)
                    .then(response => {
                        const body = response.body
                        if (body.success) {
                            const ingress_trunks = body.payload.items
                            var self = this;
                            ingress_trunks.forEach(function (temp, i) {
                                var trunk = {};
                                trunk.key = temp.resource_id;
                                trunk.label = temp.name;
                                self.ingress_trunk_options.push(trunk);
                            });
                            console.log(this.ingress_trunk_options);
                            
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
			pageOneChanged (pageNum) {
				this.pageOne.currentPage = pageNum
			}
		},
		mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
		},
        created () {
            this.fetchIngressTrunks()
        }
	}
</script>

<style>
    
</style>
