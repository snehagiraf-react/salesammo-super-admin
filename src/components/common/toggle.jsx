import React from 'react';
import "../../assets/styles/toggle.css";

const Toggle = ({setExpandedMap, checked, onChange }) => {


  return (
    <>
    <label className="mini-toggle">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />
      <span className="slider" />
    </label>
    </>
  )
}

export default Toggle