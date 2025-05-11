/**
 * PermissionRouter 高阶组件（懒加载 Loading）
 * @author songmm
 */

import React, { LazyExoticComponent, Suspense } from 'react'
import FullScreenLoading from '@/components/Loading/FullScreenLoading'
import PermissionRouter from '@/components/PermissionRouter/PermissionRouter.tsx'

type ILazyImportComponentProps = {
  /**
   * 懒加载组件
   */
  lazyChildren: LazyExoticComponent<() => React.ReactNode>
  /**
   * 是否需要权限
   */
  isRequiredAuth: boolean
  /**
   *  页面标题
   */
  title?: string
  /**
   * 页面是否需要埋点收集上报
   */
  isTrackPageView: boolean
}

/**
 * Lazy Import Component *  Must in [views] Folder
 * 懒加载组件
 */
export const LazyImportComponent = (props: ILazyImportComponentProps) => {
  return (
    <Suspense fallback={<FullScreenLoading />}>
      <PermissionRouter isRequiredAuth={props.isRequiredAuth} title={props.title} isTrackPageView={props.isTrackPageView}>
        <props.lazyChildren />
      </PermissionRouter>
    </Suspense>
  )
}
