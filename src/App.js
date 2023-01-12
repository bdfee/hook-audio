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

  const style = {
    display: 'flex',
    flexDirection: 'row',
    flexBasis: 'auto',
  }

  const style2 = {
    minWidth: '200px'
  }

  return (
    <div className="App">
      <h1>React Hooks and Web Audio</h1>
      <div style={style}>
        <div id="left-col" style={style2}>
          <div>
            {!isPlaying
              ? <button onClick={handlePlay}>play</button>
              : <button onClick={handleStop}>stop</button>
            }
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
                  parameter={noise.gainNode.gain.value}
                  noise={noise} 
                  setParameter={noiseGenerator.setGain}
                  min={0}
                  max={.75}
                  step={.01}
                />
              </div>
          }
        </div>
        <div id="right-col">
          <LogEntry log={noiseGenerator.log(noise)} />
        </div>
      </div>
    </div>
  );
}

export default App;
