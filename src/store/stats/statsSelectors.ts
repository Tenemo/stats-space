import { createSelector } from 'reselect';

import { StatsState } from 'store/stats/statsTypes';
import { RootState } from 'store/types';

export const getStats = (state: RootState): StatsState => state.stats;
export const getStatsLaunches = createSelector(getStats, (app) => app.launches);
export const getStatsGDP = createSelector(getStats, (app) => app.gdp);
