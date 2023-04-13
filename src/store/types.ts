import { RouterState } from 'redux-first-history';
import { ThunkDispatch } from 'redux-thunk';

import { AppState, AppActionTypes } from 'store/app/appTypes';
import { StatsState, StatsActionTypes } from 'store/stats/statsTypes';

export type RootState = {
    readonly router: RouterState;
    readonly app: AppState;
    readonly stats: StatsState;
};

export type AllActions = AppActionTypes | StatsActionTypes;
export type CommonDispatch = ThunkDispatch<RootState, unknown, AllActions>;
