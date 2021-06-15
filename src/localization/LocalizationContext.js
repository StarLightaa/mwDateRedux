import React, {createContext, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import translations, {DEFAULT_LANGUAGE} from './config';
import * as RNLocalize from 'react-native-localize';

import {setLocale} from '../store/actions/settings';

export const LocalizationContext = createContext({
  translations,
  setAppLanguage: () => {},
  appLanguage: DEFAULT_LANGUAGE,
  initializeAppLanguage: () => {},
});

export const LocalizationProvider = ({children}) => {
  const dispatch = useDispatch();
  const [appLanguage, setAppLanguage] = useState(DEFAULT_LANGUAGE);
  const currentLanguage =
    useSelector(state => state.settings.localeValue) || DEFAULT_LANGUAGE;

  useEffect(() => {
    initializeAppLanguage();
  }, []);

  const setLanguage = language => {
    translations.setLanguage(language);
    setAppLanguage(language);
    dispatch(setLocale(language));
  };

  const initializeAppLanguage = async () => {
    if (!currentLanguage) {
      let localeCode = DEFAULT_LANGUAGE;
      const supportedLocaleCodes = translations.getAvailableLanguages();
      const phoneLocaleCodes = RNLocalize.getLocales().map(
        locale => locale.languageCode,
      );
      phoneLocaleCodes.some(code => {
        if (supportedLocaleCodes.includes(code)) {
          localeCode = code;
          return true;
        }
      });
      setLanguage(localeCode);
    } else {
      setLanguage(currentLanguage);
    }
  };

  return (
    <LocalizationContext.Provider
      value={{
        translations,
        setAppLanguage: setLanguage,
        appLanguage,
        initializeAppLanguage,
      }}>
      {children}
    </LocalizationContext.Provider>
  );
};
