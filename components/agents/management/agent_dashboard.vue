<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper">
				<div class="fixedusers transition" @click="panelHideShow()">
					<div class="user">
						<div class="smallView open">
							<div class="opened"></div>
							<div class="char">
								A
							</div>
						</div>
						<div class="LargView open" style="display:none">
							<div style="width: 60px; float:left">
								<div class="char">
									A
								</div>
							</div>
							<div style="margin-top: 10px;display: inline-block;margin-left:8px">Name
								<div style="margin-top:-14px" class="opened"></div>
							</div>
						</div>
					</div>
					<div class="clearfix"></div>
					<div class="user">
						<div class="smallView open">
							<div class="opened"></div>
							<div class="char">
								B
							</div>
						</div>
						<div class="LargView open" style="display:none">
							<div style="width: 60px; float:left">
								<div class="char">
									B
								</div>
							</div>
							<div style="margin-top: 10px;display: inline-block;margin-left:8px">Name
								<div style="margin-top:-14px" class="opened"></div>
							</div>
						</div>
					</div>
					<div class="clearfix"></div>
					<div class="user">
						<div class="smallView open">
							<div class="opened"></div>
							<div class="char">
								C
							</div>
						</div>
						<div class="LargView open" style="display:none">
							<div style="width: 60px; float:left">
								<div class="char">
									C
								</div>
							</div>
							<div style="margin-top: 10px;display: inline-block;margin-left:8px">Name
								<div style="margin-top:-14px" class="opened"></div>
							</div>
						</div>
					</div>
					<div class="clearfix"></div>
					<div class="user">
						<div class="smallView open">
							<div class="opened"></div>
							<div class="char">
								D
							</div>
						</div>
						<div class="LargView open" style="display:none">
							<div style="width: 60px; float:left">
								<div class="char">
									D
								</div>
							</div>
							<div style="margin-top: 10px;display: inline-block;margin-left:8px">Name
								<div style="margin-top:-14px" class="opened"></div>
							</div>
						</div>
					</div>
					<div class="clearfix"></div>
					<div class="user">
						<div class="smallView open">
							<div class="opened"></div>
							<div class="char">
								A
							</div>
						</div>
						<div class="LargView open" style="display:none">
							<div style="width: 60px; float:left">
								<div class="char">
									A
								</div>
							</div>
							<div style="margin-top: 10px;display: inline-block;margin-left:8px">Name
								<div style="margin-top:-14px" class="opened"></div>
							</div>
						</div>
					</div>
					<div class="clearfix"></div>
					<div class="user">
						<div class="smallView open">
							<div class="opened"></div>
							<div class="char">
								B
							</div>
						</div>
						<div class="LargView open" style="display:none">
							<div style="width: 60px; float:left">
								<div class="char">
									B
								</div>
							</div>
							<div style="margin-top: 10px;display: inline-block;margin-left:8px">Name
								<div style="margin-top:-14px" class="opened"></div>
							</div>
						</div>
					</div>
					<div class="clearfix"></div>
					<div class="user">
						<div class="smallView open">
							<div class="opened"></div>
							<div class="char">
								C
							</div>
						</div>
						<div class="LargView open" style="display:none">
							<div style="width: 60px; float:left">
								<div class="char">
									C
								</div>
							</div>
							<div style="margin-top: 10px;display: inline-block;margin-left:8px">Name
								<div style="margin-top:-14px" class="opened"></div>
							</div>
						</div>
					</div>
					<div class="clearfix"></div>
					<div class="user">
						<div class="smallView open">
							<div class="opened"></div>
							<div class="char">
								F
							</div>
						</div>
						<div class="LargView open" style="display:none">
							<div style="width: 60px; float:left">
								<div class="char">
									F
								</div>
							</div>
							<div style="margin-top: 10px;display: inline-block;margin-left:8px">Name
								<div style="margin-top:-14px" class="opened"></div>
							</div>
						</div>
					</div>
					<div class="clearfix"></div>
					<div class="text-center">
						<img src="assets/images/agent/navicon.png" alt="">
					</div>
				</div>
				<div class="content transition">
					<div class="today">
						<div class="col-lg-3">
							<div class="box">
								<h3><span>Today's</span><br>Revenue</h3>
								<img src="assets/images/agent/327.png" alt="">
							</div>
						</div>
					</div>
					<div class="today">
						<div class="col-lg-3">
							<div class="box">
								<h3><span>Today's</span><br>Call<br>Attempt</h3>
								<img src="assets/images/agent/90.png" alt="">
							</div>
						</div>
					</div>
					<div class="today">
						<div class="col-lg-3">
							<div class="box">
								<h3><span>Today's</span><br>Minute</h3>
								<img src="assets/images/agent/15.png" alt="">
							</div>
						</div>
					</div>
					<div class="today">
						<div class="col-lg-3">
							<div class="box">
								<h3><span>Today's</span><br>Connected<br>Calls</h3>
								<img src="assets/images/agent/0.png" alt="">
							</div>
						</div>
					</div>
					<div class="clearfix"></div>
					<div class="panel panel-default" style="width: 98%; margin:40px auto; ">
						<div class="panel-body" style="height:200px">
							Graph
						</div>
					</div>
					<div class="clearfix"></div>
					<div class="demographic">
						<div class="col-md-6 col-sm-12">
							<h3>Balance</h3>
						</div>
						<div class="col-md-6 col-sm-12">
							<div class="pull-right">
								<form class="" action="index.html" method="post">
									<label for="">Page row:</label>
									<select class="" name="">
										<option value="">10</option>
									</select>
									<input type="search" name="" value="" placeholder="Search">
									<img src="assets/images/agent/loading.png" alt="">
								</form>
							</div>
						</div>

						<div class="table-responsive tableMargin">
							<table class="table table-striped table-hover clients trunks">
								<thead>
									<tr>
										<th>Code Name</th>
										<th>Attempt</th>
										<th>Non Zero</th>
										<th>Min</th>
										<th>Cost</th>
										<th>ASR</th>
										<th>ACD</th>
									</tr>
								</thead>
								<tbody>
									<tr v-if="!demograph_list.length">
										<td style="text-align: center" colspan="7">No Data Found</td>
									</tr>										
									
									<tr v-for="demograph in demograph_list">
										<td>{{demograph.name}}</td>
										<td>{{demograph.attempt}}</td>
										<td>{{demograph.non_zero}}</td>
										<td>{{demograph.min}}</td>
										<td>{{demograph.cost}}</td>
										<td>{{demograph.asr}}</td>
										<td>{{demograph.acd}}</td>
									</tr>
								</tbody>
							</table>
						</div>
						
												
					</div>
					<div class="secdemographic demographic">
						<div class="col-md-6 cpl-sm-12">
							<h3>Demographic</h3>
							<p>2016-10-22 17:00:00 +0000 ~ 2016-10-23 16:59:59 +0000</p>
						</div>
						<div class="col-md-6 col-sm-12">
							<div class="pull-right">
								<form class="" action="index.html" method="post">
									<label for="">Page row:</label>
									<select class="" name="">
										<option value="">10</option>
									</select>
									<select class="sel" name="">
										<option value="">Last 24 Hours</option>
									</select>
									<img src="assets/images/agent/loading.png" alt="">
								</form>
							</div>
						</div>



						<div class="table-responsive tableMargin">
							<table class="table table-striped table-hover clients trunks">
								<thead>
									<tr>
										<th>Code Name</th>
										<th>Attempt</th>
										<th>Non Zero</th>
										<th>Min</th>
										<th>Cost</th>
										<th>ASR</th>
										<th>ACD</th>
									</tr>
								</thead>
								<tbody>
									<tr v-if="!demograph_list.length">
										<td style="text-align: center" colspan="7">No Data Found</td>
									</tr>										
									
									<tr v-for="demograph in demograph_list">
										<td>{{demograph.name}}</td>
										<td>{{demograph.attempt}}</td>
										<td>{{demograph.non_zero}}</td>
										<td>{{demograph.min}}</td>
										<td>{{demograph.cost}}</td>
										<td>{{demograph.asr}}</td>
										<td>{{demograph.acd}}</td>
									</tr>
								</tbody>
							</table>
						</div>


					</div>
					<div class="graphes">
						<div class="col-md-6">
							<div class="graph">
								Minutes
							</div>
						</div>
						<div class="col-md-6">
							<div class="graph">
								Cost
							</div>
						</div>
					</div>
					<div class="TopTen">
						<div class="col-md-6">
							<div class="boxx">
								<h3 style="float:left">Top 10 clients</h3>
								<img style="float:right; margin-top:22px" src="assets/images/agent/grayloading.png" alt="">
								<div class="clearfix"></div>
								<p><img src="assets/images/agent/onwhite.png" alt="">2016-10-02 16:00:00 ~ 2016-10-03 15:00:00 +0000</p>



								<div class="table-responsive">
									<table class="table table-striped table-hover clients trunks">
										<thead>
											<tr>
												<th>Date</th>
												<th>Activity</th>
												<th>Debit</th>
											</tr>
										</thead>
										<tbody>
											<tr v-if="!transaction_list.length">
												<td style="text-align: center" colspan="3">No Data Found</td>
											</tr>										
											
											<tr v-for="transaction in transaction_list">
												<td>{{transaction.date}}</td>
												<td>{{transaction.activity}}</td>
												<td>{{transaction.debit}}</td>
											</tr>
										</tbody>
									</table>
								</div>

							</div>
						</div>
						<div class="col-md-6">
							<div class="boxx">
								<h3 style="float:left">Top 10 clients</h3>
								<img style="float:right; margin-top:26px" src="assets/images/agent/grayloading.png" alt="">
								<div class="clearfix"></div>
								<p><img src="assets/images/agent/onwhite.png" alt="">2016-10-02 16:00:00 ~ 2016-10-03 15:00:00 +0000</p>

								<div class="table-responsive">
									<table class="table table-striped table-hover clients trunks">
										<thead>
											<tr>
												<th>Date</th>
												<th>Activity</th>
												<th>Debit</th>
											</tr>
										</thead>
										<tbody>
											<tr v-if="!transaction_list.length">
												<td style="text-align: center" colspan="3">No Data Found</td>
											</tr>										
											
											<tr v-for="transaction in transaction_list">
												<td>{{transaction.date}}</td>
												<td>{{transaction.activity}}</td>
												<td>{{transaction.debit}}</td>
											</tr>
										</tbody>
									</table>
								</div>

								
							</div>
						</div>
					</div>
					<div class="clearfix"></div>
					<footer>
						<p>DeNovoLab@2010-2016 All Rights Reserved</p>
					</footer>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	const vSelect = require('vue!../../main_components/select.vue');
	module.exports = {
		components: {
			'select2': vSelect
		},
		data: function() {
			return {
				demograph_list: [
					{id: 1, name: 'Example name', attempt: 123, non_zero: 0, min: 0, cost: '0.00000', asr: 0, acd: 0},
					{id: 1, name: 'Example name', attempt: 123, non_zero: 0, min: 0, cost: '0.00000', asr: 0, acd: 0},
					{id: 1, name: 'Example name', attempt: 123, non_zero: 0, min: 0, cost: '0.00000', asr: 0, acd: 0}
				],
				transaction_list: [
					{id: 1, date: '2016-10-22', activity: '$152.76', debit: '$0.00'},
					{id: 1, date: '2016-10-22', activity: '$152.76', debit: '$0.00'},
					{id: 1, date: '2016-10-22', activity: '$152.76', debit: '$0.00'},
				],

				selected1: 2,
				options1: [{
						id: 1,
						text: 'Connected Calls'
					},
					{
						id: 2,
						text: 'QoS'
					},
					{
						id: 3,
						text: 'Revenue and Profitability'
					}
				],
				selected2: 0,
				options2: [{
						id: 1,
						text: 'All'
					},
					{
						id: 2,
						text: 'Option 2'
					}
				],
				selected3: 0,
				options3: [{
						id: 1,
						text: 'Network'
					},
					{
						id: 2,
						text: 'Orig Trunks'
					},
					{
						id: 3,
						text: 'Term Trunks'
					}
				],
				selected4: 0,
				options4: [{
						id: 1,
						text: 'Last Hour'
					},
					{
						id: 2,
						text: 'Last 7-Days'
					},
					{
						id: 3,
						text: 'Last 15-Days'
					},
					{
						id: 4,
						text: 'Last 30-Days'
					},
					{
						id: 5,
						text: 'Last 60-Days'
					},
					{
						id: 6,
						text: 'Last 30-Mins'
					},
					{
						id: 7,
						text: 'Last 15-Mins'
					}
				],
				top_clients: [{
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
			panelHideShow() {
				if ($('.fixedusers').css('width') == '200px') {
					$('.fixedusers').css('width', '70px');
					$('.content').css('margin-left', '70px');
					$('.fixedusers .smallopen').show();
					$('.LargView').css('display', 'none');
					$('.smallView').css('display', 'block');
				} else {
					$('.fixedusers').css('width', '200px');
					$('.content').css('margin-left', '200px');
					$('.fixedusers .smallopen').hide();
					$('.LargView').fadeIn(1000);
					$('.smallView').css('display', 'none');
				}
			}
		},
		mounted: function() {
			Highcharts.setOptions({
				lang: {
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
							hover: {},
							select: {
								fill: '#52565b',
								style: {
									color: 'white',
									fontWeight: 'normal'
								}
							}
						}
					},
					inputEnabled: false,
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
					dateTimeLabelFormats: {
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
					labels: {
						formatter: function() {
							if (this.value > 10) {
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
					}
				]
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
						width: 40,
						height: 30,
						style: {
							color: '#4f5357',
							fontWeight: 'normal'
						},
						states: {
							hover: {},
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
						}
					],
					selected: 3
				},
				exporting: {
					enabled: true
				},
				yAxis: {
					title: {
						text: ''
					},
					opposite: false
				},
				title: {
					text: 'Connected Calls',
					margin: 20,
				},
				series: [{
					type: 'spline',
					name: 'Connected Calls',
					data: [2, 12, 3, 6, 11, 0, 9, 4, 8, 7, 10, 2, 1, 13, 5],
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
						width: 40,
						height: 30,
						style: {
							color: '#4f5357',
							fontWeight: 'normal'
						},
						states: {
							hover: {},
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
						}
					],
					selected: 3
				},
				exporting: {
					enabled: true
				},
				yAxis: {
					title: {
						text: ''
					},
					opposite: false
				},
				title: {
					text: 'Ingress CPG',
					margin: 20
				},
				series: [{
					type: 'spline',
					name: 'Ingress CPG',
					data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
						width: 40,
						height: 30,
						style: {
							color: '#4f5357',
							fontWeight: 'normal'
						},
						states: {
							hover: {},
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
						}
					],
					selected: 3
				},
				exporting: {
					enabled: true
				},
				yAxis: {
					title: {
						text: ''
					},
					opposite: false
				},
				title: {
					text: 'Chanell',
					margin: 20
				},
				series: [{
					type: 'spline',
					name: 'Chanell',
					data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
				exporting: {
					enabled: false
				},
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
				exporting: {
					enabled: false
				},
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
				exporting: {
					enabled: false
				},
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
				exporting: {
					enabled: false
				},
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

<style scoped>
	select {
		width:inherit!important;
		min-width:inherit!important;
	}
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
		min-height: 100%;
		width: 100%;
		position: relative;
		display: inline-block;
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
		color: #fff;
		background: #52565b;
	}
	.table-responsive {
		min-width: 440px;
	}
	.chart_content {
		overflow-x: auto;
	}
	div#time_line,
	#ingress_cpg,
	#chanell {
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
	.m-left-15 {
		padding-left: 15px;
	}
	.btn.btn-primary.btn-refresh {
		width: 200px;
	}
	.balance_tables {
		margin: 15px 0 5px 5px;
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
