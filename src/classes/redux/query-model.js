import { call, put, takeLatest } from 'redux-saga/effects'
import { handleActions, createAction } from 'redux-actions';

import * as Apis from '../constants/apiConstants';
import { RESPONSE_CODE, SERVICE_CODE } from "../constants/domainConstants";
import { launchPOSTRequest } from '../utils/request';
import md5 from 'js-md5';
import { message } from 'antd';
import { isEmpty } from '../utils/helper/string-helper';

export const actions = {
    configQueryParams: createAction('configQueryParams')
};

const effects = {
  
};

export const watchers = [
  
]

export const queryStore = handleActions(
    {
        // 设置查询参数
        configQueryParams(state, { payload: pageQuery }) {
            
            let newState = {
                ...state,
                ...pageQuery
            };
            return newState;
        }
    },
    {
        params: {}
    }
);
