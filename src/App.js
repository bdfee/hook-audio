import Oscillator from './components/oscillator'
// import PinkNoise from './components/pink-noise'
import { audioCtx } from './utility/useAudioContext'

function App() {

  return (
    <div className="App">
      <h1>React & Web Audio</h1>
      <Oscillator />
      <Oscillator />
      <Oscillator />
      <div>
        <button onClick={ () => console.log(audioCtx) }>
          log audio context
        </button>
      </div>
    </div>
  );
}

export default App;
