<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Tools</a></li>
				  <li class="breadcrumb-item active">Auto Rate Upload</li>
			</ol>
			<h1 class="page-header">Auto Rate Upload</h1>
			<tabs>
				<tab label="Unprocessed Decks" class="" icon="dnl_icon dnl_qos_report" selected>
          <h2 class="center-block text-center">No Data Found</h2>
				</tab>
				<tab label="Processed Decks" class="" icon="dnl_icon dnl_qos_report">
					<h2 class="center-block text-center">No Data Found</h2>
				</tab>
				<tab label="Unrecognized Decks" class="" icon="dnl_icon dnl_qos_report">
					<h2 class="center-block text-center">No Data Found</h2>
				</tab>
			</tabs>
		</div>
	  </div>
	</div>
</template>

<script>   
	const vTabs = require('vue!../main_components/tabs.vue'),
		  vTab = require('vue!../main_components/tab.vue'),
		  vSelect = require('vue!../main_components/select.vue');
	module.exports = {
		components: {
			'tabs': vTabs,
			'tab': vTab,
			'select2': vSelect
		},
		data: function(){
            return {
				route_types: [
				  { id: 1, text: 'Fail to Next Host' },
				  { id: 2, text: 'Fail to Next Trunk' },
				  { id: 3, text: 'Stop' },
			  	],
				default_codes: [
					{
					  name: "300",
					  route_type: "Stop",
					  responses: [
						  {
							  code:'300', 
							  message: 'Multiple Choices'
						  }
					  ]
					},
					{
					  name: "302",
					  route_type: "Fail to Next Trunk",
					  responses: []
					},
					{
					  name: "305",
					  route_type: "Fail to Next Trunk",
					  responses: []
					},
					{
					  name: "380",
					  route_type: "Fail to Next Trunk",
					  responses: []
					},
					{
					  name: "400",
					  route_type: "Fail to Next Trunk",
					  responses: []
					}
			  ],
			  origination_codes: [
					{
					  name: "300",
					  route_type: "Stop",
					  responses: [
						  {
							  code:'300', 
							  message: 'Multiple Choices'
						  }
					  ]
					},
					{
					  name: "302",
					  route_type: "Fail to Next Trunk",
					  responses: []
					},
					{
					  name: "305",
					  route_type: "Fail to Next Trunk",
					  responsess: []
					},
					{
					  name: "380",
					  route_type: "Fail to Next Trunk",
					  responses: []
					},
					{
					  name: "400",
					  route_type: "Fail to Next Trunk",
					  responses: []
					}
			  ],
			  termination_codes: [
					{
					  name: "300",
					  route_type: "Stop",
					  responses: []
					},
					{
					  name: "302",
					  route_type: "Fail to Next Trunk",
					  responses: []
					},
					{
					  name: "305",
					  route_type: "Fail to Next Trunk",
					  responses: [
						  {
							  code:'300', 
							  message: 'Multiple Choices'
						  }
					  ]
					},
					{
					  name: "380",
					  route_type: "Fail to Next Trunk",
					  responses: []
					},
					{
					  name: "400",
					  route_type: "Fail to Next Trunk",
					  responses: []
					}
			  ]
			}
        }
	}
</script>

<style>
	a.tab .dnl_setting {
		font-size: 18px;
		vertical-align: sub;
		margin-right: 3px;
	}
	
	a.tab .dnl_to_left, 
	a.tab .dnl_to_right {
		font-size: 9px;
		vertical-align: middle;
		margin-right: 3px;
		line-height: 0;
	}
	
	table.table.table-striped.table-hover.codes th, 
	table.table.table-striped.table-hover.codes td {
		text-align: left;
		width: 33.3333%;
	}
	
	table.table.table-striped.table-hover.codes tr:hover {
		background: #73767b;
	}
	
	.tabs .button_set {
		margin: 20px 0 0 0;
	}
	
	.codes input.form_control.inline-block {
		display: inline-block !important;
	}
	
	input.form-control.inline-block {
		width: 48.5%;
		display: inline-block;
	}
	
	input.form-control.inline-block:first-of-type {
		margin-right: 1.5%;
	}
	
	table.table-striped.table-hover.codes td {
		padding-right: 8px;
	}

	@media (max-width: 767px) {
		.tabs a.tab {
			padding: 10px;
			height: 40px;
			width: 100%;
			border: 0;
		}
		
		.tabs a.tab.active:first-child {
			border-radius: 5px 5px 0 0;
		}
		
		.tabs a.tab.active {
			border: 0; 
		}
	}
	
	@media (max-width: 480px) {
		.tabs .table-responsive {
			min-width: auto;
		}
	}
	
</style>
