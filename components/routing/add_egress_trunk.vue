<template>
	<div class="container-fluid">
	  <modal v-if="showModal=='add_rate_table'" @close="showModal = ''" class="big_modal">
		<h3 slot="header">Create Rate Table</h3>
		<div slot="body">
		  <div class="row">
			  <div class="col-sm-6">
				 <div class="form-group">
					<label for="rate_table_name">Rate Table Name:</label>
					<input type="text" name="rate_table_name" v-model="rate_table_name" class="form-control" placeholder="Enter Rate Table Name">
				 </div> 
			  </div>
			  <div class="col-sm-6">
				 <div class="form-group">
					<label>Code Deck:</label>
					<select2 :options="options" v-model="code_deck"></select2>
				 </div> 
			  </div>
			  <div class="col-sm-6">
				  <div class="form-group">
					<label>Currency:</label>
					<select2 :options="options" v-model="currency"></select2>
				  </div>
			  </div>
			  <div class="col-sm-6">
				  <div class="form-group">
					<label>Jurisdiction Country:</label>
					<select2 :options="options" v-model="jurisdiction_country"></select2>
				  </div>
			  </div>
			  <div class="col-sm-6">
				  <div class="form-group">
					<label>Billing Method:</label>
					<select2 :options="options" v-model="billing_method"></select2>
				  </div>
			  </div>
			  <div class="col-sm-6">
				  <div class="form-group">
					<label>Rate Type:</label>
					<select2 :options="options" v-model="rate_type"></select2>
				  </div>
			  </div>  
		  </div>
		</div>
		<div slot="footer">
			<button @click="" class="btn btn-primary mini submit">Submit</button>
			<button @click="closeModal" class="btn btn-default mini cancel">Cancel</button>
		</div>
	  </modal>
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Routing</a></li>
				  <li class="breadcrumb-item active">Add Egress Trunk</li>
			</ol>
			<h1 class="page-header">Add Egress Trunk</h1>
			<router-link to="/routing/egress_trunk" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad">
				<div class="select_group row">
					<div class="role_section margin-fixed">
						<div class="col-md-3 col-sm-4">
							<div class="form-group">
								<label for="egress_name">Egress Name:</label>
								<input type="text" name="egress_name" v-model="egress_name" class="form-control" placeholder="Enter Egress Name">
							 </div>
						</div>
						<div class="col-md-3 col-sm-4">
							<div class="form-group">
								<label>Carriers:</label>
								<select2 :options="options" v-model="carriers">
								</select2>
							</div>
						</div>
						<div class="col-md-3 col-sm-4">
							<div class="form-group">
								<label>Media Type:</label>
								<select2 :options="options" v-model="media_type">
								</select2>
							</div>
						</div>
						<div class="col-md-3 col-sm-4">
							<div class="form-group">
								<label for="min_profitability">Min. Profitability:</label>
								<div class="input-group">
								   <span class="input-group-addon">$</span>
								  <input type="text" class="form-control" aria-label="" placeholder="Enter Min. Profitability" name="min_profitability" v-model="min_profitability">
								  <div class="input-group-btn">
									<button type="button" class="btn btn-rimary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									  Format
									</button>
									<div class="dropdown-menu dropdown-menu-right">
									  <a class="dropdown-item">Percentage</a>
									  <a class="dropdown-item">Value</a>
									</div>
								  </div>
								</div>
							</div>
						</div>
						<div class="clearfix"></div>
						<div class="col-md-3 col-sm-4">
							<div class="form-group">
								<label for="call_limit">Call Limit:</label>
								<input type="text" name="call_limit" v-model="call_limit" class="form-control" placeholder="Enter Call Limit">
							</div>
						</div>
						<div class="col-md-3 col-sm-4">
							<div class="form-group">
								<label for="cps_limit">CPS Limit:</label>
								<input type="text" name="cps_limit" v-model="cps_limit" class="form-control" placeholder="Enter CPS Limit">
							 </div>
						</div>
						<div class="col-md-3 col-sm-4">
							<div class="form-group">
								<label for="pdd_timeout">PDD Timeout:</label>
								<input type="text" name="pdd_timeout" v-model="pdd_timeout" class="form-control" placeholder="Enter PDD Timeout">
							 </div>
						</div>
						<div class="col-md-3 col-sm-4">
							<div class="form-group">
								<label>Multi-Host Routing Strategy:</label>
								<select2 :options="options" v-model="multi_host_routing_strategy">
								</select2>
							</div>
						</div>
						<div class="col-md-3 col-sm-4">
							<div class="form-group">
								<label>Pass Dipping Info:</label>
								<select2 :options="options" v-model="pass_dipping_info">
								</select2>
							</div>
						</div>
						<div class="col-md-3 col-sm-4">
							<div class="form-group">
								<label for="min_duration">Min Duration:</label>
								<input type="text" name="min_duration" v-model="min_duration" class="form-control" placeholder="Enter Min Duration in Seconds">
							 </div>
						</div>
						<div class="col-md-3 col-sm-4">
							<div class="form-group">
								<label for="max_duration">Max Duration:</label>
								<input type="text" name="max_duration" v-model="max_duration" class="form-control" placeholder="Enter Max Duration in Seconds">
							 </div>
						</div>
						<div class="col-md-3 col-sm-4">
							<div class="form-group">
								<label>Random Any Group:</label>
								<select2 :options="options" v-model="random_any_group">
								</select2>
							</div>
						</div>
						<div class="col-md-3 col-sm-4">
							<div class="form-group">
								<label>Rate Table:</label>
								<select2 :options="options" v-model="rate_table">
								</select2>
							</div>
							<div class="inline_actions absolute">
								  <a @click="showModal = 'add_rate_table'"><span class="dnl_icon dnl_add"></span></a>
							</div>
						</div>
						<div class="col-md-3 col-sm-4">
							<div class="form-group">
								<label for="per_port_amount">Per Port Amount:</label>
								<input type="text" name="per_port_amount" v-model="per_port_amount" class="form-control" placeholder="Enter Per Port Amount">
							 </div>
						</div>
						<div class="col-md-3 col-sm-4">
							<div class="form-group">
								<label for="ring_timer">Ring Timer:</label>
								<input type="text" name="ring_timer" v-model="ring_timer" class="form-control" placeholder="Enter Ring Timer">
							 </div>
						</div>
						<div class="col-md-3 col-sm-4">
							<div class="form-group">
								<label>Use RPID User Billing:</label>
								<select2 :options="options" v-model="rpid_user_billing">
								</select2>
							</div>
						</div>
						<div class="col-md-3 col-sm-4">
							<div class="form-group">
								<label>Authorized:</label>
								<select2 :options="options" v-model="authorized">
								</select2>
							</div>
						</div>
						<div class="col-md-1 col-sm-2">
							<div class="form-group m-top-33">
								<div class="checkbox checkbox-success">
									<input id="active" name="active" type="checkbox"> 
									<label for="active">Active</label>
								</div>
							</div>
						</div>
						<div class="col-md-1 col-sm-2">
							<div class="form-group m-top-33">
								<div class="checkbox checkbox-success">
									<input id="t38" name="t38" type="checkbox"> 
									<label for="t38">T.38</label>
								</div>
							</div>
						</div>
						<div class="clearfix"></div>
						<div class="col-md-6 col-sm-8">
							  <div class="form-group">
								  <label for="groupname">Codecs:</label>
								  <select multiple="multiple" id="codecs" name="codecs">
									<option v-for="option in options" :value='option.value'>{{option.text}}</option>
								  </select>
							  </div>
						</div>
						<div class="clearfix"></div>
					</div>
				</div>
				<div class="table_filters">
					<a href="#/configuration/carrier_group/new" class="btn btn-primary mini pull-right">
						<span class="dnl_icon dnl_add"></span> Add Host
					</a>
				</div>
				<div class="clearfix"></div>
				<div class="table-responsive m-top-10">
					<table class="table table-striped table-hover carrier_groups">
					  <thead>
						<tr>
						  <th>Type</th>
						  <th>Host</th>
						  <th>Port</th>
						  <th class="width-65 text-center">Action</th>
						</tr>
					  </thead>
					  <tbody>
						<tr v-for="host in hosts">
						  <td>
							<select2 :options="options" v-model="host.type"></select2> 
						  </td>
						  <td><input type="text" v-model="host.host" class="form-control"></td>
						  <td><input type="text" v-model="host.port" class="form-control"></td>
						  <td class="text-center">
							  <a class="action action_delete center-block" data-toggle="tooltip" data-placement="top" title="Delete">
								  <span class="dnl_icon dnl_action_delete"></span>
							  </a>
						  </td>
						</tr>
					  </tbody>
					</table>
				</div>
				<div class="clearfix little-space">
				<div class="button_set m-top-10">
					<a class="btn btn-primary">
						Submit
					</a>
					<a class="btn btn-default">
						Reset
					</a>
				</div>
				</div>
			</div>
		</div>
	  </div>
	</div>
</template>

<script>  
	const vSelect = require('vue!../main_components/select.vue'),
		  modal = require('vue!../main_components/modal.vue'),
		  multiselect = require('multiselect');
	module.exports = {
		components: {
			'select2': vSelect,
			'modal': modal,
			'multiselect': multiselect
		},
		data: function(){
            return {
			  billing_method: '',
			  rate_type: '',
			  jurisdiction_country: '',
			  currency: '',
			  code_deck: '',
			  rate_table_name: '',
			  showModal: '',
			  authorized: '',
			  rpid_user_billing: '',
			  ring_timer: '',
			  per_port_amount: '',
			  random_any_group: '',
			  rate_table: '',
			  max_duration: '',
			  min_duration: '',
			  pass_dipping_info: '',
			  multi_host_routing_strategy: '',
			  egress_name: '',
			  carriers: '',
			  media_type: '',
			  min_profitability: '',
			  call_limit: '',
			  cps_limit: '',
			  pdd_timeout: '',
			  options: [
					  { id: 1, value: 'carrier1', text: 'Carrier 1' },
					  { id: 2, value: 'carrier2', text: 'Carrier 2' },
					  { id: 3, value: 'carrier3', text: 'Carrier 3' },
					  { id: 4, value: 'carrier4', text: 'Carrier 4' },
					  { id: 5, value: 'carrier5', text: 'Carrier 5' }
			  ],
			  hosts: [
				  {
					  type: '',
					  host: '',
					  port: ''
				  }
			  ]
            }
        },
		methods: {
			closeModal: function() {
				this.showModal = '';
			}
		},
		mounted: function () {
			$('#codecs').multiSelect({
				 selectableHeader: "<div class='custom-header'>Codecs Selection</div>",
  				 selectionHeader: "<div class='custom-header'>Selected Codecs</div>"
			});
			$('[data-toggle="tooltip"]').tooltip();
		}
	}
</script>

<style>
	.role_section.margin-fixed {
		margin: 15px;
		margin-top: 10px;
		margin-bottom: 15px;
	}
	
	.m-top-10 {
		margin-top: 10px;
	}
	
	table.table.table-striped.table-hover.carrier_groups tr td {
		padding-right: 8px;
	}
	
	a.action.action_delete.center-block {
		display: block;
	}
	
	table.table.table-striped.table-hover.carrier_groups .checkbox-success input[type="checkbox"]:checked + label::before {
		background-color: #03c0fc;
		border-color: #03c0fc;
	}
	
	.input-group-btn:last-child>.btn, .input-group-btn:last-child>.btn-group {
		z-index: 2;
		margin-left: -2px;
	}
	
	.inline_actions.absolute {
		position: absolute;
		top: -33px;
		right: 15px;
	}
	
	.modal-mask.big_modal .modal-container {
		width: 60%;
	}
	
	button.btn.btn-primary.mini.submit {
		width: 140px;
	}

	button.btn.btn-default.mini.cancel {
		width: 140px;
	}
	
	
	@media (min-width: 768px) and (max-width: 979px) {
		.modal-mask.big_modal .modal-container {
			width: 85%;
		}
	}
	
	@media (max-width: 767px) {
		.inline_actions.absolute {
			top: -80px;
		}
		
		.modal-mask.big_modal .modal-container {
			width: 90%;
			padding: 30px;
			overflow-y: auto;
			max-height: 100%;
		}
		
	}
</style>
