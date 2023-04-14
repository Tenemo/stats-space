import { Box } from '@mui/material';
import React, { ReactElement, useCallback, memo, useMemo } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';

import { getParticlesOptions } from './particlesOptions';

import { useSelector } from 'store';
import { getAppTheme, getAppIsUIDisplayed } from 'store/app/appSelectors';

export const Background = (): ReactElement => {
    const appTheme = useSelector(getAppTheme);
    const isUIDisplayed = useSelector(getAppIsUIDisplayed);
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);

    const particlesOptions = useMemo(
        () => getParticlesOptions(isUIDisplayed),
        [isUIDisplayed],
    );

    return (
        <Box
            sx={{
                zIndex: 0,
            }}
        >
            <Box
                sx={{
                    zIndex: 1,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(
                        to bottom,
                        #2980b9 5%,
                        #3d9ad9 35%,
                        #6dd5fa 65%,
                        #aae0fa 100%
                    )`,
                    opacity: appTheme === 'dark' ? 0 : 1,
                    transition: 'opacity 2000ms linear',
                }}
            />
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
        </Box>
    );
};

export default memo(Background);
