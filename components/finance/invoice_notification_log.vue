<template>
	<div class="container-fluid">
	  <modal v-if="showModal=='view_all'" @close="showModal = ''" class="big_modal">
			<h3 slot="header">View Invoice Email</h3>
			<div slot="body">
			  <div class="">
				  <div class="table-responsive">
					<table class="table table-striped table-hover carrier_groups aligned-center">
					  <thead>
						 <tr>
							<th>Client Name</th>
							<th>Invoice Number</th> 
							<th>Invoice Period</th>
							<th>Sent On</th>
							<th>Sent To</th>
						 </tr>
					  </thead>
					  <tbody>
						<tr v-for="client in clients">
						  <td>{{client.name}}</td>
						  <td>{{client.invoice_number}}</td>
						  <td>{{client.invoice_period}}</td>
						  <td>{{client.sent_on}}</td>
						  <td>{{client.sent_to}}</td>
						</tr>
					  </tbody>
					</table>
				</div>
			  </div>
			</div>
			<div slot="footer">
				<button @click="closeModal" class="btn btn-default mini cancel centered">Cancel</button>
			</div>
	  </modal>
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a>Finance</a></li>
				  <li class="breadcrumb-item active">Invoice Notification Log</li>
			</ol>
			<h1 class="page-header">Invoice Notification Log</h1>
			<div class="white_pad table_wrap">
				<div class="advanced_search_filter_panel bottom_0">
					<div class="col-md-3 col-sm-4">
						<label>Search:</label>
						<br>
						<input type="text" name="search" v-model="search" class="form-control inline-block search_field" placeholder="Enter Credit Name">
						<span class="dnl_icon dnl_musica-searcher"></span>
					</div>
					<div class="col-md-3 col-sm-4">
						<label>Client Type:</label>
						<br>
						<select2 :options="options2" v-model="selected2">
							<option disabled value="0">Show/Hide Columns</option>
						</select2>
					</div>
					<div class="col-md-4 col-sm-8">
						<div class="inlined">
							<label for="start_date">Start Time:</label>
							<input type="text" name="start_date" v-model="start_date" class="form-control" placeholder="Enter Date">
						</div>
						<div class="inlined">
							<label for="end-date">End Time:</label>
							<input type="text" name="end_date" v-model="end_date" class="form-control" placeholder="Enter Date">
						</div>
					</div>
					<div class="clearfix"></div>
				</div>
				<div class="clearfix"></div>
				<div class="pull-right pagination top_pagination">
					<pagination :current-page="pageOne.currentPage"
								:total-pages="pageOne.totalPages"
								@page-changed="pageOneChanged">
					</pagination>
				</div>
				<div class="table_filters m-top-15">
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
				</div>
				<div class="clearfix"></div>
				<div class="table-responsive">
					<table class="table table-striped table-hover aliases credits">
					  <thead>
						<tr>
						  <th>Date Time</th>
						  <th>Carrier<span class="dnl_icon dnl_sort pull-right"></span></th>
						  <th>Amount</th>
						  <th>Due Date</th>
						  <th class="width_138">Action</th>
						</tr>
					  </thead>
					  <tbody>
						<tr v-for="notification in filterBy(notifications, search)">
						  <td>{{notification.date_time}}</td>
						  <td>{{notification.carrier}}</td>
						  <td>{{notification.amount}}</td>
						  <td>{{notification.due_date}}</td>
						  <td>
							  <a class="action action_read" data-toggle="tooltip" data-placement="top" title="View E-mail" @click="showModal = 'view_all'">	<span class="dnl_icon dnl_eye"></span>
							  </a>
							  <a data-toggle="tooltip" data-placement="top" title="Download" class="action action_download v-top">
								  <span class="dnl_icon dnl_download"></span>
							  </a>
							  <a data-toggle="tooltip" data-placement="top" title="Send E-mail" class="action action_send">
								  <span class="dnl_icon dnl_support"></span>
							  </a>
						  </td>
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
		  Pagination = require('vue!../main_components/pagination.vue'),
		  modal = require('vue!../main_components/modal.vue');
	module.exports = {
		components: {
			'select2': vSelect,
			'pagination': Pagination,
			'modal': modal
		},
		data: function(){
            return {
			  search:'',
			  checker: '',
			  showModal: '',
			  start_date:'',
			  end_date:'',
			  ftp_config_name: '',
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
				  { id: 1, text: 'Alias' },
				  { id: 2, text: 'Active' },
				  { id: 3, text: 'Actions' }
			  ],
			  clients: [
				  {
					  name: 'Client Name',
					  invoice_number: '234523',
					  invoice_period: '2017-02-02 00:00:00+00 - 2017-02-02 00:00:00+00',
					  sent_on: '2017-02-02 00:00:00+00',
					  sent_to: 'Sourav Mukherjee'
				  },
				  {
					  name: 'Client Name',
					  invoice_number: '234523',
					  invoice_period: '2017-02-02 00:00:00+00 - 2017-02-02 00:00:00+00',
					  sent_on: '2017-02-02 00:00:00+00',
					  sent_to: 'Sourav Mukherjee'
				  },
				  {
					  name: 'Client Name',
					  invoice_number: '234523',
					  invoice_period: '2017-02-02 00:00:00+00 - 2017-02-02 00:00:00+00',
					  sent_on: '2017-02-02 00:00:00+00',
					  sent_to: 'Sourav Mukherjee'
				  },
				  {
					  name: 'Client Name',
					  invoice_number: '234523',
					  invoice_period: '2017-02-02 00:00:00+00 - 2017-02-02 00:00:00+00',
					  sent_on: '2017-02-02 00:00:00+00',
					  sent_to: 'Sourav Mukherjee'
				  },
				  {
					  name: 'Client Name',
					  invoice_number: '234523',
					  invoice_period: '2017-02-02 00:00:00+00 - 2017-02-02 00:00:00+00',
					  sent_on: '2017-02-02 00:00:00+00',
					  sent_to: 'Sourav Mukherjee'
				  }
			  ],
			  notifications: [
				{
				  date_time: "2017-02-02 00:00:00+00",
				  carrier: 'Sourav Mukherjee',
				  amount: '14.66667',
				  due_date: '2017-02-02'
				},
				{
				  date_time: "2017-02-02 00:00:00+00",
				  carrier: 'Sourav Mukherjee',
				  amount: '14.66667',
				  due_date: '2017-02-02'
				},
				{
				  date_time: "2017-02-02 00:00:00+00",
				  carrier: 'Sourav Mukherjee',
				  amount: '14.66667',
				  due_date: '2017-02-02'
				},
				{
				  date_time: "2017-02-02 00:00:00+00",
				  carrier: 'Sourav Mukherjee',
				  amount: '14.66667',
				  due_date: '2017-02-02'
				},
				{
				  date_time: "2017-02-02 00:00:00+00",
				  carrier: 'Sourav Mukherjee',
				  amount: '14.66667',
				  due_date: '2017-02-02'
				}
			  ]
            }
        },
		methods: {
			pageOneChanged (pageNum) {
				this.pageOne.currentPage = pageNum
			},
			closeModal: function() {
				this.showModal = '';
			}
		},
		mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
		}
	}
</script>

<style>
	.col-md-3.col-sm-4 .search_field {
		width: 100%;
	}
	
	.col-md-3.col-sm-4 span.dnl_icon.dnl_musica-searcher {
		float: right;
		margin-top: -25px;
		position: relative;
		right: 12px;
	}
	
	a.action.action_download.v-top {
		vertical-align: top;
	}
</style>
