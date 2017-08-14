<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Configuration</a></li>
				  <li class="breadcrumb-item active">Verify Configuration</li>
			</ol>
			<h1 class="page-header">Verify Configuration</h1>
			<div class="white_pad">
				<tabs class="vertical">
					<tab label="Switch Service Test" class="" icon="dnl_icon dnl_arrow-point-to-right" selected>
						<section class="role_section basic_section">
							<h2 class="role_section_name">Switch Service Test</h2>
							<div class="table-responsive">
								<table class="table table-striped table-hover carrier_groups">
								  <thead>
									<tr>
									  <th class="width_138">IP<span class="dnl_icon dnl_sort pull-right"></span></th>
									  <th>Port</th>
									  <th>Status</th>
									  <th class="width_138">Action</th>
									</tr>
								  </thead>
								  <tbody>
									<tr>
									  <td>7.7.7.7</td>
									  <td>5060</td>
									  <td>Connection to 7.7.7.7 / 5060 failed.</td>
									  <td>
										  <a class="btn btn-primary mini">Verify Again</a>
									  </td>
									</tr>
								  </tbody>
								</table>
							</div>
							<div class="clearfix"></div>
						</section>
					</tab>
					<tab label="Switch Info Test" class="" icon="dnl_icon dnl_arrow-point-to-right">
						<section class="role_section">
							<h2 class="role_section_name">Switch Info Test</h2>
							<div class="table-responsive">
								<table class="table table-striped table-hover carrier_groups">
								  <thead>
									<tr>
									  <th class="width_138">IP<span class="dnl_icon dnl_sort pull-right"></span></th>
									  <th>Port</th>
									  <th>Status</th>
									  <th class="width_138">Action</th>
									</tr>
								  </thead>
								  <tbody>
									<tr>
									  <td>7.7.7.7</td>
									  <td>5060</td>
									  <td>Connection to 7.7.7.7 / 5060 failed.</td>
									  <td>
										  <a class="btn btn-primary mini">Verify Again</a>
									  </td>
									</tr>
								  </tbody>
								</table>
							</div>
							<div class="clearfix"></div>
						</section>
					</tab>
					<tab label="Redis Server Test" class="" icon="dnl_icon dnl_arrow-point-to-right">
						<section class="role_section basic_section">
							<h2 class="role_section_name">Redis Server Test</h2>
							<div class="table-responsive">
								<table class="table table-striped table-hover carrier_groups">
								  <thead>
									<tr>
									  <th class="width_138">IP<span class="dnl_icon dnl_sort pull-right"></span></th>
									  <th>Port</th>
									  <th>Status</th>
									  <th class="width_138">Action</th>
									</tr>
								  </thead>
								  <tbody>
									<tr>
									  <td>7.7.7.7</td>
									  <td>5060</td>
									  <td>Connection to 7.7.7.7 / 5060 failed.</td>
									  <td>
										  <a class="btn btn-primary mini">Verify Again</a>
									  </td>
									</tr>
								  </tbody>
								</table>
							</div>
							<div class="clearfix"></div>
						</section>
					</tab>
					<tab label="Script Permissions Test" class="" icon="dnl_icon dnl_arrow-point-to-right">
						<section class="role_section">
							<h2 class="role_section_name">Script Permissions Test</h2>
							<div class="table-responsive">
								<table class="table table-striped table-hover carrier_groups">
								  <thead>
									<tr>
									  <th>Filename<span class="dnl_icon dnl_sort pull-right"></span></th>
									  <th>Permissions</th>
									  <th class="width_138">Action</th>
									</tr>
								  </thead>
								  <tbody>
									<tr>
									  <td>auto_upload_rate.sh</td>
									  <td>755, you must set it to 777</td>
									  <td>
										  <a class="btn btn-primary mini">Verify Again</a>
									  </td>
									</tr>
								  </tbody>
								</table>
							</div>
							<div class="clearfix"></div>
						</section>
					</tab>
				</tabs>
				<div class="clearfix"></div>
			</div>
		</div>
	  </div>
	</div>
</template>

<script>   
	const vTabs = require('vue!../main_components/tabs.vue'),
		  vTab = require('vue!../main_components/tab.vue')
	module.exports = {
		components: {
			'tabs': vTabs,
			'tab': vTab
		},
		data: function(){
            return {
				role_name: '',
				view_all_carriers: '',
			}
        }
	}
</script>

<style>
	
	/* Landscape phones and down */
	@media (max-width: 480px) {
		.vertical .tabs_container .role_section {
			padding: 12px 5px;
		}
		
		.vertical .tabs_container .role_section h2.role_section_name {
			font-size: 20px;
			margin-top: 5px;
			margin-bottom: 15px;
		}
	}

	/* Portrait phone to landscape phone */
	@media (min-width: 319px) and (max-width: 479px) {
		
	}

</style>
