import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import { DevSupport } from '@react-buddy/ide-toolbox';
import store from './reducer/store.ts';
import App from './App.tsx';
import { ComponentPreviews, useInitial } from './dev';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
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
  </React.StrictMode>,
);
