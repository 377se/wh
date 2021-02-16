<template>
	<div id="sc-page-wrapper" class="uk-flex uk-flex-column">
		<div id="sc-page-top-bar" class="sc-top-bar">
			<div class="sc-top-bar-content uk-flex uk-flex-1">
				<h1 class="sc-top-bar-title uk-flex-1">
					Product Roadmap
				</h1>
				<span class="uk-text-muted">
					Public
				</span>
				<div class="sc-actions uk-margin-left">
					<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-filter-variant sc-js-el-hide md-color-red-800 uk-animation-shake" data-uk-toggle="target: #sc-page-top-bar; cls: sc-top-bar-expanded"></a>
					<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-close sc-js-el-show" data-uk-toggle="target: #sc-page-top-bar; cls: sc-top-bar-expanded"></a>
				</div>
			</div>
			<div class="sc-top-bar-content-expanded">
				<p class="uk-text-medium uk-text-uppercase sc-text-semibold md-color-light-blue-700 uk-margin-remove">
					Filters:
				</p>
				<div class="uk-flex uk-flex-bottom uk-grid" data-uk-grid>
					<div class="uk-width-1-4@m">
						<ScInput v-model="filterData.taskName">
							<label>Task name</label>
						</ScInput>
					</div>
					<div class="uk-width-1-4@m">
						<client-only>
							<Select2
								v-model="filterData.tags"
								:options="tags"
								:settings="{ 'width': '100%', 'placeholder': 'Select tags...', closeOnSelect: false }"
								multiple
							></Select2>
						</client-only>
					</div>
					<div class="uk-width-1-4@m">
						<client-only>
							<Select2
								v-model="filterData.assignee"
								:options="users"
								:settings="{ 'width': '100%', 'placeholder': 'Select user...', 'minimumResultsForSearch': -1 }"
							></Select2>
						</client-only>
					</div>
					<div class="uk-flex-none">
						<button class="sc-button sc-button-secondary">
							Filter
						</button>
					</div>
				</div>
			</div>
		</div>
		<div id="sc-page-wrapper-inner" class="uk-flex">
			<div id="sc-page-aside" class="uk-flex-column sc-page-aside-large sc-page-aside-overflow">
				<div class="sc-page-aside-body uk-flex uk-flex-column sc-padding-remove">
					<div class="sc-task-list-head">
						<h3 class="sc-task-list-header">
							Tasks
						</h3>
					</div>
					<client-only>
						<Draggable v-model="dragModel.others"
							tag="ul"
							group="tasks"
							:animation="40"
							class="sc-task-list-cards sc-task-js-list-cards"
							@change="updateTasks($event,'others')"
						>
							<li v-for="task in dragModel.others" :key="task.id">
								<div class="sc-task-card" @click="showTask(task)">
									<h2 class="sc-task-card-title">
										{{ task.title }}
									</h2>
									<div v-if="task.tags.length">
										<span v-for="tag in task.tags" :key="tag" class="uk-badge uk-margin-mini-right" :class="[tagColor(tag)]">
											{{ tag }}
										</span>
									</div>
									<div v-if="task.assignee.length" class="sc-task-card-assignee">
										<a v-for="assignee in task.assignee.slice(0,3)"
											:key="assignee"
											href="javascript:void(0)"
											:title="assigneeName(assignee)"
											class="sc-task-card-assignee-avatar"
										>
											<img v-rjs="assigneeAvatar(assignee, true)" :src="assigneeAvatar(assignee)" alt="">
										</a>
										<a v-if="task.assignee.length > 3" href="javascript:void(0)">
											+{{ (task.assignee.length - 3) }} more
										</a>
									</div>
									<div v-if="task.progress"
										class="sc-progress sc-progress-small uk-margin-small-top"
										:title="task.progress + '%'"
									>
										<div
											class="sc-progress-bar"
											:class="[progressColor(task.progress)]"
											:style="{ 'width': task.progress + '%' }"
										>
										</div>
									</div>
								</div>
							</li>
						</Draggable>
					</client-only>
				</div>
			</div>
			<div id="sc-page-content" class="sc-padding-remove">
				<div class="sc-task-board-wrapper">
					<client-only>
						<Draggable id="sc-task-board"
							v-model="taskBoardColumns"
							group="columns"
							:animation="40"
							handle=".sc-task-list-header"
							class="sc-task-board"
						>
							<div v-for="column in taskBoardColumns" :key="column.id" class="sc-task-list sc-column-transition" :class="{'sc-task-list-collapsed': column.collapsed, 'sc-js-el-transform': column.transform}">
								<div class="sc-task-list-head sortable-handle-el">
									<h3 class="sc-task-list-header">
										{{ column.name }}
									</h3>
									<div class="sc-actions">
										<client-only>
											<ColumnToggle
												:collapsed="column.collapsed"
												@columnCollapsing="onColumnCollapsing(column)"
												@columnShown="column.transform = false"
												@columnHidden="column.transform = false"
											></ColumnToggle>
										</client-only>
										<div class="sc-dropdown sc-js-el-hide">
											<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-dots-vertical"></a>
											<div data-uk-dropdown="mode:click">
												<ul class="uk-nav uk-dropdown-nav">
													<li>
														<a href="javascript:void(0)" @click.prevent="addTaskModal(column)">
															Add Card
														</a>
													</li>
													<li>
														<a href="javascript:void(0)">
															Copy List&hellip;
														</a>
													</li>
													<li>
														<a href="javascript:void(0)">
															Move List&hellip;
														</a>
													</li>
													<li class="uk-nav-divider"></li>
													<li>
														<a href="javascript:void(0)">
															Close This List
														</a>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<Draggable v-model="dragModel[column.list]"
									tag="ul"
									group="tasks"
									:animation="40"
									class="sc-task-list-cards sc-task-js-list-cards uk-height-1-1"
									@change="updateTasks($event,column.list)"
								>
									<li v-for="task in dragModel[column.list]" :key="task.id">
										<div class="sc-task-card" @click="showTask(task)">
											<h2 class="sc-task-card-title">
												{{ task.title }}
											</h2>
											<div v-if="task.tags.length" class="uk-flex uk-margin-small-top">
												<span v-for="tag in task.tags" :key="tag" class="uk-badge uk-margin-mini-right" :class="[tagColor(tag)]">
													{{ tag }}
												</span>
											</div>
											<div v-if="task.assignee.length" class="sc-task-card-assignee">
												<a v-for="assignee in task.assignee.slice(0,3)"
													:key="assignee"
													href="javascript:void(0)"
													:title="assigneeName(assignee)"
													class="sc-task-card-assignee-avatar"
												>
													<img v-rjs="assigneeAvatar(assignee, true)" :src="assigneeAvatar(assignee)" alt="">
												</a>
												<a v-if="task.assignee.length > 3" href="javascript:void(0)">
													+{{ (task.assignee.length - 3) }} more
												</a>
											</div>
											<div v-if="task.progress"
												class="sc-progress sc-progress-small uk-margin-small-top"
												:title="task.progress + '%'"
											>
												<div
													class="sc-progress-bar"
													:class="[progressColor(task.progress)]"
													:style="{ 'width': task.progress + '%' }"
												>
												</div>
											</div>
										</div>
									</li>
								</Draggable>
							</div>
						</Draggable>
					</client-only>
				</div>
			</div>
		</div>
		<div class="sc-fab-page-wrapper">
			<a href="javascript:void(0)" class="sc-fab sc-fab-large sc-fab-danger">
				<i class="mdi mdi-plus"></i>
			</a>
		</div>
		<div id="sc-task-modal" class="uk-flex-top uk-modal" data-uk-modal>
			<div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
				<button class="uk-modal-close-default" type="button" data-uk-close></button>
				<div v-if="modalData">
					<h2 class="uk-modal-title">
						{{ modalData.title }}
					</h2>
					<div v-if="modalData.tags.length" class="uk-flex uk-flex-middle">
						<span v-for="tag in modalData.tags" :key="tag" class="uk-badge uk-margin-mini-right" :class="[tagColor(tag)]">
							{{ tag }}
						</span>
					</div>
					<div class="uk-margin-medium-top" data-uk-grid>
						<div class="uk-flex-1">
							<div v-if="modalData.description !== ''" class="sc-task-modal-description">
								<p>{{ modalData.description }}</p>
							</div>
						</div>
						<div class="uk-width-1-4@m">
							<div class="uk-text-medium md-bg-grey-100 sc-padding-medium">
								<div v-if="modalData.date">
									<span class="uk-text-muted uk-margin-small-right">
										date:
									</span> {{ modalData.date }}
								</div>
								<hr v-if="modalData.list !== ''" class="uk-margin-small">
								<div v-if="modalData.list !== ''">
									<span class="uk-text-muted uk-margin-small-right">
										in list:
									</span>
									<a href="javascript:void(0)">
										{{ modalData.list_long }}
									</a>
								</div>
								<hr v-if="modalData.progress" class="uk-margin-small">
								<div v-if="modalData.progress">
									<span class="uk-text-muted">
										progress:
									</span>
									<div class="uk-margin-small-top sc-progress sc-progress-small" :title="modalData.progress + '%'">
										<div class="sc-progress-bar" :class="[progressColor(modalData.progress)]" :style="{ 'width': modalData.progress + '%' }"></div>
									</div>
								</div>
								<hr v-if="modalData.assignee.length" class="uk-margin-small">
								<div v-if="modalData.assignee.length">
									<span class="uk-text-muted">
										assignees:
									</span>
									<div class="uk-margin-small-top uk-flex uk-flex-middle">
										<a v-for="assignee in modalData.assignee.slice(0,3)"
											:key="assignee"
											href="javascript:void(0)"
											:title="assigneeName(assignee)"
											class="uk-margin-small-right"
										>
											<img v-rjs="assigneeAvatar(assignee, true)" :src="assigneeAvatar(assignee)" alt="" class="uk-border-circle">
										</a>
									</div>
									<a v-if="modalData.assignee.length > 3" href="javascript:void(0)" class="uk-text-small uk-margin-small-top uk-display-inline-block">
										+{{ (modalData.assignee.length - 3) }} more
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<client-only>
			<div id="sc-task-board-card-add-modal" class="uk-flex-top uk-modal">
				<div class="uk-modal-dialog uk-margin-auto-vertical">
					<div class="uk-modal-body">
						<button class="uk-modal-close-default" type="button" data-uk-close></button>
						<h2 class="uk-modal-title">
							Add Card
						</h2>
						<div class="uk-margin">
							<ScInput v-model="cardAdd.title" mode="outline">
								<label>Title</label>
							</ScInput>
						</div>
						<div class="uk-margin-small">
							<ScTextarea v-model="cardAdd.description" mode="outline">
								<label>Description</label>
							</ScTextarea>
						</div>
						<div class="uk-margin-small">
							<label class="uk-form-label" for="card-add-tags">Tags</label>
							<Select2
								v-model="cardAdd.tags"
								:options="cardAddData.tags"
								:settings="{ 'width': '100%', 'placeholder': 'Select tags...', closeOnSelect: false }"
								multiple
							></Select2>
						</div>
						<div class="uk-margin-small">
							<label class="uk-form-label" for="card-add-assignee">Assignee</label>
							<Select2
								v-model="cardAdd.assignee"
								:options="cardAddData.assignee"
								:settings="{ 'width': '100%', 'placeholder': 'Select assignee...', closeOnSelect: false }"
								multiple
							></Select2>
						</div>
						<div class="uk-child-width-1-2@m uk-grid uk-margin" data-uk-grid>
							<div>
								<ScInput v-model="cardAdd.date" v-flatpickr="addCardDp" mode="outline">
									<label>Due Date</label>
								</ScInput>
							</div>
						</div>
					</div>
					<div class="uk-modal-footer uk-text-right">
						<button class="sc-button sc-button-flat sc-button-flat-danger uk-modal-close" type="button">
							Cancel
						</button>
						<button id="sc-js-card-add" class="sc-button" type="button" @click.prevent="addTask()">
							Add Task
						</button>
					</div>
				</div>
			</div>
		</client-only>
		<client-only>
			<ScOffcanvas>
				<div class="sc-task-list-head">
					<h3 class="sc-task-list-header">
						Tasks
					</h3>
				</div>
				<Draggable v-model="dragModel.others"
					tag="ul"
					group="tasks"
					:animation="40"
					class="sc-task-list-cards sc-task-js-list-cards"
					@change="updateTasks($event,'others')"
				>
					<li v-for="task in dragModel.others" :key="task.id">
						<div class="sc-task-card" @click="showTask(task)">
							<h2 class="sc-task-card-title">
								{{ task.title }}
							</h2>
							<div v-if="task.tags.length">
								<span v-for="tag in task.tags" :key="tag" class="uk-badge uk-margin-mini-right" :class="[tagColor(tag)]">
									{{ tag }}
								</span>
							</div>
							<div v-if="task.assignee.length" class="sc-task-card-assignee">
								<a v-for="assignee in task.assignee.slice(0,3)"
									:key="assignee"
									href="javascript:void(0)"
									:title="assigneeName(assignee)"
									class="sc-task-card-assignee-avatar"
								>
									<img v-rjs="assigneeAvatar(assignee, true)" :src="assigneeAvatar(assignee)" alt="">
								</a>
								<a v-if="task.assignee.length > 3" href="javascript:void(0)">
									+{{ (task.assignee.length - 3) }} more
								</a>
							</div>
							<div v-if="task.progress"
								class="sc-progress sc-progress-small uk-margin-small-top"
								:title="task.progress + '%'"
							>
								<div
									class="sc-progress-bar"
									:class="[progressColor(task.progress)]"
									:style="{ 'width': task.progress + '%' }"
								>
								</div>
							</div>
						</div>
					</li>
				</Draggable>
			</ScOffcanvas>
		</client-only>
	</div>
</template>
<script>
import Vue from 'vue';
import { mapGetters } from 'vuex'
import ScInput from '~/components/Input'
import ScTextarea from '~/components/Textarea'

import ColumnToggle from '~/components/ColumnToggle';
import ScOffcanvas from '~/components/Offcanvas';
import moment from '~/plugins/moment'

if(process.client) {
	require('~/plugins/flatpickr');
}

export default {
	name: 'PagesTaskBoard',
	components: {
		Select2: process.client ? () => import('~/components/Select2') : null,
		ScInput,
		ScTextarea,
		ColumnToggle,
		ScOffcanvas,
		Draggable: process.client ? () => import('vuedraggable') : null
	},
	data: () => ({
		tags: [
			{ id: 0, text: 'Integrations', color: 'md-bg-blue-400' },
			{ id: 1, text: 'Idea', color: 'md-bg-amber-400' },
			{ id: 2, text: 'Feature', color: 'md-bg-purple-400' },
			{ id: 3, text: 'Bug', color: 'md-bg-red-400' }
		],
		filterData: {},
		modalData: null,
		taskModal: null,
		taskBoardColumns: [
			{ id: 0, name: 'To Do', list: 'todo', collapsed: false, transform: false },
			{ id: 1, name: 'In Progress', list: 'inProgress', collapsed: false, transform: false },
			{ id: 2, name: 'Testing', list: 'testing', collapsed: true, transform: false },
			{ id: 3, name: 'Done', list: 'done', collapsed: false, transform: false }
		],
		dragModel: {
			'others': [],
			'todo': [],
			'inProgress': [],
			'testing': [],
			'done': []
		},
		cardAdd: {
			id: '',
			list: '',
			list_long: '',
			title: '',
			description: '',
			date: '',
			tags: '',
			assignee: ''
		},
		cardAddModal: null,
		cardAddData: {
			tags: [
				{ id: 'Integrations', text: 'Integrations' },
				{ id: 'Idea', text: 'Idea', color: 'md-bg-amber-400' },
				{ id: 'Feature', text: 'Feature', color: 'md-bg-purple-400' },
				{ id: 'Bug', text: 'Bug', color: 'md-bg-red-400' }
			],
			assignee: [
				{ id: 'user_1', text: 'carey.rice' },
				{ id: 'user_2', text: 'ian.wiza' },
				{ id: 'user_3', text: 'telly07' }
			]
		}
	}),
	computed: {
		...mapGetters({
			tasks: 'task_board/tasks'
		}),
		users () {
			return [
				{
					id: '0',
					jsonName: 'user_1',
					text: 'carey.rice',
					avatar: require('~/assets/img/avatars/avatar_01_sm.png'),
					avatar2x: require('~/assets/img/avatars/avatar_01_sm@2x.png')
				},
				{
					id: '1',
					jsonName: 'user_2',
					text: 'ian.wiza',
					avatar: require('~/assets/img/avatars/avatar_04_sm.png'),
					avatar2x: require('~/assets/img/avatars/avatar_04_sm@2x.png')
				},
				{
					id: '2',
					jsonName: 'user_3',
					text: 'telly07',
					avatar: require('~/assets/img/avatars/avatar_07_sm.png'),
					avatar2x: require('~/assets/img/avatars/avatar_07_sm@2x.png')
				}
			]
		},
		addCardDp () {
			return {
				dateFormat: "d/m/Y",
				minDate: this.$moment().format('DD/MM/YYYY')
			}
		}
	},
	mounted () {
		// set fixed page
		this.$store.commit('setPageFixed', true);
		// modal
		this.taskModal = UIkit.modal(document.getElementById('sc-task-modal'));

		// update dragModel from store
		this.dragModel.others = this.tasks.others;
		this.dragModel.todo = this.tasks.todo;
		this.dragModel.inProgress = this.tasks.inProgress;
		this.dragModel.testing = this.tasks.testing;
		this.dragModel.done = this.tasks.done;

		this.$nextTick(() => {
			this.cardAddModal = UIkit.modal('#sc-task-board-card-add-modal', {
				bgClose: false
			})
		})
	},
	beforeDestroy () {
		// unset fixed page
		this.$store.commit('setPageFixed', false);
	},
	methods: {
		showTask (task) {
			this.modalData = task;
			this.taskModal.show();
		},
		tagColor (tag) {
			let _tag = this.tags.filter(obj => {
				return obj.text === tag;
			});
			return _tag[0].color;
		},
		assigneeAvatar (name, retina) {
			let _user = this.users.filter(obj => {
				return obj.jsonName === name;
			});
			return retina ? _user[0].avatar2x : _user[0].avatar;
		},
		assigneeName (name) {
			let _user = this.users.filter(obj => {
				return obj.jsonName === name;
			});
			return _user[0].text;
		},
		progressColor (value) {
			return (value <= 20)
				? 'md-bg-red-400'
				: (value <= 60)
					? 'md-bg-amber-400'
					: 'md-bg-green-400';
		},
		updateTasks (e, list) {
			if(e['added']) {
				let data = {
					el: e['added'].element,
					list: list,
					dragList: this.dragModel[list]
				};
				this.$store.commit('task_board/replaceList', data);
			}
			if(e['removed']) {
				let data = {
					id: e['removed'].element.id,
					list: list
				};
				this.$store.commit('task_board/removeTaskFromList', data);
			}
			return false;
		},
		onColumnCollapsing (column) {
			column.collapsed = !column.collapsed;
			column.transform = true;
		},
		addTaskModal (column) {
			this.cardAdd.id = Math.floor((Math.random() * 1000) + 100);
			this.cardAdd.list = column.list;
			this.cardAdd.list_long = column.name;
			this.cardAddModal.show();
		},
		addTask () {
			const data = { ...this.cardAdd };
			this.$store.commit('task_board/addTask', data);
			this.cardAddModal.hide();
			// cleanup
			Object.keys(this.cardAdd).forEach((key) => {
				this.cardAdd[key] = ''
			});
		}
	}
}
</script>
<style lang="scss">
	@import '~scss/common/md_colors';
	@import '~scss/common/variables_mixins';
	@import '~scss/pages/task_board';
	@import '~scss/plugins/sortable';
</style>
