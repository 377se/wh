<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-child-width-1-2@l uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardTitle>
							Default
						</ScCardTitle>
						<ScCardBody>
							<client-only>
								<Select2
									v-model="select2.state"
									:options="usStates"
									:settings="{ 'width': '100%', 'placeholder': 'Select state...', allowClear: true }"
								></Select2>
							</client-only>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Tagging
						</ScCardTitle>
						<ScCardBody>
							<client-only>
								<Select2
									v-model="select2.cities"
									:options="usCities"
									:settings="{ 'width': '100%', 'placeholder': 'Select city...', 'closeOnSelect': false }"
									multiple
								></Select2>
							</client-only>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
const usStates = require('~/data/common/us_states.json');
const usCities = require('~/data/common/us_cities.json');

export default {
	name: 'FormsAdvancedElementsSelect2',
	components: {
		Select2: process.client ? () => import('~/components/Select2') : null
	},
	data: () => ({
		select2: {
			state: '',
			cities: ["AK", "CA", "NY"]
		}
	}),
	computed: {
		usStates () {
			return usStates.map(function (obj) {
				obj.id = obj.id || obj.val;
				obj.text = obj.text || obj.name;
				return obj;
			});
		},
		usCities () {
			return usCities.map(function (obj) {
				obj.id = obj.id || obj.rank;
				obj.text = obj.text || obj.city;
				return obj;
			});
		}
	},
}
</script>
