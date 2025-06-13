/**
 * Component：颜色选择组件
 * @author songmm
 */
import { ChangeEvent, CSSProperties, useEffect, useRef, useState } from 'react'

export interface IColorPickerProps {
  /**
   * 颜色
   */
  value: string
  /**
   * 颜色改变回调
   */
  onChange?: (color: string) => void
}

function ColorPicker(props: IColorPickerProps) {
  const { value = '#000' } = props
  // 当前颜色
  const [currentColor, setColor] = useState<string>(value)
  // 颜色输入框ref
  const colorInputRef = useRef<HTMLInputElement>(null)

  const styleAttributes: CSSProperties = {
    backgroundColor: currentColor
  }

  // 点击颜色选择器时，弹出颜色选择器
  function onSelectColor() {
    colorInputRef.current?.click()
  }

  // 选择颜色回调
  function handleColorChange(event: ChangeEvent<HTMLInputElement>) {
    setColor(event.target.value)
    props.onChange?.(event.target.value)
  }

  useEffect(() => {
    setColor(value)
  }, [props.value])

  return (
    <div className="cursor-pointer w-6 h-6 rounded-full flex flex-col items-center justify-center" style={styleAttributes} onClick={onSelectColor}>
      <input ref={colorInputRef} className="appearance-none opacity-0" value={currentColor} type="color" onChange={handleColorChange} />
    </div>
  )
}

export default ColorPicker
