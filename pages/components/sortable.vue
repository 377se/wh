<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<h4 class="uk-heading-line">
				<span>Sortable</span>
			</h4>
			<ul class="uk-grid uk-child-width-1-2 uk-child-width-1-4@s" data-uk-sortable="handle: .uk-card" data-uk-grid>
				<li v-for="index in 8" :key="index">
					<ScCard>
						<ScCardBody class="uk-text-center">
							Item {{ index }}
						</ScCardBody>
					</ScCard>
				</li>
			</ul>

			<h4 class="uk-heading-line uk-margin-large-top">
				<span>Handle</span>
			</h4>
			<ul class="uk-grid uk-child-width-1-2 uk-child-width-1-4@s uk-sortable-handle-enabled" data-uk-sortable="handle: .uk-sortable-handle" data-uk-grid>
				<li v-for="index in 8" :key="index">
					<ScCard>
						<ScCardBody class="uk-text-center uk-flex uk-flex-middle uk-flex-center">
							<i class="mdi mdi-view-headline uk-sortable-handle uk-margin-right"></i>
							Item {{ index }}
						</ScCardBody>
					</ScCard>
				</li>
			</ul>

			<div class="uk-child-width-1-3@s" data-uk-grid>
				<div>
					<h4 class="uk-heading-line uk-margin-large-top">
						<span>Group 1</span>
					</h4>
					<div class="uk-height-min-small" data-uk-sortable="group: sortable-group">
						<div v-for="index in 4" :key="index" class="uk-margin">
							<ScCard>
								<ScCardBody>
									g-1 i-{{ index }}
								</ScCardBody>
							</ScCard>
						</div>
					</div>
				</div>
				<div>
					<h4 class="uk-heading-line uk-margin-large-top">
						<span>Group 2</span>
					</h4>
					<div class="uk-height-min-small" data-uk-sortable="group: sortable-group">
						<div v-for="index in 4" :key="index" class="uk-margin">
							<ScCard>
								<ScCardBody>
									g-2 i-{{ index }}
								</ScCardBody>
							</ScCard>
						</div>
					</div>
				</div>
				<div>
					<h4 class="uk-heading-line uk-margin-large-top">
						<span>Empty Group</span>
					</h4>
					<div class="uk-height-min-small" data-uk-sortable="group: sortable-group"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ComponentsSortable',
}
</script>
