<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="#">Management</a>
					</li>
					<li class="breadcrumb-item">
						<router-link to="/management/registration">Registration</router-link>
					</li>
					<li class="breadcrumb-item active">User Description</li>
				</ol>
				<h1 class="page-header">User Description</h1>
				<router-link to="/management/registration" class="btn btn_white back">
					<span class="dnl_icon dnl_import"></span> Back </router-link>
				<form class="form" @submit.prevent="validateBeforeSubmit">
					<div class="white_pad product_add">
						<div class="row">
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<label for="company">Company Information:</label>
									<input type="text" name="company" v-model="data.company" class="form-control" placeholder="Enter Company Information">
								</div>
							</div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<label for="username">Username:</label>
									<input type="text" name="username" v-model="data.username" class="form-control" placeholder="Enter Username">
								</div>
							</div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<label for="password">Password:</label>
									<input type="password" name="password" v-model="data.password" class="form-control" placeholder="Enter Password">
								</div>
							</div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<label for="contact_name">Name of Business Contact:</label>
									<input type="text" name="contact_name" v-model="data.contact_name" class="form-control" placeholder="Enter Business Contact Name">
								</div>
							</div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<label for="main_email">Main E-mail:</label>
									<input type="email" name="main_email" v-model="data.main_email" class="form-control" placeholder="Enter Main E-mail">
								</div>
							</div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<label for="noc_email">Noc E-mail:</label>
									<input type="email" name="noc_email" v-model="data.noc_email" class="form-control" placeholder="Enter Noc E-mail">
								</div>
							</div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<label for="rate_send_from_email">Rates E-mail:</label>
									<input type="email" name="rate_send_from_email" v-model="data.rate_send_from_email" class="form-control" placeholder="Enter Rates E-mail">
								</div>
							</div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<label for="rate_send_to_email">Rate Delivery E-mail:</label>
									<input type="email" name="rate_send_to_email" v-model="data.rate_send_to_email" class="form-control" placeholder="Enter Rate Delivery E-mail">
								</div>
							</div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<label for="address">Address:</label>
									<input type="text" name="address" v-model="data.address" class="form-control" placeholder="Enter Address">
								</div>
							</div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<label for="city">City:</label>
									<input type="text" name="city" v-model="data.city" class="form-control" placeholder="Enter City">
								</div>
							</div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<label for="state">State:</label>
									<input type="text" name="state" v-model="data.state" class="form-control" placeholder="Enter State">
								</div>
							</div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<label for="zip">Zip:</label>
									<input type="text" name="zip" v-model="data.zip" class="form-control" placeholder="Enter Zip">
								</div>
							</div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<div class="form-group">
										<label>Country:</label>
										<select2 :options="options" v-model="data.country">
										</select2>
									</div>
								</div>
							</div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<label for="phone">Phone:</label>
									<input type="tel" name="phone" v-model="data.phone" class="form-control" placeholder="Enter Phone Number">
								</div>
							</div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<label for="tax_id">Tax ID:</label>
									<input type="text" name="tax_id" v-model="data.tax_id" class="form-control" placeholder="Enter Tax ID">
								</div>
							</div>
							<div class="clearfix little-space"></div>
							<hr>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<label for="billing_address">Billing Address:</label>
									<input type="text" name="billing_address" v-model="data.billing_address" class="form-control" placeholder="Enter Billing Address">
								</div>
							</div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<label for="billing_city">Billing City:</label>
									<input type="text" name="billing_city" v-model="data.billing_city" class="form-control" placeholder="Enter Billing City">
								</div>
							</div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<label for="billing_state">Billing State:</label>
									<input type="text" name="billing_state" v-model="data.billing_state" class="form-control" placeholder="Enter Billing State">
								</div>
							</div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<label for="billing_zip">Billing Zip:</label>
									<input type="text" name="billing_zip" v-model="data.billing_zip" class="form-control" placeholder="Enter Billing Zip">
								</div>
							</div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<div class="form-group">
										<label>Billing Country:</label>
										<select2 :options="options" v-model="data.billing_country">
										</select2>
									</div>
								</div>
							</div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<label for="billing_contact_name">Billing Contact Name:</label>
									<input type="text" name="billing_contact_name" v-model="data.billing_contact_name" class="form-control" placeholder="Enter Billing Contact Name">
								</div>
							</div>
							<div class="clearfix little-space"></div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<label for="billing_email">Billing E-mail:</label>
									<input type="email" name="billing_email" v-model="data.billing_email" class="form-control" placeholder="Enter Billing E-mail">
								</div>
							</div>
							<div class="col-md-3 col-sm-4">
								<div class="form-group">
									<label for="billing_phone">Billing Phone:</label>
									<input type="tel" name="billing_phone" v-model="data.billing_phone" class="form-control" placeholder="Enter Billing Phone">
								</div>
							</div>
							<div class="clearfix little-space"></div>
							<hr>
							<div class="table_filters">
								<a class="btn btn-primary mini pull-right" @click="addHost" >
									<span class="dnl_icon dnl_add"></span> Add Host
								</a>
							</div>
							<div class="clearfix little-space"></div>
							<div class="table-responsive">
								<table class="table table-striped table-hover carrier_groups hosts">
									<thead>
										<tr>
											<th>IP</th>
											<th>Netmask</th>
											<th>Port</th>
											<th class="width-65">Action</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(host, index) in data.hosts">
											<td>
												<input type="text" :name="host.ip" v-model="host.ip" class="form-control" placeholder="Enter Host IP">
											</td>
											<td class="select_td">
												<select class="selectable" v-model="host.mask">
													<option v-for="item in options2" v-bind:value="item.id">
														{{ item.text }}
													</option>
												</select>
											</td>
											<td>
												<input type="text" :name="host.port" v-model="host.port" class="form-control" placeholder="Enter Host Port">
											</td>
											<td>
												<a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete" @click="delete_host(index)">
													<span class="dnl_icon dnl_action_delete"></span>
												</a>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="clearfix little-space"></div>
							<div class="table_filters">
								<a class="btn btn-primary medium pull-right" @click="addRouting">
									<span class="dnl_icon dnl_add"></span> Add Routing and Tech-Prefix
								</a>
							</div>
							<div class="clearfix little-space"></div>
							<table class="table table-striped table-hover carrier_groups hosts">
								<thead>
									<tr>
										<th>Product Name</th>
										<th>Routing Plan</th>
										<th>Rate Table</th>
										<th>Tech Prefix</th>
										<th class="width-65">Action</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="routing in routings">
										<td class="select_td">
											<select2 :options="product_options" v-model="routing.product_name"></select2>
										</td>
										<td>
											<select2 :options="route_plan_options" v-model="routing.plan"></select2>
										</td>
										<td>
											<select2 :options="rate_tables" v-model="routing.rate_table"></select2>
										</td>
										<td>
											<input type="text" :value="routing.tech_prefix" class="form-control">
										</td>
										<td>
											<a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete">
												<span class="dnl_icon dnl_action_delete"></span>
											</a>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="clearfix little-space"></div>
						<div class="button_set text-center">
							<button class="btn btn-primary mini" type="submit">
								Submit
							</button>
							<a class="btn btn-default mini" @click="reset">
								Reset
							</a>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>   
const vSelect = require('vue!../main_components/select.vue');
const api = require("../../api");
const auth = require("../../auth");
_ = require('lodash');
import {mapGetters,	mapActions} from 'vuex'

module.exports = {
	components: {
		'select2': vSelect
	},
	data: function () {
		return {
			product_options: [],
			route_plan_options: [],
			rate_tables: [],
			routings: [{
				product_id: 0,
                route_plan: 0,
                rate_table: 0,
				tech_prefix: '',
			}],
			apiUrl: '/v1/registration/',
			data: {},
			user: {},
			id: null,

			options: [
				{ id: 'China', value: 'China', text: 'China' },
				{ id: 'Russia', value: 'Russia', text: 'Russia' },
			],
			options2: [
				{ id: '24', value: '24', text: '24' },
				{ id: '25', value: '25', text: '25' },
				{ id: '26', value: '26', text: '26' },
				{ id: '27', value: '27', text: '27' },
				{ id: '28', value: '28', text: '28' },
				{ id: '29', value: '29', text: '29' },
				{ id: '30', value: '30', text: '30' },
				{ id: '31', value: '31', text: '31' },
				{ id: '32', value: '32', text: '32' },
			],
			hosts: [],
			// routings: [
			// 	{
			// 		product_name: '2',
			// 		plan: '453453453',
			// 		rate_tavle: '123',
			// 		tech_prefix: '12'
			// 	},
			// 	{
			// 		product_name: '3',
			// 		plan: '453453453',
			// 		rate_tavle: '123',
			// 		tech_prefix: '12'
			// 	},
			// 	{
			// 		product_name: '1',
			// 		plan: '453453453',
			// 		rate_tavle: '123',
			// 		tech_prefix: '12'
			// 	}
			// ]
		}
	},
	mounted: function () {
	},
	created: function () {
		this.fetchProducts();
		this.fetchRoutePlans();
		this.fetchRateTable();
		var the = this;
		var id = this.$route.params.id;
		this.id = id;
		this.loading = true;
		this.$http.get(api.getEndpointUrl() + this.apiUrl + id,
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function (response) {
				this.loading = false;
				console.log(response);
				var user = response.body.payload;
				this.user = user;

				Vue.set(this.data, 'company', user.company);
				Vue.set(this.data, 'username', user.username);
				Vue.set(this.data, 'password', user.password);
				Vue.set(this.data, 'contact_name', user.contact_name);
				Vue.set(this.data, 'main_email', user.main_email);
				Vue.set(this.data, 'send_signup_notification', user.send_signup_notification);
				Vue.set(this.data, 'noc_email', user.noc_email);
				Vue.set(this.data, 'rate_send_from_email', user.rate_send_from_email);
				Vue.set(this.data, 'rate_send_to_email', user.rate_send_to_email);
				Vue.set(this.data, 'address', user.address);
				Vue.set(this.data, 'city', user.city);
				Vue.set(this.data, 'state', user.state);
				Vue.set(this.data, 'zip', user.zip);
				Vue.set(this.data, 'country', user.country);
				Vue.set(this.data, 'phone', user.phone);
				Vue.set(this.data, 'status', user.status);
				Vue.set(this.data, 'tax_id', user.tax_id);
				Vue.set(this.data, 'billing_address', user.billing_address);
				Vue.set(this.data, 'billing_city', user.billing_city);
				Vue.set(this.data, 'billing_state', user.billing_state);
				Vue.set(this.data, 'billing_zip', user.billing_zip);
				Vue.set(this.data, 'billing_country', user.billing_country);
				Vue.set(this.data, 'billing_contact_name', user.billing_contact_name);
				Vue.set(this.data, 'billing_email', user.billing_email);
				Vue.set(this.data, 'billing_phone', user.billing_phone);
				Vue.set(this.data, 'company_detail', user.company_detail);
				Vue.set(this.data, 'product_id', user.product_id);
				Vue.set(this.data, 'modified_on', user.modified_on);
				Vue.set(this.data, 'signed_up_on', user.signed_up_on);

				var tmp_hosts = [];
				user.ip_address.forEach(function(item, i){
					var temp = {};
					temp.ip = item.ip;
					temp.port = item.port;
					temp.id = item.id;
					temp.mask = item.mask;
					tmp_hosts.push(temp);
				});
				Vue.set(this.data, 'hosts', tmp_hosts);

			}, function (error) {
				this.loading = false;
				console.log(error);
			});
	},
	methods: {
		...mapActions({
			setAsyncConfirm: 'async_confirm/setAsyncConfirm',
			setMessage: 'app_message/setAppMessage'
		}),
		fetchProducts() {
            const url = api.getEndpointUrl() + '/v1/product/list'
            this.$http.get(url)
            .then(response => {
                const body = response.body
                if (body.success) {
                    const products = body.payload.items
                    var self = this;
                    this.product_options = [];
                    this.product_options.push({
                        id: 0,
                        text: 'By Rate and Route Plan',
                    });
                    products.forEach(function (temp, i) {
                        var product = {};
                        product.id = temp.id;
                        product.text = temp.name;
                        self.product_options.push(product);                        
                    });
                    console.log(this.product_options);
                    
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
		fetchRoutePlans() {
            const url = api.getEndpointUrl() + '/v1/route/plan/list'
            this.$http.get(url)
            .then(response => {
                const body = response.body
                if (body.success) {
                    const route_plans = body.payload.items
                    var self = this;
                    route_plans.forEach(function (temp, i) {
                        var route_plan = {};
                        route_plan.id = temp.route_plan_id;
                        route_plan.text = temp.name;
                        self.route_plan_options.push(route_plan);
                    });
                    console.log(this.route_plan_options);
                    
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
		fetchRateTable () {
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
						self.rate_tables.push(rate_table);
					});
					console.log(this.rate_tables);
					
				}
			})
			.catch(error => {
				console.log(error)
			})
		},
		addRouting() {
            var vm = this;
            this.routings.push({
				product_id: 0,
				tech_prefix: '',
				code: '',
                cps: '',
                cap: '',
                rate_table: vm.rate_tables.length>0? vm.rate_tables[0].id: 0,
                route_plan: vm.route_plan_options.length>0? vm.route_plan_options[0].id: 0,
			});
        },
		reset: function(e) {
			e.preventDefault();
			this.data = {};
			console.log(this.user);
			Vue.set(this.data, 'company', this.user.company);
			Vue.set(this.data, 'username', this.user.username);
			Vue.set(this.data, 'password', this.user.password);
			Vue.set(this.data, 'contact_name', this.user.contact_name);
			Vue.set(this.data, 'main_email', this.user.main_email);
			Vue.set(this.data, 'noc_email', this.user.noc_email);
			Vue.set(this.data, 'rate_send_from_email', this.user.rate_send_from_email);
			Vue.set(this.data, 'rate_send_to_email', this.user.rate_send_to_email);
			Vue.set(this.data, 'billing_address', this.user.billing_address);
			Vue.set(this.data, 'city', this.user.city);
			Vue.set(this.data, 'state', this.user.state);
			Vue.set(this.data, 'zip', this.user.zip);
			Vue.set(this.data, 'country', this.user.country);
			Vue.set(this.data, 'phone', this.user.phone);
			Vue.set(this.data, 'tax_id', this.user.tax_id);
			Vue.set(this.data, 'billing_address', this.user.billing_address);
			Vue.set(this.data, 'billing_city', this.user.billing_city);
			Vue.set(this.data, 'billing_state', this.user.billing_state);
			Vue.set(this.data, 'billing_zip', this.user.billing_zip);
			Vue.set(this.data, 'billing_country', this.user.billing_country);
			Vue.set(this.data, 'billing_contact_name', this.user.billing_contact_name);
			Vue.set(this.data, 'billing_email', this.user.billing_email);
			Vue.set(this.data, 'billing_phone', this.user.billing_phone);
			// Vue.set(this.data, 'hosts', this.user.ip_address);
			var tmp_hosts = [];
			this.user.ip_address.forEach(function(item, i){
				var temp = {};
				temp.ip = item.ip;
				temp.port = item.port;
				temp.id = item.id;
				temp.mask = item.mask;
				tmp_hosts.push(temp);
			});
			Vue.set(this.data, 'hosts', tmp_hosts);

			console.log(this.data.hosts);
		},
		delete_host: function(id){
			this.data.hosts.splice(id, 1);
		},
		addHost: function() {
			this.data.hosts.push({
				ip: '',
				mask: '24',
				port: '',
			});
		},
		validateBeforeSubmit() {
			console.log("validateBeforeSubmit");
			this.$validator.validateAll().then(() => {
				console.log("validator");
				this.loading = true;

				console.log("before api call");

				this.$http.patch(api.getEndpointUrl() + '/v1/regisrtation/' + this.id,
					{
						"company": this.data.company,
						"username": this.data.username,
						"password": this.data.password, // need modify
						"contact_name": this.data.contact_name,
						"main_email": this.data.main_email,
						"send_signup_notification": this.data.send_signup_notification,
						"noc_email": this.data.noc_email,
						"rate_send_from_email": this.data.rate_send_from_email,
						"rate_send_to_email": this.data.rate_send_to_email,
						"address": this.data.address,
						"city": this.data.city,
						"state": this.data.state,
						"zip": this.data.zip,
						"country": this.data.country,
						"phone": this.data.phone,
						// "status": this.data.status,
						"tax_id": this.data.tax_id,
						"billing_address": this.data.billing_address,
						"billing_city": this.data.billing_city,
						"billing_state": this.data.billing_state,
						"billing_zip": this.data.billing_zip,
						"billing_country": this.data.billing_country,
						"billing_contact_name": this.data.billing_contact_name,
						"billing_email": this.data.billing_email,
						"billing_phone": this.data.billing_phone,
						"ip_address": this.data.hosts,
						"company_detail": this.data.company_detail,
						"product_id": this.data.product_id,
						"modified_on": this.data.modified_on, // need modify
						"signed_up_on": this.data.signed_up_on,
					},
					{
						headers: {
							"X-Auth-Token": auth.getToken()
						}
					}
				).then(
					function (response) {
						console.log("success");
						console.log(response);
						this.loading = false;
						this.$router.push('/management/registration');
						this.setMessage('The user description has been modified!');
					},
					function (response) {
						this.loading = false;
						console.log(error);

						this.setMessage({
							message: "Editing user description is failed!",
							type: "error"
						});
					}
				)
			}).catch(() => {
				// eslint-disable-next-line

			});
		},
	}
}
</script>

<style>
table.table.table-striped.table-hover.carrier_groups.hosts td {
	padding-right: 17px;
}

td.select_td {
	width: 300px;
}
</style>
