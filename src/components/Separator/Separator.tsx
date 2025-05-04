/**
 * 组件: 分割线
 * @author songmm
 */
import { CSSProperties } from 'react'

type ISeparatorProps = {
  color?: string
  height?: string
  width?: string
  horizontal?: boolean
  left?: string
  right?: string
}

function Separator(props: ISeparatorProps) {
  const { color = '#E5E7EB', height, width, horizontal = false, left, right } = props

  // 水平分割线
  const horizontalStyle: CSSProperties = {
    backgroundColor: color,
    height: height || '2px',
    width: width || '35px',
    marginLeft: left || '10px',
    marginRight: right || '10px',
    borderRadius: '100%'
  }

  // 垂直分割线
  const verticalStyle: CSSProperties = {
    backgroundColor: color,
    height: height || '35px',
    width: width || '2px',
    marginLeft: left || '10px',
    marginRight: right || '10px',
    borderRadius: '100%'
  }

  // 根据 horizontal 值决定渲染水平还是垂直分割线
  return horizontal ? <div style={horizontalStyle} /> : <div style={verticalStyle} />
}

export default Separator
