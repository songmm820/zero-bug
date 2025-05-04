/**
 * 类型定义：屏幕录制
 * @author songmm
 */

import { BasePlugin } from '@/configs/base'

/**
 * TS类型：屏幕录制配置
 */
export type RecordingOptions = {
  /**
   * 是否录制音频
   */
  audio: boolean
  /**
   * 视频比特率
   */
  bitsPerSecond?: number
  /**
   * 是否捕获鼠标光标
   */
  cursor: ScreenRecorderCursorType
  /**
   * 提示优先选择整个屏幕（但最终仍由用户选择） 'monitor' | 'window' | 'tab'
   */
  displaySurface?: 'monitor' | 'window' | 'tab'
  /**
   * 视频帧率
   */
  frameRate: number
  /**
   * 系统停止共享
   */
  afterShare: (file: Blob) => void
}

/**
 * Map：鼠标光标捕获模式
 */
export const ScreenRecorderCursorMap = {
  never: '从不',
  always: '总是',
  motion: '运动'
}

/**
 * TS类型：鼠标光标捕获模式
 */
export type ScreenRecorderCursorType = keyof typeof ScreenRecorderCursorMap

/**
 * List：鼠标光标捕获模式
 */
export const ScreenRecorderCursorList: ScreenRecorderCursorType[] = Object.keys(ScreenRecorderCursorMap) as ScreenRecorderCursorType[]

/**
 * Map：录制文件格式
 */
export const ScreenRecorderVideoMap = {
  'video/webm': 'webm',
  'video/mp4': 'mp4'
} as const

/**
 * TS类型：录制文件格式
 */
export type ScreenRecorderVideoType = keyof typeof ScreenRecorderVideoMap

/**
 * List：录制文件格式
 */
export const ScreenRecorderVideoList = Object.keys(ScreenRecorderVideoMap) as ScreenRecorderVideoType[]

/**
 * TS类型：屏幕录制插件
 */
export interface ScreenRecorderPlugin extends BasePlugin {
  /**
   * 录制文件格式
   */
  readonly videoType: ScreenRecorderVideoType
  /**
   * 是否录制音频
   */
  readonly audio: boolean
  /**
   * 视频帧率
   */
  readonly frameRate: number
  /**
   * 启动屏幕录制函数
   */
  startScreenRecord: (handleClickStopBtn: (file: Blob) => Promise<void>) => Promise<void>
}
