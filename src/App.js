import Oscillator from './components/oscillator'
import PinkNoise from './components/pink-noise'

function App() {

  return (
    <div className="App">
      <h1>React & Web Audio</h1>
      <Oscillator />
      <Oscillator />
      <Oscillator />
      <PinkNoise />
    </div>
  );
}

export default App;
