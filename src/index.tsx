import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider, theme } from 'antd';
import locale from 'antd/es/locale/ko_KR';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PRIMARY } from './styles/colors';

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider
      locale={locale}
      theme={{
        token: {
          colorPrimary: PRIMARY,
          colorPrimaryBg: PRIMARY,
        },
        algorithm: [theme.defaultAlgorithm],
        components: {
          Layout: {
            colorBgHeader: PRIMARY,
          },
          Menu: {
            colorItemBg: PRIMARY,
            colorSubItemBg: PRIMARY,
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
