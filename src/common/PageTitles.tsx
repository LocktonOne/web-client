import { config } from '@config'
import { Box, BoxProps, Typography, useTheme } from '@mui/material'
import { useEffect } from 'react'

interface Props extends BoxProps {
  title: string
  subtitle?: string
}

export default function PageTitles({ title, subtitle, ...rest }: Props) {
  const { spacing, palette } = useTheme()
  useEffect(() => {
    document.title = `${title} | ${config.APP_NAME}`
  }, [title])

  return (
    <Box {...rest}>
      <Typography variant='h5'>{title}</Typography>
      <Typography sx={{ fontSize: spacing(4.5), color: palette.primary.light }} mt={2}>
        {subtitle}
      </Typography>
    </Box>
  )
}
