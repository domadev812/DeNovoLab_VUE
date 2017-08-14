<template>
	<div class="registration_screen">
		<img src="assets/images/logo.png" class="reg_logo center-block text-center">
		<h3 class="center-block text-center">Reset Password</h3>
		<p class="center-block text-center">Please enter your username.</p>
		<p class="center-block text-center">We will reset your password and e-mail to you.</p>
		<div class="container">
			<div class="reg_form_wrapper">
				<form class="form">
					<section class="reg_form_section">
						<div class="row">
							<div class="col-md-4 col-sm-6 col-xs-12 col-md-push-4 col-sm-push-3">
								<div class="form-group">
									<label for="username">Username:</label>
									<input type="text" name="username" class="form-control" v-model="username">
								</div>
							</div>
						</div>
					</section>
					<div class="button_set text-center">
						<a class="btn btn-primary mini">Reset Password</a> 
						<router-link to="/auth/login" class="btn btn-default mini">Back to Login</router-link>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<style>
	
</style>

<script>
	module.exports = {
		data: function () {
			return {
				username: ''
			}
		},
		methods: {
			
		}
	};
</script>