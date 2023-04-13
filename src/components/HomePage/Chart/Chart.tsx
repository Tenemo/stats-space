import React, { ReactElement, memo, useMemo } from 'react';
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

import CustomTooltip from './CustomTooltip';

import { useSelector } from 'store';
import { getStatsLaunches, getStatsGDP } from 'store/stats/statsSelectors';
import { numberToBillions } from 'utils/formatters';

const Chart = (): ReactElement => {
    const { response: launchesResponse } = useSelector(getStatsLaunches);
    const { response: GDPResponse } = useSelector(getStatsGDP);

    const chartData = useMemo(() => {
        if (!launchesResponse?.launches || !GDPResponse) {
            return [];
        }
        const years = Object.keys(launchesResponse.launches);
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
    }, [launchesResponse, GDPResponse]);

    return (
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
                <YAxis orientation="left" stroke="#8884d8" yAxisId="left">
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
                    interval={0}
                    orientation="right"
                    stroke="#82ca9d"
                    tickFormatter={(value: number) => numberToBillions(value)}
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
    );
};

export default memo(Chart);
