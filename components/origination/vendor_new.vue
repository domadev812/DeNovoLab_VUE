<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Origination</a></li>
				  <li class="breadcrumb-item">
					  <router-link to="/origination/vendors">Vendors</router-link>
				  </li>
				  <li class="breadcrumb-item active">Vendor Editor</li>
			</ol>
			<h1 class="page-header">Vendor Editor</h1>
			<router-link to="/origination/vendors" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad configuration_pad">
				<div class="col-md-12 col-sm-12">
					<form class="form">
                        <div class="col-md-4 col-sm-6">
                            <div class="form-group">
                                <label for="vendor_name">Vendor Name:</label>
                                <input type="text" name="vendor_name" v-model="vendor.vendor_name" class="form-control" placeholder="Enter Vendor Name">
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-6">
                            <div class="form-group">
                                <label for="call_limit">Call Limit:</label>
                                <input type="text" name="call_limit" v-model="vendor.call_limit" class="form-control" placeholder="Enter Call Limit">
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-6">
                            <div class="form-group">
                                <label class="m-top-15"></label>
                                <div class="checkbox checkbox-success">
                                    <input id="t38" name="t38" type="checkbox" v-model="resource.t38">
                                    <label for="t38">t38</label>
                                </div>
                            </div>
                        </div>
                        <!--<div class="col-md-4 col-sm-5">
                            <div class="form-group">
                                <label>Pricing Rule:</label>
                                <select2 :options="rule_options" v-model="vendor.pricing_rule"></select2>
                            </div>
                        </div>
                        <div class="col-md-1 col-sm-5">
                              <div class="inline_actions">
                                  <a @click="showModal='new_pricing_rule'"><span class="dnl_icon dnl_add"></span></a>
                              </div>
                        </div>-->
                        <div class="clearfix"></div>
                        <template v-for="(item, index) in resource.ip">
                         <div class="col-md-4 col-sm-6">
                            <div class="form-group">
                                <label>IP Addresses:</label>
                                <input type="text" name="password" v-model="item.ip" class="form-control" placeholder="Enter IP">
                            </div>
                        </div>
                        <div class="col-md-2 col-sm-2">
                            <div class="form-group">
                                <label>Port:</label>
                                <input type="text" name="password" v-model="item.port" class="form-control" placeholder="Enter Port">
                            </div>
                        </div>
                        <div class="col-md-1 col-sm-2" v-if="index==0">
                              <div class="inline_actions">
                                  <a><span class="dnl_icon dnl_add" @click="addIP"></span></a>
                              </div>
                        </div>
                        <div class="col-md-1 col-sm-2" v-if="index>0">
                              <div class="inline_actions">
                                  <a><span class="dnl_icon dnl_action_delete" @click="deleteIP(index)"></span></a>
                              </div>
                        </div>
                        <div class="clearfix"></div>
                        </template>
                        
                        <div class="col-md-4 col-sm-6">
                            <div class="form-group">
                                <label for="media_type">Media Type:</label>
                                <!--<select2 :options="options" v-model="media_type"></select2>-->
                                <select class="selectable" v-model="resource.media_type">
                                    <option v-for="item in media_type_options" v-bind:value="item.id">
                                        {{ item.text }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-6">
                            <div class="form-group">
                                <label>Enable Billing By Port:</label>
                                <!--<select2 :options="bill_by_port_options" v-model="resource.billing_by_port"></select2>-->
                                <select class="selectable" v-model="resource.billing_by_port">
                                    <option v-for="item in bill_by_port_options" v-bind:value="item.id">
                                        {{ item.text }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-6">
                            <div class="form-group">
                                <label>Billing Method:</label>
                                <!--<select2 :options="bill_by_port_options" v-model="resource.billing_by_port"></select2>-->
                                <select class="selectable" v-model="vendor.billing_method">
                                    <option v-for="item in billing_method_options" v-bind:value="item.id">
                                        {{ item.text }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <!--<div class="col-md-4 col-sm-6">
                            <div class="form-group">
                                <label for="add_did">ADD DID:</label>
                                <input type="text" name="add_did" v-model="add_did" class="form-control" placeholder="Enter ADD DID">
                            </div>
                        </div>-->
                        <div class="col-md-4 col-sm-6">
                            <div class="form-group m-top-10">
                                <div class="checkbox checkbox-success">
                                    <input id="upload_did" name="upload_did" type="checkbox" v-model="vendor.upload_did">
                                    <label for="upload_did">Upload DID</label>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <div class="col-md-4 col-sm-6" v-if="vendor.upload_did">
                            <div class="form-group">
                                <label>Duplicate Handling:</label>
                                <select2 :options="duplicate_handling_options" v-model="vendor.duplicate_handling"></select2>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <div class="col-md-4 col-sm-6" v-if="vendor.upload_did">
                            <label>Upload File:</label>
                            <dropzone id="myVueDropzone" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
                            <div class="button_set little-space">
                                <a class="btn btn-primary mini">
                                    Show Example
                                </a>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <div class="col-md-12">
                            <div class="button_set little-space">
                                <a class="btn btn-primary" @click="validateForVendor">
                                    Submit
                                </a>
                                <a class="btn btn-default" @click="resetVendor">
                                    Reset
                                </a>
                            </div>
                        </div>
                        <div class="clearfix"></div>
					</form>
				</div>
				<div class="clearfix little-space"></div>
			</div>
		</div>
	  </div>
      <modal v-if="showModal=='new_pricing_rule'" @close="showModal = ''" class="big_modal">
			<h3 slot="header">Create New Pricing Rule</h3>
			<div slot="body">
			  <div class="row">
                  <div class="col-sm-6">
                      <div class="form-group">
						<label>Name:</label>
						<input type="text" name="name" v-model="name" class="form-control" placeholder="Enter Name">
					  </div>
                  </div>
                  <div class="col-sm-6">
                      <div class="form-group">
						<label>Price/DID/Month:</label>
						<input type="text" name="price_did_month" v-model="price_did_month" class="form-control" placeholder="Enter Price/DID/Month">
					  </div>
                  </div>
                  <div class="col-sm-6">
                      <div class="form-group">
						<label>Price/Channel Limit:</label>
						<input type="text" name="price_channel_limit" v-model="price_channel_limit" class="form-control" placeholder="Enter Price/Channel Limit">
					  </div>
                  </div>
                  <div class="col-sm-6">
                      <div class="form-group">
						<label>Price/Minute:</label>
						<input type="text" name="price_minute" v-model="price_minute" class="form-control" placeholder="Enter Price/Minute">
					  </div>
                  </div>
                  <div class="col-sm-6">
                      <div class="form-group">
						<label>Price/Max Channel Usage:</label>
						<input type="text" name="price_max_channel_usage" v-model="price_max_channel_usage" class="form-control" placeholder="Enter Price/Max Channel Usage">
					  </div>
                  </div>
			  </div>
			</div>
			<div slot="footer">
				<button class="btn btn-primary submit mini">Submit</button>
				<button @click="closeModal" class="btn btn-default cancel mini">Cancel</button>
			</div>
		</modal>
	</div>
</template>

<script>   
	const vSelect = require('vue!../main_components/select.vue'),
          modal = require('vue!../main_components/modal.vue'),
          Dropzone = require('vue!../main_components/dropzone.vue');
    const api = require("../../api");
    import { mapActions } from 'vuex';
	module.exports = {
		components: {
			'select2': vSelect,
            'modal': modal,
            Dropzone
		},
        props: ['editingvendor', 'id'],
		data: function(){
            return {
                billing_method_options: [
                    { id: 'percentage', text: 'Percentage' },
					{ id: 'value', text: 'Value' },
                ],
                duplicate_handling_options: [
                    { id: 'delete', text: 'Overwrite' },
					{ id: 'ignore', text: 'Ignore' },
                ],
                bill_by_port_options: [
					{ id: 'by minutes', text: 'by minutes' },
					{ id: 'by port', text: 'by port' },
				],
                resource: {},
                rule_options: [],
                ip_list: [{
                    "ip": "",
                    "port": 0
                }],
                media_type_options: [
                    { id: 'Proxy Media + Transcoding', text: 'Proxy Media + Transcoding' },
					{ id: 'Proxy Media', text: 'Proxy Media' },
					{ id: 'Bypass Media', text: 'Bypass Media' }
                ],
              duplicate_handling: '',
              name: '',
              billing_type: '',
              price_did_month: '',
              price_channel_limit: '',
              price_minute: '',
              showModal: '',
              vendor_name: '',    
              price_max_channel_usage: '',
              pricing_rule: '',
              add_did: '',
              options: [
				  { id: 1, text: 'Success' },
				  { id: 2, text: 'Multiple' },
				  { id: 3, text: 'Moved Permanently' },
				  { id: 4, text: 'Moved Temporarily' },
				  { id: 5, text: 'Use Proxy' },
				  { id: 6, text: 'Alternative Service' },
				  { id: 7, text: 'Bad Request' },
				  { id: 8, text: 'Unauthorized' },
				  { id: 9, text: 'Payment Required' },
			  ],
              ip1: '',
              port1: '',
              call_limit: '',
              media_type: '',
              vendor_template: {},
              vendor: {}
            }
        },
		methods: {
            ...mapActions({
				setMessage: 'app_message/setAppMessage'
			}),
            resetVendor() {
                this.vendor = {
                    billing_method: 'percentage',
                    vendor_name: '',
                    balance: 0,
                    call_limit: 0,
                    duplicate_handling: 'delete',
                    upload_did: false,
                };
                this.resource = {
                    ip: [{
                        ip: '',
                        port: 0
                    }],
                    media_type: 'Proxy Media + Transcoding',
                    t38: true,
                    egress_dids: [],
                    billing_by_port: 'by minutes',
                }
            },
            fetchBillingRules() {
                const url = api.getEndpointUrl() + '/v1/did/billing_rule/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
                        const billing_rules = body.payload.items
                        var self = this;
                        billing_rules.forEach(function (temp, i) {
                            var rule = {};
                            rule.id = temp.id;
                            rule.text = temp.name;
                            self.rule_options.push(rule);
                            if (i == 0)
                                self.vendor.pricing_rule = rule.id;
                        });
                        console.log(this.rule_options);
					}
				})
				.catch(error => {
					console.log(error)
				})
            },
            organizeVendorData(data) {
                this.vendor = {
                    billing_method: data.billing_method,
                    vendor_name: data.name,
                    balance: data.balance,
                    call_limit: data.call_limit,
                    
                };
                this.resource = {
                    // ip: data.resource.ip,
                    ip: data.resource.ip,
                    media_type: data.resource.media_type,
                    t38: data.resource.t38,
                    egress_dids: data.resource.egress_dids,
                    billing_by_port: data.resource.billing_by_port,
                }

            },
            fetchVendor() {
                const url = api.getEndpointUrl() + '/v1/did/vendor/' + this.id
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
                        console.log(body.payload);
						this.organizeVendorData(body.payload)
					}
				})
				.catch(error => {
					console.log(error)
				})
            },
            deleteIP(id) {
                let index = id
                if (~id) {
                    this.resource.ip.splice(index, 1)
                }
            },
            addIP() {
                this.resource.ip.push({
                    ip: '',
                    port: 0,
                })
            },
            getVendorForRequest () {
                const vendor_template = Object.assign({}, this.vendor_template);

                 vendor_template.name = this.vendor.vendor_name;
                 vendor_template.call_limit = this.vendor.call_limit;
                 vendor_template.resource = this.resource;
                 vendor_template.billing_method = this.vendor.billing_method;

                 return vendor_template;
            },
            saveVendor() {
                const reqBody = this.getVendorForRequest();
				var url;
				if(this.editingvendor) {
					url = api.getEndpointUrl() + '/v1/did/vendor/' + this.id;
					this.$http.patch(url, reqBody)
						.then(response => {
							if (response.body.success) {
								this.setMessage('Vendor was changed successfully');
								var thisvm = this;
								setTimeout(function(){
									thisvm.$router.push('/origination/vendors');
								}, 3000);
							}
						})
						.catch(error => {
							console.log(error)
							this.setMessage({
								message: 'Failed to change vendor',
								type: 'error'
							})
						})	
				}
				else {
					url = api.getEndpointUrl() + '/v1/did/vendor/create';
					this.$http.post(url, reqBody)
						.then(response => {
							if (response.body.success) {
								this.setMessage('Vendor was created successfully');
								var thisvm = this;
								setTimeout(function(){
									thisvm.$router.push('/origination/vendors');
								}, 3000);
							}
						})
						.catch(error => {
							console.log(error)
							this.setMessage({
								message: 'Failed to create vendor',
								type: 'error'
							})
						})	
				}
            },
            validateForVendor() {
                this.$validator.validateAll()
				.then(this.saveVendor)
				.catch(error => {
					console.log(error)
					this.setMessage({
						message: 'Validation failed',
						type: 'error'
					})
				})
            },
            closeModal: function() {
				this.showModal = '';
			},
            'success': function (file) {
                console.log('A file was successfully uploaded')
            },
            'process': function () {
                var newArr = this.$children.filter(function(item){
                  return item.id === "myVueDropzone";
                });
                var component = newArr[0];
                component.processQueue()
            }
		},
        created () {
            if (this.editingvendor) {
				this.fetchVendor();
			}
            else {
                this.resetVendor();
            }
            this.fetchBillingRules();
        }
	}
</script>

<style>
.m-top-10 {
	margin-top: 10px;
}
</style>
