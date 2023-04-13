import { CircularProgress } from '@mui/material';
import React, { ReactElement, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import packageJson from '../../../package.json';

import App from 'components/App';
import { store, persistor } from 'store';
import { getAppStoreVersion } from 'store/app/appSelectors';

import 'styles/global.scss';

export const Root = (): ReactElement => {
    useEffect(() => {
        // https://stackoverflow.com/questions/31402576/enable-focus-only-on-keyboard-use-or-tab-press
        document.body.addEventListener('mousedown', () =>
            document.body.classList.add('using-mouse'),
        );
        document.body.addEventListener('keydown', (event) => {
            if (event.key === 'Tab') {
                document.body.classList.remove('using-mouse');
            }
        });
    }, []);

    const currentStoreVersion = getAppStoreVersion(store.getState());
    const purgeStore = async (): Promise<void> => {
        await persistor.purge();
    };
    if (!!currentStoreVersion && currentStoreVersion !== packageJson.version) {
        void purgeStore();
    }
    return (
        <Provider store={store}>
            <PersistGate loading={<CircularProgress />} persistor={persistor}>
                <HelmetProvider>
                    <App />
                </HelmetProvider>
            </PersistGate>
        </Provider>
    );
};

export default Root;
