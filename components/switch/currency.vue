<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="#">Switch</a>
					</li>
					<li class="breadcrumb-item active">Currency</li>
				</ol>
				<h1 class="page-header">Currency</h1>
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
							<el-select v-model="currency_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
								<el-option v-for="item in currency_table_column_options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
						<router-link to="/switch/currency/new" class="btn btn-primary mini pull-right">
							<span class="dnl_icon dnl_add"></span> Create new
						</router-link>
					</div>
					<div class="table-responsive">
						<confirm v-show="showModal=='deleteConfirm'" @close="showModal = ''" @submit="deleteCurrency"></confirm>
						<spinner v-show="loading" class="spinner"></spinner>
						<div v-show="loading" class="mask"></div>
						<table class="table table-striped table-hover aliases">
							<thead>
								<tr>
									<th v-if="showcolumns[0]">Name
										<span class="dnl_icon dnl_sort pull-right"></span>
									</th>
									<th v-if="showcolumns[1]">Rates</th>
									<th v-if="showcolumns[2]">Last Updated</th>
									<th v-if="showcolumns[3]">Usage Count</th>
									<th v-if="showcolumns[4]">Update by</th>
									<th v-if="showcolumns[5]" class="width-65">Active</th>
									<th v-if="showcolumns[6]" class="width_138">Action</th>
								</tr>
							</thead>
							<tbody>
								 <tr v-if="!items.length">
									<td style="text-align: center" colspan="7">No Data Found</td>
								</tr> 
								<!-- <p v-if="!items.length" class="no-result">No Data Found</p> -->
								<tr v-for="(item, index) in items">
									<td v-if="showcolumns[0]">{{item.code}}</td>
									<td v-if="showcolumns[1]">{{item.rate}}</td>
									<td v-if="showcolumns[2]">{{item.last_updated}}</td>
									<td v-if="showcolumns[3]">{{item.count}}</td>
									<td v-if="showcolumns[4]">{{item.update_by}}</td>
									<td v-if="showcolumns[5]" class="centred_checkbox">
										<div class="checkbox checkbox-success">
											<input :id="'item-'+index" :name="'item-'+index" type="checkbox" v-model="item.active">
											<label :for="'item-'+index"></label>
										</div>
									</td>
									<td v-if="showcolumns[6]">
										<a class="action action_info" data-toggle="tooltip" data-placement="top" title="View Change History" @click="showModal = 'show_history'">
											<span class="dnl_icon dnl_info"></span>
										</a>
										<a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" @click="editCurrency(item.currency_id)">
											<span class="dnl_icon dnl_action_edit"></span>
										</a>
										<a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" @click="showDeleteConfirm(item.currency_id)">
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
		<modal v-if="showModal=='show_history'" @close="showModal = ''" class="big_modal">
			<h3 slot="header">Change History</h3>
			<div slot="body">
				<div class="">
					<div class="table-responsive">
						<table class="table table-striped table-hover carrier_groups aligned-center">
							<thead>
								<tr>
									<th>Modified To</th>
									<th>Modified At</th>
									<th>Previous Rate</th>
								</tr>
							</thead>
							<tbody>
								<!-- <p v-if="!history_list.length" class="no-result">No Data Found</p> -->
								 <tr v-if="!history_list.length">
									<td style="text-align: center" colspan="3">No Data Found</td>
								</tr> 
								<tr v-for="history in history_list">
									<td>{{history.changes.new_value}}</td>
									<td>{{history.changes.field_name}}</td>
									<td>{{history.changes.old_value}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div slot="footer">
				<button @click="closeModal" class="btn btn-default cancel centered">Cancel</button>
			</div>
		</modal>
	</div>
</template>

<script>
	const vSelect = require('vue!../main_components/select.vue'),
		api = require("../../api"),
		auth = require("../../auth"),
		Pagination = require('vue!../main_components/pagination.vue'),
		confirmmodal = require('vue!../main_components/confirm_delete.vue'),
		vSpinner = require('vue!../main_components/fadeloader.vue'),
		modal = require('vue!../main_components/modal.vue');
	_ = require('lodash');
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	module.exports = {
		components: {
			'select2': vSelect,
			'pagination': Pagination,
			'spinner': vSpinner,
			'modal': modal,
			'confirm': confirmmodal
		},
		created: function() {
			this.fetchItems();
			this.fetchChangeHistory();
		},
		data: function() {
			return {
				history_list: [],
				items: [],
				showModal: '',
				ftp_config_name: '',
				selected_id: 1,
				loading: false,
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
				options2: [{
						id: 1,
						text: 'Alias'
					},
					{
						id: 2,
						text: 'Active'
					},
					{
						id: 3,
						text: 'Actions'
					}
				],
				currency_table_column_options: [{
					value: 'Name',
					label: 'Name'
				}, {
					value: 'Rates',
					label: 'Rates'
				}, {
					value: 'Last Updated',
					label: 'Last Updated'
				}, {
					value: 'Usage Count',
					label: 'Usage Count'
				}, {
					value: 'Update by',
					label: 'Update by'
				}, {
					value: 'Active',
					label: 'Active'
				}, {
					value: 'Action',
					label: 'Action'
				}],
				currency_table_columns: ['Name', 'Rates', 'Last Updated',
					'Usage Count', 'Update by', 'Active', 'Action'
				],
				showcolumns: [true, true, true, true, true, true, true],
			}
		},
		watch: {
			"selected1": function(value) {
				var value = this.options1[value];
				this.pageOne.cntpage = parseInt(value);
			}
		},
		methods: {
			...mapActions({
				setAsyncConfirm: 'async_confirm/setAsyncConfirm',
				setMessage: 'app_message/setAppMessage'
			}),
			getQueries() {
				const page = '?page=' + (this.pageOne.currentPage - 1)
				const per_page = '&per_page=' + this.pageOne.per_page
				const entity_name = '&entity_name=CurrencyUpdates'
				const revision_number = '&revision_number=0'
				const user_id = '&user_id=0'
				return page + per_page + entity_name + revision_number + user_id;
			},
			fetchChangeHistory () {
				const url = api.getEndpointUrl() + '/v1/log/revisions' + this.getQueries()
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						this.history_list = body.payload.items
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			fetchItems() {
				var page = this.pageOne.currentPage - 1;
				var per_page = this.pageOne.cntpage;
				console.log("page => " + page + " , per_page => " + per_page);
				this.loading = true;
				this.$http.get(api.getEndpointUrl() + '/v1/switch/currency/list' + "?page=" + page + "&per_page=" + per_page + "&order_by=currency_id&order_dir=desc", {
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(function(response) {
					this.loading = false;
					//todo: check success flag? validation errors?
					var items = response.body.payload.items;
					this.items = items;
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
				if (_.indexOf(this.currency_table_columns, 'Name') != -1) {
					Vue.set(this.showcolumns, 0, true);
				} else {
					Vue.set(this.showcolumns, 0, false);
				}
				if (_.indexOf(this.currency_table_columns, 'Rates') != -1) {
					Vue.set(this.showcolumns, 1, true);
				} else {
					Vue.set(this.showcolumns, 1, false);
				}
				if (_.indexOf(this.currency_table_columns, 'Last Updated') != -1) {
					Vue.set(this.showcolumns, 2, true);
				} else {
					Vue.set(this.showcolumns, 2, false);
				}
				if (_.indexOf(this.currency_table_columns, 'Usage Count') != -1) {
					Vue.set(this.showcolumns, 3, true);
				} else {
					Vue.set(this.showcolumns, 3, false);
				}
				if (_.indexOf(this.currency_table_columns, 'Update by') != -1) {
					Vue.set(this.showcolumns, 4, true);
				} else {
					Vue.set(this.showcolumns, 4, false);
				}
				if (_.indexOf(this.currency_table_columns, 'Active') != -1) {
					Vue.set(this.showcolumns, 5, true);
				} else {
					Vue.set(this.showcolumns, 5, false);
				}
				if (_.indexOf(this.currency_table_columns, 'Action') != -1) {
					Vue.set(this.showcolumns, 6, true);
				} else {
					Vue.set(this.showcolumns, 6, false);
				}
				console.log(this.showcolumns);
				// this.$nextTick(() => {
				// 	document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
				// });
			},
			editCurrency(currency_id) {
				this.$router.push({
					path: "/switch/currency/edit/" + currency_id
				});
			},
			showDeleteConfirm(currency_id) {
				this.showModal = "deleteConfirm";
				this.selected_id = currency_id;
			},
			pageOneChanged(pageNum) {
				if (pageNum !== this.pageOne.currentPage) {
					this.pageOne.currentPage = pageNum
					this.$nextTick(this.fetchItems)
				}
			},
			changePageCount (countPerPage) {
				if (countPerPage !== this.pageOne.cntpage) {
					this.pageOne.cntpage = countPerPage
					this.$nextTick(this.fetchItems)
				}
			},
			closeModal: function() {
				this.showModal = '';
			},
			deleteCurrency() {
				this.loading = true;
				this.showModal = false;
				var vm = this;
				this.$http.delete(api.getEndpointUrl() + '/v1/switch/currency/' + this.selected_id, {
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(
					function(response) {
						this.loading = false;
						let index = _.findIndex(this.items, elem => elem.currency_id  === this.selected_id)
						this.items.splice(index, 1)
						this.setMessage('The currency has been deleted!')
					},
					function(response) {
						this.loading = false;
						this.setMessage({
							message:"The currency has been deleted!",
							type: 'error'
						});						
					}
				)
			}
		},
		mounted: function() {
			$('[data-toggle="tooltip"]').tooltip();
		},
		updated: function() {
			document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
		},
	}
</script>

<style>
	.width_98 {
		width: 98px;
	}
	.el-select__tags {
		display: none;
	}
</style>