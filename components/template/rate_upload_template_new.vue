<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a>Template</a></li>
				  <li class="breadcrumb-item">
					  <router-link to="/template/rate_upload_template">Rate Upload Template</router-link>
				  </li>
				  <li class="breadcrumb-item active">Rate Upload Template Editor</li>
			</ol>
			<h1 class="page-header">Rate Upload Template Editor</h1>
			<router-link to="/template/rate_upload_template" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad configuration_pad">
				<div class="col-md-12 col-sm-12">
					<form class="form">
                        <div class="row">
                                <div class="clearfix"></div>
                                <div class="col-md-3 col-sm-4">
                                    <div class="form-group">
                                        <label for="alias">Template Name:</label>
                                        <input type="text" name="template_name" v-model="template_name" class="form-control" placeholder="Enter Template Name">
                                    </div>
                                </div>
                                <div class="clearfix little-space"></div>
                                <div class="col-sm-12">
                                    <label>For rate record with the same code and effective date is found:</label>
                                    <div class="form-group">
                                        <div class="radio radio-success m-right-10">
                                            <input id="radio-1" class="radio-custom" name="duplicates" type="radio" checked>
                                            <label for="radio-1" class="radio-custom-label">Delete Existing Records</label>
                                        </div>
                                        <div class="radio radio-success m-right-10">
                                            <input id="radio-2" class="radio-custom" name="duplicates" type="radio">
                                            <label for="radio-2" class="radio-custom-label">End-Date Existing Records</label>
                                        </div>
                                        <div class="radio radio-success m-right-10">
                                            <input id="radio-3" class="radio-custom" name="duplicates" type="radio">
                                            <label for="radio-3" class="radio-custom-label">End-Date All Records</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                                <div class="col-md-3 col-sm-3">
                                    <div class="form-group">
                                        <label for="max_lines">Effective Date Format:</label>
                                        <select2 :options="options" v-model="effective_date_format"></select2>
                                    </div>
                                </div>
                                <div class="col-md-2 col-sm-3">
                                    <div class="form-group m-top-33">
                                        <div class="checkbox checkbox-success">
                                            <input id="has_code_deck" name="has_code_deck" type="checkbox" checked>
                                            <label for="has_code_deck">Has Code Deck:</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-2 col-sm-3">
                                    <div class="form-group m-top-33">
                                        <div class="checkbox checkbox-success">
                                            <input id="file_with_header" name="file_with_header" type="checkbox" checked>
                                            <label for="file_with_header">File With Header:</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-2 col-sm-3">
                                    <div class="form-group m-top-33">
                                        <div class="checkbox checkbox-success">
                                            <input id="append_prefix" name="append_prefix" type="checkbox" checked>
                                            <label for="append_prefix">Append Prefix:</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix little-space"></div>
                                <div class="col-sm-6">
									<div class="form-group">
                                        <label>File Headers:</label>
										<select multiple="multiple" id="or_trunk" name="or_trunk">
											<option v-for="trunk in trunk_options" :value='trunk.value'>{{trunk.text}}</option>
										</select>
									</div>
								</div>
                                <div class="col-sm-6">
                                    <div class="row">
                                        <div class="col-sm-6">
                                             <div class="form-group">
                                                <label for="set_default_effective_date">Set Default Effective Date:</label>
                                                <input type="text" name="set_default_effective_date" v-model="set_default_effective_date" class="form-control" placeholder="Enter Default Effective Date">
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="default_min_time">Set Default Min Time:</label>
                                                <input type="text" name="default_min_time" v-model="default_min_time" class="form-control" placeholder="Enter Default Min Time">
                                            </div>
                                        </div>
                                        <div class="clearfix little-space"></div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="default_interval">Set Default Interval:</label>
                                                <input type="text" name="default_interval" v-model="default_interval" class="form-control" placeholder="Enter Default Interval">
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group m-top-33">
                                                <div class="checkbox checkbox-success">
                                                    <input id="date_criteria" name="date_criteria" type="checkbox" checked>
                                                    <label for="date_criteria">Check Effective Date Criteria</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                          </div>
						  
						  <div class="button_set little-space">
							<a class="btn btn-primary">
								Submit
							</a>
							<a class="btn btn-default">
								Reset
							</a>
						  </div>
					</form>
				</div>
				<div class="clearfix little-space"></div>
			</div>
		</div>
	  </div>
	</div>
</template>

<script>   
	const multiselect = require('multiselect'),
		  vSelect = require('vue!../main_components/select.vue');
	module.exports = {
		components: {
			'multiselect': multiselect,
			'select2': vSelect
		},
		data: function(){
            return {
			  gmt: '',
              set_default_effective_date: '',
              effective_date_format: '',
              default_min_time: '',
              default_interval: '',
              end_date_time: '',
			  template_name: '',
			  ftp_execute_on: '',
			  max_lines: '',
			  server_ip: '',
			  server_port: '',
			  user_name: '',
			  server_dir: '',
			  pass: '',
              select: '',
			  groupname: '',
			  options: [
				  { id: 1, value: 'carrier1', text: 'Carrier 1' },
				  { id: 2, value: 'carrier2', text: 'Carrier 2' },
				  { id: 3, value: 'carrier3', text: 'Carrier 3' },
				  { id: 4, value: 'carrier4', text: 'Carrier 4' },
				  { id: 5, value: 'carrier5', text: 'Carrier 5' }
			  ],
              
            }
        },
		mounted: function() {
			$('#or_trunk').multiSelect({
				 selectableHeader: "<div class='custom-header'>Selectable Fields</div>",
  				 selectionHeader: "<div class='custom-header'>Selected Fields</div>"
			});
		}
	}
</script>

<style>
</style>
