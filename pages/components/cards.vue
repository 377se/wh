<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-child-width-1-2@s uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardTitle>
							Title
						</ScCardTitle>
						<ScCardBody>
							<p>
								Lorem ipsum <a href="javascript:void(0)">
									dolor
								</a> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard hover>
						<ScCardTitle>
							Hover
						</ScCardTitle>
						<ScCardBody>
							<p>
								Lorem ipsum <a href="javascript:void(0)">
									dolor
								</a> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
			<h4 class="uk-margin-bottom uk-margin-large-top uk-heading-line">
				<span>Header & footer</span>
			</h4>
			<div class="uk-child-width-1-3@l uk-child-width-1-2@s uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardHeader separator>
							<div class="uk-flex uk-flex-middle">
								<div class="uk-flex-1">
									<ScCardTitle>
										Best Sellers
									</ScCardTitle>
								</div>
								<div class="sc-actions">
									<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-trash-can-outline"></a>
									<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-dots-vertical"></a>
								</div>
							</div>
						</ScCardHeader>
						<ScCardBody>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid autem corporis est laborum molestiae nostrum officia optio pariatur perspiciatis provident quaerat ratione reprehenderit sequi similique soluta, veritatis voluptate voluptatem voluptates!
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardHeader>
							<div class="uk-grid-small uk-flex-middle uk-grid" data-uk-grid>
								<div class="uk-width-auto">
									<img
										v-rjs="require('~/assets/img/avatars/avatar_default_md@2x.png')"
										class="uk-border-circle"
										width="48"
										height="48"
										:src="avatarImg"
										alt=""
									>
								</div>
								<div class="uk-width-expand">
									<ScCardTitle>
										Title
									</ScCardTitle>
									<ScCardMeta>
										<time datetime="2016-04-01T19:00">
											April 01, 2019
										</time>
									</ScCardMeta>
								</div>
							</div>
						</ScCardHeader>
						<ScCardBody>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
						</ScCardBody>
						<ScCardFooter>
							<a href="javascript:void(0)" class="sc-button">
								Read more
							</a>
						</ScCardFooter>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardHeader class="md-bg-light-green-700 sc-light" separator>
							<ScCardTitle>
								Title
							</ScCardTitle>
							<ScCardMeta>
								Subtitle
							</ScCardMeta>
						</ScCardHeader>
						<ScCardBody>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
						</ScCardBody>
						<ScCardFooter class="md-bg-grey-50" separator>
							<a href="javascript:void(0)" class="sc-button">
								More info
							</a>
						</ScCardFooter>
					</ScCard>
				</div>
				<div>
					<ScCard class="uk-position-relative">
						<ScCardHeader>
							<div class="uk-flex uk-flex-middle">
								<div class="uk-flex-1">
									<ScCardTitle>
										Breakfast
									</ScCardTitle>
									<ScCardMeta>
										<time datetime="2019-04-01T19:00">
											April 01, 2019
										</time>
									</ScCardMeta>
								</div>
								<div class="sc-actions">
									<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-dots-vertical"></a>
								</div>
							</div>
						</ScCardHeader>
						<div class="uk-cover-container uk-height-medium">
							<img v-rjs="require('~/assets/img/photos/rachel-park-366508-unsplash@2x.jpg')" :src="cardImgSrc" alt="rachel-park-366508-unsplash" data-uk-cover>
						</div>
						<ScCardBody>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
						</ScCardBody>
						<ScCardFooter>
							<a href="javascript:void(0)" class="mdi mdi-heart-outline sc-icon-square-large md-color-red-600"></a>
							<a href="javascript:void(0)" class="mdi mdi-share-variant sc-icon-square-large"></a>
						</ScCardFooter>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardHeader class="sc-light uk-margin-medium-bottom uk-cover-container">
							<img v-rjs="getBackgroundImage('wynand-van-poortvliet-761831-unsplash@2x.jpg')" :src="getBackgroundImage('wynand-van-poortvliet-761831-unsplash.jpg')" alt="wynand-van-poortvliet-761831-unsplash" data-uk-cover>
							<ScCardTitle>
								Title
							</ScCardTitle>
							<ScCardMeta>
								Subtitle
							</ScCardMeta>
							<canvas width="100%" height="140px"></canvas>
						</ScCardHeader>
						<ScCardBody>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus expedita necessitatibus omnis quasi quibusdam. Consequuntur eaque esse et eum ipsa itaque laudantium libero magnam, minima modi nulla, odio odit, omnis quibusdam quidem quod reiciendis reprehenderit sunt ullam voluptate. Aperiam nemo nobis quo quos recusandae sint sunt tempora unde vero voluptate. Ad, aliquam animi atque autem beatae cum dignissimos dolor eius ex impedit iusto laboriosam neque pariatur, provident quis repudiandae vero? Aut hic laborum nobis sint totam! A accusantium assumenda at culpa debitis dignissimos esse eveniet fugit iusto minima molestiae necessitatibus non nulla officiis perspiciatis.
						</ScCardBody>
						<ScCardFooter separator>
							<a href="javascript:void(0)" class="sc-button sc-button-default sc-button-flat">
								Read more
							</a>
						</ScCardFooter>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardHeader
							class="sc-light uk-margin-medium-bottom uk-flex uk-cover-container uk-cover-bottom uk-flex-column"
						>
							<img v-rjs="getBackgroundImage('shane-young-768821-unsplash@2x.jpg')" :src="getBackgroundImage('shane-young-768821-unsplash.jpg')" alt="shane-young-768821-unsplash" data-uk-cover>
							<ScCardActions class="uk-flex-right">
								<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-thumb-up-outline"></a>
							</ScCardActions>
							<canvas width="100%" height="120px"></canvas>
						</ScCardHeader>
						<ScCardBody>
							<h3>Title</h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
						</ScCardBody>
						<ScCardFooter separator>
							<a href="javascript:void(0)" class="sc-button sc-button-default sc-button-flat">
								More info
							</a>
							<a href="javascript:void(0)" class="sc-button sc-button-flat md-color-light-blue-500">
								Share
							</a>
						</ScCardFooter>
					</ScCard>
				</div>
			</div>
			<h4 class="uk-margin-bottom uk-margin-large-top uk-heading-line">
				<span>Actions</span>
			</h4>
			<div class="uk-child-width-1-3@l uk-child-width-1-2@m uk-grid" data-uk-grid>
				<div>
					<Transition
						name="scale-up"
						@after-leave="cardCloseCallback"
					>
						<ScCard v-if="!cardAClosed" :collapsed="!cardACollapsed">
							<ScCardHeader>
								<div class="uk-flex uk-flex-middle">
									<div class="uk-flex-1">
										<ScCardTitle>
											Title
										</ScCardTitle>
									</div>
									<ScCardActions>
										<a
											href="javascript:void(0)"
											class="sc-actions-icon mdi"
											:class="{'mdi-window-minimize' : !cardACollapsed, 'mdi-window-maximize' : cardACollapsed }"
											@click.prevent="cardACollapsed = !cardACollapsed"
										></a>
										<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-close" @click.prevent="cardAClosed = true"></a>
									</ScCardActions>
								</div>
							</ScCardHeader>
							<ScTransition name="slideUp">
								<ScCardContent v-show="!cardACollapsed">
									<ScCardBody>
										Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid amet animi atque aut consectetur dolor doloremque eaque eius error esse exercitationem expedita fugiat id ipsa, itaque iusto laudantium maiores modi molestiae nam nesciunt nobis non nostrum numquam obcaecati perferendis provident qui suscipit tempora tempore ut voluptates voluptatum! Ad aut excepturi, fugit harum ipsum quia reiciendis reprehenderit? Aliquam animi consectetur debitis, delectus deleniti doloribus eos eum explicabo facilis hic laudantium maxime molestias, nemo quia quisquam rerum, sapiente sunt. Accusantium, at autem consequatur dolor earum inventore ipsa ipsum, labore nam neque numquam quam quod totam ullam veritatis. Fugit modi molestias quae.
									</ScCardBody>
								</ScCardContent>
							</ScTransition>
						</ScCard>
					</Transition>
				</div>
				<div>
					<ScCard :loading="cardCLoading">
						<ScCardHeader separator>
							<div class="uk-flex uk-flex-middle">
								<div class="uk-flex-1 uk-overflow-hidden">
									<ScCardTitle>
										Title
									</ScCardTitle>
									<ScCardMeta class="uk-text-truncate">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod, voluptatum.
									</ScCardMeta>
								</div>
								<ScCardActions class="uk-margin-left">
									<a
										href="javascript:void(0)"
										class="sc-actions-icon mdi mdi-refresh"
										:class="{'md-color-grey-400': btnDisabled}"
										@click.prevent="loadContent"
									></a>
								</ScCardActions>
							</div>
						</ScCardHeader>
						<ScCardContent :loading="cardCLoading">
							<ScCardBody>
								{{ cardCContent }}
							</ScCardBody>
						</ScCardContent>
					</ScCard>
				</div>
				<div>
					<Transition
						name="scale-up"
						@after-leave="cardCloseCallback"
					>
						<ScCard v-if="!cardDClosed" :collapsed="!cardDCollapsed">
							<ScCardHeader>
								<div class="uk-flex uk-flex-middle">
									<div class="uk-flex-1">
										<ScCardTitle>
											Title
										</ScCardTitle>
									</div>
									<ScCardActions>
										<a
											href="javascript:void(0)"
											class="sc-actions-icon mdi"
											:class="{'mdi-window-minimize' : !cardDCollapsed, 'mdi-window-maximize' : cardDCollapsed }"
											@click.prevent="cardDCollapsed = !cardDCollapsed"
										></a>
										<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-close" @click.prevent="cardDClosed = true"></a>
									</ScCardActions>
								</div>
							</ScCardHeader>
							<ScTransition name="slideUp">
								<ScCardContent v-show="!cardDCollapsed">
									<ScCardBody>
										Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid amet animi atque aut consectetur dolor doloremque eaque eius error esse exercitationem expedita fugiat id ipsa, itaque iusto laudantium maiores modi molestiae nam nesciunt nobis non nostrum numquam obcaecati perferendis provident qui suscipit tempora tempore ut voluptates voluptatum! Ad aut excepturi, fugit harum ipsum quia reiciendis reprehenderit? Aliquam animi consectetur debitis, delectus deleniti doloribus eos eum explicabo facilis hic laudantium maxime molestias, nemo quia quisquam rerum, sapiente sunt. Accusantium, at autem consequatur dolor earum inventore ipsa ipsum, labore nam neque numquam quam quod totam ullam veritatis. Fugit modi molestias quae.
									</ScCardBody>
								</ScCardContent>
							</ScTransition>
						</ScCard>
					</Transition>
				</div>
				<div>
					<ScCard :full-screen="cardBFullScreen">
						<ScCardHeader separator>
							<div class="uk-flex uk-flex-middle">
								<div class="uk-flex-1">
									<ScCardTitle>
										Title
									</ScCardTitle>
									<ScCardMeta>
										<time datetime="2019-01-01">
											Jan 01, 2021
										</time>
									</ScCardMeta>
								</div>
								<ScCardActions>
									<a
										href="javascript:void(0)"
										class="sc-actions-icon mdi mdi-fullscreen"
										:class="{'mdi-fullscreen' : !cardBFullScreen, 'mdi-fullscreen-exit' : cardBFullScreen }"
										@click.prevent="cardBFullScreen = !cardBFullScreen"
									></a>
								</ScCardActions>
							</div>
						</ScCardHeader>
						<ScCardContent>
							<ScCardBody>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid amet animi atque aut consectetur dolor doloremque eaque eius error esse exercitationem expedita fugiat id ipsa, itaque iusto laudantium maiores modi molestiae nam nesciunt nobis non nostrum numquam obcaecati perferendis provident qui suscipit tempora tempore ut voluptates voluptatum! Ad aut excepturi, fugit harum ipsum quia reiciendis reprehenderit? Aliquam animi consectetur debitis, delectus deleniti doloribus eos eum explicabo facilis hic laudantium maxime molestias, nemo quia quisquam rerum, sapiente sunt. Accusantium, at autem consequatur dolor earum inventore ipsa ipsum, labore nam neque numquam quam quod totam ullam veritatis. Fugit modi molestias quae.
								<div class="uk-margin-top sc-card-fs-hidden">
									Content invisible when card is in fullscreen mode.
								</div>
								<div class="sc-card-content-more sc-border-top uk-margin-top sc-padding-top">
									<h4 class="uk-margin-bottom-small">
										Content visible when card is in fullscreen mode.
									</h4>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aperiam at debitis inventore itaque labore nostrum? Aspernatur, consequuntur, rerum. Esse explicabo fugit illo in ipsam iusto laborum, magnam minima non odio, perspiciatis placeat possimus praesentium quidem saepe similique vel voluptatum! Aliquam aspernatur corporis deserunt doloremque est eum fugit illum ipsa maxime minus molestias numquam, obcaecati possimus quas reiciendis sint unde voluptatum? Adipisci corporis culpa delectus, dolore eaque esse hic, ipsam laboriosam, nobis quasi quod ratione repellat repellendus ullam voluptate? Ab amet, atque corporis cupiditate deleniti eaque eius est eum eveniet ex excepturi fugiat in laboriosam minima necessitatibus nemo nisi nulla odio perferendis placeat porro praesentium quae quas quibusdam repellat, rerum sint soluta vitae, voluptatem voluptatum! Consectetur culpa cupiditate, eius maxime neque nobis odit possimus qui reiciendis repellat, sed tempore tenetur veritatis! Aliquam at blanditiis distinctio doloremque eos incidunt iste perspiciatis provident quos rem, repellendus reprehenderit rerum suscipit tempora ullam vero, voluptates? Aliquid blanditiis delectus deleniti, dolor doloribus eum explicabo iste laboriosam nisi nostrum odio odit possimus quidem repellat voluptas? Ab aliquam animi architecto blanditiis delectus dicta dolor doloribus earum, eveniet excepturi expedita inventore maxime minus molestiae nesciunt nihil nisi nulla officia optio provident quasi quis quod rem repellendus soluta veniam.
								</div>
							</ScCardBody>
						</ScCardContent>
					</ScCard>
				</div>
				<div>
					<ScCard :full-screen="cardFFullScreen">
						<ScCardHeader separator>
							<div class="uk-flex uk-flex-middle">
								<a
									href="javascript:void(0)"
									class="sc-actions-icon mdi mdi-arrow-left sc-card-fs-visible uk-margin-right"
									@click.prevent="cardFFullScreen = !cardFFullScreen"
								></a>
								<div class="uk-flex-1">
									<ScCardTitle>
										Title
									</ScCardTitle>
									<ScCardMeta>
										<time datetime="2019-01-01">
											Jan 01, 2021
										</time>
									</ScCardMeta>
								</div>
							</div>
						</ScCardHeader>
						<ScCardContent>
							<ScCardBody>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid amet animi
									atque aut consectetur dolor doloremque eaque eius error esse exercitationem expedita
									fugiat id ipsa, itaque iusto laudantium maiores modi molestiae nam nesciunt nobis
									non nostrum numquam obcaecati perferendis provident qui suscipit tempora tempore ut
									voluptates voluptatum! Ad aut excepturi, fugit harum ipsum quia reiciendis
									reprehenderit? Aliquam animi consectetur debitis, delectus deleniti doloribus eos
									eum explicabo facilis hic laudantium maxime molestias, nemo quia quisquam rerum,
									sapiente sunt. Accusantium, at autem consequatur dolor earum inventore ipsa ipsum,
									labore nam neque numquam quam quod totam ullam veritatis. Fugit modi molestias
									quae.
								</p>
								<a href="javascript:void(0)" class="sc-card-fs-hidden" @click.prevent="cardFFullScreen = !cardFFullScreen">Read more</a>
								<div class="sc-card-content-more sc-border-top uk-margin-top sc-padding-top">
									<h4 class="uk-margin-bottom-small">
										Content visible when card is in fullscreen mode.
									</h4>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aperiam at debitis inventore itaque labore nostrum? Aspernatur, consequuntur, rerum. Esse explicabo fugit illo in ipsam iusto laborum, magnam minima non odio, perspiciatis placeat possimus praesentium quidem saepe similique vel voluptatum! Aliquam aspernatur corporis deserunt doloremque est eum fugit illum ipsa maxime minus molestias numquam, obcaecati possimus quas reiciendis sint unde voluptatum? Adipisci corporis culpa delectus, dolore eaque esse hic, ipsam laboriosam, nobis quasi quod ratione repellat repellendus ullam voluptate? Ab amet, atque corporis cupiditate deleniti eaque eius est eum eveniet ex excepturi fugiat in laboriosam minima necessitatibus nemo nisi nulla odio perferendis placeat porro praesentium quae quas quibusdam repellat, rerum sint soluta vitae, voluptatem voluptatum! Consectetur culpa cupiditate, eius maxime neque nobis odit possimus qui reiciendis repellat, sed tempore tenetur veritatis! Aliquam at blanditiis distinctio doloremque eos incidunt iste perspiciatis provident quos rem, repellendus reprehenderit rerum suscipit tempora ullam vero, voluptates? Aliquid blanditiis delectus deleniti, dolor doloribus eum explicabo iste laboriosam nisi nostrum odio odit possimus quidem repellat voluptas? Ab aliquam animi architecto blanditiis delectus dicta dolor doloribus earum, eveniet excepturi expedita inventore maxime minus molestiae nesciunt nihil nisi nulla officia optio provident quasi quis quod rem repellendus soluta veniam.
								</div>
							</ScCardBody>
						</ScCardContent>
					</ScCard>
				</div>
			</div>

			<h4 class="uk-margin-bottom uk-margin-large-top uk-heading-line">
				<span>Style modifiers</span>
			</h4>
			<div class="uk-child-width-1-3@m uk-grid" data-uk-grid>
				<div>
					<ScCard class="uk-card-primary">
						<ScCardTitle>
							primary
						</ScCardTitle>
						<ScCardBody>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard class="uk-card-secondary">
						<ScCardTitle>
							secondary
						</ScCardTitle>
						<ScCardBody>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard class="md-bg-teal-800 uk-card-light">
						<ScCardTitle>
							teal
						</ScCardTitle>
						<ScCardBody>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard class="md-bg-light-green-800 uk-card-light">
						<ScCardTitle>
							light green
						</ScCardTitle>
						<ScCardBody>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard class="md-bg-purple-800 uk-card-light">
						<ScCardTitle>
							purple
						</ScCardTitle>
						<ScCardBody>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard class="md-bg-yellow-700 uk-card-light">
						<ScCardTitle>
							yellow
						</ScCardTitle>
						<ScCardBody>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
						</ScCardBody>
					</ScCard>
				</div>
			</div>

			<h4 class="uk-margin-bottom uk-margin-large-top uk-heading-line">
				<span>Size modifiers</span>
			</h4>
			<div class="uk-child-width-1-2@m uk-grid-medium uk-grid" data-uk-grid>
				<div>
					<ScCard class="uk-card-small">
						<ScCardTitle>
							Small
						</ScCardTitle>
						<ScCardBody>
							<pre class="sc-js-highlight"><code>&lt;ScCard class=&quot;uk-card-small&quot;&gt;&lt;/ScCard&gt;...</code></pre>
							<p>
								Lorem ipsum <a href="javascript:void(0)">
									dolor
								</a> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard class="uk-card-large">
						<ScCardTitle>
							Large
						</ScCardTitle>
						<ScCardBody>
							<pre class="sc-js-highlight"><code>&lt;ScCard class=&quot;uk-card-large&quot;&gt;...&lt;/ScCard&gt;</code></pre>
							<p>
								Lorem ipsum <a href="javascript:void(0)">
									dolor
								</a> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
			<div class="uk-child-width-1-3@l uk-child-width-1-2@m uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardTitle class="sc-padding-mini">
							Mini padding
						</ScCardTitle>
						<ScCardBody class="sc-padding-mini">
							<pre class="sc-js-highlight"><code>&lt;ScCard&gt;
	&lt;ScCardTitle class=&quot;sc-padding-mini&quot;&gt;...&lt;/ScCardTitle&gt;
	&lt;ScCardBody class=&quot;sc-padding-mini&quot;&gt;...&lt;/ScCardBody&gt;
&lt;/ScCard&gt;</code></pre>
							<p>
								Lorem ipsum <a href="javascript:void(0)">
									dolor
								</a> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle class="sc-padding-small">
							Small padding
						</ScCardTitle>
						<ScCardBody class="sc-padding-small">
							<pre class="sc-js-highlight"><code>&lt;ScCard&gt;
	&lt;ScCardTitle class=&quot;sc-padding-small&quot;&gt;...&lt;/ScCardTitle&gt;
	&lt;ScCardBody class=&quot;sc-padding-small&quot;&gt;...&lt;/ScCardBody&gt;
&lt;/ScCard&gt;</code></pre>
							<p>
								Lorem ipsum <a href="javascript:void(0)">
									dolor
								</a> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle class="sc-padding-medium">
							Medium padding
						</ScCardTitle>
						<ScCardBody class="sc-padding-medium">
							<pre class="sc-js-highlight"><code>&lt;ScCard&gt;
	&lt;ScCardTitle class=&quot;sc-padding-medium&quot;&gt;...&lt;/ScCardTitle&gt;
	&lt;ScCardBody class=&quot;sc-padding-medium&quot;&gt;...&lt;/ScCardBody&gt;
&lt;/ScCard&gt;</code></pre>
							<p>
								Lorem ipsum <a href="javascript:void(0)">
									dolor
								</a> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle class="sc-padding-large">
							Large padding
						</ScCardTitle>
						<ScCardBody class="sc-padding-large">
							<pre class="sc-js-highlight"><code>&lt;ScCard&gt;
	&lt;ScCardTitle class=&quot;sc-padding-large&quot;&gt;...&lt;/ScCardTitle&gt;
	&lt;ScCardBody class=&quot;sc-padding-large&quot;&gt;...&lt;/ScCardBody&gt;
&lt;/ScCard&gt;</code></pre>
							<p>
								Lorem ipsum <a href="javascript:void(0)">
									dolor
								</a> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle class="sc-padding-ends">
							Top/Bottom padding
						</ScCardTitle>
						<ScCardBody class="sc-padding-bottom sc-padding-remove-left sc-padding-remove-right">
							<pre class="sc-js-highlight"><code>&lt;ScCard&gt;
	&lt;ScCardTitle class=&quot;sc-padding-ends&quot;&gt;...&lt;/ScCardTitle&gt;
	&lt;ScCardBody class=&quot;sc-padding-bottom sc-padding-remove-left sc-padding-remove-right&quot;&gt;...&lt;/ScCardBody&gt;
&lt;/ScCard&gt;</code></pre>
							<p>
								Lorem ipsum <a href="javascript:void(0)">
									dolor
								</a> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle class="sc-padding-small sc-padding-ends">
							Mixed padding
						</ScCardTitle>
						<ScCardBody class="sc-padding-small sc-padding-remove-top">
							<pre class="sc-js-highlight"><code>&lt;ScCard&gt;
	&lt;ScCardTitle class=&quot;sc-padding-small sc-padding-ends&quot;&gt;...&lt;/ScCardTitle&gt;
	&lt;ScCardBody class=&quot;sc-padding-small sc-padding-remove-top&quot;&gt;...&lt;/ScCardBody&gt;
&lt;/ScCard&gt;</code></pre>
							<p>
								Lorem ipsum <a href="javascript:void(0)">
									dolor
								</a> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { scFakeData } from '~/assets/js/utils'
const { sentence } = scFakeData;

export default {
	name: 'ComponentsCards',
	data: () => ({
		cardACollapsed: false,
		cardAClosed: false,
		cardBFullScreen: false,
		cardCLoading: false,
		cardCContent: sentence({words: 80}),
		cardDCollapsed: true,
		cardDClosed: false,
		cardFFullScreen: false,
		btnDisabled: false
	}),
	computed: {
		avatarImg () {
			return require('~/assets/img/avatars/avatar_default_md.png')
		},
		cardImgSrc () {
			return require('~/assets/img/photos/rachel-park-366508-unsplash.jpg')
		}
	},
	methods: {
		getBackgroundImage (image) {
			return require('~/assets/img/photos/' + image)
		},
		loadContent () {
			if(!this.btnDisabled) {
				this.cardCLoading = true;
				this.btnDisabled = true;
				setTimeout(() => {
					this.cardCContent = sentence({words: Math.floor(Math.random() * 120) + 40 });
					this.cardCLoading = false;
					this.btnDisabled = false;
				}, 1200)
			}
		},
		cardCloseCallback () {
			console.log('Card closed!')
		}
	}
}
</script>
