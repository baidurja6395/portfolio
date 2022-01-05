import { Environments } from "./environment.interface";

var commonConfig = {
  production: true,
  myToken: 'myToken'
}

const environments: Environments = {
  local: {
    envKey: 'local',
    production: false,
    apiBaseUrl: 'http://localhost:8052/projects/own/smart-bft/smart_bft_api/v1',
    websiteURL: 'http://localhost:8052/projects/own/smart-bft/smart_bft_website/',
    appDashboardURL: 'http://localhost:8052/projects/own/smart-bft/smart_bft_webapp/pages/dashboard/',
    fileBasePath: 'http://localhost:8052/projects/own/smart-bft/smart_bft_api/'
  },
  train1: {
    envKey: 'train1',
    apiBaseUrl: 'https://train1.smartbft.com/train1/api/v1',
    websiteURL: 'https://train1.smartbft.com/train1/',
    appDashboardURL: 'https://train1.smartbft.com/train1/admin/',
    fileBasePath: 'https://train1.smartbft.com/train1/api/'
  },
  train2: {
    envKey: 'train2',
    apiBaseUrl: 'https://train2.smartbft.com/train2/api/v1',
    websiteURL: 'https://train2.smartbft.com/train2/',
    appDashboardURL: 'https://train2.smartbft.com/train2/admin/',
    fileBasePath: 'https://train2.smartbft.com/train2/api/'
  },
  prod: {
    envKey: 'prod',
    apiBaseUrl: 'https://smartbft.com/api/v1',
    websiteURL: 'https://smartbft.com/',
    appDashboardURL: 'https://smartbft.com/admin/',
    fileBasePath: 'https://smartbft.com/api/'
  }
}

/**
* @description Get environment key based on host : **local | train1 | train2 | prod**
*/
const getEnvKeyByURL = () => {
  var envRegex = new RegExp('');
  var origin = location.origin;
  var href = location.href;

  envRegex = /localhost|^127/;
  if (envRegex.test(origin) || href.includes('local')) {
    return 'local';
  }

  envRegex = /.train1|^127/;
  if (envRegex.test(origin) || href.includes('train1')) {
    return 'train1';
  }

  envRegex = /.train2|^127/;
  if (envRegex.test(origin) || href.includes('train2')) {
    return 'train2';
  }

  return 'prod';
}

/**
* @description Get actual environment property based on envKey : **local | train1 | train2 | prod**
*/
const getEnvironmentConfig = () => {
  const envKey = getEnvKeyByURL();
  let environmentObj = environments[envKey];
  environmentObj = { ...commonConfig, ...environmentObj };
  return environmentObj;
}

export const environment = getEnvironmentConfig();