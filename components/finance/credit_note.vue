<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
            <time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Finance</a></li>
                  <li class="breadcrumb-item">
                       <router-link to="/finance/invoices">Invoices</router-link>
                  </li>
				  <li class="breadcrumb-item active">Credit Note</li>
			</ol>
			<h1 class="page-header">Credit Note</h1>
			<div class="white_pad table_wrap">
                <div class="table_filters">
                     <router-link to="/finance/invoices" class="btn btn_white back bottom_null">
                        <span class="dnl_icon dnl_import"></span> Back 
                    </router-link>
					<a class="btn btn-primary mini pull-right">
						<span class="dnl_icon dnl_add"></span> Add New 
					</a>
				</div>
				<div class="table-responsive">
					<table class="table table-striped table-hover carrier_fields">
					  <thead>
						<tr>
						  <th>Entered On<span class="dnl_icon dnl_sort pull-right"></span></th>
						  <th>Entered By</th>
						  <th>Amount</th>
                          <th>Description</th>
						  <th>Action</th>
						</tr>
					  </thead>
					  <tbody>
                          <tr v-for="invoice in invoices">
                              <td>{{invoice.entered_on}}</td>
                              <td>{{invoice.entered_by}}</td>
                              <td>{{invoice.amount}}</td>
                              <td>{{invoice.description}}</td>
                              <td>
                                  <a data-toggle="tooltip" data-placement="top" title="Edit" class="action action_edit">
                                      <span class="dnl_icon dnl_action_edit"></span>
                                  </a> 
                                  <a data-toggle="tooltip" data-placement="top" title="Delete" class="action action_delete">
                                      <span class="dnl_icon dnl_action_delete"></span>
                                  </a>
                              </td>
                          </tr>
                          <tr>
                              <td><b>Total</b></td>
                              <td></td>
                              <td><b>200</b></td>
                              <td></td>
                              <td></td>
                          </tr>
					  </tbody>
					</table>
				</div>
				<div class="clearfix little-space"></div>
		</div>
	  </div>
	</div>
	</div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                invoices: [
                    {
                        entered_on: '2017-02-10 00:00:00+00',
                        entered_by: 'Albert Morris',
                        amount: '280',
                        description: 'Some description goes here'
                    },
                    {
                        entered_on: '2017-02-10 00:00:00+00',
                        entered_by: 'Albert Morris',
                        amount: '280',
                        description: 'Some description goes here'
                    },
                    {
                        entered_on: '2017-02-10 00:00:00+00',
                        entered_by: 'Albert Morris',
                        amount: '280',
                        description: 'Some description goes here'
                    },
                    {
                        entered_on: '2017-02-10 00:00:00+00',
                        entered_by: 'Albert Morris',
                        amount: '280',
                        description: 'Some description goes here'
                    },
                    {
                        entered_on: '2017-02-10 00:00:00+00',
                        entered_by: 'Albert Morris',
                        amount: '280',
                        description: 'Some description goes here'
                    }
                ]
            }
        }
    }
</script>

<style>
    a.btn.btn_white.back.bottom_null {
        margin-bottom: 0;
    }
</style>
