/**
 * 组件： 高阶组件（权限路由）
 * @author songmm
 */

import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GetAuth } from '@/utils/auth-util'
import { ROUTER_PATH } from '@/constants/app.ts'
import { trackPageView } from '@/utils/tracking.ts'

const DEFAULT_TITLE_PREFIX = import.meta.env.VITE_APP_TITLE
const DEFAULT_TITLE = ''

/**
 * 一个权限控制路由组件 PermissionRouter
 * 用于根据用户的认证信息来控制是否允许访问某个页面。
 * 它的主要作用是判断用户是否已经登录（即是否有效的认证信息），如果需要权限认证且用户未登录，则会跳转到登录页面
 * 如果用户没有权限，则显示一个没有权限的视图。
 */

export type IPermissionRouterProps = {
  /**
   * child元素
   */
  children?: React.ReactNode
  /**
   * 是否需要权限认证
   */
  isRequiredAuth: boolean
  /**
   * 页面标题
   */
  title?: string
  /**
   * 页面是否需要埋点收集上报
   */
  isTrackPageView: boolean
}

export function PermissionRouter(props: IPermissionRouterProps) {
  const { children, isRequiredAuth = true, title = DEFAULT_TITLE, isTrackPageView } = props

  // Hook for navigation
  const navigate = useNavigate()
  const location = useLocation()
  // 获取本地存储中的认证信息
  const localData = GetAuth()

  useEffect(() => {
    // 用户页面埋点
    if (isTrackPageView) {
      trackPageView(location.pathname)
    }
    // 页面挂载时，设置页面标题
    document.title = `${DEFAULT_TITLE_PREFIX + title}`
    // 如果需要权限认证，并且本地存储中没有认证信息，则跳转到登录页面
    if (isRequiredAuth) {
      if (!localData) {
        navigate(ROUTER_PATH.SIGN_IN)
      }
    }
  }, [isRequiredAuth, title, navigate])

  return <>{children}</>
}

export default PermissionRouter
