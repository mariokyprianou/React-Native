/*
 * Created Date: Fri, 3rd Jan 2020, 13:54:13 pm
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import { Platform } from 'react-native';
import { width } from 'react-native-dimension';

const FontSizes = {
	...Platform.select({
		ios: {
			pt10: width(2.67),
			pt11: width(2.95),
			pt12: width(3.2),
			pt13: width(3.445),
			pt14: width(3.73),
			pt15: width(4),
			pt16: width(4.27),
			pt18: width(4.8),
			pt20: width(5.33),
			pt22: width(5.87),
			pt28: width(7.47),
			pt34: width(9.07),
			pt45: width(11.99)
		},
		android: {
			pt10: width(2.67),
			pt11: width(2.95),
			pt12: width(3.2),
			pt13: width(3.445),
			pt14: width(3.73),
			pt15: width(4),
			pt16: width(4.27),
			pt18: width(4.8),
			pt20: width(5.33),
			pt22: width(5.87),
			pt28: width(7.47),
			pt34: width(9.07),
			pt45: width(11.99)
		},
		web: {}
	})
};

export default FontSizes;
