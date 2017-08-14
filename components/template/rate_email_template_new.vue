<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Template</a></li>
				  <li class="breadcrumb-item">
					  <router-link to="/template/rate_email_template">Rate Email Template</router-link>
				  </li>
				  <li class="breadcrumb-item active">Rate Email Template Editor</li>
			</ol>
			<h1 class="page-header">Rate Email Template Editor</h1>
			<router-link to="/template/rate_email_template" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad">
                <div class="col-sm-12">
                    <div class="row">
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group">
                                <div class="form-group">
                                    <label for="groupname">Template Name:</label> <input type="text" name="groupname" placeholder="Enter Template Name" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group">
                                <label for="groupname">Download Method:</label>
                                <select2 :options="download_options" v-model="download_method"></select2>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <div class="col-md-6 col-sm-8">
                              <label for="groupname">Headers:</label>
                              <select multiple="multiple" id="user_detail_fields" name="carrier">
                                <option v-for="option in options" :value='option.value'>{{option.text}}</option>
                              </select>
                        </div>
                        <div class="clearfix little-space"></div>
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group">
                                <label for="groupname">From E-mail:</label>
                                <select2 :options="email_options" v-model="email"></select2>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group">
                                <div class="form-group">
                                <label for="groupname">Copy:</label> <input type="text" name="groupname" placeholder="Enter E-mail for Copy" class="form-control">
                            </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-4">
                            <div class="form-group">
                                <label for="groupname">Subject:</label> 
                                <input type="text" name="groupname" placeholder="Enter Subject" class="form-control">
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <label>Content:</label>
                    <ckeditor v-model="contentA" :id="editorA" :height="'280px'" :toolbar="[['Format']]"></ckeditor>
                    <div class="row">
                        <div class="col-md-12 m-top-20">
                            <div class="form-group tags">
                                <label for="groupname">Tags:</label> 
                                <span class="label label-default">#Username</span>
                                <span class="label label-default">#Url</span>
                                <span class="label label-default">#Welcoms</span>
                            </div>
                        </div>
                    </div>
                    <div class="button_set m-top-20">
                        <a class="btn btn-primary mini">
                            Submit
                        </a>
                        <a class="btn btn-default mini">
                            Reset
                        </a>
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
		  multiselect = require('multiselect'),
          Ckeditor = require('vue!../main_components/ckeditor.vue');
	module.exports = {
		components: {
			'select2': vSelect,
			'multiselect': multiselect,
            Ckeditor
		},
		data: function(){
            return {
                editorA: 'editor-a',
				contentA: '',
                contentF: '',
				email: '1',
                template_name: '',
                download_method: '',
				email_options: [
				  { id: 1, text: 'user1@gmail.com' },
				  { id: 2, text: 'user2@gmail.com' },
				  { id: 3, text: 'user3@gmail.com' },
				  { id: 4, text: 'user4@gmail.com' },
				  { id: 5, text: 'user5@gmail.com' }
				],
                download_options: [
                    { id: 1, text: 'Send as Link'},
                    { id: 2, text: 'Send as Attachement'},
                ],
                options: [
					  { id: 1, value: 'carrier1', text: 'Carrier 1' },
					  { id: 2, value: 'carrier2', text: 'Carrier 2' },
					  { id: 3, value: 'carrier3', text: 'Carrier 3' },
					  { id: 4, value: 'carrier4', text: 'Carrier 4' },
					  { id: 5, value: 'carrier5', text: 'Carrier 5' }
				]
            }
        },
		methods: {
		},
		mounted: function() {
			$('#user_detail_fields').multiSelect({
				 selectableHeader: "<div class='custom-header'>Unappropriated</div>",
  				 selectionHeader: "<div class='custom-header'>Unappropriated</div>"
			});
		}
	}
</script>

<style>
</style>
