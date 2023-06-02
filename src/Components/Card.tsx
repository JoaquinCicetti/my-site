import React from 'react';
import { useTheme } from '../Theme/useTheme';
import { generateConcaveBackground, generateConvexBackground, generateFlatBackground, generateShadow } from '../utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Color } from 'chroma-js';

export enum CardType {
  FLAT = 'flat',
  CONVEX = 'convex',
  CONCAVE = 'concave',
}
interface CardProps {
  elevation: number;
  type?: CardType;
  inverted?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<CardProps> = (props) => {
  const { elevation, inverted, type = CardType.FLAT } = props;

  const { theme } = useTheme();

  const bg = getBackground(theme.background, type);
  const from = {
    boxShadow: generateShadow({ color: theme.background, inverted, elevation: 0 }),
    background: bg,
    borderColor: theme.background.hex('rgb'),
    color: theme.text.hex('rgb'),
  };

  const to = {
    boxShadow: generateShadow({ color: theme.background, elevation, inverted }),
    background: bg,
    borderColor: theme.background.hex('rgb'),
    color: theme.text.hex('rgb'),
  };

  const className = `container rounded box-border border-1 ${props.className}`;

  return (
    <AnimatePresence>
      <motion.div initial={from} animate={to} exit={from} className={className}>
        {props.children}
      </motion.div>
    </AnimatePresence>
  );
};

const getBackground = (color: Color, type: CardType): string => {
  switch (type) {
    case CardType.FLAT:
      return generateFlatBackground(color);

    case CardType.CONCAVE:
      return generateConcaveBackground(color);

    case CardType.CONVEX:
      return generateConvexBackground(color);
  }
};
