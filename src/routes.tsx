import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'

import { RoutePaths } from '@/enums'

import { createDeepPath } from './helpers'
import PublicLayout from './layouts/PublicLayout'

export const AppRoutes = () => {
  const Login = lazy(() => import('@/pages/Login'))
  const AdminLogin = lazy(() => import('@/pages/AdminLogin'))
  const Roles = lazy(() => import('@/pages/Roles'))

  /*
  const { isAuthorized, logout } = useAuth()

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
        logout()

        const requestUrl = new URL(request.url)
        requestUrl.searchParams.set('from', requestUrl.pathname)

        return redirect(`${RoutePaths.SignIn}${requestUrl.search}`)
      }

      return null
    },
    [isAuthorized, logout],
  )

  const LayoutComponent = useMemo(() => {
    return isAuthorized ? MainLayout : PublicLayout
  }, [isAuthorized])
  */

  const router = createBrowserRouter([
    {
      path: RoutePaths.Root,
      element: (
        <PublicLayout>
          <Suspense fallback={<></>}>
            <Outlet />
          </Suspense>
        </PublicLayout>
      ),
      children: [
        {
          path: createDeepPath(RoutePaths.Login),
          element: <Login />,
        },
        {
          path: createDeepPath(RoutePaths.AdminLogin),
          element: <AdminLogin />,
        },
        {
          path: createDeepPath(RoutePaths.Roles),
          element: <Roles />,
        },
        {
          path: RoutePaths.Root,
          element: <Navigate replace to={RoutePaths.Login} />,
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
