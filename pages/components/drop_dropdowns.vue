<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardTitle>
							Drop
						</ScCardTitle>
						<ScCardBody>
							<div class="uk-inline">
								<button class="sc-button sc-button-default sc-button-outline" type="button">
									Hover
								</button>
								<div data-uk-drop>
									<ScCard>
										<ScCardBody>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
										</ScCardBody>
									</ScCard>
								</div>
							</div>
							<div class="uk-inline">
								<button class="sc-button sc-button-default sc-button-outline" type="button">
									Click
								</button>
								<div data-uk-drop="mode: click">
									<ScCard>
										<ScCardBody>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
										</ScCardBody>
									</ScCard>
								</div>
							</div>
							<hr>
							<div class="uk-child-width-1-2@m" data-uk-grid>
								<div>
									<p class="sc-text-semibold uk-margin-small">
										Grid in drop
									</p>
									<button class="sc-button sc-button-default sc-button-outline" type="button">
										Hover
									</button>
									<div class="uk-width-large" data-uk-drop>
										<ScCard>
											<ScCardBody>
												<div class="uk-drop-grid uk-child-width-1-3@s uk-grid-small uk-grid-divider" data-uk-grid>
													<div>
														Lorem ipsum dolor sit amet, consectetur adipisicing elit.
													</div>
													<div>
														Lorem ipsum dolor sit amet, consectetur adipisicing elit.
													</div>
													<div>
														Lorem ipsum dolor sit amet, consectetur adipisicing elit.
													</div>
												</div>
											</ScCardBody>
										</ScCard>
									</div>
								</div>
								<div>
									<p class="sc-text-semibold uk-margin-small">
										Custom drop
									</p>
									<div class="uk-inline">
										<button class="sc-button sc-button-default sc-button-outline" type="button">
											Hover
										</button>
										<div data-uk-drop>
											<div class="md-bg-red-500 sc-padding sc-light sc-round uk-box-shadow-medium">
												<h3>Heading</h3>
												Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi distinctio doloremque facilis itaque nesciunt quos sapiente sed sit unde, voluptates.
											</div>
										</div>
									</div>
								</div>
							</div>
							<hr>
							<p class="sc-text-semibold uk-margin-small">
								Position
							</p>
							<div v-for="(position,index) in positions" :key="index" class="uk-child-width-auto@s uk-grid-small" data-uk-grid>
								<div v-for="variant in position" :key="variant">
									<button class="sc-button sc-button-default sc-button-outline" type="button">
										{{ variant }}
									</button>
									<div data-uk-drop :pos="variant">
										<ScCard>
											<ScCardBody>
												Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
											</ScCardBody>
										</ScCard>
									</div>
								</div>
							</div>
							<hr>
							<p class="sc-text-semibold uk-margin-small">
								Boundry
							</p>
							<div class="uk-inline">
								<button class="sc-button sc-button-default sc-button-outline" type="button">
									Hover
								</button>
								<div data-uk-drop="boundary: .uk-card-body">
									<ScCard>
										<ScCardBody>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
										</ScCardBody>
									</ScCard>
								</div>
							</div>
							<pre class="sc-js-highlight"><code>&lt;div data-uk-drop=&quot;boundary: .uk-card-body&quot;&gt;&lt;/div&gt;</code></pre>
							<div class="uk-height-small uk-placeholder drop-boundry sc-padding">
								<div class="uk-flex">
									<div class="uk-flex-1">
										<button class="sc-button sc-button-default sc-button-outline" type="button">
											Hover
										</button>
										<div data-uk-drop="pos: top-justify; boundary: .drop-boundry; boundary-align: true">
											<ScCard>
												<ScCardBody>
													Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
												</ScCardBody>
											</ScCard>
										</div>
									</div>
									<div>
										<button class="sc-button sc-button-default sc-button-outline" type="button">
											Hover
										</button>
										<div data-uk-drop="pos: top-center; boundary: .drop-boundry; boundary-align: true">
											<ScCard>
												<ScCardBody>
													Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
												</ScCardBody>
											</ScCard>
										</div>
									</div>
								</div>
							</div>
							<pre class="sc-js-highlight"><code>&lt;div data-uk-drop=&quot;pos: top-justify; boundary: .drop-boundry; boundary-align: true&quot;&gt;
&lt;div data-uk-drop=&quot;pos: top-center; boundary: .drop-boundry; boundary-align: true&quot;&gt;
</code></pre>
							<hr>
							<p class="sc-text-semibold uk-margin-small">
								Offset
							</p>
							<div class="uk-inline">
								<button class="sc-button sc-button-default sc-button-outline" type="button">
									Hover
								</button>
								<div data-uk-drop="pos: top-left; offset: 36">
									<ScCard>
										<ScCardBody>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
										</ScCardBody>
									</ScCard>
								</div>
							</div>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Dropdown
						</ScCardTitle>
						<ScCardBody>
							<div class="uk-inline">
								<button class="sc-button sc-button-default sc-button-outline" type="button">
									Hover
								</button>
								<div data-uk-dropdown>
									<div class="sc-padding">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, vel?
									</div>
								</div>
							</div>
							<div class="uk-inline">
								<button class="sc-button sc-button-default sc-button-outline" type="button">
									Click
								</button>
								<div data-uk-dropdown="mode: click">
									<div class="sc-padding">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda ex illo ratione.
									</div>
								</div>
							</div>
							<hr>
							<p class="sc-text-semibold uk-margin-small">
								Nav
							</p>
							<div data-uk-margin>
								<div class="uk-inline">
									<button class="sc-button sc-button-default sc-button-outline" type="button">
										small
									</button>
									<div class="uk-dropdown-small" data-uk-dropdown>
										<ul class="uk-nav uk-dropdown-nav">
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
											<li class="uk-nav-header">
												Header
											</li>
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
											<li class="uk-nav-divider"></li>
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
										</ul>
									</div>
								</div>
								<div class="uk-inline">
									<button class="sc-button sc-button-default sc-button-outline" type="button">
										default
									</button>
									<div data-uk-dropdown>
										<ul class="uk-nav uk-dropdown-nav">
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
											<li class="uk-nav-header">
												Header
											</li>
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
											<li class="uk-nav-divider"></li>
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
										</ul>
									</div>
								</div>
								<div class="uk-inline">
									<button class="sc-button sc-button-default sc-button-outline" type="button">
										medium
									</button>
									<div data-uk-dropdown>
										<ul class="uk-nav uk-dropdown-nav uk-dropdown-medium">
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
											<li class="uk-nav-header">
												Header
											</li>
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
											<li class="uk-nav-divider"></li>
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
										</ul>
									</div>
								</div>
								<div class="uk-inline">
									<button class="sc-button sc-button-default sc-button-outline" type="button">
										large
									</button>
									<div data-uk-dropdown>
										<ul class="uk-nav uk-dropdown-nav uk-dropdown-large">
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
											<li class="uk-nav-header">
												Header
											</li>
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
											<li class="uk-nav-divider"></li>
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<hr>
							<p class="sc-text-semibold uk-margin-small">
								Grid in dropdown
							</p>
							<button class="sc-button sc-button-default sc-button-outline" type="button">
								Hover
							</button>
							<div class="uk-width-large" data-uk-dropdown>
								<div class="uk-dropdown-grid uk-child-width-1-2@s uk-grid-small" data-uk-grid>
									<div>
										<ul class="uk-nav uk-dropdown-nav">
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
											<li class="uk-nav-header">
												Header
											</li>
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
											<li class="uk-nav-divider"></li>
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
										</ul>
									</div>
									<div>
										<ul class="uk-nav uk-dropdown-nav">
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
											<li class="uk-nav-header">
												Header
											</li>
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
											<li class="uk-nav-divider"></li>
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<hr>
							<p class="sc-text-semibold uk-margin-small">
								Position
							</p>
							<div v-for="(position, index) in positions" :key="index" class="uk-child-width-auto@s uk-grid-small" data-uk-grid>
								<div v-for="variant in position" :key="variant">
									<button class="sc-button sc-button-default sc-button-outline" type="button">
										{{ variant }}
									</button>
									<div data-uk-dropdown :pos="variant">
										<ul class="uk-nav uk-dropdown-nav">
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<hr>
							<p class="sc-text-semibold uk-margin-small">
								Boundry
							</p>
							<div class="uk-height-small uk-placeholder dropdown-boundry-a sc-padding">
								<div class="uk-inline">
									<button class="sc-button sc-button-default sc-button-outline" type="button">
										Hover
									</button>
									<div data-uk-dropdown="boundary: .dropdown-boundry-a">
										<ul class="uk-nav uk-dropdown-nav">
											<li class="uk-nav-header">
												Header
											</li>
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
											<li>
												<a href="javascript:void(0)">
													Item
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<pre class="sc-js-highlight"><code>&lt;div data-uk-dropdown=&quot;boundary: .uk-card-body&quot;&gt;&lt;/div&gt;</code></pre>
							<div class="uk-height-small uk-placeholder dropdown-boundry-b sc-padding">
								<div class="uk-flex">
									<div class="uk-flex-1">
										<button class="sc-button sc-button-default sc-button-outline" type="button">
											Hover
										</button>
										<div data-uk-dropdown="pos: top-justify; boundary: .dropdown-boundry-b; boundary-align: true">
											<ul class="uk-nav uk-dropdown-nav">
												<li class="uk-nav-header">
													Header
												</li>
												<li>
													<a href="javascript:void(0)">
														Item
													</a>
												</li>
												<li>
													<a href="javascript:void(0)">
														Item
													</a>
												</li>
												<li>
													<a href="javascript:void(0)">
														Item
													</a>
												</li>
											</ul>
										</div>
									</div>
									<div>
										<button class="sc-button sc-button-default sc-button-outline" type="button">
											Hover
										</button>
										<div data-uk-dropdown="pos: top-center; boundary: .dropdown-boundry-b; boundary-align: true">
											<ul class="uk-nav uk-dropdown-nav">
												<li class="uk-nav-header">
													Header
												</li>
												<li>
													<a href="javascript:void(0)">
														Item
													</a>
												</li>
												<li>
													<a href="javascript:void(0)">
														Item
													</a>
												</li>
												<li>
													<a href="javascript:void(0)">
														Item
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<hr>
							<p class="sc-text-semibold uk-margin-small">
								Offset
							</p>
							<div class="uk-inline">
								<button class="sc-button sc-button-default sc-button-outline" type="button">
									Hover
								</button>
								<div data-uk-dropdown="pos: top-left; offset: 36">
									<ul class="uk-nav uk-dropdown-nav">
										<li class="uk-nav-header">
											Header
										</li>
										<li>
											<a href="javascript:void(0)">
												Item
											</a>
										</li>
										<li>
											<a href="javascript:void(0)">
												Item
											</a>
										</li>
										<li>
											<a href="javascript:void(0)">
												Item
											</a>
										</li>
									</ul>
								</div>
							</div>
							<hr>
							<p class="sc-text-semibold uk-margin-small">
								Animation
							</p>
							<div class="uk-inline">
								<button class="sc-button sc-button-default sc-button-outline" type="button">
									fade
								</button>
								<div data-uk-dropdown="pos: top-left; animation: uk-animation-fade">
									<ul class="uk-nav uk-dropdown-nav">
										<li class="uk-nav-header">
											Header
										</li>
										<li>
											<a href="javascript:void(0)">
												Item
											</a>
										</li>
										<li>
											<a href="javascript:void(0)">
												Item
											</a>
										</li>
										<li>
											<a href="javascript:void(0)">
												Item
											</a>
										</li>
									</ul>
								</div>
							</div>
							<div class="uk-inline">
								<button class="sc-button sc-button-default sc-button-outline" type="button">
									shake
								</button>
								<div data-uk-dropdown="pos: top-left; animation: uk-animation-shake">
									<ul class="uk-nav uk-dropdown-nav">
										<li class="uk-nav-header">
											Header
										</li>
										<li>
											<a href="javascript:void(0)">
												Item
											</a>
										</li>
										<li>
											<a href="javascript:void(0)">
												Item
											</a>
										</li>
										<li>
											<a href="javascript:void(0)">
												Item
											</a>
										</li>
									</ul>
								</div>
							</div>
							<div class="uk-inline">
								<button class="sc-button sc-button-default sc-button-outline" type="button">
									scale down
								</button>
								<div data-uk-dropdown="pos: top-left; animation: uk-animation-scale-down">
									<ul class="uk-nav uk-dropdown-nav">
										<li class="uk-nav-header">
											Header
										</li>
										<li>
											<a href="javascript:void(0)">
												Item
											</a>
										</li>
										<li>
											<a href="javascript:void(0)">
												Item
											</a>
										</li>
										<li>
											<a href="javascript:void(0)">
												Item
											</a>
										</li>
									</ul>
								</div>
							</div>
							<hr>
							<p class="sc-text-semibold uk-margin-small">
								Hide on menu item click
							</p>
							<div data-uk-margin>
								<div class="uk-inline">
									<button class="sc-button sc-button-default sc-button-outline" type="button">
										Hover
									</button>
									<div ref="dropdown1" data-uk-dropdown="pos: top-left;delay-hide: 100">
										<ul class="uk-nav uk-dropdown-nav">
											<li class="uk-nav-header">
												Header
											</li>
											<li><a href="javascript:void(0)" @click="hideDropdown($event, 'dropdown1')">Close</a></li>
											<li><a href="javascript:void(0)">Item</a></li>
											<li><a href="javascript:void(0)">Item</a></li>
										</ul>
									</div>
								</div>
								<div class="uk-inline">
									<button class="sc-button sc-button-default sc-button-outline" type="button">
										Click
									</button>
									<div ref="dropdown2" data-uk-dropdown="pos: top-left;delay-hide: 100;mode: click">
										<ul class="uk-nav uk-dropdown-nav">
											<li class="uk-nav-header">
												Header
											</li>
											<li><a href="javascript:void(0)">Item</a></li>
											<li><a href="javascript:void(0)" @click="hideDropdown($event, 'dropdown2')">Close</a></li>
											<li><a href="javascript:void(0)">Item</a></li>
										</ul>
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
export default {
	name: 'ComponentsDropDropdown',
	data: () => ({
		positions: {
			'bottom': ['bottom-left', 'bottom-center', 'bottom-right', 'bottom-justify'],
			'top': ['top-left', 'top-center', 'top-right', 'top-justify'],
			'left': ['left-top', 'left-center', 'left-bottom'],
			'right': ['right-top', 'right-center', 'right-bottom']
		}
	}),
	methods: {
		hideDropdown (e, ref) {
			UIkit.dropdown(this.$refs[ref]).hide();
		}
	}
}
</script>
