import { useState } from 'react'

const LogEntry = (props) => {

  const [entries, setEntries] = useState([])
  const style = {
    border: '1px solid'
  }
  return (
    <div>
      <button
        onClick={() => { setEntries(entries.concat(props.log)) }}
      >
        add entry
      </button>
      {
        entries.length && entries.map(entry => {
          const num = Math.random()
          return (
            <div key={'entry-' + num} style={style}>
              number of oscilators created {entry.oscCreatedCount}
              frequency logged at 'Stop' {entry.lastFrequency ? entry.lastFrequency : 'n/a'}
            </div>
          )
        })
      }
    </div>
  )
}

export default LogEntry
