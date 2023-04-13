import {
    StatsActionTypes,
    LaunchesResponse,
    GDPResponse,
    STATS_LAUNCHES_REQUEST,
    STATS_LAUNCHES_FAILURE,
    STATS_LAUNCHES_SUCCESS,
    STATS_GDP_REQUEST,
    STATS_GDP_FAILURE,
    STATS_GDP_SUCCESS,
    STATS_FILTER_CHART,
    StatsFilters,
    ChartData,
} from './statsTypes';

import { CommonDispatch } from 'store/types';
import { UnknownError } from 'typings/errors';
import request from 'utils/request';

export const launchesRequest = (): StatsActionTypes => ({
    type: STATS_LAUNCHES_REQUEST,
});
export const launchesFailure = (error: UnknownError): StatsActionTypes => ({
    type: STATS_LAUNCHES_FAILURE,
    payload: { error },
});
export const launchesSuccess = (
    response: LaunchesResponse,
): StatsActionTypes => ({
    type: STATS_LAUNCHES_SUCCESS,
    payload: { response },
});

export const fetchLaunches =
    () =>
    async (dispatch: CommonDispatch): Promise<void> => {
        try {
            dispatch(launchesRequest());
            const response = await request.get<LaunchesResponse>('launches', {
                params: {
                    status_abbrev: 'Success',
                },
            });
            dispatch(launchesSuccess(response.data));
        } catch (error) {
            dispatch(launchesFailure(error as UnknownError));
        }
    };

export const gdpRequest = (): StatsActionTypes => ({
    type: STATS_GDP_REQUEST,
});
export const gdpFailure = (error: UnknownError): StatsActionTypes => ({
    type: STATS_GDP_FAILURE,
    payload: { error },
});
export const gdpSuccess = (response: GDPResponse): StatsActionTypes => ({
    type: STATS_GDP_SUCCESS,
    payload: { response },
});

export const fetchGDP =
    () =>
    async (dispatch: CommonDispatch): Promise<void> => {
        try {
            dispatch(gdpRequest());
            const response = await request.get<GDPResponse>('wdi/gdp');
            dispatch(gdpSuccess(response.data));
        } catch (error) {
            dispatch(gdpFailure(error as UnknownError));
        }
    };

export const filterChart = (filters: StatsFilters): StatsActionTypes => ({
    type: STATS_FILTER_CHART,
    payload: { filters },
});

export const exportChartData = (chartData: ChartData): void => {
    const timestamp = new Date()
        .toISOString()
        .split('.')[0]
        .replace('T', '_')
        .replace(/:/g, '-'); // current date + time without milliseconds
    const fileName = `chart-data-${timestamp}.json`;
    const fileContent = JSON.stringify(chartData, null, 2);
    const blob = new Blob([fileContent], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    // Delete the link element after it's used
    setTimeout(() => {
        URL.revokeObjectURL(link.href);
        link.remove();
    }, 0);
};
