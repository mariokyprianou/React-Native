/*
 * Created Date: Fri, 3rd Jan 2020, 13:52:06 pm
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import Color from 'color';

const hexToRgb = hex => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
		  }
		: null;
};

const ApplyOpacity = (inputHex, alpha) => {
	const rgb = hexToRgb(inputHex);

	if (rgb) {
		return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
	}

	return inputHex;
};

const darkenColor = (inputColor, value = 0.5, alpha = 1) => {
	const hex = Color.rgb(inputColor)
		.darken(value)
		.hex();
	return ApplyOpacity(hex, alpha);
};

export default darkenColor;
