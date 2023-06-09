import { Box, useTheme, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import { TooltipProps } from 'recharts';
import {
    ValueType,
    NameType,
} from 'recharts/types/component/DefaultTooltipContent';

import { numberToBillions } from 'utils/formatters';

const CustomTooltip = ({
    active,
    payload,
    label,
}: TooltipProps<ValueType, NameType>): ReactElement | null => {
    const theme = useTheme();

    if (!active || !payload) return null;

    const data = payload?.[0] as { payload: { launches: number; gdp: number } };

    let launches = 0;
    let gdp = 0;

    if (data) {
        launches = data?.payload?.launches;
        gdp = data?.payload?.gdp;
    }

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.background.default,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                p: 1,
                color: theme.palette.text.secondary,
            }}
        >
            <Typography variant="body2">{`Year: ${
                label as string
            }`}</Typography>
            <Typography variant="body2">{`Launches: ${
                launches || 0
            }`}</Typography>
            <Typography variant="body2">{`GDP: ${
                gdp ? `${numberToBillions(gdp)} USD` : 0
            }`}</Typography>
        </Box>
    );
};
CustomTooltip.defaultProps = {
    active: false,
    payload: [],
    label: '',
};
export default CustomTooltip; // Can't be memoized
