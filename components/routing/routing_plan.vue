<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="#">Routing</a>
					</li>
					<li class="breadcrumb-item active">Routing Plan</li>
				</ol>
				<h1 class="page-header">Routing Plan</h1>
				<confirm v-show="showModal" @close="showModal = false" @submit="submit"></confirm>
				<div class="btn-group" role="group">
					<button type="button" class="btn btn-default" @click="createNew">
						<span class="dnl_icon dnl_add"></span> Create new
					</button>
					<button type="button" class="btn btn-default" v-on:click="deleteAll">
						<span class="dnl_icon dnl_action_delete"></span> Delete All
					</button>
					<button type="button" class="btn btn-default" v-on:click="deleteSelected">
						<span class="dnl_icon dnl_action_delete"></span> Delete Selected
					</button>
				</div>
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
							<el-select v-model="plan_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
								<el-option v-for="item in plan_table_column_options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="table-responsive">
						<spinner v-show="loading" class="spinner"></spinner>
						<div v-show="loading" class="mask"></div>
						<table class="table table-striped table-hover agents ">
							<thead>
								<tr>
									<th class="width-65">
										<div class="checkbox checkbox-success">
											<input id="select_all" name="select_all" type="checkbox" v-model="checker" v-on:click="clickSelectedAll">
											<label for="select_all"></label>
										</div>
									</th>
									<th v-if="showcolumns[0]">Name</th>
									<th v-if="showcolumns[1]">Usage Count</th>
									<th v-if="showcolumns[2]">Update at</th>
									<th v-if="showcolumns[3]">Update by</th>
									<th v-if="showcolumns[4]" class="width_78">Action</th>
								</tr>
							</thead>
							<tbody>
								<tr v-if="!filterBy(routingPlanList, search).length">
									<td style="text-align: center" colspan="6">No Data Found</td>
								</tr>										
								
								<tr v-for="(routing, index) in filterBy(routingPlanList, search)">
									<td class="centred_checkbox">
										<div class="checkbox checkbox-success">
											<input v-bind:id="'selected-' + index" v-bind:name="'selected-' + index" type="checkbox" v-model="routing.selected">
											<label v-bind:for="'selected-' + index"></label>
										</div>
									</td>
									<td v-if="showcolumns[0]">
										<router-link to="" class="blue_link" @click.native="detailRouting(routing.route_plan_id)">{{routing.name}}</router-link>
									</td>
									<td v-if="showcolumns[1]">{{routing.usage_count}}</td>
									<td v-if="showcolumns[2]">{{routing.update_at}}</td>
									<td v-if="showcolumns[3]">{{routing.update_by}}</td>
									<td v-if="showcolumns[4]">
										<a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" v-on:click="editRouting(routing.route_plan_id)">
											<span class="dnl_icon dnl_action_edit"></span>
										</a>
										<a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="deleteRouting(routing.route_plan_id)">
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
		<!--<modal v-if="showModal=='list'" @close="showModal = ''" class="biggest_modal">
		            <h3 slot="header">Client DID Assignment</h3>
		            <div slot="body">
		                <div class="table-responsive">
		                    <table class="table table-striped table-hover agents ">
		                        <thead>
		                            <tr>
		                                <th>Id</th>
		                                <th>Carriers</th>
		                                <th>Egress Trunk Name</th>
		                                <th>CPS Limit</th>
		                                <th>Call Limit</th>
		                                <th>Active</th>
		                            </tr>
		                        </thead>
		                        <tbody>
		                            <tr>
		                                <td></td>
		                                <td></td>
		                                <td></td>
		                                <td></td>
		                                <td></td>
		                                <td></td>
		                            </tr>
		                        </tbody>
		                    </table>
		                </div>
		            </div>-->
		<!--<div slot="footer">
		                <button class="btn btn-primary submit mini">Submit</button>
		                <button @click="closeModal" class="btn btn-default cancel mini">Cancel</button>
		            </div>-->
		</modal>
	</div>
</template>

<script>   
const vTabs = require('vue!../main_components/tabs.vue'),
	vTab = require('vue!../main_components/tab.vue'),
	vSelect = require('vue!../main_components/select.vue'),
	vSpinner = require('vue!../main_components/fadeloader.vue'),
	Pagination = require('vue!../main_components/pagination.vue'),
	modal = require('vue!../main_components/modal.vue'),
	confirmmodal = require('vue!../main_components/confirm_delete.vue'),
	api = require("../../api"),
	auth = require("../../auth");
	_ = require('lodash');
	import {mapGetters,	mapActions} from 'vuex'

module.exports = {
	created: function () {
		this.fetchPlans();
	},
	components: {
		'tabs': vTabs,
		'tab': vTab,
		'select2': vSelect,
		'pagination': Pagination,
		'modal': modal,
		'confirm': confirmmodal,
		'spinner': vSpinner
	},
	data: function () {
		return {
			apiUrl: '/v1/route/plan/list',
			// route_types: [
			//   { id: 1, text: 'Fail to Next Host' },
			//   { id: 2, text: 'Fail to Next Trunk' },
			//   { id: 3, text: 'Stop' },
			// ],
			showModal: false,

			selected_ids: [],

			pageOne: {
				currentPage: 1,
				totalPages: 10,
				cntpage: 10
			},

			checker: false,
			carrier_name_search: '',
			loading: false,
			resource_search: '',
			routing_rule: '',
			search: '',
			select: [],
			// options: [
			// 	{ id: 1, text: 'Success' },
			// 	{ id: 2, text: 'Multiple' },
			// 	{ id: 3, text: 'Moved Permanently' },
			// 	{ id: 4, text: 'Moved Temporarily' },
			// 	{ id: 5, text: 'Use Proxy' },
			// 	{ id: 6, text: 'Alternative Service' },
			// 	{ id: 7, text: 'Bad Request' },
			// 	{ id: 8, text: 'Unauthorized' },
			// 	{ id: 9, text: 'Payment Required' },
			// ],
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
			routingPlanList: [],
			plan_table_column_options: [{
				value: 'Name',
				label: 'Name'
			}, {
				value: 'Usage Count',
				label: 'Usage Count'
			}, {
				value: 'Update at',
				label: 'Update at'
			}, {
				value: 'Update by',
				label: 'Update by'
			}, {
				value: 'Action',
				label: 'Action'
			}],
			plan_table_columns: ['Name', 'Usage Count', 'Update at',
				'Update by', 'Action'],
			showcolumns: [true, true, true, true, true],
		}
	},
	methods: {
		...mapActions({
			setAsyncConfirm: 'async_confirm/setAsyncConfirm',
			setMessage: 'app_message/setAppMessage'
		}),
		handleChange() {
			if (_.indexOf(this.plan_table_columns, 'Name') != -1) {
				// this.showcolumns[0] = true;
				Vue.set(this.showcolumns, 0, true);
			}
			else {
				// this.showcolumns[0] = false;
				Vue.set(this.showcolumns, 0, false);
			}

			if (_.indexOf(this.plan_table_columns, 'Usage Count') != -1) {
				// this.showcolumns[1] = true;
				Vue.set(this.showcolumns, 1, true);
			}
			else {
				// this.showcolumns[1] = false;
				Vue.set(this.showcolumns, 1, false);
			}

			if (_.indexOf(this.plan_table_columns, 'Update at') != -1) {
				// this.showcolumns[2] = true;
				Vue.set(this.showcolumns, 2, true);
			}
			else {
				// this.showcolumns[2] = false;
				Vue.set(this.showcolumns, 2, false);
			}

			if (_.indexOf(this.plan_table_columns, 'Update by') != -1) {
				// this.showcolumns[3] = true;
				Vue.set(this.showcolumns, 3, true);
			}
			else {
				// this.showcolumns[3] = false;
				Vue.set(this.showcolumns, 3, false);
			}

			if (_.indexOf(this.plan_table_columns, 'Action') != -1) {
				// this.showcolumns[4] = true;
				Vue.set(this.showcolumns, 4, true);
			}
			else {
				// this.showcolumns[4] = false;
				Vue.set(this.showcolumns, 4, false);
			}

			console.log(this.showcolumns);

			// this.$nextTick(() => {
			// 	document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
			// });
		},
		fetchPlans() {
			var page = this.pageOne.currentPage - 1;
			var per_page = this.pageOne.cntpage;
			console.log("page => " + page + " , per_page => " + per_page);
			this.loading = true;

			this.$http.get(api.getEndpointUrl() + this.apiUrl + "?page=" + page + "&per_page=" + per_page + "&order_by=route_plan_id&order_dir=desc",
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(function (response) {
					this.loading = false;
					//todo: check success flag? validation errors?
					var routings = response.body.payload.items;
					console.log(routings);
					this.routingPlanList = routings;
					var total_page = response.body.payload.total;
					this.pageOne.currentPage = response.body.payload.page + 1;
					this.pageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
					console.log("total pages => " + this.pageOne.totalPages);
				}, function (error) {
					this.loading = false;
					console.log(error);
				});
		},
		pageOneChanged(pageNum) {
			if (pageNum !== this.pageOne.currentPage) {
				this.pageOne.currentPage = pageNum
				this.$nextTick(this.fetchPlans)
			}
		},
		changePageCount (countPerPage) {
			if (countPerPage !== this.pageOne.cntpage) {
				this.pageOne.cntpage = countPerPage
				this.$nextTick(this.fetchPlans)
			}
		},

		clickSelectedAll: function () {
			console.log("select_all-->" + this.checker);
			if (this.checker) {
				this.routingPlanList.forEach(function (routing, i) {
					routing.selected = true;
				});
			}
			else {
				this.routingPlanList.forEach(function (routing, i) {
					routing.selected = false;
				});
			}
		},
		closeModal: function () {
			this.showModal = '';
		},
		submit: function () {
			var vm = this;
			this.showModal = false;

			this.selected_ids.forEach(function (item, i) {
				var routingid = item;
				if (routingid == 0) {
					vm.setMessage({
						message:'The routing plan has been not selected!',
						type:'error'
					});
				}
				else {
					vm.loading = true;
					vm.resource = vm.$resource(api.getEndpointUrl() + '/v1/route/plan/' + routingid);
					vm.resource.delete({ route_plan_id: routingid }).then(function (response) {
						vm.loading = false;
						let index = _.findIndex(vm.routingPlanList, elem => elem.route_plan_id  === routingid)
						vm.routingPlanList.splice(index, 1)
						vm.setMessage('The routing plans have been deleted!')
					});
				}
			});
		},
		editRouting: function (id) {
			this.$router.push({ path: "/routing/routing_plan/edit/" + id });
		},
		detailRouting: function (id) {
			this.$router.push({ path: "/routing/routing_plan/details/" + id });
		},
		deleteRouting: function (id) {
			this.showModal = true;
			this.selected_ids = [];
			this.selected_ids.push(id);
		},
		createNew: function () {
			this.$router.push({path:"/routing/routing_plan/new"});
		},
		deleteAll: function () {
			console.log("delete all routing plans");

			this.selected_ids = [];
			var vm = this;

			this.routingPlanList.forEach(function (routing, i) {
				vm.selected_ids.push(routing.route_plan_id)
			});

			if (this.selected_ids.length == 0) {
				this.setMessage({
					message:'The routing plan has been not selected!',
					type:'error'
				});
				this.checker = false;

				return;
			}

			this.showModal = true;
			if (this.checker)
				this.checker = false;
		},
		deleteSelected: function () {
			console.log("delete selected routing plans");
			console.log(this.routingPlanList);
			this.selected_ids = [];
			var vm = this;
			this.routingPlanList.forEach(function (routing, i) {
				if (routing.selected == true) {
					vm.selected_ids.push(routing.route_plan_id);
				}
			});

			if (this.selected_ids.length == 0) {
				this.setMessage({
					message:'The routing plan has been not selected!',
					type:'error'
				});

				this.checker = false;
				return;
			}

			this.showModal = true;
			if (this.checker)
				this.checker = false;
		},
	},
	mounted: function () {
		$('[data-toggle="tooltip"]').tooltip();
	},
	updated: function () {
		document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
	},
}
</script>

<style>
.el-select__tags {
	display: none;
}
</style>