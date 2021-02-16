<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<h4>Fixed Height</h4>
			<div class="uk-child-width-1-3@s uk-grid" data-uk-grid>
				<div>
					<ScCard class="uk-height-small uk-card uk-card-default uk-card-body uk-flex uk-flex-center uk-flex-middle">
						Small
					</ScCard>
				</div>
				<div>
					<ScCard class="uk-height-medium uk-card uk-card-default uk-card-body uk-flex uk-flex-center uk-flex-middle">
						Medium
					</ScCard>
				</div>
				<div>
					<ScCard class="uk-height-large uk-card uk-card-default uk-card-body uk-flex uk-flex-center uk-flex-middle">
						Large
					</ScCard>
				</div>
			</div>
			<h4>Match Card</h4>
			<div>
				<div class="uk-grid uk-child-width-1-2@s" data-uk-height-match="target: > div > .uk-card > .uk-card-body" data-uk-grid>
					<div>
						<ScCard>
							<ScCardBody>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad error est et excepturi, facere nesciunt odit perferendis quisquam veritatis voluptas!
							</ScCardBody>
						</ScCard>
					</div>
					<div>
						<ScCard>
							<ScCardBody>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad blanditiis est magni odit officiis quis quisquam repellendus voluptate. Dolore dolorem ea ex facere in laborum laudantium libero maxime minus mollitia, quaerat rem repellat reprehenderit soluta, tenetur velit veniam vero. Ab accusantium adipisci aut autem corporis culpa cum deserunt, dolor eos eveniet facere illo impedit inventore maiores maxime molestiae molestias mollitia nesciunt non nostrum nulla numquam pariatur quis recusandae repellendus tempora unde, vel. Architecto deserunt dolorum ducimus enim magni non pariatur quod rem soluta? Aperiam debitis dignissimos enim fuga, ipsum iste molestias nisi non provident quam quisquam repudiandae voluptatem voluptatum?
							</ScCardBody>
						</ScCard>
					</div>
				</div>
			</div>
			<h4 class="uk-margin-large-top">
				Match All
			</h4>
			<div>
				<div class="uk-grid uk-child-width-1-2@s" data-uk-height-match="target: > div > .uk-card > .uk-card-body; row: false" data-uk-grid>
					<div>
						<ScCard>
							<ScCardBody>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad error est et excepturi, facere nesciunt odit perferendis quisquam veritatis voluptas!
							</ScCardBody>
						</ScCard>
					</div>
					<div>
						<ScCard>
							<ScCardBody>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi cupiditate deleniti dignissimos dolorem eligendi explicabo in, labore magni minus natus nisi optio quas repellendus repudiandae, sapiente tenetur unde veniam?
							</ScCardBody>
						</ScCard>
					</div>
					<div>
						<ScCard>
							<ScCardBody>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquid aspernatur cumque distinctio expedita facilis, id incidunt laudantium numquam quaerat, quas quis suscipit tenetur ut vel. Dolore ducimus excepturi odit perferendis, quam sed sunt. Ad autem, culpa delectus facere minima nam repellendus tempora voluptas! Aut laborum mollitia necessitatibus nobis repudiandae.
							</ScCardBody>
						</ScCard>
					</div>
					<div>
						<ScCard>
							<ScCardBody>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam beatae cumque cupiditate exercitationem fugiat fugit illo iure natus nisi nobis officia porro quas quos reprehenderit rerum, sed veritatis voluptas! Cum dolorem et illo necessitatibus possimus veniam veritatis. Accusamus aliquam architecto autem consequuntur corporis, deleniti esse et eum, maxime non odio officia quae, quos temporibus veritatis. Architecto ducimus error explicabo, ipsa molestiae neque quidem rerum soluta voluptas? Alias, aliquam consequatur doloribus eveniet excepturi in maiores nemo nobis recusandae vel voluptas!
							</ScCardBody>
						</ScCard>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ComponentsHeight'
}
</script>
