<template>
	<div class="sc-uploader">
		<div v-show="!imageData" class="sc-uploader-btn">
			<input
				id="fileinput"
				ref="fileinput"
				type="file"
				accept="image/*"
				class="sc-uploader-input"
				@change="previewImage"
			>
			<label for="fileinput">
				<i class="mdi mdi-upload"></i>
			</label>
		</div>
		<template v-if="imageData">
			<label for="fileinput" class="sc-uploader-btn">
				<i class="mdi mdi-reload"></i>
			</label>
			<span class="sc-uploader-btn sc-uploader-btn-remove" @click.prevent="removeImage">
				<i class="mdi mdi-trash-can-outline md-color-red-500"></i>
			</span>
		</template>
		<div v-if="imageData" class="sc-uploader-preview">
			<img :src="imageData" alt="">
		</div>
		<div v-else class="sc-uploader-preview">
			<img :src="require('~/assets/img/blank.gif')" alt="">
		</div>
	</div>
</template>

<script>
export default {
	props: {
		image: {
			type: String,
			default: () => {}
		}
	},
	data: () => ({
		imageData: null
	}),
	mounted () {
		if (this.image) {
			this.imageData = this.image;
		}
	},
	methods: {
		previewImage (event) {
			var input = event.target;
			if (input.files && input.files[0]) {
				var reader = new FileReader();
				reader.onload = (e) => {
					this.imageData = e.target.result;
				}
				reader.readAsDataURL(input.files[0]);
			}
		},
		removeImage () {
			this.imageData = null
			this.$refs.fileinput.value = ''
		}
	}
}
</script>

<style lang="scss">
	@import '~/assets/scss/components/_uploader.scss';
</style>
