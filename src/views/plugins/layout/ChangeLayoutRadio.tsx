/**
 * Views：插件列表 - 布局切换 Radio
 * @author songmm
 */

import { Radio } from '@arco-design/web-react'

const RadioGroup = Radio.Group

/**
 * Map：布局类型
 */
export const LayoutConfigMap = {
  GRID: {
    name: '网格布局',
    value: 'GRID',
    icon: 'grid-icon'
  },
  LIST: {
    name: '列表布局',
    value: 'LIST',
    icon: 'list-icon'
  },
  WAVE: {
    name: '蜂窝布局',
    value: 'WAVE',
    icon: 'wave-icon'
  }
} as const

/**
 * List：布局类型
 */
export const LayoutList = Object.keys(LayoutConfigMap) as LayoutType[]

/**
 * TS类型: 布局类型
 */
export type LayoutType = keyof typeof LayoutConfigMap

type IChangeLayoutRadioProps = {
  /* 切换布局事件 */
  onChange: (value: LayoutType) => void
  /* 当前布局 */
  layout: LayoutType
}

function ChangeLayoutRadio(props: IChangeLayoutRadioProps) {
  const { layout, onChange } = props

  // 点击单选框
  const handleChangeLayout = (value: LayoutType) => {
    onChange(value)
  }

  return (
    <RadioGroup type="button" value={layout} onChange={handleChangeLayout}>
      {LayoutList.map((layout, index) => (
        <Radio key={index} value={LayoutConfigMap[layout].value}>
          {LayoutConfigMap[layout].name}
        </Radio>
      ))}
    </RadioGroup>
  )
}

export default ChangeLayoutRadio
