import { useState, useRef } from 'react'
import { useAudioContext } from '../utility/useAudioContext'

const Oscillator = () => {
  const trackRef = useRef({})
  const audioContext = useAudioContext()
  const [isActive, setIsActive] = useState(false)
  const [params, setParams] = useState({frequency: 440, gain: 0.3})

  const create = (track) => {
    console.log(track)
    track.current.osc = audioContext.createOscillator()
    track.current.gainNode = audioContext.createGain()
  }

  const connect = (track) => {
    track.current.osc.connect(track.current.gainNode)
    track.current.gainNode.connect(audioContext.destination)
  }

  const play = (track) => {
    create(track)
    track.current.osc.frequency.value = params.frequency
    track.current.gainNode.gain.value = params.gain
    connect(track)
    track.current.osc.start()
    setIsActive(true)
  }

  const stop = (track) => {
    track.current.osc.stop()
    setIsActive(false)
  }

  const setVolume = (track, value) => {
    setParams({
      ...params,
      gain: value
    })
    track.current.gainNode.gain.linearRampToValueAtTime(value, audioContext.currentTime + .01)
  }

  const setFrequency = (track, value) => {
    setParams({
      ...params,
      frequency: value
    })
    track.current.osc.frequency.value = value
  }
  
  return (
    <div>
      {!isActive 
        ? <button onClick={() => play(trackRef)}>play</button>
        : <button onClick={() => stop(trackRef)}>stop</button>
      }
      Oscillator
      <button onClick={() => {console.log(trackRef)}}>log track</button>
      <div>
      {trackRef.current.osc
        ? <div>
            <input
              type="range"
              value={params.gain}
              min={0}
              max={0.7}
              step={0.01}
              onChange={(e) => setVolume(trackRef, Math.fround(e.target.value))}
            >
            </input>
            gain {params.gain.toFixed(2)}
            <input
            type="range"
            value={params.frequency}
            min={20}
            max={1000}
            step={.1}
            onChange={(e) => setFrequency(trackRef, Math.fround(e.target.value))}
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