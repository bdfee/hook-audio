import { useState } from 'react'
import Oscillator from './oscillator'

//temporary
const generateId = () => {
  return `osc-${Math.floor(Math.random() * 10000)}`
}

const Oscillators = () => {
  
  const [tracks, setTracks] = useState([])

  const handleAddTrack = () => {
    const newTrack = {
      id: generateId(),
      frequency: 440,
      gain: 0.3
    }
    setTracks(tracks.concat(newTrack))
  }

  const removeTrack = (id) => {
    setTracks(tracks.filter(track => track.id !== id))
  }

  const setVolume = (id, value) => {
    setTracks(tracks.map(track => {
      if (track.id === id)
        track.gain = value
      return track
    }
    ))
  }

  const setFrequency = (id, value) => {
    setTracks(tracks.map(track => {
      if (track.id === id)
        track.frequency = value
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
            id={track.id} 
            key={track.id} 
            removeTrack={removeTrack}
            setVolume={setVolume}
            setFrequency={setFrequency}
            frequency={track.frequency}
            gain={track.gain}
          />
        )
      })}
    </div>
  )
}

export default Oscillators