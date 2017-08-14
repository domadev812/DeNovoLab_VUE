<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="#">Switch</a></li>
                <li class="breadcrumb-item">
                    <router-link to="/switch/code_deck">Code Deck</router-link>
                </li>
				<li class="breadcrumb-item active">Code Deck List</li>
			</ol>
			<h1 class="page-header">Code Deck List [{{code_deck.code_deck_name}}]</h1>
            <router-link to="/switch/code_deck/" class="btn btn_white back">
                <span class="dnl_icon dnl_import"></span> Back 
            </router-link>
            <tabs>
                <spinner v-show="loading" class="spinner"></spinner>
				<tab label="Code Deck List" class="" icon="dnl_icon dnl_list" selected>
                    <div class="btn-group" role="group">
                      <button type="button" class="btn btn-default inline_fixer" @click="createNew">
                          <span class="dnl_icon dnl_add"></span> Create New
                      </button>
                      <button type="button" class="btn btn-default" @click="deleteAll">
                          <span class="dnl_icon dnl_action_delete"></span> Delete All
                      </button>
                      <button type="button" class="btn btn-default" @click="deleteSelected">
                          <span class="dnl_icon dnl_action_delete"></span> Delete Selected
                      </button>
                    </div>
                    <div class="advanced_search_filter_panel bottom_0">
                        <div class="inline-block search_wrapper">
                            <label>Code:</label>
                            <br>
                            <input type="text" name="code" v-model="code" class="form-control inline-block search_field" placeholder="Enter Code">
                            <span class="dnl_icon dnl_musica-searcher"></span>
                        </div>
                    </div>
                    <div class="clearfix little-space"></div>
                    <!--<div class="table_filters">
                        <div class="inline-block select_min_wrapper">
                            <span class="inline-block">Page row:</span>
                            <select2 :options="options1" v-model="selected1" class="inline-block">
                            </select2>
                        </div>
                        <div class="inline-block">
                            <select2 :options="options2" v-model="selected2">
                                <option disabled value="0">Show/Hide Columns</option>
                            </select2>
                        </div>
                    </div>-->
                    <div class="clearfix"></div>
					<div class="table-responsive">
						<table class="table table-striped table-hover aliases">
						  <thead>
							<tr>
                              <th class="width-65 checker">
                                  <div class="checkbox checkbox-success">
                                    <input type="checkbox" id="checker" name="checker" v-model="checker" @click="toggleChecker()">
                                    <label for="checker"></label>
                                  </div>
                              </th>
							  <th>Code</th>
							  <th>Code Name</th>
							  <th>Country</th>
                              <th class="width_98">Action</th>
							</tr>
						  </thead>
						  <tbody>
                              <tr v-for="(code, index) in filterBy(code_deck.codes, code)">
                                  <td class="centred_checkbox">
                                      <div class="checkbox checkbox-success">
                                        <input :id="index" :name="index" type="checkbox" v-model="code.selected">
                                        <label :for="index"></label>
                                      </div>
                                  </td>
                                  <td>{{code.code}}</td>
                                  <td>{{code.code_name}}</td>
                                  <td>{{code.country}}</td>
                                  <td>
                                      <router-link :to="'/switch/code_deck/code_deck_list/'+code_deck.code_deck_id+'/edit/'+index" class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit">
                                          <span class="dnl_icon dnl_action_edit"></span>
                                      </router-link>
                                      <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" @click="askDeleteConfirm(index)">
                                          <span class="dnl_icon dnl_action_delete"></span>
                                      </a>
                                  </td>
                              </tr>
						  </tbody>
						</table>
					</div>
                    <!--<div class="pull-right pagination">
                        <pagination :current-page="pageOne.currentPage"
                                    :total-pages="pageOne.totalPages"
                                    @page-changed="pageOneChanged">
                        </pagination>
                    </div>-->
                    <div class="clearfix"></div>
				</tab>
				<tab label="Import" class="" icon="dnl_icon dnl_import">
                    <div class="row">
					  <div class="col-md-3 col-sm-4">
                        <label>Import File:</label>
                        <dropzone id="myVueDropzone" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
                    </div>
                    <div class="col-md-3 col-sm-4">
                        <label>Method:</label>
                        <div class="form-group">
                            <div class="radio radio-success">
                                <input id="radio-1" class="radio-custom" name="duplicates" type="radio" checked>
                                <label for="radio-1" class="radio-custom-label">Ignore</label>
                            </div>
                        </div>
                        <div class="form-group m-top-minus-25">
                            <div class="radio radio-success">
                                <input id="radio-2" class="radio-custom" name="duplicates" type="radio">
                                <label for="radio-2" class="radio-custom-label">Delete</label>
                            </div>
                        </div>
                        <div class="button_set little-space">
                            <a class="btn btn-primary mini">
                                Show Example
                            </a>
                        </div>
                    </div>
                    <div class="clearfix"></div>
				  </div>
				  <div class="button_set">
                     <a class="btn btn-primary mini">
                        Upload
                     </a>
				  </div>
				</tab>
				<tab label="Export" class="" icon="dnl_icon dnl_export">
                    <div class="row">
                        <div class="col-md-3 col-sm-3">
                            <div class="form-group full-width-select">
                                <label for="username">Data Format:</label>
                                <select2 :options="options1" v-model="data_format"></select2>
                            </div>
                            <div class="form-group m-top-33">
                                <div class="checkbox checkbox-success">
                                    <input id="status" name="enable_rep_grouping" type="checkbox">
                                    <label for="enable_rep_grouping">With headers row</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-3">
                            <div class="form-group">
                                <label>Header Text:</label>
                                <textarea v-model="header_text" class="form-control" placeholder="Enter Header Text"/>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-3">
                            <div class="form-group">
                                <label>Footer Text:</label>
                                <textarea v-model="footer_text" class="form-control" placeholder="Enter Footer Text"/>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-3">
                            <div class="form-group full-width-select">
                                <label for="username">Column #1:</label>
                                <select2 :options="options1" v-model="column_1"></select2>
                            </div>
                            <div class="form-group full-width-select">
                                <label for="username">Column #2:</label>
                                <select2 :options="options1" v-model="column_2"></select2>
                            </div>
                            <div class="form-group full-width-select">
                                <label for="username">Column #3:</label>
                                <select2 :options="options1" v-model="column_3"></select2>
                            </div>
                        </div>
                    </div>
					<div class="button_set center-block text-center">
						<a class="btn btn-primary mini" v-on:click="exportCSV()">
							Download
						</a>
					</div>
				</tab>
			</tabs>
		</div>
	  </div>
	</div>
</template>

<script>   
	const vSelect = require('vue!../main_components/select.vue'),
		  Pagination = require('vue!../main_components/pagination.vue'),
          vTabs = require('vue!../main_components/tabs.vue'),
		  vTab = require('vue!../main_components/tab.vue'),
          Dropzone = require('vue!../main_components/dropzone.vue'),
        vSpinner = require('vue!../main_components/fadeloader.vue');
    import api from '../../api'
    import { mapActions } from 'vuex'
	module.exports = {
		components: {
			'select2': vSelect,
			'pagination': Pagination,
            'tabs': vTabs,
			'tab': vTab,
            'spinner': vSpinner,
            Dropzone
		},
        props: ['id'],
		data: function(){
            return {
                code_deck_template: {},
                loading: false,
              code: '',
			  checker: '',
			  showModal: '',
			  start_date:'',
			  end_date:'',
			  ftp_config_name: '',
              data_format: '',
              header_text: '',
              footer_text: '',
              column_1: '',
              column_2: '',
              column_3: '',
			  pageOne: {
                currentPage: 1,
                totalPages: 10
              },
			  selected1: 1,
			  options1: [
				  { id: 1, text: '10' },
				  { id: 2, text: '20' },
				  { id: 3, text: '30' },
				  { id: 4, text: '50' },
				  { id: 5, text: '100' }
			  ],
              selected2: '',
			  options2: [
				  { id: 1, text: 'Alias' },
				  { id: 2, text: 'Active' },
				  { id: 3, text: 'Actions' }
			  ],

              code_deck: {},
            }
        },
		methods: {
            ...mapActions({
				setAsyncConfirm: 'async_confirm/setAsyncConfirm',
				setMessage: 'app_message/setAppMessage'
			}),
            exportCSV: function () {              
                var vm = this;		
                var csvContent = "data:text/csv;charset=utf-8,"; 
                var csvArray = new Array();
                var fields = ["code_deck_id", "code_deck_name", "code", "city", "code_name", "state", "country"];
                csvArray.push(fields);  
                var code_deck_id = this.code_deck.code_deck_id;                                   
                var code_deck_name = this.code_deck.code_deck_name;
                this.code_deck.codes.forEach(function (code, i) {    
                    var values = new Array();                                                     

                    values.push(code_deck_id + "");
                    values.push(code_deck_name + "");
                    values.push(code.code + "");
                    values.push(code.city + "");
                    values.push(code.code_name + "");
                    values.push(code.state + "");
                    values.push(code.country + "");
                    csvArray.push(values);                                                                 
                });	                                                 
                exportToCsv('switch_code_deck_export.csv', csvArray);                                                       
            },
            createNew () {
                this.$router.push({path:'/switch/code_deck/code_deck_list/'+this.code_deck.code_deck_id+'/new'});
            },
            deleteAll () {
				this.setAsyncConfirm('Are you sure you want to delete all this codes')
				.then(result => {
					if (result.accepted) {
						var vm = this;
						var no_message = true;
                        var ids = [];
						this.code_deck.codes.forEach(function (code, i) {
							ids.push(i);
						});
                        vm.deleteCode(ids, no_message)
						if (this.checker)
							this.checker = false;
						this.setMessage('All Codes were removed successfully')
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
            deleteSelected () {
				// check selected items count for deleting
				var selected_count = 0;
				this.code_deck.codes.forEach(function (code, i) {
					if (code.selected == true) {
						selected_count += 1;
					}
				});
				if(selected_count == 0) {
					this.setMessage({
						message: 'The codes has been not selected!',
						type: 'error'
					})
					return;
				}
                var ids = [];
				// delete selected items
				this.setAsyncConfirm('Are you sure you want to delete this selected codes')
				.then(result => {
					if (result.accepted) {
						var vm = this;
						this.code_deck.codes.forEach(function (code, i) {
							if (code.selected == true) {
                                ids.push(i);
							}
						});
                        var no_message = true;
                        vm.deleteCode(ids, no_message)
						if (this.checker)
							this.checker = false;
						this.setMessage('Selected Codes were removed successfully')
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
            getCodeDeckForRequest(ids) {
                var code_deck_template = Object.assign({}, this.code_deck_template);
                code_deck_template.code_deck_id = this.code_deck.code_deck_id;
                code_deck_template.code_deck_name = this.code_deck.code_deck_name;
                code_deck_template.codes = [];
                this.code_deck.codes.forEach(function (code, i) {
					code_deck_template.codes.push({
                        code: code.code,
                        city: code.city,
                        code_name: code.code_name,
                        state: code.state,
                        country: code.country,
                    });

				});
                for (var i = ids.length -1; i >= 0; i--)
                    code_deck_template.codes.splice(ids[i],1);
                return code_deck_template;
            },
            deleteCode(ids, no_message) {
                const reqBody = this.getCodeDeckForRequest(ids);
                const url = api.getEndpointUrl() + '/v1/switch/code_deck/' + this.code_deck.code_deck_id;
                this.$http.patch(url, reqBody)
                .then(response => {
                    if (response.body.success) {
                        for (var i = ids.length -1; i >= 0; i--)
                            this.code_deck.codes.splice(ids[i],1);
						if(no_message == false)
							this.setMessage('Code was removed successfully')
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.setMessage({
                        message: 'Failed to remove code',
                        type: 'error'
                    })
                })
			},
            askDeleteConfirm(id) {
                var ids = [];
                ids.push(id);
				this.setAsyncConfirm('Are you sure you want to delete this code')
				.then(result => {
					if (result.accepted) {
						this.deleteCode(ids, false)
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
            toggleChecker () {
				console.log('Toggle activated')
				const state = this.checker
				const codes = this.code_deck.codes
				const codesLength = codes.length
				for (let i = 0; i < codesLength; i++) {
					codes[i].selected = state
				}
			},
            fetchCodeDeck() {
                this.loading = true;
                console.log('fetchCodeDeck');
                const url = api.getEndpointUrl() + '/v1/switch/code_deck/'+this.id
                this.$http.get(url)
                .then(response => {
                    const body = response.body
                    if (body.success) {
                        var code_deck = body.payload
                        Vue.set(this.code_deck, 'code_deck_name', code_deck.name)
                        Vue.set(this.code_deck, 'code_deck_id', this.id)
                        Vue.set(this.code_deck, 'codes', code_deck.codes)
                        console.log(this.code_deck)
                    }
                    this.loading = false
                })
                .catch(error => {
                    this.loading = false
                    console.log(error)
                })
            },
			pageOneChanged (pageNum) {
				if (pageNum !== this.pageOne.currentPage) {
					this.pageOne.currentPage = pageNum
					this.$nextTick(this.fetchCodeDeck)
				}
			},
            'success': function (file) {
                console.log('A file was successfully uploaded')
            },
            'process': function () {
                var newArr = this.$children.filter(function(item){
                  return item.id === "myVueDropzone";
                });
                var component = newArr[0];
                component.processQueue()
            }
		},
		mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
		},
        created () {
            this.fetchCodeDeck();
        },        
	}
</script>

<style>
    .checker {
        text-align: center !important;
    }
	.tab span.dnl_icon.dnl_import {
        font-size: 20px;
        float: left;
        margin-right: 6px;
    }
    
    .tab span.dnl_icon.dnl_export {
        font-size: 24px;
        float: left;
        margin-right: 6px;
    }
</style>
