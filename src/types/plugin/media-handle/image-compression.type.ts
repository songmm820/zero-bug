/**
 * 类型定义：图片压缩
 * @author songmm
 */

import { BasePlugin } from '@/configs/base'

/**
 * List: 压缩倍率
 */
export const CompressionQualityList = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9] as const

/**
 * TS类型: 压缩倍率
 */
export type CompressionQualityType = (typeof CompressionQualityList)[number]

/**
 * List：压缩目标文件格式
 */
export const CompressionExtList = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] as const

/**
 * Map：文件格式对应的文件后缀名
 */
export const CompressionExtMap = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif'
}

export type CompressionTargetExtType = (typeof CompressionExtList)[number]

/**
 * TS类型：压缩后返回结果
 */
export type CompressResultType = {
  /* 源文件 */
  source: File
  /* 压缩后的文件 */
  compressed?: File
  /* 是否压缩了 */
  isCompressed: boolean
}

/**
 * TS类型：图片压缩插件
 */
export interface ImageCompressionPluginClass extends BasePlugin {
  /**
   * 压缩倍率
   * 默认：0.5
   */
  readonly quality: CompressionQualityType
  /**
   * 压缩目标图片的格式
   */
  readonly targetExt: CompressionTargetExtType
  /**
   * 最小压缩阈值 小于该阈值则不进行压缩
   */
  readonly minSizeThreshold: number
  /**
   * 压缩图片函数
   */
  compress: (image: File, quality?: CompressionQualityType, targetExt?: CompressionTargetExtType, minSizeThreshold?: number) => Promise<CompressResultType>
}
