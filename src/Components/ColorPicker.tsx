import chroma, { Color } from 'chroma-js';
import React from 'react';
import { useTheme } from '../Theme/useTheme';
import { generateShadow } from '../utils';

interface ColorPickerProps {
  value: Color;
  onChange: (value: Color) => void;
  className?: string;
}
export const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  const { value } = props;
  const { theme } = useTheme();

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const newValue = chroma(target.value);

    props.onChange(newValue);
  };

  const boxShadow = generateShadow({ color: theme.background, elevation: 1, inverted: false });
  const invertedBoxShadow = generateShadow({ color: theme.background, elevation: 1, inverted: true });

  const containerStyles = {
    boxShadow: invertedBoxShadow,
  };

  const inputStyles = {
    background: theme.background.hex('rgb'),
    boxShadow,
  };

  return (
    <div className={props?.className} style={containerStyles}>
      <input type="color" onChange={onChange} value={value.hex('rgb')} style={inputStyles} />
    </div>
  );
};
