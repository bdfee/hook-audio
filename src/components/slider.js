import { useState } from 'react'
const Slider = (props) => {
  const [para, setPara] = useState(props.parameter)
  const handleChange = (noise, value) => {
    setPara(value)
    props.setParameter(props.noise, para)
  }

  return (
    <div>
      <input
        type="range"
        value={para}
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={(e) => handleChange(props.noise, e.target.value)}
      >
      </input>
      <p>current parameter {para}</p>
    </div>
  )
}

export default Slider