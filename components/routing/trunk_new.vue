<template>
    <div class="container-fluid">
        <div class="row">
            <div class="wrapper single">
                <time-display></time-display>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="#">Routing</a>
                    </li>
                    <li class="breadcrumb-item">
                        <router-link to="/routing/trunks">Trunks</router-link>
                    </li>
                    <li class="breadcrumb-item active">New Trunk</li>
                </ol>
                <h1 class="page-header">New Trunk</h1>
                <router-link to="/routing/trunks" class="btn btn_white back">
                    <span class="dnl_icon dnl_import"></span> Back </router-link>
                <router-link :to="'/routing/trunks/'+type+'/new_template'" class="btn btn-primary biggest pull-right">
                    <span class="dnl_icon dnl_add"></span> Create New by Template
                </router-link>
                <form class="form">
                <div class="white_pad">
    
                    <div class="row">
                        <div class="col-md-3 col-sm-4">
                            <label for="name">{{this.type == 'egress'? 'Egress Name:': 'Ingress Name:'}}</label>
                            <input type="text" name="name" v-model="name" class="form-control" :class="{'input': true, 'is-danger': errors.has('name') }" v-validate="'required'" placeholder="Enter Name">
                            <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <label>Carriers:</label>
                            <!--<select2 :options="carriers" v-model="carrier"></select2>-->
                            <select class="selectable" v-model="carrier" :disabled="carrier_selected">
                                <option v-for="item in carriers" v-bind:value="item.id">
                                    {{ item.text }}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <label>Media Type:</label>
                            <select class="selectable" v-model="media_type">
                                <option v-for="item in media_types" v-bind:value="item.id">
                                    {{ item.text }}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group">
                                <label for="min_profitability">Min. Profitability:</label>
                                <div class="input-group">
                                    <span class="input-group-addon">$</span>
                                    <input type="text" class="form-control" aria-label="" placeholder="Enter Min. Profitability" name="min_profitability" v-model="min_profitability">
                                    <div class="input-group-btn">
                                        <button type="button" class="btn btn-rimary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {{label_format}}
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-right" v-model="min_prof_type">
                                            <a v-for="min_prof in min_profs" :value='min_prof.value' class="dropdown-item" v-on:click="min_prof_type=min_prof.id;label_format=min_prof.text" >{{min_prof.text}}</a>
                                            <!--<a class="dropdown-item">Value</a>-->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <label for="call_limit">Call Limit:</label>
                            <input type="text" name="call_limit" v-model="call_limit" class="form-control" :class="{'input': true, 'is-danger': errors.has('call_limit') }" v-validate="'numeric'" placeholder="Enter Call Limit">
                            <span v-show="errors.has('call_limit')" class="help is-danger">{{ errors.first('call_limit') }}</span>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <label>CPS Limit:</label>
                            <input type="text" name="cps_limit" v-model="cps_limit" class="form-control" :class="{'input': true, 'is-danger': errors.has('cps_limit') }" v-validate="'numeric'" placeholder="Enter CPS Limit">
                            <span v-show="errors.has('cps_limit')" class="help is-danger">{{ errors.first('cps_limit') }}</span>
                        </div>
                        <div class="col-md-3 col-sm-3">
                            <label>Active:</label>
                            <select class="selectable" v-model="active">
                                <option v-for="item in status" v-bind:value="item.id">
                                    {{ item.text }}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <div class="checkbox checkbox-success m-top-33">
                                <input type="checkbox" v-model="t38" name="t38" id="t38">
                                <label for="t38">t38</label>
                            </div>
                        </div>
                        <div class="clearfix little-space"></div>
                        <div class="col-md-3 col-sm-4">
                            <label for="pdd_timeout">PDD Timeout:</label>
                            <input type="text" name="pdd_timeout" v-model="pdd_timeout" class="form-control" placeholder="Enter PDD Timeout">
                        </div>
                        
                        <div class="col-md-3 col-sm-4">
                            <label>Multi-Host Routing Strategy:</label>
                            <select class="selectable" v-model="multi_host_routing_strategy">
                                <option v-for="item in routing_strategies" v-bind:value="item.id">
                                    {{ item.text }}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <label for="min_duration">Min Duration:</label>
                            <input type="text" name="min_duration" v-model="min_duration" class="form-control" :class="{'input': true, 'is-danger': errors.has('min_duration') }" v-validate="'numeric'" placeholder="Enter Min Duration">
                            <span v-show="errors.has('min_duration')" class="help is-danger">{{ errors.first('min_duration') }}</span>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <label for="max_duration">Max Duration:</label>
                            <input type="text" name="max_duration" v-model="max_duration" class="form-control" :class="{'input': true, 'is-danger': errors.has('max_duration') }" v-validate="'numeric'" placeholder="Enter Max Duration">
                            <span v-show="errors.has('max_duration')" class="help is-danger">{{ errors.first('max_duration') }}</span>
                        </div>
                        <div class="clearfix little-space"></div>
                        <div class="col-md-3 col-sm-4">
                            <label>Rate Table:</label>
                            <select class="selectable" v-model="rate_table">
                                <option v-for="item in rate_tables" v-bind:value="item.id">
                                    {{ item.text }}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <label for="ring_timer">Ring Timer:</label>
                            <input type="text" name="ring_timer" v-model="ring_timer" class="form-control" :class="{'input': true, 'is-danger': errors.has('ring_timer') }" v-validate="'numeric'" placeholder="Enter Ring Timer">
                            <span v-show="errors.has('ring_timer')" class="help is-danger">{{ errors.first('ring_timer') }}</span>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <label>Authorized:</label>
                            <select class="selectable" v-model="authorized">
                                <option v-for="item in authorizations" v-bind:value="item.id">
                                    {{ item.text }}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-3 col-sm-4" v-if="type == 'egress'">
                            <div class="checkbox checkbox-success m-top-33">
                                <input type="checkbox" v-model="pass_lrn_header" name="checker1" id="checker1">
                                <label for="checker1">Pass LRN to Header</label>
                            </div>
                        </div>
                        <div class="clearfix little-space"></div>
                        <div class="col-md-3 col-sm-4">
                            <div class="checkbox checkbox-success m-top-33">
                                <input type="checkbox" v-model="rpid_caller_id" name="checker2" id="checker2">
                                <label for="checker2">Use RPID as Caller ID</label>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <div class="checkbox checkbox-success m-top-33">
                                <input type="checkbox" v-model="enforce_cid_block" name="enforce_cid_block" id="enforce_cid_block">
                                <label for="enforce_cid_block">Enforce CID Block</label>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-4" v-if="type == 'ingress'">
                            <label>Ignore Early Media:</label>
                            <select2 :options="ignore_early_media_options" v-model="ignore_early_media"></select2>
                        </div>
                         <div class="col-md-3 col-sm-4" v-if="type == 'ingress'">
                            <div class="checkbox checkbox-success m-top-33">
                                <input type="checkbox" v-model="ignore_early_nosdp" name="ignore_early_nosdp" id="ignore_early_nosdp">
                                <label for="ignore_early_nosdp">Ignore Early NOSDP</label>
                            </div>
                        </div>

                        <div class="clearfix little-space" v-if="type == 'ingress'"></div>
                        <div class="col-md-3 col-sm-4" v-if="type == 'ingress'">
                            <div class="checkbox checkbox-success m-top-33">
                                <input type="checkbox" v-model="enable_global_bloking" name="enable_global_bloking" id="enable_global_bloking">
                                <label for="enable_global_bloking">Enable Global 404 Blocking</label>
                            </div>
                        </div>

                        <div class="clearfix little-space"></div>
                        <div class="col-sm-8">
                            <div class="form-group">
                                <!--<select multiple="multiple" id="carrier" name="carrier" v-model="codec">
                                      <option v-for="codec in codecs" :value='codec.value'>{{codec.text}}</option>
                                    </select>-->
                                <el-transfer v-model="codec" :titles="['Codecs', 'Selected Codecs']" :data="codecs">
                                </el-transfer>
                            </div>
                        </div>
                        <div class="clearfix little-space"></div>
                        <div class="clearfix little-space"></div>
                        <div class="col-md-12">
                            <a class="btn btn-primary mini" @click="addHost">
                                <span class="dnl_icon dnl_add"></span> Add Host
                            </a>
                            <div class="table-responsive m-top-10">
                                <table class="table table-striped table-hover carrier_groups">
                                    <thead>
                                        <tr>
                                            <th>Type</th>
                                            <th>Host</th>
                                            <th>Port</th>
                                            <th class="width-65">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(host, index) in hosts">
                                            <td>
                                                <select class="selectable" v-model="host.type">
													<option v-for="item in host_types" v-bind:value="item.id">
														{{ item.text }}
													</option>
												</select>
                                            </td>
                                            <td>
                                                <input type="text" :value="host.host" class="form-control" v-model="host.host">
                                            </td>
                                            <td>
                                                <input v-if="host.type==1" type="text" :value="host.port" class="form-control" v-model="host.port">
                                            </td>
                                            <td class="text-center">
                                                <a class="action action_delete center-block" data-toggle="tooltip" data-placement="top" title="Delete" @click="delete_host(index)" >
                                                    <span class="dnl_icon dnl_action_delete"></span>
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="clearfix little-space"></div>
                        <div class="col-md-12" v-if="type == 'ingress'">
                            <a style="width: 300px" class="btn btn-primary mini" @click="addRouting">
                                <span class="dnl_icon dnl_add"></span> Add Routing and Tech-Prefix
                            </a>
                            <div class="table-responsive m-top-10">
                                <table class="table table-striped table-hover carrier_groups">
                                    <thead>
                                        <tr>
                                            <th>Product Name</th>
                                            <th>Tech Prefix</th>
                                            <th>Code</th>
                                            <th>CPS</th>
                                            <th>CAP</th>
                                            <th>Rate Table</th>
                                            <th>Route Plan</th>
                                            <th class="width-65">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(route, index) in routings">
                                             <td>
                                                <select class="selectable" v-model="route.product_id">
													<option v-for="item in product_options" v-bind:value="item.id">
														{{ item.text }}
													</option>
												</select>
                                            </td>
                                            <td>
                                                <input type="text" :value="route.tech_prefix" class="form-control" :disabled="route.product_id != 0">
                                            </td>
                                            <td>
                                                <input type="text" :value="route.code" class="form-control">
                                            </td>
                                            <td>
                                                <input type="text" :value="route.cps" class="form-control">
                                            </td>
                                            <td>
                                                <input type="text" :value="route.cap" class="form-control">
                                            </td>
                                            <td>
                                                <select class="selectable" v-model="route.rate_table" :disabled="route.product_id != 0">
													<option v-for="item in rate_tables" v-bind:value="item.id">
														{{ item.text }}
													</option>
												</select>
                                            </td>
                                            <td>
                                                <select class="selectable" v-model="route.route_plan" :disabled="route.product_id != 0">
													<option v-for="item in route_plan_options" v-bind:value="item.id">
														{{ item.text }}
													</option>
												</select>
                                            </td>
                                            <td class="text-center">
                                                <a class="action action_delete center-block" data-toggle="tooltip" data-placement="top" title="Delete" @click="delete_route(index)" >
                                                    <span class="dnl_icon dnl_action_delete"></span>
                                                </a>
                                            </td> 
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                </div>
                <div class="button_set little-space">
                    <a class="btn btn-primary mini" @click="validateBeforeSubmit">
                        Submit
                    </a>
                    <a class="btn btn-default mini" @click="reset">
                        Reset
                    </a>
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
import { mapActions } from 'vuex';
module.exports = {
    components: {
        'multiselect': multiselect,
        'select2': vSelect
    },
    props: ['type', 'id'],
    data: function () {
        return {
            carrier_selected: false,
            pageOne: {
                currentPage: 0,
                totalPages: 10,
                cntPerPage: 30,
            },
            route_plan_options: [],
            routings: [{
				product_id: 0,
				tech_prefix: '',
				code: '',
                cps: '',
                cap: '',
                rate_table: 0,
                route_plan: 0,
			}],
            product_options: [],

            enforce_cid_block: false,
            req_egress: {},
            req_ingress: {},
            enable_global_bloking: false,
            ignore_early_nosdp: false,
            ignore_early_media: 1,
            ignore_early_media_options: [
                {id: 1, text: 'NONE'},
                {id: 2, text: '180 and 183'},
                {id: 3, text: '180 only'},
                {id: 4, text: '183 only'},
            ],
            t38: false,
            label_format: 'Percentage',
            name: '',
            carrier: null,
            carriers: [],
            media_type: 'Proxy Media + Transcoding',
            min_profitability: 0,
            call_limit: 0,
            cps_limit: 0,
            active: true,
            pdd_timeout: '',
            multi_host_routing_strategy: 'top-down',
            pass_lrn_header: true,
            min_duration: 0,
            max_duration: 0,
            rate_table: 0,
            ring_timer: 0,
            rpid_caller_id: false,
            authorized: 'All',
            options: [
                { id: 1, value: 'carrier1', text: 'Carrier 1' },
                { id: 2, value: 'carrier2', text: 'Carrier 2' },
                { id: 3, value: 'carrier3', text: 'Carrier 3' },
                { id: 4, value: 'carrier4', text: 'Carrier 4' },
                { id: 5, value: 'carrier5', text: 'Carrier 5' }
            ],
            hosts: [
                {
                    type: 1,
                    host: '',
                    port: ''
                }
            ],
            media_types: [
                { id: 'Proxy Media + Transcoding', text: 'Proxy Media + Transcoding' },
                { id: 'Proxy Media', text: 'Proxy Media' },
                { id: 'Bypass Media', text: 'Bypass Media' }
            ],
            status: [
                { id: true, text: 'True' },
                { id: false, text: 'False' },
            ],
            routing_strategies: [
                { id: 'top-down', text: 'top-down' },
                { id: 'round-robin', text: 'round-robin' },
            ],
            rate_tables: [],
            authorizations: [
                { id: 'All', text: 'All' },
                { id: 'Authorized by Host Only', text: 'Authorized by Host Only' },
                { id: 'Accept Egress Registration', text: 'Accept Egress Registration' },
                { id: 'Register to Egress Trunk', text: 'Register to Egress Trunk' },
            ],
            codec: [],
            codecs: [
                {  value: 1, key: 'AMR(8000)/dynamic', label: 'AMR(8000)/dynamic' },
                {  value: 2, key: 'CN(8000)', label: 'CN(8000)' },
                {  value: 3, key: 'DV14(11025)', label: 'DV14(11025)' },
                {  value: 4, key: 'DV14(22050)', label: 'DV14(22050)' },
                {  value: 5, key: 'G7221(16000 or 32000)/dynamic', label: 'G7221(16000 or 32000)/dynamic' },
                {  value: 6, key: 'G7221C(32000)/dynamic', label: 'G7221C(32000)/dynamic' },
                {  value: 7, key: 'G722(8000)', label: 'G722(8000)' },
                {  value: 8, key: 'G723(8000)', label: 'G723(8000)' },
                {  value: 9, key: 'G726-16(8000)/dynamic', label: 'G726-16(8000)/dynamic' },
                {  value: 10, key: 'G726-24(8000)/dynamic', label: 'G726-24(8000)/dynamic' },
                {  value: 11, key: 'G726-32(8000)/dynamic', label: 'G726-32(8000)/dynamic' },
                {  value: 12, key: 'G726-40(8000)/dynamic', label: 'G726-40(8000)/dynamic' },
                {  value: 13, key: 'G728(8000)', label: 'G728(8000)' },
                {  value: 14, key: 'G729(8000)', label: 'G729(8000)' },
                {  value: 15, key: 'G729a', label: 'G729a' },
                {  value: 16, key: 'G729b', label: 'G729b' },
                {  value: 17, key: 'GSM(8000)', label: 'GSM(8000)' },
                {  value: 18, key: 'iLBC/dynamic', label: 'iLBC/dynamic' },
                {  value: 19, key: 'PCMA(G711.u 8000)', label: 'PCMA(G711.u 8000)' },
                {  value: 20, key: 'PCMU(G711.a 8000)', label: 'PCMU(G711.a 8000)' },
                {  value: 21, key: 'Speex(8000, 16000 or 32000)/dynamic', label: 'Speex(8000, 16000 or 32000)/dynamic' },
                {  value: 22, key: 'telephone-event/dynamic', label: 'telephone-event/dynamic' },

            ],
            host_types: [
                { id: 1, value: 'ip_address', text: 'IP Address' },
                { id: 2, value: 'host_name', text: 'Hostname' },
            ],
            min_profs: [
                { id: 'percentage', value: 'percentage', text: '%' },
                { id: 'value', value: 'value', text: 'Value' },
            ],
            min_prof_type: 'percentage',
        }
    },
    mounted: function () {
        $('#carrier').multiSelect({
            selectableHeader: "<div class='custom-header'>Codecs</div>",
            selectionHeader: "<div class='custom-header'>Selected</div>"
        });
    },
    created: function () {
        if(this.type == 'ingress'){
            this.fetchProducts();
            this.fetchRoutePlans();
        }   

        this.fetchCarriers();
      

        this.loading = true;
        this.$http.get(api.getEndpointUrl() + "/v1/switch/rate_table/list",
            {
                headers: {
                    "X-Auth-Token": auth.getToken()
                }
            }).then(function (response) {
                var self = this;
                this.loading = false;
                var rate_tables = response.body.payload.items;
                rate_tables.forEach(function (rate_table, i) {
                    var temp = {};
                    temp.id = rate_table.rate_table_id;
                    temp.text = rate_table.name;
                    self.rate_tables.push(temp);
                    if(i == 0) {
                        self.rate_table = temp.id;
                        self.routings[0].rate_table = temp.id;
                    }
                });
                console.log("rate_tables");
                console.log(this.rate_tables);
            }, function (error) {
                this.loading = false;
                console.log(error);
            });

    },
    methods: {
        ...mapActions({
			setMessage: 'app_message/setAppMessage'
        }),
        reset() {
           this.name = '';
           this.carrier = this.carriers.length > 0? this.carriers[0].id: '';
           this.media_type = 'Proxy Media + Transcoding';
           this.min_prof_type = 'percentage';
           this.label_format = '%';
           this.min_profitability = 0;
           this.call_limit = 0;
           this.cps_limit = 0;
           this.active = true;
           this.t38 = false;
           this.pdd_timeout = '';
           this.multi_host_routing_strategy = 'top-down';
           this.min_duration = 0;
           this.max_duration = 0;
           this.rate_table = this.rate_tables.length > 0? this.rate_tables[0].id: '';
           this.ring_timer = 0;
           this.authorized = 'All';
           this.pass_lrn_header = true;
           this.rpid_caller_id = false;
           this.enforce_cid_block = false;
           this.codec = [];
           this.hosts = [
                {
                    type: 1,
                    host: '',
                    port: ''
                }
            ];
        },
        fetchCarriers() {
            this.loading = true;
            var url;
            if(this.pageOne.currentPage === 0)
                url = api.getEndpointUrl() + "/v1/carrier/list"
            else
                url = api.getEndpointUrl() + "/v1/carrier/list?page=" + this.pageOne.currentPage
            console.log(url);
            this.$http.get(url,
                {
                    headers: {
                        "X-Auth-Token": auth.getToken()
                    }
                })
                .then(response => {
					const body = response.body
					if (body.success) {
						var self = this;
                        this.loading = false;
                        const payload = body.payload
                        var carriers = payload.items;
                        carriers.forEach(function (temp, i) {
                            var carrier = {};
                            carrier.id = temp.client_id;
                            carrier.text = temp.name;
                            self.carriers.push(carrier);
                            if(i==0 && self.pageOne.currentPage === 0)
                                self.carrier = carrier.id;    
                        });
                        this.pageOne.currentPage = payload.page + 1
                        this.pageOne.totalPages = Math.ceil(payload.total / payload.per_page)
                        this.pageOne.cntPerPage = payload.per_page;

                        console.log(this.pageOne.totalPages, this.pageOne.currentPage);

                        if(this.pageOne.totalPages > this.pageOne.currentPage)
                            this.fetchCarriers();
                        
                        else {
                            if(this.id != undefined) {
                                this.carrier = this.id;
                                this.carrier_selected = true;
                            }
                        }
                        
                        console.log("carriers");
                        console.log(this.carriers);
                        console.log(this.carrier);
					}
				})
				.catch(error => {
					console.log(error)
					this.loading = false;
				})
        },
        fetchRoutePlans() {
            const url = api.getEndpointUrl() + '/v1/route/plan/list'
            this.$http.get(url)
            .then(response => {
                const body = response.body
                if (body.success) {
                    const route_plans = body.payload.items
                    var self = this;
                    route_plans.forEach(function (temp, i) {
                        var route_plan = {};
                        route_plan.id = temp.route_plan_id;
                        route_plan.text = temp.name;
                        self.route_plan_options.push(route_plan);
                        if(i == 0) {
                            self.routings[0].route_plan = route_plan.id;
                        }
                    });
                    console.log(this.route_plan_options);
                    
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        fetchProducts() {
            const url = api.getEndpointUrl() + '/v1/product/list'
            this.$http.get(url)
            .then(response => {
                const body = response.body
                if (body.success) {
                    const products = body.payload.items
                    var self = this;
                    this.product_options = [];
                    this.product_options.push({
                        id: 0,
                        text: 'By Rate and Route Plan',
                    });
                    products.forEach(function (temp, i) {
                        var product = {};
                        product.id = temp.id;
                        product.text = temp.name;
                        self.product_options.push(product);                        
                    });
                    console.log(this.product_options);
                    
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        delete_route: function(id) {
            this.routings.splice(id, 1);
        },
        addRouting() {
            var vm = this;
            this.routings.push({
				product_id: 0,
				tech_prefix: '',
				code: '',
                cps: '',
                cap: '',
                rate_table: vm.rate_tables.length>0? vm.rate_tables[0].id: 0,
                route_plan: vm.route_plan_options.length>0? vm.route_plan_options[0].id: 0,
			});
        },
        delete_host: function(id){
			this.hosts.splice(id, 1);
		},
        addHost () {
            this.hosts.push({
				type: 1,
				host: '',
				port: '',
			});
        },
        getEgressForRequest() {
          this.req_egress.host_routing_strategy = this.multi_host_routing_strategy;
        //   this.req_egress.rpid_id_type = this.rpid_caller_id;
          this.req_egress.cps_limit = this.cps_limit;
          this.req_egress.call_limit = this.call_limit;
          this.req_egress.min_profit_value = this.min_profitability;
          var ip_list = [];
          this.hosts.forEach(function (item, i) {
                var host = {};
                host.ip = item.host;
                host.port = item.port;
                if(host.ip !== '' && host.port !== '')
                    ip_list.push(host);
            });
          this.req_egress.ip = ip_list;
          this.req_egress.authorization_type = this.authorized;
          this.req_egress.name = this.name;
          this.req_egress.min_profit_type = this.min_prof_type;
        //   this.req_egress.codes = [
        //         "string"
        //     ],
          this.req_egress.bypass_media = this.media_type;
          this.req_egress.is_active = this.active;
          this.req_egress.rate_table_id = this.rate_table;
          this.req_egress.pass_lrn = this.pass_lrn_header;
          this.req_egress.codecs = this.codec;
          this.req_egress.min_duration = this.min_duration;
          this.req_egress.max_duration = this.max_duration;
          this.req_egress.media_type = this.media_type;
          this.req_egress.ring_timeout = this.ring_timer;
        //   this.req_egress.media_timeout = this.pdd_timeout;
        //   this.req_egress.route_plan_id = 0,
        //   this.req_egress.prefix = "string",
          this.req_egress.enfource_cid = this.enforce_cid_block;
          this.req_egress.t38 = this.t38;
            
            return this.req_egress;
        },
        getIngressForRequest () {
            
          this.req_ingress.name = this.name;
          this.req_ingress.ignore_early_media = this.ignore_early_media;
          this.req_ingress.is_active = this.active;
          this.req_ingress.rate_table_id = this.rate_table;
          this.req_ingress.cps_limit = this.cps_limit;
          this.req_ingress.auth_type = this.authorized;
          this.req_ingress.ignore_early_no_sdp = this.ignore_early_nosdp;
        //   this.req_ingress.prefix = "string",
          this.req_ingress.enable_global_404_blocking = this.enable_global_bloking;
          this.req_ingress.call_limit = this.call_limit;
          this.req_ingress.min_profit_type = this.min_prof_type;
          this.req_ingress.enfource_cid = this.enforce_cid_block;
          this.req_ingress.min_profit_value = this.min_profitability;
            var ip_list = [];
          this.hosts.forEach(function (item, i) {
                var host = {};
                host.ip = item.host;
                host.port = item.port;
                if(host.ip !== '' && host.port !== '')
                    ip_list.push(host);
            });
            var prefixes = [];
            this.routings.forEach(function (item, i) {
                if(item.code !== '' && item.cps !== '' && item.cap !== '')
                    prefixes.push(item);

            });
            this.req_ingress.prefixes = prefixes;


          this.req_ingress.ip = ip_list;
          this.req_ingress.bypass_media = this.media_type;
          this.req_ingress.t38 = this.t38;

            return this.req_ingress;
        },
        createNewTrunk() {
            this.loading = true;
            var url, reqBody;
            if(this.type == 'egress') {
                url = api.getEndpointUrl() + '/v1/carrier/' + this.carrier + '/egress_trunk'
                reqBody = this.getEgressForRequest();
            }
            else if(this.type == 'ingress'){
                url = api.getEndpointUrl() + '/v1/carrier/' + this.carrier + '/ingress_trunk'
                reqBody = this.getIngressForRequest();
            }

            this.$http.post(url, reqBody,
            {
                headers: {
                    "X-Auth-Token": auth.getToken()
                }
            })
            .then(response => {
                if (response.body.success) {
                    this.setMessage('Trunk was created successfully');
                    var thisvm = this;
                    setTimeout(function(){
                        thisvm.$router.push('/routing/trunks');
                    }, 3000);
                }
            })
            .catch(error => {
                console.log(error)
                this.setMessage({
                    message: 'Failed to create trunk',
                    type: 'error'
                })
            })	
        },
        validateBeforeSubmit() {
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
					vm.createNewTrunk();
				}
					
			}).catch((error) => {
				// eslint-disable-next-line
				console.log(error)
				vm.setMessage({
					message: 'Validation failed',
					type: 'error'
				})
			});
        },
    }
}
</script>

<style>
a.btn.btn-primary.biggest.pull-right {
    width: 250px;
}
</style>
