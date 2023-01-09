import { useState } from 'react'
const Slider = (props) => {
  const [parameter, setParameter] = useState(props.parameter)
  const handleChange = (noise, value) => {
    setParameter(value)
    props.setParameter(noise, parameter)
  }
  return (
    <div>
      <input
        type="range"
        value={parameter}
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={(e) => handleChange(props.noise, e.target.value)}
      >
      </input>
      <p>current parameter {parameter}</p>
    </div>
  )
}

export default Slider