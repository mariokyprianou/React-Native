/*
 * Jira Ticket:
 * Created Date: Wed, 4th Nov 2020, 10:10:12 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import FastImage from 'react-native-fast-image';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import {useNavigation} from '@react-navigation/native';
import UseData from '../../hooks/data/UseData';

export default function WorkoutHomeHeader() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, radius} = ScaleHook();
  const {colors, textStyles, Constants} = useTheme();
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;
  const navigation = useNavigation();

  const [trainerData, setTrainerData] = useState({});

  const {programme} = UseData();

  const height = Constants.HEADER_HEIGHT;

  useEffect(() => {
    if (programme) {
      setTrainerData({
        name: programme.trainer.name,
        image: programme.programmeImage,
      });
    }
  }, [programme]);

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: height,
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
      borderRadius: radius(20),
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
          <FastImage
            source={{uri: trainerData.image}}
            style={styles.headshot}
          />
          <Text style={styles.name}>{trainerData.name}</Text>
        </View>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.link}>{WorkoutDict.AllProgrammes}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
