/**
 * 插件：文本翻译
 * @author songmm
 */

/** ==================== 类型定义 ==================== */

import { PluginStatus } from '@/configs/base.ts'
import { translate } from './text-translation-handle'
import { FanYiLangType, FanYiServiceType, TextTranslationPlugin } from '@/types/plugin/text-handle/text-translation.type.ts'

/**  =================== 插件实现 ====================  */

/**
 * 插件插件配置
 */
export const DEFAULT_TRANSLATION_VALUE = {
  /**
   * 默认服务商
   */
  apiVendor: 'BAIDU' as FanYiServiceType,
  /**
   * 原语言 zh
   */
  sourceLang: 'zh' as FanYiLangType,
  /**
   * 目标语言 en
   */
  targetLang: 'en' as FanYiLangType
}

/**
 * Class: 文本翻译插件
 */
export class TextTranslationClass implements TextTranslationPlugin {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly icon: string,
    public readonly version: string,
    public readonly sourceLang: FanYiLangType = DEFAULT_TRANSLATION_VALUE.sourceLang,
    public readonly targetLang: FanYiLangType = DEFAULT_TRANSLATION_VALUE.targetLang,
    public readonly apiVendor: FanYiServiceType = DEFAULT_TRANSLATION_VALUE.apiVendor
  ) {}

  /**
   * 插件状态（默然正常）
   */
  public readonly status: PluginStatus = 'DEVING'

  /**
   * 翻译文本的实现
   * @param apiVendor 服务厂商
   * @param sourceText 待翻译文本
   * @param sourceLang 原语言
   * @param targetLang 目标语言
   */
  async translate(
    sourceText: string[],
    sourceLang: FanYiLangType = this.sourceLang,
    targetLang: FanYiLangType = this.targetLang,
    apiVendor: FanYiServiceType = this.apiVendor
  ): Promise<unknown> {
    return await translate(sourceText, sourceLang, targetLang, apiVendor)
  }

  /**
   * 插件渲染函数
   */
  readonly render = () => {
    return <div>文本翻译</div>
  }
}

/**  =================== 插件初始化实例 ====================  */

/**
 * 使用工厂模式创建实例
 * 实例化文本翻译插件
 */
export function createTextTranslationPlugin(): TextTranslationPlugin {
  return new TextTranslationClass('PLUGIN_002', '文本翻译', '文本翻译插件', 'compression', '1.0.0', 'zh', 'en', 'BAIDU')
}
export const TextTranslationInstance = createTextTranslationPlugin()

// await TextTranslationInstance.translate(['你好', '苹果'], 'zh', 'en')
