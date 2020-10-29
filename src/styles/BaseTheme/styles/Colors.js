/*
 * Created Date: Fri, 3rd Jan 2020, 13:51:31 pm
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import DarkenColor from '../utils/darkenColor';
import LightenColor from '../utils/lightenColor';

const primary = '#2aaeba';

const Colors = {
	primary,
	primaryDark: DarkenColor(primary, 0.3),
	primaryLight: LightenColor(primary, 0.7),
	primaryMid: LightenColor(primary, 0.4),
	divider: 'rgba(0, 0, 0, 0.12)',
	grey0: '#393e42',
	grey1: '#43484d',
	grey2: '#5e6977',
	grey3: '#86939e',
	grey4: '#bdc6cf',
	grey5: '#e1e8ee',
	black: '#000000',
	white: '#ffffff',
	darkGrey: '#6d6e6e',
	mediumGrey: '#d5d5d5',
	error: '#ee0e0e',
	secondary: '#ff6600',
	alphaBlack: 'rgba(0, 0, 0, 0.3)',
	alphaWhite: 'rgba(255, 255, 255, 0.3)',
	aquaBlue: 'rgb(42, 174, 186)',
	orange: 'rgb(236, 100, 42)'
};

export default Colors;
