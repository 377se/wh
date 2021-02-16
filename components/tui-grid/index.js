import Grid from './Grid.vue';

class CustomTextEditor {
	constructor (props) {
		const el = document.createElement('input');
		const { maxLength } = props.columnInfo.editor.options;

		el.type = 'text';
		el.maxLength = maxLength;
		el.value = String(props.value);

		this.el = el;
	}
	getElement () {
		return this.el;
	}
	getValue () {
		return this.el.value;
	}
	mounted () {
		this.el.select();
	}
}

export {
	Grid,
	CustomTextEditor
};
