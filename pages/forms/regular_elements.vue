<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-child-width-1-2@l uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardBody>
							<h5 class="uk-heading-line">
								<span>Form Inputs</span>
							</h5>
							<form>
								<fieldset class="uk-fieldset">
									<legend class="uk-legend">
										Legend
									</legend>
									<div class="uk-margin">
										<ScInput v-model="inputA" placeholder="Input ..."></ScInput>
									</div>
									<div class="uk-margin">
										<ScTextarea v-model="textareaA" placeholder="Textarea ..."></ScTextarea>
									</div>
									<div class="uk-margin">
										<ScTextarea v-model="textareaB" placeholder="Autosize textarea ..." :autosize="true" :rows="3"></ScTextarea>
									</div>
									<div class="uk-margin">
										<ScTextarea v-model="textareaF" placeholder="Autosize textarea ..." :autosize="true" :rows="3"></ScTextarea>
										<a class="sc-button sc-button-small uk-margin-small-top" href="javascript:void(0)" @click.prevent="updateTextarea()">
											Update Content
										</a>
									</div>
									<div class="uk-margin">
										<select class="uk-select">
											<option>Option 01</option>
											<option>Option 02</option>
										</select>
									</div>
									<hr>
									<div class="uk-child-width-expand@xl uk-grid-divider uk-grid" data-uk-grid>
										<div>
											<p class="uk-margin-small-bottom">
												Radio boxes (CSS)
											</p>
											<div class="uk-grid-small uk-child-width-auto uk-grid" data-uk-grid>
												<label><input class="uk-radio" type="radio" name="radio2">A</label>
												<label><input class="uk-radio" type="radio" name="radio2" checked>B</label>
												<label><input class="uk-radio" type="radio" name="radio2c" disabled>C</label>
												<label>
													<input class="uk-radio"
														type="radio"
														name="radio2d"
														checked
														disabled
													>D
												</label>
											</div>
										</div>
										<div>
											<p class="uk-margin-small-bottom">
												Checkboxes (CSS)
											</p>
											<div class="uk-grid-small uk-child-width-auto uk-grid" data-uk-grid>
												<label><input class="uk-checkbox" type="checkbox" checked>A</label>
												<label><input class="uk-checkbox" type="checkbox">B</label>
												<label><input class="uk-checkbox" type="checkbox" disabled>C</label>
												<label><input class="uk-checkbox" type="checkbox" checked disabled>D</label>
											</div>
										</div>
										<div>
											<p class="uk-margin-mini-bottom">
												Switch (CSS)
											</p>
											<div>
												<input id="switch-css" type="checkbox" class="sc-switch-input">
												<label for="switch-css" class="sc-switch-label">
													Switch
													<span class="sc-switch-toggle-on">
														On
													</span>
													<span class="sc-switch-toggle-off">
														Off
													</span>
												</label>
											</div>
										</div>
									</div>
								</fieldset>
							</form>
						</ScCardBody>
					</ScCard>
					<ScCard class="uk-margin-top">
						<ScCardBody>
							<h5 class="uk-heading-line">
								<span>Outlined Form Inputs</span>
							</h5>
							<div class="uk-child-width-1-2@s uk-grid" data-uk-grid>
								<div>
									<ScInput v-model="inputB" mode="outline">
										<label>Label</label>
									</ScInput>
								</div>
								<div>
									<ScTextarea v-model="textareaC" :rows="5" mode="outline">
										<label>Label</label>
									</ScTextarea>
								</div>
								<div>
									<ScInput v-model="inputC" placeholder="Input ..." mode="outline"></ScInput>
								</div>
								<div>
									<ScTextarea v-model="textareaD" placeholder="Textarea ..." mode="outline" :rows="5"></ScTextarea>
								</div>
								<div>
									<ScInput v-model="inputD" placeholder="Input ..." :error-state="true" mode="outline">
										<label>Label</label>
									</ScInput>
								</div>
								<div>
									<ScInput v-model="inputE" placeholder="Input ..." :success-state="true" mode="outline">
										<label>Label</label>
									</ScInput>
								</div>
							</div>
						</ScCardBody>
					</ScCard>
					<ScCard class="uk-margin-top">
						<ScCardBody>
							<h5 class="uk-heading-line">
								<span>Help text</span>
							</h5>
							<form>
								<div class="uk-margin">
									<ScInput v-model="inputF" extra-classes="uk-form-width-medium">
										<label>Label</label>
										<span slot="help-inline" class="uk-form-help-inline uk-visible@l">
											The <code>.uk-form-help-inline</code> class creates spacing to the left.
										</span>
									</ScInput>
									<span class="uk-form-help-block uk-hidden@l">
										The <code>.uk-form-help-inline</code> class creates spacing to the left.
									</span>
								</div>
								<div class="uk-margin-top">
									<ScTextarea
										v-model="textareaE"
										placeholder="Textarea"
										:rows="5"
										:cols="30"
										extra-classes="uk-form-width-large"
									></ScTextarea>
									<p class="uk-form-help-block">
										The <code>.uk-form-help-block</code> class creates an associated paragraph.
									</p>
								</div>
							</form>
						</ScCardBody>
					</ScCard>
					<ScCard class="uk-margin-top">
						<ScCardBody>
							<h5 class="uk-heading-line">
								<span>Icons</span>
							</h5>
							<div class="uk-child-width-1-2@s uk-flex uk-flex-bottom uk-grid" data-uk-grid>
								<div>
									<ScInput v-model="inputG" :error-state="true" placeholder="form-danger">
										<span slot="icon" class="uk-form-icon uk-form-icon-flip mdi mdi-alert-circle"></span>
									</ScInput>
								</div>
								<div>
									<ScInput v-model="inputH" :success-state="true">
										<label>form-success</label>
										<span slot="icon" class="uk-form-icon uk-form-icon-flip mdi mdi-thumb-up sc-form-icon"></span>
									</ScInput>
								</div>
								<div>
									<ScInput v-model="inputI">
										<span slot="icon" class="uk-form-icon" data-uk-icon="icon: user"></span>
									</ScInput>
								</div>
								<div>
									<ScInput v-model="inputJ">
										<span slot="icon" class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: lock"></span>
									</ScInput>
								</div>
								<div>
									<ScInput v-model="inputK">
										<label>Clickable icon</label>
										<a slot="icon" class="uk-form-icon" href="javascript:void(0)" data-uk-icon="icon: pencil"></a>
									</ScInput>
								</div>
								<div>
									<ScInput v-model="inputL" placeholder="clickable">
										<a slot="icon" class="uk-form-icon uk-form-icon-flip" href="javascript:void(0)" data-uk-icon="icon: link"></a>
									</ScInput>
								</div>
							</div>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardBody>
							<h5 class="uk-heading-line">
								<span>States modifiers</span>
							</h5>
							<div class="uk-child-width-1-2@s uk-child-width-1-3@m uk-grid" data-uk-grid>
								<div>
									<ScInput v-model="inputM" :error-state="true" placeholder="danger state"></ScInput>
								</div>
								<div>
									<ScInput v-model="inputN" :success-state="true" placeholder="success state"></ScInput>
								</div>
								<div>
									<ScInput v-model="inputO" placeholder="disabled" :disabled="true"></ScInput>
								</div>
								<div>
									<select disabled class="uk-select" data-sc-input>
										<option>select disabled</option>
										<option>Option 02</option>
									</select>
								</div>
							</div>
						</ScCardBody>
					</ScCard>
					<ScCard class="uk-margin-top">
						<ScCardBody>
							<h5 class="uk-heading-line">
								<span>Size modifiers</span>
							</h5>
							<div class="uk-margin">
								<ScInput v-model="inputP" extra-classes="uk-form-large">
									<label class="uk-label-large">
										form-large
									</label>
								</ScInput>
							</div>
							<div class="uk-margin">
								<ScInput v-model="inputQ">
									<label>default</label>
								</ScInput>
							</div>
							<div class="uk-margin">
								<ScInput v-model="inputR" extra-classes="uk-form-small">
									<label class="uk-label-small">
										form-small
									</label>
								</ScInput>
							</div>
							<h5 class="uk-heading-line uk-margin-large-top">
								<span>Width modifiers</span>
							</h5>
							<div class="uk-margin">
								<form class="uk-margin-medium-top">
									<div class="uk-margin-small">
										<ScInput v-model="inputS" placeholder="uk-width-1-1" extra-classes="uk-width-1-1"></ScInput>
									</div>
									<div class="uk-margin-small">
										<ScInput v-model="inputT" placeholder="large" extra-classes="uk-form-width-large"></ScInput>
									</div>
									<div class="uk-margin-small">
										<ScInput v-model="inputU" placeholder="medium" extra-classes="uk-form-width-medium"></ScInput>
									</div>
									<div class="uk-margin-small">
										<ScInput v-model="inputW" placeholder="small" extra-classes="uk-form-width-small"></ScInput>
									</div>
									<div class="uk-margin-small">
										<ScInput v-model="inputX" placeholder="xsmall" extra-classes="uk-form-width-xsmall"></ScInput>
									</div>
								</form>
							</div>
							<h5 class="uk-heading-line uk-margin-large-top">
								<span>Form and grid</span>
							</h5>
							<div class="uk-margin">
								<form class="uk-grid-small uk-grid" data-uk-grid>
									<div class="uk-width-1-1">
										<ScInput v-model="inputY" placeholder="50%"></ScInput>
									</div>
									<div class="uk-width-1-2@s">
										<ScInput v-model="inputZ" placeholder="50%"></ScInput>
									</div>
									<div class="uk-width-1-4@s">
										<ScInput v-model="inputAA" placeholder="25%"></ScInput>
									</div>
									<div class="uk-width-1-4@s">
										<ScInput v-model="inputAB" placeholder="25%"></ScInput>
									</div>
									<div class="uk-width-1-2@s">
										<ScInput v-model="inputAC" placeholder="50%"></ScInput>
									</div>
									<div class="uk-width-1-2@s">
										<ScInput v-model="inputAD" placeholder="50%"></ScInput>
									</div>
								</form>
							</div>
						</ScCardBody>
					</ScCard>
					<ScCard class="uk-margin-top">
						<ScCardBody>
							<h5 class="uk-heading-line">
								<span>Horizontal form</span>
							</h5>
							<form class="uk-form-horizontal">
								<div class="uk-margin">
									<label class="uk-form-label" for="form-h-text">
										Text
									</label>
									<div class="uk-form-controls">
										<ScInput id="form-h-text" v-model="inputAE" placeholder="Some text..."></ScInput>
									</div>
								</div>
								<div class="uk-margin">
									<label class="uk-form-label" for="form-h-select">
										Select
									</label>
									<div class="uk-form-controls">
										<select id="form-h-select" class="uk-select" data-sc-input>
											<option>Option 01</option>
											<option>Option 02</option>
										</select>
									</div>
								</div>
							</form>
						</ScCardBody>
					</ScCard>
					<ScCard class="uk-margin-top">
						<ScCardBody>
							<h5 class="uk-heading-line">
								<span>Custom select</span>
							</h5>
							<div class="uk-child-width-1-auto@m uk-grid uk-flex-middle" data-uk-grid>
								<div>
									<div data-uk-form-custom="target: true">
										<select>
											<option value="1">
												Option 01
											</option>
											<option value="2">
												Option 02
											</option>
											<option value="3">
												Option 03
											</option>
											<option value="4">
												Option 04
											</option>
										</select>
										<span></span>
									</div>
								</div>
								<div>
									<div data-uk-form-custom="target: > * > span:last-child">
										<select>
											<option value="1">
												Option 01
											</option>
											<option value="2">
												Option 02
											</option>
											<option value="3">
												Option 03
											</option>
											<option value="4">
												Option 04
											</option>
										</select>
										<span class="uk-link">
											<span data-uk-icon="icon: pencil"></span>
											<span></span>
										</span>
									</div>
								</div>
								<div>
									<div data-uk-form-custom="target: > * > span:first-child">
										<select>
											<option value="">
												Please select...
											</option>
											<option value="1">
												Option 01
											</option>
											<option value="2">
												Option 02
											</option>
											<option value="3">
												Option 03
											</option>
											<option value="4">
												Option 04
											</option>
										</select>
										<button class="sc-button sc-button-default sc-button-outline" type="button">
											<span></span>
											<span data-uk-icon="icon: chevron-down"></span>
										</button>
									</div>
								</div>
								<div>
									<div data-uk-form-custom="target: > * > span:first-child">
										<select>
											<option value="">
												Select user...
											</option>
											<option value="1">
												User 01
											</option>
											<option value="2">
												User 02
											</option>
											<option value="3">
												User 03
											</option>
											<option value="4">
												User 04
											</option>
										</select>
										<button class="sc-button sc-button-default sc-button-outline sc-button-flex sc-button-icon" type="button">
											<span class="uk-margin-small-left uk-margin-small-right"></span>
											<span class="mdi mdi-account-badge-outline uk-flex-first"></span>
											<span data-uk-icon="icon: chevron-down"></span>
										</button>
									</div>
								</div>
							</div>
						</ScCardBody>
					</ScCard>
					<ScCard class="uk-margin-top">
						<ScCardBody>
							<h5 class="uk-heading-line">
								<span>Custom controls</span>
							</h5>
							<div class="uk-child-width-auto@m uk-grid" data-uk-grid>
								<div>
									<div data-uk-form-custom>
										<input type="file">
										<button class="uk-button uk-button-default" type="button" tabindex="-1">
											Select
										</button>
									</div>
								</div>
								<div>
									<span class="uk-text-middle">Here is a text</span>
									<div data-uk-form-custom>
										<input type="file">
										<span class="uk-link">upload</span>
									</div>
								</div>
								<div>
									<div data-uk-form-custom="target: true">
										<input type="file">
										<input class="uk-visible@s uk-input uk-form-width-medium" type="text" placeholder="Select file" disabled>
										<input class="uk-hidden@s uk-input uk-form-width-small" type="text" placeholder="Select file" disabled>
									</div>
									<button class="uk-button uk-button-default">
										Submit
									</button>
								</div>
							</div>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { scFakeData } from "~/assets/js/utils";
import ScInput from '~/components/Input'
import ScTextarea from '~/components/Textarea'

const { sentence } = scFakeData;

export default {
	name: 'FormsRegularElements',
	components: {
		ScInput,
		ScTextarea
	},
	data: () => ({
		'inputA': '',
		'inputB': '',
		'inputC': '',
		'inputD': '',
		'inputE': '',
		'inputF': '',
		'inputG': '',
		'inputH': '',
		'inputI': '',
		'inputJ': '',
		'inputK': '',
		'inputL': '',
		'inputM': '',
		'inputN': '',
		'inputO': '',
		'inputP': '',
		'inputQ': '',
		'inputR': '',
		'inputS': '',
		'inputT': '',
		'inputU': '',
		'inputW': '',
		'inputX': '',
		'inputY': '',
		'inputZ': '',
		'inputAA': '',
		'inputAB': '',
		'inputAC': '',
		'inputAD': '',
		'inputAE': '',
		'textareaA': '',
		'textareaB': '',
		'textareaC': '',
		'textareaD': '',
		'textareaE': '',
		'textareaF': ''
	}),
	methods: {
		updateTextarea () {
			this.textareaF = sentence({ words: Math.floor((Math.random() * 220) + 100) });
		}
	}
}
</script>
