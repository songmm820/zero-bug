/**
 * 插件：屏幕录制
 * @author songmm
 */

import { memo } from 'react'
import { PluginStatus } from '@/configs/base'
import { ScreenRecorderVideoType, ScreenRecorderCursorType, ScreenRecorderPlugin } from '@/types/plugin/media-handle/screen-recorder.type'
import ScreenRecorderUsePlugin from '@/views/plugins/media-handle/screen-recorder/ScreenRecorderUsePlugin.tsx'
import { startScreenRecord } from '@/configs/media-handle/screen-recorder/screen-recorder-handle.ts'
const MemoizedPluginComponent = memo(ScreenRecorderUsePlugin)

/**  =================== 插件实现 ====================  */

/**
 * 插件插件配置
 */
export const DEFAULT_TRANSLATION_VALUE = {
  /**
   * 默认录制文件格式
   */
  videoType: 'video/webm' as ScreenRecorderVideoType,
  /**
   * 默认是否录制音频
   */
  audio: false,
  /**
   * 是否捕获鼠标光标
   */
  cursor: 'never' as ScreenRecorderCursorType,
  /**
   * 默认视频帧率
   */
  frameRate: 30
}

/**
 * Class: 屏幕录制插件
 */
export class ScreenRecorderClass implements ScreenRecorderPlugin {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly icon: string,
    public readonly version: string,
    public readonly videoType: ScreenRecorderVideoType = DEFAULT_TRANSLATION_VALUE.videoType,
    public readonly audio: boolean = DEFAULT_TRANSLATION_VALUE.audio,
    public readonly frameRate: number = DEFAULT_TRANSLATION_VALUE.frameRate
  ) {}

  /**
   * 插件状态（默然正常）
   */
  public readonly status: PluginStatus = 'NORMAL'

  /**
   * 开始录制
   */
  async startScreenRecord(handleClickStopBtn: (file: Blob) => Promise<void>): Promise<void> {
    return await startScreenRecord({
      audio: this.audio,
      frameRate: this.frameRate,
      cursor: 'never',
      afterShare: handleClickStopBtn
    })
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
 * 实例化屏幕录制插件
 */
export function createScreenRecorderPlugin(): ScreenRecorderPlugin {
  return new ScreenRecorderClass('PLUGIN_003', '屏幕录制', '屏幕录制插件', 'compression', '1.0.0')
}

export const ScreenRecorderInstance = createScreenRecorderPlugin()
