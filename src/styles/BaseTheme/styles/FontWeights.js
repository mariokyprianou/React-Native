/*
 * Created Date: Fri, 3rd Jan 2020, 13:54:39 pm
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import { Platform } from 'react-native';

const FontWeights = {
	...Platform.select({
		ios: {
			wt2: '200', // Zeplin - Light
			wt4: '400', // Zeplin - Regular
			wt5: '700', // Zeplin - Medium
			wt7: '900' // Zeplin - Bold
		},
		android: {
			wt2: '100',
			wt4: '300',
			wt5: '700',
			wt7: '900'
		},
		web: {}
	})
};

export default FontWeights;
