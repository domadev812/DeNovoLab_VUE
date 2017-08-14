<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a href="#">Configuration</a></li>
				  <li class="breadcrumb-item active">Mail Template</li>
			</ol>
			<h1 class="page-header">Mail Template</h1>
			<div class="white_pad">
				<tabs class="vertical mail_template" @activateTab="activateTab">
					<tab v-for="(label, index) in labels" :label="label.name" icon="dnl_icon dnl_arrow-point-to-right" :selected="index === 0" @click="activateTab(index)">
						<section class="role_section">
							<h2 class="role_section_name">{{ label.name }}</h2>
							<div class="col-sm-12">
								<div class="row">
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="groupname">From E-mail:</label>
											<select2 :options="email_options" v-model="email"></select2>
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<label for="groupname">Subject:</label>
											<input type="text" name="groupname" placeholder="Enter Subject" class="form-control" v-model="label.subject">
										</div>
									</div>
									<div class="col-md-4 col-sm-6">
										<div class="form-group">
											<div class="form-group">
											<label for="groupname">CC:</label> <input type="text" name="groupname" placeholder="Enter Carbon Copy Email" class="form-control" v-model="label.cc_mail">
										</div>
										</div>
									</div>
									<div class="clearfix"></div>
								</div>
								<label>Content:</label>
								<ckeditor v-model="label.content" :id="'editor-' + index" :height="'280px'" :toolbar="'Format'"></ckeditor>
								<div class="row">
									<div class="col-md-12 m-top-20">
										<div class="form-group tags">
											<label for="groupname">Tags:</label>
											<span class="label label-default">#Username</span>
											<span class="label label-default">#Url</span>
											<span class="label label-default">#Welcoms</span>
										</div>
									</div>
								</div>
								<a class="btn btn-primary mini m-top-20" @click="saveTemplateChanges">
									Submit
								</a>
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
	  vTab = require('vue!../main_components/tab.vue'),
	  Ckeditor = require('vue!../main_components/ckeditor.vue'),
	  vSelect = require('vue!../main_components/select.vue')
import api from '../../api'
import { mapActions } from 'vuex'
module.exports = {
	name: 'mail_template',
	components: {
		'tabs': vTabs,
		'tab': vTab,
		'select2': vSelect,
		Ckeditor
	},
	data () {
    return {
			activeTab: 0,
			role_name: '',
			labels: [
				{
					id: 1,
					name: 'Welcome Letter',
					title: 'welcom',
					content: '',
					subject: null,
					from_mail_id: null,
					cc_mail: null
				},
				{
					id: 2,
					name: 'Retrieve Password',
					title: 'retrieve_password',
					content: '',
					subject: null,
					from_mail_id: null,
					cc_mail: null
				},
				{
					id: 3,
					name: 'Invoice',
					title: 'invoice',
					content: '',
					subject: null,
					from_mail_id: null,
					cc_mail: null
				},
				{
					id: 4,
					name: 'Payment Notice',
					title: 'payment_notice',
					content: '',
					subject: null,
					from_mail_id: null,
					cc_mail: null
				},
				{
					id: 5,
					name: 'Insufficient Balance',
					title: 'insufficient_balance',
					content: '',
					subject: null,
					from_mail_id: null,
					cc_mail: null
				},
				{
					id: 6,
					name: 'ZERO balance notification',
					title: 'zero_bal_notification',
					content: '',
					subject: null,
					from_mail_id: null,
					cc_mail: null
				},
				{
					id: 7,
					name: 'Daily Summary',
					title: 'daily_summary',
					content: '',
					subject: null,
					from_mail_id: null,
					cc_mail: null
				},
				{
					id: 8,
					name: 'Daily CDR',
					title: 'daily_cdr',
					content: '',
					subject: null,
					from_mail_id: null,
					cc_mail: null
				},
				{
					id: 9,
					name: 'Notice of Receipt',
					title: 'notice_of_receipt',
					content: '',
					subject: null,
					from_mail_id: null,
					cc_mail: null
				},
				{
					id: 10,
					name: 'Rate is Downloaded Notification',
					title: 'rate_downloaded',
					content: '',
					subject: null,
					from_mail_id: null,
					cc_mail: null
				},
				{
					id: 11,
					name: 'Suspended Trunk Due to Rate Not Downloaded',
					title: 'suspended_trunk',
					content: '',
					subject: null,
					from_mail_id: null,
					cc_mail: null
				},
				{
					id: 12,
					name: 'Send Downloaded CDR',
					title: 'send',
					content: '',
					subject: null,
					from_mail_id: null,
					cc_mail: null
				},
				// {
				// 	id: 4,
				// 	name: 'Notice of Download CDR Template',
				// 	title: 'download_cdr',
				// 	content: '',
				// 	subject: null,
				// 	from_mail_id: null,
				// 	cc_mail: null
				// },
				// {
				// 	id: 4,
				// 	name: 'Vendor Invoice Dispute Note Template',
				// 	title: 'vendor_invoice_dispute',
				// 	content: '',
				// 	subject: null,
				// 	from_mail_id: null,
				// 	cc_mail: null
				// },
				{
					id: 13,
					name: 'Trunk Interop Template',
					title: 'trunk_interop',
					content: '',
					subject: null,
					from_mail_id: null,
					cc_mail: null
				},
				{
					id: 14,
					name: 'Registration Confirmation Content',
					title: 'reg_confirm_content',
					content: '',
					subject: null,
					from_mail_id: null,
					cc_mail: null
				},
				{
					id: 15,
					name: 'Registration Letter',
					title: 'registration',
					content: '',
					subject: null,
					from_mail_id: null,
					cc_mail: null
				},
				{
					id: 16,
					name: 'Pending Trunk Suspension Notice',
					title: 'pending_trunk',
					content: '',
					subject: null,
					from_mail_id: null,
					cc_mail: null
				},
			],
			view_all_carriers: '',
			email: '1',
			email_options: []
		}
  },
	created () {
		this.getEmails()
		this.getMailTemplates()
	},
	methods: {
		...mapActions({
			setMessage: 'app_message/setAppMessage'
		}),
		getEmails () {
			const url = api.getEndpointUrl() + '/v1/config/mail_sender/list'
			this.$http.get(url)
			.then(response => {
				const body = response.body
				if (body.success) {
					this.email_options = body.payload.items.map((elem, index) => {
						return { id: index + 1, text: elem.email }
					})
				}
			})
			.catch(error => {
				console.log(error)
			})
		},
		getMailTemplateUrl () {
			const title = this.labels[this.activeTab].title
			return api.getEndpointUrl() + '/v1/config/mail_template/' + title
		},
		getMailTemplates () {
			const url = this.getMailTemplateUrl()
			this.$http.get(url)
			.then(response => {
				const body = response.body
				if (body.success) {
					const payload = body.payload
					const label = this.labels[this.activeTab]
					label.content = payload.html_content || ''
					label.subject = payload.subject
					label.from_mail_id = payload.from_mail_id
					label.cc_mail = payload.cc_mail
				}
			})
			.catch(error => {
				console.log(error)
			})
		},
		saveTemplateChanges () {
			const url = this.getMailTemplateUrl()
			const label = this.labels[this.activeTab]
			const reqBody = {
				html_content: label.content,
				subject: label.subject,
				title: label.title,
				cc_mail: label.cc_mail,
				from_mail_id: label.from_mail_id
			}
			console.log(reqBody)
			this.$http.patch(url, reqBody)
			.then(response => {
				const body = response.body
				if (body.success) {
					this.setMessage('Mail template was edited successfully')
				}
			})
			.catch(error => {
				console.log(error)
			})
		},
		activateTab (tab, index) {
			if (this.activeTab === index) { return }
			this.activeTab = index
			this.$nextTick(this.getMailTemplates)
		}
	}
}
</script>

<style>

	.label-default {
		background-color: #dce1e9;
		color: #4f5357;
		border-radius: 20px;
		padding: 7px 12px;
		box-shadow: 0px 2px 7px 0px rgba(184, 187, 196, 0.2);
	}


	.tabs.vertical.mail_template .select2-selection.select2-selection--single,
	.tabs.vertical.mail_template span.select2.select2-container.select2-container--default {
		width: 100% !important;
	}

	.button_set.absolute {
		width: 25%;
		position: absolute;
		padding-right: 20px;
		margin-top: 365px;
	}

	.button_set.absolute .btn.mini {
		width: 49%;
    	float: left;
    	margin-right: 2%;
	}

	.button_set.absolute a.btn.btn-default.mini {
		margin-right: 0;
	}

	.form-group.tags {
		margin-bottom: 0;
		margin-top: 5px;
	}

	@media (min-width: 768px) and (max-width: 1023px) {
		.vertical.mail_template a.tab,
		.vertical.mail_template a.tab.active:first-child {
			height: auto;
			line-height: 15px;
		}

		.button_set.absolute {
			margin-top: 385px;
		}
	}

	@media (max-width: 767px) {
		.button_set.absolute {
			width: 100%;
			position: relative;
			padding-right: 0;
			margin-top: 0;
		}
	}

	/* Landscape phones and down */
	@media (max-width: 480px) {

	}

	/* Portrait phone to landscape phone */
	@media (min-width: 319px) and (max-width: 479px) {

	}

</style>
