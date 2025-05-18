/**
 * Router List Config 路由表
 * @author songmm
 */

// createBrowserRouter 暂时不支持 hash 模式，所以使用 createHashRouter
import { createHashRouter, Navigate } from 'react-router-dom'
import { LazyImportComponent } from './router-load'
import { lazy } from 'react'

const PhaserExampleGame = lazy(() => import('@/games/phaser-example/PhaserExampleGame.tsx'))
const NotFoundView = lazy(() => import('@/views/error/NotFoundView'))
const SignView = lazy(() => import('@/views/sign/SignView.tsx'))

const router = createHashRouter([
  {
    path: '/',
    element: <Navigate to="/phaser-example" replace />
  },
  // phaser-example
  {
    path: '/phaser-example',
    element: <LazyImportComponent lazyChildren={PhaserExampleGame} isRequiredAuth={false} isTrackPageView={false} />,
    loader: () => {
      return Promise.resolve(true)
    }
  },
  // sign
  {
    path: '/sign',
    element: <LazyImportComponent lazyChildren={SignView} isRequiredAuth={false} title="登录" isTrackPageView />
  },
  // 404 Not Found
  {
    path: '*',
    element: <LazyImportComponent lazyChildren={NotFoundView} isRequiredAuth={false} title="404" isTrackPageView={false} />
  }
])

export default router
