import { Button, Box, Typography } from '@mui/material';
import React, { ReactElement, memo, useMemo } from 'react';
import { isMobile } from 'react-device-detect';
import {
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Label,
} from 'recharts';

import ChartFilters from './ChartFilters';
import CustomTooltip from './CustomTooltip';

import './chart.scss';

import { useSelector } from 'store';
import { getAppTheme } from 'store/app/appSelectors';
import { exportChartData } from 'store/stats/statsActions';
import {
    getStatsLaunches,
    getStatsGDP,
    getStatsFilters,
} from 'store/stats/statsSelectors';
import { ChartData } from 'store/stats/statsTypes';
import { numberToBillions } from 'utils/formatters';

const Chart = (): ReactElement => {
    const appTheme = useSelector(getAppTheme);
    const { response: launchesResponse } = useSelector(getStatsLaunches);
    const { response: GDPResponse } = useSelector(getStatsGDP);
    const filters = useSelector(getStatsFilters);

    const chartData: ChartData = useMemo(() => {
        if (!launchesResponse?.launches || !GDPResponse) {
            return [];
        }
        const years = Object.keys(launchesResponse.launches).filter(
            (year) =>
                parseInt(year, 10) >= filters.startYear &&
                parseInt(year, 10) <= filters.endYear,
        );
        return years
            .map((year) => {
                let yearLaunches = launchesResponse.launches[year];
                if (filters.country !== 'all') {
                    yearLaunches = yearLaunches.filter(
                        ({ launch_service_provider_country_code }) =>
                            launch_service_provider_country_code ===
                            filters.country,
                    );
                }
                const launchesCount = yearLaunches.length;

                let GDPSelectedCountries = Object.values(GDPResponse);

                if (filters.country !== 'all') {
                    GDPSelectedCountries = GDPSelectedCountries.filter(
                        ({ country_code }) => country_code === filters.country,
                    );
                }

                const totalGDP = GDPSelectedCountries.reduce(
                    (sum, countryGDP) => {
                        const gdp = countryGDP[year] || '0';
                        return sum + parseFloat(gdp);
                    },
                    0,
                );

                return {
                    year,
                    launches: launchesCount === 0 ? null : launchesCount,
                    gdp: totalGDP === 0 ? null : totalGDP,
                };
            })
            .slice(0, -1); // remove current year due to incomplete data for the year
    }, [
        launchesResponse?.launches,
        GDPResponse,
        filters.startYear,
        filters.endYear,
        filters.country,
    ]);
    const launchesCount = useMemo(() => {
        if (!launchesResponse?.launches) {
            return 0;
        }

        const years = Object.keys(launchesResponse.launches).filter(
            (year) =>
                parseInt(year, 10) >= filters.startYear &&
                parseInt(year, 10) <= filters.endYear,
        );

        let totalLaunchesCount = 0;

        years.forEach((year) => {
            let yearLaunches = launchesResponse.launches[year];
            if (filters.country !== 'all') {
                yearLaunches = yearLaunches.filter(
                    ({ launch_service_provider_country_code }) =>
                        launch_service_provider_country_code ===
                        filters.country,
                );
            }
            totalLaunchesCount += yearLaunches.length;
        });

        return totalLaunchesCount;
    }, [
        launchesResponse?.launches,
        filters.startYear,
        filters.endYear,
        filters.country,
    ]);

    const colors = {
        launches: appTheme === 'dark' ? '#8884d8' : '#612200',
        gdp: appTheme === 'dark' ? '#82ca9d' : '#fff',
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
            }}
        >
            <Typography>Total launches: {launchesCount}</Typography>
            <ResponsiveContainer height="90%" width="100%">
                <ComposedChart
                    data={chartData}
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <XAxis dataKey="year" />
                    <YAxis
                        domain={
                            filters.country === 'all' ? [0, 160] : undefined
                        }
                        orientation="left"
                        stroke={colors.launches}
                        yAxisId="left"
                    >
                        {isMobile && (
                            <Label
                                angle={270}
                                offset={-10}
                                position="left"
                                stroke={colors.launches}
                                style={{
                                    textAnchor: 'middle',
                                }}
                                value="No. of launches"
                            />
                        )}
                    </YAxis>
                    <YAxis
                        domain={
                            filters.country === 'all'
                                ? [0, 90 * 1000 * 1000 * 1000 * 1000]
                                : undefined
                        }
                        interval="preserveStartEnd"
                        orientation="right"
                        stroke={colors.gdp}
                        tickFormatter={(value: number) =>
                            numberToBillions(value)
                        }
                        width={90}
                        yAxisId="right"
                    >
                        {isMobile && (
                            <Label
                                angle={90}
                                position="right"
                                stroke={colors.gdp}
                                style={{
                                    textAnchor: 'middle',
                                }}
                            >
                                GDP [Billions USD]
                            </Label>
                        )}
                    </YAxis>
                    <Tooltip content={CustomTooltip} />
                    <Legend />
                    <Bar
                        dataKey="launches"
                        fill="transparent"
                        stroke={colors.launches}
                        strokeWidth={appTheme === 'dark' ? 2 : 0}
                        {...(appTheme === 'light' && { fill: colors.launches })}
                        type="monotone"
                        yAxisId="left"
                    />
                    <Line
                        activeDot={{ r: 8 }}
                        dataKey="gdp"
                        dot={false}
                        stroke={colors.gdp}
                        strokeWidth={2}
                        type="monotone"
                        yAxisId="right"
                    />
                </ComposedChart>
            </ResponsiveContainer>
            <ChartFilters />
            <Button
                onClick={() => exportChartData(chartData)}
                sx={{ m: 2, alignSelf: 'flex-end' }}
                variant="contained"
            >
                Export to JSON
            </Button>
        </Box>
    );
};

export default memo(Chart);
