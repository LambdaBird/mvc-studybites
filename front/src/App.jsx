import { Helmet } from 'react-helmet';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import ErrorBoundary from '@sb-ui/components/ErrorBoundary';
import MobileContext from '@sb-ui/contexts/MobileContext';
import { useFirstAppNavigation } from '@sb-ui/hooks/useFirstAppNavigation/useFirstAppNavigation';
import useMobile from '@sb-ui/hooks/useMobile';
import Routes from '@sb-ui/routes/Routes';

import { queryClient } from './query';
import { GlobalStyles } from './resources/styles/Global.styled';

const App = () => {
  const isMobile = useMobile();
  useFirstAppNavigation();
  return (
    <>
      <Helmet>
        <title>Studybites</title>
      </Helmet>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <MobileContext.Provider value={isMobile}>
            <GlobalStyles />
            <Routes />
            <ReactQueryDevtools initialIsOpen={false} />
          </MobileContext.Provider>
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
};

export default App;
