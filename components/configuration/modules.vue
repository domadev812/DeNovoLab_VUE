<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="#">Configuration</a>
					</li>
					<li class="breadcrumb-item active">System Modules</li>
				</ol>
				<h1 class="page-header">System Modules</h1>
				<div class="white_pad table_wrap">
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
							<el-select v-model="module_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
								<el-option v-for="item in module_table_column_options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
						<router-link to="/configuration/modules/new" class="btn btn-primary mini pull-right">
							<span class="dnl_icon dnl_add"></span> Create new
						</router-link>
					</div>
					<div class="table-responsive">
						<table class="table table-striped table-hover carrier_groups">
							<thead>
								<tr>
									<th v-if="showcolumns[0]">Module Name
										<span class="dnl_icon dnl_sort pull-right"></span>
									</th>
									<th v-if="showcolumns[1]" class="width_138">Action</th>
								</tr>
							</thead>
							<tbody>
								<tr v-if="!modules.length">
									<td style="text-align: center" colspan="2">No Data Found</td>
								</tr>
								<tr v-for="module in modules">
									<td v-if="showcolumns[0]">{{module.image_name}}</td>
									<td v-if="showcolumns[1]">
										<a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" @click="editModule(module.system_function_id)">
											<span class="dnl_icon dnl_action_edit"></span>
										</a>
										<a class="action action_menu" data-toggle="tooltip" data-placement="top" title="Submodules List">
											<span class="dnl_icon dnl_action_menu"></span>
										</a>
										<a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="askDeleteConfirm(module.system_function_id)">
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
		Pagination = require('vue!../main_components/pagination.vue');
	const api = require("../../api");
	const auth = require("../../auth");
	_ = require('lodash');
	import {mapGetters,	mapActions} from 'vuex'
	
	module.exports = {
		components: {
			'select2': vSelect,
			'pagination': Pagination
		},
		data: function() {
			return {
				pageOne: {
					currentPage: 1,
					totalPages: 10,
					cntpage: 10
				},
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
				selected2: 0,
				module_table_column_options: [{
						value: 'Module Name',
						label: 'Module Name'
					},
					{
						value: 'Actions',
						label: 'Actions'
					}
				],
				module_table_columns: ['Module Name', 'Actions'],
				showcolumns: [true, true],
				modules: [],
				apiUrl: '/v1/config/system_modules/list',
			}
		},
		methods: {
			...mapActions({
				setAsyncConfirm: 'async_confirm/setAsyncConfirm',
				setMessage: 'app_message/setAppMessage'
			}),
			fetchModules() {
				var page = this.pageOne.currentPage - 1;
				var per_page = this.pageOne.cntpage;
				console.log("page => " + page + " , per_page => " + per_page);
				this.loading = true;
				this.$http.get(api.getEndpointUrl() + this.apiUrl + 
				"?page=" + page + "&per_page=" + per_page + 
				"&order_by=&order_dir=desc", 
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(function(response) {
					this.loading = false;
					//todo: check success flag? validation errors?
					var modules = response.body.payload.items;
					console.log(modules);
					this.modules = modules;
					var total_page = response.body.payload.total;
					this.pageOne.currentPage = response.body.payload.page + 1;
					this.pageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
					console.log("total pages => " + this.pageOne.totalPages);
				}, function(error) {
					this.loading = false;
					console.log(error);
				});
			},
			handleChange() {
				if (_.indexOf(this.module_table_columns, 'Module Name') != -1) {
					Vue.set(this.showcolumns, 0, true);
				} else {
					Vue.set(this.showcolumns, 0, false);
				}
				if (_.indexOf(this.module_table_columns, 'Actions') != -1) {
					Vue.set(this.showcolumns, 1, true);
				} else {
					Vue.set(this.showcolumns, 1, false);
				}
				console.log(this.showcolumns);
			},
			pageOneChanged(pageNum) {
				if (pageNum !== this.pageOne.currentPage) {
					this.pageOne.currentPage = pageNum
					this.$nextTick(this.fetchModules)
				}
			},
			changePageCount (countPerPage) {
				if (countPerPage !== this.pageOne.cntpage) {
					this.pageOne.cntpage = countPerPage
					this.$nextTick(this.fetchModules)
				}
			},
			editModule (id) {
				this.$router.push('/configuration/modules/edit/' + id)
			},
			askDeleteConfirm (id) {
				this.setAsyncConfirm('Are you sure you want to delete?')
				.then(result => {
					if (result.accepted) {
						this.delete_module(id)
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			delete_module (id) {
				const url = api.getEndpointUrl() + '/v1/config/system_function/' + id
				this.$http.delete(url)
				.then(response => {
					if (response.body.success) {
						let index = _.findIndex(this.modules, elem => elem.system_function_id  === id)
						this.modules.splice(index, 1)
						this.setMessage('Modules was removed successfully')
					}
				})
			}						
		},
		created: function() {
			this.fetchModules();
		},
		mounted: function() {
			$('[data-toggle="tooltip"]').tooltip();
		},
		updated: function() {
			document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
		}
	}
</script>

<style>
	.el-select__tags {
		display: none;
	}
</style>
