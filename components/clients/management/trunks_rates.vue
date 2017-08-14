<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="#">Management</a>
					</li>
                    <li class="breadcrumb-item">
                        <router-link to="/clients/management/trunks">Trunks</router-link>
                    </li>
                    <li class="breadcrumb-item">
                        <a v-on:click="trunk_products()">Products</a>
                    </li>
                    <li class="breadcrumb-item active">Rate Deck</li>
				</ol>
				<h1 class="page-header">Rate Deck</h1>
				<a v-on:click="trunk_products()" class="btn btn_white back">
					<span class="dnl_icon dnl_import"></span> Back 
				</a>
				<div class="white_pad table_wrap">
					<div class="table_filters">
						<div class="inline-block select_min_wrapper">
							<span class="inline-block">Page row:</span>
							<select2 :options="options1" v-model="selected1" class="inline-block" @pagecount="changePageCount">
							</select2>
						</div>
						<div class="inline-block">
							<el-select v-model="rate_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
								<el-option v-for="item in rate_table_column_options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="table-responsive">
						<table class="table table-striped table-hover carrier_groups">
							<thead>
								<tr>
									<th v-if="showcolumns[0]">Product Name</th>
									<th v-if="showcolumns[1]">Tech Prefix</th>
									<th v-if="showcolumns[2]">Product Description</th>
									<th v-if="showcolumns[3]">Action</th>
								</tr>
							</thead>
							<tbody>
								<tr v-if="!rates.length">
									<td style="text-align: center" colspan="4">No Data Found</td>
								</tr>										
								
								<tr v-for="rate in rates">
									<td v-if="showcolumns[0]">{{rate.name}}</td>
									<td v-if="showcolumns[1]">{{rate.tech_prefix}}</td>
									<td v-if="showcolumns[2]">{{rate.description}}</td>
									<td v-if="showcolumns[3]">
										<a class="action action_menu" data-toggle="tooltip" data-placement="top" title="Specify Your IPs" v-on:click="specify_ips(rate.id)">
											<span class="dnl_icon dnl_action_menu"></span>
										</a>
										<a class="action action_download" data-toggle="tooltip" data-placement="top" title="Dowonload Rate" v-on:click="download_product(rate.id)">
											<span class="dnl_icon dnl_download"></span>
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
			productid: 0,
			trunkid: 0,
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
			// selected2: 0,
			// options2: [
			// 	{ id: 1, text: 'Group Name' },
			// 	{ id: 2, text: 'Carrier Count' },
			// 	{ id: 3, text: 'Actions' }
			// ],
			rates: [
				{
					id: '1',
					name: 'product name1',
					tech_prefix: 'product prefix1',
					description: 'product description1'
				},
				{
					id: '1',
					name: 'product name2',
					tech_prefix: 'product prefix2',
					description: 'product description2'
				},
				{
					id: '1',
					name: 'product name3',
					tech_prefix: 'product prefix3',
					description: 'product description3'
				},
			],

			rate_table_column_options: [
				{
					value: 'Product Name',
					label: 'Product Name'
				},
				{
					value: 'Tech Prefix',
					label: 'Tech Prefix'
				},
				{
					value: 'Product Description',
					label: 'Product Description'
				},
				{
					value: 'Action',
					label: 'Action'
				}
			],
			rate_table_columns: ['Product Name', 'Tech Prefix', 'Product Description', 'Action'],
			showcolumns: [true, true, true, true],
		}
	},
	methods: {
		...mapActions({
			setAsyncConfirm: 'async_confirm/setAsyncConfirm',
			setMessage: 'app_message/setAppMessage'
		}),
		handleChange() {
			if (_.indexOf(this.rate_table_columns, 'Product Name') != -1) {
				Vue.set(this.showcolumns, 0, true);
			} else {
				Vue.set(this.showcolumns, 0, false);
			}
			if (_.indexOf(this.rate_table_columns, 'Tech Prefix') != -1) {
				Vue.set(this.showcolumns, 1, true);
			} else {
				Vue.set(this.showcolumns, 1, false);
			}
			if (_.indexOf(this.rate_table_columns, 'Product Description') != -1) {
				Vue.set(this.showcolumns, 2, true);
			} else {
				Vue.set(this.showcolumns, 2, false);
			}
			if (_.indexOf(this.rate_table_columns, 'Action') != -1) {
				Vue.set(this.showcolumns, 3, true);
			} else {
				Vue.set(this.showcolumns, 3, false);
			}
			console.log(this.showcolumns);
		},
		specify_ips: function(id) {
			
		},
		trunk_products: function() {
			this.$router.push({ path: "/clients/management/trunks/products/" + this.trunkid });
		},
		download_product: function(id) {

		},
		fetchRates() {
			var trunkid = this.$route.params.id;
			var productid = this.$route.params.productid;
			this.trunkid = trunkid;
			this.productid = productid;


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
					var rates = response.body.payload.items;
					console.log(rates);
					this.rates = rates;
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
				this.$nextTick(this.fetchRates)
			}
		},
		changePageCount (countPerPage) {
			if (countPerPage !== this.pageOne.cntpage) {
				this.pageOne.cntpage = countPerPage
				this.$nextTick(this.fetchRates)
			}
		},
	},
	mounted: function () {
		$('[data-toggle="tooltip"]').tooltip();
	},
	created: function () {
		this.fetchRates();
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
