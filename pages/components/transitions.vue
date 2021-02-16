<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content" class="uk-flex uk-flex-center">
			<div class="uk-width-2-3@l">
				<a
					href="javascript:void(0)"
					class="sc-button sc-button-flat sc-button-flat-danger uk-margin-bottom"
					:class="{'sc-button-disabled': btnDisabled}"
					@click.prevent="toggleAnimation('groupAShow')"
				>
					Toggle
				</a>
				<client-only>
					<ScTransition
						group
						stagger
						:speed="18"
						preserve-height
						origin="50% 50%"
						class="uk-child-width-1-4@m uk-grid-medium uk-grid"
						data-uk-grid
						appear
					>
						<div v-show="groupAShow" key="groupA-elA">
							<ScCard class="uk-height-small md-bg-light-blue-50"></ScCard>
						</div>
						<div v-show="groupAShow" key="groupA-elB">
							<ScCard class="uk-height-small md-bg-light-blue-100"></ScCard>
						</div>
						<div v-show="groupAShow" key="groupA-elC">
							<ScCard class="uk-height-small md-bg-light-blue-200"></ScCard>
						</div>
						<div v-show="groupAShow" key="groupA-elD">
							<ScCard class="uk-height-small md-bg-light-blue-300"></ScCard>
						</div>
						<div v-show="groupAShow" key="groupA-elE">
							<ScCard class="uk-height-small md-bg-light-blue-100"></ScCard>
						</div>
						<div v-show="groupAShow" key="groupA-elF">
							<ScCard class="uk-height-small md-bg-light-blue-200"></ScCard>
						</div>
						<div v-show="groupAShow" key="groupA-elG">
							<ScCard class="uk-height-small md-bg-light-blue-300"></ScCard>
						</div>
						<div v-show="groupAShow" key="groupA-elH">
							<ScCard class="uk-height-small md-bg-light-blue-400"></ScCard>
						</div>
						<div v-show="groupAShow" key="groupA-elI">
							<ScCard class="uk-height-small md-bg-light-blue-200"></ScCard>
						</div>
						<div v-show="groupAShow" key="groupA-elJ">
							<ScCard class="uk-height-small md-bg-light-blue-300"></ScCard>
						</div>
						<div v-show="groupAShow" key="groupA-elK">
							<ScCard class="uk-height-small md-bg-light-blue-400"></ScCard>
						</div>
						<div v-show="groupAShow" key="groupA-elL">
							<ScCard class="uk-height-small md-bg-light-blue-500"></ScCard>
						</div>
						<div v-show="groupAShow" key="groupA-elM">
							<ScCard class="uk-height-small md-bg-light-blue-300"></ScCard>
						</div>
						<div v-show="groupAShow" key="groupA-elN">
							<ScCard class="uk-height-small md-bg-light-blue-400"></ScCard>
						</div>
						<div v-show="groupAShow" key="groupA-elO">
							<ScCard class="uk-height-small md-bg-light-blue-500"></ScCard>
						</div>
						<div v-show="groupAShow" key="groupA-elP">
							<ScCard class="uk-height-small md-bg-light-blue-600"></ScCard>
						</div>
					</ScTransition>
				</client-only>
				<pre v-highlightjs><code>&lt;ScTransition group stagger :speed=&quot;18&quot; preserve-height origin=&quot;50% 50%&quot; class=&quot;uk-child-width-1-4@m uk-grid-medium uk-grid&quot; data-uk-grid appear&gt;
</code></pre>
				<hr class="uk-margin">
				<a
					href="javascript:void(0)"
					class="sc-button sc-button-flat sc-button-flat-danger uk-margin-bottom"
					:class="{'sc-button-disabled': btnDisabled}"
					@click.prevent="toggleObject('groupB')"
				>
					Repeat
				</a>
				<client-only>
					<ScTransition
						group
						stagger
						name="slideBottom"
						:speed="5"
						class="uk-child-width-1-1 uk-grid-collapse uk-grid"
						data-uk-grid
						:after-leave="afterLeave"
						:after-leave-all="afterLeaveAll"
						appear
					>
						<div v-for="el in groupB" :key="el.id">
							<ScCard class="sc-padding-medium">
								{{ el.text }}
							</ScCard>
						</div>
					</ScTransition>
				</client-only>
				<pre v-highlightjs><code>&lt;ScTransition group stagger name=&quot;slideBottom&quot; :speed=&quot;5&quot; class=&quot;uk-child-width-1-1 uk-grid-collapse uk-grid&quot; data-uk-grid appear&gt;
</code></pre>
				<hr class="uk-margin">
				<a
					href="javascript:void(0)"
					class="sc-button sc-button-flat sc-button-flat-danger uk-margin-bottom"
					:class="{'sc-button-disabled': btnDisabled}"
					@click.prevent="toggleObject('groupC')"
				>
					Repeat
				</a>
				<ScTransition
					group
					stagger
					name="scaleDown"
					:speed="5"
					preserve-height
					class="uk-child-width-1-1 uk-grid-collapse uk-grid"
					data-uk-grid
					appear
				>
					<div v-for="el in groupC" :key="el.id">
						<ScCard class="sc-padding-medium">
							{{ el.text }}
						</ScCard>
					</div>
				</ScTransition>
				<pre v-highlightjs><code>&lt;ScTransition group stagger name=&quot;scaleDown&quot; :speed=&quot;5&quot; preserve-height class=&quot;uk-child-width-1-1 uk-grid-collapse uk-grid&quot; data-uk-grid appear&gt;
</code></pre>
			</div>
		</div>
	</div>
</template>

<script>
require('~/plugins/highlight');
import _ from 'lodash';

export default {
	name: 'ComponentsTransitions',
	data: () => ({
		btnDisabled: false,
		groupAShow: true,
		groupB: [
			{ id: 0, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, quae?'},
			{ id: 1, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, quae?'},
			{ id: 2, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, quae?'},
			{ id: 3, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, quae?'},
			{ id: 4, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, quae?'},
			{ id: 5, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, quae?'},
			{ id: 6, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, quae?'},
			{ id: 7, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, quae?'},
			{ id: 8, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, quae?'},
			{ id: 9, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, quae?'}
		],
		groupC: [
			{ id: 0, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, quae?'},
			{ id: 1, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, quae?'},
			{ id: 2, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, quae?'},
			{ id: 3, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, quae?'},
			{ id: 4, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, quae?'},
			{ id: 5, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, quae?'},
			{ id: 6, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, quae?'},
			{ id: 7, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, quae?'},
			{ id: 8, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, quae?'},
			{ id: 9, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, quae?'}
		],
		tempObj: {
			groupB: [],
			groupC: []
		}
	}),
	methods: {
		toggleAnimation (group) {
			if(!this.btnDisabled) {
				this[group] = !this[group];
				this.btnDisabled = true;
				setTimeout(() => {
				 	this.btnDisabled = false;
				}, 1000)
			}
		},
		toggleObject (object) {
			if(!this.btnDisabled) {
				this.btnDisabled = true;
				const isEmpty = _.isEmpty(this[object]);
				if (!isEmpty) {
					this.tempObj[object] = this[object];
					this[object] = [];
				} else {
					this[object] = this.tempObj[object];
				}
				setTimeout(() => {
					this.btnDisabled = false;
				}, 1000)
			}
		},
		afterLeave () {
			console.log('after-leave callback');
		},
		afterLeaveAll () {
			console.log('after-leave-all callback');
		}

	}
}
</script>
