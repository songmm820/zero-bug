/**
 * Views：插件列表 - 插件 item - 版本标签
 * @author songmm
 */

function PluginVersionTag(props: { version: string }) {
  const { version } = props

  return (
    <div className="cursor-pointer flex items-center gap-[2px] bg-gray-100 pl-[4px] pr-[4px] pt-[2px] pb-[2px] rounded-[12px]">
      <span className="text-[#999] text-[10px]">v</span>
      <span className="text-[#999] text-[10px]">{version}</span>
    </div>
  )
}

export default PluginVersionTag
