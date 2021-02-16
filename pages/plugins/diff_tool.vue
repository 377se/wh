<template>
	<div id="sc-page-wrapper">
		<client-only>
			<div id="sc-page-top-bar" class="sc-top-bar" data-uk-sticky="offset:48;">
				<div class="sc-top-bar-content uk-flex uk-flex-middle uk-width-1-1">
					<div class="uk-flex-1 uk-flex uk-flex-middle">
						<div>
							<PrettyRadio value="diffChars"
								class="p-radio"
								name="diffMode"
								@change="changeMode('diffChars')"
							>
								Chars
							</PrettyRadio>
						</div>
						<div class="uk-margin-medium-left">
							<PrettyRadio value="diffWords" class="p-radio" name="diffMode" @change="changeMode($event, 'diffWords')">
								Words
							</PrettyRadio>
						</div>
						<div class="uk-margin-medium-left">
							<PrettyRadio value="diffLines"
								class="p-radio"
								name="diffMode"
								checked
								@change="changeMode('diffLines')"
							>
								Lines
							</PrettyRadio>
						</div>
					</div>
					<div>
						<button v-if="reloadButton" class="sc-button sc-button-secondary sc-button-mini" @click="compare()">
							Compare
						</button>
					</div>
				</div>
			</div>
		</client-only>
		<div id="sc-page-content">
			<ScCard>
				<div class="uk-overflow-auto">
					<div class="uk-child-width-1-3@s uk-grid-collapse uk-grid-divider uk-grid" data-uk-grid>
						<div>
							<div class="sc-padding sc-padding-medium-ends">
								<p>Panel A</p>
								<ScTextarea v-model="panelA" mode="outline" :autosize="true"></ScTextarea>
							</div>
						</div>
						<div>
							<div class="sc-padding sc-padding-medium-ends">
								<p>Panel B</p>
								<ScTextarea v-model="panelB" mode="outline" :autosize="true"></ScTextarea>
							</div>
						</div>
						<div>
							<div class="sc-padding sc-padding-medium-ends">
								<p>Result</p>
								<pre ref="resultPanel"></pre>
							</div>
						</div>
					</div>
				</div>
			</ScCard>
		</div>
	</div>
</template>

<script>
import PrettyRadio from 'pretty-checkbox-vue/radio';
import ScTextarea from '~/components/Textarea'
const Diff = require('diff');

export default {
	name: 'PluginsDiffTool',
	components: {
		ScTextarea,
		PrettyRadio
	},
	data: () => ({
		panelA: 'import {classify, mergeOptions} from \'../util/index\';\n' +
				'\n' +
				'export default function (UIkit) {\n' +
				'\n' +
				'    UIkit.use = function (plugin) {\n' +
				'\n' +
				'        if (plugin.installed) {\n' +
				'            return;\n' +
				'        }\n' +
				'\n' +
				'        plugin.call(null, this);\n' +
				'        plugin.installed = true;\n' +
				'\n' +
				'        return this;\n' +
				'    };\n' +
				'\n' +
				'    UIkit.mixin = function (mixin) {\n' +
				'        this.options = mergeOptions(this.options, mixin);\n' +
				'    };\n' +
				'\n' +
				'    UIkit.extend = function (options) {\n' +
				'\n' +
				'        options = options || {};\n' +
				'\n' +
				'        var Super = this, name = options.name || Super.options.name;\n' +
				'        var Sub = createClass(name || \'UIkitComponent\');\n' +
				'\n' +
				'        Sub.prototype = Object.create(Super.prototype);\n' +
				'        Sub.prototype.constructor = Sub;\n' +
				'        Sub.options = mergeOptions(Super.options, options);\n' +
				'\n' +
				'        Sub[\'super\'] = Super;\n' +
				'        Sub.extend = Super.extend;\n' +
				'\n' +
				'        return Sub;\n' +
				'    };\n' +
				'\n' +
				'    UIkit.update = function (e) {\n' +
				'        for (var id in UIkit.instances) {\n' +
				'            if (UIkit.instances[id]._isReady) {\n' +
				'                UIkit.instances[id]._callUpdate(e);\n' +
				'            }\n' +
				'        }\n' +
				'    }\n' +
				'\n' +
				'}\n' +
				'\n' +
				'function createClass(name) {\n' +
				'    return new Function(`return function ${classify(name)} (options) { this._init(options); }`)();\n' +
				'}',
		panelB: 'import {$, apply, isString, mergeOptions, toNode} from \'uikit-util\';\n' +
				'\n' +
				'export default function (UIkit) {\n' +
				'\n' +
				'    const DATA = UIkit.data;\n' +
				'\n' +
				'    UIkit.use = function (plugin) {\n' +
				'\n' +
				'        if (plugin.installed) {\n' +
				'            return;\n' +
				'        }\n' +
				'\n' +
				'        plugin.call(null, this);\n' +
				'        plugin.installed = true;\n' +
				'\n' +
				'        return this;\n' +
				'    };\n' +
				'\n' +
				'    UIkit.mixin = function (mixin, component) {\n' +
				'        component = (isString(component) ? UIkit.component(component) : component) || this;\n' +
				'        component.options = mergeOptions(component.options, mixin);\n' +
				'    };\n' +
				'\n' +
				'    UIkit.extend = function (options) {\n' +
				'\n' +
				'        options = options || {};\n' +
				'\n' +
				'        const Super = this;\n' +
				'        const Sub = function UIkitComponent (options) {\n' +
				'            this._init(options);\n' +
				'        };\n' +
				'\n' +
				'        Sub.prototype = Object.create(Super.prototype);\n' +
				'        Sub.prototype.constructor = Sub;\n' +
				'        Sub.options = mergeOptions(Super.options, options);\n' +
				'\n' +
				'        Sub.super = Super;\n' +
				'        Sub.extend = Super.extend;\n' +
				'\n' +
				'        return Sub;\n' +
				'    };\n' +
				'\n' +
				'    UIkit.update = function (element, e) {\n' +
				'\n' +
				'        element = element ? toNode(element) : document.body;\n' +
				'\n' +
				'        path(element, element => update(element[DATA], e));\n' +
				'        apply(element, element => update(element[DATA], e));\n' +
				'\n' +
				'    };\n' +
				'\n' +
				'    let container;\n' +
				'    Object.defineProperty(UIkit, \'container\', {\n' +
				'\n' +
				'        get() {\n' +
				'            return container || document.body;\n' +
				'        },\n' +
				'\n' +
				'        set(element) {\n' +
				'            container = $(element);\n' +
				'        }\n' +
				'\n' +
				'    });\n' +
				'\n' +
				'    function update(data, e) {\n' +
				'\n' +
				'        if (!data) {\n' +
				'            return;\n' +
				'        }\n' +
				'\n' +
				'        for (const name in data) {\n' +
				'            if (data[name]._connected) {\n' +
				'                data[name]._callUpdate(e);\n' +
				'            }\n' +
				'        }\n' +
				'\n' +
				'    }\n' +
				'\n' +
				'    function path(node, fn) {\n' +
				'        if (node && node !== document.body && node.parentNode) {\n' +
				'            path(node.parentNode, fn);\n' +
				'            fn(node.parentNode);\n' +
				'        }\n' +
				'    }\n' +
				'\n' +
				'}',
		compareType: 'diffLines',
		reloadButton: false
	}),
	watch: {
		'panelA' (newVal) {
			if(newVal) {
				this.reloadButton = true
			}
		},
		'panelB' (newVal) {
			if(newVal) {
				this.reloadButton = true
			}
		}
	},
	mounted () {
		this.$nextTick(() => {
			// initial compare
			this.compare();
		})
	},
	methods: {
		changeMode (type) {
			this.compareType = type;
			this.compare();
		},
		compare () {
			let color = '';
			this.$refs.resultPanel.innerHTML = '';
			const diff = Diff[this.compareType](this.panelA, this.panelB);
			const fragment = document.createDocumentFragment();
			let span = null;
			diff.forEach(function (part){
				color = part.added ? 'md-bg-light-green-100' : part.removed ? 'md-bg-red-50 sc-text-line-through' : '';
				span = document.createElement('span');
				span.className += color;
				span.appendChild(document.createTextNode(part.value));
				fragment.appendChild(span);
			});
			this.$refs.resultPanel.appendChild(fragment);
			this.reloadButton = false;
		}
	}
}
</script>

<style lang="scss">
	@import '~scss/vue/_pretty_checkboxes';
</style>

