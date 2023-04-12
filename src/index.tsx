import * as Sentry from '@sentry/react';
import React from 'react';
import { createRoot } from 'react-dom/client';

import Root from 'components/Root';

Sentry.init({
    dsn: 'https://dce057c40dec416d90f4a5e57c4cbd78@o502294.ingest.sentry.io/4504997651218432',
    integrations: [new Sentry.BrowserTracing()],
    tracesSampleRate: 1.0,
});

const container = document.getElementById('root');

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(<Root />);
