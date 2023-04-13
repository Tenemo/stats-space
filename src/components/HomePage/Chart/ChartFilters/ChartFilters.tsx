import { Box } from '@mui/material';
import React, { ReactElement, memo } from 'react';

import YearRangeFilter from './YearRangeFilter';

const ChartFilters = (): ReactElement => {
    return (
        <Box>
            <YearRangeFilter />
        </Box>
    );
};
export default memo(ChartFilters); // Can't be memoized
