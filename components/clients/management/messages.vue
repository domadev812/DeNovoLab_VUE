<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="#">Management</a>
					</li>
					<li class="breadcrumb-item active">Messages</li>
				</ol>
				<!-- <h1 class="page-header">Messages</h1> -->
				<div class="white_pad table_wrap">
								
					<div class="messages">
						<div class="col-md-6 col-sm-3">
							<h3 class="MsgTitle">Messages</h3>
						</div>
						<div class="col-md-6 col-sm-9">
							<div class="pull-right margin">
								<a href="#"><img src="assets/images/client/Analytics.png" alt=""> ANALYTICS</a>
								<router-link to="/clients/management/account_summary"><img src="assets/images/client/useractivelink.png" alt=""> ACCOUNT</router-link>
								<router-link class="distnictbtn" to="/clients/management/messages"> MESSAGES</router-link>
							</div>
						</div>
						<div class="clearfix"></div>

						<div class="col-md-4">
							<div class="box boxOne" @click="type='alert'">
							<img src="assets/images/client/boxOneicon.png" alt="">
							<h3>2 Alerts</h3>
							</div>
						</div>

						<div class="col-md-4">
							<div class="box boxTwo" @click="type='invoice'">
							<img src="assets/images/client/boxTwoicon.png" alt="">
							<h3>3 Unpaid Invoices</h3>
							</div>
						</div>

						<div class="col-md-4">
							<div class="box boxThree" @click="type='message'">
							<img src="assets/images/client/boxThreeicon.png" alt="">
							<h3>4 Messages</h3>
							</div>
						</div>
					</div>
					<div class="clearfix"></div>
					<div class="table-responsive" v-if="type=='alert'">
						<table class="table table-striped table-hover clients">
							<thead>
								<tr>
									<th>Alert Type</th>
									<th>Subject</th>
									<th>Sent To</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								<tr v-if="!alert_list.length">
									<td style="text-align: center" colspan="6">No Data Found</td>
								</tr>										
								
								<tr v-for="item in alert_list">
									<td>{{item.type}}</td>
									<td>{{item.subject}}</td>
									<td>{{item.send}}</td>
									<td>
										<a class="action action_menu" data-toggle="tooltip" data-placement="top" title="View" v-on:click="alert_view(item)">
											<span class="dnl_icon dnl_action_menu"></span>
										</a>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="table-responsive" v-if="type=='invoice'">
						<table class="table table-striped table-hover clients">
							<thead>
								<tr>
									<th>Invoice Number</th>
									<th>Amount</th>
									<th>Period</th>
									<th>Due Date</th>
									<th>Paid</th>
									<th>Unpaid</th>
								</tr>
							</thead>
							<tbody>
								<tr v-if="!invoice_list.length">
									<td style="text-align: center" colspan="6">No Data Found</td>
								</tr>										
								
								<tr v-for="item in invoice_list">
									<td>{{item.number}}</td>
									<td>{{item.amount}}</td>
									<td>{{item.period}}</td>
									<td>{{item.due}}</td>
									<td>{{item.paid}}</td>
									<td>{{item.unpaid}}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="table-responsive" v-if="type=='message'">
						<table class="table table-striped table-hover clients">
							<thead>
								<tr>
									<th>Messages Type</th>
									<th>Subject</th>
									<th>Sent To</th>
									<th>Sent On</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								<tr v-if="!message_list.length">
									<td style="text-align: center" colspan="6">No Data Found</td>
								</tr>										
								
								<tr v-for="item in message_list">
									<td>{{item.type}}</td>
									<td>{{item.subject}}</td>
									<td>{{item.to}}</td>
									<td>{{item.on}}</td>
									<td>
										<a class="action action_menu" data-toggle="tooltip" data-placement="top" title="View" v-on:click="message_view(item)">
											<span class="dnl_icon dnl_action_menu"></span>
										</a>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<modal v-if="showModal=='alert'" @close="showModal = ''">
						<h3 slot="header">Alert</h3>
						<div slot="body">
						<div class="">
							<form class="form">
								<div class="form-group">
									<!-- <label for="subject">Subject:</label> -->
									<input type="text" readonly name="subject" v-model="current_subject" class="form-control">
								</div>
								<div class="form-group">
									<textarea readonly name="content" v-model="current_content" class="form-control"></textarea>
								</div>
							</form>
						</div>
						</div>
						<div slot="footer">
							<button @click="closeModal" class="btn btn-default cancel">Ok</button>
						</div>
					</modal>
					<modal v-if="showModal=='message'" @close="showModal = ''">
						<h3 slot="header">Message</h3>
						<div slot="body">
						<div class="">
							<form class="form">
								<div class="form-group">
									<!-- <label for="subject">Subject:</label> -->
									<input type="text" readonly name="subject" v-model="current_subject" class="form-control">
								</div>
								<div class="form-group">
									<textarea readonly name="content" v-model="current_content" class="form-control"></textarea>
								</div>
							</form>
						</div>
						</div>
						<div slot="footer">
							<button @click="closeModal" class="btn btn-default cancel">Ok</button>
						</div>
					</modal>
					
					<div class="clearfix"></div>
					<footer>
						<p>DeNovoLab@2010-2016 All Rights Reserved</p>
					</footer>
										
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	   const modal = require('vue!../../main_components/modal.vue');
	   const api = require("../../../api");
	   const auth = require("../../../auth");
	   _ = require('lodash');
	   import {mapGetters, mapActions} from 'vuex'
	   module.exports = {
		components: {
			'modal': modal,
		},
	   	data: function() {
	   		return {
	   			apiUrl: '',
				showModal: '',
				type: 'alert',
				current_subject: '',
				current_content: '',
				alert_list: [
					{id: 1, type: 'Low Balance Alerts', subject: 'Insufficient Balance DNL , Tue, 10 Jan 2017 UTC', send: "sourav@denovolab.com;sourav@denovolab.com"},
					{id: 1, type: 'Low Balance Alerts', subject: 'Insufficient Balance DNL , Tue, 10 Jan 2017 UTC', send: "sourav@denovolab.com;sourav@denovolab.com"},
				],
				invoice_list: [
					{id: 1, number: '3303', amount: '22.91667', period: "2017-02-27 00:00:00+00:00~2017-02-27 00:00:00+00:00", due: '2017-03-03', paid: '', unpaid: '22.91667'},
					{id: 1, number: '3303', amount: '22.91667', period: "2017-02-27 00:00:00+00:00~2017-02-27 00:00:00+00:00", due: '2017-03-03', paid: '', unpaid: '22.91667'},
					{id: 1, number: '3303', amount: '22.91667', period: "2017-02-27 00:00:00+00:00~2017-02-27 00:00:00+00:00", due: '2017-03-03', paid: '', unpaid: '22.91667'},
				],
				message_list: [
					{id: 1, type: 'Daily Usage', subject: 'Daily Summary Email Templat', to: "sourav@denovolab.com", on: '2016-12-22 00:08:04+00'},
					{id: 1, type: 'Daily Usage', subject: 'Daily Summary Email Templat', to: "sourav@denovolab.com", on: '2016-12-22 00:08:04+00'},
					{id: 1, type: 'Daily Usage', subject: 'Daily Summary Email Templat', to: "sourav@denovolab.com", on: '2016-12-22 00:08:04+00'},
					{id: 1, type: 'Daily Usage', subject: 'Daily Summary Email Templat', to: "sourav@denovolab.com", on: '2016-12-22 00:08:04+00'},
				],
	   		}
	   	},
	   	methods: {
	   		...mapActions({
	   			setAsyncConfirm: 'async_confirm/setAsyncConfirm',
	   			setMessage: 'app_message/setAppMessage'
	   		}),
	   		fetchLists() {

	   		},
			closeModal: function () {
				this.showModal = '';
			},
			alert_view(item) {
				this.showModal = 'alert';
				this.current_subject = item.subject;
				this.current_content = '';
			},
			message_view(item) {
				this.showModal = 'message';
				this.current_subject = item.subject;
				this.current_content = '';
			}
	   	},
	   	created: function() {
	   		this.fetchLists();
	   	},
	   }
</script>

<style>

</style>
