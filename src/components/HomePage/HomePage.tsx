import { Box } from '@mui/material';
import React, { ReactElement } from 'react';

import './homePage.scss';

import Background from './Background';

export const HomePage = (): ReactElement => {
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
            <Background />
            <Box
                sx={{
                    zIndex: 1,
                }}
            >
                graphs will be here, but not now 😢
            </Box>
        </Box>
    );
};

export default HomePage;
