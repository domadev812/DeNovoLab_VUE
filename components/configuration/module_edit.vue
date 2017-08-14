<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Configuration</a></li>
				  <li class="breadcrumb-item">
					  <router-link to="/configuration/modules">Modules</router-link>
				  </li>
				  <li class="breadcrumb-item active">New</li>
			</ol>
			<h1 class="page-header">Module Editor</h1>
			<router-link to="/configuration/modules" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad">
				<div class="select_group row">
					<div class="col-md-6 col-sm-8">
						<form class="form">
							<div class="row">
								  <div class="form-group">
									<div class="col-sm-6">
										<label for="module_name">Module Name:</label>
										<input type="text" name="module_name" v-model="module_name" class="form-control" placeholder="Enter module name">
									</div>
								  </div>
								  <div class="clearfix little-space"></div>
								  <div class="form-group">
									  <div class="col-sm-6">
										<label for="order_number">Order Number:</label>
										<input type="text" name="order_number" v-model="order_number" class="form-control" placeholder="Enter order number">
									  </div>
								  </div>
							  </div>
							  <div class="button_set little-space">
								<a class="btn btn-primary">
									Submit
								</a>
								<a class="btn btn-default">
									Reset
								</a>
							  </div>
						</form>
					</div>
				</div>
			</div>
		</div>
	  </div>
	</div>
</template>

<script>   
const api = require("../../api");
const auth = require("../../auth");
	module.exports = {
		data: function(){
			return {
			  module_name: '',
			  order_number: '',
			}
		},
		created () {
			this.fetchModule();
		},
		methods: {
			fetchModule () {
				var id = this.$route.params.id;
				var me = this;
				this.$http.get(api.getEndpointUrl() + '/v1/config/system_function/' + id,
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}
				).then(
					function (response) {
						me.loading = false;

						me.module_name = response.body.payload.func_name;
					},
					function (error) {
						me.loading = false;
						console.log(error);
					}
				);
			}
		}
	}
</script>

<style>

</style>
