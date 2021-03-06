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
import {differenceInDays, parseISO} from 'date-fns';
import {useBackHandler} from '@react-native-community/hooks';
import {filter} from 'ramda';
import {isSameDay} from '../../utils/dateTimeUtils';

export default function WeightCaptureScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getScaledHeight, getWidth, fontSize} = ScaleHook();
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
    params: {exerciseName = 'Squats', weightHistory, weightPreference, setType},
  } = useRoute();

  const [historyData, setHistoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dropdownData, setDropDownData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [graphIsSelectable, setGraphIsSelectable] = useState(false);

  useBackHandler(() => {
    navigation.goBack();
    return true;
  });

  function groupBy(key) {
    return function group(array) {
      return array.reduce((acc, obj) => {
        const property = obj[key];
        acc[property] = acc[property] || [];
        acc[property].push(obj);
        return acc;
      }, {});
    };
  }
  const groupByDate = groupBy('date');

  useEffect(() => {
    navigation.setOptions({
      header: () => <Header title={WorkoutDict.WeightsTitle} showModalCross />,
    });

    const data = processChallengeHistory(
      weightHistory,
      weightPreference,
      'WEIGHT',
    ).sort(
      (a, b) =>
        parseISO(a.createdAt) - parseISO(b.createdAt) ||
        a.setNumber > b.setNumber,
    );

    const dropdown = data
      .map((event) => `${event.quantity}`)
      .filter((value, index, self) => self.indexOf(value) === index);

    // Initial date is last available3 date from historic date
    if (data.length > 0) {
      setSelectedDate(parseISO(data.pop().createdAt));
    }

    setHistoryData(data);
    setFilteredData(data);
    setDropDownData(dropdown);
  }, []);

  const dropDownSelect = getValues('repsHistory').repsHistory;

  // Drop down changed
  useEffect(() => {
    const data = processChallengeHistory(
      weightHistory,
      weightPreference,
      'WEIGHT',
    ).sort(
      (a, b) =>
        parseISO(a.createdAt) - parseISO(b.createdAt) ||
        a.setNumber > b.setNumber,
    );

    if (!dropDownSelect) {
      setFilteredData(data);
    } else {
      const filter = data.filter(
        (it) => it.quantity === Number(dropDownSelect),
      );
      setFilteredData(filter);

      // If selectedDate dowsnt have any data in the current filtered array, set date to the latest available
      if (!selectedDate) {
        setSelectedDate(parseISO(filter[filter.length - 1].createdAt));
      } else {
        const dateHasData = filter.find((it) =>
          isSameDay(parseISO(it.createdAt), selectedDate),
        );
        if (!dateHasData) {
          setSelectedDate(parseISO(filter[filter.length - 1].createdAt));
        }
      }
    }
  }, [historyData, dropDownSelect]);

  function setDate(index) {
    if (!graphIsSelectable) {
      setGraphIsSelectable(true);
    }

    const chartData = getChartData(filteredData);
    setSelectedDate(parseISO(chartData[index].createdAt));
  }

  function getChartData(data) {
    const chartData = Object.values(groupByDate(data)).map((it) => {
      return it.sort((a, b) => a.weight < b.weight)[0];
    });
    return chartData;
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
      top: getScaledHeight(490),
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
      placeholder:
        setType === 'REPS'
          ? WorkoutDict.WeightsRepsSelector
          : WorkoutDict.WeightsSecsSelector,
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

  let titletext =
    exerciseName.length > 20
      ? `${exerciseName.substring(0, 17)}...`
      : exerciseName;
  titletext = `${titletext} -`;

  const chartData = getChartData(filteredData);

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
            data={chartData}
            weightPreference={weightPreference}
            setDate={setDate}
            selectable={graphIsSelectable}
            background={false}
          />
        </View>
        <Spacer height={30} />
        {selectedDate && (
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
