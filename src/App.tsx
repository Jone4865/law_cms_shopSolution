import { ThemeProvider } from 'styled-components';

import Root from './router';
import theme from './styles/theme';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './config/apolloClient';
import 'antd/dist/antd.less';
import { useRecoilState } from 'recoil';
import { userTokenState } from './recoil/atoms/userToken';

function App() {
  const [tokenInfo, setTokenInfo] = useRecoilState(userTokenState);
  return (
    <ApolloProvider client={apolloClient(tokenInfo, setTokenInfo)}>
      <ThemeProvider theme={theme}>
        <Root />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
