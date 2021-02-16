<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div
				id="sc-gallery-grid"
				class="uk-child-width-1-2@s uk-child-width-1-3@l uk-child-width-1-4@xl uk-grid-medium uk-position-relative uk-grid uk-flex-top uk-flex-wrap-top"
				data-uk-lightbox="animation: scale"
				data-uk-grid="masonry: true"
			>
				<div v-for="photo in photos" :key="photo.id">
					<ScCard>
						<ScCardBody class="sc-padding-remove">
							<a :href="photo.large" class="uk-display-block" :data-caption="photo.desc">
								<img v-rjs="photo.small2x" :src="photo.small" class="sc-round-top uk-width-1-1" alt="">
							</a>
							<div class="sc-padding-medium">
								<div class="uk-flex uk-flex-middle">
									<div class="uk-flex-1">
										<p class="uk-margin-remove sc-text-semibold">
											{{ photo.desc }}
										</p>
									</div>
									<div class="sc-flex-no-shrink uk-margin-left sc-el-clickable" @click.prevent="ratePhoto(photo)">
										<transition enter-active-class="uk-animation-scale-down sc-animation-slow" mode="out-in">
											<span v-if="rating[photo.id]" key="rated" class="uk-display-block">
												<i class="mdi mdi-heart md-color-red-600"></i>
											</span>
											<span v-else key="unrated" class="uk-display-block">
												<i class="mdi mdi-heart-outline"></i>
											</span>
										</transition>
									</div>
								</div>
							</div>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { scHelpers, scFakeData } from "~/assets/js/utils";
const { uniqueID } = scHelpers;
const { sentence } = scFakeData;

export default {
	name: 'PagesGallery',
	data: () => ({
		rating: {}
	}),
	computed: {
		photos () {
			let photos = [];
			[
				'ray-hennessy-763310-unsplash', 'daria-kopylova-766667-unsplash', 'casey-horner-768005-unsplash', 'urban-sanden-768851-unsplash', 'steve-roe-763192-unsplash',
				'wynand-van-poortvliet-761831-unsplash', 'rodion-kutsaev-760882-unsplash', 'san-fermin-pamplona-navarra-768251-unsplash', 'shane-young-768821-unsplash',
				'avantgarde-concept-763896-unsplash', 'eiliv-aceron-765897-unsplash', 'pietro-mattia-764559-unsplash', 'rachel-park-366508-unsplash',
				'alex-guillaume-769172-unsplash', 'ciaran-o-brien-769402-unsplash', 'paula-brustur-766878-unsplash', 'briana-tozour-756151-unsplash'
			].forEach((k, index) => {
				let id = uniqueID();
				photos.push({
					id: id,
					large: require('~/assets/img/photos/' + k + '.jpg'),
					small: require('~/assets/img/photos/' + k + '_md.jpg'),
					small2x: require('~/assets/img/photos/' + k + '_md@2x.jpg'),
					desc: sentence({ words: 10 }),
					like: index === 0 || index === 2
				});
			});
			return photos;
		}
	},
	watch: {
		sidebarMainExpanded () {
			setTimeout(() => {
				UIkit.update(document.getElementById('sc-gallery-grid'));
			}, 150);
		}
	},
	mounted () {
		let self = this;
		this.photos.forEach(obj => {
			self.$set(self.rating, obj.id, obj.like)
		});
		setTimeout(() => {
			UIkit.update(document.getElementById('sc-gallery-grid'));
		}, 100);
	},
	methods: {
		ratePhoto (photo) {
			let like = this.rating[photo.id];
			this.$set(this.rating, photo.id, !like)
		}
	}
}
</script>
