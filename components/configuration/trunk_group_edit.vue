<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Configuration</a></li>
				  <li class="breadcrumb-item">
					  <router-link to="/configuration/trunk_group">Trunk Group</router-link>
				  </li>
				  <li class="breadcrumb-item active">Edit</li>
			</ol>
			<h1 class="page-header">Edit Trunk Group</h1>
			<router-link to="/configuration/trunk_group" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad">
				<div class="select_group row">
					<div class="col-md-6 col-sm-8">
						<form class="form" @submit.prevent="validateBeforeSubmit">
							<div class="row">
								  <div class="form-group">
									<div class="col-sm-6">
										<label for="group_name">Group Name:</label>
										<input type="text" name="group_name" v-model="data.group_name" class="form-control" placeholder="Enter the group name">
									</div>
								  </div>
								  <div class="clearfix little-space"></div>
								  <div class="form-group">
									  <div class="col-sm-12">
										  <label for="group_name">Trunk:</label>
											<!--<select multiple="multiple" id="carrier" name="carrier">
												<option v-for="option in options" :value='option.value'>{{option.text}}</option>
											</select>-->
											<el-transfer v-model="data.trunks" :titles="['Unappropriated', 'Appropriated']" :data="options">
											</el-transfer>
									  </div>
								  </div>
							  </div>
							  <div class="button_set little-space">
									<button class="btn btn-primary" type="submit">
										Submit
									</button>
									<a class="btn btn-default" v-on:click="reset">
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
	// const multiselect = require('multiselect');
	const api = require("../../api");
	const auth = require("../../auth");
	_ = require('lodash');
	import {mapGetters,	mapActions} from 'vuex'
	
	module.exports = {
	created: function(){
		this.loading = true;
		var id = this.$route.params.id;
		this.id = id;
		this.$http.get(api.getEndpointUrl() + "/v1/trunk/group/"+id, 
		{
			headers: {
				"X-Auth-Token": auth.getToken()
			}
		}).then(function(response) {
			var self = this;
			this.loading = false;
			var item = response.body.payload;

			this.trunk_type = item.trunk_type;
			console.log(this.trunk_type);
			Vue.set(this.data, 'group_name', item.group_name);
			Vue.set(this.data, 'trunk_type', item.trunk_type);

			var trunks = item.trunks;

			trunks.forEach(function(trunk, i){
				self.trunks.push(trunk.trunk_id);
			});

			Vue.set(this.data, 'trunks', this.trunks);

			this.origindata = this.data;

			console.log(this.trunks);
		}, function(error) {
			this.loading = false;
			console.log(error);
		});

		this.loading = true;
		this.$http.get(api.getEndpointUrl() + "/v1/trunk/" + this.trunk_type + "/list", 
		{
			headers: {
				"X-Auth-Token": auth.getToken()
			}
		}).then(function(response) {
			console.log("/v1/trunk/" + this.trunk_type + "/list");
			var self = this;
			this.loading = false;
			var items = response.body.payload.items;

			console.log(items);
			items.forEach(function(item, i){
				if (item.is_active) {
					var option = {};
					option.key = item.trunk_id;
					option.label = item.trunk_name;
					self.options.push(option);
				}
			});

			console.log("options");
			console.log(this.options);
		}, function(error) {
			this.loading = false;
			console.log(error);
		});
	},
	components: {
		// 'multiselect': multiselect
	},
		
		data: function(){
            return {
			trunks: [],
			options: [],
			data: {},
			origindata: {},
			trunk_type: 'egress',
			id: null,
            }
        },
		mounted: function() {
		},
    methods: {
		...mapActions({
			setAsyncConfirm: 'async_confirm/setAsyncConfirm',
			setMessage: 'app_message/setAppMessage'
		}),
		reset: function (){
			this.data = this.origindata;
		},
        validateBeforeSubmit() {
            console.log("validateBeforeSubmit");
            this.$validator.validateAll().then(() => {
                console.log("validator");
				console.log(this.data.trunks);
                this.loading = true;

                this.$http.patch(api.getEndpointUrl() + '/v1/trunk/group/' + this.id,
                    {
                        "group_name": this.data.group_name,
                        "trunk_type": this.data.trunk_type,
						"all_trunks": this.data.trunks
                    },
                    {
                        headers: {
                            "X-Auth-Token": auth.getToken()
                        }
                    }
                ).then(
                    function (response) {
                        console.log("success");
                        this.loading = false;
						this.$router.push('/configuration/trunk_group');
                        this.setMessage('The trunk group has been modified!');
                    },
                    function (error) {
						this.loading = false;
						console.log(error);

						this.setMessage({
							message: "Editing trunk group is failed!",
							type: 'error'
						});
                    }
                )
            }).catch(() => {
                // eslint-disable-next-line

            });
        },
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
