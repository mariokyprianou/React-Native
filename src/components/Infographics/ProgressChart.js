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

export default function ProgressChart({axis = true, selectable = false, data}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth} = ScaleHook();
  const {colors, textStyles} = useTheme();

  const dataPoints = data.map((event, index) => {
    return {x: index + 1, y: event.value};
  });

  const highestValue = Math.max(...dataPoints.map((point) => point.y));
  const ticks = Math.ceil(highestValue / 5);

  const xLabels = data.map((event) => {
    return event.date;
  });

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
      <ScrollView
        horizontal={true}
        style={styles.scroll}
        contentContainerStyle={{alignItems: 'flex-end'}}>
        <View>
          <SlideBarChart
            data={dataPoints}
            barSpacing={40}
            selectionChangedCallback={(bar) => console.log(bar)}
            renderFillGradient={(props) =>
              selectable
                ? defaultBarChartFillGradient(props)
                : defaultSelectedBarFillGradient(props)
            }
            renderSelectedFillGradient={(props) =>
              defaultSelectedBarFillGradient(props)
            }
            width={dataPoints.length * 50}
            axisWidth={getWidth(35)}
            axisHeight={getHeight(35)}
            height={getHeight(200)}
            yAxisProps={{
              numberOfTicks: axis ? ticks : 0,
              interval: 5,
              horizontalLineColor: colors.white100,
              verticalLineColor: colors.white100,
              axisMarkerStyle: {...textStyles.semiBold10_brownGrey100},
              markerChartOffset: getWidth(10),
              // axisLabel: 'kg',
              // axisLabelStyle: {...textStyles.semiBold10_brownGrey100},
              // axisLabelAlignment: 'bottom',
              // labelTopPadding: getHeight(0),
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
          data={dataPoints}
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
