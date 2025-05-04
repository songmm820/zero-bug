/**
 * Views：插件布局排列 - 网格布局
 * @author songmm
 */
import { BasePlugin } from '@/configs/base.ts'
import IconPark from '@/components/IconPark/IconPark.tsx'
import PluginVersionTag from '@/views/plugins/layout/PluginVersionTag.tsx'

type IGridLayoutProps = {
  /* 插件列表 */
  plugins: BasePlugin[]
  /* 插件选择 */
  onSelect: (plugin: BasePlugin) => void
}

function PluginGridLayout(props: IGridLayoutProps) {
  const { plugins, onSelect } = props

  // 点击插件
  const handleSelectPlugin = (plugin: BasePlugin) => {
    onSelect(plugin)
  }

  // 网格布局 - item
  const GridItem = (props: { plugin: BasePlugin }) => {
    const { plugin } = props
    return (
      <div
        className="cursor-pointer relative w-[260px] h-[140px] common-shadow common-shadow-2 bg-[rgba(255,255,255,0.5)] backdrop-blur-[10px] rounded-[6px] flex flex-col gap-[6px] items-center justify-center transition hover:scale-[1.05]"
        onClick={() => handleSelectPlugin(plugin)}
      >
        <IconPark icon={plugin.icon} color="var(--color-primary)" size={26} />
        <div className="font-bold text-[14px]">{plugin.name}</div>
        <div className="text-gray-500 text-[12px]">{plugin.description}</div>
        {/* 版本号 */}
        <div className="absolute right-[10px] top-[10px] text-[12px] text-gray-500">
          <PluginVersionTag version={plugin.version} />
        </div>
      </div>
    )
  }

  // 网格布局 - 容器
  const GridLayout = (props: { plugins?: BasePlugin[] }) => {
    const { plugins = [] } = props
    return (
      <>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-[16px] place-items-center">
          {plugins.map((plugin, index) => (
            <GridItem key={index} plugin={plugin} />
          ))}
        </div>
      </>
    )
  }

  return <GridLayout plugins={plugins} />
}

export default PluginGridLayout
