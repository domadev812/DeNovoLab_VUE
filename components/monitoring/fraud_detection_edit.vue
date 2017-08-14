<template>
    <div class="container-fluid">
        <div class="row">
            <div class="wrapper single">
                <time-display></time-display>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a>Monitoring</a>
                    </li>
                    <li class="breadcrumb-item">
                        <router-link to="/monitoring/fraud_detection/default">Fraud Detection</router-link>
                    </li>
                    <li class="breadcrumb-item active">Fraud Detection Editor</li>
                </ol>
                <h1 class="page-header">Fraud Detection Editor</h1>
                <router-link to="/monitoring/fraud_detection/default" class="btn btn_white back">
                <span class="dnl_icon dnl_import"></span> Back </router-link>
                <div class="white_pad configuration_pad">
                    <spinner v-show="loading" class="spinner"></spinner>
                    <div class="col-md-12 col-sm-12">
                        <form class="form" @submit.prevent="validateBeforeSubmit">
                            <div class="row">
                                <div class="col-md-3 col-sm-6">
                                    <div class="form-group">
                                        <label for="alias">Rule Name:</label>
                                        <input type="text" name="alias" v-model="data.alias" class="form-control" placeholder="Enter Alias">
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Ingress Trunk List:</label>
                                        <!--<select multiple="multiple" id="or_trunk" name="or_trunk" v-model="ingress_trunks">
                                                <option v-for="trunk in trunk_options" :value='trunk.value'>{{trunk.text}}</option>
                                            </select>-->
                                        <el-transfer v-model="data.ingress_trunks" :titles="['Selectable Fields', 'Selected Fields']" :data="ingress_trunk_options">
                                        </el-transfer>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <label>Fraud Checking Criteria:</label>
                                        </div>
                                        <div class="clearfix little-space"></div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="ftp_execute_on">1 Hour Minute >=</label>
                                                <input type="text" name="ftp_execute_on" v-model="data.one_hour_duration" class="form-control" placeholder="Enter Minutes">
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="max_lines">1 Hour Revenue >=</label>
                                                <input type="text" name="max_lines" v-model="data.one_hour_revenue" class="form-control" placeholder="Enter Minutes">
                                            </div>
                                        </div>
                                        <div class="clearfix"></div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="max_lines">24 Hours Revenue >=</label>
                                                <input type="text" name="max_lines" v-model="data.hour_24_duration" class="form-control" placeholder="Enter Minutes">
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="max_lines">24 Hours Revenue >=</label>
                                                <input type="text" name="max_lines" v-model="data.hour_24_revenue" class="form-control" placeholder="Enter Minutes">
                                            </div>
                                        </div>
                                        <div class="clearfix little-space"></div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <div class="checkbox checkbox-success">
                                                    <input id="block_ani" name="block_ani" type="checkbox" v-model="data.enable_block">
                                                    <label for="block_ani">Block ANI</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix little-space"></div>
                                <div class="col-md-4 col-sm-4">
                                    <div class="form-group">
                                        <div class="checkbox checkbox-success">
                                            <input id="active" name="active" type="checkbox" v-model="data.enable_email">
                                            <label for="active">Send E-mail</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                                <div v-if="data.enable_email">
                                    <div class="col-sm-12">
                                        <label>Email to:</label>
                                        <div class="form-group">
                                            <div class="radio radio-success m-right-10">
                                                <input id="radio-1" class="radio-custom" name="duplicates" type="radio" checked>
                                                <label for="radio-1" class="radio-custom-label">Your Own NOC</label>
                                            </div>
                                            <div class="radio radio-success m-right-10">
                                                <input id="radio-2" class="radio-custom" name="duplicates" type="radio">
                                                <label for="radio-2" class="radio-custom-label">Partner’s NOC</label>
                                            </div>
                                            <div class="radio radio-success m-right-10">
                                                <input id="radio-2" class="radio-custom" name="duplicates" type="radio">
                                                <label for="radio-2" class="radio-custom-label">Both</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-md-3 col-sm-6">
                                        <div class="form-group">
                                            <label for="max_lines">Notification Subject:</label>
                                            <input type="text" name="max_lines" v-model="max_lines" class="form-control" placeholder="Enter Notification Subject">
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="col-md-8 col-sm-8">
                                        <label>Content:</label>
                                        <!--<ckeditor v-model="contentA" :id="editorA" :height="'280px'" :toolbar="[['Format']]"></ckeditor>-->
                                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="contentA">
                                        </el-input>
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
                        </form>
                    </div>
                    <div class="clearfix little-space"></div>
                </div>
            </div>
        </div>
    </div>
</template>`

<script>   
const multiselect = require('multiselect'),
    vSelect = require('vue!../main_components/select.vue'),
    Ckeditor = require('vue!../main_components/ckeditor.vue');
const api = require("../../api");
const auth = require("../../auth");
const vSpinner = require('vue!../main_components/fadeloader.vue');
_ = require('lodash');
import {mapGetters,	mapActions} from 'vuex'

module.exports = {
    components: {
        'multiselect': multiselect,
        'select2': vSelect,
        'spinner': vSpinner,
        Ckeditor
    },
    data: function () {
        return {
            loading: false,
            apiUrl: '/v1/monitoring/fraud_detection/',
            editorA: 'editor-a',
            contentA: '',
            ingress_trunk_options: [],
            orc: [],
            alias: '',
            ftp_execute_on: '',
            max_lines: '',
            server_ip: '',
            server_port: '',
            user_name: '',
            server_dir: '',
            pass: '',
            select: '',
            groupname: '',
            options: [
                { id: 1, value: 'carrier1', text: 'Carrier 1' },
                { id: 2, value: 'carrier2', text: 'Carrier 2' },
                { id: 3, value: 'carrier3', text: 'Carrier 3' },
                { id: 4, value: 'carrier4', text: 'Carrier 4' },
                { id: 5, value: 'carrier5', text: 'Carrier 5' }
            ],
            id: null,
            // ingress_trunks: [],
            data: {},
        }
    },
    mounted: function () {
        // $('#or_trunk').multiSelect({
        //     selectableHeader: "<div class='custom-header'>Selectable Fields</div>",
        //     selectionHeader: "<div class='custom-header'>Selected Fields</div>"
        // });
    },
    created: function () {
        this.fetchIngressTrunks();
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
                var fraud = response.body.payload;
                // fraud.ingress_trunks.forEach(function (item, i) {
                //     vm.ingress_trunks.push(item.trunk_id);
                // });
                // console.log(this.ingress_trunks);

                Vue.set(this.data, 'alias', fraud.name);
                Vue.set(this.data, 'one_hour_duration', fraud.one_hour_duration);
                Vue.set(this.data, 'one_hour_revenue', fraud.one_hour_revenue);
                Vue.set(this.data, 'hour_24_duration', fraud.hour_24_duration);
                Vue.set(this.data, 'hour_24_revenue', fraud.hour_24_revenue);
                Vue.set(this.data, 'enable_block', fraud.enable_block);
                Vue.set(this.data, 'enable_email', fraud.enable_email);
                Vue.set(this.data, 'ingress_trunks', fraud.ingress_trunks);
                console.log("ingress_trunks list");
                console.log(this.data.ingress_trunks);

            }, function (error) {
                this.loading = false;
                console.log(error);
            });
    },
    methods: {
        ...mapActions({
            setAsyncConfirm: 'async_confirm/setAsyncConfirm',
            setMessage: 'app_message/setAppMessage'
        }),
        fetchIngressTrunks() {
            const url = api.getEndpointUrl() + '/v1/trunk/ingress/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const ingress_trunks = body.payload.items
						var self = this;
						ingress_trunks.forEach(function (temp, i) {
							var trunk = {};
							trunk.key = temp.resource_id;
							trunk.label = temp.name;
							self.ingress_trunk_options.push(trunk);
						});
						console.log(this.ingress_trunk_options);
						
					}
				})
				.catch(error => {
					console.log(error)
				})
        },
        validateBeforeSubmit() {
            console.log("validateBeforeSubmit");
            this.$validator.validateAll().then(() => {
                console.log("validator");
                this.loading = true;

                // var ingress_trunks = [];
                // $("#or_trunk").val().forEach(function (item, i) {
                //     ingress_trunks.push(item);
                // });
                console.log("before api call");
                console.log(this.data.ingress_trunks);
                console.log(this.data.enable_email);
                console.log(this.data.enable_block);

                this.$http.patch(api.getEndpointUrl() + '/v1/monitoring/fraud_detection/' + this.id,
                    {
                        "ingress_trunks": this.data.ingress_trunks,
                        "enable_block": this.data.enable_block,
                        "mail_sender_id": this.data.mail_sender_id,
                        "one_hour_revenue": this.data.one_hour_revenue,
                        "one_hour_duration": this.data.one_hour_duration,
                        "enable_email": this.data.enable_email,
                        "hour_24_revenue": this.data.hour_24_revenue,
                        "hour_24_duration": this.data.hour_24_duration,
                        "name": this.data.alias,
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
                        this.$router.push('/monitoring/fraud_detection/default');
                        this.setMessage('The fraud detection has been changed!');
                    },
                    function (error) {
                        this.loading = false;
                        console.log(error);
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
.radio.radio-success.m-right-10 {
    margin-right: 10px;
}

.radio.radio-success.m-right-10 .radio-custom+.radio-custom-label:before {
    margin-right: 5px;
}
</style>
