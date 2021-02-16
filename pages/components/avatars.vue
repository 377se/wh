<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-child-width-1-2@l uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardTitle>
							Images
						</ScCardTitle>
						<ScCardBody>
							<div class="uk-child-width-auto@s uk-flex-middle" data-uk-grid>
								<div>
									<ScAvatar :avatar-id="5"></ScAvatar>
								</div>
								<div>
									<ScAvatar :avatar-id="5" size="md"></ScAvatar>
								</div>
								<div>
									<ScAvatar :avatar-id="5" size="lg"></ScAvatar>
								</div>
								<div>
									<ScAvatar :avatar-id="5" size="_default"></ScAvatar>
								</div>
							</div>
							<pre v-highlightjs><code>&lt;ScAvatar :avatar-id=&quot;5&quot;&gt;&lt;/ScAvatar&gt;
&lt;ScAvatar :avatar-id=&quot;5&quot; size=&quot;md&quot;&gt;&lt;/ScAvatar&gt;
&lt;ScAvatar :avatar-id=&quot;5&quot; size=&quot;lg&quot;&gt;&lt;/ScAvatar&gt;
&lt;ScAvatar :avatar-id=&quot;5&quot; size=&quot;_default&quot;&gt;&lt;/ScAvatar&gt;
</code></pre>
							<hr>
							<div class="uk-child-width-auto@s uk-flex-middle" data-uk-grid>
								<div>
									<ScAvatar :avatar-id="8" status="online"></ScAvatar>
								</div>
								<div>
									<ScAvatar :avatar-id="8" size="md" status="away"></ScAvatar>
								</div>
								<div>
									<ScAvatar :avatar-id="8" size="lg" status="busy"></ScAvatar>
								</div>
							</div>
							<pre v-highlightjs><code>&lt;ScAvatar :avatar-id=&quot;8&quot; status=&quot;online&quot;&gt;&lt;/ScAvatar&gt;
&lt;ScAvatar :avatar-id=&quot;8&quot; size=&quot;md&quot; status=&quot;away&quot;&gt;&lt;/ScAvatar&gt;
&lt;ScAvatar :avatar-id=&quot;8&quot; size=&quot;lg&quot; status=&quot;busy&quot;&gt;&lt;/ScAvatar&gt;
</code></pre>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Initials
						</ScCardTitle>
						<ScCardBody>
							<div class="uk-child-width-auto uk-flex-middle" data-uk-grid>
								<div>
									<ScAvatarInitials initials="mr"></ScAvatarInitials>
								</div>
								<div>
									<ScAvatarInitials initials="lo" bg="md-bg-yellow-200"></ScAvatarInitials>
								</div>
								<div>
									<ScAvatarInitials initials="kt" bg="md-bg-red-500" color="md-color-white"></ScAvatarInitials>
								</div>
								<div>
									<ScAvatarInitials initials="gw" bg="md-bg-light-green-500" color="md-color-white"></ScAvatarInitials>
								</div>
								<div>
									<ScAvatarInitials initials="sb" bg="md-bg-light-blue-500" color="md-color-white"></ScAvatarInitials>
								</div>
							</div>
							<pre v-highlightjs><code>&lt;ScAvatarInitials initials=&quot;mr&quot;&gt;&lt;/ScAvatarInitials&gt;
&lt;ScAvatarInitials initials=&quot;lo&quot; background=&quot;md-bg-yellow-200&quot;&gt;&lt;/ScAvatarInitials&gt;
&lt;ScAvatarInitials initials=&quot;kt&quot; background=&quot;md-bg-red-500&quot; color=&quot;md-color-white&quot;&gt;&lt;/ScAvatarInitials&gt;
&lt;ScAvatarInitials initials=&quot;gw&quot; background=&quot;md-bg-light-green-500&quot; color=&quot;md-color-white&quot;&gt;&lt;/ScAvatarInitials&gt;
&lt;ScAvatarInitials initials=&quot;sb&quot; background=&quot;md-bg-light-blue-500&quot; color=&quot;md-color-white&quot;&gt;&lt;/ScAvatarInitials&gt;
</code></pre>
							<hr>
							<div class="uk-child-width-auto@s uk-flex-middle" data-uk-grid>
								<div>
									<ScAvatarInitials initials="mr" bg="md-bg-blue-grey-100"></ScAvatarInitials>
								</div>
								<div>
									<ScAvatarInitials initials="lo" bg="md-bg-teal-600" color="md-color-white" size="md"></ScAvatarInitials>
								</div>
								<div>
									<ScAvatarInitials initials="kt" bg="md-bg-purple-500" color="md-color-white" size="lg"></ScAvatarInitials>
								</div>
							</div>
							<pre v-highlightjs><code>&lt;ScAvatarInitials initials=&quot;mr&quot; background=&quot;md-bg-blue-grey-100&quot;&gt;&lt;/ScAvatarInitials&gt;
&lt;ScAvatarInitials initials=&quot;lo&quot; background=&quot;md-bg-teal-600&quot; color=&quot;md-color-white&quot; size=&quot;md&quot;&gt;&lt;/ScAvatarInitials&gt;
&lt;ScAvatarInitials initials=&quot;kt&quot; background=&quot;md-bg-purple-500&quot; color=&quot;md-color-white&quot; size=&quot;lg&quot;&gt;&lt;/AvatarInitials&gt;
</code></pre>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ScAvatar from '~/components/Avatar'
import ScAvatarInitials from '~/components/AvatarInitials'
require('~/plugins/highlight');

export default {
	name: 'ComponentsAvatars',
	components: {
		ScAvatar,
		ScAvatarInitials
	}
}
</script>
