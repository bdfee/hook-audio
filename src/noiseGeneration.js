const audioContext = new AudioContext()

const noiseGenerator = (function () {
  // for logger
  let oscCreatedCount = 0
  // for initializing freq slider at previous slider's position
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

  const log = (track) => {
    return {
      oscCreatedCount,
      lastFrequency,
      track
    }
  }
  return {
    play: playOsc,
    stop: stopOsc,
    setFrequency,
    log
  }
})()

export default noiseGenerator