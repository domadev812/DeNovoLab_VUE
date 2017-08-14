<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a>Management</a>
					</li>
					<li class="breadcrumb-item active">Registration</li>
				</ol>
				<h1 class="page-header">Registration</h1>
				<confirm v-show="showModal" @close="showModal = false" @submit="submit"></confirm>
				<div class="white_pad table_wrap">
					<div class="advanced_search_filter_panel bottom_0">
						<div class="inline-block">
							<label>Status:</label>
							<br>
							<select2 :options="status_options" v-model="status">
							</select2>
						</div>
						<div class="inline-block search_wrapper">
							<label>Registration Time:</label>
							<br>
							<el-date-picker style="width: 100%;" type="datetime" v-model="start_date_time" :picker-options="{}" placeholder="Enter Registration Time"></el-date-picker>
						</div>
						<div class="inline-block tilda">~</div>
						<div class="inline-block search_wrapper">
							<label></label>
							<br>
							<el-date-picker style="width: 100%;" type="datetime" v-model="end_date_time" :picker-options="{}" placeholder="Enter Registration Time"></el-date-picker>
						</div>
						<div class="inline-block">
							<a class="btn btn-primary">
								Query
							</a>
						</div>
					</div>
					<div class="clearfix"></div>
					<div class="pull-right pagination top_pagination">
						<pagination :current-page="pageOne.currentPage" :total-pages="pageOne.totalPages" @page-changed="pageOneChanged">
						</pagination>
					</div>
					<div class="table_filters m-top-15">
						<div class="inline-block select_min_wrapper">
							<span class="inline-block">Page row:</span>
							<select2 :options="options1" v-model="selected1" class="inline-block" @pagecount="changePageCount">
							</select2>
						</div>
						<div class="inline-block">
							<el-select v-model="reg_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
								<el-option v-for="item in reg_table_column_options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="clearfix"></div>
					<div class="table-responsive">
						<table class="table table-striped table-hover aliases credits">
							<thead>
								<tr>
									<th v-if="showcolumns[0]">Username
										<span class="dnl_icon dnl_sort pull-right"></span>
									</th>
									<th v-if="showcolumns[1]">Main E-mail Address</th>
									<th v-if="showcolumns[2]">Company Name</th>
									<th v-if="showcolumns[3]">Referral</th>
									<th v-if="showcolumns[4]">Client Name</th>
									<th v-if="showcolumns[5]">Phone Number</th>
									<th v-if="showcolumns[6]">Registration Time</th>
									<th v-if="showcolumns[7]">Operation Time</th>
									<th v-if="showcolumns[8]">Status</th>
									<th v-if="showcolumns[9]" class="width_138">Action</th>
								</tr>
							</thead>
							<tbody>
								<tr v-if="!filterBy(users, reg_time).length">
									<td style="text-align: center" colspan="10">No Data Found</td>
								</tr>										
								
								<tr v-for="user in filterBy(users, reg_time)">
									<td v-if="showcolumns[0]">{{user.username}}</td>
									<td v-if="showcolumns[1]">{{user.main_email}}</td>
									<td v-if="showcolumns[2]">{{user.company}}</td>
									<td v-if="showcolumns[3]">{{user.referral}}</td>
									<td v-if="showcolumns[4]">{{user.client_name}}</td>
									<td v-if="showcolumns[5]">{{user.billing_phone}}</td>
									<td v-if="showcolumns[6]">{{user.signed_up_on}}</td>
									<td v-if="showcolumns[7]">{{user.modified_on}}</td>
									<td v-if="showcolumns[8]">{{user.status}}</td>
									<td v-if="showcolumns[9]">
										<a class="action action_disable" data-toggle="tooltip" data-placement="top" title="Approve" v-on:click="approve_user(user.id)">
											<span class="dnl_icon dnl_check"></span>
										</a>
										<router-link to="" class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" @click.native="edit_user(user.id)">
											<span class="dnl_icon dnl_action_edit"></span>
										</router-link>
										<a class="action action_reject" data-toggle="tooltip" data-placement="top" title="Reject" v-on:click="reject_user(user.id)">
											<span class="dnl_icon dnl_disabled"></span>
										</a>
										<a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="delete_user(user.id)">
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
	modal = require('vue!../main_components/modal.vue'),
	confirmmodal = require('vue!../main_components/confirm_delete.vue');
const api = require("../../api");
const auth = require("../../auth");
	_ = require('lodash');
	import {mapGetters,	mapActions} from 'vuex'

module.exports = {
	components: {
		'select2': vSelect,
		'pagination': Pagination,
		'modal': modal,
		'confirm': confirmmodal,
	},
	data: function () {
		return {
			apiUrl: '/v1/registration/list',
			start_date_time: '',
			end_date_time: '',
			checker: '',
			showModal: '',
			start_date: '',
			end_date: '',
			ftp_config_name: '',
			pageOne: {
				currentPage: 1,
				totalPages: 10,
				cntpage: 10,
			},
			selected1: 1,
			options1: [
				{ id: 1, text: '10' },
				{ id: 2, text: '20' },
				{ id: 3, text: '30' },
				{ id: 4, text: '50' },
				{ id: 5, text: '100' }
			],
			status: 'all',
			status_options: [
				{ id: 'all', text: 'All' },
				{ id: 'registration', text: 'Registration' },
				{ id: 'approved', text: 'Approved' },
				{ id: 'rejected', text: 'Rejected' }
			],
			users: [],
			selected_ids: [],
			reg_table_column_options: [{
				value: 'Username',
				label: 'Username'
			}, {
				value: 'Main E-mail Address',
				label: 'Main E-mail Address'
			}, {
				value: 'Company Name',
				label: 'Company Name'
			}, {
				value: 'Referral',
				label: 'Referral'
			}, {
				value: 'Client Name',
				label: 'Client Name'
			}, {
				value: 'Phone Number',
				label: 'Phone Number'
			}, {
				value: 'Registration Time',
				label: 'Registration Time'
			}, {
				value: 'Operation Time',
				label: 'Operation Time'
			}, {
				value: 'Status',
				label: 'Status'
			}, {
				value: 'Action',
				label: 'Action'
			}],
			temp_reg_table_columns: ['Username', 'Main E-mail Address', 'Company Name', 'Referral', 'Client Name',
				'Phone Number', 'Registration Time', 'Operation Time', 'Status', 'Action'],
			reg_table_columns: ['Username', 'Main E-mail Address', 'Company Name', 'Referral', 'Client Name',
				'Phone Number', 'Registration Time', 'Operation Time', 'Status', 'Action'],
			showcolumns: [true, true, true, true, true, true, true, true, true, true],
		}
	},
	methods: {
		...mapActions({
			setAsyncConfirm: 'async_confirm/setAsyncConfirm',
			setMessage: 'app_message/setAppMessage'
		}),
		handleChange() {
			for(let i = 0; i < this.temp_reg_table_columns.length; i++) {
				if (_.indexOf(this.reg_table_columns, this.temp_reg_table_columns[i]) != -1) {
					Vue.set(this.showcolumns, i, true);
				}
				else {
					Vue.set(this.showcolumns, i, false);
				}
			}
		},
		submit: function () {
			var vm = this;
			this.showModal = false;

			this.selected_ids.forEach(function (item, i) {
				var userid = item;
				if (userid == 0) {
					vm.setMessage({
						message: 'The fraud detection has been not selected!',
						type: 'error'
					});
				}
				else {
					vm.loading = true;
					vm.resource = vm.$resource(api.getEndpointUrl() + '/v1/regisrtation/' + userid);
					vm.resource.delete({ id: userid }).then(function (response) {
						vm.loading = false;
						let index = _.findIndex(vm.users, elem => elem.id  === userid)
						vm.users.splice(index, 1)
						vm.setMessage('The user have been deleted!')
					});
				}
			});
		},
		reject_user: function (id) {
			this.loading = true;
			this.$http.patch(api.getEndpointUrl() + '/v1/registration/' + id + '/approve/',
				{
					"status": "rejected",
				},
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}
			).then(
				function (response) {
					console.log("success");
					console.log(response);
					this.loading = false;
					this.setMessage('The user has been rejected!');
				},
				function (response) {
						var thisvm = this;
						this.loading = false;
						console.log(response);

						this.setMessage({
							message: "Rejecting user is failed!",
							type: 'error'
						});
				}
			)
		},
		approve_user: function (id) {
			this.loading = true;
			this.$http.patch(api.getEndpointUrl() + '/v1/registration/' + id + '/approve/',
				{
					"status": "approved",
				},
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}
			).then(
				function (response) {
					console.log("success");
					console.log(response);
					this.loading = false;

					let index = _.findIndex(this.users, elem => elem.id  === id)
					this.users[index].status = "new";
					this.setMessage('The user have been deleted!')
				},
				function (response) {
						var thisvm = this;
						this.loading = false;
						console.log(response);

						this.setMessage({
							message: "Approving user is failed!",
							type: 'error'
						});
				}
			)
		},
		delete_user: function (id) {
			this.showModal = true;
			this.selected_ids = [];
			this.selected_ids.push(id);
		},
		edit_user: function (id) {
			this.$router.push({ path: "/management/registration/user_description/" + id });
		},
		fetchUsers() {
			var page = this.pageOne.currentPage - 1;
			var per_page = this.pageOne.cntpage;
			console.log("page => " + page + " , per_page => " + per_page);
			this.loading = true;

			this.$http.get(api.getEndpointUrl() + this.apiUrl + "?page=" + page + "&per_page=" + per_page + "&order_by=id&order_dir=desc",
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
				this.$nextTick(this.fetchUsers)
			}
		},
		changePageCount (countPerPage) {
			if (countPerPage !== this.pageOne.cntpage) {
				this.pageOne.cntpage = countPerPage
				this.$nextTick(this.fetchUsers)
			}
		},
		closeModal: function () {
			this.showModal = '';
		}
	},
	mounted: function () {
		$('[data-toggle="tooltip"]').tooltip();
	},
	updated: function () {
		document.querySelector('.el-select > .el-input > input').placeholder = 'Show/Hide Columns';
	},
	created: function () {
		this.fetchUsers();
	}
}
</script>

<style>
.inline-block.tilda {
	width: 15px;
}

a.action.action_reject {
	font-size: 16px;
	vertical-align: top;
	padding-top: 4px;
	padding-left: 4px;
}

@media (max-width: 767px) {
	.inline-block.tilda {
		width: 15px;
		margin: 0 auto;
		display: block;
		margin-bottom: -8px !important;
	}
}

.el-select__tags {
	display: none;
}

</style>
