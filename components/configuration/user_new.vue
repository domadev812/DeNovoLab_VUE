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
				  <li class="breadcrumb-item active">New User</li>
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
											<input type="text" name="username" v-model="user.name" class="form-control" :class="{'input': true, 'is-danger': errors.has('username') }" v-validate="'required'" placeholder="Enter Username">
											<span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</span>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="passwd">Password:</label>
											<input type="password" name="passwd" v-model="user.passwd" class="form-control" placeholder="Enter password">
										</div>
									</div>
								    <div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="confirm_passwd">Confirm Password:</label>
											<input type="password" name="confirm_passwd" v-model="confirm_passwd" class="form-control" placeholder="Confirm password">
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="max_lines">Full Name:</label>
											<input type="text" name="fullname" v-model="user.fullname" class="form-control" :class="{'input': true, 'is-danger': errors.has('fullname') }" v-validate="'required'" placeholder="Enter Full Name">
											<span v-show="errors.has('fullname')" class="help is-danger">{{ errors.first('fullname') }}</span>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label>E-mail:</label>
											<input type="email" name="email" v-model="user.email" class="form-control" :class="{'input': true, 'is-danger': errors.has('email') }" v-validate="'required|email'" placeholder="Enter E-mail">
											<span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label>User Type</label>
											<select2 :options="user_types" v-model="user_type_index">
											</select2>
										</div>
									</div>
									<div class="clearfix hide-sm"></div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label>Landing Pages:</label>
											<select2 :options="landing_pages" v-model="landing_page_index">
											</select2>
										</div>
									</div>
									<div class="col-md-4 col-sm-6" v-for="(landing_page_options, key) in landing_pages_options" v-if="getSelectedLandingPage().toLowerCase() === key">
										<div class="form-group">
											<label class="empty_label"></label>
											<select2 :options="landing_page_options" v-model="landing_page_option_index">
											</select2>
										</div>
									</div>
							  </div>
						  </section>
						  <section class="config_section">
							<h2 class="config_section_name">User Role Settings</h2>
							<div class="row m-top-20">
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="report_group" name="report_group" type="checkbox" v-model="user.report_group">
											<label for="report_group">Enable Reporting Grouping</label>
										</div>
										<div class="checkbox checkbox-success">
											<input id="outbound_report" name="outbound_report" type="checkbox" v-model="user.outbound_report">
											<label for="outbound_report">Enable Outbound Report</label>
										</div>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<div class="checkbox checkbox-success">
											<input id="all_termination" name="all_termination" type="checkbox" v-model="user.all_termination">
											<label for="all_termination">Allow Termination Tab</label>
										</div>
										<div class="checkbox checkbox-success">
											<input id="active" name="active" type="checkbox" v-model="user.active">
											<label for="active">Active</label>
										</div>
									</div>
								</div>
								<div class="clearfix little-space"></div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label>Role:</label>
										<select2 :options="roles" v-model="roles_index">
										</select2>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label>IP:</label>
										<input type="text" name="ip" v-model="ip" class="form-control" placeholder="Enter IP">
									</div>
								</div>
								<div class="clearfix little-space">
									<div class="clearfix little-space"></div>
								  <div class="form-group">
									  <div class="col-md-8 col-sm-12">
										  <select multiple="multiple" id="user_groups" name="group">
											<option v-for="group in groups" :value='group.value'>{{group.text}}</option>
										  </select>
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
const multiselect = require('multiselect')
import { mapGetters, mapActions } from 'vuex'
import { landing_pages, landing_pages_options } from './app_menu.js'
const api = require("../../api");
module.exports = {
	name: 'user_new',
	components: {
		'select2': vSelect,
		'multiselect': multiselect
	},
	props: ['editinguser', 'id'],
	data () {
    return {
			emptyUser: {
				report_group: false,
				outbound_report: false,
				all_termination: false,
				active: false,
				user_type: '',
				name: '',
				passwd: '',
				fullname: '',
				email: '',
				role: ''
			},
			// [option name]_index have the id of the selected [option name] to be parsed into the real value.
			user: {},
			confirm_passwd: '',
		  ip: '',
			user_type_index: 1,
			user_types: [
				{ id: 1, text: 'admin' },
				{ id: 2, text: 'agent' },
				{ id: 3, text: 'client' }
			],
			landing_page_index: 1,
			landing_pages,
			landing_page_option_index: 1,
			landing_pages_options,
			roles_index: 1,
			roles: [],
		  groupname: '',
		  groups: [
			  { id: 1, value: 'carrier1', text: 'Carrier 1' },
			  { id: 2, value: 'carrier2', text: 'Carrier 2' },
			  { id: 3, value: 'carrier3', text: 'Carrier 3' },
			  { id: 4, value: 'carrier4', text: 'Carrier 4' },
			  { id: 5, value: 'carrier5', text: 'Carrier 5' }
		  ]
    }
  },
	computed: {
		...mapGetters({
			userUrl: 'v1/user/',
			createUserUrl: 'v1/user/create',
			roleListUrl: 'v1/user_management/roleListUrl'
		}),
		componentName () {
			return this.editinguser ? 'Edit User' : 'New User'
		}
	},
	created () {
		if (this.editinguser) {
			this.fetchUser()
		} else {
			this.resetUserFields()
		}
		this.fetchRoles()
	},
	mounted () {
		$('#user_groups').multiSelect({
			 selectableHeader: "<div class='custom-header'>User Group</div>",
			 selectionHeader: "<div class='custom-header'>User Group</div>"
		});
	},
	methods: {
		...mapActions({
			setMessage: 'app_message/setAppMessage'
		}),
		resetUserFields () {
			this.user = Object.assign({}, this.emptyUser)
		},
		getSelectedLandingPage () {
			return this.landing_pages[this.landing_page_index - 1].text
		},
		userForRequest () {
			const user = this.user
			const selected_landing_page = this.getSelectedLandingPage()
			user.landing_page = selected_landing_page
			user.landing_page_option = this.landing_pages_options[selected_landing_page.toLowerCase()]
			user.user_type = this.user_types[this.user_type_index - 1].text
			user.roles = this.roles[this.roles_index - 1].text
			return Object.assign({}, user)
		},
		saveUserInfo() {
			// add form validations with vee-validate.
			if (this.user.passwd !== this.confirm_passwd) { return }
			if (this.editinguser) {
				this.submitUserChanges()
			} else {
				this.createNewUser()
			}
		},
		validateBeforeSubmit () {
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
					vm.saveUserInfo();
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
		createNewUser () {
			const url = api.getEndpointUrl() + '/v1/user/create'
			const reqBody = this.userForRequest()
			this.$http.post(url, reqBody)
			.then(response => {
				const body = response.body
				if (body.success) {
					this.goBackAndNotify('User was created successfully')
				}
			})
			.catch(error => {
				console.log(error)
			})
		},
		fetchUser () {
			const url = api.getEndpointUrl() + '/v1/user/' + this.id
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
					this.goBackAndNotify({
						message: 'User id ' + this.id + ' does not exist',
						type: 'error'
					})
				}
				console.log(error)
			})
		},
		fetchRoles () {
			const url = api.getEndpointUrl() + '/v1/config/role/list'
			this.$http.get(url)
			.then(response => {
				const body = response.body
				if (body.success) {
					this.roles = body.payload.items.map((elem, index) => {
						return { id: index + 1, text: elem.role_name }
					})
				}
			})
			.catch(error => {
				console.log(error)
			})
		},
		submitUserChanges () {
			const url = api.getEndpointUrl() + '/v1/user/' + this.id
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
		goBackAndNotify (message) {
			this.$router.push('/configuration/user_management')
			this.setMessage(message)
		}
	}
}
</script>

<style>
	label.empty_label {
		margin-top: 15px;
	}

	@media (max-width: 767px) {
		label.empty_label {
			margin-top: 0;
		}
	}
</style>
