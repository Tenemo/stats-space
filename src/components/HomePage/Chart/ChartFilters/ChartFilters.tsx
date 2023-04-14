import {
    Box,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import React, { ReactElement, memo, useMemo, useCallback } from 'react';

import YearRangeFilter from './YearRangeFilter';

import { useSelector, useDispatch } from 'store';
import { filterChart } from 'store/stats/statsActions';
import {
    getStatsFilters,
    getStatsLaunches,
    getStatsGDP,
} from 'store/stats/statsSelectors';

const ChartFilters = (): ReactElement => {
    const dispatch = useDispatch();
    const filters = useSelector(getStatsFilters);
    const { response: launchesResponse } = useSelector(getStatsLaunches);
    const { response: GDPResponse } = useSelector(getStatsGDP);

    const topCountries = useMemo(() => {
        if (!launchesResponse?.launches || !GDPResponse) {
            return [];
        }

        const countryLaunchCounts = Object.values(launchesResponse.launches)
            .flat()
            .reduce((launchCounts, launch) => {
                const countryCode = launch.launch_service_provider_country_code;
                if (!launchCounts[countryCode]) {
                    return {
                        ...launchCounts,
                        [countryCode]: {
                            count: 1,
                            countryName: launch.launch_service_provider_country,
                            countryCode,
                        },
                    };
                }
                return {
                    ...launchCounts,
                    [countryCode]: {
                        ...launchCounts[countryCode],
                        count: launchCounts[countryCode].count + 1,
                    },
                };
            }, {} as Record<string, { count: number; countryName: string; countryCode: string }>);

        let filteredCountries = Object.values(countryLaunchCounts).filter(
            (country) => Object.keys(GDPResponse).includes(country.countryCode),
        );

        filteredCountries = filteredCountries.sort((a, b) => b.count - a.count);
        return filteredCountries;
    }, [GDPResponse, launchesResponse?.launches]);

    const onCountryChange = useCallback(
        (event: SelectChangeEvent<string>): void => {
            dispatch(filterChart({ ...filters, country: event.target.value }));
        },
        [dispatch, filters],
    );

    return (
        <>
            <Box sx={{ width: 300, m: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="country-select-label">Country</InputLabel>
                    <Select
                        id="country-select"
                        label="Country"
                        labelId="country-select-label"
                        onChange={onCountryChange}
                        value={filters?.country}
                    >
                        <MenuItem key="all" value="all">
                            <ListItemText primary="All countries" />
                        </MenuItem>
                        {topCountries.map((country) => (
                            <MenuItem
                                key={country.countryCode}
                                value={country.countryCode}
                            >
                                <ListItemText primary={country.countryName} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <YearRangeFilter />
        </>
    );
};
export default memo(ChartFilters); // Can't be memoized
