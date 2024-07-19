import { lazy, Suspense, useCallback, useMemo } from 'react'
import {
  createBrowserRouter,
  LoaderFunctionArgs,
  Navigate,
  Outlet,
  redirect,
  RouterProvider,
} from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { useAdminAuth } from '@/hooks'
import AdminLayout from '@/layouts/AdminLayout'

import { createDeepPath } from './helpers'
import PublicLayout from './layouts/PublicLayout'

export const AppRoutes = () => {
  const Login = lazy(() => import('@/pages/Login'))
  const Register = lazy(() => import('@/pages/Register'))
  const AdminLogin = lazy(() => import('@/pages/AdminLogin'))
  const Roles = lazy(() => import('@/pages/Roles'))
  const Users = lazy(() => import('@/pages/Users'))
  const Administrators = lazy(() => import('@/pages/Administrators'))
  const KycRequests = lazy(() => import('@/pages/KycRequests'))

  const { isAuthorized } = useAdminAuth()

  const signInGuard = useCallback(
    ({ request }: LoaderFunctionArgs) => {
      const requestUrl = new URL(request.url)

      const from = requestUrl.searchParams.get('from')

      return isAuthorized ? redirect(from ? `${from}${requestUrl.search}` : RoutePaths.Root) : null
    },
    [isAuthorized],
  )
  const authProtectedGuard = useCallback(
    ({ request }: LoaderFunctionArgs) => {
      // If the user is not logged in and tries to access protected route, we redirect
      // them to sign in with a `from` parameter that allows login to redirect back
      // to this page upon successful authentication
      if (!isAuthorized) {
        const requestUrl = new URL(request.url)
        requestUrl.searchParams.set('from', requestUrl.pathname)

        return redirect(`${RoutePaths.AdminLogin}${requestUrl.search}`)
      }

      return null
    },
    [isAuthorized],
  )

  const LayoutComponent = useMemo(() => {
    return isAuthorized ? AdminLayout : PublicLayout
  }, [isAuthorized])

  const router = createBrowserRouter([
    {
      path: RoutePaths.Root,
      element: (
        <LayoutComponent>
          <Suspense fallback={<></>}>
            <Outlet />
          </Suspense>
        </LayoutComponent>
      ),
      children: [
        {
          path: createDeepPath(RoutePaths.Roles),
          element: <Roles />,
          loader: authProtectedGuard,
        },
        {
          path: RoutePaths.Root,
          element: <Navigate replace to={RoutePaths.Roles} />,
        },
        {
          path: createDeepPath(RoutePaths.Login),
          element: <Login />,
        },
        {
          path: createDeepPath(RoutePaths.Register),
          element: <Register />,
        },
        {
          path: createDeepPath(RoutePaths.AdminLogin),
          element: <AdminLogin />,
          loader: signInGuard,
        },
        {
          path: createDeepPath(RoutePaths.Administrators),
          element: <Administrators />,
          loader: authProtectedGuard,
        },
        {
          path: createDeepPath(RoutePaths.Users),
          element: <Users />,
          loader: authProtectedGuard,
        },
        {
          path: createDeepPath(RoutePaths.KycRequests),
          element: <KycRequests />,
          loader: authProtectedGuard,
        },
        {
          path: '*',
          element: <Navigate replace to={RoutePaths.Root} />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
