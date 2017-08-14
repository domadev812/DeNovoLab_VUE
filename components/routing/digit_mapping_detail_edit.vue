<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
						<li class="breadcrumb-item"><a href="#">Routing</a></li>
						<li class="breadcrumb-item">
							<router-link to="/routing/digital_maps">Digital Maps</router-link>
						</li>
						<li class="breadcrumb-item">
							<router-link to="" @click.native="back">Digit Mapping Detail</router-link>
						</li>
						<li class="breadcrumb-item active">Edit Digit Mapping Item</li>
				</ol>
				<h1 class="page-header">Edit Digit Mapping Item</h1>
				<router-link to="" class="btn btn_white back" @click.native="back"><span class="dnl_icon dnl_import"></span> Back </router-link>
				<div class="white_pad">
					<div class="col-md-6 col-sm-8">
						<form class="form" @submit.prevent="validateBeforeSubmit">
							<div class="row">
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label>ANI Action:</label>
										<select class="selectable" v-model="data.ani_action">
											<!--<option disabled value="0" selected>Select Action</option>-->
											<option v-for="action in action_list" v-bind:value="action.id">
												{{ action.text }}
											</option>
										</select>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label for="ani_prefix">ANI Match Prefix:</label>
										<input type="text" name="ani_prefix" v-model="data.ani_prefix" class="form-control" v-validate="check_prefix" placeholder="Enter Match Prefix">
										<span v-show="errors.has('ani_prefix')" class="help is-danger">{{ errors.first('ani_prefix') }}</span>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label for="ani_replace">ANI Replace With:</label>
										<input type="text" name="ani_replace" v-model="data.ani_replace" class="form-control" v-validate="check_replace" placeholder="Enter Replace With">
										<span v-show="errors.has('ani_replace')" class="help is-danger">{{ errors.first('ani_replace') }}</span>
									</div>
								</div>

                                <div class="clearfix"></div>

								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label>DNIS Action:</label>
										<select class="selectable" v-model="data.dnis_action">
											<!--<option disabled value="0" selected>Select Action</option>-->
											<option v-for="action in action_list" v-bind:value="action.id">
												{{ action.text }}
											</option>
										</select>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label for="dnis_prefix">DNIS Match Prefix:</label>
										<input type="text" name="dnis_prefix" v-model="data.dnis_prefix" class="form-control" v-validate="check_prefix" placeholder="Enter Match Prefix">
										<span v-show="errors.has('dnis_prefix')" class="help is-danger">{{ errors.first('dnis_prefix') }}</span>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label for="dnis_replace">DNIS Replace With:</label>
										<input type="text" name="dnis_replace" v-model="data.dnis_replace" class="form-control" v-validate="check_replace" placeholder="Enter Replace With">
										<span v-show="errors.has('dnis_replace')" class="help is-danger">{{ errors.first('dnis_replace') }}</span>
									</div>
								</div>
							</div>
							<div class="button_set little-space">
								<button class="btn btn-primary" type="submit">
									Submit
								</button>
								<button class="btn btn-default" v-on:click="reset">
									Reset
								</button>
							</div>
						</form>
					</div>
					<div class="clearfix little-space"></div>
				</div>
			</div>
	  </div>
	</div>
</template>


<style>
	.m-top-33 {
		margin-top: 33px;
	}

	@media (max-width: 767px) {
		.m-top-33 {
			margin-top: 10px;
		}
	}
</style>

<script>   
	const vvalidate = require('vee-validate');
	const vSelect = require('vue!../main_components/select.vue');
	const api = require("../../api");
	const auth = require("../../auth");
	_ = require('lodash');
	import {mapGetters,	mapActions} from 'vuex'
	
	module.exports = {
		computed: {
			check_prefix() {
				if (this.ani_prefix == "" && this.dnis_prefix == "") {
					return 'required';
				} else {
					return '';
				}
			},
			check_replace() {
				if (this.ani_replace == "" && this.dnis_replace == "") {
					return 'required';
				} else {
					return '';
				}
			},
		},
		created: function(){
			var id = this.$route.params.id;
			var it = this.$route.params.it;
			this.tras_id = id;
			this.ref_id = it;

			this.loading = true;
			this.$http.get(api.getEndpointUrl() + "/v1/route/digit_map/item/" + this.ref_id, 
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function(response) {
				this.loading = false;
				var block = response.body.payload;
				console.log("block:");
				console.log(block);

				Vue.set(this.data, 'ani_action', block.ANI_action);
				Vue.set(this.data, 'ani_prefix', block.ANI_prefix);
				Vue.set(this.data, 'ani_replace', block.ANI_replace_to);
				Vue.set(this.data, 'dnis_replace', block.DNIS_replace_to);
				Vue.set(this.data, 'dnis_prefix', block.DNIS_prefix);
				Vue.set(this.data, 'dnis_action', block.DNIS_action);

				this.origin_data = this.data;

			}, function(error) {
				this.loading = false;
				console.log(error);
			});
		},
		components: {
			'select2': vSelect
		},
		data: function(){
			return {
			  action_list: [
				  { id: 'ignore', value: 'ignore', text: 'ignore' },
				  { id: 'replace the matched portion', value: 'replace the matched portion', text: 'replace the matched portion' },
                  { id: 'replace the entire number', value: 'replace the entire number', text: 'replace the entire number' },
			  ],

			//   ani_prefix: "",
			//   ani_replace: "",
			//   dnis_prefix: "",
			//   dnis_replace: "",
			//   ani_action: 'Ignore',
			//   dnis_action: 'Ignore',
				data: {},
				origin_data: {},

			  tras_id: 0,
			  ref_id: 0,
			}
		},
		methods: {
			...mapActions({
				setAsyncConfirm: 'async_confirm/setAsyncConfirm',
				setMessage: 'app_message/setAppMessage'
			}),
			reset : function(){
				// this.$router.go(this.$router.currentRoute);
				this.data = this.origin_data;
			},
			back: function() {
				this.$router.push({path:"/routing/digital_maps/digit_mapping_detail/" + this.tras_id});
			},
			validateBeforeSubmit(){
				this.$validator.validateAll().then(() => {
					// eslint-disable-next-line
					this.loading = true;
					this.$http.post(api.getEndpointUrl() + '/v1/route/digit_map/item/' + this.ref_id,
					{
						"ANI_action": this.data.ani_acton,
						"ANI_prefix": this.data.ani_prefix,
						"ANI_replace_to": this.data.ani_replace,
						"DNIS_replace_to": this.data.dnis_replace,
						"DNIS_prefix": this.data.dnis_prefix,
						"DNIS_action": this.data.dnis_action					
					},
					{
						headers: {
							"X-Auth-Token": auth.getToken()
						}
					}
					).then(
						function(response) {
							this.loading = false;
							console.log(response);

							this.$router.push('/routing/digital_maps/digit_mapping_detail/'+this.tras_id);
							this.setMessage('The item has been modified!');
						},
						function(response) {
							this.loading = false;
							console.log(response);

							this.setMessage({
								message:"Editing item is failed!",
								type:'error'
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
