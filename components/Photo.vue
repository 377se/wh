<template>
	<img :src="imageSrc" :alt="imageAlt">
</template>

<script>
const photos = [ 'alex-guillaume-769172-unsplash', 'avantgarde-concept-763896-unsplash', 'briana-tozour-756151-unsplash', 'casey-horner-768005-unsplash', 'ciaran-o-brien-769402-unsplash', 'daria-kopylova-766667-unsplash', 'eiliv-aceron-765897-unsplash', 'paula-brustur-766878-unsplash', 'pietro-mattia-764559-unsplash', 'rachel-park-366508-unsplash', 'ray-hennessy-763310-unsplash', 'rodion-kutsaev-760882-unsplash', 'san-fermin-pamplona-navarra-768251-unsplash', 'shane-young-768821-unsplash', 'steve-roe-763192-unsplash', 'urban-sanden-768851-unsplash', 'wynand-van-poortvliet-761831-unsplash' ];

export default {
	name: 'ScPhoto',
	props: {
		imageId: {
			type: Number,
			default: 1
		},
		size: {
			type: String,
			default: ''
		},
		imageAlt: {
			type: String,
			default: ''
		}
	},
	computed: {
		'imageSrc' () {
			let size = this.size ? '_' + this.size : '';
			return require('~/assets/img/photos/' + photos[this.imageId] + size + '.jpg')
		}
	}
}
</script>
