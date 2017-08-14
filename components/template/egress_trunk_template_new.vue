<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Template</a></li>
				  <li class="breadcrumb-item">
					  <router-link to="/template/egress_trunk_template">Egress Trunk Template</router-link>
				  </li>
				  <li class="breadcrumb-item active">Egress Trunk Template Editor</li>
			</ol>
			<h1 class="page-header">Egress Trunk Template Editor</h1>
			<router-link to="/template/egress_trunk_template" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad">
				<spinner v-show="loading" class="spinner"></spinner>
				<tabs class="vertical">
                    <tab label="Template Name" class="" icon="dnl_icon dnl_arrow-point-to-right" selected>
						<section class="role_section">
							<h2 class="role_section_name">Template Name</h2>
							<div class="clearfix"></div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="client_name">Template Name:</label>
									<input type="text" name="template_name" v-model="template.template_name" class="form-control" :class="{'input': true, 'is-danger': errors.has('template_name') }" v-validate="'required'" placeholder="Enter Template Name">
									<span v-show="errors.has('template_name')" class="help is-danger">{{ errors.first('template_name') }}</span>
								</div>
							</div>
							<div class="clearfix"></div>
						</section>
					</tab>
					<tab label="Trunk Info" class="" icon="dnl_icon dnl_arrow-point-to-right">
						<section class="role_section basic_section">
							<h2 class="role_section_name">Trunk Info</h2>
							<div class="col-md-4 col-sm-6">
								<div class="form-group fix-select">
									<label>Media Type:</label>
									<select2 :options="media_options" v-model="template.media_type">
									</select2>
								</div>
							</div>
                            <div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="pdd_timeout">PDD Timeout:</label>
									<input type="text" name="pdd_timeout" v-model="template.pdd_timeout" class="form-control" placeholder="Enter PDD Timeout">
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group fix-select">
									<label>Multi-Host Routing Strategy:</label>
									<select2 :options="routing_options" v-model="template.multi_host">
									</select2>
								</div>
							</div>
							<div class="col-md-4 col-sm-6">
								<div class="form-group fix-select">
									<label>Pass Dipping Info:</label>
									<select2 :options="dipping_options" v-model="template.lnp_dipping_rate">
									</select2>
								</div>
							</div>
                            <div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="min_duration">Min Duration:</label>
									<input type="text" name="min_duration" v-model="min_duration" class="form-control" placeholder="Enter Min Duration">
								</div>
							</div>
                            <div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="max_duration">Max Duration:</label>
									<input type="text" name="max_duration" v-model="template.max_duration" class="form-control" placeholder="Enter Max Duration">
								</div>
							</div>
                            <div class="col-md-4 col-sm-6">
								<div class="form-group fix-select">
									<label>T.38:</label>
									<select2 :options="t38_options" v-model="t_38">
									</select2>
								</div>
							</div>
                            <div class="col-md-4 col-sm-6">
								<div class="form-group fix-select">
									<label>Rate Table:</label>
									<select2 :options="rate_table_options" v-model="template.rate_table">
									</select2>
								</div>
							</div>
							 <div class="col-md-4 col-sm-6">
								<div class="form-group fix-select">
									<label>Random ANI GROUP:</label>
									<select2 :options="random_ani_group_options" v-model="template.random_table_id">
									</select2>
								</div>
							</div>
                            <div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="ring_timer">Ring Timer:</label>
									<input type="text" name="ring_timer" v-model="template.ring_timer" class="form-control" :class="{'input': true, 'is-danger': errors.has('ring_timer') }" v-validate="'required|numeric'" placeholder="Enter Ring Timer">
									<span v-show="errors.has('ring_timer')" class="help is-danger">{{ errors.first('ring_timer') }}</span>
								</div>
							</div>
                            <!-- <div class="col-md-4 col-sm-6">
								<div class="form-group fix-select">
									<label>Ignore Early Media:</label>
									<select2 :options="ignore_options" v-model="template.ignore_early_media">
									</select2>
								</div>
							</div>
                            <div class="col-md-4 col-sm-6">
								<div class="form-group fix-select">
									<label>Ignore Early NOSDP:</label>
									<select2 :options="ignore_options" v-model="template.ignore_early_nosdp">
									</select2>
								</div>
							</div>
                            <div class="col-md-4 col-sm-6">
								<div class="form-group fix-select">
									<label>Bill by:</label>
									<select2 :options="bill_by_options" v-model="template.bill_by">
									</select2>
								</div>
							</div> -->
                            <div class="clearfix"></div>
                            <div class="col-md-8 col-sm-12">
                                  <!--<label for="groupname">Codecs:</label>
                                  <select multiple="multiple" id="user_detail_fields" name="carrier">
                                    <option v-for="option in options" :value='option.value'>{{option.text}}</option>
                                  </select>-->
								  <el-transfer v-model="codec" :titles="['Codecs', 'Selected Codecs']" :data="codecs">
								  </el-transfer>
                            </div>
							<div class="clearfix"></div>
						</section>
					</tab>
					<tab label="Action" class="" icon="dnl_icon dnl_arrow-point-to-right">
						<section class="role_section">
							<h2 class="role_section_name">Action</h2>
                            <a class="btn btn-primary mini" @click="addAction">
                                <span class="dnl_icon dnl_add"></span> Add
                            </a>
                            <div class="table-responsive m-top-20">
					           <table class="table table-striped table-hover carrier_groups">
                                   <thead>
                                        <tr>
                                            <th>Time Profile</th>
                                            <th>Target</th>
                                            <th>Code</th>
                                            <th>Action</th>
                                            <th>Chars to Add</th>
                                            <th>Num of chars to Del</th>
                                            <th>Number Type</th>
                                            <th>Number Length</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                   <tbody>
									   <template v-for="(item, index) in actions">
										   <tr>
											   <td>
												   <select class="selectable width-105" v-model="item.time_profile">
														<option v-for="item in time_profile_options" v-bind:value="item.id">
															{{ item.text }}
														</option>
													</select>
											   </td>
											   <td>
												   <select class="selectable width-65" v-model="item.target">
														<option v-for="item in target_options" v-bind:value="item.id">
															{{ item.text }}
														</option>
													</select>
											   </td>
											   <td>
												   <input type="text" v-model="item.code" class="form-control width-80">
											   </td>
											   <td>
												   <select class="selectable width-105" v-model="item.action" @change="onchange_action(index)">
														<option v-for="item in action_options" v-bind:value="item.id">
															{{ item.text }}
														</option>
													</select>
											   </td>
											   <td>
												   <input type="text" v-model="item.chars_to_add" class="form-control width-80" :disabled="item.is_delete_action">
											   </td>
											   <td>
												   <select class="selectable width-105" v-model="item.num_of_chars" :disabled="!item.is_delete_action">
													   <option value='0' selected disabled></option>
														<option v-for="item in num_of_chars_options" v-bind:value="item.id">
															{{ item.text }}
														</option>
													</select>
											   </td>
											   <td>
												   <select class="selectable width-30" v-model="item.number_type">
														<option v-for="item in number_type_options" v-bind:value="item.id">
															{{ item.text }}
														</option>
													</select>
											   </td>
											   <td>
												   <input type="text" v-model="item.number_length" class="form-control width-80" :disabled="true">
											   </td>
											   <td>
													<a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="delete_action(index)">
														<span class="dnl_icon dnl_action_delete"></span>
													</a>
												</td>
										   </tr>
									   </template>
								   </tbody>
                               </table>
                            </div>
							<div class="clearfix"></div>
						</section>
					</tab>
					<tab label="Fail-Over Rule" class="" icon="dnl_icon dnl_arrow-point-to-right">
						<section class="role_section fix-select">
							<h2 class="role_section_name">Fail-Over Rule</h2>
							<a class="btn btn-primary mini" @click="addFailRule">
                                <span class="dnl_icon dnl_add"></span> Add
                            </a>
                            <div class="table-responsive m-top-20">
					           <table class="table table-striped table-hover carrier_groups">
                                   <thead>
                                        <tr>
                                            <th>Route Type</th>
                                            <th> Code</th>
                                            <th>Response</th>
                                            <th>Action</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                       <template v-for="(item, index) in fail_rules">
										   	<tr>
												<td>
													<select class="selectable" v-model="item.route_type">
														<option v-for="item in route_type_options" v-bind:value="item.id">
															{{ item.text }}
														</option>
													</select>
												</td>
												<td>
													<input type="text" v-model="item.code" class="form-control">
												</td>
												<td></td>
												<td>
													<a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="delete_fail_rule(index)">
														<span class="dnl_icon dnl_action_delete"></span>
													</a>
												</td>
											</tr>
										</template>
                                   </tbody>
                               </table>
                            </div>
                            <div class="clearfix"></div>
						</section>
					</tab>
					<tab label="PASS" class="" icon="dnl_icon dnl_arrow-point-to-right">
						<section class="role_section">
							<h2 class="role_section_name">PASS</h2>
							<div class="col-md-4 col-sm-6" v-if="is_paid">
								<div class="form-group fix-select">
									<label>RPID Screen:</label>
									<select2 :options="rpid_screen_options" v-model="template.rpid_screen">
									</select2>
								</div>
							</div>
							<div class="col-md-4 col-sm-6" v-if="is_paid">
								<div class="form-group fix-select">
									<label>RPID Party:</label>
									<select2 :options="rpid_party_options" v-model="template.rpid_party">
									</select2>
								</div>
							</div>
							<div class="col-md-4 col-sm-6" v-if="is_paid">
								<div class="form-group fix-select">
									<label>RPID Id Type:</label>
									<select2 :options="rpid_id_type_options" v-model="template.rpid_id_type">
									</select2>
								</div>
							</div>
							<div class="col-md-4 col-sm-6" v-if="is_paid">
								<div class="form-group fix-select">
									<label>RPID Privacy:</label>
									<select2 :options="rpid_privacy_options" v-model="template.rpid_privacy">
									</select2>
								</div>
							</div>
							<div class="clearfix"></div>
                            <div class="col-md-4 col-sm-6">
								<div class="form-group fix-select">
									<div class="checkbox checkbox-success">
										<input id="is_paid" name="is_paid" type="checkbox" v-model="template.is_paid" @click="is_paid=template.is_paid"> 
										<label for="is_paid">PAID</label>
									</div>
								</div>
							</div>
                            <div class="col-md-4 col-sm-6">
								<div class="form-group fix-select">
									<div class="checkbox checkbox-success">
										<input id="is_oli" name="is_oli" type="checkbox" v-model="template.is_oli" > 
										<label for="is_oli">OLI</label>
									</div>
								</div>
							</div>
                            <div class="col-md-4 col-sm-6">
								<div class="form-group fix-select">
									<div class="checkbox checkbox-success">
										<input id="is_pci" name="is_pci" type="checkbox" v-model="template.is_pci" > 
										<label for="is_pci">PCI</label>
									</div>
								</div>
							</div>
							<div class="clearfix"></div>
                            <div class="col-md-4 col-sm-6">
								<div class="form-group fix-select">
									<div class="checkbox checkbox-success">
										<input id="is_priv" name="is_priv" type="checkbox" v-model="template.is_priv" > 
										<label for="is_priv">PRIV</label>
									</div>
								</div>
							</div>
                            <div class="col-md-4 col-sm-6">
								<div class="form-group fix-select">
									<div class="checkbox checkbox-success">
										<input id="is_div" name="is_div" type="checkbox" v-model="template.is_div" > 
										<label for="is_div">DIV</label>
									</div>
								</div>
							</div>
                            <div class="col-md-4 col-sm-6">
								<div class="form-group">
									<div class="checkbox checkbox-success">
										<input id="is_display_name" name="is_display_name" type="checkbox" v-model="template.is_display_name" > 
										<label for="is_display_name">Display Name</label>
									</div>
								</div>
							</div>
							<div class="clearfix"></div>
						</section>
					</tab>
					<tab label="Billing" class="" icon="dnl_icon dnl_arrow-point-to-right">
						<section class="role_section fix-select">
							<h2 class="role_section_name">Billing</h2>
							<div class="col-md-4 col-sm-6">
								<div class="form-group fix-select">
									<label>Rounding:</label>
									<select2 :options="rounding_options" v-model="template.rounding">
									</select2>
								</div>
							</div>
                            <div class="col-md-4 col-sm-6">
								<div class="form-group">
									<label for="rounding_decimal_places">Rounding Decimal Places:</label>
									<input type="text" name="rounding_decimal_places" v-model="template.rounding_decimal_places" class="form-control" placeholder="Enter Rounding Decimal Places">
								</div>
							</div>
                            <div class="col-md-4 col-sm-6">
								<div class="form-group fix-select">
									<label>Rate Profile:</label>
									<select2 :options="rate_profile_options" v-model="template.rate_profile">
									</select2>
								</div>
							</div>
							<div class="clearfix"></div>
						</section>
					</tab>
					<tab label="Replace Action" class="" icon="dnl_icon dnl_arrow-point-to-right">
						<section class="role_section">
							<h2 class="role_section_name">Replace Action</h2>
							<a class="btn btn-primary mini" @click="addReplaceAction">
                                <span class="dnl_icon dnl_add"></span> Add
                            </a>
                            <div class="table-responsive m-top-20">
					           <table class="table table-striped table-hover carrier_groups">
                                   <thead>
                                        <tr>
                                            <th rowspan="2">Type</th>
                                            <th rowspan="2">Change to ANI</th>
                                            <th colspan="3">Match Criteria</th>
                                            <th rowspan="2">Change to DNIS</th>
                                            <th colspan="3">Match Criteria</th>
                                            <th rowspan="2">Action</th>
                                        </tr>
                                        <tr>
                                            <th>ANI Prefix</th>
                                            <th>ANI Min Length</th>
                                            <th>ANI Max Length</th>
                                            <th>DNIS Prefix</th>
                                            <th>DNIS Min Length</th>
                                            <th>DNIS Max Length</th>
                                        </tr>
                                   </thead>
                                   <tbody>
									   <template v-for="(item, index) in replace_actions">
                                       <tr>
										   <td>
											   <select class="selectable width-105" v-model="item.replace_type"  @change="onchange_replace_action(index)">
													<option v-for="item in replace_type_options" v-bind:value="item.id">
														{{ item.text }}
													</option>
												</select>
										   </td>
										   	<td>
												<input type="text" v-model="item.change_to_ani" class="form-control" :disabled="!item.is_ani">
											</td>
											<td>
												<input type="text" v-model="item.ani_prefix" class="form-control" :disabled="!item.is_ani">
											</td>
											<td>
												<input type="text" v-model="item.ani_min_length" class="form-control" :disabled="!item.is_ani">
											</td>
											<td>
												<input type="text" v-model="item.ani_max_length" class="form-control" :disabled="!item.is_ani">
											</td>
											<td>
												<input type="text" v-model="item.change_to_dnis" class="form-control" :disabled="!item.is_dnis">
											</td>
											<td>
												<input type="text" v-model="item.dnis_prefix" class="form-control" :disabled="!item.is_dnis">
											</td>
											<td>
												<input type="text" v-model="item.dnis_min_length" class="form-control" :disabled="!item.is_dnis">
											</td>
											<td>
												<input type="text" v-model="item.dnis_max_length" class="form-control" :disabled="!item.is_dnis">
											</td>
											<td>
												<a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="delete_replace_action(index)">
													<span class="dnl_icon dnl_action_delete"></span>
												</a>
											</td>
                                       </tr>
									   </template>
                                   </tbody>
                               </table>
                            </div>
							<div class="clearfix"></div>
						</section>
					</tab>
				</tabs>
				<div class="clearfix"></div>
				<div class="button_set m-top-20">
					<a class="btn btn-primary mini" @click="validateForEgressTrunkTemplate">
						Save
					</a>
					<a class="btn btn-default mini">
						Reset
					</a>
				</div>
				<div class="clearfix"></div>
			</div>
		</div>
	  </div>
	</div>
</template>

<script>   
	const vTabs = require('vue!../main_components/tabs.vue'),
		  vTab = require('vue!../main_components/tab.vue'),
		  vSelect = require('vue!../main_components/select.vue'),
		  multiselect = require('multiselect');
	const api = require("../../api");		  
	import { mapActions } from 'vuex';
	const vSpinner = require('vue!../main_components/fadeloader.vue');
	module.exports = {
		components: {
			'tabs': vTabs,
			'tab': vTab,
			'select2': vSelect,
			'multiselect': multiselect,
			'spinner': vSpinner
		},
		props: ['editingtemplate', 'id'],
		data: function(){
            return {
				random_ani_group_options: [
					{id: 0, text: 'a'},
					{id: 1, text: 'Test'},
				],
				dipping_options: [
					{id: 0, text: 'Add Header'},
					{id: 1, text: 'Not Add Header'},
				],
				loading: false,
				template: {},
				bill_by: 0,
				bill_by_options: [
					{id: 0, text: 'False'},
					{id: 1, text: 'True'},
				],
				ignore_early_nosdp: true,
				ignore_early_media: true,
				ignore_options: [
					{id: true, text: 'True'},
					{id: false, text: 'False'},
				],
				replace_type: '0',
				replace_type_options: [
					{id: '0', text: 'ANI'},
					{id: '1', text: 'DNIS'},
					{id: '2', text: 'Both'},
				],
				replace_actions: [],
				rate_profile: 0,
				rate_profile_options: [
					{id: 0, text: 'False'},
					{id: 1, text: 'True'},
				],
				rounding_decimal_places: '',
				rounding: 0,
				rounding_options: [
					{id: 0, text: 'Up'},
					{id: 1, text: 'Down'},
				],
				rpid_privacy: 'None',
				rpid_privacy_options: [
					{id: 'None', text: 'None'},
					{id: 'Full', text: 'Full'},
					{id: 'Name', text: 'Name'},
					{id: 'Url', text: 'Url'},
					{id: 'OFF', text: 'OFF'},
					{id: 'Ipaddr', text: 'Ipaddr'},
					{id: 'Proxy', text: 'Proxy'},
				],
				rpid_id_type: 'None',
				rpid_id_type_options: [
					{id: 'None', text: 'None'},
					{id: 'Subscriber', text: 'Subscriber'},
					{id: 'User', text: 'User'},
					{id: 'Term', text: 'Term'},
					{id: 'Proxy', text: 'Proxy'},
				],
				rpid_party: 'None',
				rpid_party_options: [
					{id: 'None', text: 'None'},
					{id: 'Calling', text: 'Calling'},
					{id: 'Called', text: 'Called'},
					{id: 'Proxy', text: 'Proxy'},
				],
				rpid_screen: 'None',
				rpid_screen_options: [
					{id: 'None', text: 'None'},
					{id: 'No', text: 'No'},
					{id: 'Yes', text: 'Yes'},
					{id: 'Proxy', text: 'Proxy'},
				],
				is_paid: false,
				is_oli: false,
				is_pci:false,
				is_priv: false,
				is_div: false,
				is_display_name: false,
				fail_rules: [],
				route_type_options: [
					{id: '1', text: 'Fail to Next Host'},
					{id: '2', text: 'Fail to Next Trunk'},
					{id: '3', text: 'Stop'},
				],
				number_type_options: [
					{id: 'all', text: 'all'},
					{id: '>', text: '>'},
					{id: '=', text: '='},
					{id: '<', text: '<'},
				],
				actions: [],
				num_of_chars_options: [
					{id: '1', text: '1'},
					{id: '2', text: '2'},
					{id: '3', text: '3'},
					{id: '4', text: '4'},
					{id: '5', text: '5'},
					{id: '6', text: '6'},
					{id: '7', text: '7'},
					{id: '8', text: '8'},
					{id: '9', text: '9'},
					{id: '10', text: '10'},
					{id: '11', text: '11'},
					{id: '12', text: '12'},
					{id: '13', text: '13'},
					{id: '14', text: '14'},
					{id: '15', text: '15'},
					{id: '16', text: '16'},
					{id: '17', text: '17'},
					{id: '18', text: '18'},
					{id: '19', text: '19'},
					{id: '20', text: '20'},
				],
				action_options: [
					{id: '1', text: 'Add Prefix'},
					{id: '2', text: 'Delete Prefix'},
					{id: '3', text: 'Add suffix'},
					{id: '4', text: 'Delete suffix'},
				],
				code: '',
				target: 'ani',
				target_options: [
					{id: 'ani', text: 'ANI'},
					{id: 'dnis', text: 'DNIS'},
				],
				time_profile: '',
				time_profile_options:[],
				codec: [],
				codecs: [
					{ key: 1, value: 'AMR(8000)/dynamic', label: 'AMR(8000)/dynamic' },
					{ key: 2, value: 'CN(8000)', label: 'CN(8000)' },
					{ key: 3, value: 'DV14(11025)', label: 'DV14(11025)' },
					{ key: 4, value: 'DV14(22050)', label: 'DV14(22050)' },
					{ key: 5, value: 'G7221(16000 or 32000)/dynamic', label: 'G7221(16000 or 32000)/dynamic' },
					{ key: 6, value: 'G7221C(32000)/dynamic', label: 'G7221C(32000)/dynamic' },
					{ key: 7, value: 'G722(8000)', label: 'G722(8000)' },
					{ key: 8, value: 'G723(8000)', label: 'G723(8000)' },
					{ key: 9, value: 'G726-16(8000)/dynamic', label: 'G726-16(8000)/dynamic' },
					{ key: 10, value: 'G726-24(8000)/dynamic', label: 'G726-24(8000)/dynamic' },
					{ key: 11, value: 'G726-32(8000)/dynamic', label: 'G726-32(8000)/dynamic' },
					{ key: 12, value: 'G726-40(8000)/dynamic', label: 'G726-40(8000)/dynamic' },
					{ key: 13, value: 'G728(8000)', label: 'G728(8000)' },
					{ key: 14, value: 'G729(8000)', label: 'G729(8000)' },
					{ key: 15, value: 'G729a', label: 'G729a' },
					{ key: 16, value: 'G729b', label: 'G729b' },
					{ key: 17, value: 'GSM(8000)', label: 'GSM(8000)' },
					{ key: 18, value: 'iLBC/dynamic', label: 'iLBC/dynamic' },
					{ key: 19, value: 'PCMA(G711.u 8000)', label: 'PCMA(G711.u 8000)' },
					{ key: 20, value: 'PCMU(G711.a 8000)', label: 'PCMU(G711.a 8000)' },
					{ key: 21, value: 'Speex(8000, 16000 or 32000)/dynamic', label: 'Speex(8000, 16000 or 32000)/dynamic' },
					{ key: 22, value: 'telephone-event/dynamic', label: 'telephone-event/dynamic' },

				],
				rate_table_options: [],
				t38_options: [
					{id: true, text: 'Enable'},
					{id: false, text: 'Disable'},
				],
				routing_options: [
					{id: 'top-down', text: 'top-down'},
					{id: 'round-robin', text: 'round-robin'},
				],
				media_options: [
					{id: 'Bypass Media', text: 'Bypass Media'},
					{id: 'Proxy Media', text: 'Proxy Media'},
				],
				egress_trunk_template: {},
                template_name: '',
				media_type: 'Bypass Media',
                pdd_timeout: '',
                multi_host: 'top-down',
                min_duration: '',
                max_duration: '',
                t_38: true,
                rate_table: '',
                ring_timer: '',
                
                
                
                
                
                
                
                
                
                
                
				options: [
					  { id: 1, value: 'carrier1', text: 'Carrier 1' },
					  { id: 2, value: 'carrier2', text: 'Carrier 2' },
					  { id: 3, value: 'carrier3', text: 'Carrier 3' },
					  { id: 4, value: 'carrier4', text: 'Carrier 4' },
					  { id: 5, value: 'carrier5', text: 'Carrier 5' }
				]
			}
        },
		watch: {

		},
		methods: {
			...mapActions({
				setMessage: 'app_message/setAppMessage'
			}),
			organizeTemplateData(data) {
				// This function fixes naming differences between carrierLong and carrier
				this.template = {
					
					profit_margin: data.profit_margin,
					lnp_dipping_rate: data.lnp_dipping_rate,
					rpid_party: data.rpid_party,
					profit_type: data.profit_type,
					info: data.info,
					ignore_ring: data.ignore_ring,
					pdd_timeout: data.media_timeout,
					rate_table: data.rate_table_id,
					billing_method: data.billing_method,
					bill_by: data.bill_by,
					amount_per_port: data.amount_per_port,
					random_table_id: data.random_table_id,
					canada_other: data.canada_other,
					rpid_privacy: data.rpid_privacy,
					ignore_early_media: data.ignore_early_media,
					delay_bye_second: data.delay_bye_second,
					rpid_screen: data.rpid_screen,
					trunk_type: data.trunk_type,
					rfc2833: data.rfc2833,
					inband: data.inband,
					multi_host: data.res_strategy,
					codecs_str: data.codecs_str,
					re_invite_interval: data.re_invite_interval,
					intl_route: data.intl_route,
					re_invite: data.re_invite,
					lnp_dipping: data.lnp_dipping,
					us_other: data.us_other,
					is_display_name: data.display_name == 1? true: false,
					rate_profile: data.rate_profile,
					ring_timer: data.ring_timeout,
					media_type: data.media_type,
					is_priv: data.priv == 1? true: false,
					rounding: data.rate_rounding,
					wait_ringtime180: data.wait_ringtime180,
					rpid_id_type: data.rpid_id_type,
					is_div: data.div == 1? true: false,
					ignore_early_nosdp: data.ignore_early_nosdp,
					billing_rule: data.billing_rule,
					rounding_decimal_places: data.rate_decimal,
					template_name: data.name,
					is_oli: data.oli == 1? true: false,
					us_route: data.us_route,
					is_pci: data.pci == 1? true: false,
					is_paid: data.paid == 1? true: false,
					trunk_type2: data.trunk_type2,
					canada_route: data.canada_route,
					max_duration: data.max_duration,
				}
			},
			fetchTemplate() {
				this.loading = true;
				const url = api.getEndpointUrl() + '/v1/config/egress_trunk_template/' + this.id
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						this.organizeTemplateData(body.payload)
					}
					this.loading = false;
				})
				.catch(error => {
					console.log(error);
					this.loading = false;
				})
			},
			onchange_replace_action: function(index) {
				var replace_type = this.replace_actions[index].replace_type;
				if (replace_type == '0') {
					this.replace_actions[index].is_ani = true;
					this.replace_actions[index].is_dnis = false;
				}
				else if (replace_type == '1') {
					this.replace_actions[index].is_ani = false;
					this.replace_actions[index].is_dnis = true;
				}
				else if (replace_type == '2') {
					this.replace_actions[index].is_ani = true;
					this.replace_actions[index].is_dnis = true;
				}
			},
			delete_replace_action (id) {
				this.replace_actions.splice(id, 1);
			},
			addReplaceAction () {
				this.replace_actions.push({
					replace_type: '0',
					change_to_ani: '',
					ani_prefix: '',
					ani_min_length: '',
					ani_max_length: '',
					change_to_dnis: '',
					dnis_prefix: '',
					dnis_min_length: '',
					dnis_max_length: '',
					is_ani: true,
					is_dnis: false,
				})
			},
			addFailRule () {
				this.fail_rules.push({
					route_type: '1',
					code: '',
				})
			},
			delete_fail_rule (id) {
				this.fail_rules.splice(id, 1);
			},
			onchange_action: function(index) {
				var action = this.actions[index].action;
				if (action == 2 || action == 4)
					this.actions[index].is_delete_action = true;
				else
					this.actions[index].is_delete_action = false;
			},
			delete_action (id) {
				this.actions.splice(id, 1);
			},
			addAction () {
				this.actions.push({
					time_profile: '',
					target: 'ani',
					code: '',
					action: '1',
					chars_to_add: '',
					num_of_chars: '0',
					number_type: 'all',
					number_length: ''
				})
			},
			fetchTimeProfile() {
				const url = api.getEndpointUrl() + '/v1/config/time_profile/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const time_profiles = body.payload.items
						var self = this;
						time_profiles.forEach(function (temp, i) {
							var time_profile = {};
							time_profile.id = temp.time_profile_id;
							time_profile.text = temp.name;
							self.time_profile_options.push(time_profile);
							if (i == 0)
								self.time_profile = time_profile.id;
						});
						console.log(this.time_profile_options);
						
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			fetchRateTable() {
				const url = api.getEndpointUrl() + '/v1/switch/rate_table/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const rate_tables = body.payload.items
						var self = this;
						rate_tables.forEach(function (temp, i) {
							var rate_table = {};
							rate_table.id = temp.rate_table_id;
							rate_table.text = temp.name;
							self.rate_table_options.push(rate_table);
							if (i == 0)
								self.rate_table = rate_table.id;
						});
						console.log(this.rate_table_options);
						
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
			getEgressTrunkTemplateForRequest() {
				const egress_trunk_template = Object.assign({}, this.egress_trunk_template);

				egress_trunk_template.profit_margin = 0;									// not exist in UI
				egress_trunk_template.lnp_dipping_rate = this.template.lnp_dipping_rate;									// not exist in UI
				egress_trunk_template.rpid_party = this.template.rpid_party;
				egress_trunk_template.profit_type = "percentage";							// not exist in UI
				egress_trunk_template.info = 0;												// not exist in UI
				egress_trunk_template.ignore_ring = true;									// not exist in UI
				egress_trunk_template.media_timeout = this.template.pdd_timeout;						// not sure
				egress_trunk_template.rate_table_id = this.template.rate_table;
				egress_trunk_template.billing_method = 0;									// not exist in UI
				egress_trunk_template.bill_by = this.template.bill_by;
				egress_trunk_template.amount_per_port = 0;									// not exist in UI
				egress_trunk_template.random_table_id = this.template.random_table_id;									// not exist in UI
				egress_trunk_template.canada_other = 0;										// not exist in UI
				egress_trunk_template.rpid_privacy = this.template.rpid_privacy;
				egress_trunk_template.ignore_early_media = this.template.ignore_early_media;
				egress_trunk_template.delay_bye_second = 0;									// not exist in UI
				egress_trunk_template.rpid_screen = this.template.rpid_screen;
				egress_trunk_template.trunk_type = "Ingress";								// not exist in UI
				egress_trunk_template.rfc2833 = 0;											// not exist in UI
				egress_trunk_template.inband = 0;											// not exist in UI
				egress_trunk_template.res_strategy = this.template.multi_host;
				egress_trunk_template.codecs_str = "string";								// not exist in UI
				egress_trunk_template.re_invite_interval = 0;								// not exist in UI
				egress_trunk_template.intl_route = 0;										// not exist in UI
				egress_trunk_template.re_invite = 0;										// not exist in UI
				egress_trunk_template.lnp_dipping = true;									// not exist in UI
				egress_trunk_template.us_other = 0;											// not exist in UI
				egress_trunk_template.display_name = this.template.is_display_name == true? 1: 0;
				egress_trunk_template.rate_profile = this.template.rate_profile;
				egress_trunk_template.ring_timeout = this.template.ring_timer;
				egress_trunk_template.media_type = this.template.media_type;
				egress_trunk_template.priv = this.template.is_priv == true? 1: 0;
				egress_trunk_template.rate_rounding = this.template.rounding;
				egress_trunk_template.wait_ringtime180 = 0;									// not exist in UI
				egress_trunk_template.rpid_id_type = this.template.rpid_id_type;
				egress_trunk_template.div = this.template.is_div == true? 1: 0;
				egress_trunk_template.ignore_early_nosdp = this.template.ignore_early_nosdp;
				egress_trunk_template.billing_rule = 0;										// not exist in UI
				egress_trunk_template.rate_decimal = this.template.rounding_decimal_places;
				egress_trunk_template.name = this.template.template_name;
				egress_trunk_template.oli = this.template.is_oli == true? 1: 0;
				egress_trunk_template.us_route = 0;											// not exist in UI
				egress_trunk_template.pci = this.template.is_pci == true? 1: 0;
				egress_trunk_template.paid = this.template.is_paid == true? 1: 0;
				egress_trunk_template.trunk_type2 = 0;										// not exist in UI
				egress_trunk_template.canada_route = 0;										// not exist in UI
				egress_trunk_template.max_duration = this.template.max_duration;

				return egress_trunk_template;
			},
			createEgressTrunkTemplate() {
				const reqBody = this.getEgressTrunkTemplateForRequest();
				const url = api.getEndpointUrl() + '/v1/config/egress_trunk_template/create';
				this.$http.post(url, reqBody)
					.then(response => {
						if (response.body.success) {
							this.setMessage('Egress trunk template was created successfully');
							var thisvm = this;
							setTimeout(function(){
								thisvm.$router.push('/template/egress_trunk_template');
							}, 3000);
						}
					})
					.catch(error => {
						console.log(error)
						this.setMessage({
							message: 'Failed to create carrier',
							type: 'error'
						})
					})
			},
            validateForEgressTrunkTemplate() {
				var vm = this;
				this.$validator.validateAll().then(() => {
					const err = this.$validator.getErrors();
					if (err.errors.length > 0) {
						vm.setMessage({
							message: 'Validation failed',
							type: 'error'
						})
					}
					else {
						vm.createEgressTrunkTemplate();
					}
						
				}).catch((error) => {
					// eslint-disable-next-line
					console.log(error)
					vm.setMessage({
						message: 'Validation failed',
						type: 'error'
					})
				});
			}
		},
		mounted: function() {
			$('#user_detail_fields').multiSelect({
				 selectableHeader: "<div class='custom-header'>Unappropriated</div>",
  				 selectionHeader: "<div class='custom-header'>Unappropriated</div>"
			});
		},
		created () {
			if (this.editingtemplate) {
				this.fetchTemplate();
			}
			this.fetchRateTable();
			this.fetchTimeProfile();
		}
	}
</script>

<style>
.selectable.width-105 {
	min-width: 105px !important;
}
.selectable.width-90 {
	min-width: 90px !important;
}
.selectable.width-65 {
	min-width: 65px !important;
}
.selectable.width-30 {
	min-width: 30px !important;
}
.form-control.width-80 {
	min-width: 80px !important;
}
</style>
