/**
 * 插件：屏幕录制 - 处理函数
 * @author songmm
 */

import RecordRTC from 'recordrtc'
import { RecordingOptions } from '@/types/plugin/media-handle/screen-recorder.type'

/**
 * 开始屏幕录制
 * @param options 录制配置
 * @return Promise<RecordingResult>
 */
export async function startScreenRecord(options: RecordingOptions): Promise<void> {
  const { audio, displaySurface = 'monitor', frameRate, afterShare } = options

  // 1. 获取屏幕流
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: {
      displaySurface: displaySurface,
      frameRate: frameRate
    },
    audio: audio ? { echoCancellation: true } : false
  })

  // 2. 初始化录制器
  const recorder = new RecordRTC(stream, {
    type: 'video',
    recorderType: RecordRTC.MediaStreamRecorder
  })

  // 3. 开始录制
  recorder.startRecording()

  // 3. 停止录制
  const stopScreenRecord = (): Promise<Blob> => {
    return new Promise((resolve) => {
      recorder.stopRecording(() => {
        const video = recorder.getBlob()
        stream.getTracks().forEach((track) => track.stop()) // 停止所有流的轨道
        resolve(video)
      })
    })
  }

  // 4. 用户手动点击停止分享
  stream.getVideoTracks()[0].onended = async () => {
    const file = await stopScreenRecord()
    afterShare(file)
  }
}
