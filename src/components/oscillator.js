const Oscillator = ({ track, play, stop, removeTrack, setVolume, setFrequency }) => {
  const { id, frequency, gain, isActive } = track

  return (
    <div key={id} id={id}>
      {!isActive
        ? <button id={id} onClick={(e) => play(track, e)}>play</button>
        : <button id={id} onClick={(e) => stop(track, e)}>stop</button>
      }
      Oscillator {id}
      <button id={id} onClick={(e) => {removeTrack(track, e)}}>remove track</button>
      <button onClick={() => {console.log(track)}}>log track</button>
      <div>
      {track.osc
        ? <div>
            <input
              id={id}
              type="range"
              value={gain}
              min={0}
              max={0.7}
              step={0.01}
              onChange={(e) => setVolume(track, e)}
            >
            </input> gain {gain}
            <input
              id={id}
              type="range"
              value={frequency}
              min={20}
              max={1000}
              step={.1}
              onChange={(e) => setFrequency(track, e)}
            >
            </input> frequency {frequency}
          </div>
        : null
      }
      </div>
    </div>
  )
}

export default Oscillator