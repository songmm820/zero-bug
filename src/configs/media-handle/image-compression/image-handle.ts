/**
 * 插件：图片压缩 - 处理函数
 * @author songmm
 */

import { CompressionQualityType, CompressionTargetExtType, CompressResultType, CompressionExtMap } from '@/types/plugin/media-handle/image-compression.type'
import { CreateID } from '@/utils/common-util.ts'
/**
 *
 * @param image 压缩的图片
 * @param quality 压缩倍率 压缩率：0.1 ~ 1
 * @param targetExt 压缩目标文件格式
 * @param minSizeThreshold 最小压缩阈值
 * @returns Promise<File> 压缩后的图片
 */
export async function compressImage(image: File, quality: CompressionQualityType, targetExt: CompressionTargetExtType, minSizeThreshold: number): Promise<CompressResultType> {
  // 如果图片尺寸小于指定阈值，直接返回（明确返回带可选字段的对象）
  if (image.size < minSizeThreshold * 1024 ** 2) {
    return {
      source: image,
      isCompressed: false
    }
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = function (event: ProgressEvent<FileReader>) {
      const img = new Image()
      img.onload = function () {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {
          reject(new Error('无法获取 Canvas 上下文'))
          return
        }

        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0, img.width, img.height)

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('图片压缩失败'))
              return
            }
            // 获取新的文件名字后缀
            const ext = CompressionExtMap[targetExt]
            const newFileName = `${CreateID()}_compression_by_${quality}.${ext}`
            const compressedFile = new File([blob], newFileName, {
              type: targetExt,
              lastModified: Date.now()
            })

            // 压缩成功，返回数据
            resolve({
              source: image,
              compressed: compressedFile,
              isCompressed: true
            })
          },
          targetExt,
          quality
        )
      }

      img.src = event.target?.result as string
    }

    reader.onerror = (error) => {
      reject(new Error(`文件读取失败: ${error.target?.error?.message || '未知错误'}`))
    }

    reader.readAsDataURL(image)
  })
}
