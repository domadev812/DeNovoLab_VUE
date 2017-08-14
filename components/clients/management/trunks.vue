<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="#">Management</a>
					</li>
					<li class="breadcrumb-item active">Ingress Trunk</li>
				</ol>
				<h1 class="page-header">Ingress Trunk</h1>
				<div class="white_pad table_wrap">
					<div class="table_filters">
						<div class="inline-block select_min_wrapper">
							<span class="inline-block">Page row:</span>
							<select2 :options="options1" v-model="selected1" class="inline-block" @pagecount="changePageCount">
							</select2>
						</div>
						<div class="inline-block">
							<el-select v-model="trunk_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
								<el-option v-for="item in trunk_table_column_options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="table-responsive">
						<table class="table table-striped table-hover carrier_groups">
							<thead>
								<tr>
									<th v-if="showcolumns[0]">Ingress Name</th>
									<th v-if="showcolumns[1]">Host:Port</th>
									<th v-if="showcolumns[2]">Call Limit</th>
									<th v-if="showcolumns[3]">CPS Limit</th>
									<th v-if="showcolumns[4]">Action</th>
								</tr>
							</thead>
							<tbody>
								<tr v-if="!trunks.length">
									<td style="text-align: center" colspan="4">No Data Found</td>
								</tr>										
								
								<tr v-for="trunk in trunks">
									<td v-if="showcolumns[0]">{{trunk.trunk_name}}</td>
									<td v-if="showcolumns[1]">
										<a class="action action_menu" data-toggle="tooltip" data-placement="top" title="IP List" v-on:click="ip_list(trunk.id)">
											<span class="dnl_icon dnl_action_menu"></span>
										</a>
                                    </td>
									<td v-if="showcolumns[2]">{{trunk.call_limit}}</td>
									<td v-if="showcolumns[3]">{{trunk.cps_limit}}</td>
									<td v-if="showcolumns[4]">
										<a class="action action_menu" data-toggle="tooltip" data-placement="top" title="Product List" v-on:click="product_list(trunk.id)">
											<span class="dnl_icon dnl_action_menu"></span>
										</a>
										<a class="action action_activate" data-toggle="tooltip" data-placement="top" title="Deactivate" v-on:click="deactivate(trunk.id)">
											<span class="dnl_icon dnl_check"></span>
										</a>
										<a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="askDeleteConfirm(trunk.id)">
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
const vSelect = require('vue!../../main_components/select.vue'),
	Pagination = require('vue!../../main_components/pagination.vue'),
	confirmmodal = require('vue!../../main_components/confirm_delete.vue');
const api = require("../../../api");
const auth = require("../../../auth");
_ = require('lodash');
import {mapGetters,	mapActions} from 'vuex'

module.exports = {
	components: {
		'select2': vSelect,
		'pagination': Pagination,
		'confirm': confirmmodal,
	},
	data: function () {
		return {
			apiUrl: '',
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
			trunks: [
				{
					id: '1',
					trunk_name: 'trunk1',
					host_port: '127.0.0.1:8080',
                    call_limit: '0',
                    cps_limit: '0'
				},
				{
					id: '1',
					trunk_name: 'trunk1',
					host_port: '127.0.0.1:8080',
                    call_limit: '0',
                    cps_limit: '0'
				},
				{
					id: '1',
					trunk_name: 'trunk1',
					host_port: '127.0.0.1:8080',
                    call_limit: '0',
                    cps_limit: '0'
				},
			],

			trunk_table_column_options: [
				{
					value: 'Ingress Name',
					label: 'Ingress Name'
				},
				{
					value: 'Host:Port',
					label: 'Host:Port'
				},
				{
					value: 'Call Limit',
					label: 'Call Limit'
				},
				{
					value: 'CPS Limit',
					label: 'CPS Limit'
				},
				{
					value: 'Action',
					label: 'Action'
				}
			],
			trunk_table_columns: ['Ingress Name', 'Host:Port', 'Call Limit', 'CPS Limit', 'Action'],
			showcolumns: [true, true, true, true, true],
		}
	},
	methods: {
		...mapActions({
			setAsyncConfirm: 'async_confirm/setAsyncConfirm',
			setMessage: 'app_message/setAppMessage'
		}),
		handleChange() {
			if (_.indexOf(this.trunk_table_columns, 'Ingress Name') != -1) {
				Vue.set(this.showcolumns, 0, true);
			} else {
				Vue.set(this.showcolumns, 0, false);
			}
			if (_.indexOf(this.trunk_table_columns, 'Host:Port') != -1) {
				Vue.set(this.showcolumns, 1, true);
			} else {
				Vue.set(this.showcolumns, 1, false);
			}
			if (_.indexOf(this.trunk_table_columns, 'Call Limit') != -1) {
				Vue.set(this.showcolumns, 2, true);
			} else {
				Vue.set(this.showcolumns, 2, false);
			}
			if (_.indexOf(this.trunk_table_columns, 'CPS Limit') != -1) {
				Vue.set(this.showcolumns, 3, true);
			} else {
				Vue.set(this.showcolumns, 3, false);
			}
			if (_.indexOf(this.trunk_table_columns, 'Action') != -1) {
				Vue.set(this.showcolumns, 4, true);
			} else {
				Vue.set(this.showcolumns, 4, false);
			}
			console.log(this.showcolumns);
        },
        ip_list: function(id) {
            this.$router.push({ path: "/clients/management/trunks/ips/" + id });
        },
		product_list: function(id) {
			this.$router.push({ path: "/clients/management/trunks/products/" + id });
		},
		deactivate: function(id) {

        },
        askDeleteConfirm: function(id) {
            this.setAsyncConfirm('Are you sure you want to delete?')
            .then(result => {
                if (result.accepted) {
                    this.delete_trunk(id)
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        delete_trunk (id) {
            this.resource = this.$resource(api.getEndpointUrl() + '' + id);
            this.resource.delete({id:id})
            .then(response => {
                if (response.body.success) {
                    let index = _.findIndex(this.trunks, elem => elem.id === id)
                    this.trunks.splice(index, 1)
                    this.setMessage('Trunk was removed successfully')
                }
            })
        },
		fetchtrunks() {
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
					var trunks = response.body.payload.items;
					console.log(trunks);
					this.trunks = trunks;
					var total_page = response.body.payload.total;
					this.pageOne.currentPage = response.body.payload.page + 1;
					this.pageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
					console.log("total pages => " + this.pageOne.totalPages);
				}, function (error) {
					this.loading = false;
					console.log(error);
                }
            );
		},
		pageOneChanged(pageNum) {
			if (pageNum !== this.pageOne.currentPage) {
				this.pageOne.currentPage = pageNum
				this.$nextTick(this.fetchtrunks)
			}
		},
		changePageCount (countPerPage) {
			if (countPerPage !== this.pageOne.cntpage) {
				this.pageOne.cntpage = countPerPage
				this.$nextTick(this.fetchtrunks)
			}
		},
	},

	mounted: function () {
		$('[data-toggle="tooltip"]').tooltip();
	},
	
	created: function () {
		console.log('truk created:');
		this.fetchtrunks();
	},
	updated: function() {
		document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
	}
}
</script>



<style>
a.action.action_settings {
	padding-top: 3px;
	vertical-align: top;
	font-size: 18px;
}

.el-select__tags {
	display: none;
}

</style>
