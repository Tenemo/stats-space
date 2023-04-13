import { Box, useTheme, CircularProgress } from '@mui/material';
import React, { ReactElement, useEffect } from 'react';

import Background from './Background';
import Chart from './Chart';

import Error from 'components/Error';
import { useSelector, useDispatch } from 'store';
import { getAppTheme } from 'store/app/appSelectors';
import { fetchLaunches, fetchGDP } from 'store/stats/statsActions';
import { getStatsLaunches, getStatsGDP } from 'store/stats/statsSelectors';
import './homePage.scss';

export const HomePage = (): ReactElement => {
    const appTheme = useSelector(getAppTheme);
    const theme = useTheme();
    const dispatch = useDispatch();
    const {
        response: launchesResponse,
        error: launchesError,
        isLoading: isLaunchesLoading,
    } = useSelector(getStatsLaunches);
    const {
        response: GDPResponse,
        error: GDPError,
        isLoading: isGDPLoading,
    } = useSelector(getStatsGDP);

    const isLoading = isLaunchesLoading || isGDPLoading;

    useEffect(() => {
        if (!launchesResponse) {
            void dispatch(fetchLaunches());
        }
        if (!GDPResponse) {
            void dispatch(fetchGDP());
        }
    }, [dispatch, launchesResponse, GDPResponse]);

    return (
        <Box
            component="main"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                zIndex: 0,
                width: '100%',
                height: '100%',
            }}
        >
            <Background />
            <Box
                sx={{
                    zIndex: 1,
                    backgroundColor:
                        appTheme === 'dark'
                            ? theme.palette.background.default
                            : '#222',
                    borderRadius: '10px',
                    transition: 'background-color 2000ms ease-in-out',
                    mt: 2,
                    width: '100%',
                    height: '100%',
                    minHeight: '400px',
                }}
            >
                {(() => {
                    if (isLoading) {
                        return (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%',
                                }}
                            >
                                <CircularProgress />
                            </Box>
                        );
                    }
                    if (launchesError || GDPError) {
                        return <Error />;
                    }
                    return <Chart />;
                })()}
            </Box>
        </Box>
    );
};

export default HomePage;
