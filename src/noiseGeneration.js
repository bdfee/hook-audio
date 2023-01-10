const audioContext = new AudioContext()

const noiseGenerator = (function () {
  // for logger
  let oscCreatedCount = 0
  // for initializing freq slider at previous slider's position
  let lastFrequency = 0
  let lastVolume = 0.00

  const createTrack = (track) => {
    oscCreatedCount++
    track.oscCreatedCount = oscCreatedCount
    track.osc = audioContext.createOscillator()
    track.gainNode = audioContext.createGain()
  }

  const connectTrack = (track) => {
    track.osc.connect(track.gainNode)
    track.gainNode.connect(audioContext.destination)
  }
  
  const setInitialGain = (track) => {
    track.gainNode.gain.value = 0.30
  }

  const setGain = (track, value) => {
    track.gainNode.gain.setTargetAtTime(value, audioContext.currentTime, 0.01)
  }

  const setFrequency = (track, value) => {
    track.osc.frequency.value = value
  }

  const playOsc = (track) => {
    createTrack(track)
    if (lastFrequency) {
      track.osc.frequency.value = lastFrequency
    }
    if (lastVolume) {
      track.gainNode.gain.value = lastVolume
    } else {
      setInitialGain(track)
    }
    connectTrack(track)
    track.osc.start()
  }

  const stopOsc = (track) => {
      lastFrequency = track.osc.frequency.value
      lastVolume = track.gainNode.gain.value
      track.osc.stop()
  }

  const log = (track) => {
    return {
      oscCreatedCount,
      lastFrequency,
      lastVolume,
      track
    }
  }
  return {
    play: playOsc,
    stop: stopOsc,
    setFrequency,
    setGain,
    log
  }
})()

export default noiseGenerator