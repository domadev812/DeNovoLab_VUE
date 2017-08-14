<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="#">Configuration</a>
					</li>
					<li class="breadcrumb-item active">Email Sender</li>
				</ol>
				<h1 class="page-header">Email Sender</h1>
				<i v-show="loading" class="fa fa-spinner fa-spin" style="font-size:20px;"></i>
				<div class="white_pad table_wrap">
					<div class="table_filters">
						<div class="inline-block select_min_wrapper">
							<span class="inline-block">Page row:</span>
							<select2 :options="options1" v-model="selected1" class="inline-block" @pagecount="changepage">
							</select2>
						</div>
						<div class="inline-block">
							<!--<select2 :options="options2" v-model="selected2">
	
							</select2>-->
							<el-select v-model="sender_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
								<el-option v-for="item in sender_table_column_options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
						<router-link to="/configuration/email_sender/new" class="btn btn-primary mini pull-right">
							<span class="dnl_icon dnl_add"></span> Create new
						</router-link>
					</div>
					<div class="table-responsive">
						<table class="table table-striped table-hover mail_sender">
							<thead>
								<tr>
									<th v-if="showcolumns[0]" class="nowrap">Name</th>
									<th v-if="showcolumns[1]" class="nowrap">Mail Server</th>
									<th v-if="showcolumns[2]" class="nowrap">Mail Port</th>
									<th v-if="showcolumns[3]" class="nowrap">Username</th>
									<th v-if="showcolumns[4]" class="nowrap">Password</th>
									<th v-if="showcolumns[5]" class="nowrap">Authentication</th>
									<th v-if="showcolumns[6]" class="nowrap">Secure</th> 
									<th v-if="showcolumns[7]" class="nowrap">Email Address</th>
									<th v-if="showcolumns[8]" class="nowrap">Last Modified On</th> 
									<th v-if="showcolumns[9]" class="nowrap">Modified By</th> 
									<th v-if="showcolumns[10]" class="nowrap width_138">Action</th>
								</tr>
							</thead>
							<tbody>
								<tr v-if="!mail_senders.length">
									<td style="text-align: center" colspan="8">No Data Found</td>
								</tr>
								<tr v-for="mail_sender in mail_senders">
									<td v-if="showcolumns[0]">{{mail_sender.name}}</td>
									<td v-if="showcolumns[1]">{{mail_sender.mail_server}}</td>
									<td v-if="showcolumns[2]">{{mail_sender.mail_port}}</td>
									<td v-if="showcolumns[3]">{{mail_sender.username}}</td>
									<td v-if="showcolumns[4]">*</td>
									<td v-if="showcolumns[5]">{{mail_sender.enable_auth == null ? true : mail_sender.enable_auth}}</td>
									<td v-if="showcolumns[6]">{{mail_sender.secure}}</td> 
									<td v-if="showcolumns[7]">{{mail_sender.email}}</td>
									<td v-if="showcolumns[8]">{{mail_sender.last_modified_on}}</td> 
									<td v-if="showcolumns[9]">{{mail_sender.modified_by}}</td> 
									<td v-if="showcolumns[10]">
										<a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Test" v-on:click.prevent="">
											<span class="dnl_icon dnl_test"></span>
										</a>
										<a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" v-on:click.prevent="edit_sender(mail_sender.id)">
											<span class="dnl_icon dnl_action_edit"></span>
										</a>
										<a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click.prevent="askDeleteConfirm(mail_sender.id)">
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
		<confirm-delete v-if="showConfirmDelete" @submit="delete_sender()" @close="declineDelete()"></confirm-delete>
	</div>
</template>

<script>
const vSelect = require('vue!../main_components/select.vue'),
	Pagination = require('vue!../main_components/pagination.vue');
const ConfirmDelete = require('vue!../main_components/confirm_delete.vue');
const api = require('../../api');
const auth = require("../../auth");
const _ = require('lodash');
const { mapActions } = require('vuex')
module.exports = {
	name: 'email_sender',
	components: {
		'select2': vSelect,
		'pagination': Pagination,
		'confirm-delete': ConfirmDelete
	},
	data() {
		return {
			apiUrl: '/v1/config/mail_sender/list',
			pageOne: {
				currentPage: 1,
				totalPages: 10,
				cntpage: 10
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
				{ id: 1, text: 'Name' },
				{ id: 2, text: 'Mail Server' },
				{ id: 3, text: 'Mail Port' },
				{ id: 4, text: 'Username' },
				{ id: 5, text: 'Password' },
				{ id: 6, text: 'Authentication' },
				// { id: 7, text: 'Secure' },
				{ id: 8, text: 'E-mail Address' },
				// { id: 9, text: 'Last Modified on' },
				// { id: 10, text: 'Modified by' },
				{ id: 11, text: 'Action' },
			],
			mail_senders: [],
			initial_response_received: false,
			showConfirmDelete: false,

			sender_table_column_options: [{
				value: 'Name',
				label: 'Name'
			}, {
				value: 'Mail Server',
				label: 'Mail Server'
			}, {
				value: 'Mail Port',
				label: 'Mail Port'
			}, {
				value: 'Username',
				label: 'Username'
			}, {
				value: 'Password',
				label: 'Password'
			}, {
				value: 'Authentication',
				label: 'Authentication'
			}, {
				value: 'Secure',
				label: 'Secure'
			}, {
				value: 'E-mail Address',
				label: 'E-mail Address'
			}, {
				value: 'Last Modified On',
				label: 'Last Modified On'
			}, {
				value: 'Modified By',
				label: 'Modified By'
			}, {
				value: 'Action',
				label: 'Action'
			}],
			temp_sender_table_columns: ['Name', 'Mail Server', 'Mail Port',
				'Username', 'Password', 'Authentication', 'Secure', 'E-mail Address', 'Last Modified On', 'Modified By', 'Action'],
			sender_table_columns: ['Name', 'Mail Server', 'Mail Port',
				'Username', 'Password', 'Authentication', 'Secure', 'E-mail Address', 'Last Modified On', 'Modified By', 'Action'],
			showcolumns: [true, true, true, true, true, true, true, true, true, true, true],

		}
	},
	created() {
		this.fetchInitialData()
	},
	methods: {
		...mapActions({
			setMessage: 'app_message/setAppMessage'
		}),
		fetchInitialData() {
			var page = this.pageOne.currentPage - 1;
			var per_page = this.pageOne.cntpage;
			this.loading = true;
			this.$http.get(api.getEndpointUrl() + this.apiUrl /*+"?page="+page+"&per_page="+per_page+"&order_by=name&order_dir="*/)
				.then(function (response) {
					const body = response.body
					if (body.success) {
						this.loading = false;
						const payload = body.payload
						const mail_lists = payload.items;
						this.mail_senders = mail_lists;

						const total_page = response.body.payload.total;
						this.pageOne.currentPage = response.body.payload.page + 1;
						this.pageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
					}
					this.initial_response_received = true
				}, function (error) {
					this.loading = false;
					console.log(error);
				});
		},
		pageOneChanged(pageNum) {
			this.pageOne.currentPage = pageNum;
			this.pageOne.cntpage = countperpage;
			var countperpage = countperpage;
			var page = this.pageOne.currentPage - 1;
			this.loading = true;
			this.$http.get(api.getEndpointUrl() + this.apiUrl)
				.then(function (response) {
					const body = response.body
					if (body.success) {
						this.loading = false;
						const payload = body.payload
						const mail_lists = payload.items;
						this.mail_senders = mail_lists;
						const total_page = payload.total;
						this.pageOne.currentPage = response.body.payload.page + 1;
						this.pageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
					}
				}, function (error) {
					this.loading = false;
					console.log(error);
				});
		},
		askDeleteConfirm(id) {
			this.senderIdToDelete = id
			this.showConfirmDelete = true
		},
		declineDelete() {
			this.senderIdToDelete = null
			this.showConfirmDelete = false
		},
		delete_sender() {
			this.showConfirmDelete = false
			const id = this.senderIdToDelete
			this.$http.delete(api.getEndpointUrl() + '/v1/config/mail_sender/' + id)
				.then(function (response) {
					if (response.body.success) {
						let index = _.findIndex(this.mail_senders, elem => elem.id === id)
						this.mail_senders.splice(index, 1)
						this.setMessage('Mail sender was removed successfully')
					}
				});
		},
		edit_sender(id) {
			this.$router.push({ path: "/configuration/email_sender/edit/" + id });
		},
		changepage(countperpage) {
			this.pageOne.cntpage = countperpage;
			var countperpage = countperpage;
			var page = this.pageOne.currentPage - 1;
			this.loading = true;
			this.$http.get(api.getEndpointUrl() + this.apiUrl + "?page=" + page + "&per_page=" + countperpage + "&order_by=name&order_dir=")
				.then(function (response) {
					this.loading = false;
					//todo: check success flag? validation errors?
					var mail_lists = response.body.payload.items;
					console.log(mail_lists);
					this.mail_senders = mail_lists;

					var total_page = response.body.payload.total;
					this.pageOne.currentPage = response.body.payload.page + 1;
					this.pageOne.totalPages = Math.ceil(response.body.payload.total / countperpage);
					console.log("total pages => " + this.pageOne.totalPages);
				}, function (error) {
					this.loading = false;
					console.log(error);
				});
		},
		handleChange() {
			for(let i = 0; i < this.temp_sender_table_columns.length; i++) {
				if (_.indexOf(this.sender_table_columns, this.temp_sender_table_columns[i]) != -1) {
					Vue.set(this.showcolumns, i, true);
				}
				else {
					Vue.set(this.showcolumns, i, false);
				}
			}
		},
	},
	mounted() {
		$('[data-toggle="tooltip"]').tooltip();
	},
	updated() {
		document.querySelector('.el-select > .el-input > input').placeholder = 'Show/Hide Columns';
	},
}
</script>

<style>
.table.table-striped.table-hover.mail_sender th,
.table.table-striped.table-hover.mail_sender td {
	text-align: left;
	vertical-align: middle;
	padding-right: 8px;
}

.table.table-striped.table-hover.mail_sender th:last-child,
.table.table-striped.table-hover.mail_sender td:last-child {
	text-align: center;
}

th.nowrap {
	white-space: nowrap;
}

table.table.table-striped.table-hover.mail_sender tr:hover {
	background: #73767b;
}

.w-80 {
	width: 80px;
	min-width: 80px;
}

.el-select__tags {
	display: none;
}
</style>
