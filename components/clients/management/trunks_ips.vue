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
                    <li class="breadcrumb-item active">IPs</li>
                </ol>
                <h1 class="page-header">Trunk IPs</h1>
                <router-link to="/clients/management/trunks" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
				<div class="white_pad table_wrap">
					<div class="table_filters">
                        <!-- <button type="button" class="btn btn-default">
                            <span class="dnl_icon dnl_add"></span> Create New
                        </button> -->
                        <a class="action action_add" data-toggle="tooltip" data-placement="top" title="Create" @click="create_ip()">
                            <span class="dnl_icon dnl_add"></span>
                        </a>
					</div>
					<div class="table-responsive">
						<table class="table table-striped table-hover carrier_groups">
							<thead>
								<tr>
									<th>IP</th>
									<th>Port</th>
									<th>CPS Limit</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								<tr v-if="!trunks.length">
									<td style="text-align: center" colspan="4">No Data Found</td>
								</tr>										
								
								<tr v-for="(trunk, index) in trunks">
                                    <td>
                                        <input type="text" v-model="trunk.ip" class="form-control">                                        
                                    </td>
                                    <td>
                                        <input type="text" v-model="trunk.port" class="form-control">
                                    </td>
									<td>{{trunk.cps_limit}}</td>
									<td>
										<a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete IP" v-on:click="delete_ip(index)">
											<span class="dnl_icon dnl_action_delete"></span>
										</a>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="clearfix little-space"></div>
					<div class="button_set text-center">
						<a class="btn btn-primary mini" @click="validateBeforeSubmit">
							Submit
						</a>
					</div>
				</div>
            </div>
        </div>
    </div>
</template>

<script>   
const api = require("../../../api");
const auth = require("../../../auth");
import {mapActions} from 'vuex'

module.exports = {
    components: {
    },
    data: function () {
        return {
            apiUrl: '',
			trunks: [
				{
					ip: '127.0.0.1',
					port: '8080',
					cps_limit: ''
				},
				{
					ip: '127.0.0.1',
					port: '8080',
					cps_limit: ''
				},
				{
					ip: '127.0.0.1',
					port: '8080',
					cps_limit: ''
				},
			],

            id: 0,
        }
    },
    mounted: function () {
    },
    created: function () {
        this.fetchTrunks();
    },
    methods: {
        ...mapActions({
            setMessage: 'app_message/setAppMessage'
        }),
		fetchTrunks() {
			this.loading = true;
            var id = this.$route.params.id;
            this.id = id;

			this.$http.get(api.getEndpointUrl() + this.apiUrl + id,
				{
					headers: {
						"X-Auth-Token": auth.getToken()
					}
				}).then(function (response) {
					this.loading = false;
					//todo: check success flag? validation errors?
					var trunks = response.body.payload.items;
					console.log(trunks);
					this.trunks = trunks;
					var total_page = response.body.payload.total;
					this.pageOne.currentPage = response.body.payload.page + 1;
					this.pageOne.totalPages = Math.ceil(response.body.payload.total / per_page);
					console.log("total pages => " + this.pageOne.totalPages);
				}, function (error) {
					this.loading = false;
					console.log(error);
				}
            );
		},        
        delete_ip: function(id){
            this.trunks.splice(id, 1);
        },
        create_ip: function() {
            this.trunks.push({
                ip: '127.0.0.1',
                port: 0,
            });
        },    
        validateBeforeSubmit() {
            console.log("validateBeforeSubmit");
            // this.$validator.validateAll().then(() => {
                console.log("validator");
                this.loading = true;

                console.log("before api call");
                var ips = [];

                this.trunks.forEach(function (trunk, index) {
                    var item = {};
                    item.ip = trunk.ip;
                    item.port = trunk.port;
                    ips.push(item);
                });

                this.$http.patch(api.getEndpointUrl() + this.apiUrl + this.id,
                    ips,
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
                        this.$router.push('/clients/management/trunks');
                        this.setMessage('The IPs has been modified!');
                    },
                    function (response) {
						this.loading = false;
						console.log(response);

						this.setMessage({
                            message: "Editing IPs is failed!",
                            type: 'error'
                        });
                    }
                )
            // }).catch(() => {
                // eslint-disable-next-line
            // });
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

a.action.action_add {
    font-size: 16px;
    vertical-align: top;
    padding-top: 4px;
}

</style>
