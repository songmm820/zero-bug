/**
 * 插件：图片压缩
 * @author songmm
 */

import { memo } from 'react'
import { PluginStatus } from '@/configs/base.ts'
import ImageCompressionUsePlugin from '@/views/plugins/media-handle/image-compression/ImageCompressionUsePlugin.tsx'

import { compressImage } from '@/configs/media-handle/image-compression/image-handle'
import { CompressionQualityType, CompressionTargetExtType, CompressResultType, ImageCompressionPluginClass } from '@/types/plugin/media-handle/image-compression.type'

const MemoizedPluginComponent = memo(ImageCompressionUsePlugin)

/**  =================== 插件实现 ====================  */

/**
 * 插件插件配置
 */
export const DEFAULT_COMPRESSION_VALUE = {
  /**
   * 目标文件格式
   */
  targetExt: 'image/jpeg' as CompressionTargetExtType,
  /**
   * 最小阈值 1MB
   */
  minSizeThreshold: 1,
  /**
   * 压缩倍率
   */
  quality: 0.3 as CompressionQualityType
}

/**
 * Class：图片压缩插件
 */
export class ImageCompression implements ImageCompressionPluginClass {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly icon: string,
    public readonly version: string,
    public readonly quality: CompressionQualityType = DEFAULT_COMPRESSION_VALUE.quality,
    public readonly targetExt: CompressionTargetExtType = DEFAULT_COMPRESSION_VALUE.targetExt,
    public readonly minSizeThreshold: number = DEFAULT_COMPRESSION_VALUE.minSizeThreshold
  ) {}

  /**
   * 插件状态（默然正常）
   */
  public readonly status: PluginStatus = 'NORMAL'

  /**
   * 压缩图片的实现函数
   * @return Promise<File> 压缩后的图片
   * @param image 待压缩的图片
   * @param quality 压缩倍率
   * @param targetExt 压缩目标图片的格式
   * @param minSizeThreshold 最小压缩阈值 小于该阈值则不进行压缩
   */
  async compress(
    image: File,
    quality: CompressionQualityType = this.quality,
    targetExt: CompressionTargetExtType = this.targetExt,
    minSizeThreshold: number = this.minSizeThreshold
  ): Promise<CompressResultType> {
    return await compressImage(image, quality, targetExt, minSizeThreshold)
  }

  /**
   * 插件渲染函数
   */
  readonly render = () => {
    return <MemoizedPluginComponent plugin={this} />
  }
}

/**  =================== 插件初始化实例 ====================  */

/**
 * 使用工厂模式创建实例
 * 实例化图片压缩插件
 * 默认：压缩倍率：0.5 最小压缩阈值：1M
 */
export function createImageCompression(): ImageCompression {
  return new ImageCompression('PLUGIN_001', '图片压缩', '快速压缩图片体积', 'compression', '1.0.0', 0.5, 'image/jpeg', 1)
}

export const ImageCompressionInstance = createImageCompression()
