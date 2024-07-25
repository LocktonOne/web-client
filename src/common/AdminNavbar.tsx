import { Stack, Typography, useTheme } from '@mui/material'
import { useMemo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { ProfileMenu } from '@/common'
import { Icons, Illustrations, RoutePaths } from '@/enums'
import { Transitions } from '@/theme/constants'
import { UiIcon, UiIllustration } from '@/ui'

interface NavbarLinkProps {
  to: RoutePaths
  icon: Icons
  label: string
}

const NavbarLink = ({ to, icon, label }: NavbarLinkProps) => {
  const location = useLocation()
  const { palette } = useTheme()

  const isRouteActive = useMemo(() => {
    return location.pathname.startsWith(to)
  }, [location.pathname, to])

  return (
    <NavLink to={to}>
      <Stack
        gap={2}
        flexDirection='row'
        alignItems='center'
        justifyContent='flex-start'
        sx={{
          borderRadius: 6,
          px: 3,
          py: 2,
          border: '1px solid',
          backgroundColor: isRouteActive ? palette.common.white : 'transparent',
          borderColor: isRouteActive ? palette.action.active : 'transparent',
          color: isRouteActive ? palette.primary.main : palette.text.primary,
          transition: Transitions.Default,
          '&:hover': {
            backgroundColor: isRouteActive ? palette.secondary.light : palette.action.hover,
          },
        }}
      >
        <UiIcon
          name={icon}
          size={5.5}
          color={isRouteActive ? palette.primary.dark : palette.primary.lighter}
        />
        <Typography variant='body3'>{label}</Typography>
      </Stack>
    </NavLink>
  )
}

const AdminNavbar = () => {
  const { palette, spacing } = useTheme()
  const navbarItems = useMemo(
    () => [
      {
        route: RoutePaths.Roles,
        icon: Icons.RolesFill,
        label: 'Roles',
      },
      {
        route: RoutePaths.Administrators,
        icon: Icons.AdministratorsFill,
        label: 'Administrators',
      },
      {
        route: RoutePaths.Users,
        icon: Icons.UsersFill,
        label: 'Users',
      },
      {
        route: RoutePaths.KycRequests,
        icon: Icons.KycFill,
        label: 'Kyc Requests',
      },
    ],
    [],
  )

  return (
    <Stack
      justifyContent='space-between'
      alignItems='center'
      py={6}
      px={4}
      borderRight={1}
      borderColor={palette.divider}
      bgcolor={palette.background.paper}
      sx={{ display: { xs: 'none', md: 'flex' } }}
    >
      <Stack spacing={4}>
        <Stack component={NavLink} to={RoutePaths.Dashboard} alignItems='center'>
          <UiIllustration
            name={Illustrations.AdminLogo}
            sx={{ color: palette.text.primary, width: spacing(50), height: spacing(10) }}
          />
        </Stack>
        <Stack spacing={1.5} pt={24}>
          {navbarItems.map(({ route, icon, label }, idx) => (
            <NavbarLink key={idx} to={route} icon={icon} label={label} />
          ))}
        </Stack>
      </Stack>

      <Stack spacing={4}>
        <ProfileMenu type='admin' email='adminsmail@gmail.com' name='Master Admin' />
      </Stack>
    </Stack>
  )
}

export default AdminNavbar
