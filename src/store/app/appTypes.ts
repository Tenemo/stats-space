export const APP_TOGGLE_THEME = 'APP_TOGGLE_THEME';
export const APP_TOGGLE_DISPLAY_UI = 'APP_TOGGLE_DISPLAY_UI';
export const RESET_STATE = 'RESET_STATE';

export type AppTheme = 'light' | 'dark';

export type AppState = {
    theme: AppTheme;
    storeVersion: string;
    isUIDisplayed: boolean;
};

type ToggleThemeAction = {
    type: typeof APP_TOGGLE_THEME;
};
type ToggleDisplayAction = {
    type: typeof APP_TOGGLE_DISPLAY_UI;
};

type ResetStateAction = {
    type: typeof RESET_STATE;
};

export type AppActionTypes =
    | ToggleThemeAction
    | ToggleDisplayAction
    | ResetStateAction;
