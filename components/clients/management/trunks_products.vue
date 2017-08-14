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
                    <li class="breadcrumb-item active">Products</li>
				</ol>
				<h1 class="page-header">Products</h1>
				<router-link to="/clients/management/trunks" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
				<div class="white_pad table_wrap">
					<router-link to="/clients/management/trunks/products/new" class="btn btn-primary mini pull-right m-top-20">
						<span class="dnl_icon dnl_add"></span> Create new 
					</router-link>
					<div class="table_filters m-top-15">
						<div class="inline-block select_min_wrapper">
							<span class="inline-block">Page row:</span>
							<select2 :options="options1" v-model="selected1" class="inline-block" @pagecount="changePageCount">
							</select2>
						</div>
						<div class="inline-block">
							<el-select v-model="product_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
								<el-option v-for="item in product_table_column_options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="clearfix"></div>
					<div class="table-responsive">
						<table class="table table-striped table-hover carrier_groups">
							<thead>
								<tr>
									<th v-if="showcolumns[0]">Product</th>
									<th v-if="showcolumns[1]">Prefix</th>
									<th v-if="showcolumns[2]">Action</th>
								</tr>
							</thead>
							<tbody>
								<tr v-if="!products.length">
									<td style="text-align: center" colspan="3">No Data Found</td>
								</tr>										
								
								<tr v-for="product in products">
									<td v-if="showcolumns[0]">{{product.name}}</td>
									<td v-if="showcolumns[1]">{{product.prefix}}</td>
									<td v-if="showcolumns[2]">
										<a class="action action_download" data-toggle="tooltip" data-placement="top" title="Dowonload Rate" v-on:click="download_rate(product.id)">
											<span class="dnl_icon dnl_download"></span>
										</a>
										<a class="action action_menu" data-toggle="tooltip" data-placement="top" title="Rate Log" v-on:click="rate_log(product.id)">
											<span class="dnl_icon dnl_action_menu"></span>
										</a>
										<a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="askDeleteConfirm(product.id)">
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
			products: [
				{
					id: '1',
					name: 'product name1',
					prefix: 'product prefix1',
				},
				{
					id: '1',
					name: 'product name1',
					prefix: 'product prefix1',
				},
				{
					id: '1',
					name: 'product name1',
					prefix: 'product prefix1',
				},
			],

			product_table_column_options: [
				{
					value: 'Product',
					label: 'Product'
				},
				{
					value: 'Prefix',
					label: 'Prefix'
				},
				{
					value: 'Action',
					label: 'Action'
				}
			],
			product_table_columns: ['Product', 'Prefix', 'Action'],
			showcolumns: [true, true, true],
		}
	},
	methods: {
		...mapActions({
			setAsyncConfirm: 'async_confirm/setAsyncConfirm',
			setMessage: 'app_message/setAppMessage'
		}),
		handleChange() {
			if (_.indexOf(this.product_table_columns, 'Product') != -1) {
				Vue.set(this.showcolumns, 0, true);
			} else {
				Vue.set(this.showcolumns, 0, false);
			}
			if (_.indexOf(this.product_table_columns, 'Prefix') != -1) {
				Vue.set(this.showcolumns, 1, true);
			} else {
				Vue.set(this.showcolumns, 1, false);
			}
			if (_.indexOf(this.product_table_columns, 'Action') != -1) {
				Vue.set(this.showcolumns, 2, true);
			} else {
				Vue.set(this.showcolumns, 2, false);
			}
			console.log(this.showcolumns);
		},
		rate_log: function(id) {
			this.$router.push({ path: "/clients/management/trunks/products/" + this.trunkid + "/rate/" + id });
			
		},
		download_rate: function(id) {

		},
        askDeleteConfirm: function(id) {
            this.setAsyncConfirm('Are you sure you want to delete?')
            .then(result => {
                if (result.accepted) {
                    this.delete_product(id)
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        delete_product (id) {
            this.resource = this.$resource(api.getEndpointUrl() + '' + id);
            this.resource.delete({id:id})
            .then(response => {
                if (response.body.success) {
                    let index = _.findIndex(this.products, elem => elem.id === id)
                    this.products.splice(index, 1)
                    this.setMessage('product was removed successfully')
                }
            })
        },		
		fetchProducts() {
			var trunkid = this.$route.params.id;
			this.trunkid = trunkid;

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
					var products = response.body.payload.items;
					console.log(products);
					this.products = products;
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
				this.$nextTick(this.fetchProducts)
			}
		},
		changePageCount (countPerPage) {
			if (countPerPage !== this.pageOne.cntpage) {
				this.pageOne.cntpage = countPerPage
				this.$nextTick(this.fetchProducts)
			}
		},
	},
	mounted: function () {
		$('[data-toggle="tooltip"]').tooltip();
	},
	created: function () {
		this.fetchProducts();
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
