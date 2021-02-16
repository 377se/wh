var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function confirmIconPlugin (pluginConfig) {
	var defaultConfig = {
		confirmIcon: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http:www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.1" points="4,10 8,15 17,4"></polyline></svg>',
		confirmText: "",
		showAlways: false
	};

	var config = _extends({}, defaultConfig, pluginConfig || {});

	return function (fp) {
		fp.confirmContainer = fp._createElement("div", "flatpickr-confirm", config.confirmText);
		fp.confirmContainer.innerHTML += config.confirmIcon;

		fp.confirmContainer.addEventListener("click", fp.close);

		var hooks = {
			onReady: function onReady () {
				fp.calendarContainer.appendChild(fp.confirmContainer);
			}
		};

		if (config.showAlways) fp.confirmContainer.classList.add("visible");else hooks.onChange = function (dateObj, dateStr) {
			if (dateStr) return fp.confirmContainer.classList.add("visible");
			fp.confirmContainer.classList.remove("visible");
		};

		return hooks;
	};
}

if (typeof module !== "undefined") module.exports = confirmIconPlugin;
