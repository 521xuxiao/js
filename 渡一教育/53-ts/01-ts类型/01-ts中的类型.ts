
/**
 *   1、数字
 */
let a: number = 0;

/**
 *  2、字符串
 */

let b: string = ""

/**
 *  3、联合类型
 */

//let c: 10  // 相当于常量，不能更改
// 上面常用的场景是：
let c: 'man' | "woman"  // 联合类型
// 或者
let d: string | boolean


/**
 * 4、any 可以是任何类型
 */
let e:any


/**
 *  5、unknown  实际上就是一个类型安全的any, unknown 类型的变量不能赋值给其它类型的变量
 */
let f: unknown = 1
f = ""



/**
 *   6、类型断言 ，告诉解析器变量的实际类型
 *     语法： 1、 变量 as 类型
 *           2、 <类型>变量
 */
let g:unknown = 12
let h:number = g as number


/**
 *  7、 void  函数没有返回值
 */
function fn():void {

}


/**
 *   8、never
 */
function fn2(): never{
    throw new Error("报错了");
}


/**
 *  9、对象属性的约定
 */
type Obj = {
    name: string,
    age: number
}
let obj: Obj = {
    name: '张三',
    age: 18
}

type Obj2 = {
    name: string,
    age?: number  // age 表示可有可无的一个类型
}
let obj2:Obj2 = {
    name: '张三',
    age: 20  // 可写可不写，因为类型约束上有问号（?）
}

type Obj3 = {
    name: string,
    [propName: string]: any  // 表示对象中可以有其它的任意属性
}
let obj3:Obj3 = {
    name: '张三',
    age: 15,
    jog: '程序员'
}

/**
 *  10、函数约定
 */
let fun: (a: number, b:number) =>number;
fun = function(a: number, b:number): number {
    return 12
}

/**
 * 11、数组存储
 */
let list1: string[] = []
list1 = ['1', '2']
let list2:(number | string)[]
list2 = [1, 2, 3, 4, '44']
let list3:Array<string>
list3 = ['1', '2', '3']


/**
 * 12、元组 固定长度的数组
 */
type Arr1 = [string, string]
let arr1:Arr1 = ['', '']

/**
 * 13、枚举  enum
 */

enum Gender {
    Male,
    Female
}
type Person = {
    name: string,
    age: number,
    sex: Gender
}
let person:Person = {
    name: '张三',
    age: 19,
    sex: Gender.Female
}


/**
 *  14、泛型 - 指的是不确定的数据类型，用泛型声明一个变量的意思
 */
function fn1<T>(a: T): T {
    return a;
}
fn1<string>('xuxiao')
