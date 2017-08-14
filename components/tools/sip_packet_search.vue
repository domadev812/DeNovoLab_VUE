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
							<select2 :options="period_options" v-model="period">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="col-md-4 col-sm-8">
							<div class="inlined">
								<label for="start_date">Start Time:</label>
								<el-date-picker style="width: 100%;" type="datetime" v-model="start_date" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
							<div class="inlined">
								<label for="end-date">End Time:</label>
								<el-date-picker style="width: 100%;" type="datetime" v-model="end_date" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
						</div>
						<div class="col-md-2 col-sm-4">
							<label>GMT:</label>
							<select class="selectable" v-model="gmt">
								<option v-for="item in gmt_options" v-bind:value="item.id">
									{{ item.text }}
								</option>
							</select>
						</div>
						<div class="col-md-3 col-sm-4">
							<label>Web:</label>
							<select2 :options="web_options" v-model="web">
							</select2>
						</div>
						<div class="clearfix little-space"></div>
						<div class="col-md-6 col-sm-6" v-if="is_less_options">
							<div class="white_pad less_pad">
								<h1 class="page-header">Inbound</h1>
								<div class="row">
								<div class="col-md-6">
									<label>Carriers:</label>
									<select class="selectable" v-model="ingress_carrier" @change="changeIngress">
										<option v-for="item in carrier_options" v-bind:value="item.id">
											{{ item.text }}
										</option>
									</select>
								</div>
								<div class="col-md-6">
									<label>Ingress:</label>
									<select class="selectable" v-model="ingress">
										<option v-for="item in ingress_trunk_options" v-bind:value="item.id">
											{{ item.text }}
										</option>
									</select>
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
									<select2 :options="duration_options" v-model="routing_plan">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="clearfix"></div>
								</div>
							</div>
						</div>
						<div class="col-md-6 col-sm-6" v-if="is_less_options">
							<div class="white_pad less_pad">
								<h1 class="page-header">Outbound</h1>
								<div class="row">
								<div class="col-md-6">
									<label>Carriers:</label>
									<select class="selectable" v-model="egress_carrier" @change="changeEgress">
										<option v-for="item in carrier_options" v-bind:value="item.id">
											{{ item.text }}
										</option>
									</select>
								</div>
								<div class="col-md-6">
									<label>Egress:</label>
									<select class="selectable" v-model="egress">
										<option v-for="item in egress_trunk_options" v-bind:value="item.id">
											{{ item.text }}
										</option>
									</select>
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
								<a class="btn btn-primary" style="width: 198px">
									Search
								</a>
								<a class="btn btn-default" @click="is_less_options = !is_less_options">
									{{is_less_options? 'Less Options': 'More options'}}
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
					<div class="pull-right pagination">
                        <pagination :current-page="pageOneForPacket.currentPage"
                                    :total-pages="pageOneForPacket.totalPages"
                                    @page-changed="pageOneForPacketChanged">
                        </pagination>
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
					<div class="pull-right pagination">
                        <pagination :current-page="pageOneForRequest.currentPage"
                                    :total-pages="pageOneForRequest.totalPages"
                                    @page-changed="pageOneForRequestChanged">
                        </pagination>
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
	const vTabs = require('vue!../main_components/tabs.vue'),
		  vTab = require('vue!../main_components/tab.vue'),
		  vSelect = require('vue!../main_components/select.vue'),
		  Pagination = require('vue!../main_components/pagination.vue'),
		  modal = require('vue!../main_components/modal.vue');
	const api = require("../../api");
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
				is_less_options: false,
				duration_options: [
					{id: 'all', text: 'all'},
					{id: 'non-zero', text: 'non-zero'},
					{id: 'zero', text: 'zero'},
				],
				pageOne: {
					currentPage: 0,
					totalPages: 10,
					cntPerPage: 30,
				},
				egress: '',
				ingress: '',
				egress_carrier: '',
				ingress_carrier: '',
				egress_trunk_options: [],
				ingress_trunk_options: [],
				carrier_options: [],
				pageOneForRequest: {
                    currentPage: 1,
                    totalPages: 10
                },
                pageOneForPacket: {
                    currentPage: 1,
                    totalPages: 10
                },
				web: 'web',
				web_options: [
					{ id: 'web', text: 'Web' },
					{ id: 'excel_csv', text: 'Excel CSV' },
					{ id: 'email_when_done', text: 'Email when done' },
					{ id: 'export_from_storage', text: 'Export from Storage' },
				],
				gmt: 13,
				gmt_options: [
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
				period: 'custom',
				period_options: [
					{ id: 'custom', value: 'custom', text: 'Custom' },
					{ id: 'curDay', value: 'curDay', text: 'Today' },
					{ id: 'prevDay', value: 'prevDay', text: 'Yesterday' },
					{ id: 'curWeek', value: 'curWeek', text: 'Current week' },
					{ id: 'prevWeek', value: 'prevWeek', text: 'Previous week' },
					{ id: 'curMonth', value: 'curMonth', text: 'Current month' },
					{ id: 'prevMonth', value: 'prevMonth', text: 'Previous month' },
					{ id: 'curYear', value: 'curYear', text: 'Current year' },
					{ id: 'prevYear', value: 'prevYear', text: 'Previous year' },
				],
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
				carriers: '',
				start_date: '',
				end_date: '',
				by_hours: '',
				carrirers: '',
				
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
			changeEgress() {
				this.fetchRelatedTrunks('egress');
			},
			changeIngress() {
				this.fetchRelatedTrunks('ingress');
			},
			fetchAllTrunks (type) {
				var url;
				if(type == 'egress')
					url = api.getEndpointUrl() + '/v1/trunk/egress/list';
				else if(type == 'ingress')
					url = api.getEndpointUrl() + '/v1/trunk/ingress/list';
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const trunks = body.payload.items
						console.log(trunks);
						var self = this;
						if(type == 'egress') {
							this.egress_trunk_options = [];
							this.egress_trunk_options.push('');
							trunks.forEach(function (temp, i) {
								var trunk = {};
								trunk.id = temp.resource_id;
								trunk.text = temp.name;
								self.egress_trunk_options.push(trunk);
							});
						}
						else if(type == 'ingress') {
							this.ingress_trunk_options = [];
							this.ingress_trunk_options.push('');
							trunks.forEach(function (temp, i) {
								var trunk = {};
								trunk.id = temp.resource_id;
								trunk.text = temp.name;
								self.ingress_trunk_options.push(trunk);
							});
						}
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			fetchRelatedTrunks (type) {
				var url;
				if(type == 'egress')
					url = api.getEndpointUrl() + '/v1/carrier/' + this.egress_carrier + '/egress_trunk/list';
				else if(type == 'ingress')
					url = api.getEndpointUrl() + '/v1/carrier/' + this.ingress_carrier + '/ingress_trunk/list';
				console.log(url);
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const trunks = body.payload.items
						console.log(trunks);
						var self = this;
						if(type == 'egress') {
							this.egress_trunk_options = [];
							trunks.forEach(function (temp, i) {
								var trunk = {};
								trunk.id = temp.resource_id;
								trunk.text = temp.name;
								self.egress_trunk_options.push(trunk);
							});
						}
						else if(type == 'ingress') {
							this.ingress_trunk_options = [];
							trunks.forEach(function (temp, i) {
								var trunk = {};
								trunk.id = temp.resource_id;
								trunk.text = temp.name;
								self.ingress_trunk_options.push(trunk);
							});
						}
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			fetchCarriers() {
				this.loading = true;
				var url;
				if(this.pageOne.currentPage === 0)
					url = api.getEndpointUrl() + "/v1/carrier/list"
				else
					url = api.getEndpointUrl() + "/v1/carrier/list?page=" + this.pageOne.currentPage
				console.log(url);
				this.$http.get(url)
					.then(response => {
						const body = response.body
						if (body.success) {
							var self = this;
							this.loading = false;
							const payload = body.payload
							var carriers = payload.items;
							carriers.forEach(function (temp, i) {
								var carrier = {};
								carrier.id = temp.client_id;
								carrier.text = temp.name;
								self.carrier_options.push(carrier);
							});
							this.pageOne.currentPage = payload.page + 1
							this.pageOne.totalPages = Math.ceil(payload.total / payload.per_page)
							this.pageOne.cntPerPage = payload.per_page;

							console.log(this.pageOne.totalPages, this.pageOne.currentPage);

							if(this.pageOne.totalPages > this.pageOne.currentPage)
								this.fetchCarriers();
							
						}
					})
					.catch(error => {
						console.log(error)
						this.loading = false;
					})
			},
			pageOneForRequestChanged(pageNum) {
                if (pageNum !== this.pageOneForRequest.currentPage) {
					this.pageOneForRequest.currentPage = pageNum
					// this.$nextTick(this.fetchBillingRules)
				}
            },
            pageOneForPacketChanged(pageNum) {
                if (pageNum !== this.pageOneForPacket.currentPage) {
					this.pageOneForPacket.currentPage = pageNum
					// this.$nextTick(this.fetchBillingRules)
				}
            },
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
		},
		created () {
			this.carrier_options.push('');
			this.fetchCarriers();
			this.fetchAllTrunks('egress');
			this.fetchAllTrunks('ingress');
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
