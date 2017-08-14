<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Routing</a></li>
				  <li class="breadcrumb-item">
					  <router-link to="/routing/trunks">Trunks</router-link>
				  </li>
				  <li class="breadcrumb-item active">Trunk Template Editor</li>
			</ol>
			<h1 class="page-header">Trunk Template Editor</h1>
			<router-link to="/routing/trunks" class="btn btn_white back"><span class="dnl_icon dnl_import"></span> Back </router-link>
			<div class="white_pad">
              <div class="row">
                <div class="col-md-3 col-sm-4" v-if="type=='egress'">
                    <label for="egress_name">Egress Template Name:</label>
                    <select2 :options="egress_template_options" v-model="egress_template"></select2>
                </div>
                <div class="col-md-3 col-sm-4" v-if="type=='ingress'">
                    <label for="egress_name">Ingress Template Name:</label>
                    <select2 :options="ingress_template_options" v-model="ingress_template"></select2>
                </div>
                <div class="col-md-3 col-sm-4">
                    <label for="egress_name">Egress Name:</label>
                    <input type="text" name="egress_name" v-model="egress_name" class="form-control" placeholder="Enter Egress Name">
                </div>
                <div class="col-md-3 col-sm-4">
                    <label>Carriers:</label>
                    <select2 :options="options" v-model="carriers"></select2>
                </div>
                <div class="col-md-3 col-sm-4">
                    <label for="call_limit">Call Limit:</label>
                    <input type="text" name="call_limit" v-model="call_limit" class="form-control" placeholder="Enter Call Limit">
                </div>
                <div class="clearfix little-space"></div>
                <div class="col-md-3 col-sm-4">
                    <label>CPS Limit:</label>
                    <select2 :options="options" v-model="cps_limit"></select2>
                </div>
                <div class="col-md-3 col-sm-3">
                    <label>Active:</label>
                    <select2 :options="options" v-model="active"></select2>
                </div>
                <div class="col-md-3 col-sm-4">
                    <label>Authorized:</label>
                    <select2 :options="options" v-model="authorized"></select2>
                </div>
                
                <div class="clearfix little-space"></div>
                <div class="clearfix little-space"></div>
                <div class="col-md-12">
                    <a class="btn btn-primary mini">
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
                            <tr v-for="host in hosts">
                                <td>
                                    <select2 :options="options" v-model="host.type"></select2>
                                </td> 
                                <td>
                                    <input type="text" :value="host.host" class="form-control">
                                </td> 
                                <td>
                                    <input type="text" :value="host.port" class="form-control">
                                </td>
                                <td class="text-center">
                                      <a class="action action_delete center-block" data-toggle="tooltip" data-placement="top" title="Delete">
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
                <a class="btn btn-primary mini">
                    Submit
                </a>
                <a class="btn btn-default mini">
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
	module.exports = {
		components: {
			'multiselect': multiselect,
            'select2': vSelect
        },
        props: ['type'],
		data: function(){
            return {
                ingress_template_options: [],
                ingress_template: '',  
                egress_template_options: [],
              egress_template: '',
              egress_name: '',
              carriers: '',
              call_limit: '',
              cps_limit: '',
              active: '',
              authorized: '',
			  options: [
				  { id: 1, value: 'carrier1', text: 'Carrier 1' },
				  { id: 2, value: 'carrier2', text: 'Carrier 2' },
				  { id: 3, value: 'carrier3', text: 'Carrier 3' },
				  { id: 4, value: 'carrier4', text: 'Carrier 4' },
				  { id: 5, value: 'carrier5', text: 'Carrier 5' }
			  ],
              hosts: [
                  {
                      type: 'Default',
                      host: '192.164.12.54',
                      port: '8080'
                  }
              ]
            }
        },
		mounted: function() {
			$('#carrier').multiSelect({
				 selectableHeader: "<div class='custom-header'>Codecs</div>",
  				 selectionHeader: "<div class='custom-header'>Selected</div>"
			});
        },
        methods: {
            fetchIngressTemplate() {
                this.loading = true;
                const url = api.getEndpointUrl() + '/v1/config/ingress_trunk_template/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
                        const templates = body.payload.items
                        var self = this;
						templates.forEach(function (temp, i) {
							var template = {};
							template.id = temp.resource_template_id;
							template.text = temp.name;
							self.ingress_template_options.push(template);
							if (i == 0)
								self.ingress_template = template.id;
						});
					}
                    this.loading = false;
				})
				.catch(error => {
					console.log(error)
                    this.loading = false;
				})
            },
            fetchEgressTemplate() {
                this.loading = true;
                const url = api.getEndpointUrl() + '/v1/config/egress_trunk_template/list'
				this.$http.get(url)
				.then(response => {
					const body = response.body
					if (body.success) {
                        const templates = body.payload.items
                        var self = this;
						templates.forEach(function (temp, i) {
							var template = {};
							template.id = temp.resource_template_id;
							template.text = temp.name;
							self.egress_template_options.push(template);
							if (i == 0)
								self.egress_template = template.id;
						});
					}
                    this.loading = false;
				})
				.catch(error => {
					console.log(error)
                    this.loading = false;
				})
            }
        },
        created() {
            if(this.type == 'egress')
                this.fetchEgressTemplate()
            else if(this.type == 'ingress')
                this.fetchIngressTemplate()
        }
	}
</script>

<style>
    a.btn.btn-primary.biggest.pull-right {
        width: 250px;
    }
</style>
