<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Statistics</a></li>
				  <li class="breadcrumb-item active">Active Registration</li>
			</ol>
			<h1 class="page-header">Active Registration</h1>
			<div class="white_pad table_wrap">
				<div class="table_filters searcheable">
					<div class="inline-block search_wrapper">
							<input type="text" name="registration_search" v-model="registration_search" class="form-control inline-block search_field" placeholder="Enter Role Name">
							<span class="dnl_icon dnl_musica-searcher"></span>
					</div>
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
					<table class="table table-striped table-hover roles centrum">
					  <thead>
						<tr>
						  <th>Username<span class="dnl_icon dnl_sort pull-right"></span></th>
						  <th>Registered On</th>
						  <th>Expired On</th>
						  <th>Registered From</th>
						</tr>
					  </thead>
					  <tbody>
						<tr v-for="registration in filterBy(registrations, registration_search)">
						  <td>{{registration.username}}</td>
						  <td>{{registration.registered_on}}</td>
						  <td>{{registration.expired_on}}</td>
						  <td>{{registration.registered_from}}</td>
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
		  Pagination = require('vue!../main_components/pagination.vue')
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
			  registration_search: '',
			  registrations: [
				{
				  username: "SIPP-UAC",
				  registered_on: '	2017-01-24 08:34:16+0000',
				  expired_on: '2017-01-24 08:34:16+0000',
				  registered_from: '195.154.188.23:8898'
				},
				{
				  username: "SIPP-UAC",
				  registered_on: '	2017-01-24 08:34:16+0000',
				  expired_on: '2017-01-24 08:34:16+0000',
				  registered_from: '195.154.188.23:8898'
				},
				{
				  username: "SIPP-UAC",
				  registered_on: '	2017-01-24 08:34:16+0000',
				  expired_on: '2017-01-24 08:34:16+0000',
				  registered_from: '195.154.188.23:8898'
				},
				{
				  username: "SIPP-UAC",
				  registered_on: '	2017-01-24 08:34:16+0000',
				  expired_on: '2017-01-24 08:34:16+0000',
				  registered_from: '195.154.188.23:8898'
				},
				{
				  username: "SIPP-UAC",
				  registered_on: '	2017-01-24 08:34:16+0000',
				  expired_on: '2017-01-24 08:34:16+0000',
				  registered_from: '195.154.188.23:8898'
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
