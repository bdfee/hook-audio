import { useState } from 'react'

import Slider from './components/slider'
import LogEntry from './components/logEntry'
import noiseGenerator from './noiseGeneration'

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

  console.log('app', noise.gainNode)
  return (
    <div className="App">
      <h1>React Hooks and Web Audio</h1>
      <div>
        {!isPlaying
          ? <button onClick={handlePlay}>play</button>
          : <button onClick={handleStop}>stop</button>
        }
        <LogEntry log={noiseGenerator.log(noise)} />
      </div>
      
      {isPlaying &&
          <div>
            <Slider 
              parameter={noise.osc.frequency.value} 
              noise={noise} 
              setParameter={noiseGenerator.setFrequency}
              min={100}
              max={5000}
              step={1}
            />
            <Slider
              parameter={noise.gainNode.gain.value.toPrecision(2)}
              noise={noise} 
              setParameter={noiseGenerator.setGain}
              min={0.00}
              max={0.75}
              step={0.01}
            />
          </div>
      }
    </div>
  );
}

export default App;
