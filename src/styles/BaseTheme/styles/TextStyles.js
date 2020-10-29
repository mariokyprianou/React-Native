/*
 * Created Date: Fri, 3rd Jan 2020, 13:55:15 pm
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import Colors from './Colors';
import FontSizes from './FontSizes';
import FontFamilies from './FontFamilies';
import FontWeights from './FontWeights';

// Don't include FontFamilies.ff1 if on Android you want it Bold or Regular

const TextStyles = {
	title1Light: {
		fontWeight: FontWeights.wt2,
		fontFamily: FontFamilies.ff1,
		fontSize: FontSizes.pt34,
		color: Colors.black,
		letterSpacing: 0
	},
	title2Regular: {
		fontWeight: FontWeights.wt4,
		fontSize: FontSizes.pt28,
		color: Colors.black,
		letterSpacing: 0
	},
	title3Regular: {
		fontWeight: FontWeights.wt4,
		fontSize: FontSizes.pt22,
		color: Colors.black,
		letterSpacing: 0
	},
	headerRegular: {
		fontWeight: FontWeights.wt4,
		fontSize: FontSizes.pt20,
		color: Colors.black,
		letterSpacing: 0
	},
	headlineBold: {
		fontWeight: FontWeights.wt7,
		fontSize: FontSizes.pt18,
		color: Colors.black,
		letterSpacing: 0
	},
	subheadMedium: {
		fontWeight: FontWeights.wt5,
		fontSize: FontSizes.pt15,
		color: Colors.black,
		letterSpacing: 0
	},
	bodyRegular: {
		fontWeight: FontWeights.wt4,
		fontSize: FontSizes.pt16,
		color: Colors.black,
		letterSpacing: 0
	},
	subtextRegular: {
		fontWeight: FontWeights.wt4,
		fontSize: FontSizes.pt13,
		color: Colors.black,
		letterSpacing: 0
	},
	caption1Medium: {
		fontWeight: FontWeights.wt5,
		fontFamily: FontFamilies.ff1,
		fontSize: FontSizes.pt14,
		color: Colors.black,
		letterSpacing: 0
	},
	caption2Regular: {
		fontWeight: FontWeights.wt4,
		fontSize: FontSizes.pt12,
		color: Colors.black,
		letterSpacing: 0
	},
	caption3Regular: {
		fontWeight: FontWeights.wt4,
		fontSize: FontSizes.pt10,
		color: Colors.black,
		letterSpacing: 0
	}
};

export default TextStyles;
