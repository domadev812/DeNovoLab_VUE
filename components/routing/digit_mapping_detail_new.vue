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
						<li class="breadcrumb-item active">New Digit Mapping Item</li>
				</ol>
				<h1 class="page-header">New Digit Mapping Item</h1>
				<router-link to="" class="btn btn_white back" @click.native="back"><span class="dnl_icon dnl_import"></span> Back </router-link>
				<div class="white_pad">
					<div class="col-md-6 col-sm-8">
						<form class="form" @submit.prevent="validateBeforeSubmit">
							<div class="row">
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label>ANI Action:</label>
										<select class="selectable" v-model="ani_action">
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
										<input type="text" name="ani_prefix" v-model="ani_prefix" class="form-control" v-validate="check_prefix" placeholder="Enter Match Prefix">
										<span v-show="errors.has('ani_prefix')" class="help is-danger">{{ errors.first('ani_prefix') }}</span>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label for="ani_replace">ANI Replace With:</label>
										<input type="text" name="ani_replace" v-model="ani_replace" class="form-control" v-validate="check_replace" placeholder="Enter Replace With">
										<span v-show="errors.has('ani_replace')" class="help is-danger">{{ errors.first('ani_replace') }}</span>
									</div>
								</div>								

                                <div class="clearfix"></div>

								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label>DNIS Action:</label>
										<select class="selectable" v-model="dnis_action">
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
										<input type="text" name="dnis_prefix" v-model="dnis_prefix" class="form-control" v-validate="check_prefix" placeholder="Enter Match Prefix">
										<span v-show="errors.has('dnis_prefix')" class="help is-danger">{{ errors.first('dnis_prefix') }}</span>
									</div>
								</div>
								<div class="col-md-4 col-sm-6">
									<div class="form-group">
										<label for="dnis_replace">DNIS Replace With:</label>
										<input type="text" name="dnis_replace" v-model="dnis_replace" class="form-control" v-validate="check_replace" placeholder="Enter Replace With">
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
			this.tras_id = id;
		},
		components: {
			'select2': vSelect
		},
		data: function(){
			return {
			  action_list: [
				  { id: 'ignore', value: 'ignore', text: 'ignore' },
				  { id: 'partial replacement', value: 'partial replacement', text: 'partial replacement' },
                  { id: 'all replace', value: 'all replace', text: 'all replace' },
			  ],

			  ani_prefix: "",
			  ani_replace: "",
			  dnis_prefix: "",
			  dnis_replace: "",
			  ani_action: 'ignore',
			  dnis_action: 'ignore',

			  tras_id: 0,
			}
		},
		methods: {
			...mapActions({
				setAsyncConfirm: 'async_confirm/setAsyncConfirm',
				setMessage: 'app_message/setAppMessage'
			}),			
			reset : function(){
				// this.$router.go(this.$router.currentRoute);
				this.ani_prefix = '';
				this.ani_replace = '';
				this.dnis_prefix = '';
				this.dnis_replace = '';
				this.ani_action = 'ignore';
				this.dnis_action = 'ignore';
			},
			back: function() {
				this.$router.push({path:"/routing/digital_maps/digit_mapping_detail/" + this.tras_id});
			},
			validateBeforeSubmit(){
				this.$validator.validateAll().then(() => {
					console.log("create_digit_map_detail_log");
					console.log(this.ani_action);
					// eslint-disable-next-line
					this.loading = true;
					this.$http.post(api.getEndpointUrl() + '/v1/route/digit_map/' + this.tras_id + '/item',
					{
						"ANI_action": this.ani_action,
						"ANI_prefix": this.ani_prefix,
						"ANI_replace_to": this.ani_replace,
						"DNIS_replace_to": this.dnis_replace,
						"DNIS_prefix": this.dnis_prefix,
						"DNIS_action": this.dnis_action					
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
							this.$router.push('/routing/digital_maps/digit_mapping_detail/'+thisvm.tras_id);
							this.setMessage('The item has been created!');
						},
						function(response) {
							this.loading = false;
							console.log(response);

							this.setMessage({
								message:"Creating item is failed!",
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
