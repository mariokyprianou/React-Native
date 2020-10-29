/*
 * Created Date: Sat, 28th Dec 2019, 16:01:17 pm
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2019 The Distance
 */

import Color from 'color';

const LightenColor = (inputColor, value = 0.5) =>
	Color.rgb(inputColor)
		.lighten(value)
		.hex();

export default LightenColor;
