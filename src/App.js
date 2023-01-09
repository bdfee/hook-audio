import Slider from './components/slider'
import LogEntry from './components/logEntry'
import noiseGenerator from './noiseGeneration'
import { useState } from 'react'

const noise = {}

function App() {

  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    noiseGenerator.play(noise)
    setIsPlaying(!isPlaying)
  }

  const handleStop = () => {
    noiseGenerator.stop(noise)
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="App">
      <h1>React Hooks and Web Audio</h1>
      {!isPlaying
        ? <button onClick={handlePlay}>play</button>
        : <button onClick={handleStop}>stop</button>
      }
      {isPlaying 
        ? 
          <div>
            <Slider 
              parameter={noise.osc.frequency.value} 
              noise={noise} 
              setParameter={noiseGenerator.setFrequency}
              min="100"
              max="5000"
              step="1"
            />
          </div>
        : null
      }
      <LogEntry log={noiseGenerator.log(noise)} />
    </div>
  );
}

export default App;
