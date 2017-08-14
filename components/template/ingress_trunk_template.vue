<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="#">Template</a></li>
				<li class="breadcrumb-item active">Ingress Trunk Template</li>
			</ol>
			<h1 class="page-header">Ingress Trunk Template</h1>
            <div class="white_pad table_wrap">
                <div class="advanced_search_filter_panel bottom_0">
                    <div class="inline-block search_wrapper">
                        <label>Template Name:</label>
                        <br>
                        <input type="text" name="template_name" v-model="template_name" class="form-control inline-block search_field" placeholder="Enter Template Name">
                        <span class="dnl_icon dnl_musica-searcher"></span>
                    </div>
                </div>
                <div class="clearfix little-space"></div>
                <router-link to="/template/ingress_trunk_template/new" class="btn btn-primary mini pull-right">
                    <span class="dnl_icon dnl_add"></span> Create new 
                </router-link>
                <div class="table_filters bottom_0">
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
                </div>
                <div class="clearfix"></div>
                <div class="table-responsive">
                    <table class="table table-striped table-hover aliases">
                      <thead>
                        <tr>
                          <th>Template Name</th>
                          <th>Created on</th>
                          <th>Created by</th>
                          <th>Last Updated</th>
                          <th>Used by</th>
                          <th class="width-78">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                          <tr v-for="template in filterBy(templates, template_name)">
                              <td>
                                  {{template.name}}
                              </td>
                              <td>
                                  {{template.create_on}}
                              </td>
                              <td>
                                  {{template.create_by}}
                              </td>
                              <td>
                                  {{template.update_on}}
                              </td>
                              <td>
                                  <a class="blue_link" @click="showModal='used_list'">{{template.used_by}}</a>
                              </td>
                              <td>
                                   <a class="action action_reset" data-toggle="tooltip" data-placement="top" title="Re-apply">
                                      <span class="dnl_icon dnl_refresh"></span>
                                   </a>
                                   <a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit" @click="editTemplate(template.resource_template_id)">
                                      <span class="dnl_icon dnl_action_edit"></span>
                                  </a>
                                  <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" @click="askDeleteConfirm(template.resource_template_id)">
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
      <modal v-if="showModal=='used_list'" @close="showModal = ''" class="big_modal">
			<h3 slot="header">Used List</h3>
			<div slot="body">
			  <div class="">
				  <div class="table-responsive">
					<table class="table table-striped table-hover carrier_groups aligned-center">
					  <thead>
						 <tr>
							<th>Carrier Name</th>
							<th>Created on</th> 
                            <th>Created by</th> 
                            <th>Last Update On</th> 
						 </tr>
					  </thead>
					  <tbody>
						<tr v-for="item in items">
                            <td>{{item.carrier_name}}</td>
                            <td>{{item.created_on}}</td>
                            <td>{{item.created_by}}</td>
                            <td>{{item.last_update_on}}</td>
						</tr>
					  </tbody>
					</table>
				</div>
			  </div>
			</div>
			<div slot="footer">
				<button @click="closeModal" class="btn btn-default mini cancel centered">Cancel</button>
			</div>
	  </modal>
	</div>
</template>

<script>   
	const vSelect = require('vue!../main_components/select.vue'),
		  Pagination = require('vue!../main_components/pagination.vue'),
          vTabs = require('vue!../main_components/tabs.vue'),
		  vTab = require('vue!../main_components/tab.vue'),
          modal = require('vue!../main_components/modal.vue');
    const api = require("../../api");
    import { mapActions } from 'vuex'
    import _ from 'lodash'
	module.exports = {
		components: {
			'select2': vSelect,
			'pagination': Pagination,
            'tabs': vTabs,
			'tab': vTab,
            'modal': modal
		},
		data: function(){
            return {
              template_name: '',
			  pageOne: {
                currentPage: 1,
                totalPages: 10
              },
              showModal: '',
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
			  file_breakdown: 2,
			  file_options:[
				  {id: 1, text: 'As one big file'},
				  {id: 2, text: 'As hourly file'},
				  {id: 3, text: 'As daily file'},
			  ],
			  time_zone: 12,
			  time_zone_options: [
				  { id: 1, text: 'GMT -12:00' },
				  { id: 2, text: 'GMT -11:00' },
				  { id: 3, text: 'GMT -10:00' },
				  { id: 4, text: 'GMT -9:00' },
				  { id: 5, text: 'GMT -8:00' },
				  { id: 6, text: 'GMT -7:00' },
				  { id: 7, text: 'GMT -6:00' },
				  { id: 8, text: 'GMT -5:00' },
				  { id: 9, text: 'GMT -4:00' },
				  { id: 10, text: 'GMT -3:00' },
				  { id: 11, text: 'GMT -2:00' },
				  { id: 12, text: 'GMT -1:00' },
				  { id: 13, text: 'GMT +0:00' },
				  { id: 14, text: 'GMT +1:00' },
				  { id: 15, text: 'GMT +2:00' },
				  { id: 16, text: 'GMT +3:00' },
				  { id: 17, text: 'GMT +4:00' },
				  { id: 18, text: 'GMT +5:00' },
				  { id: 19, text: 'GMT +6:00' },
				  { id: 20, text: 'GMT +7:00' },
				  { id: 21, text: 'GMT +8:00' },
				  { id: 22, text: 'GMT +9:00' },
				  { id: 23, text: 'GMT +10:00' },
				  { id: 24, text: 'GMT +11:00' },
				  { id: 25, text: 'GMT +12:00' },
			  ],
              items: [
                  {
                    carrier_name: 'Nisha007',
                    created_on: '2016-10-07 11:19:20+00',
                    created_by: 'Admin',
                    last_update_on: '2016-10-07 11:19:20+00'
                  },
                  {
                    carrier_name: 'Nisha007',
                    created_on: '2016-10-07 11:19:20+00',
                    created_by: 'Admin',
                    last_update_on: '2016-10-07 11:19:20+00'
                  },
                  {
                    carrier_name: 'Nisha007',
                    created_on: '2016-10-07 11:19:20+00',
                    created_by: 'Admin',
                    last_update_on: '2016-10-07 11:19:20+00'
                  }
              ],
			  templates: []
            }
        },
		methods: {
            ...mapActions({
				setAsyncConfirm: 'async_confirm/setAsyncConfirm',
				setMessage: 'app_message/setAppMessage'
			}),
            getTemplateIndex (id) {
				return _.findIndex(this.templates, elem => elem.resource_template_id === id)
			},
            deleteTemplate(id) {
                const url = api.getEndpointUrl() + '/v1/config/ingress_trunk_template/' + id
				this.$http.delete(url)
				.then(response => {
					if (response.body.success) {
						let index = this.getTemplateIndex(id)
						if (~index) {
							this.templates.splice(index, 1)
						}
						this.setMessage('Template was removed successfully')
					}
				})
            },
            askDeleteConfirm(id) {
                this.setAsyncConfirm('Are you sure you want to delete this template')
				.then(result => {
					if (result.accepted) {
						this.deleteTemplate(id)
					}
				})
				.catch(error => {
					console.log(error)
				})
            },
            editTemplate(id) {
                console.log(id);
                this.$router.push('/template/ingress_trunk_template/edit/' + id)
            },
            fetchIngressTrunkTemplate () {
                const url = api.getEndpointUrl() + '/v1/config/ingress_trunk_template/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						this.templates = body.payload.items
					}
				})
				.catch(error => {
					console.log(error)
				})
            },
			pageOneChanged (pageNum) {
				this.pageOne.currentPage = pageNum
			},
            closeModal: function() {
				this.showModal = '';
			}
		},
		mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
		},
        created: function() {
            this.fetchIngressTrunkTemplate();
        }
	}
</script>

<style>
</style>
