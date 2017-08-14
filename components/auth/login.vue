<template>
  <div class="login_screen">
	  <transition name="fade">
		  <div  v-if="error" class="alert alert-danger" role="alert">
			  <button type="button" class="close" aria-label="Close" v-on:click="clearError">
				  <span aria-hidden="true">&times;</span>
			  </button>
			  <strong>Warning!</strong> {{error}}
		  </div>
	  </transition>
	  <div class="banner pull-left">
		<div class="banner_description">
			<h1 class="text-center text-center">DeNovo Lab Ltd.</h1>
			<span class="colored center-block text-center">All Telco in a box</span>
			<p class="center-block text-center">Denovolab Providing all the Switching, routing, billing everything at a platform with expert troubleshooting tools.</p>
			<p class="center-block text-center">Visit at portal.denovolab.com to register your trial switch now only in 100$</p>
		</div>
	  </div>
	  <div class="login_form pull-right">
		  <div class="signin_logo">
			<img src="assets/images/logo.png" class="logo center-block text-center">
		  </div>
		  <div class="signin_form">
			  <spinner v-show="loading" class="spinner"></spinner>
				<div v-show="loading" class="mask"></div>
			  <form class="form">
				  <div class="form-group">
					<label for="username">Username:</label>
					<input type="text" name="username" v-model="username" class="form-control" placeholder="Enter your username">
				  </div>
				  <div class="form-group">
					<label for="password">Password:</label>
					<input type="password" name="password" v-model="password" class="form-control" placeholder="Enter your password">
				  </div>
				  <div class="form-group">
					  <div class="row">
						  <div class="col-sm-6 col-xs-6">
							  <div class="checkbox checkbox-success">
								<input id="checkbox" type="checkbox"  v-model="permanent">
								<label for="checkbox">
									Remember me
								</label>
							  </div>
						  </div>
						  <div class="col-sm-6 col-xs-6">
							<router-link to="/auth/reset_password" class="colored pull-right">Forgot password</router-link>
						  </div>
					  </div>
				  </div>
				  <button v-on:click="login" class="btn btn-primary login center-block text-center" type="button">Sign in</button>
				  <p>Not a member yet? <router-link to="/auth/registration" class="colored">Click here </router-link>to register</p>
			  </form>
		  </div>
		  <div class="signin_footer">
			<p class="bottom_copyright center-block text-center">DeNovoLab@2010-2016 All Rights Reserved.</p>
		  </div>
	  </div>
  </div>
</template>

<style>
	.banner {
		width: calc(100% - 418px);
		position: absolute;
		bottom: 0;
		height: 240px;
		background: rgba(0, 0, 0, 0.3);
		padding-top: 30px;
	}

	.banner_description h1 {
		font-size: 44px;
		color: #fff;
		font-family: "RobotoLight";
	}

	.colored {
		color: #96bf07;
		font-size: 14px;
	}

	.banner_description p {
		font-size: 14px;
		color: #b9b9ba;
	}

	.login_screen {
		background: url(/assets/images/login_bg.jpg);
		background-size: cover;
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		overflow: hidden;
	}

	.login_form {
		width: 418px;
		height: 100%;
		background: #fff;
		padding: 40px;
		overflow-y: auto;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-direction: column;
		-ms-flex-direction: column;
		flex-direction: column;
		-webkit-flex-wrap: nowrap;
		-ms-flex-wrap: nowrap;
		flex-wrap: nowrap;
		-webkit-justify-content: space-between;
		-ms-flex-pack: justify;
		justify-content: space-between;
		-webkit-align-content: flex-start;
		-ms-flex-line-pack: start;
		align-content: flex-start;
	}

	.signin_logo,
	.signin_form,
	.signin_footer {
		-webkit-order: 0;
		-ms-flex-order: 0;
		order: 0;
		-webkit-flex: 0 1 auto;
		-ms-flex: 0 1 auto;
		flex: 0 1 auto;
		-webkit-align-self: auto;
		-ms-flex-item-align: auto;
		align-self: auto;
	}

	.signin_form {
		margin: 40px 0;
	}

	p.bottom_copyright {
		font-size: 13px;
		color: #bdbfc6;
		text-align: center;
		margin-bottom: 0;
	}

	.login_form .logo {
		width: 194px;
	}

	input.form-control {
	  border: 1px solid rgb(222, 224, 227);
	  border-radius: 5px;
	  background-color: rgb(255, 255, 255);
	  box-shadow: 0px 2px 7px 0px rgba(184, 187, 196, 0.2);
	  height: 38px;
	}

	.btn.btn-primary.login {
	  border: 1px solid rgb(222, 224, 227);
	  border-radius: 5px;
	  background-color: #96bf07;
	  box-shadow: 0px 2px 7px 0px rgba(184, 187, 196, 0.2);
	  height: 38px;
	  width: 100%;
	  margin-bottom: 18px;
	}

	.btn.btn-primary.login:active,
	.btn.btn-primary.login:focus,
	.btn.btn-primary.login:hover {
		background-color: #a2cc0f;
		border: 1px solid rgb(222, 224, 227);
		outline: none;
	}

	a.colored:hover {
		color: #96bf07;
	}
	
	.checkbox.checkbox-success.pull-right.reg_check {
		margin-top: -32px;
		margin-right: 10px;
	}
	
	@media (min-width: 768px) and (max-width: 979px) {
		.banner {
			height: 250px;
			padding: 12px;
		}
		
		.banner_description h1 {
			font-size: 36px;
		}
	}

	@media (max-width: 767px) {
		.banner {
			display: none;
		}
		
		.login_form {
			width: 100%;
		}
		
		.login_screen {
			background: transparent;
		}
		
	}
	
	@media (max-width: 480px) {
		.login_form .logo {
			width: 150px;
		}
		
		.colored {
			font-size: 13px;
		}
		
		p.bottom_copyright {
			font-size: 11px;
		}
	}
</style>

<script>
    const auth = require('../../auth');
	const vSpinner = require('vue!../main_components/fadeloader.vue');
    module.exports = {
        data: function(){
            return {
                username: "",
                password: "",
                permanent: false,
                error: null,
				loading : false
            }
        },
		components: {
			'spinner': vSpinner
		},
        methods: {
            login: function() {
				this.loading = true;
                auth.login(this.username, this.password, this.permanent, (loggedIn, type, error) => {
					this.loading = false;
                    if (!loggedIn) {
                        this.error = error;
                    } else {
						this.clearError();

						this.$router.replace(this.$route.query.redirect || '/');

						// if (type == 'admin') {
                        // 	this.$router.replace(this.$route.query.redirect || '/');
						// } else if (type == 'client') {
						// 	this.$router.replace(this.$route.query.redirect || '/clients');
						// } else if (type == 'agent') {
						// 	this.$router.replace(this.$route.query.redirect || '/agents');
						// }
                    }
                });
            },
			clearError: function() {
				this.error = null;
			}
        }
    };

    // on error display error
    //validation of fields

</script>