<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a>Origination</a></li>
				  <li class="breadcrumb-item active">Billing Rule</li>
			</ol>
			<h1 class="page-header">Billing Rule</h1>
			<div class="btn-group" role="group">
			  <button type="button" class="btn btn-default" @click="createRule">
				  <span class="dnl_icon dnl_add"></span> Create New
			  </button>
			  <button type="button" class="btn btn-default" @click="deleteAll">
				  <span class="dnl_icon dnl_action_delete"></span> Delete All
			  </button>
			  <button type="button" class="btn btn-default" @click="deleteSelected">
				  <span class="dnl_icon dnl_action_delete"></span> Delete Selected
			  </button>
			</div>
			<div class="white_pad table_wrap">
				<div class="clearfix"></div>
				<div class="pull-right pagination top_pagination">
					<pagination :current-page="pageOne.currentPage"
								:total-pages="pageOne.totalPages"
								@page-changed="pageOneChanged">
					</pagination>
				</div>
				<div class="table_filters m-top-15">
					<div class="inline-block select_min_wrapper">
						<span class="inline-block">Page row:</span>
						<select2 :options="per_page_number_list" v-model="selected1" class="inline-block" @pagecount="changePageRow">
						</select2>
					</div>
					<div class="inline-block">
						<!--<select2 :options="options2" v-model="selected2">
							<option disabled value="0">Show/Hide Columns</option>
						</select2>-->
						<el-select v-model="billing_rule_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
							<el-option v-for="item in billing_rule_table_column_options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="clearfix"></div>
				<div class="table-responsive">
					<table class="table table-striped table-hover aliases credits">
					  <thead>
						<tr>
						  <th class="width-65">
							  <div class="checkbox checkbox-success">
								<input type="checkbox" id="checker" name="checker" v-model="checker" @click="toggleChecker()">
								<label for="checker"></label>
							  </div>
						  </th>
						  <th v-if="showcolumns[0]">Name<span class="dnl_icon dnl_sort pull-right"></span></th>
						  <th v-if="showcolumns[1]">Type Rate</th>
						  <th v-if="showcolumns[2]">Price/DID/Month</th>
						  <th v-if="showcolumns[3]">Price/Minute</th>
						  <th v-if="showcolumns[4]">Payphone Subcharge</th>
						  <th v-if="showcolumns[5]">Setup Fee</th>
						  <th v-if="showcolumns[6]" class="width_98">Actions</th>
						</tr>
					  </thead>
					  <tbody>
						<tr v-if="!rules.length">
							<td style="text-align: center" colspan="8">No Data Found</td>
						</tr>										
						  
						<tr v-for="rule in rules">
						  <td class="centred_checkbox">
							  <div class="checkbox checkbox-success">
								<input :id="rule.id" :name="rule.id" type="checkbox" v-model="rule.selected">
								<label :for="rule.id"></label>
							  </div>
						  </td>
						  <td v-if="showcolumns[0]">{{rule.name}}</td>
						  <td v-if="showcolumns[1]">{{rule.type}}</td>
						  <td v-if="showcolumns[2]">{{rule.monthly_fee}}</td>
						  <td v-if="showcolumns[3]">{{rule.rate_per_min}}</td>
						  <td v-if="showcolumns[4]">{{rule.payphone_subcharge}}</td>
						  <td v-if="showcolumns[5]">{{rule.setup_fee}}</td>
						  <td v-if="showcolumns[6]">
							  <a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" @click="editRule(rule.id)">
								  <span class="dnl_icon dnl_action_edit"></span>
							  </a>
							  <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" @click="askDeleteConfirm(rule.id)">
								  <span class="dnl_icon dnl_action_delete"></span>
							  </a>
						  </td>
						</tr>
					  </tbody>
					</table>
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
	const vSelect = require('vue!../main_components/select.vue'),
		  Pagination = require('vue!../main_components/pagination.vue');
	const api = require("../../api");
	import { mapActions } from 'vuex'
	module.exports = {
		components: {
			'select2': vSelect,
			'pagination': Pagination
		},
		data: function(){
			return {
				showcolumns: [true, true, true, true, true, true, true],
				billing_rule_table_columns: ['Name', 'Type Rate', 'Price/DID/Month', 'Price/Minute', 'Payphone Subcharge', 'Rate Table', 'Actions'],
				temp_billing_rule_table_columns: ['Name', 'Type Rate', 'Price/DID/Month', 'Price/Minute', 'Payphone Subcharge', 'Rate Table', 'Actions'],
				billing_rule_table_column_options: [{
					value: 'Name',
					label: 'Name'
				}, {
					value: 'Type Rate',
					label: 'Type Rate'
				}, {
					value: 'Price/DID/Month',
					label: 'Price/DID/Month'
				}, {
					value: 'Price/Minute',
					label: 'Price/Minute'
				}, {
					value: 'Payphone Subcharge',
					label: 'Payphone Subcharge'
				}, {
					value: 'Rate Table',
					label: 'Rate Table'
				}, {
					value: 'Actions',
					label: 'Actions'
				}],
			  checker: '',
			  showModal: '',
			  start_date:'',
			  end_date:'',
			  ftp_config_name: '',
			  pageOne: {
                currentPage: 1,
                totalPages: 10,
				per_page: 10,
              },
			  selected1: 1,
			  per_page_number_list: [
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
			  rules: [],
			selected_ids: [],
			}
		},
		methods: {
			...mapActions({
				setAsyncConfirm: 'async_confirm/setAsyncConfirm',
				setMessage: 'app_message/setAppMessage'
			}),
			toggleChecker () {
				console.log('Toggle activated')
				const state = this.checker
				const rules = this.rules
				const rulesLength = rules.length
				for (let i = 0; i < rulesLength; i++) {
					rules[i].selected = state
				}
			},
			handleChange() {
				for(let i = 0; i < this.temp_billing_rule_table_columns.length; i++) {
					if (_.indexOf(this.billing_rule_table_columns, this.temp_billing_rule_table_columns[i]) != -1) {
						Vue.set(this.showcolumns, i, true);
					}
					else {
						Vue.set(this.showcolumns, i, false);
					}
				}
			},
			getRuleIndex (id) {
				return _.findIndex(this.rules, elem => elem.id === id)
			},
			deleteSelected () {
				// check selected items count for deleting
				var selected_count = 0;
				this.rules.forEach(function (rule, i) {
					if (rule.selected == true) {
						selected_count += 1;
					}
				});
				if(selected_count == 0) {
					this.setMessage({
						message: 'The billing rules has been not selected!',
						type: 'error'
					})
					return;
				}
				// delete selected items
				this.setAsyncConfirm('Are you sure you want to delete this selected rules')
				.then(result => {
					if (result.accepted) {
						var vm = this;
						this.rules.forEach(function (rule, i) {
							if (rule.selected == true) {
								var no_message = true;
								vm.deleteRule(rule.id, no_message)
							}
						});
						if (this.checker)
							this.checker = false;
						this.setMessage('Selected Rules were removed successfully')
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			deleteAll () {
				this.setAsyncConfirm('Are you sure you want to delete all this rules')
				.then(result => {
					if (result.accepted) {
						var vm = this;
						var no_message = true;
						this.rules.forEach(function (rule, i) {
							vm.deleteRule(rule.id, no_message)
						});
						if (this.checker)
							this.checker = false;
						this.rules = [];
						this.setMessage('All Rules were removed successfully')
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			changePageRow (value) {
				console.log(value);
				if (value !== this.pageOne.per_page) {
					this.pageOne.per_page = value
					this.$nextTick(this.fetchBillingRules)
				}
			},
			deleteRule(id, no_message) {
				const url = api.getEndpointUrl() + '/v1/did/billing_rule/' + id
				this.$http.delete(url)
				.then(response => {
					if (response.body.success) {
						let index = this.getRuleIndex(id)
						if (~index) {
							this.rules.splice(index, 1)
						}
						if(no_message == false)
							this.setMessage('Rule was removed successfully')
					}
				})
			},
			askDeleteConfirm(id) {
				this.setAsyncConfirm('Are you sure you want to delete this rule')
				.then(result => {
					if (result.accepted) {
						this.deleteRule(id, false)
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			editRule(id) {
				this.$router.push('/origination/billing_rule/edit/' + id);
			},
			createRule() {
				this.$router.push('/origination/billing_rule/new/');
			},
			getQueries() {
				const page = '?page=' + (this.pageOne.currentPage - 1)
				const per_page = '&per_page=' + this.pageOne.per_page
				return page + per_page
			},
			fetchBillingRules() {
				const url = api.getEndpointUrl() + '/v1/did/billing_rule/list' + this.getQueries()
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						this.rules = body.payload.items
						this.pageOne.currentPage = body.payload.page + 1
						this.pageOne.totalPages = Math.ceil(body.payload.total / body.payload.per_page)
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			pageOneChanged (pageNum) {
				if (pageNum !== this.pageOne.currentPage) {
					this.pageOne.currentPage = pageNum
					this.$nextTick(this.fetchBillingRules)
				}
			}
		},
		mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
		},
		created () {
			this.fetchBillingRules();
		},
		updated: function () {
			document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
		},
	}
</script>

<style>
</style>
