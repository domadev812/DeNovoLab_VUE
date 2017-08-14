<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Configuration</a></li>
				  <li class="breadcrumb-item">
					  <router-link to="/configuration/ftp_configuration">FTP Configuration</router-link>
				  </li>
				  <li class="breadcrumb-item active">FTP Configuration Editor</li>
			</ol>
			<h1 class="page-header">FTP Configuration Editor</h1>
			<router-link to="/configuration/ftp_configuration" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad configuration_pad">
				<div class="col-md-12 col-sm-12">
					<form class="form" @submit.prevent="validateBeforeSubmit">
						<section class="config_section">
							<h2 class="config_section_name">Job Basic</h2>
							<div class="row">
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label for="alias">Alias:</label>
										<input type="text" name="alias" v-model="alias" class="form-control"  :class="{'input': true, 'is-danger': errors.has('alias') }" placeholder="Enter Alias" v-validate="{ rules: {required: true, regex: /^[a-zA-Z0-9_]*$/} }">
										<span v-show="errors.has('alias')" class="help is-danger">{{ errors.first('alias') }}</span>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label for="max_lines">Maximum Lines per File:</label>
										<input type="text" name="max_lines" v-model="max_lines" class="form-control"  :class="{'input': true, 'is-danger': errors.has('max_lines') }"  v-validate:max_lines="'required|numeric'" placeholder="Enter Number of Lines">
										<span v-show="errors.has('max_lines')" class="help is-danger">{{ errors.first('max_lines') }}</span>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label>File Breakdown:</label>
										<select2 :options="file_options" v-model="file_breakdown" name="file_breakdown">
										</select2>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label>Include Headers:</label>
										<select2 :options="include_headers_options" v-model="include_headers" name="contain_headers">
										</select2>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label>Compression:</label>
										<select2 :options="compression_options" v-model="compression" name="file_type">
										</select2>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label>Frequency</label>
										<select2 :options="frequency_options" v-model="frequency" name="frequency">
										</select2>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label for="ftp_execute_on">FTP Execute On:</label>
										<select class="selectable" v-model="ftp_execute_on">
											<option v-for="hour in day_hours" v-bind:value="hour.id">
												{{ hour.text }}
											</option>
										</select>
										<!--<el-time-picker style="width: 100%" v-model="ftp_execute_on" :picker-options="{}" placeholder="Execute On"></el-time-picker>-->
									</div>
								</div>
							</div>
						</section>
						<section class="config_section">
							<h2 class="config_section_name">Filter Criteria</h2>
							<div class="row">
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label>Duration:</label>
										<select2 :options="duration_options" v-model="duration" name="duration">
										</select2>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label>Originating Release Cause:</label>
										<el-select v-model="orc" multiple placeholder="Select Cause" @change="handleChange">
											<el-option
											v-for="item in orc_options"
											:key="item.value"
											:label="item.text"
											:value="item.value">
											</el-option>
										</el-select>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label>Terminating Release Cause:</label>
										<el-select v-model="trc" multiple placeholder="Select Cause" @change="handleChange">
											<el-option
											v-for="item in orc_options"
											:key="item.value"
											:label="item.text"
											:value="item.value">
											</el-option>
										</el-select>
									</div>
								</div>
							</div>
						</section>
						<section class="config_section">
							<h2 class="config_section_name">FTP Setting</h2>
							<div class="row">
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label for="server_ip">Server IP:</label>
										<input type="text" name="server_ip" v-model="server_ip" class="form-control"  :class="{'input': true, 'is-danger': errors.has('server_ip') }"  v-validate:server_ip="'required|ip'" placeholder="Enter Server IP">
										<span v-show="errors.has('server_ip')" class="help is-danger">{{ errors.first('server_ip') }}</span>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label for="server_port">Server Port:</label>
										<input type="text" name="server_port" v-model="server_port" class="form-control" :class="{'input': true, 'is-danger': errors.has('server_port') }"  v-validate:server_port="'required|numeric'" placeholder="Enter Server Port">
										<span v-show="errors.has('server_port')" class="help is-danger">{{ errors.first('server_port') }}</span>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label for="server_dir">Server Directory:</label>
										<input type="text" name="server_dir" v-model="server_dir" class="form-control"  :class="{'input': true, 'is-danger': errors.has('server_dir') }"  v-validate:server_dir="'required'" placeholder="Enter Server Directory">
										<span v-show="errors.has('server_dir')" class="help is-danger">{{ errors.first('server_dir') }}</span>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label for="user_name">User Name:</label>
										<input type="text" name="user_name" v-model="user_name" class="form-control"  :class="{'input': true, 'is-danger': errors.has('user_name') }"  v-validate:user_name="'required'" placeholder="Enter User Name">
										<span v-show="errors.has('user_name')" class="help is-danger">{{ errors.first('user_name') }}</span>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label for="pass">Password:</label>
										<input type="password" name="pass" v-model="pass" class="form-control" :class="{'input': true, 'is-danger': errors.has('pass') }"  v-validate:pass="'required'" placeholder="Enter Password">
										<span v-show="errors.has('pass')" class="help is-danger">{{ errors.first('pass') }}</span>
									</div>
								</div>
							</div>
						</section>
						  <section class="config_section">
							<h2 class="config_section_name">Fields</h2>
							<div class="row">
								<div class="col-sm-8">
									<div class="form-group">
										<!--<select multiple="multiple" id="fields" name="fields">
											<option v-for="field in fields_options" :value='field.value'>{{field.text}}</option>
										</select>-->
                                        <el-transfer v-model="ftp_fields" :titles="['Fields', 'Selected Fields']" :data="fields_options">
                                        </el-transfer>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-8">
									<div class="form-group">
										<!--<select multiple="multiple" id="or_trunk" name="or_trunk">
											<option v-for="trunk in trunk_options" :value='trunk.value'>{{trunk.text}}</option>
										</select>-->
                                        <el-transfer v-model="ots" :titles="['Originating Trunk', 'Selected Origination Trunk']" :data="ingress_trunk_options">
                                        </el-transfer>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-8">
									<div class="form-group">
										<!--<select multiple="multiple" id="ter_trunk" name="ter_trunk">
											<option v-for="trunk in trunk_options" :value='trunk.value'>{{trunk.text}}</option>
										</select>-->
                                        <el-transfer v-model="tts" :titles="['Terminating  Trunk', 'Selected Terminating  Trunk']" :data="egress_trunk_options">
                                        </el-transfer>
									</div>
								</div>
							</div>
						  </section>
						  <div class="button_set little-space">
							<button class="btn btn-primary" type="submit">
								Submit
							</button>
							<a class="btn btn-default" @click="reset()">
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
		  vSelect = require('vue!../main_components/select.vue')
	const api = require("../../api");
	const auth = require("../../auth");
	_ = require('lodash');
	import {mapGetters,	mapActions} from 'vuex'
	
	module.exports = {
		components: {
			'multiselect': multiselect,
			'select2': vSelect
		},
		data: function(){
            return {
			  ftp_fields: [],
			  day_hours: [
				  {id: '00:00', text: '00:00'},
				  {id: '01:00', text: '01:00'},
				  {id: '02:00', text: '02:00'},
				  {id: '03:00', text: '03:00'},
				  {id: '04:00', text: '04:00'},
				  {id: '05:00', text: '05:00'},
				  {id: '06:00', text: '06:00'},
				  {id: '07:00', text: '07:00'},
				  {id: '08:00', text: '08:00'},
				  {id: '09:00', text: '09:00'},
				  {id: '10:00', text: '10:00'},
				  {id: '11:00', text: '11:00'},
				  {id: '12:00', text: '12:00'},
				  {id: '13:00', text: '13:00'},
				  {id: '14:00', text: '14:00'},
				  {id: '15:00', text: '15:00'},
				  {id: '16:00', text: '16:00'},
				  {id: '17:00', text: '17:00'},
				  {id: '18:00', text: '18:00'},
				  {id: '19:00', text: '19:00'},
				  {id: '20:00', text: '20:00'},
				  {id: '21:00', text: '21:00'},
				  {id: '22:00', text: '22:00'},
				  {id: '23:00', text: '23:00'},

			  ],
			  ots: [],
			  tts: [],
			  fields_options: [
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

				//   { id: 1, value: 'answer_time', text: 'Answer_Time' },
				//   { id: 2, value: 'call_duration', text: 'Call_Duration' },
				//   { id: 3, value: 'dynamic_route', text: 'Dynamic_Route_ID' },
				//   { id: 4, value: 'dynamic_route_name', text: 'Dynamic_Route_Name' },
				//   { id: 5, value: 'trunk_id_termination', text: 'Egress_Alias' },
				//   { id: 6, value: 'egress_bill_minutes', text: 'Egress_Bill_Minutes' },
				//   { id: 7, value: 'egress_bill_result', text: 'Egress_Bill_Result' },
				//   { id: 8, value: 'egress_bill_time', text: 'Egress_Bill_Time' },
				//   { id: 9, value: 'egress_client_currency', text: 'Egress_Client_Currency' },
				//   { id: 10, value: 'egress_client_id', text: 'Egress_Client_ID' },
				//   { id: 11, value: 'egress_client_name', text: 'Egress_Client_Name' },
				//   { id: 12, value: 'egress_code_acd', text: 'Egress_Code_ACD' },
				//   { id: 13, value: 'egress_code_asr', text: 'Egress_Code_ASR' },
				//   { id: 14, value: 'egress_cost', text: 'Egress_Cost' },
				//   { id: 15, value: 'egress_dnis_type', text: 'Egress_DNIS_Type' },
				//   { id: 16, value: 'egress_id', text: 'Egress_ID' },
				//   { id: 17, value: 'egress_name', text: 'Egress_Name' },
				//   { id: 18, value: 'egress_rate', text: 'Egress_Rate' },
				//   { id: 19, value: 'egress_rate_id', text: 'Egress_Rate_ID' },
				//   { id: 20, value: 'egress_rate_table_id', text: 'Egress_Rate_Table_ID' },
				//   { id: 21, value: 'egress_rate_table_name', text: 'Egress_Rate_Table_Name' },
				//   { id: 22, value: 'egress_rate_type', text: 'Egress_Rate_Type' },
				//   { id: 23, value: 'egress_rate_type_digit', text: 'Egress_Rate_Type_Digit' },
				//   { id: 24, value: 'egress_six_seconds', text: 'Egress_Six_Seconds' },
				//   { id: 25, value: 'egress_erro_string', text: 'Egress_Trunk_Trace' },
				//   { id: 26, value: 'end_time', text: 'End_Time' },
				//   { id: 27, value: 'final_route_indication', text: 'Final_Route' },
				//   { id: 28, value: 'trunk_id_origination', text: 'Ingress_Alias' },
				//   { id: 29, value: 'ingress_bill_minutes', text: 'Ingress_Bill_Minutes' },
				//   { id: 30, value: 'ingress_client_bill_result', text: 'Ingress_Client_Bill_Result' },
				//   { id: 31, value: 'ingress_client_bill_time', text: 'Ingress_Client_Bill_Time' },
				//   { id: 32, value: 'ingress_client_cost', text: 'Ingress_Client_Cost' },
				//   { id: 33, value: 'ingress_client_currency', text: 'Ingress_Client_Currency' },
				//   { id: 34, value: 'ingress_client_id', text: 'Ingress_Client_ID' },
				//   { id: 35, value: 'ingress_client_name', text: 'Ingress_Client_Name' },
				//   { id: 36, value: 'ingress_client_rate', text: 'Ingress_Client_Rate' },
				//   { id: 37, value: 'ingress_client_rate_table_name', text: 'Ingress_Client_Rate_Table_Name' },
				//   { id: 38, value: 'ingress_dNIS_type', text: 'Ingress_DNIS_Type' },
				//   { id: 39, value: 'ingress_id', text: 'Ingress_ID' },
				//   { id: 40, value: 'ingress_rate_id', text: 'Ingress_Rate_ID' },
				//   { id: 41, value: 'ingress_client_rate_table_id', text: 'Ingress_Rate_Table_ID' },
				//   { id: 42, value: 'ingress_rate_type', text: 'Ingress_Rate_Type' },
				//   { id: 43, value: 'ingress_rate_type', text: 'Ingress_Rate_Type_Digit' },
				//   { id: 44, value: 'lrn_dnis', text: 'LRN_Number' },
				//   { id: 45, value: 'lrn_source', text: 'LRN_Source' },
				//   { id: 46, value: 'lnp_dipping_cost', text: 'Lnp_dipping_Cost' },
				//   { id: 47, value: 'first_release_dialogue', text: 'Orig/Term_Release' },
				//   { id: 48, value: 'orig_call_duration', text: 'Orig_Call_Duration' },
				//   { id: 49, value: 'orig_code', text: 'Orig_Code' },
				//   { id: 50, value: 'orig_code_name', text: 'Orig_Code_Name' },
				//   { id: 51, value: 'origination_codec_list', text: 'Orig_Codecs' },
				//   { id: 52, value: 'orig_country', text: 'Orig_Country' },
				//   { id: 53, value: 'origination_destination_number', text: 'Orig_DST_Number' },
				//   { id: 54, value: 'orig_delay_second', text: 'Orig_Delay_Second' },
				//   { id: 55, value: 'origination_source_host_name', text: 'Orig_IP' },
				//   { id: 56, value: 'origination_remote_payload_ip_address', text: 'Orig_Media_IP_Ani' },
				//   { id: 57, value: 'origination_remote_payload_udp_address', text: 'Orig_Media_Port_Ani' },
				//   { id: 58, value: 'origination_source_number', text: 'Orig_SRC_Number' },
				//   { id: 59, value: 'origination_call_id', text: 'Orig_Call_ID' },
				//   { id: 60, value: 'origination_local_payload_ip_address', text: 'Orig_Local_Payload_IP' },
				//   { id: 61, value: 'origination_local_payload_udp_address', text: 'Orig_Local_Payload_Port' },
				//   { id: 62, value: 'origination_destination_host_name', text: 'Orig_Profile_IP' },
				//   { id: 63, value: 'origination_profile_port', text: 'Orig_Profile_Port' },
				//   { id: 64, value: 'pdd', text: 'PDD(ms)' },
				//   { id: 65, value: 'q850_cause_string', text: 'Q850 Cause' },
				//   { id: 66, value: 'q850_cause', text: 'Cause Code' },
				//   { id: 67, value: 'release_cause', text: 'Release_Cause' },
				//   { id: 68, value: 'rerate_time', text: 'Rerate_Time' },
				//   { id: 69, value: 'release_cause_from_protocol_stack', text: 'Response_From_Egress' },
				//   { id: 70, value: 'binary_value_of_release_cause_from_protocol_stack', text: 'Response_To_Ingress' },
				//   { id: 71, value: 'ring_time', text: 'Ring_Time' },
				//   { id: 72, value: 'route_plan', text: 'Routing_Plan_ID' },
				//   { id: 73, value: 'routing_plan_name', text: 'Routing_Plan_Name' },
				//   { id: 74, value: 'start_time', text: 'Start_Time' },
				//   { id: 75, value: 'static_route', text: 'Static_Route_ID' },
				//   { id: 76, value: 'static_route_name', text: 'Static_Route_Name' },
				//   { id: 77, value: 'route_prefix', text: 'Teach_Prefix' },
				//   { id: 78, value: 'term_code', text: 'Term_Code' },
				//   { id: 79, value: 'term_code_name', text: 'Term_Code_Name' },
				//   { id: 80, value: 'termination_codec_list', text: 'Term_Codecs' },
				//   { id: 81, value: 'term_country', text: 'Term_Country' },
				//   { id: 82, value: 'termination_destination_number', text: 'Term_DST_Number' },
				//   { id: 83, value: 'term_delay_second', text: 'Term_Delay_Second' },
				//   { id: 84, value: 'termination_destination_host_name', text: 'Term_IP' },
				//   { id: 85, value: 'termination_remote_payload_ip_address', text: 'Term_Media_IP' },
				//   { id: 86, value: 'termination_remote_payload_udp_address', text: 'Term_Media_Port_DNIS' },
				//   { id: 87, value: 'termination_source_number', text: 'Term_SRC_Number' },
				//   { id: 88, value: 'termination_call_id', text: 'Term_Call_ID' },
				//   { id: 89, value: 'termination_local_payload_ip_address', text: 'Term_Local_Payload_IP' },
				//   { id: 90, value: 'termination_local_payload_udp_address', text: 'Term_Local_Payload_Port' },
				//   { id: 91, value: 'termination_source_host_name', text: 'Term_Profile_IP' },
				//   { id: 92, value: 'termination_profile_port', text: 'Term_Profile_Port' },
				//   { id: 93, value: 'time', text: 'Time' },
				//   { id: 94, value: 'translation_ani', text: 'Translation_ANI' },
				//   { id: 95, value: 'routing_digits', text: 'Translation_DNIS' },
				//   { id: 96, value: 'connection_type', text: 'W/O_Media' },
			  ],
			  loading: false,
			  ingress_trunk_options: [],
			  egress_trunk_options: [],
			  orc: [],
			  trc: [],
			  orc_options: [
				  { id: 1, value: '200', text: '200' },
				  { id: 2, value: '300', text: '300' },
				  { id: 3, value: '301', text: '301' },
				  { id: 4, value: '302', text: '302' },
				  { id: 5, value: '305', text: '305' },
				  { id: 6, value: '380', text: '380' },
				  { id: 7, value: '400', text: '400' },
				  { id: 8, value: '401', text: '401' },
				  { id: 9, value: '402', text: '402' },
				  { id: 10, value: '403', text: '403' },
				  { id: 11, value: '404', text: '404' },
				  { id: 12, value: '405', text: '405' },
				  { id: 13, value: '406', text: '406' },
				  { id: 14, value: '407', text: '407' },
				  { id: 15, value: '408', text: '408' },
				  { id: 16, value: '410', text: '410' },
				  { id: 17, value: '413', text: '413' },
				  { id: 18, value: '414', text: '414' },
				  { id: 19, value: '415', text: '415' },
				  { id: 20, value: '416', text: '416' },
				  { id: 21, value: '420', text: '420' },
				  { id: 22, value: '421', text: '421' },
				  { id: 23, value: '423', text: '423' },
				  { id: 24, value: '480', text: '480' },
				  { id: 25, value: '481', text: '481' },
				  { id: 26, value: '482', text: '482' },
				  { id: 27, value: '483', text: '483' },
				  { id: 28, value: '484', text: '484' },
				  { id: 29, value: '485', text: '485' },
				  { id: 30, value: '486', text: '486' },
				  { id: 31, value: '487', text: '487' },
				  { id: 32, value: '488', text: '488' },
				  { id: 33, value: '491', text: '491' },
				  { id: 34, value: '493', text: '493' },
				  { id: 35, value: '500', text: '500' },
				  { id: 36, value: '501', text: '501' },
				  { id: 37, value: '502', text: '502' },
				  { id: 38, value: '503', text: '503' },
				  { id: 38, value: '504', text: '504' },
				  { id: 40, value: '505', text: '505' },
				  { id: 41, value: '513', text: '513' },
				  { id: 42, value: '600', text: '600' },
				  { id: 43, value: '603', text: '603' },
				  { id: 44, value: '604', text: '604' },
				  { id: 45, value: '606', text: '606' }
			  ],
			  duration: 0,
			  duration_options: [
				  { id: 0, text: 'All' },
				  { id: 1, text: 'Non-zero' },
				  { id: 2, text: 'Zero' },
			  ],
			  frequency: 'daily',
			  frequency_options: [
				  { id: 'daily', text: 'Daily' },
				  { id: 'weekly', text: 'Weekly' },
				  { id: 'hourly', text: 'Hourly' },
				  { id: 'minutely', text: 'Minutely' }
			  ],
			  file_breakdown: 'as one big file',
			  file_options:[
				  {id: 'as one big file', value: 'as one big file', text: 'As one big file'},
				  {id: 'as hourly file', value: 'as hourly file', text: 'As hourly file'},
				  {id: 'as daily file', value: 'as daily file', text: 'As daily file'},
			  ],
			  include_headers: true,
			  include_headers_options:[
				  {id: true, text: 'Yes'},
				  {id: false, text: 'No'}
			  ],
			  compression: 'gz',
			  compression_options:[
				  {id: 'gz', text: 'gz'},
				  {id: 'tar.gz', text: 'tar.gz'},
				  {id: 'tar.bz2', text: 'tar.bz2'},
			  ],
			  alias:'',
			  ftp_execute_on: '',
			  max_lines: '',
			  server_ip: '',
			  server_port: '',
			  user_name: '',
			  server_dir: '',
			  pass: '',
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
		created: function() {
			this.fetchEgressTrunks()
			this.fetchIngressTrunks()
		},
		mounted: function() {
			// $('#fields').multiSelect({
			// 	selectableHeader: "<div class='custom-header'>Fields</div>",
			// 	selectionHeader: "<div class='custom-header'>Fields Selected</div>"
			// });
			// $('#or_trunk').multiSelect({
			// 	 selectableHeader: "<div class='custom-header'>Originating Trunk</div>",
  			// 	 selectionHeader: "<div class='custom-header'>Origination Trunk Selected</div>"
			// });
			// $('#ter_trunk').multiSelect({
			// 	 selectableHeader: "<div class='custom-header'>Terminating Trunk</div>",
  			// 	 selectionHeader: "<div class='custom-header'>Terminating Trunk Selected</div>"
			// });
		},
		updated: function () {
			var elementList = document.querySelectorAll('.el-input > input');
			for( var index=0; index < elementList.length; index++ ) {
				console.log(elementList);
				elementList[index].placeholder = 'Select Cause';
			}		
		},
		methods: {
			...mapActions({
				setAsyncConfirm: 'async_confirm/setAsyncConfirm',
				setMessage: 'app_message/setAppMessage'
			}),
			fetchEgressTrunks () {
				const url = api.getEndpointUrl() + '/v1/trunk/egress/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const egress_trunks = body.payload.items
						console.log(egress_trunks);
						var self = this;
						egress_trunks.forEach(function (temp, i) {
							var egress_trunk = {};
							egress_trunk.value = i;
							egress_trunk.key = temp.resource_id;
							egress_trunk.label = temp.name;
							self.egress_trunk_options.push(egress_trunk);
						});
						console.log(this.egress_trunk_options);
						
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			fetchIngressTrunks() {
				const url = api.getEndpointUrl() + '/v1/trunk/ingress/list'
					this.$http.get(url)
					.then(response => {
						const body = response.body
						if (body.success) {
							const ingress_trunks = body.payload.items
							var self = this;
							ingress_trunks.forEach(function (temp, i) {
								var trunk = {};
								trunk.key = temp.resource_id;
								trunk.label = temp.name;
								self.ingress_trunk_options.push(trunk);
							});
							console.log(this.ingress_trunk_options);
							
						}
					})
					.catch(error => {
						console.log(error)
					})
			},
			handleChange() {
			},
			submit : function(){
				//submit function
				console.log("clicked submit funciton");
			},
			validateBeforeSubmit() {
				this.$validator.validateAll().then(() => {
					// eslint-disable-next-line
					this.loading = true;
					var include_header = "";
					if(this.include_headers == 1){
						include_header = true;
					}
					else{
						include_header = false;
					}

					console.log(this.ftp_fields);

					this.$http.post(api.getEndpointUrl() + '/v1/config/ftp/create',
					{
						"active" : true,
						"name" : this.alias,
						"frequency": this.frequency,
						"time": this.ftp_execute_on,
						"max_line_per_file": this.max_lines,
						"file_breakdown": this.file_breakdown,
						"include_header": include_header,
						"compression": this.compression,
						"non_zero": this.duration,
						"orig_return_code": this.orc,
						"term_return_code": this.trc,
						"ftp_server_ip": this.server_ip,
						"ftp_server_port": this.server_port,
						"ftp_directory": this.server_dir,
						"ftp_username": this.user_name,
						"ftp_password": this.pass,
						"include_fields": this.ftp_fields,
						"egress_trunks": this.tts,
						"ingress_trunks": this.ots,
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
							this.loading = false;
							this.setMessage('The FTP Configuration has been created!');
							var thisvm = this;
							setTimeout(function(){
								thisvm.$router.push('/configuration/ftp_configuration');
							}, 3000);
						},
						function(response) {
							this.loading = false;
							//alert("Error: " + response.status + " / " + response.statusText);
						}
					)
				}).catch(() => {
					// eslint-disable-next-line
					
				});
			},
			reset : function(){
				// $('#fields').multiSelect('deselect_all');
				// $('#or_trunk').multiSelect('deselect_all');
				// $('#ter_trunk').multiSelect('deselect_all');
				this.ftp_fields = [];
				this.ots = [];
				this.tts = [];
				this.alias = '';
				this.max_lines = '';
				this.file_breakdown = 'as one big file';
				this.include_headers = true;
				this.compression = 'gz';
				this.frequency = 'daily';
				this.ftp_execute_on = '00:00';
				this.duration = 0;
				this.orc = [];
				this.trc = [];
				this.server_ip = '';				
				this.server_port = '';
				this.server_dir = '';
				this.user_name = '';
				this.pass = '';
				this.ftp_fields = [];
			}
		}
	}
</script>

<style>
	h2.config_section_name {
		font-size: 24px;
		margin-top: 0;
	}
	
	.config_section {
		background: #f7f8f9;
		padding: 18px;
		border-radius: 5px;
		margin-bottom: 18px;
	}
	
	.config_section .ms-container {
		margin-bottom: 20px;
	}
	
	.configuration_pad {
		padding: 25px 5px;
	}

	.el-select__tags {
		display: none;
	}

	.el-select {
		width: 100%;
	}

</style>
