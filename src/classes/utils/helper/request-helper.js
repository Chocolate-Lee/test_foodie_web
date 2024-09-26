
export function filterParams(params) {
    let filterParams = {};
    for (let key in params) {
        if (params[key] !== undefined) {
            filterParams[key] = params[key];
        }
    }

    return filterParams;
} 