/**
 * 插件：翻译插件 - 处理函数
 * @author songmm
 */

import { AxiosClientClass } from '@/axios/request.ts'
import { FanYiLangType, FanYiServiceType } from '@/types/plugin/text-handle/text-translation.type'
import CryptoJS from 'crypto-js'

/**
 * 百度翻译类axios实例
 */
const BaiduFanYiAxiosClient = new AxiosClientClass({
  baseURL: '/baiduFanYiApi',
  timeout: 6000
})

/**
 * 百度文本翻译接口url配置
 */
const baiduFanYiConfig = {
  salt: new Date().getTime(),
  appId: import.meta.env.VITE_BAIDU_FANYI_APP_ID,
  key: import.meta.env.VITE_BAIDU_FANYI_KEY
}

/**
 * 文本翻译处理
 * @param apiVendor 服务厂商
 * @param sourceText 源文本
 * @param sourceLang 源语言
 * @param targetLang 目标语言
 */
export async function translate(sourceText: string[], sourceLang: FanYiLangType, targetLang: FanYiLangType, apiVendor: FanYiServiceType): Promise<unknown> {
  switch (apiVendor) {
    case 'BAIDU':
      return await baiduFanYi(sourceText, sourceLang, targetLang)
  }
}

/**
 * 百度翻译签名
 * @param query 待翻译文本 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
 */
export function baiduSign(query: string): string {
  // 拼接签名字符串
  const strSign = baiduFanYiConfig.appId + query + baiduFanYiConfig.salt + baiduFanYiConfig.key
  // md5加密
  return CryptoJS.MD5(strSign).toString()
}

/**
 * 百度文本翻译请求
 */
export async function baiduFanYi(query: string[], sourceLang: FanYiLangType, targetLang: FanYiLangType) {
  // 百度规定多个单词用 \n 连接
  const queryStr = query.join('\n')

  const params = {
    q: queryStr,
    appid: baiduFanYiConfig.appId,
    salt: baiduFanYiConfig.salt,
    from: sourceLang,
    to: targetLang,
    sign: baiduSign(queryStr)
  }
  return BaiduFanYiAxiosClient.get('/translate', params)
}
