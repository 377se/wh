<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
					<div class="uk-position-relative uk-visible-toggle uk-light" data-uk-slider>
						<ul class="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-grid">
							<li>
								<img :src="image1_md" alt="">
							</li>
							<li>
								<img :src="image2_md" alt="">
							</li>
							<li>
								<img :src="image3_md" alt="">
							</li>
							<li>
								<img :src="image4_md" alt="">
							</li>
							<li>
								<img :src="image5_md" alt="">
							</li>
							<li>
								<img :src="image6_md" alt="">
							</li>
						</ul>
						<a class="uk-position-center-left uk-position-small uk-hidden-hover" href="javascript:void(0)" data-uk-slidenav-previous data-uk-slider-item="previous"></a>
						<a class="uk-position-center-right uk-position-small uk-hidden-hover" href="javascript:void(0)" data-uk-slidenav-next data-uk-slider-item="next"></a>
					</div>
				</ScCardBody>
			</ScCard>
			<ScCard class="uk-margin-top">
				<ScCardTitle>
					Small Gutter
				</ScCardTitle>
				<ScCardBody>
					<div class="uk-position-relative uk-visible-toggle uk-light" data-uk-slider>
						<ul class="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-grid uk-grid-small">
							<li>
								<img :src="image1_md" alt="">
							</li>
							<li>
								<img :src="image2_md" alt="">
							</li>
							<li>
								<img :src="image3_md" alt="">
							</li>
							<li>
								<img :src="image4_md" alt="">
							</li>
							<li>
								<img :src="image5_md" alt="">
							</li>
							<li>
								<img :src="image6_md" alt="">
							</li>
						</ul>
						<a class="uk-position-center-left uk-position-small uk-hidden-hover" href="javascript:void(0)" data-uk-slidenav-previous data-uk-slider-item="previous"></a>
						<a class="uk-position-center-right uk-position-small uk-hidden-hover" href="javascript:void(0)" data-uk-slidenav-next data-uk-slider-item="next"></a>
					</div>
				</ScCardBody>
			</ScCard>
			<ScCard class="uk-margin-top">
				<ScCardTitle>
					Medium Gutter
				</ScCardTitle>
				<ScCardBody>
					<div class="uk-position-relative uk-visible-toggle uk-light" data-uk-slider>
						<ul class="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-grid uk-grid-medium">
							<li>
								<img :src="image1_md" alt="">
							</li>
							<li>
								<img :src="image2_md" alt="">
							</li>
							<li>
								<img :src="image3_md" alt="">
							</li>
							<li>
								<img :src="image4_md" alt="">
							</li>
							<li>
								<img :src="image5_md" alt="">
							</li>
							<li>
								<img :src="image6_md" alt="">
							</li>
						</ul>
						<a class="uk-position-center-left uk-position-small uk-hidden-hover" href="javascript:void(0)" data-uk-slidenav-previous data-uk-slider-item="previous"></a>
						<a class="uk-position-center-right uk-position-small uk-hidden-hover" href="javascript:void(0)" data-uk-slidenav-next data-uk-slider-item="next"></a>
					</div>
				</ScCardBody>
			</ScCard>
			<div class="uk-margin-top uk-position-relative uk-visible-toggle sc-padding-small" data-uk-slider="autoplay: true;autoplay-interval: 3000">
				<ul class="uk-slider-items uk-child-width-1-2@m uk-child-width-1-4@l uk-grid" data-uk-grid>
					<li>
						<ScCard class="uk-position-relative">
							<ScCardHeader>
								<ScCardTitle>
									Title
								</ScCardTitle>
								<ScCardMeta>
									<time datetime="2019-04-01T19:00">
										April 01, 2019
									</time>
								</ScCardMeta>
							</ScCardHeader>
							<ScPhoto :image-id="9"></ScPhoto>
							<ScCardBody>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
							</ScCardBody>
						</ScCard>
					</li>
					<li>
						<ScCard class="uk-position-relative">
							<ScCardHeader>
								<ScCardTitle>
									Title
								</ScCardTitle>
								<ScCardMeta>
									<time datetime="2019-04-01T19:00">
										April 01, 2019
									</time>
								</ScCardMeta>
							</ScCardHeader>
							<ScPhoto :image-id="1"></ScPhoto>
							<ScCardBody>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
							</ScCardBody>
						</ScCard>
					</li>
					<li>
						<ScCard class="uk-position-relative">
							<ScCardHeader>
								<ScCardTitle>
									Title
								</ScCardTitle>
								<ScCardMeta>
									<time datetime="2019-04-01T19:00">
										April 01, 2019
									</time>
								</ScCardMeta>
							</ScCardHeader>
							<ScPhoto :image-id="4"></ScPhoto>
							<ScCardBody>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
							</ScCardBody>
						</ScCard>
					</li>
					<li>
						<ScCard class="uk-position-relative">
							<ScCardHeader>
								<ScCardTitle>
									Title
								</ScCardTitle>
								<ScCardMeta>
									<time datetime="2019-04-01T19:00">
										April 01, 2019
									</time>
								</ScCardMeta>
							</ScCardHeader>
							<ScPhoto :image-id="8"></ScPhoto>
							<ScCardBody>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
							</ScCardBody>
						</ScCard>
					</li>
					<li>
						<ScCard class="uk-position-relative">
							<ScCardHeader>
								<ScCardTitle>
									Title
								</ScCardTitle>
								<ScCardMeta>
									<time datetime="2019-04-01T19:00">
										April 01, 2019
									</time>
								</ScCardMeta>
							</ScCardHeader>
							<ScPhoto :image-id="16"></ScPhoto>
							<ScCardBody>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
							</ScCardBody>
						</ScCard>
					</li>
					<li>
						<ScCard class="uk-position-relative">
							<ScCardHeader>
								<ScCardTitle>
									Title
								</ScCardTitle>
								<ScCardMeta>
									<time datetime="2019-04-01T19:00">
										April 01, 2019
									</time>
								</ScCardMeta>
							</ScCardHeader>
							<ScPhoto :image-id="10"></ScPhoto>
							<ScCardBody>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
							</ScCardBody>
						</ScCard>
					</li>
					<li>
						<ScCard class="uk-position-relative">
							<ScCardHeader>
								<ScCardTitle>
									Title
								</ScCardTitle>
								<ScCardMeta>
									<time datetime="2019-04-01T19:00">
										April 01, 2019
									</time>
								</ScCardMeta>
							</ScCardHeader>
							<ScPhoto :image-id="14"></ScPhoto>
							<ScCardBody>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
							</ScCardBody>
						</ScCard>
					</li>
				</ul>
				<a class="uk-position-center-left uk-position-small uk-hidden-hover" href="javascript:void(0)" data-uk-slidenav-previous data-uk-slider-item="previous"></a>
				<a class="uk-position-center-right uk-position-small uk-hidden-hover" href="javascript:void(0)" data-uk-slidenav-next data-uk-slider-item="next"></a>
			</div>
			<div class="uk-flex-center uk-margin-top" data-uk-grid>
				<div class="uk-width-2-3@m">
					<ScCard>
						<ScCardTitle>
							Center mode
						</ScCardTitle>
						<ScCardBody>
							<div class="uk-position-relative uk-visible-toggle uk-light" data-uk-slider="center: true">
								<ul class="uk-slider-items uk-grid">
									<li class="uk-width-3-4">
										<img :src="image1" alt="">
									</li>
									<li class="uk-width-3-4">
										<img :src="image2" alt="">
									</li>
									<li class="uk-width-3-4">
										<img :src="image3" alt="">
									</li>
									<li class="uk-width-3-4">
										<img :src="image4" alt="">
									</li>
									<li class="uk-width-3-4">
										<img :src="image5" alt="">
									</li>
									<li class="uk-width-3-4">
										<img :src="image6" alt="">
									</li>
								</ul>
								<a class="uk-position-center-left uk-position-small uk-hidden-hover" href="javascript:void(0)" data-uk-slidenav-previous data-uk-slider-item="previous"></a>
								<a class="uk-position-center-right uk-position-small uk-hidden-hover" href="javascript:void(0)" data-uk-slidenav-next data-uk-slider-item="next"></a>
							</div>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ScPhoto from '~/components/Photo'

export default {
	name: 'ComponentsSlider',
	components: {
		ScPhoto
	},
	computed: {
		image1_md () {
			return require('~/assets/img/photos/avantgarde-concept-763896-unsplash_md.jpg')
		},
		image2_md () {
			return require('~/assets/img/photos/pietro-mattia-764559-unsplash_md.jpg')
		},
		image3_md () {
			return require('~/assets/img/photos/alex-guillaume-769172-unsplash_md.jpg')
		},
		image4_md () {
			return require('~/assets/img/photos/rachel-park-366508-unsplash_md.jpg')
		},
		image5_md () {
			return require('~/assets/img/photos/rodion-kutsaev-760882-unsplash_md.jpg')
		},
		image6_md () {
			return require('~/assets/img/photos/wynand-van-poortvliet-761831-unsplash_md.jpg')
		},
		image1 () {
			return require('~/assets/img/photos/avantgarde-concept-763896-unsplash.jpg')
		},
		image2 () {
			return require('~/assets/img/photos/pietro-mattia-764559-unsplash.jpg')
		},
		image3 () {
			return require('~/assets/img/photos/alex-guillaume-769172-unsplash.jpg')
		},
		image4 () {
			return require('~/assets/img/photos/rachel-park-366508-unsplash.jpg')
		},
		image5 () {
			return require('~/assets/img/photos/rodion-kutsaev-760882-unsplash.jpg')
		},
		image6 () {
			return require('~/assets/img/photos/wynand-van-poortvliet-761831-unsplash.jpg')
		}
	}
}
</script>
