/**
 * Component：手写签名组件 - 设置工具栏
 * @author songmm
 */
import { motion } from 'motion/react'
import ColorPicker from '@/components/ColorPicker/ColorPicker.tsx'
import { RecommendedColors } from '@/components/HandwrittenSignature/setting.ts'

interface ISignatureSettingToolsProps {
  /**
   * 画笔颜色
   */
  color: string
  /**
   * 修改画笔颜色
   */
  onChangeColor?: (color: string) => void
}

function SignatureSettingTools(props: ISignatureSettingToolsProps) {
  const { color: paintingBrushColor } = props

  // 修改画笔颜色
  function handleChangeColor(color: string) {
    props.onChangeColor?.(color)
  }

  // 推荐画笔颜色
  const RecommendedColor = () => {
    return (
      <div className="flex flex-wrap gap-2">
        {RecommendedColors.map((item) => (
          <motion.div
            whileHover={{ scale: 1.2 }}
            key={item}
            className="w-6 h-6 rounded-full cursor-pointer"
            style={{ backgroundColor: item }}
            onClick={() => handleChangeColor(item)}
          ></motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between gap-4 text-background">
      <RecommendedColor />
      <ColorPicker value={paintingBrushColor} onChange={handleChangeColor} />
    </div>
  )
}

export default SignatureSettingTools
