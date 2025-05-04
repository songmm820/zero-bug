/**
 * Views：插件列表
 * @author songmm
 */
import PluginUsedDrawer from '@/views/plugins/layout/PluginUsedDrawer.tsx'
import { useState } from 'react'
import { BasePlugin, PluginGroup, PluginStatusMap } from '@/configs/base.ts'
import { LayoutConfigMap, LayoutType } from '@/views/plugins/layout/ChangeLayoutRadio.tsx'
import PluginGridLayout from '@/views/plugins/layout/PluginGridLayout.tsx'
import toast from 'react-hot-toast'

type IPluginsProps = {
  /* 选中的分组 */
  group: PluginGroup
  /* 布局方式 */
  layout: LayoutType
}

/**
 * 插件布局方式
 * 1. 网格布局
 * 2. 列表布局
 * 3. 蜂窝布局
 */
function Plugins(props: IPluginsProps) {
  const { layout, group } = props

  // 当前选中插件
  const [currentPlugin, setCurrentPlugin] = useState<BasePlugin>()

  // 插件使用抽屉开关
  const [pluginUsedDrawerVisible, setPluginUsedDrawerVisible] = useState<boolean>(false)

  // 关闭插件使用抽屉
  const handleClosePluginUsedDrawer = () => {
    setPluginUsedDrawerVisible(false)
  }

  // 插件选中事件
  const handlePluginSelect = (plugin: BasePlugin) => {
    if (plugin.status !== 'NORMAL') {
      toast.error(PluginStatusMap[plugin.status].errorMsg)
      return
    }
    setCurrentPlugin(plugin)
    setPluginUsedDrawerVisible(true)
  }

  // 插件的布局方式
  const PluginLayout = () => {
    return (
      <>
        {/* 网格布局 */}
        {LayoutConfigMap.GRID.value === layout && <PluginGridLayout plugins={group?.plugins} onSelect={handlePluginSelect} />}
      </>
    )
  }

  return (
    <>
      <div className="w-full">
        <PluginLayout />
      </div>
      {currentPlugin && <PluginUsedDrawer visible={pluginUsedDrawerVisible} plugin={currentPlugin} onCancel={handleClosePluginUsedDrawer} />}
    </>
  )
}

export default Plugins
