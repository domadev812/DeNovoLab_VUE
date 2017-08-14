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
						<router-link to="/switch/voip_gateway">VoIP Gateway </router-link>
					</li>
					<li class="breadcrumb-item active">Edit</li>
				</ol>
				<h1 class="page-header">Edit VoIP Gateway</h1>
				<router-link to="/switch/voip_gateway" class="btn btn_white back">
					<span class="dnl_icon dnl_import"></span> Back </router-link>
				<div class="white_pad">
					<div class="select_group row">
						<div class="col-md-8 col-sm-8">
							<form class="form" @submit.prevent="validateBeforeSubmit">
								<div class="row">
									<div class="form-group">
										<div class="col-sm-4">
											<label for="groupname">Name:</label>
											<input type="text" name="name" v-model="name" class="form-control" v-validate="'required'" placeholder="Enter Name">
											<span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
										</div>
										<div class="col-sm-8">
											<div class="col-sm-12">
												<label for="groupname">CLI IP:</label>
											</div>
											<div>
												<div class="col-sm-6">
													<input type="text" name="info_ip" v-model="info_ip" class="form-control" v-validate="'required'" placeholder="Enter Info IP">
													<span v-show="errors.has('info_ip')" class="help is-danger">{{ errors.first('info_ip') }}</span>
												</div>
											</div>
										</div>
									</div>
									<div class="clearfix little-space"></div>
								</div>
								<div class="row">
									<div class="form-group">
										<div class="col-sm-4">
											<label for="groupname">CLI Port:</label>
											<input type="text" name="info_port" v-model="info_port" class="form-control" v-validate="'required'" placeholder="Enter Info Port">
											<span v-show="errors.has('info_port')" class="help is-danger">{{ errors.first('info_port') }}</span>
										</div>
										<!--<div class="col-sm-8">
											<div class="col-sm-12">
												<label for="groupname">Info Paid Replace IP:</label>
											</div>
											<div>
												<div class="col-sm-6">
													<input type="text" name="paid_replace_ip" v-model="paid_replace_ip" class="form-control" v-validate="'required'" placeholder="Enter Paid Replace IP">
													<span v-show="errors.has('paid_replace_ip')" class="help is-danger">{{ errors.first('paid_replace_ip') }}</span>
												</div>
											</div>
										</div>-->
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
const multiselect = require('multiselect');
const vSelect = require('vue!../main_components/select.vue');
const vvalidate = require('vee-validate');
const vcarrier = require('vue!../management/carrier.vue'),
	modal = require('vue!../main_components/modal.vue');

const api = require("../../api");
const auth = require("../../auth");
	import {
		mapActions
	} from 'vuex'

module.exports = {
	created: function () {
        var id = this.$route.params.id;
        this.id = id;

        this.loading = true;
        this.$http.get(api.getEndpointUrl() + '/v1/switch/' + id,
        {
            headers: {
                "X-Auth-Token": auth.getToken()
            }
        }).then(function(response) {
            //todo: check success flag? validation errors?
            this.loading = false;
            console.log(response);
            var voip = response.body.payload;
            this.name = voip.name;
            this.info_port = voip.lan_port;
            this.info_ip = voip.lan_ip;
			// this.paid_replace_ip = voip.paid_replace_ip;
        }, function(error) {
            this.loading = false;
            console.log(error);
        });        
	},
	components: {
		'multiselect': multiselect,
		'modal': modal,
		'select2': vSelect
	},
	data: function () {
		return {
			name: '',
			info_port: '',
			info_ip: '',
			// paid_replace_ip: 0,
            id: 0,
		}
	},
	methods: {
		reset: function () {

		},
		...mapActions({
			setMessage: 'app_message/setAppMessage'
		}),
		validateBeforeSubmit() {
			this.$validator.validateAll().then(() => {
				// eslint-disable-next-line
				this.loading = true;
				var requestForm = {};
				requestForm.name = this.name;
				requestForm.lan_ip = this.info_ip;
				requestForm.lan_port = this.info_port;
				// requestForm.paid_replace_ip = this.paid_replace_ip;
				this.$http.patch(api.getEndpointUrl() + '/v1/switch/' + this.id,
					requestForm,
					{
						headers: {
							"X-Auth-Token": auth.getToken()
						}
					}
				)
				.then(response => {
					if (response.body.success) {
						this.loading = false;
						this.setMessage('The VoIP Gateway has been modified!');
						var thisvm = this;
						setTimeout(function(){
							thisvm.$router.push('/switch/voip_gateway');
						}, 3000);
					}
				})
				.catch(error => {
					console.log(error)
					this.setMessage({
						message: 'Editing VoIP Gateway is failed!',
						type: 'error'
					})
				})	
			}).catch(() => {
				// eslint-disable-next-line
			});
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

.ms-container .ms-selectable,
.ms-container .ms-selection {
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

.daysselect {
	border: 1px solid #dee0e3;
	padding: 8px;
	border-radius: 4px;
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