<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Finance</a></li>
				  <li class="breadcrumb-item">
					  <router-link to="/finance/auto_invoice_management">Auto Invoice Managment</router-link>
				  </li>
				  <li class="breadcrumb-item active">Edit Invoice</li>
			</ol>
			<h1 class="page-header">Edit Invoice</h1>
			<router-link to="/finance/auto_invoice_management" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad send_rate">
			<div class="row">
				  <div class="col-md-3 col-sm-4">
					<div class="form-group">
						<label>Payment Terms:</label>
						<select class="selectable" v-model="invoice.payment_term_id">
							<option v-for="item in payment_terms_options" v-bind:value="item.id">
								{{ item.text }}
							</option>
						</select>
					</div>
				  </div>
				  <div class="col-md-3 col-sm-4">
					<div class="form-group">
						<label>Invoice Type:</label>
						<select2 :options="invoice_type_options" v-model="invoice_type">
						</select2>
					</div>
				  </div>
				  <div class="col-md-3 col-sm-4">
					<div class="form-group">
						<label>Invoice Format:</label>
						<select2 :options="invoice_options" v-model="invoice.invoice_format">
						</select2>
					</div>
				  </div>
				  <div class="col-md-3 col-sm-4">
					<div class="form-group">
						<label>Time Zone:</label>
						<select2 :options="time_zone_options" v-model="time_zone">
						</select2>
					</div>
				  </div>
				  <div class="clearfix"></div>
				  <div class="col-md-3 col-sm-4">
					<div class="form-group">
						<label>CDR Compression Format:</label>
						<select2 :options="cdr_compression_format_options" v-model="invoice.cdr_compression_format">
						</select2>
					</div>
				  </div>
				  <div class="col-md-3 col-sm-4">
					<div class="form-group">
						<label>Rate Decimal Place:</label>
						<select2 :options="decimal_options" v-model="invoice.rate_decimal_place">
						</select2>
					</div>
				  </div>
				  <div class="clearfix little-space"></div>
				  <div class="col-md-3 col-sm-4">
					<div class="form-group">
						<div class="checkbox checkbox-success">
							<input id="auto_invoice" name="auto_invoice" type="checkbox"> 
							<label for="auto_invoice">Auto Invoice</label>
						</div>
					</div>
					<div class="form-group">
						<div class="checkbox checkbox-success">
							<input id="include_tax_invoice" name="include_tax_invoice" type="checkbox"> 
							<label for="include_tax_invoice">Include Tax in Invoice</label>
						</div>
					</div>
					<div class="form-group">
						<div class="checkbox checkbox-success">
							<input id="attach_cdr_list" name="attach_cdr_list" type="checkbox"> 
							<label for="attach_cdr_list">Attach CDR List</label>
						</div>
					</div>
					<div class="form-group">
						<div class="checkbox checkbox-success">
							<input id="show_detail" name="show_detail" type="checkbox"> 
							<label for="show_detail">Show Detail</label>
						</div>
					</div>
					<div class="form-group">
						<div class="checkbox checkbox-success">
							<input id="add_jurisdictional_detail" name="add_jurisdictional_detail" type="checkbox"> 
							<label for="add_jurisdictional_detail">Add Jurisdictional Detail</label>
						</div>
					</div>
					<div class="form-group">
						<div class="checkbox checkbox-success">
							<input id="include_breakout_summary" name="include_breakout_summary" type="checkbox"> 
							<label for="include_breakout_summary">Include Breakout Summary</label>
						</div>
					</div>
					<div class="form-group">
						<label>Balance:</label>
						<select2 :options="options" v-model="balance">
						</select2>
					</div>
				  </div>
				  <div class="col-md-3 col-sm-4">
					<div class="form-group">
						<div class="checkbox checkbox-success">
							<input id="no_invoice_for_zero_traffic" name="no_invoice_for_zero_traffic" type="checkbox"> 
							<label for="no_invoice_for_zero_traffic">No Invoice for Zero Traffic</label>
						</div>
					</div>
					<div class="form-group">
						<div class="checkbox checkbox-success">
							<input id="email_invoice" name="email_invoice" type="checkbox"> 
							<label for="email_invoice">E-mail Invoice</label>
						</div>
					</div>
					<div class="form-group">
						<div class="checkbox checkbox-success">
							<input id="include_available_credit" name="include_available_credit" type="checkbox"> 
							<label for="include_available_credit">Include Available Credit</label>
						</div>
					</div>
					<div class="form-group">
						<div class="checkbox checkbox-success">
							<input id="show_daily_usage" name="show_daily_usage" type="checkbox"> 
							<label for="show_daily_usage">Show Daily Usage</label>
						</div>
					</div>
					<div class="form-group">
						<div class="checkbox checkbox-success">
							<input id="include_payment_summary" name="include_payment_summary" type="checkbox"> 
							<label for="include_payment_summary">Include Summary of Payments</label>
						</div>
					</div>
					<div class="form-group">
						<div class="checkbox checkbox-success">
							<input id="short_duration" name="short_duration" type="checkbox"> 
							<label for="short_duration">Short Duration Call Surcharge details</label>
						</div>
					</div>
			  	</div>
				<div class="clearfix"></div>
			    <div class="col-md-6 col-sm-8">
				    <label for="groupname">Usage Detail Fields:</label>
				    <select multiple="multiple" id="usage_detail_fields" name="carrier">
				     	<option v-for="option in options" :value='option.value'>{{option.text}}</option>
				    </select>
					<div class="clearfix"></div>
					<div class="button_set little-space">
						<a class="btn btn-primary">
							Submit
						</a>
						<a class="btn btn-default">
							Reset
						</a>
					</div>
			    </div>
				<div class="clearfix"></div>
			</div>
		</div>
	  </div>
	</div>
	</div>
</template>

<script>   
	const multiselect = require('multiselect'),
		  vSelect = require('vue!../main_components/select.vue');
	const api = require("../../api");
	module.exports = {
		components: {
			'multiselect': multiselect,
			'select2': vSelect,
		},
		data: function(){
            return {
				time_zone_options: [
					{ id: '-12:0', text: 'GMT -12:00' },
					{ id: '-11:0', text: 'GMT -11:00' },
					{ id: '-10:0', text: 'GMT -10:00' },
					{ id: '-9:0', text: 'GMT -9:00' },
					{ id: '-8:0', text: 'GMT -8:00' },
					{ id: '-7:0', text: 'GMT -7:00' },
					{ id: '-6:0', text: 'GMT -6:00' },
					{ id: '-5:0', text: 'GMT -5:00' },
					{ id: '-4:0', text: 'GMT -4:00' },
					{ id: '-3:0', text: 'GMT -3:00' },
					{ id: '-2:0', text: 'GMT -2:00' },
					{ id: '-1:0', text: 'GMT -1:00' },
					{ id: '0:0', text: 'GMT +0:00' },
					{ id: '1:0', text: 'GMT +1:00' },
					{ id: '2:0', text: 'GMT +2:00' },
					{ id: '3:0', text: 'GMT +3:00' },
					{ id: '4:0', text: 'GMT +4:00' },
					{ id: '5:0', text: 'GMT +5:00' },
					{ id: '6:0', text: 'GMT +6:00' },
					{ id: '7:0', text: 'GMT +7:00' },
					{ id: '8:0', text: 'GMT +8:00' },
					{ id: '9:0', text: 'GMT +9:00' },
					{ id: '10:0', text: 'GMT +10:00' },
					{ id: '11:0', text: 'GMT +11:00' },
					{ id: '12:0', text: 'GMT +12:00' },
				],
				invoice_type_options: [
					{id: 'auto invoice', text: 'auto invoice'},
					{id: 'manual invoice', text: 'manual invoice'},
				],
				cdr_compression_format_options: [
					{id: 'Excel', text: 'Excel'},
					{id: 'CSV', text: 'CSV'},
					{id: 'zip', text: 'zip'},
					{id: 'tar.gz', text: 'tar.gz'},
				],
				decimal_options: [
					{ id: '0', value: '0', text: '0' },
					{ id: '1', value: '1', text: '1' },
					{ id: '2', value: '2', text: '2' },
					{ id: '3', value: '3', text: '3' },
					{ id: '4', value: '4', text: '4' },
					{ id: '5', value: '5', text: '5' },
					{ id: '6', value: '6', text: '6' },
					{ id: '7', value: '7', text: '7' },
					{ id: '8', value: '8', text: '8' },
					{ id: '9', value: '9', text: '9' },	
					{ id: '10', value: '10', text: '10' },	
				],
				invoice_options: [
					{id:'pdf', text: 'PDF'},
					{id:'word', text: 'Word'},
				],
				invoice: {},
				payment_terms_options: [],
			  copy:'',
			  invoice_type: '',
			  email: '',
			  subject: '',
			  payment_terms:'',
			  groupname: '',
			  effective_date: '',
			  invoice_format: '',
			  time_zone: '',
			  cdr_compression_format: '',
			  rate_decimal_place: '',
			  rate_value: '',
			  balance: '',
			  groupname: '',
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
			$('#usage_detail_fields').multiSelect({
				 selectableHeader: "<div class='custom-header'>Fields</div>",
  				 selectionHeader: "<div class='custom-header'>Selected</div>"
			});
		},
		created () {
			this.fetchPaymentTerms();
		},
		methods: {
			fetchPaymentTerms() {
				const url = api.getEndpointUrl() + '/v1/config/payment_term/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const payment_terms = body.payload.items
						var self = this;
						payment_terms.forEach(function (temp, i) {
							var payment_term = {};
							payment_term.id = temp.name;
							payment_term.text = temp.name;
							self.payment_terms_options.push(payment_term);
							if (i == 0)
								self.invoice.payment_term_id = payment_term.id;
						});
						console.log(this.payment_terms_options);
						
					}
				})
				.catch(error => {
					console.log(error)
				})
			}
		}
	}
</script>

<style>
</style>
