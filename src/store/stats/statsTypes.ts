import { UnknownError } from 'typings/errors';

export const STATS_LAUNCHES_REQUEST = 'STATS_LAUNCHES_REQUEST';
export const STATS_LAUNCHES_FAILURE = 'STATS_LAUNCHES_FAILURE';
export const STATS_LAUNCHES_SUCCESS = 'STATS_LAUNCHES_SUCCESS';

export const STATS_GDP_REQUEST = 'STATS_GDP_REQUEST';
export const STATS_GDP_FAILURE = 'STATS_GDP_FAILURE';
export const STATS_GDP_SUCCESS = 'STATS_GDP_SUCCESS';

export const STATS_FILTER_CHART = 'STATS_FILTER_CHART';

export type WDIRowResponse = {
    [year: string]: string;
    countryName: string;
    countryCode: string;
    indicatorName: string;
    indicatorCode: string;
};

export type LaunchShort = {
    id: string;
    url: string;
    slug: string;
    name: string;
    status_abbrev: string;
    window_start: string;
    launch_service_provider_name: string;
    launch_service_provider_type: string;
    launch_service_provider_country_code: string;
    launch_service_provider_country: string;
    rocket_configuration_family: string;
    mission_name: string;
    mission_description: string;
    pad_url: string;
    pad_name: string;
    pad_wiki_url: string;
    pad_map_url: string;
    pad_location_name: string;
    pad_location_country_code: string;
    pad_location_country: string;
};

export type LaunchesResponse = {
    count: number;
    launches: Record<string, LaunchShort[]>;
};

export type GDPResponse = Record<string, WDIRowResponse>;

export type StatsFilters = {
    startYear: number;
    endYear: number;
};

export type StatsState = {
    launches: {
        isLoading: boolean;
        error: UnknownError | null;
        response: LaunchesResponse | null;
    };
    gdp: {
        isLoading: boolean;
        error: UnknownError | null;
        response: GDPResponse | null;
    };
    filters: StatsFilters;
};

type LaunchesRequestAction = {
    type: typeof STATS_LAUNCHES_REQUEST;
};
type LaunchesFailureAction = {
    type: typeof STATS_LAUNCHES_FAILURE;
    payload: {
        error: UnknownError;
    };
};
type LaunchesSuccessAction = {
    type: typeof STATS_LAUNCHES_SUCCESS;
    payload: {
        response: LaunchesResponse;
    };
};
type GDPRequestAction = {
    type: typeof STATS_GDP_REQUEST;
};
type GDPFailureAction = {
    type: typeof STATS_GDP_FAILURE;
    payload: {
        error: UnknownError;
    };
};
type GDPSuccessAction = {
    type: typeof STATS_GDP_SUCCESS;
    payload: {
        response: GDPResponse;
    };
};

type FilterChart = {
    type: typeof STATS_FILTER_CHART;
    payload: {
        filters: StatsFilters;
    };
};

export type StatsActionTypes =
    | LaunchesRequestAction
    | LaunchesFailureAction
    | LaunchesSuccessAction
    | GDPRequestAction
    | GDPFailureAction
    | GDPSuccessAction
    | FilterChart;
