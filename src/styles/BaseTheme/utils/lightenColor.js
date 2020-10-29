/*
 * Created Date: Fri, 3rd Jan 2020, 13:52:36 pm
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import Color from 'color';

const LightenColor = (inputColor, value = 0.5) =>
	Color.rgb(inputColor)
		.lighten(value)
		.hex();

export default LightenColor;
