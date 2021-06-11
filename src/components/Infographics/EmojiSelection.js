/*
 * Jira Ticket:
 * Created Date: Mon, 16th Nov 2020, 10:16:40 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import Emoji from 'react-native-emoji';

export default function EmojiSelection(props) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, fontSize} = ScaleHook();
  const {textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;

  const {selectedEmoji, setSelectedEmoji} = props;

  const emojis = [
    'sweat_smile',
    'heart_eyes',
    'muscle',
    'fire',
    'tired_face',
    'expressionless',
    'sleeping',
  ];

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = StyleSheet.create({
    container: {},
    text: {
      ...textStyles.regular15_brownishGrey100,
      marginBottom: getHeight(10),
    },
    emojiContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    emoji: {
      fontSize: fontSize(22),
      zIndex: 1,
      opacity: 0.3,
    },
    selected: {
      opacity: 1,
    },
  });

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handleSelect(name) {
    setSelectedEmoji(name);
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{WorkoutDict.HowDoYouFeel}</Text>
      <View style={styles.emojiContainer}>
        {emojis.map((emoji, index) => (
          <TouchableOpacity onPress={() => handleSelect(emoji)}>
            <Emoji
              name={emoji}
              style={
                selectedEmoji === emoji
                  ? {...styles.emoji, ...styles.selected}
                  : styles.emoji
              }
              key={index}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
