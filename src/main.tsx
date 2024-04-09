import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { DevSupport } from '@react-buddy/ide-toolbox';
import { ConfigProvider } from 'antd';

import store from './reducer/store.ts';
import { ComponentPreviews, useInitial } from './dev';

import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale="ko_KR">
      <Provider store={store}>
        <BrowserRouter>
          <DevSupport
            ComponentPreviews={ComponentPreviews}
            useInitialHook={useInitial}
          >
            <App />
          </DevSupport>
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>,
);
