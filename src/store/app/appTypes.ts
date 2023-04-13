export const APP_TOGGLE_THEME = 'APP_TOGGLE_THEME';

export type AppTheme = 'light' | 'dark';

export type AppState = {
    theme: AppTheme;
    storeVersion: string;
};

type ToggleThemeAction = {
    type: typeof APP_TOGGLE_THEME;
};

export type AppActionTypes = ToggleThemeAction;
