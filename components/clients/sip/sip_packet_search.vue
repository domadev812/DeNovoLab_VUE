<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single big_data">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Tools</a></li>
				  <li class="breadcrumb-item active">SIP Packet Search</li>
			</ol>
			<h1 class="page-header">SIP Packet Search</h1>
			<tabs>
				<tab label="SIP Packet" class="" icon="dnl_icon dnl_to_left" selected>
					<div class="advanced_search_filter_panel">
						<div class="col-md-3 col-sm-4">
							<label>Time:</label>
							<select2 :options="options" v-model="period">
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
						<div class="col-md-2 col-sm-4">
							<label>GMT:</label>
							<select2 :options="options" v-model="gmt">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="col-md-3 col-sm-4">
							<label>Web:</label>
							<select2 :options="options" v-model="web">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="clearfix little-space"></div>
						<div class="col-md-6 col-sm-6">
							<div class="white_pad less_pad">
								<h1 class="page-header">Inbound</h1>
								<div class="row">
								<div class="col-md-6">
									<label>Carriers:</label>
									<select2 :options="options" v-model="carriers">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-6">
									<label>Ingress:</label>
									<select2 :options="options" v-model="ingress">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="clearfix little-space"></div>
								<div class="col-md-6">
									<label for="country">ANI:</label>
									<input type="text" name="country" v-model="country" class="form-control" placeholder="Enter ANI">
								</div>
								<div class="col-md-6">
									<label for="code_name">DNIS:</label>
									<input type="text" name="code_name" v-model="code_name" class="form-control" placeholder="Enter DNIS">
								</div>
                                <div class="clearfix little-space"></div>
								<div class="col-md-6">
									<label>Duration:</label>
									<select2 :options="options" v-model="routing_plan">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="clearfix"></div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-sm-6">
							<div class="white_pad less_pad">
								<h1 class="page-header">Outbound</h1>
								<div class="row">
								<div class="col-md-6">
									<label>Carriers:</label>
									<select2 :options="options" v-model="carriers">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-6">
									<label>Egress:</label>
									<select2 :options="options" v-model="egress_trunk">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="clearfix little-space"></div>
								<div class="col-md-6">
									<label for="country">ANI:</label>
									<input type="text" name="country" v-model="country" class="form-control" placeholder="Enter ANI">
								</div>
								<div class="col-md-6">
									<label for="code_name">DNIS:</label>
									<input type="text" name="code_name" v-model="code_name" class="form-control" placeholder="Enter DNIS">
								</div>
								<div class="clearfix"></div>
								</div>
							</div>
						</div>
						<div class="col-md-12 col-sm-12">
							<div class="button_set">
								<a class="btn btn-primary">
									Search
								</a>
								<a class="btn btn-default">
									Less Options
								</a>
							 </div>
						</div>
						<div class="clearfix"></div>
					</div>
					<div class="clearfix"></div>
					<div class="table-responsive">
						<table class="table table-striped table-hover carrier_groups centrum">
						  <thead>
							<tr>
								<th>Time</th>
								<th>Start Time</th>
								<th>End Time</th>
								<th>Orig Src Number</th>
                                <th>Orig DST Number</th>
                                <th>Origination Call ID</th>
								<th>Term Src Number</th>
								<th>Term DST Number</th>
								<th>Termination Call ID</th>
                                <th>Orig Call Duration</th>
								<th>Orig Switch IP</th>
								<th>Termination Profile IP</th>
							</tr>
						  </thead>
						  <tbody>
							<tr v-for="packet in packets">
							  <td>{{packet.time}}</td>
							  <td>{{packet.start_time}}</td>
							  <td>{{packet.end_time}}</td>
							  <td>{{packet.orig_src_number}}</td>
                              <td>{{packet.orig_dst_number}}</td>
                              <td>{{packet.orig_call_id}}</td>
							  <td>{{packet.term_src_number}}</td>
							  <td>{{packet.term_dst_number}}</td>
							  <td>{{packet.termination_call_id}}</td>
                              <td>{{packet.orig_call_duration}}</td>
							  <td>{{packet.orig_switch_ip}}</td>
							  <td>{{packet.termination_profile_ip}}</td>
							</tr>
						  </tbody>
						</table>
					</div>
					<div class="clearfix"></div>
				</tab>
				<tab label="SIP Request" class="" icon="dnl_icon dnl_to_right">
					<div class="table-responsive">
						<table class="table table-striped table-hover carrier_groups centrum">
						  <thead>
                            <tr>
                                <th>Requested On</th>
                                <th>Complete Time</th>
                                <th>Call Id</th>
                                <th>Requested By</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                          </thead>
						  <tbody>
							<tr v-for="search in searches">
							  <td>{{search.requested_on}}</td>
							  <td>{{search.complete_time}}</td>
                              <td>{{search.call_id}}</td>
							  <td>{{search.requested_by}}</td>
							  <td>{{search.status}}</td>
                              <td>
                                 <a class="action action_download" data-toggle="tooltip" data-placement="top" title="PCAP Download">
									  <span class="dnl_icon dnl_download"></span>
								 </a>
                                 <a class="action action_read" data-toggle="tooltip" data-placement="top" title="View in CloudShark">
									  <span class="dnl_icon dnl_eye"></span>
								 </a> 
                                 <a class="action action_send" data-toggle="tooltip" data-placement="top" title="Send E-mail" @click="showModal = 'send_email'">
									  <span class="dnl_icon dnl_support"></span>
								 </a>
                                 <a class="action action_copy" data-toggle="tooltip" data-placement="top" title="Copy Link" @click="showModal = 'copy_link'">
									  <span class="dnl_icon dnl_copy"></span>
								 </a> 
                                 <a class="action action_trigger" data-toggle="tooltip" data-placement="top" title="Redo">
									  <span class="dnl_icon dnl_trigger"></span>
								 </a> 
                                 <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete">
									  <span class="dnl_icon dnl_action_delete"></span>
								 </a> 
                              </td>
							</tr>
						  </tbody>
						</table>
					</div>
					<div class="clearfix"></div>
				</tab>
			</tabs>
		</div>
	  </div>
      <modal v-if="showModal=='send_email'" @close="showModal = ''">
			<h3 slot="header">Send E-mail</h3>
			<div slot="body">
			  <div class="">
				  <form class="form">
					  <div class="form-group">
						<label for="subject">Subject:</label>
						<input type="text" name="subject" v-model="subject" class="form-control" placeholder="Enter Subject">
					  </div>
					  <div class="form-group">
						<label for="emails">E-mail:</label>
						<input type="text" name="emails" v-model="emails" class="form-control" placeholder="Enter E-mails">
					  </div>
					  <div class="form-group">
						<label for="content">Content:</label>
						<textarea name="content" v-model="content" class="form-control" placeholder="Enter Content"></textarea>
					  </div>
				  </form>
			  </div>
			</div>
			<div slot="footer">
				<button class="btn btn-primary submit">Send</button>
				<button @click="closeModal" class="btn btn-default cancel">Cancel</button>
			</div>
		</modal>
        <modal v-if="showModal=='copy_link'" @close="showModal = ''">
			<h3 slot="header">Copy Link</h3>
			<div slot="body">
			  <div class="">
				  <form class="form">
					  <div class="form-group">
						<label for="link">Link:</label>
						<input type="text" name="link" v-model="link" class="form-control" placeholder="Copy Link">
					  </div>
				  </form>
			  </div>
			</div>
			<div slot="footer">
				<button class="btn btn-primary submit">Copy</button>
				<button @click="closeModal" class="btn btn-default cancel">Cancel</button>
			</div>
		</modal>
	</div>
</template>

<script>   
	const vTabs = require('vue!../../main_components/tabs.vue'),
		  vTab = require('vue!../../main_components/tab.vue'),
		  vSelect = require('vue!../../main_components/select.vue'),
		  Pagination = require('vue!../../main_components/pagination.vue'),
          modal = require('vue!../../main_components/modal.vue');
	module.exports = {
		components: {
			'tabs': vTabs,
			'tab': vTab,
			'select2': vSelect,
			'pagination': Pagination,
            'modal': modal
		},
		data: function(){
            return {
                subject: '',
                emails: '',
                content: '', link:'http://158.69.203.19:8000/api/v1.0/wwwpub/50186gSc96fRNBCVMiU41w4oifvDzPvRpIapIwalwy9MARdIJJ5xNKwziUj1rHDuT3uyR3NtSXIgFXrCC2WA5Dih1C3HAkGMsQtRQXLH.pcap',
				pageOne: {
					currentPage: 1,
					totalPages: 10
				},
                showModal: '',
				route_types: [
				  { id: 1, text: 'Fail to Next Host' },
				  { id: 2, text: 'Fail to Next Trunk' },
				  { id: 3, text: 'Stop' },
			  	],
				period: '',
				carriers: '',
				start_date: '',
				end_date: '',
				gmt: '',
				by_hours: '',
				web: '',
				carrirers: '',
				ingress: '',
				tech_prefix: '',
				country: '',
				code_name: '',
				routing_plan: '',
				egress_trunk: '',
				rate_type: '',
				rate_table: '',
				switch_server: '',
				group_by1: '',
				group_by2: '',
				group_by3: '',
				group_by4: '',
				group_by5: '',
				group_by6: '',
				selected1: '',
				selected2: '',
				rate_display: '',
				period_time_1: '',
				period_time_2: '',
				options: [
				  { id: 1, value: 'carrier1', text: 'Carrier 1' },
				  { id: 2, value: 'carrier2', text: 'Carrier 2' },
				  { id: 3, value: 'carrier3', text: 'Carrier 3' },
				  { id: 4, value: 'carrier4', text: 'Carrier 4' },
				  { id: 5, value: 'carrier5', text: 'Carrier 5' }
			    ],
				packets: [
					  {
						  time: '2017-02-17 07:45:26 +0000',
						  start_time: '2017-02-17 07:45:26 +0000',
						  end_time: '2017-02-17 07:45:26 +0000',
						  orig_src_number: '7012',
                          orig_dst_number: '8011441917210009',
                          orig_call_id: '626a14a49988a08164c770088b7882f7',
						  term_src_number: '-',
						  term_dst_number: '-',
						  termination_call_id: '-',
                          orig_call_duration: '0',
						  orig_switch_ip: '158.69.203.19',
						  termination_profile_ip: '-'
					  },
                      {
						  time: '2017-02-17 07:45:26 +0000',
						  start_time: '2017-02-17 07:45:26 +0000',
						  end_time: '2017-02-17 07:45:26 +0000',
						  orig_src_number: '7012',
                          orig_dst_number: '8011441917210009',
                          orig_call_id: '626a14a49988a08164c770088b7882f7',
						  term_src_number: '-',
						  term_dst_number: '-',
						  termination_call_id: '-',
                          orig_call_duration: '0',
						  orig_switch_ip: '158.69.203.19',
						  termination_profile_ip: '-'
					  },
                      {
						  time: '2017-02-17 07:45:26 +0000',
						  start_time: '2017-02-17 07:45:26 +0000',
						  end_time: '2017-02-17 07:45:26 +0000',
						  orig_src_number: '7012',
                          orig_dst_number: '8011441917210009',
                          orig_call_id: '626a14a49988a08164c770088b7882f7',
						  term_src_number: '-',
						  term_dst_number: '-',
						  termination_call_id: '-',
                          orig_call_duration: '0',
						  orig_switch_ip: '158.69.203.19',
						  termination_profile_ip: '-'
					  },
                      {
						  time: '2017-02-17 07:45:26 +0000',
						  start_time: '2017-02-17 07:45:26 +0000',
						  end_time: '2017-02-17 07:45:26 +0000',
						  orig_src_number: '7012',
                          orig_dst_number: '8011441917210009',
                          orig_call_id: '626a14a49988a08164c770088b7882f7',
						  term_src_number: '-',
						  term_dst_number: '-',
						  termination_call_id: '-',
                          orig_call_duration: '0',
						  orig_switch_ip: '158.69.203.19',
						  termination_profile_ip: '-'
					  },
                      {
						  time: '2017-02-17 07:45:26 +0000',
						  start_time: '2017-02-17 07:45:26 +0000',
						  end_time: '2017-02-17 07:45:26 +0000',
						  orig_src_number: '7012',
                          orig_dst_number: '8011441917210009',
                          orig_call_id: '626a14a49988a08164c770088b7882f7',
						  term_src_number: '-',
						  term_dst_number: '-',
						  termination_call_id: '-',
                          orig_call_duration: '0',
						  orig_switch_ip: '158.69.203.19',
						  termination_profile_ip: '-'
					  }
			    ],
			    searches: [
					{
					  requested_on: '2017-02-17 08:00:24 +0000',
					  complete_time: '2017-02-17 08:00:37 +0000',
                      call_id: '27772912805daca7f7d011e53b95aa39',
					  requested_by: 'Admin',
					  status: 'Waiting'
					},
                    {
					  requested_on: '2017-02-17 08:00:24 +0000',
					  complete_time: '2017-02-17 08:00:37 +0000',
                      call_id: '27772912805daca7f7d011e53b95aa39',
					  requested_by: 'Admin',
					  status: 'Waiting'
					},
                    {
					  requested_on: '2017-02-17 08:00:24 +0000',
					  complete_time: '2017-02-17 08:00:37 +0000',
                      call_id: '27772912805daca7f7d011e53b95aa39',
					  requested_by: 'Admin',
					  status: 'Waiting'
					},
                    {
					  requested_on: '2017-02-17 08:00:24 +0000',
					  complete_time: '2017-02-17 08:00:37 +0000',
                      call_id: '27772912805daca7f7d011e53b95aa39',
					  requested_by: 'Admin',
					  status: 'Waiting'
					},
                    {
					  requested_on: '2017-02-17 08:00:24 +0000',
					  complete_time: '2017-02-17 08:00:37 +0000',
                      call_id: '27772912805daca7f7d011e53b95aa39',
					  requested_by: 'Admin',
					  status: 'Waiting'
					}
			  ]
			}
        },
		methods: {
			toggleTable(event) {
				var element = event.currentTarget;
				$(element).parents('tr').siblings('.collapse').toggleClass('in');
			},
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
    a.action.action_download {
        font-size: 18px;
        padding-top: 5px;
        vertical-align: top;
    }
</style>
