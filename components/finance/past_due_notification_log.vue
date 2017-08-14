<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Finance</a></li>
				  <li class="breadcrumb-item active">Past Due Notification Log</li>
			</ol>
			<h1 class="page-header">Past Due Notification Log</h1>
			<tabs>
				<tab label="Received Payment" class="" icon="dnl_icon dnl_to_left" selected>
                    <div class="table_filters searcheable m-top-20">
                        <div class="inline-block select_min_wrapper">
                            <span class="inline-block">Page row:</span>
                            <select2 :options="options1" v-model="selected1" class="inline-block">
                            </select2>
                        </div>
                        <div class="inline-block">
                            <select2 :options="options2" v-model="selected2">
                                <option disabled value="0">Show/Hide Columns</option>
                            </select2>
                        </div>
                        <a class="btn btn-primary mini pull-right">
                            <span class="dnl_icon dnl_add"></span> Create new 
					    </a>
                    </div>
					<div class="table-responsive">
						<table class="table table-striped table-hover codes">
						  <thead>
							<tr>
							  <th>Payment Type</th>
							  <th>Received At</th>
							  <th>Amount</th>
                              <th class="width-65">Action</th>
							</tr>
						  </thead>
						  <tbody>
							<tr v-for="payment in payments">
							  <td>{{payment.type}}</td>
							  <td>{{payment.received_at}}</td>
                              <td>{{payment.amount}}</td>
                              <td>
                                  <a data-toggle="tooltip" data-placement="top" title="Delete" class="action action_delete">
                                      <span class="dnl_icon dnl_action_delete"></span>
                                  </a>
                              </td>
							</tr>
						  </tbody>
						</table>
					</div>
                    <div class="clearfix"></div>
                    <div class="pull-right pagination">
                        <pagination :current-page="pageOne.currentPage"
                                    :total-pages="pageOne.totalPages"
                                    @page-changed="pageOneChanged">
                        </pagination>
                    </div>
                    <div class="clearfix"></div>
				</tab>
				<tab label="Sent Payment" class="" icon="dnl_icon dnl_to_right">
					<div class="table_filters searcheable m-top-20">
                        <div class="inline-block select_min_wrapper">
                            <span class="inline-block">Page row:</span>
                            <select2 :options="options1" v-model="selected1" class="inline-block">
                            </select2>
                        </div>
                        <div class="inline-block fix_medium_select">
                            <select2 :options="options2" v-model="selected2">
                                <option disabled value="0">Show/Hide Columns</option>
                            </select2>
                        </div>
                        <a class="btn btn-primary mini pull-right">
                            <span class="dnl_icon dnl_add"></span> Create new 
					    </a>
                    </div>
					<div class="table-responsive">
						<table class="table table-striped table-hover codes">
						  <thead>
							<tr>
							  <th>Payment Type</th>
							  <th>Received At</th>
							  <th>Amount</th>
                              <th class="width-65">Action</th>
							</tr>
						  </thead>
						  <tbody>
							<tr v-for="payment in payments">
							  <td>{{payment.type}}</td>
							  <td>{{payment.received_at}}</td>
                              <td>{{payment.amount}}</td>
                              <td>
                                  <a data-toggle="tooltip" data-placement="top" title="Delete" class="action action_delete">
                                      <span class="dnl_icon dnl_action_delete"></span>
                                  </a>
                              </td>
							</tr>
						  </tbody>
						</table>
					</div>
                    <div class="clearfix"></div>
                    <div class="pull-right pagination">
                        <pagination :current-page="pageOne.currentPage"
                                    :total-pages="pageOne.totalPages"
                                    @page-changed="pageOneChanged">
                        </pagination>
                    </div>
                    <div class="clearfix"></div>
				</tab>
				<tab label="Vendor Invoice" class="" icon="dnl_icon dnl_person">
					<div class="table_filters searcheable m-top-20">
                        <div class="inline-block select_min_wrapper">
                            <span class="inline-block">Page row:</span>
                            <select2 :options="options1" v-model="selected1" class="inline-block">
                            </select2>
                        </div>
                        <div class="inline-block fix_medium_select">
                            <select2 :options="options2" v-model="selected2">
                                <option disabled value="0">Show/Hide Columns</option>
                            </select2>
                        </div>
                        <a class="btn btn-primary mini pull-right">
                            <span class="dnl_icon dnl_add"></span> Create new 
					    </a>
                    </div>
					<div class="table-responsive">
						<table class="table table-striped table-hover centered">
						  <thead>
                            <tr>
                                <th colspan="3" rowspan="1">Invoice Period</th>
                                <th colspan="1" rowspan="2" class="width-65">Invoice Date</th>
                                <th colspan="1" rowspan="2" class="width-65">Action</th>
                            </tr>
                            <tr>
                                <th rowspan="1" colspan="1">Start</th>
                                <th rowspan="1" colspan="1">End</th>
                                <th rowspan="1" colspan="1">GMT</th>
                            </tr>
                          </thead>
						  <tbody>
							<tr v-for="vendor in vendors">
							  <td>{{vendor.start}}</td>
							  <td>{{vendor.end}}</td>
                              <td>{{vendor.gmt}}</td>
                              <td>{{vendor.invoice_date}}</td>
                              <td>
                                  <a data-toggle="tooltip" data-placement="top" title="Delete" class="action action_delete">
                                      <span class="dnl_icon dnl_action_delete"></span>
                                  </a>
                              </td>
							</tr>
						  </tbody>
						</table>
					</div>
                    <div class="clearfix"></div>
                    <div class="pull-right pagination">
                        <pagination :current-page="pageOne.currentPage"
                                    :total-pages="pageOne.totalPages"
                                    @page-changed="pageOneChanged">
                        </pagination>
                    </div>
                    <div class="clearfix"></div>
				</tab>
			</tabs>
		</div>
	  </div>
	</div>
</template>

<script>   
	const vTabs = require('vue!../main_components/tabs.vue'),
		  vTab = require('vue!../main_components/tab.vue'),
		  vSelect = require('vue!../main_components/select.vue'),
          Pagination = require('vue!../main_components/pagination.vue');
	module.exports = {
		components: {
			'tabs': vTabs,
			'tab': vTab,
			'select2': vSelect,
            'pagination': Pagination
		},
		data: function(){
            return {
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
				route_types: [
				  { id: 1, text: 'Fail to Next Host' },
				  { id: 2, text: 'Fail to Next Trunk' },
				  { id: 3, text: 'Stop' },
			  	],
				payments: [
					{
					  type: "Prepayment",
					  received_at: "2017-02-22 15:35:33",
                      amount: "320",
                    },
                    {
					  type: "Prepayment",
					  received_at: "2017-02-22 15:35:33",
                      amount: "320",
                    },
                    {
					  type: "Prepayment",
					  received_at: "2017-02-22 15:35:33",
                      amount: "320",
                    },
                    {
					  type: "Prepayment",
					  received_at: "2017-02-22 15:35:33",
                      amount: "320",
                    },
                    {
					  type: "Prepayment",
					  received_at: "2017-02-22 15:35:33",
                      amount: "320",
                    }
			  ],
              vendors: [
                  {
                      start: '2017-02-12 00:00:00',
                      end: '2017-02-12 00:00:00',
                      gmt: 'GMT + 00:00',
                      invoice_date: '2017-02-12'
                  },
                  {
                      start: '2017-02-12 00:00:00',
                      end: '2017-02-12 00:00:00',
                      gmt: 'GMT + 00:00',
                      invoice_date: '2017-02-12'
                  },
                  {
                      start: '2017-02-12 00:00:00',
                      end: '2017-02-12 00:00:00',
                      gmt: 'GMT + 00:00',
                      invoice_date: '2017-02-12'
                  },
                  {
                      start: '2017-02-12 00:00:00',
                      end: '2017-02-12 00:00:00',
                      gmt: 'GMT + 00:00',
                      invoice_date: '2017-02-12'
                  },
                  {
                      start: '2017-02-12 00:00:00',
                      end: '2017-02-12 00:00:00',
                      gmt: 'GMT + 00:00',
                      invoice_date: '2017-02-12'
                  }
              ]
			}
        },
        methods: {
			pageOneChanged (pageNum) {
				this.pageOne.currentPage = pageNum
			}
		},
        mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
		}
	}
</script>

<style>
</style>
