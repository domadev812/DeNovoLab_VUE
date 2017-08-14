<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper">
			<div class="sidebar">
			  <ul class="nav nav-sidebar">
				<li>
					<router-link to="/statistics/dashboard">
						<span class="dnl_icon dnl_dashboard"></span>
						Dashboard 
						<span class="sr-only">(current)</span>
					</router-link>
				</li>
				<li>
					<router-link to="/statistics/dashboard/report">
						<span class="dnl_icon dnl_report"></span>
						Report
					</router-link>
				</li>
				<li>
					<router-link to="/statistics/dashboard/charts">
						<span class="dnl_icon dnl_chart"></span>
						Charts
					</router-link>
				</li>
				<li>
					<router-link to="/statistics/dashboard/auto_delivery">
						<span class="dnl_icon dnl_auto_delivery"></span>
						Auto Delivery
					</router-link>
				</li>
				<li>
					<router-link to="/statistics/dashboard/qos_report">
						<span class="dnl_icon dnl_qos_report"></span>
						Qos Report
					</router-link>
				</li>
				<li>
					<router-link to="/statistics/dashboard/ingress_client_qos">
						<span class="dnl_icon dnl_ingress"></span>
						Ingress Clients Qos
					</router-link>
				</li>
				<li>
					<router-link to="/statistics/dashboard/egress_client_qos">
						<span class="dnl_icon dnl_egress"></span>
						Egress Clients Qos
					</router-link>
				</li>
				<li class="active">
					<router-link to="/statistics/dashboard/alert">
						<span class="dnl_icon dnl_ring"></span> Alert
						<span class="sr-only">(current)</span>
					</router-link>
				</li>
			  </ul>
			  <div class="sidebar_footer">
				  <span class="dnl_icon dnl_menu"></span>
				  <br>
				  DeNovoLab@2010-2016 <br> All Rights Reserved. 
			  </div>
			</div>
			<div class="col-sm-12 col-md-offset-2 col-md-10 main">
				<time-display></time-display>
				<ol class="breadcrumb">
					  <li class="breadcrumb-item"><a>Statistics</a></li>
					  <li class="breadcrumb-item">
						  <router-link to="/statistics/dashboard">Dashboard</router-link>
					  </li>
					  <li class="breadcrumb-item active">Alert</li>
				</ol>
				<h1 class="page-header">Alert</h1>
				<div class="white_pad table_wrap">
						<div class="advanced_search_filter_panel bottom_0">
							<div class="inline-block">
								<label>Viewed:</label>
								<br>
								<select2 :options="options2" v-model="viewed"></select2>
							</div>
							<div class="inline-block search_wrapper">
								<label>Type:</label>
								<br>
								<select2 :options="options2" v-model="viewed"></select2>
							</div>
						</div>
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
							<table class="table table-striped table-hover aliases credits">
							  <thead>
								<tr>
								  <th>Time</th>
								  <th>Type</th>
								  <th>Content</th>
								  <th>Last Read</th>
								  <th>Read by</th>
								  <th class="width-65">Action</th>
								</tr>
							  </thead>
							  <tbody>
								<tr v-for="alert in alerts">
								  <td>{{alert.time}}</td>
								  <td>{{alert.type}}</td>
								  <td>{{alert.content}}</td>
								  <td>{{alert.last_read}}</td>
								  <td>{{alert.read_by}}</td>
								  <td>
									  <a @click="showModal='alert_info'" class="action action_read" data-toggle="tooltip" data-placement="top" title="Read">
										  <span class="dnl_icon dnl_eye"></span>
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
		 	<modal v-if="showModal=='alert_info'" @close="showModal = ''">
					<h3 slot="header">Invalid Login Alert</h3>
					<div slot="body">
					  <div class="">
						  <h4>User Name or Password is incorrect!</h4>
						  <br>
						  <div class="modal_iconed_item">
							  <span class="dnl_icon dnl_persona"></span> <b>UserName:</b> trikon
						  </div>
						  <div class="modal_iconed_item">
							  <span class="dnl_icon dnl_lock"></span> <b>Password:</b> SHDxVJbvC#H&BE6
						  </div>
						  
						  Attempted IP:43.251.90.38
					  </div>
					</div>
					<div slot="footer">
						<button @click="closeModal" class="btn btn-default cancel centered">Cancel</button>
					</div>
			</modal>
	</div>
</template>

<script>   
	const vSelect = require('vue!../main_components/select.vue'),
		  Pagination = require('vue!../main_components/pagination.vue'),
		  modal = require('vue!../main_components/modal.vue');
	module.exports = {
		components: {
			'select2': vSelect,
			'pagination': Pagination,
			'modal': modal
		},
		data: function(){
            return {
			  viewed: '',
			  type:'',
			  checker: '',
			  showModal: '',
			  start_date:'',
			  end_date:'',
			  ftp_config_name: '',
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
			  selected2: 0,
			  options2: [
				  { id: 1, text: 'Alias' },
				  { id: 2, text: 'Active' },
				  { id: 3, text: 'Actions' }
			  ],
			  alerts: [
				{
				  time: "2017-01-23 12:14:46+00",
				  type: 'Invalid Login Alert',
				  content: 'User[trikon] attempted to log in with failure.',
				  last_read: '2017-01-23 12:14:46+00',
				  read_by: 'Admin',
				},
				{
				  time: "2017-01-23 12:14:46+00",
				  type: 'Invalid Login Alert',
				  content: 'User[trikon] attempted to log in with failure.',
				  last_read: '2017-01-23 12:14:46+00',
				  read_by: 'Admin',
				},
				{
				  time: "2017-01-23 12:14:46+00",
				  type: 'Invalid Login Alert',
				  content: 'User[trikon] attempted to log in with failure.',
				  last_read: '2017-01-23 12:14:46+00',
				  read_by: 'Admin',
				},
				{
				  time: "2017-01-23 12:14:46+00",
				  type: 'Invalid Login Alert',
				  content: 'User[trikon] attempted to log in with failure.',
				  last_read: '2017-01-23 12:14:46+00',
				  read_by: 'Admin',
				},
				{
				  time: "2017-01-23 12:14:46+00",
				  type: 'Invalid Login Alert',
				  content: 'User[trikon] attempted to log in with failure.',
				  last_read: '2017-01-23 12:14:46+00',
				  read_by: 'Admin',
				}
			  ]
            }
        },
		methods: {
			pageOneChanged (pageNum) {
				this.pageOne.currentPage = pageNum
			},
			closeModal: function() {
				this.showModal = '';
			}
		},
		mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
		}
	}
</script>

<style>
	a.action.action_read {
		font-size: 16px;
		padding-top: 4px;
	}
	
	.modal_iconed_item span.dnl_icon.dnl_persona {
		font-size: 16px;
		margin-right: 4px;
	}
	
	.modal_iconed_item span.dnl_icon.dnl_lock {
		font-size: 20px;
		margin-right: 4px;
		vertical-align: middle;
	}
	
	.modal_iconed_item {
		margin-bottom: 8px;
	}
	
	button.btn.btn-default.cancel.centered {
		display: block;
		margin: 15px auto 0 auto;
	}
</style>
