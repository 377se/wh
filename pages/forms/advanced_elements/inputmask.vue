<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<ScCard>
				<ScCardTitle>
					Inputmasks
				</ScCardTitle>
				<ScCardBody>
					<form>
						<div class="uk-margin-small">
							<div class="uk-width-1-3@m">
								<ScInput v-model="maskInputA" v-input-mask="{ 'alias': 'datetime', 'inputFormat' : 'dd/mm/yyyy' }"></ScInput>
							</div>
							<div class="uk-overflow-auto">
								<p class="uk-form-help-block">
									<code>'alias': 'datetime', 'inputFormat' : 'dd/mm/yyyy'</code>
								</p>
							</div>
						</div>
						<div class="uk-margin-small">
							<div class="uk-width-1-3@m">
								<ScInput v-model="maskInputB" v-input-mask="{ 'mask': '9', 'repeat': 10, 'greedy' : false }"></ScInput>
							</div>
							<div class="uk-overflow-auto">
								<p class="uk-form-help-block">
									<code>'mask': '9', 'repeat': 10, 'greedy' : false</code>
								</p>
							</div>
						</div>
						<div class="uk-margin-small">
							<div class="uk-width-1-3@m">
								<ScInput v-model="maskInputC" v-input-mask="{ 'mask': '99-9999999' }"></ScInput>
							</div>
							<div class="uk-overflow-auto">
								<p class="uk-form-help-block">
									<code>'mask': '99-9999999'</code>
								</p>
							</div>
						</div>
						<div class="uk-margin-small">
							<div class="uk-width-1-3@m">
								<ScInput v-model="maskInputD" v-input-mask="{ 'alias': 'numeric', 'groupSeparator': ',', 'autoGroup': true, 'digits': 2, 'digitsOptional': false, 'prefix': '$ ', 'placeholder': '0' }"></ScInput>
							</div>
							<div class="uk-overflow-auto">
								<p class="uk-form-help-block">
									<code>'alias': 'numeric', 'groupSeparator': ',', 'autoGroup': true, 'digits': 2, 'digitsOptional': false, 'prefix': '$ ', 'placeholder': '0'</code>
								</p>
							</div>
						</div>
						<div class="uk-margin-small">
							<div class="uk-width-1-3@m">
								<ScInput v-model="maskInputE" v-input-mask="{ 'alias': 'email' }"></ScInput>
							</div>
							<p class="uk-form-help-block">
								<code>'alias': 'email'</code>
							</p>
						</div>
						<div class="uk-margin-small">
							<div class="uk-width-1-3@m">
								<ScInput v-model="maskInputF" v-input-mask="{ 'alias': 'ip' }"></ScInput>
							</div>
							<p class="uk-form-help-block">
								<code>'alias': 'ip'</code>
							</p>
						</div>
					</form>
				</ScCardBody>
			</ScCard>
		</div>
	</div>
</template>

<script>
import ScInput from '~/components/Input'

if(process.client) {
	require('~/plugins/inputmask');
}

export default {
	name: 'FormsAdvancedElementsInputMask',
	components: {
		ScInput
	},
	data: () => ({
		maskInputA: '',
		maskInputB: '',
		maskInputC: '',
		maskInputD: '',
		maskInputE: '',
		maskInputF: ''
	}),
}
</script>
