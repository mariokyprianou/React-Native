/*
 * Jira Ticket:
 * Created Date: Wed, 11th Nov 2020, 08:48:54 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import {SlideBarChart} from 'react-native-slide-charts';
import {LinearGradient, Stop} from 'react-native-svg';

export default function ProgressChart({
  axis = true,
  background = true,
  selectable = false,
  data,
  chartLabel,
  chartDataPoints,
  interval,
  ticks,
  scrollToEnd = false,
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, getScaledHeight, getScaledWidth} = ScaleHook();
  const {colors, textStyles} = useTheme();

  const xLabels = data.map((event) => {
    return event.date;
  });

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    scroll: {
      height: getScaledHeight(200),
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

  const ref = useRef(null);

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View>
      <ScrollView
        ref={ref}
        onContentSizeChange={() =>
          scrollToEnd && ref.current.scrollToEnd({animated: true})
        }
        horizontal={true}
        style={styles.scroll}
        contentContainerStyle={{alignItems: 'center'}}>
        <View style={{paddingEnd: getScaledWidth(20)}}>
          <SlideBarChart
            data={chartDataPoints}
            barSpacing={chartDataPoints.length === 1 ? 58 : 60}
            selectionChangedCallback={(bar) => console.log(bar)}
            renderFillGradient={(props) =>
              selectable
                ? defaultBarChartFillGradient(props)
                : defaultSelectedBarFillGradient(props)
            }
            renderSelectedFillGradient={(props) =>
              defaultSelectedBarFillGradient(props)
            }
            width={
              chartDataPoints.length === 1
                ? chartDataPoints.length * 90
                : chartDataPoints.length * 75
            }
            axisWidth={getScaledWidth(42)}
            axisHeight={getScaledHeight(35)}
            height={
              chartLabel.length > 0
                ? getScaledHeight(180)
                : getScaledHeight(200)
            }
            style={{
              top:
                chartLabel.length > 0
                  ? getScaledHeight(20)
                  : getScaledHeight(0),
              backgroundColor: background
                ? colors.white100
                : colors.transparent,
            }}
            yAxisProps={{
              numberOfTicks: axis ? ticks : 0,
              interval: interval,
              horizontalLineColor: colors.transparent,
              verticalLineColor: colors.transparent,
              axisMarkerStyle: {...textStyles.semiBold10_brownGrey100},
              markerChartOffset: getScaledWidth(10),
              labelLeftOffset: getScaledWidth(-4),
            }}
            xAxisProps={{
              axisMarkerLabels: xLabels,
              markerTopPadding: getScaledHeight(10),

              axisLabelStyle: {
                ...textStyles.semiBold10_brownGrey100,
              },
            }}
          />
          {chartLabel.length > 0 && (
            <Text
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                ...textStyles.semiBold10_brownGrey100,
                textAlign: 'right',
                width: getScaledWidth(40),
              }}>
              {chartLabel}
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
