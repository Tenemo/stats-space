import { RouterState } from 'redux-first-history';
import { ThunkDispatch } from 'redux-thunk';

import { RESET_STATE } from 'constants/appConstants';
import { AppState, AppActionTypes } from 'store/app/appTypes';
import { StatsState, StatsActionTypes } from 'store/stats/statsTypes';

export type RootState = {
    readonly router: RouterState;
    readonly app: AppState;
    readonly stats: StatsState;
};

type ResetStateAction = {
    type: typeof RESET_STATE;
};

export type AllActions = AppActionTypes | StatsActionTypes | ResetStateAction;
export type CommonDispatch = ThunkDispatch<RootState, unknown, AllActions>;
