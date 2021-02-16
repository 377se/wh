<template>
	<div id="sc-page-wrapper" class="uk-flex uk-flex-column">
		<client-only>
			<div id="sc-page-top-bar"
				class="sc-top-bar"
				data-uk-sticky="offset:48; show-on-up: true; animation: uk-animation-slide-top-medium"
			>
				<div class="sc-top-bar-content uk-flex uk-flex-1">
					<h1 class="sc-top-bar-title uk-text-uppercase uk-flex-1">
						Notes
					</h1>
					<div class="sc-actions uk-margin-left">
						<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-settings-outline"></a>
					</div>
				</div>
			</div>
		</client-only>
		<div id="filter-wrapper">
			<div id="sc-page-content">
				<div data-uk-grid class="uk-grid sc-js-sticky-parent">
					<div class="uk-width-1-6@l uk-width-1-4@m uk-visible@m">
						<client-only>
							<ul v-sc-sticky="sideMenu" data-uk-accordion="multiple: true">
								<li class="uk-open">
									<a class="uk-accordion-title" href="javascript:void(0)">
										<i class="mdi mdi-folder-outline"></i>Folders
									</a>
									<div class="uk-accordion-content">
										<ul class="uk-list">
											<li data-uk-filter-control="filter: [data-folder]; group: folder"
												class="sc-js-filter-clear"
											>
												<a href="javascript:void(0)">
													All folders
												</a>
											</li>
											<li v-for="folder in folders"
												:key="folder"
												:data-uk-filter-control="'filter: [data-folder=\'' + processName(folder) + '\']; group: folder'"
											>
												<a href="javascript:void(0)">
													{{ folder }}
												</a>
											</li>
										</ul>
									</div>
								</li>
								<li class="uk-open">
									<a class="uk-accordion-title" href="javascript:void(0)">
										<i class="mdi mdi-label-outline"></i>Tags
									</a>
									<div class="uk-accordion-content">
										<ul class="uk-list">
											<li data-uk-filter-control="filter: .sc-filter-label; group: label"
												class="sc-js-filter-clear"
											>
												<a href="javascript:void(0)">
													<span class="sc-color-label md-bg-white sc-color-label-clear"></span> All tags
												</a>
											</li>
											<li v-for="label in labels"
												:key="label.name"
												:data-uk-filter-control="'filter: .sc-filter-label-' + processName(label.name) + '; group: label'"
											>
												<a href="javascript:void(0)">
													<span class="sc-color-label"
														:class="['md-bg-' + label.color]"
													></span> {{ label.name }}
												</a>
											</li>
										</ul>
									</div>
								</li>
							</ul>
						</client-only>
					</div>
					<div class="uk-flex-1">
						<ul id="sc-notes" class="sc-notes uk-child-width-1-3@l uk-child-width-1-4@xl uk-grid uk-flex-top uk-flex-wrap-top" data-uk-grid="masonry: true">
							<li v-for="note in notes"
								:key="note.id"
								:data-folder="note.folder"
								class="sc-filter-label"
								:class="[filterClass(note.labels)]"
							>
								<transition name="scale-up">
									<ScCard
										v-show="note.visible"
										class="sc-el-clickable"
										:class="[noteBgColor(note.cardColor), { 'sc-theme-dark-inverse': note.cardColor}]"
										@click.native="showNote($event, note.id)"
									>
										<ScCardHeader>
											<div class="uk-flex uk-flex-top">
												<div class="uk-flex-1">
													<ScCardTitle>
														{{ note.title }}
													</ScCardTitle>
													<span v-if="note.dueDate" class="uk-text-muted uk-text-small">
														{{ note.dueDate }}
													</span>
												</div>
												<div class="sc-actions uk-margin-left">
													<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-pencil sc-icon-22"></a>
													<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-close" @click.prevent="hideNote(note)"></a>
												</div>
											</div>
										</ScCardHeader>
										<ScCardBody>
											<p class="uk-margin-remove">
												{{ note.body | stripHTML | truncate(100) }}
											</p>
											<ul v-if="note.checklist" class="uk-margin-top uk-list sc-el-clickable-exclude">
												<li v-for="item in note.checklist" :key="item.id" class="uk-width-auto">
													<PrettyCheck v-model="item.checked" class="p-icon">
														<i slot="extra" class="icon mdi mdi-check"></i>
														{{ item.label }}
													</PrettyCheck>
												</li>
											</ul>
											<div v-if="note.labels" class="uk-flex uk-flex-middle">
												<span v-for="label in note.labels" :key="label" class="mdi mdi-label sc-icon-24" :class="['md-color-' + labelColor(label)]"></span>
											</div>
										</ScCardBody>
									</ScCard>
								</transition>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="sc-fab-page-wrapper">
			<a href="javascript:void(0)" class="sc-fab sc-fab-large sc-fab-secondary">
				<i class="mdi mdi-plus"></i>
			</a>
		</div>
		<div id="sc-note-modal" class="uk-flex-top uk-modal" data-uk-modal>
			<div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" :class="[noteBgColor(singleNote.cardColor)]">
				<button class="uk-modal-close-default" type="button" data-uk-close></button>
				<h2 class="uk-modal-title uk-margin-remove">
					{{ singleNote.title }}
				</h2>
				<span v-if="singleNote.dueDate" class="uk-text-muted uk-text-small">
					{{ singleNote.dueDate }}
				</span>
				<div v-if="singleNote.labels" class="uk-flex uk-flex-middle">
					<span v-for="label in singleNote.labels" :key="label" class="mdi mdi-label sc-icon-24" :class="['md-color-' + labelColor(label)]"></span>
				</div>
				<!-- eslint-disable-next-line vue/no-v-html -->
				<p class="uk-margin-top" v-html="singleNote.body"></p>
				<ul v-if="singleNote.checklist" class="uk-margin-top uk-list">
					<li v-for="item in singleNote.checklist" :key="item.id">
						<PrettyCheck v-model="item.checked" class="p-icon">
							<i slot="extra" class="icon mdi mdi-check"></i>
							{{ item.label }}
						</PrettyCheck>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
const notes = require('~/data/pages/notes.json');
import PrettyCheck from 'pretty-checkbox-vue/check';
import sticky from '~/plugins/stickyKit'
import { scDom } from '~/assets/js/utils';
const { closest } = scDom;

export default {
	name: 'PagesNotes',
	components: {
		PrettyCheck
	},
	data: () => ({
		sideMenu: {
			options: {
				'offset_top': 'inPlace'
			}
		},
		labels: [
			{ name: 'Tag 1', color: 'blue-400' },
			{ name: 'Tag 2', color: 'grey-400' },
			{ name: 'Tag 3', color: 'amber-400' },
			{ name: 'Tag 4', color: 'red-400' }
		],
		folders: ['Work', 'To Do', 'Important', 'Personal'],
		notes: notes,
		noteModal: null,
		singleNote: {},
		filterOptions: null
	}),
	mounted () {
		this.$nextTick(() => {
			UIkit.filter('#filter-wrapper', {
				target: '.sc-notes'
			});
			// modal
			this.noteModal = UIkit.modal(document.getElementById('sc-note-modal'));
		});
	},
	methods: {
		showNote (e, id) {
			const note = this.notes.filter(obj => {
				return obj.id === id
			});
			this.singleNote = note[0];
			var excludedEl = closest(e.target, function (el) {
				return el.className ? el.className.includes('sc-actions') || el.className.includes('uk-list') : null;
			});
			if (!excludedEl) {
				this.noteModal.show();
			}
		},
		filterClass (labels) {
			let classes = '';
			labels.forEach((k) => {
				classes += 'sc-filter-label-' + k + ' ';
			});
			return classes;
		},
		noteBgColor (color) {
			return color ? 'md-bg-' + color + '-50' : '';
		},
		processName (label) {
			return label.toLowerCase().replace(/\s/g, '')
		},
		labelColor (label) {
			let _label = this.labels.filter(obj => {
				let name = obj.name.toLowerCase().replace(/\s/g, '');
				return name === label;
			});
			return _label[0].color;
		},
		hideNote (note) {
			note.visible = false;
			setTimeout(() => {
				let index = this.notes.map(function (item) {
					return item.id
				}).indexOf(note.id);
				this.notes.splice(index, 1);
			}, 500)
		}
	}
}
</script>

<style lang="scss">
	@import '~scss/vue/_pretty_checkboxes';
</style>
