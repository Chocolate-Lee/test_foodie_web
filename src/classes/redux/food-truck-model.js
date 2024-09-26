import * as Apis from '../constants/apiConstants';
import { SERVICE_CODE } from "../constants/domainConstants";
import { launchPOSTRequest } from '../utils/request';

export async function launchGetFoodTruckList(
    params = {},
    success = () => {},
    failed = () => {}
  ) {
    try {
        
        const response = await launchPOSTRequest(Apis.GET_FOOD_TRUCK_LIST, params);
        if (
            response.status === SERVICE_CODE.Successed
        ) {
            success(response);
        } else {
            failed(response.msg);
        }
    } catch (rejectedValue) {
        failed(JSON.stringify(rejectedValue));
    } 
}


