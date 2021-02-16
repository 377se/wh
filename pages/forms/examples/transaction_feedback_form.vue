<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-flex-center uk-grid" data-uk-grid>
				<div class="uk-width-2-3@l">
					<ScCard>
						<ScCardHeader class="uk-margin-medium-bottom md-bg-indigo-800">
							<div class="uk-light uk-flex uk-flex-middle">
								<ScCardTitle class="uk-flex-1">
									Transaction Feedback
								</ScCardTitle>
								<i class="mdi mdi-message-bulleted sc-icon-24 uk-margin-left md-color-white"></i>
							</div>
						</ScCardHeader>
						<ScCardBody>
							<form action="">
								<h3 class="uk-margin-medium">
									Galaxy S7 edge<span class="sc-sub-heading">
										128GB storage, microSD card slot
									</span>
								</h3>
								<p class="uk-text-medium uk-margin-remove uk-margin-small-top">
									<span class="uk-text-muted">
										Order Number:
									</span> 113485625
								</p>
								<p class="uk-text-medium uk-margin-remove">
									<span class="uk-text-muted">
										Order Completion Time:
									</span> 15 Jun 2018
								</p>
								<hr class="uk-divider-icon uk-margin">
								<div>
									<p class="uk-text-medium uk-margin-small sc-color-secondary">
										Rate this transaction
									</p>
									<client-only>
										<StarRating v-model="userData.scoreMain"
											class="raty-large"
											:settings="{ cancel: true }"
										></StarRating>
									</client-only>
								</div>
								<div class="uk-margin-medium-top uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label class="uk-form-label raty-align uk-text-medium">
											How accurate was the product description?
										</label>
									</div>
									<div class="uk-width-1-2@m">
										<client-only>
											<StarRating v-model="userData.scoreDescription"></StarRating>
										</client-only>
									</div>
								</div>
								<div class="uk-margin-small-top uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label class="uk-form-label raty-align uk-text-medium">
											How satisfied were you with the seller's communications?
										</label>
									</div>
									<div class="uk-width-1-2@m">
										<client-only>
											<StarRating v-model="userData.scoreCommunications"></StarRating>
										</client-only>
									</div>
								</div>
								<div class="uk-margin-small-top uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label class="uk-form-label raty-align uk-text-medium">
											How quickly did the seller ship the item?
										</label>
									</div>
									<div class="uk-width-1-2@m">
										<client-only>
											<StarRating v-model="userData.scoreShipment"></StarRating>
										</client-only>
									</div>
								</div>
								<div class="uk-margin-top">
									<ScTextarea
										v-model="userData.feedback"
										:cols="30"
										:rows="6"
										:autosize="true"
										mode="outline"
									>
										<label>
											Please tell us more about this transaction
										</label>
									</ScTextarea>
								</div>
								<div class="uk-margin-large-top">
									<button class="sc-button sc-button-primary" type="button">
										Leave Feedback
									</button>
								</div>
							</form>
							<pre class="uk-margin-top">{{ userData | json }}</pre>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ScTextarea from '~/components/Textarea'

export default {
	name: 'FormsExamplesTransactionFeedback',
	components: {
		ScTextarea,
		StarRating: process.client ? () => import('~/components/Raty') : null
	},
	data: () => ({
		userData: {
			scoreMain: 0,
			scoreDescription: 0,
			scoreCommunications: 0,
			scoreShipment: 0,
			feedback: ''
		}
	})
}
</script>
