import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './resources/lang/en/index';
import ru from './resources/lang/ru/index';

export const LANGUAGES_LIST = [
  {
    key: 'en',
    value: 'English',
    code: 'en-US',
  },
  {
    key: 'ru',
    value: 'Русский',
    code: 'ru',
  },
];

const resources = {
  en,
  ru,
};

const LANGUAGE = 'language';
const DEFAULT_KEY = 'en';
export const DEFAULT_CODE = 'en-US';

export const getStorageLanguage = () => localStorage.getItem(LANGUAGE);

export const getLanguageByKey = (key) =>
  LANGUAGES_LIST.find((lang) => lang.key === key) || LANGUAGES_LIST?.[0];

export const getLanguageCodeByKey = (key) =>
  getLanguageByKey(key)?.code || DEFAULT_CODE;

const getNavigatorLanguage = () =>
  LANGUAGES_LIST.find((lang) => navigator.language.includes(lang.key))?.key ||
  DEFAULT_KEY;

i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_KEY || getStorageLanguage() || getNavigatorLanguage(),
  ns: [
    'admin',
    'sign_in',
    'sign_up',
    'teacher',
    'user',
    'common',
    'profile',
    'email',
    'change_password',
    'forgot_password',
    'verify_email',
  ],
  defaultNS: 'common',
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
