<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-margin-auto uk-width-1-3@l">
				<ScCard>
					<client-only>
						<v-calendar
							:attributes="attributes"
							title-position="left"
							is-expanded
							@dayclick="onDayClick"
							@transition-start="dayEvents = () => []"
						/>
					</client-only>
					<div v-if="dayEvents.length" class="vc-calendar-events">
						<div v-for="event in dayEvents" :key="event.customData.id">
							<h4 class="vc-calendar-events-description">
								{{ event.customData.description }}
							</h4>
							<span>{{ formatDate(event.customData.dates) }}</span>
						</div>
					</div>
				</ScCard>
			</div>
		</div>
	</div>
</template>

<script>
if (process.client) {
	require('~/plugins/v-calendar.js');
}

export default {
	name: 'PluginsCalendarEvents',
	data () {
		const month = new Date().getMonth();
		const year = new Date().getFullYear();
		return {
			pageForThisMonth: null,
			todos: [
				{
					id: 1,
					description: 'Take Noah to basketball practice.',
					dates: new Date(year, month, 1),
					color: 'blue',
				},
				{
					id: 2,
					description: 'Get some milks.',
					dates: new Date(year, month, 5),
					color: 'red',
				},
				{
					id: 3,
					description: 'Pay the utility bill.',
					dates: new Date(year, month, 19),
					color: 'orange',
				},
				{
					id: 4,
					description: 'Pick up clothes from the cleaners.',
					dates: new Date(year, month, 19),
					color: 'purple',
				},
				{
					id: 5,
					description: 'Lunch with Leo.',
					dates: new Date(year, month, 22),
					color: 'green',
				},
			],
			dayEvents: []
		}
	},
	computed: {
		attributes () {
			return [
				...this.todos.map(todo => ({
					key: todo.id,
					dates: todo.dates,
					customData: todo,
					order: todo.id,
					dot: {
						color: todo.color
					}
				}))
			]
		}
	},
	methods: {
		onDayClick (day) {
			if(!day.attributes.length) {
				return
			}
			this.dayEvents = day.attributes
		},
		formatDate (d) {
			return this.$moment(d).format('dddd, DD-MM-YYYY ');
		}
	}
}
</script>

<style lang="scss">
	@import "~@/assets/scss/plugins/v-calendar";
</style>
