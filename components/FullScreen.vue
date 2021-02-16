<template>
	<a href="javascript:void(0)" @click.stop="toggleFullscreen">
		<i v-if="!appFullscreen" class="mdi mdi-fullscreen"></i><i v-if="appFullscreen" class="mdi mdi-fullscreen-exit"></i>
	</a>
</template>

<script>
export default {
	name: 'ScFullscreen',
	data: () => ({
		appFullscreen: false
	}),
	watch: {
		appFullscreen (state) {
			var elem = document.documentElement;
			if (
				document.fullscreenEnabled ||
					document.webkitFullscreenEnabled ||
					document.mozFullScreenEnabled ||
					document.msFullscreenEnabled
			) {
				if(!this.isFullscreen){
					if (elem.requestFullscreen) {
						elem.requestFullscreen();
						this.isFullscreen = true;
					} else if (elem.webkitRequestFullscreen) {
						elem.webkitRequestFullscreen();
						this.isFullscreen = true;
					} else if (elem.mozRequestFullScreen) {
						elem.mozRequestFullScreen();
						this.isFullscreen = true;
					} else if (elem.msRequestFullscreen) {
						elem.msRequestFullscreen();
						this.isFullscreen = true;
					}
				} else {
					if (document.exitFullscreen) {
						document.exitFullscreen();
						this.isFullscreen = false;
					} else if (document.webkitExitFullscreen) {
						document.webkitExitFullscreen();
						this.isFullscreen = false;
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
						this.isFullscreen = false;
					} else if (document.msExitFullscreen) {
						document.msExitFullscreen();
						this.isFullscreen = false;
					}
				}
			}
		}
	},
	methods: {
		toggleFullscreen (enable) {
			this.appFullscreen = !this.appFullscreen;
		}
	}
}
</script>
