<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a>Log</a>
					</li>
					<li class="breadcrumb-item active">E-mail Log</li>
				</ol>
				<h1 class="page-header">E-mail Log</h1>
				<confirm v-show="showModal" @close="showModal = false" @submit="submit"></confirm>
				<div class="timeline">
					<div class="chart_select_header grided">
						<div class="col-md-3 col-sm-4">
							<label>Carrier:</label>
							<select2 :options="carrier_list" v-model="carrier">
								<option disabled value="0">Select Carrier</option>
							</select2>
						</div>
						<div class="col-md-3 col-sm-4">
							<label>Type:</label>
							<select2 :options="type_list" v-model="type">
								<option disabled value="0">Select Type</option>
							</select2>
						</div>
						<div class="col-md-3 col-sm-4">
							<label for="search">E-mail:</label>
							<input type="text" name="email" v-model="email" class="form-control" placeholder="Enter E-mail">
						</div>
						<div class="clearfix little-space"></div>
						<div class="col-md-6 col-sm-6">
							<div class="inlined">
								<label for="time_1">Time:</label>
								<el-date-picker style="width: 100%;" type="datetime" v-model="time_1" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
								<!--<input type="text" name="time_1" v-model="time_1" class="form-control" placeholder="Enter Time">-->
							</div>
							<div class="inlined">
								<label for="time_2" class="m-top-15"></label>
								<el-date-picker style="width: 100%;" type="datetime" v-model="time_2" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
								<!--<input type="text" name="time_2" v-model="time_2" class="form-control" placeholder="Enter Time">-->
							</div>
						</div>
						<div class="col-md-3 col-sm-4">
							<a class="btn btn-primary m-top-25" v-on:click="query()">
								Query
							</a>
						</div>
						<div class="clearfix"></div>
					</div>
					<div class="chart_content">
						<div class="table_filters marged-40">
							<div class="inline-block select_min_wrapper">
								<span class="inline-block">Page row:</span>
								<select2 :options="options1" v-model="selected1" class="inline-block" @pagecount="changePageCount">
								</select2>
							</div>
							<div class="inline-block">
								<!--<select2 :options="options" v-model="selected2">
											<option disabled value="0">Show/Hide Columns</option>
										</select2>-->
								<el-select v-model="log_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
									<el-option v-for="item in log_table_column_options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</div>
						</div>
						<div class="col-md-12">
							<div class="table-responsive marged-30">
								<table class="table table-striped table-hover carrier_groups originators">
									<thead>
										<tr>
											<th v-if="showcolumns[0]">Sent Time</th>
											<th v-if="showcolumns[1]">Carrier
												<span class="dnl_icon dnl_sort pull-right"></span>
											</th>
											<th v-if="showcolumns[2]">Type</th>
											<th v-if="showcolumns[3]">E-mail Address</th>
											<th v-if="showcolumns[4]">E-mail Status</th>
											<th v-if="showcolumns[5]">Action</th>
										</tr>
									</thead>
									<tbody>
										<tr v-if="!logs.length">
											<td style="text-align: center" colspan="6">No Data Found</td>
										</tr>										
										<tr v-for="log in logs">
											<td v-if="showcolumns[0]">{{log.date}}</td>
											<td v-if="showcolumns[1]">{{log.content}}</td>
											<td v-if="showcolumns[2]">{{log.type}}</td>
											<td v-if="showcolumns[3]">{{log.sent_from}}</td>
											<td v-if="showcolumns[4]">{{log.subject}}</td>
											<td v-if="showcolumns[5]">{{log.status}}</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="pull-right pagination m-r-30">
								<pagination :current-page="pageOne.currentPage" :total-pages="pageOne.totalPages" @page-changed="pageOneChanged">
								</pagination>
							</div>
						</div>
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
import {mapGetters,	mapActions} from 'vuex'
	
module.exports = {
	components: {
		'select2': vSelect,
		'confirm': confirmmodal,
		'pagination': Pagination
	},
	data: function () {
		return {
			apiUrl: '/v1/log/email',

			showModal: '',
			selected_id: 0,

			pageOne: {
				currentPage: 1,
				totalPages: 10,
				cntpage: 10
			},
			carrier_list: [],
			type_list: [
				{ id: "Low Balance", text: "Low Balance", value: "Low Balance" },
				{ id: "Daily Summary", text: "Daily Summary", value: "Daily Summary" },
				{ id: "Auto Delivery", text: "Auto Delivery", value: "Auto Delivery" },
				{ id: "Alert", text: "Alert", value: "Alert" },
				{ id: "CDR", text: "CDR", value: "CDR" },
				{ id: "Invoice", text: "Invoice", value: "Invoice" },
				{ id: "Daily Balance", text: "Daily Balance", value: "Daily Balance" },
				{ id: "Daily Payment", text: "Daily Payment", value: "Daily Payment" },
				{ id: "Trunk Host Change", text: "Trunk Host Change", value: "Trunk Host Change" },
				{ id: "Trunk Prefix/Product Change", text: "Trunk Prefix/Product Change", value: "Trunk Prefix/Product Change" },
				{ id: "Daily Payment", text: "Daily Payment", value: "Daily Payment" },
				{ id: "Rule Alert", text: "Rule Alert", value: "Rule Alert" },
				{ id: "Welcome Letter", text: "Welcome Letter", value: "Welcome Letter" },
				{ id: "Denovo support", text: "Denovo support", value: "Denovo support" },
				{ id: "Fraud Detection", text: "Fraud Detection", value: "Fraud Detection" },
				{ id: "Invalid Number Detection", text: "Invalid Number Detection", value: "Invalid Number Detection" },
				{ id: "Rate Download", text: "Rate Download", value: "Rate Download" },
				{ id: "No Download Rate in Deadline", text: "No Download Rate in Deadline", value: "No Download Rate in Deadline" },
				{ id: "Vendor Invoice Dispute", text: "Vendor Invoice Dispute", value: "Vendor Invoice Dispute" },
				{ id: "Rate Generation Update Rate", text: "Rate Generation Update Rate", value: "Rate Generation Update Rate" },
				{ id: "Registration letter", text: "Registration letter", value: "Registration letter" },
				{ id: "Payment Sent", text: "Payment Sent", value: "Payment Sent" },
				{ id: "Payment Received", text: "Payment Received", value: "Payment Received" },
				{ id: "Send Rate", text: "Send Rate", value: "Send Rate" },
			],
			carrier: '',
			type: '',
			email: '',
			time_1: '',
			time_2: '',
			options1: [
				{ id: 1, text: '10' },
				{ id: 2, text: '20' },
				{ id: 3, text: '30' },
				{ id: 4, text: '50' },
				{ id: 5, text: '100' }
			],
			selected1: 1,
			selected2: 1,
			logs: [],
			log_table_column_options: [{
				value: 'Sent Time',
				label: 'Sent Time'
			}, {
				value: 'Carrier',
				label: 'Carrier'
			}, {
				value: 'Type',
				label: 'Type'
			}, {
				value: 'E-mail Address',
				label: 'E-mail Address'
			}, {
				value: 'E-mail Status',
				label: 'E-mail Status'
			}, {
				value: 'Action',
				label: 'Action'
			}],
			log_table_columns: ['Sent Time', 'Carrier', 'Type',
				'E-mail Address', 'E-mail Status', 'Action'],
			showcolumns: [true, true, true, true, true, true],
		}
	},
	methods: {
		...mapActions({
			setAsyncConfirm: 'async_confirm/setAsyncConfirm',
			setMessage: 'app_message/setAppMessage'
		}),		
		handleChange() {
			if (_.indexOf(this.log_table_columns, 'Sent Time') != -1) {
				Vue.set(this.showcolumns, 0, true);
			}
			else {
				Vue.set(this.showcolumns, 0, false);
			}

			if (_.indexOf(this.log_table_columns, 'Carrier') != -1) {
				Vue.set(this.showcolumns, 1, true);
			}
			else {
				Vue.set(this.showcolumns, 1, false);
			}

			if (_.indexOf(this.log_table_columns, 'Type') != -1) {
				Vue.set(this.showcolumns, 2, true);
			}
			else {
				Vue.set(this.showcolumns, 2, false);
			}

			if (_.indexOf(this.log_table_columns, 'E-mail Address') != -1) {
				Vue.set(this.showcolumns, 3, true);
			}
			else {
				Vue.set(this.showcolumns, 3, false);
			}

			if (_.indexOf(this.log_table_columns, 'E-mail Status') != -1) {
				Vue.set(this.showcolumns, 4, true);
			}
			else {
				Vue.set(this.showcolumns, 4, false);
			}

			if (_.indexOf(this.log_table_columns, 'Action') != -1) {
				Vue.set(this.showcolumns, 5, true);
			}
			else {
				Vue.set(this.showcolumns, 5, false);
			}

			console.log(this.showcolumns);
		},
		query() {
			console.log("query");
			this.pageOne.currentPage = 1;
			var countperpage = this.pageOne.cntpage;
			var page = this.pageOne.currentPage - 1;
			this.loading = true;
			this.$http.get(api.getEndpointUrl() + this.apiUrl + "?page=" + page + "&per_page=" + countperpage + 
			"&type=" + this.type + "&date_lt=" + this.time_1 + "&date_gt=" + this.time_2 + "&order_by=date&order_dir=desc",
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(function (response) {
					this.loading = false;
					//todo: check success flag? validation errors?
					var logs = response.body.payload.items;
					console.log(logs);
					this.logs = logs;
					var total_page = response.body.payload.total;
					this.pageOne.currentPage = response.body.payload.page + 1;
					this.pageOne.totalPages = Math.ceil(response.body.payload.total / countperpage);
					console.log("total pages => " + this.pageOne.totalPages);
				}, function (error) {
					this.loading = false;
					console.log(error);
				});
		},
		fetchLogs() {
			this.loading = true;
			var page = this.pageOne.currentPage - 1;
			var per_page = this.pageOne.cntpage;
			console.log("page => " + page + " , per_page => " + per_page);
			this.loading = true;

			this.$http.get(api.getEndpointUrl() + this.apiUrl + "?page=" + page + "&per_page=" + per_page + "&order_by=date&order_dir=desc",
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(function (response) {
					this.loading = false;
					//todo: check success flag? validation errors?
					var logs = response.body.payload.items;
					console.log(logs);
					this.logs = logs;
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
				this.$nextTick(this.fetchLogs)
			}
		},
		changePageCount (countPerPage) {
			if (countPerPage !== this.pageOne.cntpage) {
				this.pageOne.cntpage = countPerPage
				this.$nextTick(this.fetchLogs)
			}
		},
		closeModal: function () {
			this.showModal = '';
		},
		delete_log: function (id) {
			this.showModal = true;
			this.selected_id = id;
		},
		submit: function () {
			var vm = this;
			this.showModal = false;

			if (this.selected_id == 0) {
				vm.setMessage({
					message:'The email log has been not selected!',
					type:'error'
				});
			}
			else {
				vm.loading = true;
				vm.resource = vm.$resource(api.getEndpointUrl() + '/v1/log/email/' + vm.selected_id);
				vm.resource.delete({ id: vm.selected_id }).then(function (response) {
					vm.loading = false;
					let index = _.findIndex(vm.logs, elem => elem.id  === vm.selected_id)
					vm.logs.splice(index, 1)
					vm.setMessage('The email log have been deleted!')
				});
			}
		},
	},
	mounted: function () {

	},
	updated: function () {
		document.querySelector('.el-select > .el-input > input').placeholder = 'Show/Hide Columns';
	},
	created: function () {
		this.loading = true;
		this.$http.get(api.getEndpointUrl() + "/v1/carrier/list",
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function (response) {
				var self = this;
				this.loading = false;
				var items = response.body.payload.items;
				items.forEach(function (item, i) {
					var carrier = {};
					carrier.id = item.client_id;
					carrier.value = item.name;
					carrier.text = item.name;
					self.carrier_list.push(carrier);
				});
				console.log("carrier_list");
				console.log(this.carrier_list);
			}, function (error) {
				this.loading = false;
				console.log(error);
			});

			this.fetchLogs();
	}

}
</script>

<style>
.pull-right.pagination.m-r-30 {
	margin: -20px 30px 10px 0;
}

@media (max-width: 480px) {
	.pull-right.pagination.m-r-30 {
		display: block;
		margin: 20px auto 0 auto;
		float: none !important;
		width: 178px;
	}
}

.el-select__tags {
	display: none;
}
</style>
