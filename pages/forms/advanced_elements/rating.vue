<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
					<div class="uk-child-width-1-3@m uk-grid-divider uk-grid" data-uk-grid>
						<div>
							<client-only>
								<StarRating v-model="ratyAScore"></StarRating>
							</client-only>
							<span class="uk-form-help-block">
								Default
							</span>
						</div>
						<div>
							<client-only>
								<StarRating v-model="ratyBScore" class="raty-small" :settings="{ cancel: true }"></StarRating>
							</client-only>
							<span class="uk-form-help-block">
								small
							</span>
						</div>
						<div>
							<client-only>
								<StarRating v-model="ratyCScore" class="raty-large" :settings="{ cancel: true }"></StarRating>
							</client-only>
							<span class="uk-form-help-block">
								Large
							</span>
						</div>
					</div>
					<hr>
					<div class="uk-child-width-1-3@m uk-grid-divider uk-grid" data-uk-grid>
						<div>
							<client-only>
								<StarRating v-model="ratyDScore" :settings="{ half: true }"></StarRating>
							</client-only>
							<span class="uk-form-help-block">
								Half Star
							</span>
						</div>
						<div>
							<client-only>
								<StarRating v-model="ratyEScore" :settings="{ cancel: true }"></StarRating>
							</client-only>
							<span class="uk-form-help-block">
								Cancel Button
							</span>
						</div>
						<div>
							<client-only>
								<StarRating v-model="ratyFScore"></StarRating>
							</client-only>
							<span class="uk-form-help-block">
								Saved Score
							</span>
						</div>
					</div>
					<hr>
					<div class="uk-grid-divider uk-grid" data-uk-grid>
						<div class="uk-width-1-3@m">
							<client-only>
								<StarRating v-model="ratyGScore" :settings="{ readOnly: true }"></StarRating>
							</client-only>
							<span class="uk-form-help-block">
								Read Only
							</span>
						</div>
						<div class="uk-width-2-3@m">
							<client-only>
								<StarRating v-model="ratyHScore" :settings="{ number: 10 }"></StarRating>
							</client-only>
							<span class="uk-form-help-block">
								10 Stars
							</span>
						</div>
					</div>
					<hr>
					<div class="uk-child-width-1-3@m uk-grid-divider uk-grid" data-uk-grid>
						<div>
							<client-only>
								<StarRating ref="apiMethods" v-model="ratyApi.model" :api-methods="ratyApi.methods"></StarRating>
							</client-only>
							<span class="uk-form-help-block">
								Api Methods
							</span>
						</div>
						<div>
							<div class="uk-child-width-auto@l uk-grid-small uk-grid" data-uk-grid>
								<div>
									<button class="sc-button sc-button-small" @click="ratySetScore(4)">
										Change to 4
									</button>
								</div>
								<div>
									<button class="sc-button sc-button-small" @click="ratyCancel()">
										Cancel
									</button>
								</div>
								<div>
									<button class="sc-button sc-button-small" @click="ratyReadOnlyToggle()">
										Toggle readOnly
									</button>
								</div>
							</div>
							<div class="uk-margin-small-top">
								<span class="uk-text-muted">Rating:</span> {{ ratyApi.model }};
								<span class="uk-text-muted">ReadOnly:</span> {{ ratyApi.readOnly }}
							</div>
						</div>
					</div>
				</ScCardBody>
			</ScCard>
		</div>
	</div>
</template>

<script>
export default {
	name: 'FormsAdvancedElementsRating',
	components: {
		StarRating: process.client ? () => import('~/components/Raty') : null
	},
	data: () => ({
		ratyAScore: 0,
		ratyBScore: 0,
		ratyCScore: 0,
		ratyDScore: 0,
		ratyEScore: 2,
		ratyFScore: 4,
		ratyGScore: 0,
		ratyHScore: 0,
		ratyApi: {
			model: 2,
			readOnly: false
		}
	}),
	methods: {
		ratyCancel () {
			this.$refs.apiMethods.apiCancel();
			this.ratyApi.model = 0;
		},
		ratyReadOnlyToggle () {
			this.$refs.apiMethods.apiReadOnly(!this.ratyApi.readOnly);
			this.ratyApi.readOnly = !this.ratyApi.readOnly;
		},
		ratySetScore (value) {
			this.$refs.apiMethods.apiScore(value);
			this.ratyApi.model = value;
		}
	}
}
</script>
