<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a>Switch</a></li>
                  <li class="breadcrumb-item">
                      <router-link to="/switch/rate_table">Rate Table</router-link>
                  </li>
				  <li class="breadcrumb-item active">Send Rate Log</li>
			</ol>
			<h1 class="page-header">Send Rate Log</h1>
            <router-link to="/switch/rate_table/" class="btn btn_white back">
                <span class="dnl_icon dnl_import"></span> Back 
            </router-link>
            <div class="timeline">
                <div class="chart_content">
                    <div class="table_filters marged-40">
                        <div class="inline-block select_min_wrapper">
                            <span class="inline-block">Page row:</span>
                            <select2 :options="options" v-model="selected1" class="inline-block">
                            </select2>
                        </div>
                        <div class="inline-block">
                            <select2 :options="options" v-model="selected2">
                                <option disabled value="0">Show/Hide Columns</option>
                            </select2>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="table-responsive marged-30">
                            <table class="table table-striped table-hover carrier_groups aligned-center">
                              <thead>
                                <tr>
                                  <th>Trunk <span class="dnl_icon dnl_sort pull-right"></span></th>
                                  <th>Delivered To</th>
                                  <th>Status</th>
                                  <th class="width-78">Error File</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="trunk in trunks">
                                  <td>{{trunk.trunk}}</td>
                                  <td>{{trunk.delivered_to}}</td>
                                  <td>{{trunk.status}}</td>
                                  <td>
                                    <a class="action action_download error" data-toggle="tooltip" data-placement="top" title="Download Error File">
                                          <span class="dnl_icon dnl_download"></span>
                                    </a>  
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                        </div>
                        <div class="pull-right pagination m-r-30">
                            <pagination :current-page="pageOne.currentPage"
                                        :total-pages="pageOne.totalPages"
                                        @page-changed="pageOneChanged">
                            </pagination>
                        </div>
                    </div>
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
			  options: [
				  { id: 1, value: 'carrier1', text: 'Carrier 1' },
				  { id: 2, value: 'carrier2', text: 'Carrier 2' },
				  { id: 3, value: 'carrier3', text: 'Carrier 3' },
				  { id: 4, value: 'carrier4', text: 'Carrier 4' },
				  { id: 5, value: 'carrier5', text: 'Carrier 5' }
			  ],
			  selected1: 1,
			  selected2: 1,
			  trunks: [
				  {
					trunk: 'ABC Telecom_ABCD_127',
					delivered_to: 'atul@denovolab.com',
					status: 'Succeed',
				  },
                  {
					trunk: 'ABC Telecom_ABCD_127',
					delivered_to: 'atul@denovolab.com',
					status: 'Succeed',
				  },
                  {
					trunk: 'ABC Telecom_ABCD_127',
					delivered_to: 'atul@denovolab.com',
					status: 'Succeed',
				  },
                  {
					trunk: 'ABC Telecom_ABCD_127',
					delivered_to: 'atul@denovolab.com',
					status: 'Succeed',
				  },
                  {
					trunk: 'ABC Telecom_ABCD_127',
					delivered_to: 'atul@denovolab.com',
					status: 'Succeed',
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
