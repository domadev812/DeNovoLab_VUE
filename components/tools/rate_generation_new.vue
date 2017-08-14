<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Tools</a></li>
				  <li class="breadcrumb-item">
					  <router-link to="/tools/rate_generation">Rate Generation</router-link>
				  </li>
				  <li class="breadcrumb-item active">New</li>
			</ol>
			<h1 class="page-header">Rate Generation Editor</h1>
			<router-link to="/tools/rate_generation" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
            <spinner v-show="loading" class="spinner"></spinner>
			<div class="white_pad">
                <div class="col-md-3 col-sm-3">
                    <label for="rate_template_name">Rate Template Name:</label>
                    <input type="text" name="rate_template_name" v-model="rate.name" class="form-control" :class="{'input': true, 'is-danger': errors.has('rate_template_name') }" v-validate="'required'" placeholder="Enter Rate Template Name">
                    <span v-show="errors.has('rate_template_name')" class="help is-danger">{{ errors.first('rate_template_name') }}</span>
                </div>
                <div class="col-md-3 col-sm-3">
                    <label>Rate Table:</label>
                    <select class="selectable" v-model="rate.rate_table_type">
                        <option v-for="item in rate_table_options" v-bind:value="item.id">
                            {{ item.text }}
                        </option>
                    </select>
                </div>
                <div class="col-md-3 col-sm-3">
                    <label>Calculate Rate Based on LCR:</label>
                    <select class="selectable" v-model="rate.lcr_digit">
                        <option v-for="item in calculate_rate_options" v-bind:value="item.id">
                            {{ item.text }}
                        </option>
                    </select>
                </div>
                <div class="col-md-3 col-sm-3">
                    <label for="default_rate">Default Rate if No Egress is Available:</label>
                    <input type="text" name="default_rate" v-model="rate.default_rate" class="form-control" :class="{'input': true, 'is-danger': errors.has('default_rate') }" v-validate="{ rules: {required: true, regex: /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/} }" placeholder="Enter Rate">
                    <span v-show="errors.has('default_rate')" class="help is-danger">{{ errors.first('default_rate') }}</span>
                </div>
                <div class="clearfix little-space"></div>
                <div class="col-md-3 col-sm-3">
                    <label>Decimal Places:</label>
                    <select class="selectable" v-model="rate.decimal_places">
                        <option v-for="item in decimal_places_options" v-bind:value="item.id">
                            {{ item.text }}
                        </option>
                    </select>
                </div>
                <div class="col-md-3 col-sm-3">
                    <label>Code Deck:</label>
                    <select class="selectable" v-model="rate.code_deck_id">
                        <option v-for="item in code_deck_options" v-bind:value="item.id">
                            {{ item.text }}
                        </option>
                    </select>
                </div>
                <div class="col-md-3 col-sm-3">
                    <label>Effective Date:</label>
                    <select class="selectable" v-model="rate.effective_days">
                        <option v-for="item in effective_date_options" v-bind:value="item.id">
                            {{ item.text }}
                        </option>
                    </select>
                </div>
                <div class="clearfix little-space"></div>
                <div class="col-md-6 col-sm-6">
                    <div class="form-group">
                        <label for="groupname">Vendors:</label>
                        <el-transfer v-model="rate.vendors" :titles="['Vendors', 'Selected']" :data="vendor_options">
                        </el-transfer>
                    </div>
                </div>
                <div class="col-md-3 col-sm-3">
                    <div class="checkbox checkbox-success m-top-33">
                          <input type="checkbox" v-model="rate.include_blocked_route" name="is_include_blocked_route" id="is_include_blocked_route"> 
                          <label for="is_include_blocked_route">Include Blocked Route</label>
                    </div>
                    <div class="checkbox checkbox-success m-top-15">
                          <input type="checkbox" v-model="rate.include_local_rate" name="is_include_local_rate" id="is_include_local_rate"> 
                          <label for="is_include_local_rate">Include Local Rate</label>
                    </div>
                </div>
                <div class="clearfix little-space"></div>
                <div class="clearfix little-space"></div>
                <div class="col-md-12">
                    <a class="btn btn-primary mini" @click="addMargin">
						<span class="dnl_icon dnl_add"></span> Add Margin 
					</a>
                    <div class="table-responsive m-top-10">
                        <table class="table table-striped table-hover carrier_groups">
                          <thead>
                            <tr>
                                <th colspan="2">Rate Range</th>
                                <th rowspan="2">Define Margin By</th>
                                <th rowspan="2">Mark Up( % )</th>
                                <th rowspan="2" class="width-65">Action</th>
                            </tr>
                            <tr>
                                <th>Min</th>
                                <th>Max</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in rate.margins">
                                <td>
                                    <label v-if="index==0">Default</label>
                                    <input v-if="index>0" type="text" name="min_rate" v-model="item.min_rate" class="form-control" :class="{'input': true, 'is-danger': errors.has('min_rate') }" v-validate="{ rules: {required: true, regex: /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/} }" placeholder="Enter Min">
                                    <span v-show="errors.has('min_rate')" class="help is-danger">{{ errors.first('min_rate') }}</span>
                                </td> 
                                <td>
                                    <label v-if="index==0"></label>
                                    <input v-if="index>0" type="text" name="max_rate" v-model="item.max_rate" class="form-control" :class="{'input': true, 'is-danger': errors.has('max_rate') }" v-validate="{ rules: {required: true, regex: /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/} }" placeholder="Enter Max">
                                    <span v-show="errors.has('max_rate')" class="help is-danger">{{ errors.first('max_rate') }}</span>
                                </td>
                                <td>
                                    <select2 :options="define_margin_by_options" v-model="item.markup_type"></select2>
                                </td> 
                                <td>
                                    <input type="text" name="markup_value" v-model="item.markup_value" class="form-control" :class="{'input': true, 'is-danger': errors.has('markup_value') }" v-validate="{ rules: {required: true, regex: /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/} }" placeholder="Enter Mark Up">
                                    <span v-show="errors.has('markup_value')" class="help is-danger">{{ errors.first('markup_value') }}</span>
                                </td>
                                <td class="text-center">
                                      <a class="action action_delete center-block" data-toggle="tooltip" data-placement="top" title="Delete" @click="deleteMargin(index)">
                                          <span class="dnl_icon dnl_action_delete"></span>
                                      </a>
                                </td>
                            </tr>
                          </tbody>
                        </table>
                    </div>
                </div>
                <div class="clearfix little-space"></div>
                <div class="col-md-12">
                    <a class="btn btn-primary medium" @click="addInterval">
						<span class="dnl_icon dnl_add"></span> Add Interval and Min Time 
					</a>
                    <div class="table-responsive m-top-10">
                        <table class="table table-striped table-hover carrier_groups">
                          <thead>
                            <tr>
                                <th>Code</th>
                                <th>Interval(s)</th>
                                <th>Min Time(s)</th>
                                <th class="width-65">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(code, index) in rate.details">
                                <td>
                                    <label v-if="index==0">{{code.code}}</label>
                                    <input v-if="index>0" type="text" name="code" v-model="code.code" class="form-control" :class="{'input': true, 'is-danger': errors.has('code') }" v-validate="'required'" placeholder="Enter Code">
                                    <span v-show="errors.has('code')" class="help is-danger">{{ errors.first('code') }}</span>
                                </td> 
                                <td>
                                    <input type="text" name="rate_interval" v-model="code.rate_interval" class="form-control" :class="{'input': true, 'is-danger': errors.has('rate_interval') }" v-validate="'required|numeric'" placeholder="Enter Interval">
                                    <span v-show="errors.has('rate_interval')" class="help is-danger">{{ errors.first('rate_interval') }}</span>
                                </td>
                                <td>
                                    <input type="text" name="min_time" v-model="code.min_time" class="form-control" :class="{'input': true, 'is-danger': errors.has('min_time') }" v-validate="'required|numeric'" placeholder="Enter Min Times">
                                    <span v-show="errors.has('min_time')" class="help is-danger">{{ errors.first('min_time') }}</span>
                                </td>
                                <td class="text-center">
                                      <a class="action action_delete center-block" data-toggle="tooltip" data-placement="top" title="Delete" @click="deleteInterval(index)">
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
            <div class="button_set little-space">
                <a class="btn btn-primary mini" @click="validateForRate">
                    Submit
                </a>
                <a class="btn btn-default mini" @click="resetRate">
                    Reset
                </a>			 
			</div>
		</div>
	  </div>
	</div>
</template>

<script>   
	const multiselect = require('multiselect'),
          vSelect = require('vue!../main_components/select.vue');
    const api = require("../../api");
    const vSpinner = require('vue!../main_components/fadeloader.vue');
    import { mapActions } from 'vuex';
	module.exports = {
		components: {
			'multiselect': multiselect,
            'select2': vSelect,
            'spinner': vSpinner
		},
        props: ['editingrate', 'id'],
		data: function(){
            return {
                loading: false,
                define_margin_by_options: [
                    {id: 'Percentage', text: 'Percentage'},
                    {id: 'Value', text: 'Fix Value'},
                ],
                vendor_options: [],
                rate: {},
                effective_date_options: [
                    {id: '0', text: '0'},
                    {id: '1', text: '1'},
                    {id: '2', text: '2'},
                    {id: '3', text: '3'},
                    {id: '4', text: '4'},
                    {id: '5', text: '5'},
                    {id: '6', text: '6'},
                    {id: '7', text: '7'},
                ],
                code_deck_options: [],
                decimal_places_options: [
                    {id: '0', text: '0'},
                    {id: '1', text: '1'},
                    {id: '2', text: '2'},
                    {id: '3', text: '3'},
                    {id: '4', text: '4'},
                    {id: '5', text: '5'},
                    {id: '6', text: '6'},
                ],
                calculate_rate_options:  [
                    {id: '1', text: '1'},
                    {id: '2', text: '2'},
                    {id: '3', text: '3'},
                    {id: '4', text: '4'},
                    {id: '5', text: '5'},
                    {id: '6', text: '6'},
                    {id: '7', text: '7'},
                    {id: '8', text: '8'},
                    {id: '9', text: '9'},
                    {id: '10', text: '10'},
                ],
                rate_table_options: [
                    {id: 'A-Z', text: 'A-Z'},
                    {id: 'US Jurisdictiona', text: 'US Jurisdictional'},
                    {id: 'US Non Jurisdictiona', text: 'US Non Jurisdictional'},
                ],
              rate_template_name: '',
			  groupname: '',
              rate_table: '',
              calculate_rate: '',
              def_rate: '',
              code_deck: '',
              decimal_places: '',
              effective_date: '',
              local_rate: false,
              blocked_rout: false,
			  options: [
				  { id: 1, value: 'carrier1', text: 'Carrier 1' },
				  { id: 2, value: 'carrier2', text: 'Carrier 2' },
				  { id: 3, value: 'carrier3', text: 'Carrier 3' },
				  { id: 4, value: 'carrier4', text: 'Carrier 4' },
				  { id: 5, value: 'carrier5', text: 'Carrier 5' }
			  ],
              items: [],
              codes: [],
              vendors: [],
              emptyRate: {
                  name: '',
                  rate_table_type: 'A-Z',
                  lcr_digit: '1',
                  default_rate: '',
                  decimal_places: '0',
                  code_deck_id: '',
                  effective_days: '0',
                  egress_str: '',
                  vendors: [],
                  include_blocked_route: false,
                  include_local_rate: false,
                  margins: [
                      {
                        markup_value: '',
                        min_rate: '0',
                        markup_type: 'Percentage',
                        max_rate: '0',
                      }
                      
                  ],
                  details: [
                      {
                        rate_interval: '',
                        code: 'Default',
                        min_time: '',
                      }
                  ]
              },
              rate_template: {}
            }
        },
		mounted: function() {
			$('#carrier').multiSelect({
				 selectableHeader: "<div class='custom-header'>Vendors</div>",
  				 selectionHeader: "<div class='custom-header'>Selected</div>"
			});
		},
        created () {
            if(this.editingrate)
                this.fetchRate();
            else
                this.resetRate();
            this.fetchCodeDecks();
            this.fetchEgressTrunks();
            
        },
        methods: {
            ...mapActions({
                setMessage: 'app_message/setAppMessage'
            }),
            organizeRateData(data) {

                var arr = data.egress_str.split(",").map(function(item) {
                    return Number(item.trim());
                });
                console.log(data);
                console.log(arr);
                this.rate = {
                    egress_str: data.egress_str,
                    vendors: arr,
                    include_blocked_route: data.include_blocked_route,
                    include_local_rate: data.include_local_rate,
                    code_deck_id: data.code_deck_id,
                    lcr_digit: data.lcr_digit,
                    rate_table_type: data.rate_table_type,
                    effective_days: data.effective_days,
                    decimal_places: data.decimal_places,
                    margins: data.margins,
                    details: data.details,
                    default_rate: data.default_rate,
                    name: data.name,    
                }
            },
            fetchRate () {
                const url = api.getEndpointUrl() + '/v1/tool/rate_generation/' + this.id
                this.$http.get(url)
                .then(response => {
                    const body = response.body
                    if (body.success) {
                        console.log(body.payload);
                        this.organizeRateData(body.payload)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            },
            resetRate () {
                this.rate = Object.assign({}, this.emptyRate)
            },
            getRateForRequest() {
                var vm = this;
                vm.rate.egress_str = "";
                vm.rate.vendors.forEach(function(item, i){
                    if(i !== 0)
                        vm.rate.egress_str += ",";
                    vm.rate.egress_str += item.toString();
                });
                console.log(vm.rate.egress_str);
                const rate_template = Object.assign({}, this.rate_template);

                    rate_template.include_local_rate = this.rate.include_local_rate;
                    rate_template.rate_table_type = this.rate.rate_table_type;
                    rate_template.default_interval = 0;
                    rate_template.margin_default_value = "";
                    rate_template.effective_days = this.rate.effective_days;
                    // rate_template.last_generated = "";
                    // rate_template.margin_default_type = "";
                    rate_template.default_min_time = 0;
                    rate_template.decimal_places = this.rate.decimal_places;
                    rate_template.egress_str = this.rate.egress_str;
                    rate_template.include_blocked_route = this.rate.include_blocked_route;
                    rate_template.margins = this.rate.margins;
                    rate_template.name = this.rate.name;
                    rate_template.details = this.rate.details;
                    rate_template.code_deck_id = this.rate.code_deck_id;
                    rate_template.default_rate = this.rate.default_rate;
                    rate_template.lcr_digit = this.rate.lcr_digit;


                    return rate_template;
            },
            saveRate () {
                const reqBody = this.getRateForRequest();
				var url;
				if(this.editingrate) {
					url = api.getEndpointUrl() + '/v1/tool/rate_generation/' + this.id;
					this.$http.patch(url, reqBody)
						.then(response => {
							if (response.body.success) {
								this.setMessage('Rate was changed successfully');
								var thisvm = this;
								setTimeout(function(){
									thisvm.$router.push('/tools/rate_generation');
								}, 3000);
							}
						})
						.catch(error => {
							console.log(error)
							this.setMessage({
								message: 'Failed to change rate',
								type: 'error'
							})
						})	
				}
				else {
					url = api.getEndpointUrl() + '/v1/tool/rate_generation/';
					this.$http.post(url, reqBody)
						.then(response => {
							if (response.body.success) {
								this.setMessage('Rate was created successfully');
								var thisvm = this;
								setTimeout(function(){
									thisvm.$router.push('/tools/rate_generation');
								}, 3000);
							}
						})
						.catch(error => {
							console.log(error)
							this.setMessage({
								message: 'Failed to create rate',
								type: 'error'
							})
						})	
				}
            },
            validateForRate () {
                var vm = this;
			    this.$validator.validateAll().then(() => {
				const err = this.$validator.getErrors();
                // validation process
				if (err.errors.length > 0 || vm.rate.vendors.length == 0) {
                    var msg;
                    if(err.errors.length > 0)
                        msg = 'Validation failed';
                    else if(vm.rate.vendors.length == 0)
                        msg = 'Vendors can not be empty';
					vm.setMessage({
						message: msg,
						type: 'error'
					})
				}
				else {
                    
					vm.saveRate();
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
            fetchEgressTrunks() {
                const url = api.getEndpointUrl() + '/v1/trunk/egress/list'
                this.$http.get(url)
                .then(response => {
                    const body = response.body
                    if (body.success) {
                        const egress_list = body.payload.items
                        var self = this;
                        egress_list.forEach(function (temp, i) {
                            var trunk = {};
                            trunk.key = temp.resource_id;
                            trunk.label = temp.name;
                            self.vendor_options.push(trunk);
                        });
                        console.log(this.vendor_options);
                        
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            },
            deleteInterval (id) {
                this.rate.details.splice(id, 1)
            },
            addInterval () {
                this.rate.details.push({
                    code: '',
                    interval: 0,
                    min_time: 0
                });
            },
            deleteMargin (id) {
                this.rate.margins.splice(id, 1)
            },
            addMargin () {
                console.log("addMargin");
                this.rate.margins.push({
                    rate_min: 0,
                    rate_max: 0,
                    define_margin_by: 'percentage',
                    mark_up: 0,
                });
            },
            fetchCodeDecks () {
                this.loading = true;
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
                                self.emptyRate.code_deck_id = code_deck.id;
                        });
                        console.log(this.code_deck_options);
                        
                    }
                    this.loading = false;
                })
                .catch(error => {
                    console.log(error)
                })
            },
        }
	}
</script>

<style>
    .checkbox.checkbox-success.m-top-15 {
        margin-top: 15px;
    }
    
    a.btn.btn-primary.medium {
        width: 250px;
    }
</style>
