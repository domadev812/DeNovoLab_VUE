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
				<li class="active">
					<router-link to="/statistics/dashboard/egress_client_qos">
						<span class="dnl_icon dnl_egress"></span>
						Egress Clients Qos
						<span class="sr-only">(current)</span>
					</router-link>
				</li>
				<li>
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
					  <li class="breadcrumb-item active">Egress Client Qos</li>
				</ol>
				<h1 class="page-header">Egress Client Qos</h1>
				<div class="white_pad table_wrap">
					  <div class="advanced_search_filter_panel">
						<div class="inline-block search_wrapper">
							<label>Resource Name:</label>
							<br>
							<input type="text" name="resource_name_search" v-model="resource_name_search" class="form-control inline-block search_field" placeholder="Enter Resource Name">
							<span class="dnl_icon dnl_musica-searcher"></span>
						</div>
						<div class="inline-block">
							<label>Refresh Every:</label>
							<br>
							<select2 :options="options" v-model="selected_slot"></select2>
						</div>
					</div>
					<div class="table_filters">
						<div class="inline-block select_min_wrapper">
							<span class="inline-block">Page row:</span>
							<select2 :options="options1" v-model="selected1" class="inline-block">
							</select2>
						</div>
						<div class="inline-block fix_medium_select">
							<select2 :options="options2" v-model="selected2">
								<option disabled value="0">Show/Hide Columns</option>
							</select2>
						</div>
					</div>
					<div class="table-responsive">
						<table class="table table-striped table-hover clients">
						  <thead>
                            <tr>
                                <th rowspan="2">Resource</th>
                                <th colspan="4">15 Minutes</th>
                                <th colspan="4">1 Hour</th>
                                <th colspan="4">24 Hours</th>
                            </tr>
                            <tr>
                                <th>ACD(s)</th>
                                <th>ABR</th>
                                <th>Calls</th>
                                <th>PDD</th>
                                <th>ACD(s)</th>
                                <th>ABR</th>
                                <th>Calls</th>
                                <th>PDD</th>
                                <th>ACD(s)</th>
                                <th>ABR</th>
                                <th>Calls</th>
                                <th>PDD</th>
                            </tr>
                          </thead>
						  <tbody>
							<tr v-for="client in filterBy(clients, resource_name_search)">
								<td>{{client.resource}}</td>
								<td>{{client.acd15}}</td>
								<td>{{client.abr15}}</td>
								<td>{{client.calls15}}</td>
								<td>{{client.pdd15}}</td>
								<td>{{client.acd1h}}</td>
								<td>{{client.abr1h}}</td>
								<td>{{client.calls1h}}</td>
								<td>{{client.pdd1h}}</td>
								<td>{{client.acd24h}}</td>
								<td>{{client.habr24h}}</td>
								<td>{{client.calls24h}}</td>
								<td>{{client.pdd24h}}</td>
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
	</div>
</template>

<script>   
	const vSelect = require('vue!../main_components/select.vue'),
		  Pagination = require('vue!../main_components/pagination.vue')
	module.exports = {
		components: {
			'select2': vSelect,
			'pagination': Pagination
		},
		data: function(){
            return {
			  resource_name_search: '',
			  selected_slot: '',
			  pageOne: {
                currentPage: 1,
                totalPages: 10
              },
			  selected: 1,
			  options: [
				  { id: 1, text: '3 minutes' },
				  { id: 2, text: '5 minutes' },
				  { id: 3, text: '15 minutes' }
			  ],
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
			  clients: [
				{
				  resource: 'egress_test',
				  acd15: '0.00',
				  abr15: '0.00',
				  calls15: '0',
				  pdd15: '0',
				  acd1h: '0.00',
				  abr1h: '0.00',
				  calls1h: '0',
				  pdd1h: '0',
				  acd24h: '9.43',
				  abr24h: '100.00',
				  calls24h: '10',
				  pdd24h: '51'
				}
			  ]
            }
        },
		methods: {
			pageOneChanged (pageNum) {
				this.pageOne.currentPage = pageNum
			}
		}
	}
</script>
