<template>
	<div id="sc-page-wrapper">
		<client-only>
			<div id="sc-page-top-bar" class="sc-top-bar" data-uk-sticky="offset:48; show-on-up: true; animation: uk-animation-slide-top-medium">
				<div class="sc-top-bar-content uk-flex uk-flex-1">
					<h1 class="sc-top-bar-title uk-flex-1">
						Toolbar title
					</h1>
					<span class="uk-text-muted">
						Some text
					</span>
					<div class="sc-actions uk-margin-left">
						<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-filter-variant sc-js-el-hide" data-uk-toggle="target: #sc-page-top-bar; cls: sc-top-bar-expanded"></a>
						<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-close sc-js-el-show" data-uk-toggle="target: #sc-page-top-bar; cls: sc-top-bar-expanded"></a>
					</div>
				</div>
				<div class="sc-top-bar-content-expanded">
					<p class="uk-margin-remove uk-flex-middle uk-flex">
						<span class="uk-text-medium uk-text-uppercase sc-text-semibold md-color-indigo-700 uk-margin-right">
							Filter by:
						</span>
						'{{ filter.name }}', '{{ filter.date }}', {{ filter.tags }}
					</p>
					<div class="uk-child-width-1-4@m uk-flex-bottom" data-uk-grid data-uk-match-height>
						<div>
							<ScInput id="sc-filter-name" v-model="filter.name">
								<label>Name</label>
							</ScInput>
						</div>
						<div>
							<ScInput id="sc-filter-date" v-model="filter.date" v-flatpickr="{'enableTime': true, 'dateFormat': 'Y-m-d H:i'}">
								<label>Date</label>
							</ScInput>
						</div>
						<div>
							<client-only>
								<Select2
									v-model="filter.tags"
									:options="tags"
									:settings="{ 'width': '100%', 'minimumResultsForSearch': -1, 'placeholder': 'Select tag...', 'closeOnSelect': false }"
									multiple
								></Select2>
							</client-only>
						</div>
						<div class="uk-text-right">
							<button class="sc-button sc-button-secondary">
								Filter
							</button>
						</div>
					</div>
				</div>
			</div>
		</client-only>
		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, molestias nihil. Aliquam dolore dolores dolorum et excepturi facere harum id in incidunt laboriosam, libero magnam numquam possimus quaerat quibusdam recusandae reprehenderit repudiandae tenetur voluptas voluptatem! Ab, aliquam, quaerat? Ad aliquid dolorem eos esse et facilis illo maiores minima, nisi quas reiciendis sunt? Accusantium cum delectus esse eum facilis molestias nemo quae sed tenetur velit. Animi architecto at atque commodi cumque debitis dignissimos id, incidunt iste laboriosam, necessitatibus nostrum odit officia pariatur placeat provident quibusdam quidem quis quod repellat tempore ut veritatis. Accusantium adipisci architecto consectetur magni quia sit ullam vitae voluptatibus. A, aperiam distinctio, enim esse explicabo, facere id illo molestias necessitatibus nesciunt odit possimus sint vero. Alias ducimus, est eveniet, excepturi facere impedit ipsum maiores odio pariatur quam sequi tempora vel, voluptatum. Amet consequuntur cupiditate deserunt eius eum excepturi incidunt maxime obcaecati possimus, quam, quia quibusdam reiciendis repudiandae sequi unde veritatis voluptate! Ab animi, at dolor dolores esse est in iste iusto maiores maxime, odio, odit quod rerum soluta totam veritatis vero voluptas. Eos esse excepturi fuga iste, obcaecati quo quos. Accusamus alias at autem, blanditiis commodi consectetur consequatur consequuntur cum dicta distinctio dolorem eius eligendi est facere facilis harum hic illum ipsam iusto laboriosam minus odit omnis optio provident quaerat quam quas quia quo reiciendis repudiandae sapiente tempore vitae voluptates? Adipisci asperiores cum officiis possimus provident sed soluta, vitae voluptatibus. Corporis esse id in ipsa mollitia qui recusandae totam voluptates. Aspernatur at dicta dignissimos, dolore dolores dolorum earum enim esse eum eveniet excepturi exercitationem inventore magni maiores maxime natus numquam obcaecati placeat quasi quidem quis quisquam reprehenderit saepe. Alias, autem enim esse fugiat molestiae odit officia quae qui quibusdam ratione similique ullam vel vero. Culpa eius fugiat necessitatibus possimus quaerat quisquam, repellat repudiandae sequi unde. Architecto, dolore, esse.
				</ScCardBody>
			</ScCard>
		</div>
	</div>
</template>

<script>
import ScInput from '~/components/Input'
import Flatpickr from '~/plugins/flatpickr'

export default {
	name: 'ComponentsToolbar',
	components: {
		Select2: process.client ? () => import('~/components/Select2') : null,
		ScInput
	},
	data: () => ({
		filter: {
			name: '',
			date: '',
			tags: []
		},
		tags: [
			{
				id: 'red',
				text: 'Red'
			},
			{
				id: 'blue',
				text: 'Blue'
			},
			{
				id: 'orange',
				text: 'Orange'
			},
			{
				id: 'yellow',
				text: 'Yellow'
			}
		]
	})
}
</script>
