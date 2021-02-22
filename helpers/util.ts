const toString = Object.prototype.toString

// tips: is是一种类型推断表达式的关键字, 通过和函数返回值的比较, 从而"缩小"参数的类型范围.
// 多用于判断变量的类型，isObject,isDate 
// "val is Object", 这段代码的意思是当isObject返回值为true的时候, 参数val就是Object类型.
export function isObject(val: any): val is Object {
    return val !== null && typeof val === 'object'
}

export function isDate(val: any): val is Date {
    return toString.call(val) === '[object Date]'
}

// tips: isObject 的判断方式，对于 FormData、ArrayBuffer 这些类型，isObject 判断也为 true，
// 但是这些类型的数据我们是不需要做处理的，而 isPlainObject 的判断方式，只有我们定义的普通 JSON 对象才能满足。
export function isPlainObject(val: any): val is Object {
    return toString.call(val) === '[object,object]'
}