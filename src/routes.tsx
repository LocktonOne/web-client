import { lazy, Suspense, useCallback } from 'react'
import {
  createBrowserRouter,
  LoaderFunctionArgs,
  Navigate,
  Outlet,
  redirect,
  RouterProvider,
} from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { useAdminAuth, useAuth } from '@/hooks'
import AdminLayout from '@/layouts/AdminLayout'

import { createDeepPath } from './helpers'
import PublicLayout from './layouts/PublicLayout'

export const AppRoutes = () => {
  // TODO: add this functional to the next version
  const Login = lazy(() => import('@/pages/Login'))
  const Register = lazy(() => import('@/pages/Register'))
  const LoginWithMetamask = lazy(() => import('@/pages/LoginWithMetamask'))
  const AdminLogin = lazy(() => import('@/pages/AdminLogin'))
  const Roles = lazy(() => import('@/pages/Roles'))
  const Contracts = lazy(() => import('@/pages/Contracts'))
  const Users = lazy(() => import('@/pages/Users'))
  const Administrators = lazy(() => import('@/pages/Administrators'))
  const KycRequests = lazy(() => import('@/pages/KycRequests'))
  const Dashboard = lazy(() => import('@/pages/Dashboard'))
  const Account = lazy(() => import('@/pages/Account'))
  const Kyc = lazy(() => import('@/pages/Kyc'))

  const { isAuthorized, isAdmin } = useAdminAuth()
  const { isLoggedIn } = useAuth()

  const signInGuardAdmin = useCallback(
    ({ request }: LoaderFunctionArgs) => {
      const requestUrl = new URL(request.url)

      const from = requestUrl.searchParams.get('from')
      return isAuthorized && isAdmin
        ? redirect(from ? `${from}${requestUrl.search}` : RoutePaths.Roles)
        : null
    },
    [isAdmin, isAuthorized],
  )

  const signInGuard = useCallback(
    ({ request }: LoaderFunctionArgs) => {
      const requestUrl = new URL(request.url)

      const from = requestUrl.searchParams.get('from')

      return isLoggedIn
        ? redirect(from ? `${from}${requestUrl.search}` : RoutePaths.Dashboard)
        : null
    },
    [isLoggedIn],
  )
  const authProtectedGuardAdmin = useCallback(
    ({ request }: LoaderFunctionArgs) => {
      // If the user is not logged in and tries to access protected route, we redirect
      // them to sign in with a `from` parameter that allows login to redirect back
      // to this page upon successful authentication
      if (!isAuthorized || !isAdmin) {
        const requestUrl = new URL(request.url)
        requestUrl.searchParams.set('from', requestUrl.pathname)

        return redirect(`${RoutePaths.AdminLogin}${requestUrl.search}`)
      }

      return null
    },
    [isAdmin, isAuthorized],
  )

  const authProtectedGuard = useCallback(
    ({ request }: LoaderFunctionArgs) => {
      // If the user is not logged in and tries to access protected route, we redirect
      // them to sign in with a `from` parameter that allows login to redirect back
      // to this page upon successful authentication
      if (!isLoggedIn) {
        const requestUrl = new URL(request.url)
        requestUrl.searchParams.set('from', requestUrl.pathname)

        return redirect(`${RoutePaths.LoginWithMetamask}${requestUrl.search}`)
      }

      return null
    },
    [isLoggedIn],
  )

  const router = createBrowserRouter([
    {
      path: RoutePaths.Root,
      element: (
        <Suspense fallback={<></>}>
          <Outlet />
        </Suspense>
      ),
      children: [
        {
          path: createDeepPath(RoutePaths.Roles),
          element: (
            <AdminLayout>
              <Roles />
            </AdminLayout>
          ),
          loader: authProtectedGuardAdmin,
        },
        {
          path: RoutePaths.Root,
          element: <Navigate replace to={RoutePaths.Dashboard} />,
        },
        {
          path: createDeepPath(RoutePaths.LoginWithMetamask),
          element: (
            <PublicLayout>
              <LoginWithMetamask />
            </PublicLayout>
          ),
          loader: signInGuard,
        },
        // TODO: add this functional to the next version
        {
          path: createDeepPath(RoutePaths.Login),
          element: (
            <PublicLayout>
              <Login />
            </PublicLayout>
          ),
          loader: signInGuard,
        },
        {
          path: createDeepPath(RoutePaths.Register),
          element: (
            <PublicLayout>
              <Register />
            </PublicLayout>
          ),
          loader: signInGuard,
        },
        {
          path: createDeepPath(RoutePaths.AdminLogin),
          element: (
            <PublicLayout>
              <AdminLogin />
            </PublicLayout>
          ),
          loader: signInGuardAdmin,
        },
        {
          path: createDeepPath(RoutePaths.Administrators),
          element: (
            <AdminLayout>
              <Administrators />
            </AdminLayout>
          ),
          loader: authProtectedGuardAdmin,
        },
        {
          path: createDeepPath(RoutePaths.Contracts),
          element: (
            <AdminLayout>
              <Contracts />
            </AdminLayout>
          ),
          loader: authProtectedGuardAdmin,
        },
        {
          path: createDeepPath(RoutePaths.Users),
          element: (
            <AdminLayout>
              <Users />
            </AdminLayout>
          ),
          loader: authProtectedGuardAdmin,
        },
        {
          path: createDeepPath(RoutePaths.KycRequests),
          element: (
            <AdminLayout>
              <KycRequests />
            </AdminLayout>
          ),
          loader: authProtectedGuardAdmin,
        },
        {
          path: createDeepPath(RoutePaths.Dashboard),
          element: (
            <PublicLayout>
              <Dashboard />
            </PublicLayout>
          ),
          loader: authProtectedGuard,
        },
        {
          path: createDeepPath(RoutePaths.Account),
          element: (
            <PublicLayout>
              <Account />
            </PublicLayout>
          ),
          loader: authProtectedGuard,
        },
        {
          path: createDeepPath(RoutePaths.Kyc),
          element: (
            <PublicLayout>
              <Kyc />
            </PublicLayout>
          ),
          loader: authProtectedGuard,
        },
        {
          path: '*',
          element: <Navigate replace to={RoutePaths.Dashboard} />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
