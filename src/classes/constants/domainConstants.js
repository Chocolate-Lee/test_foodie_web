import { SAP_CONTROL } from "../config/appConfig";
import { ENVIRONMENT } from "./appConstants";


/** 域名 */
export let DOMAIN = 'https://codestation.soso-code.com';

if (SAP_CONTROL === ENVIRONMENT.DEV) {
    // 开发环境域名
    DOMAIN = 'http://localhost';
} else if (SAP_CONTROL === ENVIRONMENT.TEST) {
    // 测试环境域名
    DOMAIN = 'http://med.opa.test.soso-code.com';
} else {
    // 生产环境域名
    DOMAIN = 'http://med.opa.soso-code.com';
}

export const PROXY_PART = '/webapi';

/** 模块 */
export const PART = {
    FOOD_TRUCK: '/u/foodtruck',
};


export const REQUEST_TYPE = {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT'
};

export const SERVICE_CODE = {
    Successed: 1
};