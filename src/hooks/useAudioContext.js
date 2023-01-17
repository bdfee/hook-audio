import { useRef } from 'react'

// new audio context outside of the hook
const audioCtx = new AudioContext()

export const useAudioContext = () => {
  // use reference to 1 audio context
  const audioContext = useRef(audioCtx)
  return audioContext.current
}