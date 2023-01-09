import Slider from './components/slider'
import { useState } from 'react'
const audioContext = new AudioContext()
const noiseGenerator = (function () {

  let oscCreatedCount = 0
  let lastFrequency = 0

  const createTrack = (track) => {
    oscCreatedCount++
    track.oscCreatedCount = oscCreatedCount
    track.osc = audioContext.createOscillator()
    track.gainNode = audioContext.createGain()
    track.osc.connect(track.gainNode)
    track.gainNode.connect(audioContext.destination)
  }
  
  const setGain = (track) => {
    track.volume = 0.3
    track.gainNode.gain.setValueAtTime(track.volume, audioContext.currentTime)
  }

  const setFrequency = (track, value) => {
    track.osc.frequency.value = value
  }

  const playOsc = (track) => {
    createTrack(track)
    setGain(track)
    if (lastFrequency) {
      track.osc.frequency.value = lastFrequency
    }
    track.osc.start()
  }

  const stopOsc = (track) => {
    if (track.osc) {
      lastFrequency = track.osc.frequency.value
      track.osc.stop()
    }
  }

  const logTrack = (track) => {
    console.log(track)
  }

  return {
    play: playOsc,
    stop: stopOsc,
    setFrequency,
    log: logTrack
  }
})()

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
      <button onClick={() => (noiseGenerator.log(noise))}>log</button>
      {isPlaying 
        ? <Slider frequency={noise.osc.frequency.value} noise={noise} setFrequency={noiseGenerator.setFrequency}/>
        : null
      }
    </div>
  );
}

export default App;
