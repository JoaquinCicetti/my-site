import React from 'react';
import { Context, ThemeContext } from './ThemeContext';

export const useTheme = (): ThemeContext => {
  const value = React.useContext(Context);

  validateContext(value);

  return value;
};

function validateContext(ctx: ThemeContext | null): asserts ctx is ThemeContext {
  if (ctx === null) {
    throw new Error('Using theme out of the context');
  }
}
