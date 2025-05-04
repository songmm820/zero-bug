/**
 * 组件： 高阶组件（权限路由）
 * @author songmm
 */

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetAuth } from '@/utils/auth-util'
import { ROUTER_PATH } from '@/constants/app.ts'

type IPermissionRouterProps = {
  children: React.ReactNode
  isRequiredAuth: boolean
  title?: string
}

const DEFAULT_TITLE_PREFIX = import.meta.env.VITE_APP_TITLE
const DEFAULT_TITLE = ''

/**
 * 一个权限控制路由组件 PermissionRouter
 * 用于根据用户的认证信息来控制是否允许访问某个页面。
 * 它的主要作用是判断用户是否已经登录（即是否有效的认证信息），如果需要权限认证且用户未登录，则会跳转到登录页面
 * 如果用户没有权限，则显示一个没有权限的视图。
 */
export function PermissionRouter({ children, isRequiredAuth = true, title = DEFAULT_TITLE }: IPermissionRouterProps) {
  // Hook for navigation
  const navigate = useNavigate()
  // 获取本地存储中的认证信息
  const localData = GetAuth()

  // 页面挂载时，设置页面标题
  useEffect(() => {
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
