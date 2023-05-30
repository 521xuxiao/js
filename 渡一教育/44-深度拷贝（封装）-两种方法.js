/**
 *
 *   44-深度拷贝（封装）-两种方法
 *
 *      深度拷贝两种方法
 *
 *
 *
 *
 *
 *
 */


// 方法一：
function deepClone(value) {

    // 非原始值有两种
    //  1、数组的克隆
    if(Object.prototype.toString.call(value) === '[object Array]') {
        let clone = [];
        for(let i=0;i<value.length;i++) {
            clone[i] = deepClone(value[i]);
        }
        return clone
    }

    // 2、对象的克隆
    if(Object.prototype.toString.call(value) === '[object Object]') {
        let clone = {}
        for(let key in value) {
            clone[key] = deepClone(value[key])
        }
        return clone
    }


    return value;  // 返回原始值
}



// 方法二：
function deepClone2(value) {
    return new Promise((resolve, reject) => {
        const { port1, port2 } = new MessageChannel();
        port1.postMessage(value)
        port2.onmessage = function(res) {
            resolve(res.data)
        }
    })
}
deepClone2("需要传进去的值").then(res => {
    console.log(res)
})
