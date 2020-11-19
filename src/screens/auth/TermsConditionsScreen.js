/*
 * Created Date: Fri, 6th Nov 2020, 10:23:25 am
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';

import DefaultButton from '../../components/Buttons/DefaultButton';
import useTheme from '../../hooks/theme/UseTheme';
import useTermsPolicyData from '../../hooks/data/useTermsPolicyData';
import TermsPolicyContentView from '../../components/Views/TermsPolicyContentView';
import Header from '../../components/Headers/Header';

export default function TermsConditionsScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const navigation = useNavigation();

  navigation.setOptions({
    header: () => <Header title={'Terms & Conditions'} goBack />,
  });

  const {
    cellFormStyles,
    dropdownStyle,
    cellFormConfig,
    textStyles,
    colors,
  } = useTheme();
  const {getHeight, getWidth, fontSize} = ScaleHook();

  const {termsAndConditions, isHtml} = useTermsPolicyData();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    render: {
      container: {
        flex: 1,
      },
    },

    buttonContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      marginBottom: getHeight(40),
      alignItems: 'center',
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **

  // ** ** ** ** ** RENDER ** ** ** ** **

  return (
    <View style={styles.render.container}>
      <TermsPolicyContentView isHtml={isHtml} content={termsAndConditions} />
      <View style={styles.buttonContainer}>
        <DefaultButton
          type="done"
          variant="white"
          icon="chevron"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
}
