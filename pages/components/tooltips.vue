<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<ScCard>
				<ScCardTitle>
					Tooltips
				</ScCardTitle>
				<ScCardBody>
					<div class="uk-child-width-auto@m uk-grid" data-uk-grid>
						<div>
							<button class="sc-button" data-uk-tooltip="Hello World">
								Hover
							</button>
						</div>
						<div>
							<button class="sc-button" data-uk-tooltip="title: Hello World; delay: 500">
								Delay
							</button>
						</div>
						<div>
							<button class="sc-button" data-uk-tooltip="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat, doloribus!">
								Long
							</button>
						</div>
						<div>
							<button class="sc-button" data-uk-tooltip="title: Hello World; pos: top-left">
								Top left
							</button>
						</div>
						<div>
							<button class="sc-button" data-uk-tooltip="title: Hello World; pos: top-right">
								Top right
							</button>
						</div>
						<div>
							<button class="sc-button" data-uk-tooltip="title: Hello World; pos: bottom">
								Bottom
							</button>
						</div>
						<div>
							<button class="sc-button" data-uk-tooltip="title: Hello World; pos: bottom-left">
								Bottom left
							</button>
						</div>
						<div>
							<button class="sc-button" data-uk-tooltip="title: Hello World; pos: bottom-right">
								Bottom right
							</button>
						</div>
						<div>
							<button class="sc-button" data-uk-tooltip="title: Hello World; pos: left">
								Left
							</button>
						</div>
						<div>
							<button class="sc-button" data-uk-tooltip="title: Hello World; pos: right">
								Right
							</button>
						</div>
					</div>
					<hr>
					<div class="uk-child-width-1-2@m" data-uk-grid>
						<div>
							<ScInput id="sc-filter-name" v-model="inputTooltip" :uk-tooltip="{'title': 'Hello World'}">
								<label>Full Name</label>
							</ScInput>
						</div>
						<div>
							Lorem ipsum dolor sit amet <a href="javascript:void(0)" data-uk-tooltip="title: Hello World">
								consectetur adipisicing elit
							</a>. Neque excepturi quaerat et ab itaque nam fuga, harum enim, reiciendis facilis accusantium molestiae <a href="javascript:void(0)" data-uk-tooltip="title: Hello World">
								necessitatibus inventore
							</a>, omnis ad modi vel corrupti blanditiis.
						</div>
					</div>
				</ScCardBody>
			</ScCard>
		</div>
	</div>
</template>

<script>
import ScInput from '~/components/Input'

export default {
	name: 'ComponentsTooltips',
	components: {
		ScInput
	},
	data: () => ({
		inputTooltip: ''
	}),
}
</script>
