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
										<input type="text" name="alias" v-model="alias" class="form-control" :class="{'input': true, 'is-danger': errors.has('alias') }" placeholder="Enter Alias" v-validate="'required'">
										<span v-show="errors.has('alias')" class="help is-danger">{{ errors.first('alias') }}</span>
									</div>
								</div>
								<div class="clearfix"></div>
								<div class="col-sm-6">
									<div class="form-group">
										<label>Ingress Trunk:</label>
										<!--<select multiple="multiple" id="or_trunk" name="or_trunk">
											<option v-for="trunk in trunk_options" :value='trunk.value'>{{trunk.text}}</option>
										</select>-->
                                        <el-transfer v-model="ingress_trunks" :titles="['Selectable Fields', 'Selected Fields']" :data="trunk_options">
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
										<input type="text" name="occurance" class="form-control small" :class="{'input': true, 'is-danger': errors.has('occurance') }" v-model="occurance" v-validate="'required|numeric'">
										<span v-show="errors.has('occurance')" class="help is-danger">{{ errors.first('occurance') }}</span>
										times within
										<input type="text" name="period" class="form-control small" :class="{'input': true, 'is-danger': errors.has('period') }" v-model="period" v-validate="'required|numeric'">
										<span v-show="errors.has('period')" class="help is-danger">{{ errors.first('period') }}</span> s.
									</p>
								</div>
							</section>
							<section class="role_section basic_section m-left-0">
								<h2 class="role_section_name">Action</h2>
								<div class="form-group">
									<p class="inline">
										Block this ANI and DNIS combination for
										<input type="text" name="block_second" class="form-control small" :class="{'input': true, 'is-danger': errors.has('block_second') }" v-model="block_second" v-validate="'required'">
										<span v-show="errors.has('block_second')" class="help is-danger">{{ errors.first('block_second') }}</span> s.
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
_ = require('lodash');
import {mapGetters,	mapActions} from 'vuex'

module.exports = {
	components: {
		'multiselect': multiselect,
		'select2': vSelect
	},
	data: function () {
		return {
			period: '',
			occurance: '',
			block_second: '',
			ingress_trunks: [],
            trunk_options: [],
			alias: '',
			groupname: '',
			options: [
				{ id: 1, value: 'carrier1', text: 'Carrier 1' },
				{ id: 2, value: 'carrier2', text: 'Carrier 2' },
				{ id: 3, value: 'carrier3', text: 'Carrier 3' },
				{ id: 4, value: 'carrier4', text: 'Carrier 4' },
				{ id: 5, value: 'carrier5', text: 'Carrier 5' }
			],
		}
	},
	mounted: function () {
		// $('#or_trunk').multiSelect({
		// 	selectableHeader: "<div class='custom-header'>Selectable Fields</div>",
		// 	selectionHeader: "<div class='custom-header'>Selected Fields</div>"
		// });
	},
	methods: {
		...mapActions({
			setAsyncConfirm: 'async_confirm/setAsyncConfirm',
			setMessage: 'app_message/setAppMessage'
		}),
		fetchIngressTrunk () {
			
		},
		validateBeforeSubmit() {
			console.log("validateBeforeSubmit");
			this.$validator.validateAll().then(() => {
				console.log("validator");
				this.loading = true;

				// var ingress_trunks = [];
				// $("#or_trunk").val().forEach(function (item, i) {
				// 	ingress_trunks.push({
				// 		"trunk_id": item,
				// 	});
				// });
				console.log("before api call");
				console.log(this.ingress_trunks);

				this.$http.post(api.getEndpointUrl() + '/v1/monitoring/loop_detection',
					{
						"name": this.alias,
						"occurance": this.occurance,
						"period": this.period,
						"block_second": this.block_second,
						"ingress_trunks": this.ingress_trunks,
					},
					{
						headers: {
							"X-Auth-Token": auth.getToken()
						}
					}
				).then(
					function (response) {
						console.log("success");
						console.log(response);
						this.loading = false;
						this.$router.push('/monitoring/loop_detection');
						this.setMessage('The loop detection has been created!');
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
	},
	created () {
		this.fetchIngressTrunk()
	}
}
</script>

<style>

</style>
