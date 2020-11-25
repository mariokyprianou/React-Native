/*
 * Jira Ticket:
 * Created Date: Fri, 13th Nov 2020, 09:48:32 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Headers/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import ProgressChart from '../../components/Infographics/ProgressChart';
import useChallenge from '../../hooks/data/useChallenge';
import Spacer from '../../components/Utility/Spacer';
import DefaultButton from '../../components/Buttons/DefaultButton';
import SetsTable from '../../components/Infographics/SetsTable';
import format from 'date-fns/format';

export default function WeightCaptureScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;
  const {challengeHistoryData, repsHistoryData} = useChallenge();
  const navigation = useNavigation();

  const today = new Date();
  const date = format(today, 'do LLL yyyy');

  navigation.setOptions({
    header: () => <Header title={WorkoutDict.WeightsTitle} showModalCross />,
  });

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.veryLightPink100,
      height: '100%',
      width: '100%',
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: getHeight(40),
      width: '90%',
      alignSelf: 'center',
      zIndex: 9,
    },
    title: {
      ...textStyles.bold20_black100,
      textAlign: 'left',
    },
    dropdown: {
      flexDirection: 'row',
      zIndex: 9,
    },
    dropdownContainer: {
      height: getHeight(30),
      width: getWidth(95),
    },
    dropdownBox: {
      backgroundColor: colors.veryLightPink100,
      borderColor: colors.veryLightPink100,
    },
    dropdownList: {
      backgroundColor: colors.veryLightPink100,
    },
    dropdownArrow: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
    subtitleContainer: {
      width: '90%',
      alignSelf: 'center',
      marginBottom: getHeight(15),
    },
    subtitle: {
      ...textStyles.regular15_brownishGrey100,
    },
    chartCard: {
      height: getHeight(200),
      width: '90%',
      alignSelf: 'center',
      shadowColor: colors.black10,
      shadowOffset: {width: 0, height: 3},
      shadowRadius: 6,
      shadowOpacity: 1,
      elevation: 6,
      paddingHorizontal: getWidth(5),
    },
    scrollCard: {
      height: getHeight(220),
      marginBottom: getHeight(-10),
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Squats -</Text>
          <DropDownPicker
            items={repsHistoryData}
            defaultValue={null}
            placeholder={WorkoutDict.Reps_}
            placeholderStyle={{
              ...textStyles.bold20_black100,
              textAlign: 'left',
            }}
            containerStyle={styles.dropdownContainer}
            style={styles.dropdownBox}
            dropDownStyle={styles.dropdownList}
            onChangeItem={(item) => onPress(item, 'after')}
            arrowStyle={styles.dropdownArrow}
          />
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>{WorkoutDict.PickAWeight}</Text>
        </View>
        <View style={styles.chartCard}>
          <ProgressChart data={challengeHistoryData} />
        </View>
        <Spacer height={30} />
        <View style={{...styles.chartCard, ...styles.scrollCard}}>
          <SetsTable date={date} />
        </View>
        <View style={styles.buttonContainer}>
          <DefaultButton type="done" variant="white" icon="chevron" />
        </View>
      </View>
    </View>
  );
}
