import packageJson from '../../../package.json';

import { RESET_STATE } from 'constants/appConstants';
import { AppState, AppActionTypes, APP_TOGGLE_THEME } from 'store/app/appTypes';

export const initialAppState: AppState = {
    theme: 'dark',
    storeVersion: packageJson.version,
};

export const appReducer = (
    state = initialAppState,
    action: AppActionTypes,
): AppState => {
    switch (action.type) {
        case APP_TOGGLE_THEME:
            return {
                ...state,
                theme: state.theme === 'dark' ? 'light' : 'dark',
            };
        case RESET_STATE: {
            return initialAppState;
        }
        default:
            return state;
    }
};
