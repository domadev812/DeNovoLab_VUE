<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Statistics</a></li>
				  <li class="breadcrumb-item active">Daily Channel Usage Report</li>
			</ol>
			<h1 class="page-header">Daily Channel Usage Report</h1>
			<div class="white_pad table_wrap">
				<div class="advanced_search_filter_panel">
						<div class="col-md-2 col-sm-4">
							<label>Period:</label>
							<select2 :options="period_options" v-model="period">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="col-md-3 col-sm-8">
							<div class="inlined">
								<label for="start_date">Start Time:</label>
								<el-date-picker style="width: 100%;" type="datetime" v-model="start_date" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
							<div class="inlined">
								<label for="end-date">End Time:</label>
								<el-date-picker style="width: 100%;" type="datetime" v-model="end_date" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
							</div>
						</div>
						<div class="col-md-5 col-sm-8">
							<div class="inlined">
								<div class="col-md-6 col-sm-6">
									<label>GMT:</label>
									<select2 :options="gmt_options" v-model="gmt">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
								<div class="col-md-6 col-sm-6">
									<label>Web:</label>
									<select2 :options="web_options" v-model="web">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
							</div>
							<div class="inlined">
								<div class="col-md-12 col-sm-12">
									<label>Server IP:</label>
									<select2 :options="server_ip_options" v-model="server_ip">
										<option disabled value="0">Select one</option>
									</select2>
								</div>
							</div>
						</div>
						<div class="col-md-2 col-sm-4">
							<a class="btn btn-primary full-width m-top-25">
								Query
							</a>
						</div>
						<div class="clearfix"></div>
				</div>
				<span class="table_time chart_time margin_0">
					09/23/2016 17:34:52 +0000
				</span>
				<div class="clearfix"></div>
				<div class="table-responsive">
					<table class="table table-striped table-hover carrier_groups aligned-center">
					  <thead>
						<tr>
						  <th>Report Time</th>
						  <th class="width_190">Ingress Channels(Max)</th>
						</tr>
					  </thead>
					  <tbody>
						<tr v-for="channel in channels">
						  <td>{{channel.report_time}}</td>
						  <td>{{channel.ingress_channels}}</td>
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
			</div>
		</div>
	  </div>
	</div>
</template>

<script>   
	const vSelect = require('vue!../main_components/select.vue'),
		  Pagination = require('vue!../main_components/pagination.vue');
	module.exports = {		
		components: {
			'select2': vSelect,
			'pagination': Pagination
		},
		data: function(){
			return {
				web_options: [
					{ id: 'web', text: 'Web' },
					{ id: 'excel_csv', text: 'Excel CSV' },
					{ id: 'email_when_done', text: 'Email when done' },
					{ id: 'export_from_storage', text: 'Export from Storage' },
				],
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
				server_ip_options: [
					{ id: 1, text: '10.10.10.10' },
					{ id: 2, text: '30.30.30.30' },
					{ id: 3, text: '111.111.111.111' },
					{ id: 4, text: '156.125.45.29' },
				],
				period_options: [
					{id: 'Custom', text: 'Custom'},
					{id: 'Today', text: 'Today'},
					{id: 'Yesterday', text: 'Yesterday'},
					{id: 'Current week', text: 'Current week'},
					{id: 'Previous week', text: 'Previous week'},
					{id: 'Current month', text: 'Current month'},
					{id: 'Previous month', text: 'Previous month'},
				],
			  period: 'Custom',
			  start_date: '',
			  end_date: '',
			  gmt: 13,
			  web: '',
				server_ip: '',
			  pageOne: {
                currentPage: 1,
                totalPages: 10
              },
			  options: [
				  { id: 1, text: '10' },
				  { id: 2, text: '20' },
				  { id: 3, text: '30' },
				  { id: 4, text: '50' },
				  { id: 5, text: '100' }
			  ],
			  channels: [
				{
				  report_time: "2017-02-01",
				  ingress_channels: "4"
				},
				{
				  report_time: "2017-02-01",
				  ingress_channels: "4"
				},
				{
				  report_time: "2017-02-01",
				  ingress_channels: "4"
				},
				{
				  report_time: "2017-02-01",
				  ingress_channels: "4"
				},
				{
				  report_time: "2017-02-01",
				  ingress_channels: "4"
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
	a.btn.btn-primary.full-width {
		width: 100%;
	}
	
</style>
