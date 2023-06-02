/**
 * This utility will help us to generate styles for our components
 *
 * Neumorphism
 *  -   Elements have two shadows: one light and one dark.
 *  -   Background colors must be the same (or very similar) as the background color of the parent element
 *  -   Rounded edges are a defining quality.
 *  -   Elements can have an optional subtle border to improve contrast and make the edges a bit sharper
 *
 * CSS:
 * box-shadow: [horizontal offset] [vertical offset] [blur radius] [optional spread radius] [color];
 *
 * Read:
 * https://css-tricks.com/neumorphism-and-css/
 */

import chroma, { Color } from 'chroma-js';

const PX_UNIT = 1.5;
const BLUR_SCALE = 1.3;

interface Params {
  color: Color;
  elevation: number;
  inverted?: boolean;
}

export enum Shapes {
  CONVEX = 'Convex',
  CONCAVE = 'Concave',
  FLAT = 'Flat',
}

export const shapes = Object.values(Shapes);

type ShadowGenerator = (params: Params) => string;
type FontColorGenerator = (bgColor: Color) => Color;
type BackgroundColorGenerator = (bgColor: Color) => Color;
type BackgroundGradientGenerator = (bgColor: Color) => string;
type ColorFromTextGenerator = (text: string) => Color;
/**
 *
 * Neumorphism is based on shadows
 * @param params elevation and container color
 * @returns css box shadow property.
 */
export const generateShadow: ShadowGenerator = (params) => {
  const { color, elevation, inverted } = params;

  const lighterColor = chroma(color).brighten(1.4).alpha(0.8);
  const darkerColor = chroma(color).darken(1.2).alpha(1);

  const offsetL = -1 * Math.abs(elevation) * PX_UNIT;
  const offsetD = Math.abs(elevation) * PX_UNIT;

  const blurRadius = Math.abs(elevation * BLUR_SCALE * PX_UNIT);

  const lightShadow = `${offsetL}px ${offsetL}px ${blurRadius}px ${lighterColor}`;
  const darkShadow = `${offsetD}px ${offsetD}px ${blurRadius}px ${darkerColor}`;

  return inverted ? `inset ${lightShadow}, inset ${darkShadow}` : `${lightShadow}, ${darkShadow}`;
};

export const generateReadableFontColor: FontColorGenerator = (bgColor) => {
  const complementary = bgColor.set('hsl.h', 180);

  if (complementary.luminance() <= 0.25) {
    return complementary.desaturate(4).brighten(3.5);
  }

  return complementary.desaturate(4).darken(3.5);
};

export const generateBackgroundColor: BackgroundColorGenerator = (accentColor) => {
  const complementary = accentColor.set('hsl.h', 180);

  if (accentColor.luminance() >= 0.25) {
    return complementary.desaturate(4).darken(3.5);
  }

  return complementary.desaturate(4).brighten(2.5);
};

export const generateFlatBackground: BackgroundGradientGenerator = (bgColor) => {
  const hexColor = bgColor.hex();

  return `linear-gradient(0deg, ${hexColor}, ${hexColor})`;
};

export const generateConvexBackground: BackgroundGradientGenerator = (bgColor) => {
  const from = bgColor.darken(0.3);
  const to = bgColor.brighten(0.4);

  return `linear-gradient(-45deg, ${from.hex()}, ${to.hex()}`;
};

export const generateConcaveBackground: BackgroundGradientGenerator = (bgColor) => {
  const from = bgColor.darken(0.3);
  const to = bgColor.brighten(0.4);

  return `linear-gradient(135deg, ${from.hex()}, ${to.hex()}`;
};

export const generateColorFromString: ColorFromTextGenerator = (text) => {
  const intHash = Array.from(text).reduce((hash: number, char: string) => {
    return char.charCodeAt(0) + ((hash << 5) - hash);
  }, 0);

  const r = (intHash >> 8) & 0xff;
  const g = (intHash >> 16) & 0xff;
  const b = (intHash >> 24) & 0xff;
  const generatedColor = chroma(r, g, b, 255);

  return generatedColor;
};
