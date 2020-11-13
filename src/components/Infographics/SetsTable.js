/*
 * Jira Ticket:
 * Created Date: Fri, 13th Nov 2020, 11:26:11 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useRef} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import SetTableRow from './SetTableRow';
import {FlatList} from 'the-core-ui-module-tdlist';
import useWeightHistory from '../../hooks/data/useWeightHistory';
import FadingBottomView from '../Views/FadingBottomView';

export default function SetsTable({date}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const listRef = useRef();
  const {weightHistoryData} = useWeightHistory();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: getWidth(15),
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
    },
    title: {
      ...textStyles.bold20_black100,
      marginVertical: getHeight(20),
    },
    separator: {
      height: getHeight(1),
      width: '100%',
      backgroundColor: colors.brownishGrey10,
      marginVertical: getHeight(5),
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.tableContainer}>
          <Text style={styles.title}>{date}</Text>
          <FlatList
            ref={listRef}
            data={weightHistoryData}
            scrollEnabled={false}
            renderItem={({item}) => (
              <SetTableRow
                setNumber={item.setNumber}
                reps={item.reps}
                weight={item.weight}
              />
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </ScrollView>
      <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
        <FadingBottomView height={100} />
      </View>
    </>
  );
}
