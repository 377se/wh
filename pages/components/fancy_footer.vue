<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content" class="uk-height-1-1 uk-flex uk-flex-center">
			<div class="uk-width-2-3@l">
				<ul class="uk-switcher uk-margin sc-ff-switcher">
					<li class="uk-active">
						<ScCard>
							<ScCardTitle>
								Home Page
							</ScCardTitle>
							<ScCardBody>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consectetur cum deserunt distinctio fugit illum ipsam laboriosam nam nobis optio praesentium quam quidem sapiente temporibus tenetur vero, voluptates! Accusamus, magnam!</p>
							</ScCardBody>
						</ScCard>
					</li>
					<li>
						<ScCard>
							<ScCardTitle>
								User Profile
							</ScCardTitle>
							<ScCardBody>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias ducimus officia repellendus saepe ut. Deserunt et facilis, illum pariatur perspiciatis qui quisquam quo rem sit soluta. Aliquam nesciunt quidem veniam!</p>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At deserunt distinctio enim error, et ex fuga fugiat laboriosam natus nostrum perferendis quae quod similique soluta tempora tempore temporibus velit voluptatibus?</p>
							</ScCardBody>
						</ScCard>
					</li>
					<li>
						<ScCard>
							<ScCardTitle>
								Mailbox
							</ScCardTitle>
							<ScCardBody>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consectetur cum deserunt distinctio fugit illum ipsam laboriosam nam nobis optio praesentium quam quidem sapiente temporibus tenetur vero, voluptates! Accusamus, magnam!</p>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consectetur cum deserunt distinctio fugit illum ipsam laboriosam nam nobis optio praesentium quam quidem sapiente temporibus tenetur vero, voluptates! Accusamus, magnam!</p>
							</ScCardBody>
						</ScCard>
					</li>
					<li>
						<ScCard>
							<ScCardTitle>
								Gallery
							</ScCardTitle>
							<ScCardBody>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, ad aperiam, blanditiis commodi ducimus eius maxime modi molestias nam obcaecati officia placeat quos ratione repellat saepe velit voluptates voluptatibus! Magnam.</p>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias dolorem facere quisquam ut! A labore laudantium necessitatibus perspiciatis voluptatum. Eaque enim error est inventore nisi nobis odit quo sapiente, soluta!</p>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus error et fuga, illo iusto odit perferendis praesentium quia reprehenderit. Architecto consectetur dicta dignissimos ea explicabo laudantium molestiae non ut voluptas?</p>
							</ScCardBody>
						</ScCard>
					</li>
					<li>
						<ScCard>
							<ScCardTitle>
								Settings
							</ScCardTitle>
							<ScCardBody>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur at consequuntur excepturi facilis, illum incidunt neque nesciunt non? Adipisci asperiores doloribus eum nemo numquam, officiis provident quisquam quo sapiente voluptatem!</p>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae culpa deleniti dolorem doloribus, ea et, labore magni molestiae nemo nisi odio placeat quas quod saepe totam ut vel velit veritatis.</p>
							</ScCardBody>
						</ScCard>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ComponentsFancyFooter',
	mounted () {
		this.$store.commit('setFancyFooterActive', true);
	},
	beforeDestroy () {
		this.$store.commit('setFancyFooterActive', false);
	}
}
</script>
