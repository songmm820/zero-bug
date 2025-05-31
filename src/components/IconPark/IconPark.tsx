/**
 * 组件：IconPark 图表组件
 * @author songmm
 * @see https://iconpark.oceanengine.com/projects
 */

type IconParkProps = {
  icon: string
  color?: string
  onClick?: () => void
  size?: number
}

function IconPark(props: IconParkProps) {
  // Icon Color
  const iconColor = props.color || 'var(--foreground)'
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
      <button className="hover:bg-accent rounded-sm transition-all duration-200 ease-in-out" onClick={() => handleClick()}>
        <div className="inline-flex items-center justify-center p-2">
          <svg aria-hidden={true} style={{ color: iconColor }} width={iconSize} height={iconSize}>
            <use xlinkHref={`#${props.icon}`}></use>
          </svg>
        </div>
      </button>
    </>
  )
}

export default IconPark
