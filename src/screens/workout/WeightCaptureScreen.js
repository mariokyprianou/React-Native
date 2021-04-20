/*
 * Jira Ticket:
 * Created Date: Fri, 13th Nov 2020, 09:48:32 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect, useState} from 'react';
import {View, Text, Platform} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Headers/Header';
import WeightChart from '../../components/Infographics/WeightChart';
import Spacer from '../../components/Utility/Spacer';
import DefaultButton from '../../components/Buttons/DefaultButton';
import SetsTable from '../../components/Infographics/SetsTable';
import processChallengeHistory from '../../utils/processChallengeHistory';
import {Form, FormHook} from 'the-core-ui-module-tdforms';
import TDIcon from 'the-core-ui-component-tdicon';
import {useRoute} from '@react-navigation/core';
import format from 'date-fns/format';
import { differenceInDays, parseISO } from 'date-fns';


export default function WeightCaptureScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {
    colors,
    textStyles,
    cellFormStyles,
    cellFormConfig,
    dropdownStyle,
  } = useTheme();
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;
  const navigation = useNavigation();
  const {cleanErrors, getValues, updateError, cleanValues} = FormHook();

  const {
    params: {exerciseName = "Squats", weightHistory, weightPreference, setType},
  } = useRoute();
  
  const [historyData, setHistoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dropdownData, setDropDownData] = useState([]);
  const [selectedDate, setSelectedDate] = useState();


  useEffect(()=> {
    navigation.setOptions({
      header: () => <Header title={WorkoutDict.WeightsTitle} showModalCross />,
    });

    const data = processChallengeHistory(weightHistory, weightPreference, "WEIGHT");

    setHistoryData(data);
    setFilteredData(data);

    const dropdown = data
    .map((event) => `${event.quantity}`)
    .filter((value, index, self) => self.indexOf(value) === index);

    setDropDownData(dropdown);

    // Initial date is last available3 date from historic date
    if (data.length > 0) {
      setSelectedDate(parseISO(data.pop().createdAt));
    }

  }, []);


  const dropDownSelect = getValues('repsHistory').repsHistory;

  // Drop down changed
  useEffect(()=> {
  const data = processChallengeHistory(weightHistory, weightPreference, "WEIGHT");

  if (!dropDownSelect) {
      setFilteredData(data)
    }
    else {
      setFilteredData(data.filter(it => it.quantity === Number(dropDownSelect)))
    }
  }, [historyData, dropDownSelect])
  
  function setDate(index) {    
    setSelectedDate(parseISO(filteredData[index].createdAt));
  }



  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    card: {
      backgroundColor: colors.backgroundWhite100,
      height: '100%',
      width: '100%',
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: getHeight(30),
      width: '90%',
      alignSelf: 'center',
      zIndex: 9,
    },
    title: {
      ...textStyles.bold20_black100,
      textAlign: 'left',
    
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
      backgroundColor: colors.white100,
      alignSelf: 'center',
      shadowColor: colors.black10,
      shadowOffset: {width: 0, height: 3},
      shadowRadius: 6,
      shadowOpacity: 1,
      elevation: 4,
    },
    scrollCard: {
      height: getHeight(220),
      marginBottom: getHeight(-10),
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
      position: 'absolute',
      top: getHeight(490),
      elevation: 9,
    },
    iconStyle: {
      size: fontSize(12),
      solid: true,
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **

  const cells = [
    {
      name: 'repsHistory',
      type: 'dropdown',
      placeholder: 'Reps',
      data: ['', ...dropdownData],
      underline: false,
      rightAccessory: () => (
        <View>
          <TDIcon input="chevron-down" inputStyle={styles.iconStyle} />
        </View>
      ),
      iconTintColor: colors.black100,
      ...cellFormStyles,
      ...dropdownStyle,
      inputContainerStyle: {
        paddingLeft: getWidth(7),
        width: getWidth(75),
        height: getHeight(30),
        marginBottom: Platform.OS === 'ios' ? getHeight(30) : getHeight(36),
      },
      inputStyle: {
        ...textStyles.bold20_black100,
      },
    },
  ];
  const config = {
    ...cellFormConfig,
  };


  
  let titletext = exerciseName.length > 20 ? `${exerciseName.substring(0, 17)}...` : exerciseName;
  titletext = `${titletext} -`;
  
  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{titletext}</Text>
          <Form {...{cells, config}} />
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>{WorkoutDict.PickAWeight}</Text>
        </View>
        <View style={styles.chartCard}>
          <WeightChart
            data={filteredData}
            weightPreference={weightPreference}
            setDate={setDate}
            selectable={true}
          />
        </View>
        <Spacer height={30} />
        {selectedDate &&
        (
          <View style={{...styles.chartCard, ...styles.scrollCard}}>
          <SetsTable
            selectedDate={selectedDate}
            date={format(selectedDate, 'do LLL yyyy')}
            weightData={filteredData}
            weightPreference={weightPreference}
            setType={setType}
            dropDownSelect={dropDownSelect}
          />
        </View>
        )}
        
        <View style={styles.buttonContainer}>
          <DefaultButton
            type="done"
            variant="white"
            icon="chevron"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </View>
  );
}
