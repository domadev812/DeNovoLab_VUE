<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item"><a href="#">Configuration</a></li>
					<li class="breadcrumb-item active">Carrier Group</li>
				</ol>
				<h1 class="page-header">Carrier Group</h1>
				<confirm v-show="showModal" @close="showModal = false" @submit="submit"></confirm>
				<div class="white_pad table_wrap">
					<div class="table_filters">
						<div class="inline-block select_min_wrapper">
							<span class="inline-block">Page row:</span>
							<select2 :options="options1" v-model="selected1" class="inline-block" @pagecount="changepage">
							</select2>
						</div>
						<div class="inline-block">
							<!--<select2 :options="options2" v-model="selected2">
								<option disabled value="0">Show/Hide Columns</option>
							</select2>-->
							<el-select v-model="carrier_group_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
								<el-option v-for="item in carrier_group_table_column_options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
						<router-link to="/configuration/carrier_group/new" class="btn btn-primary mini pull-right">
							<span class="dnl_icon dnl_add"></span> Create new
						</router-link>
					</div>
					<div class="table-responsive">
						<spinner v-show="loading" class="spinner"></spinner>
						<div v-show="loading" class="mask"></div>
						<table class="table table-striped table-hover carrier_groups">
							<thead>
								<tr>
									<th v-if="showcolumns[0]">Group Name <span class="dnl_icon dnl_sort pull-right"></span></th>
									<th v-if="showcolumns[1]" class="width_138">Carrier Count</th>
									<th v-if="showcolumns[2]" class="width_138">Action</th>
								</tr>
							</thead>
							<tbody>
								<tr v-if="!carrier_groups.length">
									<td style="text-align: center" colspan="3">No Data Found</td>
								</tr>
								<tr v-for="group in orderBy(carrier_groups, 'carrier_name')" :id="'group_'+group.group_id">
									<td v-if="showcolumns[0]">{{group.group_name}}</td>
									<td v-if="showcolumns[1]">{{group.count}}</td>
									<td v-if="showcolumns[2]">
										<a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" v-on:click="edit_group(group.group_id);">
											<span class="dnl_icon dnl_action_edit"></span>
										</a>
										<router-link to="/management/carrier" class="action action_menu" data-toggle="tooltip" data-placement="top" title="Carrier List">
											<span class="dnl_icon dnl_action_menu"></span>
										</router-link>
										<a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="delete_group(group.group_id)">
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
	const vSelect = require('vue!../main_components/select_withckbox.vue'),
		Pagination = require('vue!../main_components/pagination.vue'),
		vSpinner = require('vue!../main_components/fadeloader.vue'),
		confirmmodal = require('vue!../main_components/confirm_delete.vue');;
	const api = require("../../api");
	const auth = require("../../auth");
	_ = require('lodash');
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	module.exports = {
		created: function() {
			this.fetchGroups();
		},
		components: {
			'select2': vSelect,
			'pagination': Pagination,
			'spinner': vSpinner,
			'confirm': confirmmodal
		},
		data: function() {
			return {
				showcolumns: [true, true, true],
				carrier_group_table_columns: ['Group Name', 'Carrier Count', 'Action'],
				temp_carrier_group_table_columns: ['Group Name', 'Carrier Count', 'Action'],
				carrier_group_table_column_options: [{
					value: 'Group Name',
					label: 'Group Name'
				}, {
					value: 'Carrier Count',
					label: 'Carrier Count'
				}, {
					value: 'Action',
					label: 'Action'
				}],
				apiUrl: '/v1/carrier/group/list',
				resource: null,
				selected_id: 0,
				pageOne: {
					currentPage: 1,
					totalPages: 10,
					cntpage: 10
				},
				loading: false,
				selected1: 1,
				options1: [{
						id: 1,
						text: '10',
						val: '10'
					},
					{
						id: 2,
						text: '20',
						val: '20'
					},
					{
						id: 3,
						text: '30',
						val: '30'
					},
					{
						id: 4,
						text: '50',
						val: '50'
					},
					{
						id: 5,
						text: '100',
						val: '100'
					}
				],
				selected2: 0,
				options2: [{
						id: 'group_name',
						text: 'Group Name'
					},
					{
						id: 'count',
						text: 'Carrier Count'
					},
					{
						id: 'action',
						text: 'Action'
					}
				],
				carrier_groups: [
				],
				showModal: false,
			}
		},
		methods: {
			...mapActions({
				setAsyncConfirm: 'async_confirm/setAsyncConfirm',
				setMessage: 'app_message/setAppMessage'
			}),
			handleChange() {
				for(let i = 0; i < this.temp_carrier_group_table_columns.length; i++) {
					if (_.indexOf(this.carrier_group_table_columns, this.temp_carrier_group_table_columns[i]) != -1) {
						Vue.set(this.showcolumns, i, true);
					}
					else {
						Vue.set(this.showcolumns, i, false);
					}
				}
			},
			fetchGroups() {
				var page = this.pageOne.currentPage - 1;
				var per_page = this.pageOne.cntpage;
				console.log("page => " + page + " , per_page => " + per_page);
				this.loading = true;
				this.$http.get(api.getEndpointUrl() + this.apiUrl + "?page=" + page + "&per_page=" + per_page + "&order_by=group_name&order_dir=", {
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(function(response) {
					this.loading = false;
					//todo: check success flag? validation errors?
					var carrier_groups = response.body.payload.items;
					console.log(carrier_groups);
					this.carrier_groups = carrier_groups;
					var total_page = response.body.payload.total;
					this.pageOne.currentPage = response.body.payload.page + 1;
					this.pageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
					console.log("total pages => " + this.pageOne.totalPages);
				}, function(error) {
					this.loading = false;
					console.log(error);
				});
			},
			pageOneChanged(pageNum) {
				if (pageNum !== this.pageOne.currentPage) {
					this.pageOne.currentPage = pageNum
					this.$nextTick(this.fetchGroups)
				}
			},
			delete_group: function(id) {
				this.showModal = true;
				this.selected_id = id;
			},
			submit: function() {
				var vm = this;
				this.showModal = false;
				var groupid = this.selected_id;
				if (groupid == 0) {
					this.setMessage({
						message:'The Group has been not been selected!',
						type:'error'
					});
				} else {
					this.loading = true;
					this.resource = this.$resource(api.getEndpointUrl() + '/v1/carrier/group/' + groupid);
					this.resource.delete({
						group_id: groupid
					}).then(function(response) {
						this.loading = false;
						let index = _.findIndex(this.carrier_groups, elem => elem.group_id  === groupid)
						this.carrier_groups.splice(index, 1)
						this.setMessage('The Group has been deleted!')
					});
				}
			},
			edit_group(groupid) {
				this.$router.push({
					path: "/configuration/carrier_group/edit/" + groupid
				});
			},
			changepage(countperpage) {
				if (countPerPage !== this.pageOne.cntpage) {
					this.pageOne.cntpage = countPerPage
					this.$nextTick(this.fetchGroups)
				}
			},
		},
		mounted: function() {
			$('[data-toggle="tooltip"]').tooltip();
		},
		updated: function () {
			document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
		},
	}
</script>
