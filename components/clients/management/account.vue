<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="#">Management</a>
					</li>
					<li class="breadcrumb-item active">Accounts</li>
				</ol>
				<!-- <h1 class="page-header">Accounts</h1> -->
				<div class="white_pad table_wrap">
					<div class="accounts">
						<div class="col-md-6 col-sm-3">
							<h3 class="MsgTitle">Accounts</h3>
						</div>
						<div class="col-md-6 col-sm-9">
							<div class="pull-right margin">
								<a href="#"><img src="assets/images/client/Analytics.png" alt=""> ANALYTICS</a>
								<router-link class="distnictbtn" to="/clients/management/account_summary"><img src="assets/images/client/useractivelink.png" alt=""> ACCOUNT</router-link>
								<router-link to="/clients/management/messages"> MESSAGES</router-link>
							</div>
						</div>
						<div class="clearfix"></div>
						<div class="col-md-4">
							<div class="box boxOne">
								<div class="">
									<h3><img src="assets/images/client/userAccount.png" alt=""> User Account</h3>
									<p class="grarbackground">Name: <span>Makeym Romanchuk</span></p>
									<p>Main e-mail: <span>example@mail.com</span></p>
									<p class="grarbackground">Phone: <span></span></p>
									<p>Address: <span>Example text</span></p>
								</div>
								<button class="edit" type="button" name="edit">Edit</button>
							</div>
						</div>
						<div class="col-md-4">
							<div class="box boxTwo">
								<div class="">
									<h3><img src="assets/images/client/AccountBalanceicon.png" alt=""> Account Balance</h3>
									<p class="grarbackground">Status: <span>Active</span></p>
									<p>Type: <span> Postpaid</span></p>
									<p class="grarbackground">Available Credit: <span>5.600</span></p>
									<p>Ingress Trunk: <span>2</span></p>
									<p class="grarbackground">Engress Trunk: <span>1</span></p>
									<p>Actual Balance: <span>65.000</span></p>
								</div>
								<button class="payNow edit" type="button" name="payNow">Pay Now</button>
								<button class="transactions edit" type="button" name="transactions">Transactions</button>
							</div>
						</div>
						<div class="col-md-4">
							<div class="box boxThree">
								<div class="">
									<h3><img src="assets/images/client/EmailcontactsIcon.png" alt=""> Email Contacts</h3>
									<p class="grarbackground">NOC e-mail: <span>yaskevichyaroslav@gmail.com</span></p>
									<p>Billing e-mail: <span>example@mail.com</span></p>
									<p class="grarbackground">Rates e-mail: <span>contact.email@gmail.com</span></p>
									<p>Address: <span>Example text</span></p>
								</div>
								<button class="edit" type="button" name="edit">Edit</button>
							</div>
						</div>
					</div>
					<!--/////////////////////////////////////////////////-->
					<div class="ingressTrunks">
						<div class="col-sm-12">
							<h3>Ingress Trunks</h3>
						</div>
						
						<div class="table-responsive">
							<table class="table table-striped table-hover clients trunks">
								<thead>
									<tr>
										<th>Ingress Name</th>
										<th>Product Num</th>
										<th>Host:Port</th>
										<th>Call Limit</th>
										<th>CPS Limit</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									<tr v-if="!ingress_list.length">
										<td style="text-align: center" colspan="6">No Data Found</td>
									</tr>										
									
									<tr v-for="ingress in ingress_list">
										<td>{{ingress.name}}</td>
										<td>{{ingress.product}}</td>
										<td>{{ingress.host_port}}</td>
										<td>{{ingress.call_limit}}</td>
										<td>{{ingress.cps_limit}}</td>
										<td>
											<a class="action action_activate" data-toggle="tooltip" data-placement="top" title="Active" v-on:click="active_ingress(ingress.id)">
												<span class="dnl_icon dnl_check"></span>
											</a>
											<a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="delete_ingress(ingress.id)">
												<span class="dnl_icon dnl_action_delete"></span>
											</a>
										</td>
									</tr>
								</tbody>
							</table>
						</div>		  
					</div>
					<!--/////////////////////////////////////////////////-->
					<div class="ingressTrunks">
						<div class="col-md-12 cpl-sm-12">
							<h3>Egress Trunks</h3>
						</div>
						<div class="table-responsive">
							<table class="table table-striped table-hover clients trunks">
								<thead>
									<tr>
										<th>Egress Name</th>
										<th>Rate Table</th>
										<th>Host:Port</th>
										<th>Call Limit</th>
										<th>CPS Limit</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									<tr v-if="!egress_list.length">
										<td style="text-align: center" colspan="6">No Data Found</td>
									</tr>										
									
									<tr v-for="egress in egress_list">
										<td>{{egress.name}}</td>
										<td>{{egress.rate}}</td>
										<td>{{egress.host_port}}</td>
										<td>{{egress.call_limit}}</td>
										<td>{{egress.cps_limit}}</td>
										<td>
											<a class="action action_activate" data-toggle="tooltip" data-placement="top" title="Active" v-on:click="active_egress(egress.id)">
												<span class="dnl_icon dnl_check"></span>
											</a>
											<a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" v-on:click="delete_egress(egress.id)">
												<span class="dnl_icon dnl_action_delete"></span>
											</a>
										</td>
									</tr>
								</tbody>
							</table>
						</div>	
					</div>
					<div class="clearfix"></div>
					<footer>
						<p>DeNovoLab@2010-2016 All Rights Reserved</p>
					</footer>						
					<div class="clearfix"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	   const api = require("../../../api");
	   const auth = require("../../../auth");
	   _ = require('lodash');
	   import {mapGetters, mapActions} from 'vuex'
	   module.exports = {
	   	data: function() {
	   		return {
	   			apiUrl: '',
				ingress_list: [
					{id: 1, name: 'ingress1', product: 1, host_port: "127.0.0.1:8080", call_limit: 0, cps_limit: 0},
					{id: 1, name: 'ingress1', product: 1, host_port: "127.0.0.1:8080", call_limit: 0, cps_limit: 0},
					{id: 1, name: 'ingress1', product: 1, host_port: "127.0.0.1:8080", call_limit: 0, cps_limit: 0}
				],
				egress_list: [
					{id: 1, name: 'egress1', rate: 1, host_port: "127.0.0.1:8080", call_limit: 0, cps_limit: 0},
					{id: 1, name: 'egress1', rate: 1, host_port: "127.0.0.1:8080", call_limit: 0, cps_limit: 0},
					{id: 1, name: 'egress1', rate: 1, host_port: "127.0.0.1:8080", call_limit: 0, cps_limit: 0}
				],
	   		}
	   	},
	   	methods: {
	   		...mapActions({
	   			setAsyncConfirm: 'async_confirm/setAsyncConfirm',
	   			setMessage: 'app_message/setAppMessage'
	   		}),
	   		active_ingress: function(id) {
	   		},
	   		active_egress: function(id) {
	   		},
	   		delete_ingress: function(id) {
	   		},
	   		delete_egress: function(id) {
	   		},
	   		fetchTrunks() {
	   		},
	   	},
	   	created: function() {
	   		this.fetchTrunks();
	   	},
	   }
</script>

<style>

</style>
