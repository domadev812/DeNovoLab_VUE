<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Monitoring</a></li>
                  <li class="breadcrumb-item">
					  <router-link to="/monitoring/rule">Rule</router-link>
				  </li>
				  <li class="breadcrumb-item active">Alert Rules Log Detail</li>
			</ol>
			<h1 class="page-header">Alert Rules Log Detail</h1>
            <router-link to="/monitoring/rule/log" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad table_wrap">
				<div class="table_filters">
					<div class="inline-block select_min_wrapper">
						<span class="inline-block">Page row:</span>
						<select2 :options="options1" v-model="selected1" class="inline-block">
						</select2>
					</div>
					<div class="inline-block">
            <el-select v-model="rule_log_detail_table_columns" multiple placeholder="Show/Hide Columns" @change="handleChange">
							<el-option v-for="item in rule_log_detail_table_column_options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="table-responsive">
					<table class="table table-striped table-hover carrier_groups">
					  <thead>
                        <tr>
                            <th v-if="showcolumns[0]" rowspan="3" colspan="1">Rule Name</th>
                            <th v-if="showcolumns[1]" rowspan="3" colspan="1">Trunk</th>
                            <th v-if="showcolumns[2]" rowspan="3" colspan="1">Code</th>
                            <th v-if="showcolumns[3]" rowspan="1" colspan="12">Condition Values</th>
                            <th v-if="showcolumns[4]" rowspan="3" colspan="1">Is Block</th>
                            <th v-if="showcolumns[5]" rowspan="3" colspan="1">Is Send Email</th>
                            <th v-if="showcolumns[6]" rowspan="3" colspan="1">Send Email To</th>
                            <th v-if="showcolumns[7]" rowspan="1" colspan="4">Email Info</th>
                        </tr>
                        <tr v-if="showcolumns[3] || showcolumns[7]">
                            <th v-if="showcolumns[3]" colspan="2" rowspan="1">ASR</th>
                            <th v-if="showcolumns[3]" colspan="2" rowspan="1">ABR</th>
                            <th v-if="showcolumns[3]" colspan="2" rowspan="1">ACD</th>
                            <th v-if="showcolumns[3]" colspan="2" rowspan="1">PDD</th>
                            <th v-if="showcolumns[3]" colspan="2" rowspan="1">Revenue</th>
                            <th v-if="showcolumns[3]" colspan="2" rowspan="1">Profitability</th>
                            <th v-if="showcolumns[7]" colspan="2" rowspan="1">Partner</th>
                            <th v-if="showcolumns[7]" colspan="2" rowspan="1">Admin</th>
                        </tr>
                        <tr v-if="showcolumns[3] || showcolumns[7]">
                            <th v-if="showcolumns[3]" rowspan="1" colspan="1">Limit Value</th>
                            <th v-if="showcolumns[3]" rowspan="1" colspan="1">Actual Value</th>
                            <th v-if="showcolumns[3]" rowspan="1" colspan="1">Limit Value</th>
                            <th v-if="showcolumns[3]" rowspan="1" colspan="1">Actual Value</th>
                            <th v-if="showcolumns[3]" rowspan="1" colspan="1">Limit Value</th>
                            <th v-if="showcolumns[3]" rowspan="1" colspan="1">Actual Value</th>
                            <th v-if="showcolumns[3]" rowspan="1" colspan="1">Limit Value</th>
                            <th v-if="showcolumns[3]" rowspan="1" colspan="1">Actual Value</th>
                            <th v-if="showcolumns[3]" rowspan="1" colspan="1">Limit Value</th>
                            <th v-if="showcolumns[3]" rowspan="1" colspan="1">Actual Value</th>
                            <th v-if="showcolumns[3]" rowspan="1" colspan="1">Limit Value</th>
                            <th v-if="showcolumns[3]" rowspan="1" colspan="1">Actual Value</th>
                            <th v-if="showcolumns[7]" rowspan="1" colspan="1">Email</th>
                            <th v-if="showcolumns[7]" rowspan="1" colspan="1">Status</th>
                            <th v-if="showcolumns[7]" rowspan="1" colspan="1">Email</th>
                            <th v-if="showcolumns[7]" rowspan="1" colspan="1">Status</th>
                        </tr>
                      </thead>
					  <tbody>
						<tr v-for="detail in details">
						  <td v-if="showcolumns[0]">{{detail.rule_name}}</td>
						  <td v-if="showcolumns[1]">{{detail.trunk}}</td>
              <td v-if="showcolumns[2]">{{detail.code}}</td>
						  <td v-if="showcolumns[3]">{{detail.asr_limit_value}}</td>
              <td v-if="showcolumns[3]">{{detail.asr_actual_value}}</td>
              <td v-if="showcolumns[3]">{{detail.abr_limit_value}}</td>
              <td v-if="showcolumns[3]">{{detail.abr_actual_value}}</td>
              <td v-if="showcolumns[3]">{{detail.acd_limit_value}}</td>
              <td v-if="showcolumns[3]">{{detail.acd_actual_value}}</td>
              <td v-if="showcolumns[3]">{{detail.pdd_limit_value}}</td>
              <td v-if="showcolumns[3]">{{detail.pdd_actual_value}}</td>
              <td v-if="showcolumns[3]">{{detail.revenue_limit_value}}</td>
              <td v-if="showcolumns[3]">{{detail.revenue_actual_value}}</td>
              <td v-if="showcolumns[3]">{{detail.profitability_limit_value}}</td>
              <td v-if="showcolumns[3]">{{detail.profitability_actual_value}}</td>
              <td v-if="showcolumns[4]">{{detail.is_block}}</td>
              <td v-if="showcolumns[5]">{{detail.is_send_email}}</td>
              <td v-if="showcolumns[6]">{{detail.send_email_to}}</td>
              <td v-if="showcolumns[7]">{{detail.partner_email}}</td>
              <td v-if="showcolumns[7]">{{detail.partner_status}}</td>
              <td v-if="showcolumns[7]">{{detail.admin_email}}</td>
              <td v-if="showcolumns[7]">{{detail.admin_status}}</td>
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
        temp_rule_log_detail_table_columns: ['Rule Name', 'Trunk', 'Code', 'Condition Values', 'Is Block', 'Is Send Email', 'Send Email To', 'Email Info'],
        rule_log_detail_table_columns: ['Rule Name', 'Trunk', 'Code', 'Condition Values', 'Is Block', 'Is Send Email', 'Send Email To', 'Email Info'],
        rule_log_detail_table_column_options: [{
					value: 'Rule Name',
					label: 'Rule Name'
				}, {
					value: 'Trunk',
					label: 'Trunk'
				}, {
					value: 'Code',
					label: 'Code'
				}, {
					value: 'Condition Values',
					label: 'Condition Values'
				}, {
					value: 'Is Block',
					label: 'Is Block'
				}, {
					value: 'Is Send Email',
          label: 'Is Send Email'
        }, {
					value: 'Send Email To',
          label: 'Send Email To'
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
				  trunk: "-",
                  code: "None",
				  asr_limit_value: "Ignore",
                  asr_actual_value: '0%',
                  abr_limit_value: "Ignore",
				  abr_actual_value: "0%",
                  acd_limit_value: "Ignore",
				  acd_actual_value: "0%",
                  pdd_limit_value: "Ignore",
				  pdd_actual_value: "0%",
                  revenue_limit_value: "Ignore",
				  revenue_actual_value: "0%",
                  profitability_limit_value: "Ignore",
                  profitability_actual_value: '0%',
                  is_block: 'Yes',
                  is_send_email: 'Yes',
                  send_email_to: 'Admin',
                  partner_email: 'a245014@gmail.com',
                  partner_status: 'Success',
                  admin_email: 'a245014@gmail.com',
                  admin_status: 'Success'
				},
                {
				  rule_name: "Test Fraud",
				  trunk: "-",
                  code: "None",
				  asr_limit_value: "Ignore",
                  asr_actual_value: '0%',
                  abr_limit_value: "Ignore",
				  abr_actual_value: "0%",
                  acd_limit_value: "Ignore",
				  acd_actual_value: "0%",
                  pdd_limit_value: "Ignore",
				  pdd_actual_value: "0%",
                  revenue_limit_value: "Ignore",
				  revenue_actual_value: "0%",
                  profitability_limit_value: "Ignore",
                  profitability_actual_value: '0%',
                  is_block: 'Yes',
                  is_send_email: 'Yes',
                  send_email_to: 'Admin',
                  partner_email: 'a245014@gmail.com',
                  partner_status: 'Success',
                  admin_email: 'a245014@gmail.com',
                  admin_status: 'Success'
				}
			  ]
            }
        },
		methods: {
      handleChange() {
				for(let i = 0; i < this.temp_rule_log_detail_table_columns.length; i++) {
					if (_.indexOf(this.rule_log_detail_table_columns, this.temp_rule_log_detail_table_columns[i]) != -1) {
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
		},
	}
</script>

<style>

</style>
