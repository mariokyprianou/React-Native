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
import {SlideBarChart} from 'react-native-slide-charts';
import {LinearGradient, Stop} from 'react-native-svg';

export default function ProgressChart() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth} = ScaleHook();
  const {colors, textStyles} = useTheme();

  const fakeData = [
    {x: 1, y: 5},
    {x: 2, y: 8},
    {x: 3, y: 13},
    {x: 4, y: 24},
    {x: 5, y: 16},
    {x: 6, y: 18},
    {x: 7, y: 9},
    {x: 8, y: 3},
    {x: 9, y: 7},
    {x: 10, y: 4},
    {x: 11, y: 10},
    {x: 12, y: 20},
  ];

  const highestValue = Math.max(...fakeData.map((point) => point.y));
  const ticks = Math.ceil(highestValue / 5);

  const xLabels = [
    '26/06',
    '27/06',
    '28/06',
    '29/06',
    '30/06',
    '01/07',
    '02/07',
    '03/07',
    '04/07',
    '05/07',
    '06/07',
    '07/07',
  ];

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    scroll: {
      backgroundColor: colors.white100,
      height: getHeight(200),
    },
    nonScrollContainer: {
      backgroundColor: colors.white100,
      width: getWidth(335),
      height: getHeight(200),
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  const defaultBarChartFillGradient = (GradientProps) => {
    return (
      <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" {...GradientProps}>
        <Stop stopColor={colors.tiffanyBlue100} offset="0%" stopOpacity="0.5" />
        <Stop stopColor={colors.tealish100} offset="100%" stopOpacity="0.5" />
      </LinearGradient>
    );
  };

  const defaultSelectedBarFillGradient = (GradientProps) => {
    return (
      <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" {...GradientProps}>
        <Stop stopColor={colors.tiffanyBlue100} offset="0%" stopOpacity="1" />
        <Stop stopColor={colors.tealish100} offset="100%" stopOpacity="1" />
      </LinearGradient>
    );
  };

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View>
      {/* with scroll */}
      <ScrollView horizontal={true} style={styles.scroll}>
        <View>
          <SlideBarChart
            data={fakeData}
            barSpacing={40}
            selectionChangedCallback={(bar) => console.log(bar)}
            renderFillGradient={(props) =>
              defaultSelectedBarFillGradient(props)
            }
            renderSelectedFillGradient={(props) =>
              defaultSelectedBarFillGradient(props)
            }
            width={fakeData.length * 50}
            axisWidth={getWidth(35)}
            axisHeight={getHeight(35)}
            height={getHeight(200)}
            yAxisProps={{
              numberOfTicks: ticks,
              interval: 5,
              horizontalLineColor: colors.white100,
              verticalLineColor: colors.white100,
              axisMarkerStyle: {...textStyles.semiBold10_brownGrey100},
              markerChartOffset: getWidth(20),
            }}
            xAxisProps={{
              axisMarkerLabels: xLabels,
              markerTopPadding: getHeight(10),
              axisLabelStyle: {
                ...textStyles.semiBold10_brownGrey100,
              },
            }}
          />
        </View>
      </ScrollView>
      {/* without scroll */}
      {/* <View style={styles.nonScrollContainer}>
        <SlideBarChart
          data={fakeData}
          barSpacing={40}
          selectionChangedCallback={(barIndex) => console.log(barIndex)}
          renderFillGradient={(props) => defaultBarChartFillGradient(props)}
          renderSelectedFillGradient={(props) =>
            defaultSelectedBarFillGradient(props)
          }
          width={getWidth(320)}
          axisWidth={getWidth(35)}
          axisHeight={getHeight(35)}
          height={getHeight(200)}
          yAxisProps={{
            numberOfTicks: ticks,
            interval: 5,
            horizontalLineColor: colors.white100,
            verticalLineColor: colors.white100,
            axisMarkerStyle: {...textStyles.semiBold10_brownGrey100},
            markerChartOffset: getWidth(20),
          }}
          xAxisProps={{
            axisMarkerLabels: xLabels,
            markerTopPadding: getHeight(10),
            axisLabelStyle: {
              ...textStyles.semiBold10_brownGrey100,
            },
          }}
        />
      </View> */}
    </View>
  );
}
