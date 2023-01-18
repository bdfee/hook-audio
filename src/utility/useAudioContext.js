// sole audioContext declaration
export const audioCtx = new AudioContext()

export const useAudioContext = () => {
  // use reference to 1 audio context
  const audioContext = audioCtx
  return audioContext
}