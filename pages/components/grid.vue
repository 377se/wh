<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-grid" data-uk-grid>
				<div class="uk-width-1-4@m">
					<ScCard>
						<ScCardBody>
							.uk-width-1-4@m
						</ScCardBody>
					</ScCard>
				</div>
				<div class="uk-width-1-2@m">
					<ScCard>
						<ScCardBody>
							.uk-width-1-2@m
						</ScCardBody>
					</ScCard>
				</div>
				<div class="uk-width-1-4@m">
					<ScCard>
						<ScCardBody>
							.uk-width-1-4@m
						</ScCardBody>
					</ScCard>
				</div>
			</div>
			<div class="uk-margin-top" data-uk-grid>
				<div class="uk-width-1-2@m">
					<ScCard>
						<ScCardBody>
							.uk-width-1-2@m
						</ScCardBody>
					</ScCard>
				</div>
				<div class="uk-width-1-2@m">
					<ScCard>
						<ScCardBody>
							.uk-width-1-2@m
						</ScCardBody>
					</ScCard>
				</div>
			</div>
			<div class="uk-margin-top" data-uk-grid>
				<div class="uk-width-1-3@m">
					<ScCard>
						<ScCardBody>
							.uk-width-1-3@m
						</ScCardBody>
					</ScCard>
				</div>
				<div class="uk-width-2-3@m">
					<ScCard>
						<ScCardBody>
							.uk-width-2-3@m
						</ScCardBody>
					</ScCard>
				</div>
			</div>
			<div class="uk-margin-top" data-uk-grid>
				<div class="uk-width-1-4@m">
					<ScCard>
						<ScCardBody>
							.uk-width-2-5@m
						</ScCardBody>
					</ScCard>
				</div>
				<div class="uk-flex-1">
					<ScCard>
						<ScCardBody>
							.uk-flex-1
						</ScCardBody>
					</ScCard>
				</div>
			</div>
			<div class="uk-margin-top uk-child-width-expand@m" data-uk-grid>
				<div v-for="index in 5" :key="index">
					<ScCard>
						<ScCardBody>
							&hellip;
						</ScCardBody>
					</ScCard>
				</div>
			</div>
			<code class="uk-margin-small-top uk-display-inline-block">.uk-child-width-expand@m</code>

			<h4 class="uk-heading-line uk-margin-large-top">
				<span>Gutter modifiers</span>
			</h4>
			<div class="uk-child-width-1-3@m uk-grid-large" data-uk-grid>
				<div v-for="index in 3" :key="index">
					<ScCard>
						<ScCardBody>
							&hellip;
						</ScCardBody>
					</ScCard>
				</div>
			</div>
			<code class="uk-margin-small-top uk-display-inline-block">.uk-grid-large</code>

			<div class="uk-margin-top uk-child-width-1-3@m" data-uk-grid>
				<div v-for="index in 3" :key="index">
					<ScCard>
						<ScCardBody>
							&hellip;
						</ScCardBody>
					</ScCard>
				</div>
			</div>
			<code class="uk-margin-small-top uk-display-inline-block">default</code>

			<div class="uk-margin-top uk-child-width-1-3@m uk-grid-medium" data-uk-grid>
				<div v-for="index in 3" :key="index">
					<ScCard>
						<ScCardBody>
							&hellip;
						</ScCardBody>
					</ScCard>
				</div>
			</div>
			<code class="uk-margin-small-top uk-display-inline-block">.uk-grid-medium</code>

			<div class="uk-margin-top uk-child-width-1-3@m uk-grid-small" data-uk-grid>
				<div v-for="index in 3" :key="index">
					<ScCard>
						<ScCardBody>
							&hellip;
						</ScCardBody>
					</ScCard>
				</div>
			</div>
			<code class="uk-margin-small-top uk-display-inline-block">.uk-grid-small</code>

			<div class="uk-margin-top uk-child-width-1-3@m uk-grid-collapse" data-uk-grid>
				<div v-for="index in 3" :key="index">
					<ScCard>
						<ScCardBody>
							&hellip;
						</ScCardBody>
					</ScCard>
				</div>
			</div>
			<code class="uk-margin-small-top uk-display-inline-block">.uk-grid-collapse</code>

			<h4 class="uk-heading-line uk-margin-large-top">
				<span>Nested grid</span>
			</h4>
			<div class="uk-child-width-1-2@m" data-uk-grid>
				<div>
					<ScCard>
						<ScCardBody>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, perspiciatis.
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<div class="uk-child-width-expand@m uk-grid-small" data-uk-grid>
						<div>
							<div class="uk-height-small md-bg-grey-300"></div>
						</div>
						<div>
							<div class="uk-height-small md-bg-grey-400"></div>
						</div>
						<div>
							<div class="uk-height-small md-bg-grey-500"></div>
						</div>
					</div>
				</div>
			</div>
			<h4 class="uk-heading-line uk-margin-large-top">
				<span>Divider modifier</span>
			</h4>
			<ScCard class="uk-text-center">
				<ScCardBody>
					<div class="uk-child-width-expand@m uk-grid-divider uk-grid-small" data-uk-grid>
						<div>Item</div>
						<div>Item</div>
						<div>Item</div>
					</div>
					<hr>
					<div class="uk-child-width-expand@m uk-grid-divider uk-grid-small" data-uk-grid>
						<div>Item</div>
						<div>Item</div>
						<div>Item</div>
						<div>Item</div>
						<div>Item</div>
					</div>
					<hr>
					<div class="uk-child-width-expand@m uk-grid-divider uk-grid-small" data-uk-grid>
						<div>Item</div>
						<div>Item</div>
						<div>Item</div>
						<div>Item</div>
					</div>
				</ScCardBody>
			</ScCard>
			<h4 class="uk-heading-line uk-margin-large-top">
				<span>Match height</span>
			</h4>
			<div class="uk-grid-match uk-child-width-expand@s uk-text-center uk-grid" data-uk-grid>
				<div v-for="index in 3" :key="index">
					<ScCard>
						<ScCardBody>
							<span v-if="index === 1">&hellip;</span>
							<span v-if="index === 2">&hellip;<br>&hellip;</span>
							<span v-if="index === 3">&hellip;<br>&hellip;<br>&hellip;</span>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
			<code class="uk-margin-small-top uk-display-inline-block">.uk-grid-match</code>

			<div class="uk-child-width-expand@s uk-margin-top uk-grid" data-uk-grid data-uk-height-match="target: > div > .uk-card > .uk-card-title">
				<div>
					<ScCard>
						<ScCardTitle>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, necessitatibus.
						</ScCardTitle>
						<ScCardBody>
							&hellip;
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis corporis?
						</ScCardTitle>
						<ScCardBody>
							&hellip;
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Lorem ipsum dolor sit amet
						</ScCardTitle>
						<ScCardBody>
							&hellip;
						</ScCardBody>
					</ScCard>
				</div>
			</div>
			<div class="uk-overflow-auto">
				<code class="uk-margin-small-top uk-display-inline-block">data-uk-height-match="target: > div > .uk-card > .uk-card-title"</code>
			</div>
			<h4 class="uk-heading-line uk-margin-large-top">
				<span>Grid and flex</span>
			</h4>
			<div class="uk-child-width-1-4@s uk-flex-center" data-uk-grid>
				<div>
					<ScCard>
						<ScCardBody>
							Item 1
						</ScCardBody>
					</ScCard>
				</div>
				<div class="uk-flex-last">
					<ScCard class="uk-card-secondary">
						<ScCardBody>
							Item 2
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardBody>
							Item 3
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardBody>
							Item 4
						</ScCardBody>
					</ScCard>
				</div>
				<div class="uk-flex-first">
					<ScCard class="uk-card-primary">
						<ScCardBody>
							Item 5
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardBody>
							Item 6
						</ScCardBody>
					</ScCard>
				</div>
			</div>
			<h4 class="uk-heading-line uk-margin-large-top">
				<span>Grid and paralax</span>
			</h4>
			<div class="uk-child-width-expand@s uk-text-center" data-uk-grid="parallax: 60">
				<div>
					<ScCard v-for="index in 3" :key="index" class="uk-margin">
						<ScCardBody>
							Item
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard v-for="index in 3" :key="index" class="uk-margin">
						<ScCardBody>
							Item
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard v-for="index in 3" :key="index" class="uk-margin">
						<ScCardBody>
							Item
						</ScCardBody>
					</ScCard>
				</div>
			</div>
			<div class="uk-child-width-1-6@m uk-text-center uk-grid" data-uk-grid="parallax: 120">
				<div v-for="index in 24" :key="index">
					<ScCard>
						<ScCardBody>
							Item
						</ScCardBody>
					</ScCard>
				</div>
			</div>
			<h4 class="uk-heading-line uk-margin-large-top">
				<span>Masonry</span>
			</h4>
			<div class="uk-child-width-1-2@s uk-child-width-1-3@m uk-grid" data-uk-grid="masonry: true">
				<div>
					<ScCard style="height: 140px">
						<ScCardBody>
							<h5>Item 1</h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, reprehenderit?
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard style="height: 180px">
						<ScCardBody>
							<h5>Item 2</h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, reprehenderit?
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard style="height: 240px">
						<ScCardBody>
							<h5>Item 3</h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, reprehenderit?
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard style="height: 160px">
						<ScCardBody>
							<h5>Item 4</h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, reprehenderit?
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard class="uk-height-small">
						<ScCardTitle>
						</ScCardTitle>
						<ScCardBody>
							<h5>Item 5</h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, reprehenderit?
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard style="height: 210px">
						<ScCardBody>
							<h5>Item 6</h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, reprehenderit?
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardBody>
							<h5>Item 7</h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, reprehenderit?
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ComponentsGrid'
}
</script>
