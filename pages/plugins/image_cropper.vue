<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-grid" data-uk-grid>
				<div class="uk-width-2-3@l">
					<ScCard>
						<ScCardBody>
							<div id="sc-cropper-container">
								<client-only>
									<VueCropper
										ref="cropper"
										:src="imgSrc"
										alt="Source Image"
										:drag-mode="dragMode"
										:cropend="cropImage"
										:ready="cropImage"
									></VueCropper>
								</client-only>
							</div>
							<div class="sc-cropper-buttons uk-margin-top">
								<div class="uk-flex uk-flex-wrap uk-flex-top" data-uk-margin>
									<div class="uk-button-group uk-margin-small-right">
										<button
											type="button"
											class="sc-button sc-button-primary sc-button-icon sc-button-radio"
											title="Move"
											:class="{ 'uk-active' : dragMode === 'move' }"
											@click="changeDragMode('move')"
										>
											<span class="mdi mdi-arrow-all"></span>
										</button>
										<button
											type="button"
											class="sc-button sc-button-primary sc-button-icon sc-button-radio"
											title="Crop"
											:class="{ 'uk-active' : dragMode === 'crop' }"
											@click="changeDragMode('crop')"
										>
											<span class="mdi mdi-crop"></span>
										</button>
									</div>
									<div class="uk-button-group uk-margin-small-right">
										<button
											type="button"
											class="sc-button sc-button-primary sc-button-icon"
											title="Zoom In"
											@click="zoom(0.1)"
										>
											<span class="mdi mdi-magnify-plus-outline"></span>
										</button>
										<button
											type="button"
											class="sc-button sc-button-primary sc-button-icon"
											title="Zoom Out"
											@click="zoom(-0.1)"
										>
											<span class="mdi mdi-magnify-minus-outline"></span>
										</button>
									</div>
									<div class="uk-button-group sc-buttons-stacked@s uk-margin-small-right">
										<button
											type="button"
											class="sc-button sc-button-primary sc-button-icon"
											title="Move Left"
											@click="move(-10,0)"
										>
											<span class="mdi mdi-arrow-left"></span>
										</button>
										<button
											type="button"
											class="sc-button sc-button-primary sc-button-icon"
											title="Move Right"
											@click="move(10,0)"
										>
											<span class="mdi mdi-arrow-right"></span>
										</button>
										<button
											type="button"
											class="sc-button sc-button-primary sc-button-icon"
											title="Move Up"
											@click="move(0,-10)"
										>
											<span class="mdi mdi-arrow-up"></span>
										</button>
										<button
											type="button"
											class="sc-button sc-button-primary sc-button-icon"
											title="Move Down"
											@click="move(0,10)"
										>
											<span class="mdi mdi-arrow-down"></span>
										</button>
									</div>
									<div class="uk-button-group uk-margin-small-right">
										<button
											type="button"
											class="sc-button sc-button-primary sc-button-icon"
											title="Rotate Left"
											@click="rotate(-45)"
										>
											<span class="mdi mdi-rotate-left"></span>
										</button>
										<button
											type="button"
											class="sc-button sc-button-primary sc-button-icon"
											title="Rotate Right"
											@click="rotate(45)"
										>
											<span class="mdi mdi-rotate-right"></span>
										</button>
									</div>
									<div class="uk-button-group uk-margin-small-right">
										<button
											type="button"
											class="sc-button sc-button-primary sc-button-icon"
											title="Flip Horizontal"
											@click="scaleX(scaleXVal)"
										>
											<span class="mdi mdi-swap-horizontal"></span>
										</button>
										<button
											type="button"
											class="sc-button sc-button-primary sc-button-icon"
											title="Flip Vertical"
											@click="scaleY(scaleYVal)"
										>
											<span class="mdi mdi-swap-vertical"></span>
										</button>
									</div>
									<div class="uk-button-group uk-margin-small-right">
										<button
											type="button"
											class="sc-button sc-button-primary sc-button-icon"
											title="Crop"
											@click="initCrop"
										>
											<span class="mdi mdi-check"></span>
										</button>
										<button
											type="button"
											class="sc-button sc-button-primary sc-button-icon"
											title="Clear"
											@click="clear"
										>
											<span class="mdi mdi-close"></span>
										</button>
									</div>
									<div class="uk-button-group uk-margin-small-right">
										<button
											type="button"
											class="sc-button sc-button-primary sc-button-icon sc-button-radio"
											title="Disable"
											:class="{ 'uk-active' : disabled }"
											@click="disable"
										>
											<span class="mdi mdi-lock-outline"></span>
										</button>
										<button
											type="button"
											class="sc-button sc-button-primary sc-button-icon sc-button-radio"
											title="Enable"
											:class="{ 'uk-active' : !disabled }"
											@click="enable"
										>
											<span class="mdi mdi-lock-open-outline"></span>
										</button>
									</div>
									<div class="uk-button-group">
										<button
											type="button"
											class="sc-button sc-button-primary sc-button-icon"
											title="Reset"
											@click="reset"
										>
											<span class="mdi mdi-refresh"></span>
										</button>
										<button
											type="button"
											class="sc-button sc-button-primary sc-button-icon"
											title="Destroy"
											@click="destroy"
										>
											<span class="mdi mdi-power"></span>
										</button>
									</div>
								</div>
								<div class="uk-flex uk-margin-top">
									<div class="uk-button-group sc-buttons-stacked@m">
										<button type="button"
											class="sc-button sc-button-success"
											title="Get Cropped Canvas"
											@click="getCroppedCanvas('full')"
										>
											Get Cropped Canvas
										</button>
										<button type="button"
											class="sc-button sc-button-success"
											title="Get 320x180 Canvas"
											@click="getCroppedCanvas('medium')"
										>
											320x180
										</button>
										<button type="button"
											class="sc-button sc-button-success"
											title="Get 240x100 Canvas"
											@click="getCroppedCanvas('small')"
										>
											240x100
										</button>
									</div>
								</div>
							</div>
						</ScCardBody>
					</ScCard>
				</div>
				<div class="uk-width-1-3@l">
					<ScCard>
						<ScCardBody>
							<p class="uk-margin-small-bottom">
								Preview:
							</p>
							<div>
								<div class="sc-cropper-preview sc-cropper-preview-lg">
									<img :src="cropImg" style="max-height: 150px;" alt="Cropped Image">
								</div>
							</div>
							<p class="uk-margin-top uk-margin-small-bottom">
								Aspect Ratio:
							</p>
							<div>
								<div class="uk-button-group sc-buttons-stacked@m">
									<button
										type="button"
										class="sc-button sc-button-primary sc-button-radio"
										title="aspectRatio: 16/9"
										:class="{ 'uk-active' : aspectRatio === '16/9' }"
										@click="setAspectRatio(1.7777777777777777, '16/9')"
									>
										16:9
									</button>
									<button
										type="button"
										class="sc-button sc-button-primary sc-button-radio"
										title="aspectRatio: 4/3"
										:class="{ 'uk-active' : aspectRatio === '4/3' }"
										@click="setAspectRatio(1.3333333333333333, '4/3')"
									>
										4:3
									</button>
									<button
										type="button"
										class="sc-button sc-button-primary sc-button-radio"
										title="aspectRatio: 1/1"
										:class="{ 'uk-active' : aspectRatio === '1/1' }"
										@click="setAspectRatio(1, '1/1')"
									>
										1:1
									</button>
									<button
										type="button"
										class="sc-button sc-button-primary sc-button-radio"
										title="aspectRatio: 2/3"
										:class="{ 'uk-active' : aspectRatio === '2/3' }"
										@click="setAspectRatio(0.6666666666666666, '2/3')"
									>
										2:3
									</button>
									<button
										type="button"
										class="sc-button sc-button-primary sc-button-radio"
										title="aspectRatio: NaN"
										:class="{ 'uk-active' : aspectRatio === 'NaN' }"
										@click="setAspectRatio(NaN, 'NaN')"
									>
										Free
									</button>
								</div>
							</div>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
			<div id="getCroppedCanvasModal"
				data-uk-modal
				aria-hidden="true"
				aria-labelledby="sc-getCroppedCanvasTitle"
				role="dialog"
			>
				<div class="uk-modal-dialog">
					<button class="uk-modal-close-default" type="button" data-uk-close></button>
					<div class="uk-modal-header">
						<h2 id="sc-getCroppedCanvasTitle" class="uk-modal-title">
							Cropped Canvas
						</h2>
					</div>
					<div id="croppedCanvasWrapper" class="uk-modal-body uk-text-center"></div>
					<div class="uk-modal-footer uk-text-right">
						<button class="sc-button sc-button-flat sc-button-flat-danger uk-modal-close" type="button">
							Cancel
						</button>
						<a id="croppedCanvasDownload"
							href="javascript:void(0);"
							class="sc-button"
							download="cropped.jpg"
							:disabled="!canDownload"
						>
							Download
						</a>
					</div>
				</div>
			</div>
			<div class="sc-fab-page-wrapper uk-form-custom" data-uk-form-custom>
				<input type="file" name="file" accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff" @change="readImage">
				<button class="sc-fab sc-fab-large sc-fab-danger" type="button" tabindex="-1">
					<i class="mdi mdi-file-upload"></i>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { scHelpers } from '~/assets/js/utils';
const { isHiRes } = scHelpers;

export default {
	name: 'PluginsImageCropper',
	components: {
		VueCropper: process.client ? () => import('vue-cropperjs') : null,
	},
	data: () => ({
		imgSrc: isHiRes ? require('~/assets/img/photos/rachel-park-366508-unsplash@2x.jpg') : require('~/assets/img/photos/rachel-park-366508-unsplash.jpg'),
		cropImg: '',
		dragMode: 'move',
		scaleXVal: -1,
		scaleYVal: -1,
		disabled: false,
		aspectRatio: '16/9',
		canDownload: false
	}),
	methods: {
		cropImage () {
			this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
		},
		changeDragMode (mode) {
			this.dragMode = mode;
			this.$refs.cropper.setDragMode(mode)
		},
		zoom (val) {
			this.$refs.cropper.relativeZoom(val)
		},
		move (o1, o2) {
			this.$refs.cropper.move(o1, o2)
		},
		rotate (deg) {
			this.$refs.cropper.rotate(deg)
		},
		scaleX (val) {
			this.$refs.cropper.scaleX(val);
			this.scaleXVal = val === 1 ? -1 : 1;
		},
		scaleY (val) {
			this.$refs.cropper.scaleY(val);
			this.scaleYVal = val === 1 ? -1 : 1;
		},
		clear () {
			this.$refs.cropper.clear()
		},
		initCrop () {
			this.$refs.cropper.initCrop()
		},
		disable () {
			this.$refs.cropper.disable();
			this.disabled = true;
		},
		enable () {
			this.$refs.cropper.enable();
			this.disabled = false;
		},
		reset () {
			this.$refs.cropper.reset()
		},
		destroy () {
			this.$refs.cropper.destroy()
		},
		getCroppedCanvas (size) {
			let options = null;
			if(size === 'full') {
				options = { "maxWidth": 4096, "maxHeight": 4096 }
			}
			if(size === 'medium') {
				options = { "width": 320, "height": 180 }
			}
			if(size === 'small') {
				options = { "width": 240, "height": 100 }
			}
			document.getElementById('croppedCanvasWrapper').innerHTML = '';
			UIkit.modal('#getCroppedCanvasModal').show();
			const croppedCanvas = this.$refs.cropper.getCroppedCanvas(options);
			document.getElementById('croppedCanvasWrapper').appendChild(croppedCanvas);
			document.getElementById("croppedCanvasDownload").href = croppedCanvas.toDataURL('image/jpeg');
		},
		setAspectRatio (aspectRatio, val) {
			this.$refs.cropper.setAspectRatio(aspectRatio);
			this.aspectRatio = val;
		},
		readImage (e) {
			const file = e.target.files[0];
			if (!file.type.includes('image/')) {
				alert('Please select an image file');
				return;
			}
			if (typeof FileReader === 'function') {
				const reader = new FileReader();
				reader.onload = (event) => {
					this.imgSrc = event.target.result;
					this.$refs.cropper.replace(event.target.result);
				};
				reader.readAsDataURL(file);
			} else {
				alert('Sorry, FileReader API not supported');
			}
		},
	}
}
</script>

<style lang="scss">
	@import '~scss/plugins/cropper';
</style>
