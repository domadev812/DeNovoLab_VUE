<template>
	<div>
	  <ul class="admin-menu nav navbar-nav navbar-right" v-if="user_type === 'admin'">
		<li>
			<a href="#">
				<span class="dnl_icon dnl_import"></span>
				<span class="badge empty">0</span>
			</a>
		</li>
		<li>
			<router-link to="/statistics/dashboard/alert">
				<span class="dnl_icon dnl_ring"></span>
				<span class="badge">20</span>
			</router-link>
		</li>
		<li class="dropdown user_drop">
			<a href="#" class="user_box dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
				<img src="https://pp.vk.me/c633326/v633326958/15cd0/EaYCK6gaXoc.jpg" class="avatar_icon"/>
				<span class="hidden-xs">Administrator</span>
				<span class="caret hidden-xs"></span>
				<div class="visible-xs circle_container">
					<span class="circle"></span>
					<span class="circle"></span>
					<span class="circle"></span>
				</div>
			</a>
			<ul class="dropdown-menu">
				<li>
					<a @click="showModal = 'change_pass'">
						<span class="dnl_icon dnl_setting"></span>Change Password
					</a>
				</li>
				<li>
					<a @click="showModal = 'get_support'">
						<span class="dnl_icon dnl_support"></span>Get Support
					</a>
				</li>
				<li>
					<a href="#">
						<span class="dnl_icon dnl_info"></span>Help
					</a>
				</li>
				<li class="log_button text-center">
					<router-link to="/logout">Logout</router-link>
				</li>
			</ul>
		</li>
		<modal v-if="showModal=='change_pass'" @close="showModal = ''">
			<h3 slot="header">Change Password</h3>
			<div slot="body">
			  <div class="">
				  <form class="form">
					  <div class="form-group">
						<label for="old_password">Old Password:</label>
						<input type="password" name="old_password" v-model="old_password" class="form-control" placeholder="Enter your password">
					  </div>
					  <div class="form-group">
						<label for="new_password">New Password:</label>
						<input type="password" name="new_password" v-model="new_password" class="form-control" placeholder="Enter your new password">
					  </div>
					  <div class="form-group">
						<label for="confirm_password">Confirm Password:</label>
						<input type="password" name="confirm_password" v-model="confirm_password" class="form-control" placeholder="Confirm your new password">
					  </div>
				  </form>
			  </div>
			</div>
			<div slot="footer">
				<button @click="submitNewPass" class="btn btn-primary submit">Submit</button>
				<button @click="closeModal" class="btn btn-default cancel">Cancel</button>
			</div>
		</modal>
		<modal v-else-if="showModal=='get_support'" @close="showModal = ''">
			<h3 slot="header">Get Support</h3>
			<div slot="body">
			  <div class="">
				  <form class="form">
					  <div class="form-group">
						<label for="subject">Subject:</label>
						<input type="text" name="subject" v-model="subject" class="form-control" placeholder="Enter subject">
					  </div>
					  <div class="form-group">
						<label for="message">Content:</label>
						<textarea name="message" v-model="message" class="form-control" placeholder="Enter message"></textarea>
					  </div>
				  </form>
			  </div>
			</div>
			<div slot="footer">
				<button @click="submitSupportTicket" class="btn btn-primary submit">Submit</button>
				<button @click="closeModal" class="btn btn-default cancel">Cancel</button>
			</div>
		</modal>
	  </ul>
	  <ul class="client-menu nav navbar-nav navbar-right" v-if="user_type === 'client'">
		<li>
			<router-link to="/statistics/dashboard/alert">
				<span class="dnl_icon dnl_ring"></span>
				<span class="badge">20</span>
			</router-link>
		</li>
		<li>
			<a href="#">
				<span class="dnl_icon dnl_qos_report"></span>
				<span class="badge empty">0</span>
			</a>
		</li>
		<li>
			<a href="#">
				<span class="dnl_icon dnl_email"></span>
				<span class="badge">2</span>
			</a>
		</li>
		<li class="dropdown user_drop">
			<a href="#" class="user_box dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
				<img src="https://pp.vk.me/c633326/v633326958/15cd0/EaYCK6gaXoc.jpg" class="avatar_icon"/>
				<span class="hidden-xs">Administrator</span>
				<span class="caret hidden-xs"></span>
				<div class="visible-xs circle_container">
					<span class="circle"></span>
					<span class="circle"></span>
					<span class="circle"></span>
				</div>
			</a>
			<ul class="dropdown-menu">
				<li>
					<a @click="showModal = 'change_pass'">
						<span class="dnl_icon dnl_setting"></span>Change Password
					</a>
				</li>
				<li>
					<a @click="showModal = 'get_support'">
						<span class="dnl_icon dnl_support"></span>Get Support
					</a>
				</li>
				<li>
					<a href="#">
						<span class="dnl_icon dnl_info"></span>Help
					</a>
				</li>
				<li class="log_button text-center">
					<router-link to="/logout">Logout</router-link>
				</li>
			</ul>
		</li>
		<modal v-if="showModal=='change_pass'" @close="showModal = ''">
			<h3 slot="header">Change Password</h3>
			<div slot="body">
			  <div class="">
				  <form class="form">
					  <div class="form-group">
						<label for="old_password">Old Password:</label>
						<input type="password" name="old_password" v-model="old_password" class="form-control" placeholder="Enter your password">
					  </div>
					  <div class="form-group">
						<label for="new_password">New Password:</label>
						<input type="password" name="new_password" v-model="new_password" class="form-control" placeholder="Enter your new password">
					  </div>
					  <div class="form-group">
						<label for="confirm_password">Confirm Password:</label>
						<input type="password" name="confirm_password" v-model="confirm_password" class="form-control" placeholder="Confirm your new password">
					  </div>
				  </form>
			  </div>
			</div>
			<div slot="footer">
				<button @click="submitNewPass" class="btn btn-primary submit">Submit</button>
				<button @click="closeModal" class="btn btn-default cancel">Cancel</button>
			</div>
		</modal>
		<modal v-else-if="showModal=='get_support'" @close="showModal = ''">
			<h3 slot="header">Get Support</h3>
			<div slot="body">
			  <div class="">
				  <form class="form">
					  <div class="form-group">
						<label for="subject">Subject:</label>
						<input type="text" name="subject" v-model="subject" class="form-control" placeholder="Enter subject">
					  </div>
					  <div class="form-group">
						<label for="message">Content:</label>
						<textarea name="message" v-model="message" class="form-control" placeholder="Enter message"></textarea>
					  </div>
				  </form>
			  </div>
			</div>
			<div slot="footer">
				<button @click="submitSupportTicket" class="btn btn-primary submit">Submit</button>
				<button @click="closeModal" class="btn btn-default cancel">Cancel</button>
			</div>
		</modal>
	  </ul>
	</div>
</template>

<style>
	div#navbar .client-menu.nav>li>a span.dnl_icon {
		color: #8eb50b;
	}

	img.avatar_icon {
		width: 35px;
		height: 35px;
		border-radius: 50%;
	}
	
	.user_box span {
		color: #fff;
		margin-left: 5px;
	}
	
	a.user_box span.caret {
		color: #94999e;
	}
	
	div#navbar .nav>li>a span.dnl_icon {
		font-size: 21px;
		display: inline-block;
    	vertical-align: top;
	}
	
	div#navbar .nav>li>a.user_box {
		padding: 18px 10px;
		margin-top: -10px;
	}
	
	ul.admin-menu.nav.navbar-nav.navbar-right .badge {
		margin-left: -10px;
		margin-top: -10px;
		font-size: 12px;
		background: #03c0fc;
	}

	ul.client-menu.nav.navbar-nav.navbar-right .badge {
		margin-left: -10px;
		margin-top: -10px;
		font-size: 12px;
		background: #fff;
		color: #565d67;
	}
	
	ul.nav.navbar-nav.navbar-right .badge.empty {
		background: #565d67;
		color: #fff;
	}

	/*ul.client-menu.nav.navbar-nav.navbar-right .badge.empty {
		background: #222b37;
	}*/
	
	.log_button {
	  border: 1px solid rgb(69, 73, 78);
	  border-radius: 5px;
	  background: #3c4045;
	  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.74);
	  margin-top: 10px;
	}
	
	li.dropdown.user_drop .dropdown-menu {
		padding: 10px 20px 15px 20px;
		margin-top: 0;
	}
	
	li.dropdown.user_drop .dropdown-menu .dnl_icon {
		font-size: 21px;
		vertical-align: text-bottom;
		margin-right: 8px;
	}
	
	li.dropdown.user_drop .dropdown-menu .dnl_icon.dnl_support {
		font-size: 17px;
	}
	
	li.dropdown.user_drop .dropdown-menu>li>a {
		padding: 8px 0px;
    	cursor: pointer;
	}
	
	li.dropdown.user_drop.open a.user_box {
		background: #262a30;
	}
	
	.btn.btn-default {
		border: 1px solid #72757a;
		border-radius: 5px;
		background-color: #72757a;
		box-shadow: 0px 2px 7px 0px rgba(184, 187, 196, 0.2);
		height: 38px;
		width: 198px;
		color: #fff;
		line-height: 23px;
	}
	
	.btn.btn-default:hover,
	.btn.btn-default:focus,
	.btn.btn-default.active {
		border: 1px solid #8a8d92;
		background-color: #8a8d92;
		color: #fff;
		outline: none;
	}
	
	button.btn.btn-primary.submit {
		width: 48%;
		display: inline-block;
		margin-right: 1%;
	}

	button.btn.btn-default.cancel {
		width: 48%;
		display: inline-block;
	}
	
	textarea.form-control {
		border-radius: 5px;
		background-color: rgb(255, 255, 255);
		box-shadow: 0px 2px 7px 0px rgba(184, 187, 196, 0.2);
		height: 116px;
		resize: none;
	}
	
	@media (max-width: 767px) {
		.modal-mask .modal-container {
			width: 97%;
    		padding: 20px 20px;
		}
		
		ul.nav.navbar-nav.navbar-right.visible-xs>li {
			display: inline-block;
			vertical-align: middle;
		}
		
		ul.nav.navbar-nav.navbar-right {
			margin-right: 10px;
			margin: 0;
			float: right;
		}
		
		ul.nav.navbar-nav.navbar-right.visible-xs>li .dnl_icon{
			font-size: 17px;
			margin-top: 4px;
    		display: inline-block;
		}
		
		.dropdown.user_drop a img.avatar_icon {
			width: 30px;
			height: 30px;	
		}
		
		.navbar-inverse .navbar-nav>li>a {
			padding: 10px 5px;
		}
		
		.navbar-inverse .navbar-nav>li.dropdown.user_drop>a {
			padding: 10px 14px;
		}
		
		span.circle {
			width: 4px;
			height: 4px;
			background: #fff;
			display: block;
			border-radius: 4px;
			margin-top: 3px;
		}
		
		.visible-xs.circle_container {
			float: right;
			margin-left: 5px;
			margin-top: 3px;
		}
		
		ul.nav.navbar-nav.navbar-right.visible-xs>li.open {
			vertical-align: top;
		}
	}

		
</style>

<script>
	const modal = require('vue!./modal.vue');
	const auth = require('../../auth');

	module.exports = {
		data: function(){
			return {
				showModal: '',
				old_password: '',
				new_password: '',
				confirm_password: '',
				subject: '',
				message: '',
				user_type: ''
			}
		},
		methods: {
			submitNewPass: function(){

			},
			submitSupportTicket: function(){

			},
			closeModal: function() {
				this.showModal = '';
			}
		},
		components: {
			'modal': modal
		},
		created () {
			this.user_type = auth.getType();
		},
		updated () {
			this.user_type = auth.getType();
		}

	}
</script>