<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Configuration</a></li>
				  <li class="breadcrumb-item">
					  <router-link to="/configuration/carrier_group">Carrier Group </router-link>
				  </li>
				  <li class="breadcrumb-item active">New</li>
			</ol>
			<h1 class="page-header">Carrier Group Editor</h1>
			<router-link to="/configuration/carrier_group" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad">
				<div class="select_group row">
					<div class="col-md-6 col-sm-8">
						<form class="form" @submit.prevent="validateBeforeSubmit">
							<div class="row">
								  <div class="form-group">
									<div class="col-sm-6">
										<label for="groupname">Group Name:</label>
										<input type="text" name="groupname" v-model="groupname" class="form-control"  :class="{'input': true, 'is-danger': errors.has('groupname') }"  v-validate="'required'"  placeholder="Enter the group name">
										<span v-show="errors.has('groupname')" class="help is-danger">{{ errors.first('groupname') }}</span>
									</div>
									<div class="col-sm-6">

									</div>
								  </div>
								  <div class="clearfix little-space"></div>
								  <!--<div class="form-group">
									  <div class="col-sm-12">
										  <label for="groupname">Carrier:</label>
										  <select multiple="multiple" id="carrier" name="carrier">
											<option v-for="option in options" :value='option.value'>{{option.text}}</option>
										  </select>
									  </div>
								  </div>-->
							  </div>
							  <div class="button_set little-space">
								<button class="btn btn-primary" type="submit">
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
	</div>
</template>

<script>
	const multiselect = require('multiselect');
	const vvalidate = require('vee-validate');
	const vcarrier = require('vue!../management/carrier.vue');
	const api = require("../../api");
	const auth = require("../../auth");
	import { mapActions } from 'vuex';
	module.exports = {
		created: function(){
			var the = this;

			console.log("created before ajax function called");
			this.$http.get(api.getEndpointUrl() + this.getcarrierapiUrl+"?page=1&per_page=&order_by=&order_dir=",
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function(response) {

				//todo: check success flag? validation errors?
				var carrier_array = [];
				var carriers = response.body.payload.items;
				for(var i = 0 ; i < carriers.length ; i ++){
					var cnt = i + 1;
					var item = {};
					item['id'] = cnt;
					item['value'] = carriers[i].name;
					item['text'] = carriers[i].name;
					carrier_array.push(item);
				}
				this.options = carrier_array;
				console.log("###################");
				console.log(this.options);
				console.log("after ajax function called");
				$('#carrier').multiSelect('addOption', carrier_array);
			}, function(error) {
				console.log(error);
			});
		},
		components: {
			'multiselect': multiselect
		},
		data: function(){
            return {
			  getcarrierapiUrl:'/v1/carrier/list',
			  groupname: '',
			  options: [],
			  loading:false
            }
        },
		mounted: function() {
			console.log("mounted function called");
			$('#carrier').multiSelect({
				selectableHeader: "<div class='custom-header'>Unappropriated</div>",
				selectionHeader: "<div class='custom-header'>Appropriated</div>"
			});
		},
		methods : {
			...mapActions({
				setMessage: 'app_message/setAppMessage'
			}),
			reset : function(){
				console.log("reset clicked!");
				$('#carrier').multiSelect('deselect_all');
			},
			saveCarrierGroup() {
				// eslint-disable-next-line
				this.loading = true;
				this.$http.post(api.getEndpointUrl() + '/v1/carrier/group/create',
				{
					"group_name": this.groupname, //todo: actual role id
				},
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}
				).then(response => {
					if (response.body.success) {
						this.setMessage('Carrier group was changed successfully');
						var thisvm = this;
						setTimeout(function(){
							thisvm.$router.push('/configuration/carrier_group');
						}, 3000);
					}
					this.loading = false;
				})
				.catch(error => {
					console.log(error)
					this.loading = false;
					var msg = '';
                    if(error.data.errors !== undefined)
                        msg = error.data.errors;
                    else if(error.data.error !== undefined)
                        msg = error.data.error.message;
					this.setMessage({
						message: msg,
						type: 'error'
					})
				})
			},
			validateBeforeSubmit(){
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
						vm.saveCarrierGroup();
					}
						
				}).catch((error) => {
					// eslint-disable-next-line
					console.log(error)
					vm.setMessage({
						message: 'Validation failed',
						type: 'error'
					})
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
