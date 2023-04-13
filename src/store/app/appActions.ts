import { AppActionTypes, APP_TOGGLE_THEME } from 'store/app/appTypes';

export const toggleTheme = (): AppActionTypes => ({
    type: APP_TOGGLE_THEME,
});
