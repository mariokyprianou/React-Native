/*
 * Created Date: Thu, 16th Jan 2020, 10:43:16 am
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import RNBundleChecksum from 'react-native-bundle-checksum';

import Environment from '../environment/Environment';
import Secrets from '../environment/Secrets';

export default isValidChecksum = async () => {
	if (!__DEV__) {
		try {
			const checksum = await RNBundleChecksum.getChecksum();
			const correctChecksum = Secrets(Environment).checksum;
			const checksumTampered = checksum !== correctChecksum;
			return !checksumTampered;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	return true;
};
