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
import FadingBottomView from '../Views/FadingBottomView';

export default function SetsTable({date, weightData, weightPreference}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const listRef = useRef();

  let history = [...weightData];
  const formattedHistory = history.reverse();

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

  // ** ** ** ** ** RENDER ** ** ** ** **

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.tableContainer}>
          <Text style={styles.title}>{date}</Text>
          <FlatList
            ref={listRef}
            data={formattedHistory}
            scrollEnabled={false}
            renderItem={({item}) => (
              <SetTableRow
                setNumber={item.setNumber + 1}
                reps={item.reps}
                weight={item.weight}
                weightPreference={weightPreference}
              />
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
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
