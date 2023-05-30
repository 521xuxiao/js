/**
 *   两个很大的数字相加，前提两个大的数字已经超出了js的数字
 *       利用字符串相加
 */

/**
 *
 * @param {string} 一个参数
 * @param {string} string
 * @returns {string}
 */
function sum(a, b) {
    let result = ""
    const len = Math.max(a.length, b.length)  // 两个数字取出来最大的那个
    a = a.padStart(len, "0")  //  前面补零
    b = b.padStart(len, "0")  //  前面补零

    let carry = 0;  // 是否需要进位
    for(let i = len - 1; i>=0; i--) {
        const n = +a[i] + +b[i] + carry
        carry = Math.floor(n / 10)
        result = n % 10 + result
    }
    if(carry) {
        result = "1" + result
    }
    return result;
}

const number = sum('4352453', '788567756')
console.log(number)
