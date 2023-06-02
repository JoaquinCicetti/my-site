import chroma, { Color } from 'chroma-js';
import { ColorPicker } from './Components/ColorPicker';
import { Container, CardType } from './Components/Card';
import { ThemeProvider } from './Theme/ThemeContext';
import { useTheme } from './Theme/useTheme';
import { Button } from './Components/Button';

function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

const ThemedApp: React.FC = () => {
  const { theme, setAccent } = useTheme();

  const onChange = (color: Color) => {
    setAccent(color);
  };

  const onClick = () => {
    setAccent(chroma.random());
  };

  return (
    <div
      className={`absolute inset-0 p-4 m-0 w-full h-full`}
      style={{ backgroundColor: theme.background.hex(), color: theme.text.hex() }}
    >
      <div className="mx-auto my-2 text-lg">my-site</div>
      <Container elevation={1} className="mx-auto my-4 p-4">
        <h3>Flat 1</h3>
        <p>This is a simple flat container elevation 1</p>
        <div className="flex items-center mt-3">
          <Button onClick={onClick}>{'Randomize'}</Button>
          <ColorPicker className="w-3 ml-3" onChange={onChange} value={theme.accent} />
        </div>
      </Container>

      <Container elevation={3} inverted type={CardType.CONCAVE} className="mx-auto my-4 p-4">
        <h3>Concave 3</h3>
        <p>This is a concave container with inverted elevation 3</p>
      </Container>

      <Container elevation={2} type={CardType.CONVEX} className="mx-auto my-4 p-4">
        <h3>Convex 2</h3>
        <p>This is a convex container with elevation 2</p>
      </Container>
    </div>
  );
};

export default App;
