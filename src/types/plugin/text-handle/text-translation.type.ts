/**
 * 类型定义：文本翻译
 * @author songmm
 */

import { BasePlugin } from '@/configs/base'

/**
 * Map：文本翻译厂商
 */
export const FanYiServiceMap = {
  BAIDU: '百度翻译'
} as const

/**
 * List：翻译厂商
 */
export const FanYiServiceList: FanYiServiceType[] = Object.keys(FanYiServiceMap) as FanYiServiceType[]

/**
 * TS类型：文本翻译厂商
 */
export type FanYiServiceType = keyof typeof FanYiServiceMap

/**
 * Map: 翻译语种
 */
export const FanYiLangMap = {
  en: '英语',
  zh: '中文',
  zhTW: '繁体中文',
  auto: '自动检测'
} as const

/**
 * List：翻译语种
 */
export const FanYiLangList: FanYiLangType[] = Object.keys(FanYiLangMap) as FanYiLangType[]

/**
 * Ts类型：翻译语种
 */
export type FanYiLangType = keyof typeof FanYiLangMap

/**
 * TS类型：文本翻译插件
 */
export interface TextTranslationPlugin extends BasePlugin {
  /**
   * 翻译Api厂商
   */
  readonly apiVendor: FanYiServiceType
  /**
   * 翻译原文本
   */
  readonly sourText?: string
  /**
   * 翻译原语言
   */
  readonly sourceLang: FanYiLangType
  /**
   * 翻译目标语言
   */
  readonly targetLang: FanYiLangType
  /**
   * 文本翻译函数
   */
  translate: (sourText: string[], sourceLang?: FanYiLangType, targetLang?: FanYiLangType, apiVendor?: FanYiServiceType) => Promise<unknown>
}
