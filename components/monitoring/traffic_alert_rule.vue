<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Monitoring</a></li>
				  <li class="breadcrumb-item active">Traffic Alert Rule</li>
			</ol>
			<h1 class="page-header">Traffic Alert Rule</h1>
			<div class="white_pad table_wrap">
				<div class="table_filters">
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
					<router-link to="/monitoring/traffic_alert_rule/new" class="btn btn-primary mini pull-right">
						<span class="dnl_icon dnl_add"></span> Create new 
					</router-link>
				</div>
				<div class="table-responsive">
					<table class="table table-striped table-hover carrier_groups">
					  <thead>
						<tr>
						  <th>Carrier<span class="dnl_icon dnl_sort pull-right"></span></th>
						  <th>Destination</th>
                          <th>Previous Hour Attempt Less Than</th>
                          <th>Current Hour Attempt Greater Than</th>
                          <th>E-mail to</th>
						  <th class="width_138">Action</th>
						</tr>
					  </thead>
					  <tbody>
						<tr v-for="rule in rules">
						  <td>{{rule.carrier}}</td>
						  <td>{{rule.destination}}</td>
                          <td>{{rule.prev_hour}}</td>
						  <td>{{rule.cur_hour}}</td>
                          <td>{{rule.email}}</td>
						  <td>
							  <router-link to="/monitoring/traffic_alert_rule/new" class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit">
								  <span class="dnl_icon dnl_action_edit"></span>
							  </router-link>
							  <a class="action action_check" data-toggle="tooltip" data-placement="top" title="Activate">
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
			  pageOne: {
                currentPage: 1,
                totalPages: 10
              },
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
			  rules: [
				{
				  carrier: "Detail",
				  destination: "India",
                  prev_hour: '1',
                  cur_hour: '1',
                  email: 'z3st1k@mail.ru'
				},
                {
				  carrier: "Detail",
				  destination: "India",
                  prev_hour: '1',
                  cur_hour: '1',
                  email: 'z3st1k@mail.ru'
				},
                {
				  carrier: "Detail",
				  destination: "India",
                  prev_hour: '1',
                  cur_hour: '1',
                  email: 'z3st1k@mail.ru'
				},
                {
				  carrier: "Detail",
				  destination: "India",
                  prev_hour: '1',
                  cur_hour: '1',
                  email: 'z3st1k@mail.ru'
				},
                {
				  carrier: "Detail",
				  destination: "India",
                  prev_hour: '1',
                  cur_hour: '1',
                  email: 'z3st1k@mail.ru'
				}
			  ]
            }
        },
		methods: {
			pageOneChanged (pageNum) {
				this.pageOne.currentPage = pageNum
			}
		},
		mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
		}
	}
</script>

<style>
</style>
