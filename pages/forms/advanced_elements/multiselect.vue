<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-child-width-1-2@l uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardTitle>
							Basic
						</ScCardTitle>
						<ScCardBody>
							<client-only>
								<MultiSelect
									v-model="basic.model"
									:options="msBasicOptions"
								></MultiSelect>
							</client-only>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Optgroups
						</ScCardTitle>
						<ScCardBody>
							<client-only>
								<MultiSelect
									v-model="optgroups.model"
									:settings="optgroups.settings"
								>
									<optgroup label="Friends">
										<option value="1">
											Yoda
										</option>
										<option value="2">
											Luke Skywalker
										</option>
										<option value="3">
											Han Solo
										</option>
										<option value="4" selected>
											Obi Wan Kenobi
										</option>
									</optgroup>
									<optgroup label="Enemies">
										<option value="5">
											Emperor Palpatine
										</option>
										<option value="6">
											Darth Maul
										</option>
										<option value="7" disabled>
											Darth Vader
										</option>
										<option value="8">
											Count Dooku
										</option>
									</optgroup>
								</MultiSelect>
							</client-only>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Custom header/footer
						</ScCardTitle>
						<ScCardBody>
							<client-only>
								<MultiSelect
									v-model="headerFooter.model"
									:settings="headerFooter.settings"
									:options="msHeaderFooterOptions"
								></MultiSelect>
							</client-only>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Searchable
						</ScCardTitle>
						<ScCardBody>
							<client-only>
								<MultiSelect
									v-model="searchable.model"
									:settings="searchableSettings"
									:options="msSearchableOptions"
								></MultiSelect>
							</client-only>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
			<div class="uk-child-width-1-1 uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardTitle>
							Public methods
						</ScCardTitle>
						<ScCardBody>
							<div class="uk-child-width-1-2@l uk-grid" data-uk-grid>
								<div>
									<client-only>
										<MultiSelect
											ref="msPublicMethods"
											v-model="publicMethods.model"
											:options="msPublicMethodsOptions"
										></MultiSelect>
									</client-only>
								</div>
								<div data-uk-margin>
									<a class="sc-button sc-button-default sc-button-small sc-button-outline" href="javascript:void(0)" @click.prevent="msSelectAll()">
										select all
									</a>
									<a class="sc-button sc-button-default sc-button-small sc-button-outline" href="javascript:void(0)" @click.prevent="msDeselectAll()">
										deselect all
									</a>
									<br>
									<a class="sc-button sc-button-default sc-button-small sc-button-outline" href="javascript:void(0)" @click.prevent="msSelectElements()">
										select 10 elems
									</a>
									<a class="sc-button sc-button-default sc-button-small sc-button-outline" href="javascript:void(0)" @click.prevent="msDeselectElements()">
										deselect 4 elems
									</a>
									<div>
										{{ publicMethods.model }}
									</div>
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
import { scFakeData } from '~/assets/js/utils'
const { name, email, city } = scFakeData;

require('~/plugins/jquery');
if(process.client) {
	require('~/assets/js/vendor/jquery.quicksearch.js');
}

export default {
	name: 'FormsAdvancedElementsMultiselect',
	components: {
		MultiSelect: process.client ? () => import('~/components/Multiselect') : null
	},
	data: () => ({
		basic: {
			model: []
		},
		optgroups: {
			model: [],
			settings: { selectableOptgroup: true }
		},
		headerFooter: {
			model: [],
			settings: {
				cssClass: 'ms-header ms-footer',
				selectableHeader: "<div class='custom-header md-bg-light-blue-800 md-color-white'>Selectable header</div>",
				selectionHeader: "<div class='custom-header md-bg-grey-800 md-color-white'>Selection header</div>",
				selectableFooter: "<div class='custom-footer md-bg-light-blue-800 md-color-white'>Selectable footer</div>",
				selectionFooter: "<div class='custom-footer md-bg-grey-800 md-color-white'>Selection footer</div>"
			}
		},
		searchable: {
			model: []
		},
		publicMethods: {
			model: []
		}
	}),
	computed: {
		msBasicOptions () {
			let options = [];
			for (let i = 1; i < 100; i++) {
				options.push({
					value: 'elem-' + i,
					text: name()
				})
			}
			return 	options;
		},
		msHeaderFooterOptions () {
			let options = [];
			for (let i = 1; i < 100; i++) {
				options.push({
					value: 'city-' + i,
					text: city()
				})
			}
			return 	options;
		},
		msSearchableOptions () {
			let options = [];
			for (let i = 1; i < 100; i++) {
				options.push({
					value: 'el-' + i,
					text: email()
				})
			}
			return 	options;
		},
		msPublicMethodsOptions () {
			let options = [];
			for (let i = 1; i < 200; i++) {
				options.push({
					value: 'el-' + i,
					text: name()
				})
			}
			return 	options;
		},
		searchableSettings () {
			return {
				cssClass: 'ms-header',
				selectableHeader: "<div class='custom-header md-bg-grey-200'><input type='text' id='selectableSearch' class='uk-input uk-form-small search-input' autocomplete='off' placeholder='Search...'></div>",
				selectionHeader: "<div class='custom-header md-bg-grey-200'><input type='text' id='selectionSearch' class='uk-input uk-form-small search-input' autocomplete='off' placeholder='Search...'></div>",
				afterInit (ms) {
					const that = this;
					let $selectableSearch = that.$selectableUl.prev().children();
					let $selectionSearch = that.$selectionUl.prev().children();
					let selectableSearchString = '#' + that.$container.attr('id') + ' .ms-elem-selectable:not(.ms-selected)';
					let selectionSearchString = '#' + that.$container.attr('id') + ' .ms-elem-selection.ms-selected';
					that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
						.on('keydown', function (e) {
							if (e.which === 40) {
								that.$selectableUl.focus();
								return false;
							}
						});
					that.qs2 = $selectionSearch.quicksearch(selectionSearchString)
						.on('keydown', function (e) {
							if (e.which === 40) {
								that.$selectionUl.focus();
								return false;
							}
						});
				},
				afterSelect () {
					this.qs1.cache();
					this.qs2.cache();
				},
				afterDeselect () {
					this.qs1.cache();
					this.qs2.cache();
				}
			}
		}
	},
	methods: {
		msSelectAll () {
			this.$refs.msPublicMethods.select_all()
		},
		msDeselectAll () {
			this.$refs.msPublicMethods.deselect_all()
		},
		msSelectElements () {
			this.$refs.msPublicMethods.select(['el-1', 'el-2', 'el-3', 'el-4', 'el-5', 'el-6', 'el-7', 'el-8', 'el-9', 'el-10' ])
		},
		msDeselectElements () {
			this.$refs.msPublicMethods.deselect(['el-1', 'el-2', 'el-3', 'el-4'])
		}
	}
}
</script>
