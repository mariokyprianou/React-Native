/*
 * Jira Ticket:
 * Created Date: Wed, 11th Nov 2020, 08:48:54 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import {BarChart} from 'react-native-chart-kit';

const data = {
  labels: [
    '10/07',
    '11/07',
    '12/07',
    '13/07',
    '14/07',
    '15/07',
    '16/07',
    '17/07',
    '18/07',
    '19/07',
    '20/07',
    '21/07',
  ],
  datasets: [
    {
      data: [5, 10, 15, 5, 10, 15, 22, 10, 15, 25, 10, 5],
    },
  ],
};

export default function ProgressChart() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth} = ScaleHook();
  const {colors} = useTheme();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    scroll: {
      backgroundColor: colors.white100,
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View>
      <ScrollView horizontal={true} style={styles.scroll}>
        <BarChart
          data={data}
          width={getWidth(600)}
          height={getHeight(200)}
          yAxisSuffix="kg"
          chartConfig={{
            backgroundGradientFrom: colors.white100,
            backgroundGradientTo: colors.white100,
            decimalPlaces: 0,
            fillShadowGradient: colors.tealish100,
            fillShadowGradientOpacity: 1,
            color: () => colors.tiffanyBlue100,
            labelColor: () => colors.brownGrey100,
            barPercentage: 0.2,
            propsForHorizontalLabels: {
              x: 40,
            },
          }}
          fromZero={true}
          withInnerLines={false}
          showBarTops={false}
        />
      </ScrollView>
    </View>
  );
}
