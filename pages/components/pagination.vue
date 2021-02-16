<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
					<ul class="uk-pagination" data-uk-margin>
						<li><a href="#"><span data-uk-pagination-previous></span></a></li>
						<li><a href="#">1</a></li>
						<li class="uk-disabled">
							<span>...</span>
						</li>
						<li><a href="#">4</a></li>
						<li><a href="#">5</a></li>
						<li><a href="#">6</a></li>
						<li class="uk-active">
							<span>7</span>
						</li>
						<li><a href="#">8</a></li>
						<li><a href="#">9</a></li>
						<li><a href="#">10</a></li>
						<li class="uk-disabled">
							<span>...</span>
						</li>
						<li><a href="#">20</a></li>
						<li><a href="#"><span data-uk-pagination-next></span></a></li>
					</ul>
				</ScCardBody>
			</ScCard>
			<ScCard class="uk-margin-top">
				<ScCardTitle>Alignment</ScCardTitle>
				<ScCardBody>
					<div class="uk-child-width-1-2@s uk-grid" data-uk-grid>
						<div>
							<p class="sc-text-semibold">
								Center
							</p>
							<ul class="uk-pagination uk-flex-center" data-uk-margin>
								<li><a href="#"><span data-uk-pagination-previous></span></a></li>
								<li><a href="#">1</a></li>
								<li class="uk-disabled">
									<span>...</span>
								</li>
								<li><a href="#">5</a></li>
								<li><a href="#">6</a></li>
								<li class="uk-active">
									<span>7</span>
								</li>
								<li><a href="#">8</a></li>
								<li><a href="#"><span data-uk-pagination-next></span></a></li>
							</ul>
						</div>
						<div>
							<p class="sc-text-semibold">
								Right
							</p>
							<ul class="uk-pagination uk-flex-right" data-uk-margin>
								<li><a href="#"><span data-uk-pagination-previous></span></a></li>
								<li><a href="#">1</a></li>
								<li class="uk-disabled">
									<span>...</span>
								</li>
								<li><a href="#">5</a></li>
								<li><a href="#">6</a></li>
								<li class="uk-active">
									<span>7</span>
								</li>
								<li><a href="#">8</a></li>
								<li><a href="#"><span data-uk-pagination-next></span></a></li>
							</ul>
						</div>
					</div>
				</ScCardBody>
			</ScCard>
			<ScCard class="uk-margin-top">
				<ScCardTitle>Previous and next</ScCardTitle>
				<ScCardBody>
					<ul class="uk-pagination">
						<li><a href="#"><span class="uk-margin-small-right" data-uk-pagination-previous></span> Previous</a></li>
						<li class="uk-margin-auto-left">
							<a href="#">Next <span class="uk-margin-small-left" data-uk-pagination-next></span></a>
						</li>
					</ul>
				</ScCardBody>
			</ScCard>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ComponentsPagination',
}
</script>
