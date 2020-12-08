/*
 * Jira Ticket:
 * Created Date: Wed, 4th Nov 2020, 10:10:12 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import {useNavigation} from '@react-navigation/native';

const fakeHeadshot = require('../../../assets/fakeHeadshot.png');

export default function WorkoutHomeHeader({name = 'Katrina'}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;
  const navigation = useNavigation();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: getHeight(80),
      flexDirection: 'row',
      alignItems: 'flex-end',
      backgroundColor: colors.white100,
    },
    innerContainer: {
      width: '100%',
      height: getHeight(40),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: getWidth(20),
      paddingBottom: getHeight(10),
      backgroundColor: colors.white100,
    },
    leftContainer: {
      flexDirection: 'row',
    },
    headshot: {
      height: getHeight(32.5),
      width: getHeight(32.5),
    },
    name: {
      ...textStyles.bold22_black100,
      marginLeft: getWidth(10),
    },
    link: {
      ...textStyles.semiBold14_black100,
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handlePress() {
    navigation.navigate('AuthContainer', {
      screen: 'MeetYourIcons',
      params: {switchProgramme: true},
    });
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.leftContainer}>
          <Image source={fakeHeadshot} style={styles.headshot} />
          <Text style={styles.name}>{name}</Text>
        </View>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.link}>{WorkoutDict.AllProgrammes}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
