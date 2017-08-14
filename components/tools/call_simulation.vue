<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Tools</a></li>
				  <li class="breadcrumb-item active">Call Simulation</li>
			</ol>
			<h1 class="page-header">Call Simulation</h1>
			<div class="white_pad configuration_pad">
                <form class="form" @submit.prevent="validateBeforeSubmit">
                <div class="col-md-3 col-sm-4">
                    <div class="form-group">
                        <label for="server">Server:</label>
                        <select2 :options="server_list" v-model="server"></select2>
                    </div>
                </div>
                <div class="col-md-3 col-sm-4">
                    <div class="form-group">
                        <label for="username">Ingress Trunk:</label>
                        <select2 :options="trunk_list" v-model="ingress_trunk"></select2>
                    </div>
                </div>
                <div class="col-md-3 col-sm-4">
                    <div class="form-group">
                        <label for="host">Host:</label>
                        <select class="selectable" v-model="host">
                            <option v-for="item in host_list" v-bind:value="item.id">
                                {{ item.text }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="col-md-3 col-sm-4">
                    <div class="form-group">
                        <label>ANI:</label>
                        <input type="text" name="ani" v-model="ani" class="form-control" placeholder="Enter ANI">
                    </div>
                </div>
                <div class="col-md-3 col-sm-4">
                    <div class="form-group">
                        <label>DNIS:</label>
                        <input type="text" name="dnis" v-model="dnis" class="form-control" placeholder="Enter DNIS">
                    </div>
                </div>
                <div class="col-md-3 col-sm-4">
                    <div class="form-group">
                        <label>Time:</label>
                        <el-date-picker style="width: 100%;" type="datetime" v-model="time" :picker-options="{}" placeholder="Enter Date and TIme"></el-date-picker>
                    </div>
                </div>
                <div class="clearfix"></div>
                <div class="col-md-12">
                  <div class="button_set little-space">
                    <button class="btn btn-primary" type="submit">
                        Submit
                    </button>
                    <a class="btn btn-default" v-on:click="reset">
                        Reset
                    </a>
                  </div>
                </div>
				<div class="clearfix little-space"></div>
                </form>
			</div>
		</div>
	  </div>
	</div>
</template>

<script>   
	const vSelect = require('vue!../main_components/select.vue');
	const api = require("../../api");
    const auth = require("../../auth");
    _ = require('lodash');
    
	import {
		mapActions
	} from 'vuex'

	module.exports = {
        created: function(){
           this.fetchIngressTrunks()
        },
		components: {
			'select2': vSelect
		},
		data: function(){
            return {
                tmpPageOne: {
					currentPage: 0,
					totalPages: 10,
					cntPerPage: 30,
				},
			  server: '',
              ingress_trunk: '',
              host: '',
              ani: '',
              dnis: '',
              time: '',
			  server_list: [
				  { id: '127.0.0.1:4320', value: '127.0.0.1:4320', text: '127.0.0.1:4320' },
				  { id: '127.0.0.1:4330', value: '127.0.0.1:4330', text: '127.0.0.1:4330' },
				  { id: '127.0.0.1:4340', value: '127.0.0.1:4340', text: '127.0.0.1:4340' },
			  ],
              trunk_list: [],
			  host_list: [],
            }
        },
		mounted: function() {
			
        },
        watch: {
            'ingress_trunk': function () {
                var host = {};
                let index = _.findIndex(this.trunk_list, elem => elem.id  == this.ingress_trunk);
                this.host_list = [];
                console.log("this.host_list");
                console.log(this.host_list);
                var self = this;
                if (index >= 0) {
                    this.trunk_list[index].ip.forEach(function (temp, i) {
                        var host = {};
                        host.id = temp.ip + ":" + temp.port;
                        host.text = host.id;
                        self.host_list.push(host);
                        console.log("self.host_list");
                        console.log(self.host_list);
                    });
                }
            }
        },
        methods: {
			...mapActions({
				setMessage: 'app_message/setAppMessage'
			}),
            fetchIngressTrunks() {
                this.loading = true;
                var url;
                if(this.tmpPageOne.currentPage === 0)
                    url = api.getEndpointUrl() + "/v1/trunk/ingress/list"
                else
                    url = api.getEndpointUrl() + "/v1/trunk/ingress/list?page=" + this.tmpPageOne.currentPage
                console.log(url);
                this.$http.get(url)
                    .then(response => {
                        const body = response.body
                        if (body.success) {
                            var self = this;
                            this.loading = false;
                            const payload = body.payload
                            var carriers = payload.items;
                            carriers.forEach(function (temp, i) {
                                var option = {};
                                option.id = temp.resource_id;
                                option.value = temp.name;
                                option.text = temp.name;
                                option.ip = temp.ip;
                                self.trunk_list.push(option);
                                if(i==0 && self.tmpPageOne.currentPage === 0)
                                    self.ingress_trunk = option.id;    
                            });
                            this.tmpPageOne.currentPage = payload.page + 1
                            this.tmpPageOne.totalPages = Math.ceil(payload.total / payload.per_page)
                            this.tmpPageOne.cntPerPage = payload.per_page;

                            console.log(this.tmpPageOne.totalPages, this.tmpPageOne.currentPage);

                            if(this.tmpPageOne.totalPages > this.tmpPageOne.currentPage)
                                this.fetchIngressTrunks();
                            
                            console.log(this.trunk_list);
                            console.log(this.ingress_trunk);
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        this.loading = false;
                    })
            },
            reset: function (){
                this.server = '';
                this.ingress_trunk = '';
                this.host = '';
                this.ani = '';
                this.dnis = '';
                this.time = '';
            },
            getCallForRequest() {
                var call_simulation = [];
                call_simulation.ingress_trunk = this.ingress_trunk;
                call_simulation.time = this.time;
                call_simulation.dnis = this.dnis;
                call_simulation.server = this.server;
                call_simulation.ani = this.ani;
                if(this.host != '')
                    call_simulation.host = this.host;
                console.log(call_simulation);
                return call_simulation;
            },
            validateBeforeSubmit() {
                console.log("validateBeforeSubmit");
                this.$validator.validateAll().then(() => {
                    console.log("validator");
                    this.loading = true;
                    console.log(this.ingress_trunk);
                    console.log(this.host);
                    console.log(this.time);
                    console.log(this.dnis);
                    console.log(this.server);
                    console.log(this.ani);
                    const reqBody = this.getCallForRequest();
                    this.$http.post(api.getEndpointUrl() + '/v1/tool/simulate_call', reqBody)
                    .then(
                        function (response) {
                            var thisvm = this;
                            this.loading = false;
                            console.log(response);
                            this.setMessage('alert-success', 'calling simulation is successed!');
                        },
                        function (error) {
                            var thisvm = this;
                            this.loading = false;
                            console.log(error);
                            this.setMessage({
                                message:"calling simulation is failed!",
                                tyep:"error"
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
	.m-top-33 {
		margin-top: 33px;
	}
	
	@media (max-width: 767px) {
		.m-top-33 {
			margin-top: 10px;
		}	
	}
</style>
