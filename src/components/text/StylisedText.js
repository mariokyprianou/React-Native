/*
 * Created Date: Fri, 6th Nov 2020, 11:24:58 am
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2020 JM APP DEVELOPMENT LTD
 */


import React from 'react';
import ParsedText from 'react-native-parsed-text';

import useTheme from '../../hooks/theme/UseTheme';

/* How to use

  const linkText = [
    {
      pattern: /text to match against/
      onPress: () => alert('1 pressed'),
    },
    {
      pattern: /other text to match against/,
      onPress: () => alert('2 pressed'),
    },
  ];

  <StylisedText
    {...{
      input: linkText,
      text: MarketingText,
      // If you want to override the main text style
      textStyle: {
        ...textStyles.regular16,
      },
    }}
  />

*/

export default function({
  text,
  input,
  textStyle,
  active = true,
  highlightedStyle,
}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {textStyles, colors} = useTheme();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const style = {
    ...textStyles.regular15_brownishGrey100,
    fontWeight: active ? "bold" : 'normal',
    ...highlightedStyle,
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  const patterns = input.map(item => ({
    ...item,
    style,
  }));

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <ParsedText
      style={{
        ...textStyles.regular15_brownishGrey100,
        ...textStyle,
      }}
      parse={patterns}>
      {text}
    </ParsedText>
  );
}