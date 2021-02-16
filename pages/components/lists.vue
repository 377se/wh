<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
					<div class="uk-child-width-1-3@l uk-child-width-1-2@m uk-grid-divider uk-grid" data-uk-grid>
						<div>
							<ul class="uk-list" data-uk-sortable>
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<ScAvatar :avatar-id="5"></ScAvatar>
									</div>
									<div class="sc-list-body uk-overflow-hidden">
										<div class="uk-flex uk-flex-middle">
											<div class="uk-flex-1 uk-text-truncate">
												<p class="uk-margin-remove sc-text-semibold">
													{{ fakeUser[0] }}
												</p>
												<span class="sc-list-secondary-text">
													Lorem ipsum dolor sit.
												</span>
											</div>
											<div>
												<PrettyCheck class="p-icon">
													<i slot="extra" class="icon mdi mdi-check"></i>
												</PrettyCheck>
											</div>
										</div>
									</div>
								</li>
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<ScAvatar :avatar-id="2"></ScAvatar>
									</div>
									<div class="sc-list-body uk-overflow-hidden">
										<p class="uk-margin-remove sc-text-semibold uk-text-truncate">
											{{ fakeUser[1] }}
										</p>
										<span class="sc-list-secondary-text">
											Lorem ipsum dolor sit.
										</span>
									</div>
								</li>
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<ScAvatar :avatar-id="4"></ScAvatar>
									</div>
									<div class="sc-list-body uk-overflow-hidden">
										<p class="uk-margin-remove sc-text-semibold uk-text-truncate">
											{{ fakeUser[2] }}
										</p>
										<span class="sc-list-secondary-text">
											Lorem ipsum dolor sit.
										</span>
									</div>
								</li>
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<ScAvatar :avatar-id="1"></ScAvatar>
									</div>
									<div class="sc-list-body uk-overflow-hidden">
										<div class="uk-flex uk-flex-middle">
											<div class="uk-flex-1 uk-text-truncate">
												<p class="uk-margin-remove sc-text-semibold">
													{{ fakeUser[3] }}
												</p>
												<span class="sc-list-secondary-text">
													Lorem ipsum dolor sit.
												</span>
											</div>
											<div>
												<PrettyCheck class="p-icon">
													<i slot="extra" class="icon mdi mdi-check"></i>
												</PrettyCheck>
											</div>
										</div>
									</div>
								</li>
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<ScAvatar :avatar-id="8"></ScAvatar>
									</div>
									<div class="sc-list-body uk-overflow-hidden">
										<p class="uk-margin-remove sc-text-semibold uk-text-truncate">
											{{ fakeUser[4] }}
										</p>
										<span class="sc-list-secondary-text">
											Lorem ipsum dolor sit.
										</span>
									</div>
								</li>
							</ul>
						</div>
						<div>
							<ul class="uk-list uk-list-divider">
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<ScAvatar :avatar-id="5"></ScAvatar>
									</div>
									<div class="sc-list-body">
										<div class="uk-flex uk-flex-middle">
											<div class="uk-flex-1 uk-text-truncate">
												<p class="uk-margin-remove sc-text-semibold uk-text-truncate">
													{{ fakeUser[0] }}
												</p>
												<span class="sc-list-secondary-text">
													Lorem ipsum dolor sit.
												</span>
											</div>
											<div>
												<span class="uk-label uk-label-danger">
													Label
												</span>
											</div>
										</div>
									</div>
								</li>
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<ScAvatar :avatar-id="2"></ScAvatar>
									</div>
									<div class="sc-list-body">
										<p class="uk-margin-remove sc-text-semibold uk-text-truncate">
											{{ fakeUser[1] }}
										</p>
										<span class="sc-list-secondary-text">
											Lorem ipsum dolor sit.
										</span>
									</div>
								</li>
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<ScAvatar :avatar-id="1"></ScAvatar>
									</div>
									<div class="sc-list-body">
										<div class="uk-flex uk-flex-middle">
											<div class="uk-flex-1 uk-text-truncate">
												<p class="uk-margin-remove sc-text-semibold uk-text-truncate">
													{{ fakeUser[2] }}
												</p>
												<span class="sc-list-secondary-text">
													Lorem ipsum dolor sit.
												</span>
											</div>
											<div>
												<span class="uk-label">
													Label
												</span>
											</div>
										</div>
									</div>
								</li>
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<ScAvatar :avatar-id="4"></ScAvatar>
									</div>
									<div class="sc-list-body">
										<p class="uk-margin-remove sc-text-semibold">
											{{ fakeUser[3] }}
										</p>
										<span class="sc-list-secondary-text uk-text-truncate">
											Lorem ipsum dolor sit.
										</span>
									</div>
								</li>
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<ScAvatar :avatar-id="8"></ScAvatar>
									</div>
									<div class="sc-list-body">
										<p class="uk-margin-remove sc-text-semibold">
											{{ fakeUser[4] }}
										</p>
										<span class="sc-list-secondary-text uk-text-truncate">
											Lorem ipsum dolor sit.
										</span>
									</div>
								</li>
							</ul>
						</div>
						<div>
							<ul class="uk-list">
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<i class="mdi mdi-wifi"></i>
									</div>
									<div class="sc-list-body">
										<div class="uk-flex uk-flex-middle">
											<div class="uk-flex-1">
												<label class="uk-text-large" @click="settings.wifi = !settings.wifi">
													WI-FI
												</label>
											</div>
											<div class="sc-flex-no-shrink uk-flex">
												<PrettyCheck v-model="settings.wifi" class="p-switch"></PrettyCheck>
											</div>
										</div>
									</div>
								</li>
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<i class="mdi mdi-bluetooth"></i>
									</div>
									<div class="sc-list-body">
										<div class="uk-flex uk-flex-middle">
											<div class="uk-flex-1">
												<label class="uk-text-large" @click="settings.bt = !settings.bt">
													Bluetooth
												</label>
											</div>
											<div class="sc-flex-no-shrink uk-flex">
												<PrettyCheck v-model="settings.bt" class="p-switch"></PrettyCheck>
											</div>
										</div>
									</div>
								</li>
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<i class="mdi mdi-nfc-variant"></i>
									</div>
									<div class="sc-list-body">
										<div class="uk-flex uk-flex-middle">
											<div class="uk-flex-1">
												<label class="uk-text-large" @click="settings.nfc = !settings.nfc">
													NFC
												</label>
											</div>
											<div class="sc-flex-no-shrink uk-flex">
												<PrettyCheck v-model="settings.nfc" class="p-switch"></PrettyCheck>
											</div>
										</div>
									</div>
								</li>
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<i class="mdi mdi-airplane"></i>
									</div>
									<div class="sc-list-body">
										<div class="uk-flex uk-flex-middle">
											<div class="uk-flex-1">
												<label class="uk-text-large uk-text-wrap" @click="settings.airplane = !settings.airplane">
													Airplane Mode
												</label>
											</div>
											<div class="sc-flex-no-shrink uk-flex">
												<PrettyCheck v-model="settings.airplane" class="p-switch"></PrettyCheck>
											</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<hr>
					<div class="uk-child-width-1-3@l uk-child-width-1-2@m uk-grid-divider uk-grid" data-uk-grid>
						<div>
							<ul class="uk-list uk-list-divider">
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<PrettyCheck v-model="checkboxes.cb1" class="p-icon">
											<i slot="extra" class="icon mdi mdi-check"></i>
										</PrettyCheck>
									</div>
									<div class="sc-list-body">
										<label class="uk-text-truncate" @click="checkboxes.cb1 = !checkboxes.cb1">
											Lorem ipsum dolor sit amet, consectetur.
										</label>
									</div>
								</li>
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<PrettyCheck v-model="checkboxes.cb2" class="p-icon">
											<i slot="extra" class="icon mdi mdi-check"></i>
										</PrettyCheck>
									</div>
									<div class="sc-list-body">
										<label class="uk-text-truncate" @click="checkboxes.cb2 = !checkboxes.cb2">
											Lorem ipsum dolor sit amet, consectetur adipisicing elit.
										</label>
									</div>
								</li>
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<PrettyCheck v-model="checkboxes.cb3" class="p-icon">
											<i slot="extra" class="icon mdi mdi-check"></i>
										</PrettyCheck>
									</div>
									<div class="sc-list-body">
										<label class="uk-text-wrap" @click="checkboxes.cb3 = !checkboxes.cb3">
											Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, optio?
										</label>
									</div>
								</li>
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<PrettyCheck v-model="checkboxes.cb4" class="p-icon">
											<i slot="extra" class="icon mdi mdi-check"></i>
										</PrettyCheck>
									</div>
									<div class="sc-list-body">
										<label class="uk-text-wrap" @click="checkboxes.cb4 = !checkboxes.cb4">
											Lorem ipsum dolor sit amet, consectetur adipisicing.
										</label>
									</div>
								</li>
							</ul>
						</div>
						<div>
							<ul class="uk-list uk-list-divider">
								<li class="sc-list-group">
									<div class="sc-list-body">
										<label class="uk-text-truncate" @click="checkboxes.cb5 = !checkboxes.cb5">
											Lorem ipsum dolor sit amet, consectetur.
										</label>
									</div>
									<div class="sc-list-addon">
										<PrettyCheck v-model="checkboxes.cb5" class="p-switch" color="danger"></PrettyCheck>
									</div>
								</li>
								<li class="sc-list-group">
									<div class="sc-list-body">
										<label class="uk-text-truncate" @click="checkboxes.cb6 = !checkboxes.cb6">
											Lorem ipsum dolor sit.
										</label>
									</div>
									<div class="sc-list-addon">
										<PrettyCheck v-model="checkboxes.cb6" class="p-switch" color="danger"></PrettyCheck>
									</div>
								</li>
								<li class="sc-list-group">
									<div class="sc-list-body">
										<label class="uk-text-truncate" @click="checkboxes.cb7 = !checkboxes.cb7">
											Lorem ipsum dolor sit amet.
										</label>
									</div>
									<div class="sc-list-addon">
										<PrettyCheck v-model="checkboxes.cb7" class="p-switch" color="danger"></PrettyCheck>
									</div>
								</li>
								<li class="sc-list-group">
									<div class="sc-list-body">
										<label class="uk-text-truncate" @click="checkboxes.cb8 = !checkboxes.cb8">
											Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, repellendus?
										</label>
									</div>
									<div class="sc-list-addon">
										<PrettyCheck v-model="checkboxes.cb8" class="p-switch" color="danger"></PrettyCheck>
									</div>
								</li>
							</ul>
						</div>
						<div>
							<ul class="uk-list uk-list-divider">
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<i class="mdi mdi-alert md-color-red-500"></i>
									</div>
									<div class="sc-list-body">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, provident!
									</div>
								</li>
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<i class="mdi mdi-forklift"></i>
									</div>
									<div class="sc-list-body">
										Lorem ipsum dolor sit amet, consectetur adipisicing.
									</div>
								</li>
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<i class="mdi mdi-doctor md-color-light-blue-500"></i>
									</div>
									<div class="sc-list-body">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi, veniam!
									</div>
								</li>
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<i class="mdi mdi-git md-color-light-green-500"></i>
									</div>
									<div class="sc-list-body">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit.
									</div>
								</li>
								<li class="sc-list-group">
									<div class="sc-list-addon">
										<i class="mdi mdi-air-conditioner"></i>
									</div>
									<div class="sc-list-body">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid magnam quibusdam repellendus!
									</div>
								</li>
							</ul>
						</div>
					</div>
				</ScCardBody>
			</ScCard>
			<ScCard class="uk-margin-top">
				<ScCardBody>
					<h4 class="uk-heading-line">
						<span>UIKit default lists</span>
					</h4>
					<div class="uk-child-width-1-4@m uk-grid-divider uk-grid" data-uk-grid>
						<div>
							<ul class="uk-list">
								<li>List item 1</li>
								<li>List item 2</li>
								<li>List item 3</li>
							</ul>
						</div>
						<div>
							<ul class="uk-list uk-list-bullet">
								<li>List item 1</li>
								<li>List item 2</li>
								<li>List item 3</li>
							</ul>
						</div>
						<div>
							<ul class="uk-list uk-list-divider">
								<li>List item 1</li>
								<li>List item 2</li>
								<li>List item 3</li>
							</ul>
						</div>
						<div>
							<ul class="uk-list uk-list-striped">
								<li>List item 1</li>
								<li>List item 2</li>
								<li>List item 3</li>
							</ul>
						</div>
					</div>
					<h5 class="uk-margin-large-top uk-heading-line">
						<span>Large modifier</span>
					</h5>
					<div class="uk-child-width-1-4@m uk-grid-divider uk-grid" data-uk-grid>
						<div>
							<ul class="uk-list uk-list-large">
								<li>List item 1</li>
								<li>List item 2</li>
								<li>List item 3</li>
							</ul>
						</div>
						<div>
							<ul class="uk-list uk-list-bullet uk-list-large">
								<li>List item 1</li>
								<li>List item 2</li>
								<li>List item 3</li>
							</ul>
						</div>
						<div>
							<ul class="uk-list uk-list-divider uk-list-large">
								<li>List item 1</li>
								<li>List item 2</li>
								<li>List item 3</li>
							</ul>
						</div>
						<div>
							<ul class="uk-list uk-list-striped uk-list-large">
								<li>List item 1</li>
								<li>List item 2</li>
								<li>List item 3</li>
							</ul>
						</div>
					</div>
				</ScCardBody>
			</ScCard>
		</div>
	</div>
</template>

<script>
import { scFakeData } from '~/assets/js/utils'
const { n, name } = scFakeData;

import PrettyCheck from 'pretty-checkbox-vue/check';
import ScAvatar from '~/components/Avatar'

export default {
	name: 'ComponentsLists',
	components: {
		ScAvatar,
		PrettyCheck
	},
	data: () => ({
		checkboxes: {
			cb1: false,
			cb2: true,
			cb3: false,
			cb4: false,
			cb5: false,
			cb6: false,
			cb7: true,
			cb8: false
		},
		settings: {
			wifi: true,
			bt: false,
			nfc: false,
			airplane: false
		},
		fakeUser: n(name, 10)
	})
}
</script>

<style lang="scss">
	@import '~scss/vue/_pretty_checkboxes';
</style>

