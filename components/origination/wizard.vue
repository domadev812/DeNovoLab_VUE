<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Origination</a></li>
				  <li class="breadcrumb-item active">Wizard</li>
			</ol>
			<h1 class="page-header">Wizard</h1>
			<tabs class="user_tabs wizard_steps">
				<tab label="Define Vendor" class="" p="STEP 1" icon="dnl_icon dnl_persona" selected>
					  <div class="col-md-3 col-sm-4">
						<div class="form-group fix-select">
							<div class="form-group">
								<label>Vendor:</label>
								<select2 :options="vendor_options" v-model="vendor">
								</select2>
							</div>
						</div>
					  </div>
					  <div class="col-md-1 col-sm-2">
						  <div class="inline_actions">
							  <a><span class="dnl_icon dnl_add"></span></a>
							  <a><span class="dnl_icon dnl_reload"></span></a>
						  </div>
					  </div>
                      <div class="clearfix little-space"></div>
                      <div class="col-md-6 col-sm-6 col-xs-12">
							<a class="btn btn-primary mini">Next</a>
				      </div>
                      <div class="clearfix"></div>
				</tab>
				<tab label="Define Client" class="" p="STEP 2" icon="dnl_icon dnl_person">
					<div class="col-md-3 col-sm-4">
						<div class="form-group fix-select">
							<div class="form-group">
								<label>Client:</label>
								<select2 :options="options" v-model="client">
								</select2>
							</div>
						</div>
					  </div>
					  <div class="col-md-1 col-sm-2">
						  <div class="inline_actions">
							  <a><span class="dnl_icon dnl_add"></span></a>
							  <a><span class="dnl_icon dnl_reload"></span></a>
						  </div>
					  </div>
                      <div class="clearfix little-space"></div>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                            <a class="btn btn-default mini min">Previous</a>
							<a class="btn btn-primary mini">Next</a>
				      </div>
                      <div class="clearfix"></div>
				</tab>
				<tab label="Define DID" class="" p="STEP 3" icon="dnl_icon dnl_setting">
					<div class="col-md-3 col-sm-4">
						<div class="form-group fix-select">
                            <label>DID:</label>
                            <select2 :options="options" v-model="did">
                            </select2>
						</div>
				    </div>
                    <div class="clearfix"></div>
                    <div class="col-md-4 col-sm-4">
                        <div class="form-group">
				            <label>Specify DID(Max 1000):</label>
				            <textarea v-model="specify_did" class="form-control" placeholder="Enter DID"></textarea>
				        </div>
                    </div>
					<div class="clearfix little-space"></div>
					<div class="row">
						<div class="col-md-6 col-sm-6 col-xs-12">
							<a class="btn btn-default mini min">Previous</a>
							<a class="btn btn-primary mini">Next</a>
						</div>
					</div>
					<div class="clearfix"></div>
				</tab>
				<tab label="Define Vendor Billing Rule" class="" p="STEP 4" icon="dnl_icon dnl_money">
					 <div class="col-md-3 col-sm-4">
						<div class="form-group fix-select">
							<div class="form-group">
								<label>Vendor Billing Rule:</label>
								<select2 :options="options" v-model="vendor_billing_rule">
								</select2>
							</div>
						</div>
					  </div>
					  <div class="col-md-1 col-sm-2">
						  <div class="inline_actions">
							  <a><span class="dnl_icon dnl_add"></span></a>
							  <a><span class="dnl_icon dnl_reload"></span></a>
						  </div>
					  </div>
                      <div class="clearfix little-space"></div>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                            <a class="btn btn-default mini min">Previous</a>
							<a class="btn btn-primary mini">Next</a>
				      </div>
                      <div class="clearfix"></div>
				</tab>
				<tab label="Define Client Billing Rule" class="" p="STEP 5" icon="dnl_icon dnl_money">
				    <div class="col-md-3 col-sm-4">
						<div class="form-group fix-select">
							<div class="form-group">
								<label>Client Billing Rule:</label>
								<select2 :options="options" v-model="client_billing_rule">
								</select2>
							</div>
						</div>
					  </div>
					  <div class="col-md-1 col-sm-2">
						  <div class="inline_actions">
							  <a><span class="dnl_icon dnl_add"></span></a>
							  <a><span class="dnl_icon dnl_reload"></span></a>
						  </div>
					  </div>
                      <div class="clearfix little-space"></div>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                            <a class="btn btn-default mini min">Previous</a>
							<a class="btn btn-primary mini">Finish</a>
				      </div>
                      <div class="clearfix"></div>
				</tab>
			</tabs>
		</div>
	  </div>
	</div>
</template>

<script>   
	const vTabs = require('vue!../main_components/tabs.vue'),
		  vTab = require('vue!../main_components/tab.vue'),
		  vSelect = require('vue!../main_components/select.vue'),
		  modal = require('vue!../main_components/modal.vue');
	const api = require("../../api");
	module.exports = {
		components: {
			'tabs': vTabs,
			'tab': vTab,
			'select2': vSelect,
			'modal': modal
		},
		data: function(){
            return {
				vendor_options: [],
              vendor: '',  
              client: '',
              did: '',
              specify_did: '',    
              vendor_billing_rule: '',
              client_billing_rule: '',
			  options: [
				  { id: 1, value: 'carrier1', text: 'Carrier 1' },
				  { id: 2, value: 'carrier2', text: 'Carrier 2' },
				  { id: 3, value: 'carrier3', text: 'Carrier 3' },
				  { id: 4, value: 'carrier4', text: 'Carrier 4' },
				  { id: 5, value: 'carrier5', text: 'Carrier 5' }
			  ],
            }
        },
		created() {
			this.fetchVendors()
		},
		methods: {
			fetchVendors() {
				const url = api.getEndpointUrl() + '/v1/did/vendor/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
						const vendors = body.payload.items
						var self = this;
						vendors.forEach(function (temp, i) {
							var vendor = {};
							vendor.id = temp.client_id;
							vendor.text = temp.name;
							self.vendor_options.push(vendor);
							if (i == 0)
								self.vendor = vendor.id;
						});
						console.log(this.vendor_options);
					}
				})
				.catch(error => {
					console.log(error)
				})
			},
		}
	}
</script>

<style>
    .tab span.dnl_icon.dnl_money {
        font-size: 19px;
    }
</style>
