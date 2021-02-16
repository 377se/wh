<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-child-width-1-3@l uk-child-width-1-2@s uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardBody class="uk-height-small">
							<h5>Default</h5>
						</ScCardBody>
						<div class="sc-fab-card-wrapper uk-position-bottom-right">
							<a href="javascript:void(0)" class="sc-fab">
								<i class="mdi mdi-content-save"></i>
							</a>
						</div>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardBody class="uk-height-small">
							<h5>Mini</h5>
						</ScCardBody>
						<div class="sc-fab-card-wrapper uk-position-bottom-right">
							<a href="javascript:void(0)" class="sc-fab sc-fab-small sc-fab-danger">
								<i class="mdi mdi-briefcase-plus"></i>
							</a>
						</div>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardBody class="uk-height-small">
							<h5>Large</h5>
						</ScCardBody>
						<div class="sc-fab-card-wrapper uk-position-bottom-right">
							<a href="javascript:void(0)" class="sc-fab sc-fab-large sc-fab-primary">
								<i class="mdi mdi-autorenew"></i>
							</a>
						</div>
					</ScCard>
				</div>
			</div>
			<div class="uk-child-width-1-3@l uk-child-width-1-2@s uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardBody class="uk-height-small">
							<h5>Text default</h5>
						</ScCardBody>
						<div class="sc-fab-card-wrapper uk-position-bottom-right">
							<a href="javascript:void(0)" class="sc-fab sc-fab-text sc-fab-secondary">
								Create
							</a>
						</div>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardBody class="uk-height-small">
							<h5>Text small</h5>
						</ScCardBody>
						<div class="sc-fab-card-wrapper uk-position-bottom-right">
							<a href="javascript:void(0)" class="sc-fab sc-fab-small sc-fab-text sc-fab-secondary">
								Create
							</a>
						</div>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardBody class="uk-height-small">
							<h5>Text large</h5>
						</ScCardBody>
						<div class="sc-fab-card-wrapper uk-position-bottom-right">
							<a href="javascript:void(0)" class="sc-fab sc-fab-large sc-fab-text sc-fab-secondary">
								Create
							</a>
						</div>
					</ScCard>
				</div>
			</div>
			<div class="uk-child-width-1-3@l uk-child-width-1-2@s uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardBody class="uk-height-small">
							<h5>Text + icon default</h5>
						</ScCardBody>
						<div class="sc-fab-card-wrapper uk-position-bottom-right">
							<a href="javascript:void(0)" class="sc-fab sc-fab-text sc-fab-success">
								<i class="mdi mdi-plus"></i>Create
							</a>
						</div>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardBody class="uk-height-small">
							<h5>Text small</h5>
						</ScCardBody>
						<div class="sc-fab-card-wrapper uk-position-bottom-right">
							<a href="javascript:void(0)" class="sc-fab sc-fab-small sc-fab-text sc-fab-success">
								<i class="mdi mdi-plus"></i>Create
							</a>
						</div>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardBody class="uk-height-small">
							<h5>Text large</h5>
						</ScCardBody>
						<div class="sc-fab-card-wrapper uk-position-bottom-right">
							<a href="javascript:void(0)" class="sc-fab sc-fab-large sc-fab-text sc-fab-success">
								<i class="mdi mdi-plus"></i>Create
							</a>
						</div>
					</ScCard>
				</div>
			</div>
			<div data-uk-grid>
				<div class="uk-width-1-3@l">
					<ScCard>
						<ScCardBody class="uk-height-medium">
							<h5>Multiple</h5>
						</ScCardBody>
						<div class="sc-fab-card-wrapper uk-position-bottom-right">
							<a href="javascript:void(0)" class="sc-fab md-bg-light-green-600 sc-fab-dark">
								<i class="mdi mdi-send"></i>
							</a>
							<a href="javascript:void(0)" class="sc-fab md-bg-amber-600 sc-fab-dark">
								<i class="mdi mdi-reload"></i>
							</a>
							<a href="javascript:void(0)" class="sc-fab">
								<i class="mdi mdi-content-save"></i>
							</a>
						</div>
					</ScCard>
				</div>
			</div>
			<div class="uk-child-width-1-2@m uk-margin-medium-bottom" data-uk-grid>
				<div>
					<div class="uk-card">
						<div class="uk-card-body uk-height-medium">
							<h5>Speed dial horizontal</h5>
						</div>
						<ScFabSpeedDial
							class="sc-fab-card-wrapper uk-position-bottom-right"
							fab-alignment="horizontal"
							:fabs="fabs"
						>
							<a href="javascript:void(0)" class="sc-fab">
								<i class="mdi mdi-email"></i>
								<i class="mdi mdi-close"></i>
							</a>
						</ScFabSpeedDial>
					</div>
				</div>
				<div>
					<div class="uk-card">
						<div class="uk-card-body uk-height-medium">
							<h5>Speed dial horizontal (hover mode)</h5>
						</div>
						<ScFabSpeedDial
							class="sc-fab-card-wrapper uk-position-bottom-right"
							fab-event="hover"
							fab-alignment="horizontal"
							:fabs="fabs"
						>
							<a href="javascript:void(0)" class="sc-fab">
								<i class="mdi mdi-email"></i>
								<i class="mdi mdi-close"></i>
							</a>
						</ScFabSpeedDial>
					</div>
				</div>
			</div>
			<div class="uk-child-width-1-2@m uk-child-width-1-3@l uk-margin-large-bottom" data-uk-grid>
				<div>
					<div class="uk-card">
						<div class="uk-card-body uk-height-large">
							<h5>Speed dial</h5>
						</div>
						<ScFabSpeedDial
							class="sc-fab-card-wrapper uk-position-bottom-right"
							:fabs="fabs"
						>
							<a href="javascript:void(0)" class="sc-fab">
								<i class="mdi mdi-email"></i>
								<i class="mdi mdi-close"></i>
							</a>
						</ScFabSpeedDial>
					</div>
				</div>
				<div>
					<div class="uk-card">
						<div class="uk-card-body uk-height-large">
							<h5>Speed dial (hover mode)</h5>
						</div>
						<ScFabSpeedDial
							class="sc-fab-card-wrapper uk-position-bottom-right"
							fab-event="hover"
							:fabs="fabs"
						>
							<a href="javascript:void(0)" class="sc-fab">
								<i class="mdi mdi-email"></i>
								<i class="mdi mdi-close"></i>
							</a>
						</ScFabSpeedDial>
					</div>
				</div>
			</div>
		</div>
		<div class="sc-fab-page-wrapper">
			<a href="javascript:void(0)" class="sc-fab sc-fab-large md-bg-light-blue-700 sc-fab-dark">
				<i class="mdi mdi-account-multiple-plus"></i>
			</a>
		</div>
	</div>
</template>

<script>
import ScFabSpeedDial from '~/components/FabSpeedDial'
export default {
	name: 'ComponentsFabButtons',
	components: {
		ScFabSpeedDial
	},
	data: () => ({
		fabs: [
			{
				id: 1,
				class: 'md-bg-light-blue-600 sc-fab-dark',
				to: '/pages/mailbox/',
				icon: ' mdi-email-check'
			},
			{
				id: 2,
				class: 'md-bg-light-green-600 sc-fab-dark',
				href: 'javascript:void(0)',
				icon: ' mdi-email-edit'
			},
			{
				id: 3,
				class: 'md-bg-red-600 sc-fab-dark',
				href: 'javascript:void(0)',
				icon: ' mdi-email-lock'
			},
			{
				id: 4,
				class: 'md-bg-amber-600 sc-fab-dark',
				href: 'javascript:void(0)',
				icon: ' mdi-reload'
			}
		]
	})
}
</script>
