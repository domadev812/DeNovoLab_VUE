<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a>Agent</a></li>
				  <li class="breadcrumb-item active">Commission Report</li>
			</ol>
			<h1 class="page-header">Commission Report</h1>
				<div class="timeline">
					<div class="chart_select_header grided">
						<div class="col-md-3 col-sm-3">
							<label>Period:</label>
							<select2 :options="period_options" v-model="period">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="col-md-3 col-sm-3">
							<label>Start Date/Time:</label>
							<el-date-picker style="width: 100%;" type="date" v-model="start_date1" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
						</div>
						<div class="col-md-3 col-sm-3">
							<label>End Date/Time:</label>
							<el-date-picker style="width: 100%;" type="date" v-model="end_date1" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
						</div>
						<div class="col-md-3 col-sm-3">
							 <label>Timezone:</label>
							<select2 :options="time_zone_options" v-model="time_zone">
								<option disabled value="0">Select one</option>
							</select2> 
						</div>
						<div class="col-md-3 col-sm-3">
							<div class="form-group">
								<label for="agent">Agent:</label>
								<select class="selectable" v-model="agent">
									<option v-for="item in agent_options" v-bind:value="item.id">
										{{ item.text }}
									</option>
								</select>
							</div>
						</div>
						<div class="clearfix little-space"></div>
						<div class="col-md-3 col-sm-3">
							<a class="btn btn-primary m-top-10">
								Query
							</a>
						</div>
						<div class="clearfix"></div>
					</div>
					<div class="chart_content">
						<!-- <span class="table_time chart_time">
							09/23/2016 17:34:52 +0000
						</span> -->
						<div class="btn-group marged-40" role="group">
						  <button type="button" class="btn btn-default">
							  Group by Hourly
						  </button>
						  <button type="button" class="btn btn-default">
							  Group by Daily
						  </button>
						  <button type="button" class="btn btn-default">
							 Group by Weekly
						  </button>
						  <button type="button" class="btn btn-default">
							  Group by Monthly
						  </button>
						</div>
						<div class="table_filters marged-40">
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
						<div class="col-md-12">
							<div class="table-responsive marged-30">
								<table class="table table-striped table-hover carrier_groups originators">
								  <thead>
									<tr>
									  <th>
										  Date
									  	  <span class="dnl_icon dnl_sort pull-right"></span>
									  </th>
									  <th>
										  Agent
										  <span class="dnl_icon dnl_sort pull-right"></span>
									  </th>
									  <th class="width-65">Carrier</th>
									  <th class="width-92">Call Attempt</th>
									  <th class="width-92">Non Zero</th>
									  <th class="width-65">Minutes</th>
									  <th class="width-65">Cost</th>
									  <th class="width-65">ASR</th>
									  <th class="width-65">ACD</th>
									  <th class="width-65">Commission</th>
									</tr>
								  </thead>
								  <tbody>
									<tr v-for="agent in agents">
									  <td>{{agent.date}}</td>
									  <td>{{agent.agent}}</td>
									  <td>{{agent.carrier}}</td>
									  <td>{{agent.call_attempt}}</td>
									  <td>{{agent.non_zero}}</td>
									  <td>{{agent.minutes}}</td>
									  <td>{{agent.cost}}</td>
									  <td>{{agent.asr}}</td>
									  <td>{{agent.acd}}</td>
									  <td>{{agent.commission}}</td>
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
</template>

<script>   
	const vSelect = require('vue!../main_components/select.vue'),
		  multiselect = require('multiselect');
	const api = require("../../api");
	module.exports = {
		components: {
			'select2': vSelect,
			'multiselect': multiselect
		},
		data: function(){
            return {
				time_zone_options: [
					{ id: '-12:0', text: 'GMT -12:00' },
					{ id: '-11:0', text: 'GMT -11:00' },
					{ id: '-10:0', text: 'GMT -10:00' },
					{ id: '-9:0', text: 'GMT -9:00' },
					{ id: '-8:0', text: 'GMT -8:00' },
					{ id: '-7:0', text: 'GMT -7:00' },
					{ id: '-6:0', text: 'GMT -6:00' },
					{ id: '-5:0', text: 'GMT -5:00' },
					{ id: '-4:0', text: 'GMT -4:00' },
					{ id: '-3:0', text: 'GMT -3:00' },
					{ id: '-2:0', text: 'GMT -2:00' },
					{ id: '-1:0', text: 'GMT -1:00' },
					{ id: '0:0', text: 'GMT +0:00' },
					{ id: '1:0', text: 'GMT +1:00' },
					{ id: '2:0', text: 'GMT +2:00' },
					{ id: '3:0', text: 'GMT +3:00' },
					{ id: '4:0', text: 'GMT +4:00' },
					{ id: '5:0', text: 'GMT +5:00' },
					{ id: '6:0', text: 'GMT +6:00' },
					{ id: '7:0', text: 'GMT +7:00' },
					{ id: '8:0', text: 'GMT +8:00' },
					{ id: '9:0', text: 'GMT +9:00' },
					{ id: '10:0', text: 'GMT +10:00' },
					{ id: '11:0', text: 'GMT +11:00' },
					{ id: '12:0', text: 'GMT +12:00' },
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
				agent: '',
				agent_options: [],
			  period: '',
			  start_date: '',
			  end_time: '',
			  end_date: '',
			  time_zone: '',
			  groupname: '',
			  options: [
				  { id: 1, value: 'carrier1', text: 'Carrier 1' },
				  { id: 2, value: 'carrier2', text: 'Carrier 2' },
				  { id: 3, value: 'carrier3', text: 'Carrier 3' },
				  { id: 4, value: 'carrier4', text: 'Carrier 4' },
				  { id: 5, value: 'carrier5', text: 'Carrier 5' }
			  ],
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
			  agents: [
				  {
					date: '2016-12-08',
					agent: 'DNL_DNL',
					carrier: '1',
					call_attempt: '2',
					non_zero: '2',
					minutes: '0.92',
					cost: '4.58',
					asr: '100%',
					acd: '0.46%',
					commission: '0.37',
				  },
				  {
					date: '2016-12-08',
					agent: 'DNL_DNL',
					carrier: '1',
					call_attempt: '2',
					non_zero: '2',
					minutes: '0.92',
					cost: '4.58',
					asr: '100%',
					acd: '0.46%',
					commission: '0.37',
				  },
				  {
					date: '2016-12-08',
					agent: 'DNL_DNL',
					carrier: '1',
					call_attempt: '2',
					non_zero: '2',
					minutes: '0.92',
					cost: '4.58',
					asr: '100%',
					acd: '0.46%',
					commission: '0.37',
				  },
				  {
					date: '2016-12-08',
					agent: 'DNL_DNL',
					carrier: '1',
					call_attempt: '2',
					non_zero: '2',
					minutes: '0.92',
					cost: '4.58',
					asr: '100%',
					acd: '0.46%',
					commission: '0.37',
				  },
				  {
					date: '2016-12-08',
					agent: 'DNL_DNL',
					carrier: '1',
					call_attempt: '2',
					non_zero: '2',
					minutes: '0.92',
					cost: '4.58',
					asr: '100%',
					acd: '0.46%',
					commission: '0.37',
				  }
			  ]
            }
        },
		methods: {
			fetchAgents() {
				const url = api.getEndpointUrl() + '/v1/agent/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const agents = body.payload.items
						var self = this;
						agents.forEach(function (temp, i) {
							var agent = {};
							agent.id = temp.agent_id;
							agent.text = temp.agent_name;
							self.agent_options.push(agent);
							if (i == 0)
								self.agent = agent.id;
						});
						console.log(this.agent_options);
						
					}
				})
				.catch(error => {
					console.log(error)
				})
			}
		},
		mounted: function () {
			$('#carrier').multiSelect({
				 selectableHeader: "<div class='custom-header'>Optional Selection</div>",
  				 selectionHeader: "<div class='custom-header'>Selected Selection</div>"
			});
		},
		created () {
			this.fetchAgents()
		}
	}
</script>

<style>
	.min_height ul.ms-list {
		height: 79px;
	}
	
	.m-top-15 {
		margin-top: 15px;
	}
	
	.marged-40 {
		margin: 20px 40px;
	}
	
	.ms-container .ms-selectable, 
	.ms-container .ms-selection {
		border-radius: 4px;
	}
	
	.btn-group.marged-40 {
		margin: 10px 40px 0 40px!important;
	}
	
	th.width-92 {
		width: 92px;
	}
</style>
