/**
 * Views：首页 banner 上下浮动图片
 * @author songmm
 */

import { motion } from 'motion/react'

type IBannerImageProps = {
  url: string
  width?: number
  height?: number
  rotate?: number
}

function BannerImage(props: IBannerImageProps) {
  const { url, width, height, rotate = 0 } = props

  return (
    <div style={{ transform: `rotate(${rotate}deg)` }}>
      <motion.img
        src={url}
        alt="Banner Image"
        style={{
          width: `${width}px`,
          height: `${height}px`
        }}
        animate={{
          y: [0, -20, 0]
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop'
        }}
      />
    </div>
  )
}

export default BannerImage
