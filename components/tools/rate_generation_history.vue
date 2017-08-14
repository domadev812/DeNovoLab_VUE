<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Tools</a></li>
				  <li class="breadcrumb-item">
                      <router-link to="/tools/rate_generation">Rate Generation</router-link>
                  </li>
                  <li class="breadcrumb-item active">Rate Generation History</li>
			</ol>
			<h1 class="page-header">Rate Generation History</h1>
            <router-link to="/tools/rate_generation" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
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
				</div>
				<div class="table-responsive">
					<table class="table table-striped table-hover carrier_groups">
					  <thead>
						<tr>
						  <th>Rate Created on</th>
						  <th>Rate Finished Time</th>
                          <th>Created by</th>
                          <th>Applied to Rate Table</th>
                          <th>Status</th>
                          <th>Progress</th>
						  <th class="width_110">Action</th>
						</tr>
					  </thead>
					  <tbody>
						<tr v-for="history in histories">
						  <td>{{history.rate_created_on}}</td>
						  <td>{{history.rate_finished_time}}</td>
                          <td>{{history.created_by}}</td>
                          <td>{{history.applied_to_rate_table}}</td>
                          <td>{{history.status}}</td>
                          <td>{{history.progress}}</td>
						  <td>
							  <router-link to="/tools/rate_generation/apply_to_rate_table" class="action action_activate" data-toggle="tooltip" data-placement="top" title="Apply to Rate Table">
								  <span class="dnl_icon dnl_check"></span>
							  </router-link>
							  <router-link to="/tools/rate_generation/rate_generation_result" class="action action_menu" data-toggle="tooltip" data-placement="top" title="View Rate">
								  <span class="dnl_icon dnl_action_menu"></span>
							  </router-link>
							  <a class="action action_read" data-toggle="tooltip" data-placement="top" title="Detail">
								  <span class="dnl_icon dnl_eye"></span>
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
			  rates: [
				{
				  rate_template: "China",
				  created_on: "2016-11-18 03:45:48+00",
                  created_by: 'DNL Support',
                  last_generated: '2016-11-30 07:57:26+00'
				},
                {
				  rate_template: "China",
				  created_on: "2016-11-18 03:45:48+00",
                  created_by: 'DNL Support',
                  last_generated: '2016-11-30 07:57:26+00'
				},
                {
				  rate_template: "China",
				  created_on: "2016-11-18 03:45:48+00",
                  created_by: 'DNL Support',
                  last_generated: '2016-11-30 07:57:26+00'
				},
                {
				  rate_template: "China",
				  created_on: "2016-11-18 03:45:48+00",
                  created_by: 'DNL Support',
                  last_generated: '2016-11-30 07:57:26+00'
				},
                {
				  rate_template: "China",
				  created_on: "2016-11-18 03:45:48+00",
                  created_by: 'DNL Support',
                  last_generated: '2016-11-30 07:57:26+00'
				}
			  ],
              histories: [
                  {
                      rate_created_on: '2016-11-28 13:17:27+00',
                      rate_finished_time: '2016-11-30 07:57:26+00',
                      created_by: 'Admin',
                      applied_to_rate_table: 'No',
                      status: 'Completed',
                      progress: 'No'
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
    .width_110 {
        width: 110px;
    }
</style>
