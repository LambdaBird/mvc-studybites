import { useEffect, useState } from 'react';

import variables from '@sb-ui/theme/variables';

export const THEMES_NAME = {
  DEFAULT_THEME: 'default',
  THEME_1: 'theme-1',
  THEME_2: 'theme-2',
};

const NOT_DEFAULT_COLOR_THEME = {
  headerBackground: variables['white-opacity-0.7'],
  blockElementBackground: variables['white-opacity-0.7'],
  finishElementBackground: variables['white-opacity-0.7'],
  lessonButtonBackground: variables['white-opacity-0.7'],
  infoBlockBackground: variables['white-opacity-0.7'],
  chunkWrapperBackground: variables['white-opacity-0.7'],
  footerBackground: variables['white-opacity-0.5'],
};

export const THEMES = {
  [THEMES_NAME.DEFAULT_THEME]: {
    bodyBackground: 'white',
    headerBackground: 'white',
    blockElementBackground: 'white',
    finishElementBackground: 'white',
    lessonButtonBackground: 'white',
    infoBlockBackground: variables['learn-chunk-background'],
    chunkWrapperBackground: variables['learn-chunk-background'],
    footerBackground: variables['geekblue-1'],
  },
  [THEMES_NAME.THEME_1]: {
    bodyBackground: 'linear-gradient(180deg, #396F86 0%, #86395E 100%);',
    ...NOT_DEFAULT_COLOR_THEME,
  },
  [THEMES_NAME.THEME_2]: {
    bodyBackground: 'linear-gradient(180deg, #E7EFFB 0%, #F6F1FC 100%);',
    ...NOT_DEFAULT_COLOR_THEME,
  },
};

const useTheme = () => {
  const [theme, setTheme] = useState(THEMES[THEMES_NAME.DEFAULT_THEME]);
  const [themeName, setThemeName] = useState(THEMES_NAME.DEFAULT_THEME);

  useEffect(() => {
    setTheme(THEMES[themeName]);
  }, [themeName]);

  return { theme, setTheme, themeName, setThemeName };
};

export default useTheme;
