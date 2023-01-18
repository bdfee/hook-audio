import { useState, useRef } from 'react'
import { useAudioContext } from '../utility/useAudioContext'

const PinkNoise = () => {
  // useRef obj to persist track data across render
  const track = useRef({})
  const audioContext = useAudioContext()
  const [isActive, setIsActive] = useState(false)
  const [params, setParams] = useState({gain: 0.3})

  const createBuffer = (track) => {
    const bufferSize = 2 * audioContext.sampleRate
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
    const output = buffer.getChannelData(0)
  
    let b0 = 0
    let b1 = 0
    let b2 = 0
    let b3 = 0
    let b4 = 0
    let b5 = 0
    let b6 = 0

    // band processing
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      b0 = 0.99886 * b0 + white * 0.0555179
      b1 = 0.99332 * b1 + white * 0.0750759
      b2 = 0.969 * b2 + white * 0.153852
      b3 = 0.8665 * b3 + white * 0.3104856
      b4 = 0.55 * b4 + white * 0.5329522
      b5 = -0.7616 * b5 - white * 0.016898
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362
      output[i] *= 0.11
      b6 = white * 0.115926
    }

    track.audioSource.buffer = buffer
    track.audioSource.loop = true
  }

  const createTrack = (track) => {
    track.audioSource = audioContext.createBufferSource()
    track.gainNode = audioContext.createGain()
  }

  const connect = (track) => {
    track.audioSource.connect(track.gainNode)
    track.gainNode.connect(audioContext.destination)
  }

  const setVolume = (track, value) => {
    setParams({
      ...params,
      gain: value
    })
    track.gainNode.gain.linearRampToValueAtTime(params.gain, audioContext.currentTime + .01)
  }


  const play = (track) => {
    createTrack(track)
    createBuffer(track)
    track.gainNode.gain.value = params.gain
    connect(track)
    track.audioSource.start()
    setIsActive(true)
  }

  const stop = (track) => {
    track.audioSource.stop()
    setIsActive(false)
  }
  
  return (
    <div>
      {!isActive 
        ? <button onClick={() => play(track)}>play</button>
        : <button onClick={() => stop(track)}>stop</button>
      }
      Pink Noise
      <div>
      {track.audioSource
        ? <div>
            <input
              type="range"
              value={track.gainNode.gain.value}
              min={0}
              max={0.3}
              step={0.0001}
              onChange={(e) => setVolume(track, Math.fround(e.target.value))}
            >
            </input>
            gain {params.gain.toFixed(4)}
          </div>
        : null
      }
      </div>
    </div>
  )
}

export default PinkNoise



