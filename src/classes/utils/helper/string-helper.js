/**
 * 字符串判空
 * @param str
 * @returns {boolean}
 */
export function isEmpty(str) {
    
    if (typeof str === 'string') {
        if (str === undefined || str === 'undefined' || str === null || str.replace(/^\s\s*/, '').replace(/\s\s*$/, '').length === 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return str === undefined || str === null;
    }
}