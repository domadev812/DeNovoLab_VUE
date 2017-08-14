<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Finance</a></li>
				  <li class="breadcrumb-item active">Past Due Summary</li>
			</ol>
			<h1 class="page-header">Past Due Summary</h1>
			<div class="white_pad configuration_pad">
				<div class="col-md-12 col-sm-12">
					<form class="form">
						<section class="config_section payment_setting">
							<div class="row">
								   <div class="col-md-3 col-sm-4">
										 <label class="m-top-15"></label> 
										<select2 :options="filter_options" v-model="filter">
										</select2>
									</div>
								    <div class="col-md-3 col-sm-4">
										<label>Client Name:</label>
                                        <select class="selectable" v-model="client">
                                            <option v-for="item in client_list" v-bind:value="item.id">
                                                {{ item.text }}
                                            </option>
                                        </select>
									</div>
                                    <div class="col-md-3 col-sm-4">
                                        <a class="btn btn-primary m-top-25">
                                            Submit
                                        </a>
                                    </div>
							  </div>
						  </section>
					</form>
				</div>
				<div class="clearfix little-space"></div>
                <div class="col-md-12">
                    <div class="table-responsive">
                        <table class="table table-striped table-hover carrier_groups aligned-center">
                          <thead>
                            <tr>
                                <th rowspan="2" colspan="1">Client Name</th>
                                <th rowspan="2" colspan="1">Balance</th>
                                <th colspan="5" rowspan="1">Carrier Past Due</th>
                                <th rowspan="2" colspan="1" class="width-65">Action</th>
                            </tr>
                            <tr>
                                <th rowspan="1" colspan="1">Total</th>
                                <th rowspan="1" colspan="1">7 days</th>
                                <th rowspan="1" colspan="1">15 days</th>
                                <th rowspan="1" colspan="1">30 days</th>
                                <th rowspan="1" colspan="1">Over 30 days</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="client in clients">
                              <td>{{client.name}}</td>
                              <td>{{client.balance}}</td>
                              <td>{{client.total}}</td>
                              <td>{{client.c_7_days}}</td>
                              <td>{{client.c_15_days}}</td>
                              <td>{{client.c_30_days}}</td>
                              <td>{{client.over_30_days}}</td>
                              <td>
                                  <router-link to="/finance/overall_mutual_balance" data-toggle="tooltip" data-placement="top" title="Detail" class="action action_read">
                                      <span class="dnl_icon dnl_eye"></span>
                                  </router-link>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                   </div>
               </div>
               <div class="clearfix"></div>
			</div>
		</div>
	  </div>
	</div>
</template>

<script> 
	const vSelect = require('vue!../main_components/select.vue');
    const api = require("../../api");
	module.exports = {
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
                client_list: [],
			  filter: '',
              client: '',
			  filter_options: [
				  { id: 1, text: 'Overdue > 0' },
				  { id: 2, text: 'No Overdue' },
				  { id: 3, text: 'All' }
			  ],
              clients: [
                  {
                      name: 'Mariana_Telecom',
                      balance: '7352.000 USD',
                      total: '226.169 USD',
                      c_7_days: '0 USD',
                      c_15_days: '0 USD',
                      c_30_days: '0 USD',
                      over_30_days: '226.169 USD'
                  },
                  {
                      name: 'Mariana_Telecom',
                      balance: '7352.000 USD',
                      total: '226.169 USD',
                      c_7_days: '0 USD',
                      c_15_days: '0 USD',
                      c_30_days: '0 USD',
                      over_30_days: '226.169 USD'
                  },
                  {
                      name: 'Mariana_Telecom',
                      balance: '7352.000 USD',
                      total: '226.169 USD',
                      c_7_days: '0 USD',
                      c_15_days: '0 USD',
                      c_30_days: '0 USD',
                      over_30_days: '226.169 USD'
                  },
                  {
                      name: 'Mariana_Telecom',
                      balance: '7352.000 USD',
                      total: '226.169 USD',
                      c_7_days: '0 USD',
                      c_15_days: '0 USD',
                      c_30_days: '0 USD',
                      over_30_days: '226.169 USD'
                  },
                  {
                      name: 'Mariana_Telecom',
                      balance: '7352.000 USD',
                      total: '226.169 USD',
                      c_7_days: '0 USD',
                      c_15_days: '0 USD',
                      c_30_days: '0 USD',
                      over_30_days: '226.169 USD'
                  }
              ]
            }
        },
        mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
		},
        methods: {
            fetchCarriers() {
                this.loading = true;
                var url;
                if(this.tmpPageOne.currentPage === 0)
                    url = api.getEndpointUrl() + "/v1/carrier/list"
                else
                    url = api.getEndpointUrl() + "/v1/carrier/list?page=" + this.tmpPageOne.currentPage
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
                                var carrier = {};
                                carrier.id = temp.client_id;
                                carrier.text = temp.name;
                                self.client_list.push(carrier);
                                if(i==0 && self.tmpPageOne.currentPage === 0)
                                    self.client = carrier.id;    
                            });
                            this.tmpPageOne.currentPage = payload.page + 1
                            this.tmpPageOne.totalPages = Math.ceil(payload.total / payload.per_page)
                            this.tmpPageOne.cntPerPage = payload.per_page;

                            console.log(this.tmpPageOne.totalPages, this.tmpPageOne.currentPage);

                            if(this.tmpPageOne.totalPages > this.tmpPageOne.currentPage)
                                this.fetchCarriers();
                            
                            console.log(this.client_list);
                            console.log(this.client);
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        this.loading = false;
                    })
            },
        },
        created() {
            this.fetchCarriers()
        }
	}
</script>

<style>
</style>
