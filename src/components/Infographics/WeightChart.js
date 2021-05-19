import React from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import {SlideBarChart} from 'react-native-slide-charts';
import {LinearGradient, Stop} from 'react-native-svg';
import useDictionary from '../../hooks/localisation/useDictionary';
import parseISO from 'date-fns/parseISO';

export default function WeightChart({
  axis = true,
  background = true,
  selectable = false,
  data,
  weightPreference = 'kg',
  setDate,
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth} = ScaleHook();
  const {colors, textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;

  const dataPoints = data.map((event, index) => {
    return {x: index + 1, y: event.weight};
  });

  const highestValue = Math.max(...dataPoints.map((point) => point.y));

  const {ticks, interval} = getGraphTicksInterval(highestValue);

  const xLabels = data.map((event) => {
    return event.date;
  });

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    scroll: {
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
      <ScrollView
        horizontal={true}
        style={styles.scroll}
        contentContainerStyle={{alignItems: 'center'}}>
        <View style={{paddingEnd: getWidth(20)}}>
          <SlideBarChart
            data={dataPoints}
            barSpacing={dataPoints.length === 1 ? 58 : 60}
            selectionChangedCallback={(bar) => {
              setDate && setDate(bar);
            }}
            renderFillGradient={(props) =>
              selectable
                ? defaultBarChartFillGradient(props)
                : defaultSelectedBarFillGradient(props)
            }
            renderSelectedFillGradient={(props) =>
              defaultSelectedBarFillGradient(props)
            }
            width={
              dataPoints.length === 1
                ? dataPoints.length * 90
                : dataPoints.length * 75
            }
            axisWidth={getWidth(42)}
            axisHeight={getHeight(35)}
            height={getHeight(180)}
            style={{
              top: getHeight(20),
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
              markerChartOffset: getWidth(10),
              labelLeftOffset: getWidth(-4),
            }}
            xAxisProps={{
              axisMarkerLabels: xLabels,
              markerTopPadding: getHeight(10),
              axisLabelStyle: {
                ...textStyles.semiBold10_brownGrey100,
              },
            }}
          />
          {weightPreference && (
            <Text
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                ...textStyles.semiBold10_brownGrey100,
                textAlign: 'right',
                width: getWidth(40),
              }}>
              {weightPreference}
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
