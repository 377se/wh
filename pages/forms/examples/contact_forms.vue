<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-child-width-1-2@m" data-uk-grid>
				<div>
					<ScCard>
						<ScCardHeader separator>
							<div class="uk-flex uk-flex-middle">
								<i class="mdi mdi-message-outline uk-margin-medium-right sc-icon-24"></i>
								<ScCardTitle>
									Contact Us
								</ScCardTitle>
							</div>
							<ScCardMeta class="uk-text-medium">
								We will respond as soon as possible, generally within a few hours.
							</ScCardMeta>
						</ScCardHeader>
						<ScCardBody>
							<form class="uk-form-stacked ">
								<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
									<div>
										<ScInput v-model="userData.form1.name">
											<label>Name</label>
										</ScInput>
									</div>
									<div>
										<ScInput v-model="userData.form1.email" :error-state="true">
											<label>Email</label>
										</ScInput>
										<span class="sc-form-error-block">
											This field is required.
										</span>
									</div>
								</div>
								<div class="uk-margin">
									<ScInput v-model="userData.form1.subject">
										<label>Subject</label>
									</ScInput>
								</div>
								<div class="uk-margin">
									<ScTextarea v-model="userData.form1.message" :cols="30" :rows="6">
										<label>Message</label>
									</ScTextarea>
								</div>
								<div class="uk-margin-medium-top">
									<button class="sc-button sc-button-primary">
										Send message
									</button>
								</div>
							</form>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardHeader class="sc-padding">
							<div class="sc-padding-medium sc-round uk-flex uk-flex-middle sc-border md-bg-grey-100">
								<i class="mdi mdi-message-outline uk-margin-medium-right sc-icon-24"></i>
								<ScCardTitle>
									Contact Us
								</ScCardTitle>
							</div>
						</ScCardHeader>
						<ScCardBody>
							<form class="uk-form-horizontal">
								<div class="sc-padding-small">
									<label class="uk-form-label" for="f-h-name">
										Name<sup>*</sup>
									</label>
									<div class="uk-form-controls">
										<ScInput id="f-h-name" v-model="userData.form2.name" mode="outline"></ScInput>
									</div>
								</div>
								<div class="uk-margin-medium-top sc-padding-small">
									<label class="uk-form-label" for="f-h-email">
										Email<sup>*</sup>
									</label>
									<div class="uk-form-controls">
										<ScInput id="f-h-email" v-model="userData.form2.email" mode="outline"></ScInput>
									</div>
								</div>
								<div class="uk-margin-medium-top sc-padding-small">
									<label class="uk-form-label" for="f-h-subject">
										Subject
									</label>
									<div class="uk-form-controls">
										<ScInput id="f-h-subject" v-model="userData.form2.subject" mode="outline"></ScInput>
									</div>
								</div>
								<div class="uk-margin-medium-top sc-padding-small">
									<label class="uk-form-label" for="f-h-message">
										Message
									</label>
									<div class="uk-form-controls">
										<ScTextarea id="f-h-message"
											v-model="userData.form2.message"
											:cols="30"
											:rows="6"
											mode="outline"
										></ScTextarea>
									</div>
								</div>
								<div class="uk-margin-medium-top sc-padding-small">
									<div class="uk-form-controls">
										<button class="sc-button sc-button-primary">
											Send message
										</button>
									</div>
								</div>
							</form>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ScInput from '~/components/Input'
import ScTextarea from '~/components/Textarea'

export default {
	name: 'FormsExamplesContact',
	components: {
		ScInput,
		ScTextarea
	},
	data: () => ({
		userData: {
			form1: {
				name: '',
				email: '',
				subject: '',
				message: ''
			},
			form2: {
				name: '',
				email: '',
				subject: '',
				message: ''
			}
		}
	})
}
</script>



