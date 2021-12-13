import { Helmet } from 'react-helmet';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';

import ErrorBoundary from '@sb-ui/components/ErrorBoundary';
import MobileContext from '@sb-ui/contexts/MobileContext';
import ThemeContext from '@sb-ui/contexts/ThemeContext';
import { useFirstAppNavigation } from '@sb-ui/hooks/useFirstAppNavigation/useFirstAppNavigation';
import useMobile from '@sb-ui/hooks/useMobile';
import useTheme from '@sb-ui/hooks/useTheme';
import Routes from '@sb-ui/routes/Routes';

import { queryClient } from './query';
import { GlobalStyles } from './resources/styles/Global.styled';

const App = () => {
  const isMobile = useMobile();
  const theme = useTheme();

  useFirstAppNavigation();
  return (
    <>
      <Helmet>
        <title>Studybites</title>
      </Helmet>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <MobileContext.Provider value={isMobile}>
            <ThemeContext.Provider value={theme}>
              <ThemeProvider theme={theme.theme}>
                <GlobalStyles />
                <Routes />
                <ReactQueryDevtools initialIsOpen={false} />
              </ThemeProvider>
            </ThemeContext.Provider>
          </MobileContext.Provider>
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
};

export default App;
