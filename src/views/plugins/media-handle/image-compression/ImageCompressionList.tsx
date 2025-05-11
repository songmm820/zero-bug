/**
 * 插件使用页面：图片压缩插件 - 图片压缩列表
 * @author songmm
 */
import { AnimatePresence, motion } from 'motion/react'
import IconPark from '@/components/IconPark/IconPark.tsx'
import { GetCompressRatio, GetFilePreviewSrc, GetReadableFileSize, ToPercentage } from '@/utils/file-util.ts'
import { CompressResultWithId } from './ImageCompressionUsePlugin.tsx'

type ICompressionListProps = {
  list: CompressResultWithId[]
  onDownload: (item: CompressResultWithId) => void
  onDelete: (item: CompressResultWithId) => void
}

function ImageCompressionList(props: ICompressionListProps) {
  const { list, onDownload, onDelete } = props

  // 下载按钮
  const DownloadButton = ({ item }: { item: CompressResultWithId }) => {
    return (
      <div className="flex items-center text-[12px]" onClick={() => onDownload(item)}>
        <IconPark icon="to-bottom" color="var(--color-primary)" size={14} />
        <span className="text-primary">下载</span>
      </div>
    )
  }

  // 删除按钮
  const DeleteButton = ({ item }: { item: CompressResultWithId }) => {
    return (
      <div className="flex items-center text-[12px]" onClick={() => onDelete(item)}>
        <IconPark icon="delete" color="var(--color-danger)" size={12} />
        <span className="text-danger">删除</span>
      </div>
    )
  }

  // 压缩结果 - item
  const CompressionItem = ({ item }: { item: CompressResultWithId }) => {
    return (
      <div className="cursor-pointer w-full bg-gray-100 p-[8px] rounded-[4px] flex items-center justify-between flex-wrap">
        {/* 左侧压缩信息 */}
        <div className="flex items-center">
          <div className="mr-[12px]">
            <img className="w-[42px] h-[42px] rounded-[4px]" src={GetFilePreviewSrc(item.compressed || item.source)} alt="" />
          </div>
          <div className="text-[14px] flex flex-col justify-center">
            <div className="text-13px">{item.compressed?.name || item.source.name}</div>
            <div className="flex items-center text-[12px] text-gray-500 flex-wrap">
              <span>原始大小：</span>
              <span>{GetReadableFileSize(item.source.size)}</span>
              {item.isCompressed && item.compressed && (
                <>
                  <div className="ml-[12px] mr-[12px]">
                    <IconPark icon="arrow-right" size={13} />
                  </div>
                  <div>
                    <span>压缩后：</span>
                    <span>{GetReadableFileSize(item.compressed?.size)}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* 右侧压缩操作 */}
        <div className="flex items-center gap-[24px] mr-[24px]">
          {/* 压缩比例 */}
          {item.isCompressed && item.compressed && (
            <div className="flex items-center gap-[8px] text-[11px]">
              {/* 体积变小 */}
              <div className="flex items-center">
                <IconPark
                  icon={GetCompressRatio(item.source, item.compressed) < 1 ? 'corner-right-down' : 'corner-right-up'}
                  color={GetCompressRatio(item.source, item.compressed) < 1 ? 'var(--color-success)' : 'var(--color-danger)'}
                  size={13}
                />
                <span className={GetCompressRatio(item.source, item.compressed) < 1 ? 'text-success' : 'text-danger'}>
                  {ToPercentage(GetCompressRatio(item.source, item.compressed))}
                </span>
              </div>
            </div>
          )}
          {/* 下载 */}
          {item.isCompressed && item.compressed && <DownloadButton item={item} />}
          {/* 删除 */}
          <DeleteButton item={item} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-[12px] overflow-hidden">
      <AnimatePresence mode="popLayout">
        {list.map((image) => (
          <motion.div
            key={image.id}
            layout
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring' }}
          >
            <CompressionItem item={image} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default ImageCompressionList
