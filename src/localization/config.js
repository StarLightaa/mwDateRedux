import LocalizedStrings from 'react-native-localization';

import en from './translates/en';
import ru from './translates/ru';

export const DEFAULT_LANGUAGE = 'en';

const translations = {
  en: en,
  ru: ru,
};

const strings = new LocalizedStrings(translations);

export default strings;
