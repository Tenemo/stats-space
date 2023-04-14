import {
    AppActionTypes,
    APP_TOGGLE_THEME,
    APP_TOGGLE_DISPLAY_UI,
} from 'store/app/appTypes';

export const toggleTheme = (): AppActionTypes => ({
    type: APP_TOGGLE_THEME,
});

export const toggleDisplayUI = (): AppActionTypes => ({
    type: APP_TOGGLE_DISPLAY_UI,
});
