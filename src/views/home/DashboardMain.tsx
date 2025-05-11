/**
 * Views：home Main
 * @author songmm
 */

import { useState } from 'react'
import Groups from '@/views/plugin-groups/Groups.tsx'
import { PluginGroup, pluginGroups } from '@/configs/base.ts'
import Plugins from '@/views/plugins/layout/Plugins.tsx'
import ChangeLayoutRadio, { LayoutConfigMap, LayoutType } from '@/views/plugins/layout/ChangeLayoutRadio.tsx'
import toast from 'react-hot-toast'
import BannerImage from './BannerImage'
import img_1 from '@/assets/3d/safe.png'

function DashboardMain() {
  // 当前选择的分组
  const [currentGroup, setCurrentGroup] = useState<PluginGroup>(pluginGroups[0])
  // 当前插件布局
  const [layout /*setLayout*/] = useState<LayoutType>(LayoutConfigMap.GRID.value)

  // 背景图区域
  const Banner = () => {
    return (
      <div className="relative h-[320px]" style={{ backgroundImage: 'linear-gradient(0deg, #d5eaff, #fff)' }}>
        <div className="absolute top-[30%] left-[16rem] "></div>
        <div className="absolute top-[1rem] right-[16rem] ">
          <BannerImage url={img_1} width={275} rotate={20} />
        </div>
      </div>
    )
  }

  // 选中分组
  const handleSelectGroup = (group: PluginGroup) => {
    setCurrentGroup(group)
  }

  // 切换布局时
  const handleChangeLayout = (/*value: LayoutType*/) => {
    // setLayout(value)
    toast.success('敬请期待！')
    return
  }

  return (
    <>
      <div className="relative">
        <Banner />
        <div className="pl-[32px] pr-[32px]  w-full flex flex-col items-center justify-center " style={{ transform: 'translateY(-50px)' }}>
          <Groups onSelectGroup={handleSelectGroup} />

          {/* 切换布局 单选框*/}
          <div className="w-full mt-[24px]">
            <ChangeLayoutRadio layout={layout} onChange={handleChangeLayout} />
          </div>

          {/* 插件列表 */}
          <div className="mt-[24px] w-full pb-[48px]">
            <Plugins group={currentGroup} layout={layout} />
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardMain
