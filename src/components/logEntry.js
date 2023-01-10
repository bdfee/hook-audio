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
        (entries.length > 0) && entries.map(entry => {
          const num = Math.random()
          return (
            <div key={'entry-' + num} style={style}>
              <table>
                <thead>
                    <tr>
                        <th colSpan="6">logger</th>
                    </tr>
                </thead>
                    <tbody>
                        <tr>
                            <td>osc count:</td>
                            <td>{entry.oscCreatedCount}      </td>
                            <td>freq @ stop:</td>
                            <td>{entry.lastFrequency ? entry.lastFrequency : 'n/a'}      </td>
                            <td>gain @ stop:</td>
                            <td>{entry.lastVolume ? entry.lastVolume : 'n/a'}      </td>
                        </tr>
                    </tbody>
                </table>
            </div>
          )
        })
      }
    </div>
  )
}

export default LogEntry
