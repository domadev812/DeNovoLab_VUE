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
						<router-link to="/management/products">Products</router-link>
					</li>
					<li class="breadcrumb-item active">New</li>
				</ol>
				<h1 class="page-header">Product Editor</h1>
				<router-link to="/management/products" class="btn btn_white back">
					<span class="dnl_icon dnl_import"></span> Back </router-link>
					<form class="form" @submit.prevent="validateBeforeSubmit">
				<div class="white_pad product_add">
					<div class="row">
						<div class="col-md-3 col-sm-4">
							<div class="form-group">
								<label for="groupname">Product Name:</label>
								<input type="text" name="groupname" v-model="name" class="form-control" placeholder="Enter Produt Name">
							</div>
						</div>
						<div class="col-md-3 col-sm-4">
							<div class="form-group">
								<div class="form-group">
									<label>Routing Plan:</label>
									<select class="selectable" v-model="plan">
										<option v-for="item in routing_plan" v-bind:value="item.id">
											{{ item.text }}
										</option>
									</select>
								</div>
							</div>
						</div>
						<!--<div class="col-md-1 col-sm-2">
							<div class="inline_actions">
								<a>
									<span class="dnl_icon dnl_add"></span>
								</a>
								<a>
									<span class="dnl_icon dnl_reload"></span>
								</a>
							</div>
						</div>-->
						<div class="clearfix little-space"></div>
						<div class="col-md-3 col-sm-4">
							<div class="form-group">
								<label for="techprefix">Tech Prefix:</label>
								<input type="text" name="techprefix" v-model="techprefix" class="form-control" placeholder="Enter Tech Prefix">
							</div>
						</div>
						<div class="col-md-3 col-sm-4">
							<div class="form-group">
								<div class="form-group">
									<label>Rate Tables:</label>
									<select class="selectable" v-model="rate_table">
										<option v-for="item in rate_tables" v-bind:value="item.id">
											{{ item.text }}
										</option>
									</select>
								</div>
							</div>
						</div>
						<!--<div class="col-md-1 col-sm-2">
							<div class="inline_actions">
								<a>
									<span class="dnl_icon dnl_add"></span>
								</a>
								<a>
									<span class="dnl_icon dnl_reload"></span>
								</a>
							</div>
						</div>-->
						<div class="clearfix little-space"></div>
						<div class="col-md-3 col-sm-4">
							<div class="form-group">
								<div class="checkbox checkbox-success">
									<input id="set_private" name="set_private" type="checkbox" v-model="set_private">
									<label for="set_private">Set Private</label>
								</div>
							</div>
						</div>
						<div class="clearfix little-space"></div>
						<div class="col-md-6 col-sm-6">
							<div class="form-group">
								<label for="description">Description:</label>
								<textarea name="description" v-model="description" class="form-control" placeholder="Enter Description"/>
							</div>
						</div>
						<div class="clearfix little-space"></div>
						<div class="col-md-6 col-sm-8">
							<div class="form-group">
								<label for="carriers">Assigned to Carriers:</label>
								<!--<select multiple="multiple" id="carrier" name="carrier">
									<option v-for="option in options" :value='option.value'>{{option.text}}</option>
								</select>-->
								<el-transfer v-model="carriers" :titles="['Carriers', 'Selected Carriers']" :data="options">
								</el-transfer>
							</div>
						</div>
					</div>
					<div class="button_set little-space">
						<button class="btn btn-primary" style="width: 198px" type="submit">
							Submit
						</button>
						<a class="btn btn-default" style="width: 198px" @click="reset">
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
const multiselect = require('multiselect'),
	vSelect = require('vue!../main_components/select.vue');
const api = require("../../api");
const auth = require("../../auth");
import {mapActions} from 'vuex'

module.exports = {
	components: {
		'multiselect': multiselect,
		'select2': vSelect
	},
	data: function () {
		return {
			description: '',
			name: '',
			techprefix: '',
			plan: '',
			rate_table: '',
			carriers: [],
			set_private: false,
			options: [],
			rate_tables: [],
			routing_plan: [],
		}
	},
	mounted: function () {

	},
	created: function () {
		console.log("products new created");
		this.loading = true;

		this.$http.get(api.getEndpointUrl() + '/v1/switch/rate_table/list',
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function (response) {
				this.loading = false;
				//todo: check success flag? validation errors?
				var rate_tables = response.body.payload.items;
				console.log(rate_tables);
				var self = this;
				rate_tables.forEach(function (item, i) {
					var rate_table = {};
					rate_table.id = item.rate_table_id;
					rate_table.text = item.name;
					self.rate_tables.push(rate_table);
				});
				console.log(this.rate_tables);
				if(this.rate_tables.length > 0)
					this.rate_table = this.rate_tables[0].id;
			}, function (error) {
				this.loading = false;
				console.log(error);
			});

		this.loading = true;

		this.$http.get(api.getEndpointUrl() + '/v1/route/plan/list',
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function (response) {
				this.loading = false;
				//todo: check success flag? validation errors?
				var routing_plan = response.body.payload.items;
				console.log(routing_plan);
				var self = this;
				routing_plan.forEach(function (item, i) {
					var temp = {};
					temp.id = item.route_plan_id;
					temp.text = item.name;
					self.routing_plan.push(temp);
				});
				console.log(this.routing_plan);
				if(this.routing_plan.length > 0)
					this.plan = this.routing_plan[0].id;
			}, function (error) {
				this.loading = false;
				console.log(error);
			});

		this.$http.get(api.getEndpointUrl() + '/v1/carrier/list',
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function (response) {
				this.loading = false;
				//todo: check success flag? validation errors?
				var carrier_list = response.body.payload.items;
				console.log(carrier_list);
				var self = this;
				carrier_list.forEach(function (item, i) {
					var temp = {};
					temp.key = item.client_id;
					temp.label = item.name;
					self.options.push(temp);
				});
				console.log(this.options);
			}, function (error) {
				this.loading = false;
				console.log(error);
			});
			
	},
	methods: {
		...mapActions({
			setMessage: 'app_message/setAppMessage'
		}),
		reset() {
			console.log("reset");
			this.name = '';
			this.plan = this.routing_plan.length > 0 ? this.routing_plan[0].id: '';
			this.techprefix = '';
			this.rate_table = this.rate_tables.length > 0 ? this.rate_tables[0].id: '';
			this.set_private = false;
			this.description = '';
			this.carriers = [];

		},
		createProduct() {
			this.loading = true;

			console.log("before api call");
			var type = "public";
			if (this.set_private) {
				type = "private";
			}

			console.log("type:", type, " description:", this.description, " clients:", this.carriers, " rate_table_id:", this.rate_table,
			" tech_prefix:", this.techprefix, " name:", this.name, " route_plan_id:", this.plan, " set_private:", this.set_private);

			this.$http.post(api.getEndpointUrl() + '/v1/product/create',
				{
					"name": this.name,
					"type": type,
					"rate_table_id": this.rate_table,
					"route_plan_id": this.plan,
					"tech_prefix": this.techprefix,
					"description": this.description,
					"allowed_clients": this.carriers
				},
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}
			).then(response => {
				if (response.body.success) {
					this.setMessage('Product was changed successfully');
					var thisvm = this;
					setTimeout(function(){
						thisvm.$router.push('/management/products');
					}, 3000);
				}
			})
			.catch(error => {
				console.log(error)
				this.setMessage({
					message: 'Failed to create product',
					type: 'error'
				})
			})
		},
        validateBeforeSubmit() {
			console.log("validateBeforeSubmit");
			var vm = this;
			this.$validator.validateAll().then(() => {
				const err = this.$validator.getErrors();
				if (err.errors.length > 0) {
					vm.setMessage({
						message: 'Validation failed',
						type: 'error'
					})
				}
				else {
					vm.createProduct();
				}
					
			}).catch((error) => {
				// eslint-disable-next-line
				console.log(error)
				vm.setMessage({
					message: 'Validation failed',
					type: 'error'
				})
			});
        },
    }
}
</script>

<style>
.product_add .checkbox-success input[type="checkbox"]:checked+label::before {
	background-color: #03c0fc;
	border-color: #03c0fc;
}

.inline_actions {
	margin-top: 33px;
	margin-left: -10px;
}

.inline_actions a {
	font-size: 18px;
	color: #03c0fc;
	margin-right: 5px;
	cursor: pointer;
}

.inline_actions a:hover {
	text-decoration: none;
}

@media (max-width: 767px) {
	.inline_actions {
		margin-top: 0;
		margin-left: 0;
		margin-bottom: 20px;
		text-align: center;
	}
}
</style>
