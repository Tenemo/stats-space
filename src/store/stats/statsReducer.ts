import { MIN_YEAR, MAX_YEAR } from 'constants/appConstants';
import {
    StatsState,
    StatsActionTypes,
    STATS_LAUNCHES_REQUEST,
    STATS_LAUNCHES_FAILURE,
    STATS_LAUNCHES_SUCCESS,
    STATS_GDP_REQUEST,
    STATS_GDP_FAILURE,
    STATS_GDP_SUCCESS,
    STATS_FILTER_CHART,
} from 'store/stats/statsTypes';

export const initialStatsState: StatsState = {
    launches: {
        isLoading: false,
        error: null,
        response: null,
    },
    gdp: {
        isLoading: false,
        error: null,
        response: null,
    },
    filters: {
        startYear: MIN_YEAR,
        endYear: MAX_YEAR,
    },
};

export const statsReducer = (
    state = initialStatsState,
    action: StatsActionTypes,
): StatsState => {
    switch (action.type) {
        case STATS_LAUNCHES_REQUEST:
            return {
                ...state,
                launches: {
                    ...state.launches,
                    isLoading: true,
                    error: null,
                },
            };
        case STATS_LAUNCHES_FAILURE:
            return {
                ...state,
                launches: {
                    ...state.launches,
                    isLoading: false,
                    error: action.payload.error,
                    response: null,
                },
            };
        case STATS_LAUNCHES_SUCCESS:
            return {
                ...state,
                launches: {
                    ...state.launches,
                    isLoading: false,
                    error: null,
                    response: action.payload.response,
                },
            };
        case STATS_GDP_REQUEST:
            return {
                ...state,
                gdp: {
                    ...state.gdp,
                    isLoading: true,
                    error: null,
                },
            };
        case STATS_GDP_FAILURE:
            return {
                ...state,
                gdp: {
                    ...state.gdp,
                    isLoading: false,
                    error: action.payload.error,
                    response: null,
                },
            };
        case STATS_GDP_SUCCESS:
            return {
                ...state,
                gdp: {
                    ...state.gdp,
                    isLoading: false,
                    error: null,
                    response: action.payload.response,
                },
            };
        case STATS_FILTER_CHART:
            return {
                ...state,
                filters: action.payload.filters,
            };
        default:
            return state;
    }
};
