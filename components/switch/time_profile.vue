<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="#">Switch</a>
					</li>
					<li class="breadcrumb-item active">Time Profile</li>
				</ol>
				<h1 class="page-header">Time Profile</h1>
				<confirm v-show="showModal" @close="showModal = false" @submit="submit"></confirm>
				<div class="white_pad table_wrap">
					<div class="advanced_search_filter_panel">
						<div class="inline-block search_wrapper">
							<label>Search:</label>
							<br>
							<input type="text" name="search" v-model="search" class="form-control inline-block search_field" placeholder="Enter Search">
							<span class="dnl_icon dnl_musica-searcher"></span>
						</div>
					</div>
					<div class="table_filters">
						<div class="inline-block select_min_wrapper">
							<span class="inline-block">Page row:</span>
							<select2 :options="options1" v-model="selected1" class="inline-block" @pagecount="changePageCount">
							</select2>
						</div>
						<div class="inline-block">
							<!--<select2 :options="options2" v-model="selected2">
										<option disabled value="0">Show/Hide Columns</option>
									</select2>-->
							<el-select v-model="profile_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
								<el-option v-for="item in profile_table_column_options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
						<router-link to="/switch/time_profile/new" class="btn btn-primary mini pull-right">
							<span class="dnl_icon dnl_add"></span> Create new
						</router-link>
					</div>
					<div class="table-responsive">
						<table class="table table-striped table-hover carrier_groups">
							<thead>
								<tr>
									<th v-if="showcolumns[0]">Name
										<a @click="sortName"><span class="dnl_icon dnl_sort pull-right"></span></a>
									</th>
									<th v-if="showcolumns[1]">Type
										<a @click="sortType"><span class="dnl_icon dnl_sort pull-right"></span></a>
									</th>
									<th v-if="showcolumns[2]">Start Weekday
										<a @click="sortStart"><span class="dnl_icon dnl_sort pull-right"></span></a>
									</th>
									<th v-if="showcolumns[3]">End Weekday
										<a @click="sortEnd"><span class="dnl_icon dnl_sort pull-right"></span></a>
									</th>
									<th v-if="showcolumns[4]">Start Time
										<a @click="sortStartTime"><span class="dnl_icon dnl_sort pull-right"></span></a>
									</th>
									<th v-if="showcolumns[5]">End Time
										<a @click="sortEndTime"><span class="dnl_icon dnl_sort pull-right"></span></a>
									</th>
									<th v-if="showcolumns[6]" class="width_98">Action</th>
								</tr>
							</thead>
							<tbody>
								<tr v-if="!filterBy(time_profile_list, search).length">
									<td style="text-align: center" colspan="7">No Data Found</td>
								</tr>								
								<tr v-for="time_profile in filterBy(time_profile_list, search)">
									<td v-if="showcolumns[0]">
										<a class="blue_link">{{time_profile.name}}</a>
									</td>
									<td v-if="showcolumns[1]">{{time_profile.type_name}}</td>
									<td v-if="showcolumns[2]">{{time_profile.type_name == 'weekly' ? get_weekday_name(time_profile.start_day_of_week) : ''}}</td>
									<td v-if="showcolumns[3]">{{time_profile.type_name == 'weekly' ? get_weekday_name(time_profile.end_day_of_week) : ''}}</td>
									<td v-if="showcolumns[4]">{{time_profile.type_name != 'all time' ? time_profile.start_time : ''}}</td>
									<td v-if="showcolumns[5]">{{time_profile.type_name != 'all time' ? time_profile.end_time : ''}}</td>
									<td v-if="showcolumns[6]">
										<a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" v-on:click="edit_timeprofile(time_profile.time_profile_id)">
											<span class="dnl_icon dnl_action_edit"></span>
										</a>
										<a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="delete_timeprofile(time_profile.time_profile_id)">
											<span class="dnl_icon dnl_action_delete"></span>
										</a>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="pull-right pagination">
						<pagination :current-page="pageOne.currentPage" :total-pages="pageOne.totalPages" @page-changed="pageOneChanged">
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
		Pagination = require('vue!../main_components/pagination.vue'),
		confirmmodal = require('vue!../main_components/confirm_delete.vue');
	const api = require("../../api");
	const auth = require("../../auth");
	_ = require('lodash');
	import {
		mapActions
	} from 'vuex'
	module.exports = {
		components: {
			'select2': vSelect,
			'confirm': confirmmodal,
			'pagination': Pagination
		},
		data: function() {
			return {
				order: 'time_profile_id',
				sort: 'desc',

				name_sort: 'asc',
				type_sort: 'asc',
				start_sort: 'asc',
				end_sort: 'asc',
				start_time_sort: 'asc',
				end_time_sort: 'asc',

				
				apiUrl: '/v1/config/time_profile/list',
				showModal: '',
				selected_id: 0,
				pageOne: {
					currentPage: 1,
					totalPages: 10,
					cntpage: 10
				},
				search: '',
				selected1: 1,
				options1: [{
						id: 1,
						text: '10'
					},
					{
						id: 2,
						text: '20'
					},
					{
						id: 3,
						text: '30'
					},
					{
						id: 4,
						text: '50'
					},
					{
						id: 5,
						text: '100'
					}
				],
				// selected2: 0,
				// options2: [
				// 	{ id: 1, text: 'Group Name' },
				// 	{ id: 2, text: 'Carrier Count' },
				// 	{ id: 3, text: 'Actions' }
				// ],
				week_days: ['',
					'Monday',
					'Tuesday',
					'Wednesday',
					'Tuesday',
					'Friday',
					'Saturday',
					'Sunday'
				],
				time_profile_list: [],
				profile_table_column_options: [{
					value: 'Name',
					label: 'Name'
				}, {
					value: 'Type',
					label: 'Type'
				}, {
					value: 'Start Weekday',
					label: 'Start Weekday'
				}, {
					value: 'End Weekday',
					label: 'End Weekday'
				}, {
					value: 'Start Time',
					label: 'Start Time'
				}, {
					value: 'End Time',
					label: 'End Time'
				}, {
					value: 'Action',
					label: 'Action'
				}],
				profile_table_columns: ['Name', 'Type', 'Start Weekday',
					'End Weekday', 'Start Time', 'End Time', 'Action'
				],
				showcolumns: [true, true, true, true, true, true, true],
			}
		},
		methods: {
			...mapActions({
				setMessage: 'app_message/setAppMessage'
			}),
			sortName() {
				if(this.name_sort == 'asc') {
					this.name_sort = 'desc'
					this.sort = this.name_sort
					this.order = 'name'
					this.fetchProfiles()
				}
					
				else if(this.name_sort == 'desc') {
					this.name_sort = 'asc'
					this.sort = this.name_sort
					this.order = 'name'
					this.fetchProfiles()
				}
			},
			sortType() {
				if(this.type_sort == 'asc') {
					this.type_sort = 'desc'
					this.sort = this.type_sort
					this.order = 'type_name'
					this.fetchProfiles()
				}
					
				else if(this.type_sort == 'desc') {
					this.type_sort = 'asc'
					this.sort = this.type_sort
					this.order = 'type_name'
					this.fetchProfiles()
				}
			},
			sortStart() {
				if(this.start_sort == 'asc') {
					this.start_sort = 'desc'
					this.sort = this.start_sort
					this.order = 'start_day_of_week'
					this.fetchProfiles()
				}
					
				else if(this.start_sort == 'desc') {
					this.start_sort = 'asc'
					this.sort = this.start_sort
					this.order = 'start_day_of_week'
					this.fetchProfiles()
				}
			},
			sortEnd() {
				if(this.end_sort == 'asc') {
					this.end_sort = 'desc'
					this.sort = this.end_sort
					this.order = 'end_day_of_week'
					this.fetchProfiles()
				}
					
				else if(this.end_sort == 'desc') {
					this.end_sort = 'asc'
					this.sort = this.end_sort
					this.order = 'end_day_of_week'
					this.fetchProfiles()
				}
			},
			sortStartTime() {
				if(this.start_time_sort == 'asc') {
					this.start_time_sort = 'desc'
					this.sort = this.start_time_sort
					this.order = 'start_time'
					this.fetchProfiles()
				}
					
				else if(this.start_time_sort == 'desc') {
					this.start_time_sort = 'asc'
					this.sort = this.start_time_sort
					this.order = 'start_time'
					this.fetchProfiles()
				}
			},
			sortEndTime() {
				if(this.end_time_sort == 'asc') {
					this.end_time_sort = 'desc'
					this.sort = this.end_time_sort
					this.order = 'end_time'
					this.fetchProfiles()
				}
					
				else if(this.end_time_sort == 'desc') {
					this.end_time_sort = 'asc'
					this.sort = this.end_time_sort
					this.order = 'end_time'
					this.fetchProfiles()
				}
			},

			handleChange() {
				if (_.indexOf(this.profile_table_columns, 'Name') != -1) {
					Vue.set(this.showcolumns, 0, true);
				} else {
					Vue.set(this.showcolumns, 0, false);
				}
				if (_.indexOf(this.profile_table_columns, 'Type') != -1) {
					Vue.set(this.showcolumns, 1, true);
				} else {
					Vue.set(this.showcolumns, 1, false);
				}
				if (_.indexOf(this.profile_table_columns, 'Start Weekday') != -1) {
					Vue.set(this.showcolumns, 2, true);
				} else {
					Vue.set(this.showcolumns, 2, false);
				}
				if (_.indexOf(this.profile_table_columns, 'End Weekday') != -1) {
					Vue.set(this.showcolumns, 3, true);
				} else {
					Vue.set(this.showcolumns, 3, false);
				}
				if (_.indexOf(this.profile_table_columns, 'Start Time') != -1) {
					Vue.set(this.showcolumns, 4, true);
				} else {
					Vue.set(this.showcolumns, 4, false);
				}
				if (_.indexOf(this.profile_table_columns, 'End Time') != -1) {
					Vue.set(this.showcolumns, 5, true);
				} else {
					Vue.set(this.showcolumns, 5, false);
				}
				if (_.indexOf(this.profile_table_columns, 'Action') != -1) {
					Vue.set(this.showcolumns, 6, true);
				} else {
					Vue.set(this.showcolumns, 6, false);
				}
				console.log(this.showcolumns);
			},
			get_weekday_name: function(id) {
				return this.week_days[id]
			},
			pageOneChanged(pageNum) {
				if (pageNum !== this.pageOne.currentPage) {
					this.pageOne.currentPage = pageNum
					this.$nextTick(this.fetchProfiles)
				}
			},
			edit_timeprofile: function(id) {
				this.$router.push({
					path: "/switch/time_profile/edit/" + id
				});
			},
			delete_timeprofile: function(id) {
				this.showModal = true;
				this.selected_id = id;
			},
			closeModal: function() {
				this.showModal = '';
			},
			fetchProfiles() {
				this.loading = true;
				var page = this.pageOne.currentPage - 1;
				var per_page = this.pageOne.cntpage;
				var order = this.order;
                var sort = this.sort;
				console.log("page => " + page + " , per_page => " + per_page);
				this.loading = true;
				this.$http.get(api.getEndpointUrl() + this.apiUrl + "?page=" + page + "&per_page=" + per_page + "&order_by="+order+"&order_dir="+sort, {
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(function(response) {
					this.loading = false;
					//todo: check success flag? validation errors?
					var time_profile_list = response.body.payload.items;
					console.log(time_profile_list);
					this.time_profile_list = time_profile_list;
					var total_page = response.body.payload.total;
					this.pageOne.currentPage = response.body.payload.page + 1;
					this.pageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
					console.log("total pages => " + this.pageOne.totalPages);
				}, function(error) {
					this.loading = false;
					console.log(error);
				});
			},
			submit: function() {
				var vm = this;
				this.showModal = false;
				var profileid = this.selected_id;
				if (profileid == 0) {
					this.setMessage({
						message: 'The time profile has been not been selected!',
						type: 'error'
					});
				} else {
					this.loading = true;
					this.resource = this.$resource(api.getEndpointUrl() + '/v1/config/time_profile/' + profileid);
					this.resource.delete({
						time_profile_id: profileid
					}).then(function(response) {
						this.loading = false;
						let index = _.findIndex(this.time_profile_list, elem => elem.time_profile_id === profileid)
						this.time_profile_list.splice(index, 1)
						this.setMessage('The time profile has been deleted!')
					});
				}
			},
			changePageCount(countPerPage) {
				if (countPerPage !== this.pageOne.cntpage) {
					this.pageOne.cntpage = countPerPage
					this.$nextTick(this.fetchProfiles)
				}
			},
		},
		mounted: function() {
			$('[data-toggle="tooltip"]').tooltip();
		},
		updated: function() {
			document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
		},
		created: function() {
			this.fetchProfiles();
		}
	}
</script>

<style>
	a.action.action_priority {
		padding-top: 4px;
		line-height: 0;
		font-size: 19px;
		vertical-align: top;
	}
	a.action.action_priority .dnl_icon.dnl_ingress_host {
		float: none;
		margin: 0;
	}
	.el-select__tags {
		display: none;
	}
</style>
