import { useState } from 'react'
import { useAudioContext } from '../utility/useAudioContext'

const track = {}

const Oscillator = () => {
  // useRef obj to persist track data across render
  const audioContext = useAudioContext()
  const [isActive, setIsActive] = useState(false)
  const [params, setParams] = useState({frequency: 440, gain: 0.3})

  const create = (track) => {
    track.osc = audioContext.createOscillator()
    track.gainNode = audioContext.createGain()
  }

  const connect = (track) => {
    track.osc.connect(track.gainNode)
    track.gainNode.connect(audioContext.destination)
  }

  const play = (track) => {
    create(track)
    track.osc.frequency.value = params.frequency
    track.gainNode.gain.value = params.gain
    connect(track)
    track.osc.start()
    setIsActive(true)
  }

  const stop = (track) => {
    track.osc.stop()
    setIsActive(false)
  }

  const setVolume = (track, value) => {
    setParams({
      ...params,
      gain: value
    })
    track.gainNode.gain.linearRampToValueAtTime(value, audioContext.currentTime + .01)
  }

  const setFrequency = (track, value) => {
    setParams({
      ...params,
      frequency: value
    })
    track.osc.frequency.value = value
  }
  
  return (
    <div>
      {!isActive 
        ? <button onClick={() => play(track)}>play</button>
        : <button onClick={() => stop(track)}>stop</button>
      }
      Oscillator
      <button onClick={() => {console.log(track)}}>log track</button>
      <div>
      {track.osc
        ? <div>
            <input
              type="range"
              value={params.gain}
              min={0}
              max={0.7}
              step={0.01}
              onChange={(e) => setVolume(track, Math.fround(e.target.value))}
            >
            </input>
            gain {params.gain.toFixed(2)}
            <input
            type="range"
            value={track.osc.frequency.value}
            min={20}
            max={1000}
            step={.1}
            onChange={(e) => setFrequency(track, Math.fround(e.target.value))}
            >
            </input>
            frequency {params.frequency.toFixed(2)}
          </div>
        : null
      }
      </div>
    </div>
  )
}

export default Oscillator