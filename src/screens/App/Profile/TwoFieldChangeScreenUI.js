/*
 * Created Date: Mon, 9th Nov 2020, 13:10:44 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';
import {Form} from 'the-core-ui-module-tdforms';

import DefaultButton from '../../../components/Buttons/DefaultButton';
import useTheme from '../../../hooks/theme/UseTheme';
import Header from '../../../components/Headers/Header';
import PasswordEyeIcon from '../../../components/cells/PasswordEyeIcon';

const TwoFieldChangeScreenUI = ({
  screenTitle = 'Supply Screen Title',
  firstFieldLabel = 'Supply title 1',
  secondFieldLabel = 'Supply title 2',
  firstFieldType = 'password',
  secondFieldType = 'password',
  firstFieldName = 'changeValue1',
  secondFieldName = 'changeValue2',
  buttonType,
  onPressChange,
}) => {
  // MARK: - Hooks
  const {getHeight, getWidth} = ScaleHook();
  const {colors, cellFormConfig, cellFormStyles} = useTheme();
  const navigation = useNavigation();

  // MARK: - Use Effect
  useEffect(() => {
    navigation.setOptions({
      header: () => <Header title={screenTitle} goBack />,
    });
  }, []);

  // MARK: - Form
  const cellSetupFor = (type) => {
    if (type === 'password') {
      return {
        variant: 'password',
        rightAccessory: () => <PasswordEyeIcon />,
        textContentType: 'password',
        autoCompleteType: 'password',
        autoCorrect: false,
      };
    }
    if (type === 'emailAddress') {
      return {
        variant: 'email',
        textContentType: 'emailAddress',
        autoCompleteType: 'email',
      };
    }
    return {};
  };

  const cells = [
    {
      name: firstFieldName,
      type: 'text',
      label: firstFieldLabel,
      ...cellSetupFor(firstFieldType),
      ...cellFormStyles,
    },
    {
      name: secondFieldName,
      type: 'text',
      label: secondFieldLabel,
      ...cellSetupFor(secondFieldType),
      ...cellFormStyles,
    },
  ];

  const config = {
    ...cellFormConfig,
  };

  // MARK: - Styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.offWhite,
      justifyContent: 'space-between',
      paddingBottom: getHeight(40),
      alignItems: 'center',
    },
    formContainer: {
      width: '90%',
    },
  });

  // MARK: - Render
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Form cells={cells} config={config} />
      </View>
      <DefaultButton
        type={buttonType}
        variant="white"
        onPress={onPressChange}
        icon="chevron"
      />
    </View>
  );
};

export default TwoFieldChangeScreenUI;