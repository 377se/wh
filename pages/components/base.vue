<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-child-width-1-2@l uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardTitle>
							Headings
						</ScCardTitle>
						<ScCardBody>
							<h1>h1 Heading 1</h1>
							<h2>h2 Heading 2</h2>
							<h3>h3 Heading 3</h3>
							<h4>h4 Heading 4</h4>
							<h5>h5 Heading 5</h5>
							<h6>h6 Heading 6</h6>
							<div class="uk-margin-large">
								<h4 class="uk-heading-line">
									<span>Heading line</span>
								</h4>
								<h4 class="uk-heading-line uk-text-center">
									<span>Heading line</span>
								</h4>
								<h4 class="uk-heading-line uk-text-right">
									<span>Heading line</span>
								</h4>
								<h4 class="uk-heading-divider">
									<span>Heading divider</span>
								</h4>
							</div>
						</ScCardBody>
					</ScCard>
					<ScCard class="uk-margin-top">
						<ScCardTitle>
							Preformatted text
						</ScCardTitle>
						<ScCardBody>
							<pre v-highlightjs><code>&lt;!-- HTML --&gt;
------------------------------
&lt;!DOCTYPE html&gt;
&lt;title&gt;Title&lt;/title&gt;

&lt;style&gt;body {width: 500px;}&lt;/style&gt;

&lt;script type=&quot;application/javascript&quot;&gt;
	function $init() {return true;}
&lt;/script&gt;

&lt;body&gt;
	&lt;p checked class=&quot;title&quot; id='title'&gt;Title&lt;/p&gt;
	&lt;!-- here goes the rest of the page --&gt;
&lt;/body&gt;</code></pre>
							<pre v-highlightjs><code>/* JS */
------------------------------
function $initHighlight(block, cls) {
	try {
		if (cls.search(/\bno\-highlight\b/) != -1)
		return process(block, true, 0x0F) +
		` class="${cls}"`;
	} catch (e) {
		/* handle exception */
	}
	for (var i = 0 / 2; i &lt; classes.length; i++) {
		if (checkCondition(classes[i]) === undefined)
		console.log('undefined');
	}
}

export  $initHighlight;</code></pre>
							<pre v-highlightjs><code>/* SQL */
------------------------------
CREATE TABLE "topic" (
	"id" serial NOT NULL PRIMARY KEY,
	"forum_id" integer NOT NULL,
	"subject" varchar(255) NOT NULL
);
ALTER TABLE "topic"
ADD CONSTRAINT forum_id FOREIGN KEY ("forum_id")
REFERENCES "forum" ("id");

-- Initials
insert into "topic" ("forum_id", "subject")
values (2, 'D''artagnian');</code></pre>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Text-level semantics
						</ScCardTitle>
						<ScCardBody>
							<table class="uk-table uk-table-small">
								<thead>
									<tr>
										<th class="uk-table-shrink">
											Element
										</th>
										<th>Description</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td><code>&lt;abbr&gt;</code></td>
										<td>
											Define an abbreviation using the <abbr title="Title Text">
												abbr element with a title
											</abbr>.
										</td>
									</tr>
									<tr>
										<td><code>&lt;b&gt;</code></td>
										<td>Create bold text with the <b>b element</b>.</td>
									</tr>
									<tr>
										<td><code>&lt;cite&gt;</code></td>
										<td>Define the title of a work with the <cite>cite element</cite>.</td>
									</tr>
									<tr>
										<td><code>&lt;code&gt;</code></td>
										<td>Define inline code snippets using the <code>code element</code>.</td>
									</tr>
									<tr>
										<td><code>&lt;del&gt;</code></td>
										<td>Mark document changes as deleted text using the <del>del element</del>.</td>
									</tr>
									<tr>
										<td><code>&lt;dfn&gt;</code></td>
										<td>
											Create a definition term using the <dfn title="Defines a definition term">
												dfn element with a title
											</dfn>.
										</td>
									</tr>
									<tr>
										<td><code>&lt;em&gt;</code></td>
										<td>Emphasize text using the <em>em element</em>.</td>
									</tr>
									<tr>
										<td><code>&lt;i&gt;</code></td>
										<td>Set off part of a text by using the <i>i element</i>.</td>
									</tr>
									<tr>
										<td><code>&lt;ins&gt;</code></td>
										<td>Mark document changes as inserted text using the <ins>ins element</ins>.</td>
									</tr>
									<tr>
										<td><code>&lt;kbd&gt;</code></td>
										<td>Use a <kbd>keybord input element</kbd> to display input in the browser&#39;s default monospace font.</td>
									</tr>
									<tr>
										<td><code>&lt;mark&gt;</code></td>
										<td>Highlight text with no semantic meaning using the <mark>mark element</mark>.</td>
									</tr>
									<tr>
										<td><code>&lt;q&gt;</code></td>
										<td>Define inline quotations using a <q>q element <q>inside</q> a q element</q>.</td>
									</tr>
									<tr>
										<td><code>&lt;s&gt;</code></td>
										<td>Define text with a strikethrough using the <s>s element</s>.</td>
									</tr>
									<tr>
										<td><code>&lt;samp&gt;</code></td>
										<td>Define sample output with a <samp>samp element</samp>.</td>
									</tr>
									<tr>
										<td><code>&lt;small&gt;</code></td>
										<td>De-emphasize text for small print using the <small>small element</small>.</td>
									</tr>
									<tr>
										<td><code>&lt;span&gt;</code></td>
										<td>Define an inline-container using the <span>span element</span>.</td>
									</tr>
									<tr>
										<td><code>&lt;strong&gt;</code></td>
										<td>Imply extra importance using the <strong>strong element</strong>.</td>
									</tr>
									<tr>
										<td><code>&lt;sub&gt;</code></td>
										<td>Define subscript text using the <sub>sub element.</sub>.</td>
									</tr>
									<tr>
										<td><code>&lt;sup&gt;</code></td>
										<td>Define superscript text using the <sup>sup element.</sup></td>
									</tr>
									<tr>
										<td><code>&lt;u&gt;</code></td>
										<td>Define underlined text using the <u>u element</u>.</td>
									</tr>
									<tr>
										<td><code>&lt;var&gt;</code></td>
										<td>Define a variable using the <var>var element</var>.</td>
									</tr>
								</tbody>
							</table>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
require('~/plugins/highlight');

export default {
	name: 'ComponentsBase',
}
</script>
