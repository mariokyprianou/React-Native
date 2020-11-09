/*
 * Created Date: Thu, 5th Nov 2020, 19:49:19 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import DefaultButton from '../../components/Buttons/DefaultButton';
import ModalHeader from '../../components/Headers/ModalHeader';
import {useNavigation} from '@react-navigation/native';

import useTheme from '../../hooks/theme/UseTheme';

const defaultImage = require('../../../assets/images/analyticsImage.png');

const PermissionScreen = ({
  title = 'Supply title',
  text = 'Suppply text',
  image = defaultImage,
  buttonType = 'allowAnalytics',
  onPressButton,
  onPressSkip,
}) => {
  // MARK: - Hooks
  const {getHeight, getWidth} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const navigation = useNavigation();

  // MARK: - Use Effect

  useEffect(() => {
    navigation.setOptions({
      // header: () => <Header title={'Create account'} goBack />,
    });
  }, []);
  // MARK: - Style

  const styles = StyleSheet.create({
    constainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    innerContainer: {
      flex: 1,
      justifyContent: 'space-between',
    },

    title: {
      ...textStyles.bold22_black100,
    },
    text: {
      ...textStyles.medium15_brownishGrey100,
      textAlign: 'center',
    },
    imageView: {
      width: getWidth(254),
      height: getHeight(240),
      marginVertical: getHeight(46),
    },
    buttonsContainer: {
      marginTop: getHeight(50),
    },
  });
  // MARK: - Render
  return (
    <View style={styles.constainer}>
      <ModalHeader title={title} />
      <View style={styles.innerContainer}>
        <Image style={styles.imageView} source={image} resizeMode={'contain'} />
        <Text style={styles.text}>{text}</Text>
        <View style={styles.buttonsContainer}>
          <DefaultButton
            type={buttonType}
            variant="white"
            onPress={onPressButton}
          />
          <DefaultButton
            type="skip"
            variant="transparent"
            onPress={onPressSkip}
          />
        </View>
      </View>
    </View>
  );
};

export default PermissionScreen;
