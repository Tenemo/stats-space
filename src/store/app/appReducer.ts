import packageJson from '../../../package.json';

import { RESET_STATE } from 'constants/appConstants';
import {
    AppState,
    AppActionTypes,
    APP_TOGGLE_THEME,
    APP_TOGGLE_DISPLAY_UI,
} from 'store/app/appTypes';

export const initialAppState: AppState = {
    theme: 'dark',
    storeVersion: packageJson.version,
    isUIDisplayed: true,
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
        case APP_TOGGLE_DISPLAY_UI:
            return {
                ...state,
                isUIDisplayed: !state.isUIDisplayed,
            };
        case RESET_STATE: {
            return initialAppState;
        }
        default:
            return state;
    }
};
