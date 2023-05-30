/**
 * 两种特殊情况需要考虑：
 *     两个值相当可能并不一定相等
 *         NaN === NaN  为 false
 *     两个值不相等但是有可能相等
 *         +0 === -0   为 true
 * @param newVal
 * @param oldVal
 * @returns {boolean|boolean}
 */
export const hasChanged = (newVal, oldVal) => {
    if(newVal === oldVal) {
        return newVal === 0 && 1 / newVal !== 1 / oldVal;
    }else{
        return newVal === newVal || oldVal === oldVal
    }
}
