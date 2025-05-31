/**
 * Views：header
 * @author songmm
 */
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, Variants } from 'motion/react'
import ThemeToggle from '@/views/home/header/ThemeToggle.tsx'
import IconPark from '@/components/IconPark/IconPark'
import Logo from '@/components/Logo/Logo'

function HomeHeader() {
  const menuList = ['Solutions', 'Resources']

  // 下拉菜单开关
  const [isShowDrown, setIsShowDrown] = useState<boolean>(false)
  // menuRef
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 点击其他区域关闭下拉菜单
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsShowDrown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // header下拉框
  const MenuDrown = () => {
    // 定义动画变体
    const menuVariants: Variants = {
      hidden: { y: '-100%' },
      visible: { y: 0, transition: { duration: 0.35, ease: 'easeInOut' } },
      exit: { y: '-100%', transition: { duration: 0.35, ease: 'easeInOut' } }
    }
    return (
      <motion.nav className="absolute w-full py-6 bg-secondary common-shadow z-[-1]" initial="hidden" animate="visible" exit="exit" variants={menuVariants}>
        <div className="px-4 mx-auto sm:px-6 pc:px-8">
          <div className="flex items-center justify-between">
            <p className="font-semibold tracking-widest uppercase">Menu</p>
          </div>

          <div className="mt-6">
            <div className="flex flex-col space-y-2">
              {menuList.map((menu, index) => (
                <a key={index}>{menu}</a>
              ))}
            </div>

            <hr className="my-4 border-border" />
            <div className="flex flex-col space-y-2">
              <a className="py-2 transition-all duration-200 ">Sign up</a>
              <a className="py-2 transition-all duration-200 f">Sign in</a>
            </div>
          </div>
        </div>
      </motion.nav>
    )
  }

  return (
    <header className="relative z-2" ref={headerRef}>
      <div className="bg-card border-b border-border common-shadow">
        <div className="px-4 mx-auto">
          {/* Pc Menu */}
          <nav className="relative flex items-center justify-between h-16">
            {/* Logo  */}
            <div className="flex-shrink-0">
              <a className="flex items-center">
                {/* Logo */}
                <Logo />
              </a>
            </div>

            <div className="flex items-center">
              <div className="flex items-center space-x-10">
                <ThemeToggle />
              </div>

              <IconPark icon="hamburger-button" onClick={() => setIsShowDrown(!isShowDrown)} />
            </div>
          </nav>
        </div>
      </div>

      {/* Phone Menu */}
      <AnimatePresence initial={false}>{isShowDrown && <MenuDrown />}</AnimatePresence>
    </header>
  )
}

export default HomeHeader
