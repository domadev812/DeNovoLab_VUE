<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="#">Configuration</a>
					</li>
					<li class="breadcrumb-item active">User Management</li>
				</ol>
				<h1 class="page-header">User Management</h1>
				<tabs class="user_tabs user_management_wrapper" @activateTab="activateTab">
					<tab label="System Users" class="" icon="dnl_icon dnl_list" selected>
						<div class="white_pad table_wrap">
							<div class="table_filters searcheable">
								<div class="inline-block search_wrapper">
									<input type="text" name="user_search" v-model="user_search" class="form-control inline-block search_field" placeholder="Enter Username">
									<span class="dnl_icon dnl_musica-searcher"></span>
								</div>
								<div class="inline-block select_min_wrapper">
									<span class="inline-block">Page row:</span>
									<select2 :options="options1" v-model="selected1" class="inline-block" @pagecount="changePageCount">
									</select2>
								</div>
								<div class="inline-block">
									<!--<select2 :options="system_users_options" v-model="system_users_option">
											<option disabled value="0">Show/Hide Columns</option>
										</select2>-->
									<el-select v-model="system_users_option" multiple placeholder="Show/Hide Columns" @change="handleChangeSystem">
										<el-option v-for="item in system_users_options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</div>
								<router-link to="/configuration/user_management/new" class="btn btn-primary mini pull-right">
									<span class="dnl_icon dnl_add"></span> Create new
								</router-link>
							</div>
							<div class="table-responsive">
								<table class="table table-striped table-hover user_management">
									<thead>
										<tr>
											<th v-if="showcolumns1[0]" class="width_78">Active</th>
											<th v-if="showcolumns1[1]">User Name
												<span class="dnl_icon dnl_sort pull-right"></span>
											</th>
											<th v-if="showcolumns1[2]">User Type</th>
											<th v-if="showcolumns1[3]">Role Name</th>
											<th v-if="showcolumns1[4]">Last Login Time</th>
											<th v-if="showcolumns1[5]" class="width_110">Action</th>
										</tr>
									</thead>
									<tbody>
										<tr v-if="!filterBy(users, user_search).length">
											<td style="text-align: center" colspan="6">No Data Found</td>
										</tr>
										<tr v-for="user in filterBy(users, user_search)">
											<td v-if="showcolumns1[0]" class="text-center">
												<div class="checkbox checkbox-success">
													<input type="checkbox" v-model="user.active">
													<label></label>
												</div>
											</td>
											<td v-if="showcolumns1[1]">{{user.fullname}}</td>
											<td v-if="showcolumns1[2]">{{user.user_type}}</td>
											<td v-if="showcolumns1[3]">{{user.role_name}}</td>
											<td v-if="showcolumns1[4]">{{user.last_login_time}}</td>
											<td v-if="showcolumns1[5]">
												<router-link :to="'/configuration/user_management/edit/'+user.user_id" class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit">
													<span class="dnl_icon dnl_action_edit"></span>
												</router-link>
												<a class="action action_key" data-toggle="tooltip" data-placement="top" title="Reset Password" @click="showModal = 'reset_pass'">
													<span class="dnl_icon dnl_key"></span>
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
								<pagination :current-page="pageOne.currentPage" :total-pages="pageOne.totalPages" @page-changed="pageOneChanged">
								</pagination>
							</div>
							<div class="clearfix"></div>
						</div>
					</tab>
					<tab label="Carrier Users" class="" icon="dnl_icon dnl_group">
						<div class="white_pad table_wrap">
							<div class="table_filters searcheable">
								<div class="inline-block search_wrapper">
									<input type="text" name="user_search" v-model="user_search" class="form-control inline-block search_field" placeholder="Enter Username">
									<span class="dnl_icon dnl_musica-searcher"></span>
								</div>
								<div class="inline-block select_min_wrapper">
									<span class="inline-block">Page row:</span>
									<select2 :options="options1" v-model="selected1" class="inline-block">
									</select2>
								</div>
								<div class="inline-block">
									<!--<select2 :options="carrier_users_options" v-model="carrier_users_option">
											<option disabled value="0">Show/Hide Columns</option>
										</select2>-->
									<el-select v-model="carrier_users_option" multiple placeholder="Show/Hide Columns" @change="handleChangeCarrier">
										<el-option v-for="item in carrier_users_options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</div>
								<router-link to="/configuration/user_management/new_carrier_user" class="btn btn-primary mini pull-right">
									<span class="dnl_icon dnl_add"></span> Create new
								</router-link>
							</div>
							<div class="table-responsive">
								<table class="table table-striped table-hover user_management">
									<thead>
										<tr>
											<th v-if="showcolumns2[0]" class="width_78">Active</th>
											<th v-if="showcolumns2[1]">User Name
												<span class="dnl_icon dnl_sort pull-right"></span>
											</th>
											<th v-if="showcolumns2[2]">Carrier Name</th>
											<th v-if="showcolumns2[3]" class="width_78">Action</th>
										</tr>
									</thead>
									<tbody>
										<tr v-if="!filterBy(users, user_search).length">
											<td colspan="4">No Data Found</td>
										</tr>										
										<tr v-for="user in filterBy(users, user_search)">
											<td v-if="showcolumns2[0]" class="text-center">
												<div class="checkbox checkbox-success">
													<input type="checkbox" v-model="user.active">
													<label></label>
												</div>
											</td>
											<td v-if="showcolumns2[1]">{{user.fullname}}</td>
											<td v-if="showcolumns2[2]">{{user.user_type}}</td>
											<td v-if="showcolumns2[3]">
												<a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit">
													<span class="dnl_icon dnl_action_edit"></span>
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
								<pagination :current-page="pageOne.currentPage" :total-pages="pageOne.totalPages" @page-changed="pageOneChanged">
								</pagination>
							</div>
							<div class="clearfix"></div>
						</div>
					</tab>
					<tab label="Online Users" class="" icon="dnl_icon dnl_user">
						<div class="white_pad table_wrap">
							<div class="table_filters searcheable">
								<div class="inline-block search_wrapper">
									<input type="text" name="user_search" v-model="user_search" class="form-control inline-block search_field" placeholder="Enter Username">
									<span class="dnl_icon dnl_musica-searcher"></span>
								</div>
								<div class="inline-block select_min_wrapper">
									<span class="inline-block">Page row:</span>
									<select2 :options="options1" v-model="selected1" class="inline-block">
									</select2>
								</div>
								<div class="inline-block">
									<!--<select2 :options="online_users_options" v-model="online_users_option">
											<option disabled value="0">Show/Hide Columns</option>
										</select2>-->
									<el-select v-model="online_users_option" multiple placeholder="Show/Hide Columns" @change="handleChangeOnline">
										<el-option v-for="item in online_users_options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</div>
							</div>
							<div class="table-responsive">
								<table class="table table-striped table-hover user_management">
									<thead>
										<tr>
											<th v-if="showcolumns3[0]" class="width_78">Active</th>
											<th v-if="showcolumns3[1]">User Name
												<span class="dnl_icon dnl_sort pull-right"></span>
											</th>
											<th v-if="showcolumns3[2]">User Type</th>
											<th v-if="showcolumns3[3]">Role Name</th>
											<th v-if="showcolumns3[4]" class="width_110">Action</th>
										</tr>
									</thead>
									<tbody>
										<tr v-if="!filterBy(users, user_search).length">
											<td colspan="5">No Data Found</td>
										</tr>										
										<tr v-for="user in filterBy(users, user_search)">
											<td v-if="showcolumns3[0]" class="text-center">
												<div class="checkbox checkbox-success">
													<input type="checkbox" v-model="user.active">
													<label></label>
												</div>
											</td>
											<td v-if="showcolumns3[1]">{{user.fullname}}</td>
											<td v-if="showcolumns3[2]">{{user.user_type}}</td>
											<td v-if="showcolumns3[3]">{{user.role_name}}</td>
											<td v-if="showcolumns3[4]">
												<a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit">
													<span class="dnl_icon dnl_action_edit"></span>
												</a>
												<a class="action action_key" data-toggle="tooltip" data-placement="top" title="Reset Password" @click="showModal = 'reset_pass'">
													<span class="dnl_icon dnl_key"></span>
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
								<pagination :current-page="pageOne.currentPage" :total-pages="pageOne.totalPages" @page-changed="pageOneChanged">
								</pagination>
							</div>
							<div class="clearfix"></div>
						</div>
					</tab>
					<tab label="Non-Active Users" class="" icon="dnl_icon dnl_remove-user">
						<div class="white_pad table_wrap">
							<div class="table_filters searcheable">
								<div class="inline-block search_wrapper">
									<input type="text" name="user_search" v-model="user_search" class="form-control inline-block search_field" placeholder="Enter Username">
									<span class="dnl_icon dnl_musica-searcher"></span>
								</div>
								<div class="inline-block select_min_wrapper">
									<span class="inline-block">Page row:</span>
									<select2 :options="options1" v-model="selected1" class="inline-block">
									</select2>
								</div>
								<div class="inline-block">
									<!--<select2 :options="non_active_users_options" v-model="non_active_users_option">
											<option disabled value="0">Show/Hide Columns</option>
										</select2>-->
									<el-select v-model="non_active_users_option" multiple placeholder="Show/Hide Columns" @change="handleChangeNonActive">
										<el-option v-for="item in non_active_users_options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</div>
							</div>
							<div class="table-responsive">
								<table class="table table-striped table-hover user_management">
									<thead>
										<tr>
											<th v-if="showcolumns4[0]" class="width_78">Active</th>
											<th v-if="showcolumns4[1]">User Name
												<span class="dnl_icon dnl_sort pull-right"></span>
											</th>
											<th v-if="showcolumns4[2]">Carrier Name</th>
											<th v-if="showcolumns4[3]" class="width_110">Action</th>
										</tr>
									</thead>
									<tbody>
										<tr v-if="!filterBy(users, user_search).length">
											<td colspan="4">No Data Found</td>
										</tr>										
										<tr v-for="user in filterBy(users, user_search)">
											<td v-if="showcolumns4[0]" class="text-center">
												<div class="checkbox checkbox-success">
													<input type="checkbox" v-model="user.active">
													<label></label>
												</div>
											</td>
											<td v-if="showcolumns4[1]">{{user.fullname}}</td>
											<td v-if="showcolumns4[2]">{{user.user_type}}</td>
											<td v-if="showcolumns4[3]">
												<a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit">
													<span class="dnl_icon dnl_action_edit"></span>
												</a>
												<a class="action action_key" data-toggle="tooltip" data-placement="top" title="Reset Password" @click="showModal = 'reset_pass'">
													<span class="dnl_icon dnl_key"></span>
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
								<pagination :current-page="pageOne.currentPage" :total-pages="pageOne.totalPages" @page-changed="pageOneChanged">
								</pagination>
							</div>
							<div class="clearfix"></div>
						</div>
					</tab>
					<tab label="Agent List" class="" icon="dnl_icon dnl_list">
						<div class="white_pad table_wrap">
							<div class="table_filters searcheable">
								<div class="inline-block search_wrapper">
									<input type="text" name="user_search" v-model="user_search" class="form-control inline-block search_field" placeholder="Enter Username">
									<span class="dnl_icon dnl_musica-searcher"></span>
								</div>
								<div class="inline-block select_min_wrapper">
									<span class="inline-block">Page row:</span>
									<select2 :options="options1" v-model="selected1" class="inline-block">
									</select2>
								</div>
								<div class="inline-block">
									<!--<select2 :options="agent_list_options" v-model="agent_list_option">
											<option disabled value="0">Show/Hide Columns</option>
										</select2>-->
									<el-select v-model="agent_list_option" multiple placeholder="Show/Hide Columns" @change="handleChangeAgent">
										<el-option v-for="item in agent_list_options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</div>
								<router-link to="/agent/agent_management/new" class="btn btn-primary mini pull-right">
									<span class="dnl_icon dnl_add"></span> Create new
								</router-link>
							</div>
							<div class="table-responsive">
								<table class="table table-striped table-hover user_management">
									<thead>
										<tr>
											<th v-if="showcolumns5[0]" class="width_78">Active</th>
											<th v-if="showcolumns5[1]">User Name
												<span class="dnl_icon dnl_sort pull-right"></span>
											</th>
											<th v-if="showcolumns5[2]">User Type</th>
											<th v-if="showcolumns5[3]">Role Name</th>
											<th v-if="showcolumns5[4]" class="width_140">Action</th>
										</tr>
									</thead>
									<tbody>
										<tr v-if="!filterBy(users, user_search).length">
											<td colspan="5">No Data Found</td>
										</tr>										
										<tr v-for="user in filterBy(users, user_search)">
											<td v-if="showcolumns5[0]" class="text-center">
												<div class="checkbox checkbox-success">
													<input type="checkbox" v-model="user.active">
													<label></label>
												</div>
											</td>
											<td v-if="showcolumns5[1]">{{user.fullname}}</td>
											<td v-if="showcolumns5[2]">{{user.user_type}}</td>
											<td v-if="showcolumns5[3]">{{user.role_name}}</td>
											<td v-if="showcolumns5[4]">
												<a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit">
													<span class="dnl_icon dnl_action_edit"></span>
												</a>
												<a class="action action_key" data-toggle="tooltip" data-placement="top" title="Reset Password" @click="showModal = 'reset_pass'">
													<span class="dnl_icon dnl_key"></span>
												</a>
												<a data-toggle="tooltip" data-placement="top" title="" class="action action_menu" data-original-title="Carrier List">
													<span class="dnl_icon dnl_action_menu"></span>
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
								<pagination :current-page="pageOne.currentPage" :total-pages="pageOne.totalPages" @page-changed="pageOneChanged">
								</pagination>
							</div>
							<div class="clearfix"></div>
						</div>
					</tab>
				</tabs>
			</div>
		</div>
		<modal v-if="showModal=='reset_pass'" @close="showModal = ''">
			<h3 slot="header">Reset Password</h3>
			<div slot="body">
				<div class="">
					<form class="form">
						<div class="form-group">
							<label for="new_password">New Password:</label>
							<input type="password" name="new_password" v-model="new_password" class="form-control" placeholder="Enter your new password">
						</div>
					</form>
				</div>
			</div>
			<div slot="footer">
				<button @click="submitNewPass" class="btn btn-primary submit">Submit</button>
				<button @click="closeModal" class="btn btn-default cancel">Cancel</button>
			</div>
		</modal>
	</div>
</template>

<script>   
const vTabs = require('vue!../main_components/tabs.vue'),
	vTab = require('vue!../main_components/tab.vue'),
	vSelect = require('vue!../main_components/select.vue'),
	Pagination = require('vue!../main_components/pagination.vue'),
	modal = require('vue!../main_components/modal.vue'),
	confirmmodal = require('vue!../main_components/confirm_delete.vue');
_ = require('lodash');
const api = require("../../api");
const auth = require("../../auth");

module.exports = {
	created: function () {
		const page = this.pageOne.currentPage - 1;
		const per_page = this.pageOne.cntpage;
			var url = api.getEndpointUrl() + this.apiUrl + "?user_type=admin&order_by=user_id&order_dir=desc";
			this.url = url;
			url = url + "&page=" + page + "&per_page=" + per_page;
			this.fetchUsers(url);
	},
	components: {
		'tabs': vTabs,
		'tab': vTab,
		'select2': vSelect,
		'pagination': Pagination,
		'confirm': confirmmodal,
		'modal': modal
	},
	data: function () {
		return {
			apiUrl: '/v1/user/list',
			showModal: '',

			pageOne: {
				currentPage: 1,
				totalPages: 10,
				cntpage: 10
			},
			new_password: '',
			user_search: '',
			selected1: 1,
			options1: [
				{ id: 1, text: '10' },
				{ id: 2, text: '20' },
				{ id: 3, text: '30' },
				{ id: 4, text: '50' },
				{ id: 5, text: '100' }
			],
			system_users_options: [
				{ value: 'Active', label: 'Active' },
				{ value: 'User Name', label: 'User Name' },
				{ value: 'User Type', label: 'User Type' },
				{ value: 'Role Name', label: 'Role Name' },
				{ value: 'Last Login Time', label: 'Last Login Time' },
				{ value: 'Action', label: 'Action' },
			],
			system_users_option: ['Active', 'User Name', 'User Type', 'Role Name', 'Last Login Time', 'Action'],
			showcolumns1: [true, true, true, true, true, true],
			carrier_users_options: [
				{ value: 'Active', label: 'Active' },
				{ value: 'User Name', label: 'User Name' },
				{ value: 'Carrier Name', label: 'Carrier Name' },
				{ value: 'Action', label: 'Action' },
			],
			carrier_users_option: ['Active', 'User Name', 'Carrier Name', 'Action'],
			showcolumns2: [true, true, true, true],
			online_users_options: [
				{ value: 'Active', label: 'Active' },
				{ value: 'User Name', label: 'User Name' },
				{ value: 'User Type', label: 'User Type' },
				{ value: 'Role Name', label: 'Role Name' },
				{ value: 'Action', label: 'Action' },
			],
			online_users_option: ['Active', 'User Name', 'User Type', 'Role Name', 'Action'],
			showcolumns3: [true, true, true, true, true],
			non_active_users_options: [
				{ value: 'Active', label: 'Active' },
				{ value: 'User Name', label: 'User Name' },
				{ value: 'Carrier Name', label: 'Carrier Name' },
				{ value: 'Action', label: 'Action' },
			],
			non_active_users_option: ['Active', 'User Name', 'Carrier Name', 'Action'],
			showcolumns4: [true, true, true, true],
			agent_list_options: [
				{ value: 'Active', label: 'Active' },
				{ value: 'User Name', label: 'User Name' },
				{ value: 'User Type', label: 'User Type' },
				{ value: 'Role Name', label: 'Role Name' },
				{ value: 'Action', label: 'Action' },
			],
			agent_list_option: ['Active', 'User Name', 'User Type', 'Role Name', 'Action'],
			showcolumns5: [true, true, true, true, true],
			users: [],
			url: '',
		}
	},
	methods: {
		fetchUsers(url) {
			this.loading = true;

			this.$http.get(url,
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(function (response) {
					this.loading = false;
					//todo: check success flag? validation errors?
					var users = response.body.payload.items;
					console.log(users);
					this.users = users;
					var total_page = response.body.payload.total;
					this.pageOne.currentPage = response.body.payload.page + 1;
					this.pageOne.totalPages = Math.ceil(response.body.payload.total / this.pageOne.cntpage);
					console.log("total pages => " + this.pageOne.totalPages);
				}, function (error) {
					this.loading = false;
					console.log(error);
				});
		},
		activateTab(tab) {
			var page = this.pageOne.currentPage - 1;
			var per_page = this.pageOne.cntpage;
			var user_type = "";
			var is_online = -1;
			var active = "";
			if (tab.name == "System Users") {
				user_type = "admin";
			} else if (tab.name == "Carrier Users") {
				user_type = "client";
			} else if (tab.name == "Online Users") {
				is_online = 1;
			} else if (tab.name == "Non-Active Users") {
				active = "false";
			} else if (tab.name == "Agent List") {
				user_type = "agent";
			}

			var url = api.getEndpointUrl() + this.apiUrl + "?order_by=user_id&order_dir=desc";
			if (this.user_type != '')
				url = url + "&user_type=" + user_type;
			if (this.is_online != -1)
				url = url + "&is_online" + is_online;
			if (this.active != '')
				url = url + "&active=" + active;

			this.url = url;
			url = url + "&page=" + page + "&per_page=" + per_page;

			this.fetchUsers(url);
		},
		handleChangeSystem() {
			if (_.indexOf(this.system_users_option, 'Active') != -1) {
				Vue.set(this.showcolumns1, 0, true);
			}
			else {
				Vue.set(this.showcolumns1, 0, false);
			}

			if (_.indexOf(this.system_users_option, 'User Name') != -1) {
				Vue.set(this.showcolumns1, 1, true);
			}
			else {
				Vue.set(this.showcolumns1, 1, false);
			}

			if (_.indexOf(this.system_users_option, 'User Type') != -1) {
				Vue.set(this.showcolumns1, 2, true);
			}
			else {
				Vue.set(this.showcolumns1, 2, false);
			}

			if (_.indexOf(this.system_users_option, 'Role Name') != -1) {
				Vue.set(this.showcolumns1, 3, true);
			}
			else {
				Vue.set(this.showcolumns1, 3, false);
			}

			if (_.indexOf(this.system_users_option, 'Last Login Time') != -1) {
				Vue.set(this.showcolumns1, 4, true);
			}
			else {
				Vue.set(this.showcolumns1, 4, false);
			}

			if (_.indexOf(this.system_users_option, 'Action') != -1) {
				Vue.set(this.showcolumns1, 5, true);
			}
			else {
				Vue.set(this.showcolumns1, 5, false);
			}
		},
		handleChangeCarrier() {
			if (_.indexOf(this.carrier_users_option, 'Active') != -1) {
				Vue.set(this.showcolumns2, 0, true);
			}
			else {
				Vue.set(this.showcolumns2, 0, false);
			}

			if (_.indexOf(this.carrier_users_option, 'User Name') != -1) {
				Vue.set(this.showcolumns2, 1, true);
			}
			else {
				Vue.set(this.showcolumns2, 1, false);
			}

			if (_.indexOf(this.carrier_users_option, 'Carrier Name') != -1) {
				Vue.set(this.showcolumns2, 2, true);
			}
			else {
				Vue.set(this.showcolumns2, 2, false);
			}

			if (_.indexOf(this.carrier_users_option, 'Action') != -1) {
				Vue.set(this.showcolumns2, 3, true);
			}
			else {
				Vue.set(this.showcolumns2, 3, false);
			}
		},
		handleChangeOnline() {
			if (_.indexOf(this.online_users_option, 'Active') != -1) {
				Vue.set(this.showcolumns3, 0, true);
			}
			else {
				Vue.set(this.showcolumns3, 0, false);
			}

			if (_.indexOf(this.online_users_option, 'User Name') != -1) {
				Vue.set(this.showcolumns3, 1, true);
			}
			else {
				Vue.set(this.showcolumns3, 1, false);
			}

			if (_.indexOf(this.online_users_option, 'User Type') != -1) {
				Vue.set(this.showcolumns3, 2, true);
			}
			else {
				Vue.set(this.showcolumns3, 2, false);
			}

			if (_.indexOf(this.online_users_option, 'Role Name') != -1) {
				Vue.set(this.showcolumns3, 3, true);
			}
			else {
				Vue.set(this.showcolumns3, 3, false);
			}

			if (_.indexOf(this.online_users_option, 'Action') != -1) {
				Vue.set(this.showcolumns3, 4, true);
			}
			else {
				Vue.set(this.showcolumns3, 4, false);
			}
		},
		handleChangeNonActive() {
			if (_.indexOf(this.non_active_users_option, 'Active') != -1) {
				Vue.set(this.showcolumns4, 0, true);
			}
			else {
				Vue.set(this.showcolumns4, 0, false);
			}

			if (_.indexOf(this.non_active_users_option, 'User Name') != -1) {
				Vue.set(this.showcolumns4, 1, true);
			}
			else {
				Vue.set(this.showcolumns4, 1, false);
			}

			if (_.indexOf(this.non_active_users_option, 'Carrier Name') != -1) {
				Vue.set(this.showcolumns4, 2, true);
			}
			else {
				Vue.set(this.showcolumns4, 2, false);
			}

			if (_.indexOf(this.non_active_users_option, 'Action') != -1) {
				Vue.set(this.showcolumns4, 3, true);
			}
			else {
				Vue.set(this.showcolumns4, 3, false);
			}
		},
		handleChangeAgent() {
			if (_.indexOf(this.agent_list_option, 'Active') != -1) {
				Vue.set(this.showcolumns5, 0, true);
			}
			else {
				Vue.set(this.showcolumns5, 0, false);
			}

			if (_.indexOf(this.agent_list_option, 'User Name') != -1) {
				Vue.set(this.showcolumns5, 1, true);
			}
			else {
				Vue.set(this.showcolumns5, 1, false);
			}

			if (_.indexOf(this.agent_list_option, 'User Type') != -1) {
				Vue.set(this.showcolumns5, 2, true);
			}
			else {
				Vue.set(this.showcolumns5, 2, false);
			}

			if (_.indexOf(this.agent_list_option, 'Role Name') != -1) {
				Vue.set(this.showcolumns5, 3, true);
			}
			else {
				Vue.set(this.showcolumns5, 3, false);
			}

			if (_.indexOf(this.agent_list_option, 'Action') != -1) {
				Vue.set(this.showcolumns5, 4, true);
			}
			else {
				Vue.set(this.showcolumns5, 4, false);
			}
		},
		pageOneChanged(pageNum) {
			if (pageNum !== this.pageOne.currentPage) {
				this.pageOne.currentPage = pageNum

				var countperpage = this.pageOne.cntpage;
				var page = this.pageOne.currentPage - 1;

				var url = this.url;
				url = url + "&page=" + page + "&per_page=" + countperpage;
				
				this.nextTick(() => {
					this.fetchUsers(url);
				});
			}
		},
		changePageCount (countPerPage) {
			if (countPerPage !== this.pageOne.cntpage) {
				this.pageOne.cntpage = countPerPage

				var countperpage = this.pageOne.cntpage;
				var page = this.pageOne.currentPage - 1;

				var url = this.url;
				url = url + "&page=" + page + "&per_page=" + countPerPage;

				this.nextTick(() => {
					this.fetchUsers(url);
				});

			}
		},
		closeModal: function () {
			this.showModal = '';
		},
		submitNewPass: function () {

		},
	},
	mounted: function () {
		$('[data-toggle="tooltip"]').tooltip();
	},
	updated: function () {
		var elementList = document.querySelectorAll('.el-input > input');
		for (var index = 0; index < elementList.length; index++) {
			console.log(elementList);
			elementList[index].placeholder = 'Show/Hide Columns';
		}
	}
}
</script>

<style>
.tabs.user_tabs .dnl_group,
.tabs.user_tabs .dnl_user {
	font-size: 16px;
}

.tabs.user_tabs .dnl_remove-user {
	font-size: 19px;
	vertical-align: sub;
}

.tabs.user_tabs .dnl_list {
	margin-right: 3px
}

a.action.action_key {
	font-size: 14px;
	vertical-align: bottom;
	padding-top: 5px;
}

table.table.table-striped.table-hover.user_management td,
table.table.table-striped.table-hover.user_management th {
	padding-right: 8px;
	text-align: left;
	vertical-align: middle;
}

table.table.table-striped.table-hover.user_management td.text-center {
	text-align: center;
}

.width_110 {
	width: 110px;
}

.width_140 {
	width: 140px;
}

.user_management_wrapper .select2 {
	width: 180px !important;
}

.width_78 {
	width: 78px;
}

table.table.table-striped.table-hover.user_management tr:hover {
	background: #73767b;
}

.user_management .checkbox-success input[type="checkbox"]:checked+label::before {
	background-color: #03c0fc;
	border-color: #03c0fc;
}

.user_management .checkbox-success {
	margin-bottom: -6px;
}

@media (max-width: 767px) {}

@media (max-width: 480px) {}

.el-select__tags {
	display: none;
}
</style>
