import { ComponentsOverrides } from '@mui/material'
import { TypographyOptions } from '@mui/material/styles/createTypography'
import { ChartsComponentsPropsList } from '@mui/x-charts/themeAugmentation'
import { CSSProperties } from 'react'

export interface ExtendedTypographyOptions extends TypographyOptions {
  subtitle3: CSSProperties

  body3: CSSProperties
  body4: CSSProperties
  body5: CSSProperties

  buttonLarge: CSSProperties
  buttonMedium: CSSProperties
  buttonSmall: CSSProperties

  caption1: CSSProperties
  caption2: CSSProperties
  caption3: CSSProperties

  overline1: CSSProperties
  overline2: CSSProperties
  overline3: CSSProperties
}

declare module '@mui/material/Typography/Typography' {
  interface TypographyPropsVariantOverrides {
    subtitle3: true

    body3: true
    body4: true
    body5: true

    buttonLarge: true
    buttonMedium: true
    buttonSmall: true

    caption1: true
    caption2: true
    caption3: true

    overline1: true
    overline2: true
    overline3: true

    button: false
    caption: false
    overline: false
  }
}

declare module '@mui/material/styles' {
  interface PaletteColor {
    darker?: string
    lighter?: string
  }

  interface SimplePaletteColorOptions {
    darker?: string
    lighter?: string
  }

  interface TypeText {
    placeholder: string
  }

  interface TypeBackground {
    light: string
  }

  interface PaletteOptions {
    additional: {
      layerBorder: string
      pureBlack: string
      gradient: string
    }
  }

  interface Palette {
    additional: {
      layerBorder: string
      pureBlack: string
      gradient: string
    }
  }

  interface Components<Theme = unknown> extends ChartsComponentsPropsList {
    MuiChartsTooltip?: {
      styleOverrides?: ComponentsOverrides<Theme>['MuiChartsTooltip']
    }
  }
}

declare module '@mui/material/styles/createTypography' {
  interface Typography extends ExtendedTypographyOptions {}
}
