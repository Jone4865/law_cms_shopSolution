import { ThemeProvider } from 'styled-components';
import { CookiesProvider } from 'react-cookie';

import Root from './router';
import theme from './styles/theme';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './config/apolloClient';
import 'antd/dist/antd.less';

function App() {
  return (
    <ApolloProvider client={apolloClient()}>
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <Root />
        </CookiesProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
