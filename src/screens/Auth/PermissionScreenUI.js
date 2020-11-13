/*
 * Created Date: Thu, 5th Nov 2020, 19:49:19 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';

import DefaultButton from '../../components/Buttons/DefaultButton';
import useTheme from '../../hooks/theme/UseTheme';
import Header from '../../components/Headers/Header';
import Spacer from '../../components/Utility/Spacer';

const defaultImage = require('../../../assets/images/analyticsImage.png');

const PermissionScreenUI = ({
  title = 'Supply title',
  text = 'Suppply text',
  image = defaultImage,
  buttonType = 'allowAnalytics',
  bottomButtonType = 'skip',
  onPressButton,
  onPressBottomButton,
  disabled = false,
}) => {
  // MARK: - Hooks
  const {getHeight, getWidth} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const navigation = useNavigation();

  // MARK: - Use Effect
  useEffect(() => {
    navigation.setOptions({
      header: () => <Header title={title} showModalCross />,
    });
  }, []);

  // MARK: - Style
  const styles = StyleSheet.create({
    constainer: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
    },
    textContainer: {
      width: '90%',
      flex: 1,
    },
    text: {
      ...textStyles.medium15_brownishGrey100,
      textAlign: 'center',
    },
    imageView: {
      width: getWidth(254),
      height: getHeight(240),
      marginTop: getHeight(46),
    },
    bottomContainer: {
      marginBottom: getHeight(35),
      marginTop: getHeight(46),
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  });

  // MARK: - Render
  return (
    <View style={styles.constainer}>
      <Image style={styles.imageView} source={image} resizeMode={'contain'} />
      <View style={styles.bottomContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{text}</Text>
        </View>
        <Spacer height={50} />
        <DefaultButton
          type={buttonType}
          variant="white"
          onPress={onPressButton}
          disabled={disabled}
        />
        <DefaultButton
          type={bottomButtonType}
          variant="transparent"
          onPress={onPressBottomButton}
        />
      </View>
    </View>
  );
};

export default PermissionScreenUI;
