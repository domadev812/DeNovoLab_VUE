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
						<router-link to="/switch/code_deck">Code Deck </router-link>
					</li>
					<li class="breadcrumb-item active">Edit</li>
				</ol>
				<h1 class="page-header">Edit Code Deck</h1>
				<router-link to="/switch/code_deck" class="btn btn_white back">
					<span class="dnl_icon dnl_import"></span> Back </router-link>
				<div class="white_pad">
					<div class="select_group row">
						<div class="col-md-8 col-sm-8">
							<form class="form" @submit.prevent="validateBeforeSubmit">
								<div class="row">
									<div class="form-group">
										<div class="col-sm-6">
											<label for="groupname">Code Deck Name:</label>
											<input type="text" name="name" v-model="name" class="form-control" v-validate="'required'" placeholder="Enter Name">
											<span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
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
import {mapGetters,	mapActions} from 'vuex'

module.exports = {
	created: function () {
		var code_deck_id = this.$route.params.id;
		var me = this;
		this.$http.get(api.getEndpointUrl() + '/v1/switch/code_deck/' + code_deck_id,
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}
		).then(
			function (response) {
				me.loading = false;
				me.name = response.body.payload.name;
			},
			function (error) {
				me.loading = false;
				console.log(error);
			}
		);

	},
	data: function () {
		return {
			requestForm: {},
			name: "",
		}
	},
	watch: {

	},
	mounted: function () {

	},
	methods: {
		...mapActions({
			setAsyncConfirm: 'async_confirm/setAsyncConfirm',
			setMessage: 'app_message/setAppMessage'
		}),
		validateBeforeSubmit() {
			this.$validator.validateAll().then(() => {
				// eslint-disable-next-line
				var code_deck_id = this.$route.params.id;
				this.loading = true;
				this.requestForm.name = this.name;
				this.$http.patch(api.getEndpointUrl() + '/v1/switch/code_deck/' + code_deck_id,
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

						this.$router.push('/switch/code_deck');
						this.setMessage('The code deck has been modified!');
					},
					function(response) {
						this.loading = false;
						console.log(response);

						this.setMessage({
							message: "Editing code deck is failed!",
							tyep: "error"
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