/**
 *   sort 默认是按照编码排序的
 *     要是想按照字典排序的话  list.sort((a, b) => a.localeCompare(b))
 *
 * @type {string[]}
 */

const list = ['北京', "上海", "天津", "济南", "青岛", "山东", "重庆", "菏泽", "单县"]

const arr = list.sort((a, b) => a.localeCompare(b))

console.log(arr, list)
