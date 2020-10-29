/*
 * Created Date: Tue, 24th Dec 2019, 18:12:28 pm
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2019 The Distance
 */

import * as R from 'ramda';
import { NetInfo } from 'react-native';

export default isConnected = async () => {
	const connected = await NetInfo.getConnectionInfo()
		.then(connectionInfo => {
			const type = R.path(['type'], connectionInfo);
			if (type === 'unknown' || type === 'none') {
				return false;
			}
			return true;
		})
		.catch(err => {
			console.log('Network Connection Error:', err);
			return false;
		});
	return connected;
};
