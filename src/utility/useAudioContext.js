
// sole audioContext declaration
const audioCtx = new AudioContext()
let audioCtxCount = 0
audioCtxCount++
console.log(audioCtxCount)

export const useAudioContext = () => {
  // use reference to 1 audio context
  const audioContext = audioCtx
  return audioContext
}