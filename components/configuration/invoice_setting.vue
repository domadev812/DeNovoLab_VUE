<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Configuration</a></li>
				  <li class="breadcrumb-item active">Invoice Setting</li>
			</ol>
			<h1 class="page-header">Invoice Setting</h1>
			<div class="white_pad configuration_pad">
				<h3 class="description">You may specify how your Invoice should be generated</h3>
					<div class="col-sm-3">
						<label>Invoice Logo:</label>
						<div class="invoice_logo">
							<dropzone id="myVueDropzone" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
    						<button v-on:click="process" class="btn btn-default">Change Logo</button>
						</div>
						<div class="fields">
							<div class="form-group">
								<label for="invoice_number_convension">Invoice Number Convention:</label>
								<input type="text" name="invoice_number_convension" v-model="invoice.invoice_number_convension" class="form-control" placeholder="Enter Invoice Number Convention">
							</div>
							<div class="form-group">
								<label for="decimal">Digits After Decimal Point:</label>
								<input type="text" name="decimal" v-model="invoice.decimal" class="form-control" placeholder="Enter Digits After Decimal Point">
							</div>
							<div class="form-group">
								<label for="groupname">Mail Send Mode:</label>
								<!--<select2 :options="mail_send_options" v-model="invoice_send_mode"></select2>-->
								<select class="selectable" v-model="invoice.invoice_send_mode">
									<option v-for="item in mail_send_options" v-bind:value="item.id">
										{{ item.text }}
									</option>
								</select>
							</div>
							<div class="form-group">
								<div class="checkbox checkbox-success"><input id="system_setting" name="system_setting" type="checkbox" v-model="invoice.allow_invoice_overlap" > <label for="system_setting">Overlap Invoice Protection</label></div>
							</div>
							<div class="form-group">
								<label for="groupname">PDF Template Place ->Billing Detail Location</label>
								<select2 :options="placement_options" v-model="placement"></select2>
							</div>
						</div>
					</div>
					<div class="col-sm-9">
						<label>PDF Template:</label>
						<section class="config_section">
							<div class="row">
								<div class="col-sm-6">
									<label class="titling">Billing Details:</label>
								</div>
								<div class="col-sm-6">
									<div class="select_wrapper pull-right">
										<label>Location:</label>
										<!--<select2 :options="billing_info_options" v-model="billing_info_pos"></select2>-->
										<select class="selectable" v-model="invoice.billing_info_pos">
											<option v-for="item in billing_info_options" v-bind:value="item.id">
												{{ item.text }}
											</option>
										</select>
									</div>
								</div>
							</div>
							<!--<ckeditor v-model="contentA" :id="editorA" :height="'200px'" :toolbar="[['Format']]"></ckeditor>-->
							<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="invoice.contentA">
                            </el-input>
							<div class="clearfix little-space"></div>
							<div class="row">
								<div class="col-sm-6">
									<label class="titling">Company Info:</label>
								</div>
								<div class="col-sm-6">
									<div class="select_wrapper pull-right">
										<label>Location:</label>
										<!--<select2 :options="company_info_options" v-model="company_info_pos"></select2>-->
										<select class="selectable" v-model="invoice.company_info_pos">
											<option v-for="item in company_info_options" v-bind:value="item.id">
												{{ item.text }}
											</option>
										</select>
									</div>
								</div>
							</div>
							<!--<ckeditor v-model="contentB" :id="editorB" :height="'200px'" :toolbar="[['Format']]"></ckeditor>-->
							<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="invoice.contentB">
                            </el-input>
						</section>
						<label for="groupname">Invoice CDR Fields:</label>
						<!--<select multiple="multiple" id="cdr_fields" name="carrier">
							<option v-for="option in options" :value='option.value'>{{option.text}}</option>
						</select>-->
						<el-transfer v-model="invoice.invoice_cdr_fields" :titles="['Optional Selection', 'Selected Selection']" :data="invoice_cdr_options">
						</el-transfer>
						<div class="button_set little-space">
							<a class="btn btn-primary" @click="saveInvoice">
								Submit
							</a>
							<a class="btn btn-default" @click="reset">
								Reset
							</a>
					  </div>
					</div>
				<div class="clearfix little-space"></div>
			</div>
		</div>
	  </div>
	</div>
</template>

<script>   
	const Ckeditor = require('vue!../main_components/ckeditor.vue'),
		  Dropzone = require('vue!../main_components/dropzone.vue'),
		  vSelect = require('vue!../main_components/select.vue'),
		  multiselect = require('multiselect');
	const api = require("../../api");
	import { mapActions } from 'vuex';
	module.exports = {
		components: {
			Ckeditor,
			Dropzone,
			'select2': vSelect,
			'multiselect': multiselect
		},
		data: function(){
            return {
				bakup_invoice: {},
				send_rate_as: '',
				logo_url: '',
				invoice: {},
				invoice_template: {},
				invoice_cdr_field: '',
				invoice_cdr_fields: [],
				invoice_cdr_options: [
					{ value: 1, key: 'answer_time', label: 'Answer_Time' },
				  { value: 2, key: 'call_duration', label: 'Call_Duration' },
				  { value: 3, key: 'dynamic_route', label: 'Dynamic_Route_ID' },
				  { value: 4, key: 'dynamic_route_name', label: 'Dynamic_Route_Name' },
				  { value: 5, key: 'trunk_id_termination', label: 'Egress_Alias' },
				  { value: 6, key: 'egress_bill_minutes', label: 'Egress_Bill_Minutes' },
				  { value: 7, key: 'egress_bill_result', label: 'Egress_Bill_Result' },
				  { value: 8, key: 'egress_bill_time', label: 'Egress_Bill_Time' },
				  { value: 9, key: 'egress_client_currency', label: 'Egress_Client_Currency' },
				  { value: 10, key: 'egress_client_id', label: 'Egress_Client_ID' },
				  { value: 11, key: 'egress_client_name', label: 'Egress_Client_Name' },
				  { value: 12, key: 'egress_code_acd', label: 'Egress_Code_ACD' },
				  { value: 13, key: 'egress_code_asr', label: 'Egress_Code_ASR' },
				  { value: 14, key: 'egress_cost', label: 'Egress_Cost' },
				  { value: 15, key: 'egress_dnis_type', label: 'Egress_DNIS_Type' },
				  { value: 16, key: 'egress_id', label: 'Egress_ID' },
				  { value: 17, key: 'egress_name', label: 'Egress_Name' },
				  { value: 18, key: 'egress_rate', label: 'Egress_Rate' },
				  { value: 19, key: 'egress_rate_id', label: 'Egress_Rate_ID' },
				  { value: 20, key: 'egress_rate_table_id', label: 'Egress_Rate_Table_ID' },
				  { value: 21, key: 'egress_rate_table_name', label: 'Egress_Rate_Table_Name' },
				  { value: 22, key: 'egress_rate_type', label: 'Egress_Rate_Type' },
				  { value: 23, key: 'egress_rate_type_digit', label: 'Egress_Rate_Type_Digit' },
				  { value: 24, key: 'egress_six_seconds', label: 'Egress_Six_Seconds' },
				  { value: 25, key: 'egress_erro_string', label: 'Egress_Trunk_Trace' },
				  { value: 26, key: 'end_time', label: 'End_Time' },
				  { value: 27, key: 'final_route_indication', label: 'Final_Route' },
				  { value: 28, key: 'trunk_id_origination', label: 'Ingress_Alias' },
				  { value: 29, key: 'ingress_bill_minutes', label: 'Ingress_Bill_Minutes' },
				  { value: 30, key: 'ingress_client_bill_result', label: 'Ingress_Client_Bill_Result' },
				  { value: 31, key: 'ingress_client_bill_time', label: 'Ingress_Client_Bill_Time' },
				  { value: 32, key: 'ingress_client_cost', label: 'Ingress_Client_Cost' },
				  { value: 33, key: 'ingress_client_currency', label: 'Ingress_Client_Currency' },
				  { value: 34, key: 'ingress_client_id', label: 'Ingress_Client_ID' },
				  { value: 35, key: 'ingress_client_name', label: 'Ingress_Client_Name' },
				  { value: 36, key: 'ingress_client_rate', label: 'Ingress_Client_Rate' },
				  { value: 37, key: 'ingress_client_rate_table_name', label: 'Ingress_Client_Rate_Table_Name' },
				  { value: 38, key: 'ingress_dNIS_type', label: 'Ingress_DNIS_Type' },
				  { value: 39, key: 'ingress_id', label: 'Ingress_ID' },
				  { value: 40, key: 'ingress_rate_id', label: 'Ingress_Rate_ID' },
				  { value: 41, key: 'ingress_client_rate_table_id', label: 'Ingress_Rate_Table_ID' },
				  { value: 42, key: 'ingress_rate_type', label: 'Ingress_Rate_Type' },
				  { value: 43, key: 'ingress_rate_type', label: 'Ingress_Rate_Type_Digit' },
				  { value: 44, key: 'lrn_dnis', label: 'LRN_Number' },
				  { value: 45, key: 'lrn_source', label: 'LRN_Source' },
				  { value: 46, key: 'lnp_dipping_cost', label: 'Lnp_dipping_Cost' },
				  { value: 47, key: 'first_release_dialogue', label: 'Orig/Term_Release' },
				  { value: 48, key: 'orig_call_duration', label: 'Orig_Call_Duration' },
				  { value: 49, key: 'orig_code', label: 'Orig_Code' },
				  { value: 50, key: 'orig_code_name', label: 'Orig_Code_Name' },
				  { value: 51, key: 'origination_codec_list', label: 'Orig_Codecs' },
				  { value: 52, key: 'orig_country', label: 'Orig_Country' },
				  { value: 53, key: 'origination_destination_number', label: 'Orig_DST_Number' },
				  { value: 54, key: 'orig_delay_second', label: 'Orig_Delay_Second' },
				  { value: 55, key: 'origination_source_host_name', label: 'Orig_IP' },
				  { value: 56, key: 'origination_remote_payload_ip_address', label: 'Orig_Media_IP_Ani' },
				  { value: 57, key: 'origination_remote_payload_udp_address', label: 'Orig_Media_Port_Ani' },
				  { value: 58, key: 'origination_source_number', label: 'Orig_SRC_Number' },
				  { value: 59, key: 'origination_call_id', label: 'Orig_Call_ID' },
				  { value: 60, key: 'origination_local_payload_ip_address', label: 'Orig_Local_Payload_IP' },
				  { value: 61, key: 'origination_local_payload_udp_address', label: 'Orig_Local_Payload_Port' },
				  { value: 62, key: 'origination_destination_host_name', label: 'Orig_Profile_IP' },
				  { value: 63, key: 'origination_profile_port', label: 'Orig_Profile_Port' },
				  { value: 64, key: 'pdd', label: 'PDD(ms)' },
				  { value: 65, key: 'q850_cause_string', label: 'Q850 Cause' },
				  { value: 66, key: 'q850_cause', label: 'Cause Code' },
				  { value: 67, key: 'release_cause', label: 'Release_Cause' },
				  { value: 68, key: 'rerate_time', label: 'Rerate_Time' },
				  { value: 69, key: 'release_cause_from_protocol_stack', label: 'Response_From_Egress' },
				  { value: 70, key: 'binary_value_of_release_cause_from_protocol_stack', label: 'Response_To_Ingress' },
				  { value: 71, key: 'ring_time', label: 'Ring_Time' },
				  { value: 72, key: 'route_plan', label: 'Routing_Plan_ID' },
				  { value: 73, key: 'routing_plan_name', label: 'Routing_Plan_Name' },
				  { value: 74, key: 'start_time', label: 'Start_Time' },
				  { value: 75, key: 'static_route', label: 'Static_Route_ID' },
				  { value: 76, key: 'static_route_name', label: 'Static_Route_Name' },
				  { value: 77, key: 'route_prefix', label: 'Teach_Prefix' },
				  { value: 78, key: 'term_code', label: 'Term_Code' },
				  { value: 79, key: 'term_code_name', label: 'Term_Code_Name' },
				  { value: 80, key: 'termination_codec_list', label: 'Term_Codecs' },
				  { value: 81, key: 'term_country', label: 'Term_Country' },
				  { value: 82, key: 'termination_destination_number', label: 'Term_DST_Number' },
				  { value: 83, key: 'term_delay_second', label: 'Term_Delay_Second' },
				  { value: 84, key: 'termination_destination_host_name', label: 'Term_IP' },
				  { value: 85, key: 'termination_remote_payload_ip_address', label: 'Term_Media_IP' },
				  { value: 86, key: 'termination_remote_payload_udp_address', label: 'Term_Media_Port_DNIS' },
				  { value: 87, key: 'termination_source_number', label: 'Term_SRC_Number' },
				  { value: 88, key: 'termination_call_id', label: 'Term_Call_ID' },
				  { value: 89, key: 'termination_local_payload_ip_address', label: 'Term_Local_Payload_IP' },
				  { value: 90, key: 'termination_local_payload_udp_address', label: 'Term_Local_Payload_Port' },
				  { value: 91, key: 'termination_source_host_name', label: 'Term_Profile_IP' },
				  { value: 92, key: 'termination_profile_port', label: 'Term_Profile_Port' },
				  { value: 93, key: 'time', label: 'Time' },
				  { value: 94, key: 'translation_ani', label: 'Translation_ANI' },
				  { value: 95, key: 'routing_digits', label: 'Translation_DNIS' },
				  { value: 96, key: 'connection_type', label: 'W/O_Media' },
				],
				decimal: '',
				invoice_send_mode: 'attachment',
				mail_send_options: [
					{ id: 'attachment', text: 'Attachment' },
					{ id: 'link', text: 'Link' },
				],
				invoice_number_convension: '',
				allow_invoice_overlap: false,
				company_info_pos: 'bottom',
				company_info_options: [
					{ id: 'top', text: 'Top' },
					{ id: 'bottom', text: 'Bottom' },
				],
				billing_info_pos: 'bottom',
				billing_info_options: [
					{ id: 'top', text: 'Top' },
					{ id: 'bottom', text: 'Bottom' },
				],
				 editorA: 'editor-a',
				 contentA: '',
				 editorB: 'editor-b',
				 contentB: '',
				 groupname: '',
				 placement: '0',
				 placement_options: [
					{ id: 1, text: 'Top' },
					{ id: 2, text: 'Bottom' },
					{ id: 3, text: 'Middle' },
					{ id: 4, text: 'Left' }, 
					{ id: 5, text: 'Right' }, 
				 ],
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
			$('#cdr_fields').multiSelect({
				 selectableHeader: "<div class='custom-header'>Optional Selection</div>",
  				 selectionHeader: "<div class='custom-header'>Selected Fields</div>"
			});
		},
		methods: {
			...mapActions({
				setMessage: 'app_message/setAppMessage'
			}),
			reset() {
				this.invoice = Object.assign({}, this.bakup_invoice)
			},
			getInvoiceForRequest () {
				const invoice_template = Object.assign({}, this.invoice_template)

				invoice_template.decimal = this.invoice.decimal;
				invoice_template.billing_info = this.invoice.contentA;
				invoice_template.billing_info_position = this.invoice.billing_info_pos;
				invoice_template.send_rate_as = this.invoice.send_rate_as;
				invoice_template.invoice_send_mode = this.invoice.invoice_send_mode;
				invoice_template.allow_invoice_overlap = this.invoice.allow_invoice_overlap;
				invoice_template.logo_url = this.invoice.logo_url;
				invoice_template.company_info = this.invoice.contentB;
				invoice_template.company_info_position = this.invoice.company_info_pos;
				invoice_template.invoice_number_format = this.invoice.invoice_number_convension;
				var vm = this;
				this.invoice.invoice_cdr_field = '';
				console.log(this.invoice.invoice_cdr_fields);
				this.invoice.invoice_cdr_fields.forEach(function(item, i){
                    if(i !== 0)
                        vm.invoice.invoice_cdr_field += ",";
                    vm.invoice.invoice_cdr_field += item;
					console.log(vm.invoice.invoice_cdr_field);
                });
				invoice_template.cdr_fields = this.invoice.invoice_cdr_field;

				return invoice_template;

			},
			save_invoice() {
				const reqBody = this.getInvoiceForRequest()
				var url = api.getEndpointUrl() + '/v1/config/invoice';
				console.log('Request Body:', reqBody)
				this.$http.patch(url, reqBody)
					.then(response => {
						if (response.body.success) {
							console.log(response.body);
							this.setMessage('Invoice Setting was changed successfully');
						}
					})
					.catch(error => {
						console.log(error)
					})
			},
			saveInvoice () {
				this.$validator.validateAll()
				.then(this.save_invoice)
				.catch(error => {
					console.log(error)
					this.setMessage({
						message: 'Validation failed',
						type: 'error'
					})
				})
			},
			fetchInvoice () {
				const url = api.getEndpointUrl() + '/v1/config/invoice'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const invoice = body.payload
						console.log(invoice);
						Vue.set(this.invoice, 'decimal', invoice.decimal);
						Vue.set(this.invoice, 'contentA', invoice.billing_info);
						Vue.set(this.invoice, 'billing_info_pos', invoice.billing_info_position);
						Vue.set(this.invoice, 'contentB', invoice.company_info);
						Vue.set(this.invoice, 'company_info_pos', invoice.company_info_position);
						Vue.set(this.invoice, 'allow_invoice_overlap', invoice.allow_invoice_overlap);
						Vue.set(this.invoice, 'invoice_number_convension', invoice.invoice_number_format);
						Vue.set(this.invoice, 'invoice_send_mode', invoice.invoice_send_mode);
						Vue.set(this.invoice, 'invoice_cdr_field', invoice.cdr_fields);
						var arr = invoice.cdr_fields.split(",").map(function(item) {
							return item.trim();
						});
						Vue.set(this.invoice, 'invoice_cdr_fields', arr);
						Vue.set(this.invoice, 'send_rate_as', invoice.send_rate_as);
						Vue.set(this.invoice, 'logo_url', invoice.logo_url);
						
						console.log(this.invoice);

						this.bakup_invoice = Object.assign({}, this.invoice)

					}
				})
				.catch(error => {
					console.log(error)
				})
			},
		  'success': function (file) {
			console.log('A file was successfully uploaded')
		  },
		  'process': function () {
			var newArr = this.$children.filter(function(item){
			  return item.id === "myVueDropzone";
			});
			var component = newArr[0];
			component.processQueue()
		  }
		},
		created () {
			this.fetchInvoice();
		}
	}
</script>

<style>
	.invoice_logo button.btn.btn-default {
		margin-top: 10px;
		width: 150px;
		line-height: 34px;
		padding-top: 0;
	}
	
	h3.description {
		font-size: 20px;
		margin-top: -5px;
		padding-left: 15px;
		margin-bottom: 15px;
	}
	
	.select_wrapper {
		width: 340px;
		margin: 0 0 20px 0;
	}
	
	.fields {
		margin-top: 20px;
	}
	
	.dropzone .dz-preview .dz-success-mark, 
	.dropzone .dz-preview .dz-error-mark {
		margin-left: -25px !important;
		margin-top: -27px !important;
	}

	
	.fields .checkbox {
		padding-left: 20px;
		margin-top: 20px;
	}
	
	label.titling {
		display: block;
		font-size: 18px;
		margin-top: 20px;
	}
	
	@media (max-width: 480px) {
		.select_wrapper {
			width: 100%;
		}
	}
</style>
