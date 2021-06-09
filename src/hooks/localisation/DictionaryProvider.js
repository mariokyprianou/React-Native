/*
 * Jira Ticket:
 * Created Date: Thu, 23rd Jul 2020, 08:55:45 am
 * Author: Harry Crank
 * Email: harry.crank@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useCallback, useState, useEffect} from 'react';
import {useAsyncStorage} from '@react-native-community/async-storage';

import DictionaryContext from './DictionaryContext';
import {enGB, hiIN} from './languages';

const DictionaryProvider = ({children}) => {
  const [dictionaryLoading, setDictionaryLoading] = useState(true);
  const [locale, setLocale] = useState('en-GB');
  const {getItem, setItem} = useAsyncStorage('@language');

  const translateMap = {
    'en-GB': enGB,
    'hi-IN': hiIN,
  };

  const [dictionary, setDictionary] = useState(translateMap[locale]);

  const fetchLanguage = useCallback(async () => {
    try {
      const language = await getItem();
      setLocale(language || 'en-GB');
      setDictionaryLoading(false);
    } catch (e) {
      console.log('Dictionary - fetchLanguage - error: ', e);
    }
    return;
  }, [getItem]);

  useEffect(() => {
    fetchLanguage();
  }, []);

  const updateDictionary = useCallback(() => {
    const value = translateMap[locale];
    setDictionary(value);
    return value;
  }, [locale]);

  useEffect(() => {
    updateDictionary();
  }, [locale]);

  useEffect(() => {
    console.log('dictonary valid', dictionary !== undefined);
  }, [dictionary]);

  const saveLanguage = useCallback(async (language = 'en-GB') => {
    try {
      await setItem(language);
    } catch (e) {
      console.log('Dictionary - saveLanguage - error: ', e);
    }
    return;
  }, []);

  const setLanguage = useCallback((language) => {
    const languageMap = {
      English: 'en-GB',
      अंग्रेजी: 'en-GB',
      Hindi: 'hi-IN',
      हिंदी: 'hi-IN',
    };
    const value = languageMap[language];

    // Update session locale
    setLocale(value);
    // Update saved value
    saveLanguage(value);
  }, []);

  const getLanguage = useCallback(() => {
    const languageMap = {
      'en-GB': 'English',
      'hi-IN': 'Hindi',
    };

    return languageMap[locale];
  }, [locale]);

  /*
   * Memoize
   */

  const publicMethods = React.useMemo(
    () => ({
      dictionary,
      setLanguage,
      getLanguage,
      dictionaryLoading,
    }),
    [dictionary, setLanguage, getLanguage, dictionaryLoading],
  );

  /*
   * Return
   */

  return (
    <DictionaryContext.Provider value={{...publicMethods}}>
      {children}
    </DictionaryContext.Provider>
  );
};

export default DictionaryProvider;
