<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Configuration</a></li>
				  <li class="breadcrumb-item active">Default Error Response</li>
			</ol>
			<h1 class="page-header">Default Error Response</h1>
			<i v-show="loading" class="fa fa-spinner fa-spin" style="font-size:20px;"></i>
			<div class="white_pad">
				<div class="table-responsive error_response_container">
					<table class="table table-striped table-hover error_response">
					  <thead>
						<tr>
						  <th>Error Code</th>
						  <th>Error Description</th>
						  <th>Default Response</th>
						  <th>User-defined Response</th>
						</tr>
					  </thead>
					  <tbody>
						<!-- <p v-if="! response_errors.length" class="no-result">No Data Found</p> -->
						<tr v-if="!response_errors.length">
							<td style="text-align: center" colspan="4">No Data Found</td>
						</tr>								
						<tr v-for="error in response_errors" :id="error.id">
						  <td>{{error.error_code}}</td>
						  <td>{{error.error_description}}</td>
						  <td>
							<input v-if="error.default_to_sip_code" type="text"  name="groupname" class="form-control inline-block mini" v-model="error.default_to_sip_code" placeholder="default code name" readonly>
							<input v-if="error.default_to_sip_string" type="text"  name="groupname" class="form-control inline-block larger" v-model="error.default_to_sip_string" placeholder="default response message" readonly>
						  </td>
						  <td>
							<input v-if="error.to_sip_code" type="text"  name="groupname" class="form-control inline-block mini" v-model="error.to_sip_code" placeholder="Enter code name">
							<input v-if="error.to_sip_string" type="text"  name="groupname" class="form-control inline-block larger" v-model="error.to_sip_string" placeholder="Enter response message">
						  </td>
						</tr>
					  </tbody>
					</table>
				</div>
				<div class="button_set text-center little-space">
					<a class="btn btn-primary mini" v-on:click="submit">
						Submit
					</a>
					<a class="btn btn-default mini" v-on:click="reset">
						Reset
					</a>
	 			</div>
				 <div class="pull-right pagination">
					<pagination :current-page="pageOne.currentPage"
								:total-pages="pageOne.totalPages"
								@page-changed="pageOneChanged">
					</pagination>
				</div>
				<div class="clearfix"></div>
			</div>
		</div>
	  </div>
	</div>
</template>

<script>   
	const Pagination = require('vue!../main_components/pagination.vue');
	const api = require("../../api");
	const auth = require("../../auth");
	_ = require('lodash');
	import {mapGetters,	mapActions} from 'vuex'
	
	module.exports = {
		components: {
			'pagination': Pagination
		},
		created: function(){
			this.fetchResponse();
		},
		data: function(){
				return {
					apiUrl:'/v1/config/route_error/list',
					pageOne: {
						currentPage: 1,
						totalPages: 10,
						cntpage : 10
					},
					response_errors: [],
					originalData: [],
				}
		},
		methods : {
			...mapActions({
				setAsyncConfirm: 'async_confirm/setAsyncConfirm',
				setMessage: 'app_message/setAppMessage'
			}),
			fetchResponse() {
				this.loading = true;
				var page = this.pageOne.currentPage - 1;
				var per_page = this.pageOne.cntpage;
				this.$http.get(api.getEndpointUrl() + this.apiUrl+"?page="+page+"&per_page="+per_page+"&order_by=error_code&order_dir=",
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(function(response) {
					//todo: check success flag? validation errors?
					console.log(response);
					this.loading = false;
					var error_lists = response.body.payload.items;
					this.response_errors = error_lists;
					var total_page = response.body.payload.total;
					this.pageOne.currentPage = response.body.payload.page + 1;
					this.pageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
				}, function(error) {
					this.loading = false;
					console.log(error);
				});

				this.originalData = this.response_errors.slice(0);
			},
			pageOneChanged(pageNum) {
				if (pageNum !== this.pageOne.currentPage) {
					this.pageOne.currentPage = pageNum
					this.$nextTick(this.fetchResponse)
				}
			},
			changePageCount (countPerPage) {
				if (countPerPage !== this.pageOne.cntpage) {
					this.pageOne.cntpage = countPerPage
					this.$nextTick(this.fetchResponse)
				}
			},

			submit: function() {
				this.loading = true;

				var vm = [];
				this.response_errors.forEach(function(error, i){
					var temp = {};
					temp.id = error.id;
					temp.to_sip_code = error.to_sip_code;
					temp.to_sip_string = error.to_sip_string;
					vm.push(temp);
				});

				this.$http.patch(api.getEndpointUrl() + '/v1/config/route_error',
				{
					"items": vm
				},
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}
				).then(
					function(response) {
						this.loading = false;
						console.log(response);

						this.$router.push('/configuration/default_error_response');
						this.setMessage('The Default Error Response items has been modified!');
					},
					function(response) {
						this.loading = false;
						console.log(response);
						
						this.setMessage({
							message:'Editing Default Error Response items is failed!',
							type: 'error'
						});
					}
				)
			},
			reset: function() {
				this.response_errors = this.originalData.slice(0);
			},
		}
	}
</script>

<style>
	.table.table-striped.table-hover.error_response td,
	.table.table-striped.table-hover.error_response th {
		text-align: left;
		vertical-align: middle;
		padding: 8px;
		
	}
	
	table.table.table-striped.table-hover.error_response tr:hover {
		background: #73767b;
	}
	
	.table-responsive.error_response_container {
		min-width: auto;
	}
	
	a.btn.btn-default.mini {
		width: 185px;
	}
</style>
