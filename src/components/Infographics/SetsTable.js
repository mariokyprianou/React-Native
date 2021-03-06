/*
 * Jira Ticket:
 * Created Date: Fri, 13th Nov 2020, 11:26:11 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import SetTableRow from './SetTableRow';
import {FlatList} from 'the-core-ui-module-tdlist';
import FadingBottomView from '../Views/FadingBottomView';
import parseISO from 'date-fns/parseISO';
import { differenceInDays } from 'date-fns';
import { isSameDay } from '../../utils/dateTimeUtils'; 

export default function SetsTable({selectedDate, date, weightData, weightPreference, setType, dropDownSelect}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const listRef = useRef();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      backgroundColor: colors.white100,
    },
    tableContainer: {
      flex: 1,
      width: '100%',
      minHeight: getHeight(220),
      alignSelf: 'center',
      paddingBottom: getHeight(20),
      paddingHorizontal: getWidth(15),
    },
    title: {
      ...textStyles.bold20_black100,
      marginVertical: getHeight(20),
      textAlign: 'left',
    },
    separator: {
      height: getHeight(1),
      width: '100%',
      backgroundColor: colors.brownishGrey10,
      marginVertical: getHeight(5),
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // let history = weightData;
  // const formattedHistory = history.reverse();

  const [data, setData] = useState([]);


  useEffect(()=> {
    const filteredData = weightData.filter(it =>  isSameDay(parseISO(it.createdAt), selectedDate));
    const formattedHistory = filteredData.sort((a, b)=> parseISO(a.createdAt) - parseISO(b.createdAt) || a.setNumber > b.setNumber);
    
    setData(formattedHistory);

  }, [weightData, selectedDate]);

  // ** ** ** ** ** RENDER ** ** ** ** **


  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.tableContainer}>
          <Text style={styles.title}>{date}</Text>

          {data.map( (item, index) => {
            return <View style={{height: getHeight(35)}}>
                  <SetTableRow
                    setNumber={item.setNumber + 1}
                    reps={item.quantity}
                    setType={setType}
                    weight={item.weight}
                    weightPreference={weightPreference}
                  />
                  {index !== data.length -1  &&  <View style={styles.separator} />}
              </View>
          })}
          
        </View>
      </ScrollView>
      <View
        style={{position: 'absolute', bottom: 0, left: 0, right: 0}}
        pointerEvents="none">
        <FadingBottomView height={80} />
      </View>
    </>
  );
}
