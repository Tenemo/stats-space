export const APP_TOGGLE_THEME = 'APP_TOGGLE_THEME';
export const RESET_STATE = 'RESET_STATE';

export type AppTheme = 'light' | 'dark';

export type AppState = {
    theme: AppTheme;
    storeVersion: string;
};

type ToggleThemeAction = {
    type: typeof APP_TOGGLE_THEME;
};

type ResetStateAction = {
    type: typeof RESET_STATE;
};

export type AppActionTypes = ToggleThemeAction | ResetStateAction;
