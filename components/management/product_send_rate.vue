<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Management</a></li>
				  <li class="breadcrumb-item">
					  <router-link to="/management/products">Products</router-link>
				  </li>
				  <li class="breadcrumb-item active">Product Send Rate</li>
			</ol>
			<h1 class="page-header">Product Send Rate</h1>
			<router-link to="/management/products" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad product_add">
			<div class="row">
				  <div class="col-md-3 col-sm-4">
					<div class="form-group">
						<label>Product:</label>
						<select2 :options="options" v-model="product"></select2>
					</div>
				  </div>
				  <div class="col-md-3 col-sm-4">
					<div class="form-group">
						<div class="form-group">
							<label>E-mail Template:</label>
							<select2 :options="options" v-model="email_template">
							</select2>
						</div>
					</div>
				  </div>
				  <div class="col-md-1 col-sm-2">
					  <div class="inline_actions">
						  <a><span class="dnl_icon dnl_action_edit"></span></a>
						  <a><span class="dnl_icon dnl_add"></span></a>
						  <a><span class="dnl_icon dnl_reload"></span></a>
					  </div>
				  </div>
				  <div class="clearfix little-space"></div>
				  <div class="col-md-3 col-sm-4">
					<div class="form-group">
						<div class="form-group">
							<label>Get Type:</label>
							<select2 :options="options" v-model="get_type">
							</select2>
						</div>
					</div>
				  </div>
				  <div class="col-md-3 col-sm-4">
					<div class="form-group">
						<div class="form-group">
							<label class="empty_label"></label>
							<select2 :options="options" v-model="get_type2">
							</select2>
						</div>
					</div>
				  </div>
			      <div class="clearfix little-space"></div>
			  </div>
			  <div class="table-responsive">
					<table class="table table-striped table-hover carrier_fields product_send_rate">
					  <thead>
						<tr>
						  <th class="width-65">
							  <div class="checkbox checkbox-success">
							  	<input id="checker" name="checker" type="checkbox" v-model="checker">
							  	<label for="checker"></label>
							  </div>
						  </th>
						  <th>Client ID</th>
						  <th>Client Name <span class="dnl_icon dnl_sort pull-right"></span></th>
						  <th>Trunk Name</th>
						  <th>E-mail</th>
						</tr>
					  </thead>
					  <tbody>
						<tr v-for="client in orderBy(clients, 'client_name')">
						  <td class="centred_checkbox">
							  <div class="checkbox checkbox-success">
									<input :id="client.status_id" :name="client.status_id" type="checkbox" v-model="client.status">
									<label :for="client.status_id"></label>
							  </div>
						  </td>
						  <td>{{client.id}}</td>
						  <td>{{client.name}}</td>
						  <td>{{client.trunk_name}}</td>
						  <td>{{client.email}}</td>
						</tr>
					  </tbody>
					</table>
				</div>
				<div class="clearfix little-space"></div>
			    <div class="button_set text-center">
					<a class="btn btn-primary mini">
						Submit
					</a> 
					<a class="btn btn-default mini">
						Reset
					</a>
				</div>
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
			  product: '',
			  get_type: '',
			  email_template: '',
			  get_type2: '',
			  checker: false,
			  options: [
				  { id: 1, value: 'carrier1', text: 'Carrier 1' },
				  { id: 2, value: 'carrier2', text: 'Carrier 2' },
				  { id: 3, value: 'carrier3', text: 'Carrier 3' },
				  { id: 4, value: 'carrier4', text: 'Carrier 4' },
				  { id: 5, value: 'carrier5', text: 'Carrier 5' }
			  ],
			  clients: [
				{
				  status_id: "check_1",
				  status: true,
				  id: "i1",
				  name: "Name1",
				  trunk_name: "Trunk Name1",
				  email: "client1@gmail.com"
				},
				{
				  status_id: "check_2",
				  status: true,
				  id: "i2",
				  name: "Name2",
				  trunk_name: "Trunk Name2",
				  email: "client2@gmail.com"
				},
				{
				  status_id: "check_3",
				  status: true,
				  id: "i3",
				  name: "Name3",
				  trunk_name: "Trunk Name3",
				  email: "client3@gmail.com"
				},
				{
				  status_id: "check_4",
				  status: true,
				  id: "i4",
				  name: "Name4",
				  trunk_name: "Trunk Name4",
				  email: "client4@gmail.com"
				},
				{
				  status_id: "check_5",
				  status: true,
				  id: "i5",
				  name: "Name5",
				  trunk_name: "Trunk Name5",
				  email: "client5@gmail.com"
				},
			 ]
            }
        },
		mounted: function() {
			$('#carrier').multiSelect({
				 selectableHeader: "<div class='custom-header'>Optional Selection</div>",
  				 selectionHeader: "<div class='custom-header'>Selected Selection</div>"
			});
		}
	}
</script>

<style>
	.inline_actions span.dnl_icon.dnl_action_edit {
		font-size: 21px;
		padding-left: 0;
		vertical-align: sub;
	}
	
	.product_send_rate th.width-65 .checkbox-success {
		margin: 5px 0 -2px 17px;
	}
</style>
