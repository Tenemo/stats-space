import { Box, useTheme } from '@mui/material';
import React, { ReactElement, useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';

import './homePage.scss';

import { useSelector } from 'store';
import { getAppTheme } from 'store/app/appSelectors';
import { getParticlesOptions } from 'utils/getParticlesOptions';

export const HomePage = (): ReactElement => {
    const theme = useTheme();
    const appTheme = useSelector(getAppTheme);
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);

    const particlesOptions = getParticlesOptions(appTheme, theme);
    return (
        <Box
            component="main"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 0,
            }}
        >
            <Box
                sx={{
                    zIndex: 0,
                }}
            >
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    options={particlesOptions}
                />
            </Box>
            <Box
                sx={{
                    zIndex: 1,
                }}
            >
                graphs here
            </Box>
        </Box>
    );
};

export default HomePage;
