import { AppState, AppActionTypes, APP_TOGGLE_THEME } from 'store/app/appTypes';

export const initialAppState: AppState = {
    theme: 'dark',
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
