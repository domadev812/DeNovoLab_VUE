<template>
    <div class="container-fluid">
        <div class="row">
            <div class="wrapper single">
                <time-display></time-display>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="#">Routing</a>
                    </li>
                    <li class="breadcrumb-item active">Wizard</li>
                </ol>
                <h1 class="page-header">Wizard</h1>
                <dtabs class="user_tabs wizard_steps">
                    <tab label="Define Carrier" class="" p="STEP 1" icon="dnl_icon dnl_persona" selected>
                        <div class="row">
                            <div class="col-md-3 col-sm-4">
                                <div class="form-group">
                                    <label>Choose Carrier:</label>
                                    <!--<select2 :options="carrier_options" v-model="is_new_carrier" class="inline-block">
                                    </select2>-->
                                    <select class="selectable" v-model="is_new_carrier">
                                        <option v-for="item in carrier_options" v-bind:value="item.id">
                                            {{ item.text }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-4" v-if="is_new_carrier" >
                                <div class="form-group">
                                    <label>Carrier Name:</label>
                                    <input type="text" name="carrier_name" v-model="carrier_name" class="form-control" :class="{'input': true, 'is-danger': errors.has('carrier_name') }" v-validate="'required'" placeholder="Enter Carrier Name">
                                    <span v-show="errors.has('carrier_name')" class="help is-danger">{{ errors.first('carrier_name') }}</span>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-4" v-if="!is_new_carrier">
                                <div class="form-group">
                                    <label class="m-top-15"></label>
                                    <select class="selectable" v-model="carrier_id" @change="onchange(index)">
                                        <option value="0" selected disabled>Select Carrier</option>
                                        <option v-for="item in existing_carrier_options" v-bind:value="item.id">
                                            {{ item.text }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-4" v-if="is_new_carrier" >
                                <div class="form-group">
                                    <label>Mode:</label>
                                    <!--<select2 :options="mode_options" v-model="mode" class="inline-block">
                                    </select2>-->
                                    <select class="selectable" v-model="is_prepay">
                                        <option v-for="item in mode_options" v-bind:value="item.id">
                                            {{ item.text }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-4" v-if="is_new_carrier">
                                <div class="form-group">
                                    <label for="test_credit">{{ is_prepay === true ? 'Test Credit:' : 'Allowed Credit:' }}</label>
                                    <input v-if="is_prepay === true" type="text" name="test_credit" v-model="test_credit" class="form-control" :class="{ 'input': true, 'is-danger': errors.has('test_credit') }" v-validate="'numeric'" data-vv-as="Test Credit" placeholder="Enter Test Credit">
                                    <span v-if="is_prepay === true" v-show="errors.has('test_credit')" class="help is-danger">{{ errors.first('test_credit') }}</span>
                                    <div v-if="is_prepay === false" class="checkbox checkbox-success" style="display: flex;">
                                        <input id="is_unlimited" name="is_unlimited" style="margin: 10px 5px;" v-model="is_unlimited" type="checkbox">
                                        <label for="is_unlimited" style="margin: 10px 5px;">Unlimited</label>
                                        <input v-if="is_unlimited === false" type="text" style="width: 80%; float: right;" name="allowed_credit" v-model="allowed_credit" class="form-control" :class="{ 'input': true, 'is-danger': errors.has('allowed_credit') }" v-validate="'numeric'" data-vv-as="Allowed Credit" placeholder="Enter Allowed Credit">
                                        <span v-if="is_unlimited === false" v-show="errors.has('allowed_credit')" class="help is-danger">{{ errors.first('allowed_credit') }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-4" v-if="is_new_carrier" >
                                <div class="form-group">
                                    <label for="company_name">Company Name:</label>
                                    <input type="text" name="company_name" v-model="company_name" class="form-control" placeholder="Enter Company Name">
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-4" v-if="is_new_carrier" >
                                <div class="form-group">
                                    <label for="main_email">Main E-mail:</label>
                                    <input type="email" name="main_email" v-model="main_email" class="form-control" placeholder="Enter Main E-mail">
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-4" v-if="is_new_carrier" >
                                <div class="form-group">
                                    <label for="noc_email">Noc E-mail:</label>
                                    <input type="noc_email" name="noc_email" v-model="noc_email" class="form-control" placeholder="Enter Noc E-mail">
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-4" v-if="is_new_carrier" >
                                <div class="form-group">
                                    <label for="billing_email">Billing E-mail:</label>
                                    <input type="email" name="billing_email" v-model="billing_email" class="form-control" placeholder="Enter Billing E-mail">
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-4" v-if="is_new_carrier" >
                                <div class="form-group">
                                    <label for="rate_delivery_email">Rate Delivery E-mail:</label>
                                    <input type="email" name="rate_delivery_email" v-model="rate_delivery_email" class="form-control" placeholder="Enter Rate Delivery E-mail">
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-4" v-if="is_new_carrier" >
                                <div class="form-group">
                                    <label for="rates_email">Rates E-mail:</label>
                                    <input type="email" name="rates_email" v-model="rates_email" class="form-control" placeholder="Enter Rates E-mail">
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            <div class="col-md-3 col-sm-4">
                                <a class="btn btn-primary mini m-top-20" @click="nextTab">Next</a>
                            </div>
                        </div>
                    </tab>
                    <tab label="Define Trunk" class="" p="STEP 2" icon="dnl_icon dnl_ingress_host">
                        <div class="row">
                            <div class="col-md-3 col-sm-4">
                                <div class="form-group fix-select">
                                    <label>Choose Trunk:</label>
                                    <!--<select2 :options="trunk_options" v-model="is_new_trunk" class="inline-block">
                                    </select2>-->
                                    <select class="selectable" v-model="is_new_trunk">
                                        <!--<option v-for="item in trunk_options" v-bind:value="item.id">
                                            {{ item.text }}
                                        </option>-->
                                        <option v-bind:value="true">New Trunk</option>
                                        <option v-bind:value="false" :disabled="!existing_trunk_options.length">Existing Trunk</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-4" v-if="is_new_trunk" >
                                <div class="form-group">
                                    <label>Trunk Name:</label>
                                    <input type="text" name="trunk_name" v-model="trunk_name" class="form-control" :class="{'input': true, 'is-danger': errors.has('trunk_name') }" v-validate="'required'" placeholder="Enter Trunk Name">
								    <span v-show="errors.has('trunk_name')" class="help is-danger">{{ errors.first('trunk_name') }}</span>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-4" v-if="!is_new_trunk">
                                <div class="form-group">
                                    <label class="m-top-15"></label>
                                    <select class="selectable" v-model="existing_trunk">
                                        <option v-for="item in existing_trunk_options" v-bind:value="item.id">
                                            {{ item.text }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            <hr>
                            <h2 class="role_section_name">Host List</h2>
                            <div class="table-responsive">
                                <div class="table_filters">
                                    <a class="btn btn-primary mini pull-right" @click="add_ip">
                                        <span class="dnl_icon dnl_add"></span> Add Host
                                    </a>
                                </div>
                                <table class="table table-striped table-hover ips">
                                    <thead>
                                        <tr>
                                            <th>IP</th>
                                            <th>Port</th>
                                            <th class="width-65">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(ip, index) in ips">
                                            <td>
                                                <input type="text" :name="ip.ip" v-model="ip.ip" class="form-control" :class="{'input': true, 'is-danger': errors.has('ip.ip') }" v-validate="'required'" placeholder="Enter IP">
								                <span v-show="errors.has('ip.ip')" class="help is-danger">{{ errors.first('ip.ip') }}</span>
                                            </td>
                                            <td>
                                                <input type="text" :name="ip.port" v-model="ip.port" class="form-control" :class="{'input': true, 'is-danger': errors.has('ip.port') }" v-validate="'required'" placeholder="Enter Port">
								                <span v-show="errors.has('ip.port')" class="help is-danger">{{ errors.first('ip.port') }}</span>
                                            </td>
                                            <td class="width-65 text-center">
                                                <a data-toggle="tooltip" data-placement="top" title="" class="action action_delete" data-original-title="Delete" @click="delete_ip(index)">
                                                    <span class="dnl_icon dnl_action_delete"></span>
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="clearfix little-space"></div>
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <a class="btn btn-default mini min" @click="prevTab">Previous</a>
                                <a class="btn btn-primary mini" @click="nextTab">Next</a>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </tab>
                    <tab label="Define Route" class="" p="STEP 3" icon="dnl_icon dnl_modem">
                        <div class="row">
                            <div class="col-md-3 col-sm-4">
                                <div class="form-group">
                                    <label>Prefix:</label>
                                    <input type="text" name="prefix" v-model="prefix" class="form-control" placeholder="Enter Prefix">
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            <div class="col-md-6 col-sm-8">
                                <div class="form-group">
                                    <label for="groupname">Vendor:</label>
                                    <!--<select multiple="multiple" id="egress_trunk_list" name="egress_trunk_list">
                                        <option v-for="option in options" :value='option.value'>{{option.text}}</option>
                                    </select>-->
                                    <el-transfer v-model="trunks" :titles="['Trunk List:', 'Selected Trunk List:']" :data="trunks_options">
							        </el-transfer>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix little-space"></div>
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <a class="btn btn-default mini min" @click="prevTab">Previous</a>
                                <a class="btn btn-primary mini" @click="nextTab">Next</a>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </tab>
                    <tab label="Define Rate" class="" p="STEP 4" icon="dnl_icon dnl_money">
                        <div class="row">
                            <div class="col-md-3 col-sm-4">
                                <div class="form-group fix-select">
                                    <label>Choose Rate Table:</label>
                                    <!--<select2 :options="rate_table_options" v-model="is_new_rate_table"></select2>-->
                                    <select class="selectable" v-model="is_new_rate_table">
                                        <option v-for="item in rate_table_options" v-bind:value="item.id">
                                            {{ item.text }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-4" v-if="is_new_rate_table" >
                                <div class="form-group fix-select">
                                    <label>Rate Table Name:</label>
                                    <input type="text" name="rate_table_name" v-model="rate_table_name" class="form-control" :class="{'input': true, 'is-danger': errors.has('rate_table_name') }" v-validate="'required'" placeholder="Enter Rate Table Name">
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-4" v-if="is_new_rate_table" >
                                <div class="form-group fix-select">
                                    <label>Code Deck:</label>
                                    <select2 :options="code_deck_options" v-model="code_deck"></select2>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-4" v-if="!is_new_rate_table" >
                                <div class="form-group fix-select">
                                    <label>Rate Table:</label>
                                    <select2 :options="existing_rate_table_options" v-model="rate_table"></select2>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-4" v-if="is_new_rate_table" >
                                <div class="form-group fix-select">
                                    <label>Currency:</label>
                                    <select2 :options="currency_options" v-model="currency"></select2>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-4" v-if="is_new_rate_table" >
                                <div class="form-group fix-select">
                                    <label>Type:</label>
                                    <select2 :options="type_options" v-model="type"></select2>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-4" v-if="is_new_rate_table" >
                                <div class="form-group fix-select">
                                    <label>Rate Type:</label>
                                    <select2 :options="rate_type_options" v-model="rate_type"></select2>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-4" v-if="is_new_rate_table" >
                                <div class="form-group fix-select">
                                    <label>Choose Rate Generation Template:</label>
                                    <select2 :options="rate_template_options" v-model="rate_template"></select2>
                                </div>
                            </div>
                            <div class="col-md-1 col-sm-1" v-if="is_new_rate_table" >
                                <div class="inline_actions">
                                    <a>
                                        <span class="dnl_icon dnl_add"></span>
                                    </a>
                                    <a>
                                        <span class="dnl_icon dnl_reload"></span>
                                    </a>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            <div class="col-md-3 col-sm-4" v-if="is_new_rate_table" >
                                <div class="form-group">
                                    <label for="effective_date">Effective Date:</label>
                                    <el-date-picker v-model="effective_date" type="date" placeholder="Effective Date"></el-date-picker>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-4" v-if="is_new_rate_table" >
                                <div class="form-group">
                                    <label for="end_date">End Date:</label>
                                    <el-date-picker v-model="end_date" type="date" placeholder="End Date"></el-date-picker>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            <div class="col-md-3 col-sm-4" v-if="is_new_rate_table" >
                                <div class="form-group m-top-33">
                                    <div class="checkbox checkbox-success">
                                        <input id="send_email" name="send_email" type="checkbox" v-model="send_email" >
                                        <label for="send_email">Send E-mail</label>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            <div class="col-md-3 col-sm-4" v-if="send_email ||  is_new_rate_table">
                                <div class="form-group fix-select">
                                    <label>E-mail Template:</label>
                                    <select2 :options="email_temp_options" v-model="email_template"></select2>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix little-space"></div>
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <a class="btn btn-default mini min" @click="prevTab">Previous</a>
                                <a class="btn btn-primary mini" @click="validateForCreate">Finish</a>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </tab>
                </dtabs>
            </div>
        </div>
    </div>
</template>

<script>   
const vDTab = require('vue!../main_components/disable_tabs.vue'),
    vTab = require('vue!../main_components/tab.vue'),
    vSelect = require('vue!../main_components/select.vue'),
    Pagination = require('vue!../main_components/pagination.vue'),
    modal = require('vue!../main_components/modal.vue'),
    multiselect = require('multiselect');
const api = require("../../api");
module.exports = {
    components: {
        'dtabs': vDTab,
        'tab': vTab,
        'select2': vSelect,
        'pagination': Pagination,
        'modal': modal,
        'multiselect': multiselect
    },
    data: function () {
        return {
            rate_table_name: '',
            carrier: {},
            client: {},
            ratetable_list: {},
            email_template: '1',
            email_temp_options: [
                { id: '1', text: 'generation test' },
            ],
            send_email: false,
            end_date: '',
            effective_date: '',
            rate_template: '1',
            rate_template_options: [
                { id: '1', text: 'generation test' },
            ],
            rate_type: 'A-Z',
            rate_type_options: [
                { id: 'A-Z', text: 'A-Z' },
                { id: 'US Non-JD', text: 'US Non-JD ' },
                { id: 'US JD', text: 'US JD' },
                { id: 'OCN-LATA-JD', text: 'OCN-LATA-JD' },
                { id: 'OCN-LATA-NON-JD', text: 'OCN-LATA-NON-JD' },
            ],
            type: 'DNIS',
            type_options: [
                { id: 'DNIS', text: 'DNIS' },
                { id: 'LRN', text: 'LRN' },
                { id: 'LRN BLOCK', text: 'LRN BLOCK' },
            ],
            currency: '',
            currency_options: [],
            code_deck: '',
            code_deck_options: [],
            rate_table: '',
            existing_rate_table_options: [],
            is_new_rate_table: true,
            rate_table_options: [
                { id: true, text: 'New Rate Table' },
                { id: false, text: 'Existing Rate Table' },
            ],
            trunks: [],
            trunks_options: [],
            prefix: '',
            ips: [],
            existing_trunk: '',
            existing_trunk_options: [],
            trunk_name: '',
            is_new_trunk: true,
            trunk_options: [
                { id: true, text: 'New Trunk' },
                { id: false, text: 'Existing Trunk' },
            ],
            actived_tab_index: 0,
            noc_email: '',
            billing_email: '',
            rate_delivery_email: '',
            rates_email: '',
            main_email: '',
            company_name: '',
            test_credit: '',
            allowed_credit: '',
            is_unlimited: false,
            is_prepay: true,
            mode_options: [
                { id: true, text: 'Prepaid' },
                { id: false, text: 'Postpaid' },
            ],
            carrier_id: '',
            existing_carrier_options: [],
            carrier_name: '',
            is_new_carrier: true,
            carrier_options: [
                { id: true, text: 'New Carrier' },
                { id: false, text: 'Existing Carrier' },
            ],
        }
    },
    watch: {
        
    },
    methods: {
        onchange: function(index) {
            this.fetchRelatedTrunks();
        },
        getRateTableForRequest() {
            const ratetables = Object.assign({}, this.ratetable_list)

            ratetables.currency_id = this.currency;
            ratetables.rate_type_name = this.rate_type;
            ratetables.billing_method = this.type;
            ratetables.name = this.rate_table_name;
            ratetables.code_deck_id = this.code_deck;
        },
        createNewRateTable() {
            const reqBody = this.getRateTableForRequest()
            var url = api.getEndpointUrl() + '/v1/switch/rate_table/create';
            console.log('Request Body:', reqBody)
            this.$http.post(url, reqBody)
                .then(response => {
                    if (response.body.success) {
                        console.log(response.body);
                        this.rate_table = response.body.object_id;

                        if(this.is_new_trunk)
                            this.createNewClient();       
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getClientForRequest() {
            // This method "extracts" the text of the selected option.
            // "sent_at" and "recipient" need to be added here (at the moment they
            // don't exist on API)
            const client = Object.assign({}, this.client)
            // client.is_new_carrier = this.is_new_carrier;
            // client.carrier_name = this.carrier_name;
            
            // client.mode = this.mode == true? '1': '2';
            // client.test_credit = this.test_credit;
            // client.ips = this.ips;
            // client.routing = this.routing == true? '1': '2';
            // client.username = this.username;
            // client.password = this.password;
            // client.is_account_summary = this.is_account_summary;
            // client.is_rate_table = this.is_rate_table;
            // client.is_trunks = this.is_trunks;
            // client.is_products = this.is_products;
            // client.is_balance = this.is_balance;
            // client.is_payment_history = this.is_payment_history;
            // client.is_online_payment = this.is_rate_tis_online_paymentable;
            // client.is_invoices = this.is_invoices;
            // client.is_cdr_list = this.is_cdr_list;
            // client.is_summary_report = this.is_summary_report;
            // client.is_sip_packet_search = this.is_sip_packet_search;
            // client.deploy_carrier_template = this.deploy_carrier_template;
            // client.carrier_template = this.carrier_template;
            // client.ingress_template = this.ingress_template;

            // for creating trunk
            client.host_routing_strategy = "top-down";
            client.min_profit_type =  "percentage";
            client.rate_table_id = this.rate_table;
            client.min_profit_value = 0;
            client.pass_lrn = 0;
            client.name = this.trunk_name;
            client.codes = ["string"];
            client.min_duration = 0;
            client.bypass_media = "Bypass Media";
            client.cps_limit = 0;
            client.codecs = this.trunks;
            client.is_active = true;
            client.call_limit = 0;
            client.authorization_type = "All";

            console.log("client");
            console.log(client);

            return client
        },
        createNewClient() {
            console.log('Attempting to create new client')

            const reqBody = this.getClientForRequest()
            var url = api.getEndpointUrl() + '/v1/carrier/' + this.carrier_id + '/egress_trunk';
            // if(this.is_ingress_trunk)
            //     url += '/ingress_trunk';
            // else
            //     url += '/egress_trunk';
            console.log('Request Body:', reqBody)
            this.$http.post(url, reqBody)
                .then(response => {
                    if (response.body.success) {
                        console.log(response.body);
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getCarrierForRequest () {
            const carrier = Object.assign({}, this.carrier)

            carrier.account_detail = '';
            carrier.is_active = true;
            carrier.short_call_charge = 0;
            carrier.test_credit = this.test_credit;
            carrier.daily_cdr_delivery = true;
            carrier.report_frequency = 0;
            carrier.currency_name = 'USA';
            carrier.daily_usage_summary = true;
            carrier.rates_email = this.rates_email;
            carrier.auto_invoice_type = "buy";
            carrier.credit_limit = 0;
            carrier.daily_usage_group_by = "By Country";
            carrier.main_email = this.main_email;
            carrier.short_call_percent = 0;
            carrier.low_balance_alert = true;
            carrier.address = '';
            carrier.daily_balance_summary = true;
            carrier.daily_usage_on_non_zero = true;
            carrier.is_prepay = this.is_prepay;
            carrier.name = this.carrier_name;
            carrier.short_call_charge_exceed_only = 0;
            carrier.call_limit = 0;
            carrier.trunk_update_alert = true;
            carrier.billing_email = this.billing_email;
            carrier.profit_type = "percentage";
            carrier.company = this.company_name;
            carrier.short_call_duration = 0;
            carrier.noc_email = this.noc_email;
            carrier.one_time_report_time = 0;
            carrier.cps_limit = 0;

            return carrier
        },
        createNewCarrier () {
            const reqBody = this.getCarrierForRequest();
				const url = api.getEndpointUrl() + '/v1/carrier/basic/create';
				this.$http.post(url, reqBody)
					.then(response => {
						if (response.body.success) {
							// this.setMessage('Carrier was created successfully');
							console.log(response.body);
							this.carrier_id = response.body.object_id;
                            if(this.is_new_rate_table)
                                this.createNewRateTable();
                            else if(this.is_new_trunk)
                                this.createNewClient();
						}
					})
					.catch(error => {
						console.log(error)
						this.setMessage({
							message: 'Failed to create carrier',
							type: 'error'
						})
					})
        },
        fetchAllTrunks () {
            const url = api.getEndpointUrl() + '/v1/trunk/list'
            this.$http.get(url)
            .then(response => {
                const body = response.body
                if (body.success) {
                    const trunks = body.payload.items
                    console.log(trunks);
                    var self = this;
                    trunks.forEach(function (temp, i) {
                        var trunk = {};
                        trunk.value = i;
                        trunk.key = temp.trunk_name
                        trunk.label = temp.trunk_name;
                        self.trunks_options.push(trunk);
                    });
                    console.log(this.trunks_options);
                    
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        fetchRateTable() {
            const url = api.getEndpointUrl() + '/v1/switch/rate_table/list'
            this.$http.get(url)
            .then(response => {
                const body = response.body
                if (body.success) {
                    const rate_table_list = body.payload.items
                    console.log(rate_table_list);
                    var self = this;
                    rate_table_list.forEach(function (temp, i) {
                        var rate_table = {};
                        rate_table.id = temp.rate_table_id;
                        rate_table.text = temp.name;
                        self.existing_rate_table_options.push(rate_table);
                        if(i == 0)
                            self.rate_table = rate_table.id;
                    });
                    console.log(this.existing_rate_table_options);
                    
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        fetchRelatedTrunks () {
            const url = api.getEndpointUrl() + '/v1/carrier/' + this.carrier_id + '/egress_trunk/list'
            this.$http.get(url)
            .then(response => {
                const body = response.body
                if (body.success) {
                    const trunks = body.payload.items
                    console.log(trunks);
                    var self = this;
                    this.existing_trunk_options = [];
                    trunks.forEach(function (temp, i) {
                        var trunk = {};
                        trunk.id = temp.resource_id;
                        trunk.text = temp.name;
                        self.existing_trunk_options.push(trunk);
                        if(i == 0)
                            self.existing_trunk = trunk.id;
                    });
                    console.log(this.existing_trunk_options);
                    this.is_new_trunk = true;

                    // trunks.forEach(function (temp, i) {
                    //     var trunk = {};
                    //     trunk.value = i;
                    //     trunk.key = temp.trunk_id
                    //     trunk.label = temp.trunk_name;
                    //     self.trunks_options.push(trunk);
                    // });
                    // console.log(this.trunks_options);
                    
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        fetchCarriers () {
            const url = api.getEndpointUrl() + '/v1/carrier/list'
            this.$http.get(url)
            .then(response => {
                const body = response.body
                if (body.success) {
                    const carriers = body.payload.items
                    console.log(carriers);
                    var self = this;
                    carriers.forEach(function (temp, i) {
                        var carrier = {};
                        carrier.id = temp.client_id;
                        carrier.text = temp.name;
                        self.existing_carrier_options.push(carrier);
                        if(i == 0) {
                            self.carrier_id = carrier.id;
                            self.fetchRelatedTrunks();
                        }
                    });
                    console.log(this.existing_carrier_options);
                    
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        create() {
            if(this.is_new_carrier) {
                this.createNewCarrier()
            }	
            else {
                if(this.is_new_rate_table)
                    this.createNewRateTable();
                else if(this.is_new_trunk)
                    this.createNewClient();
            }
        },
        validateForCreate () {
            this.$validator.validateAll()
            .then(this.create)
            .catch(error => {
                console.log(error)
                this.setMessage({
                    message: 'Validation failed',
                    type: 'error'
                })
            })
        },
        fetchCurrencies () {
            const url = api.getEndpointUrl() + '/v1/switch/currency/list'
            this.$http.get(url)
            .then(response => {
                const body = response.body
                if (body.success) {
                    const currencies = body.payload.items
                    var self = this;
                    currencies.forEach(function (temp, i) {
                        var currency = {};
                        currency.id = temp.currency_id;
                        currency.text = temp.code;
                        self.currency_options.push(currency);
                        if (i == 0)
                            self.currency = currency.id;
                    });
                    console.log(this.currency_options);
                    
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        fetchCodeDecks () {
            const url = api.getEndpointUrl() + '/v1/switch/code_deck/list'
            this.$http.get(url)
            .then(response => {
                const body = response.body
                if (body.success) {
                    const code_decks = body.payload.items
                    var self = this;
                    code_decks.forEach(function (temp, i) {
                        var code_deck = {};
                        code_deck.id = temp.code_deck_id;
                        code_deck.text = temp.name;
                        self.code_deck_options.push(code_deck);
                        if (i == 0)
                            self.code_deck = code_deck.id;
                    });
                    console.log(this.code_deck_options);
                    
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        add_ip () {
            this.ips.push({
                ip: '',
                port: ''
            })
        },
        delete_ip (id) {
            this.ips.splice(id, 1);
        },
        selectTab(index) {
            console.log("selectTab");
            var tabList = document.querySelectorAll('.tab');
            console.log(tabList);
            for (var i = 0; i < tabList.length; i++) {
                if ((index) == i) { tabList[i].setAttribute("class", "tab active"); }
                else { tabList[i].setAttribute("class", "tab"); }
            }
            var tabContentList = document.querySelectorAll('.tab_wrapper');
            for (var i = 0; i < tabContentList.length; i++) {
                if ((index) == i) { tabContentList[i].style = null; }
                else { tabContentList[i].style.display = 'none'; }
            }
        },
        prevTab() {
            this.actived_tab_index -= 1;
            this.selectTab(this.actived_tab_index);
        },
        nextTab() {
            this.actived_tab_index += 1;
            this.selectTab(this.actived_tab_index);
        },
    },
    mounted: function () {
        $('#egress_trunk_list').multiSelect({
            selectableHeader: "<div class='custom-header'>Optional Selection</div>",
            selectionHeader: "<div class='custom-header'>Selected Selection</div>"
        });
        $('[data-toggle="tooltip"]').tooltip();
    },
    created () {
        this.fetchCodeDecks();
        this.fetchCurrencies();
        this.fetchCarriers();
        this.fetchAllTrunks();
        this.fetchRateTable();
    }
}
</script>

<style>
.tab span.dnl_icon.dnl_ingress_host {
    font-size: 18px;
    padding-top: 2px;
}
</style>
