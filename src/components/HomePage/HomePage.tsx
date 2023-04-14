import { Box, CircularProgress } from '@mui/material';
import React, { ReactElement, useEffect } from 'react';
import { isMobile } from 'react-device-detect';

import Background from './Background';
import Chart from './Chart';

import Error from 'components/Error';
import { useSelector, useDispatch } from 'store';
import { getAppIsUIDisplayed } from 'store/app/appSelectors';
import { fetchLaunches, fetchGDP } from 'store/stats/statsActions';
import { getStatsLaunches, getStatsGDP } from 'store/stats/statsSelectors';
import './homePage.scss';

export const HomePage = (): ReactElement => {
    const isUIDisplayed = useSelector(getAppIsUIDisplayed);
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
                minHeight: '500px',
            }}
        >
            <Background />
            <Box
                sx={{
                    zIndex: 1,
                    borderRadius: '10px',
                    width: isMobile ? '100%' : '90%',
                    minHeight: isMobile ? undefined : '500px',
                    height: isMobile ? '100%' : '70%',
                }}
            >
                {(() => {
                    if (!isUIDisplayed) {
                        return null;
                    }
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
