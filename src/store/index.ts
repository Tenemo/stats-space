import { composeWithDevTools } from '@redux-devtools/extension';
import { createBrowserHistory } from 'history';
import localforage from 'localforage';
import {
    TypedUseSelectorHook,
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector,
} from 'react-redux';
import {
    Store,
    legacy_createStore, // eslint-disable-line camelcase
    applyMiddleware,
    compose,
    combineReducers,
    AnyAction,
} from 'redux';
import { createReduxHistoryContext } from 'redux-first-history';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { BUILD_TYPE } from 'constants/appConstants';
import { appReducer, initialAppState } from 'store/app/appReducer';
import { statsReducer, initialStatsState } from 'store/stats/statsReducer';
import { RootState } from 'store/types';

const PERSIST_CONFIG = {
    key: 'root',
    storage: localforage,
};
export const initialState = { app: initialAppState, stats: initialStatsState };

const { createReduxHistory, routerMiddleware, routerReducer } =
    createReduxHistoryContext({
        history: createBrowserHistory(),
    });

export const rootReducer = persistReducer(
    PERSIST_CONFIG,
    combineReducers({
        router: routerReducer,
        stats: statsReducer,
        app: appReducer,
    }),
);

const logger = createLogger({
    diff: true,
    collapsed: true,
});
const configureStoreDev = (): Store<RootState> => {
    const middleware = [thunk, logger, routerMiddleware];
    return legacy_createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware)),
    );
};
const configureStoreProd = (): Store<RootState> => {
    const middleware = [thunk, routerMiddleware];
    return legacy_createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware)),
    );
};
const configureStore =
    BUILD_TYPE === `production` ? configureStoreProd : configureStoreDev;

export const store = configureStore();
export const history = createReduxHistory(store);
export const persistor = persistStore(store);

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export const useDispatch: () => AppDispatch = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
