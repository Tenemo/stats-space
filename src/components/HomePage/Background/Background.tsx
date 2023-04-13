import { Box } from '@mui/material';
import React, { ReactElement, useCallback, memo } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';

import { particlesOptions } from './particlesOptions';

import { useSelector } from 'store';
import { getAppTheme } from 'store/app/appSelectors';

export const Background = (): ReactElement => {
    const appTheme = useSelector(getAppTheme);
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);

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
                    transition: 'opacity 2000ms ease-in-out',
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
