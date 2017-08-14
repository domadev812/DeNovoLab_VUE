<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Configuration</a></li>
				  <li class="breadcrumb-item">
					  <router-link to="/configuration/user_management">User Management</router-link>
				  </li>
				  <li class="breadcrumb-item active">Carrier User</li>
			</ol>
			<h1 class="page-header">{{ componentName }}</h1>
			<router-link to="/configuration/user_management" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad configuration_pad">
				<div class="col-md-12 col-sm-12">
					<form class="form">
						<section class="config_section">
							<h2 class="config_section_name">User Settings</h2>
							<div class="row">
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="username">Username:</label>
											<input type="text" name="username" v-model="user.name" class="form-control" placeholder="Enter Username">
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label>Password:</label>
											<input type="password" name="password" v-model="user.passwd" class="form-control" placeholder="Enter password">
										</div>
									</div>
							    <div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label>Confirm Password:</label>
											<input type="password" name="confirm_password" v-model="confirm_passwd" class="form-control" placeholder="Confirm password">
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="max_lines">Full Name:</label>
											<input type="text" name="full_name" v-model="user.fullname" class="form-control" placeholder="Enter Full Name">
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label>E-mail:</label>
											<input type="email" name="email" v-model="user.email" class="form-control" placeholder="Enter E-mail">
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label>User Type</label>
											<select2 :options="user_types" v-model="user_type_index">
											</select2>
										</div>
									</div>
							  </div>
						  </section>
						  <section class="config_section">
							<h2 class="config_section_name">Carriers Settings</h2>
							<div class="row m-top-20">
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label>Carriers</label>
										<select2 :options="carriers" v-model="carriers_index">
										</select2>
									</div>
								</div>
								<!-- <div class="col-md-4 col-sm-6">
									<div class="form-group m-top-33">
										<div class="checkbox checkbox-success">
											<input id="status" name="status" type="checkbox">
											<label for="status">Status</label>
										</div>
									</div>
								</div> -->
							</div>
						  </section>
						  <section class="config_section">
							<h2 class="config_section_name">Permissions</h2>
							<div class="row m-top-20">
								<div class="col-md-4 col-sm-6">
									<h4 class="config_section_name">Management</h4>
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="account_summary" name="account_summary" v-model="permissions.account_summary" type="checkbox">
											<label for="account_summary">Account Summary</label>
										</div>
									</div>
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="rate_table" name="rate_table" v-model="permissions.rate_table" type="checkbox">
											<label for="rate_table">Rate Table</label>
										</div>
									</div>
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="trunks" name="trunks" v-model="permissions.trunks" type="checkbox">
											<label for="trunks">Trunks</label>
										</div>
									</div>
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="products" name="products" v-model="permissions.products" type="checkbox">
											<label for="products">Products</label>
										</div>
									</div>
								</div>

								<div class="col-md-4 col-sm-6">
									<h4 class="config_section_name">Billing</h4>
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="balance" name="balance" v-model="permissions.balance" type="checkbox">
											<label for="balance">Balance</label>
										</div>
									</div>
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="payment_history" name="payment_history" v-model="permissions.payment_history" type="checkbox">
											<label for="payment_history">Payment History</label>
										</div>
									</div>
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="online_payment" name="online_payment" v-model="permissions.online_payment" type="checkbox">
											<label for="online_payment">Online Payment</label>
										</div>
									</div>
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="invoices" name="invoices" v-model="permissions.invoices" type="checkbox">
											<label for="invoices">Invoices</label>
										</div>
									</div>
								</div>

								<div class="col-md-4 col-sm-6">
									<h4 class="config_section_name">Reports</h4>
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="cdrs_list" name="cdrs_list" v-model="permissions.cdrs_list" type="checkbox">
											<label for="cdrs_list">CDRs List</label>
										</div>
									</div>
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="summary_report" name="summary_report" v-model="permissions.summary_report" type="checkbox">
											<label for="summary_report">Summary Report</label>
										</div>
									</div>
								</div>

								<div class="clearfix little-space"></div>

								<div class="col-md-4 col-sm-6">
									<h4 class="config_section_name">SIP PACKET Search</h4>
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="sip_packet_search" name="sip_packet_search" type="checkbox">
											<label for="sip_packet_search">SIP PACKET Search</label>
										</div>
									</div>
								</div>
							</div>
						  </section>
						  <div class="button_set little-space">
							<a class="btn btn-primary" @click="validateBeforeSubmit()">
								Submit
							</a>
							<a class="btn btn-default" @click="resetUserFields()">
								Reset
							</a>
						  </div>
					</form>
				</div>
				<div class="clearfix little-space"></div>
			</div>
		</div>
	  </div>
	</div>
</template>

<script>
const vSelect = require('vue!../main_components/select.vue')
import { mapGetters, mapActions } from 'vuex'
import api from '../../api'
import auth from '../../auth'

module.exports = {
	name: 'carrier_user_new',
	components: {
		'select2': vSelect
	},
	props: ['editinguser', 'id'],
	data () {
    return {
			emptyUser: {
				active: false,
				user_type: '',
				name: '',
				passwd: '',
				fullname: '',
				email: '',
			},
			user: {},
			user_type_index: 1,
			user_types: [
				{ id: 1, text: 'admin' },
				{ id: 2, text: 'agent' },
				{ id: 3, text: 'client' }
			],
			confirm_passwd: '',
			permissions: {
				account_summary: false,
				rate_table: false,
				trunks: false,
				products: false,
				balance: false,
				payment_history: false,
				online_payment: false,
				invoices: false,
				cdrs_list: false,
				summary_report: false
			},
		  ip: '',
		  carriers_index: 1,
		  carriers: []
    }
  },
	computed: {
		...mapGetters({
			userUrl: 'user_management/userUrl',
			createUserUrl: 'user_management/createUserUrl'
		}),
		componentName () {
			return this.editinguser ? 'Edit Carrier User' : 'New Carrier User'
		}
	},
	created () {
		if (this.editinguser) {
			this.fetchUser()
		} else {
			this.resetUserFields()
		}
		this.fetchCarriers()
	},
	methods: {
		...mapActions({
			setMessage: 'app_message/setAppMessage'
		}),
		resetUserFields () {
			this.user = Object.assign({}, this.emptyUser)
		},
		fetchUser () {
			const url = this.userUrl(this.id)
			this.$http.get(url)
			.then(response => {
				const body = response.body
				if (body.success) {
					const payload = body.payload
					payload.passwd = '*'
					this.user = payload
					this.confirm_passwd = '*'
					let index
					switch (payload.user_type) {
						case 'client':
							index = 3
							break
						case 'agent':
							index = 2
							break
						default:
							index = 1
					}
					this.user_type_index = index
				}
			})
			.catch(error => {
				if (error.status === 404) {
					this.goBackAndNotify('User id ' + this.id + ' does not exist')
				}
				console.log(error)
			})
		},
		fetchCarriers () {
			const url = api.getEndpointUrl() + '/v1/carrier/list'
			this.$http.get(url)
			.then(response => {
				const body = response.body
				if (body.success) {
					this.carriers = body.payload.items.map((elem, index) => {
						return { id: index + 1, text: elem.name }
					})
				}
			})
			.catch(error => {
				console.log(error)
			})
		},
		userForRequest () {
			const user = this.user
			user.user_type = this.user_types[this.user_type_index - 1].text
			return Object.assign({}, user)
		},
		validateBeforeSubmit () {
			// add error message
			if (this.user.passwd !== this.confirm_passwd) { return }
			if (this.editinguser) {
				this.submitUserChanges()
			} else {
				this.createNewCarrierUser()
			}
		},
		submitUserChanges () {
			const url = this.userUrl(this.id)
			const reqBody = this.userForRequest()
			if (reqBody.passwd === '*') { reqBody.passwd = '' }
			this.$http.patch(url, reqBody)
			.then(response => {
				const body = response.body
				if (body.success) {
					this.goBackAndNotify('User was edited successfully')
				}
			})
			.catch(error => {
				console.log(error)
			})
		},
		createNewCarrierUser () {
			const url = this.createUserUrl
			const reqBody = this.userForRequest()
			this.$http.post(url, reqBody)
			.then(response => {
				const body = response.body
				if (body.success) {
					this.goBackAndNotify('Carrier user was created successfully')
				}
			})
			.catch(error => {
				console.log(error)
			})
		},
		getUserUrl () {
			return api.getEndpointUrl() + '/v1/user/' + this.id
		},
		goBackAndNotify (message) {
			this.$router.push('/configuration/user_management')
			this.setMessage(message)
		}
	}
}
</script>

<style>
	.m-top-33 {
		margin-top: 33px;
	}

	@media (max-width: 767px) {
		.m-top-33 {
			margin-top: 10px;
		}
	}
</style>
