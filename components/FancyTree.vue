<template>
	<div>
		<slot></slot>
	</div>
</template>

<script>
import jquery from "~/plugins/jquery";
import {createTree} from 'jquery.fancytree';
import 'jquery.fancytree/dist/skin-material/ui.fancytree.min.css';
import 'jquery.fancytree/dist/modules/jquery.fancytree.glyph';
import 'jquery.fancytree/dist/modules/jquery.fancytree.dnd5';
import 'jquery.fancytree/dist/modules/jquery.fancytree.wide';
import 'jquery.fancytree/dist/modules/jquery.fancytree.table';
const glyphMap = {
	_addClass: "mdi",
	checkbox: "mdi-checkbox-blank-outline",
	checkboxSelected: "mdi-checkbox-marked",
	checkboxUnknown: "mdi-minus-box",
	dragHelper: "mdi-play",
	dropMarker: "mdi-arrow-right",
	error: "mdi-alert-outline md-color-red-500",
	expanderClosed: "mdi-chevron-right",
	expanderLazy: "mdi-chevron-double-right",
	expanderOpen: "mdi-chevron-down",
	loading: "mdi-loading mdi-spin",
	nodata: "mdi-emoticon-neutral",
	noExpander: "",
	radio: "mdi-radiobox-blank",
	radioSelected: "mdi-radiobox-marked",
	radioUnknown: "mdi-radiobox-marked md-color-grey-500",
	// Default node icons.
	// (Use tree.options.icon callback to define custom icons based on node data)
	doc: "mdi-file-outline",
	docOpen: "mdi-file-document-outline",
	folder: "mdi-folder",
	folderOpen: "mdi-folder-open"
};

export default {
	name: 'FancyTree',
	props: {
		options: {
			type: Object,
			default: () => {}
		},
		table: {
			type: Boolean,
			default: false
		}
	},
	data: () => ({
		tree: null
	}),
	mounted () {
		const self = this;
		let _options = {
			// TODO add more events
			// http://wwwendt.de/tech/fancytree/doc/jsdoc/global.html#FancytreeEvents
			select (event, data) {
				var s = data.tree.getSelectedNodes().join(", ");
				self.$emit('select', s)
			}
		};
		if(this.options.glyph) {
			_options.glyph = {
				preset: 'material',
				map: glyphMap
			};
		}
		const options = $.extend(this.options, _options);
		this.$nextTick(() => {
			if(this.table) {
				this.tree = createTree($(this.$el).find('table')[0], options);
			} else {
				this.tree = createTree(this.$el, options);
			}
		});
	}
}
</script>
<style lang="scss">
	@import "~scss/plugins/fancytree";
</style>
