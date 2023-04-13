import { Button, Box } from '@mui/material';
import React, { ReactElement, memo, useMemo } from 'react';
import { isMobile } from 'react-device-detect';
import {
    LineChart,
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

import { useSelector } from 'store';
import { exportChartData } from 'store/stats/statsActions';
import {
    getStatsLaunches,
    getStatsGDP,
    getStatsFilters,
} from 'store/stats/statsSelectors';
import { ChartData } from 'store/stats/statsTypes';
import { numberToBillions } from 'utils/formatters';

const Chart = (): ReactElement => {
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
                const launchesCount = launchesResponse.launches[year].length;
                const totalGDP = Object.values(GDPResponse).reduce(
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
    ]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: isMobile ? '100%' : '90%',
                height: isMobile ? '100%' : '50%',
                minHeight: '400px',
            }}
        >
            <ResponsiveContainer height="90%" width="100%">
                <LineChart
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
                        domain={[0, 160]}
                        orientation="left"
                        stroke="#8884d8"
                        yAxisId="left"
                    >
                        <Label
                            angle={270}
                            offset={-10}
                            position="left"
                            stroke="#8884d8"
                            style={{
                                textAnchor: 'middle',
                            }}
                            value="No. of launches"
                        />
                    </YAxis>
                    <YAxis
                        domain={[0, 90 * 1000 * 1000 * 1000 * 1000]}
                        interval="preserveStartEnd"
                        orientation="right"
                        stroke="#82ca9d"
                        tickFormatter={(value: number) =>
                            numberToBillions(value)
                        }
                        width={90}
                        yAxisId="right"
                    >
                        <Label
                            angle={90}
                            position="right"
                            stroke="#82ca9d"
                            style={{
                                textAnchor: 'middle',
                            }}
                        >
                            GDP [Billions USD]
                        </Label>
                    </YAxis>
                    <Tooltip content={CustomTooltip} />
                    <Legend />
                    <Line
                        activeDot={{ r: 8 }}
                        dataKey="launches"
                        dot={false}
                        stroke="#8884d8"
                        type="monotone"
                        yAxisId="left"
                    />
                    <Line
                        activeDot={{ r: 8 }}
                        dataKey="gdp"
                        dot={false}
                        stroke="#82ca9d"
                        type="monotone"
                        yAxisId="right"
                    />
                </LineChart>
            </ResponsiveContainer>
            <ChartFilters />
            <Button
                onClick={() => exportChartData(chartData)}
                sx={{ mt: 4, alignSelf: 'flex-end' }}
                variant="contained"
            >
                Export to JSON
            </Button>
        </Box>
    );
};

export default memo(Chart);
