/**
 * File 文件工具
 * @author songmm
 */

import { GetOS } from '@/utils/system-util.ts'

/**
 * 打开文件选择对话框（纯 Web 环境）
 * @param accept 文件类型限制（如 'image/*,.pdf'）
 * @param multiple 是否允许多选
 * @returns Promise<File[]> 始终返回文件数组（空数组表示取消或未选择）
 */
export function SelectFile(accept: string = '*', multiple: boolean = false): Promise<File[]> {
  const os = GetOS()
  if (os === 'web') {
    return new Promise<File[]>((resolve) => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = accept
      input.multiple = multiple

      // 处理文件选择
      input.onchange = () => {
        resolve(Array.from(input.files ?? []))
      }

      // 处理取消操作
      input.oncancel = () => {
        resolve([])
      }

      // 触发文件选择对话框
      input.click()
    })
  } else {
    return Promise.resolve([])
  }
}

/**
 * 接受一个 File 对象，返回一个可预览的 src url
 * @param file 文件对象
 */
export function GetFilePreviewSrc(file: File): string {
  return URL.createObjectURL(file)
}

/**
 * 将字节大小转换为可读的文件大小字符串
 * @param size 文件大小（单位：字节）
 * @param decimals 保留的小数位数（默认2位）
 * @returns 格式化后的字符串（如 "1.23 MB"）
 */
export function GetReadableFileSize(size: number, decimals: number = 2): string {
  if (size <= 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(size) / Math.log(k))
  // 处理过大的单位索引（理论上不会发生，防御性编程）
  const unit = sizes[Math.min(i, sizes.length - 1)]
  // 避免 toFixed 的四舍五入问题（如 1023.999...）
  const formattedSize = parseFloat((size / Math.pow(k, i)).toFixed(decimals))
  return `${formattedSize} ${unit}`
}

/**
 * 下载文件
 * @param File 文件对象
 * @param fileName 文件名
 */
export function DownloadFile(File: File, fileName?: string): void {
  const os = GetOS()
  if (os === 'web') {
    const a = document.createElement('a')
    a.href = GetFilePreviewSrc(File)
    a.download = fileName || File.name
    a.click()
  }
}

/**
 * 下载文件Url
 */
export function DownloadFileUrl(url: string, fileName: string): void {
  const os = GetOS()
  if (os === 'web') {
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.click()
  }
}

/**
 * 接受两个 File 文件，第一个为 压缩前的 File , 第二个为压缩后的 File , 返回压缩体积减少比例
 * @param source 压缩前的 File
 * @param target 压缩后的 File
 * @return 压缩体积减少比例
 */
export function GetCompressRatio(source: File, target: File): number {
  // 1. 压缩后体积变小
  if (target.size < source.size) {
    return (source.size - target.size) / source.size
  } else {
    // 2. 压缩后体积变大
    return (target.size - source.size) / source.size
  }
}

/**
 * 小数转换成百分比
 */
export function ToPercentage(num: number): string {
  return `${(num * 100).toFixed(2)}%`
}
