<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="#">Log</a>
					</li>
					<li class="breadcrumb-item active">Invoice CDR Log</li>
				</ol>
				<h1 class="page-header">Invoice CDR Log</h1>
				<tabs>
					<tab label="Ingress" class="" icon="dnl_icon dnl_to_left" selected>
						<div class="advanced_search_filter_panel bottom_0">
							<div class="col-md-3 col-sm-4">
								<label>Carrier:</label>
								<select2 :options="options" v-model="ingress_carrier">
									<option disabled value="0">Select one</option>
								</select2>
							</div>
							<div class="col-md-3 col-sm-4">
								<label for="time">Time:</label>
								<input type="text" name="time" v-model="ingress_time" class="form-control" placeholder="Enter Time">
							</div>
							<div class="col-md-3 col-sm-4">
								<a class="btn btn-primary m-top-25">
									Query
								</a>
							</div>
							<div class="clearfix"></div>
						</div>
						<div class="table-responsive m-top-20">
							<table class="table table-striped table-hover codes">
								<thead>
									<tr>
										<th></th>
										<th></th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td></td>
										<td></td>
										<td></td>
									</tr>
								</tbody>
							</table>
						</div>
					</tab>
					<tab label="Egress" class="" icon="dnl_icon dnl_to_right">
						<div class="advanced_search_filter_panel bottom_0">
							<div class="col-md-3 col-sm-4 fix_big_select">
								<label>Carrier:</label>
								<br>
								<select2 :options="options" v-model="egress_carrier">
									<option disabled value="0">Select one</option>
								</select2>
							</div>
							<div class="col-md-3 col-sm-4">
								<label for="time">Time:</label>
								<input type="text" name="time" v-model="egress_time" class="form-control" placeholder="Enter Time">
							</div>
							<div class="col-md-3 col-sm-4">
								<a class="btn btn-primary m-top-25">
									Query
								</a>
							</div>
							<div class="clearfix"></div>
						</div>
						<div class="table-responsive m-top-20">
							<table class="table table-striped table-hover codes">
								<thead>
									<tr>
										<th></th>
										<th></th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td></td>
										<td></td>
										<td></td>
									</tr>
								</tbody>
							</table>
						</div>
					</tab>
				</tabs>
			</div>
		</div>
	</div>
</template>

<script>   
const vTabs = require('vue!../main_components/tabs.vue'),
	vTab = require('vue!../main_components/tab.vue'),
	vSelect = require('vue!../main_components/select.vue');
module.exports = {
	components: {
		'tabs': vTabs,
		'tab': vTab,
		'select2': vSelect
	},
	data: function () {
		return {
			ingress_time: '',
			ingress_carrier: '',
			egress_time: '',
			egress_carrier: '',
			options: [
				{ id: 1, value: 'carrier1', text: 'Carrier 1' },
				{ id: 2, value: 'carrier2', text: 'Carrier 2' },
				{ id: 3, value: 'carrier3', text: 'Carrier 3' },
				{ id: 4, value: 'carrier4', text: 'Carrier 4' },
				{ id: 5, value: 'carrier5', text: 'Carrier 5' }
			],
			selected1: 1,
			selected2: 1
		}
	}
}
</script>

<style>
.fix_big_select .select2 {
	width: 100% !important;
}
</style>
