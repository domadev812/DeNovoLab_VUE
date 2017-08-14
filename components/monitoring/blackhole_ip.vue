<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Monitoring</a></li>
				  <li class="breadcrumb-item active">Blackhole Ip</li>
			</ol>
			<h1 class="page-header">Blackhole Ip</h1>
			<div class="btn-group" role="group">
        <button type="button" class="btn btn-default inline_fixer" @click="upload">
				  <span class="dnl_icon dnl_download"></span> Upload
			  </button>
			  <button type="button" class="btn btn-default inline_fixer" @click="showModal='new'">
				  <span class="dnl_icon dnl_add"></span> Create New
			  </button>
			  <button type="button" class="btn btn-default inline_fixer" @click="showModal='new_by_netmask'">
				  <span class="dnl_icon dnl_add"></span> Create New by NetMask
			  </button>
			  <button type="button" class="btn btn-default" @click="showModal='delete_by_netmask'">
				  <span class="dnl_icon dnl_action_delete"></span> Delete by NetMask
			  </button>
			</div>
			<div class="white_pad table_wrap">
				<div class="advanced_search_filter_panel bottom_0">
					<div class="inline-block search_wrapper">
						<label>Search:</label>
						<br>
						<input type="text" name="search" v-model="search" class="form-control inline-block search_field" placeholder="Enter Search">
						<span class="dnl_icon dnl_musica-searcher"></span>
					</div>
				</div>
				<div class="pull-right pagination top_pagination">
					<pagination :current-page="pageOne.currentPage"
								:total-pages="pageOne.totalPages"
								@page-changed="pageOneChanged">
					</pagination>
				</div>
				<div class="clearfix"></div>
				<div class="table-responsive">
					<table class="table table-striped table-hover aliases">
					  <thead>
						<tr>
						  <th>Ip</th>
						  <th>Hostname <span class="dnl_icon dnl_sort pull-right"></span></th>
                          <th>Create Time</th>
						  <th class="width-65">Action</th>
						</tr>
					  </thead>
					  <tbody>
						<tr v-for="ip in filterBy(ips, search)">
						  <td>{{ip.ip}}</td>
                          <td>{{ip.hostname}}</td>
                          <td>{{ip.create_time}}</td>
						  <td>
							  <a class="action action_delete" data-toggle="tooltip" data-placement="top" title="Delete">
								  <span class="dnl_icon dnl_action_delete"></span>
							  </a>
						  </td>
						</tr>
					  </tbody>
					</table>
				</div>
				<div class="pull-right pagination">
					<pagination :current-page="pageOne.currentPage"
								:total-pages="pageOne.totalPages"
								@page-changed="pageOneChanged">
					</pagination>
				</div>
				<div class="clearfix"></div>
			</div>
		</div>
	  </div>
		
		
	  <modal v-if="showModal=='new'" @close="showModal = ''">
			<h3 slot="header">Create New</h3>
			<div slot="body">
			  <div class="">
				  <form class="form">
                          <div class="form-group">
                            <label for="ftp_config_name">IP:</label>
                            <br>
                            <input type="text" name="ip" class="form-control" placeholder="Enter IP" v-model="ip">
                          </div>
                      </form>
			  </div>
			</div>
			<div slot="footer">
				<button class="btn btn-primary submit">Submit</button>
				<button @click="closeModal" class="btn btn-default cancel">Cancel</button>
			</div>
		</modal>
		
		
		<modal v-else-if="showModal=='new_by_netmask'" @close="showModal = ''">
			<h3 slot="header">Create New By NetMask</h3>
			<div slot="body">
			  <div class="">
				  <form class="form">
					  <form class="form">
                          <div class="form-group">
                            <label for="ftp_config_name">IP:</label>
                            <br>
                            <input type="text" name="ip" class="form-control med" placeholder="Enter IP" v-model="ip">
                            <input type="text" name="port" class="form-control small" placeholder="Port" v-model="port"> 
                          </div>
                          <div class="form-group">
                              <textarea v-model="hostname" class="form-control" placeholder="Enter Hostname"></textarea>
                          </div>
                      </form>
				  </form>
			  </div>
			</div>
			<div slot="footer">
				<button class="btn btn-primary submit">Submit</button>
				<button @click="closeModal" class="btn btn-default cancel">Cancel</button>
			</div>
		</modal>
        
        <modal v-else-if="showModal=='delete_by_netmask'" @close="showModal = ''">
			<h3 slot="header">Delete By NetMask</h3>
			<div slot="body">
			  <div class="">
				  <form class="form">
					  <div class="form-group">
						<label for="ftp_config_name">IP:</label>
                        <br>
						<input type="text" name="ip" class="form-control med" placeholder="Enter IP" v-model="ip">
                        <input type="text" name="port" class="form-control small" placeholder="Port" v-model="port"> 
					  </div>
				  </form>
			  </div>
			</div>
			<div slot="footer">
				<button class="btn btn-primary submit">Submit</button>
				<button @click="closeModal" class="btn btn-default cancel">Cancel</button>
			</div>
		</modal>
	</div>
</template>

<script>   
	const vSelect = require('vue!../main_components/select.vue'),
		  Pagination = require('vue!../main_components/pagination.vue'),
		  modal = require('vue!../main_components/modal.vue');
	module.exports = {
		components: {
			'select2': vSelect,
			'pagination': Pagination,
			'modal': modal
		},
		data: function(){
            return {
			  search: '',
			  showModal: '',
			  start_date:'',
			  end_date:'',
			  ip: '',
              port: '',
              hostname: '',
			  pageOne: {
                currentPage: 1,
                totalPages: 10
              },
			  selected1: 1,
			  options1: [
				  { id: 1, text: '10' },
				  { id: 2, text: '20' },
				  { id: 3, text: '30' },
				  { id: 4, text: '50' },
				  { id: 5, text: '100' }
			  ],
			  selected2: 0,
			  options2: [
				  { id: 1, text: 'Alias' },
				  { id: 2, text: 'Active' },
				  { id: 3, text: 'Actions' }
			  ],
			  file_breakdown: 2,
			  file_options:[
				  {id: 1, text: 'As one big file'},
				  {id: 2, text: 'As hourly file'},
				  {id: 3, text: 'As daily file'},
			  ],
			  time_zone: 12,
			  time_zone_options: [
				  { id: 1, text: 'GMT -12:00' },
				  { id: 2, text: 'GMT -11:00' },
				  { id: 3, text: 'GMT -10:00' },
				  { id: 4, text: 'GMT -9:00' },
				  { id: 5, text: 'GMT -8:00' },
				  { id: 6, text: 'GMT -7:00' },
				  { id: 7, text: 'GMT -6:00' },
				  { id: 8, text: 'GMT -5:00' },
				  { id: 9, text: 'GMT -4:00' },
				  { id: 10, text: 'GMT -3:00' },
				  { id: 11, text: 'GMT -2:00' },
				  { id: 12, text: 'GMT -1:00' },
				  { id: 13, text: 'GMT +0:00' },
				  { id: 14, text: 'GMT +1:00' },
				  { id: 15, text: 'GMT +2:00' },
				  { id: 16, text: 'GMT +3:00' },
				  { id: 17, text: 'GMT +4:00' },
				  { id: 18, text: 'GMT +5:00' },
				  { id: 19, text: 'GMT +6:00' },
				  { id: 20, text: 'GMT +7:00' },
				  { id: 21, text: 'GMT +8:00' },
				  { id: 22, text: 'GMT +9:00' },
				  { id: 23, text: 'GMT +10:00' },
				  { id: 24, text: 'GMT +11:00' },
				  { id: 25, text: 'GMT +12:00' },
			  ],
			  ips: [
				{
				  ip: "158.69.203.19",
				  hostname: 'justhost.com',
				  create_time: '2017-02-15 11:10:01+00'
				},
                {
				  ip: "158.69.203.19",
				  hostname: 'justhost.com',
				  create_time: '2017-02-15 11:10:01+00'
				},
                {
				  ip: "158.69.203.19",
				  hostname: 'justhost.com',
				  create_time: '2017-02-15 11:10:01+00'
				},
                {
				  ip: "158.69.203.19",
				  hostname: 'justhost.com',
				  create_time: '2017-02-15 11:10:01+00'
				},
                {
				  ip: "158.69.203.19",
				  hostname: 'justhost.com',
				  create_time: '2017-02-15 11:10:01+00'
				}
			  ]
            }
        },
		methods: {
			pageOneChanged (pageNum) {
				this.pageOne.currentPage = pageNum
			},
			closeModal: function() {
				this.showModal = '';
			},
			upload: function() {
				this.$router.push({path:"/monitoring/blackhole_ip/upload"});
			}
		},
		mounted: function () {
			$('[data-toggle="tooltip"]').tooltip();
		}
	}
</script>

<style>
    input.form-control.med {
        display: inline-block;
        width: 80%;
    }
</style>
