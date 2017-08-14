<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a>Monitoring</a>
					</li>
					<li class="breadcrumb-item">
						<router-link to="/monitoring/loop_detection">Loop Detection</router-link>
					</li>
					<li class="breadcrumb-item active">Loop Detection Editor</li>
				</ol>
				<h1 class="page-header">Loop Detection Editor</h1>
				<router-link to="/monitoring/loop_detection" class="btn btn_white back">
					<span class="dnl_icon dnl_import"></span> Back </router-link>
				<div class="white_pad configuration_pad">
					<div class="col-md-12 col-sm-12">
						<form class="form" @submit.prevent="validateBeforeSubmit">
							<section class="role_section basic_section m-left-0">
								<h2 class="role_section_name">Basic Info</h2>
								<div class="col-md-3 col-sm-6">
									<div class="form-group">
										<label for="alias">Rule Name:</label>
										<input type="text" name="alias" v-model="data.alias" class="form-control" placeholder="Enter Alias">
									</div>
								</div>
								<div class="clearfix"></div>
								<div class="col-sm-6">
									<div class="form-group">
										<label>Ingress Trunk:</label>
										<!--<select multiple="multiple" id="or_trunk" name="or_trunk">
												<option v-for="trunk in trunk_options" v-bind:value='trunk.value' v-bind:selected="ingress_trunks.indexOf(trunk.value)>-1?true:false">{{trunk.text}}</option>
											</select>-->
										<el-transfer v-model="data.ingress_trunks" :titles="['Selectable Fields', 'Selected Fields']" :data="trunk_options">
										</el-transfer>
									</div>
								</div>
								<div class="clearfix"></div>
							</section>
							<section class="role_section basic_section m-left-0">
								<h2 class="role_section_name">Detection Criteria</h2>
								<div class="form-group">
									<p class="inline">
										The same ANI and DNIS occurs for more than
										<input type="text" name="" class="form-control small" v-model="data.occurance"> times within
										<input type="text" name="" class="form-control small" v-model="data.period"> s.
									</p>
								</div>
							</section>
							<section class="role_section basic_section m-left-0">
								<h2 class="role_section_name">Action</h2>
								<div class="form-group">
									<p class="inline">
										Block this ANI and DNIS combination for
										<input type="text" name="" class="form-control small" v-model="data.block_second"> s.
									</p>
								</div>
							</section>
							<div class="button_set little-space">
								<button class="btn btn-primary" type="submit">
									Submit
								</button>
								<a class="btn btn-default">
									Reset
								</a>
							</div>
						</form>
					</div>
					<div class="clearfix little-space"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>   
const multiselect = require('multiselect'),
	vSelect = require('vue!../main_components/select.vue');
const api = require("../../api");
const auth = require("../../auth");
module.exports = {
	components: {
		'multiselect': multiselect,
		'select2': vSelect
	},
	data: function () {
		return {
			id: null,
			apiUrl: '/v1/monitoring/loop_detection/',
			data: {},
			// ingress_trunks: [],
			trunk_options: [
				{ key: 1, label: 'Trunk 1' },
				{ key: 2, label: 'Trunk 2' },
				{ key: 3, label: 'Trunk 3' },
				{ key: 4, label: 'Trunk 4' },
				{ key: 5, label: 'Trunk 5' }
				// { id: 1, value: 1, text: 'Trunk 1' },
				// { id: 2, value: 2, text: 'Trunk 2' },
				// { id: 3, value: 3, text: 'Trunk 3' },
				// { id: 4, value: 4, text: 'Trunk 4' },
				// { id: 5, value: 5, text: 'Trunk 5' }
			],
			groupname: '',
			options: [
				{ id: 1, value: 'carrier1', text: 'Carrier 1' },
				{ id: 2, value: 'carrier2', text: 'Carrier 2' },
				{ id: 3, value: 'carrier3', text: 'Carrier 3' },
				{ id: 4, value: 'carrier4', text: 'Carrier 4' },
				{ id: 5, value: 'carrier5', text: 'Carrier 5' }
			],
			ingress_trunks: [],

		}
	},
	methods: {
		validateBeforeSubmit() {
			console.log("validateBeforeSubmit");
			this.$validator.validateAll().then(() => {
				console.log("validator");
				this.loading = true;
				console.log(this.data.ingress_trunks);
				var tmp_list = [];
				this.data.ingress_trunks.forEach(function (item, i) {
                    var temp = {};
                    temp.trunk_id = item;
					tmp_list.push(temp);
                });

				console.log("tmp_list");
				console.log(tmp_list);

				this.$http.patch(api.getEndpointUrl() + '/v1/monitoring/loop_detection/' + this.id,
					{
						"name": this.data.alias,
						"occurance": this.data.occurance,
						"period": this.data.period,
						"block_second": this.data.block_second,
						"ingress_trunks": tmp_list,
					},
					{
						headers: {
							"X-Auth-Token": auth.getToken()
						}
					}
				).then(
					function (response) {
						console.log("success");
						this.loading = false;
						console.log(response);
						this.loading = false;
						this.$router.push('/monitoring/loop_detection');
					},
					function (error) {
						this.loading = false;
						console.log(error);
					}
					)
			}).catch(() => {
				// eslint-disable-next-line

			});
		},
		isSelectedTrunk: function (value) {
			var ingress_trunks = this.ingress_trunks;
			console.log(ingress_trunks);
			if (ingress_trunks.indexOf(value) > -1) {
				console.log('true');
				return true;
			}
			console.log('false');
			return false;
			// if(value==1 || value==2) {
			// 	return true;
			// }
			/*
			var ingress_trunks= this.ingress_trunks;
			for(var i=0;i<ingress_trunks.length;i++) {
				if(ingress_trunks[i] == value) {
					return true;
				}
			}
			return false;
			*/
		}
	},
	mounted: function () {
		// $('#or_trunk').multiSelect({
		// 	selectableHeader: "<div class='custom-header'>Selectable Fields</div>",
		// 	selectionHeader: "<div class='custom-header'>Selected Fields</div>"
		// });
	},
	created: function () {
		var the = this;
		var id = this.$route.params.id;
		this.id = id;
		this.loading = true;
		this.$http.get(api.getEndpointUrl() + this.apiUrl + id,
			{
				headers: {
					"X-Auth-Token": auth.getToken()
				}
			}).then(function (response) {
				this.loading = false;
				console.log(response);
				var loop = response.body.payload;
				var vm = this;
				loop.ingress_trunks.forEach(function (item, i) {
					vm.ingress_trunks.push(item.trunk_id);
				});
				console.log(this.ingress_trunks);

				Vue.set(this.data, 'alias', loop.name);
				Vue.set(this.data, 'period', loop.period);
				Vue.set(this.data, 'occurance', loop.occurance);
				Vue.set(this.data, 'block_second', loop.block_second);
				Vue.set(this.data, 'ingress_trunks', this.ingress_trunks);

			}, function (error) {
				this.loading = false;
				console.log(error);
			});
	},
}
</script>

<style>

</style>
