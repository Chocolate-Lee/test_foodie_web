import Decimal from 'decimal.js';

export function priceYuan(number) {
    if (!number) return 0;
    return Decimal.div(number, 100).toNumber();
}

export function priceFen(number) {
    if (!number) return 0;
    return Decimal.mul(number, 100).toNumber();
}

export function convertExcludeZero(price, fixCount = 5) {

    const multiplier = Math.pow(10, fixCount);

    /**
     * 1.2345678 * 100000 = 123456.78
     * 1.23456
     * 
     */
    let firstMul = Decimal.mul(price, multiplier);
    let afterTrunc = Math.trunc(firstMul);
    let secondDiv = Decimal.div(afterTrunc, multiplier);
    let convertToFive = secondDiv.toNumber();
    
    if (convertToFive % 1 === 0) {
        return convertToFive;
    }
    
    let strNum = convertToFive.toString().replace(/\.?0+$/, '');

    return Number(strNum);
}