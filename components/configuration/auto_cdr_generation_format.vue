<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Configuration</a></li>
				  <li class="breadcrumb-item active">Auto CDR Generation Format</li>
			</ol>
			<h1 class="page-header">Auto CDR Generation Format</h1>
			<div class="white_pad table_wrap">
				<div class="table_filters">
					<p>Please select the fields that you would like to enable in your user portal:</p>
				</div>
				<div class="table-responsive">
					<table class="table table-striped table-hover carrier_fields">
					  <thead>
						<tr>
						  <th>Field Names <span class="dnl_icon dnl_sort pull-right"></span></th>
						  <th class="width_138">
							<div class="checkbox checkbox-success" style="margin-top:10px; margin-bottom:0px;">
								<input id="incoming_select_all" name="incoming_select_all" type="checkbox" v-model="incoming_checker" v-on:click="clickIncomingSelectedAll">
								<label for="incoming_select_all">Incoming CDR</label>
							</div>
						  </th>
						  <th class="width_138">
							<div class="checkbox checkbox-success" style="margin-top:10px; margin-bottom:0px;">
								<input id="outgoing_select_all" name="outgoing_select_all" type="checkbox" v-model="outgoing_checker" v-on:click="clickOutgoingSelectedAll">
								<label for="outgoing_select_all">Outgoing CDR</label>
							</div>
						  </th>
						</tr>
					  </thead>
					  <tbody>
						<tr v-for="(field, index) in carrierFields">
						  <td>{{field.field_name}}</td>
							<td>
								<div v-if="field.incoming_enabled" class="checkbox checkbox-success">
									<input :id="'i' + index" :name="'i' + index" type="checkbox" v-model="field.incoming_cdr">
									<label :for="'i' + index"></label>
								</div>
							</td>
							<td>
								<div v-if="field.outgoing_enabled" class="checkbox checkbox-success">
									<input :id="'k' + index" :name="'k' + index" type="checkbox" v-model="field.outgoing_cdr">
									<label :for="'k' + index"></label>
								</div>
							</td>
						</tr>
					  </tbody>
					</table>
				</div>
				<div class="clearfix little-space"></div>
				<div class="button_set text-center">
					<a class="btn btn-primary mini" v-on:click="submit">
						Submit
					</a>
					<a class="btn btn-default mini" v-on:click="undo">
						Revert to Previous Setting
					</a>
					<a class="btn btn-default mini" v-on:click="resetDefaults">
						Reset to Default
					</a>
				</div>
			</div>
		</div>
	  </div>
	</div>
</template>

<script>
	const timeDisplay = require('vue!../main_components/time_display.vue');
    const api = require("../../api");
	const auth = require("../../auth");
	import { mapActions } from 'vuex'

	module.exports = {
		components: {
			'time-display': timeDisplay
		},
		data: function () {
			return {
				carrierFields: [],
				originalData: [],
				defaultData: [],
			}
		},
		methods: {
			...mapActions({
				setMessage: 'app_message/setAppMessage'
			}),
			clickIncomingSelectedAll: function() {
				console.log(this.checker);
				if(this.incoming_checker) {
					this.carrierFields.forEach(function(field, index) {
						field.incoming_cdr = true;
					});
				}
				else {
					this.carrierFields.forEach(function(field, index) {
						field.incoming_cdr = false;
					});
				}
			},
			clickOutgoingSelectedAll: function() {
				if(this.outgoing_checker) {
					this.carrierFields.forEach(function(field, index) {
						field.outgoing_cdr = true;
					});
				}
				else {
					this.carrierFields.forEach(function(field, index) {
						field.outgoing_cdr = false;
					});
				}
			},
			loadData: function () {
				this.defaultData = [
					{
						id: 0,
						field_name: "Answer Time",
						incoming_enabled: true,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Call Duration",
						incoming_enabled: true,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Call duration in ms",
						incoming_enabled: true,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Class4 IP",
						incoming_enabled: true,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Dynamic Route Name",
						incoming_enabled: true,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "End Time",
						incoming_enabled: true,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Final Route",
						incoming_enabled: true,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Ingress Alias",
						incoming_enabled: true,
						outgoing_enabled: false,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Ingress Bill Minutes",
						incoming_enabled: true,
						outgoing_enabled: false,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Ingress Client Bill Result",
						incoming_enabled: true,
						outgoing_enabled: false,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Ingress Client Bill Time",
						incoming_enabled: true,
						outgoing_enabled: false,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Ingress Client Cost",
						incoming_enabled: true,
						outgoing_enabled: false,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Ingress Client Currency",
						incoming_enabled: true,
						outgoing_enabled: false,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Ingress Client Name",
						incoming_enabled: true,
						outgoing_enabled: false,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Ingress Client Rate",
						incoming_enabled: true,
						outgoing_enabled: false,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Ingress Client Rate Table Name",
						incoming_enabled: true,
						outgoing_enabled: false,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Ingress DNIS Type",
						incoming_enabled: true,
						outgoing_enabled: false,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Ingress ID",
						incoming_enabled: true,
						outgoing_enabled: false,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Ingress Rate ID",
						incoming_enabled: true,
						outgoing_enabled: false,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Ingress Rate Type",
						incoming_enabled: true,
						outgoing_enabled: false,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "LRN Number",
						incoming_enabled: true,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "LRN Number Vendor",
						incoming_enabled: true,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "LNP dipping Cost",
						incoming_enabled: true,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Orig Codecs",
						incoming_enabled: true,
						outgoing_enabled: false,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Orig DST Number",
						incoming_enabled: true,
						outgoing_enabled: false,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Orig IP",
						incoming_enabled: true,
						outgoing_enabled: false,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Orig SRC Number",
						incoming_enabled: true,
						outgoing_enabled: false,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Orig/Term Release",
						incoming_enabled: true,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Orig Call Duration",
						incoming_enabled: true,
						outgoing_enabled: false,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Orig Code",
						incoming_enabled: true,
						outgoing_enabled: false,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Orig Code Name",
						incoming_enabled: true,
						outgoing_enabled: false,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Orig Country",
						incoming_enabled: true,
						outgoing_enabled: false,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Orig Delay Second",
						incoming_enabled: true,
						outgoing_enabled: false,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Orig Media IP Ani",
						incoming_enabled: true,
						outgoing_enabled: false,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Orig Media Port Ani",
						incoming_enabled: true,
						outgoing_enabled: false,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Origination Call ID",
						incoming_enabled: true,
						outgoing_enabled: false,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "PDD(ms)",
						incoming_enabled: true,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Release Cause",
						incoming_enabled: true,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Rerate Time",
						incoming_enabled: true,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Response From Egress",
						incoming_enabled: true,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Response To Ingress",
						incoming_enabled: true,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Ring Time(ms)",
						incoming_enabled: true,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Routing Plan Name",
						incoming_enabled: true,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Start Time",
						incoming_enabled: true,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Static Route Name",
						incoming_enabled: true,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Time",
						incoming_enabled: true,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Translation ANI",
						incoming_enabled: true,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Translation DNIS",
						incoming_enabled: true,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Q850 Cause Code",
						incoming_enabled: true,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Q850 Cause",
						incoming_enabled: true,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Route ID",
						incoming_enabled: true,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Ingress Register User",
						incoming_enabled: true,
						outgoing_enabled: false,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Egress Alias",
						incoming_enabled: false,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Egress Bill Minutes",
						incoming_enabled: false,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Egress Bill Result",
						incoming_enabled: false,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Egress Bill Time",
						incoming_enabled: false,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Egress Code ACD",
						incoming_enabled: false,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Egress Code ASR",
						incoming_enabled: false,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Egress Client Currency",
						incoming_enabled: false,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Egress Client Name",
						incoming_enabled: false,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Egress Cost",
						incoming_enabled: false,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Egress DNIS Type",
						incoming_enabled: false,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Egress Name",
						incoming_enabled: false,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Egress Rate",
						incoming_enabled: false,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Egress Rate ID",
						incoming_enabled: false,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Egress Rate Table Name",
						incoming_enabled: false,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Egress Rate Type",
						incoming_enabled: false,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Egress Six Seconds",
						incoming_enabled: false,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Egress Trunk Trace",
						incoming_enabled: false,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Term Codecs",
						incoming_enabled: false,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Term DST Number",
						incoming_enabled: false,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Term IP",
						incoming_enabled: false,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Term SRC Number",
						incoming_enabled: false,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Term Code",
						incoming_enabled: false,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Term Code Name",
						incoming_enabled: false,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Term Country",
						incoming_enabled: false,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Term Delay Second",
						incoming_enabled: false,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Term Media IP",
						incoming_enabled: false,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Term Media Port DNIS",
						incoming_enabled: false,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Termination Call ID",
						incoming_enabled: false,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					},
					{
						id: 0,
						field_name: "Egress Register User",
						incoming_enabled: false,
						outgoing_enabled: true,
						incoming_cdr: true,
						outgoing_cdr: false,
						admin_allow: true,
						db_name: ""
					}
				];
				// this.carrierFields = JSON.parse(JSON.stringify(this.originalData));
			},
			getIncomingId: function(fieldName) {
				let index = 0;
				for (let f of this.carrierFields) {
					if (f.field_name == fieldName) {
						return 'i' + index;
					}
					index ++;
				}
				return '';
			},
			getOutgoingId: function(fieldName) {
				let index = 0;
				for (let f of this.carrierFields) {
					if (f.field_name == fieldName) {
						return 'o' + index;
					}
					index ++;
				}
				return '';
			},
			undo: function() {
				this.carrierFields = JSON.parse( JSON.stringify( this.originalData ) );
				console.log(this.carrierFields);
				this.incoming_checker = false;
				this.outgoing_checker = false;
			},
			submit: function() {
				this.loading = true;
				this.incoming_checker = false;
				this.outgoing_checker = false;

				var vm = [];
				this.carrierFields.forEach(function(field, i){
					var temp = {};

					temp.id = field.id;
					temp.display_name = field.field_name;
					temp.vendor_viewable = field.incoming_cdr;
					temp.client_viewable = field.outgoing_cdr;
					temp.db_name = field.db_name;
					temp.admin_default = field.admin_allow;
					
					vm.push(temp);
				});

				console.log("vm:", vm);

				this.$http.patch(api.getEndpointUrl() + '/v1/config/auto_cdr_format/edit',
				{
					"items": vm
				},
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}
				).then(
					function(response) {
						this.loading = false;
						console.log(response);

						this.$router.push('/configuration/auto_cdr_generation_format')
						this.setMessage('The Carrier Portal CDR Fields has been modified!')
					},
					function(response) {
						this.loading = false;
						console.log(response);

						this.setMessage({
							message:'Editing Carrier Portal CDR Fields is failed!',
							type:'error'
						})
					}
				)

			},
			resetDefaults: function() {
				this.carrierFields = JSON.parse( JSON.stringify( this.defaultData ) );
				console.log(this.carrierFields);
				this.incoming_checker = false;
				this.outgoing_checker = false;
			}
		},
		created: function() {
			this.loadData();
			this.carrierFields = JSON.parse( JSON.stringify( this.defaultData ) );
			this.loading = true;
			this.$http.get(api.getEndpointUrl() + "/v1/config/cdr_visibility/list", 
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function(response) {
				var self = this;
				this.loading = false;
				var items = response.body.payload.items;
				items.forEach(function(item, i){
					let index = 0;
					for (let f of self.carrierFields) {
						if (f.field_name == item.display_name) {
							f.id = item.id;
                            f.db_name = item.db_name;
							f.incoming_cdr = item.vendor_viewable;
							f.outgoing_cdr = item.client_viewable;
                            f.admin_allow = item.admin_default;
						}
					}
				});

				console.log("carrierFields");
				console.log(this.carrierFields);
			}, function(error) {
				this.loading = false;
				console.log(error);
			});

			this.originalData = JSON.parse( JSON.stringify( this.carrierFields ) );
		}
	}
</script>

<style>
	table.table.table-striped.table-hover.carrier_fields td {
		padding-right: 0;
		text-align: center;
	}
	
	.table-responsive table.table.table-striped.table-hover.carrier_fields td:first-child {
		text-align: left;
	}
	
	table.table.table-striped.table-hover.carrier_fields td .checkbox {
		padding-left: 20px;
		margin-top: 6px;
		margin-bottom: 0;
	}
	
	.carrier_fields .checkbox-success input[type="checkbox"]:checked + label::before {
		background-color: #03c0fc;
		border-color: #03c0fc;
	}
	
	table.table.table-striped.table-hover.carrier_fields td {
		vertical-align: middle;
	}
	
	table.table.table-striped.table-hover.carrier_fields tr:hover {
		background: #73767b;
	}
	
	
	@media (max-width: 480px) {
		.button_set .btn {
			margin-bottom: 10px;
			width: 100% !important;
		}
	}

</style>
