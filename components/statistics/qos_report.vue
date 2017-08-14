<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper">
			<div class="sidebar">
			  <ul class="nav nav-sidebar">
				<li>
					<router-link to="/statistics/dashboard">
						<span class="dnl_icon dnl_dashboard"></span>
						Dashboard 
					</router-link>
				</li>
				<li>
					<router-link to="/statistics/dashboard/report">
						<span class="dnl_icon dnl_report"></span>
						Report
					</router-link>
				</li>
				<li>
					<router-link to="/statistics/dashboard/charts">
						<span class="dnl_icon dnl_chart"></span>
						Charts
					</router-link>
				</li>
				<li>
					<router-link to="/statistics/dashboard/auto_delivery">
						<span class="dnl_icon dnl_auto_delivery"></span>
						Auto Delivery
					</router-link>
				</li>
				<li class="active">
					<router-link to="/statistics/dashboard/qos_report">
						<span class="dnl_icon dnl_qos_report"></span>
						Qos Report
						<span class="sr-only">(current)</span>
					</router-link>
				</li>
				<li>
					<router-link to="/statistics/dashboard/ingress_client_qos">
						<span class="dnl_icon dnl_ingress"></span>
						Ingress Clients Qos
					</router-link>
				</li>
				<li>
					<router-link to="/statistics/dashboard/egress_client_qos">
						<span class="dnl_icon dnl_egress"></span>
						Egress Clients Qos
					</router-link>
				</li>
				<li>
					<router-link to="/statistics/dashboard/alert">
						<span class="dnl_icon dnl_ring"></span> Alert
						<span class="sr-only">(current)</span>
					</router-link>
				</li>
			  </ul>
			  <div class="sidebar_footer">
				  <span class="dnl_icon dnl_menu"></span>
				  <br>
				  DeNovoLab@2010-2016 <br> All Rights Reserved. 
			  </div>
			</div>
			<div class="col-sm-12 col-md-offset-2 col-md-10 main">
				<time-display></time-display>
				<ol class="breadcrumb">
					  <li class="breadcrumb-item"><a>Statistics</a></li>
					  <li class="breadcrumb-item">
						  <router-link to="/statistics/dashboard">Dashboard</router-link>
					  </li>
					  <li class="breadcrumb-item active">Qos Report</li>
				</ol>
				<h1 class="page-header">Qos Report</h1>
				<div class="white_pad table_wrap">
				  <div class="advanced_search_filter_panel">
						<div class="inline-block">
							<label>Refresh Every:</label>
							<br>
							<select2 :options="options" v-model="selected_slot"></select2>
						</div>
						<div class="inline-block search_wrapper">
							<label>Switch Server:</label>
							<br>
							<select2 :options="options" v-model="switch_server"></select2>
						</div>
					</div>
					<h1 class="page-header">Session</h1>
					<div class="table-responsive">
						<table class="table table-striped table-hover clients">
						  <thead>
                            <tr>
                                <th>Ingress Channel</th>
                                <th>Egress Channel</th>
                                <th>Total Channel</th>
                                <th>Total Calls</th>
                            </tr>
                          </thead>
						  <tbody>
							<tr v-for="session in sessions">
								<td>{{session.ingress_channel}}</td>
								<td>{{session.egress_channel}}</td>
								<td>{{session.total_channel}}</td>
								<td>{{session.total_calls}}</td>
							</tr>
						  </tbody>
						</table>
					</div>
					<div class="clearfix little-space"></div>
					<h1 class="page-header">Point in Time</h1>
					<div class="table-responsive">
						<table class="table table-striped table-hover clients">
						  <thead>
                            <tr>
								<th>Process</th>
                                <th>Currently</th>
                                <th>24 Hours Peak</th>
                                <th>7 Days Peak</th>
                                <th>Recent Peak</th>
								<th>Max</th>
                            </tr>
                          </thead>
						  <tbody>
							<tr v-for="peak in peaks">
								<td>{{peak.process}}</td>
								<td>{{peak.current_peak}}</td>
								<td>{{peak.peak_24}}</td>
								<td>{{peak.peak_7}}</td>
								<td>{{peak.recent_peak}}</td>
								<td>{{peak.max_peak}}</td>
							</tr>
						  </tbody>
						</table>
					</div>
					<div class="clearfix"></div>
				</div>
			</div>
		</div>
		</div>
	</div>
</template>

<script>   
	const vSelect = require('vue!../main_components/select.vue');
	module.exports = {
		components: {
			'select2': vSelect
		},
		data: function(){
            return {
			  switch_server: '',
			  selected_slot: '2',
			  selected: 0,
			  options: [
				  { id: 1, text: 'Alias' },
				  { id: 2, text: 'Active' },
				  { id: 3, text: 'Actions' }
			  ],
			  sessions: [
				{
				  ingress_channel: '0',
				  egress_channel: '0',
				  total_channel: '0',
				  total_calls: '0',
				}
			  ],
			  peaks: [
				{
				  process: 'Channel',
				  current_peak: '0',
				  peak_24: '2',
				  peak_7: '2',
				  recent_peak: '4',
				  max_peak: '300',
				},
				{
				  process: 'CPS Limit',
				  current_peak: '0',
				  peak_24: '1',
				  peak_7: '1',
				  recent_peak: '10',
				  max_peak: '500',
				}
			  ]
            }
        },
		methods: {
			
		},
		mounted: function () {
			
		}
	}
</script>
