import { useState } from 'react'
import { useAudioContext } from './hooks/useAudioContext'

const Oscillator = () => {
  const audioContext = useAudioContext()
  const [frequency, setFrequency] = useState(440)
  const [gain, setGain] = useState(0.3)

  const createTrack = (track) => {
    track.osc = audioContext.createOscillator()
    track.gainNode = audioContext.createGain()
  }

  const connectTrack = (track) => {
    track.osc.connect(track.gainNode)
    track.gainNode.connect(audioContext.desitination)
  }

  const setVolume = (track) => {
    track.gainNode.gain.value = gain
  }
}