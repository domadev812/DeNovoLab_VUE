<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Monitoring</a></li>
                  <li class="breadcrumb-item">
					  <router-link to="/monitoring/fraud_detection/exec_log">Fraud Detection</router-link>
				  </li>
				  <li class="breadcrumb-item active">Execution Log</li>
			</ol>
			<h1 class="page-header">Execution Log</h1>
            <router-link to="/monitoring/fraud_detection/exec_log" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad table_wrap">
				<div class="table_filters">
					<div class="inline-block select_min_wrapper">
						<span class="inline-block">Page row:</span>
						<select2 :options="options1" v-model="selected1" class="inline-block">
						</select2>
					</div>
					<div class="inline-block">
						<el-select v-model="excution_log_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
							<el-option v-for="item in excution_log_table_column_options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="table-responsive">
					<table class="table table-striped table-hover carrier_groups">
					  <thead>
                        <tr>
                            <th rowspan="3" colspan="1" v-if="showcolumns[0]">Rule Name</th>
                            <th rowspan="3" colspan="1" v-if="showcolumns[1]">Ingress</th>
                            <th rowspan="3" colspan="1" v-if="showcolumns[2]">Type</th>
                            <th rowspan="3" colspan="1" v-if="showcolumns[3]">Limit Value</th>
                            <th rowspan="3" colspan="1" v-if="showcolumns[4]">Actual Value</th>
                            <th rowspan="3" colspan="1" v-if="showcolumns[5]">is Block</th>
                            <th rowspan="3" colspan="1" v-if="showcolumns[6]">is Send Email</th>
                            <th rowspan="1" colspan="6" v-if="showcolumns[7]">Email Info</th>
                        </tr>
                        <tr v-if="showcolumns[7]">
                            <th rowspan="1" colspan="3">Partner</th>
                            <th rowspan="1" colspan="3">Admin</th>
                        </tr v-if="showcolumns[7]">
                        <tr v-if="showcolumns[7]" role="row">
                            <th rowspan="1" colspan="1">Email</th>
                            <th rowspan="1" colspan="1">Status</th>
                            <th rowspan="1" colspan="1">Msg</th>
                            <th rowspan="1" colspan="1">Email</th>
                            <th rowspan="1" colspan="1">Status</th>
                            <th rowspan="1" colspan="1">Msg</th>
                        </tr>
                    </thead>
					  <tbody>
						<tr v-for="detail in details">
						  <td v-if="showcolumns[0]">{{detail.rule_name}}</td>
						  <td v-if="showcolumns[1]">{{detail.ingress}}</td>
                          <td v-if="showcolumns[2]">{{detail.type}}</td>
						  <td v-if="showcolumns[3]">{{detail.limit_value}}</td>
                          <td v-if="showcolumns[4]">{{detail.action_value}}</td>
						  <td v-if="showcolumns[5]">{{detail.is_block}}</td>
                          <td v-if="showcolumns[6]">{{detail.is_send_email}}</td>
						  <td v-if="showcolumns[7]">{{detail.partner_email}}</td>
                          <td v-if="showcolumns[7]">{{detail.partner_status}}</td>
						  <td v-if="showcolumns[7]">{{detail.partner_msg}}</td>
                          <td v-if="showcolumns[7]">{{detail.admin_email}}</td>
						  <td v-if="showcolumns[7]">{{detail.admin_status}}</td>
                          <td v-if="showcolumns[7]">{{detail.admin_msg}}</td>
						</tr>
					  </tbody>
					</table>
				</div>
				<div class="pull-right pagination">
					<pagination :current-page="pageOne.currentPage"
								:total-pages="pageOne.totalPages"
								@page-changed="pageOneChanged">
					</pagination>
				</div>
				<div class="clearfix"></div>
			</div>
		</div>
	  </div>
	</div>
</template>

<script>   
	const vSelect = require('vue!../main_components/select.vue'),
		  Pagination = require('vue!../main_components/pagination.vue');
	module.exports = {
		components: {
			'select2': vSelect,
			'pagination': Pagination
		},
		data: function(){
            return {
				showcolumns: [true, true, true, true, true, true, true, true],
				temp_excution_log_table_columns: ['Rule Name', 'Ingress', 'Type', 'Limit Value', 'Actual Value', 'is Block', 'is Send Email', 'Email Info'],
				excution_log_table_columns: ['Rule Name', 'Ingress', 'Type', 'Limit Value', 'Actual Value', 'is Block', 'is Send Email', 'Email Info'],
				excution_log_table_column_options: [{
					value: 'Rule Name',
					label: 'Rule Name'
				}, {
					value: 'Ingress',
					label: 'Ingress'
				}, {
					value: 'Type',
					label: 'Type'
				}, {
					value: 'Limit Value',
					label: 'Limit Value'
				}, {
					value: 'Actual Value',
					label: 'Actual Value'
				}, {
					value: 'is Block',
					label: 'is Block'
				}, {
					value: 'is Send Email',
					label: 'is Send Email'
				}, {
					value: 'Email Info',
					label: 'Email Info'
				}],
			  pageOne: {
                currentPage: 1,
                totalPages: 10
              },
			  selected1: 1,
			  options1: [
				  { id: 1, text: '10' },
				  { id: 2, text: '20' },
				  { id: 3, text: '30' },
				  { id: 4, text: '50' },
				  { id: 5, text: '100' }
			  ],
			  selected2: 0,
			  options2: [
				  { id: 1, text: 'Group Name' },
				  { id: 2, text: 'Carrier Count' },
				  { id: 3, text: 'Actions' }
			  ],
			  details: [
				{
				  rule_name: "Test Fraud",
				  ingress: "-",
                  type: "24 Hours Revenue",
				  limit_value: "40",
                  action_value: "67.5",
				  is_block: "Yes",
                  is_send_email: "Yes",
				  partner_email: "atul.shivam@gmail.com",
                  partner_status: "Success",
				  partner_msg: "OK",
                  admin_email: "asd@krasytod.org",
				  admin_status: "Success",
                  admin_msg: "OK",
				},
                {
				  rule_name: "Test Fraud",
				  ingress: "-",
                  type: "24 Hours Revenue",
				  limit_value: "40",
                  action_value: "67.5",
				  is_block: "Yes",
                  is_send_email: "Yes",
				  partner_email: "atul.shivam@gmail.com",
                  partner_status: "Success",
				  partner_msg: "OK",
                  admin_email: "asd@krasytod.org",
				  admin_status: "Success",
                  admin_msg: "OK",
				},
                {
				  rule_name: "Test Fraud",
				  ingress: "-",
                  type: "24 Hours Revenue",
				  limit_value: "40",
                  action_value: "67.5",
				  is_block: "Yes",
                  is_send_email: "Yes",
				  partner_email: "atul.shivam@gmail.com",
                  partner_status: "Success",
				  partner_msg: "OK",
                  admin_email: "asd@krasytod.org",
				  admin_status: "Success",
                  admin_msg: "OK",
				}
			  ]
            }
        },
		methods: {
			handleChange() {
				for(let i = 0; i < this.temp_excution_log_table_columns.length; i++) {
					if (_.indexOf(this.excution_log_table_columns, this.temp_excution_log_table_columns[i]) != -1) {
						Vue.set(this.showcolumns, i, true);
					}
					else {
						Vue.set(this.showcolumns, i, false);
					}
				}
			},
			pageOneChanged (pageNum) {
				this.pageOne.currentPage = pageNum
			}
		},
		mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
		},
		updated: function () {
			document.querySelector('.el-input > input').placeholder = 'Show/Hide Columns';
		}
	}
</script>

<style>
</style>
