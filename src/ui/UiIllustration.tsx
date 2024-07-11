import { Box, BoxProps, SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { forwardRef } from 'react'

import { Illustrations } from '@/enums'
type Props = {
  size?: number
  name: Illustrations
} & BoxProps<'svg'>

const UiIllustration = forwardRef<SVGSVGElement, Props>(({ size = 6, ...props }, ref) => {
  const sx: SxProps<Theme> = {
    width: theme => theme.spacing(size),
    height: theme => theme.spacing(size),
    ...props.sx,
  }

  const { className, name, ...rest } = props

  return (
    <Box
      {...rest}
      ref={ref}
      component='svg'
      sx={sx}
      className={['illustration', ...(className ? [className] : [])].join(' ')}
      aria-hidden='true'
    >
      <use href={`#${name}-illustration`} />
    </Box>
  )
})

export default UiIllustration
