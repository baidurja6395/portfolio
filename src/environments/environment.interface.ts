export type EnvKey = 'local' | 'train1' | 'train2' | 'prod';

export interface Environment {
    production?: boolean,
    myToken?: string,
    envKey: string,
    apiBaseUrl: string,
    websiteURL: string,
    appDashboardURL: string,
    fileBasePath: string
}

export type Environments = {
    [key in EnvKey]: Environment
}