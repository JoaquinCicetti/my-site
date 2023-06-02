import React from 'react';
import chroma, { Color } from 'chroma-js';
import { generateBackgroundColor, generateReadableFontColor } from '../utils';

type ThemeGenerator = (color: Color) => Theme;

export interface Theme {
  background: Color;
  text: Color;
  accent: Color;
}

const generateTheme: ThemeGenerator = (color) => {
  const defaultAccent = color;
  const defaultBackground = generateBackgroundColor(defaultAccent);
  const defaultText = generateReadableFontColor(defaultBackground);

  return {
    background: defaultBackground,
    text: defaultText,
    accent: defaultAccent,
  };
};

const defaultColor = chroma('#D198CF');
const defaultTheme: Theme = generateTheme(defaultColor);

export interface ThemeContext {
  theme: Theme;
  setAccent: (newColor: Color) => void;
}

export const Context = React.createContext<ThemeContext | null>(null);

interface Props {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<Props> = (props) => {
  const [theme, setTheme] = React.useState<Theme>(defaultTheme);

  const setAccent = (newColor: Color) => {
    const newTheme = generateTheme(newColor);

    setTheme(newTheme);
  };

  const value = {
    theme,
    setAccent,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
