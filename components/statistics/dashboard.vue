<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper">
			<div class="sidebar">
			  <ul class="nav nav-sidebar">
				<li class="active">
					<router-link to="/statistics/dashboard">
						<span class="dnl_icon dnl_dashboard"></span>
						Dashboard 
						<span class="sr-only">(current)</span>
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
				<li>
					<router-link to="/statistics/dashboard/qos_report">
						<span class="dnl_icon dnl_qos_report"></span>
						Qos Report
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
				  <li class="breadcrumb-item"><a href="#">Statistics</a></li>
				  <li class="breadcrumb-item active"><a href="#">Dashboard</a></li>
			  </ol>
			  <h1 class="page-header">Dashboard</h1>

			  <div class="statistics_numbers">
				<div class="col-md-4 col-sm-6 col-xs-12">
					<div class="number_item">
						<div class="half">
							<h1 class="big_number center-block text-center">40</h1>
						</div>
						<div class="half">
							<h4>Customers</h4>
							<a class="btn btn_white add">
								<span class="dnl_icon dnl_add"></span>
								Add More
							</a>
						</div>
					</div>
				</div>
				<div class="col-md-4 col-sm-6 col-xs-12">
				    <div class="number_item">
						<div class="half">
							<h1 class="big_number center-block text-center">136</h1>
						</div>
						<div class="half">
							<h4>Products</h4>
							<a class="btn btn_white add">
								<span class="dnl_icon dnl_add"></span>
								Add More
							</a>
						</div>
					</div>
				</div>
				<div class="col-md-4 col-sm-6 col-xs-12">
				    <div class="number_item">
						<div class="half">
							<h1 class="big_number center-block text-center">29</h1>
						</div>
						<div class="half">
							<h4>Vendors</h4>
							<a class="btn btn_white add">
								<span class="dnl_icon dnl_add"></span>
								Add More
							</a>
						</div>
					</div>
				</div>
				<div class="clearfix"></div>
			  </div>
				
			  <div class="circle_charts">
				<div class="col-md-3 col-sm-6 col-xs-12">
					<div class="circ_chart_item">
						<div class="half">
							<h4 class="center-block text-center">Ingress Chanel</h4>
						</div>
						<div class="half">
							<div id="ingress_chanel" class="gauge_chart"></div>
						</div>
					</div>
				</div>
				<div class="col-md-3 col-sm-6 col-xs-12">
				    <div class="circ_chart_item">
						<div class="half">
							<h4 class="center-block text-center">Ingress CPS</h4>
						</div>
						<div class="half">
							<div id="ingress_cps" class="gauge_chart"></div>
						</div>
					</div>
				</div>
				<div class="col-md-3 col-sm-6 col-xs-12">
				    <div class="circ_chart_item">
						<div class="half">
							<h4 class="center-block text-center">Egress CPS</h4>
						</div>
						<div class="half">
							<div id="egress_cps" class="gauge_chart"></div>
						</div>
					</div>
				</div>
				<div class="col-md-3 col-sm-6 col-xs-12">
				    <div class="circ_chart_item">
						<div class="half">
							<h4 class="center-block text-center">Call</h4>
						</div>
						<div class="half">
							<div id="call" class="gauge_chart"></div>
						</div>
					</div>
				</div>
				<div class="clearfix"></div>
			  </div>

			  <div class="line_charts">
				<div class="col-md-4 col-sm-4 col-xs-12">
					<div class="white_pad">
						<h4>Daily Statistic</h4>
						<div id="daily_statistic">
							<div class="progress_info">
								<div class="progress_number">
									<h3 class="inline-block">7725.7</h3>
									<span class="progress_unit inline-block">Minutes</span>
								</div>	
							</div>
							<div class="progress">
							  <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 20%">
								<span class="sr-only">20% Complete</span>
							  </div>
							</div>
							<div class="progress_info">
								<div class="progress_number">
									<h3 class="inline-block">$56.71</h3>
									<span class="progress_unit inline-block">Margin</span>
								</div>	
							</div>
							<div class="progress">
							  <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%">
								<span class="sr-only">40% Complete (success)</span>
							  </div>
							</div>
							<div class="progress_info">
								<div class="progress_number">
									<h3 class="inline-block">89.41</h3>
									<span class="progress_unit inline-block">Margin %</span>
								</div>	
							</div>
							<div class="progress">
							  <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%">
								<span class="sr-only">60% Complete (warning)</span>
							  </div>
							</div>
						</div>
					</div>
				</div>
				 
				<div class="col-md-8 col-sm-8 col-xs-12">
				    <div class="white_pad">
						<h4>Statistic</h4>
						<div class="row">
							<div class="col-md-3 col-sm-3 col-xs-12 statistics_data">
								<div class="stat_item">
									<span class="call_number pull-right">4 calls</span>
									<h3 class="stat_number pull-right">1%</h3>
									<div class="clearfix"></div>
									<span class="stat_type pull-right">ASR in</span>
									<div class="clearfix"></div>
								</div>
								<div class="stat_item">
									<span class="call_number pull-right">2 calls</span>
									<h3 class="stat_number pull-right">$34.50</h3>
									<div class="clearfix"></div>
									<span class="stat_type pull-right">Revenue in</span>
									<div class="clearfix"></div>
								</div>
								<div class="stat_item">
									<span class="call_number pull-right">7 calls</span>
									<h3 class="stat_number pull-right">7</h3>
									<div class="clearfix"></div>
									<span class="stat_type pull-right">ACD in</span>
									<div class="clearfix"></div>
								</div>
								<div class="stat_item">
									<span class="call_number pull-right">4 calls</span>
									<h3 class="stat_number pull-right">6%</h3>
									<div class="clearfix"></div>
									<span class="stat_type pull-right">Profitability</span>
									<div class="clearfix"></div>
								</div>
							</div>
							<div class="col-md-9 col-sm-9 col-xs-12">
								<div class="statistic_switch">
									<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Last Hour
										<span class="caret"></span></button>
										<ul class="dropdown-menu">
										<li v-on:click="dropdown('Last Hour')"><a href="#">Last Hour</a></li>
										<li v-on:click="dropdown('Last 24 Hours')"><a href="#">Last 24 Hours</a></li>										
										</ul>										
								</div>
								<div id="statistics"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="clearfix"></div>
			  </div>
			
			  <div class="timeline">
				  <div class="col-md-12">
					<div class="chart_select_header">
						<div class="filter_select">
							<label>Show:</label>
							<select2 :options="options1" v-model="selected1">
								<option disabled value="0">Select one</option>
							</select2>
					  	</div>
						<div class="filter_select">
							<label>Server:</label>
							<select2 :options="options2" v-model="selected2">
								<option disabled value="0">Select one</option>
							</select2>
					  	</div>
						<div class="filter_select">
							<label>Type:</label>
							<select2 :options="options3" v-model="selected3">
								<option disabled value="0">Select one</option>
							</select2>
					  	</div>
						<div class="filter_select">
							<label>Interval:</label>
							<select2 :options="options4" v-model="selected4">
								<option disabled value="0">Select one</option>
							</select2>
					  	</div>
						<div class="inline-block">
							<a class="btn btn-primary btn-refresh">
								<span class="dnl_icon dnl_reload"></span>
								Refresh
							</a>
						</div>
					</div>
					<div class="chart_content">
				  		<div id="time_line"></div>
						<hr>
						<div id="ingress_cpg"></div>
						<hr>
						<div id="chanell"></div>
					</div>
				  </div>
				  <div class="clearfix"></div>
			  </div>
			  
			  <div class="dashboard_tables">
				  <div class="col-md-6 col-sm-12">
					  <div class="white_pad">
						  <h3 class="sub-header">Top 10 clients</h3>
						  <a class="table_refresh pull-right">
							  <span class="dnl_icon dnl_reload"></span>
						  </a>
						  <span class="table_time">
							  <span class="dnl_icon dnl_calendar"></span>
							  2016-10-02 16:00:00 +0000 ~ 2016-10-03 15:00:00 +0000
						  </span>
						  <div class="table-responsive">
							<div class="table_wrapper">
								<table class="table table-striped table-hover">
								  <thead>
									<tr>
									  <th class="biggest_th">Carrier Name</th>
									  <th>Last 24h Revenue</th>
									  <th>Last 24h Trend</th>
									</tr>
								  </thead>
								  <tbody>
									<tr v-for="client in top_clients">
									  <td>{{client.name}}</td>
									  <td>{{client.revenue}}</td>
									  <td v-bind:class="client.trend_type">{{client.trend}}</td>
									</tr>
								  </tbody>
								</table>
							</div>
						</div>
					</div>
				  </div>

				  <div class="col-md-6 col-sm-12">
					  <div class="white_pad">
						  <h3 class="sub-header">Top 10 vendors</h3>
						  <a class="table_refresh pull-right">
							  <span class="dnl_icon dnl_reload"></span>
						  </a>
						  <span class="table_time">
							  <span class="dnl_icon dnl_calendar"></span>
							  2016-10-02 16:00:00 +0000 ~ 2016-10-03 15:00:00 +0000
						  </span>
						  <div class="table-responsive">
							<table class="table table-striped table-hover">
							  <thead>
								<tr>
								  <th class="biggest_th">Carrier Name</th>
								  <th>Last 24h Revenue</th>
								  <th>Last 24h Trend</th>
								</tr>
							  </thead>
							  <tbody>
								<tr v-for="client in top_clients">
								  <td>{{client.name}}</td>
								  <td>{{client.revenue}}</td>
								  <td v-bind:class="client.trend_type">{{client.trend}}</td>
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
        data: function(){
            return {
			  selected1: 2,
			  options1: [
				  { id: 1, text: 'Connected Calls' },
				  { id: 2, text: 'QoS' },
				  { id: 3, text: 'Revenue and Profitability' }
			  ],
			  selected2: 0,
			  options2: [
				  { id: 1, text: 'All' },
				  { id: 2, text: 'Option 2' }
			  ],
			  selected3: 0,
			  options3: [
				  { id: 1, text: 'Network' },
				  { id: 2, text: 'Orig Trunks' },
				  { id: 3, text: 'Term Trunks' }
			  ],
			  selected4: 0,
			  options4: [
				  { id: 1, text: 'Last Hour' },
				  { id: 2, text: 'Last 24-Hours' },
				  { id: 3, text: 'Last 7-Days' },
				  { id: 4, text: 'Last 15-Days' },
				  { id: 5, text: 'Last 30-Days' },
				  { id: 6, text: 'Last 60-Days' },
				  { id: 7, text: 'Last 30-Mins' },
				  { id: 8, text: 'Last 15-Mins' }
			  ],
			  top_clients: [
				{
				  name: "SIPP-UAC",
				  revenue: "$100.87",
				  trend: "+3",
				  trend_type: "plus"
				},
				{
				  name: "Bruno Lambert",
				  revenue: "$65.00",
				  trend: "-1",
				  trend_type: "minus"
				},
				{
				  name: "Hugh Copeland",
				  revenue: "$27.34",
				  trend: "-5",
				  trend_type: "minus"
				},
				{
				  name: "Trevor Walton",
				  revenue: "$89.08",
				  trend: "+6",
				  trend_type: "plus"
				},
				{
				  name: "Robert Collins",
				  revenue: "$78.75",
				  trend: "0",
				  trend_type: "none"
				},
				{
				  name: "William Bryan",
				  revenue: "$24.07",
				  trend: "-1",
				  trend_type: "minus"
				},
				{
				  name: "Hugh Copeland",
				  revenue: "$112.46",
				  trend: "-4",
				  trend_type: "minus"
				},
				{
				  name: "Tom Delonge",
				  revenue: "$41.00",
				  trend: "+7",
				  trend_type: "plus"
				},
				{
				  name: "Mark Hoppus",
				  revenue: "$56.89",
				  trend: "0",
				  trend_type: "none"
				},
				{
				  name: "Travis Barker",
				  revenue: "$35.88",
				  trend: "-1",
				  trend_type: "minus"
				}
			  ]
            }
        },
		methods: {
			 dropdown(val) {
				var y = document.getElementsByClassName('btn btn-primary dropdown-toggle');
				var aNode = y[0].innerHTML = val + ' <span class="caret"></span>'; // Append 
			}		
		},
		mounted: function() {
			Highcharts.setOptions({
				lang:{
					rangeSelectorZoom: ''
				}
			});

			
			Highcharts.chart('statistics', {
				chart: {
					zoomType: 'x',
					spacingTop: 20,
					type: 'spline'
				},
				
				legend: {
					enabled: false
				},
				  
				credits: {
				  enabled: false
				},
				  
				rangeSelector: {
					
					buttonTheme: { // styles for the buttons
						fill: '#f7f8f9',
						stroke: '#e2e6ed',
						'stroke-width': 1,
						r: 15,
						width: 70,
						height: 30,
						style: {
							color: '#4f5357',
							fontWeight: 'normal'
						},
						states: {
							hover: {
							},
							select: {
								fill: '#52565b',
								style: {
									color: 'white',
									fontWeight: 'normal'
								}
							}
						}
					},
					inputEnabled:false,
					buttons: [{
						type: 'hour',
						count: 1,
						text: '1 hour'
					}, {
						type: 'hour',
						count: 24,
						text: '24 hours'
					}, {
						type: 'day',
						count: 1,
						text: '1 day'
					}],
					selected: 1
				},
				
				exporting: {
					enabled: false
				},

				xAxis: {
					type: 'datetime',
					dateTimeLabelFormats : {
						hour: '%I %p',
						minute: '%I:%M %p'
					},
					title: {
						text: ''
					}
				},
				yAxis: {
					min: 0,
            		max: 3.5,
					tickInterval: 5,
					labels:{
					  formatter: function(){
						if(this.value > 10){
						  return this.value;
						}
					  }
					},
					showEmpty: false,
					gridLineWidth: 0,
					title: {
						text: ''
					},
					min: 0
				},

				title: {
					text: ''
				},
				
				 plotOptions: {
					spline: {
						marker: {
							enabled: true
						}
					}
				},

				series: [{
					name: 'ASR in',
					data: [
						[Date.UTC(2016, 9, 21, 8, 15), 4],
						[Date.UTC(2016, 9, 21, 8, 20), 4],
						[Date.UTC(2016, 9, 21, 9, 40), 4],
					],
					color: '#84e1f2',
					marker: {
					  symbol: 'circle'
					}
				}, {
					name: 'Revenue in',
					data: [
						[Date.UTC(2016, 9, 21, 9, 15), 3],
						[Date.UTC(2016, 9, 21, 10, 20), 3],
						[Date.UTC(2016, 9, 21, 11, 40), 3],
					],
					color: '#7acf7c',
					marker: {
					  symbol: 'circle'
					}
				}, {
					name: 'ACD in',
					data: [
						[Date.UTC(2016, 9, 21, 9, 15), 2],
						[Date.UTC(2016, 9, 21, 9, 20), 2],
						[Date.UTC(2016, 9, 21, 10, 40), 2],
					],
					color: '#f58889',
					marker: {
					  symbol: 'circle'
					}
				},
				{
					name: 'Profitability in',
					data: [
						[Date.UTC(2016, 9, 21, 8, 30), 1],
						[Date.UTC(2016, 9, 21, 9, 20), 1],
						[Date.UTC(2016, 9, 21, 9, 45), 1],
					],
					color: '#b4b0f6',
					marker: {
					  symbol: 'circle'
					}
				}]

			});
			
			
			Highcharts.stockChart('time_line', {
				chart: {
					zoomType: 'x',
					spacingTop: 10,
				},
				
				legend: {
					enabled: true,
					layout: 'vertical',
					align: 'right',
            		verticalAlign: 'top',
					floating: true,
					y: 80
				},
				  
				credits: {
				  enabled: false
				},
				  
				rangeSelector: {
					buttonTheme: { // styles for the buttons
						fill: '#f7f8f9',
						stroke: '#e2e6ed',
						'stroke-width': 1,
						r: 2,
						width:40,
						height: 30,
						style: {
							color: '#4f5357',
							fontWeight: 'normal'
						},
						states: {
							hover: {
							},
							select: {
								fill: '#52565b',
								style: {
									color: 'white',
									fontWeight: 'normal'
								}
							}
						}
					},
					inputBoxBorderColor: 'gray',
					inputBoxWidth: 100,
					inputBoxHeight: 18,
					inputStyle: {
						color: '#4f5357',
						fontWeight: 'normal'
					},
					labelStyle: {
						color: '#222222',
						fontWeight: 'normal'
					},
					buttons: [{
						type: 'minute',
						count: 5,
						text: '5min'
					}, {
						type: 'minute',
						count: 30,
						text: '30min'
					}, {
						type: 'hour',
						count: 1,
						text: '1h'
					}, {
						type: 'hour',
						count: 3,
						text: '3h'
					}, {
						type: 'hour',
						count: 4,
						text: '4h'
					}, {
						type: 'hour',
						count: 6,
						text: '6h'
					},
					{
						type: 'hour',
						count: 8,
						text: '8h'
					},
					{
						type: 'hour',
						count: 12,
						text: '12h'
					},
					{
						type: 'hour',
						count: 24,
						text: '24h'
					},
					{
						type: 'day',
						count: 2,
						text: '2d'
					},
					{
						type: 'day',
						count: 7,
						text: '7d'
					},
					{
						type: 'mont',
						count: 1,
						text: '1m'
					},
					{
						type: 'all',
						text: 'All'
					}],
					selected: 3
				},
				
				exporting: {
					enabled: true
				},

				yAxis: {
					title: {
						text: ''
					},
					opposite:false
				},

				title: {
					text: 'Connected Calls',
					margin: 20
				},

				series: [{
					type: 'spline',
					name: 'Connected Calls',
					data: [2,12,3,6,11,0,9,4,8,7,10,2,1,13,5],
					pointStart: 1230764400000,
					pointInterval: 3600000,
					color: '#03c0fc',
					showInLegend: true
				}]

			});
			
			
			
			Highcharts.stockChart('ingress_cpg', {
				chart: {
					zoomType: 'x',
					spacingTop: 10,
				},
				
				legend: {
					enabled: true,
					layout: 'vertical',
					align: 'right',
            		verticalAlign: 'top',
					floating: true,
					y: 80
				},
				  
				credits: {
				  enabled: false
				},
				  
				rangeSelector: {
					buttonTheme: { // styles for the buttons
						fill: '#f7f8f9',
						stroke: '#e2e6ed',
						'stroke-width': 1,
						r: 2,
						width:40,
						height: 30,
						style: {
							color: '#4f5357',
							fontWeight: 'normal'
						},
						states: {
							hover: {
							},
							select: {
								fill: '#52565b',
								style: {
									color: 'white',
									fontWeight: 'normal'
								}
							}
						}
					},
					inputBoxBorderColor: 'gray',
					inputBoxWidth: 100,
					inputBoxHeight: 18,
					inputStyle: {
						color: '#4f5357',
						fontWeight: 'normal'
					},
					labelStyle: {
						color: '#222222',
						fontWeight: 'normal'
					},
					buttons: [{
						type: 'minute',
						count: 5,
						text: '5min'
					}, {
						type: 'minute',
						count: 30,
						text: '30min'
					}, {
						type: 'hour',
						count: 1,
						text: '1h'
					}, {
						type: 'hour',
						count: 3,
						text: '3h'
					}, {
						type: 'hour',
						count: 4,
						text: '4h'
					}, {
						type: 'hour',
						count: 6,
						text: '6h'
					},
					{
						type: 'hour',
						count: 8,
						text: '8h'
					},
					{
						type: 'hour',
						count: 12,
						text: '12h'
					},
					{
						type: 'hour',
						count: 24,
						text: '24h'
					},
					{
						type: 'day',
						count: 2,
						text: '2d'
					},
					{
						type: 'day',
						count: 7,
						text: '7d'
					},
					{
						type: 'mont',
						count: 1,
						text: '1m'
					},
					{
						type: 'all',
						text: 'All'
					}],
					selected: 3
				},
				
				exporting: {
					enabled: true
				},

				yAxis: {
					title: {
						text: ''
					},
					opposite:false
				},

				title: {
					text: 'Ingress CPG',
					margin: 20
				},

				series: [{
					type: 'spline',
					name: 'Ingress CPG',
					data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					pointStart: 1230764400000,
					pointInterval: 3600000,
					color: '#03c0fc',
					showInLegend: true
				}]

			});
			
			
			
			Highcharts.stockChart('chanell', {
				chart: {
					zoomType: 'x',
					spacingTop: 10,
				},
				
				legend: {
					enabled: true,
					layout: 'vertical',
					align: 'right',
            		verticalAlign: 'top',
					floating: true,
					y: 80
				},
				  
				credits: {
				  enabled: false
				},
				  
				rangeSelector: {
					buttonTheme: { // styles for the buttons
						fill: '#f7f8f9',
						stroke: '#e2e6ed',
						'stroke-width': 1,
						r: 2,
						width:40,
						height: 30,
						style: {
							color: '#4f5357',
							fontWeight: 'normal'
						},
						states: {
							hover: {
							},
							select: {
								fill: '#52565b',
								style: {
									color: 'white',
									fontWeight: 'normal'
								}
							}
						}
					},
					inputBoxBorderColor: 'gray',
					inputBoxWidth: 100,
					inputBoxHeight: 18,
					inputStyle: {
						color: '#4f5357',
						fontWeight: 'normal'
					},
					labelStyle: {
						color: '#222222',
						fontWeight: 'normal'
					},
					buttons: [{
						type: 'minute',
						count: 5,
						text: '5min'
					}, {
						type: 'minute',
						count: 30,
						text: '30min'
					}, {
						type: 'hour',
						count: 1,
						text: '1h'
					}, {
						type: 'hour',
						count: 3,
						text: '3h'
					}, {
						type: 'hour',
						count: 4,
						text: '4h'
					}, {
						type: 'hour',
						count: 6,
						text: '6h'
					},
					{
						type: 'hour',
						count: 8,
						text: '8h'
					},
					{
						type: 'hour',
						count: 12,
						text: '12h'
					},
					{
						type: 'hour',
						count: 24,
						text: '24h'
					},
					{
						type: 'day',
						count: 2,
						text: '2d'
					},
					{
						type: 'day',
						count: 7,
						text: '7d'
					},
					{
						type: 'mont',
						count: 1,
						text: '1m'
					},
					{
						type: 'all',
						text: 'All'
					}],
					selected: 3
				},
				
				exporting: {
					enabled: true
				},

				yAxis: {
					title: {
						text: ''
					},
					opposite:false
				},

				title: {
					text: 'Chanell',
					margin: 20
				},

				series: [{
					type: 'spline',
					name: 'Chanell',
					data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					pointStart: 1230764400000,
					pointInterval: 3600000,
					color: '#03c0fc',
					showInLegend: true
				}]

			});
			
			

			Highcharts.chart('ingress_chanel', {
				chart: {
					type: 'solidgauge',
					margin: [0, 0, 0, 0],
					spacingTop: 0,
					spacingBottom: 0,
					spacingLeft: 0,
					spacingRight: 0,
					height: 120
				},
				
				exporting: { enabled: false },

				title: {
					verticalAlign: 'middle',
					floating: true,
					text: '327',
					y: 12
				},
				
				tooltip: {
					enabled: false
				},

				pane: {
					startAngle: 0,
					endAngle: 360,
					background: [{ // Track for Move
						outerRadius: '105%',
						innerRadius: '95%',
						backgroundColor: '#edeff5',
						borderWidth: 0
					}]
				},

				yAxis: {
					min: 0,
					max: 100,
					lineWidth: 0,
					tickPositions: []
				},

				plotOptions: {
					solidgauge: {
						borderWidth: '5px',
						dataLabels: {
							enabled: false
						},
						linecap: 'round',
						stickyTracking: false
					}
				},
				credits: {
				  enabled: false
				},

				series: [{
					name: 'Move',
					borderColor: '#03c0fc',
					data: [{
						color: Highcharts.getOptions().colors[0],
						radius: '100%',
						innerRadius: '100%',
						y: 60
					}]
				}]
			});
			Highcharts.chart('ingress_cps', {
				chart: {
					type: 'solidgauge',
					margin: [0, 0, 0, 0],
					spacingTop: 0,
					spacingBottom: 0,
					spacingLeft: 0,
					spacingRight: 0,
					height: 120
				},
				
				exporting: { enabled: false },

				title: {
					verticalAlign: 'middle',
					floating: true,
					text: '90',
					y: 12
				},
				
				tooltip: {
					enabled: false
				},

				pane: {
					startAngle: 0,
					endAngle: 360,
					background: [{ // Track for Move
						outerRadius: '105%',
						innerRadius: '95%',
						backgroundColor: '#edeff5',
						borderWidth: 0
					}]
				},

				yAxis: {
					min: 0,
					max: 100,
					lineWidth: 0,
					tickPositions: []
				},

				plotOptions: {
					solidgauge: {
						borderWidth: '5px',
						dataLabels: {
							enabled: false
						},
						linecap: 'round',
						stickyTracking: false
					}
				},
				credits: {
				  enabled: false
				},

				series: [{
					name: 'Move',
					borderColor: '#03c0fc',
					data: [{
						color: Highcharts.getOptions().colors[0],
						radius: '100%',
						innerRadius: '100%',
						y: 40
					}]
				}]
			});
			Highcharts.chart('egress_cps', {
				chart: {
					type: 'solidgauge',
					margin: [0, 0, 0, 0],
					spacingTop: 0,
					spacingBottom: 0,
					spacingLeft: 0,
					spacingRight: 0,
					height: 120
				},
				
				exporting: { enabled: false },

				title: {
					verticalAlign: 'middle',
					floating: true,
					text: '15',
					y: 12
				},
				
				tooltip: {
					enabled: false
				},

				pane: {
					startAngle: 0,
					endAngle: 360,
					background: [{ // Track for Move
						outerRadius: '105%',
						innerRadius: '95%',
						backgroundColor: '#edeff5',
						borderWidth: 0
					}]
				},

				yAxis: {
					min: 0,
					max: 100,
					lineWidth: 0,
					tickPositions: []
				},

				plotOptions: {
					solidgauge: {
						borderWidth: '5px',
						dataLabels: {
							enabled: false
						},
						linecap: 'round',
						stickyTracking: false
					}
				},
				credits: {
				  enabled: false
				},

				series: [{
					name: 'Move',
					borderColor: '#03c0fc',
					data: [{
						color: Highcharts.getOptions().colors[0],
						radius: '100%',
						innerRadius: '100%',
						y: 80
					}]
				}]
			});
			Highcharts.chart('call', {
				chart: {
					type: 'solidgauge',
					margin: [0, 0, 0, 0],
					spacingTop: 0,
					spacingBottom: 0,
					spacingLeft: 0,
					spacingRight: 0,
					height: 120
				},
				
				exporting: { enabled: false },

				title: {
					verticalAlign: 'middle',
					floating: true,
					text: '0',
					y: 12
				},
				
				tooltip: {
					enabled: false
				},

				pane: {
					startAngle: 0,
					endAngle: 360,
					background: [{ // Track for Move
						outerRadius: '105%',
						innerRadius: '95%',
						backgroundColor: '#edeff5',
						borderWidth: 0
					}]
				},

				yAxis: {
					min: 0,
					max: 100,
					lineWidth: 0,
					tickPositions: []
				},

				plotOptions: {
					solidgauge: {
						borderWidth: '5px',
						dataLabels: {
							enabled: false
						},
						linecap: 'round',
						stickyTracking: false
					}
				},
				credits: {
				  enabled: false
				},

				series: [{
					name: 'Move',
					borderColor: '#03c0fc',
					data: [{
						color: Highcharts.getOptions().colors[0],
						radius: '100%',
						innerRadius: '100%',
						y: 2
					}]
				}]
			});
		}
    }
	
</script>

<style>
	div#chart {
		height: 100px;
	}
	.sidebar {
		background-color: #eee;
		position: fixed;
		top: 71px;
		bottom: 0;
		left: 0;
		width: 215px;
		border-right: 1px solid #dee0e3;
		background: #fff;
		min-height: 540px;
	}
	
	table.codes .select2-container {
		width: 100% !important;
	}
	
	.sidebar ul.nav.nav-sidebar {
		padding-top: 10px;
	}
	
	.sidebar ul.nav.nav-sidebar li a {
		color: #222;
		border-left: 5px solid #fff;
		margin-bottom: 10px;
	}
	
	.sidebar ul.nav.nav-sidebar li a:hover,
	.sidebar ul.nav.nav-sidebar li.active a {
		background: #edeff5;
		border-color: #edeff5;
	}
	
	.sidebar ul.nav.nav-sidebar li.active a {
		border-color: #03c0fc;
	}
	
	.sidebar ul.nav.nav-sidebar li.active a span.dnl_icon {
		color: #222;
	}
	
	.table-striped>tbody>tr:nth-of-type(odd) {
		background: #f7f8f9; 
	}
	
	.table-striped>tbody>tr:nth-of-type(even) {
		background: #fdfefe; 
	}

	h3.sub-header {
		font-size: 20px;
		letter-spacing: -0.3px;
	}
	
	.wrapper {
    	min-height:100%;
        width:100%;
        position:relative;
        display:inline-block;
		margin-top: 0;
		background: #f5f7f9;
		margin-bottom: -5px;
	}
	
	.statistics_numbers .number_item {
	  border: 1px solid #dee0e3;
	  border-radius: 5px;
	  background-color: #edeff5;
	  box-shadow: 0px 2px 7px 0px rgba(184, 187, 196, 0.2);
	  height: 140px;
	}
	
	h1.big_number {
		font-family: "RobotoLight";
		font-size: 84px;
		letter-spacing: -5px;
	}
	
	.circle_charts .circ_chart_item {
		background: #fff;
		border-radius: 5px;
		border: 1px solid #dee0e3;
		box-shadow: 0px 2px 7px 0px rgba(184, 187, 196, 0.2);
		height: 140px;
		padding: 10px;
	}
	
	.main .col-md-4,
	.main .col-md-3,
	.main .col-sm-6,
	.main .col-xs-12 {
		padding-right: 5px;
    	padding-left: 5px;
	}
	
	.circle_charts {
		margin-top: 10px;
	}
	
	#ingress_chanel div {
		border-radius: 5px;
	}
	
	.gauge_chart .highcharts-title {
		font-family: "RobotoLight";
		font-size: 32px !important;
		letter-spacing: -2px;
		color: #52565b !important;
	}
	
	.circ_chart_item h4 {
		font-size: 16px;
		margin-top: 10px;
		display: block;
	}
	
	.half {
		display: inline-block;
		width: 49%;
		vertical-align: middle;
	}
	
	.number_item h4 {
		font-size: 30px;
		margin-top: -20px;
	}
	
	.white_pad {
		background: #fff;
		border-radius: 5px;
		border: 1px solid #dee0e3;
		box-shadow: 0px 2px 7px 0px rgba(184, 187, 196, 0.2);
		padding: 25px;
	}
	
	.sidebar ul.nav.nav-sidebar .dnl_icon {
		font-size: 21px;
		vertical-align: text-top;
    	margin-right: 10px;
		color: #03c0fc;
	}
	
	.sidebar ul.nav.nav-sidebar .dnl_icon.dnl_dashboard {
		font-size: 18px;
	}
	
	.sidebar ul.nav.nav-sidebar .dnl_icon.dnl_chart {
		font-size: 19px;
	}
	
	.number_item .half h4 {
		font-size: 28px;
		letter-spacing: -0.4px;
		margin-top: 17px;
    	margin-bottom: 5px;
	}
	
	a.btn.btn_white.add {
		color: #222;
		background: #f7f8f9;
		border: 1px solid #e2e6ed;
		box-shadow: 0px 1px 1px 0px rgba(227, 230, 237, 0.74);
		padding: 9px 30px;
	}
	
	.btn.btn_white.add:hover {
		background: #fff;
	}

	.btn.btn_white.add span.dnl_icon.dnl_add {
		color: #03c0fc;
		font-size: 16px;
		vertical-align: middle;
		margin: -2px 5px 0 -10px;
		display: inline-block;
	}
	
	h1.page-header {
		font-size: 24px;
		border-bottom: 0;
		margin: 15px 0 5px 5px;
	}
	
	ol.breadcrumb {
		background: transparent;
		padding: 0 0 0 5px;
		margin-top: 18px;
	}
	
	li.breadcrumb-item a {
		color: #222;
	}
	
	.breadcrumb>.active {
		color: rgb(167, 167, 167);
	}
	
	.table>thead>tr>th {
		vertical-align: bottom;
		border-bottom: 1px solid #ddd;
		background: #edeff5;
	}
	
	.progress {
		height: 7px;
		margin-bottom: 20px;
		overflow: hidden;
		background-color: #edeff5;
		border-radius: 7px;
		-webkit-box-shadow: none;
		box-shadow: none;
	}
	
	.progress-bar {
		-webkit-box-shadow: none;
		box-shadow: none;
	}
	
	.progress-bar.progress-bar-info {
		background: #b4b0f6;
	}
	
	.progress-bar.progress-bar-success {
		background: #c8dd72;
	}
	
	.progress-bar.progress-bar-warning {
		background: #fa994b;
	}
	
	.progress-bar {
		border-radius: 7px;
	}
	
	.line_charts {
		margin: 10px 0;
	}
	
	.inline-block {
		display: inline-block;
	}
	
	.progress_number h3 {
		color: #03c0fc;
		font-size: 24px;
		margin-top: 10px;
	}
	
	span.progress_unit {
		font-size: 14px;
		color: #52565b;
		margin-left: 5px;
	}
	
	.white_pad h4 {
		margin-top: 0;
		margin-bottom: 20px;
	}
	
	.highcharts-button .highcharts-button-box {
		padding: 10px;
		width: 50px !important;
		height: 30px;
		y: -5;
	}
	
	.highcharts-contextbutton .highcharts-button-box {
		width: 25px !important;
		height: 25px !important;
		y: -1;
	}
	
	.table-responsive {
		border: 1px solid #dee0e3;
		box-shadow: 0px 2px 7px 0px rgba(184, 187, 196, 0.2);
		border-radius: 4px;
	}
	
	.table_wrapper {
		margin-right: -1px;
	}
	
	.dashboard_tables {
		margin: 10px 0 20px 0;
	}
	
	.dashboard_tables .col-md-6 {
		padding-right: 5px;
		padding-left: 5px;
	}
	
	table.table.table-striped.table-hover th {
		font-weight: normal;
		border-left: 1px solid #dee0e3;
		font-size: 13px;
    	text-align: center;
	}
	
	table.table.table-striped.table-hover th:first-child {
		border-left: 0;
		text-align: left;
	}
	
	a.table_refresh.pull-right {
		position: absolute;
		right: 32px;
		top: 19px;
		font-size: 18px;
		color: #52565b;
		cursor: pointer;
	}
	
	a.table_refresh.pull-right:hover {
		text-decoration: none;
	}
	
	.btn-refresh{
		width:120px !important;
	}
	th.biggest_th {
		width: 48%;
	}
	
	span.table_time {
		font-size: 12px;
		color: #a4a6ae;
		margin: 10px 0 10px 2px;
		display: block;
	}
	
	span.table_time .dnl_calendar {
		font-size: 16px;
		margin-right: 5px;
		vertical-align: text-bottom;
	}
	
	table.table.table-striped.table-hover td {
		/*text-align: right;*/
		text-align: center;
		font-size: 13px;
		padding-right: 30px;
	}
	
	table.table.table-striped.table-hover td:first-child {
		text-align: left;
	}
	
	td.plus {
		color: #12a635;
	}
	
	td.plus:after {
		position: absolute;
		content: '⬆';
	}
	
	td.minus {
		color: #e36161;
	}
	
	td.minus:after {
		position: absolute;
		content: '⬇';
	}
	
	.chart_select_header {
    background: #edeff5;
    border: 1px solid #dee0e3;
    border-radius: 5px 5px 0 0;
	padding: 20px;
	}

	.chart_content {
	  border: 1px solid rgb(222, 224, 227);
	  border-radius: 0 0 5px 5px;
	  background-color: #fff;
	  box-shadow: 0px 2px 7px 0px rgba(184, 187, 196, 0.2);
	  border-top: 0;
	  padding-top: 15px;
	  padding-bottom: 5px;
	}

	.filter_select {
		display: inline-block;
	}
	
	.filter_select label {
		display: block;
	}
	
	.select2-container--default .select2-selection--single,
	.select2-container--default .select2-selection--multiple {
		background-color: #fff;
		border: 1px solid #dee0e3;
		border-radius: 4px;
		padding: 4px;
		height: 38px;
		box-shadow: 0px 2px 7px 0px rgba(184, 187, 196, 0.2);
	}
	
	.select2-dropdown,
	.select2-container--default .select2-search--dropdown .select2-search__field {
		border: 1px solid #dee0e3;
	}
	
	.select2-container--default .select2-selection--single .select2-selection__arrow {
		height: 36px;
		right: 1px;
		width: 30px;
	}
	
	.select2-search--dropdown {
		display: block;
		padding: 10px 10px 5px 10px;
	}
	
	.select2-results__option {
		padding: 10px;
	}

	.filter_select {
		display: inline-block;
		width: 19.5%;
	}
	
	.timeline .col-md-12 {
		padding: 0 6px;
	}
	
	.chart_select_header .inline-block.pull-right {
    	margin-top: 26px;
	}
	
	.btn-primary span.dnl_icon {
		margin: 10px 9px 0 -20px;
		vertical-align: middle;
		font-size: 16px;
	}
	
	.chart_select_header .btn.btn-primary {
		line-height: 22px;
	}
	
	.highcharts-navigator-mask-inside {
		fill: rgba(56, 205, 253, 0.25);
		stroke: #68d9fd;
	}
	
	rect.highcharts-label-box {
		fill: #fff;
		stroke: #dee0e3;
		height: 30px;
		rx: 4;
		y: -4;
    	width: 100px;
	}
	
	g.highcharts-series.highcharts-series-1.highcharts-areaspline-series.highcharts-color-undefined.highcharts-navigator-series {
		display: none;
	}
	
	.chart_content hr {
		border-color: #cdcfd2;
	}
	
	span.select2-selection.select2-selection--single:focus,
	.select2-container--default .select2-search--dropdown .select2-search__field:focus {
		outline: none;
	}
	
	.sidebar_footer {
		font-size: 13px;
		color: #bdbfc6;
		padding: 20px;
		position: absolute;
		bottom: 0px;
	}
	
	span.dnl_icon.dnl_menu {
		font-size: 16px;
		color: #52565b;
		margin-top: -15px;
		display: block;
		cursor: pointer;
		width: 23px;
	}
	
	#statistics .highcharts-button .highcharts-button-box {
		width: 70px !important;
	}
	
	.line_charts .white_pad {
		height: 260px;
	}
	
	div#statistics {
		height: 248px;
		margin-top: -55px;
	}
	
	h3.stat_number {
		font-size: 19px;
		color: #03c0fc;
		display: inline-block;
		margin-top: 0;
	}
	
	span.call_number {
		font-size: 13px;
		color: #a4a6ae;
		margin-left: 5px;
		margin-top: 5px;
	}
	
	span.stat_type {
		color: #52565b;
		font-size: 13px;
		margin-top: -10px;
		font-family: "RobotoMedium";
	}
	
	.statistics_data {
		margin-top: -15px;
	}
	
	.statistic_switch {
		position: absolute;
		z-index: 1;
		margin-top: -40px;
		right: 10px;
	}
	
	a.stat_btn {
		color: #4f5357;
		padding: 3px 10px;
		border-radius: 15px;
		cursor: pointer;
	}
	
	a.stat_btn:hover {
		text-decoration: none;
		background: #e9e9eb;
	}
	
	a.stat_btn.active {
		color:#fff;
		background: #52565b;
	}
	
	.table-responsive {
		min-width: 440px;
	}
	
	.chart_content {
		overflow-x: auto;
	}
	
	div#time_line, #ingress_cpg, #chanell {
		min-width: 440px;
	}
	
	span.table_time.pull-right.main_time {
		color: #c0c6d1;
		font-size: 14px;
		font-family: "RobotoMedium";
		margin-top: 18px;
	}
	
	span.table_time.pull-right.main_time .dnl_calendar {
		font-size: 20px;
	}
	
	/* Large desktop */
	@media (min-width: 1400px) { 
		.wrapper .sidebar {
			width: 242px;
		}
	}
	
	@media (min-width: 1200px) { 
		.sidebar {
			width: 205px;
		}
	}
	
	@media (min-width: 980px) and (max-width: 1199px) {
		.sidebar {
			width: 175px;
		}
		
		.sidebar_footer {
			font-size: 12px;
		}
		
		h1.big_number {
			font-size: 65px;
    		line-height: 94px;
		}
		
		.half:first-of-type {
			width: 42%;
		}
		
		.half {
			width: 56%;
		}
		
		.number_item .half h4 {
			font-size: 20px;
			margin-top: 25px;
		}
		
		a.btn.btn_white.add {
			padding: 9px 22px;
		}
		
		.sidebar ul.nav.nav-sidebar li a {
			padding: 10px 8px;
		}
		
		.sidebar ul.nav.nav-sidebar .dnl_icon {
			margin-right: 5px;
		}
		
		.sidebar ul.nav.nav-sidebar li a {
			font-size: 13px;
		}
		
		.circ_chart_item h4 {
			font-size: 14px;
		}
		
		.filter_select select, 
		.filter_select .select2 {
			width: 142px !important;
		}
		
		.btn.btn-primary {
			width: 150px;
		}
	}

	/* Portrait tablet to landscape and desktop */
	@media (min-width: 768px) and (max-width: 979px) {
		.sidebar {
			display: none;
		}
		
		.statistics_numbers .number_item,
		.circle_charts .circ_chart_item {
			margin-bottom: 10px;
		}
		
		.filter_select select, 
		.filter_select .select2 {
			width: 170px !important;
		}
		
		.filter_select {
			width: 24.5%;
		}
		
		.chart_select_header .inline-block.pull-right {
			margin-top: 26px;
			margin: 15px auto 0 auto;
			display: block;
			float: none !important;
			width: 198px;
		}
		
		.timeline {
			margin-top: 25px;
		}
		
		.dashboard_tables {
			margin: 20px 0;
		}
		
		.dashboard_tables .white_pad {
			margin-bottom: 10px;
		}
	}

	/* Landscape phone to portrait tablet */
	@media (max-width: 767px) {
		span.table_time.pull-right.main_time {
			margin-top: 15px;
		}
		
		span.table_time.pull-right.main_time {
			font-size: 12px;
		}
		
		span.table_time.pull-right.main_time .dnl_calendar {
			font-size: 17px;
		}
		
		.sidebar {
			display: none;
		}
		
		.statistics_numbers .number_item {
			margin-bottom: 10px;
			height: 130px;
		}
		
		.number_item .half h4 {
			font-size: 20px;
		}
		
		h1.big_number {
			font-size: 70px;
			line-height: 85px;
		}
		
		.circle_charts .circ_chart_item {
			margin-bottom: 10px;
		}
		
		.line_charts .white_pad {
			margin-bottom: 10px;
		}
		
		.white_pad h4 {
			position: relative;
			z-index: 1;
		}
		
		.statistics_data {
			display: none;
		}
		
		.filter_select {
			display: inline-block;
    		width: 46%;
    		margin: 5px 1.7%;
		}
		
		.filter_select select, 
		.filter_select .select2 {
			width: 100% !important;
		}
		
		.filter_select label {
			display: block;
			margin-bottom: 0;
		}
		
		.chart_select_header {
			padding: 10px;
			height: 210px;
		}
		
		.chart_select_header .inline-block.pull-right {
			width: auto;
			float: none !important;
			margin: 14px 5px 0 5px;
			display: block;
		}
		
		.chart_select_header .btn.btn-primary {
			width: 100%;
		}
		
		.dashboard_tables .white_pad {
			margin-bottom: 10px;
			overflow-x: auto;
		}
		
		td.minus:after {
			position: relative;
			content: '\2B07';
			margin-right: -14px;
		}
		
		td.plus:after {
			position: relative;
			content: '\2B06';
			margin-right: -14px;
		}
		
	}

	/* Landscape phones and down */
	@media (max-width: 480px) {
		body {
			font-size: 12px;
		}
	}

	/* Portrait phone to landscape phone */
	@media (min-width: 319px) and (max-width: 479px) {
		h1.big_number {
			font-size: 60px;
		}
		
		a.btn.btn_white.add {
			padding: 6px 22px;
		}
		
		.half:first-of-type {
			width: 42%;
		}
		
		.half {
			width: 56%;
		}
		
		.statistic_switch {
			position: relative;
			margin-top: 0px;
			margin-left: 10px;
			margin-bottom: 15px;
		}
		
		.line_charts .white_pad {
			height: auto;
		}
		
		.circle_charts {
			margin-bottom: -10px;
		}
	}
	
</style>
