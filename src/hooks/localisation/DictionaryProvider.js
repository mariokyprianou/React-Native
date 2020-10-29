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
import {enGB} from './languages';

const DictionaryProvider = ({children}) => {
  const [dictionaryLoading, setDictionaryLoading] = useState(true);
  const [locale, setLocale] = useState('en-GB');
  const {getItem, setItem} = useAsyncStorage('@language');

  const fetchLanguage = async () => {
    // console.log('Dictionary - fetchLanguage - FETCHING');
    try {
      const language = await getItem();
      // console.log('Dictionary - fetchLanguage - language: ', language);
      setLocale(language || 'en-GB');
      setDictionaryLoading(false);
    } catch (e) {
      console.log('Dictionary - fetchLanguage - error: ', e);
    }
    // console.log('Fetch Done.');
    return;
  };

  useEffect(() => {
    // console.log('Dictionary - useEffect - fetchLanguage');
    fetchLanguage();
  }, []);

  const saveLanguage = async (language = 'en-GB') => {
    // console.log('Dictionary - saveLanguage - SAVING: ', language);
    try {
      await setItem(language);
    } catch (e) {
      console.log('Dictionary - saveLanguage - error: ', e);
    }
    // console.log('Save Done.');
    return;
  };

  const setLanguage = useCallback((language) => {
    // console.log('Dictionary - setLanguage - language: ', language);
    const languageMap = {
      English: 'en-GB',
      // Hindi: 'hi-IN',
      // Urdu: 'ur-IN',
    };
    const value = languageMap[language];
    // console.log('Dictionary - setLanguage - value: ', value);
    setLocale(value);
    saveLanguage(value);
  }, []);

  const getLanguage = useCallback(() => {
    // console.log('Dictionary - getLanguage - GET LANGUAGE');
    // Populates the dropdown text.
    const languageMap = {
      'en-GB': 'English',
      // 'hi-IN': 'Hindi',
      // ur-IN: 'Urdu',
    };

    const value = languageMap[locale];
    // console.log('Dictionary - getLanguage - value: ', value);
    return value;
  }, [locale]);

  const translateMap = {
    'en-GB': enGB,
    // 'hi-IN': hiIN,
    // ur-IN: urIN,
  };

  const dictionary = translateMap[locale];

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
