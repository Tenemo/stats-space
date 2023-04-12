import * as Sentry from '@sentry/react';
import React from 'react';
import { createRoot } from 'react-dom/client';

import packageJSON from '../package.json';

import Root from 'components/Root';
import { BUILD_TYPE } from 'constants/appConstants';

if (BUILD_TYPE === 'production') {
    Sentry.init({
        dsn: 'https://dce057c40dec416d90f4a5e57c4cbd78@o502294.ingest.sentry.io/4504997651218432',
        integrations: [new Sentry.BrowserTracing()],
        release: `${packageJSON.name}@${packageJSON.version}`,
        autoSessionTracking: true,
        tracesSampleRate: 1.0,
    });
}

Sentry.init({
    tracesSampleRate: 1.0,
});

const container = document.getElementById('root');

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(<Root />);
