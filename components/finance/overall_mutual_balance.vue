<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single big_data">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Finance</a></li>
                  <li class="breadcrumb-item">
                      <router-link to="/finance/past_due_summary/">Past Due Summary</router-link>
                  </li>
				  <li class="breadcrumb-item active">Overall Mutual Balance</li>
			</ol>
			<h1 class="page-header">Overall Mutual Balance</h1>
                <router-link to="/finance/past_due_summary/" class="btn btn_white back">
                    <span class="dnl_icon dnl_import"></span> Back 
                </router-link>
                <div class="btn-group pull-right" role="group">
                      <router-link to="/finance/invoices/" class="btn btn-default create_new_iconed"><span class="dnl_icon dnl_add"></span>Mass Add
                      </router-link>
                      <button type="button" class="btn btn-default">
                          <span class="dnl_icon dnl_reload"></span> Regenerate
                      </button>
                      <button type="button" class="btn btn-default">
                          <span class="dnl_icon dnl_tick"></span> Non Zero Only
                      </button>
                      <button type="button" class="btn btn-default">
                          <span class="dnl_icon dnl_export"></span> Export
                      </button>
                </div>
				<div class="white_pad table_wrap">
					<div class="advanced_search_filter_panel">
						<div class="col-md-4 col-sm-8">
							<div class="inlined">
								<label for="start_date">Period:</label>
								<input type="text" name="start_date" v-model="start_date" class="form-control" placeholder="Enter Date">
							</div>
							<div class="inlined">
								<label for="end-date" class="m-top-15"></label>
								<input type="text" name="end_date" v-model="end_date" class="form-control" placeholder="Enter Date">
							</div>
						</div>
						<div class="col-md-3 col-sm-4">
							<div class="button_set m-top-25">
								<a class="btn btn-primary">
									Submit
								</a>
							</div>
						</div>
						<div class="clearfix"></div>
					</div>
                    <div class="row">
                        <div class="col-sm-6">
                            <section class="role_section default">
                                <h2 class="center-block text-center">7352.0</h2>
                                <b class="center-block text-center">Beginning Balance on 2017-02-01 00:00:00</b> 
                            </section>
                        </div>
                        <div class="col-sm-6">
                            <section class="role_section default">
                                <h2 class="center-block text-center">7352.0</h2>
                                 <b class="center-block text-center">Ending Balance on 2017-02-12 10:46:06</b>
                            </section>
                        </div>
                    </div>
					<div class="clearfix little-space"></div>
					<div class="table-responsive">
						<table class="table table-striped table-hover carrier_groups centrum">
						  <thead>
                            <tr>
                                <th rowspan="2">Date</th>
                                <th colspan="4">Ingress</th>
                                <th colspan="4">Egress</th>
                                <th rowspan="2">Balance</th>
                                <th rowspan="2">Action</th>
                            </tr>
                            <tr>
                                <th>Invoice Sent</th>
                                <th>Payment Received</th>
                                <th>Credit Note Sent</th>
                                <th>Debit Note Sent</th>
                                <th>Invoice Received</th>
                                <th>Payment Sent</th>
                                <th>Credit Note Received</th>
                                <th>Debit Note Received</th>
                            </tr>
                          </thead>
						  <tbody>
							<tr v-for="transaction in transactions">
							  <td>{{transaction.date}}</td>
							  <td>{{transaction.invoice_sent}}</td>
							  <td>{{transaction.payment_received}}</td>
							  <td>{{transaction.credit_note_sent}}</td>
							  <td>{{transaction.debit_note_sent}}</td>
                              <td>{{transaction.invoice_received}}</td>
							  <td>{{transaction.payment_sent}}</td>
							  <td>{{transaction.credit_note_received}}</td>
							  <td>{{transaction.debit_note_received}}</td>
                              <td>{{transaction.balance}}</td>
                              <td>
                                  <a data-toggle="tooltip" data-placement="top" title="Synchronize With Actual Balance" class="action action_reload"><span class="dnl_icon dnl_reload"></span></a>
                              </td>
							</tr>
						  </tbody>
						</table>
					</div>
				</div>
		    </div>
		</div>
	  </div>
	</div>
</template>

<script>   
	const vSelect = require('vue!../main_components/select.vue');
	module.exports = {
		components: {
			'select2': vSelect,
		},
		data: function(){
            return {
				carrier: '',
				start_date: '',
				end_date: '',
				gmt: '',
				type: '',
				options: [
				  { id: 1, value: 'carrier1', text: 'Carrier 1' },
				  { id: 2, value: 'carrier2', text: 'Carrier 2' },
				  { id: 3, value: 'carrier3', text: 'Carrier 3' },
				  { id: 4, value: 'carrier4', text: 'Carrier 4' },
				  { id: 5, value: 'carrier5', text: 'Carrier 5' }
			    ],
				transactions: [
					{
					  date: '2016-11-16',
					  invoice_sent: '0.00000',
					  payment_received: '0.00000',
					  credit_note_sent: '0.00000',
                      debit_note_sent: '0.00000',
					  invoice_received: '0.00000',
					  payment_sent: '0.00000',
                      credit_note_received: '0.00000',
                      debit_note_received: '0.00000',
					  balance: '7352.00000'
					},
                    {
					  date: '2016-11-16',
					  invoice_sent: '0.00000',
					  payment_received: '0.00000',
					  credit_note_sent: '0.00000',
                      debit_note_sent: '0.00000',
					  invoice_received: '0.00000',
					  payment_sent: '0.00000',
                      credit_note_received: '0.00000',
                      debit_note_received: '0.00000',
					  balance: '7352.00000'
					},
                    {
					  date: '2016-11-16',
					  invoice_sent: '0.00000',
					  payment_received: '0.00000',
					  credit_note_sent: '0.00000',
                      debit_note_sent: '0.00000',
					  invoice_received: '0.00000',
					  payment_sent: '0.00000',
                      credit_note_received: '0.00000',
                      debit_note_received: '0.00000',
					  balance: '7352.00000'
					},
                    {
					  date: '2016-11-16',
					  invoice_sent: '0.00000',
					  payment_received: '0.00000',
					  credit_note_sent: '0.00000',
                      debit_note_sent: '0.00000',
					  invoice_received: '0.00000',
					  payment_sent: '0.00000',
                      credit_note_received: '0.00000',
                      debit_note_received: '0.00000',
					  balance: '7352.00000'
					},
                    {
					  date: '2016-11-16',
					  invoice_sent: '0.00000',
					  payment_received: '0.00000',
					  credit_note_sent: '0.00000',
                      debit_note_sent: '0.00000',
					  invoice_received: '0.00000',
					  payment_sent: '0.00000',
                      credit_note_received: '0.00000',
                      debit_note_received: '0.00000',
					  balance: '7352.00000'
					}
			    ]
			}
        },
		methods: {
		},
        mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
		}
	}
</script>

<style>
    .button_set.m-top-25 {
        margin-top: 25px;
    }
    
    section.role_section.default {
        margin: 10px 0 0 0;
    }
    
    section.role_section.default h2.text-center {
        margin-top: 0;
    }
    
    a.action.action_reload {
        padding-top: 1px;
        padding-left: 4px;
    }
</style>
