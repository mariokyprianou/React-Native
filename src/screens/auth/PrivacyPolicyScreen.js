/*
 * Created Date: Fri, 6th Nov 2020, 10:23:49 am
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */

import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Form, FormHook} from 'the-core-ui-module-tdforms';
import {ScaleHook} from 'react-native-design-to-component';

import DefaultButton from '../../components/Buttons/DefaultButton';
import useTheme from '../../hooks/theme/UseTheme';
import useTermsPolicyData from '../../hooks/data/useTermsPolicyData';
import TermsPolicyContentView from '../../components/Views/TermsPolicyContentView';

{
  /* <AppStack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{
          header: () => (
            <Header
              title={"Privacy"}
              noSearch
              showBurger={false}
              showModalCross

            />
          ),
        }}
      /> */
}

export default function RegisterScreen({navigation}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {textStyles, colors} = useTheme();
  const {getHeight} = ScaleHook();

  const {privacyPolicy, isHtml} = useTermsPolicyData();

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
      <TermsPolicyContentView isHtml={isHtml} content={privacyPolicy} />
      <View style={styles.buttonContainer}>
        <DefaultButton type="done" variant="white" icon="chevron" />
      </View>
    </View>
  );
}