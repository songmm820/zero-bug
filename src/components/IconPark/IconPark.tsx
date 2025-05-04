/**
 * 组件：IconPark 图表组件
 * @author songmm
 * @see https://iconpark.oceanengine.com/projects
 */
import style from './index.module.scss'

type IconParkProps = {
  icon: string
  color?: string
  onClick?: () => void
  size?: number
}

function IconPark(props: IconParkProps) {
  // Icon Color
  const iconColor = props.color || '#606266'
  // Icon Size
  const iconSize = props.size || 18

  /**
   * Icon Click
   */
  function handleClick() {
    if (props.onClick) {
      props.onClick()
    }
  }

  return (
    <>
      <div className={style['icon-container']}>
        <svg className={style['icon']} aria-hidden={true} style={{ color: iconColor }} width={iconSize} height={iconSize} onClick={() => handleClick()}>
          <use xlinkHref={`#${props.icon}`}></use>
        </svg>
      </div>
    </>
  )
}

export default IconPark
