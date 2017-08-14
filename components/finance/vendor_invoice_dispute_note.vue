<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
            <time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Finance</a></li>
                  <li class="breadcrumb-item">
                       <router-link to="/finance/invoices">Invoices</router-link>
                  </li>
				  <li class="breadcrumb-item active">Vendor Invoice Dispute Note</li>
			</ol>
			<h1 class="page-header">Vendor Invoice Dispute Note</h1>
			<div class="white_pad table_wrap">
                <div class="table_filters">
                     <router-link to="/finance/invoices" class="btn btn_white back bottom_null">
                        <span class="dnl_icon dnl_import"></span> Back 
                    </router-link>
				</div>
                <div class="chart_select_header grided rounded">
						<div class="col-md-3 col-sm-4">
							<label>Carrier:</label>
							<select2 :options="options" v-model="carrier">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="col-md-6 col-sm-6">
							<div class="inlined">
								<label for="time1">Sent on:</label>
								<input type="text" name="time1" v-model="time1" class="form-control" placeholder="Enter Date/Time">
							</div>
							<div class="inlined">
								<label for="time2" class="m-top-15"></label>
								<input type="text" name="time2" v-model="time2" class="form-control" placeholder="Enter Date/Time">
							</div>
						</div>
						<div class="col-md-3 col-sm-4">
							<a class="btn btn-primary m-top-25">
								Query
							</a>
						</div>
						<div class="clearfix"></div>
				</div>
                <h2 class="center-block text-center">No Data Found</h2>
				<div class="clearfix little-space"></div>
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
        data: function () {
            return {
                time1: '',
                time2: '',
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
                carrier: '',
            }
        }
    }
</script>

<style>
    a.btn.btn_white.back.bottom_null {
        margin-bottom: 0;
    }
</style>
