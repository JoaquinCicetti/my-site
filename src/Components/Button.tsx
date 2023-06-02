import React from 'react';
import { useTheme } from '../Theme/useTheme';
import { generateConcaveBackground, generateConvexBackground, generateFlatBackground, generateShadow } from '../utils';
import { motion } from 'framer-motion';
import { Color } from 'chroma-js';

interface ButtonProps {
  onClick: () => void;
  color?: Color;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { onClick, color } = props;

  const { theme } = useTheme();

  const textColor = color ?? theme.accent;
  const whileHover = {
    boxShadow: generateShadow({ color: theme.background, elevation: 1 }),
    background: generateConcaveBackground(theme.background),
    borderColor: theme.background.hex('rgb'),
    color: textColor.darken(0.5).hex('rgb'),
  };

  const initial = {
    boxShadow: generateShadow({ color: theme.background, elevation: 1 }),
    background: generateConvexBackground(theme.background),
    borderColor: theme.background.hex('rgb'),
    color: textColor.hex('rgb'),
  };

  const whileTap = {
    boxShadow: generateShadow({ color: theme.background, elevation: 1, inverted: true }),
    background: generateFlatBackground(theme.background),
    borderColor: theme.background.hex('rgb'),
    color: textColor.hex('rgb'),
  };

  const className = `rounded-md box-border border-1 p-2 ${props.className}`;

  return (
    <motion.button
      onClick={onClick}
      initial={initial}
      whileHover={whileHover}
      whileTap={whileTap}
      className={className}
    >
      {props.children}
    </motion.button>
  );
};
