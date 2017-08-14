<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a>Origination</a></li>
                  <li class="breadcrumb-item"> 
                      <router-link to="/routing/dynamic_routing">Dynamic Routing</router-link>
                  </li>
				  <li class="breadcrumb-item active">QoS Parameters</li>
			</ol>
			<h1 class="page-header">QoS Parameters</h1>
            <router-link to="/routing/dynamic_routing" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad table_wrap">
				<div class="advanced_search_filter_panel bottom_0">
					<div class="inline-block search_wrapper pull-left">
						<label>Name:</label>
						<br>
						<input type="text" name="credit_search" v-model="credit_search" class="form-control inline-block search_field" placeholder="Enter Client Name">
						<span class="dnl_icon dnl_musica-searcher"></span>
					</div>
                    <div class="col-md-4 col-sm-8">
                        <div class="inlined">
                            <label for="asr_range_1">ASR Range:</label>
                            <input type="text" name="asr_range_1" v-model="asr_range_1" class="form-control" placeholder="Enter ASR Range">
                        </div>
                        <div class="inlined">
                            <label for="asr_range_2" class="m-top-15"></label>
                            <input type="text" name="asr_range_2" v-model="asr_range_2" class="form-control" placeholder="Enter ASR Range">
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-8">
                        <div class="inlined">
                            <label for="acd_range_1">ACD Range:</label>
                            <input type="text" name="acd_range_1" v-model="acd_range_1" class="form-control" placeholder="Enter ACD Range">
                        </div>
                        <div class="inlined">
                            <label for="acd_range_2" class="m-top-15"></label>
                            <input type="text" name="acd_range_2" v-model="acd_range_2" class="form-control" placeholder="Enter ACD Range">
                        </div>
                    </div>
                    <div class="clearfix little-space"></div>
                     <div class="inline-block">
                        <a class="btn btn-primary">
                            Query
                        </a>
                    </div>
                    <div class="clearfix"></div>
				</div>
				<div class="clearfix"></div>
                <a class="btn btn-primary mini pull-right m-top-20">
                    <span class="dnl_icon dnl_add"></span> Create new 
                </a>
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
                          <th>Prefix</th>
						  <th>Min ASR<span class="dnl_icon dnl_sort pull-right"></span></th>
						  <th>Max ASR</th>
						  <th>Min ACD</th>
						  <th>Max ACD</th>
						  <th>Max Price</th>
						  <th class="width_98">Actions</th>
						</tr>
					  </thead>
					  <tbody>
						<tr v-for="parameter in filterBy(parameters, credit_search)">
                          <td>{{parameter.prefix}}</td>
						  <td>{{parameter.min_asr}}</td>
						  <td>{{parameter.max_asr}}</td>
						  <td>{{parameter.min_acd}}</td>
						  <td>{{parameter.max_acd}}</td>
						  <td>{{parameter.max_price}}</td>
						  <td>
							  <a class="action action_edit" data-toggle="tooltip" data-placement="top" title="Edit">
								  <span class="dnl_icon dnl_action_edit"></span>
							  </a>
							  <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete">
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
              asr_range_1: '',
              asr_range_2: '',
              acd_range_1: '',
              acd_range_2: '',
			  credit_search:'',
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
			  parameters: [
				{
				  prefix: 'ipo',
				  min_asr: '3',
                  max_asr: '3',
                  min_acd: '10',
                  max_acd: '12',
                  max_price: '650'
				},
                {
				  prefix: 'ipo',
				  min_asr: '3',
                  max_asr: '3',
                  min_acd: '10',
                  max_acd: '12',
                  max_price: '650'
				},
                {
				  prefix: 'ipo',
				  min_asr: '3',
                  max_asr: '3',
                  min_acd: '10',
                  max_acd: '12',
                  max_price: '650'
				},
                {
				  prefix: 'ipo',
				  min_asr: '3',
                  max_asr: '3',
                  min_acd: '10',
                  max_acd: '12',
                  max_price: '650'
				},
                {
				  prefix: 'ipo',
				  min_asr: '3',
                  max_asr: '3',
                  min_acd: '10',
                  max_acd: '12',
                  max_price: '650'
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
</style>
