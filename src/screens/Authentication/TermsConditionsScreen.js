/*
 * Created Date: Fri, 6th Nov 2020, 10:23:25 am
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {View} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {useNavigation} from '@react-navigation/native';
import DefaultButton from '../../components/Buttons/DefaultButton';
import useTheme from '../../hooks/theme/UseTheme';
import TermsPolicyContentView from '../../components/Views/TermsPolicyContentView';
import Header from '../../components/Headers/Header';
import useDictionary from '../../hooks/localisation/useDictionary';
import useCommonData from '../../hooks/data/useCommonData';

export default function TermsConditionsScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const navigation = useNavigation();
  const {dictionary} = useDictionary();
  const {AuthDict} = dictionary;
  const {legals} = useCommonData();
  const {colors} = useTheme();
  const {getHeight} = ScaleHook();

  navigation.setOptions({
    header: () => (
      <Header title={AuthDict.TermsAndConditionsScreenTitle} goBack />
    ),
  });

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    render: {
      container: {
        flex: 1,
        backgroundColor: colors.backgroundWhite100,
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
      <TermsPolicyContentView
        isHtml={false}
        content={legals.termsAndConditions}
      />
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
