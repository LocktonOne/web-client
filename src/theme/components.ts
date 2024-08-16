import { Components, Theme } from '@mui/material'

import { FontWeight, Transitions } from '@/theme/constants'
import { typography } from '@/theme/typography'

import { vh } from './helpers'

export const components: Components<Omit<Theme, 'components'>> = {
  MuiCssBaseline: {
    styleOverrides: `
      html {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        min-height: ${vh(100)};
        -webkit-overflow-scrolling: touch !important;
        -webkit-tap-highlight-color: transparent;
      }

      body, #root, .App {
        display: flex;
        flex: 1;
        flex-direction: column;
      }

      a {
        outline: none;
        text-decoration: none;

        &:hover,
        &:focus,
        &:active {
          text-decoration: none;
        }
      }
    `,
  },
  MuiButton: {
    defaultProps: {
      variant: 'contained',
      size: 'large',
      disableElevation: true,
      disableFocusRipple: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.spacing(3),
        transition: Transitions.Default,
        color: theme.palette.secondary.light,
        backgroundColor: theme.palette.primary.dark,
        fontWeight: FontWeight.Medium,
        '&.Mui-disabled': {
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.common.white,
        },
      }),
      containedSizeLarge: ({ theme }) => ({
        ...typography.buttonLarge,
        padding: theme.spacing(0, 4),
        height: theme.spacing(12),
      }),
      containedSizeMedium: ({ theme }) => ({
        ...typography.buttonMedium,
        padding: theme.spacing(0, 4),
        height: theme.spacing(8),
      }),
      containedSizeSmall: ({ theme }) => ({
        ...typography.buttonSmall,
        padding: theme.spacing(0, 2),
        height: theme.spacing(6),
      }),
      fullWidth: {
        width: '100%',
      },
      text: {
        padding: 0,
        minWidth: 'unset',
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
      textPrimary: ({ theme }) => ({
        color: theme.palette.secondary.light,
      }),
      textSecondary: ({ theme }) => ({
        color: theme.palette.secondary.light,
        '&:hover': {
          color: theme.palette.secondary.light,
        },
      }),
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiInputBase-root, & .MuiInputBase-sizeSmall, & .MuiInputBase-sizeMedium':
          typography.body3,
        '& .MuiInputBase-root': {
          minHeight: theme.spacing(12),
          borderRadius: theme.spacing(3),
          borderColor: theme.palette.primary.light,
          fontSize: theme.spacing(4),
          height: theme.spacing(10),
          '&.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.action.focus,
            borderWidth: 1,
          },
          '&:hover:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.action.hover,
          },
        },
        '& .MuiInputBase-sizeSmall': {
          height: theme.spacing(10),
        },
        '& .MuiOutlinedInput-notchedOutline': {
          transition: Transitions.Default,
          borderRadius: theme.spacing(3),
          borderColor: theme.palette.primary.light,
        },
      }),
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: {
        ...typography.caption1,
        color: 'inherit',
        textTransform: 'capitalize',
        '&.Mui-focused': {
          color: 'inherit',
        },
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      icon: ({ theme }) => ({
        width: theme.spacing(5),
        height: theme.spacing(5),
        color: 'inherit',
        pointerEvents: 'none',
        top: theme.spacing(3.5),
        right: theme.spacing(3),
      }),
      root: ({ theme }) => ({
        ...typography.body3,
        minHeight: theme.spacing(12),
        borderRadius: theme.spacing(3),
        borderColor: theme.palette.primary.light,
        fontSize: theme.spacing(4),
        height: theme.spacing(10),
        '& .MuiOutlinedInput-notchedOutline': {
          transition: Transitions.Default,
          borderColor: theme.palette.primary.light,
        },
        '&.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.action.focus,
          borderWidth: 1,
        },
        '&:hover:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.action.hover,
        },
      }),
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: theme.spacing(2),
        boxShadow: '0px 8px 16px 0px rgba(0, 0, 0, 0.04)',
        padding: 0,
        zIndex: 100,
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        overflow: 'hidden',
      }),
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&:hover': {
          backgroundColor: theme.palette.action.active,
        },
      }),
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&.MuiTabs-root': {
          borderRadius: 8,
          backgroundColor: theme.palette.secondary.lighter,
        },
        '& .MuiTabs-indicator': {
          backgroundColor: 'transparent',
        },
      }),
    },
  },
  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&.MuiTab-root.Mui-selected': {
          backgroundColor: theme.palette.common.white,
        },
        '&.MuiTab-root': {
          borderBottom: 0,
          borderRadius: 8,
          margin: 6,
          minHeight: 38,
          padding: 0,
        },
      }),
    },
  },
}
