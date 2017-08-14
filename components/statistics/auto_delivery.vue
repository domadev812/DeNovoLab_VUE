<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper">
			<div class="sidebar">
			  <ul class="nav nav-sidebar">
				<li>
					<router-link to="/statistics/dashboard">
						<span class="dnl_icon dnl_dashboard"></span>
						Dashboard 
					</router-link>
				</li>
				<li>
					<router-link to="/statistics/dashboard/report">
						<span class="dnl_icon dnl_report"></span>
						Report
					</router-link>
				</li>
				<li>
					<router-link to="/statistics/dashboard/charts">
						<span class="dnl_icon dnl_chart"></span>
						Charts
					</router-link>
				</li>
				<li class="active">
					<router-link to="/statistics/dashboard/auto_delivery">
						<span class="dnl_icon dnl_auto_delivery"></span>
						Auto Delivery
						<span class="sr-only">(current)</span>
					</router-link>
				</li>
				<li>
					<router-link to="/statistics/dashboard/qos_report">
						<span class="dnl_icon dnl_qos_report"></span>
						Qos Report
					</router-link>
				</li>
				<li>
					<router-link to="/statistics/dashboard/ingress_client_qos">
						<span class="dnl_icon dnl_ingress"></span>
						Ingress Clients Qos
					</router-link>
				</li>
				<li>
					<router-link to="/statistics/dashboard/egress_client_qos">
						<span class="dnl_icon dnl_egress"></span>
						Egress Clients Qos
					</router-link>
				</li>
				<li>
					<router-link to="/statistics/dashboard/alert">
						<span class="dnl_icon dnl_ring"></span> Alert
						<span class="sr-only">(current)</span>
					</router-link>
				</li>
			  </ul>
			  <div class="sidebar_footer">
				  <span class="dnl_icon dnl_menu"></span>
				  <br>
				  DeNovoLab@2010-2016 <br> All Rights Reserved. 
			  </div>
			</div>
			<div class="col-sm-12 col-md-offset-2 col-md-10">
				<time-display></time-display>
				<ol class="breadcrumb">
					  <li class="breadcrumb-item"><a>Statistics</a></li>
					  <li class="breadcrumb-item">
						  <router-link to="/statistics/dashboard">Dashboard</router-link>
					  </li>
					  <li class="breadcrumb-item active">Auto Delivery</li>
				</ol>
				<h1 class="page-header">Auto Delivery</h1>
				<div class="white_pad">
					<div class="row">
						<div class="col-md-4 col-sm-6">
							<div class="form-group">
								<label for="username">Group by:</label>
								<select2 :options="options" v-model="group_by"></select2>
							</div>
						</div>
						<div class="col-md-4 col-sm-6">
							<div class="form-group">
								<label for="username">Time Zone:</label>
								<select2 :options="options" v-model="time_zone"></select2>
							</div>
						</div>
						<div class="clearfix"></div>
						<div class="col-md-4 col-sm-6">
							<div class="form-group">
								<label for="email_address">E-mail Address:</label>
								<input type="email" name="email_address" v-model="email_address" class="form-control" placeholder="Enter E-mail Address">
							</div>
						</div>
						<div class="col-md-4 col-sm-6">
							<div class="form-group">
								<label for="max_lines">E-mail Subject:</label>
								<input type="text" name="email_subject" v-model="email_subject" class="form-control" placeholder="Enter E-mail Subject">
							</div>
						</div>
						<div class="clearfix"></div>
						<div class="col-md-8 col-sm-12">
							<div class="form-group">
								<label for="email_content">E-mail Content:</label>
								<textarea class="form-control" name="email_content" v-model="email_content" placeholder="Enter E-mail Content"></textarea>
							</div>
						</div>
						<div class="clearfix"></div>
						<div class="col-md-12">
							<div class="button_set">
								<a class="btn btn-primary mini">
									Submit
								</a>
								<a class="btn btn-default mini">
									Test
								</a>
							</div>
						</div>
						<div class="clearfix"></div>
					</div>
				</div>
			</div>
		</div>
		</div>
	</div>
</template>

<script>   
	const vSelect = require('vue!../main_components/select.vue');
	module.exports = {
		components: {
			'select2': vSelect
		},
		data: function(){
            return {
			  group_by: '',
			  time_zone: '',
			  email_address: '',
			  email_subject: '',
			  email_content: '',
			  options: [
				  { id: 1, text: 'Alias' },
				  { id: 2, text: 'Active' },
				  { id: 3, text: 'Actions' }
			  ]
            }
        },
		methods: {
			
		},
		mounted: function () {
			
		}
	}
</script>

<style>
	textarea.form-control {
		border: 1px solid #dee0e3;
	}
</style>
