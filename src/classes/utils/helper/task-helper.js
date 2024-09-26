import LLCDateHelper from "date-helper";
import { kTASK_POST_ENV, kTASK_STATE, kTASK_TIME_ENV, kTASK_TYPE, kTASK_WORK_ENV, kTASK_WORK_SEX_ASK } from "../../constants/businessConstants";

const TaskTools = {};
export default TaskTools;

TaskTools.getStateTag = function(task) {
    
    let desc = '';
    let backgroundColor = '#fff';
    let color = '#333';
    if (!task) return desc;

    // if (task.paystate === kTASK_PAY_STATE.PAY_STATE_UNPAY) {
    //     desc = '待付款';
    //     backgroundColor = kUI_COLOR.PRIMARY_THEME;
    //     color = '#fff';
    // } else {
    
        switch (task.state) {
            case kTASK_STATE.STATE_UNPAY:
                desc = '待付款';
                backgroundColor = '#2db7f5';
                color = '#fff';
                break;
            case kTASK_STATE.STATE_PENDING:
                desc = '审核中';
                backgroundColor = '#2db7f5';
                color = '#fff';
                break;
            case kTASK_STATE.STATE_PASS:
                desc = '招募中';
                backgroundColor = '#87d068';
                color = '#fff';
                break;
            case kTASK_STATE.STATE_LOCK:
                desc = '进行中';
                backgroundColor = '#87d068';
                color = '#fff';
                break;
            case kTASK_STATE.STATE_DONE:
                desc = '已完成';
                backgroundColor = '#fff';
                color = '#000';
                break;
            case kTASK_STATE.STATE_CANCEL_BY_EMPLOYER:
                desc = '已取消';
                backgroundColor = '#F5F4F8';
                color = '#333';
                break;
            case kTASK_STATE.STATE_REJECT_AND_PAYED:
                desc = '已驳回';
                backgroundColor = '#f50';
                color = '#fff';
                break;
        }
    // }

    return { desc, backgroundColor, color };
};


TaskTools.getTaskDateDesc = function(task) {
    let begin = LLCDateHelper.formatDate(task.begindate/1000, 'yyyy-MM-dd');
    let end = LLCDateHelper.formatDate(task.enddate/1000, 'yyyy-MM-dd');

    let beginArr = begin.split('-');
    let endArr = end.split('-');

    let desc = '';
    if (endArr[0] === beginArr[0]) {
        if (endArr[1] === beginArr[1]) {
            if (endArr[2] === beginArr[2]) {
                desc = begin;
            } else {
                desc = `${begin} 至 ${endArr[2]}`;
            }
        } else {
            desc = `${begin} 至 ${endArr[1]}-${endArr[2]}`;
        }
    } else {
        desc = `${begin} 至 ${end}`;
    }

    return desc;
}


TaskTools.getCityDesc = function(task) {
    if (task.province === task.city) {
        return task.city;
    } else {
        return `${task.province} - ${task.city}`;
    }
}

TaskTools.getWorkenvDesc = function(task) {
    let desc = '';
    switch (task.workenv) {
        case kTASK_WORK_ENV.BOTH:
            desc = '视情况而定';
            break;
        case kTASK_WORK_ENV.INSIDE:
            desc = '室内';
            break;
        case kTASK_WORK_ENV.OUTSIDE:
            desc = '室外';
            break;

    }

    return desc;
}

TaskTools.getTimeenvDesc = function(task) {
    let desc = '';
    switch (task.timeenv) {
        case kTASK_TIME_ENV.BOTH:
            desc = '视情况而定';
            break;
        case kTASK_TIME_ENV.DAY:
            desc = '白班';
            break;
        case kTASK_TIME_ENV.NIGHT:
            desc = '夜班';
            break;

    }

    return desc;
}

TaskTools.getPostenvDesc = function(task) {
    let desc = '';
    switch (task.postenv) {
        case kTASK_POST_ENV.BOTH:
            desc = '视情况而定';
            break;
        case kTASK_POST_ENV.SIT:
            desc = '坐岗';
            break;
        case kTASK_POST_ENV.STAND:
            desc = '站岗';
            break;

    }

    return desc;
}


TaskTools.getSexDesc = function(task) {
    let desc = '';
    switch (task.sexask) {
        case kTASK_WORK_SEX_ASK.BOTH:
            desc = '无';
            break;
        case kTASK_WORK_SEX_ASK.MAN:
            desc = '只招男性';
            break;
        case kTASK_WORK_SEX_ASK.WOMAN:
            desc = '只招女性';
            break;

    }

    return desc;
}

TaskTools.getHeightDesc = function(task) {

    if ((!task.manheightask || task.manheightask === 0) && (!task.womanheightask || task.womanheightask === 0)) {
        return '无';
    }

    if (task.sexask === kTASK_WORK_SEX_ASK.MAN) {
        if (!task.manheightask || task.manheightask === 0) {
            return '无';
        } else {
            return `${task.manheightask}cm以上`;
        }
    } else if (task.sexask === kTASK_WORK_SEX_ASK.WOMAN) {
        if (!task.womanheightask || task.womanheightask === 0) {
            return '无';
        } else {
            return `${task.womanheightask}cm以上`;
        }
    } else {
        let desc = '';
        if (!task.manheightask || task.manheightask === 0) {
            
        } else {
            desc = desc + `男性${task.manheightask}cm以上`;
        }

        if (!task.womanheightask || task.womanheightask === 0) {
            
        } else {
            if (desc.length > 0) {
                desc = desc + '、';
            }
            desc = desc + `女性${task.womanheightask}cm以上`;
        }

        return desc;
    }
}

TaskTools.getAgeDesc = function(task) {
    if ((!task.minageask || task.minageask === 0) && (!task.maxageask || task.maxageask === 0)) {
        return '无';
    }

    let desc = '';
    if (task.minageask && task.minageask !== 0) {
        desc = desc + `${task.minageask}岁以上`;
    }

    if (task.maxageask && task.maxageask !== 0) {
        if (desc.length > 0) {
            desc = desc + '、';
        }
        desc = desc + `${task.maxageask}岁以下`;
    }

    return desc;
}

TaskTools.getPriceDesc = function(task) {
    if (task.type === kTASK_TYPE.TEMP_TASK) {
        var cprice = task.price / 100;
        return `时薪：￥${cprice}`;
    } else {
        var cprice = task.price / 100;
        return `月薪：￥${cprice}`;
    }
}


TaskTools.getTpyeDesc = function(task) {
    let desc = '';
    let shortDesc = '';
    let backgroundColor = '#fff';
    let color = '#000';
    let borderColor = '#fff';
    let borderWidth = 0;
    if (task.type === kTASK_TYPE.TEMP_TASK) {
        desc = '临时任务';
        shortDesc = '临';
        backgroundColor = '#f50';
        color = '#fff';
    } else {
        desc = '长期招聘';
        shortDesc = '招';
        backgroundColor = '#2db7f5';
        color = '#fff';
        borderColor = '#D9D9D9';
        borderWidth = 0.5;
    }

    return { desc, shortDesc, color, backgroundColor };
}