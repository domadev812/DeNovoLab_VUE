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
				  <li class="breadcrumb-item active">Send Rate</li>
			</ol>
			<h1 class="page-header">Send Rate</h1>
			<router-link to="/switch/rate_table" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad send_rate">
			<div class="row">
				  <div class="col-md-3 col-sm-4">
					<div class="form-group">
						<label>Rate Deck Format:</label>
						<select2 :options="options" v-model="rate_deck_format">
						</select2>
					</div>
				  </div>
				  <div class="col-md-3 col-sm-4">
					<div class="form-group">
						<label for="effective_date">Effective Date:</label>
						<input type="text" name="effective_date" v-model="effective_date" class="form-control" placeholder="Enter Effective Date">
					</div>
				  </div>
				  <div class="col-md-3 col-sm-4">
					<div class="form-group">
						<label>Rate E-mail Template:</label>
						<select2 :options="options" v-model="rate_email_template">
						</select2>
					</div>
				  </div>
				  <div class="col-md-3 col-sm-4">
					<div class="form-group">
						<label>Download Method:</label>
						<select2 :options="options" v-model="download_method">
						</select2>
					</div>
				  </div>
				  <div class="col-md-3 col-sm-4">
					<div class="form-group">
						<label>Send Type:</label>
						<select2 :options="options" v-model="send_type">
						</select2>
					</div>
				  </div>
				  <div class="col-md-3 col-sm-4">
					<div class="form-group m-top-33">
						<div class="checkbox checkbox-success">
							<input id="zipped" name="zipped" type="checkbox"> 
							<label for="zipped">Zipped</label>
						</div>
					</div>
				  </div>
				  <div class="clearfix"></div>
				  <div class="col-md-6" col-sm-8>
					  <div class="form-group">
						  <label for="groupname">Headers:</label>
						  <select multiple="multiple" id="headers" name="headers">
							<option v-for="option in options" :value='option.value'>{{option.text}}</option>
						  </select>
					  </div>
				  </div>
				  <div class="clearfix"></div>
				  <div class="col-md-3 col-sm-4">
						<div class="form-group">
							<label for="groupname">From E-mail:</label>
							<select2 :options="options" v-model="email"></select2>
						</div>
				   </div>
				   <div class="col-md-3 col-sm-4">
						<div class="form-group">
							<label for="groupname">Subject:</label> 
							<input type="text" name="groupname" v-model="subject" placeholder="Enter Subject" class="form-control">
						</div>
				   </div>
				   <div class="col-md-3 col-sm-4">
						<div class="form-group">
							<div class="form-group">
							<label for="groupname">Copy:</label> <input type="text" name="groupname" placeholder="Enter Copy" v-model="copy" class="form-control">
						</div>
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
			  <div class="button_set little-space">
				<a class="btn btn-primary">
					Submit
				</a>
				<a class="btn btn-default">
					Reset
				</a>
				<a class="btn btn-default">
					Save as New Template
				</a>
			  </div>
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
			  copy:'',
			  email: '',
			  subject: '',
			  rate_deck_format:'',
			  groupname: '',
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
			  ]
            }
        },
		mounted: function() {
			$('#headers').multiSelect({
				 selectableHeader: "<div class='custom-header'>Headers</div>",
  				 selectionHeader: "<div class='custom-header'>Selected</div>"
			});
		}
	}
</script>

<style>
	.send_rate .checkbox-success input[type="checkbox"]:checked + label::before {
		background-color: #03c0fc;
		border-color: #03c0fc;
	}
</style>
