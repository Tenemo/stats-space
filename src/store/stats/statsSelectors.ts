import { createSelector } from 'reselect';

import { initialStatsState } from './statsReducer';

import { StatsState } from 'store/stats/statsTypes';
import { RootState } from 'store/types';

export const getStats = (state: RootState): StatsState => state.stats;
export const getStatsLaunches = createSelector(
    getStats,
    (stats) => stats.launches,
);
export const getStatsGDP = createSelector(getStats, (stats) => stats.gdp);
export const getStatsFilters = createSelector(
    getStats,
    (stats) => stats.filters ?? initialStatsState.filters,
);
