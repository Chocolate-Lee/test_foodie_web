import { call, put, takeLatest } from 'redux-saga/effects'
import { handleActions, createAction } from 'redux-actions';

import * as Apis from '../../constants/apiConstants';
import { RESPONSE_CODE, SERVICE_CODE } from "../../constants/dominConstants";
import { launchPOSTRequest } from '../utils/request';
import md5 from'js-md5';
import { message } from 'antd';

export const actions = {
    changeNav: createAction('route/changeNav'),
};

const changeNav = createAction('changeNav');

const effects = {
    changeNav: function* ({ payload }) {
        // yield put(changeNavInfo({ loading: true }))
    },
};

export const watchers = [
    function* () {
        yield takeLatest(actions.changeNav, effects.changeNav);
    },
]

/* 
    reducer

    loginResult五个字段: 
    username accesstoken userid refreshtoken portrait
*/
export const routeStore = handleActions(
    {
        changeNavInfo(state, { payload: result }) {
            return {
                ...state,
            
            }
        },
    },
    {
        navTitle: undefined,
        subTitle: undefined,
        tags: undefined,
        navRoute: undefined,
        onBack: undefined
    }
);
