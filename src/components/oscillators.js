import { useState } from 'react'
import Oscillator from './oscillator'
import { useAudioContext } from '../utility/useAudioContext'

//temporary
const generateId = () => {
  return `osc-${Math.floor(Math.random() * 10000)}`
}

const Oscillators = () => {
  
  const [tracks, setTracks] = useState([])
  const audioContext = useAudioContext()

  const createNodes = (track) => {
    // create osc and gainNode key value on track obj
    track.osc = audioContext.createOscillator()
    track.gainNode = audioContext.createGain()
  }

  const setParams = (track) => {
    track.osc.frequency.value = track.frequency
    track.gainNode.gain.value = track.gain
  }

  const connect = ({ osc, gainNode }) => {
    // connect osc to gainNode and gainNode to destination
    osc.connect(gainNode)
    gainNode.connect(audioContext.destination)
  }

  // transport controls
  const play = (track, e) => {
    createNodes(track)
    setParams(track)
    connect(track)
    track.osc.start()
    setTracks(tracks.map(track => {
      if (track.id === e.target.id)
        track.isActive = true
      return track
    }))
  }

  const stop = (track, e) => {
    track.osc.stop()
    setTracks(tracks.map(track => {
      if (track.id === e.target.id)
        track.isActive = false
      return track
    }))
  }

  // TODO higher org in track object
  //
  //  track = {
  //    id,
  //    isActive,
  //    osc: {
  //      frequencyParam,
  //      gainParam,
  //      oscNode
  //      gainNode
  //    },
  //    filter: {}


  const handleAddTrack = () => {
    const newTrack = {
      id: generateId(),
      frequency: 440,
      gain: 0.3,
      isActive: false
    }
    setTracks(tracks.concat(newTrack))
  }

  const removeTrack = (track, e) => {
    if (track.isActive)
      track.osc.stop()
    setTracks(tracks.filter(track => track.id !== e.target.id)
    )
  }

  const setVolume = (track, e) => {
    track.gainNode.gain.linearRampToValueAtTime(Number(e.target.value), audioContext.currentTime + .01)
    setTracks(tracks.map(track => {
      if (track.id === e.target.id)
        track.gain = Number(e.target.value)
      return track
    }
    ))
  }

  const setFrequency = (track, e) => {
    track.osc.frequency.value = Number(e.target.value)
    setTracks(tracks.map(track => {
      if (track.id === e.target.id)
        track.frequency = Number(e.target.value)
      return track
    }))
  }


  return (
    <div>
      <button onClick={() => console.log(tracks)}>log state</button>
      <button onClick={handleAddTrack}>add oscillator track</button>
      {tracks.map(track => {
        return (
          <Oscillator 
            track={track}
            key={track.id}
            removeTrack={removeTrack}
            setVolume={setVolume}
            setFrequency={setFrequency}
            stop={stop}
            play={play}
          />
        )
      })}
    </div>
  )
}

export default Oscillators