/*
 * Created Date: Thu, 14th Jan 2021, 13:13:52 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */
import {Alert} from 'react-native';

const displayAlert = ({title, text, onPress, buttons}) => {
  // MARK: - Localisation
  const buttonsProp = buttons || [
    {
      text: 'OK',
      onPress,
    },
  ];
  Alert.alert(title, text, buttonsProp, {
    cancelable: false,
  });
};

export default displayAlert;
