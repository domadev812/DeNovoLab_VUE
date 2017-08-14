<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Switch</a></li>
				  <li class="breadcrumb-item">
                      <router-link to="/switch/rate_table">Rate Table</router-link>
                  </li>
                  <li class="breadcrumb-item active">Assign Rate Deck</li>
			</ol>
			<h1 class="page-header">Assign Rate Deck</h1>
            <router-link to="/switch/rate_table/" class="btn btn_white back">
                <span class="dnl_icon dnl_import"></span> Back 
            </router-link>
			<div class="white_pad table_wrap">
				<div class="table_filters">
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
					<router-link to="/configuration/carrier_group/new" class="btn btn-primary mini pull-right">
						<span class="dnl_icon dnl_add"></span> Assign Selected 
					</router-link>
				</div>
				<div class="table-responsive">
					<table class="table table-striped table-hover carrier_groups">
					  <thead>
						<tr>
                          <th class="width-65">
                              <div class="checkbox checkbox-success">
                                <input type="checkbox" v-model="checker">
                                <label></label>
                              </div>
                          </th>
						  <th>Carrier <span class="dnl_icon dnl_sort pull-right"></span></th>
						  <th>Ingress</th>
						  <th>Prefix</th>
						</tr>
					  </thead>
					  <tbody>
						<tr v-for="carrier in carriers">
                          <td class="centred_checkbox">
                              <div class="checkbox checkbox-success">
                                <input id="checker" name="checker" type="checkbox" v-model="checker">
                                <label for="checker"></label>
                              </div>
                          </td>
						  <td>{{carrier.carrier}}</td>
						  <td>{{carrier.ingress}}</td>
                          <td>{{carrier.prefix}}</td>
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
	module.exports = {
		components: {
			'select2': vSelect,
			'pagination': Pagination
		},
		data: function(){
            return {
			  pageOne: {
                currentPage: 1,
                totalPages: 10
              },
              checker: '',
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
				  { id: 1, text: 'Group Name' },
				  { id: 2, text: 'Carrier Count' },
				  { id: 3, text: 'Actions' }
			  ],
			  carriers: [
				{
				  carrier: "ABC Telecom",
				  ingress: "ABC Telecom_ABCD_127",
                  prefix: '12'
				},
                {
				  carrier: "ABC Telecom",
				  ingress: "ABC Telecom_ABCD_127",
                  prefix: '12'
				},
                {
				  carrier: "ABC Telecom",
				  ingress: "ABC Telecom_ABCD_127",
                  prefix: '12'
				},
                {
				  carrier: "ABC Telecom",
				  ingress: "ABC Telecom_ABCD_127",
                  prefix: '12'
				},
                {
				  carrier: "ABC Telecom",
				  ingress: "ABC Telecom_ABCD_127",
                  prefix: '12'
				}
			  ]
            }
        },
		methods: {
			pageOneChanged (pageNum) {
				this.pageOne.currentPage = pageNum
			}
		},
		mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
		}
	}
</script>

<style>
	
</style>
