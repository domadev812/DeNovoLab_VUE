<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="#">Management</a>
					</li>
                    <li class="breadcrumb-item">
                        <router-link to="/clients/management/trunks">Trunks</router-link>
                    </li>
                    <li class="breadcrumb-item">
                        <a v-on:click="trunk_products()">Products</a>
                    </li>
                    <li class="breadcrumb-item active">New Product</li>
				</ol>
				<h1 class="page-header">New Product</h1>
				<a v-on:click="trunk_products()" class="btn btn_white back">
					<span class="dnl_icon dnl_import"></span> Back 
				</a>
				<div class="white_pad">
					<div class="select_group row">
						<div class="col-md-6 col-sm-8">
							<form class="form" @submit.prevent="validateBeforeSubmit">
								<div class="row">
									<div class="form-group">
										<div class="col-sm-6">
											<label for="productname">Product Name:</label>
											<input type="text" name="productname" v-model="productname" class="form-control" v-validate="'required'" placeholder="Enter product name">
											<span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
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
const api = require("../../../api");
const auth = require("../../../auth");
_= require('lodash');
import {mapGetters,	mapActions} from 'vuex'

module.exports = {
	created: function(){
		var trunkid = this.$route.params.id;
		this.trunkid = trunkid;
	},
	components: {
		// 'multiselect': multiselect
	},
	data: function () {
		return {
			apiUrl: '',
			trunkid: 0,
			productname: '',
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
			this.productname = '';
		},
		trunk_products: function() {
			this.$router.push({ path: "/clients/management/trunks/products/" + this.trunkid });
		},
        validateBeforeSubmit() {
            console.log("validateBeforeSubmit");
            this.$validator.validateAll().then(() => {
                this.loading = true;
                this.$http.post(api.getEndpointUrl() + this.apiUrl + this.trunkid,
                    {
                        "product": this.productname,
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
						this.trunk_products();
                        this.setMessage('The product has been created!');
                    },
                    function (error) {
						this.loading = false;
						console.log(error);

						this.setMessage({
							message: "Creating product is failed!",
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
