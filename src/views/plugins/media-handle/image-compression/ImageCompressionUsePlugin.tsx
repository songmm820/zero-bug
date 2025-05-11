/**
 * 插件使用页面：图片压缩插件
 * @author songmm
 */

import { useRef, useState } from 'react'
import IconPark from '@/components/IconPark/IconPark.tsx'
import { Button, Select, Tooltip } from '@arco-design/web-react'
import { DownloadFile, SelectFile } from '@/utils/file-util.ts'
import {
  CompressionExtList,
  CompressionExtMap,
  CompressionQualityList,
  CompressionQualityType,
  CompressionTargetExtType,
  CompressResultType,
  ImageCompressionPluginClass
} from '@/types/plugin/media-handle/image-compression.type.ts'
import toast from 'react-hot-toast'
import ImageCompressionList from './ImageCompressionList.tsx'
import { trackEvent } from '@/utils/tracking.ts'

export type CompressResultWithId = CompressResultType & { id: number }

const Option = Select.Option

export type IImageCompressionPluginProps = {
  /* 插件信息 */
  plugin: ImageCompressionPluginClass
}

function ImageCompressionUsePlugin(props: IImageCompressionPluginProps) {
  const { plugin } = props

  // 压缩倍率
  const [quality, setQuality] = useState<CompressionQualityType>(plugin.quality)
  // 压缩文件id
  const count = useRef<number>(0)
  // 压缩目标格式
  const [targetExt, setTargetExt] = useState<CompressionTargetExtType>(plugin.targetExt)
  // 压缩图片列表
  const [imageList, setImageList] = useState<CompressResultWithId[]>([])

  // 压缩图片
  const handleCompressImage = async (files: File[]) => {
    // 延迟0.1s TODO : 模拟网络请求
    await new Promise((resolve) => setTimeout(resolve, 100))
    const compressionImage = await plugin.compress(files[0], quality, targetExt)
    // 生成一个随机 ID
    const id = count.current++
    setImageList([...imageList, { ...compressionImage, id }])
    if (!compressionImage.isCompressed) {
      throw new Error(`低于 ${plugin.minSizeThreshold}M 的图片不会进行压缩`)
    }
  }

  // 点击切换压缩倍率
  const handleChangeQuality = (value: CompressionQualityType) => {
    setQuality(value)
  }

  // 点击切换压缩目标格式
  const handleChangeTargetExt = (value: CompressionTargetExtType) => {
    setTargetExt(value)
  }

  // 点击上传图片事件
  const handleCheckImage = async () => {
    const files = await SelectFile('image/*')
    if (!files.length) {
      return
    }
    // 土司提示
    await toast.promise(
      async () => {
        // 事件埋点
        trackEvent('CLICK', '使用图片压缩插件')
        // 压缩图片
        await handleCompressImage(files)
      },
      {
        loading: '图片压缩中...',
        success: '图片压缩成功',
        error: (err) => err.message
      }
    )
  }

  // 点击下载图片
  const handleDownloadImage = (item: CompressResultWithId) => {
    if (item.isCompressed && item.compressed) {
      DownloadFile(item.compressed)
    }
  }

  // 点击删除图片
  const handleDeleteImage = (item: CompressResultWithId) => {
    setImageList((prevList) => prevList.filter((image) => image.id !== item.id))
    toast.success('删除成功')
  }

  // 压缩倍率提示
  const QualityTips = () => {
    return (
      <Tooltip position="bottom" content="压缩率越小，压缩比例越高。反之，压缩率越大，对图片的副作用越小。详细大小，请以实际效果为准。">
        <span className="cursor-pointer">压缩率</span>
      </Tooltip>
    )
  }

  // 压缩节点参数配置
  const CompressionConfigNode = () => {
    return (
      <>
        <div className="flex items-center justify-between flex-wrap">
          {/* 左侧 */}
          <div className="flex items-center">
            <IconPark icon={plugin.icon} color="var(--color-primary)" size={24} />
            <div className="flex flex-col ml-[6px]">
              <div className="text-[12px]">支持JPG、PNG、WebP等格式</div>
            </div>
          </div>
          {/* 右侧节点配置 */}
          <div className="ml-[12px] flex gap-[18px] flex-wrap">
            {/* 压缩率 */}
            <QualityNode />
            {/* 目标文件格式 */}
            <TargetExtNode />
          </div>
        </div>
      </>
    )
  }

  // 压缩倍率配置
  const QualityNode = () => {
    return (
      <Select addBefore={<QualityTips />} value={quality} style={{ width: 200 }} onChange={handleChangeQuality}>
        {CompressionQualityList.map((option, index) => (
          <Option key={index} value={option}>
            {option * 100}%
          </Option>
        ))}
      </Select>
    )
  }

  // 压缩目标文件格式配置
  const TargetExtNode = () => {
    return (
      <Select addBefore="目标格式" value={targetExt} style={{ width: 200 }} onChange={handleChangeTargetExt}>
        {CompressionExtList.map((option, index) => (
          <Option key={index} value={option}>
            {CompressionExtMap[option]}
          </Option>
        ))}
      </Select>
    )
  }

  // 上传触发节点
  const TriggerNode = () => {
    return (
      <div className="w-full flex flex-col items-center justify-center border-[1px] border-dashed border-gray-400 hover:border-primary pl-[24px] pr-[24px] pt-[48px] pb-[48px] rounded-[6px]">
        <IconPark icon="upload-three" size={52} color="var(--color-primary)" />
        <div className="mt-[8px] text-[14px]">拖拽文件到这里或者点击上传</div>
        <div className="mt-[12px]">
          <Button type="primary" onClick={handleCheckImage}>
            选择图片
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="h-full p-[16px] flex flex-col overflow-hidden">
        {/* 压缩节点配置 */}
        <div className="mb-[12px]">
          <CompressionConfigNode />
        </div>
        {/* 上传触发节点 */}
        <TriggerNode />
        <div className="mt-[12px] flex-1 overflow-y-auto">
          {/* 压缩结果 */}
          <ImageCompressionList list={imageList} onDownload={handleDownloadImage} onDelete={handleDeleteImage} />
        </div>
      </div>
    </>
  )
}

export default ImageCompressionUsePlugin
