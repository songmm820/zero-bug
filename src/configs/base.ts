// 类型：插件分组
import { ImageCompressionInstance } from '@/configs/media-handle/image-compression/image-compression'
import { ReactNode } from 'react'
import { TextTranslationInstance } from '@/configs/text-handle/text-translation.tsx'
import { ScreenRecorderInstance } from './media-handle/screen-recorder/screen-recorder'

type PluginStatusItem = {
  label: string
  errorMsg?: string
}

/**
 * Map：插件状态
 */
export const PluginStatusMap = {
  NORMAL: {
    label: '正常'
  },
  DISABLED: {
    label: '禁用',
    errorMsg: '该插件已被禁用，请联系管理员'
  },
  DEVING: {
    label: '开发中',
    errorMsg: '该插件正在开发中，敬请期待...'
  }
} as const satisfies Record<string, PluginStatusItem>

/**
 * List：插件状态
 */
export const PluginStatusList: PluginStatus[] = Object.keys(PluginStatusMap) as PluginStatus[]

/**
 * TS类型：插件状态
 */
export type PluginStatus = keyof typeof PluginStatusMap

export type PluginGroup = {
  /**
   * ID
   */
  id: string
  /**
   * 插件分组名称
   */
  name: string
  /**
   * 插件分组图标
   */
  icon: string
  /**
   * 插件列表
   */
  plugins: BasePlugin[]
  /**
   * 插件分组描述信息
   */
  description?: string
}

// 类型：插件基础信息
export interface BasePlugin {
  /**
   * ID
   */
  id: string
  /**
   * 插件名称
   */
  name: string
  /**
   * 插件版本
   */
  version: string
  /**
   * 插件图标
   */
  icon: string
  /**
   * 插件状态
   */
  status: PluginStatus
  /**
   * 插件描述信息
   */
  description: string
  /**
   * 插件渲染组件
   */
  render: () => ReactNode
}

// 插件分组列表
export const pluginGroups: PluginGroup[] = [
  {
    id: 'PG_001',
    name: '媒体处理',
    icon: 'movie',
    description: '包含多个常用的媒体处理插件...',
    plugins: [ImageCompressionInstance, ScreenRecorderInstance]
  },
  {
    id: 'PG_002',
    name: '文本处理',
    icon: 'text',
    plugins: [TextTranslationInstance]
  },
  {
    id: 'PG_003',
    name: '便民查询',
    icon: 'toolkit',
    plugins: []
  },
  {
    id: 'PG_004',
    name: '安全工具',
    icon: 'protect-gkli02ig',
    plugins: []
  }
]
