<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="#">Configuration</a>
					</li>
					<li class="breadcrumb-item active">FTP Configuration</li>
				</ol>
				<h1 class="page-header">FTP Configuration</h1>
				<confirm v-show="showModal" @close="showModal = false" @submit="submit"></confirm>
				<div class="btn-group" role="group">
					<button class="btn btn-default inline_fixer" @click="createNew">
						<span class="dnl_icon dnl_add"></span> Create New
					</button>
					<button type="button" class="btn btn-default">
						<span class="dnl_icon dnl_trigger"></span> Trigger Selected
					</button>
					<button type="button" class="btn btn-default" @click="delete_selected()">
						<span class="dnl_icon dnl_action_delete"></span> Delete Selected
					</button>
					<button type="button" class="btn btn-default">
						<span class="dnl_icon dnl_check"></span> Deactivate All
					</button>
					<button type="button" class="btn btn-default">
						<span class="dnl_icon dnl_tick"></span> Deactivate Selected
					</button>
				</div>
				<div class="white_pad table_wrap">
					<div class="advanced_search_filter_panel bottom_0">
						<div class="inline-block search_wrapper">
							<label>Name:</label>
							<br>
							<input type="text" name="client_list_search" v-model="ftp_list_search" class="form-control inline-block search_field" placeholder="Enter FTP Alias Name">
							<span class="dnl_icon dnl_musica-searcher"></span>
						</div>
						<div class="inline-block">
							<!--<label>Type:</label>-->
							<br>
							<!--<select2 :options="options2" v-model="selected2">
								<option disabled value="0">Show/Hide Columns</option>
							</select2>-->
							<el-select v-model="config_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
								<el-option v-for="item in config_table_column_options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
						<!--<div class="inline-block">
							<label>Terms:</label>
							<br>
							<select2 :options="options2" v-model="selected2">
								<option disabled value="0">Show/Hide Columns</option>
							</select2>
						</div>-->
					</div>
					<div class="pull-left">
						<i v-show="loading" class="fa fa-spinner fa-spin" style="font-size:20px;"></i>
					</div>
					<div class="pull-right pagination top_pagination">
						<pagination :current-page="pageOne.currentPage" :total-pages="pageOne.totalPages" @page-changed="pageOneChanged">
						</pagination>
					</div>
					<div class="clearfix"></div>
					<div class="table-responsive">
						<table class="table table-striped table-hover agents">
							<thead>
								<tr>
									<th class="width-65">
										<div class="checkbox checkbox-success">
											<input id="select_all" name="select_all" type="checkbox" v-model="checker" v-on:click="clickSelectedAll">
											<label for="select_all"></label>     
										</div>
									</th>
									<th v-if="showcolumns[0]">Alias
										<span class="dnl_icon dnl_sort pull-right"></span>
									</th>
									<th v-if="showcolumns[1]" class="width_138">Active</th>
									<th v-if="showcolumns[2]" class="width_190">Action</th>
								</tr>
							</thead>
							<tbody>
								<tr v-if="!filterBy(aliases, ftp_list_search).length">
									<td style="text-align: center" colspan="4">No Data Found</td>
								</tr>
								<tr v-for="alias in filterBy(aliases, ftp_list_search)">
									<td class="centred_checkbox">
										<div class="checkbox checkbox-success">
											<input v-bind:id="'selected-' + index" v-bind:name="'selected-' + index" type="checkbox" v-model="alias.selected">
											<label v-bind:for="'selected-' + index"></label>
										</div>
									</td>
									
									<td v-if="showcolumns[0]">{{alias.name}}</td>
									<td v-if="showcolumns[1]">
										<div class="checkbox checkbox-success">
											<input :id="alias.alias" :name="alias.alias" type="checkbox" v-model="alias.active" disabled readonly>
											<label :for="alias.alias"></label>
										</div>
									</td>
									<td v-if="showcolumns[2]">
										<a class="action action_test" data-toggle="tooltip" data-placement="top" title="Test">
											<span class="dnl_icon dnl_test"></span>
										</a>
										<a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" v-on:click="edit_ftp(alias.id);">
											<span class="dnl_icon dnl_action_edit"></span>
										</a>
										<a class="action action_copy" data-toggle="tooltip" data-placement="top" title="Copy" @click="showModal='copy'; copy_ftp_table = alias">
											<span class="dnl_icon dnl_copy"></span>
										</a>
										<a class="action action_trigger" data-toggle="tooltip" data-placement="top" title="Trigger" @click="showModal = 'trigger'">
											<span class="dnl_icon dnl_trigger"></span>
										</a>
										<a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="delete_ftp(alias.id)">
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
	
		<modal v-if="showModal=='trigger'" @close="showModal = ''">
			<h3 slot="header">Trigger</h3>
			<div slot="body">
				<div class="">
					<form class="form">
						<div class="form-group">
							<label for="start_date">Start Date:</label>
							<input type="text" name="start_date" v-model="start_date" class="form-control" placeholder="Enter start date">
						</div>
						<div class="form-group">
							<label for="end_date">End Date:</label>
							<input type="text" name="end_date" v-model="end_date" class="form-control" placeholder="Enter end date">
						</div>
						<div class="form-group">
							<label>Time Zone:</label>
							<select2 :options="time_zone_options" v-model="time_zone" class="inline-block">
							</select2>
						</div>
						<div class="form-group">
							<label>File Breakdown:</label>
							<select2 :options="file_options" v-model="file_breakdown" class="inline-block">
							</select2>
						</div>
					</form>
				</div>
			</div>
			<div slot="footer">
				<button class="btn btn-primary submit">Submit</button>
				<button @click="closeModal" class="btn btn-default cancel">Cancel</button>
			</div>
		</modal>
	
		<modal v-else-if="showModal=='copy'" @close="showModal = ''">
			<h3 slot="header">Copy FTP Config</h3>
			<div slot="body">
				<div class="">
					<form class="form">
						<div class="form-group">
							<label for="ftp_config_name">FTP Config Name:</label>
							<input type="text" name="ftp_config_name" class="form-control" placeholder="Enter FTP Config Name" v-model="ftp_config_name">
						</div>
					</form>
				</div>
			</div>
			<div slot="footer">
				<button class="btn btn-primary submit" @click="copyFTPTable">Submit</button>
				<button @click="closeModal" class="btn btn-default cancel">Cancel</button>
			</div>
		</modal>
	</div>
</template>

<script>   
const vSelect = require('vue!../main_components/select.vue'),
	Pagination = require('vue!../main_components/pagination.vue'),
	confirmmodal = require('vue!../main_components/confirm_delete.vue'),
	modal = require('vue!../main_components/modal.vue');
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
			copy_ftp_table: {},
			ftp_config_name: '',
			selected_ids: [],
			showModal: '',
			resource: null,
			apiUrl: '/v1/config/ftp/list',
			ftp_list_search: '',
			checker: '',
			start_date: '',
			end_date: '',
			ftp_config_name: '',
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
				{ id: 1, text: 'Alias' },
				{ id: 2, text: 'Active' },
				{ id: 3, text: 'Actions' }
			],
			selected_group: [],
			file_breakdown: 2,
			file_options: [
				{ id: 1, text: 'As one big file' },
				{ id: 2, text: 'As hourly file' },
				{ id: 3, text: 'As daily file' },
			],
			time_zone: 12,
			time_zone_options: [
				{ id: 1, text: 'GMT -12:00' },
				{ id: 2, text: 'GMT -11:00' },
				{ id: 3, text: 'GMT -10:00' },
				{ id: 4, text: 'GMT -9:00' },
				{ id: 5, text: 'GMT -8:00' },
				{ id: 6, text: 'GMT -7:00' },
				{ id: 7, text: 'GMT -6:00' },
				{ id: 8, text: 'GMT -5:00' },
				{ id: 9, text: 'GMT -4:00' },
				{ id: 10, text: 'GMT -3:00' },
				{ id: 11, text: 'GMT -2:00' },
				{ id: 12, text: 'GMT -1:00' },
				{ id: 13, text: 'GMT +0:00' },
				{ id: 14, text: 'GMT +1:00' },
				{ id: 15, text: 'GMT +2:00' },
				{ id: 16, text: 'GMT +3:00' },
				{ id: 17, text: 'GMT +4:00' },
				{ id: 18, text: 'GMT +5:00' },
				{ id: 19, text: 'GMT +6:00' },
				{ id: 20, text: 'GMT +7:00' },
				{ id: 21, text: 'GMT +8:00' },
				{ id: 22, text: 'GMT +9:00' },
				{ id: 23, text: 'GMT +10:00' },
				{ id: 24, text: 'GMT +11:00' },
				{ id: 25, text: 'GMT +12:00' },
			],
			aliases: [],
			config_table_column_options: [{
				value: 'Alias',
				label: 'Alias'
			}, {
				value: 'Active',
				label: 'Active'
			}, {
				value: 'Action',
				label: 'Action'
			}],
			config_table_columns: ['Alias', 'Active', 'Action'],
			showcolumns: [true, true, true],
		}
	},
	computed: {
		selectAll: {
			get: function () {
				console.log("get function called");
				return this.aliases ? this.selected_group.length == this.aliases.length : false;
			},
			set: function (value) {
				var selected = [];

				if (value) {
					this.aliases.forEach(function (aliase) {
						selected.push(aliase.id);
					});
				}

				this.selected_group = selected;
			}
		}
	},
	methods: {
		...mapActions({
			setAsyncConfirm: 'async_confirm/setAsyncConfirm',
			setMessage: 'app_message/setAppMessage'
		}),
		fetchFtps() {
			this.loading = true;
			var page = this.pageOne.currentPage - 1;
			var per_page = this.pageOne.cntpage;
			this.$http.get(api.getEndpointUrl() + this.apiUrl + "?page=" + page + "&per_page=" + per_page + "&order_by=alias&order_dir=",
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(function (response) {
					//todo: check success flag? validation errors?
					this.loading = false;
					var ftp_lists = response.body.payload.items;
					this.aliases = ftp_lists;
					var total_page = response.body.payload.total;
					this.pageOne.currentPage = response.body.payload.page + 1;
					this.pageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
				}, function (error) {
					this.loading = false;
					console.log(error);
				}
			);
		},
		handleChange() {
			if (_.indexOf(this.config_table_columns, 'Alias') != -1) {
				// this.showcolumns[0] = true;
				Vue.set(this.showcolumns, 0, true);
			}
			else {
				// this.showcolumns[0] = false;
				Vue.set(this.showcolumns, 0, false);
			}

			if (_.indexOf(this.config_table_columns, 'Active') != -1) {
				// this.showcolumns[1] = true;
				Vue.set(this.showcolumns, 1, true);
			}
			else {
				// this.showcolumns[1] = false;
				Vue.set(this.showcolumns, 1, false);
			}

			if (_.indexOf(this.config_table_columns, 'Action') != -1) {
				// this.showcolumns[2] = true;
				Vue.set(this.showcolumns, 2, true);
			}
			else {
				// this.showcolumns[2] = false;
				Vue.set(this.showcolumns, 2, false);
			}

			console.log(this.showcolumns);

			// this.$nextTick(() => {
			// 	document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
			// });
		},
		pageOneChanged(pageNum) {
			if (pageNum !== this.pageOne.currentPage) {
				this.pageOne.currentPage = pageNum
				this.$nextTick(this.fetchFtps)
			}
		},
		changePageCount (countPerPage) {
			if (countPerPage !== this.pageOne.cntpage) {
				this.pageOne.cntpage = countPerPage
				this.$nextTick(this.fetchFtps)
			}
		},
		closeModal: function () {
			this.showModal = '';
		},
		delete_ftp: function (id) {
			this.showModal = true;
			this.selected_ids = [];
			this.selected_ids.push(id);
		},
		clickSelectedAll: function() {
			if(this.checker) {
				this.aliases.forEach(function(list, i){
					list.selected = true;
				});
			}
			else {
				this.aliases.forEach(function(list, i){
					list.selected = false;
				});
			}
		},
		submit: function () {
			var vm = this;
			this.showModal = false;

			this.selected_ids.forEach(function (item, i) {
				var ftpid = item;
				if (ftpid == 0) {
					vm.setMessage({
						message: 'The ftp configuration has been not selected!',
						type: 'error'
					});
				}
				else {
					vm.loading = true;
					vm.resource = vm.$resource(api.getEndpointUrl() + '/v1/config/ftp/' + ftpid);
					vm.resource.delete({ id: ftpid }).then(function (response) {
						vm.loading = false;

						let index = _.findIndex(vm.aliases, elem => elem.id  === ftpid)
						vm.aliases.splice(index, 1)
						vm.setMessage('The ftp configuration have been deleted!')
					});
				}
			});
		},
		edit_ftp: function (id) {
			this.$router.push({ path: "/configuration/ftp_configuration/edit/" + id });
		},
		createNew: function() {
			this.$router.push({ path: "/configuration/ftp_configuration/new"});
		},
		delete_selected: function () {
            console.log("delete selected items");
            this.selected_ids = [];
            var vm = this;
            this.aliases.forEach(function (alias, i) {
                if (alias.selected == true) {
                    vm.selected_ids.push(alias.ref_id);
                }
            });

            if (this.selected_ids.length == 0) {
                this.setMessage({
                    message: 'The item has been not selected!',
                    type: 'error'
                });
                this.checker = false;

                return;
            }

            this.showModal = true;
            if (this.checker)
                this.checker = false;
		},
		copyFTPTable: function () {
			this.closeModal();
			console.log("copyFTPTable");
			this.copy_ftp_table.name = this.ftp_config_name;
			console.log(this.copy_ftp_table);

			this.$http.post(api.getEndpointUrl() + '/v1/config/ftp/create',
				{
					"active": this.copy_ftp_table.active,
					"name": this.copy_ftp_table.name,
					"frequency": this.copy_ftp_table.frequency,
					"time": this.copy_ftp_table.time,
					"max_line_per_file": this.copy_ftp_table.max_line_per_file,
					"file_breakdown": this.copy_ftp_table.file_breakdown,
					"include_header": this.copy_ftp_table.include_header,
					"compression": this.copy_ftp_table.compression,
					"non_zero": this.copy_ftp_table.non_zero,
					"orig_return_code": this.copy_ftp_table.orig_return_code,
					"term_return_code": this.copy_ftp_table.term_return_code,
					"ftp_server_ip": this.copy_ftp_table.ftp_server_ip,
					"ftp_server_port": this.copy_ftp_table.ftp_server_port,
					"ftp_directory": this.copy_ftp_table.ftp_directory,
					"ftp_username": this.copy_ftp_table.ftp_username,
					"ftp_password": this.copy_ftp_table.ftp_password,
					"include_fields": this.copy_ftp_table.include_fields,
					"egress_trunks": this.copy_ftp_table.egress_trunks,
					"ingress_trunks": this.copy_ftp_table.ingress_trunks,
				},
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}
			).then(
				function (response) {
					this.loading = false;
					console.log(response);
					this.setMessage('The ftp configuration has been created!');
				},
				function (response) {
					this.loading = false;
					console.log(response);
					this.setMessage({
						message: "Creating ftp configuration is failed!",
						type: 'error'
					});
				}
			);
		},
	},
	created: function () {
		this.fetchFtps();
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
a.action.action_copy {
	font-size: 13px;
	vertical-align: top;
	line-height: 24px;
	font-weight: 100;
}

a.action.action_trigger {
	font-size: 16px;
	vertical-align: top;
	line-height: 30px;
	padding-left: 7px;
}

table.table.table-striped.table-hover.aliases td,
table.table.table-striped.table-hover.aliases th {
	padding-right: 0;
	text-align: center;
	vertical-align: middle;
}

.table-responsive table.table.table-striped.table-hover.aliases td:first-child,
.table-responsive table.table.table-striped.table-hover.aliases td:nth-child(2),
.table-responsive table.table.table-striped.table-hover.aliases th:nth-child(2) {
	text-align: left;
}

table.table.table-striped.table-hover.aliases td .checkbox {
	padding-left: 20px;
	margin-top: 6px;
	margin-bottom: 0;
}

table.table.table-striped.table-hover.aliases tr:hover {
	background: #73767b;
}

th.width_190 {
	width: 190px;
}

.select2-container--open {
	z-index: 9998;
}

.modal-body .select2 {
	width: 100% !important;
}

.configuration_pad .button_set.little-space .btn {
	width: 155px;
}

.configuration_pad .button_set.little-space .btn-primary {
	margin-right: 5px;
}

.advanced_search_filter_panel.bottom_0 {
	margin-bottom: 0;
}

.btn-group .btn.btn-default span.dnl_icon.dnl_trigger {
	float: left;
	margin-top: 3px;
	margin-bottom: -3px;
}

a.btn.btn-default.inline_fixer {
	padding-top: 10px;
}


@media (max-width: 767px) {
	.pull-right.pagination.top_pagination {
		margin: 15px auto 20px auto;
	}
}

.el-select__tags {
	display: none;
}
</style>
