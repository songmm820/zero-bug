/**
 * Router List Config 路由表
 * @author songmm
 */

// createBrowserRouter 暂时不支持 hash 模式，所以使用 createHashRouter
import { createHashRouter, Navigate } from 'react-router-dom'
import { LazyImportComponent } from './router-load'
import { lazy } from 'react'

const HomeView = lazy(() => import('@/views/home/HomeView'))
const NotFoundView = lazy(() => import('@/views/error/NotFoundView'))

const router = createHashRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />
  },
  // dashboard
  {
    path: '/dashboard',
    element: <LazyImportComponent lazyChildren={HomeView} isRequiredAuth={false} isTrackPageView={false} />,
    loader: () => {
      return Promise.resolve(true)
    }
  },
  // 404 Not Found
  {
    path: '*',
    element: <LazyImportComponent lazyChildren={NotFoundView} isRequiredAuth={false} title="404" isTrackPageView={false} />
  }
])

export default router
