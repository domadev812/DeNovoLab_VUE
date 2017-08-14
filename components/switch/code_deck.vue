<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="#">Switch</a>
					</li>
					<li class="breadcrumb-item active">Code Deck</li>
				</ol>
				<h1 class="page-header">Code Deck</h1>
				<confirm v-show="showModal" @close="showModal = false" @submit="deleteSelectedCodeDeck"></confirm>
				<div class="btn-group" role="group">
					<button class="btn btn-default inline_fixer" @click="createNew">
						<span class="dnl_icon dnl_add"></span> Create New
					</button>
					<button type="button" class="btn btn-default" v-on:click="deleteAll">
						<span class="dnl_icon dnl_action_delete"></span> Delete All
					</button>
					<button type="button" class="btn btn-default" v-on:click="deleteSelected">
						<span class="dnl_icon dnl_action_delete"></span> Delete Selected
					</button>
				</div>
				<div class="white_pad table_wrap">
					<div class="pull-right pagination top_pagination">
						<pagination :current-page="pageOne.currentPage" :total-pages="pageOne.totalPages" @page-changed="pageOneChanged">
						</pagination>
					</div>
					<div class="table_filters bottom_0">
						<div class="inline-block select_min_wrapper">
							<span class="inline-block">Page row:</span>
							<select2 :options="options1" v-model="selected1" class="inline-block" @pagecount="changePageCount">
							</select2>
						</div>
						<div class="inline-block">
							<!--<select2 :options="options2" v-model="selected2">
								<option disabled value="0">Show/Hide Columns</option>
							</select2>-->
							<el-select v-model="deck_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
								<el-option v-for="item in deck_table_column_options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="clearfix"></div>
					<div class="table-responsive">
						<spinner v-show="loading" class="spinner"></spinner>
						<div v-show="loading" class="mask"></div>
						<table class="table table-striped table-hover aliases">
							<thead>
								<tr>
									<th class="width-65">
										<div class="checkbox checkbox-success">
											<input id="select_all" name="select_all" type="checkbox" v-model="checker" v-on:click="clickSelectedAll">
											<label for="select_all"></label>
										</div>
									</th>
									<th v-if="showcolumns[0]">Name
										<span class="dnl_icon dnl_sort pull-right"></span>
									</th>
									<th v-if="showcolumns[1]">Code Count</th>
									<th v-if="showcolumns[2]">Usage Count</th>
									<th v-if="showcolumns[3]">Update at</th>
									<th v-if="showcolumns[4]">Update by</th>
									<th v-if="showcolumns[5]" class="width_98">Action</th>
								</tr>
							</thead>
							<tbody>
								<tr v-if="!decks.length">
									<td style="text-align: center" colspan="7">No Data Found</td>
								</tr>										
								
								<tr v-for="(deck, index) in decks">
									<td class="centred_checkbox">
										<div class="checkbox checkbox-success">
											<input v-bind:id="'selected-' + index" v-bind:name="'selected-' + index" type="checkbox" v-model="deck.selected">
											<label v-bind:for="'selected-' + index"></label>
										</div>
									</td>
									<td v-if="showcolumns[0]">
										<router-link :to="'/switch/code_deck/code_deck_list/'+deck.code_deck_id" class="blue_link">
											{{deck.name}}
										</router-link>
									</td>
									<td v-if="showcolumns[1]">{{deck.codes.length}}</td>
									<td v-if="showcolumns[2]">{{deck.usage_count}}</td>
									<td v-if="showcolumns[3]">{{deck.update_on}}</td>
									<td v-if="showcolumns[4]">{{deck.update_by}}</td>
									<td v-if="showcolumns[5]">
										<a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" @click="editCodeDeck(deck.code_deck_id)">
											<span class="dnl_icon dnl_action_edit"></span>
										</a>
										<a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" @click="showDeleteModal(deck.code_deck_id)">
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
	vSpinner = require('vue!../main_components/fadeloader.vue'),
	api = require("../../api"),
	auth = require("../../auth"),
	confirmmodal = require('vue!../main_components/confirm_delete.vue'),
	Pagination = require('vue!../main_components/pagination.vue');
_ = require('lodash');	
	import {mapGetters,	mapActions} from 'vuex'

module.exports = {
	created: function () {
		this.fetchDecks();
	},
	components: {
		'select2': vSelect,
		'pagination': Pagination,
		'spinner': vSpinner,
		'confirm': confirmmodal
	},
	data: function () {
		return {
			checker: '',
			selected_ids: [],
			showModal: false,
			loading: false,
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
			options2: [
				{ id: 1, text: 'Alias' },
				{ id: 2, text: 'Active' },
				{ id: 3, text: 'Actions' }
			],
			decks: [],
			deck_table_column_options: [{
				value: 'Name',
				label: 'Name'
			}, {
				value: 'Code Count',
				label: 'Code Count'
			}, {
				value: 'Usage Count',
				label: 'Usage Count'
			}, {
				value: 'Update at',
				label: 'Update at'
			}, {
				value: 'Update by',
				label: 'Update by'
			}, {
				value: 'Action',
				label: 'Action'
			}],
			deck_table_columns: ['Name', 'Code Count', 'Usage Count',
				'Update at', 'Update by', 'Action'],
			showcolumns: [true, true, true, true, true, true],
		}
	},
	watch: {
		"selected1": function (value) {
			var value = this.options1[value];
			this.pageOne.cntpage = parseInt(value);
		}
	},
	methods: {
		...mapActions({
			setMessage: 'app_message/setAppMessage'
		}),
		fetchDecks() {
			var page = this.pageOne.currentPage - 1;
			var per_page = this.pageOne.cntpage;
			this.loading = true;

			this.$http.get(api.getEndpointUrl() + '/v1/switch/code_deck/list' + "?page=" + page + "&per_page=" + per_page + "&order_by=code_deck_id&order_dir=desc",
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(function (response) {
					this.loading = false;
					//todo: check success flag? validation errors?
					var decks = response.body.payload.items;
					this.decks = decks;
					var vm = this;
					this.decks.forEach(function(deck, i) {
						deck.selected = false;
					})
					console.log(this.decks);
					var total_page = response.body.payload.total;
					this.pageOne.currentPage = response.body.payload.page + 1;
					this.pageOne.totalPages = Math.ceil(response.body.payload.total / this.pageOne.cntpage);
					console.log("total pages => " + this.pageOne.totalPages);
				}, function (error) {
					this.loading = false;
					console.log(error);
				});
		},
		clickSelectedAll: function() {
			console.log("select_all-->"+this.checker);
			var vm = this;
			if(this.checker) {
				this.decks.forEach(function(deck, i){
					deck.selected = true;
				});
			}
			else {
				this.decks.forEach(function(deck, i){
					deck.selected = false;
				});
			}
		},
		handleChange() {
			if (_.indexOf(this.deck_table_columns, 'Name') != -1) {
				// this.showcolumns[0] = true;
				Vue.set(this.showcolumns, 0, true);
			}
			else {
				// this.showcolumns[0] = false;
				Vue.set(this.showcolumns, 0, false);
			}

			if (_.indexOf(this.deck_table_columns, 'Code Count') != -1) {
				// this.showcolumns[1] = true;
				Vue.set(this.showcolumns, 1, true);
			}
			else {
				// this.showcolumns[1] = false;
				Vue.set(this.showcolumns, 1, false);
			}

			if (_.indexOf(this.deck_table_columns, 'Usage Count') != -1) {
				// this.showcolumns[2] = true;
				Vue.set(this.showcolumns, 2, true);
			}
			else {
				// this.showcolumns[2] = false;
				Vue.set(this.showcolumns, 2, false);
			}

			if (_.indexOf(this.deck_table_columns, 'Update at') != -1) {
				// this.showcolumns[3] = true;
				Vue.set(this.showcolumns, 3, true);
			}
			else {
				// this.showcolumns[3] = false;
				Vue.set(this.showcolumns, 3, false);
			}

			if (_.indexOf(this.deck_table_columns, 'Update by') != -1) {
				// this.showcolumns[4] = true;
				Vue.set(this.showcolumns, 4, true);
			}
			else {
				// this.showcolumns[4] = false;
				Vue.set(this.showcolumns, 4, false);
			}

			if (_.indexOf(this.deck_table_columns, 'Action') != -1) {
				// this.showcolumns[5] = true;
				Vue.set(this.showcolumns, 5, true);
			}
			else {
				// this.showcolumns[5] = false;
				Vue.set(this.showcolumns, 5, false);
			}

			console.log(this.showcolumns);

			// this.$nextTick(() => {
			// 	document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
			// });
		},
		showDeleteModal(id) {
			this.showModal = true;
			this.selected_ids = [];
			this.selected_ids.push(id);
		},
		createNew: function() {
			this.$route({path:"/switch/code_deck/new"});
		},
		deleteAll: function () {
			this.selected_ids = [];
			var vm = this;

			this.decks.forEach(function (deck, i) {
				vm.selected_ids.push(deck.code_deck_id)
			});

			if (this.selected_ids.length == 0) {
				this.setMessage({
					message: 'The code deck has been not selected!',
					type: 'error'
				});
				this.checker = false;
				return;
			}

			this.showModal = true;
			if (this.checker)
				this.checker = false;
		},
		deleteSelected: function () {
			this.selected_ids = [];
			var vm = this;
			this.decks.forEach(function (code_deck, i) {
				if (code_deck.selected == true) {
					vm.selected_ids.push(code_deck.code_deck_id);
				}
			});

			if (this.selected_ids.length == 0) {
				this.setMessage({
					message: 'The code deck has been not selected!',
					type: 'error'
				});
				this.checker = false;

				return;
			}

			this.showModal = true;
			if (this.checker)
				this.checker = false;
		},
		pageOneChanged(pageNum) {
			if (pageNum !== this.pageOne.currentPage) {
				this.pageOne.currentPage = pageNum
				this.$nextTick(this.fetchDecks)
			}
		},
		changePageCount (countPerPage) {
			if (countPerPage !== this.pageOne.cntpage) {
				this.pageOne.cntpage = countPerPage
				this.$nextTick(this.fetchDecks)
			}
		},
		deleteSelectedCodeDeck() {
			this.loading = true;
			this.showModal = false;
			var vm = this;

			this.selected_ids.forEach(function(item, i){
				var deckid = item;
				if(deckid == 0){
					vm.setMessage({
						message: 'The code deck has been not selected!',
						type: 'error'
					});
				}
				else{
					vm.$http.delete(api.getEndpointUrl() + '/v1/switch/code_deck/' + deckid,
						{
							headers: {
								"X-Auth-Token": auth.getToken()
							}
						}
					).then(
						function (response) {
							vm.loading = false;

							let index = _.findIndex(vm.decks, elem => elem.code_deck_id  === deckid)
							vm.decks.splice(index, 1)
							vm.setMessage('The code deck has been deleted!')
						},
						function (response) {
							vm.loading = false;
						}
					)
				}
			});
		},
		editCodeDeck(id) {
			this.$router.push({ path: "/switch/code_deck/edit/" + id });
		},
		closeModal: function () {
			this.showModal = '';
		},
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
.width_98 {
	width: 98px;
}

 .el-select__tags {
 	display: none;
 }

</style>