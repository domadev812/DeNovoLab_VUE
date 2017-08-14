<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Configuration</a></li>
				  <li class="breadcrumb-item">
					  <router-link to="/configuration/email_sender">Email Sender </router-link>
				  </li>
				  <li class="breadcrumb-item active">New</li>
			</ol>
			<h1 class="page-header">Email Sender Editor</h1>
			<router-link to="/configuration/email_sender" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad">
				<div class="select_group row">
					<div class="col-md-8 col-sm-10">
						<form class="form" @submit.prevent="askAddConfirm">
							<div class="row">
								  <div class="form-group">
									<div class="col-md-3 col-sm-4">
										<label for="groupname">Name:</label>
										<input type="text" name="sendername" v-model="sendername" class="form-control"  :class="{'input': true, 'is-danger': errors.has('sendername') }"  v-validate="'required'" placeholder="Enter Mail Sender Name">
										<span v-show="errors.has('sendername')" class="help is-danger">{{ errors.first('sendername') }}</span>
									</div>
									<div class="col-md-3 col-sm-4">
										<label for="email">Server Email:</label>
										<input type="text" name="mail_server" v-model="mail_server" class="form-control"  :class="{'input': true, 'is-danger': errors.has('mail_server') }"  v-validate="'required'" placeholder="Enter Server Email">
										<span v-show="errors.has('mail_server')" class="help is-danger">{{ errors.first('mail_server') }}</span>
									</div>
									<div class="col-md-3 col-sm-4">
										<label for="email">Server Port:</label>
										<input type="text" name="mail_port" v-model="mail_port" class="form-control"  :class="{'input': true, 'is-danger': errors.has('mail_port') }"  v-validate="'required|numeric'" placeholder="Enter Server Port">
										<span v-show="errors.has('mail_port')" class="help is-danger">{{ errors.first('mail_port') }}</span>
									</div>
								  </div>
								  <div class="clearfix little-space"></div>
								  <div class="form-group">
									  <div class="col-md-3 col-sm-4">
										  	<label for="email">User Name:</label>
											<input type="text" name="username" v-model="username" class="form-control" :class="{'input': true, 'is-danger': errors.has('username') }"  v-validate="'required'" placeholder="Enter UserName">
											<span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</span>
									  </div>
									  <div class="col-md-3 col-sm-4">
										  	<label for="email">Password:</label>
											<input type="password" name="pass" v-model="pass" class="form-control" placeholder="Enter Password">
									  </div>
									  <div class="col-md-3 col-sm-4">
										  	<label>Authentication:</label>
											<!--<select2 :options="authentications" v-model="authen" name="authentication">
											</select2>-->
											<select class="selectable" v-model="authen">
												<option v-for="item in authentications" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
									  </div>
								  </div>
								  <div class="clearfix little-space"></div>
								  <div class="form-group">
									  <div class="col-md-3 col-sm-4">
										  	<label>Secure:</label>
											<!--<select2 :options="secure_options" v-model="secure" name="secure">
											</select2>-->
											<select class="selectable" v-model="secure">
												<option v-for="item in secure_options" v-bind:value="item.id">
													{{ item.text }}
												</option>
											</select>
									  </div>
									  <!-- <div class="col-sm-4">
										  	<label for="email">Secure:</label>
											<input type="text" name="secure" v-model="secure" class="form-control"  :class="{'input': true, 'is-danger': errors.has('secure') }"  v-validate:alias.initial="'required|numeric'" placeholder="Enter Secure number">
											<span v-show="errors.has('secure')" class="help is-danger">{{ errors.first('secure') }}</span>
									  </div> -->
									  <div class="col-md-3 col-sm-4">
										  	<label for="email">Email:</label>
											<input type="text" name="emailaddress" v-model="emailaddress" class="form-control" :class="{'input': true, 'is-danger': errors.has('emailaddress') }"  v-validate="'required|email'"  placeholder="Enter Email Address">
											<span v-show="errors.has('emailaddress')" class="help is-danger">{{ errors.first('emailaddress') }}</span>
									  </div>
								  </div>
							  </div>
							  <div class="button_set little-space">
								<button class="btn btn-primary" type="submit" @click="validateBeforeSubmit">
									Submit
								</button>
								<i v-show="loading" class="fa fa-spinner fa-spin" style="font-size:20px;line-height:40px;"></i>
								<!--<a class="btn btn-default" @click="reset()">
									Reset
								</a>-->
							  </div>
						</form>
					</div>
				</div>
			</div>
		</div>
	  </div>
		<!--<confirm-add v-if="showConfirmAdd" @submit="validateBeforeSubmit()" @close="showConfirmAdd = false"></confirm-add>-->
	</div>
</template>

<script>
	const multiselect = require('multiselect');
	const vvalidate = require('vee-validate');
	const vcarrier = require('vue!../management/carrier.vue');
	const api = require("../../api");
	const auth = require("../../auth");
	const ConfirmAdd = require('vue!../main_components/confirm_add.vue');
	const vSelect = require('vue!../main_components/select.vue');
	const { mapActions } = require('vuex')
	module.exports = {
		name: 'email_sender_new',
		components: {
			'multiselect': multiselect,
			'select2': vSelect,
			'confirm-add': ConfirmAdd
		},
		data () {
      return {
		  		secure_options: [
					{id: 'NO', text: 'NO'},
					{id: 'TLS', text: 'TLS'},
					{id: 'SSL', text: 'SSL'},
				  ],
				groupname: '',
				options: [],
				authen: 1,
				authentications: [
					{ id: 1, text: 'true' },
					{ id: 2, text: 'false' }
				],
				loading: false,
				sendername: '',
				mail_server: '',
				mail_port: '',
				username: '',
				pass: '',
				secure: 'tls',
				emailaddress: '',
				showConfirmAdd: false
      }
    },
		mounted () {
			// console.log("mounted function called");
			$('#carrier').multiSelect({
				selectableHeader: "<div class='custom-header'>Unappropriated</div>",
				selectionHeader: "<div class='custom-header'>Appropriated</div>"
			});
		},
		methods: {
			// reset () {
			//
			// },
			...mapActions({
				setMessage: 'app_message/setAppMessage'
			}),
			askAddConfirm () {
				this.showConfirmAdd = true
			},
			validateBeforeSubmit () {
				console.log('validateBeforeSubmit was executed')
				this.$validator.validateAll().then(() => {
					// var authen = null;
					// if(this.authen == 1) authen = true;
					// else authen = false;
					this.loading = true;
					this.$http.post(api.getEndpointUrl() + '/v1/config/mail_sender/create',
					{
						// "authentication": authen,
						"email": this.emailaddress,
						// "loginemail": auth.getloggedInUser,
						"name": this.sendername,
						"password": this.pass,
						"enable_auth": !!this.authen,
						"secure": this.secure,
						"mail_port": this.mail_port,
						"mail_server": this.mail_server,
						"username": this.username
					})
					.then(response => {
						this.loading = false;
						console.log(response);
						this.$router.push('/configuration/email_sender');
						this.setMessage('Email sender was created successfully')
					})
					.catch((response) => {
						this.loading = false;
					})
				})
				.catch(() => { });
			}
		}
	}
</script>

<style>

	.wrapper.single .white_pad {
    	margin-bottom: 20px;
	}

	.little-space {
		margin: 15px 0;
	}

	.ms-container .ms-selectable, .ms-container .ms-selection {
		width: 47%;
	}

	.button_set.little-space {
		margin-top: 25px;
	}

	.button_set.little-space .btn {
		width: 23%;
	}

	.button_set.little-space .btn-primary {
		margin-right: 2px;
	}

	.btn_white.back {
		color: #222;
		background: #f7f8f9;
		border: 1px solid #e2e6ed;
		box-shadow: 0px 1px 1px 0px rgba(227, 230, 237, 0.74);
		padding: 9px 30px;
		margin-bottom: 20px;
	}

	.btn_white.back:hover {
		background: #fff;
	}

	.btn_white.back .dnl_icon {
		color: #03c0fc;
		font-size: 16px;
		vertical-align: middle;
		margin: -2px 5px 0 -10px;
		display: inline-block;
		transform: rotate(-90deg);
    	font-weight: 900;
	}


	@media (max-width: 480px) {
		.white_pad.select_group {
			width: 100%;
		}

		.clearfix.little-space,
		.button_set.little-space {
			margin: 0;
		}
	}


	@media (min-width: 319px) and (max-width: 479px) {
		.ms-container .ms-selectable,
		.ms-container .ms-selection {
			width: 100%;
			margin-bottom: 20px;
		}

		.ms-container {
			background-position: 50% 48%;
		}

		.ms-selection {
			margin-top: 20px;
		}
	}
</style>
