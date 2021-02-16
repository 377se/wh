<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<h4>
				Fixed width
			</h4>
			<div class="uk-width-small uk-margin">
				<ScCard class="uk-card-small">
					<ScCardBody>
						Small
					</ScCardBody>
				</ScCard>
			</div>
			<div class="uk-width-medium uk-margin">
				<ScCard class="uk-card-small">
					<ScCardBody>
						Medium
					</ScCardBody>
				</ScCard>
			</div>
			<div class="uk-width-large uk-margin">
				<ScCard class="uk-card-small">
					<ScCardBody>
						Large
					</ScCardBody>
				</ScCard>
			</div>
			<div class="uk-width-xlarge uk-margin">
				<ScCard class="uk-card-small">
					<ScCardBody>
						X Large
					</ScCardBody>
				</ScCard>
			</div>
			<div class="uk-width-xxlarge uk-margin">
				<ScCard class="uk-card-small">
					<ScCardBody>
						XX Large
					</ScCardBody>
				</ScCard>
			</div>
			<h4 class="uk-margin-large-top">
				Grid
			</h4>
			<div class="uk-text-center" data-uk-grid>
				<div class="uk-width-1-3">
					<div class="uk-card uk-card-default uk-card-body">
						1-3
					</div>
				</div>
				<div class="uk-width-1-3">
					<div class="uk-card uk-card-default uk-card-body">
						1-3
					</div>
				</div>
				<div class="uk-width-1-3">
					<div class="uk-card uk-card-default uk-card-body">
						1-3
					</div>
				</div>
			</div>
			<div class="uk-text-center" data-uk-grid>
				<div class="uk-width-1-2">
					<div class="uk-card uk-card-default uk-card-body">
						1-2
					</div>
				</div>
				<div class="uk-width-1-2">
					<div class="uk-card uk-card-default uk-card-body">
						1-2
					</div>
				</div>
			</div>
			<div class="uk-text-center uk-grid" data-uk-grid>
				<div class="uk-width-1-4">
					<div class="uk-card uk-card-default uk-card-body">
						1-4
					</div>
				</div>
				<div class="uk-width-3-4">
					<div class="uk-card uk-card-default uk-card-body">
						3-4
					</div>
				</div>
			</div>
			<h4 class="uk-margin-large-top">
				Auto & Expand
			</h4>
			<div class="uk-text-center uk-grid" data-uk-grid>
				<div class="uk-width-auto">
					<div class="uk-card uk-card-default uk-card-body">
						Auto
					</div>
				</div>
				<div class="uk-width-expand">
					<div class="uk-card uk-card-default uk-card-body">
						Expand
					</div>
				</div>
			</div>
			<h4 class="uk-margin-large-top">
				Equal child widths
			</h4>
			<div class="uk-child-width-1-4 uk-grid-small uk-text-center uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardBody>
							Item
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardBody>
							Item
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardBody>
							Item
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardBody>
							Item
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardBody>
							Item
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardBody>
							Item
						</ScCardBody>
					</ScCard>
				</div>
			</div>
			<div class="uk-child-width-expand uk-grid-small uk-text-center uk-grid uk-margin-top" data-uk-grid>
				<div>
					<ScCard>
						<ScCardBody>
							Item
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardBody>
							Item
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardBody>
							Item
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardBody>
							Item
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardBody>
							Item
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardBody>
							Item
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ComponentsWidth'
}
</script>
