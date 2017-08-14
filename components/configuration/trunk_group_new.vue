<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="#">Configuration</a>
					</li>
					<li class="breadcrumb-item">
						<router-link to="/configuration/trunk_group">Trunk Group</router-link>
					</li>
					<li class="breadcrumb-item active">New</li>
				</ol>
				<h1 class="page-header">New Trunk Group</h1>
				<router-link to="/configuration/trunk_group" class="btn btn_white back">
					<span class="dnl_icon dnl_import"></span> Back </router-link>
				<div class="white_pad">
					<div class="select_group row">
						<div class="col-md-6 col-sm-8">
							<form class="form" @submit.prevent="validateBeforeSubmit">
								<div class="row">
									<div class="form-group">
										<div class="col-sm-6">
											<label for="groupname">Group Name:</label>
											<input type="text" name="groupname" v-model="groupname" class="form-control" v-validate="'required'" placeholder="Enter the group name">
											<span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
										</div>
									</div>
									<div class="clearfix little-space"></div>
									<div class="form-group">
										<div class="col-sm-12">
											<label for="groupname">Trunk:</label>
											<!--<select multiple="multiple" id="carrier" name="carrier">
												<option v-for="option in options" :value='option.value'>{{option.text}}</option>
											</select>-->
											<el-transfer v-model="trunk_list" :titles="['Unappropriated', 'Appropriated']" :data="options">
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
_= require('lodash');
import {mapGetters,	mapActions} from 'vuex'

module.exports = {
	created: function(){
		var trunk_type = this.$route.params.type;
		this.trunk_type = trunk_type;

		this.loading = true;
		this.$http.get(api.getEndpointUrl() + "/v1/trunk/" + trunk_type + "/list", 
		{
			headers: {
				"X-Auth-Token": auth.getToken()
			}
		}).then(function(response) {
			console.log("url:" + "/v1/trunk/" + trunk_type + "/list");
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

			console.log("trunk_options");
			console.log(this.options);
		}, function(error) {
			this.loading = false;
			console.log(error);
		});
	},
	components: {
		// 'multiselect': multiselect
	},
	data: function () {
		return {
			trunk_type: 'egress',
			groupname: '',
			trunk_list: [],
			options: [],
		}
	},
	mounted: function () {
	},
    methods: {
		...mapActions({
			setAsyncConfirm: 'async_confirm/setAsyncConfirm',
			setMessage: 'app_message/setAppMessage'
		}),
		reset: function (){
			this.groupname = '';
			this.trunk_list = [];
		},
        validateBeforeSubmit() {
            console.log("validateBeforeSubmit");
            this.$validator.validateAll().then(() => {
                console.log("trunk_list");
				console.log(this.trunk_list);
                this.loading = true;

                this.$http.post(api.getEndpointUrl() + '/v1/trunk/group',
                    {
						"all_trunks": this.trunk_list,
                        "group_name": this.groupname,
                        "trunk_type": this.trunk_type,
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
                        this.setMessage('The trunk group has been created!');
                    },
                    function (error) {
						this.loading = false;
						console.log(error);

						this.setMessage({
							message: "Creating trunk group is failed!",
							type: "error"
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
