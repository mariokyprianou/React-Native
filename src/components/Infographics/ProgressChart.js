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

export default function ProgressChart({data}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth} = ScaleHook();
  const {colors} = useTheme();

  const labels = data.map((challenge) => challenge.date);
  const results = data.map((challenge) => challenge.value);
  const suffix = ` ${data[0].unit}`;

  const viableData = {
    labels: labels,
    datasets: [
      {
        data: results,
      },
    ],
  };

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
          data={viableData}
          width={getWidth(600)}
          height={getHeight(200)}
          yAxisSuffix={suffix}
          chartConfig={{
            backgroundGradientFrom: colors.white100,
            backgroundGradientTo: colors.white100,
            decimalPlaces: 0,
            fillShadowGradientOpacity: 1,
            color: () => colors.tealish100,
            labelColor: () => colors.brownGrey100,
            barPercentage: 0.2,
            propsForHorizontalLabels: {
              x: 45,
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
