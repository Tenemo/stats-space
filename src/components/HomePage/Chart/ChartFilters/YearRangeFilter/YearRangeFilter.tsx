import { useTheme, Box, Typography } from '@mui/material';
import React, { ReactElement, memo } from 'react';
import { Range, getTrackBackground } from 'react-range';

import { MIN_YEAR, MAX_YEAR } from 'constants/appConstants';
import { useSelector, useDispatch } from 'store';
import { filterChart } from 'store/stats/statsActions';
import { getStatsFilters } from 'store/stats/statsSelectors';

const YearRangeFilter = (): ReactElement => {
    const filters = useSelector(getStatsFilters);

    const theme = useTheme();
    const dispatch = useDispatch();

    const onYearChange = (values: [number, number]): void => {
        dispatch(
            filterChart({
                ...filters,
                startYear: values[0],
                endYear: values[1],
            }),
        );
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                mx: '21px',
            }}
        >
            <Typography sx={{ mb: 1 }}>
                From {filters.startYear} to {filters.endYear}
            </Typography>
            <Range
                draggableTrack
                max={MAX_YEAR}
                min={MIN_YEAR}
                onChange={(values) => {
                    onYearChange(values as [number, number]);
                }}
                renderThumb={({ props, isDragged }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: '42px',
                            width: '42px',
                            borderRadius: '4px',
                            backgroundColor: theme.palette.primary.main,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{
                                height: '16px',
                                width: '5px',
                                backgroundColor: isDragged ? '#548BF4' : '#CCC',
                            }}
                        />
                    </div>
                )}
                renderTrack={({ props, children }) => (
                    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                    <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                            ...props.style,
                            height: '36px',
                            display: 'flex',
                            width: '100%',
                        }}
                    >
                        <div
                            ref={props.ref}
                            style={{
                                height: '5px',
                                width: '100%',
                                borderRadius: '4px',
                                background: getTrackBackground({
                                    values: [
                                        filters.startYear,
                                        filters.endYear,
                                    ],
                                    colors: [
                                        theme.palette.primary.light,
                                        theme.palette.primary.main,
                                        theme.palette.primary.light,
                                    ],
                                    min: MIN_YEAR,
                                    max: MAX_YEAR,
                                }),
                                alignSelf: 'center',
                            }}
                        >
                            {children}
                        </div>
                    </div>
                )}
                step={1}
                values={[filters.startYear, filters.endYear]}
            />
        </Box>
    );
};
export default memo(YearRangeFilter); // Can't be memoized
