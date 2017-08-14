<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper">
				<div class="sidebar">
					<ul class="nav nav-sidebar">
						<li>
							<router-link to="/statistics/dashboard">
								<span class="dnl_icon dnl_dashboard"></span> Dashboard
							</router-link>
						</li>
						<li class="active">
							<router-link to="/statistics/dashboard/report">
								<span class="dnl_icon dnl_report"></span> Report
								<span class="sr-only">(current)</span>
							</router-link>
						</li>
						<li>
							<router-link to="/statistics/dashboard/charts">
								<span class="dnl_icon dnl_chart"></span> Charts
							</router-link>
						</li>
						<li>
							<router-link to="/statistics/dashboard/auto_delivery">
								<span class="dnl_icon dnl_auto_delivery"></span> Auto Delivery
							</router-link>
						</li>
						<li>
							<router-link to="/statistics/dashboard/qos_report">
								<span class="dnl_icon dnl_qos_report"></span> Qos Report
							</router-link>
						</li>
						<li>
							<router-link to="/statistics/dashboard/ingress_client_qos">
								<span class="dnl_icon dnl_ingress"></span> Ingress Clients Qos
							</router-link>
						</li>
						<li>
							<router-link to="/statistics/dashboard/egress_client_qos">
								<span class="dnl_icon dnl_egress"></span> Egress Clients Qos
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
						<br> DeNovoLab@2010-2016 <br> All Rights Reserved.
					</div>
				</div>
				<div class="col-sm-12 col-md-offset-2 col-md-10">
					<time-display></time-display>
					<ol class="breadcrumb">
						<li class="breadcrumb-item"><a>Statistics</a></li>
						<li class="breadcrumb-item">
							<router-link to="/statistics/dashboard">Dashboard</router-link>
						</li>
						<li class="breadcrumb-item active">Report</li>
					</ol>
					<h1 class="page-header">Report</h1>
					<div class="timeline">
						<div class="chart_select_header grided">
							<div class="col-md-3 col-sm-3">
								<label>Report Type:</label>
								<select2 :options="options" v-model="report_type">
									<option disabled value="0">Select one</option>
								</select2>
							</div>
							<div class="col-md-3 col-sm-3">
								<label>Start Date/Time:</label>
								<select2 :options="options" v-model="start_date">
									<option disabled value="0">Select one</option>
								</select2>
							</div>
							<div class="col-md-3 col-sm-3">
								<label>End Date/Time:</label>
								<select2 :options="options" v-model="end_date">
									<option disabled value="0">Select one</option>
								</select2>
							</div>
							<div class="col-md-3 col-sm-3">
								<label>Timezone:</label>
								<select2 :options="options" v-model="time_zone">
									<option disabled value="0">Select one</option>
								</select2>
							</div>
							<div class="clearfix little-space"></div>
							<div class="col-md-3 col-sm-3">
								<label for="country">Country:</label>
								<input type="text" name="country" v-model="country" class="form-control" placeholder="Enter Country">
							</div>
							<div class="col-md-3 col-sm-3">
								<label for="destination">Destination:</label>
								<input type="text" name="destination" v-model="destination" class="form-control" placeholder="Enter Destination">
							</div>
							<div class="col-md-3 col-sm-3">
								<label>Orig Filter:</label>
								<select2 :options="options" v-model="orig_filter">
									<option disabled value="0">Select one</option>
								</select2>
							</div>
							<div class="col-md-3 col-sm-3">
								<label>Term Filter:</label>
								<select2 :options="options" v-model="term_filter">
									<option disabled value="0">Select one</option>
								</select2>
							</div>
							<div class="clearfix little-space"></div>
							<div class="col-md-3 col-sm-3">
								<a class="btn btn-primary m-top-10">
									Submit
								</a>
							</div>
							<div class="clearfix"></div>
						</div>
						<div class="chart_content">
							<span class="table_time chart_time">
								09/23/2016 17:34:52 +0000
							</span>
							<div class="material-switch pull-right">
								<span>Show Short/Long Call</span>
								<input id="someSwitchOptionPrimary" v-model="show_calls" name="someSwitchOption001" type="checkbox" />
								<label for="someSwitchOptionPrimary" class="label-primary"></label>
							</div>
							<div class="col-md-12">
								<div class="table-responsive marged-30">
									<table class="table table-striped table-hover carrier_groups originators">
										<thead>
											<tr>
												<th>Originator</th>
												<th class="width-65">Atts</th>
												<th class="width-65">CC</th>
												<th class="width-65">ABR</th>
												<th class="width-65">ASR</th>
												<th class="width-65">ACD</th>
												<th class="width-65">Rev</th>
												<th class="width-65">Cost</th>
												<th class="width-65">Margin</th>
												<th>Max Channel Usage</th>
												<th>Max Channel Allowed</th>
												<th>Percentage Of Trunk Usage</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="originator in originators">
												<td>{{originator.originator}}</td>
												<td>{{originator.atts}}</td>
												<td>{{originator.cc}}</td>
												<td>{{originator.abr}}</td>
												<td>{{originator.asr}}</td>
												<td>{{originator.acd}}</td>
												<td>{{originator.rev}}</td>
												<td>{{originator.cost}}</td>
												<td>{{originator.margin}}</td>
												<td>{{originator.max_channel_usage}}</td>
												<td>{{originator.max_channel_allowed}}</td>
												<td>{{originator.percentage_trunk_usage}}</td>
											</tr>
										</tbody>
									</table>
									<table>
										<thead>
											<tr>
												<td>Time</td>
												<td>Value</td>
											</tr>
										</thead>
										<tbody>
											<tr v-for='i in populate'>
												<td>{{i.time.toUTCString()}}</td>
												<td>{{i.value}}</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
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
		data: function() {
			return {
				response: null,
				socketResponse: [],
				fetchType: 'websocket',
				token: 'Yuza2L2rlGkdemBeYzL0SVncFafTjYNFSMpShsJT614inGMLDf',
				host: 'http://192.99.10.113:8890',
				// query: 'start_time=1495584000&end_time=1495666800&step=1440&method=total&field=ingress_billed_time&ingress_id=2&egress_id=1&orig_code=8',
				query_json: {
					start_time: 1496275200,
					end_time: 1498780800,
					step: 1440,
					method: 'total',
					field: 'ingress_billed_time',
					ingress_id: 2,
					egress_id: 1,
					orig_code: 8
				},
				show_calls: '',
				report_type: '',
				start_date: '',
				end_date: '',
				time_zone: '',
				country: '',
				destination: '',
				orig_filter: '',
				term_filter: '',
				options: [{
						id: 1,
						text: 'Alias'
					},
					{
						id: 2,
						text: 'Active'
					},
					{
						id: 3,
						text: 'Actions'
					}
				],
				originators: [{
						originator: 'Ingress Trunk',
						atts: '96',
						cc: '0',
						abr: '0',
						asr: '0',
						acd: '0',
						rev: '0.00000',
						cost: '0.00000',
						margin: '0.00000',
						max_channel_usage: '-',
						max_channel_allowed: 'unlimited',
						percentage_trunk_usage: '-',
					},
					{
						originator: 'Egress Trunk',
						atts: '96',
						cc: '0',
						abr: '0',
						asr: '0',
						acd: '0',
						rev: '0.00000',
						cost: '0.00000',
						margin: '0.00000',
						max_channel_usage: '-',
						max_channel_allowed: 'unlimited',
						percentage_trunk_usage: '-',
					},
					{
						originator: 'Another Trunk',
						atts: '96',
						cc: '0',
						abr: '0',
						asr: '0',
						acd: '0',
						rev: '0.00000',
						cost: '0.00000',
						margin: '0.00000',
						max_channel_usage: '-',
						max_channel_allowed: 'unlimited',
						percentage_trunk_usage: '-',
					}
				]
			}
		},
		methods: {
			changeFetchType() {
				this.socketResponse = [];
				this.response = null;
				if (this.fetchType == 'websocket') {
					websocket = null;
					this.makeRequest('POST', this.host, this.query_json, this.token);
				} else {
					this.makeRequest('GET', this.host, this.query_json, this.token);
				}
			},
			makeRequest(type, url, query_json, token) {				
				let hRequest = prepareRequest(type, url, query_json, token); //requirement check spelling
				hRequest.onreadystatechange = e => {
					if (hRequest.readyState == 4) {						
						this.response = JSON.parse(hRequest.responseText);
					}					
				}
			},
		},
		mounted: function() {},
		computed: {
			populate() {
				if (this.response != null && this.fetchType == 'websocket') {
					let server = websocket_host + this.response.port + '/';
					console.log("server: " + server);
					websocket = websocket == null ? new WebSocket(server) : websocket;
					websocket.onmessage = e => {
						let element = JSON.parse(e.data);
						element.time = new Date(element.time);
						this.socketResponse.push(element);
					}
				} else if (this.response != undefined) {
					let data = this.response.data;
					for (var i = 0; i < data.length; i++) {
						let e = data[i];
						e.time = new Date(e.time);
						this.socketResponse.push(e);
					}
				}
				return this.socketResponse;
			}
		},
		created() {
			if (this.fetchType == 'websocket') {						
				this.makeRequest('POST', this.host, this.query_json, this.token);
			}
		},
	}
	var websocket = null;
	var websocket_host = 'ws://192.99.10.113:';

	function prepareRequest(type, url, query_json, token) {		
		let hRequest = new XMLHttpRequest();
		let query_string = makeQueryString(query_json);
		if (type == 'GET')
			url += '?' + query_string;
		hRequest.open(type, url, true);
		hRequest.setRequestHeader('Authorization', token);
		hRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		console.log("query: " + query_string);
		if (type == 'POST') {
			hRequest.send(query_string);
		} else {
			hRequest.send();
		}
		return hRequest;
	}
	//This function transform object to urlencoded string
	function makeQueryString(query_json) {		
		let keys = Object.keys(query_json);
		let result = '';
		console.log("query: " + query_json);
		console.log(keys);
		keys.forEach((item, id, keys) => {
			let value = ''
			if (Array.isArray(item)) {
				item.forEach((e, i, item) => value += e + ',');
			} else {
				value = query_json[item];
			}
			result += item + '=' + value + '&';
		})

		result = result.substr(0, result.length - 1);
		return result;
	}
</script>

<style>
	.material-switch>input[type="checkbox"] {
		display: none;
	}
	.material-switch>label {
		cursor: pointer;
		height: 0px;
		position: relative;
		width: 40px;
	}
	.material-switch>label::before {
		background: rgb(0, 0, 0);
		box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.5);
		border-radius: 8px;
		content: '';
		height: 10px;
		margin-top: -6px;
		position: absolute;
		opacity: 0.3;
		transition: all 0.4s ease-in-out;
		width: 35px;
	}
	.material-switch>label::after {
		background: rgb(255, 255, 255);
		border-radius: 16px;
		box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
		content: '';
		height: 18px;
		left: -4px;
		margin-top: -7px;
		position: absolute;
		top: -4px;
		transition: all 0.3s ease-in-out;
		width: 18px;
	}
	.material-switch>input[type="checkbox"]:checked+label::before {
		background: inherit;
		opacity: 0.5;
	}
	.material-switch>input[type="checkbox"]:checked+label::after {
		background: inherit;
		left: 20px;
	}
	.material-switch.pull-right {
		margin-top: -30px;
		margin-right: 40px;
	}
	.label-primary {
		background-color: #03c0fc;
	}
	.material-switch.pull-right span {
		padding-right: 10px;
		vertical-align: text-bottom;
	}
	table.table.table-striped.table-hover.carrier_groups.originators tr td {
		text-align: left;
	}
	.table-responsive.marged-30 {
		margin-left: 30px;
		margin-right: 30px;
		margin-bottom: 30px;
	}
</style>
