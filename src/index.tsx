import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './state/store';
import { AppWithRedux } from './components/App/AppWithRedux';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <AppWithRedux />
        </Provider>
    </React.StrictMode>,
);
