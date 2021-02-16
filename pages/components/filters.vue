<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-child-width-1-2@l uk-grid-divider uk-grid" data-uk-grid>
				<div>
					<div data-uk-filter="target: .sc-js-filter-a">
						<ul class="uk-subnav uk-subnav-pill">
							<li data-uk-filter-control>
								<a href="javascript:void(0)">
									All
								</a>
							</li>
							<li data-uk-filter-control=".tag-white">
								<a href="javascript:void(0)">
									White
								</a>
							</li>
							<li data-uk-filter-control=".tag-grey">
								<a href="javascript:void(0)">
									Grey
								</a>
							</li>
							<li data-uk-filter-control=".tag-blue">
								<a href="javascript:void(0)">
									Blue
								</a>
							</li>
						</ul>
						<ul class="sc-js-filter-a uk-child-width-1-2 uk-child-width-1-3@m uk-text-center uk-grid" data-uk-grid>
							<li v-for="item in filterData" :key="item.id" :class="item.tag">
								<ScCard :class="item.class">
									<ScCardBody>
										Item
									</ScCardBody>
								</ScCard>
							</li>
						</ul>
					</div>
				</div>
				<div>
					<div data-uk-filter="target: .sc-js-filter-b">
						<ul class="uk-subnav uk-subnav-pill">
							<li data-uk-filter-control>
								<a href="javascript:void(0)">
									All
								</a>
							</li>
							<li data-uk-filter-control="[data-tags*='white']">
								<a href="javascript:void(0)">
									White
								</a>
							</li>
							<li data-uk-filter-control="[data-tags*='blue']">
								<a href="javascript:void(0)">
									Blue
								</a>
							</li>
							<li data-uk-filter-control="[data-tags*='black']">
								<a href="javascript:void(0)">
									Black
								</a>
							</li>
							<li data-uk-filter-control="[data-tags*='dark']">
								<a href="javascript:void(0)">
									Dark Colors
								</a>
							</li>
						</ul>
						<ul class="sc-js-filter-b uk-child-width-1-2 uk-child-width-1-3@m uk-text-center uk-grid" data-uk-grid>
							<li data-tags="white">
								<ScCard>
									<ScCardBody>
										Item
									</ScCardBody>
								</ScCard>
							</li>
							<li data-tags="blue dark">
								<ScCard class="md-bg-light-blue-600 md-color-white">
									<ScCardBody>
										Item
									</ScCardBody>
								</ScCard>
							</li>
							<li data-tags="white">
								<ScCard>
									<ScCardBody>
										Item
									</ScCardBody>
								</ScCard>
							</li>
							<li data-tags="white">
								<ScCard>
									<ScCardBody>
										Item
									</ScCardBody>
								</ScCard>
							</li>
							<li data-tags="black dark">
								<ScCard class="md-bg-grey-900 md-color-white">
									<ScCardBody>
										Item
									</ScCardBody>
								</ScCard>
							</li>
							<li data-tags="black dark">
								<ScCard class="md-bg-grey-900 md-color-white">
									<ScCardBody>
										Item
									</ScCardBody>
								</ScCard>
							</li>
							<li data-tags="blue dark">
								<ScCard class="md-bg-light-blue-600 md-color-white">
									<ScCardBody>
										Item
									</ScCardBody>
								</ScCard>
							</li>
							<li data-tags="black dark">
								<ScCard class="md-bg-grey-900 md-color-white">
									<ScCardBody>
										Item
									</ScCardBody>
								</ScCard>
							</li>
							<li data-tags="blue dark">
								<ScCard class="md-bg-light-blue-600 md-color-white">
									<ScCardBody>
										Item
									</ScCardBody>
								</ScCard>
							</li>
							<li data-tags="white">
								<ScCard>
									<ScCardBody>
										Item
									</ScCardBody>
								</ScCard>
							</li>
							<li data-tags="blue dark">
								<ScCard class="md-bg-light-blue-600 md-color-white">
									<ScCardBody>
										Item
									</ScCardBody>
								</ScCard>
							</li>
							<li data-tags="black dark">
								<ScCard class="md-bg-grey-900 md-color-white">
									<ScCardBody>
										Item
									</ScCardBody>
								</ScCard>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<hr class="uk-margin-large">
			<div class="uk-child-width-1-2@l uk-grid-divider" data-uk-grid>
				<div>
					<div data-uk-filter="target: .sc-js-filter-c">
						<div class="uk-grid-small uk-flex-middle" data-uk-grid>
							<div class="uk-width-expand">
								<div class="uk-grid-small uk-grid-divider uk-child-width-auto uk-grid" data-uk-grid>
									<div>
										<ul class="uk-subnav uk-subnav-pill" data-uk-margin>
											<li class="uk-active" data-uk-filter-control>
												<a href="javascript:void(0)">
													All
												</a>
											</li>
										</ul>
									</div>
									<div>
										<ul class="uk-subnav uk-subnav-pill" data-uk-margin>
											<li data-uk-filter-control="filter: [data-color='white']; group: data-color">
												<a href="javascript:void(0)">
													White
												</a>
											</li>
											<li data-uk-filter-control="filter: [data-color='green']; group: data-color">
												<a href="javascript:void(0)">
													Green
												</a>
											</li>
											<li data-uk-filter-control="filter: [data-color='brown']; group: data-color">
												<a href="javascript:void(0)">
													Brown
												</a>
											</li>
										</ul>
									</div>
									<div>
										<ul class="uk-subnav uk-subnav-pill" data-uk-margin>
											<li data-uk-filter-control="filter: [data-size='small']; group: size">
												<a href="javascript:void(0)">
													Small
												</a>
											</li>
											<li data-uk-filter-control="filter: [data-size='medium']; group: size">
												<a href="javascript:void(0)">
													Medium
												</a>
											</li>
											<li data-uk-filter-control="filter: [data-size='large']; group: size">
												<a href="javascript:void(0)">
													Large
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div class="uk-width-auto uk-text-nowrap">
								<span class="uk-active" data-uk-filter-control="sort: data-name">
									<i class="mdi mdi-arrow-down sc-icon-18 uk-icon-link sc-el-clickable"></i>
								</span>
								<span data-uk-filter-control="sort: data-name; order: desc">
									<i class="mdi mdi-arrow-up sc-icon-18 uk-icon-link sc-el-clickable"></i>
								</span>
							</div>
						</div>
						<ul class="sc-js-filter-c uk-child-width-1-2 uk-child-width-1-3@m uk-text-center uk-grid" data-uk-grid="masonry: true">
							<li data-color="white" data-size="large" data-name="A">
								<ScCard>
									<ScCardBody>
										<canvas width="600" height="400"></canvas>
										<div class="uk-position-center">
											A
										</div>
									</ScCardBody>
								</ScCard>
							</li>
							<li data-color="green" data-size="small" data-name="B">
								<ScCard class="md-bg-light-green-600 md-color-white">
									<ScCardBody>
										<canvas width="600" height="200"></canvas>
										<div class="uk-position-center">
											B
										</div>
									</ScCardBody>
								</ScCard>
							</li>
							<li data-color="white" data-size="medium" data-name="C">
								<ScCard>
									<ScCardBody>
										<canvas width="600" height="300"></canvas>
										<div class="uk-position-center">
											C
										</div>
									</ScCardBody>
								</ScCard>
							</li>
							<li data-color="white" data-size="small" data-name="D">
								<ScCard>
									<ScCardBody>
										<canvas width="600" height="200"></canvas>
										<div class="uk-position-center">
											D
										</div>
									</ScCardBody>
								</ScCard>
							</li>
							<li data-color="brown" data-size="medium" data-name="E">
								<ScCard class="md-bg-brown-600 md-color-white">
									<ScCardBody>
										<canvas width="600" height="300"></canvas>
										<div class="uk-position-center">
											E
										</div>
									</ScCardBody>
								</ScCard>
							</li>
							<li data-color="brown" data-size="small" data-name="F">
								<ScCard class="md-bg-brown-600 md-color-white">
									<ScCardBody>
										<canvas width="600" height="200"></canvas>
										<div class="uk-position-center">
											F
										</div>
									</ScCardBody>
								</ScCard>
							</li>
							<li data-color="green" data-size="medium" data-name="G">
								<ScCard class="md-bg-light-green-600 md-color-white">
									<ScCardBody>
										<canvas width="600" height="300"></canvas>
										<div class="uk-position-center">
											G
										</div>
									</ScCardBody>
								</ScCard>
							</li>
							<li data-color="brown" data-size="large" data-name="H">
								<ScCard class="md-bg-brown-600 md-color-white">
									<ScCardBody>
										<canvas width="600" height="400"></canvas>
										<div class="uk-position-center">
											H
										</div>
									</ScCardBody>
								</ScCard>
							</li>
							<li data-color="green" data-size="large" data-name="I">
								<ScCard class="md-bg-light-green-600 md-color-white">
									<ScCardBody>
										<canvas width="600" height="400"></canvas>
										<div class="uk-position-center">
											I
										</div>
									</ScCardBody>
								</ScCard>
							</li>
							<li data-color="white" data-size="large" data-name="J">
								<ScCard>
									<ScCardBody>
										<canvas width="600" height="400"></canvas>
										<div class="uk-position-center">
											J
										</div>
									</ScCardBody>
								</ScCard>
							</li>
							<li data-color="green" data-size="medium" data-name="K">
								<ScCard class="md-bg-light-green-600 md-color-white">
									<ScCardBody>
										<canvas width="600" height="300"></canvas>
										<div class="uk-position-center">
											K
										</div>
									</ScCardBody>
								</ScCard>
							</li>
							<li data-color="brown" data-size="small" data-name="L">
								<ScCard class="md-bg-brown-600 md-color-white">
									<ScCardBody>
										<canvas width="600" height="200"></canvas>
										<div class="uk-position-center">
											L
										</div>
									</ScCardBody>
								</ScCard>
							</li>
						</ul>
					</div>
				</div>
				<div>
					<div data-uk-filter="target: .sc-js-filter-d">
						<div class="uk-grid-small uk-grid-divider uk-child-width-auto" data-uk-grid>
							<div>
								<ul class="uk-subnav uk-subnav-pill" data-uk-margin>
									<li class="uk-active" data-uk-filter-control>
										<a href="javascript:void(0)">
											All
										</a>
									</li>
								</ul>
							</div>
							<div>
								<ul class="uk-subnav uk-subnav-pill" data-uk-margin>
									<li data-uk-filter-control="[data-color='white']">
										<a href="javascript:void(0)">
											White
										</a>
									</li>
									<li data-uk-filter-control="[data-color='green']">
										<a href="javascript:void(0)">
											Green
										</a>
									</li>
									<li data-uk-filter-control="[data-color='brown']">
										<a href="javascript:void(0)">
											Brown
										</a>
									</li>
								</ul>
							</div>
							<div>
								<ul class="uk-subnav uk-subnav-pill" data-uk-margin>
									<li data-uk-filter-control="[data-size='small']">
										<a href="javascript:void(0)">
											Small
										</a>
									</li>
									<li data-uk-filter-control="[data-size='medium']">
										<a href="javascript:void(0)">
											Medium
										</a>
									</li>
									<li data-uk-filter-control="[data-size='large']">
										<a href="javascript:void(0)">
											Large
										</a>
									</li>
								</ul>
							</div>
						</div>
						<ul class="sc-js-filter-d uk-child-width-1-2 uk-child-width-1-3@m uk-text-center uk-grid" data-uk-grid="masonry: true">
							<li data-color="white" data-size="large">
								<ScCard>
									<ScCardBody>
										<canvas width="600" height="400"></canvas>
										<div class="uk-position-center">
											Item
										</div>
									</ScCardBody>
								</ScCard>
							</li>
							<li data-color="green" data-size="small">
								<ScCard class="md-bg-light-green-600 md-color-white">
									<ScCardBody>
										<canvas width="600" height="200"></canvas>
										<div class="uk-position-center">
											Item
										</div>
									</ScCardBody>
								</ScCard>
							</li>
							<li data-color="white" data-size="medium">
								<ScCard>
									<ScCardBody>
										<canvas width="600" height="300"></canvas>
										<div class="uk-position-center">
											Item
										</div>
									</ScCardBody>
								</ScCard>
							</li>
							<li data-color="white" data-size="small">
								<ScCard>
									<ScCardBody>
										<canvas width="600" height="200"></canvas>
										<div class="uk-position-center">
											Item
										</div>
									</ScCardBody>
								</ScCard>
							</li>
							<li data-color="brown" data-size="medium">
								<ScCard class="md-bg-brown-600 md-color-white">
									<ScCardBody>
										<canvas width="600" height="300"></canvas>
										<div class="uk-position-center">
											Item
										</div>
									</ScCardBody>
								</ScCard>
							</li>
							<li data-color="brown" data-size="small">
								<ScCard class="md-bg-brown-600 md-color-white">
									<ScCardBody>
										<canvas width="600" height="200"></canvas>
										<div class="uk-position-center">
											Item
										</div>
									</ScCardBody>
								</ScCard>
							</li>
							<li data-color="green" data-size="medium">
								<ScCard class="md-bg-light-green-600 md-color-white">
									<ScCardBody>
										<canvas width="600" height="300"></canvas>
										<div class="uk-position-center">
											Item
										</div>
									</ScCardBody>
								</ScCard>
							</li>
							<li data-color="brown" data-size="large">
								<ScCard class="md-bg-brown-600 md-color-white">
									<ScCardBody>
										<canvas width="600" height="400"></canvas>
										<div class="uk-position-center">
											Item
										</div>
									</ScCardBody>
								</ScCard>
							</li>
							<li data-color="green" data-size="large">
								<ScCard class="md-bg-light-green-600 md-color-white">
									<ScCardBody>
										<canvas width="600" height="400"></canvas>
										<div class="uk-position-center">
											Item
										</div>
									</ScCardBody>
								</ScCard>
							</li>
							<li data-color="white" data-size="large">
								<ScCard>
									<ScCardBody>
										<canvas width="600" height="400"></canvas>
										<div class="uk-position-center">
											Item
										</div>
									</ScCardBody>
								</ScCard>
							</li>
							<li data-color="green" data-size="medium">
								<ScCard class="md-bg-light-green-600 md-color-white">
									<ScCardBody>
										<canvas width="600" height="300"></canvas>
										<div class="uk-position-center">
											Item
										</div>
									</ScCardBody>
								</ScCard>
							</li>
							<li data-color="brown" data-size="small">
								<ScCard class="md-bg-brown-600 md-color-white">
									<ScCardBody>
										<canvas width="600" height="200"></canvas>
										<div class="uk-position-center">
											Item
										</div>
									</ScCardBody>
								</ScCard>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ComponentsFilters',
	data: () => ({
		filterData: [
			{
				'id': 1,
				'tag': 'tag-blue',
				'class': 'md-bg-blue-500 md-color-white'
			},
			{
				'id': 2,
				'tag': 'tag-white',
				'class': ''
			},
			{
				'id': 3,
				'tag': 'tag-grey',
				'class': 'md-bg-grey-500 md-color-white'
			},
			{
				'id': 4,
				'tag': 'tag-grey',
				'class': 'md-bg-grey-500 md-color-white'
			},
			{
				'id': 5,
				'tag': 'tag-blue',
				'class': 'md-bg-blue-500 md-color-white'
			},
			{
				'id': 6,
				'tag': 'tag-white',
				'class': ''
			},
			{
				'id': 7,
				'tag': 'tag-grey',
				'class': 'md-bg-grey-500 md-color-white'
			},
			{
				'id': 8,
				'tag': 'tag-white',
				'class': ''
			},
			{
				'id': 9,
				'tag': 'tag-blue',
				'class': 'md-bg-blue-500 md-color-white'
			},
			{
				'id': 10,
				'tag': 'tag-white',
				'class': ''
			},
			{
				'id': 11,
				'tag': 'tag-grey',
				'class': 'md-bg-grey-500 md-color-white'
			},
			{
				'id': 12,
				'tag': 'tag-blue',
				'class': 'md-bg-blue-500 md-color-white'
			}
		]
	}),
	mounted () {
		setTimeout( () => {
			this.filterData.push({
				'id': 13,
				'tag': 'tag-grey',
				'class': 'md-bg-grey-500 md-color-white'
			});
			this.filterData.push({
				'id': 14,
				'tag': 'tag-blue',
				'class': 'md-bg-blue-500 md-color-white'
			});
		}, 2000)
	}
}
</script>
