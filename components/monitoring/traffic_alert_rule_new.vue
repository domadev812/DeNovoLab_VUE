<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a>Monitoring</a></li>
				  <li class="breadcrumb-item">
					  <router-link to="/monitoring/traffic_alert_rule">Traffic Alert Rule</router-link>
				  </li>
				  <li class="breadcrumb-item active">Traffic Alert Rule Editor</li>
			</ol>
			<h1 class="page-header">Traffic Alert Rule Editor</h1>
			<router-link to="/monitoring/traffic_alert_rule" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad configuration_pad">
				<div class="col-md-12 col-sm-12">
					<form class="form">
                        <div class="row">
                                <div class="col-sm-6">
									<div class="form-group">
                                        <label>Carrier:</label>
										<select multiple="multiple" id="carrier" name="or_trunk">
											<option v-for="trunk in trunk_options" :value='trunk.value'>{{trunk.text}}</option>
										</select>
									</div>
								</div>
                                <div class="col-sm-6">
									<div class="form-group">
                                        <label>Destination:</label>
										<select multiple="multiple" id="destination" name="or_trunk">
											<option v-for="trunk in trunk_options" :value='trunk.value'>{{trunk.text}}</option>
										</select>
									</div>
								</div>
                                <div class="clearfix little-space"></div>
                                <div class="col-sm-6">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <label>Traffic Traffic Alert When:</label>
                                            <div class="form-group">
                                                <p class="inline">
                                                    <input type="text" name="" class="form-control small">When call count increases from zero to over<input type="text" name="" class="form-control small"> in an hour. 
                                                </p>
                                                <br>
                                                <p class="inline">
                                                   <input type="text" name="" class="form-control small"> When call count increases by<input type="text" name="" class="form-control small"> % in an hour.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix little-space"></div>
                                <div class="col-md-3 col-sm-6">
                                    <div class="form-group">
                                        <label for="max_lines">From E-mail:</label>
                                        <select2 :options="options" v-model="select"></select2>
                                    </div>
                                </div>
                                <div class="col-md-5 col-sm-6">
                                    <div class="form-group">
                                        <label for="max_lines">Notification Subject:</label>
                                        <input type="text" name="max_lines" v-model="max_lines" class="form-control" placeholder="Enter Notification Subject">
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                                <div class="col-md-8 col-sm-8">
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
		  vSelect = require('vue!../main_components/select.vue'),
          Ckeditor = require('vue!../main_components/ckeditor.vue');
	module.exports = {
		components: {
			'multiselect': multiselect,
			'select2': vSelect,
            Ckeditor
		},
		data: function(){
            return {
              editorA: 'editor-a',
              contentA: '',
			  trunk_options: [
				  { id: 1, value: 'trunk1', text: 'Trunk 1' },
				  { id: 2, value: 'trunk2', text: 'Trunk 2' },
				  { id: 3, value: 'trunk3', text: 'Trunk 3' },
				  { id: 4, value: 'trunk4', text: 'Trunk 4' },
				  { id: 5, value: 'trunk5', text: 'Trunk 5' }
			  ],
			  orc: [],
			  alias:'',
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
			  ]
            }
        },
		mounted: function() {
			$('#carrier').multiSelect({
				 selectableHeader: "<div class='custom-header'>Selectable Fields</div>",
  				 selectionHeader: "<div class='custom-header'>Selected Fields</div>"
			});
            $('#destination').multiSelect({
				 selectableHeader: "<div class='custom-header'>Selectable Fields</div>",
  				 selectionHeader: "<div class='custom-header'>Selected Fields</div>"
			});
		}
	}
</script>

<style>
    .radio.radio-success.m-right-10 {
        margin-right: 10px;
    }
    
    .radio.radio-success.m-right-10 .radio-custom + .radio-custom-label:before {
        margin-right: 5px;
    }
</style>
