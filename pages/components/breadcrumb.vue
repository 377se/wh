<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-top-bar" class="sc-top-bar">
			<div class="sc-top-bar-content uk-flex uk-flex-middle uk-width-1-1">
				<ul class="uk-breadcrumb uk-margin-remove uk-flex uk-flex-middle">
					<li>
						<nuxt-link to="/">
							<i class="mdi mdi-home"></i>
						</nuxt-link>
					</li>
					<li>
						<nuxt-link to="/components/">
							Components
						</nuxt-link>
					</li>
					<li>
						<span>Breadcrumb</span>
					</li>
				</ul>
			</div>
		</div>
		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
					<ul class="uk-breadcrumb">
						<li><a href="#">Item</a></li>
						<li><a href="#">Item</a></li>
						<li class="uk-disabled">
							<a>Disabled</a>
						</li>
						<li><span>Active</span></li>
					</ul>
				</ScCardBody>
			</ScCard>
			<ScCard class="uk-margin-top">
				<ScCardBody>
					<ul class="uk-breadcrumb uk-breadcrumb-alt">
						<li><a href="#">Item</a></li>
						<li><a href="#">Item</a></li>
						<li class="uk-disabled">
							<a>Disabled</a>
						</li>
						<li><span>Active</span></li>
					</ul>
				</ScCardBody>
			</ScCard>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ComponentsBreadcrumbs',
}
</script>
