import { Stack } from '@mui/material'
import { HTMLAttributes } from 'react'
type Props = HTMLAttributes<HTMLDivElement>

const Login = ({ ...rest }: Props) => {
  return <Stack {...rest}>Locktone One</Stack>
}

export default Login
