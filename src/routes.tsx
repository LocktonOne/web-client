import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'

import { App } from '@/App'
import { RoutesPaths } from '@/enums'

export const AppRoutes = () => {
  const Login = lazy(() => import('@/pages/LogIn'))
  const AdminLogin = lazy(() => import('@/pages/AdminLogin'))
  const Roles = lazy(() => import('@/pages/Roles'))

  const pageAnimationOpts = {
    initial: 'hide',
    animate: 'show',
    exit: 'hide',
    variants: {
      hide: {
        opacity: 0,
      },
      show: {
        opacity: 1,
      },
    },
    transition: { duration: 0.5 },
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Suspense fallback={<></>}>
          <App>
            <AnimatePresence>
              <Outlet />
            </AnimatePresence>
          </App>
        </Suspense>
      ),
      children: [
        {
          index: true,
          path: RoutesPaths.login,
          element: <Login {...pageAnimationOpts} />,
        },
        {
          index: true,
          path: RoutesPaths.adminLogin,
          element: <AdminLogin {...pageAnimationOpts} />,
        },
        {
          index: true,
          path: RoutesPaths.roles,
          element: <Roles {...pageAnimationOpts} />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
