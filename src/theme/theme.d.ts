import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    icon: {
      primaryLight: string
      primary: string
      primaryDark: string
    }
    border: {
      light: string
      main: string
      dark: string
    }
    disable: {
      light: string
      main: string
      dark: string
    }
  }

  interface PaletteOptions {
    icon?: {
      primaryLight?: string
      primary?: string
      primaryDark?: string
    }
    border?: {
      light?: string
      main?: string
      dark?: string
    }
    disable?: {
      light?: string
      main?: string
      dark?: string
    }
  }

  interface TypeText {
    primaryLight: string
    primaryDark: string
    secondaryLight: string
    secondaryDark: string
    accent: string
  }

  interface TypeBackground {
    primaryLight: string
    primary: string
    primaryDark: string
    secondaryLight: string
    secondary: string
    secondaryDark: string
    tertiary: string
    additional: string
  }
}
