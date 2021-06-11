/*
 * Created Date: Fri, 27th Nov 2020, 19:01:31 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */
import {Dimensions, Platform} from 'react-native';

const isIPhoneXSize = (dim) => dim.height === 812 || dim.width === 812;

const isIPhoneXrSize = (dim) => dim.height === 896 || dim.width === 896;

const isIPhone12Size = (dim) => dim.height === 844 || dim.width === 844;

const isIPhone12ProMaxSize = (dim) => dim.height === 926 || dim.width === 926;

const isIPhone12MiniSize = (dim) => dim.height === 780 || dim.width === 780;

export default function isIphoneX() {
  const dim = Dimensions.get('window');

  return (
    // This has to be iOS
    Platform.OS === 'ios' &&
    // Check either, iPhone X or XR
    (isIPhoneXSize(dim) ||
      isIPhoneXrSize(dim) ||
      isIPhone12Size(dim) ||
      isIPhone12ProMaxSize(dim) ||
      isIPhone12MiniSize(dim))
  );
}
