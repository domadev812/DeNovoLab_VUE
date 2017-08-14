<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item"><a href="#">Configuration</a></li>
					<li class="breadcrumb-item active">Roles</li>
				</ol>
				<h1 class="page-header">Roles</h1>
				<i v-show="loading" class="fa fa-spinner fa-spin" style="font-size:20px;"></i>
				<div class="white_pad table_wrap">
					<div class="table_filters searcheable">
						<div class="inline-block search_wrapper">
							<input type="text" name="role_search" v-model="role_search" class="form-control inline-block search_field" placeholder="Enter Role Name">
							<span class="dnl_icon dnl_musica-searcher"></span>
						</div>
						<div class="inline-block select_min_wrapper">
							<span class="inline-block">Page row:</span>
							<select2 :options="options1" v-model="selected1" class="inline-block" @pagecount="changePageCount">
							</select2>
						</div>
						<div class="inline-block">
							<select2 :options="options2" v-model="selected2">
								<option disabled value="0">Show/Hide Columns</option>
							</select2>
						</div>
						<router-link to="/configuration/roles/new" class="btn btn-primary mini pull-right">
							<span class="dnl_icon dnl_add"></span> Create new
						</router-link>
					</div>
					<div class="table-responsive">
						<table class="table table-striped table-hover roles">
							<thead>
								<tr>
									<th>Role<span class="dnl_icon dnl_sort pull-right"></span></th>
									<th class="width_138">User Count</th>
									<th class="w-80">Action</th>
								</tr>
							</thead>
							<tbody>
								<!-- <p v-if="! roles.length" class="no-result">No Data Found</p> -->
								<tr v-if="!filterBy(roles, role_search).length">
									<td style="text-align: center" colspan="3">No Data Found</td>
								</tr>								
								
								<tr v-for="role in filterBy(roles, role_search)">
									<td>{{role.role_name}}</td>
									<td>{{role.user_count}}</td>
									<td>
										<a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" @click="editRole(role.role_id)">
											<span class="dnl_icon dnl_action_edit"></span>
										</a>
										<a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="askDeleteConfirm(role.role_id)">
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
		Pagination = require('vue!../main_components/pagination.vue');
	const api = require("../../api");
	const auth = require("../../auth");
	import _ from 'lodash'
	import {
		mapActions
	} from 'vuex'
	module.exports = {
		name: 'roles',
		components: {
			'select2': vSelect,
			'pagination': Pagination
		},
		data() {
			return {
				pageOne: {
					currentPage: 1,
					totalPages: 0,
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
				selected2: 0,
				options2: [{
						id: 1,
						text: 'Roles'
					},
					{
						id: 2,
						text: 'User Count'
					},
					{
						id: 3,
						text: 'Role ID'
					}
				],
				role_search: '',
				roles: []
			}
		},
		created() {
			this.fetchRoles()
		},
		mounted() {
			$('[data-toggle="tooltip"]').tooltip();
		},
		methods: {
			...mapActions({
				setAsyncConfirm: 'async_confirm/setAsyncConfirm',
				setMessage: 'app_message/setAppMessage'
			}),
			fetchRoles() {
				this.loading = true
				const page = this.pageOne.currentPage - 1
				const per_page = this.pageOne.cntpage
				let url = api.getEndpointUrl() + '/v1/config/role/list'
				url += '?page=' + page
				url += '&per_page=' + per_page
				url += '&order_by=' + this.getOrderByQuery()
				this.$http.get(url)
					.then(response => {
						this.loading = false
						const body = response.body
						if (body.success) {
							const payload = body.payload
							this.roles = payload.items
							this.pageOne.currentPage = payload.page + 1
							this.pageOne.totalPages = Math.ceil(payload.total / per_page)
						}
					})
					.catch(error => {
						this.loading = false
						console.log(error)
					})
			},
			getOrderByQuery() {
				let value = this.options2[this.selected2].id
				switch (value) {
					case 1:
						return 'role_name'
					case 2:
						return 'user_count'
					case 3:
						return 'user_id'
				}
			},
			pageOneChanged(pageNum) {
				if (pageNum !== this.pageOne.currentPage) {
					this.pageOne.currentPage = pageNum
					this.$nextTick(this.fetchRoles)
				}
			},
			changePageCount(countPerPage) {
				if (countPerPage !== this.pageOne.cntpage) {
					this.pageOne.cntpage = countPerPage
					this.$nextTick(this.fetchRoles)
				}
			},
			editRole(id) {
				this.$router.push('/configuration/roles/edit/' + id)
			},
			askDeleteConfirm(id) {
				this.setAsyncConfirm('Are you sure you want to delete?')
					.then(result => {
						if (result.accepted) {
							this.delete_role(id)
						}
					})
					.catch(error => {
						console.log(error)
					})
			},
			delete_role(id) {
				const url = api.getEndpointUrl() + '/v1/config/role/' + id
				this.$http.delete(url)
					.then(response => {
						if (response.body.success) {
							let index = _.findIndex(this.roles, elem => elem.role_id === id)
							this.roles.splice(index, 1)
							this.setMessage('Role was removed successfully')
						}
					})
			}
		}
	}
</script>

<style>
	table.table.table-striped.table-hover.roles td,
	table.table.table-striped.table-hover.roles th {
		vertical-align: middle;
		padding-right: 8px;
	}
	table.table.table-striped.table-hover.roles tr:hover {
		background: #73767b;
	}
	input.form-control.inline-block.search_field {
		min-width: 210px;
		padding-right: 32px;
	}
	.inline-block.search_wrapper {
		margin-right: 20px;
		position: relative;
	}
	.inline-block.search_wrapper span.dnl_icon {
		position: absolute;
		right: 12px;
		top: 12px;
		color: #8e9198;
	}
	/* Portrait tablet to landscape and desktop */
	@media (min-width: 768px) and (max-width: 979px) {
		.searcheable a.btn.btn-primary.mini {
			width: 175px;
			display: block;
			float: none !important;
			margin-top: 20px;
		}
	}
	/* Landscape phone to portrait tablet */
	@media (max-width: 767px) {
		.searcheable a.btn.btn-primary.mini {
			width: 175px;
			display: block;
			float: none !important;
			margin-top: 20px;
		}
	}
	/* Landscape phones and down */
	@media (max-width: 480px) {
		.inline-block.search_wrapper {
			margin-bottom: 20px;
		}
	}
</style>
