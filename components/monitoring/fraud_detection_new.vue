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
                    <div class="col-md-12 col-sm-12">
                        <form class="form" @submit.prevent="validateBeforeSubmit">
                            <div class="row">
                                <div class="col-md-3 col-sm-6">
                                    <div class="form-group">
                                        <label for="alias">Rule Name:</label>
                                        <input type="text" name="alias" v-model="alias" class="form-control" placeholder="Enter Alias">
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>Ingress Trunk List:</label>
                                        <!--<select multiple="multiple" id="or_trunk" name="or_trunk">
                                                <option v-for="trunk in trunk_options" :value='trunk.value'>{{trunk.text}}</option>
                                            </select>-->
                                        <el-transfer v-model="ingress_trunks" :titles="['Selectable Fields', 'Selected Fields']" :data="trunk_options">
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
                                                <input type="text" name="ftp_execute_on" v-model="one_hour_duration" class="form-control" placeholder="Enter Minutes">
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="max_lines">1 Hour Revenue >=</label>
                                                <input type="text" name="max_lines" v-model="one_hour_revenue" class="form-control" placeholder="Enter Minutes">
                                            </div>
                                        </div>
                                        <div class="clearfix"></div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="max_lines">24 Hours Minute >=</label>
                                                <input type="text" name="max_lines" v-model="hour_24_duration" class="form-control" placeholder="Enter Minutes">
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label for="max_lines">24 Hours Revenue >=</label>
                                                <input type="text" name="max_lines" v-model="hour_24_revenue" class="form-control" placeholder="Enter Minutes">
                                            </div>
                                        </div>
                                        <div class="clearfix little-space"></div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <div class="checkbox checkbox-success">
                                                    <input id="block_ani" name="block_ani" type="checkbox" v-model="enable_block">
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
                                            <input id="active" name="active" type="checkbox" v-model="enable_email">
                                            <label for="active">Send E-mail</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
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
</template>

<script>   
//  const multiselect = require('multiselect'),
    // vSelect = require('vue!../main_components/select.vue'),
    // Ckeditor = require('vue!../main_components/ckeditor.vue');
const api = require("../../api");
const auth = require("../../auth");
_ = require('lodash');
import {mapGetters,	mapActions} from 'vuex'

module.exports = {
    components: {
        // 'multiselect': multiselect,
        // 'select2': vSelect,
        // Ckeditor
    },
    data: function () {
        return {
            editorA: 'editor-a',
            contentA: '',
            ingress_trunks: [],
            trunk_options: [
                { key: 1, label: 'Trunk 1' },
                { key: 2, label: 'Trunk 2' },
                { key: 3, label: 'Trunk 3' },
                { key: 4, label: 'Trunk 4' },
                { key: 5, label: 'Trunk 5' }
                // { id: 1, value: 1, text: 'Trunk 1' },
                // { id: 2, value: 2, text: 'Trunk 2' },
                // { id: 3, value: 3, text: 'Trunk 3' },
                // { id: 4, value: 4, text: 'Trunk 4' },
                // { id: 5, value: 5, text: 'Trunk 5' }
            ],
            orc: [],

            alias: '',
            enable_email: true,
            one_hour_duration: 0,
            hour_24_duration: 0,
            one_hour_revenue: 0,
            enable_block: true,
            mail_sender_id: 0,
            hour_24_revenue: 0,

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
        }
    },
    mounted: function () {
        // $('#or_trunk').multiSelect({
        //     selectableHeader: "<div class='custom-header'>Selectable Fields</div>",
        //     selectionHeader: "<div class='custom-header'>Selected Fields</div>"
        // });
    },
    methods: {
        ...mapActions({
            setAsyncConfirm: 'async_confirm/setAsyncConfirm',
            setMessage: 'app_message/setAppMessage'
        }),
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
                console.log(this.ingress_trunks);
                console.log(this.enable_email);
                console.log(this.enable_block);

                this.$http.post(api.getEndpointUrl() + '/v1/monitoring/fraud_detection',
                    {
                        "name": this.alias,
                        "enable_email": this.enable_email,
                        "one_hour_duration": this.one_hour_duration,
                        "hour_24_duration": this.hour_24_duration,
                        "one_hour_revenue": this.one_hour_revenue,
                        "hour_24_revenue": this.hour_24_revenue,
                        "enable_block": this.enable_block,
                        "ingress_trunks": this.ingress_trunks,
                        "mail_sender_id": this.mail_sender_id,
                    },
                    {
                        headers: {
                            "X-Auth-Token": auth.getToken()
                        }
                    }
                ).then(
                    function (response) {
                        console.log("success");
                        console.log(response);
                        this.loading = false;
                        this.$router.push('/monitoring/fraud_detection/default');
                        this.setMessage('The fraud detection has been created!');
                    },
                    function (error) {
						this.loading = false;
						console.log(error);

						this.setMessage({
                            message: "Creating fraud detection is failed!",
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
.radio.radio-success.m-right-10 {
    margin-right: 10px;
}

.radio.radio-success.m-right-10 .radio-custom+.radio-custom-label:before {
    margin-right: 5px;
}
</style>
