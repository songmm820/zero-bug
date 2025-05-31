/**
 * APP 状态原子
 * @author songmm
 */
import { atom } from 'jotai'
import { APP_NAME } from '@/constants/app.ts'
import { getLang, getOS } from '@/utils/system-util.ts'

type IAppState = {
  /* 应用名称 */
  name: string
  /* 屏幕宽度 */
  screenWidth: number
  /* 屏幕高度 */
  screenHeight: number
  /* 当前平台 */
  platform: string
  /* 当前语言 */
  language: string
}

// 每个属性单独创建原子

// 应用名称
export const nameAtom = atom(APP_NAME)
// 屏幕宽度
export const screenWidthAtom = atom(window.innerWidth)
// 屏幕高度
export const screenHeightAtom = atom(window.innerHeight)
// 当前平台
export const platformAtom = atom(getOS())
// 当前语言
export const languageAtom = atom(getLang())

// 派生原子 包含所有APP状态
export const appStateAtom = atom<IAppState>((get) => {
  return {
    name: get(nameAtom),
    screenWidth: get(screenWidthAtom),
    screenHeight: get(screenHeightAtom),
    platform: get(platformAtom),
    language: get(languageAtom)
  }
})

/**
 * 更新屏幕宽度和高度的原子
 * 第一个参数是原子的 读函数（getter），但在这里我们传入了 null，表示这个原子没有需要返回的值。
 * 因为 updateScreenSizeAtom 是一个动作原子（不返回值，只是执行一些更新操作），所以读函数不需要使用
 */
export const updateScreenSizeAtom = atom(
  null, // 读函数不需要返回值
  (
    _get,
    set,
    {
      screenWidth,
      screenHeight
    }: {
      screenWidth: number
      screenHeight: number
    }
  ) => {
    set(screenWidthAtom, screenWidth)
    set(screenHeightAtom, screenHeight)
  }
)
