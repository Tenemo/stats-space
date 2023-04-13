import packageJson from '../../../package.json';

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
        default:
            return state;
    }
};
