/**
 * 插件使用页面：屏幕录制插件
 * @author songmm
 */
import { motion } from 'motion/react'
import { ScreenRecorderClass } from '@/configs/media-handle/screen-recorder/screen-recorder.tsx'
import useTimer from '@/hooks/use-timer.ts'
import { useEffect, useState } from 'react'
import { Button } from '@arco-design/web-react'
import { DownloadFileUrl } from '@/utils/file-util.ts'
import { ScreenRecorderVideoMap } from '@/types/plugin/media-handle/screen-recorder.type.ts'
import { trackEvent } from '@/utils/tracking.ts'

export type IImageCompressionPluginProps = {
  /* 插件信息 */
  plugin: ScreenRecorderClass
}

function ScreenRecorderUsePlugin(props: IImageCompressionPluginProps) {
  const { plugin } = props

  // 定时器hook
  const { time, start, isCounting } = useTimer(3)
  // 视频播预览地址
  const [previewUrl, setPreviewUrl] = useState<string>()

  // 点击开始录制按钮
  const handleClickStartBtn = () => {
    // 事件埋点
    trackEvent('CLICK', '使用屏幕录制插件')
    start()
  }

  // 用户停止共享停止录制
  const handleClickStopBtn = async (file: Blob) => {
    // 将视频流给播放器播放
    setPreviewUrl(URL.createObjectURL(file))
  }

  // 点击下载视频
  const handleClickDownloadBtn = () => {
    // 录制文件格式
    const ext = ScreenRecorderVideoMap[plugin.videoType]
    // 生成录制视频文件名
    const fileName = `录制视频_${new Date().getTime()}.${ext}`
    DownloadFileUrl(previewUrl!, fileName)
  }

  useEffect(() => {
    // 当倒计时结束，开始启动屏幕录制
    if (time === 0) {
      plugin.startScreenRecord(handleClickStopBtn).then()
    }
  }, [time])

  // 开始录制按钮
  const StartRecording = () => {
    return (
      <motion.div
        whileTap={{ scale: 0.9 }}
        className="cursor-pointer common-shadow-2 bg-gray-50 flex items-center justify-center w-[150px] h-[150px] rounded-[50%] "
        onClick={handleClickStartBtn}
      >
        {isCounting ? (
          <motion.div
            key={time}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.5 }}
            className="text-[32px] font-bold text-gray-500"
          >
            {time === 0 ? ' 录制中' : time}
          </motion.div>
        ) : (
          <div>点击开始录制</div>
        )}
      </motion.div>
    )
  }

  return (
    <div className="h-full flex items-center justify-center border-[1px] border-dashed border-gray-400 hover:border-primary pl-[24px] pr-[24px] pt-[48px] pb-[48px] rounded-[6px]">
      {/* 视频预览 */}
      {previewUrl ? (
        <div className="w-full h-full flex flex-col">
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <video className="w-full h-full max-h-full rounded-[12px]" src={previewUrl} autoPlay muted controls />
          </div>
          <div className="mt-[35px] flex w-full justify-end">
            <Button type="primary" onClick={() => handleClickDownloadBtn()}>
              点击下载
            </Button>
          </div>
        </div>
      ) : (
        <StartRecording />
      )}
    </div>
  )
}

export default ScreenRecorderUsePlugin
