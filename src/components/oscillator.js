import { useState, useRef } from 'react'
import { useAudioContext } from '../utility/useAudioContext'

const Oscillator = (props) => {
  const audioContext = useAudioContext()
  const [isActive, setIsActive] = useState(false)
  const trackRef = useRef({})

  const create = ({ current }) => {
    current.osc = audioContext.createOscillator()
    current.gainNode = audioContext.createGain()
  }

  const connect = ({ current }) => {
    current.osc.connect(current.gainNode)
    current.gainNode.connect(audioContext.destination)
  }

  const play = (track) => {
    create(track)
    const { current } = track
    current.osc.frequency.value = props.frequency
    current.gainNode.gain.value = props.gain
    connect(track)
    current.osc.start()
    setIsActive(true)
  }

  const stop = ({ current }) => {
    current.osc.stop()
    setIsActive(false)
  }

  const handleSetVolume = (track, e) => {
    const value = Math.fround(e.target.value)
    const id = e.target.id
    props.setVolume(id, value)
    track.current.gainNode.gain.linearRampToValueAtTime(value, audioContext.currentTime + .01)
  }

  const handleSetFrequency = (track, e) => {
    const value = Math.fround(e.target.value)
    const id = e.target.id
    props.setFrequency(id, value)
    track.current.osc.frequency.value = value
  }
  
  const handleRemoveTrack = (track, e) => {
    if (track.current.osc)
      track.current.osc.stop()
    props.removeTrack(e.target.id)
  }

  return (
    <div key={props.id} id={props.id}>
      {!isActive 
        ? <button onClick={() => play(trackRef)}>play</button>
        : <button onClick={() => stop(trackRef)}>stop</button>
      }
      Oscillator {props.id}
      <button id={props.id} onClick={(e) => {handleRemoveTrack(trackRef, e)}}>remove track</button>
      <button onClick={() => {console.log(trackRef)}}>log track</button>
      <div>
      {trackRef.current.osc
        ? <div>
            <input
              id={props.id}
              type="range"
              value={props.gain}
              min={0}
              max={0.7}
              step={0.01}
              onChange={(e) => handleSetVolume(trackRef, e)}
            >
            </input> gain {props.gain.toFixed(2)}
            <input
              id={props.id}
              type="range"
              value={props.frequency}
              min={20}
              max={1000}
              step={.1}
              onChange={(e) => handleSetFrequency(trackRef, e)}
            >
            </input> frequency {props.frequency.toFixed(2)}
          </div>
        : null
      }
      </div>
    </div>
  )
}

export default Oscillator