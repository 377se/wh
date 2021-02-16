<template>
	<div id="sc-page-wrapper">
		<div id="sc-page-content">
			<div class="uk-child-width-1-3@l uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardTitle>
							Multiple selection
						</ScCardTitle>
						<ScCardBody>
							<client-only>
								<FancyTree :options="treeMSel" @select="logSelected"></FancyTree>
							</client-only>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Single selection
						</ScCardTitle>
						<ScCardBody>
							<client-only>
								<FancyTree :options="treeSSel"></FancyTree>
							</client-only>
						</ScCardBody>
					</ScCard>
				</div>
				<div>
					<ScCard>
						<ScCardTitle>
							Drag & Drop
						</ScCardTitle>
						<ScCardBody>
							<client-only>
								<FancyTree :options="treeDnD"></FancyTree>
							</client-only>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
			<div class="uk-child-width-1-1 uk-grid" data-uk-grid>
				<div>
					<ScCard>
						<ScCardTitle>
							Table
						</ScCardTitle>
						<ScCardBody>
							<div class="uk-overflow-auto">
								<client-only>
									<FancyTree ref="treeTable" :options="treeTable" :table="true">
										<table id="sc-tree-table" class="uk-table uk-table-striped uk-margin-remove">
											<colgroup>
												<col class="uk-table-shrink">
												<col>
												<col class="uk-table-shrink">
												<col class="uk-table-shrink">
												<col class="uk-table-shrink">
											</colgroup>
											<thead>
												<tr>
													<th class="uk-text-center">
														<div class="uk-flex uk-flex-center">
															<PrettyCheck class="p-icon" @change="toggleItems">
																<i slot="extra" class="icon mdi mdi-check"></i>
															</PrettyCheck>
														</div>
													</th>
													<th>Item</th>
													<th>Author</th>
													<th class="uk-text-nowrap">
														Year
													</th>
													<th class="uk-text-nowrap">
														Unit price
													</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td></td>
													<td class="uk-text-nowrap"></td>
													<td class="uk-text-nowrap"></td>
													<td></td>
													<td class="uk-text-right"></td>
												</tr>
											</tbody>
										</table>
									</FancyTree>
								</client-only>
							</div>
						</ScCardBody>
					</ScCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PrettyCheck from 'pretty-checkbox-vue/check';
const treeMSelSource = require('~/data/fancytree/tree_ajax_products.json');
const treeMSelLazy = require('~/data/fancytree/tree_ajax_sub2.json');
const treeDnDSource = require('~/data/fancytree/tree_ajax_fs.json');
const treeTableSource = require('~/data/fancytree/tree_ajax_books.json');

export default {
	name: 'PluginsTree',
	components: {
		FancyTree: process.client ? () => import('~/components/FancyTree') : null,
		PrettyCheck
	},
	data: () => ({
		treeMSel: {
			extensions: ["glyph"],
			checkbox: true,
			selectMode: 3,
			debugLevel: 0,
			glyph: true,
			source: treeMSelSource,
			lazyLoad (event, data) {
				data.result = treeMSelLazy;
			}
		},
		treeSSel: {
			extensions: ["glyph"],
			checkbox: "radio",
			selectMode: 1,
			debugLevel: 0,
			glyph: true,
			source: [
				{
					title: "n1",
					expanded: true,
					checkbox: "radio",
					radiogroup: true,
					children: [
						{
							title: "n1.1"
						},
						{
							title: "n1.2 (selected)",
							selected: true
						},
						{
							title: "n1.3"
						}
					]
				},
				{
					title: "n2",
					expanded: true,
					checkbox: "radio",
					radiogroup: true,
					children: [
						{
							title: "n2.1"
						},
						{
							title: "n2.2"
						},
						{
							title: "n2.3"
						}
					]
				},
				{
					title: "n3",
					expanded: true,
					checkbox: "radio",
					radiogroup: true,
					children: [
						{
							title: "n3.1"
						},
						{
							title: "n3.2"
						},
						{
							title: "n3.3"
						},
						{
							title: "n3.4"
						}
					]
				}
			]
		},
		treeDnD: {
			extensions: ["glyph", "dnd5"],
			debugLevel: 0,
			glyph: true,
			source: treeDnDSource,
			dnd5: {
				dragStart (node, data) {
					return true;
				},
				dragDrag (node, data) {
					data.dataTransfer.dropEffect = "move";
				},
				dragEnd (node, data) {
				},
				dragEnter (node, data) {
					data.dataTransfer.dropEffect = "move";
					return true;
				},
				dragOver (node, data) {
					data.dataTransfer.dropEffect = "move";
				},
				dragLeave (node, data) {
				},
				dragDrop (node, data) {
					var transfer = data.dataTransfer;
					node.debug("drop", data);
					if (data.otherNode) {
						data.otherNode.moveTo(node, data.hitMode);
					} else if (data.otherNodeData) {
						node.addChild(data.otherNodeData, data.hitMode);
					} else {
						node.addNode({
							title: transfer.getData("text")
						}, data.hitMode);
					}
					node.setExpanded();
				}
			}
		},
		treeTable: {
			extensions: ["glyph", "table", "wide"],
			checkbox: true,
			selectMode: 3,
			glyph: true,
			table: {
				checkboxColumnIdx: 0,
				nodeColumnIdx: 1
			},
			source: treeTableSource,
			renderColumns (event, data) {
				var node = data.node;
				var _data = node.data;
				var $tdList = $(node.tr).find(">td");
				$tdList.eq(2).text(_data.author);
				$tdList.eq(3).text(_data.year);
				$tdList.eq(4).text(_data.price ? _data.price.toFixed(2) : "");
			}
		}
	}),
	methods: {
		toggleItems (e) {
			if(e) {
				this.$refs.treeTable.tree.visit(function (node) {
					node.setSelected(true);
				});
			} else {
				this.$refs.treeTable.tree.visit(function (node) {
					node.setSelected(false);
				});
			}
		},
		logSelected (val) {
			console.log(val);
		}
	}
}
</script>

<style lang="scss">
	@import '~scss/vue/_pretty_checkboxes';
</style>
