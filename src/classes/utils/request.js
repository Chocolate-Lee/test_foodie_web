import * as DominConfigs from '../constants/domainConstants';
import * as APIs from '../constants/apiConstants';
import LLCDateHelper from 'date-helper';
import md5 from 'js-md5';

import { message } from 'antd';

function checkStatus(response) {
  if (response.result.status >= 200 && response.result.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  const response = await fetch(url, options);
  checkStatus(response);
  return await response.json();
}

export async function launchPOSTRequest(
  url,
  params = {},
  requestTyp = DominConfigs.REQUEST_TYPE.POST,
  ignoreParam = false
) {


  // headers
  const t = LLCDateHelper.achiveTimestampOfSecond();
  const os = 'opt';

  let headers = new Headers({
    Accept: '*/*',
    'Content-Type': 'application/json',
    Connection: 'keep-alive',
    c: 'opa',
    t,
    os,
  });

  const fetchParams = {
    method: requestTyp,
    headers
  };

  // 根据不同的请求类型 拼装请求参数
  if (requestTyp === DominConfigs.REQUEST_TYPE.POST) {
    fetchParams.body = JSON.stringify(params);
  } else if (requestTyp === DominConfigs.REQUEST_TYPE.GET) {
    if (!ignoreParam) {
      const allKey = Object.keys(params);
      if (allKey && allKey.length > 0) {
        if (url.indexOf('?') === -1) {
          url = `${url}?`;
        } else {
          if (url.indexOf('=') !== -1) {
            url = url + '&';
          }
        }
        let query = '';
        for (let i = 0; i < allKey.length; i += 1) {
          query = `${query + allKey[i]}=${params[allKey[i]]}`;
          if (i !== allKey.length - 1) {
            query = `${query}&`;
          }
        }
        url = url + query;
      }
    }
  } else if (requestTyp === DominConfigs.REQUEST_TYPE.PUT) {
    fetchParams.body = JSON.stringify(params);
  }

  
  const response = await fetch(url, fetchParams);
  const responseData = await response.json();
  
  return responseData;
}


