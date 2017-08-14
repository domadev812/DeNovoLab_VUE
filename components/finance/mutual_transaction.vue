<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single big_data">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Finance</a></li>
				  <li class="breadcrumb-item active">Mutual Transaction</li>
			</ol>
			<h1 class="page-header">Mutual Transaction</h1>
				<div class="white_pad table_wrap">
					<div class="advanced_search_filter_panel">
						<div class="col-md-3 col-sm-4">
							<label>Carrier:</label>
							<select2 :options="options" v-model="carrier">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="col-md-4 col-sm-8">
							<div class="inlined">
								<label for="start_date">Start Time:</label>
								<input type="text" name="start_date" v-model="start_date" class="form-control" placeholder="Enter Date">
							</div>
							<div class="inlined">
								<label for="end-date">End Time:</label>
								<input type="text" name="end_date" v-model="end_date" class="form-control" placeholder="Enter Date">
							</div>
						</div>
						<div class="col-md-2 col-sm-4">
							<label>GMT:</label>
							<select2 :options="options" v-model="gmt">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="col-md-3 col-sm-4">
							<label>Type:</label>
							<select2 :options="options" v-model="type">
								<option disabled value="0">Select one</option>
							</select2>
						</div>
						<div class="clearfix little-space"></div>
						<div class="col-md-12">
							<div class="button_set m-top-10">
								<a class="btn btn-primary">
									Submit
								</a>
								<a class="btn btn-default"  v-on:click="exportCSV()">
									Download
								</a>
							</div>
						</div>
						<div class="clearfix"></div>
					</div>
					<div class="table-responsive">
						<table class="table table-striped table-hover carrier_groups centrum">
						  <thead>
                            <tr>
								<th>Begin Date</th>
								<th>2014-02-03 00:00:00+0000</th>
								<th>Begin Balance</th>
								<th>0</th>
							</tr>
						  </thead>
						  <tbody>
							
						  </tbody>
						</table>
					</div>
					<div class="clearfix little-space"></div>
					<div class="table-responsive">
						<table class="table table-striped table-hover carrier_groups centrum">
						  <thead>
                            <tr>
								<th>Date</th>
								<th>Type</th>
								<th>Carrier</th>
								<th>Amount</th>
								<th>Balance</th>
							</tr>
						  </thead>
						  <tbody>
							<tr v-for="transaction in transactions">
							  <td>{{transaction.date}}</td>
							  <td>{{transaction.type}}</td>
							  <td>{{transaction.carrier}}</td>
							  <td>{{transaction.amount}}</td>
							  <td>{{transaction.balance}}</td>
							</tr>
						  </tbody>
						</table>
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
			'select2': vSelect,
		},
		data: function(){
            return {
				carrier: '',
				start_date: '',
				end_date: '',
				gmt: '',
				type: '',
				options: [
				  { id: 1, value: 'carrier1', text: 'Carrier 1' },
				  { id: 2, value: 'carrier2', text: 'Carrier 2' },
				  { id: 3, value: 'carrier3', text: 'Carrier 3' },
				  { id: 4, value: 'carrier4', text: 'Carrier 4' },
				  { id: 5, value: 'carrier5', text: 'Carrier 5' }
			    ],
				transactions: [
					{
					  date: '2016-11-16 08:47:30+0000',
					  type: 'Payment Received',
					  carrier: '',
					  amount: '22',
					  balance: '22'
					},
					{
					  date: '2016-11-16 08:47:30+0000',
					  type: 'Payment Received',
					  carrier: '',
					  amount: '22',
					  balance: '22'
					},
					{
					  date: '2016-11-16 08:47:30+0000',
					  type: 'Payment Received',
					  carrier: '',
					  amount: '22',
					  balance: '22'
					},
					{
					  date: '2016-11-16 08:47:30+0000',
					  type: 'Payment Received',
					  carrier: '',
					  amount: '22',
					  balance: '22'
					},
					{
					  date: '2016-11-16 08:47:30+0000',
					  type: 'Payment Received',
					  carrier: '',
					  amount: '22',
					  balance: '22'
					}
			    ]
			}
        },
		methods: {
				exportCSV: function () {
            var vm = this;		
            var csvArray = new Array();
            var fields = ["date", "type", "carrier", "amount", "balance"];
            csvArray.push(fields);
            var csvContent = "data:text/csv;charset=utf-8,";                        
            this.transactions.forEach(function (transaction, i) {
                var values = new Array();
                if(i != 0)
                {
                    csvContent += ",\n";
                } 
                csvContent += "{\n";
                csvContent += "date:" + transaction.date + ",\n";
                csvContent += "type:" + transaction.type + ",\n";
                csvContent += "carrier:" + transaction.carrier + ",\n";
                csvContent += "amount:" + transaction.amount + ",\n";                
                csvContent += "balance:" + transaction.balance + "\n";
                csvContent += "}"; 

                values.push(transaction.date + "");
                values.push(transaction.type);
                values.push(transaction.carrier);
                values.push(transaction.amount);
                values.push(transaction.balance);
                
                csvArray.push(values);                
            });	                                
            window.open(encodeURI(csvContent) );   
            exportToCsv('finance_mutual_transaction_export.csv', csvArray);         
				},
		}
	}
</script>

<style>
</style>
