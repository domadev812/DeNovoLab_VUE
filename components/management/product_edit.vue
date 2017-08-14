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
                        <router-link to="/management/products">Products</router-link>
                    </li>
                    <li class="breadcrumb-item active">Edit</li>
                </ol>
                <h1 class="page-header">Product Editor</h1>
                <router-link to="/management/products" class="btn btn_white back">
                    <span class="dnl_icon dnl_import"></span> Back </router-link>
                <form class="form" @submit.prevent="validateBeforeSubmit">
                    <div class="white_pad product_add">
                        <div class="row">
                            <div class="col-md-3 col-sm-4">
                                <div class="form-group">
                                    <label for="name">Product Name:</label>
                                    <input type="text" name="name" v-model="data.name" class="form-control" placeholder="Enter Produt Name">
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-4">
                                <div class="form-group">
                                    <div class="form-group">
                                        <label>Routing Plan:</label>
                                        <select class="selectable" v-model="data.route_plan_id">
                                            <option v-for="item in routing_plan" v-bind:value="item.id">
                                                {{ item.text }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <!--<div class="col-md-1 col-sm-2">
                                <div class="inline_actions">
                                    <a>
                                        <span class="dnl_icon dnl_add"></span>
                                    </a>
                                    <a>
                                        <span class="dnl_icon dnl_reload"></span>
                                    </a>
                                </div>
                            </div>-->
                            <div class="clearfix little-space"></div>
                            <div class="col-md-3 col-sm-4">
                                <div class="form-group">
                                    <label for="techprefix">Tech Prefix:</label>
                                    <input type="text" name="techprefix" v-model="data.techprefix" class="form-control" placeholder="Enter Tech Prefix">
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-4">
                                <div class="form-group">
                                    <div class="form-group">
                                        <label>Rate Tables:</label>
                                        <select class="selectable" v-model="data.rate_table_id">
                                            <option v-for="rate_table in rate_tables" v-bind:value="rate_table.id">
                                                {{ rate_table.text }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <!--<div class="col-md-1 col-sm-2">
                                <div class="inline_actions">
                                    <a>
                                        <span class="dnl_icon dnl_add"></span>
                                    </a>
                                    <a>
                                        <span class="dnl_icon dnl_reload"></span>
                                    </a>
                                </div>
                            </div>-->
                            <div class="clearfix little-space"></div>
                            <div class="col-md-3 col-sm-4">
                                <div class="form-group">
                                    <div class="checkbox checkbox-success">
                                        <input id="set_private" name="set_private" type="checkbox" v-model="data.set_private">
                                        <label for="set_private">Set Private</label>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix little-space"></div>
                            <div class="col-md-6 col-sm-8">
                                <div class="form-group">
                                    <label for="carriers">Assigned to Carriers:</label>
                                    <!--<select multiple="multiple" id="carrier" name="carrier">
                                        <option v-for="option in options" :value='option.value'>{{option.text}}</option>
                                    </select>-->
                                    <el-transfer v-model="data.carriers" :titles="['Carriers', 'Selected Carriers']" :data="options">
                                    </el-transfer>
                                </div>
                            </div>
                        </div>
                        <div class="button_set little-space">
                            <button class="btn btn-primary" type="submit">
                                Submit
                            </button>
                            <a class="btn btn-default">
                                Reset
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>   
const multiselect = require('multiselect'),
    vSelect = require('vue!../main_components/select.vue');
const api = require("../../api");
const auth = require("../../auth");
import {mapActions} from 'vuex'

module.exports = {
    components: {
        'multiselect': multiselect,
        'select2': vSelect
    },
    data: function () {
        return {
            clients:[],
            apiUrl: '/v1/product/',
            options: [],
            rate_tables: [],
            routing_plan: [],

            id: null,
            data: {},
        }
    },
    mounted: function () {
    },
    created: function () {
        console.log("products edit created");
        this.loading = true;

        this.$http.get(api.getEndpointUrl() + '/v1/switch/rate_table/list',
            {
                headers: {
                    "X-Auth-Token": auth.getToken()
                }
            }).then(function (response) {
                this.loading = false;
                //todo: check success flag? validation errors?
                var rate_tables = response.body.payload.items;
                console.log(rate_tables);
                var self = this;
                rate_tables.forEach(function (item, i) {
                    var rate_table = {};
                    rate_table.id = item.rate_table_id;
                    rate_table.text = item.name;
                    self.rate_tables.push(rate_table);
                });
                console.log(this.rate_tables);
            }, function (error) {
                this.loading = false;
                console.log(error);
            });

        this.loading = true;

        this.$http.get(api.getEndpointUrl() + '/v1/route/plan/list',
            {
                headers: {
                    "X-Auth-Token": auth.getToken()
                }
            }).then(function (response) {
                this.loading = false;
                //todo: check success flag? validation errors?
                var routing_plan = response.body.payload.items;
                console.log(routing_plan);
                var self = this;
                routing_plan.forEach(function (item, i) {
                    var temp = {};
                    temp.id = item.route_plan_id;
                    temp.text = item.name;
                    self.routing_plan.push(temp);
                });
                console.log(this.routing_plan);
            }, function (error) {
                this.loading = false;
                console.log(error);
            });

		this.$http.get(api.getEndpointUrl() + '/v1/carrier/list',
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function (response) {
				this.loading = false;
				//todo: check success flag? validation errors?
				var carrier_list = response.body.payload.items;
				console.log(carrier_list);
				var self = this;
				carrier_list.forEach(function (item, i) {
					var temp = {};
					temp.key = item.client_id;
					temp.label = item.name;
					self.options.push(temp);
				});
				console.log(this.options);
			}, function (error) {
				this.loading = false;
				console.log(error);
			});

        var the = this;
        var id = this.$route.params.id;
        this.id = id;
        this.loading = true;
        this.$http.get(api.getEndpointUrl() + this.apiUrl + id,
            {
                headers: {
                    "X-Auth-Token": auth.getToken()
                }
            }).then(function (response) {
                this.loading = false;
                console.log(response);
                var product = response.body.payload;

                var set_private = true;
                if (product.type == "public")
                    set_private = false;

				product.clients.forEach(function(item, i){
                    the.clients.push(item.client_id);
				});
                Vue.set(this.data, 'name', product.name);
                Vue.set(this.data, 'rate_table_id', product.rate_table_id);
                Vue.set(this.data, 'route_plan_id', product.route_plan_id);
                Vue.set(this.data, 'carriers', this.clients);
                Vue.set(this.data, 'techprefix', product.tech_prefix);
                Vue.set(this.data, 'set_private', set_private);

            }, function (error) {
                this.loading = false;
                console.log(error);
            });
    },
    methods: {
        ...mapActions({
            setMessage: 'app_message/setAppMessage'
        }),
        validateBeforeSubmit() {
            console.log("validateBeforeSubmit");
            this.$validator.validateAll().then(() => {
                console.log("validator");
                this.loading = true;

                console.log("before api call");

                var type = "public";
                if (this.data.set_private){
                    type = "private";
                }
                this.$http.patch(api.getEndpointUrl() + this.apiUrl + this.id,
                    {
                        "rate_table_id": this.data.rate_table_id,
                        "name": this.data.name,
                        "route_plan_id": this.data.route_plan_id,
                        "clients": this.data.carriers,
                        "tech_prefix": this.data.techprefix,
                        "type": type,
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
                        console.log(response);
                        this.$router.push('/management/products');
                        this.setMessage('The product has been modified!');
                    },
                    function (response) {
						this.loading = false;
						console.log(response);

						this.setMessage({
                            message: "Editing product is failed!",
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
.product_add .checkbox-success input[type="checkbox"]:checked+label::before {
    background-color: #03c0fc;
    border-color: #03c0fc;
}

.inline_actions {
    margin-top: 33px;
    margin-left: -10px;
}

.inline_actions a {
    font-size: 18px;
    color: #03c0fc;
    margin-right: 5px;
    cursor: pointer;
}

.inline_actions a:hover {
    text-decoration: none;
}

@media (max-width: 767px) {
    .inline_actions {
        margin-top: 0;
        margin-left: 0;
        margin-bottom: 20px;
        text-align: center;
    }
}
</style>
