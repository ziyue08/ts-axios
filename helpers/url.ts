import { isDate, isObject } from './util'

// @、:、$、,、、[、] 允许出现在URL中，不希望被encode
// 空格 被转换成 +
function encode (val: string):string {
    return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
/**
 * 参数值为数组， /base/get?foo[]=bar&foo[]=baz'
 * 参数值为对象，url 是 /base/get?foo=%7B%22bar%22:%22baz%22%7D，foo 后面拼接的是 {"bar":"baz"} encode 后的结果
 * 参数值为 Date 类型，url 是 /base/get?date=2019-04-01T05:55:39.030Z，date 后面拼接的是 date.toISOString() 的结果
 * 特殊字符支持
 * 空值忽略
 * 丢弃 url 中的哈希标记
 * 保留 url 中已存在的参数
*/ 

export function buildURL (url: string, params?: any) {
    if(!params) return url
    const parts: string[] = []
    Object.keys(params).forEach((key) => {
        let val = params[key]
        // 忽略值为null/undefined的参数
        if(val === null || typeof val ==='undefined') return 
        let values: string[]
        if(Array.isArray(val)) {//  数组转换成 foo[]='0'&foo[]='1'
            values = val
            key += '[]'
        } else {
            values = [val]
        }
        values.forEach((val) => {
            if (isDate(val)) {
                val = val.toISOString()
            } else if (isObject(val)) {
                val = JSON.stringify(val)
            }
            parts.push(`${encode(key)}=${encode(val)}`)
        })
    })

    let serializedParams = parts.join('&')
    if (serializedParams) {
        const markIndex = url.indexOf('#') // 丢弃hash标记
        if (markIndex !== -1) {
            url = url.slice(0, markIndex)
        }

        url += (url.indexOf('?') === -1 ? '?': '&') + serializedParams
    }
    return url
}