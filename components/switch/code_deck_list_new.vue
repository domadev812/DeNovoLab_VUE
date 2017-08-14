<template>
	<div class="container-fluid">
		<div class="row">
			<div class="wrapper single">
				<time-display></time-display>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="#">Switch</a>
					</li>
					<li class="breadcrumb-item">
						<router-link to="/switch/code_deck">Code Deck </router-link>
					</li>
					<li class="breadcrumb-item">
						<router-link to="/switch/code_deck/code_deck_list">Code Deck List</router-link>
					</li>
				</ol>
				<h1 class="page-header">{{ componentName }}</h1>
				<router-link :to="'/switch/code_deck/code_deck_list/'+code_deck.code_deck_id" class="btn btn_white back">
					<span class="dnl_icon dnl_import"></span> Back </router-link>
				<div class="white_pad">
					<div class="select_group row">
						<div class="col-md-8 col-sm-8">
							<form class="form" @submit.prevent="validateBeforeSubmit">
								<div class="row">
									<div class="form-group">
										<div class="col-sm-4">
											<label for="groupname">Code:</label>
											<input type="text" name="code" v-model="code.code" class="form-control" v-validate="'required'" placeholder="Enter Code">
											<span v-show="errors.has('code')" class="help is-danger">{{ errors.first('code') }}</span>
										</div>
										<div class="col-sm-4">
											<label for="groupname">Code Name:</label>
											<input type="text" name="name" v-model="code.code_name" class="form-control" v-validate="'required'" placeholder="Enter Name">
											<span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
										</div>
										<div class="col-sm-4">
											<label for="groupname">Country:</label>
											<input type="text" name="country" v-model="code.country" class="form-control" v-validate="'required'" placeholder="Enter Country Name">
											<span v-show="errors.has('country')" class="help is-danger">{{ errors.first('country') }}</span>
										</div>
										<!-- <div class="clearfix little-space"></div>
										<div class="col-sm-4">
											<label for="groupname">City:</label>
											<input type="text" name="city" v-model="code.city" class="form-control" v-validate="'required'" placeholder="Enter City">
											<span v-show="errors.has('city')" class="help is-danger">{{ errors.first('city') }}</span>
										</div>
										<div class="col-sm-4">
											<label for="groupname">State:</label>
											<input type="text" name="state" v-model="code.state" class="form-control" v-validate="'required'" placeholder="Enter State">
											<span v-show="errors.has('state')" class="help is-danger">{{ errors.first('state') }}</span>
										</div> -->
									</div>
									<div class="clearfix little-space"></div>
								</div>
								<div class="button_set little-space">
									<button class="btn btn-primary" type="submit">
										Submit
									</button>
									<i v-show="loading" class="fa fa-spinner fa-spin" style="font-size:20px;line-height:40px;"></i>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>   
const api = require("../../api");
const auth = require("../../auth");
const vSpinner = require('vue!../main_components/fadeloader.vue');
import {mapGetters,	mapActions} from 'vuex'

module.exports = {
	props: ['editingcode', 'id', 'index'],
	created: function () {
		this.fetchCodeDeck()
	},
	data: function () {
		return {
			country: '',
			name: '',
			code: '',
			code_deck_template: {},
			loading: false,
			requestForm: {},
			code_deck: {},
			code: {},
		}
	},
	computed: {
		componentName () {
			return this.editingcode ? 'Edit Code Deck' : 'New Code Deck'
		}
	},
	mounted: function () {

	},
	methods: {
		...mapActions({
			setAsyncConfirm: 'async_confirm/setAsyncConfirm',
			setMessage: 'app_message/setAppMessage'
		}),
		fetchCode() {
			console.log(this.code_deck.codes);
			this.code = this.code_deck.codes[this.index];
			console.log(this.code);
		},
		fetchCodeDeck() {
			this.loading = true;
			const url = api.getEndpointUrl() + '/v1/switch/code_deck/'+this.id
			this.$http.get(url)
			.then(response => {
				const body = response.body
				if (body.success) {
					var code_deck = body.payload
					Vue.set(this.code_deck, 'code_deck_name', code_deck.name)
					Vue.set(this.code_deck, 'code_deck_id', this.id)
					Vue.set(this.code_deck, 'codes', code_deck.codes)
					console.log(this.code_deck)
					if (this.editingcode) {
						this.fetchCode();
					}
				}
				this.loading = false
			})
			.catch(error => {
				this.loading = false
				console.log(error)
			})
		},
		getCodeDeckForRequest() {
			const code_deck_template = Object.assign({}, this.code_deck_template);
			code_deck_template.codes = this.code_deck.codes;
			if(this.editingcode) {
				code_deck_template.codes[this.index] = this.code;
			}
			else {
				code_deck_template.codes.push({
					code: this.code.code,
					code_name: this.code.code_name,
					country: this.code.country,
					// city: this.code.city,
					// state: this.code.state,
				});
			}
			
			code_deck_template.name = this.code_deck.name;
			return code_deck_template;
		},
		saveCodeDeck() {
			this.loading = true;
			const reqBody = this.getCodeDeckForRequest();
			const url = api.getEndpointUrl() + '/v1/switch/code_deck/' + this.code_deck.code_deck_id;
			this.$http.patch(url, reqBody)
			.then(response => {
				if (response.body.success) {
					this.setMessage('Code was created successfully');
					var thisvm = this;
					setTimeout(function(){
						thisvm.$router.push('/switch/code_deck/code_deck_list/'+thisvm.code_deck.code_deck_id);
					}, 3000);
				}
			})
			.catch(error => {
				console.log(error)
				this.setMessage({
					message: 'Failed to change code',
					type: 'error'
				})
			})
		},
		validateBeforeSubmit() {
			var vm = this;
			this.$validator.validateAll().then(() => {
				const err = this.$validator.getErrors();
				if (err.errors.length > 0) {
					vm.setMessage({
						message: 'Validation failed',
						type: 'error'
					})
				}
				else {
					vm.saveCodeDeck();
				}
					
			}).catch((error) => {
				// eslint-disable-next-line
				console.log(error)
				vm.setMessage({
					message: 'Validation failed',
					type: 'error'
				})
			});
		}
	}
}
</script>

<style>
	.wrapper.single .white_pad {
		margin-bottom: 20px;
	}
	
	.little-space {
		margin: 15px 0;
	}
	
	.ms-container .ms-selectable,
	.ms-container .ms-selection {
		width: 47%;
	}
	
	.button_set.little-space {
		margin-top: 25px;
	}
	
	.button_set.little-space .btn {
		width: 23%;
	}
	
	.button_set.little-space .btn-primary {
		margin-right: 2px;
	}
	
	.btn_white.back {
		color: #222;
		background: #f7f8f9;
		border: 1px solid #e2e6ed;
		box-shadow: 0px 1px 1px 0px rgba(227, 230, 237, 0.74);
		padding: 9px 30px;
		margin-bottom: 20px;
	}
	
	.btn_white.back:hover {
		background: #fff;
	}
	
	.btn_white.back .dnl_icon {
		color: #03c0fc;
		font-size: 16px;
		vertical-align: middle;
		margin: -2px 5px 0 -10px;
		display: inline-block;
		transform: rotate(-90deg);
		font-weight: 900;
	}
	.daysselect {
		border:1px solid #dee0e3;
		padding:8px;
		border-radius: 4px;
	}
	@media (max-width: 480px) {
		.white_pad.select_group {
			width: 100%;
		}
		.clearfix.little-space,
		.button_set.little-space {
			margin: 0;
		}
	}
	
	@media (min-width: 319px) and (max-width: 479px) {
		.ms-container .ms-selectable,
		.ms-container .ms-selection {
			width: 100%;
			margin-bottom: 20px;
		}
		.ms-container {
			background-position: 50% 48%;
		}
		.ms-selection {
			margin-top: 20px;
		}
	}

</style>