/**
 * 组件：头像
 * @author songmm
 */

import defaultAvatar from '@/assets/logo_white.svg'
import { CSSProperties } from 'react'

type IAvatarProps = {
  src?: string
  alt?: string
  size?: number
  radius?: number
}

function Avatar(props: IAvatarProps) {
  const { src = defaultAvatar, alt, size = '40px', radius } = props

  const avatarStyle: CSSProperties = {
    width: size,
    height: size,
    borderRadius: radius
  }

  return <img className="cursor-pointer" style={avatarStyle} src={src} alt={alt} />
}

export default Avatar
