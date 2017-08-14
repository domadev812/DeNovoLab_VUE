<template>
	<div class="registration_screen">
		<img src="assets/images/logo.png" class="reg_logo center-block text-center">
		<h3 class="center-block text-center">Successful Sign Up</h3>
		<p class="center-block text-center">Thank you for registration!</p>
		<p class="center-block text-center">You will get email notification when your registration is approved.</p>
		<div class="container m-top-20">
			<div class="button_set text-center">
				<router-link to="/auth/login" class="btn btn-default mini">Back to Login</router-link>
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
				
			}
		},
		methods: {
			
		}
	};
</script>