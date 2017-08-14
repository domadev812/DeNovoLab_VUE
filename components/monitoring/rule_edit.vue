<template>
    <div class="container-fluid">
        <div class="row">
            <div class="wrapper single">
                <time-display></time-display>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="#">Monitoring</a>
                    </li>
                    <li class="breadcrumb-item">
                        <router-link to="/monitoring/rule">Rule</router-link>
                    </li>
                    <li class="breadcrumb-item active">Rule Editor</li>
                </ol>
                <h1 class="page-header">Rule Editor</h1>
                <router-link to="/monitoring/rule" class="btn btn_white back">
                    <span class="dnl_icon dnl_import"></span> Back </router-link>
                <dtabs class="user_tabs wizard_steps">
                    <tab label="Define Monitoring Scope" class="" p="STEP 1" icon="dnl_icon dnl_modem" selected>
                        <div class="row">
                            <form class="form" @submit.prevent="toStep2">
                                <div class="col-md-3 col-sm-4">
                                    <div class="form-group">
                                        <label>Monitoring Rule Name:</label>
                                        <input type="text" name="monitoring_rule_name" v-model="monitoring_rule_name" class="form-control" :class="{ 'input': true, 'is-danger': errors.has('monitoring_rule_name') }" v-validate:monitoring_rule_name="'required'" data-vv-as="Monitoring Rule Name" placeholder="Enter Monitoring Rule Name">
                                        <span v-show="errors.has('monitoring_rule_name')" class="help is-danger">{{ errors.first('monitoring_rule_name') }}</span>
                                    </div>
                                </div>
                                <div class="col-md-3 col-sm-4">
                                    <div class="form-group">
                                        <label>Monitoring on:</label>
                                        <!--<select2 :options="monitoring_options" v-model="monitoring_on" class="inline-block">
                                        </select2>-->
                                        <select class="selectable" v-model="monitoring_on">
										<option v-for="monitoring_option in monitoring_options" v-bind:value="monitoring_option.id">
											{{ monitoring_option.text }}
										</option>
									</select>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                                <div class="col-md-6 col-sm-8">
                                    <div class="form-group">
    
                                        <label for="groupname">Trunk List:</label>
                                        <!--<select multiple="multiple" id="trunk_list" name="trunk_list">
            								<option v-for="option in options" :value='option.value'>{{option.text}}</option>
            							  </select>-->
    
                                        <el-transfer v-model="trunks" :titles="['Optional Selection', 'Selected Selection']" :data="trunk_options" :class="{ 'input': true, 'is-danger': errors.has('trunks') }" v-validate:trunks="'required'" data-vv-as="Trunk List">
                                        </el-transfer>
                                        <span v-show="errors.has('trunks')" class="help is-danger">{{ errors.first('trunks') }}</span>
    
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                                <div class="col-md-3 col-sm-4">
                                    <div class="form-group">
                                        <label>Include:</label>
                                        <!--<select2 :options="include_options" v-model="include" class="inline-block">
                                        </select2>-->
                                        <select class="selectable" v-model="include">
                                            <option v-for="include_option in include_options" v-bind:value="include_option.id">
                                                {{ include_option.text }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-3 col-sm-4">
                                    <div class="form-group">
                                        <label>Exclude:</label>
                                        <!--<select2 :options="exclude_options" v-model="exclude" class="inline-block">
                                        </select2>-->
                                        <select class="selectable" v-model="exclude">
                                            <option v-for="exclude_option in exclude_options" v-bind:value="exclude_option.id">
                                                {{ exclude_option.text }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="clearfix little-space"></div>
                                <div class="col-md-3 col-sm-4">
                                    <button class="btn btn-primary" type="submit">
                                        Next
                                    </button>
                                    <!--<a class="btn btn-primary mini">Next</a>-->
                                </div>
                            </form>
                        </div>
                    </tab>
                    <tab label="Define Condition" class="" p="STEP 2" icon="dnl_icon dnl_setting" @click="toStep2">
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group fix-select">
                                <label>Monitor Data by:</label>
                                <!--<select2 :options="monitor_data_by_options" v-model="monitor_data_by" class="inline-block">
                                </select2>-->
                                <select class="selectable" v-model="monitor_data_by">
                                    <option v-for="monitor_data_by_option in monitor_data_by_options" v-bind:value="monitor_data_by_option.id">
                                        {{ monitor_data_by_option.text }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group fix-select">
                                <label>ACD:</label>
                                <!--<select2 :options="condition_options" v-model="acd" class="inline-block">
                                </select2>-->
                                <select class="selectable" v-model="acd">
                                    <option v-for="condition_option in condition_options" v-bind:value="condition_option.id">
                                        {{ condition_option.text }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group fix-select">
                                <label>ASR:</label>
                                <!--<select2 :options="condition_options" v-model="asr" class="inline-block">
                                </select2>-->
                                <select class="selectable" v-model="asr">
                                    <option v-for="condition_option in condition_options" v-bind:value="condition_option.id">
                                        {{ condition_option.text }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group fix-select">
                                <label>ABR:</label>
                                <!--<select2 :options="condition_options" v-model="abr" class="inline-block">
                                </select2>-->
                                <select class="selectable" v-model="abr">
                                    <option v-for="condition_option in condition_options" v-bind:value="condition_option.id">
                                        {{ condition_option.text }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group fix-select">
                                <label>PDD:</label>
                                <!--<select2 :options="condition_options" v-model="pdd" class="inline-block">
                                </select2>-->
                                <select class="selectable" v-model="pdd">
                                    <option v-for="condition_option in condition_options" v-bind:value="condition_option.id">
                                        {{ condition_option.text }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group fix-select">
                                <label>Profitability:</label>
                                <!--<select2 :options="condition_options" v-model="profitability" class="inline-block">
                                </select2>-->
                                <select class="selectable" v-model="profitability">
                                    <option v-for="condition_option in condition_options" v-bind:value="condition_option.id">
                                        {{ condition_option.text }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group fix-select">
                                <label>Revenue:</label>
                                <!--<select2 :options="condition_options" v-model="revenue" class="inline-block">
                                </select2>-->
                                <select class="selectable" v-model="revenue">
                                    <option v-for="condition_option in condition_options" v-bind:value="condition_option.id">
                                        {{ condition_option.text }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group">
                                <label>Min Call Attempt:</label>
                                <!--<input type="text" name="min_call_attempt" v-model="min_call_attempt" class="form-control" :class="{ 'input': true, 'is-danger': errors.has('min_call_attempt') }" v-validate:min_call_attempt="'required'" data-vv-as="Min Call Attempt" placeholder="Enter Min Call Attempt">
                                <span v-show="errors.has('min_call_attempt')" class="help is-danger">{{ errors.first('min_call_attempt') }}</span>-->
                                <input type="text" name="min_call_attempt" v-model="min_call_attempt" class="form-control" placeholder="Enter Min Call Attempt">
                            </div>
                        </div>
                        <div class="clearfix little-space"></div>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <a class="btn btn-default mini min" @click="toStep1">Previous</a>
                            <a class="btn btn-primary mini" @click="toStep3">Next</a>
                        </div>
                        <div class="clearfix"></div>
                    </tab>
                    <tab label="Define Frequency And Sample Size" class="" p="STEP 3" icon="dnl_icon dnl_tick">
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group fix-select">
                                <label>Execution Schedule:</label>
                                <!--<select2 :options="schedule_options" v-model="execution_schedule" class="inline-block">
                                </select2>-->
                                <select class="selectable" v-model="execution_schedule">
                                    <option v-for="condition_option in condition_options" v-bind:value="condition_option.id">
                                        {{ condition_option.text }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group">
                                <label>Sample Size:</label>
                                <input type="text" name="monitoring_rule_name" v-model="sample_size" class="form-control" placeholder="Enter Sample Size">
                            </div>
                        </div>
                        <div class="clearfix little-space"></div>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <a class="btn btn-default mini min" @click="toStep2">Previous</a>
                            <a class="btn btn-primary mini" @click="toStep4">Next</a>
                        </div>
                        <div class="clearfix"></div>
                    </tab>
                    <tab label="Define Action" class="" p="STEP 4" icon="dnl_icon dnl_badges">
                        <div class="col-md-4 col-sm-4">
                            <div class="form-group">
                                <div class="checkbox checkbox-success">
                                    <input id="active" name="active" type="checkbox" v-model="active">
                                    <label for="active">Active</label>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix little-space"></div>
                        <div class="col-md-4 col-sm-4">
                            <div class="form-group">
                                <div class="checkbox checkbox-success">
                                    <input id="block" name="block" type="checkbox" v-model="block">
                                    <label for="block">Block</label>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group fix-select">
                                <label>Enable Auto-Unblock:</label>
                                <select2 :options="auto_options" v-model="auto_unblock" class="inline-block">
                                </select2>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-4">
                            <div class="form-group">
                                <label>Unblock After (mins):</label>
                                <input type="text" name="unblock_after" v-model="unblock_after" class="form-control" placeholder="Enter Minutes">
                                <!--<input type="text" name="unblock_after" v-model="unblock_after" class="form-control" :class="{ 'input': true, 'is-danger': errors.has('unblock_after') }" v-validate:unblock_after="'required|numeric'" data-vv-as="Unblock After Minutes" placeholder="Enter Minutes">
                                <span v-show="errors.has('unblock_after')" class="help is-danger">{{ errors.first('unblock_after') }}</span>-->
                            </div>
                        </div>
                        <div class="clearfix little-space"></div>
                        <div class="col-md-4 col-sm-4">
                            <div class="form-group">
                                <div class="checkbox checkbox-success">
                                    <input id="send_email" name="send_email" type="checkbox" v-model="send_email">
                                    <label for="send_email">Send E-mail</label>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <div class="col-md-3 col-sm-6">
                            <div class="form-group fix-select">
                                <label for="max_lines">From E-mail:</label>
                                <select2 :options="from_email_options" v-model="from_email"></select2>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-6">
                            <div class="form-group fix-select">
                                <label for="max_lines">Send to:</label>
                                <select2 :options="sendto_options" v-model="send_to"></select2>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <div class="col-md-8 col-sm-8">
                            <div class="form-group">
                                <label for="max_lines">Subject:</label>
                                <input type="text" name="max_lines" v-model="subject" class="form-control" placeholder="Enter Subject">
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <div class="col-md-8 col-sm-8">
                            <label>Content:</label>
                            <!--<ckeditor v-model="contentA" :id="editorA" :height="'280px'" :toolbar="[['Format']]"></ckeditor>-->
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="contentA">
                            </el-input>
                        </div>
                        <div class="col-md-12 m-top-20">
                            <div class="form-group tags">
                                <label for="groupname">Tags:</label>
                                <span class="label label-default">#Username</span>
                                <span class="label label-default">#Url</span>
                                <span class="label label-default">#Welcoms</span>
                            </div>
                        </div>
                        <div class="clearfix little-space"></div>
                        <div class="col-md-6 col-sm-6 col-xs-12 m-top-25">
                            <a class="btn btn-default mini min" @click="toStep3">Previous</a>
                            <a class="btn btn-primary mini" @click="saveRule">Finish</a>
                        </div>
                        <div class="clearfix"></div>
                    </tab>
                </dtabs>
            </div>
        </div>
    </div>
</template>

<script>   
const vTab = require('vue!../main_components/tab.vue'),
    vDTab = require('vue!../main_components/disable_tabs.vue'),
    vSelect = require('vue!../main_components/select.vue'),
    Pagination = require('vue!../main_components/pagination.vue'),
    multiselect = require('multiselect'),
    Ckeditor = require('vue!../main_components/ckeditor.vue');
const api = require("../../api");
const auth = require("../../auth");
	_ = require('lodash');
	import {mapGetters,	mapActions} from 'vuex'

module.exports = {
    components: {
        'tab': vTab,
        'dtabs': vDTab,
        'select2': vSelect,
        'pagination': Pagination,
        'multiselect': multiselect,
        Ckeditor
    },
    data: function () {
        return {
            id: 0,
            send_email: '1',
            block: true,
            active: '1',
            editorA: 'editor-a',
            contentA: '',
            monitoring_rule_name: '',
            monitoring_on: 'egress trunks',
            include: 'all codes',
            exclude: [
                0
            ],
            monitor_data_by: 'Trunk',
            acd: '1',
            asr: '1',
            abr: '1',
            pdd: '1',
            profitability: '1',
            revenue: '1',
            min_call_attempt: '',
            execution_schedule: '0',
            sample_size: '',
            from_email: 0,
            subject: '',
            send_to: 1,
            auto_unblock: false,
            unblock_after: '',
            from_email_options: [
                {id: 0, value: 'Default', text: 'Default'},
            ],
            sendto_options: [
                {id: 1, value: 'Your Own NOC Email', text: 'Your Own NOC Email'},
                {id: 2, value: 'Partner’s NOC Email', text: 'Partner’s NOC Email'},
                {id: 3, value: 'Both', text: 'Both'},
            ],
            auto_options: [
                {id: false, value: 'No', text: 'No'},
                {id: true, value: 'Yes', text: 'Yes'},
            ],
            schedule_options: [
                {id: '0', value: 'Never', text: 'Never'},
                {id: '1', value: 'Every Specific Minutes', text: 'Every Specific Minutes'},
                {id: '2', value: 'Daily', text: 'Daily'},
                {id: '3', value: 'Weekly', text: 'Weekly'},
            ],
            condition_options: [
                { id: '1', value: 'Ignore', text: 'Ignore' },
                { id: '>', value: '>', text: '>' },
                { id: '<', value: '<', text: '<' },
                { id: '=', value: '=', text: '=' },
            ],
            monitor_data_by_options: [
                { id: 'Trunk', value: 'Trunk', text: 'Trunk' },
                { id: 'Trunk And DNIS', value: 'Trunk And DNIS', text: 'Trunk And DNIS' },
                { id: 'Trunk And ANI', value: 'Trunk And ANI', text: 'Trunk And ANI' },
                { id: 'DNIS', value: 'DNIS', text: 'DNIS' },
                { id: 'ANI', value: 'ANI', text: 'ANI' },
                { id: 'Trunk And Destination', value: 'Trunk And Destination', text: 'Trunk And Destination' },
                { id: 'Trunk And Country', value: 'Trunk And Country', text: 'Trunk And Country' },
                { id: 'Trunk And Code', value: 'Trunk And Code', text: 'Trunk And Code' },
            ],
            include_options: [
                { id: 'all codes', value: 'all codes', text: 'all codes' },
                { id: 'specific codes', value: 'specific codes', text: 'specific codes' },
            ],
            exclude_options: [
                { id: 'null', value: 'null', text: 'null' },
                { id: 'specific codes', value: 'specific codes', text: 'specific codes' },
            ],
            monitoring_options: [
                { id: 'egress trunks', value: 'egress trunks', text: 'egress trunks' },
                { id: 'ingress trunks', value: 'ingress trunks', text: 'ingress trunks' },
            ],
            trunk_list: [],
            trunk_options: [],
            trunks: [],
            step: 1,
            requestForm: {},
        }
    },
    watch: {
        'monitoring_on': function () {
            console.log("watch");
            this.trunk_options = [];
            var vm = this;
            console.log(this.trunk_list);
            this.trunk_list.forEach(function (trunk, i) {
                if (((vm.monitoring_on == "egress trunks" && trunk.direction == "egress") ||
                    (vm.monitoring_on == "ingress trunks" && trunk.direction == "ingress"))
                    && trunk.active) {
                    var temp = {};
                    temp.key = trunk.id;
                    temp.label = trunk.name;
                    vm.trunk_options.push(temp);
                }
            });
            console.log("selected trunks");
            console.log(this.trunk_options);
        }
    },
    methods: {
        ...mapActions({
            setAsyncConfirm: 'async_confirm/setAsyncConfirm',
            setMessage: 'app_message/setAppMessage'
        }),
        activateTab(tab) {
            if (tab.name == "Define Monitoring Scope") {
                console.log("Define Monitoring Scope");
            } else if (tab.name == "Define Condition") {
                console.log("Define Condition");
            } else if (tab.name == "Define Frequency And Sample Size") {
                console.log("Define Frequency And Sample Size");

            } else if (tab.name == "Define Action") {
                console.log("Define Action");

            }
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
        saveRule() {
            this.$validator.validateAll().then(() => {
                console.log("validate");
                // eslint-disable-next-line
                this.loading = true;

                this.requestForm.active = this.active;
                this.requestForm.block = this.block;
                this.requestForm.auto_unblock = this.auto_unblock;
                this.requestForm.unblock_after = this.unblock_after;
                this.requestForm.send_email = this.send_email;
                this.requestForm.from_email = this.from_email;
                this.requestForm.send_to = this.send_to;
                this.requestForm.subject = this.subject;
                this.requestForm.contentA = this.contentA;
                console.log(this.requestForm);

                this.$http.patch(api.getEndpointUrl() + '/v1/monitoring/rule/' + this.id,
                {
                    "run_on": 0,
                    "scope": "0",
                    "run_every": 0,
                    "html_content": this.requestForm.contentA,
                    "min_attempt": this.requestForm.min_call_attempt,
                    "name": this.requestForm.monitoring_rule_name,
                    "profitability_operator": this.requestForm.profitability,
                    "schedule": this.requestForm.execution_schedule,
                    "exclude_codes": this.requestForm.exclude,
                    "acd_operator": this.requestForm.acd,
                    "auto_unblock_after": this.requestForm.unblock_after,
                    "sample_period": this.requestForm.sample_size,
                    "block": this.requestForm.block,
                    "run_day_of_week": 0,
                    "acd_value": 0,
                    "auto_unblock": this.requestForm.auto_unblock,
                    "from_mail_id": this.requestForm.from_email,
                    "asr_value": 0,
                    "subject": this.requestForm.subject,
                    "trunks": this.requestForm.trunks,
                    "activate": this.requestForm.active,
                    "send_email": this.send_email,
                    "asr_operator": this.requestForm.asr,
                    "monitor_ingress": true,
                    "profitability_value": 0,
                    "revenue_operator": this.requestForm.revenue,
                    "pdd_operator": this.requestForm.pdd,
                    "revenue_value": 0,
                    "send_to": this.requestForm.send_to,
                    "all_trunks": true,
                    "pdd_value": 0
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

                        this.$router.push('/monitoring/rule');
                        this.setMessage('The rule has been changed!');
                    },
                    function(response) {
                        console.log(response);
                        this.loading = false;

                        this.setMessage({
                            message: "Editing rule is failed!",
                            type: "error"
                        });
                    }
                )
            }).catch(() => {
                // eslint-disable-next-line
            });
        },
        toStep4() {
            this.$validator.validateAll().then(() => {
                console.log("validate");
                // eslint-disable-next-line
                this.loading = true;

                this.requestForm.execution_schedule = this.execution_schedule;
                this.requestForm.sample_size = this.sample_size;

                this.step = 4;
                this.selectTab(3);
            }).catch(() => {
                // eslint-disable-next-line

            });
        },
        toStep3() {
            this.$validator.validateAll().then(() => {
                console.log("validate");
                // eslint-disable-next-line
                this.loading = true;

                this.requestForm.monitor_data_by = this.monitor_data_by;
                this.requestForm.acd = this.acd;
                this.requestForm.asr = this.asr;
                this.requestForm.abr = this.abr;
                this.requestForm.pdd = this.pdd;
                this.requestForm.profitability = this.profitability;
                this.requestForm.revenue = this.revenue;
                this.requestForm.min_call_attempt = this.min_call_attempt;

                this.step = 3;
                this.selectTab(2);
            }).catch(() => {
                // eslint-disable-next-line

            });
        },
        toStep2() {
            console.log("toStep2");
            this.$validator.validateAll().then(() => {
                console.log("validate");
                // eslint-disable-next-line
                this.loading = true;

                this.requestForm.monitoring_rule_name = this.monitoring_rule_name;
                this.requestForm.monitoring_on = this.monitoring_on;
                this.requestForm.trunks = this.trunks;
                this.requestForm.include = this.include;
                this.requestForm.exclude = this.exclude;
                console.log(this.requestForm);

                this.step = 2;
                // this.selectTab(0);
                this.$nextTick(this.selectTab(1));
            }).catch(() => {
                // eslint-disable-next-line

            });
        },
        toStep1() {
            this.step = 1;
            // this.selectTab(0);
            this.$nextTick(this.selectTab(0));
        }
    },
    created: function () {
        console.log("created");
        this.loading = true;
        this.step = 1;
        this.$http.get(api.getEndpointUrl() + "/v1/trunk/list",
            {
                headers: {
                    "X-Auth-Token": auth.getToken()
                }
            }).then(function (response) {
                var self = this;
                this.loading = false;
                var items = response.body.payload.items;
                items.forEach(function (item, i) {
                    var trunk = {};
                    trunk.id = item.trunk_id;
                    trunk.name = item.trunk_name;
                    trunk.direction = item.direction;
                    trunk.active = item.active;
                    self.trunk_list.push(trunk);
                });
                console.log("trunk_list");
                console.log(this.trunk_list);

                this.trunk_options = [];
                var vm = this;
                this.trunk_list.forEach(function (trunk, i) {
                    if (trunk.direction == "egress" && trunk.active) {
                        var temp = {};
                        temp.key = trunk.id;
                        temp.label = trunk.name;
                        vm.trunk_options.push(temp);
                    }
                });
                console.log(this.trunk_options);


            }, function (error) {
                this.loading = false;
                console.log(error);
            });

        this.loading = true;
        var id = this.$route.params.id;
        this.id = id;
        this.$http.get(api.getEndpointUrl() + "/v1/monitoring/rule/" + id,
            {
                headers: {
                    "X-Auth-Token": auth.getToken()
                }
            }).then(function (response) {
                var self = this;
                this.loading = false;
                var item = response.body.payload;

                this.monitoring_rule_name = item.name;
                this.monitoring_on = 'egress trunks';
                this.trunks = item.trunks;
                this.include = 'all codes';
                this.exclude = item.exclude_codes;
                this.monitor_data_by = 'Trunk';
                this.acd = item.acd_operator;
                this.asr = item.asr_operator;
                this.abr = '1';
                this.pdd = item.asr_operator;
                this.profitability = item.profitability_operator;
                this.revenue = item.revenue_operator;
                this.min_call_attempt = item.min_attempt;
                this.execution_schedule = item.schedule;
                this.sample_size = item.sample_period;
                this.active = item.activate;
                this.block = item.block;
                this.auto_unblock = item.auto_unblock;
                this.unblock_after = item.auto_unblock_after;
                this.send_email = item.send_email;
                this.from_email = item.from_mail_id;
                this.send_to = item.send_to;
                this.subject = item.subject;
                this.contentA = item.html_content;

                console.log(item);
            }, function (error) {
                this.loading = false;
                console.log(error);
            });

    },
    mounted: function () {
        // $('#egress_trunk_list').multiSelect({
        // 	 selectableHeader: "<div class='custom-header'>Optional Selection</div>",
        // 	 selectionHeader: "<div class='custom-header'>Selected Selection</div>"
        // });
    }
}
</script>

<style>
.tab span.dnl_icon.dnl_tick {
    font-size: 17px;
    margin-right: 2px;
}

.col-md-6.col-sm-6.col-xs-12.m-top-25 {
    margin-top: 25px;
}
</style>
