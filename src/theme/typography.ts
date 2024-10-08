import { ExtendedTypographyOptions } from '@/types'

import { FONT_FAMILY, FontWeight } from './constants'
import { toRem } from './helpers'

export const typography: ExtendedTypographyOptions = {
  htmlFontSize: 16,

  fontFamily: FONT_FAMILY,
  fontSize: 14,

  fontWeightLight: FontWeight.Light,
  fontWeightRegular: FontWeight.Regular,
  fontWeightMedium: FontWeight.Medium,
  fontWeightBold: FontWeight.Bold,

  h1: {
    fontWeight: FontWeight.SemiBold,
    fontSize: toRem(32),
    lineHeight: toRem(44),
  },
  h2: {
    fontWeight: FontWeight.SemiBold,
    fontSize: toRem(26),
    lineHeight: toRem(30),
  },
  h3: {
    fontWeight: FontWeight.SemiBold,
    fontSize: toRem(20),
    lineHeight: toRem(28),
  },

  subtitle1: {
    fontWeight: FontWeight.Medium,
    fontSize: toRem(32),
    lineHeight: toRem(44),
  },
  subtitle2: {
    fontWeight: FontWeight.Regular,
    fontSize: toRem(24),
    lineHeight: toRem(28),
  },
  subtitle3: {
    fontWeight: FontWeight.Regular,
    fontSize: toRem(20),
    lineHeight: toRem(28),
  },
  body1: {
    fontWeight: FontWeight.Regular,
    fontSize: toRem(20),
    lineHeight: toRem(28),
    letterSpacing: toRem(0.4),
  },
  body2: {
    fontWeight: FontWeight.Regular,
    fontSize: toRem(18),
    lineHeight: toRem(26),
    letterSpacing: toRem(0.32),
  },
  body3: {
    fontWeight: FontWeight.Regular,
    fontSize: toRem(16),
    lineHeight: toRem(24),
    letterSpacing: toRem(0.28),
  },
  body4: {
    fontWeight: FontWeight.Regular,
    fontSize: toRem(14),
    lineHeight: toRem(20),
    letterSpacing: toRem(0.24),
  },
  body5: {
    fontWeight: FontWeight.Regular,
    fontSize: toRem(12),
    lineHeight: toRem(16),
    letterSpacing: toRem(0.24),
  },
  button: {
    fontWeight: FontWeight.Medium,
    fontSize: toRem(14),
    lineHeight: toRem(18),
    letterSpacing: 0,
    textTransform: 'none',
  },
  buttonLarge: {
    fontWeight: FontWeight.Medium,
    fontSize: toRem(16),
    lineHeight: toRem(20),
  },
  buttonMedium: {
    fontWeight: FontWeight.Medium,
    fontSize: toRem(14),
    lineHeight: toRem(18),
  },
  buttonSmall: {
    fontWeight: FontWeight.Medium,
    fontSize: toRem(12),
    lineHeight: toRem(14),
  },
  caption1: {
    fontWeight: FontWeight.Medium,
    fontSize: toRem(14),
    lineHeight: toRem(18),
  },
  caption2: {
    fontWeight: FontWeight.Medium,
    fontSize: toRem(12),
    lineHeight: toRem(16),
  },
  caption3: {
    fontWeight: FontWeight.Medium,
    fontSize: toRem(10),
    lineHeight: toRem(12),
  },
  overline1: {
    fontWeight: FontWeight.Bold,
    fontSize: toRem(14),
    lineHeight: toRem(18),
    letterSpacing: toRem(0.56),
    textTransform: 'uppercase',
  },
  overline2: {
    fontWeight: FontWeight.Bold,
    fontSize: toRem(12),
    lineHeight: toRem(16),
    letterSpacing: toRem(0.48),
    textTransform: 'uppercase',
  },
  overline3: {
    fontWeight: FontWeight.Bold,
    fontSize: toRem(10),
    lineHeight: toRem(12),
    letterSpacing: toRem(0.4),
    textTransform: 'uppercase',
  },
}
