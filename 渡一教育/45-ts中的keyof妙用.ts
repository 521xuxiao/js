


/**

        ts 中使用keyof进行对象里面的key约束

*/

const cat = {
    name: "k",
    age: 18,
    love: "捉老鼠"
}

const user = {
    loginId: '',
    loginPassword: ""
}

function getValue(obj: object, key: string) {
    return obj[key]
}

// 上面的方法类型提示不友好，可以利用keyof进行泛型约束
function getValue<T extends object, U extends keyof T>(obj: T, key: U): T[U] {
    return obj[key]
}


/**
*    never的妙用, 一个类型里面除掉一个时间的类型
*/
type banDate<T> = T extends Date ? never : T
function log<T>(x:banDate<T>) {

    console.log(x)
}
log(new Date())  // 不能传日期了 报错
log("df")  // 其它的字符串可以传进去

// 另外一种方式，传入去除掉自定义的数据类型
type banDate<U, E> = U extends E ? never : U
function log2<U>(x:banDate<U, string>) {
    console.log(x)
}
