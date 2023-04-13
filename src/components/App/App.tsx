import {
    CssBaseline,
    ThemeProvider,
    Box,
    CircularProgress,
} from '@mui/material';
import React, { Component, ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { HistoryRouter as Router } from 'redux-first-history/rr6';

import 'normalize.css';

import packageJson from '../../../package.json';

import styles from './app.scss';

import 'fonts/RobotoMono-Regular.woff2';
import 'fonts/RobotoMono-Regular.woff';

import Header from 'components/Header';
import HomePage from 'components/HomePage';
import NotFound from 'components/NotFound';
import { history, AppDispatch } from 'store';
import { getAppTheme, getAppStoreVersion } from 'store/app/appSelectors';
import { RootState } from 'store/types';
import { darkTheme, lightTheme } from 'styles/theme';

type State = {
    hasError: boolean;
    error: Error | string | null;
    errorInformation?: { componentStack: string } | null;
};

type Props = {
    appTheme: string;
    appStoreVersion: string;
    resetState: () => void;
};

export class App extends Component<Props> {
    static getDerivedStateFromError = (): { hasError: boolean } => ({
        hasError: true,
    });

    readonly state: State = { hasError: false, error: null };

    componentDidMount(): void {
        const { appStoreVersion, resetState } = this.props;
        if (appStoreVersion !== packageJson.version) {
            resetState();
        }
    }

    componentDidCatch(
        error: Error | null,
        errorInformation: { componentStack: string },
    ): void {
        // eslint-disable-next-line no-console
        console.error(errorInformation.componentStack, error);
        this.setState({ error, errorInformation });
    }

    render(): ReactElement {
        const { hasError, error, errorInformation } = this.state;
        const { appTheme, appStoreVersion } = this.props;
        const classNames = `${styles.app} ${
            appTheme === 'dark' ? 'theme-dark' : 'theme-light'
        }`;
        return (
            <ThemeProvider theme={appTheme === 'dark' ? darkTheme : lightTheme}>
                <CssBaseline enableColorScheme />
                <Router history={history}>
                    <div className={classNames}>
                        <Helmet>
                            <title>stats.space</title>
                        </Helmet>
                        {(() => {
                            if (hasError) {
                                return (
                                    <div>
                                        The application has crashed due to a
                                        rendering error.{' '}
                                        <div className={styles.errorInfo}>
                                            {JSON.stringify(error, null, 4)}
                                            {JSON.stringify(
                                                errorInformation,
                                                null,
                                                4,
                                            )}
                                        </div>
                                    </div>
                                );
                            }
                            if (appStoreVersion !== packageJson.version) {
                                return (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '100%',
                                            width: '100%',
                                        }}
                                    >
                                        <CircularProgress />
                                    </Box>
                                );
                            }
                            return (
                                <>
                                    <Header />
                                    <Routes>
                                        <Route
                                            element={<HomePage />}
                                            path="/"
                                        />
                                        <Route
                                            element={<NotFound />}
                                            path="*"
                                        />
                                    </Routes>
                                </>
                            );
                        })()}
                    </div>
                </Router>
            </ThemeProvider>
        );
    }
}

const mapStateToProps = (
    state: RootState,
): { appTheme: string; appStoreVersion: string } => ({
    appTheme: getAppTheme(state),
    appStoreVersion: getAppStoreVersion(state),
});
const mapDispatchToProps = (
    dispatch: AppDispatch,
): {
    resetState: () => void;
} => ({
    resetState: () => dispatch({ type: 'RESET_STATE' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
