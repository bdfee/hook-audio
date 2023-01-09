import { useState } from 'react'
const Slider = (props) => {
  const [frequency, setFrequency] = useState(props.frequency)
  const handleChange = (noise, value) => {
    setFrequency(value)
    props.setFrequency(noise, frequency)
  }
  return (
      <input
        type="range"
        value={frequency}
        min="100"
        max="5000"
        onChange={(e) => handleChange(props.noise, e.target.value)}
      >
      </input>
  )
}

export default Slider