<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Tools</a></li>
				  <li class="breadcrumb-item">
                      <router-link to="/tools/rate_generation">Rate Generation</router-link>
                  </li>
                  <li class="breadcrumb-item active">Apply to Rate Table</li>
			</ol>
			<h1 class="page-header">Apply to Rate Table</h1>
            <router-link to="/tools/rate_generation" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
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
                    <a class="btn btn-primary mini pull-right">
						<span class="dnl_icon dnl_add"></span> Create new 
					</a>
				</div>
				<div class="table-responsive">
					<table class="table table-striped table-hover carrier_groups">
					  <thead>
                        <tr>
                            <th>Rate Table</th>
                            <th>Effective Date</th>
                            <th>End Date</th>
                            <th>Send Email</th>
                            <th>End Date Method&amp;End Date</th>
                            <th>Email Template</th>
                            <th class="width_138">Action</th>
                        </tr>
                      </thead>
					  <tbody>
						<tr v-for="rate in rates">
						  <td><input type="text" :value="rate.rate_table" class="form-control"></td>
                          <td><input type="text" :value="rate.effective_date" class="form-control"></td>
                          <td><input type="text" :value="rate.end_date" class="form-control"></td>
                          <td><input type="text" :value="rate.send_email" class="form-control"></td>
                          <td><input type="text" :value="rate.end_date_method" class="form-control"></td>
                          <td><input type="text" :value="rate.email_template" class="form-control"></td>
						  <td>
							  <a class="action action_read" data-toggle="tooltip" data-placement="top" title="View" @click="showModal='add_rate_email'">
								  <span class="dnl_icon dnl_eye"></span>
							  </a>
							  <a class="action action_add" data-toggle="tooltip" data-placement="top" title="Create New" @click="showModal='add_rate_email'">
								  <span class="dnl_icon dnl_add"></span>
							  </a>
							  <a class="action action_reset" data-toggle="tooltip" data-placement="top" title="Refresh" @click="showModal='add_rate_email'">
								  <span class="dnl_icon dnl_refresh"></span>
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
      <modal v-if="showModal=='add_rate_email'" @close="showModal = ''" class="biggest_modal">
            <h3 slot="header">Add Rate Email Template</h3>
            <div slot="body">
                <div class="row">
				  <div class="col-md-6 col-sm-6">
					<div class="form-group">
						<label for="template_name">Template Name:</label> 
				        <input type="text" name="templeate_name" v-model="templeate_name" placeholder="Enter Template Name" class="form-control">
					</div>
				  </div>
				  <div class="col-md-6 col-sm-6">
					<div class="form-group">
						<label>Download Method:</label>
						<select2 :options="options" v-model="download_method">
						</select2>
					</div>
				  </div>
				  <div class="clearfix"></div>
				  <div class="col-md-12" col-sm-12>
					  <div class="form-group">
						  <label for="groupname">Headers:</label>
						  <select multiple="multiple" id="headers" name="headers">
							<option v-for="option in options" :value='option.value'>{{option.text}}</option>
						  </select>
					  </div>
				  </div>
				  <div class="clearfix"></div>
				  <div class="col-md-4 col-sm-4">
						<div class="form-group">
							<label for="groupname">From E-mail:</label>
							<select2 :options="options" v-model="email"></select2>
						</div>
				   </div>
                   <div class="col-md-4 col-sm-4">
						<div class="form-group">
							<div class="form-group">
							<label for="groupname">Copy:</label> <input type="text" name="groupname" placeholder="Enter Copy" v-model="copy" class="form-control">
						</div>
						</div>
				   </div>
				   <div class="col-md-4 col-sm-4">
						<div class="form-group">
							<label for="groupname">Subject:</label> 
							<input type="text" name="groupname" v-model="subject" placeholder="Enter Subject" class="form-control">
						</div>
				   </div>
				   <div class="clearfix little-space"></div>
				   <div class="col-md-12 ">
				   	  <label>Content:</label>
				  	  <ckeditor v-model="contentA" :id="editorA" :height="'280px'" :toolbar="[['Format']]"></ckeditor>
				   </div>
				   <div class="col-md-12 m-top-20">
						<div class="form-group tags">
							<label for="groupname">Tags:</label> 
							<span class="label label-default">#Username</span>
							<span class="label label-default">#Url</span>
							<span class="label label-default">#Welcoms</span>
						</div>
					</div>
			  </div>
            </div>
            <div slot="footer">
                <div class="button_set little-space">
				<a class="btn btn-primary">
					Submit
				</a>
				<a class="btn btn-default" @click="closeModal">
					Close
				</a>
			  </div>
            </div>
        </modal>
	</div>
</template>

<script>   
	const vSelect = require('vue!../main_components/select.vue'),
		  Pagination = require('vue!../main_components/pagination.vue'),
          modal = require('vue!../main_components/modal.vue'),
          multiselect = require('multiselect'),
          Ckeditor = require('vue!../main_components/ckeditor.vue');
	module.exports = {
		components: {
			'select2': vSelect,
			'pagination': Pagination,
            'modal': modal,
            'multiselect': multiselect,
            Ckeditor
		},
		data: function(){
            return {
			  pageOne: {
                currentPage: 1,
                totalPages: 10
              },
               editorA: 'editor-a',
			  contentA: '',
			  copy:'',
			  email: '',
			  subject: '',
			  templeate_name: '',
			  effective_date: '',
			  rate_email_template: '',
			  download_method: '',
			  send_type: '',
			  options: [
				  { id: 1, value: 'carrier1', text: 'Carrier 1' },
				  { id: 2, value: 'carrier2', text: 'Carrier 2' },
				  { id: 3, value: 'carrier3', text: 'Carrier 3' },
				  { id: 4, value: 'carrier4', text: 'Carrier 4' },
				  { id: 5, value: 'carrier5', text: 'Carrier 5' }
			  ],
              showModal: '',
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
			  rates: [
				{
				  rate_table: "Rate Table",
				  effective_date: "2016-11-18 03:45:48+00",
                  end_date: 'DNL Support',
                  send_email: '2016-11-30 07:57:26+00',
                  end_date_method: '',
                  email_template: ''
				}
			  ],
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
		},
        updated: function() {
            $('#headers').multiSelect({
				 selectableHeader: "<div class='custom-header'>Selectable Items</div>",
  				 selectionHeader: "<div class='custom-header'>Selected Items</div>"
			});
        }
	}
</script>

<style>
    .width_110 {
        width: 110px;
    }
    
    a.action.action_add {
        font-size: 16px;
        vertical-align: top;
        padding-top: 4px;
    }
</style>
