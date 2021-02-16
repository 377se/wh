<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
					<div class="uk-child-width-1-3@l uk-child-width-1-2@s uk-grid-divider uk-grid" data-uk-grid>
						<div>
							<p class="uk-text-large uk-margin-medium-bottom">
								Default
							</p>
							<button class="sc-button" type="button" data-uk-toggle="target: #modal-default">
								Open
							</button>
							<div id="modal-default" data-uk-modal>
								<div class="uk-modal-dialog uk-modal-body">
									<h2 class="uk-modal-title">
										Headline
									</h2>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
									<p class="uk-text-right">
										<button class="sc-button sc-button-default sc-button-flat uk-modal-close" type="button">
											Cancel
										</button>
										<button class="sc-button sc-button-primary" type="button">
											Save
										</button>
									</p>
								</div>
							</div>
						</div>
						<div>
							<p class="uk-text-large uk-margin-medium-bottom">
								Close button
							</p>
							<button class="sc-button uk-margin-small-right" type="button" data-uk-toggle="target: #modal-close-default">
								Default
							</button>
							<button class="sc-button" type="button" data-uk-toggle="target: #modal-close-outside">
								Outside
							</button>
							<div id="modal-close-default" class="uk-modal" data-uk-modal>
								<div class="uk-modal-dialog uk-modal-body">
									<button class="uk-modal-close-default" type="button" data-uk-close></button>
									<h2 class="uk-modal-title">
										Headline
									</h2>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
									<p class="uk-text-right">
										<button class="sc-button sc-button-primary" type="button">
											Save
										</button>
									</p>
								</div>
							</div>
							<div id="modal-close-outside" class="uk-modal" data-uk-modal>
								<div class="uk-modal-dialog uk-modal-body">
									<button class="uk-modal-close-outside" type="button" data-uk-close></button>
									<h2 class="uk-modal-title">
										Headline
									</h2>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
									<p class="uk-text-right">
										<button class="sc-button sc-button-primary" type="button">
											Save
										</button>
									</p>
								</div>
							</div>
						</div>
						<div>
							<p class="uk-text-large uk-margin-medium-bottom">
								Center modal
							</p>
							<button class="sc-button" type="button" data-uk-toggle="target: #modal-center">
								Open
							</button>
							<div id="modal-center" class="uk-flex-top uk-modal" data-uk-modal>
								<div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
									Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero ab illo maiores, incidunt delectus qui in, vitae laboriosam minus nihil, quibusdam quidem magnam minima veniam aut nulla aperiam voluptas deleniti quo rem ipsa fugiat! Hic excepturi, cupiditate doloremque sed perferendis dolor, atque reprehenderit possimus officia vitae cum laborum quo! Alias cum, at minima illo corrupti rem quae quos! In, molestiae.
								</div>
							</div>
						</div>
					</div>
					<hr>
					<div class="uk-child-width-1-3@l uk-child-width-1-2@s uk-grid-divider uk-grid" data-uk-grid>
						<div>
							<p class="uk-text-large uk-margin-medium-bottom">
								Header and footer
							</p>
							<a class="sc-button" href="#modal-header-footer" data-uk-toggle>
								Open
							</a>
							<div id="modal-header-footer" class="uk-modal" data-uk-modal>
								<div class="uk-modal-dialog">
									<button class="uk-modal-close-default" type="button" data-uk-close></button>
									<div class="uk-modal-header">
										<h2 class="uk-modal-title">
											Modal Title
										</h2>
									</div>
									<div class="uk-modal-body">
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
									</div>
									<div class="uk-modal-footer uk-text-right">
										<button class="sc-button sc-button-flat sc-button-flat-danger uk-modal-close" type="button">
											Cancel
										</button>
										<button class="sc-button" type="button">
											Save
										</button>
									</div>
								</div>
							</div>
						</div>
						<div>
							<p class="uk-text-large uk-margin-medium-bottom">
								Container modifier
							</p>
							<a class="sc-button" href="#modal-container" data-uk-toggle>
								Open
							</a>
							<div id="modal-container" class="uk-modal-container uk-modal" data-uk-modal>
								<div class="uk-modal-dialog uk-modal-body">
									<button class="uk-modal-close-default" type="button" data-uk-close></button>
									<h2 class="uk-modal-title">
										Headline
									</h2>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
								</div>
							</div>
						</div>
						<div>
							<p class="uk-text-large uk-margin-medium-bottom">
								Full modifier
							</p>
							<a class="sc-button" href="#modal-full" data-uk-toggle>
								Open
							</a>
							<div id="modal-full" class="uk-modal-full uk-modal" data-uk-modal>
								<div class="uk-modal-dialog">
									<button class="uk-modal-close-full uk-close-large" type="button" data-uk-close></button>
									<div class="uk-grid-collapse uk-child-width-1-2@s uk-flex-middle" data-uk-grid>
										<div class="uk-background-cover" :style="{'background-image': 'url(' + bgImage +')'}" data-uk-height-viewport></div>
										<div>
											<div class="sc-padding-large">
												<h1>Headline</h1>
												<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<hr>
					<div class="uk-child-width-1-3@l uk-child-width-1-2@s uk-grid-divider uk-grid" data-uk-grid>
						<div>
							<p class="uk-text-large uk-margin-medium-bottom">
								Overflow
							</p>
							<a class="sc-button" href="#modal-overflow" data-uk-toggle>
								Open
							</a>
							<div id="modal-overflow" class="uk-modal" data-uk-modal>
								<div class="uk-modal-dialog">
									<button class="uk-modal-close-default" type="button" data-uk-close></button>
									<div class="uk-modal-header">
										<h2 class="uk-modal-title">
											Headline
										</h2>
									</div>
									<div class="uk-modal-body" data-uk-overflow-auto>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam nam, molestiae at consequuntur quasi excepturi? Dolor odit assumenda architecto adipisci itaque aut natus suscipit facere nihil vero vitae reiciendis, voluptatum minus non explicabo possimus, recusandae ullam quas magnam enim voluptas!</p>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam nam, molestiae at consequuntur quasi excepturi? Dolor odit assumenda architecto adipisci itaque aut natus suscipit facere nihil vero vitae reiciendis, voluptatum minus non explicabo possimus, recusandae ullam quas magnam enim voluptas!</p>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam nam, molestiae at consequuntur quasi excepturi? Dolor odit assumenda architecto adipisci itaque aut natus suscipit facere nihil vero vitae reiciendis, voluptatum minus non explicabo possimus, recusandae ullam quas magnam enim voluptas!</p>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam nam, molestiae at consequuntur quasi excepturi? Dolor odit assumenda architecto adipisci itaque aut natus suscipit facere nihil vero vitae reiciendis, voluptatum minus non explicabo possimus, recusandae ullam quas magnam enim voluptas!</p>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam nam, molestiae at consequuntur quasi excepturi? Dolor odit assumenda architecto adipisci itaque aut natus suscipit facere nihil vero vitae reiciendis, voluptatum minus non explicabo possimus, recusandae ullam quas magnam enim voluptas!</p>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam nam, molestiae at consequuntur quasi excepturi? Dolor odit assumenda architecto adipisci itaque aut natus suscipit facere nihil vero vitae reiciendis, voluptatum minus non explicabo possimus, recusandae ullam quas magnam enim voluptas!</p>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam nam, molestiae at consequuntur quasi excepturi? Dolor odit assumenda architecto adipisci itaque aut natus suscipit facere nihil vero vitae reiciendis, voluptatum minus non explicabo possimus, recusandae ullam quas magnam enim voluptas!</p>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam nam, molestiae at consequuntur quasi excepturi? Dolor odit assumenda architecto adipisci itaque aut natus suscipit facere nihil vero vitae reiciendis, voluptatum minus non explicabo possimus, recusandae ullam quas magnam enim voluptas!</p>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam nam, molestiae at consequuntur quasi excepturi? Dolor odit assumenda architecto adipisci itaque aut natus suscipit facere nihil vero vitae reiciendis, voluptatum minus non explicabo possimus, recusandae ullam quas magnam enim voluptas!</p>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam nam, molestiae at consequuntur quasi excepturi? Dolor odit assumenda architecto adipisci itaque aut natus suscipit facere nihil vero vitae reiciendis, voluptatum minus non explicabo possimus, recusandae ullam quas magnam enim voluptas!</p>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam nam, molestiae at consequuntur quasi excepturi? Dolor odit assumenda architecto adipisci itaque aut natus suscipit facere nihil vero vitae reiciendis, voluptatum minus non explicabo possimus, recusandae ullam quas magnam enim voluptas!</p>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam nam, molestiae at consequuntur quasi excepturi? Dolor odit assumenda architecto adipisci itaque aut natus suscipit facere nihil vero vitae reiciendis, voluptatum minus non explicabo possimus, recusandae ullam quas magnam enim voluptas!</p>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam nam, molestiae at consequuntur quasi excepturi? Dolor odit assumenda architecto adipisci itaque aut natus suscipit facere nihil vero vitae reiciendis, voluptatum minus non explicabo possimus, recusandae ullam quas magnam enim voluptas!</p>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam nam, molestiae at consequuntur quasi excepturi? Dolor odit assumenda architecto adipisci itaque aut natus suscipit facere nihil vero vitae reiciendis, voluptatum minus non explicabo possimus, recusandae ullam quas magnam enim voluptas!</p>
									</div>
									<hr class="uk-margin-remove">
									<div class="uk-modal-footer">
										<button class="sc-button sc-button-primary" type="button">
											Save
										</button>
									</div>
								</div>
							</div>
						</div>
						<div>
							<p class="uk-text-large uk-margin-medium-bottom">
								Media
							</p>
							<div data-uk-margin>
								<a class="sc-button" href="#modal-media-image" data-uk-toggle>
									Image
								</a>
								<a class="sc-button" href="#modal-media-youtube" data-uk-toggle>
									YouTube
								</a>
								<a class="sc-button" href="#modal-media-vimeo" data-uk-toggle>
									Vimeo
								</a>
							</div>
							<div id="modal-media-image" class="uk-flex-top uk-modal" data-uk-modal>
								<div class="uk-modal-dialog uk-width-auto uk-margin-auto-vertical">
									<button class="uk-modal-close-outside" type="button" data-uk-close></button>
									<img v-rjs="require('~/assets/img/photos/ray-hennessy-763310-unsplash.jpg')" :src="modalImage" alt="">
								</div>
							</div>
							<div id="modal-media-youtube" class="uk-flex-top uk-modal" data-uk-modal>
								<div class="uk-modal-dialog uk-width-auto uk-margin-auto-vertical">
									<button class="uk-modal-close-outside" type="button" data-uk-close></button>
									<iframe width="560"
										height="315"
										src="https://www.youtube-nocookie.com/embed/By6sZ6RGCEQ"
										frameborder="0"
										allow="autoplay; encrypted-media"
										allowfullscreen
										data-uk-video
									></iframe>
								</div>
							</div>
							<div id="modal-media-vimeo" class="uk-flex-top uk-modal" data-uk-modal>
								<div class="uk-modal-dialog uk-width-auto uk-margin-auto-vertical">
									<button class="uk-modal-close-outside" type="button" data-uk-close></button>
									<iframe src="https://player.vimeo.com/video/289371414"
										width="530"
										height="315"
										frameborder="0"
										data-uk-video
									></iframe>
								</div>
							</div>
						</div>
						<div>
							<p class="uk-text-large uk-margin-medium-bottom">
								Groups
							</p>
							<div data-uk-margin>
								<a class="sc-button" href="#modal-group-1" data-uk-toggle>
									Modal 1
								</a>
								<a class="sc-button" href="#modal-group-2" data-uk-toggle>
									Modal 2
								</a>
							</div>
							<div id="modal-group-1" class="uk-modal" data-uk-modal>
								<div class="uk-modal-dialog">
									<div class="uk-modal-header">
										<h2 class="uk-modal-title">
											Modal 1
										</h2>
									</div>
									<div class="uk-modal-body">
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
									</div>
									<div class="uk-modal-footer uk-text-right">
										<button class="sc-button sc-button-flat sc-button-flat-danger uk-modal-close" type="button">
											Cancel
										</button>
										<a href="#modal-group-2" class="sc-button sc-button-secondary" data-uk-toggle>
											Modal 2
										</a>
									</div>
								</div>
							</div>
							<div id="modal-group-2" class="uk-modal" data-uk-modal>
								<div class="uk-modal-dialog">
									<div class="uk-modal-header">
										<h2 class="uk-modal-title">
											Modal 2
										</h2>
									</div>
									<div class="uk-modal-body">
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
									</div>
									<div class="uk-modal-footer uk-text-right">
										<button class="sc-button sc-button-flat sc-button-flat-danger uk-modal-close" type="button">
											Cancel
										</button>
										<a href="#modal-group-1" class="sc-button sc-button-secondary" data-uk-toggle>
											Modal 1
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</ScCardBody>
			</ScCard>
			<h4 class="uk-heading-line uk-margin-large-top">
				<span>Modal dialogs</span>
			</h4>
			<ScCard>
				<ScCardBody>
					<div class="uk-child-width-1-4@l uk-child-width-1-2@m uk-grid-divider uk-grid" data-uk-grid>
						<div>
							<p class="uk-text-large uk-margin-medium-bottom">
								Dialog
							</p>
							<a class="sc-button" href="javascript:void(0)" @click="openDialog('dialog')">
								Open
							</a>
						</div>
						<div>
							<p class="uk-text-large uk-margin-medium-bottom">
								Alert
							</p>
							<a class="sc-button" href="javascript:void(0)" @click="openDialog('alert')">
								Open
							</a>
						</div>
						<div>
							<p class="uk-text-large uk-margin-medium-bottom">
								Confirm
							</p>
							<a class="sc-button" href="javascript:void(0)" @click="openDialog('confirm')">
								Open
							</a>
						</div>
						<div>
							<p class="uk-text-large uk-margin-medium-bottom">
								Prompt
							</p>
							<a class="sc-button" href="javascript:void(0)" @click="openDialog('prompt')">
								Open
							</a>
							<div class="uk-margin-small-top">
								<span class="uk-text-muted">Your Name:</span> {{ promptName }}
							</div>
						</div>
					</div>
				</ScCardBody>
			</ScCard>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ComponentsModalsDialogs',
	data: () => ({
		promptName: ''
	}),
	computed: {
		bgImage () {
			return require('~/assets/img/photos/briana-tozour-756151-unsplash.jpg')
		},
		modalImage () {
			return require('~/assets/img/photos/ray-hennessy-763310-unsplash.jpg')
		}
	},
	methods: {
		openDialog (type) {
			var self = this;
			if(type === 'dialog') {
				UIkit.modal.dialog('<p class="uk-modal-body">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate enim consequuntur, saepe mollitia aliquam quia, delectus cum, nobis quisquam ipsam rerum excepturi repellendus explicabo perspiciatis dolor accusantium! Voluptates, asperiores rerum.</p>');
			}
			if(type === 'alert') {
				UIkit.modal.alert('UIkit alert!').then(function () {
					console.log('Alert closed.')
				})
			}
			if(type === 'confirm') {
				UIkit.modal.confirm('UIkit confirm!').then(function () {
					console.log('Confirmed.')
				}, function () {
					console.log('Rejected.')
				})
			}
			if(type === 'prompt') {
				UIkit.modal.prompt('Name:', self.promptName).then(function (name) {
					// console.log('Prompted: ', name)
					self.promptName = name
				})
			}
		}
	}
}
</script>
