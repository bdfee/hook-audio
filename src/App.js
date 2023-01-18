import Oscillators from './components/oscillators'
import { audioCtx } from './utility/useAudioContext'

function App() {

  return (
    <div className="App">
      <h1>React & Web Audio</h1>
        <Oscillators />
      <div>
        <button onClick={ () => console.log(audioCtx) }>
          log audio context
        </button>
      </div>
    </div>
  );
}

export default App;
