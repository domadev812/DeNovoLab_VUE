<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="#">Switch</a>
					</li>
					<li class="breadcrumb-item">
						<router-link to="/switch/currency">Currency </router-link>
					</li>
					<li class="breadcrumb-item active">Edit</li>
				</ol>
				<h1 class="page-header">Edit Currency</h1>
				<router-link to="/switch/currency" class="btn btn_white back">
					<span class="dnl_icon dnl_import"></span> Back </router-link>
				<div class="white_pad">
					<div class="select_group row">
						<div class="col-md-8 col-sm-8">
							<form class="form" @submit.prevent="validateBeforeSubmit">
								<div class="row">
									<div class="form-group">
										<div class="col-sm-4">
											<label for="groupname">Currency Name:</label>
											<input type="text" name="name" v-model="requestForm.code" class="form-control" v-validate="'required'" placeholder="Enter Name">
											<span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
										</div>
										<div class="col-sm-4">
											<label for="groupname">Rates:</label>
											<input type="text" name="rate" v-model="requestForm.rate" class="form-control" v-validate="'required'" placeholder="Enter Rates">
											<span v-show="errors.has('rate')" class="help is-danger">{{ errors.first('rate') }}</span>
                                        </div>
										<div class="col-sm-4">
                                            <label for="groupname">Active Status:</label>
											<div>
												<input :id="is_active" :name="is_active" style="width:20px;height:20px" type="checkbox" v-model="requestForm.active">
												<label :for="is_active"></label>
											</div>
										</div>
									</div>
									<div class="clearfix little-space"></div>
								</div>
								<div class="button_set little-space">
									<button class="btn btn-primary" type="submit">
										Submit
									</button>
									<i v-show="loading" class="fa fa-spinner fa-spin" style="font-size:20px;line-height:40px;"></i>
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
import {mapActions} from 'vuex'

module.exports = {
	created: function () {
		var currency_id = this.$route.params.id;
		// var vm = this;
		this.$http.get(api.getEndpointUrl() + '/v1/switch/currency/' + currency_id,
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}
		).then(
			function (response) {
				this.loading = false;
				// vm.code = response.body.payload.name;
				// vm.active = response.body.payload.active;
                Vue.set(this.requestForm, 'code', response.body.payload.code);
				Vue.set(this.requestForm, 'rate', response.body.payload.rate);
                Vue.set(this.requestForm, 'active', response.body.payload.active);
			},
			function (error) {
				this.loading = false;
				console.log(error);
			}
		);
	},
	data: function () {
		return {
			requestForm: {},
			// code: "",
			// active: false,
		}
	},
	watch: {

	},
	mounted: function () {

	},
	methods: {
		...mapActions({
			setMessage: 'app_message/setAppMessage'
		}),
		validateBeforeSubmit() {
			this.$validator.validateAll().then(() => {
				// eslint-disable-next-line
				var currency_id = this.$route.params.id;
				// this.requestForm.code = this.code;
				// this.requestForm.active = this.active;
				this.loading = true;
				this.$http.patch(api.getEndpointUrl() + '/v1/switch/currency/' + currency_id,
					this.requestForm,
					{
						headers: {
							"X-Auth-Token": auth.getToken()
						}
					}
				).then(
					function(response) {
						this.loading = false;
						console.log(response);
						this.$router.push('/switch/currency');
						this.setMessage('The currency has been modified!');
					},
					function(response) {
						this.loading = false;
						console.log(response);

						this.setMessage({
							message:"Editing currency is failed!",
							type:"error"
						});
					}
				)
			}).catch(() => {
				// eslint-disable-next-line

			});
		}
	}
}
</script>

<style>

</style>