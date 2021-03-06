/*
 * Created Date: Wed, 11th Nov 2020, 09:45:28 am
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {View, Text, TouchableOpacity, Animated, Image} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import {format} from 'date-fns';
import Swipeable from 'react-native-swipeable';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';

const notificationDot = require('../../../assets/icons/notificationDot.png');

export default function NotificationCell({
  subject,
  sentAt,
  readAt,
  message,
  onPress = () => {},
  onDelete = () => {},
  index,
}) {
  // MARK: - Hooks
  const {dictionary} = useDictionary();
  const {ProfileDict} = dictionary;
  const {textStyles, colors} = useTheme();
  const {getHeight, getWidth} = ScaleHook();

  // MARK: - Local
  const firstPart = format(new Date(sentAt), 'do LLL');
  const secondPart = format(new Date(sentAt), 'yy');
  const sentAtFormatted = `${firstPart} ${"'"}${secondPart}`;

  // MARK: - Styles
  const styles = {
    outerContainer: {
      flex: 1,
      marginLeft: getWidth(20),
    },
    swipingContainer: {
      width: getWidth(355),
    },
    container: {
      backgroundColor: colors.backgroundWhite100,
      width: '95%',
      marginTop: 0,
      marginBottom: 0,
      borderTopWidth: index !== 0 ? 1 : 0,
      borderTopColor: colors.black20,
      flexDirection: 'row',
    },
    sideColor: {
      backgroundColor: colors.aquamarine100,
      width: getWidth(10),
      height: '100%',
    },
    content: {
      paddingLeft: getWidth(20),
      paddingRight: getWidth(30),
      paddingVertical: getHeight(15),
    },
    rowContainer: {
      width: getWidth(355 - 30 - 20),
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dotContainer: {
      width: getWidth(8),
      marginRight: getWidth(5),
      marginVertical: getHeight(6),
    },
    subjectTextStyle: {
      ...textStyles.medium14_black100,
      //flex: 0.7,
      width: '70%',
      textAlign: 'left',
    },
    textStyle: {
      marginLeft: getWidth(13),
      ...textStyles.regular15_brownishGrey80,
      textAlign: 'left',
    },
    dateStyle: {
      ...textStyles.medium12_brownishGrey100,
      textAlign: 'left',
    },
    rightAction: {
      flex: 1,
      paddingLeft: getWidth(10),
      backgroundColor: 'red',
      justifyContent: 'center',
    },
    actionText: {
      ...textStyles.medium14_white100,
      paddingLeft: getWidth(5),
      textAlign: 'left',
    },
  };

  // MARK: - Render
  const renderContent = () => (
    <View style={styles.content}>
      <View style={styles.rowContainer}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.dotContainer}>
            {readAt === null && <Image source={notificationDot} />}
          </View>

          <Text style={styles.subjectTextStyle}>{subject}</Text>
        </View>
        <Text style={styles.dateStyle}>{sentAtFormatted}</Text>
      </View>
      <Text style={styles.textStyle}>{message}</Text>
    </View>
  );

  const rightButtons = [
    <TouchableOpacity style={styles.rightAction} onPress={onDelete}>
      <Animated.Text style={styles.actionText} useNativeDriver={true}>
        {ProfileDict.NotificationDelete}
      </Animated.Text>
    </TouchableOpacity>,
  ];

  return (
    <View style={styles.outerContainer}>
      <View style={styles.swipingContainer}>
        <Swipeable rightButtons={rightButtons}>
          <TouchableOpacity
            onPress={onPress}
            enabled={!readAt}
            style={styles.container}>
            <View style={styles.sideColor} />
            {renderContent()}
          </TouchableOpacity>
        </Swipeable>
      </View>
    </View>
  );
}
