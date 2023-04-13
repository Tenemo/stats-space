import { Box, Typography } from '@mui/material';
import React, { ReactElement, memo } from 'react';

const Error = (): ReactElement => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
        }}
    >
        <Typography color="error" variant="h4">
            Something went wrong.
        </Typography>
        <Typography variant="body1">
            There was an issue fetching the data from the server. Please try
            again later.
        </Typography>
    </Box>
);

export default memo(Error);
