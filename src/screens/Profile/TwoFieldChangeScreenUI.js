/*
 * Created Date: Mon, 9th Nov 2020, 13:10:44 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';
import {Form} from 'the-core-ui-module-tdforms';

import DefaultButton from '../../components/Buttons/DefaultButton';
import useTheme from '../../hooks/theme/UseTheme';
import Header from '../../components/Headers/Header';
import PasswordEyeIcon from '../../components/cells/PasswordEyeIcon';

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
  const {getHeight, getWidth, fontSize} = ScaleHook();
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
        type: 'text',
        variant: 'password',
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
      inputContainerStyle: {
        ...cellFormStyles.inputContainerStyle,
        paddingRight: getWidth(6),
        marginTop: 0,
      },
      style: {
        ...cellFormStyles.style,
        lineHeight: fontSize(20),
        flex: 1,
        height: '100%',
      },
    },
    {
      name: secondFieldName,
      type: 'text',
      label: secondFieldLabel,
      ...cellSetupFor(secondFieldType),
      ...cellFormStyles,
      inputContainerStyle: {
        ...cellFormStyles.inputContainerStyle,
        paddingRight: getWidth(6),
        marginTop: 0,
      },
      style: {
        ...cellFormStyles.style,
        lineHeight: fontSize(20),
        flex: 1,
        height: '100%',
        
      },
    },
  ];

  const config = {
    ...cellFormConfig,
  };

  // MARK: - Styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundWhite100,
      justifyContent: 'space-between',
      paddingBottom: getHeight(40),
      alignItems: 'center',
    },
    scrollViewContainer: {
      height: '100%',
      width: '100%',
      alignSelf: 'center',
    },
    formContainer: {
      width: '90%',
      alignSelf: 'center',
    },
  });

  // MARK: - Render
  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.scrollViewContainer}>
        <View style={styles.formContainer}>
          <Form cells={cells} config={config} />
        </View>
      </ScrollView>
      <DefaultButton
        type={buttonType}
        variant="white"
        onPress={onPressChange}
      />
    </View>
  );
};

export default TwoFieldChangeScreenUI;
